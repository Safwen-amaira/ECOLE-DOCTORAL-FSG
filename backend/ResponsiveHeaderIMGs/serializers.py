from rest_framework import serializers
from .models import HeaderImage

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeaderImage
        fields = ['id', 'title', 'image']
