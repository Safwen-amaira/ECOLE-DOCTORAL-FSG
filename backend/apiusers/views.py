from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.http.response import JsonResponse
from rest_framework import status
from .models import User
from .permissions import IsAdminfUser,IsAdminsUser,IsDoctorantUser,IsAdmintUser
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.exceptions import ValidationError
from django.http.response import Http404
from django.core.mail import send_mail
from backend.settings import EMAIL_HOST_USER

from .serializers import UserSerializer,AdminfSerializer,AdminsSerializer,AdmintSerializer,DoctorantSerializer
# Create your views here.
from chercheur.models import Chercheur

class UserView(APIView):
    def delete(self,request,pk):
        user_to_delete = User.objects.get(login=pk)
        user_to_delete.delete()
        
        return JsonResponse("delete user with success", status=200,safe=False)
    def put(self,request,pk):
        user_to_update = User.objects.get(login=pk)
        serializer = UserSerializer(instance=user_to_update,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("update user with success", safe=False)
        return JsonResponse("update user failed ", status=200, safe=False)
    def get_user(self,pk):
        try:
            user = User.objects.get(login=pk) 
            return user
        except User.DoesNotExist:
            raise Http404    
    def get(self,request,pk=None):
        if pk:
            data = self.get_user(pk)
            serializer =UserSerializer (data)
        else:
            data = User.objects.all()
            serializer = UserSerializer(data,many=True)
        return Response(serializer.data)


class ChangePasswordAPIView(APIView):
    def get_user(self,pk):
        try:
            user = User.objects.get(login=pk) 
            return user
        except User.DoesNotExist:
            raise Http404 
    def put(self, request):
        data=request.data
        user = self.get_user(data['login'])
        subject="Nouvelle mot de passe  "
        message="tu peut maintenant accede au votre compte avec login:"+data['login']+" et mot de pass :"+data['new_password']
        email=user.email
        recipient_list=[email]


        send_mail(subject,message,EMAIL_HOST_USER,recipient_list,fail_silently=True)
        
        
        new_password = data['new_password']
        user.set_password(new_password)
        user.save()

        return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)

class ChangePassword(APIView):
    def get_user(self,pk):
        try:
            user = User.objects.get(login=pk) 
            return user
        except User.DoesNotExist:
            raise Http404 
    def put(self, request):
        data = request.data
        login = data.get('login')
        old_password = data.get('Apassword')
        new_password = data.get('Npassword1')

        
        user = self.get_user(login)

        if not user.check_password(old_password):
            return Response({'erreur': 'L\'ancien mot de passe est incorrect'}, status=status.HTTP_400_BAD_REQUEST)
        print(new_password)
        user.set_password(new_password)
        user.save()

        subject = "Mot de passe changé avec succès"
        message = f"Bonjour {user.username},\n\nVotre mot de passe a été changé avec succès.\n\nIdentifiant: {login}\nNouveau mot de passe: {new_password}"
        email = user.email
        recipient_list = [email]

        send_mail(subject, message, EMAIL_HOST_USER, recipient_list, fail_silently=True)

        return Response({'message': 'Mot de passe mis à jour avec succès'}, status=status.HTTP_200_OK)


class DoctorantView(generics.GenericAPIView):
    
    def post(self, request):
        data=request.data
        serializer = DoctorantSerializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            token = Token.objects.get(user=user).key
            subject="votre compte au Ecole Doctorat FSG  "
            message="tu peut maintenant accede au votre compte avec login:"+data['login']+" et mot de pass :"+data['password']
            email=data['email']
            recipient_list=[email]
            send_mail(subject,message,EMAIL_HOST_USER,recipient_list,fail_silently=True)
   
            chercheur = Chercheur.objects.create(
                Etablissement=data['etablissement'],
                email=data['email'],
                cin=data['login'],
                Nom=data['username'], 
                Prenom=data['username'],
                State='Accepted' # Assuming login is the Cin
                # You can set other fields as per your requirements
            )


            send_mail(subject,message,EMAIL_HOST_USER,recipient_list,fail_silently=True)
            return JsonResponse({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": token,
                "message": "Account created successfully"
            }, status=200)
        except ValidationError as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)  
              
class AdminfView(generics.GenericAPIView):
    serializer_class = AdminfSerializer
    
    def post(self, request):
        data=request.data
        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            token = Token.objects.get(user=user).key
            subject="compte administrateur au Ecole Doctorat FSG"
            message="tu peut maintenant accede au votre compte avec "+data['login']+" et mot de pass :"+data['password']
            email=data['email']
            recipient_list=[email]
            send_mail(subject,message,EMAIL_HOST_USER,recipient_list,fail_silently=True)

            return JsonResponse({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": token,
                "message": "Account admin niveau 1 created successfully"
            }, status=200)
        except ValidationError as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Token.DoesNotExist:
            return JsonResponse({"error": "Token retrieval failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AdminsView(generics.GenericAPIView):
    serializer_class = AdminsSerializer
    
    def post(self, request):
        data=request.data
        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            token = Token.objects.get(user=user).key

            subject="compte administrateur au Ecole Doctorat FSG"
            message="tu peut maintenant accede au votre compte avec "+data['login']+" et mot de pass :"+data['password']
            email=data['email']
            recipient_list=[email]
            send_mail(subject,message,EMAIL_HOST_USER,recipient_list,fail_silently=True)

            return JsonResponse({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": token,
                "message": "Account admin niveau 2 created successfully"
            }, status=200)
        except ValidationError as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Token.DoesNotExist:
            return JsonResponse({"error": "Token retrieval failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AdmintView(generics.GenericAPIView):
    serializer_class = AdmintSerializer
    
    def post(self, request):
        data=request.data
        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            token = Token.objects.get(user=user).key

            subject="compte administrateur au Ecole Doctorat FSG"
            message="tu peut maintenant accede au votre compte avec "+data['login']+" et mot de pass :"+data['password']
            email=data['email']
            recipient_list=[email]
            send_mail(subject,message,EMAIL_HOST_USER,recipient_list,fail_silently=True)

            return JsonResponse({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": token,
                "message": "Account admin niveau 3 created successfully"
            }, status=200)
        except ValidationError as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Token.DoesNotExist:
            return JsonResponse({"error": "Token retrieval failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer=self.serializer_class(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)
        user=serializer.validated_data['user']
        token ,created=Token.objects.get_or_create(user=user)
       
        return JsonResponse({
                'token': token.key,
                'user_id':user.pk,
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                     
            })
class LogoutView(APIView):
    def post(self,request,format=None):
        request.auth.delete()
        return Response(status=status.HTTP_200_OK)


class DoctorantOnlyView(generics.RetrieveAPIView):
    permission_classes=[IsDoctorantUser]
    serializer_class=UserSerializer
    def get_object(self):
        return self.request.user
    

class AdminfOnlyView(generics.RetrieveAPIView):
    permission_classes=[IsAdminfUser]
    serializer_class=UserSerializer
    def get_object(self):
        return self.request.user
    

class AdminsOnlyView(generics.RetrieveAPIView):
    permission_classes=[IsAdminsUser]
    serializer_class=UserSerializer
    def get_object(self):
        return self.request.user
    

class AdmintOnlyView(generics.RetrieveAPIView):
    permission_classes=[IsAdmintUser]
    serializer_class=UserSerializer
    def get_object(self):
        return self.request.user
