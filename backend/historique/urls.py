from django.contrib import admin
from django.urls import path

from .views import HistoriqueView

urlpatterns = [
    #path('', include(router.urls)),
    path('',HistoriqueView.as_view() ),
    path('<str:pk>/',HistoriqueView.as_view() ),



]
