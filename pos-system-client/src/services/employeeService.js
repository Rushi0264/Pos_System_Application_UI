import employeeApi from "../api/employeeApi";

const employeeService = {

    getEmployeesByStore: (storeId) =>
        employeeApi.getEmployeesByStore(storeId),

    getAllEmployees: () =>
        employeeApi.getAllEmployees(),

    createEmployee: (data) =>
        employeeApi.createEmployee(data),

    updateEmployee: (id, data) =>
        employeeApi.updateEmployee(id, data),

    deleteEmployee: (id) =>
        employeeApi.deleteEmployee(id),

    getEmployeeById: (id) =>
        employeeApi.getEmployeeById(id)

};

export default employeeService;