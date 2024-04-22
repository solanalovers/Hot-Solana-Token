import { supabase } from '@/function/supabaseClients';

export const getTokensData = async (page: number, filter: { top: string, time: string }) => {
  try {
    const offset = page === 1 ? 0 : (page - 1) * 100;
    let _result: Array<any> = [];
    let _count: number | null = 0;
    let _error

    if (!filter.top) {
      const { data, count, error } = await supabase
        .from('token')
        .select('*, vote_result(counts)', { count: 'exact' })
        .range(offset, offset + 99)
        .order('PairId');
      if (data && data?.length > 0) {
        _result = data;
        _count = count;
        _error = error;
      }
    } else {
      const { data, count, error } = await supabase
        .from('token')
        .select('*, vote_result(counts)', { count: 'exact' })
        .order('counts', {
          foreignTable: 'vote_result',
          ascending: true
        }
        )
        .limit(Number(filter.top));

      if (data && data?.length > 0) {
        _result = data;
        _count = count;
        _error = error;
      }
    }

    if (_error) {
      throw _error;
    }

    if (_result && _result.length > 0) {
      console.log(_result);

      return { data: _result, count: _count };
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
