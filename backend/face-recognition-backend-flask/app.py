from flask import Flask, jsonify, request, make_response

from flask_cors import CORS
import json
import cv2
from PIL import Image
import base64
import io
import os
import shutil
import time
from face_rec import FaceRec
import face_recognition
import numpy as np


app = Flask(__name__)
# app.debug= True
CORS(app)

@app.route('/api', methods=['GET','POST'])
def api():
    data = request.get_json()
    print(data)
    resp ="Nobody"
    directory = './stranger'
    if data :
        if(os.path.exists(directory)):
            shutil.rmtree(directory)
        
        if not os.path.exists(directory):
            try:
                os.mkdir(directory)
                time.sleep(1)
                result = data['data']
                b = bytes(result,'utf-8')
                image = b[b.find(b',')+1:]
                # print (image)
                im = Image.open(io.BytesIO(base64.b64decode(image)))
                im.save(directory+"/stranger.jpeg")

                img = face_recognition.load_image_file("./stranger/stranger.jpeg")
                faceRec = FaceRec(img)

                unknownName = faceRec.check_mark_attendence()
                if len(unknownName) !=0:
                    resp = unknownName
                else:
                    resp = "All faces attendence marked already "

                # print(resp)
            except:
                print("Some error occured")
                pass

    # print(resp)

    return jsonify(resp)

@app.route("/getEncodings",methods=["GET","POST"])
def getEncodings():
    data = request.get_json()
    directory = './userImages'
    if data :
        if(os.path.exists(directory)):
            shutil.rmtree(directory)
        
        if not os.path.exists(directory):
            try:
                os.mkdir(directory)
                time.sleep(1)
                result = data['data']
                b = bytes(result,'utf-8')
                image = b[b.find(b',')+1:]
                # print (image)
                im = Image.open(io.BytesIO(base64.b64decode(image)))
                im.save(directory+"/userImage.jpeg")

                img = face_recognition.load_image_file(directory+"/userImage.jpeg")
                facesCurrFrame = face_recognition.face_locations(img)
                encodeCurrFrame = face_recognition.face_encodings(img,facesCurrFrame)

                print("Hii"+ encodeCurrFrame)
                if(len(encodeCurrFrame)!=0):
                    return jsonify({"encodeList":np.array(encodeCurrFrame).tolist()})
                else:
                    return make_response(jsonify({"error":"No face detected. Try with a new file"}),406)
                
            except:
                print("Some error occured")
                pass




@app.route("/getAllEncodings",methods=["GET",'POST'])
def getAllEncodings():
    path = './images'
    images = []
    className = []
    myList = os.listdir(path)
    print(myList)

    for cl in myList:
        curImg = face_recognition.load_image_file(f'{path}/{cl}')
        images.append(curImg)
        className.append(cl.split(".")[0])

    encodeList = []
    for img in images:
        # print("Hii")
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)  
    print(encodeList[0])

    return jsonify({"encodeList":np.array(encodeList[0]).tolist()})


if __name__ == '__main__':
    app.run()