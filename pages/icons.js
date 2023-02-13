import { fetcher } from '@/lib/api'
import Layout from '../components/Layout'

const Icons = ({ iconlist }) => {

    return (
        <Layout>
            <div className="container">hellooo</div>
        </Layout>
    )
}

export default Icons


export async function getStaticProps() {
    const iconsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/icons/1`,
        { headers: { Authorization: `bearer ${process.env.API_TOKEN}` } })
    console.log(iconsResponse)
    return {
        props: {
            iconlist: iconsResponse
        }
    }
}
