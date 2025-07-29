import HomepagePost from "../components/HomepagePosts";
import Navbar from "../components/Navbar";

export default function Homepage(){
    return (
      <div className="h-screen w-screen flex bg-slate-500">
        <Navbar />
        <div className="overflow-y-auto scroll-smooth transparent-scrollbar flex-1">
          <div className="flex flex-col items-start">
          <HomepagePost />
          </div>
        </div>
      </div>
    );
};