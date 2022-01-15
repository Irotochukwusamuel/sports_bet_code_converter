import base64
import io
import os
import uuid

import geocoder
from PIL import Image

import config
from modules.database import db
from modules.models import Model
from modules.validations import Validation


class Setting:

    def __init__(self):
        self.cursor = db.cursor(buffered=True)
        self.model = Model()
        self.validate = Validation()

    @staticmethod
    def allowed_image(filename):
        if "." not in filename:
            return False

        ext = filename.rsplit(".", 1)[1]
        if ext.upper() in ["JPEG", "JPG", "PNG", "GIF"]:
            return True
        else:
            return "Unsupported Image Type"

    def ChangeForgotPassword(self, email, password1, password2):
        if password1 == password2:
            newpass = self.validate.hash_key(password1)
            rand = uuid.uuid4().hex
            if self.model.updateData(sql="update users set rand=%s, password=%s where email=%s",
                                     value=(rand, newpass, email)):
                return "success"
        else:
            return "incorrect-password"

    def Changeemail(self, ID, new_email):
        email = self.validate.get_Email_withID(ID)
        print(email, new_email)
        if new_email == email:
            return "email-exist"
        else:
            self.model.updateData(sql="update users set email=%s where id=%s", value=(new_email, ID))
            return "success"

    def UpdateAuth(self, ID, result):
        rand = uuid.uuid4().hex
        if self.model.updateData(sql="update users set rand=%s,auth=%s where id=%s", value=(rand, result, ID,)):
            return "success"

    def ChangeDisabledStatus(self, ID, value):
        rand = uuid.uuid4().hex
        if self.model.updateData(sql="update users set rand=%s, disabled=%s where id=%s", value=(rand, value, ID,)):
            return "success"

    def ChangeIsAdminStatus(self, ID, value):
        rand = uuid.uuid4().hex
        if self.model.updateData(sql="update users set rand=%s, isAdmin=%s where id=%s", value=(rand, value, ID,)):
            return "success"

    def EmptyVerifyCodeIfSuccess(self, ID, value):
        rand = uuid.uuid4().hex
        if self.model.updateData(sql="update users set rand=%s, verification=%s where email=%s",
                                 value=(rand, value, ID,)):
            return "success"
