from google.appengine.api import users
import webapp2
import jinja2
import os

jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname('templates/')))


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
        sheet = jinja_environment.get_template('sheet.html')
        glass = jinja_environment.get_template('glass.html')
        dialog = jinja_environment.get_template('dialog.html')
        dialogchat = jinja_environment.get_template('dialogchat.html')
        dialogpaged = jinja_environment.get_template('dialogpaged.html')
        tooltip = jinja_environment.get_template('tooltip.html')
        
        
        ## render header
        self.response.out.write(header.render(template_values))
        self.response.out.write(splash.render(template_values))
        self.response.out.write(chat.render(template_values))
        
        ## render snippets
        self.response.out.write(sheet.render(template_values))
        self.response.out.write(glass.render(template_values))
        self.response.out.write(dialog.render(template_values))
        self.response.out.write(dialogchat.render(template_values))
        self.response.out.write(dialogpaged.render(template_values))
        self.response.out.write(tooltip.render(template_values))
        
        ## Footer
        self.response.out.write(footer.render(template_values))
        
app = webapp2.WSGIApplication([
                               ('/', MainPage),
                               ],
                              debug=True) 