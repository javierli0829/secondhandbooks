from django.shortcuts import render
from .models import Book
from rest_framework import viewsets, filters
from .serializers import BookSerializer
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
import json
from books.serializers import BookSerializer
from django.http import HttpResponse
from celery import task
from django.core import serializers

User = get_user_model()

@task
def asyncEmail(receiver,content):
    send_mail('Notification from Secondhandbook', content, 'epiphanyandy@yahoo.com',
            [receiver], fail_silently=False)

def match(request,person,book):
    us = User.objects.get(pk=person)
    bk = Book.objects.get(pk=book)
    ow = bk.owner
    mybooks = set(us.booksOwned.all())
    owInterested = set(ow.bookInterested.all())
    matched = mybooks & owInterested
    matchedResult = []
    for b in matched:
        if not b.matched:
            book = BookSerializer(b).data
            matchedResult.append(book)
    response_data = {}
    response_data['matchedBooks'] = list(matchedResult)
    response_data['booksOwner'] = ow.username
    res = json.dumps(response_data)
    return HttpResponse(res, content_type="application/json")


class BookViewSet(viewsets.ModelViewSet):
    """
    API endpoint for books
    """
    queryset = Book.objects.all().order_by('-postedTime')
    serializer_class = BookSerializer
  #  filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    filterset_fields = ['id', 'category', 'name', 'author', 'description',
        'postedTime','owner','matched']
  #  search_fields = ('description',)
   
    def partial_update(self, request, pk=None):
        if 'peopleInterested' in request.data:
            book = Book.objects.get(id=pk)
            bookOwner = book.owner
            oldPeopleInterested = set(book.peopleInterested.all())
            newPeopleInterested = set(request.data['peopleInterested'])
            if newPeopleInterested and oldPeopleInterested != newPeopleInterested:
                newPeopleId = newPeopleInterested.difference(oldPeopleInterested).pop()
                newPeople = User.objects.get(id=newPeopleId)
                emailContent = 'Hi, user '+bookOwner.username+', Your book: '
                emailContent += book.name 
                emailContent += ' is marked interested by a new user: '
                emailContent += newPeople.username
                emailContent += '.' 
                asyncEmail.delay(bookOwner.email,emailContent)  
        return super().partial_update(request, pk)