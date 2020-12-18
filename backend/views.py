import json
from django.contrib.auth import authenticate
from django.core import serializers
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from oauth2_provider.decorators import protected_resource
# from oauth2_provider import
from rest_framework.authtoken.models import Token
from rest_framework.parsers import JSONParser

from .models import OperationType, PropertyType, City, Neighborhood, Ad
from .serializers import UserSerializer, OperationTypeSerializerFrontEnd, \
    PropertyTypeSerializerFrontEnd, CitySerializer, NeighborhoodSerializer, AdSerializer

from oauth2_provider.models import AccessToken, RefreshToken

# from rest_framework.authtoken.views import ObtainAuthToken
# from rest_framework.authtoken.models import Token
from .utils import Utils


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
    # Search for Cities
    list_cities = City.objects.filter(name__contains=q)
    city_serializer = CitySerializer(list_cities, many=True)

    # Search for Neighborhoods
    list_neighborhoods = Neighborhood.objects.filter(name__contains=q)
    neighborhood_serializer = NeighborhoodSerializer(list_neighborhoods, many=True)

    # Merge result
    list_result = city_serializer.data + neighborhood_serializer.data

    return JsonResponse(list_result, safe=False)


def search_ads(request, search_type, pk, page):
    per_page = 9

    if search_type == 'neighborhood':

        list_ads = Ad.objects.filter(neighborhood__id__exact=pk)

        paginator = Paginator(list_ads, per_page)
        page_obj = paginator.page(page)
        ad_serializer = AdSerializer(page_obj, many=True)

        json_paginator = Utils.get_json_paginator_information(page_obj)

        return JsonResponse({
            "list_items": ad_serializer.data,
            'paginator': json_paginator
        }, safe=False)

    elif search_type == 'city':

        list_ads = Ad.objects.filter(neighborhood__city_id__exact=pk)

        paginator = Paginator(list_ads, per_page)
        page_obj = paginator.page(page)
        ad_serializer = AdSerializer(page_obj, many=True)

        json_paginator = Utils.get_json_paginator_information(page_obj)

        return JsonResponse({
            'list_items': ad_serializer.data,
            'paginator': json_paginator
        }, safe=False)

    return JsonResponse({"error": "Invalid search type."}, safe=False)


def search_ad_by_id(request, pk):
    ad = Ad.objects.get(pk=pk)
    ad_serializer = AdSerializer(ad, many=False)
    return JsonResponse(ad_serializer.data, safe=False)
