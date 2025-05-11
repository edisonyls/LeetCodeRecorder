import React from "react";
import "./EditorWithMenuBar.css";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import MenuBar from "../MenuBar";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit,
  Image,
];

const EditorWithMenuBar = ({
  onClose,
  selectedNode,
  setAddClicked,
  selectedStructureId,
  safeHtml,
  content,
}) => {
  return (
    <EditorProvider
      slotBefore={
        <MenuBar
          onClose={onClose}
          selectedNode={selectedNode}
          setAddClicked={setAddClicked}
          selectedStructureId={selectedStructureId}
          content={content}
        />
      }
      extensions={extensions}
      content={safeHtml}
    ></EditorProvider>
  );
};

export default EditorWithMenuBar;
