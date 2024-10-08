from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import HeaderImage
from .serializers import ImageSerializer

class ImageUploadAPIView(APIView):
    def post(self, request, format=None):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class ImageView(APIView):
    def get(self, request, format=None):
        images = HeaderImage.objects.all()
        serializer = ImageSerializer(images, many=True)
        return Response(serializer.data)
    
    def delete(self, request, pk, format=None):
        try:
            image = HeaderImage.objects.get(pk=pk)
        except HeaderImage.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
