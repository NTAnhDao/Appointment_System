import "../../styles/dialog.css";

export default function Dialog({ open, title, message, onClose }) {
  if (!open) return null;

  return (
    <div className="notification-overlay">
      <div className="notification-box">
        <h3>{title}</h3>
        <p>{message}</p>

        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}