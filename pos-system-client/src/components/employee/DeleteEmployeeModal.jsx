import { Modal } from "antd";

const DeleteEmployeeModal = ({
  open,
  onOk,
  onCancel,
  loading,
}) => {
  return (
    <Modal
      title="Delete Employee"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={loading}
      okText="Delete"
      okButtonProps={{
        danger: true,
      }}
    >
      Are you sure you want to delete this employee?
    </Modal>
  );
};

export default DeleteEmployeeModal;