from django.contrib.auth.models import User
from rest_framework import serializers
from .models import DebitCard, CreditCard, Loan
'''Serializers for managing fields and manipulation of data in the routes'''

class UserSerializer(serializers.ModelSerializer):
    """
    UserSerializer is a ModelSerializer for the User model.

    This serializer handles the serialization and deserialization of User instances,
    including the creation of new User instances with hashed passwords.

    Attributes:
        Meta (class): Meta options for the UserSerializer.
            model (User): The model that is being serialized.
            fields (list): The fields that should be included in the serialization.
            extra_kwargs (dict): Additional keyword arguments for fields. The password field is write-only.

    Methods:
        create(validated_data):
            Creates and returns a new User instance, with the password hashed.
            Args:
                validated_data (dict): The validated data for creating a new User instance.
            Returns:
                User: The newly created User instance.
    """
    class Meta:
        """
        Meta class for the User serializer.

        Attributes:
            model (type): The model class that this serializer is based on.
            fields (list): A list of field names to be included in the serialized output.
            extra_kwargs (dict): Additional keyword arguments for specific fields.
                                 In this case, the 'password' field is set to write-only.
        """
        model = User
        fields = ["id", "username", "password", "first_name", "last_name"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        """
        Creates and returns a new User instance using the provided validated data.

        Args:
            validated_data (dict): A dictionary containing the validated data for creating a new user.

        Returns:
            User: The newly created User instance.
        """
        user = User.objects.create_user(**validated_data)
        return user

class DebitCardSerializer(serializers.ModelSerializer):
    """
    DebitCardSerializer is a serializer for the DebitCard model. It serializes the fields 'id', 'user', 'card_number', 'expiry_date', and 'cvv'.

    Attributes:
        Meta (class): Meta class to specify the model and fields to be serialized.
            model (DebitCard): The model to be serialized.
            fields (list): List of fields to be serialized.
            extra_kwargs (dict): Dictionary to specify additional keyword arguments for fields.
                'cvv': The CVV field is write-only.
                'user': The user field is read-only.

    Methods:
        validate_card_number(value):
            Validates the card number to ensure it is a 16-digit numeric string.
            Args:
                value (str): The card number to be validated.
            Raises:
                serializers.ValidationError: If the card number is not 16 digits or contains non-numeric characters.
            Returns:
                str: The validated card number.
    """
    class Meta:
        """
        Meta class for the DebitCard serializer.
        Attributes:
            model (type): The model that is being serialized, in this case, DebitCard.
            fields (list): A list of fields to be included in the serialized output.
                           Includes "id", "user", "card_number", "expiry_date", and "cvv".
            extra_kwargs (dict): Additional keyword arguments for specific fields.
                                 - 'cvv': {'write_only': True} - The CVV field is write-only.
                                 - 'user': {'read_only': True} - The user field is read-only.
        """

        model = DebitCard
        fields = ["id", "user", "card_number", "expiry_date", "cvv"]
        extra_kwargs = {
            'cvv': {'write_only': True},
            'user': {'read_only': True}
        }

    def validate_card_number(self, value):
        """
        Validates that the card number consists of exactly 16 digits.

        Args:
            value (str): The card number to validate.

        Returns:
            str: The validated card number.

        Raises:
            serializers.ValidationError: If the card number is not exactly 16 digits or contains non-digit characters.
        """
        if not value.isdigit() or len(value) != 16:
            raise serializers.ValidationError("Card number must be 16 digits.")
        return value

class CreditCardSerializer(serializers.ModelSerializer):
    """
    CreditCardSerializer is a ModelSerializer for the CreditCard model.
    This serializer handles the following fields:
    - id: The unique identifier for the credit card.
    - user: The user associated with the credit card. This field is read-only.
    - card_number: The credit card number. This field must be 16 digits.
    - expiry_date: The expiry date of the credit card.
    - cvv: The CVV code of the credit card. This field is write-only.
    Methods:
    - validate_card_number(value): Validates that the card number is exactly 16 digits and contains only numeric characters.
    Meta:
    - model: Specifies the model to be serialized (CreditCard).
    - fields: Lists the fields to be included in the serialization.
    - extra_kwargs: Specifies additional keyword arguments for certain fields.
    """

    class Meta:
        """
        Meta class for the CreditCard serializer.

        Attributes:
            model (type): The model that this serializer is based on, which is CreditCard.
            fields (list): A list of fields to be included in the serialized output.
                           Includes "id", "user", "card_number", "expiry_date", and "cvv".
            extra_kwargs (dict): Additional keyword arguments for specific fields.
                                 - 'cvv': {'write_only': True} - The CVV field is write-only.
                                 - 'user': {'read_only': True} - The user field is read-only.
        """
        model = CreditCard
        fields = ["id", "user", "card_number", "expiry_date", "cvv"]
        extra_kwargs = {
            'cvv': {'write_only': True},
            'user': {'read_only': True}
        }

    def validate_card_number(self, value):
        """
        Validates that the card number consists of exactly 16 digits.

        Args:
            value (str): The card number to validate.

        Returns:
            str: The validated card number.

        Raises:
            serializers.ValidationError: If the card number is not exactly 16 digits or contains non-digit characters.
        """
        if not value.isdigit() or len(value) != 16:
            raise serializers.ValidationError("Card number must be 16 digits.")
        return value

class LoanSerializer(serializers.ModelSerializer):
    """
    LoanSerializer is a ModelSerializer for the Loan model. It serializes the fields
    'id', 'user', 'amount', 'interest_rate', and 'term'. The 'user' field is set to
    read-only.

    Methods:
        validate_loan_number(value):
            Validates the 'loan_number' field to ensure it is a digit and does not
            exceed 20 characters in length. Raises a ValidationError if the
            conditions are not met.
    """
    class Meta:
        """
        Meta class for the Loan serializer.
        Attributes:
            model (type): The model class that this serializer is based on, which is `Loan`.
            fields (list): A list of fields to be included in the serialized output.
                           The fields are "id", "user", "amount", "interest_rate", and "term".
            extra_kwargs (dict): Additional keyword arguments for the fields.
                                 Here, the 'user' field is set to be read-only.
        """

        model = Loan
        fields = ["id", "user", "amount", "interest_rate", "term"]
        extra_kwargs = {
            'user': {'read_only': True}
        }

    def validate_loan_number(self, value):
        """
        Validates the loan number.
        Args:
            value (str): The loan number to be validated.
        Returns:
            str: The validated loan number.
        Raises:
            serializers.ValidationError: If the loan number is not numeric or exceeds 20 digits.
        """

        if not value.isdigit() or len(value) > 20:
            raise serializers.ValidationError("Loan number must be up to 20 digits.")
        return value

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for registering a new user.

    This serializer handles the creation of a new user with the specified fields:
    - username
    - password
    - email
    - first_name
    - last_name

    The password field is write-only to ensure it is not exposed in any responses.
    """

    class Meta:
        """
        Meta class for RegisterSerializer.

        Specifies the model to be used (User) and the fields to be included in the serialization:
        - username
        - password
        - email
        - first_name
        - last_name

        The password field is marked as write-only.
        """
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

        def create(self, validated_data):
            """
            Create a new User instance with the provided validated data.

            Args:
                validated_data (dict): A dictionary containing the validated data for creating a new User instance.

            Returns:
                User: The newly created User instance.
            """
            user = User.objects.create(**validated_data)
            return user
