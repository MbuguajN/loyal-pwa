//import Image from "next/image";

export default function Home() {
  return (
    <html>
    <form action="" className="">
    <div className="relative text-gray-500 focus-within:text-gray-900 mb-8">
    <div className="absolute inset-y-0 left-0 flex items-center px-3 rounded-l-lg border-gray-300 pointer-events-none bg-gray-200">
     <svg className="stroke-gray-500" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M3 12C3 8.22876 3 6.34315 4.17157 5.17157C5.34315 4 7.22876 4 11 4H13C16.7712 4 18.6569 4 19.8284 5.17157C21 6.34315 21 8.22876 21 12C21 15.7712 21 17.6569 19.8284 18.8284C18.6569 20 16.7712 20 13 20H11C7.22876 20 5.34315 20 4.17157 18.8284C3 17.6569 3 15.7712 3 12Z" stroke="currentColor" stroke-width="1.6" className="my-path"></path>
       <path d="M3.54883 6.73307L7.76733 9.36198C9.82587 10.6448 10.8551 11.2863 11.9998 11.2861C13.1445 11.2859 14.1736 10.6441 16.2317 9.36063L20.461 6.72314" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" className="my-path"></path>
     </svg>
    </div>
    <input type="text" id="default-search" className="block w-full h-11 pr-5 pl-14 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none" placeholder="Enter Email"></input>
    </div>
    <div className="relative text-gray-500 focus-within:text-gray-900 mb-8">
    <div className="absolute inset-y-0 left-0 flex items-center px-3 rounded-l-lg border-gray-300 border-l pointer-events-none bg-gray-200">
     <svg className="stroke-gray-500" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="1.6" className="my-path"></path>
       <path d="M11.9998 14C9.15153 14 6.65091 15.3024 5.23341 17.2638C4.48341 18.3016 4.10841 18.8204 4.6654 19.9102C5.2224 21 6.1482 21 7.99981 21H15.9998C17.8514 21 18.7772 21 19.3342 19.9102C19.8912 18.8204 19.5162 18.3016 18.7662 17.2638C17.3487 15.3024 14.8481 14 11.9998 14Z" stroke="currentColor" stroke-width="1.6" className="my-path"></path>
     </svg>
    </div>
    <input type="text" id="default-search" className="block w-full h-11 pr-5 pl-14 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none" placeholder="Enter Name"></input>
    </div>
    <div className="relative text-gray-500 focus-within:text-gray-900 mb-8">
    <div className="absolute inset-y-0 left-0 flex items-center px-3 rounded-l-lg border-gray-300 border-l pointer-events-none bg-gray-200">
     <svg className="stroke-gray-500" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M16.5 9C16.5 9.82843 15.8284 10.5 15 10.5C14.1716 10.5 13.5 9.82843 13.5 9C13.5 8.17157 14.1716 7.5 15 7.5C15.8284 7.5 16.5 8.17157 16.5 9Z" stroke="currentColor" stroke-width="1.6" className="my-path"></path>
       <path d="M9 16.5005L10.5 18.0003" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" className="my-path"></path>
       <path d="M14.6776 15.6C18.1694 15.6 21 12.7794 21 9.3C21 5.82061 18.1694 3 14.6776 3C11.1858 3 8.35518 5.82061 8.35518 9.3C8.35518 9.7716 8.35518 10.0074 8.30595 10.1584C8.28678 10.2173 8.27393 10.2482 8.2458 10.3033C8.17356 10.4448 8.04222 10.5757 7.77953 10.8374L3.5883 15.0138C3.29805 15.303 3.15292 15.4476 3.07646 15.6318C3 15.8159 3 16.0208 3 16.4305V19C3 19.9428 3 20.4142 3.29289 20.7071C3.58579 21 4.05719 21 5 21H7.52195C7.93301 21 8.13854 21 8.32314 20.9231C8.50774 20.8462 8.65247 20.7003 8.94195 20.4084L13.1362 16.1796C13.399 15.9147 13.5304 15.7822 13.6729 15.7094C13.7272 15.6817 13.7578 15.6689 13.8157 15.6499C13.9677 15.6 14.2043 15.6 14.6776 15.6Z" stroke="currentColor" stroke-width="1.6" className="my-path"></path>
     </svg>
    </div>
    <input type="text" id="default-search" className="block w-full h-11 pr-5 pl-14 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none" placeholder="Enter Password"></input>
    </div>
    <div className="flex items-center">
    <button className="w-32 h-12 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6">Submit</button>
    </div>
    </form>
    </html>
  );
}
