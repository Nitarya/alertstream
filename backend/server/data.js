const notifications = [
  { id: "101", type: "security", message: "New login detected from unknown IP", isRead: false, timestamp: "2026-07-27T10:15:00Z" },
  { id: "102", type: "system", message: "Scheduled database maintenance at midnight", isRead: true, timestamp: "2026-07-26T18:30:00Z" },
  { id: "103", type: "billing", message: "Invoice #4821 payment successfully processed", isRead: false, timestamp: "2026-07-27T11:00:00Z" },
  { id: "104", type: "feature", message: "New API rate-limiting rules are now active", isRead: false, timestamp: "2026-07-25T14:20:00Z" }
];

function getAll(unreadOnly) {
  if (unreadOnly) return notifications.filter(n => !n.isRead);
  return notifications;
}

function getById(id) {
  return notifications.find(n => n.id === id);
}

function markAsRead(id) {
  const idx = notifications.findIndex(n => n.id === id);
  if (idx === -1) return { status: 404, error: "Notification not found" };
  if (notifications[idx].isRead) return { status: 400, error: "Notification already marked as read" };
  notifications[idx].isRead = true;
  return { status: 200, data: notifications[idx] };
}

export { getAll, getById, markAsRead };
