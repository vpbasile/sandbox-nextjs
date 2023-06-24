"use client"
import Link from 'next/link'
import Table from './(components)/table'
// import CardDeck from './(components)/cardDeck';
import TextParse from './(components)/textParse';
import { styles } from './(components)/tsStyles';
import Section from './(components)/section';
import { useState } from 'react';
import SectionJournal from './(components)/newComponent';

export default function Home() {

  // <> Enhancement <> Add a theme switch with a state for the current theme.  Then make the css strings dependent on that
  // https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually

  // <><><><> This is where I should open the database, retrieve the entirety of a table, and display it in a <Table> component.
  // <> 

  // Define my data

  const paragraphOfText = `Customizing your theme
  
  If you want to change things like your color palette, spacing scale, typography scale, or breakpoints, add your customizations to the theme section of your tailwind.config.js file`
  
    {/* <DBTable /> */}

  const headersTest = ["Key", "Title", "URL"]
  const dataTest: string[][] = [
    ["key006", "Edit buttons should be links", ""]
    , ["key000", "I should add PostgreSQL", "https://www.postgresql.org/docs/current/tutorial.html"]
    , ['key001', "Or maybe SQLite would be better", "https://sqlite.org/quickstart.html"]
    , [`key002`, `The table changes size when you change to edit mode`, '']
    , [`key003`, `sqlite3`, 'https://stackoverflow.com/questions/56583738/how-to-connect-to-a-sqlite-db-from-a-react-app']
    , [`key004`, 'Server components', 'https://nextjs.org/docs/getting-started/react-essentials']
    , [`key005`, 'Create a script that will launch the server and the client', '']
  ]

  let modules: { id: string; contents: JSX.Element; headerText: string; }[] = [
    { headerText: 'Database Table', id: 'dbTable', contents: <SectionJournal /> },
    // { headerText: "Parser for Delimited Text", id: "textParse", contents: <TextParse />, },
    { headerText: "Editable Table Display", id: "tableDisplay", contents: <Table dataLabels={headersTest} dataContents={dataTest} editable={true} /> },
    // { id: 'loremIpsum', headerText: 'Lorem Ipsum', contents: <p className={styles.roomy}>{paragraphOfText}</p> },
  ]
  let moduleCounter = 0;


  // <> Main return
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className={styles.bigOrange}>Sandbox: Next.js with <Link href='https://tailwindcss.com/' className='' >tailwind</Link> and <Link className={styles.link} href="https://react.daisyui.com/">react-daisyUI</Link></h1>
      {modules[0] && modules.map((thisModule) => {
        return (<Section key={moduleCounter++} id={thisModule.id} headerText={thisModule.headerText}>
          {thisModule.contents}
        </Section>)
      })}

    </main>
  )
}