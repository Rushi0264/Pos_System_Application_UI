export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};


// Current User Role
export const getCurrentRole = () => {

  const user = getCurrentUser();

  return user?.role;

};


// Current Store Id
export const getCurrentStoreId = () => {

  const user = getCurrentUser();

  return user?.storeId;

};


// Current Branch Id
export const getCurrentBranchId = () => {

  const user = getCurrentUser();

  return user?.branchId;

};


// Check Permission
export const hasRole = (roles = []) => {

  const role = getCurrentRole();

  return roles.includes(role);

};