import Navigation from "./navigation";
import MyTeam from "./myTeam";

export default function HomePage() {
  // className="w-full min-h-screen bg-cover bg-center bg-no-repeat  bg-my_bg_image"
  return (
    <div className="w-full min-h-screen bg-[#18181b]">
      <Navigation />
      <MyTeam/>
    </div>
  );
}
