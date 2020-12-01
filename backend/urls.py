from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("operation_types", views.operation_types, name="operation_types"),
    path("property_types", views.property_types, name="property_types"),
    path("user/create", views.user_create, name="user_create"),
    path("search_city_neighborhood/<str:q>", views.search_city_neighborhood, name="search_city_neighborhood"),
]
