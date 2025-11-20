import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const { guiltContent } = await request.json();

    if (!guiltContent || guiltContent.trim() === '') {
      return NextResponse.json(
        { error: '罪悪感の内容を入力してください' },
        { status: 400 }
      );
    }

    // Gemini API初期化
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini APIキーが設定されていません' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // プロンプト設計
    const prompt = `
あなたは優しく、でも論理的に罪悪感を和らげる、経験豊富なキャリアコンサルタントAIです。

ユーザーが感じている罪悪感：
「${guiltContent}」

以下の5つの観点から、罪悪感を和らげるアドバイスをしてください：

1. 【共感する】
   まず、ユーザーの気持ちに深く寄り添い、共感を示してください。
   「その気持ち、すごくわかります」「〜と感じるのは自然なことです」など。

2. 【事実を整理する】
   本当に「悪いこと」をしたのか、客観的に事実を整理してください。
   感情と事実を分けて考えましょう。

3. 【別の視点を提供する】
   罪悪感を感じる必要がない理由を、複数の視点から提示してください：
   - 権利としての正当性（有給は権利、など）
   - 長期的なメリット（リフレッシュ→仕事の質向上、など）
   - 他者への影響の実態（本当に迷惑だったのか？）

4. 【認知の歪みを指摘する】
   もし以下のような認知の歪みがあれば、優しく指摘してください：
   - 過度な一般化（「いつも迷惑をかけている」）
   - べき思考（「〜すべき」「〜でなければならない」）
   - 自己責任の過大評価（自分のせいにしすぎ）
   - 破滅的思考（最悪の結果を想像しすぎ）

5. 【自分を許す言葉をかける】
   最後に、自分を許し、前を向くための温かい言葉をかけてください。
   「あなたは十分頑張っています」「自分を大切にすることは、悪いことではありません」など。

【重要な指示】
- トーン：優しく寄り添う、でも甘やかしすぎない、論理的で説得力がある
- 文字数：500-800文字程度
- 形式：見出しや箇条書きは使わず、自然な文章で書いてください
- 語りかけるように、温かみのある表現を使ってください
- キャリアコンサルタントとしての専門性を活かした内容にしてください

それでは、ユーザーの罪悪感に対して、心からのアドバイスをお願いします。
`;

    // AI応答生成
    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    return NextResponse.json({
      response: aiResponse,
      success: true
    });

  } catch (error: any) {
    console.error('AI分析エラー:', error);

    // エラーの詳細をログに出力
    if (error.message) {
      console.error('エラーメッセージ:', error.message);
    }

    return NextResponse.json(
      {
        error: 'AI分析に失敗しました。時間をおいて再度お試しください。',
        details: error.message
      },
      { status: 500 }
    );
  }
}
