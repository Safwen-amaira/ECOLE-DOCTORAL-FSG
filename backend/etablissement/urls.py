from django.urls import path
from .views import EtablissementView,EtablissementNumberView




urlpatterns = [
    path('details/',EtablissementView.as_view() ),
    path('details/<str:pk>/',EtablissementView.as_view() ),
    path('number/',EtablissementNumberView.as_view() ),



]