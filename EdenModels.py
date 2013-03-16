from google.appengine.ext import ndb

class Source(ndb.Model):
    name = ndb.StringProperty()
    xID = ndb.StringProperty()
    kid = ndb.StringProperty()
class Pixel(ndb.Expando,Source):
    kind = 'Pixel'

class Pulse (ndb.Expando,Source):
    pass

class Crystal(ndb.Expando,Source):
    kind = 'Crystal'