from google.appengine.ext import ndb

class Source(ndb.Model):
    name = ndb.StringProperty()
    xID = ndb.StringProperty()
    kid = ndb.StringProperty()

class Pixel(ndb.Expando,Source):
    kind = 'Pixel'

class Crystal(ndb.Expando,Source):
    kind = 'Crystal'
    censusData = ndb.JsonProperty()
    
#class Pulse(ndb.Model):
#    type = ndb.StringProperty()
#    origin = ndb.StringProperty()
#
#class PulseLoc(Pulse):
#    xloc = ndb.FloatProperty()
#    yloc = ndb.FloatProperty()
#    zloc = ndb.FloatProperty()