import { fetcher } from '@/lib/api'
import Layout from '../components/Layout'

const Icons = ({ iconlist }) => {
    console.log(iconlist)

    // find all unique categories in the iconlist
    const categories = iconlist.data.map(icon => icon.attributes.Category)
    const uniqueCategories = [...new Set(categories)]
    console.log(uniqueCategories)

    // for each unique category, filter the iconlist and create a new array
    const categorizedItems = []
    for (let i = 0; i < uniqueCategories.length; i++) {
        const filteredIcons = iconlist.data.filter(icon => icon.attributes.Category === uniqueCategories[i])
        categorizedItems.push(filteredIcons)
        console.log(`logging filtered icons for ${uniqueCategories[i]}`)
        console.log(filteredIcons)
    }

    console.log(categorizedItems)

    // 

    return (
        <Layout>

            {/* map categorized Items into divs representing each category and containing every item from the current array pos */}

            {categorizedItems.map((category, key) => {
                return (
                    <div key={key}>
                        <h2>{category[0].attributes.Category}</h2>
                        {category.map((icon, key) => {
                            return (
                                <>
                                    <img src={icon.attributes.Icon.data.attributes.url} key={key} />
                                    <p key={`p-${key}`}>{icon.attributes.Title}</p>
                                </>
                            )
                        })}
                    </div>
                )
            })}

            {/* {iconlist && iconlist.data?.map((icon, key) => {
                return (
                    <>
                        <img src={icon.attributes.Icon.data.attributes.url} key={key} />
                        <p key={`p-${key}`}>{icon.attributes.Title}</p>
                    </>
                )
            })} */}
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
