import Link from "next/link";
import { styles } from "../helpersUniversal/tsStyles"

export default function CheatSheet() {

    // ---------------------------------------------
    // <> Maps
    // ---------------------------------------------
    // You can initialize values with the constructor
    const usersMap = new Map<string, { id: number, status: string }>([
        ["herman", { id: 7, status: "online" }],
        ["regina", { id: 19, status: "afk" }]
    ])

    // Or new values can be added during runtime using the set() method
    usersMap.set("mark", { id: 36, status: "offline" })

    for (const [name, user] of usersMap) {
        console.log(`User ${name} (${user.id}) is ${user.status}`)
    }

    // 
    // const user = usersMap.get("herman");
    // console.log(user.status)

    // [...usersMap].map((key,user)=>{console.log(`User ${key} is ${user.status}`)})

    const codexample1 = `
                        // ---------------------------------------------
                        // <> Maps
                        // ---------------------------------------------
                        // You can initialize values with the constructor
                        const usersMap = new Map<string, {id: number, status: string }>([
                        ["herman", {id: 7, status: "online" }],
                        ["regina", {id: 19, status: "afk" }]
                        ])

                        // Or new values can be added during runtime using the set() method
                        usersMap.set("mark", {id: 36, status: "offline" })

                        // Iterating is nice and easy here, too
                        for (const [name,user] of usersMap) {
                            console.log(\`User \${name} (\${user.id}) is \${user.status}\`)
                        }`

    // ---------------------------------------------
    // <> Sets
    // ---------------------------------------------

    const userIdsInChatSet = new Set([99, 99, 13, 28, 41, 99, 41])
    userIdsInChatSet.entries()
    console.log(userIdsInChatSet)

    return (
        <div>
            <h2>JavaScript Cheat Sheet</h2>
            {/* <h3 className={styles.h3}>Records</h3>
            <p></p> */}
            <h3 className={styles.h3}>Maps</h3>
            <p>
                <Link href={"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"} >Maps</Link>
                {" are useful for dynamic keys, as in a map of users.  They bind keys to values.    Maps are optimized to have the shape change over time.  Objects aren't for arbitrariy key-value mappings.  Objectsa are good for arbitrary shapes with arbitrary nesting.  Ideally an object's shape should be defined when it's instantiated and not modified during runtime - that hurts performance significantly. If you want to destroy and create keys, you want a map."}
                <pre><code>{codexample1}</code></pre>
                {"Useful methods:"}
                <ul>
                    <li>{".get()"}</li>
                    <li>{".set"}</li>
                </ul>

            </p>
            <h3 className={styles.h3}>Sets</h3>
            <p>

                {"Sets will deduplicate values and have handy methods like .has() and .delete().  It has .entries which returns an iterable of [v,v] pairs for every value `v` in the set."}
            </p>
        </div>
    )
}