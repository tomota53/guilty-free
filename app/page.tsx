'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [guiltContent, setGuiltContent] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guiltContent.trim()) {
      setError('罪悪感の内容を入力してください');
      return;
    }

    setIsLoading(true);
    setAiResponse('');
    setError('');

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guiltContent }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'エラーが発生しました');
      }

      setAiResponse(data.response);

      // Supabaseに保存
      try {
        await fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            guiltContent,
            aiResponse: data.response,
            userId: null, // 認証実装後はauth.user.idを使用
          }),
        });
      } catch (saveError) {
        // 保存失敗してもエラーは表示しない（UXを損ねないため）
        console.error('保存エラー:', saveError);
      }

    } catch (error: any) {
      console.error('エラー:', error);
      setError(error.message || 'エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGuiltContent('');
    setAiResponse('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">

        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4">
            🕊️ GuiltyFree
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
            罪悪感を和らげるAI
          </p>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2">
            キャリアコンサルタントの視点から、あなたの心を軽くします
          </p>
          <div className="mt-4">
            <Link
              href="/history"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              📚 相談履歴を見る
            </Link>
          </div>
        </motion.div>

        {/* メインコンテンツ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8"
        >
          <AnimatePresence mode="wait">
            {!aiResponse ? (
              // 入力フォーム
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
              >
                <label className="block text-lg md:text-xl font-medium text-gray-700 dark:text-gray-200 mb-4">
                  今、どんな罪悪感を感じていますか？
                </label>

                <textarea
                  value={guiltContent}
                  onChange={(e) => {
                    setGuiltContent(e.target.value);
                    setError('');
                  }}
                  placeholder="例：有給を取って罪悪感がある"
                  className="w-full h-40 md:h-48 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none text-base md:text-lg transition-all"
                  disabled={isLoading}
                />

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-red-600 dark:text-red-400 text-sm"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 md:py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg text-base md:text-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      分析中...
                    </span>
                  ) : '相談する'}
                </button>

                <p className="mt-4 text-xs md:text-sm text-gray-500 dark:text-gray-400 text-center">
                  💡 あなたの気持ちを正直に書いてください。AIが優しく寄り添います。
                </p>
              </motion.form>
            ) : (
              // AI応答表示
              <motion.div
                key="response"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                    <span className="text-white text-2xl">🤖</span>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
                      AIからのメッセージ
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      キャリアコンサルタントの視点から
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6">
                  <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed text-base md:text-lg">
                    {aiResponse}
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 md:py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg text-base md:text-lg"
                >
                  新しい相談をする
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* フッター */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 space-y-2"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            💙 泣くことは弱さじゃない。感情をケアすることは、強さです。
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs md:text-sm">
            Powered by Gemini AI
          </p>
        </motion.div>
      </div>
    </div>
  );
}
