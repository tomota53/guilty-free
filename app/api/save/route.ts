import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { guiltContent, aiResponse, category, userId } = await request.json();

    if (!guiltContent || !aiResponse) {
      return NextResponse.json(
        { error: '保存するデータが不足しています' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('consultations')
      .insert([
        {
          user_id: userId || null,
          guilt_content: guiltContent,
          ai_response: aiResponse,
          category: category || null,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase保存エラー:', error);
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('保存エラー:', error);
    return NextResponse.json(
      {
        error: '保存に失敗しました',
        details: error.message
      },
      { status: 500 }
    );
  }
}
