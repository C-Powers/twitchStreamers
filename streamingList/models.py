from django.db import models

# Create your models here.
class Streamers(models.Model):
    streamer = models.TextField()

    def publish(self):
        self.save()

    def __str__(self):
        return self.title
