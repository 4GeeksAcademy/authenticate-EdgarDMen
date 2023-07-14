"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, session
from api.models import db, User 
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)
CORS(api, origins=['https://edgardmen-symmetrical-space-guacamole-56pqrpw5x573495x-3000.preview.app.github.dev'])

@api.route('signup', methods=['POST'])
def signup():

    username = request.json.get('username')
    password = request.json.get('password')


    if User.query.filter_by(username=username).first():
        return jsonify(message='Username already registered'), 409  


    new_user = User(username=username, password=password)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(sys.exc_info())
        return jsonify(message='Failed to register user'), 500

    user_id = new_user.id

    return jsonify(message='User registered successfully', user_id=user_id), 201

@api.route('/api/signup', methods=['OPTIONS'])
def options_signup():
    return '', 200

@api.route('login', methods=['POST'])
@api.route('login', methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(username=username).first()

    if user is None or not user.check_password(password):
        return jsonify({"msg": "Incorrect username or password"}), 401

    session['user_id'] = user.id

    return jsonify(user_id=user.id)

@api.route('logged_in', methods=['GET'])
def logged_in():
    user_id = session.get('user_id')
    if user_id is None:
        return jsonify(logged_in=False)
    else:
        return jsonify(logged_in=True)

@api.route('logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200