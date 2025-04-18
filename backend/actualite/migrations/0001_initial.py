# Generated by Django 5.0.4 on 2024-05-16 16:49

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Actualite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=400)),
                ('remarque', models.CharField(max_length=300)),
                ('file', models.FileField(upload_to='store/files/')),
                ('date_creation', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Controler',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action', models.CharField(max_length=200)),
                ('date_creation', models.DateField(auto_now_add=True)),
                ('IDActualite', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='actualite.actualite')),
                ('IdAdmin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
