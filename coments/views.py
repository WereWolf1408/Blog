from django.shortcuts import HttpResponse
from coments.models import Coment
from django.shortcuts import render_to_response, redirect
from publications.views import PublicationList
from publications.models import Publication
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

class ComentsList(PublicationList):
    instance = None

    def __new__(cls, *args, **kwargs):
        if cls.instance is None:
            cls.instance = super(ComentsList, cls).__new__(cls)
        return cls.instance

    def __init__(self, request):
        super(ComentsList, self).__init__()
        publication_id = request.POST.get('publication_id')
        try:
            self.coments = Coment.objects.filter(public_id=publication_id).order_by('-id')
        except PageNotAnInteger:
            self.coments = Coment.objects.all()
        except EmptyPage:
            self.coments = Coment.objects.all()
        self.paginator = Paginator(self.coments, 6)


    @staticmethod
    def get_publication(request):
        pub_id = request.POST.get('publication_id')
        publication = Publication.objects.filter(id=pub_id)
        return publication

    @staticmethod
    def save_coment(request):
        text = request.POST.get('comentText')
        pubId = request.POST.get('publication_id')
        coment = Coment(coment_text=text, public_id=pubId)
        coment.save()

    def get_last_coments(self, request):
        page = request.POST.get('page')
        try:
            coments = self.paginator.page(page)
        except PageNotAnInteger:
            coments = self.paginator.page(1)
        except EmptyPage:
            coments = self.paginator.page(1)
        return coments


def get_body_more(request):
    args = {}
    coment_list = ComentsList(request)
    args['publication'] = ComentsList.get_publication(request)
    args['coments'] = coment_list.get_pablishing_content(request)
    args['pagination_count'] = coment_list.num_pagination_button()
    return render_to_response('body_more.html', args)


def save_coment(request):
    ComentsList.save_coment(request)
    coments_list = ComentsList(request)
    coments = coments_list.get_last_coments(request)
    return render_to_response('coment_body.html', {'coments': coments})




