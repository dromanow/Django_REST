from rest_framework.viewsets import *
from rest_framework.permissions import AllowAny, BasePermission, DjangoModelPermissions
from rest_framework.authtoken.models import Token
from .models import Article, Book, Author
from .serializers import BookSerializer, ArticleSerializer, AuthorSerializer


class CustomPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff


class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    # permission_classes = [CustomPermission]


class BookModelViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    # def get_queryset(self):
    #     id_ = self.request.query_params.get('id')
    #     if id_ is not None:
    #         return Book.objects.filter(id=self.request.query_params.get('id'))
    #     else:
    #         return Book.objects.all()


# class ArticleListModelView(ListAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer


# class ArticleCreateModelView(CreateAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#

# class ArticleLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 2


class ArticleModelViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    # pagination_class = ArticleLimitOffsetPagination
    # filterset_fields = ['name']


# @api_view(['GET'])
# def article_view(request):
#     token = Token.objects.filter(key=request.)
#     token.delete()
    # articles = Article.objects.all()
    # serializer = ArticleSerializer(articles, many=True)
    # return Response(serializer.data)

