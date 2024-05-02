// SimpleForm.jsx
"use client";

// Import necessary functions from Firestore to interact with the database
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "./firestoreConfig"; // Import the database configuration

export default function SimpleForm() {
  // State variables to store user input for name and message
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Function to add a new message to the Firestore database
  const addMessage = async (messageData) => {
    // Add a document to the 'messages' collection and log the document ID
    const docRef = await addDoc(collection(db, "messages"), messageData);
    console.log("Document added with ID:", docRef.id);
  };

  // Handle the form submission
  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Log the current values of name and message, add them to Firestore, and log success
      console.log(name, message);
      await addMessage({ name, message });
      console.log("Message added successfully");
      // Clear the form fields after submission
      setMessage("");
      setName("");
    } catch (error) {
      // Log any errors that occur during the form submission process
      console.error("Error on submit:", error);
    }
  }

  // Render the form with input fields for name and message and a submit button
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          onChange={(e) => setName(e.target.value)} // Update state on input change
          type="text"
          name="name"
          id="name"
          value={name} // Display the current value of name
        />
      </label>

      <label>
        Message:
        <input
          onChange={(e) => setMessage(e.target.value)} // Update state on input change
          type="text"
          name="message"
          id="message"
          value={message} // Display the current value of message
        />
      </label>
      <button className="border m-5 rounded p-3">Add Message</button>
    </form>
  );
}
