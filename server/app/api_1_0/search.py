# -*- coding:utf-8 -*-
from flask import request, jsonify, g
from . import api
from ..models import Particle, Like, Comment
from errors import not_found, forbidden, bad_request
from datetime import datetime


@api.route('/search/particle/<context>', methods=['GET'])
def search_particle(context):
    if context is None:
        return bad_request('Request is invaild')

    context = context.lower()
    result = Particle.query\
                    .filter(Particle.parsed_context.like('%'+context+'%'))\
                    .order_by(Particle.id.desc()).all()

    if result is None:
        return not_found('Result does not exist')
    return jsonify({'particle':[particle.to_json() for particle in result]})

