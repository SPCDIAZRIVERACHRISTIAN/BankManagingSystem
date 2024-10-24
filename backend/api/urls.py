from django.urls import path
from . import views
"""
URL configuration for the Bank Managing System backend API.

This module defines the URL patterns for the various views in the API, including
user data, chat with GPT, credit cards, debit cards, and loans.

Routes:
    - 'userdata/': Endpoint for user detail view, handled by `UserDetailView`.
    - 'chat/': Endpoint for chatting with GPT, handled by `chat_with_gpt`.
    - 'credit-cards/': Endpoint for listing and creating credit cards, handled by `CreditCardListCreateView`.
    - 'credit-cards/<int:pk>/': Endpoint for retrieving, updating, or deleting a specific credit card, handled by `CreditCardDetailView`.
    - 'debit-cards/': Endpoint for listing and creating debit cards, handled by `DebitCardListCreateView`.
    - 'debit-cards/<int:pk>/': Endpoint for retrieving, updating, or deleting a specific debit card, handled by `DebitCardDetailView`.
    - 'loans/': Endpoint for listing and creating loans, handled by `LoanListCreateView`.
    - 'loans/<int:pk>/': Endpoint for retrieving, updating, or deleting a specific loan, handled by `LoanDetailView`.

Imports:
    - `path` from `django.urls`: Function to define URL patterns.
    - `views` from the current package: Module containing the view classes and functions.

Attributes:
    - `urlpatterns` (list): List of URL patterns for the API.
"""

urlpatterns = [
    path('userdata/', views.UserDetailView.as_view(), name='register'),
    path('chat/', views.chat_with_gpt, name='chat_with_gpt'),
    path('credit-cards/', views.CreditCardListCreateView.as_view(), name='credit-card-list-create'),
    path('credit-cards/<int:pk>/', views.CreditCardDetailView.as_view(), name='credit-card-detail'),
    path('debit-cards/', views.DebitCardListCreateView.as_view(), name='debit-card-list-create'),
    path('debit-cards/<int:pk>/', views.DebitCardDetailView.as_view(), name='debit-card-detail'),
    path('loans/', views.LoanListCreateView.as_view(), name='loan-list-create'),
    path('loans/<int:pk>/', views.LoanDetailView.as_view(), name='loan-detail'),
]
