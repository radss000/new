import React from 'react';
import Image from "next/image";
import {useRouter} from "next/router";
import {Button} from "antd";
import {magic} from "@/lib/magic";

const ProfileCard = () => {
    const handleLogout = () => {
        localStorage.removeItem('user')

        magic.auth.logout()
    }
    const router = useRouter();
    return (<div className={"flex flex-col items-center justify-center py-5 border-2  gap-5 rounded-md w-full h-full"}>
        <div className={"flex flex-col border border-black items-center justify-center gap-3"}>
            <Image alt={"avatar"} width={100} height={100}
                   className={"shadow-xl rounded-full border-2 border-amber-500"} src={"/Images/facebook.png"}
                   size={60}/>
            <div>Name surname</div>
            <div>0xx9xxxx</div>
            <div>Joined on xx/xx/xxxx</div>
            <div>Verified profile</div>
        </div>
        <div className={"flex flex-col items-center justify-center gap-5 "}>
            <Button className={"border-amber-500 w-full px-5 py-2 border-2 rounded-md"}>Edit Profile
            </Button>
            <div onClick={handleLogout} className={"hover:cursor-pointer"}>Logout</div>
        </div>
    </div>)
}
export default ProfileCard;