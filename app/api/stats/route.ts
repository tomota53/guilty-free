import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // 全ての相談データを取得
    const { data: consultations, error } = await supabase
      .from('consultations')
      .select('category, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // カテゴリー別の統計
    const categoryStats = consultations?.reduce((acc: any, item) => {
      const category = item.category || 'other';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    // 月別の統計
    const monthlyStats = consultations?.reduce((acc: any, item) => {
      const month = new Date(item.created_at).toISOString().slice(0, 7);
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    // 最近の傾向（直近30日）
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentConsultations = consultations?.filter(
      (item) => new Date(item.created_at) >= thirtyDaysAgo
    );

    const recentCategoryStats = recentConsultations?.reduce((acc: any, item) => {
      const category = item.category || 'other';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      total: consultations?.length || 0,
      categoryStats,
      monthlyStats,
      recentCategoryStats,
      recentTotal: recentConsultations?.length || 0,
    });
  } catch (error: any) {
    console.error('統計取得エラー:', error);
    return NextResponse.json(
      { error: '統計の取得に失敗しました', details: error.message },
      { status: 500 }
    );
  }
}
