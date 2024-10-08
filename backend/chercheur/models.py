

from apiusers.models import User
from django.db import models
import datetime

def current_year():
    return str(datetime.datetime.now().year)

class Chercheur(models.Model):
    image=models.ImageField( upload_to='image/logo/',default='image/logo/profile.jpg')

    Nom = models.CharField(max_length=255,default='none')
    Prenom = models.CharField(max_length=255,default='none')
    email = models.EmailField(default='none')
    cin = models.CharField(max_length=20,unique=True)
    tel = models.CharField(max_length=15,default='none')
    SujetThese = models.TextField(default='none')
    Address = models.TextField(default='none')
    dateNaissance = models.CharField(max_length=200,default='2000-01-01')
    lieuNaissance = models.CharField(max_length=255)
    StructureRecherche = models.CharField(max_length=255)
    specialite = models.CharField(max_length=255)
    FirstDirTheseName = models.CharField(max_length=255)
    FirstDirTheseGrade = models.CharField(max_length=255, default=None, null=True, blank=True)
    FirstDirTheseLieuTravail = models.CharField(max_length=255, default=None, null=True, blank=True)
    FirstDirTheseEmail = models.EmailField(default=None, null=True, blank=True)
    FirstDirThesePhone = models.CharField(max_length=15, default=None, null=True, blank=True)
    TypeThese = models.CharField(max_length=255, default=None, null=True, blank=True)
    SecondDirTheseName = models.CharField(max_length=255, default=None, null=True, blank=True)
    SecondDirTheseGrade = models.CharField(max_length=255, default=None, null=True, blank=True)
    SecondDirTheseLieuTravail = models.CharField(max_length=255, default=None, null=True, blank=True)
    SecondDirTheseEmail = models.EmailField(blank=True, null=True)
    SecondDirTheseStructureRecherche = models.CharField(max_length=255, default=None, null=True, blank=True)
    SecondDirThesePhone = models.CharField(max_length=15, default=None, null=True, blank=True)
    convention = models.FileField(upload_to='store/files/')
    CoEncadrantName = models.CharField(max_length=255, default=None, null=True, blank=True)
    CoEncadrantGrade = models.CharField(max_length=255, default=None, null=True, blank=True)
    CoEncadrantLieuTravail = models.CharField(max_length=255, default=None, null=True, blank=True)
    CoEncadrantEmail = models.EmailField(blank=True, null=True)
    CoEncadrantPhone = models.CharField(max_length=15, default=None, null=True, blank=True)
    State = models.CharField(max_length=200 , default='En attente',)
    Niveau = models.CharField(max_length=233, default="1ere année")  
    FirstYearInscription = models.CharField(max_length = 323 ,null=True ,default=current_year)
    is_inscrit=models.BooleanField(default = 0)
    Etablissement = models.CharField (default='FSG',max_length=80)
    
    
    def __str__(self):
        return f"{self.Nom} {self.Prenom}cin : {self.cin}"


class AssurerIsncription(models.Model):
    IdChercheur = models.ForeignKey(Chercheur, on_delete=models.CASCADE)
    IdAdmin = models.ForeignKey(User, on_delete=models.CASCADE)
    date_creation=models.DateField(auto_now_add=True)
    action=models.CharField(max_length=200)


    def __str__(self):
        return f"Checheur: {self.IdChercheur.Nom}, Admin: {self.IdAdmin.username}"
