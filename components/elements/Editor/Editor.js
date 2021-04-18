import imageExtension from "image-extensions";
import isHotkey from "is-hotkey";
import { useCallback, useMemo } from "react";
import { createEditor, Editor as SlateEditor, Element, Transforms } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import IconEditorBlockquote from "~components/svg/icon-editor-blockquote.svg";
import IconEditorBold from "~components/svg/icon-editor-bold.svg";
import IconEditorItalic from "~components/svg/icon-editor-italic.svg";
import IconEditorLink from "~components/svg/icon-editor-link.svg";
import IconEditorOL from "~components/svg/icon-editor-ordered-list.svg";
import IconEditorUL from "~components/svg/icon-editor-unordered-list.svg";
import styles from "./Editor.module.scss";
import EditorButtonToggler from "./EditorButtonToggler";
import EditorElement from "./EditorElement";
import EditorHotKeys from "./EditorHotKeys";
import EditorInsertImage from "./EditorInsertImage";
import EditorLeaf from "./EditorLeaf";
import EditorListTypes from "./EditorListTypes";

const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtension.includes(ext);
};

const insertImage = (editor, url) => {
  const paragraph = {
    type: "paragraph",
    children: [{ text: "" }],
  };
  const image = { type: "image", url, children: [{ text: "" }] };
  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, paragraph);
};

/**
 * @param {SlateEditor & ReactEditor} editor
 */
const withImages = (editor) => {
  const { insertData, isVoid, isInline, insertText } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    /** @type {{files: File[]}} */
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const isBlockActive = (editor, format) => {
  const [match] = SlateEditor.nodes(editor, {
    match: (n) => !SlateEditor.isEditor(n) && Element.isElement(n) && n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = SlateEditor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = EditorListTypes.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      EditorListTypes.includes(!SlateEditor.isEditor(n) && Element.isElement(n) && n.type),
    split: true,
  });

  const newProperties = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };

  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    SlateEditor.removeMark(editor, format);
  } else {
    SlateEditor.addMark(editor, format, true);
  }
};

/**
 * Editor
 */
const Editor = ({ readOnly, value, onChange }) => {
  const rElement = useCallback((props) => <EditorElement {...props} />, []);
  const rLeaf = useCallback((props) => <EditorLeaf {...props} />, []);

  const editor = useMemo(() => withImages(withReact(createEditor())), []);
  // const [value, setValue] = useState([
  //   {
  //     type: "paragraph",
  //     children: [{ text: "" }],
  //   },
  // ]);

  /**
   * onKeyDown
   * @param {Event} e
   */
  const onKeyDown = (e) => {
    for (const hotkey in EditorHotKeys) {
      if (isHotkey(hotkey, e)) {
        e.preventDefault();
        const mark = EditorHotKeys[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  return (
    <div className={styles.root}>
      <Slate editor={editor} value={value} onChange={(newValue) => onChange(newValue)}>
        <div className={styles.header}>
          <div className={styles.title}>Job Output Detail</div>
          {!readOnly ? (
            <div className={styles.toolbar}>
              <div>
                <EditorButtonToggler
                  iconSvg={IconEditorBold}
                  checkActive={isMarkActive}
                  format="bold"
                  onMouseDown={() => toggleMark(editor, "bold")}
                />
              </div>
              <div>
                <EditorButtonToggler
                  iconSvg={IconEditorItalic}
                  checkActive={isMarkActive}
                  format="italic"
                  onMouseDown={() => toggleMark(editor, "italic")}
                />
              </div>
              <div>
                <EditorButtonToggler
                  iconSvg={IconEditorLink}
                  checkActive={isBlockActive}
                  format="anchor"
                  onMouseDown={() => toggleBlock(editor, "anchor")}
                />
              </div>
              <div>
                <EditorButtonToggler
                  iconSvg={IconEditorUL}
                  checkActive={isBlockActive}
                  format="unordered-list"
                  onMouseDown={() => toggleBlock(editor, "unordered-list")}
                />
              </div>
              <div>
                <EditorButtonToggler
                  iconSvg={IconEditorOL}
                  checkActive={isBlockActive}
                  format="ordered-list"
                  onMouseDown={() => toggleBlock(editor, "ordered-list")}
                />
              </div>
              <div>
                <EditorButtonToggler
                  iconSvg={IconEditorBlockquote}
                  checkActive={isBlockActive}
                  format="blockquote"
                  onMouseDown={() => toggleBlock(editor, "blockquote")}
                />
              </div>
              <div>
                <EditorInsertImage onInsertImage={(url) => insertImage(editor, url)} />
              </div>
            </div>
          ) : null}
        </div>
        <Editable
          renderElement={rElement}
          renderLeaf={rLeaf}
          placeholder="Upload job outputs ..."
          onKeyDown={onKeyDown}
          className={styles.editable}
          readOnly={readOnly}
        />
      </Slate>
    </div>
  );
};

export default Editor;
