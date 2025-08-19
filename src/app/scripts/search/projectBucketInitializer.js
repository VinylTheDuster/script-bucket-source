'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Image from 'next/image';

import { LabelFetcher } from './labelFilterInitializer.js';

export function ModuleInitializer() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function initializeModules() {
            const { data, error } = await supabase.from('projectBucket').select('*');

            if (error) {
                console.warn('Erreur supabase :', error.message);
                return;
            }

            if (!data || !data.length) {
                console.warn('Aucun contenu trouvé dans Supabase');
                return;
            }

            setProjects(data);
        }

        initializeModules();
    },[]);

    useEffect(() => {
        async function fetchLabels() {
            const result = await LabelFetcher();
            setLabels(results || []);
        }
        fetchLabels();
    }, []);

      return (
        renderProjects()
      );
}

export function InitializeModules() {
    const [projects, setProjects] = useState([]);
    const [currentLabels, setCurrentLabels] = useState(new Set());
    const [rejectedLabels, setRejectedLabels] = useState(new Set());

    useEffect(() => {
        async function fetchLabels() {
            const results = await LabelFetcher();
            setLabels(results || []);
        }
        fetchLabels();

        async function initializeModules() {
            const { data, error } = await supabase.from('projectBucket').select('*');

            if (error) {
                console.warn('Erreur supabase :', error.message);
                return;
            }

            if (!data || !data.length) {
                console.warn('Aucun contenu trouvé dans Supabase');
                return;
            }

            setProjects(data);
        }
        initializeModules();
    });

    const renderProjects = () => {
        return projects
            .filter(item => {
                const matchesSearch = new RegExp(search, 'i').test(item.name);
                const hasCurrentLabel = Array.from(item.label || []).some(label => currentLabels.has(label));
                const hasRejectedLabel = Array.from(item.label || []).some(label => rejectedLabels.has(label));

                return matchesSearch && hasCurrentLabel && !hasRejectedLabel;
            })
            .map(item => {
                <div>
                    
                </div>
                })
            }
}


function setLabels(labelAdd) {
    if (!currentLabels.has(labelAdd) && !rejectedLabels.has(labelAdd)) {

        setCurrentLabels(new Set(currentLabels).add(labelAdd));
    } else if (currentLabels.has(labelAdd)) {

        const newCurrent = new Set(currentLabels);
        newCurrent.delete(labelAdd);

        const newRejected = new Set(rejectedLabels);
        newRejected.add(labelAdd);

        setCurrentLabels(newCurrent);
        setRejectedLabels(newRejected);
    } else if (rejectedLabels.has(labelAdd)) {

        const newRejected = new Set(rejectedLabels);
        newRejected.delete(labelAdd);
        setRejectedLabels(newRejected);
    }
};

export function maFonctionParent() {
    function alternatif() {
        charabia ...
    }

    function alternatif2() {
        charabia ...
    }

    return (quelque chose ...);
}

