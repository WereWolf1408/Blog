__author__ = 'Anthony'
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import HttpResponse
from django.shortcuts import redirect


def loginUser(request):
    log = request.POST.get('login')
    pas = request.POST.get('pass')
    user = authenticate(username='enot', password='enot')

    if user is None:
        return HttpResponse('user not found')
    else:
        login(request, user)
    return HttpResponse('ok')


def logoutUser(request):
    logout(request)
    return HttpResponse('logout')


