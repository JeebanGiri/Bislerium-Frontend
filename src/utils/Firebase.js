import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { saveNotificationToken } from "../constants/Api";
import { useState } from "react";

//--------GET TOKEN FROM LOCAL STORAGE---------
const jwt = localStorage.getItem("token");

// -------------Initialize Firebase----------------
const firebaseConfig = {
  apiKey: "AIzaSyA-DOii6Zph2AbSjMyRWlFYUtedO9ekKrM",
  authDomain: "bislerium-blogging-system.firebaseapp.com",
  projectId: "bislerium-blogging-system",
  storageBucket: "bislerium-blogging-system.appspot.com",
  messagingSenderId: "832861615599",
  appId: "1:832861615599:web:0532cad41f9820f792721a",
  measurementId: "G-SC9K3CPJG9",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
const setupNotifications = async (message) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted" && jwt) {
      console.log("Notification permission granted.");

      // Get the FCM token
      console.log(message, "Message");
      const token = await getToken(messaging);
      const data = { Token: token, device_type: "WEB" };
      saveNotificationToken(data, jwt)
        .then((res) => console.log(res.message))
        .catch((err) => console.log(err.response));
      console.log("FCM Token:", token);
    } else {
      console.log("Notification permission denied.");
    }
  } catch (error) {
    console.log(error);
  }
};
export { messaging, setupNotifications };
