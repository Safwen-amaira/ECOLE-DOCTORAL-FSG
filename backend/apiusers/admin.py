from django.contrib import admin
from .models import User,Doctorant,Adminf,Admins,Admint
# Register your models here.
models_list=[User,Doctorant,Adminf,Admins,Admint]
admin.site.register(models_list)
