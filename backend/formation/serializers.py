from rest_framework import serializers
from .models import FormationSimple,FormationPedagogique
from chercheur.models import Chercheur
from chercheur.serializers import ChercherSerializer

class FormationSimpleSerializer(serializers.ModelSerializer):
    state = serializers.CharField(required=False)
    
    file=serializers.FileField(required=False)
    cin=serializers.CharField(required=False)

    date_creation = serializers.CharField(required=False)
    class Meta:
        model=FormationSimple
        fields=('id','chercheur','cin','nom_formation','nom_formateur','lieu_formation','state','date_creation','nombre_heure','type','file','date_debut','date_fin')
    def create(self, validated_data):
                idchercheur = validated_data.pop('cin')
                validated_data['chercheur'] =  Chercheur.objects.get(cin=idchercheur)
               

                return super().create(validated_data)
class FormationPedagogiqueSerializer(serializers.ModelSerializer):
    state = serializers.CharField(required=False)
    cin=serializers.CharField(required=False)
    date_creation = serializers.CharField(required=False)
  
    file=serializers.FileField(required=False)

    class Meta:
        model=FormationPedagogique
        fields=('id','chercheur','cin','nom_formation','nom_formateur','lieu_formation','annee_universitaire','semestre','nombre_heure','file','date_creation','state')
    def create(self, validated_data):
                idchercheur = validated_data.pop('cin')
                validated_data['chercheur'] =  Chercheur.objects.get(cin=idchercheur)              
              

                return super().create(validated_data)     
    
class FormationSimpleSerializerget(serializers.ModelSerializer):
    state = serializers.CharField(required=False)
    cin=serializers.CharField(required=False)
    chercheur = ChercherSerializer()

    date_creation = serializers.CharField(required=False)
    class Meta:
        model=FormationSimple
        fields=('id','chercheur','cin','nom_formation','nom_formateur','lieu_formation','state','date_creation','nombre_heure','type','file','date_debut','date_fin')
    def create(self, validated_data):
                idchercheur = validated_data.pop('cin')
                validated_data['chercheur'] =  Chercheur.objects.get(cin=idchercheur)

                return super().create(validated_data)
class FormationPedagogiqueSerializerget(serializers.ModelSerializer):
    state = serializers.CharField(required=False)
    cin=serializers.CharField(required=False)
    chercheur = ChercherSerializer()

    date_creation = serializers.CharField(required=False)

    class Meta:
        model=FormationPedagogique
        fields=('id','chercheur','cin','nom_formation','nom_formateur','lieu_formation','annee_universitaire','semestre','nombre_heure','file','date_creation','state')
    def create(self, validated_data):
                idchercheur = validated_data.pop('cin')
                validated_data['chercheur'] =  Chercheur.objects.get(cin=idchercheur)

                return super().create(validated_data)
