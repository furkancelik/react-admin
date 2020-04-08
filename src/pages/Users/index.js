import UserCreate from "./create";
import UserData from "./data";
import UserEdit from "./edit";
import UserDetail from "./detail";

import { USER } from "../../store/Queries/User";
export const QUERY = USER;

//Variables
export const LINK = "/user";
export const REMOVE_KEY = "removeUser";
export const ITEMS = "users";
export const ITEM = "user";

export const DATA_TEXT = {
  contentHeaderTitle: "Yöneticiler",
  breadcrumbs: [{ title: "Anasyafa", link: "/" }, { title: "Yöneticiler" }],
  cardTitle: "Yöneticiler",
};

export const CREATE_TEXT = {
  contentHeaderTitle: "Yeni Yönetici Ekle",
  breadcrumbs: [
    { title: "Anasyafa", link: "/" },
    { title: "Yöneticiler", link: LINK },
    { title: "Yeni" },
  ],
  cardTitle: "Yeni Yönetici Ekle",
};

export const DETAIL_TEXT = {
  contentHeaderTitle: "Yönetici Detayları",
  breadcrumbs: [
    { title: "Anasyafa", link: "/" },
    { title: "Yöneticiler", link: LINK },
    { title: "Detaylar" },
  ],
  cardTitle: "Yöneitici Detayları",
};

export const EDIT_TEXT = {
  contentHeaderTitle: "Yönetici Düzenle",
  breadcrumbs: [
    { title: "Anasyafa", link: "/" },
    { title: "Yöneticiler", link: LINK },
    { title: "Düzenle" },
  ],
  cardTitle: "Yönetici Düzenle",
};

export { UserData, UserCreate, UserDetail, UserEdit };
