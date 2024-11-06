"use client";
import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../graphql/queries';
import { useSession } from 'next-auth/react';
import { TodoCmp } from './TodoCmp';
import CreateTodo from './CreateTodo';
import { useState, useEffect } from 'react';
import { Plus, Clock, CalendarFold, CheckCheck } from 'lucide-react';

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
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <div className="inline-flex items-center bg-gray-200 border border-gray-400 px-2 py-1 rounded">
                        <Clock className="mr-1" />
                        <p>Pending</p>
                    </div>

                    {pendingtodos.map((todo) => (
                        <TodoCmp key={todo.id} title={todo.title} />
                    ))}
                    <Plus color="gray" onClick={toggleModal} className="cursor-pointer" />
                </div>
                <div className="flex-1">
                    <div className="inline-flex items-center bg-blue-200 border border-blue-400 px-2 py-1 rounded">
                        <CalendarFold className="mr-1" />
                        <p>Working</p>
                    </div>
                    {workingtodos.map((todo) => (
                        <TodoCmp key={todo.id} title={todo.title} />
                    ))}
                </div>
                <div className="flex-1">
                    <div className="inline-flex items-center bg-green-200 border border-green-400 px-2 py-1 rounded">
                        <CheckCheck className="mr-1" />
                        <p>Done</p>
                    </div>
                    {donetodos.map((todo) => (
                        <TodoCmp key={todo.id} title={todo.title} />
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <CreateTodo onClose={toggleModal} />
                        
                    </div>
                </div>
            )}
        </div>
    );
};
