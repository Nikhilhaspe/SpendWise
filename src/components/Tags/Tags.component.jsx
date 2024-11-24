/* eslint-disable react/prop-types */

// css module
import styles from "./Tags.module.css";

function Tags(props) {
  // props
  const { tags = [], handleTagRemove = function () {} } = props;

  return (
    <div className={styles.tagsContainer}>
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
