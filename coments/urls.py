from django.conf.urls import patterns, url
from coments import views as com

urlpatterns = [
    url(r'^$', com.get_body_more),
    url(r'^save_coment/$', com.save_coment)
]