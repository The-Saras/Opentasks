import { Calendar, User } from "lucide-react";
import { CalendarFold } from "lucide-react";
import DatePicker from "react-datepicker";
import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TODO_BYID } from "@/graphql/queries";
import { UPDATE_TODO } from "@/graphql/mutations";
import { ASSIGN_TASK } from "@/graphql/mutations";

type Status = "PENDING" | "WORKING" | "DONE";

const TaskCard = ({
  closeForm,
  todoid,
}: {
  closeForm: () => void;
  todoid: string | string[];
}) => {
  const [completed, setCompleted] = React.useState<Status>("PENDING");
  const [dueDate, setDueDate] = React.useState<Date | null>(null);
  const [title, setTitle] = React.useState<string>("");
  const [desc, setDesc] = React.useState<string>("");
  const [assignedTo, setAssignedTo] = React.useState<string>("");

  const { data, loading, error } = useQuery(GET_TODO_BYID, {
    variables: { getTodobyIdId: todoid },
    onCompleted: (data) => {
      
      setTitle(data?.getTodobyId?.title || "");
      setDesc(data?.getTodobyId?.desc || "");
      setCompleted(data?.getTodobyId?.completed || "PENDING");
      setDueDate(new Date(data?.getTodobyId?.date));
      setAssignedTo(data?.getTodobyId?.assignee.name || "none");
      
    },
    onError: (error) => console.log("Query error:", error),
  });

  const [assignTask] = useMutation(ASSIGN_TASK,{
    onCompleted: ()=>{
      alert("Task assigned successfully")
    }
  });

  const [updateTodo] = useMutation(UPDATE_TODO);

  const submitChange = async () => {
    try {
      await updateTodo({
        variables: {
          updateTodoId: todoid,
          title,
          desc,
          completed,
          date: dueDate,
        },
      });
      if(assignedTo !== ""){
        await assignTask({
          variables:{
            todoId: todoid,
            email: assignedTo
          }
        })
      }
      closeForm();
    } catch (error) {
      console.log(error);
    }
  };

  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;
  if (!data || !data.getTodobyId) return <div>No data available</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full h-auto flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <input
            className="rounded p-3 text-gray-700 w-full outline-none border border-gray-300"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="rounded p-3 text-gray-700 w-full outline-none border border-gray-300 resize-none"
            rows={3}
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <div className="flex items-center space-x-3">
            <label className="text-gray-600 font-medium">Status:</label>
            <select
              className="bg-white text-gray-700 outline-none border border-gray-300 rounded px-2 py-1"
              onChange={(e) => setCompleted(e.target.value as Status)}
              value={completed}
            >
              <option value="PENDING">Pending</option>
              <option value="WORKING">Working</option>
              <option value="DONE">Done</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <CalendarFold size={20} color="gray" />
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              dateFormat="dd MMM yyyy h:mm aa"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              placeholderText="Due Date"
              className="outline-none text-gray-700 border border-gray-300 rounded w-full p-2"
            />
          </div>
        </div>

        <div className="flex items-center text-gray-600">
          <User size={20} className="mr-2" />
          <input placeholder={assignedTo} className="outline-none" onChange={(e)=>{setAssignedTo(e.target.value)}}></input>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
            onClick={closeForm}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600"
            onClick={submitChange}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
