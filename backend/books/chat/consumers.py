from channels.generic.websocket import WebsocketConsumer
import json
from asgiref.sync import async_to_sync
from beepy import beep

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'chatroom'
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        username = text_data_json['username']
        message = text_data_json['message']

        # Send message to group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'username': username,
                'message': message
            }
        )

    def chat_message(self, event):
        message = event['message']
        username = event['username']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'username': username,
            'message': message
        }))
        beep(sound=1)

