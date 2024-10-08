from django.db import models
from centrerecherche.models import Labo
# Create your models here.
class Directeur(models.Model):
    nom=models.CharField( max_length=200)
    prenom=models.CharField( max_length=200)
    username=models.CharField( max_length=400)
    grade=models.CharField( max_length=200)
    lieuTravail=models.ForeignKey(Labo,null=True, on_delete=models.SET_NULL)
    email=models.CharField( max_length=200 , unique=True)
    numTel=models.CharField( max_length=200)
    specialite=models.CharField( max_length=200)

