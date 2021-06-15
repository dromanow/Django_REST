from django.contrib import admin
from django.urls import path, include, re_path
from django.views.decorators.csrf import csrf_exempt
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from rest_framework.permissions import AllowAny
from authors.views import AuthorModelViewSet, BookModelViewSet, ArticleModelViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from graphene_django.views import GraphQLView

router = DefaultRouter()
router.register('authors', AuthorModelViewSet)
router.register('books', BookModelViewSet)
router.register('article', ArticleModelViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title='library',
        default_version='1.0',
        description='Some description'
    ),
    public=True,
    permission_classes=(AllowAny,)
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=False))),
    re_path('^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),

    # re_path(r'^api/(?P<version>\d\.\d)/authors/$', AuthorModelViewSet.as_view({'get': 'list'})),

    # path('api/authors/1.0/', include('authors.urls', namespace='1.0')),
    # path('api/authors/2.0/', include('authors.urls', namespace='2.0')),
]

