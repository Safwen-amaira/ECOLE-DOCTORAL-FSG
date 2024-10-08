from django.db import models
from apiusers.models import User

# Create your models here.
class Etablissement(models.Model):
    logo=models.ImageField( upload_to='image/logo/')
    nom=models.CharField( max_length=200)
    description=models.CharField( max_length=200)
    email=models.CharField( max_length=200)
    tel=models.CharField( max_length=200)
    fax=models.CharField( max_length=200)
    def __str__(self):
        return f"{self.nom}"


class GererEtablissement(models.Model):
    IdEtablissemnt = models.ForeignKey(Etablissement, on_delete=models.CASCADE)
    IdAdmin = models.ForeignKey(User, on_delete=models.CASCADE)
    action=models.CharField(max_length=200)
    def __str__(self):
        return f"Etablissement: {self.IdEtablissemnt.nom}, Admin: {self.IdAdmin.username}"





