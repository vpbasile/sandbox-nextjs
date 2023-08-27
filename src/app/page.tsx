"use client"
import { useState } from 'react';
import Link from 'next/link'
import { styles } from './helpersUniversal/tsStyles';
import Section from './helpersUniversal/section';

// <>DATA<>people

// <>DATA<>notes
import DisplayNotes from "./(components)/db_notes";

import Keyboard from './(components)/hexboard/boards/Keyboard';
import GenerativeBoard from './(components)/hexboard/boards/Generative';
import Gameboard from './(games)/gameboard';
import TriviaDisplay from './(components)/db_trivia';
import HabitTracker from './(components)/db_habits';
import DisplayPeople from './(components)/db_people';

export default function Home() {

  // <> Enhancement <> Add a theme switch with a state for the current theme.  Then make the css strings dependent on that
  // https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually

  // <> Define modeules
  let modules: { uid: number, id: string; contents: JSX.Element; headerText: string, type?: "notDB" | null }[] = []
  let makeUID = 0
  // modules.push({ uid: makeUID++, id: 'habitDisplay', contents: <HabitTracker />, headerText: 'Habits' })
  modules.push({ uid: makeUID++, id: 'triviaDisplay', contents: <TriviaDisplay />, headerText: 'Trivia' })
  modules.push({ uid: makeUID++, id: "notesDisplay", headerText: "Notes Database", contents: <DisplayNotes /> });
  modules.push({ uid: makeUID++, headerText: 'People Database', id: 'peopleDisplay', contents: <DisplayPeople /> });
  // modules.push({ uid: makeUID++, id: "trivia", headerText: "Trivia board", contents: <TriviaBoard />, type: "notDB" });
  modules.push({ uid: makeUID++, id: "keyboard", headerText: "Keyboard", contents: <Keyboard />, type: "notDB" })
  modules.push({ uid: makeUID++, id: "generative", headerText: "Generative Map", contents: <GenerativeBoard /> });
  modules.push({ uid: makeUID++, id: "cardeck", headerText: "CarDeck Simulator", contents: <Gameboard />, type: "notDB" });
  // modules.push({ uid: makeUID++, id: "savedHexBoard", headerText: "Saved Hex Board", contents: <SavedBoard />});
  // modules.push({ uid: makeUID++, id: "create", headerText: "Create Hex Board", contents: <CreateBoard /> });
  // modules.push({ uid: makeUID++, id: "snowflake", headerText: "Snowflake Generator", contents: <Snowflake />, type: "notDB" });


  // <> Toolbar for selecting a module
  function toolbarButton(eachModule: { uid: number; id: string; contents: JSX.Element; headerText: string; type?: "notDB" | null | undefined; }, cssClasses?: string) {
    const uid = eachModule.uid;
    let buttonStyle = styles.button + styles.roomy;
    if (uid === selectedModule) { buttonStyle = `ring-8 ring-inset ` + buttonStyle; }
    else {
      if (cssClasses === undefined) buttonStyle = "text-blue-500 " + buttonStyle
      else buttonStyle = cssClasses + buttonStyle;
    }
    return (
      <li key={`button-${uid}`} className="mr-6">
        <button key={uid} onClick={() => {
          SETselectedModule(uid);
        }} className={buttonStyle}>{eachModule.headerText}</button>
      </li>
    );
  }


  const [selectedModule, SETselectedModule] = useState(0);
  const toolbar1color = ""
  const toolbar = <ul className="flex">
    <label htmlFor='toolbar'>Database modules:</label>
    {modules.filter((module => { return (module.type === undefined) })).map(eachModule => toolbarButton(eachModule))}
  </ul>
  const toolbar2 = <ul className='flex'>
    <label htmlFor='toolbar'>Other modules:</label>
    {modules.filter((module => { return (module.type !== undefined) })).map(eachModule => toolbarButton(eachModule, "text-gray-800 "))}
  </ul>
  const actualModule = modules[selectedModule];
  // <> Varibales used in key loops
  let moduleCounter = 0;

  // <> Main return
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className={styles.reallyBig}>Database Viewer</h1>
      <h2>with <Link href='https://tailwindcss.com/' className='' >tailwind</Link> (<Link href={"https://tailwindcomponents.com/cheatsheet/"}>cheat sheet</Link>) and <Link className={styles.link} href="https://react.daisyui.com/">react-daisyUI</Link></h2>
      {toolbar}
      {toolbar2}
      <Section key={moduleCounter++} id={actualModule.id} headerText={actualModule.headerText}>
        {actualModule.contents}
      </Section>
    </main>
  )

}