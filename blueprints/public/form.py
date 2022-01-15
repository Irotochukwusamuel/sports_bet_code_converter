from flask import Blueprint, request

import config

from modules.registration import Registration
from modules.scrapy import ConvertClass
from modules.validations import Validation
from modules.settings import Setting

PublicForm_bp = Blueprint("PublicForm_bp", __name__)

register = Registration()
validate = Validation()
setting = Setting()


def responseData(data):
    return {"data": data}


@PublicForm_bp.post('/CreateAccount')
def CreateAccount():
    fname = config.sanitize_Html(request.form['fname'])
    lname = config.sanitize_Html(request.form['lname'])
    email = config.sanitize_Html(request.form['email'])
    password = config.sanitize_Html(request.form['password'])
    phone_number = config.sanitize_Html(request.form['number'])

    if result := register.registration(fname, lname, email, password, phone_number):
        return result


@PublicForm_bp.post("/converter")
def converter():
    code = request.form["code"]
    convert_from = request.form["convert_from"]
    convert_to = request.form["convert_to"]
    a = ConvertClass()
    if result := a.converter(code, convert_from, convert_to):
        return {"data": result}


@PublicForm_bp.post('/Login')
def Login():
    email = config.sanitize_Html(request.form['email'])
    password = config.sanitize_Html(request.form['password'])
    if result := register.login(email, password):
        return result


@PublicForm_bp.post('/forgot-password')
def forgot_password():
    email = config.sanitize_Html(request.form['email'])
    if result := register.forgotPassword(email):
        return result


@PublicForm_bp.post('/change-forgot-password')
def change_forgot_password():
    email = validate.get_cookie_id("verify_email")
    password1 = config.sanitize_Html(request.form['password1'])
    password2 = config.sanitize_Html(request.form['password2'])
    if data := setting.ChangeForgotPassword(email, password1, password2):
        if data == "success":
            return responseData(["success", "Password has been changed successfully, please Sign in again"])
        elif data == "incorrect-password":
            return responseData(["warning", "Password does not match"])


@PublicForm_bp.post('/verify-auth')
def verify_auth():
    email = config.sanitize_Html(request.form['email'])
    code = config.sanitize_Html(request.form['verification'])
    if result := register.TwoAuthentificationVerify(email, code):
        return result


@PublicForm_bp.post('/contact-message')
def contact_message():
    if request.method == "POST":
        name = config.sanitize_Html(request.form['name'])
        email = config.sanitize_Html(request.form['email'])
        subject = config.sanitize_Html(request.form['subject'])
        message = config.sanitize_Html(request.form['message'])
        if config.ContactUs(email, subject, message, name):
            return "success"
