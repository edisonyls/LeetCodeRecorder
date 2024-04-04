import React from "react";
import "./EditorWithMenuBar.css";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import MenuBar from "../MenuBar";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit,
  Image,
];

const content = ``;

const EditorWithMenuBar = ({
  onClose,
  selectedSubStructure,
  setAddClicked,
  selectedStructureId,
}) => {
  return (
    <EditorProvider
      slotBefore={
        <MenuBar
          onClose={onClose}
          selectedSubStructure={selectedSubStructure}
          setAddClicked={setAddClicked}
          selectedStructureId={selectedStructureId}
        />
      }
      extensions={extensions}
      content={content}
    ></EditorProvider>
  );
};

export default EditorWithMenuBar;
