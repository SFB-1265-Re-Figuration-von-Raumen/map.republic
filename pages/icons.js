import { fetcher } from '@/lib/api'
import Layout from '../components/Layout'

const Icons = ({ iconlist }) => {
    console.log(iconlist)

    return (
        <Layout>
            {iconlist && iconlist.data?.map((icon, key) => {
                return (
                    <>
                        <img src={icon.attributes.Icon.data.attributes.url} key={key} />
                        <p key={`p-${key}`}>{icon.attributes.Title}</p>
                    </>
                )
            })}
        </Layout>
    )
}

export default Icons


export async function getStaticProps() {
    const iconsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/icons/?populate=*`,
        { headers: { Authorization: `bearer ${process.env.API_TOKEN}` } })
    // console.log(iconsResponse)
    return {
        props: {
            iconlist: iconsResponse
        }
    }
}
