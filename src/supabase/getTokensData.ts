import { supabase } from '@/function/supabaseClients';

export const getTokensData = async (page: number) => {
  try {
    const offset = page === 1 ? 0 : (page - 1) * 100;
    const { data, count, error } = await supabase
      .from('token')
      .select('*', { count: 'exact' })
      .range(offset, offset + 99)
      .order('PairId');
    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      console.log(data);

      return { data, count };
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
