import { useState } from 'react';

export default function LabelsProvider({ children }) {
    const [currentLabels, setCurrentLabels] = useState(new Set());
    const [rejectedLabels, setRejectedLabels] = useState(new Set());

    function toggleLabel(label) {
    setCurrentLabels(prevCurrent => {
        setRejectedLabels(prevRejected => {
            const newCurrent = new Set(prevCurrent);
            const newRejected = new Set(prevRejected);

            if (!prevCurrent.has(label) && !prevRejected.has(label)) {
                newCurrent.add(label);
            } else if (prevCurrent.has(label)) {
                newCurrent.delete(label);
                newRejected.add(label);
            } else if (prevRejected.has(label)) {
                newRejected.delete(label);
            }

            return newRejected;
        });

        // On retourne le nouvel état de current
        const updatedCurrent = new Set(prevCurrent);
        if (!prevCurrent.has(label) && !rejectedLabels.has(label)) {
            updatedCurrent.add(label);
        } else if (prevCurrent.has(label)) {
            updatedCurrent.delete(label);
        }
        return updatedCurrent;
    });
}
    console.log("Voilà", currentLabels, rejectedLabels);
    return children({toggleLabel, currentLabels, rejectedLabels});
}