from django.urls import path, include
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('gardens', views.GardenViewSet, basename='gardens')

garden_router = routers.NestedDefaultRouter(router, r'gardens', lookup='garden')
garden_router.register(r'plants', views.PlantViewSet, basename='garden_plants')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(garden_router.urls)),
]