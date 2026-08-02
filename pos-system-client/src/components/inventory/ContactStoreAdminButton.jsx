import { useState } from "react";
import { Button, message, Tooltip } from "antd";
import { Mail } from "lucide-react";
import storeService from "../../services/storeService";

export default function ContactStoreAdminButton({ storeId, productName }) {
  const [loading, setLoading] = useState(false);

  const handleContact = async () => {
    if (!storeId) {
      message.error("Store information not available");
      return;
    }

    try {
      setLoading(true);

      const admins = await storeService.getStoreAdminsContact(storeId);
      const admin = admins?.[0];

      if (!admin) {
        message.error("Store admin not found");
        return;
      }

      const subject = encodeURIComponent(
        `Stock Issue: ${productName || "Product"}`
      );
      const body = encodeURIComponent(
        `Hi ${admin.fullName},\n\nThe stock for "${productName}" is low or out. Please replenish it as soon as possible.\n\nThanks`
      );

      const link = document.createElement("a");
      link.href = `mailto:${admin.email}?subject=${subject}&body=${body}`;
      link.click();

    } catch (error) {
      message.error("Store admin not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip title="Email to store admin">
      <Button
        size="small"
        icon={<Mail size={14} />}
        loading={loading}
        onClick={handleContact}
      >
        Contact Admin
      </Button>
    </Tooltip>
  );
}