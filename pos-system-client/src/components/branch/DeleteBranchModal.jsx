import { Modal } from "antd";

const DeleteBranchModal = ({
  open,
  onOk,
  onCancel,
  loading,
}) => {
  return (
    <Modal
      title="Delete Branch"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="Delete"
      okButtonProps={{
        danger: true,
        loading,
      }}
    >
      Are you sure you want to delete this branch?
    </Modal>
  );
};

export default DeleteBranchModal;