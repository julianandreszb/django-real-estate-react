from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from backend.models import User, OperationType


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
                errors_messages.append({"key": counter, "value": f"{field_name}: {field_error}"})
                counter += 1
        return {'errors': errors_messages}

    class Meta:
        model = User
        fields = ('username', 'email', "first_name", "last_name", "password")
        # extra_kwargs = {'password': {'write_only': True}} # Uncomment to avoid returning password in response

    def create(self, validated_data):
        # return User.objects.create(**validated_data)
        return User.objects.create(
            email=validated_data['email'],
            username=validated_data['username'],
            last_name=validated_data['last_name'],
            first_name=validated_data['first_name'],
            password=make_password(validated_data['password'])
        )

    def update(self, instance, validated_data):
        return User.objects.update(**validated_data)


# https://www.django-rest-framework.org/tutorial/1-serialization/
class OperationTypeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True, max_length=10)

    class Meta:
        model = OperationType
        fields = ['id', 'name']

    def create(self, validated_data):
        """
        Create and return a new `OperationType` instance, given the validated data.
        """
        return OperationType.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `OperationType` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class OperationTypeSerializerFrontEnd(serializers.ModelSerializer):
    value = serializers.IntegerField(source='id', read_only=True)
    label = serializers.CharField(source='name', required=True, max_length=10)

    class Meta:
        model = OperationType
        fields = ['value', 'label']

    def create(self, validated_data):
        """
        Create and return a new `OperationType` instance, given the validated data.
        """
        return OperationType.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `OperationType` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.label)
        instance.save()
        return instance


class PropertyTypeSerializerFrontEnd(serializers.ModelSerializer):
    value = serializers.IntegerField(source='id', read_only=True)
    label = serializers.CharField(source='name', required=True, max_length=30)

    class Meta:
        model = OperationType
        fields = ['value', 'label']

    def create(self, validated_data):
        """
        Create and return a new `OperationType` instance, given the validated data.
        """
        return OperationType.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `OperationType` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.label)
        instance.save()
        return instance
