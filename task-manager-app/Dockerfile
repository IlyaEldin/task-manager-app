FROM node:24-alpine AS development

WORKDIR /app

# Копируем package.json
COPY package.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

EXPOSE 5173

# Запускаем dev сервер
CMD ["npm", "run", "dev"]