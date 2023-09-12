export const getDate = (time) => {
  // Создаем объект Date на основе Unix-времени
  const date = new Date(time);

  // Получаем дату и время в нужном формате
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Форматируем результат в формат dd.mm hh.mm и выводим
  const formattedDate = `${day}.${month} ${hours}:${minutes}`;

  return formattedDate;
};
