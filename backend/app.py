from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from flask_graphql import GraphQLView
import graphene
from models import Todo
from schemas import Query
from mutations import Mutation
import psycopg2


DATABASE_URI = "postgresql://postgres:gres123@localhost:5436/Todos-database"
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config["TEMPLATES_AUTO_RELOAD"] = True

engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)
session = Session()

con = psycopg2.connect(database="Todos-database", user="postgres", password="gres123", host="127.0.0.1", port="5436")
cursor = con.cursor()


db = SQLAlchemy(app)
db.create_all()
db.session.commit()
migrate = Migrate(app, db)


schema = graphene.Schema(query=Query, mutation=Mutation)



app.add_url_rule(
    '/api/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True # for having the GraphiQL interface
    )
)

if __name__ == '__main__':
    app.debug = True
    app.run()




