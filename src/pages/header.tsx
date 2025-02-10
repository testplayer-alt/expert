import logo from "@/images/ChatGPT_logo.png"
import Image from "next/image"
export default function Header() {
    return (<>
        <div className=" fixed grid grid-cols-10 bg-[#242424]">
            <div className=" col-span-3" />
            <div className=" col-span-4 flex">
                <div className=" text-[40px] font-bold m-auto mr-2 ml-40">偽ChatGPT</div>
                <Image alt="logo" src={logo} className=" w-[8%] my-5"></Image>
            </div>
        </div>
    </>)
}