// "use client"

import Avatar from 'avataaars'
import options from './Options';
import { useState } from 'react';
import styles from './AvatarGenerator.module.scss';
import { getIdFromLocalCookie, getTokenFromServerCookie } from '@/lib/auth';
import { useRouter } from 'next/router';

const AvatarGenerator = () => {
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

    const uploadToClient = (event) => {
        setNewAvatar(Attributes)
        // if (event.target.files && event.target.files[0]) {
        //     const tmpImage = event.target.files[0];
        //     setImage(tmpImage);
        // }
    };

    const uploadToServer = async () => {
        console.log(Attributes)
        const formData = new FormData();
        formData.append('Avatar', JSON.stringify(Attributes));
        formData.append('user_id', await getIdFromLocalCookie());
        console.log(formData)
        try {
            const responseData = await fetcher('/api/upload', {
                method: 'POST',
                body: formData,
            });
            if (responseData.message === 'success') {
                router.reload('/profile');
            }
        } catch (error) {
            console.error(JSON.stringify(error));
        }
    };

    // // onclick function that pushes the attributes to the avatar property accociated with the current user
    // const setUserAvatar = (Attributes) => {
    //     console.log("Attributes: ", Attributes)
    // }
    return (
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
                            // selected={Attributes[option.attribute] === value}
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
                onClick={() => uploadToServer()}
                className={styles.SubmitAvatar}
            >
                Set Profile Image
            </button>
            {/* <button className={styles.SubmitAvatar} onClick={
                () => setUserAvatar(Attributes)
            }>Confirm Choice</button> */}
        </div>
    )
}

export default AvatarGenerator
