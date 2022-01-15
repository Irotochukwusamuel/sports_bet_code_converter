from flask import Flask
from blueprints.public.pages import public_page_bp
from blueprints.admin.pages import Admin_page_bp
from blueprints.admin.requests import AdminRequests_page_bp
from blueprints.public.form import PublicForm_bp
from gevent.pywsgi import WSGIServer

import traceback
import gevent.monkey

# gevent.monkey.patch_all()

app = Flask(__name__)
app.register_blueprint(public_page_bp)
app.register_blueprint(PublicForm_bp)
app.register_blueprint(Admin_page_bp)
app.register_blueprint(AdminRequests_page_bp)


@app.errorhandler(404)
def invalid_route(e):
    return "Page not found"


if __name__ == '__main__':
    app.run()
    # https_server = WSGIServer(("localhost", 80), app, threading=True, debug=True)
    # https_server.serve_forever()
