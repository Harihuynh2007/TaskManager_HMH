from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password', ' id')
        extra_kwargs = {'password': {'write_only': True}}