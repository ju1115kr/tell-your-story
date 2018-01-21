# -*- coding:utf-8 -*-
from flask import request, jsonify, make_response, url_for, g
from . import api
from .. import db
from ..models import Particle, Comment
from errors import not_found, forbidden, bad_request
from flask_cors import cross_origin
import os


@api.route('/particle', methods=['GET'])
def get_all_particle():
    particles = Particle.query.all()
    return jsonify({'particle': [particle.to_json() for particle in particles]})


@api.route('/particle/<int:id>', methods=['GET'])
def get_particle(id):
    particle = Particle.query.get(id)
    if particle is None:
        return not_found('Particle does not exist')
    return jsonify(particle.to_json())


@api.route('/particle', methods=['POST'])
@cross_origin(expose_headers='Location')
def post_particle():
    if request.json is None:
        return bad_request('JSON Request is invaild')
    particle = Particle.from_json(request.json)

    db.session.add(particle)
    db.session.commit()

    resp = make_response()
    resp.headers['Location'] = url_for('api.get_particle', id=particle.id)
    resp.status_code = 201
    return resp


@api.route('/particle/<int:particle_id>/comments', methods=['GET'])  # 모든 덧글 조회
def get_particle_comments(particle_id):
    particle = Particle.query.get(particle_id)
    if particle is None:
        return not_found('Particle does not exist')
    return jsonify({'comments': [comment.to_json() for comment in particle.comments if comment.parent_id is None]})


@api.route('/comments/<int:comment_id>', methods=['GET'])  # 특정 덧글 요청
def get_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment is None:
        return not_found('Comment does not exist')
    return jsonify(comment.to_json())


@api.route('/particle/<int:particle_id>/comments', methods=['POST'])  # 덧글 작성
@cross_origin(expose_headers='Location')
def post_particle_comment(particle_id):
    if request.json is None:
        return bad_request('JSON Request is invaild')
    particle = Particle.query.get(particle_id)
    if particle is None:
        return not_found('Particle does not exist')

    comment = Comment.from_json(request.json)
    comment.particle_id = particle.id

    db.session.add(comment)
    db.session.commit()
    resp = make_response()
    resp.headers['Location'] = url_for('api.get_comment', comment_id=comment.id)
    resp.status_code = 201
    return resp

