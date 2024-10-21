from django.contrib.auth.models import User
from rest_framework import serializers
from .models import DebitCard, CreditCard, Loan

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "first_name", "last_name"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class DebitCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = DebitCard
        fields = ["id", "user", "card_number", "expiry_date", "cvv"]
        extra_kwargs = {
            'cvv': {'write_only': True},
            'user': {'read_only': True}
        }

    def validate_card_number(self, value):
        if not value.isdigit() or len(value) != 16:
            raise serializers.ValidationError("Card number must be 16 digits.")
        return value

class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ["id", "user", "card_number", "expiry_date", "cvv"]
        extra_kwargs = {
            'cvv': {'write_only': True},
            'user': {'read_only': True}
        }

    def validate_card_number(self, value):
        if not value.isdigit() or len(value) != 16:
            raise serializers.ValidationError("Card number must be 16 digits.")
        return value

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ["id", "user", "amount", "interest_rate", "term"]
        extra_kwargs = {
            'user': {'read_only': True}
        }

    def validate_loan_number(self, value):
        if not value.isdigit() or len(value) > 20:
            raise serializers.ValidationError("Loan number must be up to 20 digits.")
        return value

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

        def create(self, validated_data):
            user = User.objects.create(**validated_data)
            return user
