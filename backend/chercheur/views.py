
import datetime
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from django.http import JsonResponse
from .forms import ChercherForm
from .models import Chercheur,AssurerIsncription
from django.http.response import Http404
from apiusers.models import User
from .serializers import ChercherSerializer,AssurerIsncriptionSerializerget
from notification.models import Notification
class Inscriptioget(APIView):
    def get(self,request,pk=None):
        
         data = AssurerIsncription.objects.all()
         serializer = AssurerIsncriptionSerializerget(data,many=True)
         return Response(serializer.data)


class ChercheurIdView(APIView):
     def put(self,request,pk):
        cherch_to_update = Chercheur.objects.get(cin=pk)
        serializer = ChercherSerializer(instance=cherch_to_update,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Update Chercheur with success", status=200,safe=False)
        return JsonResponse("update Chercheur failed ", status=400, safe=False)
     def get_cher(self,pk):
        try:
            cher = Chercheur.objects.get(id=pk) 
            return cher
        except Chercheur.DoesNotExist:
            raise Http404


     def get(self,request,pk=None):
        if pk:
            data = self.get_cher(pk)
            serializer = ChercherSerializer(data)
        else:
            data = Chercheur.objects.all()
            serializer = ChercherSerializer(data,many=True)
        return Response(serializer.data) 
class CreatePreInscription(APIView):
    def create_notification(self, user,action):
        # Create an AssurerIsncription object
        notif = Notification.objects.create(user=user, action=action)
        return notif
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request):
        form = ChercherForm(request.POST, request.FILES)
      ##  print(request.POST)
        fcin = request.POST.get('cin') 
        if Chercheur.objects.filter(cin=fcin).exists():
            return JsonResponse({"error": "CIN already exists", "CinExist":True}, status=333)

        if form.is_valid():
            
            chercheur = form.save()

            
            usernotif = chercheur
            self.create_notification(usernotif, "a ajouté une demande d'inscription") 

            return JsonResponse({'success': True}, status=200)
        else:

            errors = {field: form.errors[field][0] for field in form.errors}
            return JsonResponse({'success': False, 'errors': errors}, status=400)



class GetChercher(APIView):

    def get(self, request, cin):
        try:
            demande = Chercheur.objects.get(cin=cin)
            serializer = ChercherSerializer(demande ,many = False)
            return Response(serializer.data )
        except Chercheur.DoesNotExist:
            raise NotFound({"error": "CIN not found"})

class GetAllChercher(APIView):

    def get(self, request):
        try:
            demande =Chercheur.objects.all()
            serializer = ChercherSerializer(demande, many=True)
            return Response(serializer.data)
        except Chercheur.DoesNotExist:
            return Response({'DontExist':'True'}, status=404)
        



        
class UpdateChercheur(APIView):
    def create_assurer_inscription(self, chercheur, admin, action):
        # Create an AssurerIsncription object
        assurer_inscription = AssurerIsncription.objects.create(IdChercheur=chercheur, IdAdmin=admin, action=action)
        return assurer_inscription

    
    def put (self , request,demandeID): 
        try :
            demande=Chercheur.objects.get(id=demandeID)
            new_state=request.data.get('State')
            action=request.data.get('action')
            login=request.data.get('admin')
            user=User.objects.get(login=login)

            demande.State=new_state
            demande.save()
            self.create_assurer_inscription(demande, user,action)

            return Response({'updated':True}, status=200)
        except Chercheur.DoesNotExist:
            return Response({'error':True},status=404)
class UpdateChercheurALLInfo(APIView):
   
    def put(self, request,cin):
        try:
            chercheur = Chercheur.objects.get(cin=cin)
            form = ChercherForm(request.data, instance=chercheur)
        except Chercheur.DoesNotExist:
            return Response({"error": "Chercheur not found"}, status=404)

        if form.is_valid():
            form.save()
            return Response({'success': True}, status=200)
        else:
            errors = {field: form.errors[field][0] for field in form.errors}
            return Response({'success': False, 'errors': errors}, status=400)
        

       
       
              



class ChercheurNumber(APIView):
    def get(self, request):
        count = Chercheur.objects.count()
        return Response({'count': count}) 