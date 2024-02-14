import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import InvestmentJourney from "@/components/InvestmentJourney";
import Image from "next/image";
import Link from "next/link";
import Login from "@/pages/Login";

const HeroSection = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    console.log("herosection");
    if (localStorage.getItem("user") !== null) {
      setUser(true);
    }
  }, []);

  const [clicked, setClicked] = useState(false);
  return (
    <div
      className={
        "w-4/5 HeroSection dropDownEntrance h-full flex flex-row  backgroundImagess  xl:p-20 items-center justify-between p-32 "
      }
    >
      <div
        className={
          "flex dropDownEntrance flex-col w-full h-full gap-5 items-center justify-center"
        }
      >
        <h1
          className={
            "text-5xl break-all sm:justify-center sm:px-14 w-full HeroHeading font-semibold text-black "
          }
        >
          <span
            className={"font-extrabold text-[#E27B30] HeroHeading text-5xl"}
          >
            Investing{" "}
          </span>{" "}
          in local <br /> African real estate has <br /> never been easier
        </h1>

        <div
          className={
            "flex flex-row items-center sm:justify-center justify-start gap-5 w-full h-full"
          }
        >
          {user ? (
            <Link
              href={"https://tally.so/r/nGK8Lo"}
              target={"_blank"}
              className={
                "gradientedBackground text-sm hover:underline hover:scale-105 hover:duration-300 hover:font-bold px-3  py-2 h-fit w-fit hover:border-textOrange rounded-full text- text-white"
              }
            >
              Join the Community
            </Link>
          ) : (
            <Button
              onClick={() => {
                setClicked(true);
              }}
              className={
                "gradiented hover:border-textOrange rounded-full ButtonMobile px-3 py-2 h-fit w-fit text-white "
              }
              size={"small"}
            >
              {user ? "Join the Community" : "Connect to Invest"}
            </Button>
          )}
          <Button
            onClick={() => {
              setClicked(true);
            }}
            className={
              " bg-white hover:underline hover:scale-105 hover:duration-300 hover:font-bold border-textOrange text-sm ButtonMobile rounded-full px-3 py-2 h-fit w-fit gradientText "
            }
            size={"small"}
          >
            {user ? "Discover the universe" : "Connect to Invest"}
          </Button>
        </div>
        <Modal
          open={clicked && user}
          footer={null}
          onCancel={() => {
            setClicked(false);
          }}
        >
          <InvestmentJourney />
        </Modal>
        <Modal
          className=" h-fit flex  "
          open={clicked}
          footer={null}
          onCancel={() => {
            setClicked(false);
          }}
        >
          <Login />
        </Modal>
      </div>
      <Image
        quality={50}
        src={"/Images/MinahHero.svg"}
        className={
          "w-full dropDownEntrance h-full hover:scale-105 sm:pr-10 duration-300 transition-all ImageSection "
        }
        height={30}
        width={30}
        alt={""}
      />
    </div>
  );
};
export default HeroSection;
