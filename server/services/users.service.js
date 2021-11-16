import db from "../db-init.js";

const User = db.users;

const addUser = async (user) => {
  console.log(addUser.name, "Adding new user", JSON.stringify(user, null, 2));

  try {
    const newUser = await User.create(user);

    return {
      id: newUser.id,
      name: newUser.name,
    };
  } catch (error) {
    console.error(
      addUser.name,
      "Error creating a new user",
      JSON.stringify(error, null, 2)
    );
    return null;
  }
};

const usersService = { addUser };

export default usersService;
