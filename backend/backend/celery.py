import os
from celery import Celery
from celery.schedules import crontab




os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
celery_app = Celery('crypto')
celery_app.config_from_object('django.conf:settings', namespace='CELERY')
celery_app.autodiscover_tasks()


@celery_app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))

celery_app.conf.beat_schedule = {
     # Executes every Monday morning at 7:30 a.m.
     'SCARP_API_DATA': {
         'task': 'crypto.scraper.get_api_data',
         'schedule': 15,
         'args': (),
     },
}