import Link from 'next/link'
import Table from './(components)/table'

export default function Home() {

  // <> Style
  function classesFor(selector: string, append?: string) {
    let classes = ""
    switch (selector) {
      case 'bubble': classes += 'border-solid rounded-lg border p-8 m-8'; break;
      case 'big-orange': classes += 'text-orange-400 text-2xl'; break;
      case 'link': classes += `text-orange-700`; break;
      default: console.log(`Style not defined: ${selector}`);
    }
    return classes + " " + append;
  }

  // <> Do the things
  const headersTest = ["", "Key", "Title", "URL"]
  let indexData = 0

  // Define my data
  const dataTest: string[][] = [
    ["key000", "I should add PostgreSQL", "https://www.postgresql.org/docs/current/tutorial.html"]
    , ['key001', "Next Title", "https://www.postgresql.org/docs/current/tutorial.html"]
    , [`key002`, "Another Title", "https://www.postgresql.org/docs/current/tutorial.html"]
  ]

  // <> Main return
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className={classesFor('big-orange')}>Sandbox: Next.js with <Link href='https://tailwindcss.com/' className='text-orange-700' >tailwind</Link> and <Link className={classesFor('link', 'text-')} href="https://react.daisyui.com/">react-daisyUI</Link></h1>
      <div className={`w-full ${classesFor('bubble')}`}>
        <Table dataLabels={headersTest} dataContents={dataTest} />
      </div>
      {/* <div className={`w-full ${classesFor('bubble')}`}>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam fugiat explicabo eos quam, animi totam voluptates quas nesciunt natus provident a praesentium dicta id doloribus vel repellat aspernatur, officiis laudantium?</p>
      </div> */}
      {/* <div className={classesFor('bubble')}>
        <ExampleForm />
      </div> */}

    </main>
  )
}
