
from rest_framework import serializers
from .models import User, Doctorant, Adminf, Admins, Admint


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','login','etablissement', 'email', 'is_doctorant', 'is_adminf', 'is_admins', 'is_admint']


class DoctorantSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username','login', 'etablissement', 'email', 'password','password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match")
        return data
    def save(self, **kwargs):
        user = User(
            username=self.validated_data['username'],
            email=self.validated_data['email'],
            login=self.validated_data['login'],
            etablissement=self.validated_data['etablissement']

        )
        password = self.validated_data['password']
        user.set_password(password)
        user.is_doctorant = True
        user.save()
        Doctorant.objects.create(user=user)
        return user


class AdminfSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username','etablissement', 'login', 'email', 'password','password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def save(self, **kwargs):
        user = User(
            username=self.validated_data['username'],
            email=self.validated_data['email'],
            login=self.validated_data['login'],
            etablissement=self.validated_data['etablissement']

        )
        password = self.validated_data['password']
        user.set_password(password)
        user.is_adminf = True
        user.save()
        Adminf.objects.create(user=user)
        return user


class AdminsSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)


    class Meta:
        model = User
        fields = ['username','etablissement', 'login', 'email', 'password','password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def save(self, **kwargs):
        user = User(
            username=self.validated_data['username'],
            email=self.validated_data['email'],
            login=self.validated_data['login'],
            etablissement=self.validated_data['etablissement']

        )
        password = self.validated_data['password']
        user.set_password(password)
        user.is_admins = True
        user.save()
        Admins.objects.create(user=user)
        return user


class AdmintSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)


    class Meta:
        model = User
        fields = ['username','login','etablissement',  'email', 'password','password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def save(self, **kwargs):
        user = User(
            username=self.validated_data['username'],
            email=self.validated_data['email'],
            login=self.validated_data['login'],
            etablissement=self.validated_data['etablissement']
        )
        password = self.validated_data['password']
        user.set_password(password)
        user.is_admint = True
        user.save()
        Admint.objects.create(user=user)
        return user
