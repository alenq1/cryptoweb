from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import crypto.routing

application = ProtocolTypeRouter({
    
    'websocket': AuthMiddlewareStack(
        URLRouter(
            crypto.routing.websocket_urlpatterns
        )
    ),
})
