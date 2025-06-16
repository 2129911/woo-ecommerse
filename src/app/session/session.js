import { isEmpty } from "lodash";

export const storeSession = (session) => {
  if (isEmpty(session)) return null;
  localStorage.setItem("woocommerce-session", session);
};

export const getSession = () => {
  return localStorage.getItem("woocommerce-session");
};
