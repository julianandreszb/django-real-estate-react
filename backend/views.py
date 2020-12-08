import json
from django.contrib.auth import authenticate
from django.core import serializers
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from oauth2_provider.decorators import protected_resource
# from oauth2_provider import
from rest_framework.authtoken.models import Token
from rest_framework.parsers import JSONParser

from .models import OperationType, PropertyType, City, Neighborhood
from .serializers import UserSerializer, OperationTypeSerializerFrontEnd, \
    PropertyTypeSerializerFrontEnd, CitySerializer, NeighborhoodSerializer

from oauth2_provider.models import AccessToken, RefreshToken


# from rest_framework.authtoken.views import ObtainAuthToken
# from rest_framework.authtoken.models import Token


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
    else:
        return JsonResponse({
            "error": "Invalid request method."
        }, status=405)

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


def user_login(request):
    if request.method == "POST":

        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        serializer.is_valid()
        user = authenticate(username=serializer.data['username'], password=serializer.data['password'])

        if user:
            token_list = AccessToken.objects.filter(user=user).order_by('-id').values(
                'token',
                'expires',
                'refresh_token'
            )

            if token_list:
                oauth2_provider_accesstoken = token_list[0]
                refresh_token = RefreshToken.objects.get(pk=oauth2_provider_accesstoken['refresh_token'])

                if refresh_token:
                    return JsonResponse({
                        'user': serializer.data,
                        'access_token': oauth2_provider_accesstoken['token'],
                        'refresh_token': refresh_token.token
                    }, status=201)
                else:
                    return JsonResponse(serializer.data, status=201)
            else:
                return JsonResponse(serializer.data, status=201)
        else:
            return JsonResponse({'error': 'Invalid user.'}, status=400)

    else:
        return JsonResponse({
            "error": "Invalid request method."
        }, status=405)

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


def search_city_neighborhood(request, q):
    list_cities = City.objects.filter(name__contains=q)
    city_serializer = CitySerializer(list_cities, many=True)

    list_neighborhoods = Neighborhood.objects.filter(name__contains=q)
    neighborhood_serializer = NeighborhoodSerializer(list_neighborhoods, many=True)

    list_result = city_serializer.data + neighborhood_serializer.data

    return JsonResponse(list_result, safe=False)
    # return JsonResponse(city_serializer.data, safe=False)
    #
    # # TODO - Next, search for neighborhood

    # return JsonResponse({
    #     "PT": {
    #         "index-entry-number": "147",
    #         "entry-number": "147",
    #         "entry-timestamp": "2016-04-05T13:23:05Z",
    #         "key": "PT",
    #         "item": [
    #             {
    #                 "country": "PT",
    #                 "official-name": "The Portuguese Republic",
    #                 "name": "Portugal",
    #                 "citizen-names": "Portuguese"
    #             }
    #         ]
    #     },
    #     "PW": {
    #         "index-entry-number": "140",
    #         "entry-number": "140",
    #         "entry-timestamp": "2016-04-05T13:23:05Z",
    #         "key": "PW",
    #         "item": [
    #             {
    #                 "country": "PW",
    #                 "official-name": "The Republic of Palau",
    #                 "name": "Palau",
    #                 "start-date": "1994-10-01",
    #                 "citizen-names": "Palauan"
    #             }
    #         ]
    #     }
    # }, safe=False)
