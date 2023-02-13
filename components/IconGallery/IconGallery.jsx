import styles from "./IconGallery.module.scss";
import Image from "next/image";

export const IconGallery = ({ icons }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Scroller}>
        {icons.data?.map((icon, key) => {
          //if icons.data.catageory is equal to the category "Activities", then return the icon

          return (
            icon.attributes.Category === "Activities" && (
              <div className={styles.IconWrapper}>
                <Image
                  src={icon.attributes.Icon.data.attributes.url}
                  key={key}
                  width={icon.attributes.Icon.data.attributes.width}
                  height={icon.attributes.Icon.data.attributes.height}
                  alt={icon.attributes.Title}
                />
                <h3>{icon.attributes.Title}</h3>
              </div>
            )
          );
        })}
      </div>
      {/* do the same for People, Places and Feelings */}

      {/* <div className={styles.Scroller}>
        {icons.data?.map((icon, key) => {
          return (
            icon.attributes.Category === "Feelings" && (
                <div className={styles.IconWrapper}>
                <Image
                  src={icon.attributes.Icon.data.attributes.url}
                  key={key}
                  width={icon.attributes.Icon.data.attributes.width}
                  height={icon.attributes.Icon.data.attributes.height}
                  alt={icon.attributes.Title}
                />
                <h3>{icon.attributes.Title}</h3>
              </div>
            )
          );
        })}
      </div>
      <div className={styles.Scroller}>
        {icons.data?.map((icon, key) => {
          return (
            icon.attributes.Category === "People" && (
                <div className={styles.IconWrapper}>
                <Image
                  src={icon.attributes.Icon.data.attributes.url}
                  key={key}
                  width={icon.attributes.Icon.data.attributes.width}
                  height={icon.attributes.Icon.data.attributes.height}
                  alt={icon.attributes.Title}
                />
                <h3>{icon.attributes.Title}</h3>
              </div>
            )
          );
        })}
      </div>
      <div className={styles.Scroller}>
        {icons.data?.map((icon, key) => {
          return (
            icon.attributes.Category === "Places" && (
                <div className={styles.IconWrapper}>
                <Image
                  src={icon.attributes.Icon.data.attributes.url}
                  key={key}
                  width={icon.attributes.Icon.data.attributes.width}
                  height={icon.attributes.Icon.data.attributes.height}
                  alt={icon.attributes.Title}
                />
                <h3>{icon.attributes.Title}</h3>
              </div>
            )
          );
        })}
      </div> */}
    </div>
  );
};
