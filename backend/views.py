from django.http import JsonResponse
from django.shortcuts import render
from oauth2_provider.decorators import protected_resource
from rest_framework.parsers import JSONParser

from .serializers import UserSerializer


@protected_resource()
def index(request):
    return render(request, 'frontend/index.html')


def user_create(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    return JsonResponse({'testkey': 'testvalue'})

    # User
    #
    # if request.method == "POST":
    #     username = request.POST["username"]
    #     email = request.POST["email"]
    #
    #     # Ensure password matches confirmation
    #     password = request.POST["password"]
    #     confirmation = request.POST["confirmation"]
    #     if password != confirmation:
    #         return render(request, "network/register.html", {
    #             "message": "Passwords must match."
    #         })
    #
    #     # Attempt to create new user
    #     try:
    #         user = User.objects.create_user(username, email, password)
    #         user.save()
    #     except IntegrityError:
    #         return render(request, "network/register.html", {
    #             "message": "Username already taken."
    #         })
    #     login(request, user)
    #     return HttpResponseRedirect(reverse("index"))
    # else:
    #     return render(request, "network/register.html")
