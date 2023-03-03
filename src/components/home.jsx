import SideBar from "./sidebar";
import Navbar from "./navbar";
import Hero from "./hero";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "./api/axios";
function Home({ setLoggedIn }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const burgerMenuOverlay = useRef(null);

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get("/my-info", {
        withCredentials: true,
      });
      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
      setEmail(response.data.email);
    })();
  }, []);

  function burgerMenuClose() {
    burgerMenuOverlay.current.classList.remove("w-full");
    burgerMenuOverlay.current.classList.add("w-0");
  }

  return (
    <div className="h-screen flex">
      <div
        className="fixed top-0 z-10 w-0 h-screen backdrop-blur-sm transition-all duration-300 overflow-hidden"
        id="burgerMenuOverlay"
        ref={burgerMenuOverlay}
        onClick={(e) => {
          if (e.target.id === "burgerMenuOverlay") burgerMenuClose();
        }}
      >
        <div
          id="burgerMenu"
          className="h-screen bg-black z-10 w-64 overflow-hidden flex flex-col justify-center items-center text-white"
        >
          <div
            className="p-4 font-medium text-center cursor-pointer w-full hover:font-bold"
            onClick={() => {
              const element = document.getElementById("one");
              element.scrollIntoView({ behavior: "smooth" });
              burgerMenuClose();
            }}
          >
            Home
          </div>
          <div
            className="p-4 font-medium text-center cursor-pointer w-full hover:font-bold"
            onClick={() => {
              const element = document.getElementById("two");
              element.scrollIntoView({ behavior: "smooth" });
              burgerMenuClose();
            }}
          >
            About
          </div>
          <div
            className="p-4 font-medium text-center cursor-pointer w-full hover:font-bold"
            onClick={() => {
              const element = document.getElementById("three");
              element.scrollIntoView({ behavior: "smooth" });
              burgerMenuClose();
            }}
          >
            Contact
          </div>
        </div>
      </div>
      <SideBar />
      <div className="flex flex-auto flex-col overflow-auto">
        <Navbar
          firstName={firstName}
          lastName={lastName}
          setLoggedIn={setLoggedIn}
        />
        <Hero />
      </div>
    </div>
  );
}
export default Home;
