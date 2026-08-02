import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Descriptions,
  Image,
  Row,
  Spin,
  Tag,
  Typography,
  message,
} from "antd";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import MainLayout from "../../layouts/MainLayout";
import productService from "../../services/productService";
import BackButton from "../../components/comman/BackButton";

const { Title } = Typography;

// Backend URL
const API_URL = "http://localhost:8080";

const ProductDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const response = await productService.getProductById(id);

      console.log("Product Response:", response);
      console.log("Image Path:", response.image);

      setProduct(response);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to load product."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Spin size="large" />
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <Card>No Product Found.</Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <BackButton/>
      <Card>
        <Row gutter={24}>
          {/* Product Image */}
          <Col xs={24} md={8}>
            <Image
              width="100%"
              src={
                product.image
                  ? `${API_URL}${product.image}`
                  : "https://placehold.co/300x300?text=No+Image"
              }
              fallback="https://placehold.co/300x300?text=No+Image"
            />
          </Col>

          {/* Product Details */}
          <Col xs={24} md={16}>
            <Title level={3}>{product.name}</Title>

            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Product ID">
                {product.id}
              </Descriptions.Item>

              <Descriptions.Item label="SKU">
                {product.sku}
              </Descriptions.Item>

              <Descriptions.Item label="Brand">
                {product.brand || "-"}
              </Descriptions.Item>

              <Descriptions.Item label="Category">
                {product.category?.name || "-"}
              </Descriptions.Item>

              <Descriptions.Item label="MRP">
                ₹ {product.mrp}
              </Descriptions.Item>

              <Descriptions.Item label="Selling Price">
                <Tag color="green">
                  ₹ {product.sellingPrice}
                </Tag>
              </Descriptions.Item>

              <Descriptions.Item label="Description">
                {product.description || "-"}
              </Descriptions.Item>

              <Descriptions.Item label="Store ID">
                {product.storeId}
              </Descriptions.Item>

              <Descriptions.Item label="Created At">
                {product.createdAt
                  ? dayjs(product.createdAt).format("DD MMM YYYY hh:mm A")
                  : "-"}
              </Descriptions.Item>

              <Descriptions.Item label="Updated At">
                {product.updatedAt
                  ? dayjs(product.updatedAt).format("DD MMM YYYY hh:mm A")
                  : "-"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </MainLayout>
  );
};

export default ProductDetails;