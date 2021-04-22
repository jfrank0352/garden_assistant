from django.shortcuts import render
from .models import Garden, Plant
from .serializers import GardenSerializer, PlantSerializer
from rest_framework import viewsets

# Create your views here.
class GardenViewSet(viewsets.ModelViewSet):
    # queryset = Garden.objects.all()
    serializer_class = GardenSerializer

    def get_queryset(self):
        return Garden.objects.filter(user=self.request.user)

class PlantViewSet(viewsets.ModelViewSet):
    # queryset = Plant.objects.all()
    serializer_class = PlantSerializer

    def get_queryset(self):
        return Plant.objects.filter(category=self.kwargs['garden_pk'])