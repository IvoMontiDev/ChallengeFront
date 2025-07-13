export default function formatDate(dateStr: string): string {

  if (dateStr.includes(' de ') && dateStr.includes(':')) {
    return dateStr;
  }

  const regex = /^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})$/;
  const parts = dateStr.match(regex);

  let date: Date;
  if (parts) {
    const [, ddStr, mmStr, yyyyStr, HHStr, iiStr] = parts;
    const dd = parseInt(ddStr, 10);
    const mm = parseInt(mmStr, 10);
    const yyyy = parseInt(yyyyStr, 10);
    const HH = parseInt(HHStr, 10);
    const ii = parseInt(iiStr, 10);

    // trnasform to local time
    date = new Date(Date.UTC(yyyy, mm - 1, dd, HH, ii));
  } else {
    // 2) if dont match, try parse as ISO/ECMAScript
    const timestamp = Date.parse(dateStr);
    if (isNaN(timestamp)) {
      console.error("Formato de fecha no reconocido:", dateStr);
      return "Fecha inválida";
    }
    date = new Date(timestamp);
  }

  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}
