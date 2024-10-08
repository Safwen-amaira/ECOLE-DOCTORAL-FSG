from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from .models import Article,These,Document
from django.http.response import JsonResponse
from .serializers import ArticleSerializer,TheseSerializer,DemandeSerializer,TheseSerializerget,ArticleSerializerget
from rest_framework.views import APIView
from notification.models import Notification

from django.http.response import Http404
from rest_framework.response import Response
# Create your views here.

class ArticleView(APIView):
   def create_notification(self, user,action):
        # Create an AssurerIsncription object
        notif = Notification.objects.create(user=user, action=action)
        return notif
 
   def post(self,request):
        data = request.data
        serializer = ArticleSerializer(data=data)
        


        if serializer.is_valid():
          article = serializer.save()

          chercheur = article.chercheur
          usernotif = chercheur
          self.create_notification(usernotif, "a ajouté un article")      
          return JsonResponse(" create Article successsfuly",status=200,safe=False)
        return JsonResponse(" failed to add Article" ,status=404, safe=False)    
   def get_article(self,pk):
        try:
            article = Article.objects.get(id=pk) 
            return article
        except Article.DoesNotExist:
            raise Http404


   def get(self,request,pk=None):
        if pk:
            data = self.get_article(pk)
            serializer = ArticleSerializerget(data)
        else:
            data = Article.objects.all()
            serializer = ArticleSerializerget(data,many=True)
        return Response(serializer.data) 
   def put(self,request,pk):
        Act_to_update = Article.objects.get(id=pk)
        serializer = ArticleSerializer(instance=Act_to_update,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("update Article with success", safe=False)
        return JsonResponse("update Article failed ", status=404, safe=False)
   def delete(self,request,pk):
        Article_to_delete = Article.objects.get(id=pk)
        Article_to_delete.delete()
        
        return JsonResponse("delete Article with success", safe=False)
        

class TheseView(APIView):
   def create_notification(self, user,action):
        # Create an AssurerIsncription object
        notif = Notification.objects.create(user=user, action=action)
        return notif
    
   def post(self,request):
        data = request.data
        serializer = TheseSerializer(data=data)

        if serializer.is_valid():
          these = serializer.save()

          chercheur = these.chercheur
          usernotif = chercheur
          self.create_notification(usernotif, "a ajouté un these")  
          return JsonResponse(" create these successsfuly",status=200,safe=False)
        return JsonResponse(" failed to add these" ,status=404, safe=False)    
   def get_these(self,pk):
        try:
            these = These.objects.get(id=pk) 
            return these
        except These.DoesNotExist:
            raise Http404


   def get(self,request,pk=None):
        if pk:
            data = self.get_these(pk)
            serializer = TheseSerializerget(data)
        else:
            data = These.objects.all()
            serializer = TheseSerializerget(data,many=True)
        return Response(serializer.data) 
   def put(self,request,pk):
        Act_to_update = These.objects.get(id=pk)
        serializer = TheseSerializer(instance=Act_to_update,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("update these with success", safe=False)
        return JsonResponse("update these failed ", status=404, safe=False)
   def delete(self,request,pk):
        these_to_delete = These.objects.get(id=pk)
        these_to_delete.delete()
        
        return JsonResponse("delete these with success", safe=False)
   
class DemandeView(APIView):
    
   def post(self,request):
        data = request.data
        serializer = DemandeSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(" create Demande successsfuly",safe=False)
        return JsonResponse(" failed to add Demande" , status=404,safe=False)    
   def Demande_labo(self,pk):
        try:
            doc = Document.objects.get(id=pk) 
            return doc
        except Document.DoesNotExist:
            raise Http404


   def get(self,request,pk=None):
        if pk:
            data = self.get_Demande(pk)
            serializer = DemandeSerializer(data)
        else:
            data = Document.objects.all()
            serializer = DemandeSerializer(data,many=True)
        return Response(serializer.data) 
   def put(self,request,pk):
        Act_to_update = Document.objects.get(id=pk)
        serializer = DemandeSerializer(instance=Act_to_update,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("update Demande with success", safe=False)
        return JsonResponse("update Demande failed ", status=200, safe=False)
   def delete(self,request,pk):
        demande_to_delete = Document.objects.get(id=pk)
        demande_to_delete.delete()
        
        return JsonResponse("delete Demande with success", safe=False)