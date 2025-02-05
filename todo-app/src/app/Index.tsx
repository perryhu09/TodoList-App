import { View, Text, Button, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getTodos, addTodo, updateTodo, deleteTodo } from './api'
import styles from '../utils/IndexStyles';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const Index = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState("");

    // For front end debugging
    const list = [
        {'id': 1, 'title': 'App dev', 'completed': false}
    ]

    useEffect(() => {
        fetchTodos();
    }, [todos])

    const fetchTodos = async () => {
        try {
            const todo = await getTodos();
            setTodos(todo);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }

    const handleAddTodo = async (title : string) => {
        try {
            const newTodo = await addTodo(title);
            setTodos([...todos, newTodo]);
        } catch (error) {
            console.error('Error adding todo: ', error);
        }
        //clear input
        setInput('');
    }

    const handleToggleTodo = async (id : number) => {
        try {
            const todo = todos.find((task) => task.id === id);
            if(!todo){
                throw new Error("Todo not found");
            }
            const updatedTodo = await updateTodo(id, { completed : !todo.completed });
            setTodos(todos.map((task) => (task.id === id ? updatedTodo : task)));
        } catch (error) {
            console.error('Error toggling todo: ', error);
        }
    }

    const handleDeleteTodo = async (id : number) => {
        try {
            // op in db then in rn
            deleteTodo(id);
            setTodos(todos.filter((task) => task.id != id));
        } catch (error) {
            console.error('Error deleting todo', error);
        }
    }

    // Render each todo list item for flatlist
    const renderTodo = ({ item } : { item : Todo }) => (
        <View style={styles.todoItem}>
            <View style={styles.itemTitle}>
                <Text style={item.completed && styles.completedText}>{item.title}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={() => handleToggleTodo(item.id)}
                    style={styles.completeButton} 
                >
                    <Text style={styles.complete}>{item.completed? 'Undo' : 'Completed'}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => handleDeleteTodo(item.id)}
                    style={styles.deleteButton} 
                >
                    <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <View>
            <Text style={styles.header}>Todo List</Text>
            <View style={styles.inputContainer}> 
                <TextInput 
                    style={styles.input}
                    placeholder="New Task" 
                    placeholderTextColor="gray"
                    value={input}
                    onChangeText={setInput}
                />
                <Button 
                    title="Add Todo" 
                    onPress={() => handleAddTodo(input)}
                />
            </View>
            <FlatList 
                data={todos} 
                // data={list}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTodo}
            />
        </View>
    )
}

export default Index