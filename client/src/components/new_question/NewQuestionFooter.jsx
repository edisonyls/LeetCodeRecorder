import React from "react";
import { Box } from "@mui/material";
import { WhiteBackgroundButton } from "../generic/GenericButton";
import AddIcon from "@mui/icons-material/Add";

const NewQuestionFooter = ({ onClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5,
      }}
    >
      <WhiteBackgroundButton
        buttonText="New Solution"
        onClick={onClick}
        icon={<AddIcon />}
      />
      <WhiteBackgroundButton buttonText="Submit" type="submit" />
    </Box>
  );
};

export default NewQuestionFooter;
