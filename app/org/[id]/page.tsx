"use client";
import { useQuery } from "@apollo/client";
import { GET_ORG_TASKS, GET_TEAM_DETAILS } from "@/graphql/queries";
import { Task } from "@/components/Task";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";
import TaskForm from "@/components/CreateOrgTask";
import { useState } from "react";
import TaskCard from "@/components/TaskPoster";
import { AddMember } from "@/components/AddMember";
import { useSession } from "next-auth/react";
import { MemberListModal } from "@/components/Memberlist";

export default function Page() {
  const { data: session } = useSession();
  const userID = session?.user?.id;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [poster, setPoster] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, loading, error } = useQuery(GET_ORG_TASKS, {
    variables: { orgsId: id },
  });

  const {
    data: teamData,
    loading: teamLoading,
    error: teamError,
  } = useQuery(GET_TEAM_DETAILS, {
    variables: { orgsId: id },
  });

  const handlePlusClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  const closePoster = () => {
    setPoster(false);
    setSelectedTaskId(null);
  };

  return (
    <div>
      {loading && <p>loading...</p>}
      {error && <p>error...</p>}
      {teamLoading && <p>loading...</p>}
      {teamError && <p>error...</p>}

      {teamData && (
        <h1 className="text-2xl text-center font-bold mb-6">
          {teamData.getteamDetails.name}
        </h1>
      )}

      {data &&
        data.getOrgTodo.map((task: any) => {
          const date = new Date(task.date);
          const formattedDate =
            date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            }) +
            " " +
            date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });

          return (
            <div
              key={task.id}
              onClick={() => {
                setPoster(true);
                setSelectedTaskId(task.id);
              }}
            >
              <Task
                title={task.title}
                date={formattedDate}
                status={task.completed}
              />
            </div>
          );
        })}

      <div className="flex justify-center mt-4">
        <button onClick={handlePlusClick}>
          <Plus color="gray" />
        </button>
        <p className="text-gray-500">Add task</p>
      </div>

      {poster && selectedTaskId && (
        <TaskCard closeForm={closePoster} todoid={selectedTaskId} />
      )}
      {isFormVisible && (
        <div className="mt-4">
          <TaskForm id={id} closeForm={closeForm} />
        </div>
      )}

      {teamData && teamData.getteamDetails.adminId === session?.user?.id && (
        <>
          <AddMember />
        </>
      )}
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Show Members
      </button>
      <MemberListModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
