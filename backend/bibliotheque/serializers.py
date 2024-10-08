from rest_framework import serializers
from .models import Article,These,Document
from .models import  Chercheur, Directeur
from chercheur.serializers import ChercherSerializer
from directeurs.serializers import DirecteurSerializer
from apiusers.models import User
class ArticleSerializer(serializers.ModelSerializer):
    description = serializers.CharField(required=False)
    state = serializers.CharField(required=False)
    idchercheur = serializers.CharField( max_length=200,required=False)
    iddirecteur = serializers.CharField( max_length=200,required=False)

    class Meta:
        model=Article
        fields=('id', 'idchercheur', 'iddirecteur','chercheur','directeur','titre','description','state','file','date_depot')

    def create(self, validated_data):
             idchercheur = validated_data.pop('idchercheur')
             iddirecteur = validated_data.pop('iddirecteur')
             validated_data['chercheur'] =  Chercheur.objects.get(cin=idchercheur)
             validated_data['directeur'] =  Directeur.objects.get(email=iddirecteur)

             return super().create(validated_data)

class ArticleSerializer(serializers.ModelSerializer):
    description = serializers.CharField(required=False)
    state = serializers.CharField(required=False)
    idchercheur = serializers.CharField( max_length=200,required=False)
    iddirecteur = serializers.CharField( max_length=200,required=False)

    class Meta:
        model=Article
        fields=('id', 'idchercheur', 'iddirecteur','chercheur','directeur','titre','description','state','file','date_depot')

    def create(self, validated_data):
             idchercheur = validated_data.pop('idchercheur')
             iddirecteur = validated_data.pop('iddirecteur')
             validated_data['chercheur'] =  Chercheur.objects.get(cin=idchercheur)
             validated_data['directeur'] =  Directeur.objects.get(email=iddirecteur)

             return super().create(validated_data)

class ArticleSerializerget(serializers.ModelSerializer):
    description = serializers.CharField(required=False)
    state = serializers.CharField(required=False)
    idchercheur = serializers.CharField( max_length=200,required=False)
    iddirecteur = serializers.CharField( max_length=200,required=False)
    chercheur = ChercherSerializer()
    directeur = DirecteurSerializer()
    class Meta:
        model=Article
        fields=('id', 'idchercheur', 'iddirecteur','chercheur','directeur','titre','description','state','file','date_depot')

    def create(self, validated_data):
             idchercheur = validated_data.pop('idchercheur')
             iddirecteur = validated_data.pop('iddirecteur')
             validated_data['chercheur'] =  Chercheur.objects.get(cin=idchercheur)
             validated_data['directeur'] =  Directeur.objects.get(email=iddirecteur)

             return super().create(validated_data)

class TheseSerializer(serializers.ModelSerializer):
    state = serializers.CharField(required=False)
    idchercheur = serializers.CharField( max_length=200,required=False)
    iddirecteur = serializers.CharField( max_length=200,required=False)
  
   
    class Meta:
        model=These
        fields=('id', 'idchercheur', 'iddirecteur','directeur','chercheur','titre','specialite','state','file','date_soutenu')
    
    def create(self, validated_data):
        idchercheur = validated_data.pop('idchercheur')
        iddirecteur = validated_data.pop('iddirecteur')
        validated_data['chercheur'] =  Chercheur.objects.get(cin=idchercheur)
        validated_data['directeur'] =  Directeur.objects.get(email=iddirecteur)

        return super().create(validated_data)
class TheseSerializerget(serializers.ModelSerializer):
    state = serializers.CharField(required=False)
    idchercheur = serializers.CharField( max_length=200,required=False)
    iddirecteur = serializers.CharField( max_length=200,required=False)
    chercheur = ChercherSerializer()
    directeur = DirecteurSerializer()
   
    class Meta:
        model=These
        fields=('id', 'idchercheur', 'iddirecteur','directeur','chercheur','titre','specialite','state','file','date_soutenu')
    
    def create(self, validated_data):
        idchercheur = validated_data.pop('idchercheur')
        iddirecteur = validated_data.pop('iddirecteur')
        validated_data['chercheur'] =  Chercheur.objects.get(cin=idchercheur)
        validated_data['directeur'] =  Directeur.objects.get(email=iddirecteur)

        return super().create(validated_data)
class DemandeSerializer(serializers.ModelSerializer):
    description = serializers.CharField(required=False)
    admin=serializers.CharField(required=False)
    class Meta:
        model=Document
        fields=('id','idadmin','admin','titre','description','file')
    def create(self, validated_data):
        admin = validated_data.pop('admin')
        validated_data['idadmin'] =  User.objects.get(login=admin)
        return super().create(validated_data)
