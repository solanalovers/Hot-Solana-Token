import { supabase } from '@/function/supabaseClients';

export const getTokensData = async () => {
  try {
    const { data, error } = await supabase.from('token').select('*').limit(9);
    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      console.log(data);

      return data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
