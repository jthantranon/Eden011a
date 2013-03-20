import webapp2
import json
#import EdenDataOfficer as edo

#from models import *
from google.appengine.api import users
from google.appengine.ext import ndb
from google.appengine.api import channel
from EdenModels import *
import EdenHeart as heart




def fAllPixels():
    q = []
    
    pixels = Pixel.query().fetch()
    
    for pixel in pixels:
        q.append(str(pixel.xID))
    allPixelKIDs = q
    return allPixelKIDs    

class Actualize():
    @classmethod
    def Pixel(self):
        xID =  users.get_current_user().user_id() #might have to move this into private scopes? may have sesh persist problems
        source = ndb.Key('Crystal','1').get()
        if source:
            source.uCount += 1
            source.put()
            newID = str(source.uCount)
            pixel = Pixel(id=newID,xID = xID)
            pixel.kid = 'Pixel'+newID
            pixel.name = pixel.kid
            pixel.put()
            return pixel
        else:
            return source

class PulseRouter():
    type = ''
    content = {}
    
    def __init__(self,pulse):
        self.type = pulse['type']
        self.content = pulse['content']
        
        if self.type == 'chat':
            
            if self.content['scope'] == 'global':
                allPixels = fAllPixels()
                for pixel in allPixels:
                    channel.send_message(pixel,json.dumps(self.content))
                    #channel.send_message(apixel, self.content)

def myPixel():
    xID =  users.get_current_user().user_id() #might have to move this into private scopes? may have sesh persist problems
    myPixel = Pixel.query(Pixel.xID == xID).get()
    if myPixel:
        return myPixel
    else:
        return Actualize.Pixel()

def aChan():
    xID =  users.get_current_user().user_id() #might have to move this into private scopes? may have sesh persist problems
    token = channel.create_channel(xID,1440)
    channel.send_message(xID,json.dumps('42'))
    return token

class aSession():
    def __init__(self):
        cpix = myPixel().to_dict()
        self.Chan = aChan()
        self.cPixel = cpix
        self.pulse = heart.Pulse(heart.Chat('global', cpix, 'Welcome!').__dict__).__dict__
    

