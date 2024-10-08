
from django.contrib import admin
from django.urls import path , include
import centrerecherche.urls,etablissement.urls,notification.urls,historique.urls,directeurs.urls,apiusers.urls,actualite.urls,bibliotheque.urls,formation.urls
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('Labo/',include(centrerecherche.urls)),
    path('auth/',include(apiusers.urls)),
    path('actualites/',include(actualite.urls)),
    path('bibliotheque/',include(bibliotheque.urls)),
    path('formation/',include(formation.urls)),
    path('directeur/',include(directeurs.urls)),
    path('etablissement/',include(etablissement.urls)),
    path('historique/',include(historique.urls)),
    path('notification/',include(notification.urls)),



    path('api-demandes/', include('demandes.urls')) ,

    path('api-chercheur/',include('chercheur.urls')),
    path('controlling/preinscription/',include('ControleInscriptions.urls')),
    path('api-headers-imgs/',include('ResponsiveHeaderIMGs.urls'))




]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
