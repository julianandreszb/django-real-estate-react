from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("user/create", views.user_create, name="user_create"),
]
