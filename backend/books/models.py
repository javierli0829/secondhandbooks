from django.db import models
from datetime import datetime
from django.contrib.auth import get_user_model

User = get_user_model()

class Book(models.Model):
    """
    Book
    hidden field: id
    """

    category = models.CharField("category",max_length=30, default="")
    name = models.CharField("name",max_length=100)
    author = models.CharField("author",max_length=50)
    description = models.TextField(max_length=1000, null=True)
    postedTime = models.DateTimeField("postedTime",default=datetime.now)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="booksOwned")
    matched = models.BooleanField("matched",default=False)
    peopleInterested = models.ManyToManyField(User, related_name="bookInterested", null=True, blank=True)
    image = models.ImageField(upload_to="books/", null=True, blank=True, verbose_name="image")
    matchedWith = models.ManyToManyField('self', blank=True, null=True, symmetrical=True)

    class Meta:
        verbose_name = 'Book'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name