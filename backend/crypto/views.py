from django.shortcuts import render, HttpResponse
from django.urls import reverse_lazy
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
import time
import requests
from .scraper import get_page, scrap_news_sites, get_site_content, get_wallet_info


# Create your views here.
urls = [
        'https://min-api.cryptocompare.com/data/wallets/general?api_key=f58c657e5cc22ea83a0d2c759e6e4a7ff172e92716e603aff9d3b5eeec2076ac',
        'https://detailed.com/cryptocurrency-blogs/',
        'https://blog.feedspot.com/bitcoin_blogs/',
        'https://blog.feedspot.com/cryptocurrency_blogs/'
        ]

class NewsApi(APIView):

    def get(self, request, *args, **kwargs):

        #print(request, "REQUEST DESDE EL BROWSER")
        page_to_scrap = get_page(urls[1])

        return Response(scrap_news_sites(page_to_scrap), status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        
        #print(request.data['searchsite'], "DATA ENVIAD")
        
        page_to_scrap = get_page(request.data['searchsite'])

        # return Response({"Active": "OK"}, status=status.HTTP_200_OK)
        resp = get_site_content(page_to_scrap, keyword=request.data['keyword'])

        to_send = {'mainsite': request.data['searchsite'], 'maindata': resp}
        #print(to_send, "ANTES DE MANDAR A PINTAR")
        
        return Response(to_send, status=status.HTTP_200_OK)


class WalletsApi(APIView):

    def get(self, request, *args, **kwargs):

        #print(request, "REQUEST DESDE EL BROWSER")
        page = get_page(urls[0], False)

        return Response(page, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        #print(request.data['searchsite'], "DATA ENVIADA")
        page_to_scrap = get_page(request.data['searchsite'])

        # return Response({"Active": "OK"}, status=status.HTTP_200_OK)
        resp = get_site_content(page_to_scrap, keyword='news')

        to_send = {'mainsite': request.data['searchsite'], 'maindata': resp}
        #print(to_send, "ANTES DE MANDAR A FRONT")
        return Response(to_send, status=status.HTTP_200_OK)

