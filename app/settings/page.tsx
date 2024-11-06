"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return <div className="text-center mt-10">Please log in to view your profile.</div>;
  }

  const { user } = session;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-80 bg-white shadow-lg rounded-lg p-6 space-y-4">
        <div className="text-center">
          <img
            src={user?.image || "/default-avatar.png"} // Fallback avatar
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 border border-gray-200"
          />
          <h2 className="text-lg font-semibold text-gray-800">{user?.name}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        <div className="mt-6">
          <button
            onClick={() => signOut()}
            className="w-full py-2 px-4 text-white bg-red-500 rounded-md font-medium hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
