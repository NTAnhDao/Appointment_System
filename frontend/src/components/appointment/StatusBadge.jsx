export default function StatusBadge({ status }) {
  const map = {
    paid: { text: "Đã thanh toán", class: "success" },
    pending: { text: "Chưa thanh toán", class: "danger" },
    done: { text: "Đã hoàn tất", class: "secondary" },
  };

  return (
    <span className={`badge bg-${map[status].class}`}>
      {map[status].text}
    </span>
  );
}