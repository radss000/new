import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { Avatar, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { magic } from "@/lib/magic";
import { postToken } from "../../../util";
import Loading from "@/components/Loading";

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [userInfo, setUserInfo] = useState(null);
  const isProjectActive =
    pathName.startsWith("/Projects") || pathName.startsWith("/ProjectDetails");
  // const isLitepaperActive = pathName.startsWith("/LitePaper")
  // const isAboutUsActive = pathName.startsWith("/AboutUs")
  // const isJoinTheCommunityActive = pathName.startsWith("/JoinTheCommunity")
  // const isLoginSignupActive = pathName.startsWith("/Login  ")
  const [account, setAccount] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userInf, setUserInf] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") 
      if (localStorage.getItem("userInfo")) {
        const userinfo = localStorage.getItem("userInfo");
        setUserInf(JSON.parse(userinfo));
        setIsLogin(true);
      }
    if (localStorage.getItem("userMetaData")) {
      console.log(JSON.parse(localStorage.getItem("userMetaData")));
      const userData = JSON.parse(localStorage.getItem("userMetaData"));
      setUserInfo(userData.user);
    }
  }, [isLogin]);

  const handleLogin = async () => {
    console.log("I WAS CLICKED");
    try {
      console.log("Going to connect");

      // Try to connect to the wallet using Magic's user interface
      const accounts = await magic.wallet.connectWithUI();
      console.log("accounts", accounts);
      //please make sure that email is being returned as well
      setIsLogin(true);
      //please authenticate with server
      if (accounts) {
        const walletInfo = await magic.user.getInfo();
        console.log("wallet info ", walletInfo);

        if (walletInfo !== null) {
          try {
            setLoading(true);
            const response = await postToken(walletInfo);
            
            if (response.responseCode === 200) {
              message.success("Login Successful");
              setLoading(false);
              router.reload();
            } else {
              message.error("Login Failed");
              setLoading(false);
            }
          } catch (e) {
            setLoading(false);
            message.error("Login Failed");
          }
        }

        if (walletInfo !== null) {
          localStorage.setItem("userInfo", JSON.stringify(walletInfo));
        }
      }
      // If connection to the wallet was successful, initialize new Web3 instance
    } catch (error) {
      console.error("Failed to connect with Magic:", error);

      // Log any errors that occur during the connection process
      console.error("handleConnect:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      // Try to disconnect the user's wallet using Magic's logout method
      await magic.user.logout();
      localStorage.clear();
      message.success("Logout Successful");
      setTimeout(() => {
        router.reload();
      }, 1000);
      // After successful disconnection, re-initialize the Web3 instance
    } catch (error) {
      // Log any errors that occur during the disconnection process
      console.log("handleDisconnect:", error);
    }
  };
  const closeLoginPopup = () => {
    setAccount(false);
  };

  return (
    <div className={"w-full "}>
      {loading ? (
        <Loading />
      ) : (
        <div className=" w-full NavbarMobile sticky top-0 z-50  shadow h-fit px-20 py-5 flex flex-row bg-[#FAFAFA] rounded-b-xl border-b  justify-between items-center">
          <div
            onClick={() => {
              router.push("/");
            }}
            className=" cursor-pointer items-center flex"
          >
            {/* Logo on the left */}
            <motion.div className="NavbarBrand" whileHover={{ scale: 1.1 }}>
              <Image
                src={"/Images/minah_logo.svg"}
                alt={"logo"}
                width={100}
                height={50}
              />
            </motion.div>
          </div>
          <div className="NavbarMenu  cursor-pointer justify-end items-center gap-10 flex">
            {/* Menu items on the right */}

            <motion.div className="NavbarLink hover:underline hover:scale-105 hover:duration-300 hover:font-bold">
              <Link
                href={
                  "https://minah-io.gitbook.io/minah-litepaper-collection/minah-litepaper/welcome-to-minah.io"
                }
                target={"_blank"}
                className="Litepaper text-black text-sm   leading-tight"
              >
                Litepaper
              </Link>
            </motion.div>
            <motion.div className="NavbarLink hover:underline hover:scale-105 hover:duration-300 hover:font-bold">
              <div className="AboutUs text-black text-sm   leading-tight">
                About us
              </div>
            </motion.div>
            <motion.div className="NavbarLink hover:underline hover:scale-105 hover:duration-300 hover:font-bold ">
              <Link
                href={"https://tally.so/r/nGK8Lo"}
                target={"_blank"}
                className="JoinTheCommunity text-black text-sm   leading-tight"
              >
                Join the community
              </Link>
            </motion.div>
            {isLogin ? (
              <div
                className={
                  "flex flex-row items-center hover:underline hover:scale-105 hover:duration-300 hover:font-bold justify-center gap-3"
                }
              >
                <Avatar
                  className={"bordered"}
                  onClick={() => {
                    router.push("/Profile");
                  }}
                  src={
                    userInfo?.picture?.data
                      ? `data:image/svg+xml;base64,${userInfo.picture.data}`
                      : userInfo?.picture
                      ? userInfo?.picture
                      : "/Images/avatar.svg"
                  }
                  size={40}
                />
                <div className={"text-sm gradientText"}>
                  {localStorage.getItem("user")?.substring(0, 10)
                    ? localStorage.getItem("user")?.substring(0, 10)
                    : "0xx9xxxx"}
                </div>
              </div>
            ) : (
              <motion.div className="NavbarLink w-fit h-fit ">
                <div
                  onClick={handleLogin}
                  className="LoginSignup   w-full h-full px-4 py-3 text-black text-sm font-normal  leading-tight"
                >
                  <Image
                    src={"/Images/LoginButton.svg"}
                    alt={""}
                    width={75}
                    height={75}
                  />
                </div>
              </motion.div>
            )}
            <motion.div className="NavbarLink hover:scale-105 hover:duration-300 font-bold  ">
              <div
                onClick={() => {
                  // router.push('/Projects');
                  handleDisconnect();
                }}
                className={`ProjectsMobile text-black text-sm p-3 font-normal ${
                  isProjectActive
                    ? "gradiented rounded-full text-white  duration-150 transition-all "
                    : "gradiented rounded-full text-white  duration-150 transition-all "
                } leading-tight `}
              >
                Projects / Discover the universe
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
