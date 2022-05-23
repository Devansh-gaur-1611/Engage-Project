from flask import Flask, jsonify, request, make_response
import requests
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


@app.route('/markAttendence', methods=['GET','POST'])
def markAttendence():
    data = request.get_json()
    # print(data)
    resp ="Nobody"
    if data :
        try:
            # r = requests.get("https://api.github.com/events")
            # abc=r.json()
            # print(r[0])
            # print(abc[0]['id'],abc[0]['actor'])
            result = data['data']
            b = bytes(result,'utf-8')
            image = b[b.find(b',')+1:]
            # print (image)
            im = Image.open(io.BytesIO(base64.b64decode(image)))
            img = cv2.cvtColor(np.array(im), cv2.COLOR_BGR2RGB)
            faceRec = FaceRec(img)

            unknownName = faceRec.check_mark_attendence()
            if len(unknownName) !=0:
                resp = unknownName
            else:
                resp = "All faces attendence marked already "
            return jsonify(resp)
            # print(resp)
        except:
            print("Some error occured")
            # pass
            return make_response(jsonify({"error":"Some internal error occured"}),500)
    else:
        return make_response(jsonify({"error":"Bad response"}),400)    
    # print(resp)


@app.route("/getEncodings",methods=["GET","POST"])
def getEncodings():
    data = request.get_json()
    # print(data)
    
    if data :
        
        
        try:
            print("created")
            result = data['data']
            b = bytes(result,'utf-8')
            image = b[b.find(b',')+1:]
            im = Image.open(io.BytesIO(base64.b64decode(image)))
            img = cv2.cvtColor(np.array(im), cv2.COLOR_BGR2RGB)
            facesCurrFrame = face_recognition.face_locations(img)
            encodeCurrFrame = face_recognition.face_encodings(img,facesCurrFrame)

            print("Hii")
            if(len(encodeCurrFrame)==1):
                return make_response(jsonify({"encodeList":np.array(encodeCurrFrame).tolist()}),200)
            elif(len(encodeCurrFrame)>1):
                return make_response(jsonify({"error":"More than one face detected. Try with a new image file"}),406)
            else:
                return make_response(jsonify({"error":"No face detected. Try with a new image file"}),406)
            
        except:

            print("Some error occured")
            return make_response(jsonify({"error":"Some internal error occured"}),500)
    else:
        return make_response(jsonify({"error":"Bad response"}),400)            


if __name__ == '__main__':
    app.run()