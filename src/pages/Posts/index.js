import PostCreate from "./create";
import PostData from "./data";
import PostEdit from "./edit";
import PostDetail from "./detail";

import { POST } from "../../store/Queries/Post";
export const QUERY = POST;

//Variables
export const LINK = "/post";
export const REMOVE_KEY = "removePost";
export const ITEMS = "posts";
export const ITEM = "post";

export const DATA_TEXT = {
  contentHeaderTitle: "İçerikler",
  breadcrumbs: [{ title: "Anasyafa", link: "/" }, { title: "İçerikler" }],
  cardTitle: "İçerikler",
};

export const CREATE_TEXT = {
  contentHeaderTitle: "Yeni İçerik Ekle",
  breadcrumbs: [
    { title: "Anasyafa", link: "/" },
    { title: "İçerikler", link: LINK },
    { title: "Yeni" },
  ],
  cardTitle: "Yeni İçerik Ekle",
};

export const DETAIL_TEXT = {
  contentHeaderTitle: "İçerik Detayları",
  breadcrumbs: [
    { title: "Anasyafa", link: "/" },
    { title: "İçerikler", link: LINK },
    { title: "Detaylar" },
  ],
  cardTitle: "İçerik Detayları",
};

export const EDIT_TEXT = {
  contentHeaderTitle: "İçerik Düzenle",
  breadcrumbs: [
    { title: "Anasyafa", link: "/" },
    { title: "İçerikler", link: LINK },
    { title: "Düzenle" },
  ],
  cardTitle: "İçerik Düzenle",
};

export { PostCreate, PostData, PostEdit, PostDetail };
