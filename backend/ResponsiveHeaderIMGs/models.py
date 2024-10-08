from django.db import models
from apiusers.models import User
class HeaderImage(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='headerimgs/')

    def __str__(self):
        return self.title
class GererHeader(models.Model):
    IdHeader = models.ForeignKey(HeaderImage, on_delete=models.CASCADE)
    IDAdmin = models.ForeignKey(User, on_delete=models.CASCADE)
    date_creation=models.DateField(auto_now_add=True)
    action=models.CharField(max_length=200)

    def __str__(self):
        return f"Date action: {self.date_creation}, Admin: {self.IDAdmin.username}"
