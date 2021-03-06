# Generated by Django 2.2 on 2020-02-25 07:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('singer', models.TextField(blank=True)),
                ('rating', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(blank=True, null=True)),
                ('starsIdx', models.IntegerField(default=1)),
                ('starsRating', models.IntegerField(default=1)),
                ('userId', models.TextField(default='unknown')),
                ('userName', models.TextField(default='unknown')),
                ('userImage', models.TextField(default='nan')),
                ('song', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='oneLine.Song')),
            ],
        ),
    ]
