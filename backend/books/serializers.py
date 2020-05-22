from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    ownerName = serializers.SerializerMethodField('getOwnerName')
    def getOwnerName(self, obj):
      return obj.owner.username 
    
    class Meta:
        model = Book
        fields = ('id', 'category', 'name', 'author', 'description',
        'postedTime','owner','matched','peopleInterested','image','matchedWith','ownerName')