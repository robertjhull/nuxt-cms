export default function () {
  const parse = (datetime: string) => {
    let date = new Date(datetime);
    if (isNaN(date.getTime())) date = new Date();
    return date;
  };

  const formatLongDate = (datetime: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(parse(datetime));
  };

  const formatShortDate = (datetime: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(parse(datetime));
  };

  return { formatShortDate, formatLongDate };
}
