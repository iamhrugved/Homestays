import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { chatURL } from "../../../../utils/config";

const Chatbox = ({ handleClose }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (message.trim() === "") {
      return;
    }

    axios
      .post(`${chatURL}/chatbot`, { message })
      .then((response) => {
        // console.log(response.data.response);
        const responseData = response.data;

        setChatHistory((prevHistory) => [
          ...prevHistory,
          { message: message, sender: "user" },
          { message: responseData.response, sender: "bot" },
        ]);

        setMessage("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Scroll to the bottom of the chat history
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  return (
    <>
      <div
        style={{
          height: "300px",
          width: "300px",
          overflowY: "scroll",
          padding: "16px",
        }}
      >
        {chatHistory.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: item.sender === "user" ? "row-reverse" : "row",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  backgroundColor:
                    item.sender === "user" ? "#f0f0f0" : "#e0e0e0",
                  borderRadius: "8px",
                  padding: "8px",
                  wordWrap: "break-word",
                }}
              >
                {item.message}
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>
      <div style={{ display: "flex", marginTop: "16px" }}>
        <TextField
          id="outlined-basic"
          label="Message"
          variant="outlined"
          value={message}
          onChange={handleMessageChange}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          style={{ marginLeft: "16px" }}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default Chatbox;
