from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'password']

    def create(self, validated_data):
        # We use the manager's create_user method to hash the password properly
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user