import Avatar from "avataaars";
import options from "./Options";
import { useState } from "react";
import styles from "./AvatarGenerator.module.scss";
import { getIdFromLocalCookie, getTokenFromServerCookie } from "@/lib/auth";
import { useRouter } from "next/router";
import { fetcher } from "@/lib/fetcher";

const AvatarGenerator = ({ user }) => {
  // console.log(`Logging user:\n${user}`)
  const [NewAvatar, setNewAvatar] = useState(null);
  const router = useRouter();

  const [Attributes, setAttributes] = useState({
    avatarStyle: "Circle",
    topType: "ShortHairDreads02",
    accessoriesType: "Prescription02",
    hairColor: "BrownDark",
    facialHairType: "Blank",
    clotheType: "Hoodie",
    clotheColor: "PastelBlue",
    eyeType: "Happy",
    eyebrowType: "Default",
    mouthType: "Smile",
    avatarStyle: "Circle",
    skinColor: "Light",
  });

  const submitAvatarChange = async () => {
    const formData = new FormData();
    formData.append("Avatar", JSON.stringify(Attributes));
    formData.append("user_id", await getIdFromLocalCookie());
    try {
      console.log("tried");
      const responseData = await fetcher("/api/changeAvatar", {
        // const responseData = await fetcher('/api/upload', {
        method: "POST",
        body: formData,
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
    <div className={styles.Container}>
      <div className={styles.AvatarWrapper}>
        <Avatar {...Attributes} style={{ width: "300px", height: "300px" }} />
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
        {/* </form> */}
      </div>
      <button
        type="submit"
        onClick={submitAvatarChange()}
        className={styles.SubmitAvatar}
      >
        Set Profile Image
      </button>
    </div>
  );
};

export default AvatarGenerator;
