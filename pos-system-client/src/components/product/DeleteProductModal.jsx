import { Modal, Typography } from "antd";

const { Text } = Typography;

const DeleteProductModal = ({
  open,
  loading,
  product,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      title="Delete Product"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{
        danger: true,
        loading,
      }}
      destroyOnHidden
    >
      <Text>
        Are you sure you want to delete this product?
      </Text>

      <br />
      <br />

      {product && (
        <>
          <Text strong>Product :</Text>

          <Text> {product.name}</Text>

          <br />

          <Text strong>SKU :</Text>

          <Text> {product.sku}</Text>

          <br />

          <Text strong>Brand :</Text>

          <Text> {product.brand || "-"}</Text>
        </>
      )}

      <br />
      <br />

      <Text type="danger">
        This action cannot be undone.
      </Text>
    </Modal>
  );
};

export default DeleteProductModal;