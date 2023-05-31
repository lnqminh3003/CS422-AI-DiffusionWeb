import Image from "next/image";
import minh from"../../public/IMG_9143.jpg"
import bao from "../../public/350368780_170673612383188_3591385485301331107_n.jpg"
import tam from "../../public/350744345_960144451672047_4951077858065318441_n.jpg"
import luong from "../../public/326725998_1588728878294566_1715138173458336479_n.jpg"

export default function MyTeam() {
  return (
    <div   className="w-full min-h-screen bg-cover bg-center pb-20 bg-no-repeat bg-mybg">
        <div className=" hidden md:flex flex-col justify-evenly h-screen">
                <div className = "flex flex-col pt-36 items-center">
                    <div className ="flex flex-row space-x-2 mb-4">
                        <img src="https://arbmarvel.ai/icons/ic-collection.svg"></img>
                        <p className="text-white 2xl:text-lg md:text-base font-semibold">Stable Diffusion</p>
                    </div>
                    <p className="text-textVang mb-8 text-6xl font-bold" >
                        WELCOME TO MY TEAM CS422
                    </p>
                    <p className="text-[color:white] text-base mr-5 mb-8 " >
                        This is our project about AI Stable Diffusion using Replicate
                    </p>
                </div>        
                <div className="flex flex-row justify-between mx-20  ">
                        <div className="flex flex-col items-center">
                            <div className="text-textVang font-bold text-lg">Vuong Huy Hoang Luong</div>
                            <div className="text-textVang mb-8 text-base">20125101</div>
                            <Image className="w-64 h-96 rounded-xl border-4 border-yellow-300" src={luong} alt={'aaa'} />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-textVang font-bold text-lg">Le Nguyen Quang Minh</div>
                            <div className="text-textVang mb-8 text-base">20125038</div>
                            <Image className="w-64 h-96 rounded-xl border-4 border-yellow-300" src={minh} alt={'aaa'} />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-textVang font-bold text-lg">Bui Duy Bao</div>
                            <div className="text-textVang mb-8 text-base">20125126</div>
                            <Image className="w-64 h-72 rounded-xl border-4 border-yellow-300" src={bao} alt={'aaa'} />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-textVang font-bold text-lg">Tran Nguyen Dang Tam</div>
                            <div className="text-textVang mb-8 text-base">20125051</div>
                            <Image className="w-64 h-96 rounded-xl border-4 border-yellow-300" src={tam} alt={'aaa'} />
                        </div>
                       
                    </div>
            </div>
    </div>
  );
}
