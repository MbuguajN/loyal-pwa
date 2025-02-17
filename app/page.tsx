//import Image from "next/image";

export default function Home() {
  return (
    <html>
    <div className="min-h-screen flex items-center justify-center">

    <div className="bg-white p-20 rounded-lg w-full max-w-md">
      
      <div className="flex justify-center mb-6">
        <img src="./icons/icon-512x512.png" alt="Logo" className="w-24 h-24"></img>
      </div>

      <div className="mb-4">
        <label  className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label  className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

     

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </button>

      <div className="w-full py-2 px-3 ">
        <p className="font-light text-base">Dont have and account ? <a className="text-blue-600" href="#">click</a> </p>
      </div>

    </div>
  </div>
    </html>
  );
}
