from flask import Blueprint, render_template, request, redirect

import config
from modules.validations import Validation

Admin_page_bp = Blueprint("Admin_page_bp", __name__)
validate = Validation()


@Admin_page_bp.route('/AppAdmin')
def AppAdmin():
    if validate.isAdmin():
        data = validate.get_AllUsersLastTen()
        return render_template("admin/index.html", data=data, onload=validate.OnloadIndexDetails())
    else:
        return redirect("/login")


@Admin_page_bp.route('/AppAdmin/users')
def users_():
    if validate.isAdmin():
        data = validate.get_AllUsers()
        return render_template("admin/users.html", data=data)
    else:
        return redirect("/login")

@Admin_page_bp.route('/AppAdmin/predictions')
def predictions_():
    if validate.isAdmin():
        data = validate.getAllPredictions()
        return render_template("admin/predictions.html", data=data)
    else:
        return redirect("/login")


