from rest_framework import serializers
from .models import Directeur
from centrerecherche.serializers import CentreRechercheSerializer
from centrerecherche.models import Labo
class DirecteurSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    codelabo = serializers.CharField( max_length=200,required=False)

    class Meta:
        model = Directeur
        fields =('id','nom','prenom','username','grade','specialite','email','lieuTravail','codelabo','numTel')
    def create(self, validated_data):
        codelabo=validated_data.pop('codelabo')
        nom = validated_data.get('nom')
        prenom = validated_data.get('prenom')
        validated_data['username'] = nom + ' ' + prenom
        validated_data['lieuTravail'] =  Labo.objects.get(Codelabo=codelabo)
        return super().create(validated_data)
class DirecteurSerializerget(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    codelabo = serializers.CharField( max_length=200,required=False)
    lieuTravail=CentreRechercheSerializer()
    class Meta:
        model = Directeur
        fields =('id','nom','prenom','username','grade','specialite','email','lieuTravail','codelabo','numTel')
    def create(self, validated_data):
        codelabo=validated_data.pop('codelabo')
        nom = validated_data.get('nom')
        prenom = validated_data.get('prenom')
        validated_data['username'] = nom + ' ' + prenom
        validated_data['lieuTravail'] =  Labo.objects.get(Codelabo=codelabo)
        return super().create(validated_data)
