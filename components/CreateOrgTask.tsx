import { useState } from "react";
import { CalendarFold } from "lucide-react";
import DatePicker from "react-datepicker";
import { useMutation } from "@apollo/client";
import "react-datepicker/dist/react-datepicker.css";
import { CREATE_ORG_TODO } from "@/graphql/mutations";
import { useSession } from "next-auth/react";

export default function TaskForm(props: any) {
    const { data: session } = useSession();
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [completed, setCompleted] = useState("PENDING");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const isoDate = dueDate ? dueDate.toISOString() : null;

    const [addTodoToOrg, { loading, error }] = useMutation(CREATE_ORG_TODO, {
        onCompleted: () => {
            alert("Task created successfully");
            setTitle("");
            setDesc("");
            setCompleted("PENDING");
            setDueDate(null); // Optionally reset due date
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
            await addTodoToOrg({
                variables: {
                    title,
                    desc,
                    completed,
                    orgsId: props.id,
                    ownerId: session.user.id,
                    date: isoDate
                }
            });
        } catch (e) {
            console.error("Submission Error: ", e);
        }
    };

    return (
        <div className="max-w-md mx-auto border border-gray-300 rounded-lg p-2 shadow-sm">
            <div>
                <input 
                    className="rounded p-2 text-gray-700 outline-none" 
                    placeholder="Task name" 
                    onChange={(e) => setTitle(e.target.value)} 
                />
            </div>

            <div>
                <input 
                    className="text-xs rounded p-2 pb-4 text-gray-700 outline-none" 
                    placeholder="Description" 
                    onChange={(e) => setDesc(e.target.value)} 
                />
            </div>

            <div className="flex items-center space-x-4 mb-4">
                <div className="inline-flex items-center border-solid border-2 border-gray-200 rounded px-2 py-1">
                    <CalendarFold size={16} className="mr-2" color="gray" />
                    <DatePicker
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        dateFormat="dd MMM yyyy h:mm aa" // Format to include time
                        showTimeSelect // Show time picker
                        timeFormat="HH:mm" // 24-hour format
                        timeIntervals={15} // Time intervals for picking
                        placeholderText="Due date and time"
                        className="outline-none text-gray-700"
                    />
                </div>

                <div className="inline-flex items-center border-solid border-2 border-gray-200 rounded px-2 py-1">
                    <select 
                        className="ml-2 bg-white text-gray-700 outline-none border-none" 
                        onChange={(e) => setCompleted(e.target.value)}
                    >
                        <option value="PENDING" className="text-red-500">Pending</option>
                        <option value="WORKING" className="text-blue-500">Working</option>
                        <option value="DONE" className="text-green-500">Done</option>
                    </select>
                </div>
            </div>

            <div className="border-t border-gray-300 pt-2">
                <button 
                    className="bg-slate-700 text-slate-50 p-1 mr-2 rounded-md text-sm" 
                    onClick={handleSubmit}
                >
                    Create
                </button>
                <button className="bg-slate-200 text-slate-950 p-1 mr-2 rounded-md text-sm">
                    Cancel
                </button>
            </div>
        </div>
    );
}