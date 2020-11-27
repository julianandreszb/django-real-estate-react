from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from oauth2_provider.decorators import protected_resource
from rest_framework.parsers import JSONParser

from .models import OperationType, PropertyType
from .serializers import UserSerializer, OperationTypeSerializer, OperationTypeSerializerFrontEnd, \
    PropertyTypeSerializerFrontEnd


@protected_resource()
@ensure_csrf_cookie
def index(request):
    return render(request, 'frontend/index.html')


def user_create(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors_as_array_object, status=400)

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


def operation_types(request):
    array_operation_types = OperationType.objects.all()

    serializer = OperationTypeSerializerFrontEnd(array_operation_types, many=True)

    return JsonResponse(serializer.data, safe=False)


def property_types(request):
    array_property_types = PropertyType.objects.all()

    serializer = PropertyTypeSerializerFrontEnd(array_property_types, many=True)

    return JsonResponse(serializer.data, safe=False)
