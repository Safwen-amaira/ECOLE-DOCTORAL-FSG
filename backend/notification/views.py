from .serializers import NotificationSerializer
from django.http.response import JsonResponse
##from rest_framework import viewsets
from rest_framework.views import APIView
from datetime import datetime, timedelta

from .models import Notification
from django.http.response import Http404
from rest_framework.response import Response
# Create your views here.
class NotificationView(APIView):
    def delete_old_entries():
        one_month_ago = datetime.now() - timedelta(days=30)
        Notification.filter(date_creation__lt=one_month_ago).delete()
  
    def get(self,request): 
         data = Notification.objects.all()
         serializer = NotificationSerializer(data,many=True)           
         return Response(serializer.data) 
    def put(self, request, pk=None):
        # Update all notifications' state to "vu"
        updated_count = Notification.objects.filter(state="non-vu").update(state="vu")
        
        if updated_count > 0:
            return JsonResponse(f"Updated {updated_count} notifications to 'vu' successfully.", safe=False)
        else:
            return JsonResponse("No notifications to update or update failed.", status=404, safe=False)
    
class NotificationNumberView(APIView):
    def get(self, request):
        non_vu_count = Notification.objects.filter(state="non-vu").count()
        return Response({'count': non_vu_count})
    def delete(self, request, pk=None):
        if pk:
            # Try to delete a single Historique object by primary key
            try:
                Notification_to_delete = Notification.objects.get(id=pk)
                Notification_to_delete.delete()
                return JsonResponse("Deleted Notification with success", safe=False,status=200)
            except Notification.DoesNotExist:
                return JsonResponse("Notification not found", safe=False,status=404)
        else:
            # Delete all Historique objects
            Notification.objects.all().delete()
            return JsonResponse("Deleted all Notification objects with success", safe=False, status=200)
