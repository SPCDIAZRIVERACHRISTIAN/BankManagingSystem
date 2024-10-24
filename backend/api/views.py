from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import DebitCard, CreditCard, Loan
from .serializers import DebitCardSerializer, CreditCardSerializer, LoanSerializer, RegisterSerializer
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from openai import OpenAI
from django.conf import settings
import logging

client = OpenAI(api_key=settings.OPENAI_API_KEY)

logger = logging.getLogger(__name__)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chat_with_gpt(request):
    user_message = request.data.get('message')
    print(f"OPENAI_API_KEY: {settings.OPENAI_API_KEY}")
    print(request.headers)
    if not user_message:
        return Response({"error": "Message is required"}, status=400)

    try:
        response = client.chat.completions.create(model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": user_message}])
        chat_response = response.choices[0].message.content
        return Response({"response": chat_response})
    except Exception as e:
        logger.exception("ChatGPT request failed.")
        return Response({"error": str(e)}, status=500)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        debit = DebitCard.objects.filter(owner=user)
        credit = CreditCard.objects.filter(owner=user)
        loan = Loan.objects.filter(owner=user)
        return (debit, credit, loan)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        data = {
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email
        }
        return Response(data)

    def put(self, request, *args, **kwargs):
        user = request.user
        data = request.data.copy()
        if 'password' in data and data['password']:
            data['password'] = make_password(data['password'])
        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        user = request.user
        Loan.objects.filter(user=user).delete()
        DebitCard.objects.filter(user=user).delete()
        CreditCard.objects.filter(user=user).delete()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class LoanListCreateView(generics.ListCreateAPIView):
    serializer_class = LoanSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Loan.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class LoanDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LoanSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Loan.objects.filter(user=self.request.user)

class CreditCardListCreateView(generics.ListCreateAPIView):
    serializer_class = CreditCardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CreditCard.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CreditCardDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CreditCardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CreditCard.objects.filter(user=self.request.user)

class DebitCardListCreateView(generics.ListCreateAPIView):
    serializer_class = DebitCardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DebitCard.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DebitCardDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DebitCardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DebitCard.objects.filter(user=self.request.user)

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
