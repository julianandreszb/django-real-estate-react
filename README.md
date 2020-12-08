# django-real-estate-react
Sale and rent properties. Application created in Django and React.

Guides Followed: 
- https://www.valentinog.com/blog/drf/
- https://mattsegal.dev/django-react.html
- https://www.saaspegasus.com/guides/modern-javascript-for-django-developers/integrating-javascript-pipeline/

Material UI and Styled Components
- https://levelup.gitconnected.com/material-ui-styled-components-fff4d345fb07 
- https://github.com/mui-org/material-ui/tree/master/examples/create-react-app
- https://material-ui.com/styles/basics/#installation



TODO: Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.
 https://codesandbox.io/s/github/mui-org/material-ui/tree/master/examples/create-react-app?file=/src/index.js
 
 OAuth2
  * https://django-oauth-toolkit.readthedocs.io/en/latest/rest-framework/getting_started.html#step-1-minimal-setup
 *  https://django-oauth-toolkit.readthedocs.io/en/latest/views/function_based.html
 
 Forms:
 https://medium.com/codefully-io/react-forms-validation-with-formik-and-material-ui-1adf0c1cae5c
    Use React Hook Form  instead: https://react-hook-form.com/
    
ES6 syntax and feature overview: 
https://www.taniarascia.com/es6-syntax-and-feature-overview/

https://reactjs.org/docs/lifting-state-up.html

- react router

- https://reactjs.org/docs/faq-structure.html

react-atomic-design:
* https://github.com/danilowoz/react-atomic-design
* https://medium.com/backticks-tildes/visually-breaking-down-ui-components-using-atomic-design-part-1-476e1ddd73ca
    * https://atomicdesign.bradfrost.com/chapter-1/

https://stackoverflow.com/questions/39254562/csrf-with-django-reactredux-using-axios


----

python3 manage.py createsuperuser
    user: admin
    password: admin
    email: admin@admin.com
    
http://127.0.0.1:8000/admin/oauth2_provider/application/add/
ClientID: xxx 
ClientSecret: YYY 

curl -X POST -d "grant_type=password&username=admin&password=admin" -u"fyOfdrlh67DNU1zWgtU0RgFqwhsmUkj1cQ6FEjrN:dcRpkqpbEVsidRgT3HQtnL80t5KiVG5wxocYIyTlHuilNWUksJV5vEP3ZWULS6PBA8yUECu8gHZHOiwWiBupPN3sHhgjZKR00fEwhoNsDlj6nby3I4MputXXhDqGhxPC" http://127.0.0.1:8000/o/token/
curl -X POST -d "grant_type=password&username=admin&password=admin" -u"dcRpkqpbEVsidRgT3HQtnL80t5KiVG5wxocYIyTlHuilNWUksJV5vEP3ZWULS6PBA8yUECu8gHZHOiwWiBupPN3sHhgjZKR00fEwhoNsDlj6nby3I4MputXXhDqGhxPC" http://127.0.0.1:8000/o/token/
    {
        "access_token": "vgHEQ30JkYXHV2w8WYXQszedy3NOAT", 
        "expires_in": 36000, 
        "token_type": "Bearer", 
        "scope": "read write groups", 
        "refresh_token": "QXVCukgAsZt5DVyp5syjn8ic2L7Lq2"
    }

https://django-oauth-toolkit.readthedocs.io/en/latest/views/function_based.html

https://create-react-app.dev/docs/title-and-meta-tags/#injecting-data-from-the-server-into-the-page


https://create-react-app.dev

---

Pending to implement https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html

https://www.sitepoint.com/replace-redux-react-hooks-context-api/

Axios, initialize state, useEffect
https://www.pluralsight.com/guides/hierarchy-of-components-and-how-to-get-async-data



{search_type}		-	{department_id}			- 	{city_id}		-	neighborhood_id 		= 	Result
C: City				-	32: valle del cauca		-	10: Cali 		-							=	C-32-10 
N: Neighborhood		-	32: valle del cauca		-	10: Cali		-	50: Calimio Desepaz		=	N-32-10-50

[
   {
        search_type: "C",
        department: {
            id: 32,
            name: "valle del cauca"    
        },
        city: {
            id: 10,
            name: "Cali"
        }
    },
    {
        search_type: "N",
        department: {
            id: 32,
            name: "valle del cauca"    
        },
        city: {
            id: 10,
            name: "Cali"
        }
        neighborhood: {
            id: 50,
            name : "Calimio Desepaz"
        }
    }
]
[
	{
		value: "N-32-10",
		label: "Cali, Valle del cauca"
	},
	{
		value: "N-32-10-50",
		label: "Calimio Desepaz, Cali, Valle del cauca"
	}
]

https://stackoverflow.com/questions/29459037/generating-an-access-token-programatically-with-django-oauth2-toolkit

    # https://docs.djangoproject.com/en/3.1/topics/auth/default/

    # ----------------

    # https://www.django-rest-framework.org/api-guide/authentication/
