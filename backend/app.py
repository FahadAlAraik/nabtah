from flask import Flask,request,jsonify,session,send_file,make_response
import mysql.connector
from flask_session import Session
import json
from flask_cors import CORS
from datetime import timedelta
import cv2
from werkzeug.utils import secure_filename
import wtforms
import numpy as np
import pickle
from PIL import Image
import tensorflow
import base64
from datetime import datetime
import io
import os
from tensorflow.keras.preprocessing.image import img_to_array
app = Flask(__name__)







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
    
    
    #Adjust Image for the Machine Learning Model
    imageFile = request.files.get('img')
    img = Image.open(imageFile,'r')
    img = np.array(img)
    img = cv2.resize(img, default_image_size)   
    img = cv2.cvtColor(np.array(img), cv2.COLOR_BGR2RGB)
    np_image = np.array(img, dtype=np.float16) / 225.0
    np_image = np.expand_dims(np_image,0)
    #Result of the Prediction
    pred_result = model.predict(np_image)
    accuracy = str(np.max(pred_result)) # get the accuracy of the result
    plant_name = str(labels.inverse_transform(pred_result)[0]).replace("___"," ") # get the identification name
    today = (datetime.now()).strftime("%d/%m/%Y %H:%M:%S")# this is a timestamp for using it as a primay key in history database
    phoneNumber = request.cookies.get('phone_number') # get the phone number in cookie because it is the primary key for database
    # if the image is not a plant
    if labels.inverse_transform(pred_result)[0] == 'Non___plant':
        #database connection
        mydb = mysql.connector.connect(host="localhost",user="root",passwd="root",database="mydb")
        cursor = mydb.cursor(dictionary=True)
        #process the image/ save it/ transform it into a blob value/ then remove it from os
        imageFile = request.files['img']
        img = Image.open(imageFile,'r')
        fileType = imageFile.content_type.split('/')[-1]
        img.save(f"test.{fileType}")
        blob_value = open(f'test.{fileType}', 'rb').read()
        os.remove(f'test.{fileType}')
        #insert query in history table
        sql = 'INSERT INTO history(Phone_Number,Plant_Name,date,accuracy,Image) VALUES(%s,%s,%s,%s,%s)'    
        args = (phoneNumber,plant_name,today,accuracy,blob_value)
        cursor.execute(sql,args)
        mydb.commit()
        cursor.close()
        return {'plant_name':plant_name,'disease':'N/A','probability':accuracy,'description':'This image is not a plant','treatment':'No suggested treatment'}
    
    elif labels.inverse_transform(pred_result)[0] == 'Non___supported___plant':
        #database connection
        mydb = mysql.connector.connect(host="localhost",user="root",passwd="root",database="mydb")
        cursor = mydb.cursor(dictionary=True)
        #process the image/ save it/ transform it into a blob value/ then remove it from os
        imageFile = request.files['img']
        img = Image.open(imageFile,'r')
        fileType = imageFile.content_type.split('/')[-1]
        img.save(f"test.{fileType}")
        blob_value = open(f'test.{fileType}', 'rb').read()
        os.remove(f'test.{fileType}')
        #insert query in history table
        sql = 'INSERT INTO history(Phone_Number,Plant_Name,date,accuracy,Image) VALUES(%s,%s,%s,%s,%s)'    
        args = (phoneNumber,plant_name,today,accuracy,blob_value)
        cursor.execute(sql,args)
        mydb.commit()
        cursor.close()
        return {'plant_name':plant_name,'disease':'N/A','probability':accuracy,'description':'We are sorry, this plant is currently not supported yet','treatment':'No suggested treatment'}

    else:
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
        
        #process the image/ save it/ transform it into a blob value/ then remove it from os
        imageFile = request.files['img']
        img = Image.open(imageFile,'r')
        fileType = imageFile.content_type.split('/')[-1]
        img.save(f"test.{fileType}")
        blob_value = open(f'test.{fileType}', 'rb').read()
    
        os.remove(f'test.{fileType}')
        #insert query in history table
        sql = 'INSERT INTO history(Phone_Number,Plant_Name,date,accuracy,Image) VALUES(%s,%s,%s,%s,%s)'    
        args = (phoneNumber,plant_name,today,accuracy,blob_value)
        cursor.execute(sql,args)
        mydb.commit()
        cursor.close()
        return dct_result

@app.route('/login', methods=['POST'])
def login():
    mydb = mysql.connector.connect(host="localhost",user="root",passwd="root",database="mydb")
    cursor = mydb.cursor(dictionary=True)
    phone_number = request.json['phone-number']
   
    password = request.json['password']
    remember = request.json['remember']
    cursor.execute(f"select * from user where Phone_Number like '{phone_number}' and Password like '{password}'")
    result = cursor.fetchone()
    
    if result:
        if remember == 'on':
            
           
           
            
            res = make_response(result['First_Name'],200)
            res.set_cookie('user',result['First_Name'],expires=None,max_age=timedelta(days=31)) 
            res.set_cookie('phone_number',phone_number,expires=None,max_age=timedelta(days=31))
            cursor.close()
            return res

        else:
            print('here')
            res = make_response(result['First_Name'],200)
            res.set_cookie('user',result['First_Name'],expires=None) 
            res.set_cookie('phone_number',phone_number,expires=None)
            cursor.close()
            return res
    
    else:
        cursor.close()
        return 'error'

@app.route('/logout',methods=['POST'])
def logout():

    res = make_response('LoggedOut')
    res.delete_cookie('user')
    res.delete_cookie('phone_number')
    
    return res
   

@app.route('/@logged',methods=['POST'])
def getUser():
    
    if 'user' in session:
        
        return session['user']

    else:
        return 'UNAUTHORIZED'
    

@app.route('/getCookie')
def getCookie():
  
    print('user' in request.cookies)
    return '5'
   

@app.route('/register', methods=['POST'])
def register():
    phone_number = request.json['phone-number']
    password = request.json['password']
    confirm_password = request.json['confirm-password']
    first_name = request.json['first-name']
    last_name = request.json['last-name']
    if password != confirm_password:
        return 'error'
    
    if findByPhoneNumber(phone_number,password,first_name,last_name):
        return 'success'
    
    else:
        return 'error'
    
   

@app.route('/history')
def history():
    mydb = mysql.connector.connect(host="localhost",user="root",passwd="root",database="mydb")
    cursor = mydb.cursor(dictionary=True)
    phoneNumber = request.cookies.get('phone_number') # get the phone number in cookie because it is the primary key for database
    cursor.execute(f"select * from history where Phone_Number like '{phoneNumber}'")
    result = cursor.fetchall()
    res = []
    for data in result:
        img = data['Image']
        predictionName = data['Plant_Name']
        timestamp = data['date']
        accuracy = data['accuracy']
        file_like2 = io.BytesIO(img)
        img1=Image.open(file_like2)
        base64_encoded= base64.b64encode(img)
        base64_encoded_string= base64_encoded.decode('utf-8')
        tempArr = []
        tempArr.append(predictionName)
        tempArr.append(base64_encoded_string)
        tempArr.append(timestamp)
        tempArr.append(accuracy)
        res.append(tempArr)
    
    
   
    return res


@app.route('/getAccount')
def getAccount():
    if 'user' in request.cookies:
        phoneNumber = request.cookies.get('phone_number')
        mydb = mysql.connector.connect(host="localhost",user="root",passwd="root",database="mydb")
        cursor = mydb.cursor(dictionary=True)
        cursor.execute(f"select * from user where Phone_Number like '{phoneNumber}'")
        result = cursor.fetchmany()
        return result
    else:
        return 'ERROR'

@app.route('/editAccount',methods=['POST'])
def editAccount():
    firstName = request.json['fname']
    lastName = request.json['lname']
    phone_number = request.cookies.get('phone_number')
    password = request.json['password']
    mydb = mysql.connector.connect(host="localhost",user="root",passwd="root",database="mydb")
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(f"update user set Password='{password}', First_Name='{firstName}', Last_Name='{lastName}' where Phone_Number like '{phone_number}' ")
    mydb.commit()
    cursor.close()
    return 'edited'

def findByPhoneNumber(phone_number,password,first_name,last_name):
    mydb = mysql.connector.connect(host="localhost",user="root",passwd="root",database="mydb")
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(f"select * from user where Phone_Number like '{phone_number}'")
    result = cursor.fetchmany()
    if len(result) == 1:
        cursor.close()
        return False
    
    else:
        
        cursor.execute(f"INSERT INTO user (Phone_Number,Password,First_Name,Last_Name) values ('{phone_number}','{password}','{first_name}','{last_name}')")
        mydb.commit()
        cursor.close()
        return True


if __name__ == '__main__':
    app.run(debug=True)

