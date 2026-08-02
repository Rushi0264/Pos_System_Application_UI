import {
  getUsersApi,
  getUserByIdApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  getUsersByRoleApi,
  getProfileApi,
} from "../api/userApi";

const userService = {
  // Get all users
  getAllUsers: () => getUsersApi(),

  // (Backward compatibility)
  getUsers: () => getUsersApi(),

  // Get single user
  getUserById: (id) => getUserByIdApi(id),

  // Create
  createUser: (data) => createUserApi(data),

  // Update
  updateUser: (id, data) => updateUserApi(id, data),

  // Delete
  deleteUser: (id) => deleteUserApi(id),

   getProfile: () => getProfileApi(),

  // =========================
  // USERS BY ROLE
  // =========================

  getStoreAdmins: () =>
    getUsersByRoleApi("ROLE_STORE_ADMIN"),

  getStoreManagers: () =>
    getUsersByRoleApi("ROLE_STORE_MANAGER"),

  getBranchManagers: () =>
    getUsersByRoleApi("ROLE_BRANCH_MANAGER"),

  getBranchCashiers: () =>
    getUsersByRoleApi("ROLE_BRANCH_CASHIER"),
};

export default userService;