import Image from "next/image";
import Responsive from "@/components/Responsive";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div className="w-full bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white min-h-screen">
      <Main/>
      {/* <Responsive/> */}
      {/* <footer className="text-center bg-amber-100 text-gray-500 text-sm mt-8">
        <p>
          Created with ❤️ by Lipika Aggarwal
        </p>
      </footer> */}
    </div>
  );
}