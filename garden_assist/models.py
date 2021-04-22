from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Garden(models.Model):
    garden_name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='gardens')

class Plant(models.Model):
    plant_name = models.CharField(max_length=100)
    garden = models.ForeignKey(Garden, on_delete=models.CASCADE, related_name='plants')