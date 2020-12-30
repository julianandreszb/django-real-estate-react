from django.contrib.auth import authenticate
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated

from .models import OperationType, PropertyType, City, Neighborhood, Ad, Resource
from .serializers import UserSerializer, OperationTypeSerializerFrontEnd, \
    PropertyTypeSerializerFrontEnd, CitySerializer, NeighborhoodSerializer, AdSerializer
from .utils import Utils


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


def user_login(request):
    if request.method == "POST":

        if request.user.is_authenticated:
            return JsonResponse({
                "error": "Invalid request method."
            }, status=405)

        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        serializer.is_valid()
        user = authenticate(username=serializer.data['username'], password=serializer.data['password'])

        if user:

            token, created = Token.objects.get_or_create(user=user)

            return JsonResponse({
                'user': serializer.data,
                'access_token': token.key,
                'refresh_token': ""
            }, status=201)

            # token_list = AccessToken.objects.filter(user=user).order_by('-id').values(
            #     'token',
            #     'expires',
            #     'refresh_token'
            # )

            # if token_list:
            #     oauth2_provider_accesstoken = token_list[0]
            #     refresh_token = RefreshToken.objects.get(pk=oauth2_provider_accesstoken['refresh_token'])
            #
            #     if refresh_token:
            #         return JsonResponse({
            #             'user': serializer.data,
            #             'access_token': oauth2_provider_accesstoken['token'],
            #             'refresh_token': refresh_token.token
            #         }, status=201)
            #     else:
            #         return JsonResponse(serializer.data, status=201)
            # else:
            #     return JsonResponse(serializer.data, status=201)
        else:
            return JsonResponse({'error': 'Invalid user.'}, status=400)

    else:
        return JsonResponse({
            "error": "Invalid request method."
        }, status=405)


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


def search_ads(request, search_type, pk, operation_type_pk, property_type_pk, page):
    per_page = 9

    if search_type == 'neighborhood':

        list_ads = Ad.objects.filter(neighborhood__id__exact=pk, operation_type__id__exact=operation_type_pk,
                                     property_type__id__exact=property_type_pk)

        paginator = Paginator(list_ads, per_page)
        page_obj = paginator.page(page)
        ad_serializer = AdSerializer(page_obj, many=True)

        json_paginator = Utils.get_json_paginator_information(page_obj)

        return JsonResponse({
            "list_items": ad_serializer.data,
            'paginator': json_paginator
        }, safe=False)

    elif search_type == 'city':

        list_ads = Ad.objects.filter(neighborhood__city_id__exact=pk, operation_type__id__exact=operation_type_pk,
                                     property_type__id__exact=property_type_pk)

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


@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def ad_create(request):
    if request.method == "POST":

        user_id = request.user.pk
        description = request.POST["description"]
        address = request.POST["address"]
        total_area = request.POST["total_area"]
        built_area = request.POST["built_area"]
        rooms = request.POST["rooms"]
        bathrooms = request.POST["bathrooms"]
        parking_lots = request.POST["parking_lots"]
        antiquity = request.POST["antiquity"]
        price = request.POST["price"]
        zip = request.POST["zip"]

        ad = Ad(user_id=user_id,
                neighborhood_id=request.POST["neighborhood"],
                property_type_id=request.POST["property_type"],
                operation_type_id=request.POST["operation_type"],
                description=description,
                address=address,
                total_area=total_area,
                built_area=built_area,
                rooms=rooms,
                bathrooms=bathrooms,
                parking_lots=parking_lots,
                antiquity=antiquity,
                price=price,
                zip=zip
                )
        ad.save()

        # THIS IS WORKING
        # fs = FileSystemStorage(MEDIA_ROOT)
        # image1_file = request.FILES['image1']
        # filename = fs.save(image1_file.name, image1_file)
        # uploaded_file_url = fs.url(filename)

        if request.FILES['image1']:
            uploaded_file_url = Utils.save_image_file(request.FILES['image1'])
            resource = Resource(ad_id=ad.pk, file_path=uploaded_file_url, type='img')
            resource.save()
        if request.FILES['image2']:
            uploaded_file_url = Utils.save_image_file(request.FILES['image2'])
            resource = Resource(ad_id=ad.pk, file_path=uploaded_file_url, type='img')
            resource.save()
        if request.FILES['image3']:
            uploaded_file_url = Utils.save_image_file(request.FILES['image3'])
            resource = Resource(ad_id=ad.pk, file_path=uploaded_file_url, type='img')
            resource.save()
        if request.FILES['image4']:
            uploaded_file_url = Utils.save_image_file(request.FILES['image4'])
            resource = Resource(ad_id=ad.pk, file_path=uploaded_file_url, type='img')
            resource.save()
        if request.FILES['image5']:
            uploaded_file_url = Utils.save_image_file(request.FILES['image5'])
            resource = Resource(ad_id=ad.pk, file_path=uploaded_file_url, type='img')
            resource.save()

        ad_serializer = AdSerializer(ad, many=False)

        return JsonResponse(ad_serializer.data, safe=False, status=201)

        # return JsonResponse({
        #     "ad_id": ad
        # }, status=201)


@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def ad_edit(request, pk):
    if request.method == "POST":
        ad = Ad.objects.get(pk=pk)
        # user_id = request.user.pk
        ad.description = request.POST["description"]
        ad.address = request.POST["address"]
        ad.total_area = request.POST["total_area"]
        ad.built_area = request.POST["built_area"]
        ad.rooms = request.POST["rooms"]
        ad.bathrooms = request.POST["bathrooms"]
        ad.parking_lots = request.POST["parking_lots"]
        ad.antiquity = request.POST["antiquity"]
        ad.price = request.POST["price"]
        ad.zip = request.POST["zip"]

        ad.save()

        ## THIS IS WORKING
        ## fs = FileSystemStorage(MEDIA_ROOT)
        ## image1_file = request.FILES['image1']
        ## filename = fs.save(image1_file.name, image1_file)
        ## uploaded_file_url = fs.url(filename)

        try:
            image1 = request.FILES['image1']
        except:
            image1 = None

        try:
            image2 = request.FILES['image2']
        except:
            image2 = None


        try:
            image3 = request.FILES['image3']
        except:
            image3 = None

        try:
            image4 = request.FILES['image4']
        except:
            image4 = None


        try:
            image5 = request.FILES['image5']
        except:
            image5 = None

        try:

            if request.POST["image1IdDeleted"]:

                resource_image_1 = Resource.objects.get(pk=request.POST["image1IdDeleted"])

                if image1:
                    uploaded_file_url = Utils.save_image_file(image1)
                    resource_image_1.file_path = uploaded_file_url
                    resource_image_1.save()
                else:
                    resource_image_1.delete()

            elif image1:
                uploaded_file_url = Utils.save_image_file(image1)
                resource = Resource(ad_id=pk, file_path=uploaded_file_url, type='img')
                resource.save()

            # ---------------------

            if request.POST["image2IdDeleted"]:

                resource_image_2 = Resource.objects.get(pk=request.POST["image2IdDeleted"])

                if image2:
                    uploaded_file_url = Utils.save_image_file(image2)
                    resource_image_2.file_path = uploaded_file_url
                    resource_image_2.save()
                else:
                    resource_image_2.delete()

            elif image2:
                uploaded_file_url = Utils.save_image_file(image2)
                resource = Resource(ad_id=pk, file_path=uploaded_file_url, type='img')
                resource.save()

            # --------------------

            if request.POST["image3IdDeleted"]:

                resource_image_3 = Resource.objects.get(pk=request.POST["image3IdDeleted"])

                if image3:
                    uploaded_file_url = Utils.save_image_file(image3)
                    resource_image_3.file_path = uploaded_file_url
                    resource_image_3.save()
                else:
                    resource_image_3.delete()

            elif image3:
                uploaded_file_url = Utils.save_image_file(request.FILES['image3'])
                resource = Resource(ad_id=pk, file_path=uploaded_file_url, type='img')
                resource.save()

            # --------------------

            if request.POST["image4IdDeleted"]:

                resource_image_4 = Resource.objects.get(pk=request.POST["image4IdDeleted"])

                if image4:
                    uploaded_file_url = Utils.save_image_file(image4)
                    resource_image_4.file_path = uploaded_file_url
                    resource_image_4.save()
                else:
                    resource_image_4.delete()

            elif image4:
                uploaded_file_url = Utils.save_image_file(image4)
                resource = Resource(ad_id=pk, file_path=uploaded_file_url, type='img')
                resource.save()

            # --------------------

            if request.POST["image5IdDeleted"]:

                resource_image_5 = Resource.objects.get(pk=request.POST["image5IdDeleted"])

                if image5:
                    uploaded_file_url = Utils.save_image_file(image5)
                    resource_image_5.file_path = uploaded_file_url
                    resource_image_5.save()
                else:
                    resource_image_5.delete()

            elif image5:
                uploaded_file_url = Utils.save_image_file(image5)
                resource = Resource(ad_id=pk, file_path=uploaded_file_url, type='img')
                resource.save()
        except:
            pass

        ad_serializer = AdSerializer(ad, many=False)

        return JsonResponse(ad_serializer.data, safe=False, status=201)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def my_ads(request):
    ad = Ad.objects.filter(user_id__exact=request.user.pk)
    ad_serializer = AdSerializer(ad, many=True)
    return JsonResponse(ad_serializer.data, safe=False)


@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_ad_by_id(request, pk):
    Resource.objects.filter(ad_id__exact=pk).delete()
    Ad.objects.get(pk=pk).delete()

    return JsonResponse("Success", safe=False)
