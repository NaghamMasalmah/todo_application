from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class BaseModel(db.Model):
    __abstract__ = True

    def __init__(self, *args):
        super().__init__(*args)


class Todo(BaseModel, db.Model):
    __tablename__ = 'todos'

    ID = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.String)

    def __init__(self, ID,content):
        self.ID = ID
        self.content = content

    def __repr__(self):
        return f"<Todo: {self.content}>"

    