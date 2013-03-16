from google.appengine.api import users
from google.appengine.ext import ndb
import webapp2
#import EdenWishes as wish
import EdenCIC as cic
from EdenModels import *

#import json
#import EdenDataOfficer as edo
#import EdenUniCon as euc
#import datetime
#import time
#import json
#import random
#from google.appengine.api import channel


#class Eden(webapp2.RequestHandler):
#    def get(self):
#        source = ndb.Key('Crystal','1').get()
#        if source:
#            pass
#        else:
#            source = Crystal(id='1',name='Eden Source Crystal',info='The Tree of Wisdom.',uCount=0,oCount=0, evekey='adam')
#            source.put()
#        self.response.out.write(cic.jsonify(source))
#
#app = webapp2.WSGIApplication([('/eden', Eden),
#                               ],
#                              debug=True) 