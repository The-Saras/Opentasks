"use client "
import { signIn, useSession } from "next-auth/react";

export  function HomeComp() {
    return(

        <>
        <button
            onClick={() => signIn()}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3 px-8 rounded-full text-lg font-semibold flex items-center space-x-3 shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 border-2 border-transparent hover:border-orange-600"
            >Signin</button>
    </>
        )
}