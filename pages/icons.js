import { fetcher } from '@/lib/api'
import Layout from '../components/Layout'
// import useSWR from 'swr'

const Icons = ({ iconlist }) => {
    // const useSWR()

    return (
        <Layout>
            {iconlist && iconlist.data?.map((icon, key) => {
                return <img src={icon.attributes.Icon.data.attributes.url} key={key} />;
            })}
        </Layout>
    )
}

export default Icons


export async function getStaticProps() {
    const iconsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/icons/?populate=*`,
        { headers: { Authorization: `bearer ${process.env.API_TOKEN}` } })
    console.log(iconsResponse)
    return {
        props: {
            iconlist: iconsResponse
        }
    }
}
