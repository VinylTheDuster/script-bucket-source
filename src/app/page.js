"use client";

import Image from "next/image";
import React, {useRef, useState } from 'react';

import LabelInitializer from "./scripts/labelFilterInitializer";

export default function Home() {

  // use states
  const [rotated, setRotated] = useState(false);
  const [searchBarFocused, setSearchBarFocused] = useState(true);
  const [filterOn, setFilterOn] = useState(false);

  // use ref
  const refSearchBar = useRef()

  const handleSelectClick = () => {
    setRotated((prev) => !prev);
  };

  const toggleFilterDiv = () => {
    setFilterOn((prev) => !prev);
  }

  return (
    <div className="mx-[25%]">
      <header className="mt-35 mb-45">
        <h1 className="text-5xl text-center py-8 pb-8 antialiased">Script Bucket</h1>
        <p className="text-center text-2xl px-45 text-neutral-500 antialiased">
          Une collection personnelle de scripts et d'APIs que je crée en différents langages pour m'entraîner. Je n'assure pas leur pleine fonctionnalité et me dégage de toute responsabilité s'ils sont utilisés hors de leur champ d'utilisation prévu.
        </p>
      </header>
      <main>
        <div id="main-container" className="relative rounded-md border-neutral-200 border-2 border-solid px-16 pt-8 ">
          <section id="main-container-search" className="relative z-1 bg-white">

            <div id="search-result" className="text-2xl">Résultats</div>

            <div className="grid grid-cols-4 items-end justify-items-center my-8 pb-8">
              
              <div className="relative flex flex-row justify-self-start rounded-md border-2 border-solid border-neutral-200 w-43 h-fit">
                <select onClick={handleSelectClick} className="rounded-md appearance-none focus:outline-none w-full p-2 pr-3 cursor-pointer transition duration-150 ease-in-out hover:ring-2 hover:ring-indigo-600/50 focus:ring-2 focus:ring-indigo-600" name="sorter" id="sorter">
                  <option value="sort-new">Le plus récent</option>
                  <option value="sort-old">Le plus ancien</option>
                  <option value="sort-ascendant">Nom croissant</option>
                  <option value="sort-descendant">Nom décroissant</option>
                </select>
                <Image id="sort-arrow" className={`absolute inset-y left-[82%] top-[27%] pointer-events-none transition duration-150 ease-in-out ${rotated ? "rotate-180" : ""}`} src="/images/button/light/slct_arrow_black.svg" width="20" height="20" alt="" />
              </div>

              <div className={`flex flex-row rounded-md border-2 border-solid border-neutral-200 w-full h-fit col-span-2 transition duration-150 ease-in-out hover:ring-2 hover:ring-indigo-600/50 ${searchBarFocused ? "ring-2 ring-indigo-600" : ""} select-none`}>
                <Image className="ml-2" src="/images/button/light/ipt_search_black.svg"
                width="20" height="20" alt="" />
                <input onFocus={() => setSearchBarFocused(true)} onBlur={() => setSearchBarFocused(false)} className="focus:outline-none w-full p-2" placeholder="Rechercher..." type="text" ref={refSearchBar} />
              </div>

              <a onClick={toggleFilterDiv} className="justify-self-end rounded-3xl border-2 border-neutral-200 gap-2 py-2 pl-3 pr-4 flex justify-center cursor-pointer transition ease-in-out hover:ring-2 hover:ring-indigo-600/50 select-none">
                <Image src="/images/button/light/btn_filter_black.svg" width="20" height="20" alt="" />Filtres          
              </a>
            </div>            
          </section>
          <section>
            <div className={`duration-500 ease-out z-0 mr-16 ${filterOn ? "relative -mb-30 -top-36" : "relative mb-5 top-0"}`}>
              <LabelInitializer />
            </div>
          </section>
          <section id="main-container-results">
            
          </section>
        </div>
      </main>
    </div>
  );
}