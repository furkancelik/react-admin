import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileManager from "./index";
import { PUBLIC_PATH } from "../../config";
import { FormControl, InputGroup, Image, Modal, Button } from "react-bootstrap";

export default function FileManagerForm({
  as = "image", //input
  value = "",
  inputProps = {},
  onSelectFile = null,
  previewImage = { width: 200, height: 200 },
}) {
  const [lgShow, setLgShow] = useState(false);
  console.log("value:", value);

  function renderImage() {
    return (
      <div
        className={"file-manager-form-preview"}
        style={{
          width: previewImage.width,
          height: value === "" ? previewImage.height : "auto",
        }}>
        <div className={"file-manager-form-toolbar"}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setLgShow(true);
            }}
            size={"sm"}
            variant={"primary"}
            className={"mr-2"}>
            <FontAwesomeIcon icon={["fas", "pencil-alt"]}></FontAwesomeIcon>
          </Button>

          <Button
            onClick={(e) => {
              e.preventDefault();
              onSelectFile("");
            }}
            size={"sm"}
            variant={"danger"}
            className={"ml-2"}>
            <FontAwesomeIcon icon={["fas", "trash-alt"]}></FontAwesomeIcon>
          </Button>
        </div>
        {value === "" ? (
          <FontAwesomeIcon icon={["fas", "image"]} />
        ) : (
          <Image src={PUBLIC_PATH(value)} fluid />
        )}
      </div>
    );
  }

  function renderInput() {
    return (
      <InputGroup>
        <FormControl
          {...inputProps}
          onClick={(e) => {
            e.preventDefault();
            setLgShow(true);
          }}
          readOnly
          type="text"
          value={value}
          onChange={() => {}}
        />
        <InputGroup.Append>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              setLgShow(true);
            }}>
            <FontAwesomeIcon icon={["fas", "pencil-alt"]}></FontAwesomeIcon>
          </Button>
          <Button
            variant="danger"
            onClick={(e) => {
              e.preventDefault();
              onSelectFile("");
            }}>
            <FontAwesomeIcon icon={["fas", "trash-alt"]}></FontAwesomeIcon>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }

  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Dosya Yöneticisi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FileManager
            onSelectFile={onSelectFile}
            selectCallbackFnc={() => {
              setLgShow(false);
            }}
          />
        </Modal.Body>
      </Modal>

      {as === "image" ? renderImage() : renderInput()}
    </>
  );
}
