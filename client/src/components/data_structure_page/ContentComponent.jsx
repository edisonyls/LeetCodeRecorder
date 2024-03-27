import React from "react";
import { Typography, TextField, Box, Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import CodeSnippet from "../CodeSnippet";
import { GreyBackgroundButtonWithInput } from "../generic/GenericButton";

const ContentComponent = ({
  contentId,
  content,
  onContentChange,
  contentType,
  contentValue,
  addClicked,
  text,
  imageUrl,
  handleImageChange,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      {!addClicked ? (
        <>
          {content.type === "TEXT" && (
            <Typography sx={{ color: grey[400] }}>{content.text}</Typography>
          )}
          {content.type === "CODE_SNIPPET" && (
            <CodeSnippet code={content.text} />
          )}
          {content.type === "IMAGE_ID" && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={content.imageId}
                alt="Sub-structure detail"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
          )}
        </>
      ) : (
        <>
          {content.type === "TEXT" || content.type === "CODE_SNIPPET" ? (
            <TextField
              margin="normal"
              fullWidth
              label={contentType}
              name="text"
              multiline
              onChange={onContentChange}
              value={text}
            />
          ) : (
            <>
              {imageUrl ? (
                <Paper
                  elevation={0}
                  sx={{
                    width: "96%",
                    padding: 2,
                    background: grey[800],
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: "300px",
                      objectFit: "contain",
                    }}
                  />
                </Paper>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 1,
                    width: "100%",
                  }}
                >
                  <GreyBackgroundButtonWithInput
                    buttonText="Upload Image"
                    inputType="file"
                    inputId="fileInput"
                    inputOnChange={handleImageChange}
                  />
                </Box>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ContentComponent;
