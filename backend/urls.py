from django.urls import path
# from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("operation_types", views.operation_types, name="operation_types"),
    path("property_types", views.property_types, name="property_types"),
    path("user/create", views.user_create, name="user_create"),
    path("user/login", views.user_login, name="user_login"),
    # path('user/api-token-auth', obtain_auth_token, name='api_token_auth'),
    path("search_city_neighborhood/<str:q>", views.search_city_neighborhood, name="search_city_neighborhood"),
]
