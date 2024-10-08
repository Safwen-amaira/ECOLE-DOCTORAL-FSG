from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter

from .views import Laboview,LaboIdView,LaboNumberView
'''router = DefaultRouter()
router.register('Labo', Laboview, basename='labo')'''
urlpatterns = [
    #path('', include(router.urls)),
    path('details/',Laboview.as_view() ),
    path('details/<str:pk>/',Laboview.as_view() ),
      path('id/<str:pk>/',LaboIdView.as_view() ),
    path('id/',LaboIdView.as_view() ),

    path('number/',LaboNumberView.as_view() ),


]
