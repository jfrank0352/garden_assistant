from rest_framework import serializers
from .models import Garden, Plant


class PlantSerializer(serializers.ModelSerializer):
    garden = serializers.PrimaryKeyRelatedField(queryset=Garden.objects.all())
    class Meta:
        model = Plant
        fields = ['id','plant_name', 'garden']


class GardenSerializer(serializers.ModelSerializer):
    plants = PlantSerializer(many=True, required=False)
    class Meta:
        model = Garden
        fields = ['id','garden_name', 'location', 'plants' ]