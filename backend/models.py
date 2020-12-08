from django.contrib.auth.models import AbstractUser
from django.db import models


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
