from rest_framework import serializers
from .models import Garden, Plant
from django.contrib.auth.models import User


class PlantSerializer(serializers.ModelSerializer):
    garden = serializers.PrimaryKeyRelatedField(queryset=Garden.objects.all())
    class Meta:
        model = Plant
        fields = ['id','plant_name', 'garden']


class GardenSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    plants = PlantSerializer(many=True, required=False)

    class Meta:
        model = Garden
        fields = ['id','garden_name', 'location',  'user', 'plants' ]