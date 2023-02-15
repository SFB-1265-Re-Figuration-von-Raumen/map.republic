import { fetcher } from "./api/fetcher";
import { signOut, useSession } from 'next-auth/react';
import Image from "next/image";
import { IconGallery } from "@/components/IconGallery/IconGallery";
import { useEffect } from "react";
import Link from "next/link";

export default function Home({ icons }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session == null) return;
    console.log('session.jwt', session.jwt);
  }, [session]);

  return (
    <>
      <div>
        <h1>{session ? 'Authenticated' : 'Not Authenticated'}</h1>
        {session && (
          <div style={{ marginBottom: 10 }}>
            <h3>Session Data</h3>
            <div>Email: {session.user.email}</div>
            <div>JWT from Strapi: Check console</div>
          </div>
        )}
        {session ? (
          <button onClick={signOut}>Sign out</button>
        ) : (
          <Link href="/auth/sign-in">
            <button>Sign In</button>
          </Link>
        )}
        <Link href="/protected">
          <button
            style={{
              marginTop: 10,
            }}
          >
            Protected Page
          </button>
        </Link>
      </div>
      <IconGallery icons={icons} />;
    </>
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
