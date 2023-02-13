import styles from "./IconGallery.module.scss";
import Image from "next/image";

export const IconGallery = ({ icons }) => {
  console.log(icons);

  // find all unique categories in the icons
  const categories = icons.data?.map((icon) => icon.attributes.Category);
  const uniqueCategories = [...new Set(categories)];
  console.log(uniqueCategories);

  // for each unique category, filter the icons and create a new array
  const categorizedItems = [];
  for (let i = 0; i < uniqueCategories.length; i++) {
    const filteredIcons = icons.data.filter(
      (icon) => icon.attributes.Category === uniqueCategories[i]
    );
    categorizedItems.push(filteredIcons);
    console.log(`logging filtered icons for ${uniqueCategories[i]}`);
    console.log(filteredIcons);
  }

  console.log(categorizedItems);

  return (
    <div className={styles.Container}>
      {categorizedItems.map((category, key) => {
        return (
          <div>
            {category[0].attributes.Category}
            {category.map((icon, key) => {
              return (
                <div className={styles.IconWrapper} key={key}>
                  <Image
                    src={icon.attributes.Icon.data.attributes.url}
                    key={key}
                    width={icon.attributes.Icon.data.attributes.width}
                    height={icon.attributes.Icon.data.attributes.height}
                    alt={icon.attributes.Title}
                  />
                  <h3>{icon.attributes.Title}</h3>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
