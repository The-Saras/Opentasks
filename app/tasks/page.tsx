import CreateTodo from "@/components/CreateTodo";
import Sidebar from "@/components/Sidebar";
import { Todo } from "@/components/Todo";

export default function TasksPage() {
    
    return (
        <div>
            <h1 className="text-xl  mb-4">Your Tasks</h1>
            <Todo />
            <CreateTodo />
           
        </div>
    );
}