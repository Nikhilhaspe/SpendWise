/* eslint-disable react/prop-types */

// css module
import styles from "./Tags.module.css";

// context api
import { useTheme } from "../../contexts/ThemeContext";

function Tags(props) {
  // props
  const { tags = [], handleTagRemove = function () {} } = props;

  // context api
  const { theme } = useTheme();

  return (
    <div
      className={`${styles.tagsContainer} ${
        theme === "dark" ? "" : "lightModeText"
      }`}
    >
      {tags.map((tag, index) => {
        return (
          <div
            key={index}
            className={styles.tagsTab}
            onClick={() => handleTagRemove(tag)}
          >
            {tag} &times;
          </div>
        );
      })}
    </div>
  );
}

export default Tags;
