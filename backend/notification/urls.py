from django.urls import path

from .views import NotificationView,NotificationNumberView

urlpatterns = [
    path('get/',NotificationView.as_view() ),
    path('number/',NotificationNumberView.as_view() ),



]
