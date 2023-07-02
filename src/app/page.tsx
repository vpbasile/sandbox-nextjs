"use client"
import { useState } from 'react';
import Link from 'next/link'
import Table from './(components)/db-table/table'
import CardDeck from './(components)/cardDeck';
import { styles } from './(components)/helpers/tsStyles';
import Section from './(components)/helpers/section';

// <>DATA<>people
import DisplayPeople from './(components)/data/people/display-people';

// <>DATA<>notes
import { dataTest, testFields, stuffToSay } from './(components)/data/notes';
import HexBrowser from './(components)/hexboard/browser';
import SavedBoard from './(components)/hexboard/boards/SavedBoard';
import Snowflake from './(components)/hexboard/boards/Snowflake';
import Keyboard from './(components)/hexboard/boards/Keyboard';
import TriviaBoard from './(components)/hexboard/boards/TriviaBoard';
import GenerativeBoard from './(components)/hexboard/boards/Generative';
import CreateBoard from './(components)/hexboard/boards/CreateBoard';

export default function Home() {

  // <> Enhancement <> Add a theme switch with a state for the current theme.  Then make the css strings dependent on that
  // https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually

  // <> Define modeules
  let modules: { uid: number, id: string; contents: JSX.Element; headerText: string }[] = []
  let makeUID = 0
  modules.push({ uid: makeUID++, headerText: 'People Database', id: 'dbTable', contents: <DisplayPeople /> });
  modules.push({
    uid: makeUID++, id: "tableDisplay", headerText: "Notes Database", contents: <div>
      <Table dataContents={dataTest} fields={testFields} />
      <div className={styles.bubble + styles.spacious}>{stuffToSay}</div>
    </div>

  });
  // modules.push({ uid: makeUID++, headerText: "Hexboard browser", id: "hexBrowser", contents: <HexBrowser /> });
  modules.push({ uid: makeUID++, id: "cardeck", headerText: "CarDeck Simulator", contents: <CardDeck />, });
  modules.push({ uid: makeUID++, id: "keyboard", headerText: "Keyboard", contents: <Keyboard /> })
  modules.push({ uid: makeUID++, id: "trivia", headerText: "Trivia board", contents: <TriviaBoard /> });
  modules.push({ uid: makeUID++, id: "generative", headerText: "Generative Map", contents: <GenerativeBoard /> });
  modules.push({ uid: makeUID++, id: "create", headerText: "Create Hex Board", contents: <CreateBoard /> });
  modules.push({ uid: makeUID++, id: "snowflake", headerText: "Snowflake Generator", contents: <Snowflake /> });
  // modules.push({ uid: makeUID++, id: "savedHexBoard", headerText: "Saved Hex Board", contents: <SavedBoard />});


  // <> Toolbar for selecting a module
  const [selectedModule, SETselectedModule] = useState(0);
  const toolbar =
    <ul className="flex">
      {modules.map(eachModule => {
        const uid = eachModule.uid;
        let buttonStyle = "text-blue-500 ";
        if (uid === selectedModule) { buttonStyle = `ring-8 ring-inset ` + styles.button + styles.roomy } else { buttonStyle = `  ` + styles.button + styles.roomy }
        return (
          <li key={`button-${uid}`} className="mr-6">
            <button key={uid} onClick={() => {
              SETselectedModule(uid);
            }} className={buttonStyle}>{eachModule.headerText}</button>
          </li>
        )
      })}
    </ul>
  const actualModule = modules[selectedModule];
  // <> Varibales used in key loops
  let moduleCounter = 0;


  // <> Main return
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className={styles.reallyBig}>Database Viewer</h1>
      <h2>with <Link href='https://tailwindcss.com/' className='' >tailwind</Link> and <Link className={styles.link} href="https://react.daisyui.com/">react-daisyUI</Link></h2>
      {toolbar}
      <Section key={moduleCounter++} id={actualModule.id} headerText={actualModule.headerText}>
        {actualModule.contents}
      </Section>
    </main>
  )
}