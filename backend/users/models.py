from django.db import models
from datetime import datetime
from django.contrib.auth.models import AbstractUser, UserManager

class CustomUserManager(UserManager):
    pass

class User(AbstractUser):
    """
    User profile
    hidden fields:
    username
    email
    """
    image = models.ImageField(upload_to="users/", null=True, blank=True, verbose_name="image")
    address = models.TextField(max_length=1000, null=True)
    class Meta(AbstractUser.Meta):
        verbose_name = "User"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username




