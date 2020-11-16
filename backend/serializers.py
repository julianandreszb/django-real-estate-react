from rest_framework import serializers
from backend.models import User


# https://nemecek.be/blog/23/how-to-createregister-user-account-with-django-rest-framework-api
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', "first_name", "last_name")

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        return User.objects.update(**validated_data)

