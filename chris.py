from google.appengine.api import users
from google.appengine.api import channel

import json
import webapp2
from random import randint



class doChannelStuff(webapp2.RequestHandler):
    def get(self):
        
        tokensalt = randint(1561, 8644242454)
        mytoken = 'ebiduh' + str(tokensalt)
        token = channel.create_channel(mytoken)
        data = { 'token':token, 'clientID':mytoken }
        self.response.out.write(json.dumps(data))
        
        
class doMessageStuff(webapp2.RequestHandler):
    def get(self):
        
        mytoken = self.request.get('token')
        message = self.request.get('message')
        data = {'message':message }
        stringData = json.dumps(data)
        token = channel.send_message(mytoken, stringData)
        #self.response.out.write(json.dumps(data))
        
        
        


app = webapp2.WSGIApplication([
                               ('/chris', doChannelStuff),
                               ('/chris/msg', doMessageStuff),
                               ],debug=True) 