
import { useAppSelector } from "../../stores/hooks";

  function Lobby() {
     
    const { authUser } = useAppSelector((state) => state.authUserReducer);
    const authToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("token") as any)
      : "";


    return (
      <div
      className="relative min-h-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 pb-14"
      
    >

    <main id="lobby-container">
        <div id="user-container">
            <div id="user__container__header">
                <p>User Details</p>
            </div>

            <div id="user__content__wrapper">
                <p id="user-name">{otherUserId}</p>
                <p id="user-email"></p>
                <button id="call-button">Call</button>
            </div>
        </div>
    </main>
      
      </div>
    );
  }
  export default Lobby;
  