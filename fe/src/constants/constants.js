import AppApi from "./AppApi";
import RouteName from "./RouteName";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export { AppApi, RouteName, USER_REGEX, PASS_REGEX };
