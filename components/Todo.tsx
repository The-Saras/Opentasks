"use client";
import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../graphql/queries';
import { useSession } from 'next-auth/react';
import { TodoCmp } from './TodoCmp';
import { useState, useEffect } from 'react';
import {Plus} from 'lucide-react'

type Todo = {
    id: string;
    title: string;
    desc: string;
    completed: "PENDING" | "WORKING" | "DONE";
    ownerId: string;
};


export const Todo = () => {
    const { data: session } = useSession();
    const { data, loading, error } = useQuery(GET_TODOS, { variables: { ownerId: session?.user?.id } });

    const [pendingtodos, setPendingTodos] = useState<Todo[]>([]);
    const [workingtodos, setWorkingTodos] = useState<Todo[]>([]);
    const [donetodos, setDoneTodos] = useState<Todo[]>([]);

    useEffect(() => {
        if (data) {
            const pending = data.getuserTodos.filter((todo: Todo) => todo.completed === "PENDING");
            const working = data.getuserTodos.filter((todo: Todo) => todo.completed === "WORKING");
            const done = data.getuserTodos.filter((todo: Todo) => todo.completed === "DONE");

            setPendingTodos(pending);
            setWorkingTodos(working);
            setDoneTodos(done);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>

            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <p className="bg-gray-200 border border-gray-400 text-center px-2 py-1 inline-block rounded">Pending</p>

                    {pendingtodos.map((todo) => (
                        <TodoCmp key={todo.id} title={todo.title} />
                    ))}
                    <Plus color="gray" />
                </div>
                <div className="flex-1">
                <p className="bg-blue-200 border border-blue-400 text-center px-2 py-1 inline-block rounded">Working</p>
                    {workingtodos.map((todo) => (
                        <TodoCmp key={todo.id} title={todo.title} />
                    ))}
                </div>
                <div className="flex-1">
                <p className="bg-green-200 border border-green-400 text-center px-2 py-1 inline-block rounded">Done</p>
                    {donetodos.map((todo) => (
                        <TodoCmp key={todo.id} title={todo.title} />
                    ))}
                </div>
            </div>
        </div>
    );
};
