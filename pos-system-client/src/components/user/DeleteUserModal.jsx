import { Modal } from "antd";

const DeleteUserModal = ({
  open,
  onOk,
  onCancel,
  loading,
}) => {
  return (
    <Modal
      title="Delete User"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={loading}
      okText="Delete"
      okButtonProps={{ danger: true }}
      cancelText="Cancel"
    >
      <p>
        Are you sure you want to delete this user?
      </p>

      <p
        style={{
          color: "red",
          fontWeight: 500,
        }}
      >
        This action cannot be undone.
      </p>
    </Modal>
  );
};

export default DeleteUserModal;