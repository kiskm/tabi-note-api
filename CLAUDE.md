# tabi-note-api — Claude Context

## 概要

旅行メモアプリ「tabi-note」のバックエンド API。NestJS + TypeORM + PostgreSQL で構成。

## 技術スタック

| 項目 | 内容 |
|-----|------|
| フレームワーク | NestJS 11 |
| ORM | TypeORM 0.3.28 |
| DB | PostgreSQL 15 |
| バリデーション | class-validator |
| ポート | 8000 |

## ドメイン構成

| モジュール | エンティティ | 説明 |
|----------|-----------|------|
| TripsModule | Trip | 旅行（trips テーブル） |
| SpotsModule | Spot | スポット（spots テーブル） |
| ExpensesModule | Expense | 費用（expenses テーブル） |

## エンドポイント概要

詳細は `../docs/api-design.md` を参照。

| メソッド | パス | 説明 |
|---------|-----|------|
| GET/POST | `/trips` | 旅行一覧・作成 |
| GET/PATCH/DELETE | `/trips/:id` | 旅行詳細・更新・削除 |
| POST | `/trips/:tripId/spots` | スポット作成 |
| PATCH/DELETE | `/spots/:id` | スポット更新・削除 |
| PATCH | `/spots/:id/check` | チェック状態トグル |
| POST | `/trips/:tripId/expenses` | 費用作成 |
| PATCH/DELETE | `/expenses/:id` | 費用更新・削除 |

## DB 設計

詳細は `../docs/db-design.md` を参照。

- Trip → Spot: OneToMany（CASCADE DELETE）
- Trip → Expense: OneToMany（CASCADE DELETE）
- `synchronize: true` で自動マイグレーション（開発用）

## 注意事項

- `synchronize: true` は本番では無効化すること
- CORS は現状 `http://localhost:3000` のみ許可
- バリデーションは `whitelist: true`（未定義フィールドは除去）

## ローカル起動

```bash
# Docker Compose（推奨）
cd ../  # tabi-note-deploy
docker compose up api db

# 単体起動
npm run start:dev
```
