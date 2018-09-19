/**
 * It checks if given user has correct role for the route
 *
 * @param user
 * @param route
 * @return {boolean}
 */
const userChecker = (user, route) => {
  if (typeof route.role !== 'undefined') {//single role: given or higher
    return user.role >= route.role;
  } else if (Array.isArray(route.roles)) {//multiple role: only one of given
    return route.roles.indexOf(user.role) >= 0;
  }
  return true;
};

export default userChecker;