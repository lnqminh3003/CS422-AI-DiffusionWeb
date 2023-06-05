import Navigation from "@/component/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import {getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Link from "next/link";

import { initializeApp } from "firebase/app";
import { getDatabase ,  ref as ref_database, set, update, child, get, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAu-shuu7Qrnia9GxTYnOyFTLyXAYpxU0E",
  authDomain: "cs422-diffusion.firebaseapp.com",
  projectId: "cs422-diffusion",
  storageBucket: "cs422-diffusion.appspot.com",
  messagingSenderId: "911304024419",
  appId: "1:911304024419:web:ef76da1846e9850b77b356"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const storage = getStorage();

export default function Collection() {
  const [file, setFile] = useState<any | null>(null);
  const [blob, setBlob] = useState<string | undefined>();

  const [nameUser,setPartner] = useState("");

  const [success,setSuccess] = useState(false)
  const [loading,setLoading] = useState(false)
  const[popupInstall, setPopupInstall] =  useState(false)
   
  useEffect(() => {
    if(localStorage.getItem("account") != null)
    {
        
    }
    else{
      setPopupInstall(true)
    }
}, []);

  const submitAva = ()=>{
    if (file == null) {
      return;
    }
    else if(localStorage.getItem("account") == null)
    {
      setPopupInstall(true)
      return;
    }

    setLoading(true);
    var uid = localStorage.getItem("account");
    const fileRef = ref(storage,`/image/${uid}`);
    uploadBytes(fileRef, file)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((url) => {
                    update(ref_database(db, `users/`+ uid) ,{
                      urlImage : url,
                    }).then(()=>{
                        setSuccess(true);
                        setBlob("")
                        setLoading(false);
                      })
                      .catch((error)=>{
                          console.log(error);
                      });
              })    
              .catch((err) => {
                console.log("get file url failed:", err);
              });
          })
          .catch((err) => {
            console.log("upload file failed:", err);
          });  
  }

  const submitName =()=>{
      if(localStorage.getItem("account") == null)
      {
        setPopupInstall(true)
        return;
      }
      setLoading(true);
      var uid = localStorage.getItem("account");
      update(ref_database(db, `users/`+ uid) ,{
        name : nameUser
      }).then(()=>{
          setSuccess(true);
          setLoading(false);
          setPartner("")
        })
        .catch((error)=>{
            console.log(error);
        });
  }

  return (
    <div   className="w-full min-h-screen bg-cover bg-center pb-20 bg-no-repeat bg-mybg">
      <Navigation />
      
      <div className="pb-10 items-center">
      <div className="flex  flex-col items-center py-2 ">
          <p className="text-textVang mb-8 text-5xl mt-36 font-bold" >
                          EDIT YOUR PROFILE
          </p>
      </div>
      <div className="flex items-center flex-row space-x-2 ml-20">
        <img  alt="" src="https://arbmarvel.ai/icons/ic-collection.svg "></img>
          <div className = "text-white  text-2xl ml-20 text-center font-bold">
              Upload your avatar
          </div>
        </div>
      
        <div className="flex  flex-col items-center py-2 mb-12">
          <div className=" flex items-center justify-center w-36 h-48 md:w-72 md:h-128">
            <div className="flex items-center justify-center w-36 h-48 md:w-72 md:h-128">
                <label className="rounded-lg items-center justify-center flex flex-col w-full h-full border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  {blob ? (
                    <img
                      className="object-cover items-center justify-center w-full h-full"
                      src={blob}
                      alt=""
                    ></img>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>

                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                        Upload avatar
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    className="opacity-0 max-h-0"
                    onChange={(ev) => {
                      try {
                        if (
                          ev.target.files == null ||
                          ev.target.files == undefined
                        ) {
                          return;
                        }

                        const reader = new window.FileReader();
                        reader.readAsArrayBuffer(ev.target.files[0]);
                        reader.onloadend = () => {
                          const res = reader.result!;
                          if (typeof res == "string") {
                            return;
                          }

                          const blob = new Blob([res]);
                          setBlob(URL.createObjectURL(blob));
                        };

                        setFile(ev.target.files![0]);
                      } catch {
                        console.log("Yo yo, đi nấu đá không ae?");
                      }
                    }}
                  />
                </label>
              </div>
            </div>
            <button
                className=" mt-8 text-black font-semibold bg-textVang hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={submitAva}
                >
                Submit
                </button>
        </div>
      </div>
                      
      <div className="flex items-center flex-row space-x-2 ml-20">
        <img  alt="" src="https://arbmarvel.ai/icons/ic-collection.svg "></img>
          <div className = "text-white  text-2xl ml-20 text-center font-bold">
              Update your name
          </div>
      </div>
      <div className="flex  flex-col items-center py-2 mb-12">
        <input 
                      className=" mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                      dark:focus:border-blue-500" placeholder="Update your name"
                      value={nameUser}   
                      onChange={e=>setPartner(e.target.value)}
            />
                  <button onClick={submitName} data-modal-toggle="defaultModal" type="button" className="text-black font-semibold bg-textVang focus:ring-4 focus:outline-none  rounded-lg text-sm px-5 py-2.5 text-center ">
                          Submit
                  </button>
      </div>

            
            {success && 
                <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                <div className="relative bg-white rounded-lg shadow w-72 md:w-96 grid place-items-center">
                  <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                      className="p-1 rounded h-11 w-11"
                      alt="..."
                    />
                    <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 ">
                      Upload 
                    </h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <p className="font-semibold text-base leading-relaxed">
                      SUCCESSFUL
                    </p>
                  </div>
                  <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                    <button onClick={()=>setSuccess(false)}
                      data-modal-toggle="defaultModal"
                      type="button"
                      className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Let's go
                    </button>
                  </div>
                </div>
              </div>
            }

            {loading && 
                <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal min-h-screen">
                <div className="relative bg-white rounded-lg shadow w-72 md:w-96 grid place-items-center">
                  <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 ">
                      Upload image
                    </h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <p className="font-semibold text-base leading-relaxed">
                      LOADING...
                    </p>
                  </div>
                </div>
              </div>
            }   





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
}
