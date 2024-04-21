import { supabase } from '@/function/supabaseClients';

export const getRandomWallet = async () => {
  try {
    const { data, error } = await supabase
      .from('random_wallets')
      .select('publicKey')
      .limit(1);

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      return data[0].publicKey;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
