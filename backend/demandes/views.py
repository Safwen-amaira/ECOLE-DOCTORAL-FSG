from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .forms import DemandeForm 
from .models import Demandes
from chercheur.models import Chercheur
from notification.models import Notification
from .Serializer import  DemandeSerializer,DemandeSerializerget


class CreateDemande(APIView):
    def create_notification(self, user,action):
        # Create an AssurerIsncription object
        notif = Notification.objects.create(user=user, action=action)
        return notif
 
    parser_classes = [MultiPartParser, FormParser]

    def post(self,request):
        data = request.data
        serializer = DemandeSerializer(data=data)

        if serializer.is_valid():
          article = serializer.save()

          chercheur = article.chercheur
          usernotif = chercheur
          self.create_notification(usernotif, "a ajouté une demande ") 
          return JsonResponse(" create Demande successsfuly",safe=False)
        return JsonResponse(" failed to add Demande" ,status=404, safe=False) 
class GetDemandes(APIView):
    def get(self,request,cin):
        try:
            chercheur = Chercheur.objects.get(cin=cin)

            demande = Demandes.objects.filter(chercheur=chercheur)
            serializer = DemandeSerializer(demande,many = True)
            return Response(list(serializer.data))
        except Demandes.DoesNotExist:
            return Response({"dontExist": "true"}, status=404)
class GetAllDemandes(APIView):
    def get (self,request):
        try:
            demande = Demandes.objects.all()
            serializer = DemandeSerializerget(demande,many=True)
            return Response(list(serializer.data))
        except Demandes.DoesNotExist:
            return Response({'tableExist':'false'},status=404)
class UpdateDemandeStateView(APIView):
    def put(self, request, id):
        try:
            demande = Demandes.objects.get(id=id)
            new_state = request.data.get('new_state')
            demande.State = new_state
            demande.save()
            serializer = DemandeSerializer(demande)
            return Response(serializer.data, status=200)
        except Demandes.DoesNotExist:
            return Response({'error': 'Demande not found'}, status=404)
class getDemandeByID(APIView):
    def get(self, request, id):
        try:
            # Use get() instead of filter() if only one demand is expected
            demande = Demandes.objects.get(id=id)
            serializer = DemandeSerializer(demande, many=False)
            return Response(serializer.data)
        except Demandes.DoesNotExist:
            return Response({"error": "Demande not found"}, status=404)