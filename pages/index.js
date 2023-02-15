import { fetcher } from "./api/fetcher";
import Image from "next/image";
import { IconGallery } from "@/components/IconGallery/IconGallery";
import Nav from "@/components/Nav";
import Layout from "@/components/Layout/Layout";
import { useFetchUser } from "@/pages/api/authContext";
// const { useFetchUser } = require('@/pages/api/authContext');

export default function Home({ icons }) {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user}>
      <>
        <IconGallery icons={icons} />
      </>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const icons = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/icons?populate=*`,
    {
      headers: {
        Authorization: `bearer ${process.env.API_TOKEN}`,
      },
    }
  );

  return {
    props: {
      icons,
    },
  };
};
