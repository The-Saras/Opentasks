"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_ORG_MEMBER } from "../graphql/mutations";
import { useParams } from "next/navigation";

export function AddMember() {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [createTeam] = useMutation(CREATE_ORG_MEMBER, {
    onCompleted: () => {
      alert("Member added successfully");
      setShowModal(false);
    },
  });

  return (
    <div>
      <button
        className="text-gray-500 hover:text-gray-900 text-sm font-bold"
        onClick={() => setShowModal(true)}
      >
        + Add Member
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mx-auto border border-gray-200 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add Member
            </h2>
            <input
              className="border border-gray-300 focus:border-green-500 focus:outline-none rounded-md px-4 py-2 mb-4 w-full text-gray-700"
              type="email"
              placeholder="Enter member email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out w-full"
              onClick={() => {
                createTeam({
                  variables: {
                    input: {
                      organizationId: id,
                      email,
                    },
                  },
                });
              }}
            >
              Add Member
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
