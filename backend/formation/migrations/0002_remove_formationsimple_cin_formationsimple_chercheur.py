# Generated by Django 5.0.4 on 2024-05-15 19:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chercheur', '0008_alter_chercheur_convention'),
        ('formation', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='formationsimple',
            name='cin',
        ),
        migrations.AddField(
            model_name='formationsimple',
            name='chercheur',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='chercheur.chercheur'),
        ),
    ]
