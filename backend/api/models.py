from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
'''models to create different database tables'''

# this fetches the user model to use it on the other models
User = get_user_model()

class DebitCard(models.Model):
    '''table attributes for the debitcards'''
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    card_number = models.CharField(max_length=16, unique=True)
    expiry_date = models.DateField()
    cvv = models.CharField(max_length=3)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        '''returns the card number of the debitcard object created'''
        return f"Debit Card {self.card_number}"

class CreditCard(models.Model):
    '''Credit card attributes'''
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card_number = models.CharField(max_length=16, unique=True)
    expiry_date = models.DateField()
    cvv = models.CharField(max_length=3)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        '''returns the card number of the creditcard object created and who owns it'''
        return f"Credit Card {self.card_number} owned by {self.user}"

class Loan(models.Model):
    '''loan attributes'''
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    term = models.IntegerField()  # in months
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        '''returns the amount of the loan object created and the user who owns the loan'''
        return f"Loan {self.amount} owned by {self.user}"
