from django.shortcuts import render
from example.models import Animal
from django.http import HttpResponse


def animal(request):
    animals = Animal.objects.all()
    return HttpResponse(animals)
