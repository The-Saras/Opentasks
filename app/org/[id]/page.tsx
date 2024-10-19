"use client";
import { useQuery } from "@apollo/client"
import { GET_ORG_TASKS,GET_TEAM_DETAILS } from "@/graphql/queries"
import {Task} from "@/components/Task"
import { useParams } from "next/navigation"
export default function Page(){
    const {id} =  useParams() 
    const {data, loading, error} = useQuery(GET_ORG_TASKS, {
        variables: {
            orgsId: id
        }
    })

    const {data:teamData, loading:teamLoading, error:teamError} = useQuery(GET_TEAM_DETAILS, {
        variables: {
            orgsId: id
        }
    })
    
    console.log(teamData)
    return(
        <div>

            
            {loading && <p>loading...</p>}
            {error && <p>error...</p>}
            {teamLoading && <p>loading...</p>}
            {teamError && <p>error...</p>}
            {teamData && <h1 className="text-lg font-bold">{teamData.getteamDetails.name}</h1>}
            {data && data.getOrgTodo.map((task:any)=>{
                return(
                    <Task title={task.title} date={task.date}/>
                )
            })}
        </div>
    )
}