import Navbar from "./Navbar";

function LoadingNotifications() {
    return (
      <div className="h-screen w-screen flex bg-slate-500">
        <Navbar />
        <div className="animate-pulse p-6">
          <div className="h-[60px] w-[600px] border-2 border-slate-400 border-2xl rounded-2xl flex items-center">
            <div className="ml-2 rounded-3xl bg-gray-400 h-[15px] w-[500px]"></div>
          </div>
        </div>
      </div>
    );
}

export default LoadingNotifications;