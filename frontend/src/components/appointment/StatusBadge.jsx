export default function StatusBadge({ status }) {
  const map = {
  paid: { text: "Đã thanh toán", class: "badge-paid", icon: "check_circle" },
  pending: { text: "Chưa thanh toán", class: "badge-pending", icon: "schedule" },
  done: { text: "Đã hoàn tất", class: "badge-done", icon: "task_alt" },
  expired: { text: "Đã hết hạn", class: "badge-done", icon: "block" } 
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