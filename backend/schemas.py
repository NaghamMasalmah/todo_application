import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import Todo

class TodoObject(SQLAlchemyObjectType):
   class Meta:
       model = Todo
       interfaces = (graphene.relay.Node, )

class Query(graphene.ObjectType):
    node = graphene.relay.Node.Field()
    all_todos = SQLAlchemyConnectionField(TodoObject)