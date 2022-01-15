import json
import re
import urllib.error
import requests
import datetime

from mechanize import Browser
from bs4 import BeautifulSoup


class ConvertClass:
    def __init__(self):
        pass

    @staticmethod
    def converter(code, from_, to_):
        try:
            browser = Browser()
            browser.addheaders = [('User-agent',
                                   'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.1) Gecko/2008071615 Fedora/3.0.1-1.fc9 Firefox/3.0.1')]
            browser.set_handle_robots(False)
            browser.open("https://convertbetcodes.com")

            formcount = 0
            for frm in browser.forms():
                if str(frm.attrs["class"]) == "ajax_form":
                    break
                formcount = formcount + 1
            browser.select_form(nr=formcount)
            browser['code'] = code
            browser['convert_from'] = [from_, ]
            browser['convert_to'] = [to_, ]

            response = browser.submit()

            content = response.read()
            b = json.loads((content.decode('utf-8')))
            data = b["view"]
            soup = BeautifulSoup(data, 'html.parser')
            odds = [x.text for x in soup.findAll("span")]
            code = [x.text.strip() for x in soup.findAll(class_='tx-danger')]

            return {
                "from_bet": from_,
                "to_bet": to_,
                "from_odd": odds[0],
                "to_odd": odds[1],
                "from_code": str(code[0]).replace(' ', '').replace('code:', ''),
                "to_code": str(code[1]).replace(' ', '').replace('code:', '').replace('Details', '').strip()
            }

        except urllib.error.URLError as e:
            return "no network"



