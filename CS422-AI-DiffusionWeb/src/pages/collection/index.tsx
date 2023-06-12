import Navigation from "@/component/navigation";
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getDatabase ,  ref as ref_database, set, update, child, get } from "firebase/database";
import { saveAs } from 'file-saver';


const firebaseConfig = {
  apiKey: "AIzaSyAu-shuu7Qrnia9GxTYnOyFTLyXAYpxU0E",
  authDomain: "cs422-diffusion.firebaseapp.com",
  projectId: "cs422-diffusion",
  storageBucket: "cs422-diffusion.appspot.com",
  messagingSenderId: "911304024419",
  appId: "1:911304024419:web:ef76da1846e9850b77b356"
};

const linkUrl = "https://atonce.com/landing//art/AI%20Art%20Generator%20Dog.png"

const app = initializeApp(firebaseConfig);
const db = getDatabase();

export default function Collection() {
  const[pn, setPn] = useState([{}])
  const [nameUser, setName] =useState("")
  const [ava, setAva] =useState("")
  const [defaultAccount, setDefaultAccount] = useState("");

  const [detail,setDetail] =  useState(false)
  const [urlImage, setUrlImage] =  useState("https://collectid.io/wp-content/uploads/2023/01/22acc109-736b-480c-a6f7-8ee4e0fc61ed.jpg")
  const [copy,setCopy] =  useState(false)
  
  useEffect(() => {
    if(localStorage.getItem("account") != null)
    {
      setDefaultAccount(localStorage.getItem("account")!);
    }
    else{
      setDefaultAccount("NO ACCOUNT")
    }

    get(child(ref_database(db), 'users/' + localStorage.getItem("account") +'/name' )).then((snapshot) => {
      if (snapshot.exists()) {
          setName(snapshot.val())
          console.log(pn)
      } else {
        console.log("No data available");
        setPn([])
      }
    }).catch((error) => {
      console.error(error);
    });

    get(child(ref_database(db), 'users/' + localStorage.getItem("account") +'/urlImage' )).then((snapshot) => {
      if (snapshot.exists()) {
          setAva(snapshot.val())
          console.log(pn)
      } else {
        console.log("No data available");
        setPn([])
      }
    }).catch((error) => {
      console.error(error);
    });

    get(child(ref_database(db), 'users/' + localStorage.getItem("account") +'/images' )).then((snapshot) => {
        if (snapshot.exists()) {
            setPn(Object.values(snapshot.val()))
            console.log(pn)
        } else {
          console.log("No data available");
          setPn([])
        }
      }).catch((error) => {
        console.error(error);
      });
}, []);

const openDetail=(e:any)=>{
  setDetail(true)
  setUrlImage(e)
 
}

const shareImage = ()=>{
  navigator.clipboard.writeText(urlImage)
  setDetail(false)
  setCopy(true)
}

const download = (filename:any, content:any) => {
  var element = document.createElement("a");
  element.setAttribute("href", content);
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

const handleDownload = async (e:any) => {
  if(urlImage == linkUrl )
  {
    try {
      const result = await fetch("1.png", {
        method: "GET",
        headers: {}
      });
      const blob = await result.blob();
      var url = URL.createObjectURL(blob);
      console.log(url)
      download("image", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  }
  else
  {
    try {
      const result = await fetch("2.jpeg", {
        method: "GET",
        headers: {}
      });
      const blob = await result.blob();
      var url = URL.createObjectURL(blob);
      console.log(url)
      download("image", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  }

  
};
  return (
    <div   className="w-full min-h-screen bg-cover bg-center pb-20 bg-no-repeat bg-mybg">
      <Navigation />
      
      <div className="pb-10 items-center">
        <div className="flex  flex-col items-center py-2 mb-12">
          <p className="text-textVang mb-8 text-5xl mt-36 font-bold" >
                          MY COLLECTIONS
          </p>
          <div>
            <img className="w-36 h-36 object-cover rounded-full border-4 border-yellow-300" src={ava} alt={'aaa'} />
          </div>
          <p className="text-textVang mb-2 text-xl mt-8 font-semibold" >
                        My Account ID
          </p>
          <p className="text-white mb-4 text-base " >
                        {defaultAccount}
          </p>
          <p className="text-textVang mb-2 text-xl mt-2 font-semibold" >
                        My Name
          </p>
          <p className="text-white mb-8 text-3xl font-bold " >
                        {nameUser}
          </p>
        </div>
        <div id="all" className=" ml-8 grid grid-cols-4 gap-4 content-center">
          {pn.map((a: any) => (
                <button key={a.image} onClick={()=>openDetail(a.image)}>
                  <img
                    src={a.image}
                    alt=""
                    className=" w-60 h-60 object-cover rounded-3xl items-center"
                  />
                </button>
          ))}
        </div>
      </div>
       
       { detail && 
          <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
          <div className="relative bg-white rounded-lg shadow w-72 md:w-96 grid place-items-center">
            <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 ">
                Image Detail 
              </h3>
            </div>
            <div className="space-y-6">
              <img 
                  className=" md:h-[20rem] mt-4 w-[20rem] object-center rounded "
                  src={urlImage}
                  alt=""
              />
            </div>
            <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
              <button onClick={shareImage}
                data-modal-toggle="defaultModal"
                type="button"
                className="flex flex-row space-x-2 hover:bg-textVang  border-black border  text-sm px-5 py-2.5 text-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
                <p className="text-black font-medium focus:text-white">
                  Share
                </p>   
              </button>

              <button 
                  onClick={handleDownload} type="button"
                className="flex flex-row space-x-2 hover:bg-textVang border-black border  text-sm px-5 py-2.5 text-center"
              >
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <p className="text-black font-medium">
                  Download
                </p>   
              </button>

              <button onClick={()=>setDetail(false)}
                data-modal-toggle="defaultModal"
                type="button"
                className="text-black  border-black hover:bg-textVang border font-medium  text-sm px-5 py-2.5 text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      }
        { copy &&
            <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal min-h-screen">
            <div className="relative bg-white rounded-lg shadow w-72 md:w-56 grid place-items-center">
              <div className="mt-4 space-y-6">
                <p className="font-medium text-xl leading-relaxed">
                  COPIED
                </p>
              </div>
              <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                <button onClick={()=>{setCopy(false)}}
                  data-modal-toggle="defaultModal"
                  type="button"
                  className="text-black  hover:bg-textVang  border-black border font-medium  text-sm px-5 py-2.5 text-center"
                >
                  Thank you
                </button>
              </div>
            </div>
          </div>

        }
      </div>
    );
}
