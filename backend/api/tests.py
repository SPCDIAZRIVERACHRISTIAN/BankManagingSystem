from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from .models import Loan, CreditCard, DebitCard
from decimal import Decimal

class LoanTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.loan_data = {
            'amount': '1000.00',
            'interest_rate': '5.00',
            'term': 12
        }

    def test_create_loan(self):
        url = reverse('loan-list-create')
        response = self.client.post(url, self.loan_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Loan.objects.count(), 1)
        self.assertEqual(Loan.objects.get().amount, Decimal('1000.00'))

    def test_get_loans(self):
        Loan.objects.create(user=self.user, **self.loan_data)
        url = reverse('loan-list-create')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_loan(self):
        loan = Loan.objects.create(user=self.user, **self.loan_data)
        url = reverse('loan-detail', args=[loan.id])
        updated_data = {
            'amount': '2000.00',
            'interest_rate': '4.00',
            'term': 24
        }
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        loan.refresh_from_db()
        self.assertEqual(loan.amount, Decimal('2000.00'))

    def test_delete_loan(self):
        loan = Loan.objects.create(user=self.user, **self.loan_data)
        url = reverse('loan-detail', args=[loan.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Loan.objects.count(), 0)

class CreditCardTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.credit_card_data = {
            'card_number': '1234567812345678',
            'expiry_date': '2025-12-31',
            'cvv': '123'
        }

    def test_create_credit_card(self):
        url = reverse('credit-card-list-create')
        response = self.client.post(url, self.credit_card_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CreditCard.objects.count(), 1)
        self.assertEqual(CreditCard.objects.get().card_number, '1234567812345678')

    def test_get_credit_cards(self):
        CreditCard.objects.create(user=self.user, **self.credit_card_data)
        url = reverse('credit-card-list-create')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_credit_card(self):
        credit_card = CreditCard.objects.create(user=self.user, **self.credit_card_data)
        url = reverse('credit-card-detail', args=[credit_card.id])
        updated_data = {
            'card_number': '8765432187654321',
            'expiry_date': '2026-12-31',
            'cvv': '321'
        }
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        credit_card.refresh_from_db()
        self.assertEqual(credit_card.card_number, '8765432187654321')

    def test_delete_credit_card(self):
        credit_card = CreditCard.objects.create(user=self.user, **self.credit_card_data)
        url = reverse('credit-card-detail', args=[credit_card.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(CreditCard.objects.count(), 0)

class DebitCardTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.debit_card_data = {
            'card_number': '1234567812345678',
            'expiry_date': '2025-12-31',
            'cvv': '123'
        }

    def test_create_debit_card(self):
        url = reverse('debit-card-list-create')
        response = self.client.post(url, self.debit_card_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(DebitCard.objects.count(), 1)
        self.assertEqual(DebitCard.objects.get().card_number, '1234567812345678')

    def test_get_debit_cards(self):
        DebitCard.objects.create(user=self.user, **self.debit_card_data)
        url = reverse('debit-card-list-create')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_debit_card(self):
        debit_card = DebitCard.objects.create(user=self.user, **self.debit_card_data)
        url = reverse('debit-card-detail', args=[debit_card.id])
        updated_data = {
            'card_number': '8765432187654321',
            'expiry_date': '2026-12-31',
            'cvv': '321'
        }
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        debit_card.refresh_from_db()
        self.assertEqual(debit_card.card_number, '8765432187654321')

    def test_delete_debit_card(self):
        debit_card = DebitCard.objects.create(user=self.user, **self.debit_card_data)
        url = reverse('debit-card-detail', args=[debit_card.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(DebitCard.objects.count(), 0)
