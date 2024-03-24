// ContentDisplay.js
import React from "react";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import CodeSnippet from "../CodeSnippet";

const ContentDisplay = ({
  selectedSubStructure,
  dataStructure,
  selectedStructure,
}) => {
  return (
    <Box
      sx={{
        bgcolor: grey[800],
        color: grey[50],
        p: 2,
        borderRadius: 1,
        minHeight: 300,
        overflow: "auto",
      }}
    >
      {selectedSubStructure ? (
        <>
          <Typography variant="h5" sx={{ color: grey[400], mb: 2 }}>
            {selectedSubStructure}
          </Typography>
          {dataStructure
            .find((structure) => structure.name === selectedStructure)
            ?.subStructures.find((sub) => sub.name === selectedSubStructure)
            ?.contents.map((content, index) => {
              switch (content.type) {
                case "TEXT":
                  return (
                    <Typography key={index} sx={{ color: grey[400] }}>
                      {content.text}
                    </Typography>
                  );
                case "IMAGE_ID":
                  return (
                    <img
                      key={content.id}
                      src={`/path/to/image/${content.imageId}`}
                      alt="Sub-structure detail"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  );
                case "CODE_SNIPPET":
                  return <CodeSnippet key={index} code={content.text} />;
                default:
                  return null; // Handle unexpected content types gracefully
              }
            }) || (
            <Typography sx={{ color: grey[400] }}>
              No additional information available.
            </Typography>
          )}
        </>
      ) : (
        <Typography variant="h6" sx={{ color: grey[400] }}>
          Please select a sub-structure to see its details.
        </Typography>
      )}
    </Box>
  );
};

export default ContentDisplay;
