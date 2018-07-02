const userChecker = (user, route) => {
  if (typeof route.role !== 'undefined') {
    return user.role >= route.role;
  } else if (Array.isArray(route.roles)) {
    return route.roles.indexOf(user.role) >= 0;
  }
  return true;
};

export default userChecker;
