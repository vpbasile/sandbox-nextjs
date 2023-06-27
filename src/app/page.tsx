"use client"
import Link from 'next/link'
import Table from './(components)/db-table/table'
// import CardDeck from './(components)/cardDeck';
import TextParse from './(components)/textParse';
import { styles } from './(components)/tsStyles';
import Section from './(components)/section';
import { useState } from 'react';
import SectionJournal from './(components)/db-table/newComponent';

export default function Home() {

  // <> Enhancement <> Add a theme switch with a state for the current theme.  Then make the css strings dependent on that
  // https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually

  // <> Test data used in the editable table until I can store this data in the database.
  const headersTest = ["Key", "Title", "URL"]
  const dataTest: string[][] = [
    ["key006", "Edit buttons should be links", ""]
    , [`key002`, `The table changes size when you change to edit mode`, '']
    , [`key003`, `sqlite3`, 'https://stackoverflow.com/questions/56583738/how-to-connect-to-a-sqlite-db-from-a-react-app']
    , [`key004`, 'Server components', 'https://nextjs.org/docs/getting-started/react-essentials']
    , [`key005`, 'Create a script that will launch the server and the client', '']
  ]

  // <> Define modeules
  let modules: { uid: number, id: string; contents: JSX.Element; headerText: string }[] = []
  let makeUID = 0
  modules.push({ uid: makeUID++, headerText: 'Database Table', id: 'dbTable', contents: <SectionJournal /> })
  modules.push({ uid: makeUID++, headerText: "Notes", id: "tableDisplay", contents: <Table dataLabels={headersTest} dataContents={dataTest} editable={true} /> })
  // modules.push({ uid: makeUID++, headerText: "Parser for Delimited Text", id: "textParse", contents: <TextParse />, })

  // <> Toolbar for selecting a module
  const [selectedModule, SETselectedModule] = useState(0);
  const toolbar =
    <ul className="flex">
      {modules.map(eachModule => {
        const uid = eachModule.uid;
        let buttonStyle;
        if (uid === selectedModule) { buttonStyle = `text-soothingBlue ` + styles.button + styles.roomy } else { buttonStyle = `text-yellow-600  ` + styles.button + styles.roomy }
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
      <h1 className={styles.bigOrange}>Sandbox: Next.js with <Link href='https://tailwindcss.com/' className='' >tailwind</Link> and <Link className={styles.link} href="https://react.daisyui.com/">react-daisyUI</Link></h1>
      {toolbar}
      {/* {modules[0] && modules.map((thisModule) => {
        return (<Section key={moduleCounter++} id={thisModule.id} headerText={thisModule.headerText}>
          {thisModule.contents}
        </Section>)
      })} */}
      <Section key={moduleCounter++} id={actualModule.id} headerText={actualModule.headerText}>
        {actualModule.contents}
      </Section>
    </main>
  )
}