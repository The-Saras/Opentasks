import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Team(props: any) {
  const [bgGradient, setBgGradient] = useState("");
  const router = useRouter();

  // Function to generate random gradients
  const getRandomGradient = () => {
    const gradients = [
      "bg-gradient-to-r from-red-400 to-pink-500",
      "bg-gradient-to-r from-green-400 to-blue-500",
      "bg-gradient-to-r from-indigo-400 to-purple-500",
      "bg-gradient-to-r from-yellow-400 to-red-500",
      "bg-gradient-to-r from-pink-400 to-purple-500",
      "bg-gradient-to-r from-blue-400 to-green-500",
      "bg-gradient-to-r from-orange-400 to-yellow-500"
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  useEffect(() => {
    setBgGradient(getRandomGradient());
  }, []);

  return (
    <div className="flex items-center space-x-4 cursor-pointer" onClick={()=>{router.push(`/org/${props.location}`)}}>
      
      <div className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-xl ${bgGradient}`}>
        {props.firstLetter}
      </div>
      
      
      <p className="text-lg font-medium text-gray-800">
        {props.name}
      </p>
    </div>
  );
}
