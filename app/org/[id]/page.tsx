"use client";
import { useQuery } from "@apollo/client"
import { GET_ORG_TASKS, GET_TEAM_DETAILS } from "@/graphql/queries"
import { Task } from "@/components/Task"
import { useParams } from "next/navigation"
import { Plus } from "lucide-react";
import TaskForm from "@/components/CreateOrgTask";
export default function Page() {
    const { id } = useParams()
    const { data, loading, error } = useQuery(GET_ORG_TASKS, {
        variables: {
            orgsId: id
        }
    })

    const { data: teamData, loading: teamLoading, error: teamError } = useQuery(GET_TEAM_DETAILS, {
        variables: {
            orgsId: id
        }
    })

    console.log(teamData)
    return (
        <div>


            {loading && <p>loading...</p>}
            {error && <p>error...</p>}
            {teamLoading && <p>loading...</p>}
            {teamError && <p>error...</p>}
            {teamData && <h1 className="text-2xl text-center font-bold mb-6">{teamData.getteamDetails.name}</h1>}
            {data && data.getOrgTodo.map((task: any) => {
                const date = new Date(task.date);


                const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) +
                    ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                return (
                    <Task title={task.title} date={formattedDate} status={task.completed} />
                )
            })}
            <div className=" px-60">
                <Plus color="gray" />
            </div>
            <TaskForm id={id}/>
        </div>
    )
}