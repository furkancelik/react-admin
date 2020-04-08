import gql from "graphql-tag";

export const FILE_MANAGER = {
  allFiles: gql`
    query($path: String) {
      allFiles(path: $path) {
        name
        type
        extname
        path
        size
      }
    }
  `,
  remove: gql`
    mutation($path: [String]) {
      removeFile(path: $path)
    }
  `,
  createFolder: gql`
    mutation($data: createFolderInput!) {
      createFolder(data: $data)
    }
  `,
  uploadFile: gql`
    mutation($files: [Upload]!, $path: String!) {
      uploadFile(files: $files, path: $path) {
        name
        path
      }
    }
  `,
  rename: gql`
    mutation($path: String, $name: String) {
      rename(path: $path, name: $name)
    }
  `,
};
