import { useEffect, useMemo, useState } from "react";
import { Button, Card, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import ProductTable from "../../components/product/ProductTable";
import ProductSearch from "../../components/product/ProductSearch";
import DeleteProductModal from "../../components/product/DeleteProductModal";

import productService from "../../services/productService";
import categoryService from "../../services/categoryService";

const ProductList = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");


  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const user =
    JSON.parse(
      sessionStorage.getItem("pos_user")
    ) || {};


  const role = user.role;



  useEffect(() => {

    loadCategories();
    loadProducts();

  }, []);



  const loadCategories = async()=>{

    try{

      const data =
        await categoryService.getAllCategories();

      setCategories(data);

    }catch(error){

      console.error(error);
      message.error(
        "Unable to load categories"
      );

    }

  };




  const loadProducts = async()=>{

    try{

      setLoading(true);


      let data=[];



      if(role === "ROLE_SUPER_ADMIN" || role === "ROLE_INVENTORY_MANAGER"){

        data =
          await productService.getAllProducts();

      }
      else{


        const storeId =
          user?.store?.id ||
          user?.storeId;


        if(!storeId){

          message.error(
            "Store not assigned to user"
          );

          return;
        }



        data =
          await productService.getProductsByStore(
            storeId
          );

      }



      setProducts(data);


    }catch(error){

      console.error(error);

      message.error(
        error.response?.data?.message ||
        "Unable to load products"
      );


    }finally{

      setLoading(false);

    }

  };




  const filteredProducts = useMemo(()=>{


    return products.filter((product)=>{


      const keyword =
        search.toLowerCase();



      const matchKeyword =
        product.name
        ?.toLowerCase()
        .includes(keyword)

        ||

        product.brand
        ?.toLowerCase()
        .includes(keyword)

        ||

        product.sku
        ?.toLowerCase()
        .includes(keyword);



      const matchCategory =
        category==="ALL" ||

        product.category?.id === category;



      return matchKeyword && matchCategory;


    });


  },[
    products,
    search,
    category
  ]);





  const handleView=(id)=>{

    navigate(
      `/products/${id}`
    );

  };



  const handleEdit=(id)=>{

    navigate(
      `/products/edit/${id}`
    );

  };



  const handleDelete=(product)=>{

    setSelectedProduct(product);

    setDeleteOpen(true);

  };





  const confirmDelete=async()=>{


    try{


      setLoading(true);


      await productService.deleteProduct(
        selectedProduct.id
      );


      message.success(
        "Product deleted successfully"
      );



      loadProducts();



    }catch(error){


      console.error(error);


      message.error(
        error.response?.data?.message ||
        "Delete failed"
      );


    }finally{


      setLoading(false);

      setDeleteOpen(false);

      setSelectedProduct(null);


    }


  };





  return (

    <MainLayout>


      <Card

        title="Product Management"

        extra={

          <Button

            type="primary"

            icon={<PlusOutlined/>}

            onClick={()=>navigate("/products/add")}

          >

            Add Product

          </Button>

        }

      >


        <ProductSearch

          search={search}

          setSearch={setSearch}

          category={category}

          setCategory={setCategory}

          categories={categories}

        />



        <ProductTable

          products={filteredProducts}

          loading={loading}

          onView={handleView}

          onEdit={handleEdit}

          onDelete={handleDelete}

        />



        <DeleteProductModal

          open={deleteOpen}

          loading={loading}

          product={selectedProduct}

          onOk={confirmDelete}

          onCancel={()=>{

            setDeleteOpen(false);

            setSelectedProduct(null);

          }}

        />


      </Card>


    </MainLayout>

  );

};


export default ProductList;