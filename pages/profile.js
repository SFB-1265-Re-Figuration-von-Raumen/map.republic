import Avatar from "avataaars";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/components/AvatarGenerator/AvatarGenerator.module.scss";
import Layout from "@/components/Layout/Layout";
import { getIdFromLocalCookie, getTokenFromServerCookie } from "@/lib/auth";
import { useFetchUser } from "@/lib/authContext";
import { fetcher } from "@/lib/fetcher";
// import AvatarGenerator from '@/components/AvatarGenerator/AvatarGenerator';
import options from "@/components/AvatarGenerator/Options";

const Profile = ({ avatarConfig }) => {
  console.log(avatarConfig);
  const storedUserAvatar = JSON.parse(avatarConfig);
  console.log(storedUserAvatar);
  const { user, loading, role } = useFetchUser();
  const router = useRouter();

  const [Attributes, setAttributes] = useState(storedUserAvatar);
  // const [Attributes, setAttributes] = useState({
  //     avatarStyle: "Circle",
  //     topType: "ShortHairDreads02",
  //     accessoriesType: "Prescription02",
  //     hairColor: "BrownDark",
  //     facialHairType: "Blank",
  //     clotheType: "Hoodie",
  //     clotheColor: "PastelBlue",
  //     eyeType: "Happy",
  //     eyebrowType: "Default",
  //     mouthType: "Smile",
  //     avatarStyle: "Circle",
  //     skinColor: "Light",
  // });

  const submitAvatarChange = async () => {
    const formData = new FormData();
    const avatarString = JSON.stringify(Attributes);
    const id = await getIdFromLocalCookie();
    try {
      console.log("tried");
      const responseData = await fetcher("/api/changeAvatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Avatar: avatarString, user_id: id }),
      });
      if (responseData.message === "success") {
        router.reload("/profile");
        console.log("success!");
      }
    } catch (error) {
      console.error(JSON.stringify(error));
      console.log("failed");
    }
  };

  return (
    <Layout user={user} role={role}>
      <>
        <h1>
          Welcome back <span>{user}</span>
          <span>👋</span>
        </h1>

        <div className={styles.Container}>
          <div className={styles.AvatarWrapper}>
            <Avatar
              {...Attributes}
              style={{ width: "300px", height: "300px" }}
            />
          </div>

          <div className={styles.Options}>
            {options.map((option) => {
              return (
                <div className={styles.OptionElement} key={option.label}>
                  <h3>{option.label}</h3>
                  <select
                    onChange={(e) => {
                      setAttributes({
                        ...Attributes,
                        [option.attribute]: e.target.value,
                      });
                      console.log(Attributes);
                    }}
                    value={Attributes[option.attribute]}
                  >
                    {option.values.map((value) => {
                      return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            })}
          </div>
          <button
            type="submit"
            onClick={submitAvatarChange}
            className={styles.SubmitAvatar}
          >
            Set Profile Image
          </button>
        </div>
      </>
    </Layout>
  );
};

export default Profile;

export async function getServerSideProps({ req }) {
  const jwt = getTokenFromServerCookie(req);
  if (!jwt) {
    return {
      redirect: {
        destination: "/profile",
      },
    };
  } else {
    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const Avatar = responseData.Avatar ? responseData.Avatar : "default_avatar";
    return {
      props: {
        avatarConfig: Avatar,
      },
    };
  }
}
