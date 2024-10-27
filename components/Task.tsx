import { CalendarFold } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_TODO_BYID } from "@/graphql/queries";

interface TaskProps {
    title: string;
    date: string;
    status: string;
}

export function Task(props: TaskProps) {
    
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "text-red-500";
            case "working":
                return "text-blue-500";
            case "done":
                return "text-green-500";
            default:
                return "text-gray-500";
        }
    };

    return (
        <div className="max-w-2xl mx-auto border-b border-gray-300 pb-4 mb-4 px-6 cursor-pointer" >
            <p className="text-base">{props.title}</p>
            <div className="flex justify-between items-center text-sm">
                <p className="text-blue-500">
                    <CalendarFold size={16} className="inline-block mr-2" />
                    {props.date}
                </p>
                <div>

                    <p className={`${getStatusColor(props.status)} lowercase`}>
                        {props.status}
                    </p>
                </div>
            </div>
        </div>
    );
}
