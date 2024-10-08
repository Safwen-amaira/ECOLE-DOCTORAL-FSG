from django.db import models
from chercheur.models import Chercheur
# Create your models here.
class Notification(models.Model):
    user=models.ForeignKey(Chercheur,null=True, on_delete=models.SET_NULL)
    action=models.CharField( max_length=400)
    date_creation = models.DateTimeField(auto_now_add=True)
    state = models.CharField(max_length=100, default='non-vu')

