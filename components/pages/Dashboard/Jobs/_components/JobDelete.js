import useOpen from "~hooks/useOpen";

const JobDelete = ({ jobId, paymentStatus }) => {
  const { isOpen, onOpen, onClose } = useOpen();
  if (paymentStatus === "paid") return null;

  return <div></div>;
};

export default JobDelete;
