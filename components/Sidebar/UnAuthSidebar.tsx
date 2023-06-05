import React, { useState } from "react";
import SidebarRow from "./SidebarRow";
import {
  MicrophoneIcon,
  ComputerDesktopIcon,
  ChatBubbleBottomCenterTextIcon,
  UserIcon,
  HomeIcon,
  PlusCircleIcon,
  LightBulbIcon,
  FireIcon,
  ChatBubbleLeftIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

function UnAuthSidebar() {
  let location = useRouter();
  const [isOpen, setOpen] = useState(false);

  const router = useRouter();
  const { isRegistered } = router.query;

  const [showModal1, setShowModal1] = useState(true);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const [showModal7, setShowModal7] = useState(false);
  const [showModal8, setShowModal8] = useState(false);
  const [showModal9, setShowModal9] = useState(false);

  return (
    <div className="items-start justify-center lg:justify-start hidden md:flex md:col-span-2 px-2 scrollbar-hide overflow-scroll min-h-screen border-x dark:border-lightgray pb-14">
      <div className="relative flex flex-col items-start lg:p-2 mt-3 md:items-start w-fit">
        <div className="relative w-full">
          <Link id="dashboardLink" href="/auth/signup" className="active">
            <div
              className={`flex mt-1 max-w-fit items-start md:items-center md:justify-center space-x-2 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-lightgray group`}
            >
              <UserIcon className="h-6 w-6" />
              <p className={`text-base lg:text-xl cursor-pointer`}>Signup</p>
            </div>
          </Link>
        </div>
        {/* <Link href="#" className="opacity-60">
          <SidebarRow Icon={LockClosedIcon} title="Streams" active="" />
        </Link>
        <Link href="#" className="opacity-60">
          <SidebarRow Icon={LockClosedIcon} title="Podcasts" active="" />
        </Link> */}
      </div>
    </div>
  );
}

export default UnAuthSidebar;
