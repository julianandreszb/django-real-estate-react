from django.urls import path
# from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("operation_types", views.operation_types, name="operation_types"),
    path("property_types", views.property_types, name="property_types"),
    path("user/create", views.user_create, name="user_create"),
    # path("r'^user/create/$", views.user_create, name="user_create"),
    path("ad/create", views.ad_create, name="ad_create"),
    path("ad/edit/<int:pk>", views.ad_edit, name="ad_edit"),
    path("user/login", views.user_login, name="user_login"),
    # path('user/api-token-auth', obtain_auth_token, name='api_token_auth'),
    path("search_city_neighborhood/<str:q>", views.search_city_neighborhood, name="search_city_neighborhood"),
    path("search_neighborhood/<str:q>", views.search_neighborhood, name="search_neighborhood"),
    path("search_ads/<str:search_type>/<int:pk>/<int:operation_type_pk>/<int:property_type_pk>/<int:page>", views.search_ads, name="search_ads"),
    path("ad/<int:pk>", views.search_ad_by_id, name="search_ad_by_id"),
    path("delete_ad/<int:pk>", views.delete_ad_by_id, name="delete_ad_by_id"),
    path("my_ads", views.my_ads, name="my_ads"),
]
