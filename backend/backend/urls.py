from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
"""
URL configuration for the backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/stable/topics/http/urls/

Routes:
- 'admin/': Admin site.
- 'api/user/register/': Endpoint for user registration.
- 'api/token/': Endpoint to obtain JWT token.
- 'api/token/refresh/': Endpoint to refresh JWT token.
- 'api-auth/': Includes default authentication URLs provided by Django REST framework.
- 'api/': Includes URLs defined in the 'api' application.

Imports:
- admin: Django admin site.
- path, include: Functions to define URL patterns.
- CreateUserView: View to handle user registration.
- TokenObtainPairView, TokenRefreshView: Views to handle JWT token operations.
"""


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name="register"),
    path('api/token/', TokenObtainPairView.as_view(), name="get_token"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="refresh"),
    path('api-auth/', include("rest_framework.urls")),
    path('api/', include("api.urls")),
]
