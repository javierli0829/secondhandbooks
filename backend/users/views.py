from django.shortcuts import render
from .models import User
from books.models import Book
from rest_framework import viewsets
from .serializers import UserSerializer
from books.serializers import BookSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filterset_fields = ['id','username', 'email']
    
    def list(self, request):
        if 'username' in request.query_params.keys():
            
            username = request.query_params['username']
            user = User.objects.filter(username = username)[0]
            return self.retrieve(request,pk=user.id)
        queryset = User.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        result_set = serializer.data
        users = queryset
        for id in range(0,len(users)):
            books = users[id].bookInterested.all()
            bookList = BookSerializer(books, many=True).data
            result_set[id]['bookInterested'] = bookList
            for b in result_set[id]['bookInterested']:
                if b['image']:
                    b['image']='http://127.0.0.1:8000'+b['image']
        return Response(result_set)
    

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = self.get_serializer(user)
        result_set = serializer.data
        books = user.bookInterested.all()
        bookList = BookSerializer(books, many=True).data
        result_set['bookInterested'] = bookList
        for b in result_set['bookInterested']:
             if b['image']:
                    b['image']='http://127.0.0.1:8000'+b['image']
        return Response(result_set)
  
    