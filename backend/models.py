from django.contrib.auth.models import AbstractUser
from django.db import models
from realestate.settings import MEDIA_ROOT


class User(AbstractUser):
    pass


class OperationType(models.Model):
    class Meta:
        db_table = "backend_operation_type"

    name = models.CharField(max_length=10)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }


class PropertyType(models.Model):
    class Meta:
        db_table = "backend_property_type"

    name = models.CharField(max_length=30)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }


class Department(models.Model):
    class Meta:
        db_table = "backend_department"

    name = models.CharField(max_length=30)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }


class City(models.Model):
    class Meta:
        db_table = "backend_city"

    name = models.CharField(max_length=30)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="cities")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "department": self.department
        }


class Neighborhood(models.Model):
    class Meta:
        db_table = "backend_neighborhood"

    name = models.CharField(max_length=30)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="neighborhoods")


class Ad(models.Model):
    class Meta:
        db_table = "backend_ad"

    neighborhood = models.ForeignKey(Neighborhood, on_delete=models.CASCADE, related_name="neighborhood_ads")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_ads")
    property_type = models.ForeignKey(PropertyType, on_delete=models.CASCADE, related_name="property_type_ads",
                                      default=None)
    operation_type = models.ForeignKey(OperationType, on_delete=models.CASCADE, related_name="operation_type_ads",
                                       default=None)
    description = models.TextField(max_length=500)
    address = models.TextField(max_length=100)
    total_area = models.IntegerField()
    built_area = models.IntegerField()
    rooms = models.IntegerField()
    bathrooms = models.IntegerField()
    parking_lots = models.IntegerField()
    antiquity = models.IntegerField()
    price = models.DecimalField(max_digits=20, decimal_places=0)
    zip = models.TextField(max_length=15, blank=True)

    def serialize(self):
        return {
            "id": self.id,
            "neighborhood": self.neighborhood,
            "user": self.user,
            "property_type": self.property_type,
            "operation_type": self.operation_type,
            "description": self.description,
            "address": self.address,
            "total_area": self.total_area,
            "built_area": self.built_area,
            "rooms": self.rooms,
            "bathrooms": self.bathrooms,
            "parking_lots": self.parking_lots,
            "antiquity": self.antiquity,
            "price": self.price,
            "zip": self.zip
        }


class Resource(models.Model):
    class Meta:
        db_table = "backend_resource"

    ad = models.ForeignKey(Ad, on_delete=models.CASCADE, related_name="ad_resources")
    type = models.TextField(max_length=10)
    file_path = models.TextField(max_length=100, default=None)

    def serialize(self):
        return {
            "id": self.id,
            "ad": self.ad,
            "type": self.type,
            "file_path": self.file_path
        }
