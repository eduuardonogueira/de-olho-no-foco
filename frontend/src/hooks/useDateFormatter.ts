export const useDateFormartter = (date: string | Date) => {
  const entryDate = new Date(date);

  const formattedDate = entryDate.toLocaleString("pt-BR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formattedDate;
};
