from django.db import models


class Publication(models.Model):
    pub_image = models.CharField(max_length=200)
    pub_title = models.CharField(max_length=200)
    pub_description = models.CharField(max_length=200)
    pub_date_created = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return '%s %s' % (self.pub_title, self.pub_image)