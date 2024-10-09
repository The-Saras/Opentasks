"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export function HomeComp() {
    const session = useSession();
    return (

        <>
            {!session.data?.user && <button onClick={()=>signIn()} className="bg-blue-400">Signin</button>}
            
            {session.data?.user && <>
                <button onClick={()=>signOut()} className="bg-blue-400 p-2 ">Signout</button>
                <div>{session.data.user.name}</div>
            </>}
            
        </>
    )
}