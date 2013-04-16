from google.appengine.api import users
from google.appengine.api import channel
from google.appengine.api import memcache

import json
import webapp2
from random import randint
from EdenModels import *


from datetime import *
from datetime import timedelta

#import Heart as heart
from Eden.Heart import Pulse

###
# census dataset == { staleDate: compileTime, pixels: dataset }
# pixel data == { "origin": "Pixel23", "yloc": 0.5, "type": "pulseloc", "zloc": 5.755794178239267, "xloc": 15.666031862935426 }
# when sending back to client, just send the pixels and not the compiletime
###

class UpdateLocations(webapp2.RequestHandler):
#    memcache = memcache.Client
    ##########################
    ## EXECUTION  
    ##########################
    currentPixel = {} 
    def __init__(self,pulse={'origin':'Pixel0','xloc':2,'yloc':3,'zloc':0,'pulseType':'loctype'}):
        self.currentPixel = pulse
#        self.currentPixel['origin'] = pulse['origin']
#        self.currentPixel['xloc'] = pulse['xloc']
#        self.currentPixel['yloc'] = pulse['yloc']
#        self.currentPixel['zloc'] = pulse['zloc']
#        self.currentPixel['pulseType'] = pulse['pulseType']
    
    def test(self):
#        cache = self.getStoredCensus()
        dataset = self.getCachedCensus()
        self.updateCensusPixel(self.currentPixel, dataset)
        memcache.set('census', dataset)
        return memcache.get('census')
#        thetest = datetime.now() - memcache.get('censusDeltaRaw')
#        if thetest > timedelta(minutes=11):
#            thetest ='over 12 minutes'
#        return thetest

        
    
    ##########################
    ## HELPERS  
    ##########################
    def getStoredCensus(self):
    ## returns pixel data from the server
    ###################################################
        crystal = ndb.Key('Crystal','1').get()
        try:
#            censusDelta = crystal.censusDelta
            memcache.set('censusDelta',crystal.censusDelta)
            memcache.set('censusDeltaRaw',datetime.now())
        except AttributeError:
            crystal.censusDelta = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            memcache.set('censusDelta',datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
            memcache.set('censusDeltaRaw',datetime.now())
            crystal.put()
        storedCensus = crystal.censusData
        
        memcache.set('census',storedCensus)
        
#        return storedCensus
        return crystal.censusData
    
    def getCachedCensus(self):
    # checks to see if there is data in cache or
    # returns stored data if none
    ###################################################        
        census = memcache.get('census')
        if census is not None:
            return census 
        else:
            return self.getStoredCensus()
            #census = getStoredCensus()
            #staleTime = now() + timedelta(minutes=15)
#            staleTime = 12345
#            census = { 'staleDate': staleTime, 'pixels': [] }                
#            return census

    def checkForPixel(self,pixelID='Pixel0',dataset=memcache.get('census')):
    ## checks to see if current Pixel already
    ## exists in the cached dataset
    ###################################################
        hasPixel = False
        for pixel in dataset:
            if pixel['kid'] == pixelID:
                hasPixel = True
        return hasPixel
    

    def updateCensusPixel(self,censusCheckInPulse,dataset=memcache.get('census')):
    ## updates an already existing pixel's location
    ###################################################
        try:
            myKID = censusCheckInPulse['origin']
        except AttributeError:
            pass
        if dataset[myKID]:
            dataset[myKID]['xloc'] = censusCheckInPulse['xloc']
            dataset[myKID]['yloc'] = censusCheckInPulse['yloc']
            dataset[myKID]['zloc'] = censusCheckInPulse['zloc']
            dataset[myKID]['loc'] = censusCheckInPulse['loc']
#        for pixel in dataset:
#            if pixel['kid'] == censusCheckInPulse['origin']:
#                pixel['xloc'] = censusCheckInPulse['xloc']
#                pixel['yloc'] = censusCheckInPulse['yloc']
#                pixel['zloc'] = censusCheckInPulse['zloc']
#                pixel['loc'] = censusCheckInPulse['loc']
        memcache.set('census',dataset)
        saveDelta = datetime.now() - memcache.get('censusDeltaRaw')
        if saveDelta > timedelta(seconds=5):
#        if saveDelta > timedelta(minutes=1):
            crystal = ndb.Key('Crystal','1').get()
#            pop = []
#            for pixel in Pixel.query().fetch():
#                pop.append(pixel.to_dict())
            crystal.censusData = dataset
            crystal.censusDelta = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            memcache.set('censusDelta',datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
            memcache.set('censusDeltaRaw',datetime.now())
            crystal.put()
        return dataset
    
#    ## addCensusPixel()
#    ## adds current pixel to census cache
#    ###################################################
#    def addCensusPixel(updatePixel,dataset):
#        
#        newIndex = len(dataset['pixels'])
#        dataset['pixels'].append(updatePixel) 
#        
#        return dataset
#    
#    
#    ## populateCensus()
#    ## replaces census cache with updated data
#    ###################################################
#    def populateCensus(dataset):
#         
#        return memcache.set('census', dataset)
#    
#    
#    # isStoredCensusStale()
#    # check to see if the data stored on the server
#    # needs to be update with the memcache census
#    ###################################################
#    def isStoredCensusStale(censusData):
#        isStale = False
#        
#        if censusData['staleDate'] > datetime.now():
#            isStale = True
#        
#        return isStale
#    
#    
#    # dumpCensus()
#    # dumps memcache census data to datastore
#    ###################################################
#    def dumpCensus(dataset):
#        
#        staleTime = datetime.now() + timedelta(minutes=15)
#        dataset['stateDate'] = staleTime     
#        
#        #  do anything else needed and dump the data in datastore
#        return True
#    
#          
#    
#        
#    
#    # see if we got data from the client
#    if currentPixel['origin'] == '':
#        census = getCachedCensus() # get current census data
#        
#        ## export data to client
#        data = census['pixels']
#        self.response.out.write(json.dumps(data))
#    
#    else:
#           
#        census = getCachedCensus() # get current census data
#        
#        # check to see if the pixel is in the set, then update or add
#        if checkForPixel(currentPixel['origin'],census):
#            census = updateCensusPixel(currentPixel,census)
#        else:
#            census = addCensusPixel(currentPixel,census)
#           
#        # ok, the census data is updated now; still left todo:
#        ## check to see if stored data is stale
#        # if isStoredCensusStale(census):
#            #dumpCensus(census)
#            
#        # check for stale pixels
#        # will add this later
#                    
#        ## update the memcache
#        populateCensus(census)
#        
#        ## export data to client
#        data = census['pixels']
#        self.response.out.write(json.dumps(data))
#                    
#          
#        
#
#
#app = webapp2.WSGIApplication([
##                               ('/locations', LocationManager),
#                               ('/locations/update', UpdateLocations)
#                               ],debug=True) 


## Example data!!
#################
# { "origin": "Pixel23", "yloc": 0.5, "type": "pulseloc", "zloc": 5.755794178239267, "xloc": 15.666031862935426 }

# [{ "origin": "Pixel23",
#    "yloc": 0.5,
#    "type": "pulseloc",
#    "zloc": 5.755794178239267,
#    "xloc": 15.666031862935426},
#    { "origin": "Pixel24",
#      "yloc": 0.5,
#      "type": "pulseloc",
#      "zloc": 2.6689939765916053,
#      "xloc": -0.692400696978783},
#    {"origin": "Pixel25", "yloc": 0.5, "type": "pulseloc", "zloc": 10.716030295963094, "xloc": 10.308249760331},
#    {"origin": "Pixel8", "yloc": 0.5, "type": "pulseloc", "zloc": 1.652465221936805, "xloc": 4.071529397029736}]