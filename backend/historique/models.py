from django.db import models
from apiusers.models import User

# Create your models here.
class Historique(models.Model):
    admin_name=models.ForeignKey(User,null=True, on_delete=models.SET_NULL)
    user_name=models.CharField( max_length=200)
    action=models.CharField( max_length=400)
    date_creation=models.DateField(auto_now_add=True)

