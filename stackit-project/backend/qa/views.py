from django.shortcuts import render
from rest_framework import generics, viewsets, permissions
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Question, Answer, Tag, Vote, Notification
from .serializers import (
    QuestionSerializer,
    AnswerSerializer,
    TagSerializer,
    VoteSerializer,
    NotificationSerializer,
)
import re

# ----------------------------
# 🔐 User Registration
# ----------------------------
class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


# ----------------------------
# 🔐 Get Current User
# ----------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
    })

# ----------------------------
# 📌 Question ViewSet
# ----------------------------
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all().order_by('-created_at')
    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


# ----------------------------
# 💬 Answer ViewSet with Notifications
# ----------------------------
class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all().order_by('-created_at')
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        answer = serializer.save(author=self.request.user)

        # Notify the question author
        if answer.question.author != self.request.user:
            Notification.objects.create(
                user=answer.question.author,
                message=f"{self.request.user.username} answered your question: {answer.question.title}",
                link=f"/questions/{answer.question.id}/"
            )

        # Notify mentioned users in body (e.g., @john)
        mentioned_usernames = re.findall(r'@(\w+)', answer.body)
        mentioned_users = User.objects.filter(username__in=mentioned_usernames).exclude(id=self.request.user.id)

        for user in mentioned_users:
            Notification.objects.create(
                user=user,
                message=f"{self.request.user.username} mentioned you in an answer",
                link=f"/questions/{answer.question.id}/"
            )

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def accept(self, request, pk=None):
        answer = self.get_object()
        if answer.question.author != request.user:
            return Response({"error": "You are not the question owner"}, status=403)
        answer.is_accepted = True
        answer.save()
        return Response({"status": "Answer accepted"})


# ----------------------------
# 🏷️ Tag ViewSet
# ----------------------------
class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


# ----------------------------
# ⬆️⬇️ Vote ViewSet
# ----------------------------
class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ----------------------------
# 🔔 Notification ViewSet
# ----------------------------
class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    queryset = Notification.objects.all()
    
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')

    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        notification = self.get_object()
        notification.is_read = True
        notification.save()
        return Response({'status': 'Marked as read'})


# ----------------------------
# 📬 Unread Notification Count
# ----------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def unread_notification_count(request):
    count = Notification.objects.filter(user=request.user, is_read=False).count()
    return Response({"unread_count": count})
