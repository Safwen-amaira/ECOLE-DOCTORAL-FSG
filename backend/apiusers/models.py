from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.conf import settings
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
import uuid
# Create your models here.
@receiver(post_save,sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender,instance=None,created=False,**kwargs):
    if created:
        Token.objects.create(user=instance)

class User(AbstractUser) :
    login = models.CharField(max_length=100, unique=True, default=uuid.uuid1)
    username=models.CharField(max_length=100)
    etablissement=models.CharField(max_length=100)
    email = models.CharField(max_length=100)

    USERNAME_FIELD='login'
    REQUIRED_FIELDS=['username']
    is_doctorant = models.BooleanField(default=False)
    is_adminf = models.BooleanField(default=False)
    is_admins = models.BooleanField(default=False)
    is_admint = models.BooleanField(default=False)
    def __str__(self):
            return f"{self.username}"

class Doctorant(models.Model):
    user=models.OneToOneField(User,related_name="doctorant",on_delete=models.CASCADE)
    

    

class Adminf(models.Model):
    user=models.OneToOneField(User,related_name="adminf",on_delete=models.CASCADE)
    
    
    
class Admins(models.Model):
    user=models.OneToOneField(User,related_name="admins",on_delete=models.CASCADE)
    
   

class Admint(models.Model):
    user=models.OneToOneField(User,related_name="admint",on_delete=models.CASCADE)
    
    
    
