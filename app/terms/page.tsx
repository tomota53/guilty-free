'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TermsPage() {
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
            📋 利用規約・免責事項
          </motion.h1>
          <Link
            href="/"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition-all text-sm md:text-base shadow-lg"
          >
            ← 戻る
          </Link>
        </div>

        {/* コンテンツ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 space-y-8"
        >

          {/* 重要な免責事項 */}
          <section className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
            <h2 className="text-xl md:text-2xl font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              重要な免責事項
            </h2>
            <div className="space-y-3 text-sm md:text-base text-red-900 dark:text-red-200">
              <p className="font-semibold">
                GuiltyFree（以下「本サービス」）は、AI技術を使用した感情サポートツールです。以下の点を必ずご理解の上、ご利用ください。
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>本サービスは医療行為ではありません</strong>。AIによる回答は一般的な助言であり、医療診断や治療を目的としたものではありません。</li>
                <li><strong>専門家の代替ではありません</strong>。心理的な問題や精神的な苦痛を抱えている場合は、必ず医師、臨床心理士、カウンセラーなどの専門家にご相談ください。</li>
                <li><strong>緊急時は専門機関へ</strong>。自殺念慮や自傷行為の衝動がある場合は、直ちに専門機関に連絡してください。</li>
                <li><strong>AIの限界</strong>。AIは人間の感情を完全に理解することはできません。回答の正確性や適切性を保証するものではありません。</li>
              </ul>
            </div>
          </section>

          {/* 緊急連絡先 */}
          <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h2 className="text-xl md:text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">
              📞 緊急時の連絡先
            </h2>
            <div className="space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold">いのちの電話</p>
                <p className="ml-4">📞 0570-783-556（ナビダイヤル）</p>
                <p className="ml-4 text-xs text-gray-600 dark:text-gray-400">毎日10:00～22:00</p>
              </div>
              <div>
                <p className="font-semibold">よりそいホットライン</p>
                <p className="ml-4">📞 0120-279-338（無料）</p>
                <p className="ml-4 text-xs text-gray-600 dark:text-gray-400">24時間対応</p>
              </div>
              <div>
                <p className="font-semibold">こころの健康相談統一ダイヤル</p>
                <p className="ml-4">📞 0570-064-556</p>
                <p className="ml-4 text-xs text-gray-600 dark:text-gray-400">各都道府県・政令指定都市が実施（対応時間は地域により異なる）</p>
              </div>
            </div>
          </section>

          {/* サービス内容 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">
              1. サービス内容
            </h2>
            <div className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <p>本サービスは、Google Gemini AIを使用して、ユーザーが感じる罪悪感に対して、キャリアコンサルタントの視点から一般的な助言を提供するものです。</p>
              <p>本サービスは情報提供および教育目的のみを意図しており、医療、心理療法、カウンセリング、法律相談、その他専門的なサービスの代替となるものではありません。</p>
            </div>
          </section>

          {/* 利用条件 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">
              2. 利用条件
            </h2>
            <div className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <p>本サービスをご利用いただくにあたり、以下の条件に同意いただいたものとみなします。</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>本サービスは18歳以上の方を対象としています。</li>
                <li>本サービスの利用は、ユーザー自身の責任において行うものとします。</li>
                <li>本サービスの回答内容を鵜呑みにせず、自身の判断で行動してください。</li>
                <li>深刻な心理的問題がある場合は、必ず専門家に相談してください。</li>
              </ul>
            </div>
          </section>

          {/* 禁止事項 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">
              3. 禁止事項
            </h2>
            <div className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <p>本サービスの利用にあたり、以下の行為を禁止します。</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>虚偽の情報を入力すること</li>
                <li>他者になりすますこと</li>
                <li>本サービスを医療目的で使用すること</li>
                <li>本サービスの回答を専門的な医療アドバイスとして他者に提供すること</li>
                <li>法令に違反する行為</li>
                <li>公序良俗に反する行為</li>
                <li>本サービスの運営を妨害する行為</li>
              </ul>
            </div>
          </section>

          {/* 責任の制限 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">
              4. 責任の制限
            </h2>
            <div className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <p>本サービスの提供者は、以下について一切の責任を負いません。</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>本サービスのAI回答の正確性、完全性、有用性、信頼性</li>
                <li>本サービスの利用または利用不能により生じた損害</li>
                <li>本サービスのAI回答に基づいて行った行動により生じた結果</li>
                <li>本サービスの中断、停止、変更、終了</li>
                <li>第三者によるサービスの不正使用</li>
              </ul>
              <p className="mt-4 font-semibold">
                本サービスは「現状有姿」で提供され、明示的または黙示的ないかなる保証も行いません。
              </p>
            </div>
          </section>

          {/* プライバシーとデータの取り扱い */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">
              5. プライバシーとデータの取り扱い
            </h2>
            <div className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <p><strong>データの保存：</strong>本サービスは、ユーザーの相談内容や個人情報をデータベースに保存しません。入力されたデータはAI分析のためにGoogle Gemini APIに送信されますが、セッション終了後に消去されます。</p>
              <p><strong>Google Gemini APIの利用：</strong>本サービスはGoogle Gemini APIを使用しています。入力されたデータはGoogleのプライバシーポリシーに従って処理されます。</p>
              <p><strong>クッキー：</strong>本サービスは、サービスの機能向上のために最小限のクッキーを使用する場合があります。</p>
              <p><strong>個人情報の入力禁止：</strong>本サービスでは、氏名、住所、電話番号、メールアドレスなどの個人を特定できる情報を入力しないでください。</p>
            </div>
          </section>

          {/* AIの限界と注意事項 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">
              6. AIの限界と注意事項
            </h2>
            <div className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>AIは統計的なパターンに基づいて回答を生成するため、常に正確または適切な回答を提供できるとは限りません。</li>
                <li>AIは感情を持たず、人間のような共感や理解はできません。</li>
                <li>AIは過去のデータに基づいて学習しているため、バイアスが含まれる可能性があります。</li>
                <li>複雑な心理的問題や緊急性の高い問題には対応できません。</li>
                <li>AIの回答は一般的な助言であり、個々の状況に完全に適合しない場合があります。</li>
              </ul>
            </div>
          </section>

          {/* サービスの変更・終了 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">
              7. サービスの変更・終了
            </h2>
            <div className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <p>本サービスの提供者は、事前の通知なく本サービスの内容を変更、一時停止、または終了することができます。これにより生じたいかなる損害についても責任を負いません。</p>
            </div>
          </section>

          {/* 規約の変更 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">
              8. 規約の変更
            </h2>
            <div className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <p>本利用規約は、予告なく変更される場合があります。変更後の利用規約は、本ページに掲載された時点で効力を生じるものとします。</p>
            </div>
          </section>

          {/* 準拠法と管轄裁判所 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">
              9. 準拠法と管轄裁判所
            </h2>
            <div className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <p>本利用規約は日本法に準拠し、解釈されるものとします。本サービスに関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
            </div>
          </section>

          {/* お問い合わせ */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">
              10. お問い合わせ
            </h2>
            <div className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <p>本利用規約に関するご質問やご不明な点がございましたら、本サービスの管理者までお問い合わせください。</p>
            </div>
          </section>

          {/* 最終更新日 */}
          <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              最終更新日: {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>

        </motion.div>

        {/* 戻るボタン */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all shadow-lg"
          >
            ← トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
