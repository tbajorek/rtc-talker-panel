export default store => next => (action) => {
  const isLocationChange = action.type === '@@router/LOCATION_CHANGE';
  return next(action);
};
