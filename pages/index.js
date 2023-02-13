import { fetcher } from "./api/fetcher";
import Image from "next/image";
import { IconGallery } from "@/components/IconGallery/IconGallery";

export default function Home({ icons }) {
  return <IconGallery icons={icons} />;
}

export const getStaticProps = async () => {
  const icons = await fetcher(
    `${process.env.STRAPI_PUBLIC_URL}/icons?populate=*`,
    {
      headers: {
        Authorization: `bearer ${process.env.API_TOKEN_SALT}`,
      },
    }
  );

  return {
    props: {
      icons,
    },
  };
};
