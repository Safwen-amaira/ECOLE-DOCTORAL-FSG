from django.urls import path
from .views import PreinscriptionAPIView
from .views import PreinscriptionGetter,HistoriqueView
urlpatterns = [
    path('preinscription/api/', PreinscriptionAPIView.as_view(), name='preinscription_api'),
    path('preinscription/api/getter',PreinscriptionGetter.as_view(),name='preinscription_getter'),
    path('historique/',HistoriqueView.as_view())

]
