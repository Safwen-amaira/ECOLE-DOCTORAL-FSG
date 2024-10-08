
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ActualiteViewSet

'''router = DefaultRouter()
router.register('Actualite', ActualiteViewSet, basename='actualite')

urlpatterns = [
    path('', include(router.urls)),
]'''


urlpatterns = [
    #path('', include(router.urls)),
    path('',ActualiteViewSet.as_view() ),
    path('<str:pk>/',ActualiteViewSet.as_view() ),



]