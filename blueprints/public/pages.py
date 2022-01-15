from flask import Blueprint, render_template, make_response, redirect

import config
from modules.scrapy import ConvertClass
from modules.validations import Validation

public_page_bp = Blueprint("public_page_bp", __name__)
validate = Validation()
convert_ = ConvertClass()


@public_page_bp.route('/')
def index():
    cookie_id = validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie))
    lastname = validate.get_lastname(cookie_id)
    predict = validate.SoccerPredictions()
    return render_template("public/index.html", isloggedIn=validate.isLoggedIn(), lastname=lastname,predict=predict)


@public_page_bp.route('/faqs')
def faqs():
    cookie_id = validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie))
    lastname = validate.get_lastname(cookie_id)
    return render_template("public/faqs.html", isloggedIn=validate.isLoggedIn(), lastname=lastname)


@public_page_bp.route('/contact')
def contact():
    cookie_id = validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie))
    lastname = validate.get_lastname(cookie_id)
    return render_template("public/contact.html", isloggedIn=validate.isLoggedIn(), lastname=lastname)


@public_page_bp.route('/about')
def about():
    cookie_id = validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie))
    lastname = validate.get_lastname(cookie_id)
    return render_template("public/about.html", isloggedIn=validate.isLoggedIn(), lastname=lastname)


@public_page_bp.route('/predictions')
def predictions():
    if validate.isLoggedIn():
        if cookie_id := validate.get_userID_withCookie(validate.get_cookie_id(config.user_cookie)):
            predict = validate.SoccerPredictions()
            lastname = validate.get_lastname(cookie_id)
            return render_template("public/predictions.html", isloggedIn=validate.isLoggedIn(), lastname=lastname,
                                   predict=predict)
        else:
            return redirect("/login")
    else:
        return redirect("/login")


@public_page_bp.route('/login')
def login():
    if validate.isLoggedIn():
        return redirect("/")
    else:
        return render_template("public/signin.html")


@public_page_bp.route('/register')
def register():
    if validate.isLoggedIn():
        return redirect("/")
    else:
        return render_template("public/signup.html")


@public_page_bp.route('/forgot-password')
def forgot_password():
    return render_template("public/forgotpassword.html")


@public_page_bp.route('/logout')
def logout():
    res = make_response(redirect("/login"))
    res.set_cookie(config.user_cookie, "", expires=0)
    return res
