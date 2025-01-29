from django.contrib import admin  # Add this line
from django.http import HttpResponse
from django.urls import path, include
from rest_framework import routers
from tasks.views import TaskViewSet

router = routers.DefaultRouter()
router.register(r'tasks', TaskViewSet)

def home_view(request):
    return HttpResponse("Welcome to the Django Backend for the Task Management App!")

urlpatterns = [
    path('admin/', admin.site.urls),  # Ensure this line works by importing admin
    path('api/', include(router.urls)),
    path('', home_view),
]

