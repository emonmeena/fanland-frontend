# Generated by Django 3.1.7 on 2021-03-17 11:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0041_auto_20210317_1637'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='fanclub',
            name='top_fans',
        ),
    ]