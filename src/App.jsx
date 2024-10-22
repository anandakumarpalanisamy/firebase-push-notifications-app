import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Message from "./Message";

const { VITE_APP_VAPID_KEY } = import.meta.env;

function App() {
  const requestPermission = async () => {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
      });

      //We can send token to server
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  onMessage(messaging, (payload) => {
    console.log(payload);
    toast(<Message notification={payload.notification} />);
  });

  return (
    <>
      <div>
        <h1>Firebase Push Notifications - Demo</h1>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
