import React, { useState } from "react"
import Head from "next/head";
import Image from "next/image";

const sleep = (ms:any) => new Promise((r) => setTimeout(r, ms));
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, push, update,set } from "firebase/database";
import Link from "next/link";

const firebaseConfig = {
  apiKey: "AIzaSyAu-shuu7Qrnia9GxTYnOyFTLyXAYpxU0E",
  authDomain: "cs422-diffusion.firebaseapp.com",
  projectId: "cs422-diffusion",
  storageBucket: "cs422-diffusion.appspot.com",
  messagingSenderId: "911304024419",
  appId: "1:911304024419:web:ef76da1846e9850b77b356"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

interface DataType {
  output: string,
  status:string
}
export default function Diffusion() {

  const[prediction,setPrediction] =useState<DataType>();
  const[error, setError] = useState(null)
  const[loading,setLoading] = useState(false)
  const[anh,setAnh] = useState(false)
  const[doneSave,setDoneSave] = useState(false)
  const [popupInstall ,  setPopupInstall] =  useState(false)

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const {prompt, seed, guidanceScale} = Object.fromEntries(formData.entries()) as {prompt:string; seed:string ; guidanceScale:string};
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        seed:parseInt(seed),
        guidanceScale: parseInt(guidanceScale)
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      setLoading(true)
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log(prediction)
      setPrediction(prediction);
    }
    if(prediction.status == "succeeded")
    {
      setLoading(false)
      setAnh(true)
    }
  };

  function getRandomInt(min:any, max:any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const SaveImage =()=>{
    if(localStorage.getItem("account") == null)
    {
        setPopupInstall(true)
        setAnh(false)
    }
    else
    {
        if(prediction == null) return
        var id = getRandomInt(1,10000)
        set(ref(db, 'users/' + localStorage.getItem("account") + '/images'+ '/' + id), {
          image : prediction.output[0]
        })
        .then(()=>{
            setDoneSave(true)
            setAnh(false)
        })
        .catch((error)=>{
            console.log(error);
        });
    } 
  }

  return (
    <div   className="w-full min-h-screen bg-cover bg-center pb-20 bg-no-repeat bg-mybg">
    <div className="flex min-h-screen flex-col items-center py-2">
        <p className="text-textVang mb-8 text-5xl mt-36 font-bold" >
                        INPUT YOUR PROMPT TO GENERATE AI IMAGE
        </p>
     <main className="flex w-full flex-col justify-center px-20 text-center">
        <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col items-start">
                <label className="text-textVang font-bold text-2xl mb-2" htmlFor="prompt ">Prompt</label>
                <textarea name="prompt" className="border border-gray-600 w-full rounded-lg caret-black outline-none"></textarea>
            </div>

            <div className="flex flex-col items-start mt-4">
                <label className="text-textVang font-bold text-2xl mb-2" htmlFor="seed">Seed (recommend: 123123)</label>
                <input name="seed" type="number" className="border border-gray-600 rounded-lg p-2 outline-none" />
            </div>

            <div className="flex flex-col items-start mt-4">
                <label className="text-textVang font-bold text-2xl mb-2" htmlFor="guidanceScale">Guidance Scale (recommend: 6)</label>
                <input name="guidanceScale" type="number" className="border border-gray-600  rounded-lg p-2 outline-none" />
            </div>
            <button  className="items-center bg-textVang text-black font-semibold w-36 mt-4 rounded-lg p-2">Generate</button>
        </form>


        {prediction && (
          <div className="mt-5">
            {prediction.output && (
              <div>
              { anh && (
                  <div>
                    <div className="grid place-items-center bg-neutral-700 bg-opacity-60 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal min-h-screen">
                      <div className="relative bg-pink-100 rounded-lg shadow dark:bg-gray-700 md:w-bg w-1/2 grid place-items-center">
                        <div className="flex items-start  border-b rounded-t dark:border-gray-600">
                          <img 
                              className=" md:h-[20rem] mt-12 w-[20rem] object-center rounded "
                              src={prediction.output[0]}
                              alt=""
                          />
                        </div>
                        <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                          <button 
                              onClick={()=>{setAnh(false)}}
                            data-modal-toggle="defaultModal"
                            type="button"
                            className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                              Retry
                          </button>
                          <button 
                              onClick={SaveImage}
                            data-modal-toggle="defaultModal"
                            type="button"
                            className="text-white bg-red-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                              Save Image
                          </button>
                        </div>
                      </div>
                    </div>
                      
                </div>
              )}
              </div>
            )}
            <p className="text-white">Status: {prediction.status}</p>
          </div>
        )}
     </main>

      {loading && (
                <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal min-h-screen">
                <div className="relative bg-white rounded-lg shadow w-72 md:w-96 grid place-items-center">
                  <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 ">
                      Waiting for generate Image
                    </h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <p className="font-semibold text-base leading-relaxed">
                      LOADING...
                    </p>
                  </div>
                </div>
              </div>
      )}

       {doneSave && 
              <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal min-h-screen">
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
                    <button onClick={()=>{setDoneSave(false)}}
                      data-modal-toggle="defaultModal"
                      type="button"
                      className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Thank you
                    </button>
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
    </div>
  );
}