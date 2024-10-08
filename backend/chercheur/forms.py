from django import forms
from .models import Chercheur 
import datetime
class ChercherForm(forms.ModelForm):  
    convention = forms.FileField(required = False)
    FirstYearInscription =forms.CharField(required=False)
    State =forms.CharField(required=False)
    FirstDirTheseName=forms.CharField(required=False)
    StructureRecherche=forms.CharField(required=False)
    lieuNaissance=forms.CharField(required=False)
    specialite=forms.CharField(required=False)

    class Meta:
        model = Chercheur
        fields = '__all__'
    def save(self, commit=True):
        instance = super(ChercherForm, self).save(commit=False)
        if not instance.FirstYearInscription:
            instance.FirstYearInscription = str(datetime.datetime.now().year)
        if commit:
            instance.save()
        return instance