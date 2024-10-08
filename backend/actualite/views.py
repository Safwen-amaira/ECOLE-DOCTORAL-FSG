from django.shortcuts import render
from .models import Actualite, Controler
from apiusers.models import User
from django.http.response import JsonResponse
from rest_framework import viewsets
from .serializers import ActualiteSerializer
from rest_framework.views import APIView
from django.http.response import Http404
from rest_framework.response import Response
# Create your views here.
from django.core.mail import send_mail
from backend.settings import EMAIL_HOST_USER

class ActualiteViewSet(APIView):
   def create_controler(self, actualite, admin,action):
        # Create a Controler object
        controler = Controler.objects.create(IDActualite=actualite, IdAdmin=admin,action=action)
        return controler
   
# Create your views here.

    
   def post(self,request):
        data = request.data
        subject = "EDSEN Publier une nouvelle actualité"
        message = "Nouvelle actualité " + data['titre']
    
        users = User.objects.all()
        email = [user.email for user in users]  # List comprehension for brevity
    
        recipient_list = email

        
        #add notif

        serializer = ActualiteSerializer(data=data)
        user=User.objects.get(login=data['admin'])
        if serializer.is_valid():
            send_mail(subject, message, EMAIL_HOST_USER, recipient_list)
            actualite = serializer.save()
            self.create_controler(actualite, user,"ajouter")

            return JsonResponse(" create Actualite successsfuly",safe=False)
        return JsonResponse(" failed to add Actualite" , safe=False)    
   def get_act(self,pk):
        try:
            act = Actualite.objects.get(id=pk) 
            return act
        except Actualite.DoesNotExist:
            raise Http404


   def get(self,request,pk=None):
        if pk:
            data = self.get_act(pk)
            serializer = ActualiteSerializer(data)
        else:
            data = Actualite.objects.all()
            serializer = ActualiteSerializer(data,many=True)
        return Response(serializer.data) 
   def put(self,request,pk):
        Act_to_update = Actualite.objects.get(id=pk)
        serializer = ActualiteSerializer(instance=Act_to_update,data=request.data,partial=True)
        data=request.data
        user=User.objects.get(login=data['admin'])

        if serializer.is_valid():
            actualite = serializer.save()
            self.create_controler(actualite, user,"modifier")
            return JsonResponse("update Actualite with success", safe=False)
        return JsonResponse("update Actualite failed ", status=200, safe=False)
   def delete(self,request,pk): 
              
        Act_to_delete = Actualite.objects.get(id=pk)
        Act_to_delete.delete()
        
        return JsonResponse("delete Actualite with success", safe=False)
        

