from django.shortcuts import render
from .models import Book
from rest_framework import viewsets, filters
from .serializers import BookSerializer


class BookViewSet(viewsets.ModelViewSet):
    """
    API endpoint for books
    """
    queryset = Book.objects.all().order_by('-postedTime')
    serializer_class = BookSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    filterset_fields = ['id', 'category', 'name', 'author', 'description',
        'postedTime','owner','matched']
    search_fields = ('description',)
   
