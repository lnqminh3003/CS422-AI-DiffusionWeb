import Navigation from "@/component/navigation";
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getDatabase ,  ref as ref_database, set, update, child, get } from "firebase/database";

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

export default function Collection() {
  const[pn, setPn] = useState([{}])
  
  useEffect(() => {
    get(child(ref_database(db), 'users/' + localStorage.getItem("account"))).then((snapshot) => {
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

  return (
    <div   className="w-full min-h-screen bg-cover bg-center pb-20 bg-no-repeat bg-mybg">
      <Navigation />
      
      <div className="pb-10 items-center">
        <div className="flex  flex-col items-center py-2 mb-12">
          <p className="text-textVang mb-8 text-5xl mt-36 font-bold" >
                          MY COLLECTIONS
          </p>
        </div>
        <div id="all" className=" ml-8 grid grid-cols-4 gap-4 content-center">
          {pn.map((a: any) => (
                <img
                key={a.image}
                  src={a.image}
                  alt=""
                  className=" w-60 h-60 object-cover rounded-3xl items-center"
                />
          ))}
        </div>
      </div>
       
      </div>
    );
}
