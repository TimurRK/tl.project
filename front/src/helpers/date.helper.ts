export const ONE_DAY_IN_MILISECONDS: number = 24 * 60 * 60 * 1000;

export function toDate(value: string) {
  if (!value) {
    return value;
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return value;
  }

  let result = "";

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  result += day < 10 ? `0${day}.` : `${day}.`;
  result += month < 10 ? `0${month}.` : `${month}.`;
  result += `${year}`;

  return result;
}

export function toDateTime(value: string) {
  const date = new Date(value);
  let result = "";

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  result += day < 10 ? `0${day}.` : `${day}.`;
  result += month < 10 ? `0${month}.` : `${month}.`;
  result += `${year}`;
  result += " ";
  result += hours < 10 ? `0${hours}:` : `${hours}:`;
  result += minutes < 10 ? `0${minutes}` : `${minutes}`;

  return result;
}

export function toBlogDateTime(value: string) {
  const targetDate = new Date(value);
  const currentDate = new Date();

  const targetDay = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  ).valueOf();
  const currentDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  ).valueOf();

  let result = "";

  const day = targetDate.getDate();
  const month = targetDate.getMonth() + 1;
  const year = targetDate.getFullYear();
  const hours = targetDate.getHours();
  const minutes = targetDate.getMinutes();

  if (targetDay === currentDay) {
    result += "Сегодня в ";
  } else if (targetDay === currentDay - ONE_DAY_IN_MILISECONDS) {
    result += "Вчера в ";
  } else if (targetDay === currentDay + ONE_DAY_IN_MILISECONDS) {
    result += "Завтра в ";
  } else {
    result += day < 10 ? `0${day}.` : `${day}.`;
    result += month < 10 ? `0${month}.` : `${month}.`;
    result += `${year}`;
    result += ` в `;
  }

  result += hours < 10 ? `0${hours}:` : `${hours}:`;
  result += minutes < 10 ? `0${minutes}` : `${minutes}`;

  return result;
}
