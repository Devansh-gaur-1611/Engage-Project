import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime

class FaceRec:

    def __init__(self,unknownImage):
        self.unknownImage = unknownImage


    def markAttendence(self,name):
        with open("attendence.csv",'r+') as f:
            myDataList = f.readlines()
            nameList = []

            for line in myDataList:
                value_arr = line.split(",")
                print(value_arr)
                now = datetime.now()
                dateString = now.strftime("%d/%m/%y")
                print(dateString)
                if(len(value_arr)!=3):
                    continue
                print(value_arr[2])
                if(value_arr[2]== dateString or value_arr[2]== dateString+"\n"):
                    nameList.append(value_arr[0])
                    
                else:
                    f.truncate(0)
                    print("Truncated")
                    myDataList = f.readlines()
            print(nameList)
            if name not in nameList:
                now = datetime.now()
                timeString = now.strftime("%H:%M:%S")
                dateString = now.strftime("%d/%m/%y")
                f.writelines(f'\n{name},{timeString},{dateString}')
                return name
            else:
                return ""

    def findEncodings(self,images):
        print("Hello")
        encodeList = []
        for img in images:
            # print("Hii")
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            encode = face_recognition.face_encodings(img)[0]
            encodeList.append(encode)
            # print(encode)
        return encodeList
    

    

    def check_mark_attendence(self):
        path = './images'
        images = []
        className = []
        myList = os.listdir(path)
        print(myList)
        name = ""
        facesCurrFrame = face_recognition.face_locations(self.unknownImage)
        encodeCurrFrame = face_recognition.face_encodings(self.unknownImage,facesCurrFrame)
        print(encodeCurrFrame)
        if(len(facesCurrFrame)==0):
            return ["No face detected"]

        for cl in myList:
            curImg = face_recognition.load_image_file(f'{path}/{cl}')
            images.append(curImg)
            className.append(cl.split(".")[0])
            

        print(len(images))
        encodeListKnown = self.findEncodings(images)
        print(len(encodeListKnown))

        imgS=cv2.resize(self.unknownImage,(0,0),None,0.25,0.25)
        imgS=cv2.cvtColor(imgS,cv2.COLOR_BGR2RGB)

        
        # print(facesCurrFrame,encodeCurrFrame,"Hii")
        attendee = []
        for encodeFace,faceLoc in zip(encodeCurrFrame,facesCurrFrame):
            matches = face_recognition.compare_faces(encodeListKnown,encodeFace)
            faceDis = face_recognition.face_distance(encodeListKnown,encodeFace)
            print("NoHii")

            print(matches)

            matchIndex=np.argmin(faceDis)
            if matches[matchIndex]:
                name = className[matchIndex].upper()
                attendeeName = self.markAttendence(name)
                if(attendeeName !=""):
                    attendee.append(name)
            else:
                attendee.append("Unknown Face Detected")    

        return attendee
       


