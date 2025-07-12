from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Question, Answer, Tag, Vote, Notification  # Import models properly

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class AnswerSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Answer
        fields = ['id', 'question', 'body', 'author', 'is_accepted', 'created_at']

class QuestionSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    tags = TagSerializer(many=True)
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'title', 'body', 'author', 'tags', 'answers', 'created_at']

    def create(self, validated_data):
        tags_data = validated_data.pop('tags')
        question = Question.objects.create(**validated_data)
        for tag in tags_data:
            tag_obj, _ = Tag.objects.get_or_create(name=tag['name'])
            question.tags.add(tag_obj)
        return question

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
