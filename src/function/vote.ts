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
      .eq('mint_id', mintId)
      .single();

    if (error) {
      throw error;
    }

    if (existingRecord) {
      const updatedCounts = existingRecord.counts + numberOfLike;

      const { error: updateError } = await supabase
        .from('vote_result')
        .update({ counts: updatedCounts })
        .eq('id', existingRecord.id);

      if (updateError) {
        throw updateError;
      }

      console.log(`Updated counts for mint_id ${mintId}`);
    } else {
      console.log(`No record found for mint_id ${mintId}`);
    }
  } catch (error) {
    console.error('Error updating vote counts:', error);
  }
};
