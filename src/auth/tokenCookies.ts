import cookies from "js-cookie";

export const getToken = () => cookies.get("token");

export const setToken = (token: string) => {
	cookies.set("token", token, { expires: 1 / 24 });
};

export const removeToken = () => cookies.remove("token");
