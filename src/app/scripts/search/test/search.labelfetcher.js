import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabaseClient';

export function LabelFetcher() {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    async function initializeLabels() {
      const { data, error } = await supabase.from('labels').select('*');

      if (error) {
        console.warn('Erreur supabase :', error.message);
        return;
      }

      if (!data || !data.length) {
        console.warn('Aucun contenu trouvé dans Supabase');
        return;
      }

      setLabels(data);
    }

    initializeLabels();
  },[]);

  return (labels);
}