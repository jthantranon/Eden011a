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
    
    	# code for hiding stuff that needs to start hidden
    	template_values = {
            'hide': 'display:none;'
        }        
        
        # main page base        
    	header = jinja_environment.get_template('header.html')
        footer = jinja_environment.get_template('footer.html')
    	
    	# modules
        splash = jinja_environment.get_template('splash.html')
    	chat = jinja_environment.get_template('chat.html')
    	# glass = jinja_environment.get_template('glass.html')
    	# console = jinja_environment.get_template('console.html')
    	# location = jinja_environment.get_template('location.html')
    	# inventory = jinja_environment.get_template('inventory.html')
    	# avatarsheet = jinja_environment.get_template('avatarsheet.html')

        self.response.out.write(header.render(template_values))
        self.response.out.write(chat.render(template_values))
        #self.response.out.write(glass.render(template_values))
        #self.response.out.write(console.render(template_values))
        #self.response.out.write(location.render(template_values))
        #self.response.out.write(inventory.render(template_values))
        #self.response.out.write(avatarsheet.render(template_values))
        self.response.out.write(footer.render(template_values))
        
app = webapp2.WSGIApplication([
                               ('/', MainPage),
                               ],
                              debug=True) 