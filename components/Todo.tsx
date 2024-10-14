"use client"
import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../graphql/queries';
import { useSession } from 'next-auth/react';
import { TodoCmp } from './TodoCmp';


export const Todo = () => {
    const { data: session, status } = useSession();
    const { data, loading, error } = useQuery(GET_TODOS, { variables: { ownerId: session?.user?.id } });
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>
    return (
        <>
            <p>All todos</p>
            {data.getuserTodos.map((todo: any) => {
                return (
                    <TodoCmp key={todo.id} title={todo.title} desc={todo.desc} />
                )
            })}
        </>
    )

}