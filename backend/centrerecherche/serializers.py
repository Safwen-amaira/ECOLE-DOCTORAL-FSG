from rest_framework import serializers
from .models import Labo
from etablissement.models import Etablissement

class CentreRechercheSerializer(serializers.ModelSerializer):
    fiche = serializers.FileField(required=False)
    Etablissement = serializers.CharField(required=False)
    class Meta:
        model = Labo
        fields =('id','type','Codelabo','Directeur','Discipline','Etablissement','fiche')
    def create(self, validated_data):
        Etabli=validated_data.pop('Etablissement')
        validated_data['Etablissement'] =  Etablissement.objects.get(id=Etabli)
        return super().create(validated_data)