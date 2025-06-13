from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail

from .models import CustomUser

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": {
                "email": user.email,
                "username": user.username
            }
        }, status=status.HTTP_201_CREATED)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=400)
        try:
            user = CustomUser.objects.get(email=email)
            # Gửi email (cần cấu hình EMAIL_BACKEND trong settings.py)
            send_mail(
                'Password Reset Link',
                'Click here to reset your password: http://localhost:5173/reset-password',
                'from@example.com',
                [email],
                fail_silently=False,
            )
            return Response({'message': 'Recovery link sent'}, status=200)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=400)