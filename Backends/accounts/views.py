from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail

from .models import CustomUser
from .serializers import RegisterSerializer, LoginSerializer


class RegisterView(generics.GenericAPIView):
    """
    POST /api/accounts/register/
    Cho phép đăng ký bằng email + password, tự động gán username = email.
    """
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username
            }
        }, status=status.HTTP_201_CREATED)


class LoginView(generics.GenericAPIView):
    """
    POST /api/accounts/login/
    Trả về cặp token (refresh + access).
    """
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=status.HTTP_200_OK)


class ForgotPasswordView(APIView):
    """
    POST /api/accounts/forgot-password/
    Nhận email, nếu tồn tại user thì gửi link reset.
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return Response(
                {"error": "Email is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Gửi mail reset (cần cấu hình EMAIL_BACKEND trong settings.py)
        send_mail(
            subject="Password Reset Link",
            message="Click here to reset your password: http://localhost:5173/reset-password",
            from_email="no-reply@yourdomain.com",
            recipient_list=[email],
            fail_silently=False,
        )

        return Response(
            {"message": "Recovery link sent"},
            status=status.HTTP_200_OK
        )

