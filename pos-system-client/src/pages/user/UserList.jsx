import { useEffect, useMemo, useState } from "react";
import { Card, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import UserTable from "../../components/user/UserTable";
import UserSearch from "../../components/user/UserSearch";
import DeleteUserModal from "../../components/user/DeleteUserModal";

import userService from "../../services/userService";


const UserList = () => {

  const navigate = useNavigate();


  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);

  const [search,setSearch] = useState("");

  const [deleteOpen,setDeleteOpen] = useState(false);
  const [selectedId,setSelectedId] = useState(null);



  const currentUser =
    JSON.parse(localStorage.getItem("pos_user")) || {};


  const role = currentUser.role;



  const canCreateUser =
      role === "ROLE_SUPER_ADMIN" ||
      role === "ROLE_STORE_ADMIN";



  const fetchUsers = async()=>{

    try{

      setLoading(true);

      const data =
        await userService.getUsers();


      setUsers(data);


    }
    catch(error){

      message.error(
        "Unable to load users."
      );

    }
    finally{

      setLoading(false);

    }

  };




  useEffect(()=>{

    fetchUsers();

  },[]);






  const filteredUsers = useMemo(()=>{


    return users.filter((user)=>


      `${user.fullName}
       ${user.email}
       ${user.phone}
       ${user.role}`

      .toLowerCase()

      .includes(
        search.toLowerCase()
      )

    );


  },[users,search]);






  const handleDelete=(id)=>{

    setSelectedId(id);

    setDeleteOpen(true);

  };






const confirmDelete = async () => {
  try {
    await userService.deleteUser(selectedId);

    message.success("User deleted successfully");

    fetchUsers();
  } catch (error) {
    message.error(
      error.response?.data?.message || "Delete failed"
    );
  }

  setDeleteOpen(false);
};






return (

<MainLayout>


<Card

title="User Management"


extra={

canCreateUser &&

<Button

type="primary"

icon={<PlusOutlined/>}

onClick={()=>navigate("/users/create")}

>

Create User

</Button>

}

>



<UserSearch

search={search}

setSearch={setSearch}

/>




<UserTable

users={filteredUsers}

loading={loading}

onView={(id)=>navigate(`/users/${id}`)}

onEdit={(id)=>navigate(`/users/edit/${id}`)}

onDelete={handleDelete}

/>




<DeleteUserModal

open={deleteOpen}

onOk={confirmDelete}

onCancel={()=>setDeleteOpen(false)}

loading={loading}

/>


</Card>


</MainLayout>

);


};


export default UserList;