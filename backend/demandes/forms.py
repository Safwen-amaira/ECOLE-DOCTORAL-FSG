from django import forms
from .models import Demandes  
class DemandeForm(forms.ModelForm):  
    class Meta:
        model = Demandes
        fields = '__all__'
