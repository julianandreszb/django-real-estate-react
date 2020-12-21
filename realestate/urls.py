from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

admin.autodiscover()

urlpatterns = [
                  path('', include('frontend.urls')),
                  path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
                  path('admin/', admin.site.urls),
                  path('api/', include('backend.urls')),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
