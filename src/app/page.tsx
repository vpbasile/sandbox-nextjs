import Link from 'next/link'
import Table from './(components)/table'
import CardDeck from './(components)/cardDeck';
import TextParse from './(components)/textParse';
import { styles } from './(components)/tsStyles';
import Section from './(components)/section';

export default function Home() {


  // Add a theme switch with a state for the current theme.  Then make the css strings dependent on that
  // https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually

  // <> Do the things
  let indexData = 0

  // Define my data
  const headersTest = ["Key", "Title", "URL"]
  const dataTest: string[][] = [
    ["key000", "I should add PostgreSQL", "https://www.postgresql.org/docs/current/tutorial.html"]
    , ['key001', "Or maybe SQLite would be better", "https://sqlite.org/quickstart.html"]
    , [`key002`, `The table changes size when you change to edit mode`]
  ]

  // <> Main return
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className={styles.bigOrange}>Sandbox: Next.js with <Link href='https://tailwindcss.com/' className='text-orange-700' >tailwind</Link> and <Link className={styles.link} href="https://react.daisyui.com/">react-daisyUI</Link></h1>
      {/* <Section id='new' headerText='New Section'></Section> */}
      <Section id='new' headerText='New Section'></Section>
      <Section id='tableDisplay' headerText='Table Display'><Table dataLabels={headersTest} dataContents={dataTest} editable={true} /></Section>
      {/* <Section headerText='Card Deck Simulator'><CardDeck /></Section> */}
      {/* <div className={styles.bubble}>
        <ExampleForm />
      </div> */}
      <Section id='loremIpsum' headerText='Lorem Ipsum'>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam fugiat explicabo eos quam, animi totam voluptates quas nesciunt natus provident a praesentium dicta id doloribus vel repellat aspernatur, officiis laudantium?</p>
      </Section>
      {/* <Section headerText='Parser for Delimited Text'>
        <TextParse />
      </Section> */}

    </main>
  )
}

