from rest_framework import serializers
from .models import Historique
from apiusers.serializers import UserSerializer
from apiusers.models import User
class HistoriqueSerializer(serializers.ModelSerializer):
    admin_name = serializers.CharField(required=False)
    user_name = serializers.CharField(required=False)

    class Meta:
        model = Historique
        fields =('admin_name','user_name','action','date_creation')
    def create(self, validated_data):
            act = validated_data.get('action')
            if act not in ['a ajouté formation pédagogique','a ajouté formation simple', 'a ajouté thèse ', 'a ajouté article ', 'a ajouté Demande']:
                    idadmin = validated_data.get('admin_name')
                    validated_data['admin_name'] = User.objects.get(login=idadmin)

            return super().create(validated_data)
class HistoriqueSerializerget(serializers.ModelSerializer):
    admin_name = serializers.CharField(required=False)
    user_name = serializers.CharField(required=False)
    
    admin_name = UserSerializer()
    class Meta:
        model=Historique
        fields =('admin_name','user_name','action','date_creation')
