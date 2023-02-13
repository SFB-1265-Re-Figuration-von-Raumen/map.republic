import { fetcher } from "./api/fetcher";
import Image from "next/image";
import { IconGallery } from "@/components/IconGallery/IconGallery";

export default function Home({ icons }) {
  return <IconGallery icons={icons} />;
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
