from flask import Blueprint, request

import config
from modules.models import Model
from modules.settings import Setting
from modules.validations import Validation

AdminRequests_page_bp = Blueprint("AdminRequests_page_bp", __name__)
validate = Validation()
setting = Setting()
model = Model()


def responseData(data):
    return {"data": data}


@AdminRequests_page_bp.post('/prediction-view-more')
def prediction_view_more():
    if data := request.get_json():
        res = validate.getPredictionsDetails(data["id"])
        return responseData(res)


@AdminRequests_page_bp.post('/upload-prediction')
def upload_prediction():
    if data := request.get_json():
        if res := validate.insertPredictions(data["data"]):
            if res == "data exist":
                return "exist"
            else:
                return "success"


@AdminRequests_page_bp.post('/delete-prediction')
def delete_prediction():
    if data := request.get_json():
        validate.RemovePrediction(data["id"])
        return responseData("success")


@AdminRequests_page_bp.post('/change-disabled-status')
def disabled_status():
    if data := request.get_json():
        setting.ChangeDisabledStatus(data["id"], data["status"])
        return "success"


@AdminRequests_page_bp.post('/change-IsAdmin-status')
def IsAdmin_status():
    if data := request.get_json():
        setting.ChangeIsAdminStatus(data["id"], data["status"])
        return "success"


@AdminRequests_page_bp.post('/individual-details')
def individual_details():
    if data := request.get_json():
        res = validate.get_userDetails(data["id"])
        return responseData(res)
