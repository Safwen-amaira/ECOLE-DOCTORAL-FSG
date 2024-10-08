
from .serializers import CentreRechercheSerializer
from django.http.response import JsonResponse
##from rest_framework import viewsets
from rest_framework.views import APIView

from .models import Labo
from django.http.response import Http404
from rest_framework.response import Response
# Create your views here.

class LaboIdView(APIView):
     def get_labo(self,pk):
        try:
            lb = Labo.objects.get(id=pk) 
            return lb
        except Labo.DoesNotExist:
            raise Http404


     def get(self,request,pk=None):
        if pk:
            data = self.get_labo(pk)
            serializer = CentreRechercheSerializer(data)
        else:
            data = Labo.objects.all()
            serializer = CentreRechercheSerializer(data,many=True)
        return Response(serializer.data) 
class Laboview(APIView):
   
   ''' queryset=Labo.objects.all()
    serializer_class=CentreRechercheSerializer'''
    
   def post(self,request):
        data = request.data
        serializer = CentreRechercheSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(" create labo successsfuly",safe=False)
        return JsonResponse(" failed to add labo" , status=404 , safe=False)    
   def get_labo(self,pk):
        try:
            labo = Labo.objects.get(Codelabo=pk) 
            return labo
        except Labo.DoesNotExist:
            raise Http404


   def get(self,request,pk=None):
        if pk:
            data = self.get_labo(pk)
            serializer = CentreRechercheSerializer(data)
        else:
            data = Labo.objects.all()
            serializer = CentreRechercheSerializer(data,many=True)
        return Response(serializer.data) 
   def put(self,request,pk):
        labo_to_update = Labo.objects.get(Codelabo=pk)
        serializer = CentreRechercheSerializer(instance=labo_to_update,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("update labo with success", safe=False)
        return JsonResponse("update failed ", status=404, safe=False)
   def delete(self,request,pk):
        labo_to_delete = Labo.objects.get(Codelabo=pk)
        labo_to_delete.delete()
        
        return JsonResponse("delete labo with success", safe=False)
        

class LaboNumberView(APIView):
    def get(self, request):
        count = Labo.objects.count()
        return Response({'count': count})