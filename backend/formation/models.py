from django.db import models
from chercheur.models import Chercheur
# Create your models here.


class FormationSimple(models.Model):
    
    chercheur=models.ForeignKey(Chercheur,null=True, on_delete=models.SET_NULL)
   
    nom_formation=models.CharField( max_length=200)
    nom_formateur=models.CharField( max_length=200)
    lieu_formation=models.CharField( max_length=200)
    state=models.CharField( max_length=200,default='non-validé')
    date_creation=models.DateField(auto_now_add=True)
    nombre_heure=models.IntegerField()

     
    type=models.CharField( max_length=200)
    date_debut=models.DateField()
    date_fin=models.DateField()
    file=models.FileField(upload_to='store/files/') 


    def __str__(self) :
        return self.cin

class FormationPedagogique(models.Model):
   
    chercheur=models.ForeignKey(Chercheur,null=True, on_delete=models.SET_NULL)
   
    nom_formation=models.CharField( max_length=200)
    nom_formateur=models.CharField( max_length=200)
    lieu_formation=models.CharField( max_length=200)
    state=models.CharField( max_length=200,default='non-validé')
    date_creation=models.DateField(auto_now_add=True)
    nombre_heure=models.IntegerField()

    file=models.FileField(upload_to='store/files/')     
    annee_universitaire=models.CharField(max_length=9)
    semestre=models.CharField(max_length=200 )


    def __str__(self) :
        return self.cin
