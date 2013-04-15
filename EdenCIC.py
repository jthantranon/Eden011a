#from DatabaseModels import PIXEL,ORB
from google.appengine.api import users
from google.appengine.api import channel
from google.appengine.ext import ndb
import json
import webapp2
#import EdenDataOfficer as edo
#import EdenUniCon as euc
#import ProxyModels as prox
from EdenModels import *
import EdenWishes as wish
from random import randrange#import datetime
#import time
#import random
import Eden.Locations as loc
#import Eden.Heart as heart
from Eden.Heart import Pulse

#cXUSE =  users.get_current_user() #External ID = Google ID
#cpix = prox.cPixel()

def jsonify(data):
    thereturn = ''
    if isinstance(data, str) or isinstance(data, list):
        return json.dumps(data)
    else:
        try:
            return json.dumps(data.to_dict())
        except AttributeError:
            try:
                thereturn = json.dumps(data.__dict__)
            except:
                pass
            if thereturn == '':
                thereturn = data
                return thereturn
            else:
                return thereturn

class aSession(webapp2.RequestHandler):
    def get(self):
        sesh = wish.aSession()
        self.response.out.write(jsonify(sesh))

class EdenInit(webapp2.RequestHandler):
    def get(self):
        source = ndb.Key('Crystal','1').get()
        if source:
            pop = []
            for pixel in Pixel.query().fetch():
                pop.append(pixel)
            source.censusData = pop
            source.put()
        else:
            source = Crystal(id='1', name='Eden Source Crystal',info='The Tree of Wisdom.',uCount=0,oCount=0, evekey='adam')
            source.put()
        self.response.out.write(jsonify(source))

#class PopulationUpdate

class WishingWell(webapp2.RequestHandler):
    def get(self):
        wellwish = json.loads(self.request.get('wish'))
        name = wellwish['name']
        try:
            wishargs = wellwish['wishargs']
        except:
            wishargs = None
        if name == 'myPixel':
            grant = wish.myPixel()
        elif name == 'aSession':
            grant = wish.aSession()
        elif name == 'rPulse':
            if wishargs:
                if isinstance(wishargs, dict):
                    wish.PulseRouter(wishargs)
                    grant = wish.myPixel()       
                else:
                    pass
            else:
                pass
        elif name == 'fAllPixelIDs':
            if wishargs:
                grant = wish.fAllPixelIDs(wishargs)
            else:
                grant = wish.fAllPixels()
        elif name == 'updateLoc':
            if wishargs:
                grant = wish.updateLoc(wishargs)
            else:
                grant = 'Need arguments yo!'
        elif name == 'censusUpdate':
            if wishargs:
                grant = loc.UpdateLocations(wishargs).test()
            else:
                grant = 'Need arguments yo!'
        else:
            grant = 'wish not granted'
        #cpix.grant = wish#['name']
        #cpix.anothertest = 'anothertest'
        #self.response.out.write(jsonify(grant))
        self.response.out.write(json.dumps(grant))


class Test(webapp2.RequestHandler):
    def get(self):
#        theout = loc.UpdateLocations(Pulse().censusCheckIn('Pixel2', 42, 42, 42)).test()
#        theout2 = loc.UpdateLocations().test()
        theout3 = loc.UpdateLocations().getStoredCensus()
        theout4 = loc.UpdateLocations().getCachedCensus()
        theout5 = loc.UpdateLocations().checkForPixel('Pixel2')
#        theout6 = loc.UpdateLocations().updateCensusPixel(Pulse().censusCheckIn('Pixel1', 42, 42, 42))
#        theheart = Pulse().chat('Pixel0', 'Pixel0', 'whee')
        
        self.response.out.write(jsonify(theout4))
#        self.response.out.write(theout)

        
#        dice = randrange(0,11)
#        self.response.out.write(str(dice)+'<br>')
#        if dice == 1:
#            wish.Actualize.Sprite()
#        wish.randPixelLoc()
#        pulseloc = PulseLoc()
#        pulseloc.origin = 'Pixel8'
#        pulselocout = wish.updateLoc(pulseloc)
#        theout = wish.fAllPixelIDs('loc')
#        wish.Broadcast(theout[0])
#        self.response.out.write(json.dumps(theout))
#        self.response.out.write('<br>')
#        self.response.out.write('<br>')
#        self.response.out.write(jsonify(pulselocout))
#        #self.response.out.write(theout)

#class Immigration(webapp2.RequestHandler):
#    def get(self):
#        if cXUSE:   self.Customs()
#        else:       self.xLogin()
#    def xLogin(self):
#        self.redirect(users.create_login_url("/"))
#    def Customs(self):
#        cPIXEL = edo.lPIXEL()
#        #cORB = lORB()
#        if cPIXEL:
#            #cpix.data = cPIXEL.to_dict()
#            self.response.out.write(edo.jsonify(cpix))
#            #self.response.write('test')
##            pulse = PULSE.get()
##            pulse.content = 'stuff'
##            pulse.console = 'it worked'
##            pulse.send('system')
##            self.response.out.write(edo.dictsonify(cMUSE))
#        else:
#            pixel = euc.aPIXEL()
#            self.response.out.write(edo.jsonify(pixel))

        
app = webapp2.WSGIApplication([
#                               ('/cic/newSession', NewSession),
#                               ('/cic/incTutorial', IncrementTutorial),
#                               ('/cic/asession', aSession),
                               ('/cic/asession', aSession),
                               ('/cic/edeninit', EdenInit),
                               ('/cic/wishingwell', WishingWell),
                               ('/cic/test', Test),
#                               ('/cic/jsonwish', JSONWish),
#                               ('/cic/pulse', PULSE),
                               ],
                              debug=True) 