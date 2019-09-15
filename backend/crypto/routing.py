from django.urls import path
from . import wsconsumer

websocket_urlpatterns = [
    path('ws/test', wsconsumer.TestConsumer),
]

