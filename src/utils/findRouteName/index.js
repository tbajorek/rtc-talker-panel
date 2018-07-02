import { routesData } from '../../routes';

const findRouteName = (key, value) => {
  let foundName = null;
  Object.entries(routesData).some(([name, route]) => {
    if (route[key] === value) {
      foundName = name;
      return true;
    }
    return false;
  });console.log(key, value, foundName);
  return foundName;
};

export default findRouteName;
