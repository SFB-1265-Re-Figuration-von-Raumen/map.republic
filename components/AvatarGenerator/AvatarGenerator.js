// "use client"

import Avatar from 'avataaars'
import options from './Options';
import { useState } from 'react';
import styles from './AvatarGenerator.module.scss';

const AvatarGenerator = () => {
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
        viewBox: "0 0 100 100"
    });

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
            {/* <button onClick={
                () => setUserAvatar(Attributes)
            }>Confirm Choice</button> */}
        </div>
    )
}

export default AvatarGenerator
