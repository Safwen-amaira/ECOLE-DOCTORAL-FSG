from django.urls import path
from .views import FormationPedagogiqueView,FormationSimpleView




urlpatterns = [
    path('simple/',FormationSimpleView.as_view() ),
    path('simple/<str:pk>/',FormationSimpleView.as_view() ),
    path('pedagogique/',FormationPedagogiqueView.as_view() ),
    path('pedagogique/<str:pk>/',FormationPedagogiqueView.as_view() ),



]