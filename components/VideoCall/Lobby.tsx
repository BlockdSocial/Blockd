import React, { useState, useEffect, useRef } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import { fetchAuthUser } from "../../stores/authUser/AuthUserActions";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { fetchUser } from "../../stores/user/UserActions";

import { chatApi } from "../../api";

function Lobby() {
  const dispatch = useAppDispatch();
  const [call, setCall] = useState<string | undefined | string[]>();

  const { authUser } = useAppSelector((state) => state.authUserReducer);
  useEffect(() => {
    dispatch(fetchAuthUser());
  }, []);




  const authToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("token") as any)
      : "";

  return (
    <div className="relative min-h-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 pb-14">
      <main id="lobby-container">
        <div id="user-container">
          <div id="user__container__header">
            <p>User Details</p>
          </div>

          <div id="user__content__wrapper">
            <p id="user-name">{'name'}</p>
            <p id="user-email"></p>
          </div>
        </div>
      </main>
    </div>
  ); 
}
export default Lobby;
