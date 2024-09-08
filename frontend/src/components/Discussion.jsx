import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Replace with your server URL

const Discussion = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages (from other clients)
    socket.on("chatMessage", (msg) => {
      if (msg && msg.text && msg.senderId !== socket.id) {
        // Only append the message if it's not from the sender
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: msg.text, isSent: false, sender: msg.sender },
        ]);
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user.name;
    if (message.trim()) {
      const msg = {
        text: message,
        isSent: true,
        senderId: socket.id,
        sender: username,
      };

      // Append message locally immediately for the sender
      setMessages((prevMessages) => [...prevMessages, msg]);

      // Send the message to the server
      socket.emit("chatMessage", msg);

      // Clear the input field
      setMessage("");
    }
  };

  // Function to style the first word of the sender's name
  const getFirstWord = (name) => {
    return name.split(" ")[0];
  };

  return (
    <div className="h-full">
      <div className="h-full w-full sm:w-[80%] md:w-[70%] lg:w-[40%] text-white mx-auto bg-[#1c1a41] shadow-xl rounded-lg overflow-hidden my-4 p-2 md:p-4">
        <h2 className="text-2xl font-semibold mb-4">Discussion</h2>
        <div className="overflow-y-scroll mb-4 bg-[#697bc6] text-white p-4 rounded-lg flex flex-col">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col mb-4 p-3 rounded-lg max-w-[70%] ${
                msg.isSent
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-300 text-black self-start"
              }`}
            >
              {/* Sender's name */}
              <span className="text-sm font-bold mb-1">
                <span className="text-yellow-300">
                  {getFirstWord(msg.sender)}
                </span>
              </span>
              {/* Message content */}
              <div className="text-base">{msg.text}</div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex gap-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow px-3 py-2 bg-[#1e1e1e] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Discussion;
