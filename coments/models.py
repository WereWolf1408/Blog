from django.db import models
from publications.models import Publication

class Coment(models.Model):
    coment_text = models.CharField(max_length=500)
    public = models.ForeignKey(Publication)

    def __unicode__(self):
        return '%s %s' % (self.coment_text, self.public)
