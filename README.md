# 旅ノート API

旅行記録アプリ「旅ノート」のバックエンド API。

## 概要

ユーザーが旅行の記録を作成・共有できる Web アプリの API サーバー。
個人開発のポートフォリオとして制作。

フロントエンドリポジトリ: [tabi-note-front](https://github.com/kiskm/tabi-note-front)

## 主な機能

- 旅行記の作成・編集・削除

## 技術スタック

| カテゴリ       | 採用技術   |
| -------------- | ---------- |
| 言語           | TypeScript |
| フレームワーク | NestJS     |
| ORM            | TypeORM    |
| DB             | PostgreSQL |

## 技術選定の理由

### NestJS を選んだ理由

TODO

### TypeORM を選んだ理由

（同上）

## セットアップ

### 必要環境

- Node.js v20 以上
- PostgreSQL 15 以上

### 手順

```bash
# 依存関係インストール
npm install

# 環境変数ファイル作成
cp .env.example .env
# .env を編集してDB接続情報などを設定

# DB マイグレーション
npm run migration:run

# 開発サーバー起動
npm run start:dev
```

## API エンドポイント

| Method | Path                    | 説明                     |
| ------ | ----------------------- | ------------------------ |
| GET    | /trips                  | 旅行記一覧取得           |
| POST   | /trips                  | 旅行記作成               |
| GET    | /trips/:id              | 旅行記詳細取得           |
| PATCH  | /trips/:id              | 旅行記更新               |
| DELETE | /trips/:id              | 旅行記削除               |
| POST   | /trips/:tripId/spots    | スポット作成             |
| PATCH  | /spots/:id              | スポット更新             |
| PATCH  | /spots/:id/check        | スポットチェック切り替え |
| DELETE | /trips/:id              | スポット削除             |
| POST   | /trips/:tripId/expenses | 費用作成                 |
| PATCH  | /expenses/:id           | 費用更新                 |
| DELETE | /expenses/:id           | 費用削除                 |

## 今後の改善予定

- [ ] Dockerization
- [ ] AWS EC2 へのデプロイ
- [ ] Terraform によるインフラ管理
- [ ] GitHub Actions による CI/CD パイプライン構築
