from .models import FormationPedagogique,FormationSimple
from django.http.response import JsonResponse
from .serializers import FormationPedagogiqueSerializer,FormationPedagogiqueSerializerget,FormationSimpleSerializer,FormationSimpleSerializerget
from rest_framework.views import APIView

from django.http.response import Http404
from rest_framework.response import Response
from notification.models import Notification
# Create your views here.

class FormationSimpleView(APIView):
   def create_notification(self, user,action):
        # Create an AssurerIsncription object
        notif = Notification.objects.create(user=user, action=action)
        return notif
 
   def post(self,request):
        data = request.data
        serializer = FormationSimpleSerializer(data=data)

        if serializer.is_valid():
          forma = serializer.save()

          chercheur = forma.chercheur
          usernotif = chercheur
          self.create_notification(usernotif, "a ajouté une formation") 
          return JsonResponse(" Formation Simple créée avec succès",safe=False)
        return JsonResponse(serializer.errors,status=400 , safe=False)    
   def get_for(self,pk):
        try:
            formation = FormationSimple.objects.get(id=pk) 
            return formation
        except FormationSimple.DoesNotExist:
            raise Http404


   def get(self,request,pk=None):
        if pk:
            data = self.get_for(pk)
            serializer = FormationSimpleSerializerget(data)
        else:
            data = FormationSimple.objects.all()
            serializer = FormationSimpleSerializerget(data,many=True)
        return Response(serializer.data) 
   def put(self,request,pk):
        For_to_update = FormationSimple.objects.get(id=pk)
        serializer = FormationSimpleSerializer(instance=For_to_update,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Update Formation with success", safe=False)
        return JsonResponse("update Formation failed ", status=400, safe=False)
   def delete(self,request,pk):
        For_to_delete = FormationSimple.objects.get(id=pk)
        For_to_delete.delete()
        
        return JsonResponse("Delete Formation with success", safe=False)
        

class FormationPedagogiqueView(APIView):
   def create_notification(self, user,action):
        # Create an AssurerIsncription object
        notif = Notification.objects.create(user=user, action=action)
        return notif
 
  


# Create your views here.

    
   def post(self,request):
        data = request.data
        serializer = FormationPedagogiqueSerializer(data=data)

        if serializer.is_valid():
          forma = serializer.save()

          chercheur = forma.chercheur
          usernotif = chercheur
          self.create_notification(usernotif, "a ajouté une formation") 
          return JsonResponse("Formation Pedagogique créée avec succès",safe=False)
        return JsonResponse(" failed to add Formation", status=400 , safe=False)    
   def get_for(self,pk):
        try:
            formation = FormationPedagogique.objects.get(id=pk) 
            return formation
        except FormationSimple.DoesNotExist:
            raise Http404


   def get(self,request,pk=None):
        if pk:
            data = self.get_for(pk)
            serializer = FormationPedagogiqueSerializerget(data)
        else:
            data = FormationPedagogique.objects.all()
            serializer = FormationPedagogiqueSerializerget(data,many=True)
        return Response(serializer.data) 
   def put(self,request,pk):
        For_to_update = FormationPedagogique.objects.get(id=pk)
        serializer = FormationPedagogiqueSerializer(instance=For_to_update,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Update Formation with success", safe=False)
        return JsonResponse("update Formation failed ", status=200, safe=False)
   def delete(self,request,pk):
        For_to_delete = FormationPedagogique.objects.get(id=pk)
        For_to_delete.delete()
        
        return JsonResponse("Delete Formation with success", safe=False)
        


