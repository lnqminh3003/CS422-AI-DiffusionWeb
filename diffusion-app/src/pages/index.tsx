import React, { useState } from "react"
import Head from "next/head";
import Image from "next/image";

const sleep = (ms:any) => new Promise((r) => setTimeout(r, ms));

export default function Home() {

  const[prediction,setPrediction] =useState<any[]>([]);
  const[error, setError] = useState(null)


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
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
     <main className="flex w-full flex-col justify-center px-20 text-center">
        <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col items-start">
                <label htmlFor="prompt ">Prompt</label>
                <textarea name="prompt" className="border border-gray-600 w-full rounded-lg caret-black outline-none"></textarea>
            </div>

            <div className="flex flex-col items-start">
                <label htmlFor="seed">Seed</label>
                <input name="seed" type="number" className="border border-gray-600 rounded-lg p-2 outline-none" />
            </div>

            <div className="flex flex-col items-start">
                <label htmlFor="guidanceScale">Guidance Scale</label>
                <input name="guidanceScale" type="number" className="border border-gray-600  rounded-lg p-2 outline-none" />
            </div>

            <button className="bg-blue-500 text-white rounded-lg p-2">Generate</button>
        </form>

        {prediction && (
          <div className="mt-5">
            {prediction.output && (
              <Image src={prediction.output[0]} alt="a" sizes="100vw" width={512} height={512}/>
            )}
            <p className="">Status: {prediction.status}</p>
          </div>
        )}
     </main>
    </div>
  );
}