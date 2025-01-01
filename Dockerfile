FROM node:18.16.0-alpine

WORKDIR /usr/src/app

# package.json と package-lock.json をコピー
COPY client/package*.json ./

# npm 依存関係をインストール (互換性のために TypeScript を固定)
RUN npm install typescript@4.9.5
RUN npm install

# アプリケーションのソースコードをコピー
COPY client .

CMD ["npm", "start"]
