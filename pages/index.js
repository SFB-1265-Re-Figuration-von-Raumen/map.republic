import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import { IconGallery } from "@/components/IconGallery/IconGallery";
import Nav from "@/components/Nav/Nav";
import Layout from "@/components/Layout/Layout";
import { useFetchUser } from "@/lib/authContext";

export default function Home({ icons }) {
  const { user, loading, role } = useFetchUser();
  return (
    <Layout user={user} role={role}>
      <>
        <IconGallery icons={icons} />
      </>
    </Layout>
  );
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
