from django.db import models
from apiusers.models import User
# Create your models here.
class Actualite(models.Model):
    titre=models.CharField( max_length=200)
    description=models.CharField( max_length=400)
    remarque=models.CharField( max_length=300)

    file=models.FileField(upload_to='store/files/')
    date_creation=models.DateField(auto_now_add=True)

    def __str__(self) :
        return self.titre
    
    
class Controler(models.Model):
    IDActualite = models.ForeignKey(Actualite, on_delete=models.CASCADE)
    IdAdmin = models.ForeignKey(User, on_delete=models.CASCADE)
    action=models.CharField(max_length=200)
    date_creation=models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Actualite: {self.IDActualite.titre}, Admin: {self.IdAdmin.username}"
