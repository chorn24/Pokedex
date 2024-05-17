from django.shortcuts import render
from django.http.request import HttpRequest
from django.http.response import HttpResponse
# Create your views here.


def home(request: HttpRequest) -> HttpResponse:
    context = {}
    return render(request, "index.html",context)