import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  useEffect,
  useState
}
from "react";

import { useSearchParams } from "react-router-dom";

import {
  message,
  Tag,
  Button
}
from "antd";


import InventoryStats 
from "../../components/inventory/InventoryStats";

import storeService from "../../services/storeService";

import InventoryFilters
from "../../components/inventory/InventoryFilters";


import InventoryTable
from "../../components/inventory/InventoryTable";


import StockDrawer
from "../../components/inventory/StockDrawer";


import inventoryService
from "../../services/inventoryService";

import MainLayout from "../../layouts/MainLayout"; 


const ADMIN_ROLES = [
  "ROLE_SUPER_ADMIN",
  "ROLE_STORE_ADMIN",
  "ROLE_INVENTORY_MANAGER",
  "ROLE_ACCOUNTANT",
];


const Inventory=()=>{

const [searchParams, setSearchParams] = useSearchParams();
const urlFilter = searchParams.get("filter"); // "low" | "out" | null

const [inventory,setInventory]=useState([]);

const [open,setOpen]=useState(false);

const [loading,setLoading]=useState(false);

const [selectedInventory,setSelectedInventory]=useState(null);

const [filters, setFilters] = useState({
  search: "",
  categoryId: null,
  storeId: null,
  branchId: null,
  status: null,
});

const [storesList, setStoresList] = useState([]);

const getLoggedInUser = () => {
  const user = JSON.parse(sessionStorage.getItem("pos_user"));
  return user;
};

const currentUser = getLoggedInUser();
const isAdmin = ADMIN_ROLES.includes(currentUser?.role);
const userBranchId = currentUser?.branch?.id || currentUser?.branchId;



const loadInventory=async()=>{

try{


setLoading(true);


let data;

if (isAdmin) {

  data = await inventoryService
  .getAllInventory();

} else {

  if (!userBranchId) {
    message.error("Branch not found for this user");
    setInventory([]);
    return;
  }

  data = await inventoryService
  .getInventoryByBranch(userBranchId);

}


setInventory(data);


}
catch(error){

console.log(error);

message.error(
"Failed to load inventory"
);


}
finally{

setLoading(false);

}

};


const loadStores = async () => {
  if (!isAdmin) return;
  try {
    let data;
    if (currentUser.role === "ROLE_SUPER_ADMIN") {
      data = await storeService.getAllStores();
    } else {
      const myStore = await storeService.getMyStore();
      data = myStore ? [myStore] : [];
    }
    setStoresList(data || []);
  } catch (error) {
    console.error(error);
  }
};



useEffect(()=>{

loadInventory();
loadStores();

},[]);


// Apply all filters (URL param + filter bar)
const filteredInventory = inventory.filter((item) => {

  // URL-based quick filter (from Dashboard clicks)
  if (urlFilter === "low" && !(item.quantity > 0 && item.quantity <= 5)) {
    return false;
  }
  if (urlFilter === "out" && item.quantity !== 0) {
    return false;
  }

  // Search
  if (
    filters.search &&
    !item.product?.name?.toLowerCase().includes(filters.search.toLowerCase())
  ) {
    return false;
  }

  // Category
  if (
    filters.categoryId &&
    item.product?.category?.id !== filters.categoryId
  ) {
    return false;
  }

  // Store

if (
  filters.storeId &&
  item.branch?.storeId !== filters.storeId
) {
  return false;
}

  // Branch
  if (
    filters.branchId &&
    item.branch?.id !== filters.branchId
  ) {
    return false;
  }

  // Status (dropdown)
  if (filters.status === "instock" && !(item.quantity > 5)) {
    return false;
  }
  if (
    filters.status === "lowstock" &&
    !(item.quantity > 0 && item.quantity <= 5)
  ) {
    return false;
  }
  if (filters.status === "outofstock" && item.quantity !== 0) {
    return false;
  }

  return true;

});


const clearFilter = () => {
  searchParams.delete("filter");
  setSearchParams(searchParams);
};


const handleExport = () => {

  if (!filteredInventory.length) {
    message.warning("No data to export");
    return;
  }

  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("NexoraPOS - Inventory Report", 14, 15);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(
    `Generated on: ${new Date().toLocaleString()}`,
    14,
    22
  );

  const headers = [
    "Product",
    "Category",
    "Store",
    "Branch",
    "Quantity",
    "Status",
    "Last Updated",
  ];

  const rows = filteredInventory.map((item) => {

    const status =
      item.quantity === 0
        ? "Out Of Stock"
        : item.quantity <= 5
        ? "Low Stock"
        : "In Stock";

    const storeMatch = storesList.find(
      (s) => s.id === item.branch?.storeId
    );

    return [
      item.product?.name || "-",
      item.product?.category?.name || "-",
      storeMatch?.name || storeMatch?.brand || "-",
      item.branch?.name || "-",
      item.quantity,
      status,
      item.lastUpdate ? new Date(item.lastUpdate).toLocaleString() : "-",
    ];
  });

  autoTable(doc, {
    startY: 28,
    head: [headers],
    body: rows,
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [16, 185, 129] }, // NexoraPOS teal-green
    alternateRowStyles: { fillColor: [245, 245, 245] },
    theme: "striped",
    didParseCell: (data) => {
      // Status column colored
      if (data.section === "body" && data.column.index === 5) {
        const value = data.cell.raw;
        if (value === "Out Of Stock") {
          data.cell.styles.textColor = [220, 38, 38]; // red
        } else if (value === "Low Stock") {
          data.cell.styles.textColor = [217, 119, 6]; // orange
        } else if (value === "In Stock") {
          data.cell.styles.textColor = [22, 163, 74]; // green
        }
      }
    },
  });

  doc.save(`inventory_${Date.now()}.pdf`);

  message.success("Inventory exported successfully");
};




const handleDelete=async(id)=>{

try{


await inventoryService
.deleteInventory(id);


message.success(
"Inventory deleted"
);


loadInventory();


}
catch(error){

message.error(
"Delete failed"
);

}

};





const handleSave=async(values)=>{


try{


if(selectedInventory){


await inventoryService
.updateInventory(
selectedInventory.id,
{
productId:Number(values.productId),
branchId:Number(values.branchId),
quantity:Number(values.quantity)
}
);


message.success(
"Inventory updated"
);



}
else{


await inventoryService
.createInventory(
{
productId:Number(values.productId),
branchId:Number(values.branchId),
quantity:Number(values.quantity)
}
);


message.success(
"Inventory created"
);


}



setOpen(false);

setSelectedInventory(null);


loadInventory();


}
catch(error){

message.error(
"Unable to save inventory"
);


}


};




return (

  <MainLayout>

<div className="space-y-6" style={{margin:15,padding:10}}>


<h1 className="text-3xl font-bold">
Inventory Management
</h1>



<InventoryStats
inventory={inventory}
/>


{urlFilter && (
  <div
    style={{
      margin: "0 10px 10px",
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}
  >
    <Tag color={urlFilter === "out" ? "red" : "orange"}>
      Showing: {urlFilter === "out" ? "Out of Stock" : "Low Stock"} items
    </Tag>

    <Button size="small" onClick={clearFilter}>
      Clear Filter
    </Button>
  </div>
)}


<InventoryFilters

onAdd={()=>{

setSelectedInventory(null);

setOpen(true);

}}

onFilterChange={setFilters}

onExport={handleExport}

inventory={inventory}

isAdmin={isAdmin}
storesList={storesList}

/>




<InventoryTable

data={filteredInventory}

loading={loading}

onEdit={(item)=>{

setSelectedInventory(item);

setOpen(true);

}}

onDelete={handleDelete}

/>




<StockDrawer

open={open}

onClose={()=>{

setOpen(false);

setSelectedInventory(null);

}}

onFinish={handleSave}

loading={loading}

inventory={selectedInventory}

/>



</div>

</MainLayout>

);


};


export default Inventory;