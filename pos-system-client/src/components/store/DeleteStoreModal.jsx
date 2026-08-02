import { Modal } from "antd";

const DeleteStoreModal = ({
  open,
  onOk,
  onCancel,
  loading,
}) => {
  return (
    <Modal
      title="Delete Store"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="Delete"
      okButtonProps={{
        danger: true,
        loading,
      }}
    >
      <p>
        Are you sure you want to delete this store?
      </p>
    </Modal>
  );
};

export default DeleteStoreModal;