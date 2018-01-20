# -*- coding: utf-8 -*-
from flask import Flask
from flask.ext.cors import CORS

from .config import config

from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO()

def create_app(config_name):
    CORS(app, expose_headers='Location')
    app.config.from_object(config['default'])
    config['default'].init_app(app)

    socketio.init_app(app) #For initialize SocketIO app

    from .api_1_0 import api as api_1_0_blueprint
    app.register_blueprint(api_1_0_blueprint, url_prefix='/api/v1.0')
    # attach routes and custom error pages here

    return app

