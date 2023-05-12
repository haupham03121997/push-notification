import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Button, Row, Col, Toast } from "react-bootstrap";
import { getToken, getTokenApp, onMessageListener } from "./firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "./firebase";

function App() {
  const [show, setShow] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  getTokenApp(setTokenFound);
  useEffect(() => {
    if (Notification.permission === "denied") {
      // window.alert("Bạn có muốn mở thông báo?");
      Notification.requestPermission();
    }
  }, []);
  // inside the jsx being returned:
  {
    isTokenFound &&
      //  Notification permission enabled 👍🏻
      console.log("isTokenFound");
  }
  {
    !isTokenFound && console.log("Not isTokenFound");
    //  Need notification permission ❗️
  }
  // (function requestPermission() {
  //   Notification.requestPermission().then((res) => {
  //     console.log(res);
  //   });
  // })();
  // function requestNotificationPermission() {
  //   if (!("Notification" in window)) {
  //     console.log("This browser does not support desktop notification");
  //     return;
  //   }

  //   Notification.requestPermission().then((permission) => {
  //     if (permission === "granted") {
  //       console.log("Notification permission granted.");
  //     } else if (permission === "denied") {
  //       console.log("Notification permission denied.");
  //     } else if (permission === "default") {
  //       console.log("Notification permission dismissed.");
  //     }
  //   });
  // }
  // requestNotificationPermission();

  // (function notifyMe() {
  //   if (!("Notification" in window)) {
  //     // Check if the browser supports notifications
  //     alert("This browser does not support desktop notification");
  //   } else if (Notification.permission === "granted") {
  //     // Check whether notification permissions have already been granted;
  //     // if so, create a notification
  //     const notification = new Notification("Hi there!");
  //     // …
  //   } else if (Notification.permission !== "denied") {
  //     // We need to ask the user for permission
  //     Notification.requestPermission().then((permission) => {
  //       // If the user accepts, let's create a notification
  //       if (permission === "granted") {
  //         const notification = new Notification("Hi there!");
  //         // …
  //       }
  //     });
  //   }

  //   // At last, if the user has denied notifications, and you
  //   // want to be respectful there is no need to bother them anymore.
  // })();
  // Notification.requestPermission();
  onMessageListener()
    .then((payload) => {
      console.log({ payload });
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));
  if ("Notification" in window) {
    // code for requesting permission
    Notification.requestPermission().then((permission) => {
      if (Notification.permission === "granted") {
        const notification = new Notification("Title", {
          body: "Notification message",
        });
      }
    });
  }
  return (
    <div className="App">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        animation
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          minWidth: 200,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      <header className="App-header">
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
        <img src={logo} className="App-logo" alt="logo" />
        <Button onClick={() => setShow(true)}>Show Toast</Button>
      </header>
    </div>
  );
}

export default App;
