"use client";

import { useMutation } from "@apollo/client";
import { CREATE_TODO } from "../graphql/mutations";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CreateTodo() {
    const { data: session, status } = useSession();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [completed, setCompleted] = useState(false);

    const [addTodo, { loading, error }] = useMutation(CREATE_TODO, {
        onCompleted: () => {
            setTitle("");
            setDesc("");
            setCompleted(false);
        }
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!title || !desc) {
            alert("Please fill all fields")
            return
        }
        if (!session?.user?.id) return;

        try {
            await addTodo({
                variables: {
                    title,
                    desc,
                    completed,
                    ownerId: session?.user?.id
                }
            })

            window.location.reload();
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <h1>Create Todo</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-lg space-y-4">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Add New Todo</h2>

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

                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                        className="h-4 w-4 text-gray-700 border-gray-400 rounded focus:ring-gray-700"
                    />
                    <span className="text-gray-800">Completed</span>
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-900 disabled:opacity-50"
                >
                    {loading ? 'Adding Todo...' : 'Add Todo'}
                </button>

                {error && <p className="text-red-500 text-sm mt-2">Error: {error.message}</p>}
            </form>


        </div>
    )
}