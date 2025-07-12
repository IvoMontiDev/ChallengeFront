function formatDate(dateString: string | Date): string {
  const date = typeof dateString === "string"
    ? new Date(dateString)
    : dateString;

  return new Intl.DateTimeFormat("es-ES", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
    hour:  "2-digit",
    minute:"2-digit"
  }).format(date);
}

export default formatDate;