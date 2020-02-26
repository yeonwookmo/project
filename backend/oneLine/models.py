from django.db import models

# Create your models here.
class Song(models.Model):
	title = models.TextField()
	singer = models.TextField(blank=True)
	def __str__(self):
		return self.title

	def get_absolute_url(self):
		return '/song/{}/'.format(self.pk)



class Comment(models.Model):
	song = models.ForeignKey(Song, on_delete=models.CASCADE)
	text = models.TextField(blank=True, null=True)
	starsIdx = models.IntegerField(default=1)
	starsRating = models.IntegerField(default=1)
	userId = models.TextField(default="unknown")
	userName = models.TextField(default="unknown")
	userImage = models.TextField(default="nan")


	#created_at = models.DateTimeField(auto_now_add=True)
	#modified_at = models.DateTimeField(auto_now=True)

	def get_absolute_url(self):
		return '/comment/{}/'.format(self.pk)

