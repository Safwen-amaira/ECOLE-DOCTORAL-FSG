from django.db import models
from apiusers.models import User# Create your models here.
from directeurs.models import Directeur
from chercheur.models import Chercheur
class Article(models.Model):
    chercheur=models.ForeignKey(Chercheur,null=True, on_delete=models.SET_NULL)
    directeur=models.ForeignKey(Directeur,null=True, on_delete=models.SET_NULL)
    titre=models.CharField( max_length=200)
    description=models.CharField( max_length=200)
    file=models.FileField(upload_to='store/files/')
    date_depot=models.DateField()
    state=models.CharField( max_length=100 , default='non-validé')


    def __str__(self) :
        return self.titre

class These(models.Model):
    chercheur=models.ForeignKey(Chercheur,null=True, on_delete=models.SET_NULL)
    directeur=models.ForeignKey(Directeur,null=True, on_delete=models.SET_NULL)
    titre=models.CharField( max_length=200)
    specialite=models.CharField( max_length=200)
    file=models.FileField(upload_to='store/files/')
    date_soutenu=models.DateField()
    state=models.CharField( max_length=100 , default='non-validé')


    def __str__(self) :
        return self.titre

class Document(models.Model):
    idadmin=models.ForeignKey(User,null=True,on_delete=models.SET_NULL)
    titre=models.CharField( max_length=200)
    description=models.CharField( max_length=200)
    file=models.FileField(upload_to='store/files/')
   
    def __str__(self) :
        return self.titre
    
