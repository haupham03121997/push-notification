/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDvZXZAzd9f0PCL6sNNmWYFp8XIVA951uQ",
  authDomain: "push-notifications-fbffe.firebaseapp.com",
  projectId: "push-notifications-fbffe",
  storageBucket: "push-notifications-fbffe.appspot.com",
  messagingSenderId: "938668870408",
  appId: "1:938668870408:web:8261e4ee08adced41f7abd",
  measurementId: "G-GKLJ7Y752H",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
