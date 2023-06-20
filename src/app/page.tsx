"use client"
import Link from 'next/link'
import Image from 'next/image';
import Table from './(components)/table'
// import CardDeck from './(components)/cardDeck';
import TextParse from './(components)/textParse';
import { styles } from './(components)/tsStyles';
import Section from './(components)/section';
import { useState } from 'react';

export default function Home() {

  const [tempString, setString] = useState("npm install sqlite3 --save")

  // Add a theme switch with a state for the current theme.  Then make the css strings dependent on that
  // https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually

  // <><><><> This is where I should open the database, retrieve the entirety of a table, and display it in a <Table> component.
  // <> 

  // Define my data
  const headersTest = ["Key", "Title", "URL"]
  const dataTest: string[][] = [
    ["key000", "I should add PostgreSQL", "https://www.postgresql.org/docs/current/tutorial.html"]
    , ['key001', "Or maybe SQLite would be better", "https://sqlite.org/quickstart.html"]
    , [`key002`, `The table changes size when you change to edit mode`,'']
    , [`key003`, `sqlite3`, 'https://stackoverflow.com/questions/56583738/how-to-connect-to-a-sqlite-db-from-a-react-app']
    , [`key004`, 'Server components', 'https://nextjs.org/docs/getting-started/react-essentials']
    , [`key005`, 'Create a script that will launch the server and the client','']
  ]

  const paragraphOfText = `Customizing your theme

  If you want to change things like your color palette, spacing scale, typography scale, or breakpoints, add your customizations to the theme section of your tailwind.config.js file`

  // <> Main return
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className={styles.bigOrange}>Sandbox: Next.js with <Link href='https://tailwindcss.com/' className='text-orange-700' >tailwind</Link> and <Link className={styles.link} href="https://react.daisyui.com/">react-daisyUI</Link></h1>
      {/* <Section id='new' headerText='New Section'></Section> */}
      <Section id='dbTable' headerText='Database Table'>
        <p>To test the database connection, at the command line run <span className=''>npm run database</span>, then in the browser, go to <Link href="http://localhost:8000/employees/1">http://localhost:8000/employees/1</Link></p>
        {/* <p className={styles.roomy}>Server result: {serverResponse}</p> */}
        <p className={styles.roomy}>This one does not work yet.  My next step is to set up express.  <Link className={styles.link} href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes">This tutorial</Link> might be helpful, though it is using mongoose instead of sqlite3. <Link className={styles.link} href="https://medium.com/@codesprintpro/rest-api-using-sqlite3-nodejs-and-expressjs-f8c0c0847fe5">This tutorial</Link> is much more helpful.</p>
        {/* <DBTable /> */}
      </Section>
      <Section id='description' headerText="Database Schema">
        {/* <Image
          src="/public/people-schema.jpg"
          width={200}
          height={200}
          alt='Diagram of the database schema'
        /> */}
        <code>{`
          Table people {
            id integer [primary key]
            name varchar
            birthdate date
            preferred_contact_method integer
            groups integer
            indexes {
              groups
            }
          }
          
          Table groups {
            id integer [primary key]
            title varchar
            sortorder integer
          }
          
          table contact_methods {
            id integer [primary key]
            title varchar
          }
          
          Ref: people.groups > groups.id
          Ref: people.preferred_contact_method > contact_methods.id
          `}</code>
      </Section>
      <Section id='textParse' headerText='Parser for Delimited Text'>
        <TextParse />
      </Section>
      <Section id='tableDisplay' headerText='Editable Table Display'><Table dataLabels={headersTest} dataContents={dataTest} editable={true} /></Section>
      <Section id='loremIpsum' headerText='Lorem Ipsum'>
        <p className={styles.roomy}>{tempString}</p>
        <p className={styles.roomy}>{paragraphOfText}</p>
      </Section>

    </main>
  )
}

