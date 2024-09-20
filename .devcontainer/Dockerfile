# Alpine Linuxベースの最新バージョンnodeを採用
FROM node
# コンテナ内の作業ディレクトリ
WORKDIR /app

ENV LANG=C.UTF-8 \
 TZ=Asia/Tokyo

# ↓↓↓ここはまだコメントアウト(後ほど使用)↓↓↓
# COPY package.json yarn.lock ./

RUN yarn install

# 3000番でコンテナを公開
EXPOSE 5173