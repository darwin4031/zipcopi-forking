const EditorLeaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong {...attributes}>{children}</strong>;
  }

  if (leaf.italic) {
    children = <i {...attributes}>{children}</i>;
  }

  return <span {...attributes}>{children}</span>;
};

export default EditorLeaf;
