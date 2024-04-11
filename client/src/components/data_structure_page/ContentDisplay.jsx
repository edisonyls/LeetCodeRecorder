import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { GreyBackgroundButton } from "../generic/GenericButton";
import { axiosInstance } from "../../config/axiosConfig";
import EditorWithMenuBar from "./EditorWithMenuBar";

const fetchImage = async (imageId, subStructureId) => {
  try {
    const response = await axiosInstance.get(
      `sub-structure/image/${subStructureId}/${imageId}`,
      { responseType: "blob" }
    );
    return URL.createObjectURL(response.data);
  } catch (err) {
    console.error("Failed to fetch image", err);
    return "";
  }
};

const jsonToHtml = async (node, subStructureId) => {
  if (!node || typeof node !== "object" || !node.type) {
    return "";
  }

  switch (node.type) {
    case "doc":
      const docContent = await Promise.all(
        node.content.map((contentNode) =>
          jsonToHtml(contentNode, subStructureId)
        )
      );
      return docContent.join("");
    case "paragraph":
      const paragraphContent = await Promise.all(
        node.content.map((contentNode) =>
          jsonToHtml(contentNode, subStructureId)
        )
      );
      return `<p>${paragraphContent.join("")}</p>`;
    case "heading":
      const headingContent = await Promise.all(
        node.content.map((contentNode) =>
          jsonToHtml(contentNode, subStructureId)
        )
      );
      return `<h${node.attrs.level}>${headingContent.join("")}</h${
        node.attrs.level
      }>`;

    case "bulletList":
      const bulletListItems = await Promise.all(
        node.content.map((item) => jsonToHtml(item, subStructureId))
      );
      return `<ul>${bulletListItems.join("")}</ul>`;

    case "orderedList":
      const orderedListItems = await Promise.all(
        node.content.map((item) => jsonToHtml(item, subStructureId))
      );
      return `<ol>${orderedListItems.join("")}</ol>`;

    case "listItem":
      const listItemContent = await Promise.all(
        node.content.map((contentNode) =>
          jsonToHtml(contentNode, subStructureId)
        )
      );
      return `<li>${listItemContent.join("")}</li>`;

    case "blockquote":
      const blockquoteContent = await Promise.all(
        node.content.map((contentNode) =>
          jsonToHtml(contentNode, subStructureId)
        )
      );
      return `<blockquote style="color: #fafafa; border-left: 4px solid #ccc; padding-left: 16px; margin-left: 0; font-style: italic;">${blockquoteContent.join(
        ""
      )}</blockquote>`;

    case "codeBlock":
      const codeBlockContent = node.content
        ? await Promise.all(
            node.content.map((contentNode) =>
              jsonToHtml(contentNode, subStructureId)
            )
          )
        : [node.text || ""];
      return `<pre style="background-color: black; color: #fafafa; padding: 16px; border-radius: 8px; font-family: 'Jet Brain', monospace;"><code>${codeBlockContent.join(
        ""
      )}</code></pre>`;

    case "horizontalRule":
      return `<hr style="border: 0; height: 2px; background-color: #fafafa;" />`;

    case "text":
      let text = node.text;
      if (node.marks) {
        node.marks.forEach((mark) => {
          switch (mark.type) {
            case "bold":
              text = `<strong>${text}</strong>`;
              break;
            case "italic":
              text = `<em>${text}</em>`;
              break;
            case "strike":
              text = `<strike>${text}</strike>`;
              break;
            case "code":
              text = `<code style="background-color: #212121; color: white; padding: 2px 4px; border-radius: 4px; font-family: 'Jet Brain', monospace; font-size: 0.85em;">${text}</code>`;
              break;
            default:
              break;
          }
        });
      }
      return text;
    case "image":
      const imageSrc = await fetchImage(node.attrs.src, subStructureId);
      return `<img src="${imageSrc}" alt="image" title="image" style="width: 100%; max-height: 300px; object-fit: contain;"/>`;
    default:
      return "";
  }
};

const ContentDisplay = ({
  selectedStructure,
  selectedSubStructure,
  addClicked,
  setAddClicked,
  content,
}) => {
  const [safeHtml, setSafeHtml] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedSubStructure) return;
    setLoading(true);
    (async () => {
      try {
        const parsedContent = JSON.parse(content);
        const generatedHtml = await jsonToHtml(
          parsedContent,
          selectedSubStructure.id
        );
        setSafeHtml(generatedHtml);
      } catch (error) {
        console.error("Failed to process content", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [content, selectedSubStructure, addClicked]);

  if (!selectedStructure) {
    return <NoSelectionMessage message="Please select a data structure." />;
  } else if (!selectedSubStructure) {
    return <NoSelectionMessage message="Please select a sub-structure." />;
  } else if (loading) {
    return <LoadingState name={selectedSubStructure?.name} />;
  } else if (addClicked) {
    return (
      <EditorArea
        onClose={() => setAddClicked(false)}
        selectedSubStructure={selectedSubStructure}
        setAddClicked={setAddClicked}
        selectedStructureId={selectedStructure.id}
        safeHtml={safeHtml}
        content={content}
      />
    );
  } else if (selectedSubStructure.content !== null) {
    return (
      <ContentArea
        safeHtml={safeHtml}
        name={selectedSubStructure?.name}
        setAddClicked={setAddClicked}
      />
    );
  } else {
    return (
      <NoContentMessage
        setAddClicked={setAddClicked}
        name={selectedSubStructure?.name}
      />
    );
  }
};

const NoSelectionMessage = ({ message }) => (
  <Box
    sx={{
      overflowY: "auto",
    }}
  >
    <Typography
      variant="h6"
      sx={{
        color: grey[400],
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {message}
    </Typography>
  </Box>
);

const LoadingState = ({ name }) => (
  <Box>
    <Typography
      variant="h5"
      sx={{
        color: grey[50],
        width: "100%",
        textAlign: "center",
        mb: 4,
      }}
    >
      {name}
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 200,
        width: "100%",
      }}
    >
      <CircularProgress sx={{ color: grey[50] }} />
      <Typography sx={{ color: grey[50], mt: 2 }}>
        Fetching content...
      </Typography>
    </Box>
  </Box>
);

const EditorArea = ({
  onClose,
  selectedSubStructure,
  setAddClicked,
  selectedStructureId,
  safeHtml,
  content,
}) => (
  <Box>
    <Typography
      variant="h5"
      sx={{
        color: grey[50],
        width: "100%",
        textAlign: "center",
        mb: 4,
      }}
    >
      {selectedSubStructure.name}
    </Typography>
    <Box sx={{ flexGrow: 1, overflow: "auto", marginTop: -3 }}>
      <EditorWithMenuBar
        onClose={onClose}
        selectedSubStructure={selectedSubStructure}
        setAddClicked={setAddClicked}
        selectedStructureId={selectedStructureId}
        safeHtml={safeHtml}
        content={content}
      />
    </Box>
  </Box>
);

const ContentArea = ({ safeHtml, name, setAddClicked }) => (
  <Box>
    <Box
      sx={{
        display: "flex",
        alignItems: "center", // This centers the items vertically.
        justifyContent: "center", // Initially center everything
        width: "100%",
        mb: 4,
      }}
    >
      <Box sx={{ flexGrow: 1 }} />

      <Typography
        variant="h5"
        sx={{
          position: "absolute",
          color: grey[50],
          textAlign: "center",
        }}
      >
        {name}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <GreyBackgroundButton
        buttonText="Edit"
        onClick={() => setAddClicked(true)}
      />
    </Box>
    <div
      dangerouslySetInnerHTML={{ __html: safeHtml }}
      style={{ color: grey[50] }}
    />
  </Box>
);

const NoContentMessage = ({ setAddClicked, name }) => (
  <Box>
    <Typography
      variant="h5"
      sx={{
        color: grey[50],
        width: "100%",
        textAlign: "center",
        mb: 4,
      }}
    >
      {name}
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "auto",
        minHeight: 300,
        height: "100%",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ color: grey[400], mb: 2, textAlign: "center" }}
      >
        No additional information available.
      </Typography>
      <GreyBackgroundButton
        buttonText="Add Content"
        onClick={() => setAddClicked(true)}
      />
    </Box>
  </Box>
);

export default ContentDisplay;
