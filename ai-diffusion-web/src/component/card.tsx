import Link from "next/link";


function CardNFTCreated({ ig }: { ig: string }) {
  return (
      <div className="relative flex-wrap w-60 h-60 inline-block">
        <img
          src={ig}
          alt=""
          className=" w-60 h-60 object-cover rounded-3xl"
        />
      </div>
  );
}

export default CardNFTCreated;
