from django.contrib import admin
from django.urls import path,include

from .views import Directeurview,DirecteurIdView,DirecteurNumberView

urlpatterns = [
    #path('', include(router.urls)),
    path('details/',Directeurview.as_view() ),
    path('details/<str:pk>/',Directeurview.as_view() ),
    path('id/<str:pk>/',DirecteurIdView.as_view() ),
    path('id/',DirecteurIdView.as_view() ),

    path('number/',DirecteurNumberView.as_view() ),


]
