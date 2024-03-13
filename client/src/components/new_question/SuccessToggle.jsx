import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useSpring, animated } from "react-spring";

const SuccessAnimationToggle = ({ onChange }) => {
  const [showMessage, setShowMessage] = useState(false);

  // Animation for the sad message
  const messageAnimation = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 2000 },
    reset: showMessage,
    reverse: showMessage,
    onRest: () => {
      if (showMessage) setTimeout(() => setShowMessage(false), 2000);
    },
  });

  // Function to trigger the celebration effect
  const makeCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleSuccessChange = (newSuccess) => {
    onChange(newSuccess);
    if (newSuccess) {
      makeCelebration();
    } else {
      setShowMessage(true);
    }
  };

  return (
    <div>
      <button onClick={() => handleSuccessChange(true)}>Yes</button>
      <button onClick={() => handleSuccessChange(false)}>No</button>
      {showMessage && (
        <animated.div
          style={{
            ...messageAnimation,
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div style={{ fontSize: "4rem" }}>😢</div>
          <div>It's okay, try again!</div>
        </animated.div>
      )}
    </div>
  );
};

export default SuccessAnimationToggle;
