import React, {FC} from 'react';
import {ToDo, User} from '../types';
import {Box, Heading, Tag, Text} from "@chakra-ui/react";

interface ToDoRowProps {
    todo: ToDo;
    toggleCompleted: (id: number) => void;
    users: User[];
}

const  ToDoRow: FC<ToDoRowProps> = ({todo, toggleCompleted, users}) => {

    return (
        <Box  borderWidth='1px' p={4}>
            <Heading key={todo.id} as='h4' size='md'>
                {todo.title}
            </Heading>
            <Tag
                style={{cursor: 'pointer'}}
                onClick={() => toggleCompleted(todo.id)}
                colorScheme={todo.completed ? 'blue' : 'red'}>
                {todo.completed ? 'Done' : 'Not Completed'}
            </Tag>
            <Text>
                {users.find(user => user.id === todo.userId)?.name}
            </Text>
        </Box>
    )
}

export default ToDoRow;