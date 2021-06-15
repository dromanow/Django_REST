import graphene
from graphene_django import DjangoObjectType
from .models import Book, Author, Biography, Article


class AuthorType(DjangoObjectType):
    class Meta:
        model = Author
        fields = '__all__'


class BookType(DjangoObjectType):
    class Meta:
        model = Book
        fields = '__all__'


class ArticleType(DjangoObjectType):
    class Meta:
        model = Article
        fields = '__all__'


class Query(graphene.ObjectType):
    all_authors = graphene.List(AuthorType)
    all_books = graphene.List(BookType)
    author_by_id = graphene.Field(AuthorType, id=graphene.Int(required=True))
    article_by_author_name = graphene.List(ArticleType, last_name=graphene.String(), first_name=graphene.String())

    def resolve_all_authors(self, info):
        return Author.objects.all()

    def resolve_all_books(self, info):
        return Book.objects.all()

    def resolve_author_by_id(self, info, id):
        return Author.objects.get(id=id)

    def resolve_article_by_author_name(self, info, last_name=None, first_name=None):
        articles = Article.objects.all()
        if last_name:
            articles = articles.filter(author__last_name=last_name)
        if first_name:
            articles = articles.filter(author__first_name=first_name)
        return articles


class AuthorUpdateMutation(graphene.Mutation):
    class Arguments:
        birthday_year = graphene.Int(required=True)
        id = graphene.ID()

    author = graphene.Field(AuthorType)

    @classmethod
    def mutate(cls, root, info, birthday_year, id):
        author = Author.objects.get(id=id)
        author.birthday_year = birthday_year
        author.save()
        return AuthorUpdateMutation(author)


class AuthorCreateMutation(graphene.Mutation):
    class Arguments:
        birthday_year = graphene.Int(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)

    author = graphene.Field(AuthorType)

    @classmethod
    def mutate(cls, root, info, birthday_year, first_name, last_name):
        author = Author(first_name=first_name, last_name=last_name, birthday_year=birthday_year)
        author.save()
        return AuthorCreateMutation(author)


class Mutation(graphene.ObjectType):
    update_author = AuthorUpdateMutation.Field()
    create_author = AuthorCreateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)


# class BookType(DjangoObjectType):
#     class Meta:
#         model = Book
#         fields = '__all__'
#
#
# class AuthorType(DjangoObjectType):
#     class Meta:
#         model = Author
#         fields = '__all__'
#
#
# class BiographyType(DjangoObjectType):
#     class Meta:
#         model = Biography
#         fields = '__all__'
#
#
# class Query(graphene.ObjectType):
#     all_authors = graphene.List(AuthorType)
#     all_books = graphene.List(BookType)
#     author_by_id = graphene.Field(AuthorType, id=graphene.Int(required=True))
#     biography_by_author_name = graphene.List(BiographyType, name=graphene.String(required=False))
#
#     def resolve_author_by_id(self, info, id):
#         try:
#             return Author.objects.get(id=id)
#         except Author.DoesNotExist:
#             return None
#
#     def resolve_biography_by_author_name(self, info, name=None):
#         biography = Biography.objects.all()
#         if name:
#             biography = biography.filter(author__last_name=name)
#         return biography
#
#     def resolve_all_authors(self, info):
#         return Author.objects.all()
#
#     def resolve_all_books(self, info):
#         return Book.objects.all()
#
#
# class AuthorMutation(graphene.Mutation):
#     class Arguments:
#         id = graphene.ID()
#         birthday_year = graphene.Int(required=True)
#
#     author = graphene.Field(AuthorType)
#
#     @classmethod
#     def mutate(cls, root, info, birthday_year, id):
#         author = Author.objects.get(pk=id)
#         author.birthday_year = birthday_year
#         author.save()
#         return AuthorMutation(author=author)
#
#
# class Mutation(graphene.ObjectType):
#     update_author = AuthorMutation.Field()
#
#
# schema = graphene.Schema(query=Query, mutation=Mutation)
