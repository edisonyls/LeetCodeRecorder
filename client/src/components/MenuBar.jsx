import React, { useState } from "react";
import "./data_structure_page/EditorWithMenuBar.css";
import { useCurrentEditor } from "@tiptap/react";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import CodeIcon from "@mui/icons-material/Code";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import ImageIcon from "@mui/icons-material/Image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";
import { WarningDialog } from "./data_structure_page/DataStructureDialogs";
import { ContentHooks } from "../hooks/ContentHooks";

const MenuBar = ({
  onClose,
  selectedSubStructure,
  setAddClicked,
  selectedStructureId,
}) => {
  const { handleSave, convertBlobUrlToFile, uploadImageToBackend } =
    ContentHooks();
  const { editor } = useCurrentEditor();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [contentUploading, setContentUploading] = useState(false);
  const [emptyContentOpen, setEmptyContentOpen] = useState(false);

  const open = Boolean(anchorEl);

  const UploadContent = async () => {
    if (editor && selectedSubStructure) {
      const contentJsonObject = editor.getJSON();
      // checking if user has entered anything
      const isEmpty = contentJsonObject.content.every((node) => {
        return (
          node.type === "paragraph" &&
          (!node.content || node.content.length === 0)
        );
      });
      if (isEmpty) {
        setEmptyContentOpen(true);
        return;
      } else {
        setImageUploading(true);
        for (const node of contentJsonObject.content) {
          if (node.type === "image") {
            const blobUrl = node.attrs.src;
            const imageFile = await convertBlobUrlToFile(blobUrl);
            const imageId = await uploadImageToBackend(
              imageFile,
              selectedSubStructure.name
            );
            //   // Replace the src with the new imageId or URL from the backend
            node.attrs.src = imageId;
          }
        }
        setImageUploading(false);
        setContentUploading(true);
        const stringContent = JSON.stringify(contentJsonObject);
        handleSave(selectedSubStructure.id, stringContent, selectedStructureId);
        setAddClicked(false);
      }
    }
  };

  if (!editor) {
    return null;
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (level) => {
    setAnchorEl(null);
    updateHeadingLevel(level);
  };

  const updateHeadingLevel = (level) => {
    const intLevel = parseInt(level, 10);
    if (intLevel) {
      editor.chain().focus().toggleHeading({ level: intLevel }).run();
    } else {
      editor.chain().focus().setParagraph().run();
    }
  };

  const getCurrentHeadingLevel = () => {
    for (let level = 1; level <= 6; level++) {
      if (editor.isActive("heading", { level })) {
        return level.toString();
      }
    }
    return "";
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      editor.chain().focus().setImage({ src: imageUrl }).run();
    } else {
      alert("Please select an image file.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {dialogOpen && (
        <WarningDialog
          dialogOpen={dialogOpen}
          title="Are you sure?"
          text="All your input will be lost."
          optionNumber={2}
          onClose={onClose}
          onCancel={() => setDialogOpen(false)}
        />
      )}
      {emptyContentOpen && (
        <WarningDialog
          dialogOpen={emptyContentOpen}
          title="Empty Content!"
          text="You have not yet entered anything in the editor."
          onClose={() => setEmptyContentOpen(false)}
        />
      )}
      <Box>
        <IconButton aria-label="heading-level" onClick={handleMenuClick}>
          <KeyboardArrowDownIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleMenuClose("")}
          sx={{
            padding: 0,
            "& .MuiDialog-paper": { bgcolor: grey[900], color: grey[50] },
          }}
        >
          {[
            "Normal Text",
            ...[1, 2, 3, 4, 5, 6].map((level) => `Heading ${level}`),
          ].map((option, index) => (
            <MenuItem
              key={option}
              selected={option === getCurrentHeadingLevel()}
              onClick={() => handleMenuClose(index.toString())}
              sx={{ color: grey[900] }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>

        <Tooltip title="Bold">
          <IconButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            style={{ color: editor.isActive("bold") ? grey[50] : grey[900] }}
          >
            <FormatBoldIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Italic">
          <IconButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            style={{ color: editor.isActive("italic") ? grey[50] : grey[900] }}
          >
            <FormatItalicIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Strike Through">
          <IconButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            style={{ color: editor.isActive("strike") ? grey[50] : grey[900] }}
          >
            <StrikethroughSIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Code">
          <IconButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            style={{ color: editor.isActive("code") ? grey[50] : grey[900] }}
          >
            <CodeIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Bullet List">
          <IconButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={!editor.can().chain().focus().toggleBulletList().run()}
            style={{
              color: editor.isActive("bulletList") ? grey[50] : grey[900],
            }}
          >
            <FormatListBulletedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Ordered List">
          <IconButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={!editor.can().chain().focus().toggleOrderedList().run()}
            style={{
              color: editor.isActive("orderedList") ? grey[50] : grey[900],
            }}
          >
            <FormatListNumberedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Code Block">
          <IconButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
            style={{
              color: editor.isActive("codeBlock") ? grey[50] : grey[900],
            }}
          >
            <CodeIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Blockquote">
          <IconButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            disabled={!editor.can().chain().focus().toggleBlockquote().run()}
            style={{
              color: editor.isActive("blockquote") ? grey[50] : grey[900],
            }}
          >
            <FormatQuoteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Horizontal Rule">
          <IconButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <HorizontalRuleIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Upload Image">
          <IconButton component="label">
            <ImageIcon />
            <input type="file" hidden onChange={handleImageUpload} />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        <Tooltip title="Cancel">
          <IconButton
            onClick={() => {
              setDialogOpen(true);
            }}
            style={{ color: grey[50] }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save">
          <IconButton onClick={UploadContent} style={{ color: grey[50] }}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default MenuBar;
