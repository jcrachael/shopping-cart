import "../styles/NotificationModal.css";

export default function NotificationModal({ message, show, closeModal }) {
  if (show !== true) {
    return null;
  }
  return (
    <div className="NotificationModal">
      <p className="modal-text">{message}</p>
      <p className="modal-close" onClick={closeModal}>
        &times;
      </p>
    </div>
  );
}
