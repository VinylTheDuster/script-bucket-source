import { useState, useEffect } from 'react';
import { LabelFetcher } from './search.labelfetcher';

export default function LabelsContainer() {
    const [currentLabels, setCurrentLabels] = useState(new Set());
    const [rejectedLabels, setRejectedLabels] = useState(new Set());

    function toggleLabel(label) {
        setCurrentLabels(prevCurrent => {
            const newCurrent = new Set(prevCurrent);
            const newRejected = new Set(rejectedLabels);

            if (!prevCurrent.has(label) && !rejectedLabels.has(label)) {

                // ajoute un label à current
                newCurrent.add(label);
            } else if (prevCurrent.has(label)) {

                // déplace le label vers rejected
                newCurrent.delete(label);
                newRejected.add(label);
            } else if (rejectedLabels.has(label)) {
                
                // retire le label de rejected
                newRejected.delete(label);
            }

        setRejectedLabels(newRejected);
        return newCurrent;
        });
    }

    return (toggleLabel);
}