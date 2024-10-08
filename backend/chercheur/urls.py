from django.urls import path
from .views import CreatePreInscription,Inscriptioget ,ChercheurIdView, GetChercher,UpdateChercheur , GetAllChercher,UpdateChercheurALLInfo,ChercheurNumber
urlpatterns = [
    path('create_inscription/',CreatePreInscription.as_view(), name='create_inscription'),
    path('api/get_inscription/<str:cin>/', GetChercher.as_view(), name='get_inscription'),
    path ('get_all_inscriptions/',GetAllChercher.as_view(),name='get_all_inscription'),
    path('update_inscription/<int:demandeID>/', UpdateChercheur.as_view(),name='update_inscription'),
    path('update_chercher_informations/<str:cin>/',UpdateChercheurALLInfo.as_view(),name='update_chercher_all_info') ,
    path('chercheur-id/<str:pk>/',ChercheurIdView.as_view() ),
    path('chercheur-id/',ChercheurIdView.as_view() ),
    path('inscription-list/',Inscriptioget.as_view() ),
    path('number/',ChercheurNumber.as_view() ),

]