'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [guiltContent, setGuiltContent] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  // カテゴリーの定義
  const categories = [
    { value: 'work', label: '仕事', icon: '💼' },
    { value: 'family', label: '家族', icon: '👨‍👩‍👧‍👦' },
    { value: 'self', label: '自分の時間', icon: '⏰' },
    { value: 'money', label: 'お金', icon: '💰' },
    { value: 'other', label: 'その他', icon: '📝' },
  ];

  // 定型テンプレート
  const templates = [
    { category: 'work', text: '有給を取って罪悪感がある' },
    { category: 'work', text: '定時で帰って罪悪感がある' },
    { category: 'work', text: '飲み会を断って罪悪感がある' },
    { category: 'family', text: '子供を預けて自分の時間を持って罪悪感がある' },
    { category: 'family', text: '親の世話を十分にできていなくて罪悪感がある' },
    { category: 'self', text: '趣味に時間を使って罪悪感がある' },
    { category: 'self', text: '休日にゆっくりして罪悪感がある' },
    { category: 'money', text: '自分のためにお金を使って罪悪感がある' },
    { category: 'money', text: '欲しいものを買って罪悪感がある' },
  ];

  // ページ読み込み時に入力エリアにフォーカス
  useEffect(() => {
    if (!aiResponse && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [aiResponse]);

  // AI応答のタイピングアニメーション
  useEffect(() => {
    if (!aiResponse) {
      setDisplayedResponse('');
      return;
    }

    let currentIndex = 0;
    setDisplayedResponse('');

    const typingInterval = setInterval(() => {
      if (currentIndex < aiResponse.length) {
        setDisplayedResponse(aiResponse.slice(0, currentIndex + 1));
        currentIndex++;

        // スクロール
        if (responseRef.current) {
          responseRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        clearInterval(typingInterval);
      }
    }, 20); // 20msごとに1文字追加

    return () => clearInterval(typingInterval);
  }, [aiResponse]);

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
            category: selectedCategory,
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
    setSelectedCategory('');
  };

  const handleTemplateSelect = (template: string) => {
    setGuiltContent(template);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleShareTwitter = () => {
    const text = `GuiltyFreeで罪悪感を和らげました 🕊️\n\n自分を大切にすることは、悪いことではありません。\n\n#GuiltyFree #罪悪感 #セルフケア`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleShareLine = () => {
    const text = `GuiltyFreeで罪悪感を和らげました 🕊️\n\n自分を大切にすることは、悪いことではありません。`;
    const url = `https://line.me/R/msg/text/?${encodeURIComponent(text)}`;
    window.open(url, '_blank');
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
          <div className="mt-4 flex gap-4 justify-center">
            <Link
              href="/history"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              📚 相談履歴を見る
            </Link>
            <Link
              href="/stats"
              className="text-purple-600 dark:text-purple-400 hover:underline text-sm"
            >
              📊 統計・分析
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

                {/* カテゴリー選択 */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">カテゴリーを選択（任意）</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setSelectedCategory(cat.value === selectedCategory ? '' : cat.value)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedCategory === cat.value
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {cat.icon} {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 定型テンプレート */}
                {selectedCategory && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">よくある罪悪感</p>
                    <div className="flex flex-wrap gap-2">
                      {templates
                        .filter((t) => t.category === selectedCategory)
                        .map((template, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleTemplateSelect(template.text)}
                            className="px-3 py-2 rounded-lg text-sm bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all"
                          >
                            {template.text}
                          </button>
                        ))}
                    </div>
                  </motion.div>
                )}

                <textarea
                  ref={textareaRef}
                  value={guiltContent}
                  onChange={(e) => {
                    setGuiltContent(e.target.value);
                    setError('');
                  }}
                  placeholder="例：有給を取って罪悪感がある"
                  className="w-full h-40 md:h-48 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none text-base md:text-lg transition-all"
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

                {/* ローディングプログレスバー */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4"
                  >
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-progress"></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                      AIが分析中です...
                    </p>
                  </motion.div>
                )}

                {/* 注意事項 */}
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-xs md:text-sm text-yellow-800 dark:text-yellow-300 flex items-start gap-2">
                    <span className="text-base">⚠️</span>
                    <span>
                      <strong>注意:</strong> 相談内容は他のユーザーも閲覧できる可能性があります。個人情報（氏名、住所、電話番号など）は絶対に入力しないでください。
                    </span>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 md:py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg text-base md:text-lg"
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

                <div ref={responseRef} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6">
                  <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed text-base md:text-lg">
                    {displayedResponse}
                    {displayedResponse.length < aiResponse.length && (
                      <span className="inline-block w-1 h-5 bg-blue-600 dark:bg-blue-400 ml-1 animate-pulse"></span>
                    )}
                  </p>
                </div>

                {/* 共有ボタン */}
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={handleShareTwitter}
                    className="flex-1 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg text-sm md:text-base flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Xでシェア
                  </button>
                  <button
                    onClick={handleShareLine}
                    className="flex-1 bg-[#00B900] hover:bg-[#00a000] text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg text-sm md:text-base flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.771.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                    </svg>
                    LINEでシェア
                  </button>
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
