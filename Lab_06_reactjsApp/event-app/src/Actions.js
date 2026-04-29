import React, { useState } from "react";

function Actions() {
  const [message, setMessage] = useState("");
  const [bgColor, setBgColor] = useState("white");
  const [textColor, setTextColor] = useState("black");

  return (
    <div style={{ backgroundColor: bgColor, padding: "20px" }}>
      <h2 style={{ color: textColor }}>Event App</h2>

      <button onClick={() => setMessage("Hello! 🎉")}>
        Show Message
      </button>

      <button onClick={() => setBgColor("lightblue")}>
        Change Background
      </button>

      <button onClick={() => alert("Alert triggered!")}>
        Show Alert
      </button>

      <p>{message}</p>

      <h3
        onMouseOver={() => setTextColor("red")}
        onMouseOut={() => setTextColor("black")}
      >
        Hover over me!
      </h3>
    </div>
  );
}

export default Actions;