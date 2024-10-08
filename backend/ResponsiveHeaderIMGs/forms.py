from django import forms
from .models import HeaderImage

class ImageForm(forms.ModelForm):
    class Meta:
        model = HeaderImage
        fields = ['title', 'image']