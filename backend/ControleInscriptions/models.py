from django.db import models
from django.utils import timezone
from apiusers.models import User

class Preinscription(models.Model):
    Opertator_Name = models.CharField(max_length=100)
    is_open = models.BooleanField(default=True)
    end_date = models.DateField()

    def update_is_open(self):
        today = timezone.now().date()
        if today == self.end_date:
            self.is_open = False
            self.save()


class Ouvrir_Fermer_Inscription(models.Model):
    IDAdmin = models.ForeignKey(User, on_delete=models.CASCADE)
    action=models.CharField(max_length=200)
    date_creation=models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Date action: {self.date_creation}, Admin: {self.IDAdmin.username}"
