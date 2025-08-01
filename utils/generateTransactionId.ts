export const generateTransactionId = (): string => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // e.g. "24"
  const month = String(now.getMonth() + 1).padStart(2, "0"); // e.g. "08"
  const day = String(now.getDate()).padStart(2, "0"); // e.g. "01"
  const time = now.getTime().toString().slice(-5); // last 5 digits of timestamp for uniqueness

  return `TRX-${year}${month}${day}-${time}`;
};
