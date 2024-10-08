from django.db import models
from etablissement.models import Etablissement
# Create your models here.
class Labo(models.Model):
    type=models.CharField(max_length=20)
    Codelabo = models.CharField(max_length=100, unique=True)
    Directeur = models.CharField(max_length=200)
    Discipline = models.CharField(max_length=200)
    Etablissement = models.ForeignKey(Etablissement, on_delete=models.CASCADE)
    fiche = models.FileField(upload_to='store/files/')