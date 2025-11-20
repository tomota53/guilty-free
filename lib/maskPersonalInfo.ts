/**
 * 個人情報をマスキングするユーティリティ関数
 * 電話番号、メールアドレス、郵便番号、住所などを検出して ***に置き換えます
 */

export function maskPersonalInfo(text: string): string {
  if (!text) return text;

  let maskedText = text;

  // 1. 電話番号のマスキング
  // 090-1234-5678, 03-1234-5678, 0312345678, (03)1234-5678 など
  maskedText = maskedText.replace(
    /(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{3,4}/g,
    (match) => {
      // 数字が10桁以上含まれていれば電話番号とみなす
      const digits = match.replace(/\D/g, '');
      if (digits.length >= 10) {
        return '[電話番号]';
      }
      return match;
    }
  );

  // 2. メールアドレスのマスキング
  // example@domain.com, test.user@example.co.jp など
  maskedText = maskedText.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    '[メールアドレス]'
  );

  // 3. 郵便番号のマスキング
  // 123-4567, 〒123-4567 など
  maskedText = maskedText.replace(
    /〒?\s?\d{3}[-－]\d{4}/g,
    '[郵便番号]'
  );

  // 4. URL のマスキング（個人ブログなど）
  maskedText = maskedText.replace(
    /https?:\/\/[^\s]+/g,
    '[URL]'
  );

  // 5. 住所パターンのマスキング
  // 都道府県 + 市区町村 + 番地のパターン
  maskedText = maskedText.replace(
    /(東京都|北海道|(?:京都|大阪)府|.{2,3}県).{1,10}(市|区|町|村).{1,20}[0-9０-９]+[-－−ー][0-9０-９]+[-－−ー]?[0-9０-９]*/g,
    '[住所]'
  );

  // 6. 番地・部屋番号のパターン
  // 1-2-3, 1丁目2番3号, 101号室 など
  maskedText = maskedText.replace(
    /[0-9０-９]+[-－−ー丁目番号\s]+[0-9０-９]+[-－−ー丁目番号\s]*[0-9０-９]*[号室]?/g,
    (match) => {
      // 「1時間」「2日」などを誤検出しないよう、住所っぽいパターンのみマスク
      if (/[丁目番号室]/.test(match) || match.split(/[-－−ー]/).length >= 2) {
        return '[番地]';
      }
      return match;
    }
  );

  // 7. クレジットカード番号のマスキング
  // 1234-5678-9012-3456, 1234 5678 9012 3456 など
  maskedText = maskedText.replace(
    /\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}/g,
    '[カード番号]'
  );

  // 8. マイナンバー（12桁）
  maskedText = maskedText.replace(
    /\d{4}[-\s]?\d{4}[-\s]?\d{4}/g,
    '[個人番号]'
  );

  // 9. 銀行口座番号のパターン
  // 口座番号: 1234567 (7桁)
  maskedText = maskedText.replace(
    /(口座|こうざ|コウザ)[:：\s]*\d{7,8}/gi,
    '[口座番号]'
  );

  // 10. 生年月日のパターン
  // 1990年1月1日, 1990/01/01, 1990-01-01 など
  maskedText = maskedText.replace(
    /\d{4}[年/\-－]\d{1,2}[月/\-－]\d{1,2}[日]?/g,
    (match) => {
      // 年が1900-2100の範囲なら生年月日とみなす
      const year = parseInt(match.match(/\d{4}/)?.[0] || '0');
      if (year >= 1900 && year <= 2100) {
        return '[生年月日]';
      }
      return match;
    }
  );

  // 11. 氏名のパターン（敬称付き）
  // 山田太郎様、佐藤さん、田中氏 など
  maskedText = maskedText.replace(
    /[一-龥ぁ-んァ-ヶー]{2,4}\s*[一-龥ぁ-んァ-ヶー]{2,4}?\s*(様|さん|氏|くん|ちゃん|殿)/g,
    '[氏名]'
  );

  // 12. 会社名（株式会社、有限会社など）
  maskedText = maskedText.replace(
    /(株式会社|有限会社|合同会社|一般社団法人|NPO法人)\s*[一-龥ぁ-んァ-ヶーa-zA-Z0-9\s]{2,20}/g,
    '[会社名]'
  );

  return maskedText;
}

/**
 * オブジェクト内の指定されたフィールドをマスキング
 */
export function maskConsultationData<T extends { guilt_content?: string; ai_response?: string }>(
  consultation: T
): T {
  return {
    ...consultation,
    guilt_content: consultation.guilt_content
      ? maskPersonalInfo(consultation.guilt_content)
      : consultation.guilt_content,
    ai_response: consultation.ai_response
      ? maskPersonalInfo(consultation.ai_response)
      : consultation.ai_response,
  };
}
