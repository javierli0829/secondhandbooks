# Generated by Django 3.0.3 on 2020-04-27 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_auto_20200427_1146'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='books/', verbose_name='image'),
        ),
    ]
