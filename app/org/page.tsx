"use client";
import { CreateTeam } from "@/components/CreateTeam";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { GET_USER_CREATED_TEAMS } from "@/graphql/queries";
import Team from "@/components/Team";
import {CirclePlus} from 'lucide-react';

export default function Page() {
    const { data: session } = useSession();
    const { data, loading, error } = useQuery(GET_USER_CREATED_TEAMS, {
        variables: { adminId: session?.user?.id },
    });
    const [formEnabled, setFormEnabled] = useState(false);

    function enableForm() {
        setFormEnabled(true);
    }

    function disableForm() {
        setFormEnabled(false);
    }

    return (
        <div className="flex flex-col pl-8"> 
            <h1 className="text-2xl font-bold mb-4">Your Teams</h1>

            
            <div className="mb-4">
                <button
                    className="  text-gray font-bold py-2 px-4 rounded"
                    onClick={enableForm}

                >
                    <CirclePlus className="w-6 h-6 inline-block" /> 
                </button>
            </div>

            {formEnabled && (
                <div className="mb-4">
                    <CreateTeam onClose={disableForm} />
                </div>
            )}

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            
            {data && (
                <div className="flex flex-col w-full">
                    {data.getUserCreatedTeams.map((team: any) => (
                        <div className="w-full max-w-md mb-4">
                            <Team key={team.id} firstLetter={team.name[0]} name={team.name} location={team.id} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
