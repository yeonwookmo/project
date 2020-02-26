from django.shortcuts import render
from rest_framework import viewsets
from .serializers import SongSerializer, CommentSerializer
from .models import Song, Comment



class SongView(viewsets.ModelViewSet):
	serializer_class = SongSerializer
	def get_queryset(self):
		queryset = Song.objects.all()
		songname = self.request.query_params.get('title', None)
		if songname is not None:
			queryset = queryset.filter(title=songname)
		return queryset

# Create your views here.

class CommentView(viewsets.ModelViewSet):
	serializer_class = CommentSerializer
	def get_queryset(self):
		queryset = Comment.objects.all()
		songname = self.request.query_params.get('song', None)
		if songname is not None:
			queryset = queryset.filter(song=songname)
		return queryset