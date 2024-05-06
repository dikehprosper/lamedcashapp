import { VscDebugDisconnect } from "react-icons/vsc";
export default function Disconnected() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
         <VscDebugDisconnect color='white !important' fontSize='58px' />
      <h2>
        {" "}
        oops! Your
        are offline
      </h2>
      <div>Check your network connection</div>
    </div>
  );
}
