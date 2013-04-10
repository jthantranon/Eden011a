from google.appengine.api import users

from google.appengine.ext import webapp
from google.appengine.ext.webapp import util

import webapp2
import jinja2
import os

jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname('templates/')))

script_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname('js/')))


class MainPage(webapp2.RequestHandler):
    def get(self):
        
        # login bruh!
        if users.get_current_user():
            url = users.create_logout_url(self.request.uri)
            url_linktext = 'Logout'
        else:
            url = users.create_login_url(self.request.uri)
            url_linktext = 'Login'
            
        
#        vendorlist = [ f for f in os.listdir('js/vendor') if os.path.isfile(os.path.join('js/vendor',f))]
#        jslist = [ f for f in os.listdir('js/') if os.path.isfile(os.path.join('js/',f))]
#        me3dlist = [ f for f in os.listdir('js/me3d') if os.path.isfile(os.path.join('js/me3d',f))]
#        meuilist = [ f for f in os.listdir('js/meui') if os.path.isfile(os.path.join('js/meui',f))]
        
        
        ## sort file list      
    
    	# code for hiding stuff that needs to start hidden
    	template_values = {
            'hide': 'display:none;',
#            'vendorlist': vendorlist,
#            'jslist': jslist,
#            'me3dlist': me3dlist,
#            'meuilist': meuilist            
        }        
        
        
        
        # main page base        
    	header = jinja_environment.get_template('header.html')
        footer = jinja_environment.get_template('footer.html')
    	
    	# modules
        splash = jinja_environment.get_template('splash.html')
    	chat = jinja_environment.get_template('chat.html')
    	
        # snippets
        sheetTPL = jinja_environment.get_template('sheet.html')
        glassTPL = jinja_environment.get_template('glass.html')
        newglassTPL = jinja_environment.get_template('newglass.html')
        dialogTPL = jinja_environment.get_template('dialog.html')
        dialogchatTPL = jinja_environment.get_template('dialogchat.html')
        dialogpagedTPL = jinja_environment.get_template('dialogpaged.html')
        tooltipTPL = jinja_environment.get_template('tooltip.html')

        # SCRIPTS
        ####################
#        jquery = os.path.join(os.path.split(__file__)[0], 'js/vendor/jquery-1.9.1.js')
#        jqueryui = os.path.join(os.path.split(__file__)[0], 'js/vendor/jquery-ui-1.10.2.custom.min.js')
#        livequery = os.path.join(os.path.split(__file__)[0], 'js/vendor/jquery.livequery.js')
#        knockout = os.path.join(os.path.split(__file__)[0], 'js/vendor/knockout-2.2.1.js')
#        #knockout = os.path.join(os.path.split(__file__)[0], 'js/vendor/knockout-2.2.1.js')
#        stats = os.path.join(os.path.split(__file__)[0], 'js/vendor/stats.min.js')
#        three = os.path.join(os.path.split(__file__)[0], 'js/vendor/three.js')
#        tween = os.path.join(os.path.split(__file__)[0], 'js/vendor/tween.min.js')
#        sparks = os.path.join(os.path.split(__file__)[0], 'js/vendor/sparks.js')
#        cannon = os.path.join(os.path.split(__file__)[0], 'js/vendor/cannon.js')
#        meui = os.path.join(os.path.split(__file__)[0], 'js/meui.js')
#        ## <!-- <script src="js/meui/meui.channel.js"></script>
#        ## <script src="js/meui/meui.chatbox.js"></script> -->
#        sheet = os.path.join(os.path.split(__file__)[0], 'js/meui/meui.sheet.js')
#        dialog = os.path.join(os.path.split(__file__)[0], 'js/meui/meui.dialog.js')
#        dialogchat = os.path.join(os.path.split(__file__)[0], 'js/meui/meui.dialogchat.js')
#        dialogpaged = os.path.join(os.path.split(__file__)[0], 'js/meui/meui.dialogpaged.js')
#        glass = os.path.join(os.path.split(__file__)[0], 'js/meui/meui.glass.js')
#        slideglass = os.path.join(os.path.split(__file__)[0], 'js/meui/meui.slideglass.js')
#        logintab = os.path.join(os.path.split(__file__)[0], 'js/meui/meui.logintab.js')
#        tooltip = os.path.join(os.path.split(__file__)[0], 'js/meui/meui.tooltip.js')
#        contextmenu = os.path.join(os.path.split(__file__)[0], 'js/meui/meui.contextmenu.js')
#        testglass = os.path.join(os.path.split(__file__)[0], 'js/meui/meui.testglass.js')
#        me3d = os.path.join(os.path.split(__file__)[0], 'js/me3d.js')
#        UIControl = os.path.join(os.path.split(__file__)[0], 'js/UIControl.js')
#        interactions = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.interactions.js')
#        entity = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.entity.js')
#        system = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.system.js')
#        scene = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.scene.js')
#        physics = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.physics.js')
#        population = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.population.js')
#        emitter = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.emitter.js')
#        sparks = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.sparks.js')
#        picker = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.picker.js')
#        bounds = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.bounds.js')
#        stage = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.stage.js')
#        grid = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.grid.js')
#        avatar = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.avatar.js')
#        testcube = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.testcube.js')
#        builder = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.builder.js')
#        controls = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.controls.js')
#        transitions = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.transitions.js')
#        render = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.render.js')
#        world = os.path.join(os.path.split(__file__)[0], 'js/me3d/me3d.world.js')
#        main = os.path.join(os.path.split(__file__)[0], 'js/main.js')
       
        
        ## render header
        self.response.out.write(header.render(template_values))
        self.response.out.write(splash.render(template_values))
        self.response.out.write(chat.render(template_values))
        
        ## render snippets
        self.response.out.write(sheetTPL.render(template_values))
        self.response.out.write(glassTPL.render(template_values))
        self.response.out.write(newglassTPL.render(template_values))
        self.response.out.write(dialogTPL.render(template_values))
        self.response.out.write(dialogchatTPL.render(template_values))
        self.response.out.write(dialogpagedTPL.render(template_values))
        self.response.out.write(tooltipTPL.render(template_values))
        
        
        ## JS Code
        ##############################
#        self.response.out.write('<script>')
#        
#        self.response.out.write(open(jquery,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(jqueryui,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(livequery,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(knockout,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(stats,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(three,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(tween,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(sparks,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(cannon,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(meui,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(sheet,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(dialog,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(dialogchat,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(dialogpaged,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(glass,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(slideglass,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(logintab,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(tooltip,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(contextmenu,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(testglass,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(me3d,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(UIControl,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(interactions,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(entity,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(system,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(system,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(scene,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(physics,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(population,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(emitter,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(sparks,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(picker,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(bounds,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(stage,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(grid,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(avatar,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(testcube,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(builder,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(controls,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(transitions,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(render,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(world,'r').read())
#        self.response.out.write('\n')
#        self.response.out.write(open(main,'r').read())
#        self.response.out.write('\n')
#        
#        self.response.out.write('</script>')
        
        
        
        ## Footer
        self.response.out.write(footer.render(template_values))
        
app = webapp2.WSGIApplication([
                               ('/', MainPage),
                               ],
                              debug=True) 