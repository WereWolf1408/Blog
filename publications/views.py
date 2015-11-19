from django.shortcuts import render_to_response
from django.shortcuts import HttpResponse, Http404
from django.contrib import auth
from publications.forms import ContactForm
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from publications.models import Publication
from django.views.decorators.cache import cache_page
from django.core.cache import cache


class PublicationList(object):
    instance = None

    def __new__(cls, *args, **kwargs):
        if cls.instance is None:
            cls.instance = super(PublicationList, cls).__new__(cls)
        return cls.instance

    def __init__(self):
        self.publication = Publication.objects.all().order_by('id')
        self.paginator = Paginator(self.publication, 5)

    def get_paginator(self):
        return self.paginator

    def get_pablishing_content(self, request):
        page = request.POST.get('page')
        try:
            publishings = self.paginator.page(page)
        except PageNotAnInteger:
            publishings = self.paginator.page(1)
        except EmptyPage:
            publishings = self.paginator.page(self.paginator.num_pages)
        return publishings

    def num_pagination_button(self):
       mass = []
       i = 1
       #while (count / 3) >= i:
       while self.paginator.count >= i:
           if i == 9:
               mass.append('...')
               mass.append(self.paginator.count)
               break
           mass.append(i)
           i += 1
       return mass


def get_main_page(request):
    args = {}
    args['publication'] = PublicationList().get_pablishing_content(request)
    args['user'] = auth.get_user(request).username
    args['pagination_count'] = PublicationList().num_pagination_button()
    return render_to_response('blog.html', args)


def method_splitter(request, Get, Post):
    if request.method == "GET" and Get is not None:
        return Get(request)
    elif request.method == "POST" and Post is not None:
        return Post(request)
    raise Http404

@cache_page(60 * 15)
def get_page_post(request):
    # cached = cache.get('example')
    # if cached is not None:
    #     return HttpResponse(cached)
    try:
        args = {}
        assert request.method == "POST"
        args['publication'] = PublicationList().get_pablishing_content(request)
        args['pagination_count'] = PublicationList().num_pagination_button()
        cached = render_to_response('blog_body.html', args)
        return HttpResponse(cached)
    except ValueError:
        return HttpResponse('value error')


def get_page_get(request):
    try:
        args = {}
        assert request.method == "GET"
        args['pagination_count'] = PublicationList().num_pagination_button()
        args['publication'] = PublicationList().get_pablishing_content(request)
        return render_to_response('blog.html', args)
    except ValueError:
        return HttpResponse('value error')