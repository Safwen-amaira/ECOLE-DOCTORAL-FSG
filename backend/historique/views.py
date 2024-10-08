
from .serializers import HistoriqueSerializer,HistoriqueSerializerget
from django.http.response import JsonResponse
##from rest_framework import viewsets
from rest_framework.views import APIView

from .models import Historique
from django.http.response import Http404
from rest_framework.response import Response
from datetime import datetime, timedelta

# Create your views here.
class HistoriqueView(APIView):
   def delete_old_entries():
        one_month_ago = datetime.now() - timedelta(days=30)
        Historique.filter(date_creation__lt=one_month_ago).delete()
  
    
   def post(self,request):
        data = request.data
        serializer = HistoriqueSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(" create Historique successsfuly",safe=False)
        return JsonResponse(" failed to add Historique" ,status=404, safe=False)    
   def get_Historique(self,pk):
        try:
            Historique = Historique.objects.get(id=pk) 
            return Historique
        except Historique.DoesNotExist:
            raise Http404


   def get(self,request,pk=None):
        if pk:
            data = self.get_Historique(pk)
            serializer = HistoriqueSerializerget(data)
        else:
            data = Historique.objects.all()

            serializer = HistoriqueSerializerget(data,many=True)
        return Response(serializer.data) 
   
   def delete(self, request, pk=None):
        if pk:
            # Try to delete a single Historique object by primary key
            try:
                Historique_to_delete = Historique.objects.get(id=pk)
                Historique_to_delete.delete()
                return JsonResponse("Deleted Historique with success", safe=False, status=200)
            except Historique.DoesNotExist:
                return JsonResponse("Historique not found", safe=False, status=404)
        else:
            # Delete all Historique objects
            Historique.objects.all().delete()
            return JsonResponse("Deleted all Historique objects with success", safe=False, status=200)

