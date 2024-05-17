import React from "react";
import { Box, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";
import dayjs from "dayjs";

const Welcome = ({ user }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    marginTop: "5rem",
    delay: 500,
  });

  // Calculate the number of days since the user joined
  const today = dayjs();
  const userCreatedAt = user?.createdAt ? dayjs(user.createdAt) : null;
  const daysWithUs = userCreatedAt ? today.diff(userCreatedAt, "day") : 0;

  // Animated number for daysWithUs
  const daysWithUsProps = useSpring({
    number: daysWithUs,
    from: { number: 0 },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: -5,
      }}
    >
      <animated.div style={props}>
        <Typography
          variant="h4"
          sx={{
            marginBottom: 1,
            color: "#00FF00",
            textShadow: "0 0 8px #00FF00",
          }}
        >
          Welcome, {user?.firstName} {user?.lastName}!
        </Typography>
        {userCreatedAt && (
          <Typography variant="body1" sx={{ color: "cyan" }}>
            You have been with us for{" "}
            <animated.span
              style={{
                padding: "2px 5px", // Adds space inside the span
                borderRadius: "5px", // Rounded corners
                backgroundColor: "limegreen", // White background
                color: "black",
                display: "inline-block", // Ensures padding and radius are applied
              }}
            >
              {daysWithUsProps.number.to((n) => Math.floor(n))}
            </animated.span>{" "}
            days.
          </Typography>
        )}
      </animated.div>
    </Box>
  );
};

export default Welcome;
