# 🕊️ GuiltyFree - 罪悪感を和らげるAI

キャリアコンサルタントの視点から、あなたの罪悪感を優しく和らげるAIアプリケーションです。

## ✨ 特徴

- **AI駆動の分析**: Google Gemini APIを使用した高度な感情分析
- **多角的なアドバイス**: 共感、事実整理、別視点、認知の歪み指摘、自己肯定の5つの観点
- **履歴管理**: 過去の相談内容を保存・閲覧可能
- **美しいUI**: Tailwind CSS + Framer Motionによる洗練されたデザイン
- **レスポンシブ**: スマートフォン、タブレット、デスクトップに最適化

## 🛠️ 技術スタック

- **フロントエンド**: Next.js 14 (App Router), React 18.3, TypeScript 5
- **スタイリング**: Tailwind CSS, Framer Motion
- **AI**: Google Gemini API (gemini-1.5-flash)
- **データベース**: Supabase
- **デプロイ**: Vercel

## 📋 セットアップ手順

### 1. リポジトリのクローン

```bash
git clone https://github.com/tomota53/guilty-free.git
cd guilty-free
```

### 2. 依存パッケージのインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Gemini API
GEMINI_API_KEY=your_gemini_api_key_here
```

#### Gemini APIキーの取得方法

1. [Google AI Studio](https://aistudio.google.com/app/apikey) にアクセス
2. 「Create API Key」をクリック
3. 既存のGoogle Cloudプロジェクトを選択、または新規作成
4. APIキーをコピーして `.env.local` に貼り付け

#### Supabaseの設定

1. [Supabase](https://supabase.com) でプロジェクトを作成
2. SQL Editorで以下のSQLを実行：

```sql
-- consultationsテーブル作成
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  guilt_content TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX idx_consultations_created_at ON consultations(created_at DESC);
CREATE INDEX idx_consultations_user_id ON consultations(user_id);

-- RLSポリシー（認証なしで使える設定）
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert consultations"
  ON consultations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view consultations"
  ON consultations FOR SELECT
  USING (true);
```

3. プロジェクトのURLとAnon Keyを `.env.local` に設定

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## 🚀 デプロイ

### Vercelへのデプロイ

1. [Vercel](https://vercel.com) にログイン
2. GitHubリポジトリをインポート
3. 環境変数を設定（`.env.local` の内容）
4. デプロイ

## 📱 使い方

1. **相談する**: テキストエリアに罪悪感を入力
2. **AI分析**: 「相談する」ボタンをクリック
3. **アドバイスを受け取る**: AIからの多角的なアドバイスを確認
4. **履歴を見る**: 過去の相談内容を振り返る

## 🎯 利用シーン

- 有給を取った時
- 飲み会を断った時
- 副業・趣味に時間を使った時
- 子供を預けて自分の時間を持った時
- NOと言った時
- お金を自分のために使った時

## 🔒 プライバシー

- 入力された内容はSupabaseに保存されます
- Gemini APIでの処理は一時的なもので、Googleに学習データとして使用されることはありません
- 個人を特定できる情報は収集していません

## 📄 ライセンス

MIT License

## 🙏 謝辞

このアプリは、真面目で責任感の強い全ての人々のために作られました。
自分を大切にすることは、決して悪いことではありません。

---

💙 泣くことは弱さじゃない。感情をケアすることは、強さです。

Powered by Gemini AI
