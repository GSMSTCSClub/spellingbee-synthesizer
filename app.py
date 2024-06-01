from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from subprocess import Popen, PIPE, check_output, CalledProcessError
import json
import os

# Create app
app = Flask(__name__)
CORS(app)

@app.route('/<path:requested_path>')
def index(requested_path):
    if requested_path == 'output.mp3':
        return app.send_static_file('output.mp3')
    elif requested_path == 'favicon.ico':
        return '', 204
    else:
        if ("/gen" in requested_path):
            process = Popen(['python', 'fetch.py'], stdin=PIPE)
            process.communicate(requested_path[:-4].encode())
            try:
                et_output = check_output(['./et', '-def', requested_path[:-4]])
                return Response(et_output, mimetype='text/plain')
            except CalledProcessError:
                return f"Word {requested_path[:-4]} not found!"
        else:
            try:
                et_output = check_output(['./et', '-def', requested_path])
                return Response(et_output, mimetype='text/plain')
            except CalledProcessError:
                return f"Word {requested_path} not found!"