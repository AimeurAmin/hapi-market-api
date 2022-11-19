import User from "../db/models/User"

const validate = async (decoded: any) => {
  const searchResults = await User.collection().where('id', decoded.id);
  if (Object.keys(searchResults).length) {
    return { isValid: true };
  }
  return { isValid: false };
};

export default validate;