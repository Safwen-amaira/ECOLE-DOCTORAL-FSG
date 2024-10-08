from django.urls import path
from .views import ChangePassword,ChangePasswordAPIView,UserView,DoctorantView,AdminfView,AdminsView,LogoutView,AdmintView,CustomAuthToken,DoctorantOnlyView,AdminfOnlyView,AdminsOnlyView,AdmintOnlyView

urlpatterns = [

path('reset-pwd/',ChangePasswordAPIView.as_view() ),
path('change-pwd/',ChangePassword.as_view() ),

path('user/',UserView.as_view() ),
path('user/<str:pk>/',UserView.as_view() ),

path('signup/doctorant/',DoctorantView.as_view()),
path('signup/adminf/',AdminfView.as_view()),                                                
path('signup/admins/',AdminsView.as_view()),
path('signup/admint/',AdmintView.as_view()),
path('signup/admint/',AdmintView.as_view()),

path('login/',CustomAuthToken.as_view(),name='auth-token'),
path('logout/',LogoutView.as_view(),name='logout'),


path('doctorant/dashboard/',DoctorantOnlyView.as_view(),name='doctorant-dashboard'),
path('adminf/dashboard/',AdminfOnlyView.as_view(),name='adminf-dashboard'),
path('admins/dashboard/',AdminsOnlyView.as_view(),name='admins-dashboard'),
path('admint/dashboard/',AdmintOnlyView.as_view(),name='admint-dashboard'),



]