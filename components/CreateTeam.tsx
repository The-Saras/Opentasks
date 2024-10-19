import { CircleX, } from 'lucide-react';

interface CreateTeamProps {
  onClose: () => void;
}

export function CreateTeam({ onClose }: CreateTeamProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

      
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm z-10">
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            aria-label="Close"
          >
            <CircleX className="w-6 h-6" />
          </button>
        </div>

        
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Organization Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter organization name"
            />
          </div>

          
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
