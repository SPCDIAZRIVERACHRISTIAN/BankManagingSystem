from django.urls import path
from . import views

urlpatterns = [
    path('userdata/', views.UserDetailView.as_view(), name='register'),
    path('credit-cards/', views.CreditCardListCreateView.as_view(), name='credit-card-list-create'),
    path('credit-cards/<int:pk>/', views.CreditCardDetailView.as_view(), name='credit-card-detail'),
    path('debit-cards/', views.DebitCardListCreateView.as_view(), name='debit-card-list-create'),
    path('debit-cards/<int:pk>/', views.DebitCardDetailView.as_view(), name='debit-card-detail'),
    path('loans/', views.LoanListCreateView.as_view(), name='loan-list-create'),
    path('loans/<int:pk>/', views.LoanDetailView.as_view(), name='loan-detail'),
]
