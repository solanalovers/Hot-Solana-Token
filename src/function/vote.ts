import { supabase } from './supabaseClients';

export const vote = async ({
  mintId,
  numberOfLike,
}: {
  mintId: String;
  numberOfLike: Number;
}) => {
  try {
    const { data: existingRecord, error } = await supabase
      .from('vote_result')
      .select('id, counts')
      .eq('mint_id', mintId);

    if (error) {
      throw error;
    }

    if (existingRecord && existingRecord.length > 0) {
      const updatedCounts = existingRecord[0].counts + numberOfLike;

      const { error: updateError } = await supabase
        .from('vote_result')
        .update({ counts: updatedCounts })
        .eq('id', existingRecord[0].id);

      if (updateError) {
        throw updateError;
      }

      console.log(`Updated counts for mint_id ${mintId}`);
    } else {
      const { error } = await supabase.from('vote_result').insert({
        mint_id: Number(mintId),
        counts: numberOfLike,
      });

      if (error) {
        throw error;
      }
    }
  } catch (error) {
    console.error('Error updating vote counts:', error);
  }
};
