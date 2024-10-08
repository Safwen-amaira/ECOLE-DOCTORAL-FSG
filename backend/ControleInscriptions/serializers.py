from rest_framework import serializers
from .models import Preinscription,Ouvrir_Fermer_Inscription
from apiusers.serializers import UserSerializer
class PreinscriptionSerializer(serializers.ModelSerializer):
    end_date = serializers.DateField(format='%Y-%m-%d')  # Custom date format

    class Meta:
        model = Preinscription
        fields = ['id', 'is_open', 'end_date']
class HistoriqueSerializerget(serializers.ModelSerializer):
    
    IDAdmin = UserSerializer()
    class Meta:
        model=Ouvrir_Fermer_Inscription
        fields =('IDAdmin','action','date_creation')
