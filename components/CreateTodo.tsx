"use client";
import { useMutation } from "@apollo/client";
import { CREATE_TODO } from "../graphql/mutations";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { CircleX } from 'lucide-react';

type CreateTodoProps = {
    onClose: () => void;
};

export default function CreateTodo({ onClose }: CreateTodoProps) {
    const { data: session } = useSession();
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [completed, setStatus] = useState("PENDING");
    const isoDate = dueDate ? dueDate.toISOString() : null;

    const [addTodo, { loading, error }] = useMutation(CREATE_TODO, {
        onCompleted: () => {
            setTitle("");
            setDesc("");
            setStatus("PENDING");
            setDueDate(null);
        }
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!title || !desc) {
            alert("Please fill all fields");
            return;
        }
        if (!session?.user?.id) {
            alert("Please log in to create a todo.");
            return;
        }

        try {
            await addTodo({
                variables: {
                    title,
                    desc,
                    completed,
                    ownerId: session.user.id,
                    date: isoDate
                }
            });
        } catch (e) {
            console.error("Submission Error: ", e);
        }
    };

    return (
        <div>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-lg space-y-4">
            <button onClick={onClose}><CircleX /></button>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
                <textarea
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
                <select
                    value={completed}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
                >
                    <option value="PENDING">Pending</option>
                    <option value="WORKING">Working</option>
                    <option value="DONE">Done</option>
                </select>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-900 disabled:opacity-50"
                >
                    {loading ? 'Adding Todo...' : 'Add Todo'}
                </button>

                {error && <pre className="text-red-500 text-sm mt-2">Error: {JSON.stringify(error, null, 2)}</pre>}
            </form>
        </div>
    );
}
