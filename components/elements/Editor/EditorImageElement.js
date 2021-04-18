import clsx from "clsx";
import { useFocused, useSelected } from "slate-react";
import styles from "./EditorImageElement.module.scss";

const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          className={clsx(styles.imageElement__img, {
            [styles.isSelected]: selected,
            [styles.isFocused]: focused,
          })}
          src={element.url}
        />
      </div>
      {children}
    </div>
  );
};

export default ImageElement;
