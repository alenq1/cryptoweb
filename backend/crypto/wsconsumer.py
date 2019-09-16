from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer, AsyncJsonWebsocketConsumer
from .scraper import get_page, get_google_search, scrap_news_sites
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
          #  self.channel_name
        "testGroup")

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket

    async def receive_json(self, content, **kwargs):
        #text_data_json = json.loads(text_data)
        #message = text_data_json['message']
        message = content.get('message')
        print(content, "ESTO ES LO QUE VIENE dEL FRONT")

        ### RESPONSE TO THE INITAL MESSAGE

        page = get_page('https://blog.feedspot.com/cryptocurrency_blogs/')
        response = scrap_news_sites(page)
        await self.send_json({
        #     'message': f'TU MENSAJE {message} FUE RECIBIDO'
              'message': response
         })


        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'message',
                'message': message
            }
        )

    # Receive message from room group
    async def message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send_json({
            'message': message
        })
