import re
import config
from modules.database import db
from modules.models import Model
from modules.validations import Validation
from modules.settings import Setting


class Registration:

    def __init__(self):
        self.cursor = db.cursor(buffered=True)
        self.model = Model()
        self.validate = Validation()
        self.setting = Setting()

    @staticmethod
    def responseData(data):
        return {"data": data}

    def forgotPassword(self, email):
        if self.model.checkDataExist("users", email, "email"):
            regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
            if not re.fullmatch(regex, email):
                return self.responseData(["error", "Invalid Email Address!"])
            else:
                code = self.validate.generate_verification_code()
                self.model.updateData("update users set verification=%s where email=%s",
                                      value=(code, email,))
                config.sendMail(email, "Forgot Password", code)
                return self.responseData(["success"])
        else:
            return self.responseData(["error", "Sorry!, this email address does not exist"])

    def registration(self, fname, lname, email, password, phone_number):
        if self.model.checkDataExist("users", email, "email"):
            return self.responseData(["warning", "This email already exist!"])
        else:
            if self.model.insertData(
                    sql="insert into users (firstname, lastname, email, password, phone)values (%s, %s, %s, %s,%s)",
                    values=(
                    fname, lname, email, self.validate.hash_key(password), phone_number)):
                if Cookiedata := self.login(email, password):
                    # config.WelcomeMail(email, lname, email)
                    return self.responseData(
                        ["success", "Account has been created successfully", Cookiedata["data"][1]])

    def login(self, email, password):
        if db_password := self.model.selectOneData(sql="select password from users where email=%s", value=(email,)):
            if self.validate.check_hash_key(password, db_password):
                if self.validate.check_UserIsAdmin(email) == "No":
                    cookie = self.validate.hash_key(self.validate.generate_cookie())
                    if self.model.updateData(sql="update users set login_hash=%s where email=%s",
                                             value=(cookie, email)):
                        return self.responseData(["success", cookie])
                else:
                    cookie = self.validate.hash_key(self.validate.generate_cookie())
                    if self.model.updateData(sql="update users set login_hash=%s where email=%s",
                                             value=(cookie, email)):
                        return self.responseData(["isAdmin", cookie])
            else:
                return self.responseData(["error", "Incorrect email or password"])
        else:
            return self.responseData(["error", "Incorrect email or password"])

    def TwoAuthentificationVerify(self, email, code):
        result = self.model.selectOneData(sql="select verification from users where email=%s", value=(email,))
        if str(result) == str(code):
            if self.validate.check_UserIsDisabled(email) == "No":
                cookie = self.validate.hash_key(self.validate.generate_cookie())
                if self.model.updateData(sql="update users set login_hash=%s where email=%s",
                                         value=(cookie, email)):
                    self.setting.EmptyVerifyCodeIfSuccess(email, " ")
                    return self.responseData(["success", cookie])

            else:
                return self.responseData(
                    ["error", "Your Account has been disabled, please contact the Admin"])
        else:
            return self.responseData(["error", "Incorrect verification code"])
