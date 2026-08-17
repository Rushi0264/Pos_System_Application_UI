import { useState, useEffect } from "react";
import { Card, Form, message } from "antd";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import UserForm from "../../components/user/UserForm";

import userService from "../../services/userService";
import storeService from "../../services/storeService";
import branchService from "../../services/branchService";
import BackButton from "../../components/comman/BackButton";


const CreateUser = () => {

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading,setLoading] = useState(false);

  const [stores,setStores] = useState([]);
  const [branches,setBranches] = useState([]);



  // Current Logged User
  const currentUser =
    JSON.parse(sessionStorage.getItem("pos_user")) || {};


  const currentRole = currentUser.role;



  // Roles based on creator

  const roles =
    currentRole === "ROLE_SUPER_ADMIN"
    ?
    [
      "ROLE_STORE_ADMIN",
      "ROLE_BRANCH_MANAGER",
      "ROLE_BRANCH_CASHIER",
      "ROLE_INVENTORY_MANAGER",
      "ROLE_ACCOUNTANT"
    ]
    :
    [
      "ROLE_BRANCH_MANAGER",
      "ROLE_BRANCH_CASHIER",
      "ROLE_INVENTORY_MANAGER",
      "ROLE_ACCOUNTANT"
    ];





  useEffect(()=>{

    if(currentRole==="ROLE_SUPER_ADMIN"){
      loadStores();
    }

  },[]);






  const loadStores = async()=>{

    try{

      const data =
        await storeService.getAllStores();

      setStores(data);

    }
    catch(error){

      console.log(error);

      message.error(
        "Unable to load stores"
      );

    }

  };






  const loadBranches = async(storeId)=>{


    if(!storeId){

      setBranches([]);

      return;

    }


    try{

      const data =
        await branchService.getBranchesByStore(storeId);


      setBranches(data);


    }
    catch(error){

      console.log(error);

      message.error(
        "Unable to load branches"
      );

    }

  };







  const handleSubmit = async(values)=>{


    try{

      setLoading(true);



      // Store Admin स्वतःचा store घेईल

      if(currentRole==="ROLE_STORE_ADMIN"){


        values.storeId =
          currentUser.storeId;


      }




      await userService.createUser(values);



      message.success(
        "User created successfully"
      );


      navigate("/users");


    }
    catch(error){


      message.error(
        error.response?.data?.message ||
        "Failed to create user"
      );


    }
    finally{

      setLoading(false);

    }

  };





  return (

    <MainLayout>
<BackButton/>

      <Card title="Create User">


        <UserForm

          form={form}

          onFinish={handleSubmit}

          loading={loading}

          roles={roles}

          stores={
            currentRole==="ROLE_SUPER_ADMIN"
            ? stores
            : []
          }

          branches={branches}

          loadBranches={loadBranches}

          currentRole={currentRole}


        />


      </Card>


    </MainLayout>

  );

};


export default CreateUser;