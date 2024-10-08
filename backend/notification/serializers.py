from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    user= serializers.CharField(required=False)

    class Meta:
        model = Notification
        fields =('user','action','date_creation','state')

