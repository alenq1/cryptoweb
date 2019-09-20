from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer, AsyncJsonWebsocketConsumer
from .scraper import get_page, get_google_search, scrap_news_sites, get_api_data
import asyncio
from time import sleep
import json


class TestConsumer(AsyncJsonWebsocketConsumer):


    async def connect(self):
        #self.room_name = self.scope['url_route']['kwargs']['room_name']
        #self.room_name = self.scope['url_route']
        #self.room_group_name = 'crypto_%s' % self.room_name
        self.room_group_name = 'crypto'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name)

        await self.accept()

        # while self.channel_layer:
            
        #     taskk_result = get_api_data.delay()
        #     print(taskk_result, "DETALLLESSSSSSS TARE PROGRAMADA")
        #     #page = get_page('https://blog.feedspot.com/cryptocurrency_blogs/')
        #     #response = scrap_news_sites(page)

        #     await self.channel_layer.group_send(
        #     self.room_group_name,
        #     {
        #         'type': 'message',
        #         'message': message
        #     }
        # )

        #     await self.send_json({
        #     #     'message': f'TU MENSAJE {message} FUE RECIBIDO'
        #     #    'message': response,
        #         'task_status': taskk_result.get(),
        #         })
        #     await asyncio.sleep(10)

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        self.close()

    # Receive message from WebSocket

    async def receive_json(self, content, **kwargs):
        #text_data_json = json.loads(text_data)
        ##message = text_data_json['message']
        resp = content.get('message')
        print(content, "ESTO ES LO QUE VIENE DEL FRONT")

        ## Send message to room group
        # await self.channel_layer.group_send(
        #     self.room_group_name,
        #     {
        #         'type': 'send.broadcast',
        #         'to_send': 'OK'
        #     }
        # )

    # Receive message from room group
    async def send_broadcast(self, event):
        print(type(event), "RECIBIDO EVENTO PARA DESPACHAR")
        #to_send = event['to_send']
        to_send = event

        # Send message to WebSocket
        await self.send_json({
            'message': to_send
        })
