# Generated by Django 3.0.3 on 2020-04-27 11:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(default='', max_length=30, verbose_name='category')),
                ('name', models.CharField(max_length=100, verbose_name='name')),
                ('author', models.CharField(max_length=50, verbose_name='author')),
                ('description', models.TextField(max_length=1000)),
                ('postedTime', models.DateTimeField(default=datetime.datetime.now, verbose_name='postedTime')),
                ('matched', models.BooleanField(default=False, verbose_name='matched')),
                ('image', models.ImageField(blank=True, null=True, upload_to='books/images/', verbose_name='image')),
            ],
            options={
                'verbose_name': 'Book',
                'verbose_name_plural': 'Book',
            },
        ),
    ]
