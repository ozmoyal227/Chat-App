import User from "./models/User.js";

const dbInit = () => {
  User.sync();
};
export default dbInit;
