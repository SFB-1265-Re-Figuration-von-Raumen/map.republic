import Head from "next/head"

const Layout = ({ children }) => {
    return (
        <div>
            <Head>
                <title>Next.js App</title>
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout