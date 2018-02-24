# -*- coding: utf-8 -*-
from . import db
from app.exceptions import ValidationError
from datetime import datetime

class Particle(db.Model):
    __tablename__ = 'particles'
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.BigInteger)
    googleUserImage = db.Column(db.Text)
    context = db.Column(db.Text, nullable=False)
    parsed_context = db.Column(db.Text)
    x = db.Column(db.Float, nullable=False)
    y = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, index=True,
                    default=datetime.utcnow)

    comments = db.relationship('Comment', backref='particle', lazy='dynamic')
    likes = db.relationship('Like', backref='particle', lazy='dynamic')

    def __init__(self, author_id, googleUserImage, context, parsed_context, x, y):
        self.author_id = author_id
        self.googleUserImage = googleUserImage
        self.context = context
        self.parsed_context = parsed_context
        self.x = x
        self.y = y

    def __repr__(self):
        return '<Particle [%r](%r):%r>' % (self.created_at, self.author_id, self.context)

    def to_json(self):  # json 출력 루틴
        json_particle = {
            'id': self.id,
            'author': self.author_id,
            'googleUserImage': self.googleUserImage,
            'context': self.context,
            'created_at': self.created_at,
            'x': self.x,
            'y': self.y,
            'likes': [ like.user_id for like in self.likes ],
            'likes_count': self.likes.count(),
        }
        return json_particle


    @staticmethod
    def from_json(json_particle):  # json 입력 루틴
        author_id = json_particle.get('author_id')
        googleUserImage = json_particle.get('googleUserImage')
        context = json_particle.get('context')
        x = json_particle.get('x')
        y = json_particle.get('y')

        if author_id is None or author_id == '':
            raise ValidationError('particle does not have information')
        parsed_context = removeEscapeChar(context).lower()

        particle = Particle(author_id=author_id, googleUserImage=googleUserImage, context=context,
                parsed_context=parsed_context, x=x, y=y)
        return particle


class Like(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    particle_id = db.Column(db.Integer, db.ForeignKey('particles.id'), nullable=False)
    user_id = db.Column(db.BigInteger, nullable=False)

    def __init__(self, user_id):
        self.user_id = user_id

    @staticmethod
    def from_json(json_like):
        user_id = json_like.get('userID')
        if user_id is None or user_id == '':
            raise ValidationError('Like does not have information')
        like = Like(user_id = user_id)
        return like


class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    context = db.Column(db.Text)
    parsed_context = db.Column(db.Text)
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    author_id = db.Column(db.Integer)
    googleUserImage = db.Column(db.Text)
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
        googleUserImage = json_comment.get('googleUserImage')
        context = json_comment.get('context')

        if (author_id is None or author_id == '') and \
                (context is None or context == ''):
            raise ValidationError('comment does not have a context')
        parsed_context = removeEscapeChar(context).lower()

        return Comment(author_id=author_id, googleUserImage=googleUserImage, context=context, parsed_context=parsed_context)

    def to_json(self):  # json 출력 루틴
        json_comment = {
            'id': self.id,
            'author': self.author_id,
            'googleUserImage': self.googleUserImage,
            'context': self.context,
            'created_at': self.created_at,
            'particle_id': self.particle_id,
            'parent_id': self.parent_id,
            'count_reply': self.comments.count()
        }
        return json_comment


def removeEscapeChar(context):
    import re
    str = re.sub("(<([^>]+)>)", "", context)
    str = str.replace('&nbsp;', "").replace('&lt;', "<").replace('&gt;', ">")\
        .replace('&amp;', "&").replace('&quot;', '"')
    return str

