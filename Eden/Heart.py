from google.appengine.ext import ndb

class Pulse ():
    def __init__(self,origin=None,dest=None,content=None):
        self.type = 'Generic'
        self.origin = origin
        self.dest = dest
        self.content = content
    def chat(self,message):
        self.type = 'Chat'
        self.message = message
    def censusCheckIn(self,xloc,yloc,zloc):
        self.type = 'CensusCheckIn'
        self.xloc = xloc
        self.yloc = yloc
        self.zloc = zloc