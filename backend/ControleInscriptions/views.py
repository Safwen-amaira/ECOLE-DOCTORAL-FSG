from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from .models import Preinscription,Ouvrir_Fermer_Inscription
from .serializers import PreinscriptionSerializer,HistoriqueSerializerget
from .forms import PreinscriptionForm
from apiusers.models import User
class PreinscriptionGetter(APIView):
    def get(self, request):
        preinscription = Preinscription.objects.first()  
        if preinscription:
            serializer = PreinscriptionSerializer(preinscription)
            return Response(serializer.data)
        else:
            date_format = "%Y/%m/%d"
            date_str = '2020/02/02'
            end_date = datetime.strptime(date_str, date_format)
            notif = Preinscription.objects.create(is_open=False, end_date=end_date)
            preinscription = Preinscription.objects.first()  
            serializer = PreinscriptionSerializer(preinscription)
            return Response(serializer.data)
class PreinscriptionAPIView(APIView):
    def create_inscription(self, user,action):
        # Create an AssurerIsncription object
        inscri = Ouvrir_Fermer_Inscription.objects.create(IDAdmin=user, action=action)
        return inscri
    def put(self, request):
        preinscription = Preinscription.objects.first()
        form = PreinscriptionForm(request.data, instance=preinscription)
        dt=request.data
        idadmin=dt['admin']
        if preinscription.is_open:
            action='fermer'
        else:
            action='ouvrir'
        admin = User.objects.get(login=idadmin)
        if form.is_valid():
            form.save()
            self.create_inscription(admin, action)
            return Response({'message': 'Preinscription updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
class HistoriqueView(APIView):
      
   def get(self,request,pk=None):
        
        data = Ouvrir_Fermer_Inscription.objects.all()
        serializer = HistoriqueSerializerget(data,many=True)
        return Response(serializer.data) 
       
