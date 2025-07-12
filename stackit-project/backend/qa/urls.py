from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    QuestionViewSet,
    AnswerViewSet,
    TagViewSet,
    VoteViewSet,
    NotificationViewSet,
    RegisterView,
    get_current_user,
    unread_notification_count,
)

router = DefaultRouter()
router.register(r'questions', QuestionViewSet)
router.register(r'answers', AnswerViewSet)
router.register(r'tags', TagViewSet)
router.register(r'votes', VoteViewSet)
router.register(r'notifications', NotificationViewSet)

urlpatterns = [
    # Auth
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/user/', get_current_user, name='current_user'),

    # Notifications
    path('notifications/unread-count/', unread_notification_count),

    # All router-based CRUD APIs
    path('', include(router.urls)),
]
