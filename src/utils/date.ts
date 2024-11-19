export function formatDateToShort(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  return formattedDate;
}

export function daysToToday(dateString: string): number {
  const date = new Date(dateString);
  const today = new Date();
  const differenceInTime = today.getTime() - date.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

  return differenceInDays;
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate); // Parse the ISO date
  const day = String(date.getDate()).padStart(2, "0"); // Extract and pad day
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Extract and pad month
  const year = date.getFullYear(); // Extract year

  return `${day}/${month}/${year}`;
}
