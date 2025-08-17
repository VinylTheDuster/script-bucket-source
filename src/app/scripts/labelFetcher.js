// imports
import { supabase } from '../../lib/supabaseClient';

// set the project-bucket

// set the label table
async function initializeLabels(){
    const { data: labels, error } = await supabase.from('labels').select('*');
    
    const functionSelect = document.getElementById('function-select');

    // if an error occur
    if(error) {
        console.warn('Erreur supabase :', error.message);
    };

    if (!labels || !labels.length) {
        console.warn('Aucun contenu trouvé dans Supabase')
    };

    // for function filter
    for (const item of labels) {
        if (item.type == "Function") {
            functionSelect.innerHTML += `<span style="background-color: ${item.bgColor}" class="rounded-2xl py-2 px-4 select-none cursor-pointer transition duration-250 hover:ring-2 hover:ring-indigo-600/50">${item.name}</span>`
        }
    }
}

initializeLabels()