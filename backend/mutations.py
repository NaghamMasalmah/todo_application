from os import error
import graphene
from graphql_relay.node.node import from_global_id
from schemas import TodoObject
from models import Todo
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class AddTodo(graphene.Mutation):
    class Arguments:
        #ID = graphene.Int()
        content = graphene.String(required=True) 

    todo = graphene.Field(lambda: TodoObject)

    def mutate(self, ID,content,**kwargs):
        ID=kwargs.get('ID', None)
        todo = Todo(ID=ID,content=content)
        db.session.add(todo)
        db.session.commit()
        return AddTodo(todo=todo)

class UpdateTodo(graphene.Mutation):
    class Arguments:
        ID = graphene.Int(required=True)
        content = graphene.String(required=True)

    success = graphene.Boolean()
    errors = graphene.String()
    content = graphene.String()
    ID = graphene.Int()

    def mutate(self, info, ID, content):
        try:
            todo = db.session.query(Todo).filter_by(ID=ID).first()
            todo.content =  content
            db.session.add(todo)
            db.session.commit()
            success = True
            errors = 'Updated without errors!'
            ID = ID
        except:
            success = False
            errors = 'Todo with given id not found!'
        return UpdateTodo(success = success, errors = errors, content=todo.content,ID=ID)

class DeleteTodo(graphene.Mutation):
    class Arguments:
        ID = graphene.Int(required=True)

    success = graphene.Boolean()
    errors = graphene.String()
    ID = graphene.Int()

    def mutate(self, info, ID):
        try:
            todo = db.session.query(Todo).filter_by(ID=ID).first()
            db.session.delete(todo)
            db.session.commit()
            success = True
            errors = 'Deleted without errors!'
            ID = ID
        except:  # todo not found
            success = False
            errors = 'Todo with given id not found!'
        return DeleteTodo(success = success, errors = errors,ID = ID)

class Mutation(graphene.ObjectType):
    add_todo = AddTodo.Field()
    update_todo = UpdateTodo.Field()
    delete_todo = DeleteTodo.Field()