import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import web3 from "./web3";
declare let window: any;

const Navigation = () => {
  const [openNav, setOpenNav] = useState(false);
  const [defaultAccount, setDefaultAccount] = useState("");
  const [popupInstall ,  setPopupInstall] =  useState(false)

  const toggleNav = () => {
    if (openNav) {
      setOpenNav(false);
    } else {
      setOpenNav(true);
    }
  };

  useEffect(() => {
    localStorage.removeItem("account");
    if(localStorage.getItem("account") != null)
    {
      setDefaultAccount(localStorage.getItem("account")!);
    }
  }, []);
  

  const ConnectToMetamask = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: any[]) => {
          localStorage.setItem("account", result[0]);
          setDefaultAccount(result[0]);
          accountChangeHandler(result);
        });
    } else {
      console.log("Install Metamask");
      setPopupInstall(true)
    }
  };


  const accountChangeHandler = async (newAccount: any) => {
    setDefaultAccount(newAccount);
    localStorage.setItem("account", newAccount);
    console.log(localStorage.getItem("account"));
  };

  return (
    <div>
      <nav className="bg-gray-900 fixed top-0 right-0 left-0 border-gray-200 px-2 sm:px-4 py-4 z-20">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link
            href="https://cs-422-ai-diffusion-web.vercel.app"
            className="flex items-center"
          >
            <div className="font-bold text-textVang text-3xl">CS422</div>
          </Link>
          <button
            onClick={toggleNav}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center
                   p-2 ml-3 text-sm text-black rounded-lg md:hidden focus:outline-none
                    focus:ring-2 focus:ring-gray-200 bg-textXanh"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>

          <div className=" hidden md:block w-full md:w-auto">
            <div className="flex flex-row md:p-4 mt-2 rounded-lg md:space-x-12 md:mt-0 md:text-sm md:font-medium md:border-0 ">
              <Link
                href="/"
                className=" py-2 hover:text-white 
                        md:p-0 text-[color:white] font-semibold"
              >
                Home
              </Link>

              <Link
                href={{ pathname: "../AI" }}
                className="block py-2   hover:text-white
                        text-[color:white] md:p-0 y-700 font-semibold "
              >
                Stable Diffusion
              </Link>

              <Link
                href={{ pathname: "../collection" }}
                className="block py-2  hover:text-white 
                        md:p-0 text-[color:white] font-semibold"
              >
                My Collections
              </Link>
            </div>
          </div>
          <div className="flex flex-row space-x-4">
            {/* <button
                type="button"
                className="hidden md:block text-[color:black] bg-textXanh font-semibold rounded-lg text-sm px-5
                    py-2.5 text-center  "
            >
                Sign In
            </button>
            <button
                type="button"
                className="hidden md:block text-[color:black] bg-textXanh font-semibold rounded-lg text-sm px-5
                    py-2.5 text-center  "
            >
                Sign Up
            </button> */}
            {
                defaultAccount != "" &&
                <div className="hidden md:block text-[color:black] bg-textVang font-semibold rounded-lg text-sm px-5
                    py-2.5 text-center  ">
                    {defaultAccount}
                </div>
            }
            {
                defaultAccount == "" &&
                <button
                type="button"
                onClick={ConnectToMetamask}
                className="hidden md:block text-[color:black] bg-textVang font-semibold rounded-lg text-sm px-5
                    py-2.5 text-center  "
                >
                    Connect Blockchain
                </button>
            }
          </div>
        </div>
      </nav>
      {
        popupInstall && 
          <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal min-h-screen">
              <div className="relative bg-white rounded-lg shadow w-72 md:w-96 grid place-items-center">
                <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                  <img
                    src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png"
                    className="p-1 rounded h-11 w-11"
                    alt="..."
                  />
                </div>
                <div className="p-6 space-y-6">
                  <p className="font-semibold text-base leading-relaxed">
                  PLEASE INSTALL METAMASK WALLET
                  </p>
                </div>
                <div className="flex flex-row items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                  <button onClick={()=>{setPopupInstall(false)}}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Skip
                  </button>
                  <Link 
                   href="https://metamask.io/download/"
                    data-modal-toggle="defaultModal"
                    className="text-white bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Install
                  </Link>
                </div>
              </div>
          </div>
      }
    </div>
  );
};

export default Navigation;
