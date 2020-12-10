from django.contrib.auth.hashers import make_password
from django.utils.timezone import now
from rest_framework import serializers
from backend.models import User, OperationType, Department, City, Neighborhood, PropertyType, Ad


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


class PropertyTypeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True, max_length=10)

    class Meta:
        model = PropertyType
        fields = ['id', 'name']

    def create(self, validated_data):
        """
        Create and return a new `OperationType` instance, given the validated data.
        """
        return PropertyType.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `OperationType` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


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


class DepartmentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True, max_length=10)

    class Meta:
        model = Department
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


class CitySerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()  # All fields
    # department = serializers.PrimaryKeyRelatedField(read_only=True)  # Only primary key
    search_type = serializers.SerializerMethodField()
    label = serializers.SerializerMethodField()

    class Meta:
        model = City
        # fields = ['id', 'name', 'department', 'search_type']
        fields = ['id', 'name', 'department', 'search_type', 'label']

    @staticmethod
    def get_search_type(obj):
        return 'City'
        # C = city
        # first d = department
        # return "%s-%d-%d" % ('C', obj.id, obj.id)

    @staticmethod
    def get_label(obj):
        return "%s, %s" % (obj.name, obj.department.name)

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


class NeighborhoodSerializer(serializers.ModelSerializer):
    city = CitySerializer()  # All fields
    # department = serializers.PrimaryKeyRelatedField(read_only=True)  # Only primary key
    search_type = serializers.SerializerMethodField()
    label = serializers.SerializerMethodField()

    class Meta:
        model = Neighborhood
        fields = ['id', 'name', 'city', 'search_type', 'label']

    @staticmethod
    def get_search_type(obj):
        return 'Neighborhood'
        # C = city
        # first d = department
        # return "%s-%d-%d" % ('C', obj.id, obj.id)

    @staticmethod
    def get_label(obj):
        return "%s, %s, %s" % (obj.name, obj.city.name, obj.city.department.name)

    def create(self, validated_data):
        """
        Create and return a new `OperationType` instance, given the validated data.
        """
        return Neighborhood.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `OperationType` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class AdSerializer(serializers.ModelSerializer):
    neighborhood = NeighborhoodSerializer()  # All fields
    user = UserSerializer()  # All fields
    property_type = PropertyTypeSerializer()  # All fields
    operation_type = OperationTypeSerializer()  # All fields

    class Meta:
        model = Ad
        fields = ['id', 'neighborhood', 'user', 'property_type', 'operation_type', 'description', 'street',
                  'house_number', 'total_area', 'built_area', 'rooms', 'bathrooms', 'parking_lots', 'antiquity', 'price']

    def create(self, validated_data):
        """
        Create and return a new `OperationType` instance, given the validated data.
        """
        return Ad.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `OperationType` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
