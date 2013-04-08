from google.appengine.ext import ndb

#def Pulse(origin,dest,content,subpulse):
#    type = 'Generic'
#    origin = origin
#    dest = dest
#    content = content
#    subpulse = subpulse



#class Pulse ():
#    def __init__(self,origin=None,dest=None,content=None):
#        self.type = 'Generic'
#        self.origin = origin
#        self.dest = dest
#        self.content = content
#    def chat(self,message):
#        self.type = 'Chat'
#        self.message = message
#    def censusCheckIn(self,xloc,yloc,zloc):
#        self.type = 'CensusCheckIn'
#        self.xloc = xloc
#        self.yloc = yloc
#        self.zloc = zloc

class Pulse:
    pulseType = None
    def chat(self,origin,dest,content):
        self.pulseType = 'Chat'
        self.origin = origin
        self.dest = dest
        self.content = content
        return self.__dict__
    def censusCheckIn(self,origin,xloc,yloc,zloc):
        self.pulseType = 'CensusCheckIn'
        self.origin = origin
        self.xloc = xloc
        self.yloc = yloc
        self.zloc = zloc
        self.loc = {'x':xloc,'y':yloc,'z':zloc}
        return self.__dict__