FROM node:24-alpine

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем исходный код
COPY . .

# Создаем директорию для данных
RUN mkdir -p /app/data

# Volume для постоянного хранения БД
VOLUME /app/data

EXPOSE 3001

# Используем npm start как в вашем package.json
CMD ["npm", "start"]