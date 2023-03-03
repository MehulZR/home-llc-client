import axiosInstance from "./api/axios";

function Navbar({ firstName, lastName, setLoggedIn }) {
  const logoutHandler = async () => {
    try {
      await axiosInstance.post("/logout", null, { withCredentials: true });
      setLoggedIn(false);
    } catch (err) {
      console.log(err);
    }
  };
  function onBurgerIconClick() {
    const burgerMenuOverlay = document.getElementById("burgerMenuOverlay");
    burgerMenuOverlay.classList.remove("w-0");
    burgerMenuOverlay.classList.add("w-full");
  }

  return (
    <div className="sticky top-0 h-14 flex-none bg-gray-200 flex px-4 py-2 justify-between items-center space-x-2">
      <div className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          onClick={onBurgerIconClick}
          className="w-6 h-6 sm:hidden flex-none cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div className="flex min-w-min text-black rounded overflow-hidden ">
          <input
            type="text"
            placeholder="Search Here"
            className="flex-auto w-1/2 outline-none p-2 "
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="flex-none w-10 p-2 cursor-pointer bg-black text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
      <div className=" flex justify-end items-center space-x-2">
        <span className="font-medium truncate">
          {firstName ? `${firstName} ${lastName}` : " Stranger"}
        </span>
        <button
          onClick={logoutHandler}
          className="rounded-full p-2  bg-black text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
export default Navbar;
