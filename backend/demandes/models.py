from django.db import models
from chercheur.models import Chercheur
class Demandes(models.Model):
    typeDemande=models.CharField(max_length=200,blank=False)
    Langue=models.CharField(max_length=200,blank=False)
    nbCopie=models.CharField(max_length=200,default='1')
    chercheur=models.ForeignKey(Chercheur,null=True, on_delete=models.SET_NULL)

    DateDepot = models.DateField(auto_now_add=True)
    State = models.CharField(max_length=100, default='En attente')
    def __str__(self):
            return  {self.cin}
