import React, {useEffect} from 'react';
import useData from './hooks/useData'
import {Container, Heading, Stack, useToast} from "@chakra-ui/react";
import {ToDo, User} from './types';
import ToDoRow from "./components/ToDoRow";

function App() {

    const toast = useToast();

    const {data: todoData, loading: todoLoading, error: todoError} = useData<ToDo[]>('/todos')
    const {data: userData, loading: userLoading, error: userError} = useData<User[]>('/users')

    const [todos, setTodos] = React.useState<ToDo[]>([])

    useEffect(() => {
            if (todoData) {
                setTodos(todoData)
            }
        }, [todoData]
    )

    const toggleCompleted = (id: number) => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                if (todo.completed) {
                    toast({
                        title: todo.title + ' Not Completed',
                        description: 'Uggghhhh',
                        status: 'error',
                        isClosable: true,
                    })
                } else {
                    toast({
                        title: todo.title + ' Completed',
                        description: 'Yayyyy',
                        status: 'success',
                        duration: 9000,
                        isClosable: true
                    })
                }
                return {...todo, completed: !todo.completed}
            }
            return todo;
        })

        setTodos(newTodos);
    }

    if (todoLoading || userLoading) {
        return <p>Loading...</p>
    }

    if (todoError || userError) {
        return <p>Sorry, there was an error</p>
    }

    if (todoData && userData) {
        return (
            <Container>
                <Heading>Todos</Heading>
                <Stack spacing={5}>
                    {todos.map(todo => (
                        <ToDoRow
                            todo={todo}
                            toggleCompleted={toggleCompleted}
                            users={userData}
                            key={todo.id}
                        />)
                    )}
                </Stack>
            </Container>
        )
    }

    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
        </div>
    )
}


export default App;
