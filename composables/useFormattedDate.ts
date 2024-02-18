export default function () {
  const parse = (datetime: string) => {
    const date = new Date(datetime);
    if (isNaN(date.getTime())) throw new Error();
    return date;
  };

  const formatDate = (datetime: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(parse(datetime));
  };

  return { formatDate };
}
