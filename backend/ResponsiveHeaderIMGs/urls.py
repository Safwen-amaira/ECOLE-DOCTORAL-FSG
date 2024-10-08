from django.urls import path
from .views import ImageUploadAPIView ,ImageView
urlpatterns = [
    path('api/upload/', ImageUploadAPIView.as_view(), name='image_upload_api'),
    path('api/get/imgs',ImageView.as_view() , name='image_get_api'),
    path('api/get/imgs/<int:pk>/', ImageView.as_view(), name='image_get_api')
            ]
