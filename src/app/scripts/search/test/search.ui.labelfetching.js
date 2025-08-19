import React, { useState } from "react";
import { LabelFetcher } from "./search.labelfetcher";
import LabelsProvider from "./search.selectedlabelscontainer";

// Styles cyclés
const TEXT_STYLES = [
  "hover:ring-2 hover:ring-indigo-600/50",
  "font-bold ring-3 ring-indigo-600",
  "line-through",
];

// Petit composant pour un label individuel (permet d'utiliser useState proprement)
function LabelItem({ l, toggleLabel }) {
  const [i, setI] = useState(0);
  const style = TEXT_STYLES[i];

  const handleClick = () => {
    toggleLabel(l.name);
    setI((prev) => (prev + 1) % TEXT_STYLES.length);
  };

  return (
    <span
      style={{ backgroundColor: l.bgColor }}
      onClick={handleClick}
      className={`${style} rounded-2xl py-1 px-3 w-fit h-fit text-[0.77em] select-none cursor-pointer transition duration-250`}
    >
      {l.name}
    </span>
  );
}

export default function LabelInitializer() {
  const labels = LabelFetcher();

  const renderLabels = (labels, type, toggleLabel) =>
    labels
      .filter((l) => l.type === type)
      .map((l) => (
        <LabelItem key={l.name} l={l} toggleLabel={toggleLabel} />
      ));

  return (
    <LabelsProvider>
      {({ toggleLabel }) => (
        <div id="filter-select" className="grid grid-cols-4 items-start gap-10">
          <div>
            <label>Type</label>
            <div className="flex flex-row flex-wrap rounded-md border-neutral-200 border-2 border-solid p-3 inset-shadow-sm inset-shadow-neutral-200 gap-2">
              {renderLabels(labels, "Function", toggleLabel)}
            </div>
          </div>

          <div>
            <label>Usage</label>
            <div className="flex flex-row flex-wrap rounded-md border-neutral-200 border-2 border-solid p-3 inset-shadow-sm inset-shadow-neutral-200 gap-2">
              {renderLabels(labels, "Usage", toggleLabel)}
            </div>
          </div>

          <div>
            <label>Langage</label>
            <div className="flex flex-row flex-wrap rounded-md border-neutral-200 border-2 border-solid p-3 inset-shadow-sm inset-shadow-neutral-200 gap-2">
              {renderLabels(labels, "Language", toggleLabel)}
            </div>
          </div>

          <div>
            <label>Status</label>
            <div className="flex flex-row flex-wrap rounded-md border-neutral-200 border-2 border-solid p-3 inset-shadow-sm inset-shadow-neutral-200 gap-2">
              {renderLabels(labels, "Status", toggleLabel)}
            </div>
          </div>
        </div>
      )}
    </LabelsProvider>
  );
}
