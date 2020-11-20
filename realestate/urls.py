from django.contrib import admin
from django.urls import path, include

admin.autodiscover()

urlpatterns = [
    path('', include('frontend.urls')),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('admin/', admin.site.urls),
    path('api/', include('backend.urls')),
]
