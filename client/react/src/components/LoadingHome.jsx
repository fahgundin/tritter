import { User } from "lucide-react";

function LoadingHome() {
  return (
    <div className="h-screen w-screen flex flex-col bg-slate-500">
      <div className="flex flex-col min-h-screen flex-1 pt-8 animate-pulse space-y-4 overflow-y-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-start h-fit w-[700px] border-2 border-slate-400 rounded-3xl p-4"
          >
            <div className="flex items-center mb-4">
              <User
                className="h-12 w-12 rounded-full object-cover border-2 pr-2"
                size={48}
              />
              <div
                className="bg-gray-400 ml-2 h-[20px] w-[100px] rounded-2xl"
                alt="Username pulse"
              ></div>
            </div>
            <div
              className="bg-gray-400 h-[15px] w-[400px] rounded-2xl mb-2"
              alt="PostContent line 1"
            ></div>
            <div
              className="bg-gray-400 h-[15px] w-[300px] rounded-2xl"
              alt="PostContent line 2"
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadingHome;
