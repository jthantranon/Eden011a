from google.appengine.api import users
from google.appengine.api import channel

import json
import webapp2
from random import randint


class checkCredentials(webapp2.RequestHandler):
    def get(self):
        
        tokensalt = randint(1561, 8644242454)
        mytoken = 'ebiduh' + str(tokensalt)
        token = channel.create_channel(mytoken)
        data = { 'token':token, 'clientID':mytoken }
        self.response.out.write(json.dumps(data))
        
        
class doNothing(webapp2.RequestHandler):
    def get(self):
        self.response.out.write('successfully did nothing...')
        
        
        


app = webapp2.WSGIApplication([
                               ('/app/authenticate', checkCredentials),
                               ('/app/donothing', doNothing),
                               ],debug=True) 