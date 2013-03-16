import webapp2
import json
#import EdenDataOfficer as edo

#from models import *
from google.appengine.api import users
from google.appengine.ext import ndb
from google.appengine.api import channel
from EdenModels import *
import EdenHeart as heart

xID =  str(users.get_current_user().user_id()) #might have to move this into private scopes? may have sesh persist problems


class Actualize():
    @classmethod
    def Pixel(self):
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

def aChan():
    token = channel.create_channel(xID,1440)
    return token

def myPixel():
    myPixel = Pixel.query(Pixel.xID == xID).get()
    if myPixel:
        return myPixel
    else:
        return Actualize.Pixel()

class aSession():
    def __init__(self):
        cpix = myPixel().to_dict()
        self.Chan = aChan()
        self.cPixel = cpix
        self.pulse = heart.Chat('global', cpix, 'Welcome!').__dict__
    

