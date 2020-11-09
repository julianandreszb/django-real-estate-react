from django.shortcuts import render
from oauth2_provider.decorators import protected_resource


@protected_resource()
def index(request):
    return render(request, 'frontend/index.html')
