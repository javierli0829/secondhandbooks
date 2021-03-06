"""bookExchange URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from users.views import UserViewSet
from books.views import BookViewSet
from chat.views import chat
from books.views import match
from books.views import quickMatch
from django.views.static import serve
from bookExchange.settings import MEDIA_ROOT
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'book', BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('match/<person>/<book>',match, name='match-url'),
    path('quickMatch/<person>',quickMatch, name='quickmatch-url'),
    path('chat/<username>', chat, name='chat-url'),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('media/<path:path>',serve,{'document_root':MEDIA_ROOT}),
]