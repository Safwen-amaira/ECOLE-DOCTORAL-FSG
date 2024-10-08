
from .serializers import DirecteurSerializer,DirecteurSerializerget
from django.http.response import JsonResponse
##from rest_framework import viewsets
from rest_framework.views import APIView

from .models import Directeur
from django.http.response import Http404
from rest_framework.response import Response
# Create your views here.
class DirecteurIdView(APIView):
     def get_directeur(self,pk):
        try:
            Dire = Directeur.objects.get(id=pk) 
            return Dire
        except Directeur.DoesNotExist:
            raise Http404


     def get(self,request,pk=None):
        if pk:
            data = self.get_directeur(pk)
            serializer = DirecteurSerializerget(data)
        else:
            data = Directeur.objects.all()
            serializer = DirecteurSerializerget(data,many=True)
        return Response(serializer.data) 
class Directeurview(APIView):
   
  
    
   def post(self,request):
        data = request.data
        serializer = DirecteurSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(" create Directeur successsfuly",safe=False)
        return JsonResponse(" failed to add Directeur" ,status=404, safe=False)    
   def get_directeur(self,pk):
        try:
            Dir = Directeur.objects.get(email=pk ) 
            return Dir
        except Directeur.DoesNotExist:
            raise Http404


   def get(self,request,pk=None):
        if pk:
            data = self.get_directeur(pk)
            serializer = DirecteurSerializerget(data)
        else:
            data = Directeur.objects.all()
            serializer = DirecteurSerializerget(data,many=True)
        return Response(serializer.data) 
   def put(self,request,pk):
        directeur_to_update = Directeur.objects.get(email=pk)
        serializer = DirecteurSerializer(instance=directeur_to_update,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("update Directeur with success", safe=False)
        return JsonResponse("update failed ", status=404, safe=False)
   def delete(self,request,pk):
        directeur_to_delete = Directeur.objects.get(email=pk)
        directeur_to_delete.delete()
        
        return JsonResponse("delete Directeur with success", safe=False)
        

class DirecteurNumberView(APIView):
    def get(self, request):
        count = Directeur.objects.count()
        return Response({'count': count})
    