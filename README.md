# "Django-real-estate-react" Application
This application use "Django" as backend framework and "React" as frontend javascript library. 
The main idea of this project is implement a simple way to share information about properties for sale and rent.

####Why you did it?
It was an opportunity to improve/deepen my acknowledge in Django and Javascript but also a way to learn a very mentioned javascript library, "REACT JS"!!. So, I think I have achieved my goal

####"Justification for why you believe your project satisfies the distinctiveness and complexity requirements, mentioned above."
I had to learn a lot! of new concepts as well as using everything learned in the "CS50’s Web Programming with Python and JavaScript" course. 
These are some of the things that took me the most time. Among the things I had to learn:
- How to integrate Django with react
- Implement "REST framework" toolkit: It helps me to create frontend JSON responses in an easier way, as well as use Authentication tokens
- Create models with multiple dependencies among them.
- React javascript library and Material-UI framework
- How to use Authentication tokens and protected function based views
- How to use axios multipart-form requests to upload files and JSON data
- Use new es6 features

###Talking about the application:
####A property has the following information:
* Operation Type - One of:
  *  Buy 
  *  Rent 
* Property Type - One of:
  *  Apartment 
  *  House
  *  Land
  *  Farm
  *  Office
  *  WareHouse
  *  Building
  *  Hotel and resort
* Description
* Price
* Total area
* Bathrooms
* Built area
* Parking lots
* Rooms
* Antiquity (In years)
* Address
* Location
  *  City, Neighborhood
* Five slots to upload images

####There are two user roles, GUESS and AUTHENTICATED. 
GUESS user can: 
* Search for existing properties.
* See property details

AUTHENTICATED user can:
* Search for existing properties.
* See property details
* Create new property Ads
* Edit their own property Ads

#### What’s contained in each file you created
There many files so this is a brief description of main components:
* [DIRECTORY]: frontend/src/components/molecules/cards - All components to render property Ads (Some with images, buttons, descriptions)
* frontend/src/components/molecules/dialogs/Dialogs.js - Generic "Loading" and "confirmation" dialogs
* [DIRECTORY]: frontend/src/components/molecules/GridList - All components to render list of images
* frontend/src/components/molecules/operation_type/OperationType.js - Component to select between "BUY" and "RENT"
* frontend/src/components/molecules/property_type/PropertyType.js - Component to select between "HOUSE", "APARTMENT", ETC.
* frontend/src/components/molecules/search/SearchAsynchronous.js - Component to search Cities or Neighborhoods
* [DIRECTORY]: frontend/src/components/organisms/list - All components to render search results 
* frontend/src/components/pages/login/LogIn.js - Used to access the application as authenticated user 
* frontend/src/components/pages/signup/SignUp.js - Create an authenticated user 
* frontend/src/components/pages/dashboard/Dashboard.js - Handle all events, callbacks, sub-components it is like an Index
* frontend/src/components/organisms/ad/CreateAd.js - Allows to create a property Ad including images
* frontend/src/components/organisms/ad/EditAd.js - Allows to edit an existing property Ad
* [DIRECTORY]: frontend/src/components/templates - Templates help to organize all different components in the screen. Do not contain logic
* frontend/src/components/app-context.js - Handle initial states and shared states in all the application
* frontend/src/components/Constants.js - Unified constants in all the application
* backend/models.py - Contains ( Resource, Ad, Neighborhood, City, Department, PropertyType, OperationType, User ) class models
* backend/serializers.py - Helps to serialize all models to JSON 

####Some of followed guides: 
- https://www.valentinog.com/blog/drf/
- https://mattsegal.dev/django*react.html
- https://www.saaspegasus.com/guides/modern*javascript*for*django*developers/integrating*javascript*pipeline/
- https://levelup.gitconnected.com/material*ui*styled*components*fff4d345fb07 
- https://github.com/mui*org/material*ui/tree/master/examples/create*react*app
- https://material*ui.com/styles/basics/#installation
- https://codesandbox.io/s/github/mui*org/material*ui/tree/master/examples/create*react*app?file=/src/index.js
- https://django*oauth*toolkit.readthedocs.io/en/latest/rest*framework/getting_started.html#step*1*minimal*setup
- https://django*oauth*toolkit.readthedocs.io/en/latest/views/function_based.html
- https://react*hook*form.com/
- https://www.taniarascia.com/es6*syntax*and*feature*overview/
- https://reactjs.org/docs/lifting*state*up.html
- https://reactjs.org/docs/faq*structure.html
- https://github.com/danilowoz/react*atomic*design
- https://medium.com/backticks*tildes/visually*breaking*down*ui*components*using*atomic*design*part*1*476e1ddd73ca
- https://atomicdesign.bradfrost.com/chapter*1/
- https://stackoverflow.com/questions/39254562/csrf*with*django*reactredux*using*axios
- https://django*oauth*toolkit.readthedocs.io/en/latest/views/function_based.html
- https://create*react*app.dev/docs/title*and*meta*tags/#injecting*data*from*the*server*into*the*page
- https://www.pluralsight.com/guides/hierarchy*of*components*and*how*to*get*async*data
- https://stackoverflow.com/questions/29459037/generating*an*access*token*programatically*with*django*oauth2*toolkit