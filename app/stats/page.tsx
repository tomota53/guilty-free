'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface StatsData {
  total: number;
  categoryStats: Record<string, number>;
  monthlyStats: Record<string, number>;
  recentCategoryStats: Record<string, number>;
  recentTotal: number;
}

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = [
    { value: 'work', label: '仕事', icon: '💼', color: 'bg-blue-500' },
    { value: 'family', label: '家族', icon: '👨‍👩‍👧‍👦', color: 'bg-green-500' },
    { value: 'self', label: '自分の時間', icon: '⏰', color: 'bg-purple-500' },
    { value: 'money', label: 'お金', icon: '💰', color: 'bg-yellow-500' },
    { value: 'other', label: 'その他', icon: '📝', color: 'bg-gray-500' },
  ];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '統計の取得に失敗しました');
      }

      setStats(data);
    } catch (error: any) {
      console.error('統計取得エラー:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryLabel = (value: string) => {
    return categories.find((c) => c.value === value)?.label || 'その他';
  };

  const getCategoryIcon = (value: string) => {
    return categories.find((c) => c.value === value)?.icon || '📝';
  };

  const getCategoryColor = (value: string) => {
    return categories.find((c) => c.value === value)?.color || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white"
          >
            📊 統計・分析
          </motion.h1>
          <Link
            href="/"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition-all text-sm md:text-base shadow-lg"
          >
            ← 戻る
          </Link>
        </div>

        {/* 注意事項 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
        >
          <p className="text-xs md:text-sm text-blue-800 dark:text-blue-300 flex items-start gap-2">
            <span className="text-base">ℹ️</span>
            <span>
              この統計には全ユーザーの相談データが含まれています。個人を特定できる情報は含まれていません。
            </span>
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">読み込み中...</p>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center"
          >
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </motion.div>
        ) : stats ? (
          <div className="space-y-6">
            {/* 全体の統計 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                📈 全体の統計
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">総相談数</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.total}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    直近30日の相談数
                  </p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {stats.recentTotal}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* カテゴリ別統計 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                📁 カテゴリ別統計
              </h2>
              <div className="space-y-3">
                {Object.entries(stats.categoryStats || {})
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, count]) => {
                    const maxCount = Math.max(...Object.values(stats.categoryStats || {}));
                    const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

                    return (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {getCategoryIcon(category)} {getCategoryLabel(category)}
                          </span>
                          <span className="text-sm font-bold text-gray-800 dark:text-white">
                            {count}回
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className={`h-full ${getCategoryColor(category)} rounded-full`}
                          ></motion.div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </motion.div>

            {/* 直近30日の傾向 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                🔍 直近30日の傾向
              </h2>
              {stats.recentTotal === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                  まだデータがありません
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(stats.recentCategoryStats || {})
                    .sort((a, b) => b[1] - a[1])
                    .map(([category, count]) => (
                      <div
                        key={category}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 text-center"
                      >
                        <p className="text-2xl mb-1">{getCategoryIcon(category)}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {getCategoryLabel(category)}
                        </p>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                          {count}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </motion.div>

            {/* インサイト */}
            {stats.total > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  💡 インサイト
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  {Object.keys(stats.categoryStats || {}).length > 0 && (
                    <p>
                      最も多く感じている罪悪感は「
                      {getCategoryLabel(
                        Object.entries(stats.categoryStats || {}).sort((a, b) => b[1] - a[1])[0][0]
                      )}
                      」に関するものです。
                    </p>
                  )}
                  <p>
                    自分の感情をケアすることは、とても大切です。罪悪感を感じたときは、いつでもここに戻ってきてくださいね。
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            まだ相談データがありません
          </p>
        )}
      </div>
    </div>
  );
}
