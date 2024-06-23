import React from "react";
import { G_STATUS_KEY, G_STATUS_OBJECT } from "../../Utils/utils"; // Assuming G_STATUS_KEY and G_STATUS_OBJECT are imported from a utility file
import styles from "./select.module.css"; // Assuming CSS modules are used for styling

// Define props for CustomSelect component (props type is any)
const CustomSelect: React.FC<any> = (props) => {
  // Destructure G_STATUS_KEY array and skip the first element
  const [, ...restKeys] = G_STATUS_KEY;

  // Conditionally filter the list based on props.isTaskForm
  const filteredList = props?.isTaskForm ? restKeys : G_STATUS_KEY;

  // Render the select dropdown
  return (
    <div className={styles.selectContainer}>
      <select className={styles.select} {...props}>
        {/* Map through the filteredList to render each option */}
        {filteredList.map((item) => {
          return (
            <option key={item} value={item}>
              {/* Display the value from G_STATUS_OBJECT[item] */}
              {G_STATUS_OBJECT[item].value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CustomSelect; // Export the CustomSelect component
