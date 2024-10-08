from rest_framework import serializers
from .models import Etablissement



class EtablissementSerializer(serializers.ModelSerializer):
    fax = serializers.CharField(required=False)
    
    class Meta:
        model=Etablissement
        fields=('id','nom','logo','description','tel','email','fax')
