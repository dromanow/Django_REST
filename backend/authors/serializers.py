from rest_framework import serializers
from .models import *


class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = '__all__'


class AuthorSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'
        # fields = ['first_name', 'last_name']


class AuthorSerializerV2(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class BiographySerializer(serializers.ModelSerializer):
    class Meta:
        model = Biography
        fields = '__all__'
        # fields = ['text', 'author']


class BookSerializer(serializers.ModelSerializer):
    # authors = serializers.StringRelatedField(many=True)

    class Meta:
        model = Book
        fields = '__all__'


class BibliographySerializer(serializers.ModelSerializer):
    class Meta:
        model = Bibliography
        fields = '__all__'
