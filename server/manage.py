#!/usr/bin/env python
import os
from app import create_app, db, socketio
from app.models import Particle, Comment
from flask.ext.script import Manager, Shell, Command
from flask.ext.migrate import Migrate, MigrateCommand

app = create_app('default')
manager = Manager(app)
migrate= Migrate(app, db)

host='localhost'
port=9009

def make_shell_context():
    return dict(app=app, User=User, Particle=Particle)

manager.add_command("shell", Shell(make_context=make_shell_context))
manager.add_command("db", MigrateCommand)

@manager.command
def rs():
    socketio.run(app, host="0.0.0.0", port=port, debug=True)

if __name__ == '__main__':
    manager.run()
