# -*- coding: utf-8 -*-
from flask import Blueprint
from flask.ext.cors import CORS

# Flask Blueprint 정의
api = Blueprint('api', __name__)
CORS(api)  # enable CORS on the API_v1.0 blueprint

from . import particle, search
