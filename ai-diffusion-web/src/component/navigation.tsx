import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import web3 from "./web3";
declare let window: any;

const Navigation = () => {
  const [openNav, setOpenNav] = useState(false);
  const [defaultAccount, setDefaultAccount] = useState("");

  const toggleNav = () => {
    if (openNav) {
      setOpenNav(false);
    } else {
      setOpenNav(true);
    }
  };

  useEffect(() => {
    ConnectToMetamask()
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
          <a
            href=""
            className="flex items-center"
          >
            <div className="font-bold text-textVang text-3xl">CS422</div>
          </a>
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
              <a
                href="/"
                className=" py-2 hover:text-white 
                        md:p-0 text-[color:white] font-semibold"
              >
                Home
              </a>

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
    </div>
  );
};

export default Navigation;
