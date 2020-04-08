import React from "react";
import FileManager from "../../components/FileManager";
import { PUBLIC_PATH } from "../../config";
export default function () {
  return (
    <FileManager
      onSelectFile={(file) => {
        function getUrlParam(paramName) {
          const reParam = new RegExp(
            "(?:[?&]|&)" + paramName + "=([^&]+)",
            "i"
          );
          const match = window.location.search.match(reParam);
          return match && match.length > 1 ? match[1] : null;
        }
        try {
          const funcNum = getUrlParam("CKEditorFuncNum");
          const fileUrl = PUBLIC_PATH(file);
          window.opener.CKEDITOR.tools.callFunction(funcNum, fileUrl);
          window.close();
        } catch (e) {
          alert(`Beklenmedik bir hata meydana geldi.\n${e}`);
        }

        //  }
      }}
    />
  );
}
