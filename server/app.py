from flask import Flask, jsonify, request # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy()
db.init_app(app)


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text, nullable=False)
    completed = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Todo {self.title}>'
    
with app.app_context():
    db.drop_all() # delete prev tables
    db.create_all() # creates table from class

@app.route('/', methods=['GET'])
def index():
    return 'Welcome to the server'

@app.route('/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    return jsonify([{'id': todo.id, 'title': todo.title, 'completed': todo.completed} for todo in todos])

@app.route('/todos', methods=['POST'])
def add_todo():
    data = request.get_json() # json -> dict
    new_todo = Todo(title=data['title'], completed=data.get('completed', False)) # false = default
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({'id': new_todo.id, 'title': new_todo.title, 'completed': new_todo.completed}), 201 # 201 = successful resource creation
    # Process: take in data, create new row, use fn to add and commit

@app.route('/todos/<int:id>', methods=['PUT'])
def update_todo(id): # add var to args
    todo = Todo.query.get_or_404(id)
    data = request.get_json()
    todo.title = data.get('title', todo.title) # default = no change
    todo.completed = data.get('completed', todo.completed)
    db.session.commit()
    return jsonify({'id': todo.id, 'title': todo.title, 'completed': todo.completed})

@app.route('/todos/<int:id>', methods=['DELETE'])
def del_todo(id):
    todo = Todo.query.get_or_404(id)
    db.session.delete(todo)
    db.session.commit()
    return '', 204

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)