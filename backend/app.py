from flask import Flask,request,jsonify,session
import mysql.connector
from flask_session import Session
import json
from flask_cors import CORS
from datetime import timedelta
import cv2
import wtforms
import numpy as np
import pickle
from PIL import Image
import tensorflow
from tensorflow.keras.preprocessing.image import img_to_array
app = Flask(__name__)



app.config["SECRET_KEY"] = 'Fahad'
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
#app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=30)



Session(app)
CORS(app,supports_credentials=True)
#dictionary=True
model = tensorflow.keras.models.load_model(r'backend\vgg19-95acc-with-nonplant-and-nonsupported.h5')
labels = pickle.load(open(r'backend\label_transform_new_set.pkl', 'rb'))
EPOCHS = 25
INIT_LR = 1e-3
BS = 32
default_image_size = tuple((256, 256))
image_size = 0
width=256
height=256
depth=3

@app.route('/')
def index():
    return 'Hello World!'

@app.route('/image', methods=['POST'])
def getImage():
    
    
    imageFile = request.files.get('img')
    print(imageFile)
    img = Image.open(imageFile)
    img = np.array(img)
    img = cv2.resize(img, default_image_size)   
    img = cv2.cvtColor(np.array(img), cv2.COLOR_BGR2RGB)
    np_image = np.array(img, dtype=np.float16) / 225.0
    np_image = np.expand_dims(np_image,0)
    pred_result = model.predict(np_image)
    total_result = str(labels.inverse_transform(pred_result)[0])
    total_result = total_result.split("___")
    total_result[0] = (total_result[0]).replace("__"," ")
    total_result[1] = (total_result[1]).replace("_", " ")
    mydb = mysql.connector.connect(host="localhost",user="root",passwd="root",database="mydb")
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(f"select * from disease where plant_name like '{total_result[0]}' and disease like '{total_result[1]}'")
    result = cursor.fetchone()
    print(result['plant_name'])
  
    dct_result = {'plant_name':total_result[0],'disease':total_result[1],'probability':str(np.max(pred_result)),'description':result['description'],'treatment':result['treatment']}
    cursor.close()
    return dct_result

@app.route('/login', methods=['POST'])
def login():
    mydb = mysql.connector.connect(host="localhost",user="root",passwd="root",database="mydb")
    cursor = mydb.cursor(dictionary=True)
    email = request.json['email']
    password = request.json['password']
    remember = request.json['remember']
    cursor.execute(f"select * from users where email like '{email}' and password like '{password}'")
    result = cursor.fetchone()
    if result:
        if remember == 'on':
            
            session.permanent = True
            app.permanent_session_lifetime  = timedelta(days=31)
            session.clear()
            session['user'] = email
        
        else:
            print('here')
            session.permanent = False
            session.clear()
            session['user'] = email
        cursor.close()
        return 'success'
    
    else:
        cursor.close()
        return 'error'

@app.route('/logout',methods=['POST'])
def logout():

    session.pop("user")
    session.clear()
    return 'success'
   

@app.route('/@logged',methods=['POST'])
def getUser():
    
    if 'user' in session:
        return session['user']

    else:
        return 'UNAUTHORIZED'
    
   

@app.route('/register', methods=['POST'])
def register():
    
    email = request.json['email']
    password = request.json['password']
    confirm_password = request.json['confirm-password']
    if password != confirm_password:
        return 'error'
    
    if findByEmail(email,password):
        return 'success'
    
    else:
        return 'error'






def findByEmail(email,password):
    mydb = mysql.connector.connect(host="localhost",user="root",passwd="root",database="mydb")
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(f"select * from users where email like '{email}'")
    result = cursor.fetchmany()
    if len(result) == 1:
        cursor.close()
        return False
    
    else:
        print('log')
        cursor.execute(f"INSERT INTO users (email,password) values ('{email}','{password}')")
        mydb.commit()
        cursor.close()
        return True


if __name__ == '__main__':
    app.run(debug=True)