import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Spinner,
  Image,
  InputGroup,
  FormControl,
  Form,
  Container,
  Row,
  Button,
  Col,
} from "react-bootstrap";
import slug from "slug";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
import { FILE_MANAGER } from "../../store/Queries/FileManager";
import { PUBLIC_PATH } from "../../config";
import Loader from "../Loader/index";
function ToolBox({
  mainPath,
  setMainPath,
  refetch,
  removeItem,
  selectFiles,
  setSelectFiles,
  createFolder,
  searchText,
  rename,
  setSearchText,
}) {
  const file = useRef();

  const [searchShow, setSearchShow] = useState(false);
  const [createFolderShow, setCreateFolderShow] = useState(false);
  const [renameShow, setRenameShow] = useState(false);

  const [createFolderText, setCreateFolderText] = useState("");
  const [renameText, setRenameText] = useState("");

  useEffect(() => {
    if (searchShow === false) setSearchText("");
    if (createFolderShow === false) setCreateFolderText("");
  }, [searchShow, createFolderShow]);

  const [uploadFile, { data, loading, error }] = useMutation(
    FILE_MANAGER.uploadFile
  );

  return (
    <ul className={"file-maneger-toolbox "}>
      <li className={"d-none"}>
        <input
          ref={file}
          type="file"
          required
          multiple
          onChange={async ({ target: { validity, files } }) => {
            if (validity.valid) {
              try {
                await uploadFile({
                  variables: { files, path: mainPath },
                });
                await refetch();
                if (file && file.current) file.current.value = null;
              } catch (e) {
                alert(`Beklenmedik bir hata meydana geldi:\n${e}`);
              }
            }
          }}
        />
      </li>
      <li>
        <Button
          onClick={async (e) => {
            const pathAar = mainPath.split("/");
            pathAar.pop();
            const newPath = pathAar.join("/");
            setMainPath(newPath);
            await refetch();
          }}
          type="button"
          disabled={mainPath.split("/").length <= 2}>
          <FontAwesomeIcon icon={["fas", "level-up-alt"]} />
        </Button>
      </li>
      <li>
        <Button
          type="button"
          onClick={async (e) => {
            e.preventDefault();
            const x = await refetch();
            console.log(x);
          }}>
          <FontAwesomeIcon icon={["fas", "sync-alt"]} />
        </Button>
      </li>
      <li>
        <Button
          disabled={loading}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            file.current.click();
          }}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <FontAwesomeIcon icon={["fas", "file-upload"]} />
          )}
        </Button>
      </li>
      <li>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setCreateFolderShow(!createFolderShow);
          }}>
          <FontAwesomeIcon icon={["fas", "folder-plus"]} />
        </Button>
      </li>
      <li>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setSearchShow(!searchShow);
          }}>
          <FontAwesomeIcon icon={["fas", searchShow ? "times" : "search"]} />
        </Button>
      </li>
      {searchShow && (
        <li>
          <Form.Control
            autoFocus
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            type="text"
            placeholder="Dosya Ara"
          />
        </li>
      )}
      <li>
        <Button
          type="button"
          onClick={removeItem(selectFiles)}
          disabled={selectFiles.length < 1}>
          <FontAwesomeIcon icon={["fas", "trash-alt"]} />
        </Button>
      </li>

      {createFolderShow && (
        <li>
          <InputGroup>
            <InputGroup.Prepend>
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setCreateFolderShow(false);
                }}>
                <FontAwesomeIcon icon={["fas", "times"]} />
              </Button>
            </InputGroup.Prepend>
            <FormControl
              autoFocus
              onChange={(e) => {
                setCreateFolderText(
                  slug(e.target.value, {
                    replacement: "-",
                    remove: null,
                  })
                );
              }}
              value={createFolderText}
              placeholder="Yeni Klasör Adını Giriniz"
            />
            <InputGroup.Append>
              <Button
                type="button"
                onClick={createFolder(createFolderText, () => {
                  setCreateFolderText("");
                  setCreateFolderShow(false);
                })}>
                <FontAwesomeIcon icon={["fas", "plus"]} />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </li>
      )}

      {selectFiles.length === 1 && (
        <li>
          <Button
            type="button"
            onClick={() => {
              setRenameShow(!renameShow);
            }}>
            <FontAwesomeIcon icon={["fas", "edit"]} />
          </Button>
        </li>
      )}

      {renameShow && selectFiles.length === 1 && (
        <li>
          <InputGroup>
            <FormControl
              autoFocus
              onChange={(e) => {
                setRenameText(
                  slug(e.target.value, {
                    replacement: "-",
                    remove: null,
                  })
                );
              }}
              value={renameText}
              placeholder="Adını Değiştir"
            />
            <InputGroup.Append>
              <Button
                type="button"
                onClick={rename(renameText, async () => {
                  setRenameText("");
                  setRenameShow(false);
                  await refetch();
                  setSelectFiles([]);
                })}>
                <FontAwesomeIcon icon={["fas", "save"]} />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </li>
      )}

      {/* <li className={"ml-auto"}>
        <Button type="button">
          <FontAwesomeIcon icon={["fas", "cog"]} />
        </Button>
      </li> */}
    </ul>
  );
}

function Loading() {
  return (
    <Loader rowSize={3} height={220}>
      {Array(3)
        .fill(null)
        .map((v, i) => (
          <>
            <rect rx={5} ry={5} x={"1%"} y={210 * i} width="18%" height="200" />
            <rect
              rx={5}
              ry={5}
              x={"21%"}
              y={220 * i}
              width="18%"
              height="200"
            />
            <rect
              rx={5}
              ry={5}
              x={"41%"}
              y={220 * i}
              width="18%"
              height="200"
            />
            <rect
              rx={5}
              ry={5}
              x={"61%"}
              y={220 * i}
              width="18%"
              height="200"
            />
            <rect
              rx={5}
              ry={5}
              x={"81%"}
              y={220 * i}
              width="18%"
              height="200"
            />
          </>
        ))}
    </Loader>
  );
}

function Preview({ item }) {
  if (item.type === "directory") {
    return <FontAwesomeIcon icon={["fas", "folder"]} size={"7x"} />;
  } else {
    if (
      [
        "jpg",
        "gif",
        "png",
        "jpeg",
        "bmp",
        "ico",
        "webp",
        "tif",
        "tiff",
        "raw",
        "heif",
        "heic",
        "jp2",
        "j2k",
        "jpf",
        "jpx",
      ].indexOf(item.extname) >= 0
    ) {
      return (
        <Image
          fluid
          src={PUBLIC_PATH(item.path)}
          style={{ width: "100%", height: "100%" }}
        />
      );
    } else {
      return <FontAwesomeIcon icon={["fas", "file"]} size={"7x"} />;
    }
  }
}

function FolderBreadcrumbs({ path, setMainPath, refetch }) {
  return path
    .slice(2)
    .split("/")
    .map((v, i) => {
      return (
        <>
          {i > 0 ? " / " : ""}
          <a
            href={`#/${v}`}
            variant={"link"}
            onClick={async (e) => {
              e.preventDefault();
              console.log(path, v);
              var pathAar = path.slice(2).split("/");
              const pathIndex = pathAar.indexOf(v);
              const newPath = pathAar.slice(0, pathIndex + 1).join("/");
              setMainPath(`./${newPath}`);
              await refetch();
            }}>
            {v === "uploads" ? "DOSYALAR" : v}
          </a>
        </>
      );
    });
}

export default function FileManager({
  onSelectFile = null,
  selectCallbackFnc = null,
}) {
  const [mainPath, setMainPath] = useState(
    localStorage.getItem("PUBLIC_PATH") || "./uploads"
  );
  const [selectFiles, setSelectFiles] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { data, error, loading, refetch } = useQuery(FILE_MANAGER.allFiles, {
    variables: { path: mainPath },
    notifyOnNetworkStatusChange: true,
  });

  const [create, { loading: createFolderLoading }] = useMutation(
    FILE_MANAGER.createFolder,
    {
      refetchQueries: [
        { query: FILE_MANAGER.allFiles, variables: { path: mainPath } },
      ],
    }
  );

  const [rename] = useMutation(FILE_MANAGER.rename, {
    refetchQueries: [
      { query: FILE_MANAGER.allFiles, variables: { path: mainPath } },
    ],
  });

  const [remove, { loading: removeFileLoading }] = useMutation(
    FILE_MANAGER.remove,
    {
      refetchQueries: [
        {
          query: FILE_MANAGER.allFiles,
          variables: { path: mainPath },
        },
      ],
    }
  );

  useEffect(() => {
    localStorage.setItem("PUBLIC_PATH", mainPath);
    console.log(mainPath);
  }, [mainPath]);

  function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  }

  function removeItem(path) {
    return async (e) => {
      e.preventDefault();
      if (window.confirm("Silmek istediğinize eminmisniz?")) {
        try {
          const x = await remove({ variables: { path } });
          setSelectFiles([]);
          console.log("---::", x);
        } catch (e) {
          alert(`Beklenmedik bir hata meydana geldi;\n${e}`);
        }
      }
    };
  }

  function createFolder(name, callbackfnc = null) {
    return async (e) => {
      e.preventDefault();
      try {
        await create({
          variables: { data: { path: mainPath, name } },
        });
        callbackfnc && callbackfnc();
      } catch (e) {
        alert(`Beklenmedik bir hata meydana geldi;\n${e}`);
      }
    };
  }

  function renameFile(name, callbackfnc = null) {
    return async (e) => {
      e.preventDefault();
      try {
        const x = await rename({
          variables: { path: selectFiles[0], name },
        });
        console.log(x);

        callbackfnc && callbackfnc();
      } catch (e) {
        alert(`Beklenmedik bir hata meydana geldi;\n${e}`);
      }
    };
  }

  return (
    <Container fluid className={"mt-2"}>
      <Row>
        <Col>
          <ToolBox
            rename={renameFile}
            mainPath={mainPath}
            setMainPath={setMainPath}
            searchText={searchText}
            setSearchText={setSearchText}
            refetch={refetch}
            createFolder={createFolder}
            removeItem={removeItem}
            selectFiles={selectFiles}
            setSelectFiles={setSelectFiles}
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <FontAwesomeIcon icon={["fas", "folder-open"]} />{" "}
          <FolderBreadcrumbs
            path={mainPath}
            setMainPath={setMainPath}
            refetch={refetch}
          />
        </Col>
      </Row>
      <hr />
      <Row noGutters>
        {loading && <Loading />}
        {!loading &&
          data &&
          data.allFiles &&
          data.allFiles
            .filter((item) => {
              return item.name.indexOf(searchText) >= 0;
            })
            .map((item, index) => (
              <Col key={index} lg={2} md={3} sm={3} xs={4} className={"p-1"}>
                <div
                  className={`file-manager-item p-2 m-2 ${
                    selectFiles.indexOf(item.path) >= 0 ? "active" : ""
                  }`}
                  onDoubleClick={async () => {
                    if (item.type === "directory") {
                      setMainPath(`./${item.path}`);
                      await refetch();
                    } else {
                      onSelectFile && onSelectFile(item.path);
                      selectCallbackFnc && selectCallbackFnc();
                    }
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    if (selectFiles.indexOf(item.path) >= 0) {
                      setSelectFiles(
                        selectFiles.filter((path) => path !== item.path)
                      );
                    } else {
                      setSelectFiles([...selectFiles, item.path]);
                    }
                  }}>
                  <div className={"preview"}>
                    <Preview item={item} />
                  </div>
                  <p className={"pt-1"}>{item.name}</p>
                  <p>
                    <small>({bytesToSize(item.size)})</small>
                  </p>
                </div>
              </Col>
            ))}
      </Row>
    </Container>
  );
}
