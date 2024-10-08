from rest_framework import serializers
from .models import Chercheur,AssurerIsncription
from apiusers.serializers import UserSerializer
class ChercherSerializer(serializers.ModelSerializer):
   
  
    convention = serializers.FileField(required = False)
    State = serializers.CharField(required =False)
    FirstYearInscription = serializers.CharField(required = False)
    is_inscrit=serializers.BooleanField(required = False)
    Etablissement = serializers.CharField (required = False)
    
    
    class Meta: 
        model = Chercheur
        fields = '__all__'

class AssurerIsncriptionSerializerget(serializers.ModelSerializer):
    IdChercheur = ChercherSerializer()
    IdAdmin = UserSerializer()
   
    class Meta:
        model=AssurerIsncription
        fields=('id', 'IdChercheur', 'IdAdmin','action','date_creation')
    
    