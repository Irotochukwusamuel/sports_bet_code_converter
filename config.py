# pylint: disable=no-member
import math
import os
import time
from pprint import pprint

import bleach
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException

basedir = os.path.abspath(os.path.dirname(__file__))

# THE APP NAME
admin_id = "admin"

# THE DATABASE NAME
database_name = 'bookallbets'
db_host = 'localhost'
db_username = 'root'
db_password = ''

# database_name = 'vestnanc_finance'
# db_host = 'localhost'
# db_username = 'vestnanc_root'
# db_password = '-%f5jPAfcJ&H'

user_cookie = "bab_"

image_save_location = "static/upload/"
chat_save_location = "static/chat/"

# Instantiate the client\
# Configure API key authorization: api-key
configuration = sib_api_v3_sdk.Configuration()
configuration.api_key[
    'api-key'] = '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'


def ContactUs(from_, subject, message, name):
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
    subject = f'{subject}'
    html_content = f'<div style="width: 90%;margin: auto;border: 1px solid lightgray; background: white;height:55vh;"><div style="height: 90px;background: #424242;color: white;font-size: 23px;font-family: sans-serif;letter-spacing: 0.5px;text-align: center;display:table-cell;vertical-align: middle;width:100vw;">Contact Us</div><p style="padding: 20px;font-family: sans-serif;letter-spacing: 0.5px;color: #464141; font-size:15px;">Hello,</p><div style="padding: 0 20px 20px 20px;"><p style="font-family: sans-serif;letter-spacing: 0.5px;color: #464141; font-size: 13px;margin-bottom: 10px;">{message}</p><p style="margin-top:10px;font-size:14px">From {name}</p></div></div>'
    sender = {"name": f'{from_.split("@")[0]}', "email": f"{from_}"}
    to = [{"email": 'info@bookallbets.com', "name": 'bookallbets'}]
    reply_to = {"email": "info@bookallbets.com", "name": "bookallbets"}
    headers = {"Some-Custom-Name": "unique-id-1234"}
    params = {"parameter": "My param value", "subject": "New Subject"}
    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(to=to, reply_to=reply_to, headers=headers,
                                                   html_content=html_content, sender=sender, subject=subject)

    try:
        api_response = api_instance.send_transac_email(send_smtp_email)
        pprint(api_response)
        return True
    except ApiException as e:
        print("Exception when calling SMTPApi->send_transac_email: %s\n" % e)
        return True


# CLEANING USER INPUT
def sanitize_Html(value):
    value = bleach.clean(value)
    return value


def TimeConverter(delta, **kw):
    halfstr = u'\u00BD'
    nohalf = u''
    # Now
    if delta < 0.5:
        return u'now'

    # < 1 hour
    mins = delta / 60.
    if mins < 1.5:
        return u'1m'
    if mins < 60:
        return u'%dm' % math.ceil(mins)

    # < 1 day
    if mins < 75:
        return u'1h'
    hours, mins = divmod(mins, 60)
    if 15 <= mins <= 45:
        half = halfstr
    else:
        half = nohalf
        if mins > 45:
            hours += 1
    if hours < 24:
        return u'%dh' % math.ceil(hours)

    # < 7 days
    if hours < 30:
        return u'1d'
    days, hours = divmod(hours, 24)
    if 6 <= hours <= 18:
        half = halfstr
    else:
        half = nohalf
        if hours > 18:
            days += 1
    if days < 7:
        return u'%dd' % math.ceil(days)

    # < 4 weeks
    if days < 9:
        return u'1w'
    weeks, wdays = divmod(days, 7)
    if 2 <= wdays <= 4:
        half = halfstr
    else:
        half = nohalf
        if wdays > 4:
            weeks += 1
    if weeks < 4:  # So we don't get 4 weeks
        return u'%dw' % math.ceil(weeks)

    # < year
    if days < 40:
        return u'1mn'
    months, days = divmod(days, 30.4)
    if 10 <= days <= 20:
        half = halfstr
    else:
        half = nohalf
        if days > 20:
            months += 1
    if months < 12:
        return u'%dmn' % math.ceil(months)

    # Don't go further
    if months < 16:
        return u'1y'
    years, months = divmod(months, 12)
    if 4 <= months <= 8:
        half = halfstr
    else:
        half = nohalf
        if months > 8:
            years += 1
    return u'%dy' % math.ceil(years)


# GETTING CURRENT TIME
def get_current_time():
    get_time = str(time.time())
    current_time = get_time.rsplit('.')[0]
    return int(current_time)





