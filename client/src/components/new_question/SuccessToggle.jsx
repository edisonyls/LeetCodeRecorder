import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useSpring, animated } from "react-spring";
import { WhiteBackgroundButton } from "../generic/GenericButton";

const SuccessAnimationToggle = ({ onChange }) => {
  const [visibility, setVisibility] = useState("hidden"); // 'hidden', 'fadeIn', or 'fadeOut'
  const [selected, setSelected] = useState(null);

  const messageAnimation = useSpring({
    opacity: visibility === "fadeIn" ? 1 : 0,
    config: { duration: 1000 },
    onRest: () => {
      if (visibility === "fadeIn") {
        setTimeout(() => setVisibility("fadeOut"), 1000);
      }
      if (visibility === "fadeOut") {
        setVisibility("hidden");
      }
    },
  });

  const handleSuccessChange = (newSuccess) => {
    onChange(newSuccess);
    setSelected(newSuccess ? "yes" : "no");
    if (newSuccess) {
      makeCelebration();
      setVisibility("hidden");
    } else {
      setVisibility("fadeIn");
    }
  };

  const makeCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.8 },
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "inline-block", margin: "0 10px" }}>
        <WhiteBackgroundButton
          onClick={() => handleSuccessChange(true)}
          buttonText="Yes"
          selected={selected === "yes"}
        />
      </div>
      <div style={{ display: "inline-block", margin: "0 10px" }}>
        <WhiteBackgroundButton
          onClick={() => handleSuccessChange(false)}
          buttonText="No"
          selected={selected === "no"}
        />
      </div>
      {visibility !== "hidden" && (
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
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "20px",
            width: "100px",
            height: "100px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div style={{ fontSize: "4rem" }}>😢</div>
          <div style={{ color: "white" }}>Try Better !</div>
        </animated.div>
      )}
    </div>
  );
};

export default SuccessAnimationToggle;
