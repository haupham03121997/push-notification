/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDvZXZAzd9f0PCL6sNNmWYFp8XIVA951uQ",
  authDomain: "push-notifications-fbffe.firebaseapp.com",
  projectId: "push-notifications-fbffe",
  storageBucket: "push-notifications-fbffe.appspot.com",
  messagingSenderId: "938668870408",
  appId: "1:938668870408:web:8261e4ee08adced41f7abd",
  measurementId: "G-GKLJ7Y752H",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
export const getTokenApp = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BF5hKLjkDsP-3cbdsInL-RAAmgbuKU53_flSt8lF23iNRAQxnGy_Q3BxP1JT4s0QvtKRYCXotAC5_Sq8zK1TsMA",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
