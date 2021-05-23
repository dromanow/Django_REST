from rest_framework.viewsets import *
from rest_framework.views import *
from rest_framework.response import Response
from rest_framework.generics import *
from rest_framework.decorators import *
from rest_framework.mixins import *
from rest_framework.pagination import *
from .models import Article, Book
from .serializers import *


class BookModelViewSet(ModelViewSet):
    serializer_class = BookSerializer

    def get_queryset(self):
        id_ = self.request.query_params.get('id')
        if id_ is not None:
            return Book.objects.filter(id=self.request.query_params.get('id'))
        else:
            return Book.objects.all()


class ArticleListModelView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class ArticleCreateModelView(CreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class ArticleLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 2


class ArticleModelViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    pagination_class = ArticleLimitOffsetPagination
    filterset_fields = ['name']


@api_view(['GET'])
def article_view(request):
    articles = Article.objects.all()
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)

