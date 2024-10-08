
from django.urls import path
from .views import ArticleView,TheseView,DemandeView



urlpatterns = [

    path('article/',ArticleView.as_view() ),
    path('article/<str:pk>/',ArticleView.as_view() ),

    path('these/',TheseView.as_view() ),
    path('these/<str:pk>/',TheseView.as_view() ),

    path('document/',DemandeView.as_view() ),
    path('document/<str:pk>/',DemandeView.as_view() ),



]