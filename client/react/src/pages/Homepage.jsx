import HomepagePost from "../components/HomepagePosts";
import Navbar from "../components/Navbar";

export default function Homepage(){
    return (
      <div className="h-screen w-screen flex bg-slate-500">
        <Navbar />
        <div>
          <HomepagePost />
        </div>
      </div>
    );
};