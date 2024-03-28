import React, { useState } from "react";
import "./EditorWithMenuBar.css";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { WhiteBackgroundButtonWithInput } from "../generic/GenericButton";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
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
import { grey } from "@mui/material/colors";

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const logContent = () => {
    if (editor) {
      const htmlContent = editor.getHTML(); // Gets the current content as HTML
      const jsonContent = editor.getJSON(); // Gets the current content as JSON
      console.log(htmlContent); // Log the HTML content
      console.log(jsonContent); // Log the JSON content
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
    <>
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
          style={{ color: editor.isActive("codeBlock") ? grey[50] : grey[900] }}
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
    </>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Image,
];

const content = ``;

const EditorWithMenuBar = () => {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
    ></EditorProvider>
  );
};

export default EditorWithMenuBar;
