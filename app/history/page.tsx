'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Consultation {
  id: string;
  guilt_content: string;
  ai_response: string;
  category: string | null;
  created_at: string;
}

export default function HistoryPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = [
    { value: 'work', label: '仕事', icon: '💼' },
    { value: 'family', label: '家族', icon: '👨‍👩‍👧‍👦' },
    { value: 'self', label: '自分の時間', icon: '⏰' },
    { value: 'money', label: 'お金', icon: '💰' },
    { value: 'other', label: 'その他', icon: '📝' },
  ];

  const getCategoryLabel = (value: string | null) => {
    if (!value) return null;
    return categories.find((c) => c.value === value);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      setConsultations(data || []);
    } catch (error: any) {
      console.error('履歴取得エラー:', error);
      setError('履歴の取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">

        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white"
          >
            📚 相談履歴
          </motion.h1>
          <Link
            href="/"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition-all text-sm md:text-base shadow-lg"
          >
            ← 戻る
          </Link>
        </div>

        {/* コンテンツ */}
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
        ) : consultations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              まだ相談履歴がありません
            </p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all shadow-lg"
            >
              最初の相談をする
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {consultations.map((consultation, index) => (
              <motion.div
                key={consultation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {new Date(consultation.created_at).toLocaleString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    {consultation.category && getCategoryLabel(consultation.category) && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                        {getCategoryLabel(consultation.category)?.icon} {getCategoryLabel(consultation.category)?.label}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1">
                    あなたの相談:
                  </p>
                  <p className="text-gray-800 dark:text-white font-medium text-base md:text-lg">
                    {consultation.guilt_content}
                  </p>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-2">
                    AIからのアドバイス:
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-3">
                    {consultation.ai_response}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
