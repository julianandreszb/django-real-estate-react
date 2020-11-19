from rest_framework import serializers
from backend.models import User


# https://nemecek.be/blog/23/how-to-createregister-user-account-with-django-rest-framework-api
class UserSerializer(serializers.ModelSerializer):
    @property
    def errors_as_array_object(self):
        """
        Returns full errors formatted as per requirements
        """
        default_errors = self.errors  # default errors dict
        errors_messages = []
        counter = 0
        for field_name, field_errors in default_errors.items():
            for field_error in field_errors:
                errors_messages.append({"key": counter, "value": field_error})
                counter += 1
        return {'errors': errors_messages}

    class Meta:
        model = User
        fields = ('username', 'email', "first_name", "last_name")

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        return User.objects.update(**validated_data)


