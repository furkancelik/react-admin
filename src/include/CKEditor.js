import React, { useState, useEffect } from "react";
import CKEditor from "ckeditor4-react";
import { FILE_MANAGER_PATH, ROUTE_BASENAME } from "../config";

// CKEditor.editorUrl = `/ckeditor/ckeditor.js`;

export default function ({ value, onChange }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, [value]);

  return (
    show && (
      <CKEditor
        config={{
          filebrowserBrowseUrl: `${ROUTE_BASENAME}${FILE_MANAGER_PATH}`,
          filebrowserUploadUrl: `${ROUTE_BASENAME}${FILE_MANAGER_PATH}?type=Files`,
        }}
        data={value}
        onChange={(e) => onChange(e.editor.getData())}
      />
    )
  );
}
