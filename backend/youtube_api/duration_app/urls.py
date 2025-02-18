from django.contrib import admin
from django.urls import path
from .views import get_playlist_duration

urlpatterns = [
    path('api/playlist_duration/', get_playlist_duration, name='playlist_duration'),
]
