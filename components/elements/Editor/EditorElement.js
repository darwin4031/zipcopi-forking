import EditorImageElement from "./EditorImageElement";

const EditorElement = ({ attributes, children, element }) => {
  switch (element.type) {
    case "image":
      return <EditorImageElement {...{ attributes, children, element }} />;
    case "blockquote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "unordered-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "ordered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default EditorElement;
