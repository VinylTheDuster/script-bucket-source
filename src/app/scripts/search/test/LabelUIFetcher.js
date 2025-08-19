
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

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

  const renderLabels = (type) =>
    labels
      .filter((l) => l.type === type)
      .map((l, idx) => (
        <span 
        key={idx} 
        style={{ backgroundColor: l.bgColor }} 
        className="rounded-2xl py-1 px-3 w-fit h-fit text-[0.77em] select-none cursor-pointer transition duration-250 hover:ring-2 hover:ring-indigo-600/50">
          {l.name}  
        </span>
      ));

  return (
    <div id="filter-select" className="grid grid-cols-4 items-start gap-15">

        <div>
            <label htmlFor="">Type</label>
            <div id="function-select" className="flex flex-row flex-wrap rounded-md border-neutral-200 border-2 border-solid p-3 inset-shadow-sm inset-shadow-neutral-200 gap-2">{renderLabels('Function')}</div>
        </div>

        <div>
            <label htmlFor="">Usage</label>
            <div id="usage-select" className="flex flex-row flex-wrap rounded-md border-neutral-200 border-2 border-solid p-3 inset-shadow-sm inset-shadow-neutral-200 gap-2">{renderLabels('Usage')}</div>
        </div>

        <div>
            <label htmlFor="">Langage</label>
            <div id="language-select" className="flex flex-row flex-wrap rounded-md border-neutral-200 border-2 border-solid p-3 inset-shadow-sm inset-shadow-neutral-200 gap-2">{renderLabels('Language')}</div>
        </div>

        <div>
            <label htmlFor="">Status</label>
            <div id="status-select" className="flex flex-row flex-wrap rounded-md border-neutral-200 border-2 border-solid p-3 inset-shadow-sm inset-shadow-neutral-200 gap-2">{renderLabels('Status')}</div>
        </div>
    </div>
  );
}