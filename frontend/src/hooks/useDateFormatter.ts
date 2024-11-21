import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

export const useDateFormatter = () => {
  function dateFormatter(date: string | Date) {
    const entryDate = new Date(date);

    const formattedDate = entryDate.toLocaleString("pt-BR", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return formattedDate;
  }

  function getRelativeTime(date: string | Date) {
    dayjs.extend(relativeTime);
    dayjs.locale("pt-br");

    const diffInMinutes = dayjs().diff(dayjs(date), "minute");

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
  }

  return { dateFormatter, getRelativeTime };
};
