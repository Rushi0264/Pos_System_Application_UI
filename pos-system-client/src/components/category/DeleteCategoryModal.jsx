import { Modal } from "antd";

const DeleteCategoryModal = ({
  open,
  loading,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      title="Delete Category"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="Delete"
      okButtonProps={{
        danger: true,
        loading,
      }}
    >
      Are you sure you want to delete this category?
    </Modal>
  );
};

export default DeleteCategoryModal;