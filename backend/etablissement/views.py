from .models import Etablissement
from django.http.response import JsonResponse
from .serializers import EtablissementSerializer
from rest_framework.views import APIView

from django.http.response import Http404
from rest_framework.response import Response
# Create your views here.

class EtablissementView(APIView):
   def post(self,request):
        data = request.data
        serializer = EtablissementSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(" Etablissemet créée avec succès",status=200 ,safe=False)
        return JsonResponse(serializer.errors,status=400 , safe=False)    
   def get_Etab(self,pk):
        try:
            etab = Etablissement.objects.get(id=pk) 
            return etab
        except EtablissementSerializer.DoesNotExist:
            raise Http404


   def get(self,request,pk=None):
        if pk:
            data = self.get_Etab(pk)
            serializer = EtablissementSerializer(data)
        else:
            data = Etablissement.objects.all()
            serializer = EtablissementSerializer(data,many=True)
        return Response(serializer.data) 
   def put(self,request,pk):
        Etab_to_update = Etablissement.objects.get(id=pk)
        serializer = EtablissementSerializer(instance=Etab_to_update,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Update Etablissemet with success",status=200 , safe=False)
        return JsonResponse("update Etablissemet failed ", status=400, safe=False)
   def delete(self,request,pk):
        Etab_to_delete = Etablissement.objects.get(id=pk)
        Etab_to_delete.delete()
        
        return JsonResponse("Delete Etablissemet with success", safe=False)
        
class EtablissementNumberView(APIView):
    def get(self, request):
        count = Etablissement.objects.count()
        return Response({'count': count})