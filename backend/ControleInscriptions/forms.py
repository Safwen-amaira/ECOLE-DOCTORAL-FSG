from django import forms
from .models import Preinscription

class PreinscriptionForm(forms.ModelForm):
    class Meta:
        model = Preinscription
        fields = ['is_open', 'end_date']