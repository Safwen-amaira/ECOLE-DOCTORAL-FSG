from rest_framework import serializers
from .models import Actualite



class ActualiteSerializer(serializers.ModelSerializer):
    description = serializers.CharField(required=False)
    remarque = serializers.CharField(required=False)

    file = serializers.FileField(required=False)
    class Meta:
        model=Actualite
        fields=('id','remarque','titre','description','file','date_creation')
