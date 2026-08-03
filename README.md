# 旅ノート API

旅行記録アプリ「旅ノート」のバックエンド API。

## 概要

ユーザーが旅行の記録を作成・共有できる Web アプリの API サーバー。
個人開発のポートフォリオとして制作。

フロントエンドリポジトリ: [tabi-note-front](https://github.com/kiskm/tabi-note-front)

## 主な機能

- ユーザー登録・ログイン（JWT 認証）
- 旅行記の作成・編集・削除（エリア・期間・予算・ステータス管理）
- スポットの作成・編集・削除・訪問チェック切り替え
- 費用の記録・編集・削除（カテゴリ別）
- 参加者の追加・編集・削除

## 技術スタック

| カテゴリ       | 採用技術                    |
| -------------- | --------------------------- |
| 言語           | TypeScript                  |
| フレームワーク | NestJS                      |
| ORM            | TypeORM                     |
| DB             | PostgreSQL                  |
| 認証           | JWT (Passport)、bcrypt      |
| コンテナ       | Docker                      |
| CI             | GitHub Actions              |

## 技術選定の理由

### NestJS を選んだ理由

TODO

### TypeORM を選んだ理由

（同上）

## セットアップ

### 必要環境

- Node.js v24 以上
- PostgreSQL 15 以上

### 手順

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run start:dev
```

DB接続情報などは環境変数で設定します（未設定時は下記のデフォルト値で動作）。

| 環境変数    | 説明               | デフォルト値  |
| ----------- | ------------------ | ------------- |
| PORT        | APIのポート番号    | 8000          |
| DB_HOST     | DBホスト           | localhost     |
| DB_PORT     | DBポート           | 5432          |
| DB_USER     | DBユーザー         | tabi_user     |
| DB_PASSWORD | DBパスワード       | password      |
| DB_NAME     | DB名               | tabi_note     |
| JWT_SECRET  | JWT署名用シークレット | dev-secret |

テーブルは TypeORM の `synchronize` により起動時に自動作成されます（マイグレーション不要）。

### Docker での起動

リポジトリルート（[tabi-note-deploy](https://github.com/kiskm/tabi-note-deploy)）の `docker-compose.yml` から、DB・API・フロントエンドをまとめて起動できます。

```bash
docker compose up
```

## API エンドポイント

認証が必要なエンドポイントは `Authorization: Bearer <accessToken>` ヘッダーが必須です（`/auth/register`, `/auth/login` を除く）。

| Method | Path                        | 説明                     | 認証 |
| ------ | --------------------------- | ------------------------ | :--: |
| POST   | /auth/register              | ユーザー登録             |      |
| POST   | /auth/login                 | ログイン                 |      |
| GET    | /auth/me                    | ログイン中ユーザー情報取得 | ✓  |
| GET    | /trips                      | 旅行記一覧取得           | ✓  |
| POST   | /trips                      | 旅行記作成               | ✓  |
| GET    | /trips/:id                  | 旅行記詳細取得           | ✓  |
| PATCH  | /trips/:id                  | 旅行記更新               | ✓  |
| DELETE | /trips/:id                  | 旅行記削除               | ✓  |
| POST   | /trips/:tripId/spots        | スポット作成             | ✓  |
| PATCH  | /spots/:id                  | スポット更新             | ✓  |
| PATCH  | /spots/:id/check            | スポットチェック切り替え | ✓  |
| DELETE | /spots/:id                  | スポット削除             | ✓  |
| POST   | /trips/:tripId/expenses     | 費用作成                 | ✓  |
| PATCH  | /expenses/:id                | 費用更新                 | ✓  |
| DELETE | /expenses/:id                | 費用削除                 | ✓  |
| POST   | /trips/:tripId/participants | 参加者作成               | ✓  |
| PATCH  | /participants/:id            | 参加者更新               | ✓  |
| DELETE | /participants/:id            | 参加者削除               | ✓  |

## 今後の改善予定
