import React from "react";
import PropTypes from "prop-types";
import { HtmlEditor, MenuBar } from "@aeaton/react-prosemirror";
import { options, menu } from "@aeaton/react-prosemirror-config-default";
import "./editor.css";
const CustomEditor = ({ content, setContent }) => (
  <HtmlEditor
    options={options}
    value={content}
    onChange={(content) => {
      setContent(JSON.stringify(content, null, 2));
    }}
    render={({ editor, view }) => (
      <div style={{ margin: 5 }}>
        <MenuBar menu={menu} view={view} />
        {editor}
      </div>
    )}
  />
);

CustomEditor.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func,
};

export default CustomEditor;
