#from google.appengine.api import users
#from google.appengine.api import channel
#from google.appengine.api import memcache
#
#import json
#import webapp2
#from random import randint
#from EdenModels import *
#
#
#from datetime import *
#from datetime import timedelta
#
####
## census dataset == { staleDate: compileTime, pixels: dataset }
## pixel data == { "origin": "Pixel23", "yloc": 0.5, "type": "pulseloc", "zloc": 5.755794178239267, "xloc": 15.666031862935426 }
## when sending back to client, just send the pixels and not the compiletime
####
#
#
#class UpdateLocations(webapp2.RequestHandler):
#    def get(self):
#              
#        ##########################
#        ## HELPERS  
#        ##########################
#        
#        # getCachedCensus()
#        # checks to see if there is data in cache or
#        # returns stored data if none
#        ###################################################
#        def getCachedCensus():
#            
#            census = memcache.get('census')
#            
#                        
#            if census is not None:
#                return census
#            else:
#                #census = getStoredCensus()
#                #staleTime = now() + timedelta(minutes=15)
#                staleTime = 12345
#                census = { 'staleDate': staleTime, 'pixels': [] }                
#                return census
#        
#            
#        ## getStoredCensus()
#        ## returns pixel data from the server
#        ###################################################
#        def getStoredCensus():
#            
#            census = Pixel.query().fetch()
#            return census
#        
#        
#        ## checkForPixel()
#        ## checks to see if current Pixel already
#        ## exists in the cached dataset
#        ###################################################
#        
#        def checkForPixel(pixelID,dataset):
#             
#            hasPixel = False
#            
#            for pixel in dataset['pixels']:
#                if pixel['origin'] == pixelID:
#                    hasPixel = True
#            
#            return hasPixel
#        
#        
#        ## updateCensusPixel()
#        ## updates an already existing pixel's location
#        ###################################################
#        def updateCensusPixel(updatePixel,dataset):
#            
#            for pixel in dataset['pixels']:
#                if pixel['origin'] == updatePixel['origin']:
#                    pixel['xloc'] = updatePixel['xloc']
#                    pixel['yloc'] = updatePixel['yloc']
#                    pixel['zloc'] = updatePixel['zloc']
#            
#            #self.response.out.write(json.dumps(dataset))
#                          
#            return dataset
#        
#        
#        ## addCensusPixel()
#        ## adds current pixel to census cache
#        ###################################################
#        def addCensusPixel(updatePixel,dataset):
#            
#            newIndex = len(dataset['pixels'])
#            dataset['pixels'].append(updatePixel) 
#            
#            return dataset
#        
#        
#        ## populateCensus()
#        ## replaces census cache with updated data
#        ###################################################
#        def populateCensus(dataset):
#             
#            return memcache.set('census', dataset)
#        
#        
#        # isStoredCensusStale()
#        # check to see if the data stored on the server
#        # needs to be update with the memcache census
#        ###################################################
#        def isStoredCensusStale(censusData):
#            isStale = False
#            
#            if censusData['staleDate'] > datetime.now():
#                isStale = True
#            
#            return isStale
#        
#        
#        # dumpCensus()
#        # dumps memcache census data to datastore
#        ###################################################
#        def dumpCensus(dataset):
#            
#            staleTime = datetime.now() + timedelta(minutes=15)
#            dataset['stateDate'] = staleTime     
#            
#            #  do anything else needed and dump the data in datastore
#            return True
#        
#              
#        ##########################
#        ## EXECUTION  
#        ##########################
#        currentPixel = {} 
#        currentPixel['origin'] = self.request.get('pixel[origin]')
#        currentPixel['xloc'] = self.request.get('pixel[xloc]')
#        currentPixel['yloc'] = self.request.get('pixel[yloc]')
#        currentPixel['zloc'] = self.request.get('pixel[zloc]')
#        currentPixel['type'] = self.request.get('pixel[type]')
#        
#        
#        # see if we got data from the client
#        if currentPixel['origin'] == '':
#            census = getCachedCensus() # get current census data
#            
#            ## export data to client
#            data = census['pixels']
#            self.response.out.write(json.dumps(data))
#        
#        else:
#               
#            census = getCachedCensus() # get current census data
#            
#            # check to see if the pixel is in the set, then update or add
#            if checkForPixel(currentPixel['origin'],census):
#                census = updateCensusPixel(currentPixel,census)
#            else:
#                census = addCensusPixel(currentPixel,census)
#               
#            # ok, the census data is updated now; still left todo:
#            ## check to see if stored data is stale
#            # if isStoredCensusStale(census):
#                #dumpCensus(census)
#                
#            # check for stale pixels
#            # will add this later
#                        
#            ## update the memcache
#            populateCensus(census)
#            
#            ## export data to client
#            data = census['pixels']
#            self.response.out.write(json.dumps(data))
#                    
#          
#        
#
#
#app = webapp2.WSGIApplication([
##                               ('/locations', LocationManager),
#                               ('/locations/update', UpdateLocations)
#                               ],debug=True) 
#
#
### Example data!!
##################
## { "origin": "Pixel23", "yloc": 0.5, "type": "pulseloc", "zloc": 5.755794178239267, "xloc": 15.666031862935426 }
#
## [{ "origin": "Pixel23",
##    "yloc": 0.5,
##    "type": "pulseloc",
##    "zloc": 5.755794178239267,
##    "xloc": 15.666031862935426},
##    { "origin": "Pixel24",
##      "yloc": 0.5,
##      "type": "pulseloc",
##      "zloc": 2.6689939765916053,
##      "xloc": -0.692400696978783},
##    {"origin": "Pixel25", "yloc": 0.5, "type": "pulseloc", "zloc": 10.716030295963094, "xloc": 10.308249760331},
##    {"origin": "Pixel8", "yloc": 0.5, "type": "pulseloc", "zloc": 1.652465221936805, "xloc": 4.071529397029736}]