from google.appengine.ext import ndb

class Pulse ():
    def __init__(self,subPulse):
        self.type = subPulse['type']
        self.content = subPulse

class Chat ():
    def __init__(self,channel,user,message):
        self.type = 'chat'
        self.channel = channel
        self.user = user
        self.message = message