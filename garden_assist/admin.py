from django.contrib import admin
from .models import Garden, Plant

# Register your models here.
admin.site.register([Garden, Plant])