# -*- coding: utf-8 -*-
from flask import url_for, current_app, g
from . import db
from app.exceptions import ValidationError
from datetime import datetime


class Particle(db.Model):
    __tablename__ = 'particles'
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, nullable=False)
    context = db.Column(db.Text, nullable=False)
    parsed_context = db.Column(db.Text)
    geometry = db.Column(db.Text, nullabe=False)
    created_at = db.Column(db.DateTime, index=True,
                    default=datetime.utcnow)

    comments = db.relationship('Comment', backref='particle', lazy='dynamic')

    def __init__(self, context, parsed_context):
        self.context = context
        self.parsed_context = parsed_context

    def __repr__(self):
        return '<Particle [%r](%r):%r>' % (self.created_at, self.author_id, self.context)

    def to_json(self):  # json 출력 루틴
        json_particle = {
            'id': self.id,
            'author': self.author_id,
            'context': self.context,
            'created_at': self.created_at,
			'geometry' : self.geometry,
        }
        return json_particle


    @staticmethod
    def from_json(json_particle):  # json 입력 루틴
        author_id = json_particle.get('author_id')
        context = json_particle.get('context')
        geometry = json_particle.get('geometry')

        if (author_id is None or author_id == '') and \
                (context is None or context == '') and \
                (geometry is None or geometry == ''):
            raise ValidationError('particle does not have information')
        parsed_context = removeEscapeChar(context).lower()

        particle = Particle(author_id=author_id, context=context, parsed_context=parsed_context,
                geometry=geometry)
        return particle


class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    context = db.Column(db.Text)
    parsed_context = db.Column(db.Text)
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    author_id = db.Column(db.Integer, nullable=False)
    particle_id = db.Column(db.Integer, db.ForeignKey('particles.id'), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    comments = db.relationship('Comment', lazy='dynamic')


    def __init__(self, context, parsed_context, particle_id=None):
        self.context = context
        self.parsed_context = parsed_context
        self.particle_id = particle_id

    def __repr__(self):
        return '<Comment #%r[%r]: %r>' % (self.particle_id, self.author_id, self.context)

    @staticmethod
    def from_json(json_comment):  # json 입력 루틴
        author_id = json_comment.get('author_id')
        context = json_comment.get('context')

        if (author_id is None or author_id == '') and \
                (context is None or context == ''):
            raise ValidationError('comment does not have a context')
        parsed_context = removeEscapeChar(context).lower()

        return Comment(author_id=author_id, context=context, parsed_context=parsed_context)

    def to_json(self):  # json 출력 루틴
        json_comment = {
            'id': self.id,
            'author': self.author_id,
            'context': self.context,
            'created_at': self.created_at,
            'particle_id': self.particle_id,
            'parent_id': self.parent_id,
            'count_reply': self.comments.count()
        }
        return json_comment


def removeEscapeChar(context):
    import re
    str = re.sub("(<([^>]+)>", "", context)
    str = str.replace('&nbsp;', "").replace('&lt;', "<").replace('&gt;', ">")\
        .replace('&amp;', "&").replace('&quot;', '"')
    return str
