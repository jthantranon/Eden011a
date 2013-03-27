import webapp2
import json
#import EdenDataOfficer as edo

#from models import *
from google.appengine.api import users
from google.appengine.ext import ndb
from google.appengine.api import channel
from EdenModels import *
from random import randrange
import EdenHeart as heart




def fAllPixels():
    pixels = Pixel.query().fetch()
    return pixels

def randPixelLoc():
    pixels = fAllPixels()
    for pixel in pixels:
        pixel.loc.x = randrange(-10,10)
        pixel.loc.y = randrange(-10,10)
        pixel.loc.z = randrange(-10,10)
        pixel.put()
        

def fAllPixelIDs(args='none'):
    pixels = fAllPixels()
    if args == 'loc':
        q = []
        randPixelLoc()
        for pixel in pixels:
            pulseloc = PulseLoc(type='pulseloc',origin=pixel.kid,xloc=pixel.loc.x,yloc=pixel.loc.y,zloc=pixel.loc.z)
            q.append(pulseloc.to_dict())
    else:
        q = []
        for pixel in pixels:
            q.append(str(pixel.xID))
    return q    



class Actualize():
    @classmethod
    def Pixel(self):
        xID =  users.get_current_user().user_id()
        source = ndb.Key('Crystal','1').get()
        if source:
            source.uCount += 1
            source.put()
            newID = str(source.uCount)
            pixel = Pixel(id=newID,xID = xID)
            pixel.kid = 'Pixel'+newID
            pixel.name = pixel.kid
            pixel.loc = {'x':0,'y':0,'z':0}
            pixel.put()
            return pixel
        else:
            return source
    @classmethod
    def Sprite(self):
        xID =  'Sprite'
        source = ndb.Key('Crystal','1').get()
        if source:
            source.uCount += 1
            source.put()
            newID = str(source.uCount)
            pixel = Pixel(id=newID,xID = xID+newID)
            pixel.kid = 'Sprite'+newID
            pixel.name = pixel.kid
            pixel.loc = {'x':randrange(-10,10),'y':randrange(-10,10),'z':randrange(-10,10)}
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
                allPixels = fAllPixelIDs()
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

def Broadcast(msg):
    allPixels = fAllPixelIDs()
    for pixel in allPixels:
        channel.send_message(pixel,json.dumps(msg))

class aSession():
    def __init__(self):
        cpix = myPixel().to_dict()
        self.Chan = aChan()
        self.cPixel = cpix
        self.pulse = heart.Pulse(heart.Chat('global', cpix, 'Welcome!').__dict__).__dict__
