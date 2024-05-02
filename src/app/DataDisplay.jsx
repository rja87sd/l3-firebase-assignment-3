// DataDisplay.jsx
// Credit to ChatGPT for assistance and code comments.

"use client";

// Import necessary Firestore functions
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firestoreConfig"; // Import the database configuration

export default function DataDisplay() {
  // State variable to store fetched messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Function to fetch messages from Firestore
    const fetchMessages = async () => {
      const querySnapshot = await getDocs(collection(db, "messages"));
      const messagesArray = [];

      // Loop through each document in the collection
      querySnapshot.forEach((doc) => {
        // Push each message's data along with its ID to an array
        messagesArray.push({ id: doc.id, ...doc.data() });
      });
      // Update the state with the fetched messages
      setMessages(messagesArray);
    };
    fetchMessages();
  }, []);

  // Render a list of messages
  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <h3>{message.name}</h3> - <p>{message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
