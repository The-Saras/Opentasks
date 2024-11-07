import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ORG_MEMBERS } from "../graphql/queries";
import { useParams } from "next/navigation";

type MemberListModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function MemberListModal({ isOpen, onClose }: MemberListModalProps) {
    const { id } = useParams();
    const orgId = Array.isArray(id) ? id[0] : id;

    
    if (!orgId) {
        console.warn("Organization ID is missing");
        return null;
    }

    const { data, loading, error } = useQuery(GET_ORG_MEMBERS, {
        variables: { orgsId: orgId },
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
                <button
                    className="text-gray-500 text-sm mb-4 float-right"
                    onClick={onClose}
                >
                    Close
                </button>

                <h1 className="text-lg font-semibold text-center mb-4">Members</h1>

                {loading && <p className="text-center text-sm text-gray-400">Loading...</p>}
                {error && <p className="text-center text-sm text-red-500">Error loading members.</p>}

                {data && (
                    <div className="grid grid-cols-1 gap-2">
                        {data.getOrgMembers.map((member: any) => (
                            <div
                                key={member.id}
                                className="bg-gray-100 p-2 rounded-lg shadow-sm flex flex-col"
                            >
                                <h2 className="text-sm font-medium">{member.user.name}</h2>
                                <p className="text-xs text-gray-500">{member.user.email}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
