import Avatar from 'avataaars'
import options from './options';
import { useState } from 'react';
import styles from './AvatarGenerator.module.scss';

const AvatarGenerator = () => {
    console.log("options: ", options)
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

    return (
        <div className={styles.Container}>
            Your avatar:
            <Avatar {...Attributes} />
            <h2>Options</h2>
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
                            >
                                {option.values.map((value) => {
                                    return (
                                        <option
                                            key={value}
                                            value={value}
                                            selected={Attributes[option.attribute] === value}
                                        >
                                            {value}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    );
                })}
                <button onClick={
                    (e) => console.log(Attributes)
                    // push to strapi!
                }>Confirm Choice</button>
            </div>
        </div>
    )
}

export default AvatarGenerator
