from rest_framework import serializers
from .models import Demandes
from chercheur.models import Chercheur
from chercheur.serializers import ChercherSerializer
class DemandeSerializer(serializers.ModelSerializer):
    DateDepot = serializers.CharField(required=False)
    cin = serializers.CharField(required=False)

    State = serializers.CharField(required=False)
    class Meta:
        model = Demandes
        fields = '__all__'
    def create(self, validated_data):
                idchercheur = validated_data.pop('cin')
                validated_data['chercheur'] =  Chercheur.objects.get(cin=idchercheur)

                return super().create(validated_data)
class DemandeSerializerget(serializers.ModelSerializer):
    DateDepot = serializers.CharField(required=False)
    State = serializers.CharField(required=False)
    chercheur = ChercherSerializer()
   
    class Meta:
        model=Demandes
        fields = '__all__'
    