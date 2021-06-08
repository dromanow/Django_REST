from rest_framework.viewsets import *
from rest_framework.permissions import AllowAny, IsAuthenticated, DjangoModelPermissions, IsAuthenticatedOrReadOnly
from .models import Article, Book, Author
from .serializers import BookSerializer, ArticleSerializer, AuthorSerializer


# class CustomPermission(BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_staff


class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class BookModelViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    # permission_classes = [IsAuthenticated]


class ArticleModelViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
