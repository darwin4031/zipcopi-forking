import dynamic from "next/dynamic";
import JobFiles from "../_components/JobFiles";

const Editor = dynamic(() => import("~components/elements/Editor/Editor"), {
  ssr: false,
});

const WriterWork = ({ data }) => {
  const { content, files } = data;
  return (
    <div>
      <Editor readOnly value={JSON.parse(content)} />
      <JobFiles files={files} />
    </div>
  );
};

export default WriterWork;
