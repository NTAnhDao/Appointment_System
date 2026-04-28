export default function StatusBadge({ status }) {
  const map = {
  success: { text: "Đã thanh toán", class: "badge-paid", icon: "check_circle" },
  pending: { text: "Chưa thanh toán", class: "badge-pending", icon: "schedule" },
  cancelled: {
    text: "Đã huỷ",
    class: "badge-done",
    icon: "cancel",
  },

  cash: {
    text: "Thanh toán tại viện",
    class: "badge-cash",
    icon: "local_hospital",
  },
};

  const item = map[status] || map.pending;

  return (
    <span className={`status-badge ${item.class}`}>
      <span className="material-symbols-outlined">
        {item.icon}
      </span>
      {item.text}
    </span>
  );
}