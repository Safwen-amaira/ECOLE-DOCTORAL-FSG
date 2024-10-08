from django.contrib import admin
from django.urls import path
from .views import CreateDemande , GetDemandes,GetAllDemandes , UpdateDemandeStateView , getDemandeByID
urlpatterns = [
    path('create_new_demande/', CreateDemande.as_view()  , name='Depose_Demande'),
    path('get_users_demande/<str:cin>',GetDemandes.as_view(),name='GetDemandes'),
    path('get_all_demandes/',GetAllDemandes.as_view(),name='FetchAllDemandes'),
    path('update_demande_state/<int:id>/', UpdateDemandeStateView.as_view(), name='update_demande_state'),
    path ('get_demande_using_id/<int:id>/', getDemandeByID.as_view(),name='get_demande_by_id'),
]
