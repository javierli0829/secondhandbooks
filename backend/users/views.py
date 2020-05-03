from django.shortcuts import render
from .models import User
from rest_framework import viewsets
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filterset_fields = ['id','username', 'email']
