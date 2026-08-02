import { Form, Input, Button, Select, Row, Col } from "antd";

const { Option } = Select;


const UserForm = ({
  form,
  onFinish,
  loading,
  initialValues,
  roles,
  stores,
  branches,
  loadBranches,
  currentRole
}) => {



  const handleStoreChange = (storeId)=>{

    form.setFieldValue(
      "branchId",
      null
    );

    loadBranches(storeId);

  };



  const isSuperAdmin =
    currentRole === "ROLE_SUPER_ADMIN";


  // Watch the selected Role field to decide whether Branch is needed
  const selectedRole = Form.useWatch("role", form);

  // Store Admin (and Super Admin, if ever created here) manage
  // the whole store, not one specific branch — so no Branch field for them
  const branchNotRequired =
    selectedRole === "ROLE_STORE_ADMIN" ||
    selectedRole === "ROLE_SUPER_ADMIN"||
      selectedRole === "ROLE_INVENTORY_MANAGER" ||
  selectedRole === "ROLE_ACCOUNTANT";



  return (

<Form

layout="vertical"

form={form}

onFinish={onFinish}

initialValues={initialValues}

>


<Row gutter={16}>


<Col span={12}>

<Form.Item

label="Full Name"

name="fullName"

rules={[
{
required:true,
message:"Please enter full name"
}
]}

>

<Input placeholder="Enter Full Name"/>

</Form.Item>

</Col>



<Col span={12}>


<Form.Item

label="Email"

name="email"

rules={[
{
required:true,
type:"email",
message:"Enter valid email"
}
]}

>

<Input placeholder="Enter Email"/>

</Form.Item>


</Col>


</Row>





<Row gutter={16}>


<Col span={12}>


<Form.Item

label="Phone"

name="phone"

>

<Input placeholder="Enter Phone"/>


</Form.Item>


</Col>




<Col span={12}>


<Form.Item

label="Password"

name="password"

rules={[
{
required:true,
message:"Password required"
}
]}

>


<Input.Password/>


</Form.Item>


</Col>


</Row>







<Row gutter={16}>


<Col span={12}>


<Form.Item

label="Role"

name="role"

rules={[
{
required:true,
message:"Select Role"
}
]}

>


<Select
  placeholder="Select Role"
  onChange={() => {
    // Clear branch selection whenever role changes
    form.setFieldValue("branchId", null);
  }}
>


{
roles.map((role)=>(

<Option

key={role}

value={role}

>

{
role
.replace("ROLE_","")
.replaceAll("_"," ")
}

</Option>


))
}


</Select>


</Form.Item>


</Col>






{
isSuperAdmin &&


<Col span={12}>


<Form.Item

label="Store"

name="storeId"

rules={[
{
required:true,
message:"Select Store"
}
]}

>


<Select

allowClear

placeholder="Select Store"

onChange={handleStoreChange}

>


{

stores.map(store=>(

<Option

key={store.id}

value={store.id}

>

{store.brand}

</Option>


))

}


</Select>


</Form.Item>


</Col>

}



</Row>








{
!branchNotRequired &&

<Row gutter={16}>


<Col span={12}>


<Form.Item

label="Branch"

name="branchId"


rules={[
{
required:true,
message:"Select Branch"
}
]}

>


<Select

allowClear

placeholder="Select Branch"

disabled={!branches.length}

>


{

branches.map(branch=>(


<Option

key={branch.id}

value={branch.id}

>

{branch.name}

</Option>


))


}


</Select>


</Form.Item>



</Col>


</Row>

}







<Form.Item>


<Button

type="primary"

htmlType="submit"

loading={loading}

>

Save User

</Button>


</Form.Item>



</Form>


  );

};


export default UserForm;