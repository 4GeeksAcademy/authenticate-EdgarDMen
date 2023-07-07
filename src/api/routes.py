"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    # Retrieve request data
    username = request.json.get('username')
    password = request.json.get('password')

    # Check if the email is already registered
    if User.query.filter_by(username=username).first():
        return jsonify(message='Username already registered'), 409  

    # Create a new user object
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


@api.route('/login', methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    # Perform authentication
    user = User.query.filter_by(username=username).first()

    # Check user and password validity
    if user is None or not user.check_password(password):
        return jsonify({"msg": "Incorrect username or password"}), 401

    # Generate access token
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token, user_id=user.id)



@api.route('/logout', methods=['POST'])
def logout():
    # Remove the stored access token from the session
    session.pop('access_token', None)
    return jsonify({'message': 'Logged out successfully'}), 200