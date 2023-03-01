import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { fetcher } from '@/lib/fetcher';
import { getIdFromLocalCookie, getTokenFromServerCookie } from '@/lib/auth';
import { useFetchUser } from '@/lib/authContext';
// import AvatarGenerator from '@/components/AvatarGenerator/AvatarGenerator';
import { Avatar } from 'avataaars';
import styles from '@/components/AvatarGenerator/AvatarGenerator.module.scss';
import options from '@/components/AvatarGenerator/Options';


const Profile = ({ avatar }) => {
    const { user, loading } = useFetchUser();
    // const [image, setImage] = useState(null);
    const router = useRouter();

    const [NewAvatar, setNewAvatar] = useState(null);
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
        formData.append('Avatar', JSON.stringify(Attributes));
        formData.append('user_id', await getIdFromLocalCookie());
        try {
            console.log("tried")
            const responseData = await fetcher('/api/changeAvatar', {
                // const responseData = await fetcher('/api/upload', {
                method: 'POST',
                body: formData,
            });
            if (responseData.message === 'success') {
                router.reload('/profile');
                console.log("success!")
            }
        } catch (error) {
            console.error(JSON.stringify(error));
            console.log("failed")
        }
    };

    // const uploadToClient = (event) => {
    //     if (event.target.files && event.target.files[0]) {
    //         const tmpImage = event.target.files[0];
    //         setImage(tmpImage);
    //     }
    // };
    // const uploadToServer = async () => {
    //     const formData = new FormData();
    //     const file = image;
    //     // const avatar = /
    //     // formData.append('inputFile', file);
    //     formData.append('user_id', await getIdFromLocalCookie());
    //     try {
    //         const responseData = await fetcher('/api/upload', {
    //             method: 'POST',
    //             body: formData,
    //         });
    //         if (responseData.message === 'success') {
    //             router.reload('/profile');
    //         }
    //     } catch (error) {
    //         console.error(JSON.stringify(error));
    //     }
    // };
    return (
        <Layout user={user}>
            <>
                <h1>
                    Welcome back{' '}
                    <span>
                        {user}
                    </span>
                    <span>👋</span>
                </h1>


                <div className={styles.Container}>
                    <div className={styles.AvatarWrapper}>
                        <Avatar {...Attributes} style={{ width: '300px', height: '300px' }} />
                    </div>

                    <div className={styles.Options}>

                        {options.map((option) => {
                            return (
                                <div className={styles.OptionElement}
                                    key={option.label}>
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
                                                <option
                                                    key={value}
                                                    value={value}
                                                >
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
                {/* <AvatarGenerator/> */}
                {/* {avatar === 'default_avatar' && (
                    <div>
                        <h4>Select an image to upload</h4>
                        <input type="file" onChange={uploadToClient} />
                        <button
                            className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                            type="submit"
                            onClick={uploadToServer}
                        >
                            Set Profile Image
                        </button>
                    </div>
                )} */}
                {/* eslint-disable @next/next/no-img-element */}
                {/* {avatar && (
                    <img
                        src={`https://res.cloudinary.com/tamas-demo/image/upload/f_auto,q_auto,w_150,h_150,g_face,c_thumb,r_max/${avatar}`}
                        alt="Profile"
                    />
                )} */}
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
                destination: '/profile',
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
        const avatar = responseData.avatar ? responseData.avatar : 'default_avatar';
        return {
            props: {
                avatar,
            },
        };
    }
}