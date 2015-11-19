from django.conf.urls import patterns, url

urlpatterns = patterns('coments.views',
    url(r'^$', 'get_body_more'),
    url(r'^save_coment', 'save_coment')
)