import json
from django.contrib.auth import authenticate
from django.core.files.storage import FileSystemStorage
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from oauth2_provider.decorators import protected_resource
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser

from realestate.settings import MEDIA_ROOT
from .models import OperationType, PropertyType, City, Neighborhood, Ad
from .serializers import UserSerializer, OperationTypeSerializerFrontEnd, \
    PropertyTypeSerializerFrontEnd, CitySerializer, NeighborhoodSerializer, AdSerializer, ResourceSerializer

from oauth2_provider.models import AccessToken, RefreshToken
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


def search_neighborhood(request, q):
    # Search for Neighborhoods
    list_neighborhoods = Neighborhood.objects.filter(name__contains=q)
    neighborhood_serializer = NeighborhoodSerializer(list_neighborhoods, many=True)

    return JsonResponse(neighborhood_serializer.data, safe=False)


# https://chrisbartos.com/articles/uploading-images-drf/
# @api_view(['POST'])
# @parser_classes([FormParser, MultiPartParser])
# @protected_resource()
def ad_create(request):
    if request.method == "POST":
        # data = FormParser().parse(request)
        data = JSONParser().parse(request)

        user = request.user
        # neighborhood = Neighborhood.objects.get(pk=data["neighborhood"])
        # property_type = PropertyType.objects.get(pk=data["property_type"])
        # operation_type = OperationType.objects.get(pk=data["operation_type"])
        description = data["description"]
        address = data["address"]
        total_area = data["total_area"]
        built_area = data["built_area"]
        rooms = data["rooms"]
        bathrooms = data["bathrooms"]
        parking_lots = data["parking_lots"]
        antiquity = data["antiquity"]
        price = data["price"]
        zip = data["zip"]

        ad = Ad(user_id=11,
                neighborhood_id=data["neighborhood"],
                property_type_id=data["property_type"],
                operation_type_id=data["operation_type"],
                description=description,
                address=address,
                total_area=total_area,
                built_area=built_area,
                rooms=rooms,
                bathrooms=bathrooms,
                parking_lots=parking_lots,
                antiquity=antiquity,
                price=price
                )
        ad.save()

        # data = JSONParser().parse(request)
        # serializer = AdSerializer(data=data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return JsonResponse(serializer.data, status=201)
        #

        return JsonResponse(
            data["description"]
            , safe=False)

        # return JsonResponse({
        #     # 'neighborhood': neighborhood,
        #     # 'user': user,
        #     # 'property_type': property_type,
        #     # 'operation_type': operation_type,
        #     'description': description,
        #     'address': address,
        #     'total_area': total_area,
        #     'built_area': built_area,
        #     'rooms': rooms,
        #     'bathrooms': bathrooms,
        #     'parking_lots': parking_lots,
        #     'antiquity': antiquity,
        #     'price': price,
        # }, safe=False)

        # ---------------------------------------------------------------------------------

        # data = FormParser().parse(request)
        # data = MultiPartParser().parse(request)
        # serializer = ResourceSerializer(data=data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return JsonResponse(serializer.data, status=201)

        # return JsonResponse({
        #     "uploaded_file_url": 'uploaded_file_url'
        # })
        # return JsonResponse(serializer.errors_as_array_object, status=400)

    # def ad_create(request):
    #     if request.method == "POST":
    #
    #
    #         # TODO TEST THIS USING Class Based Views https://stackoverrun.com/es/q/8300506
    #         # TODO if it does not work, create the Ad object manually
    # ------------------------------------------------------------

    # return JsonResponse({
    #     "address": request.POST["address"]
    # })

    # json_data = json.loads(request.body)

    # data = JSONParser().parse(request)
    # serializer = AdSerializer(data=data)
    # if serializer.is_valid():
    #     serializer.save()
    #     return JsonResponse(serializer.data, status=201)
    # return JsonResponse(serializer.errors_as_array_object, status=400)

    # ----------------------------------------------------------------------------------

    # ad = Ad()
    #
    # tmp_file = request.FILES['file']
    # fs = FileSystemStorage(MEDIA_ROOT)
    # filename = fs.save(tmp_file.name, tmp_file)
    # uploaded_file_url = fs.url(filename)
    #
    # return JsonResponse({
    #     "uploaded_file_url": uploaded_file_url
    # })
    #
    return JsonResponse({
        "address": request.POST["address"]
    })
