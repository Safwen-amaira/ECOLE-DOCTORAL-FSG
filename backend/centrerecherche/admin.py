from django.contrib import admin
from .models import Labo
# Register your models here.
models_list = [Labo]
admin.site.register(models_list)