import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Button, { ButtonIcon } from "~components/elements/Button";
import LoadingWrapper from "~components/elements/LoadingWrapper";
import IconMessage from "~components/svg/icon-message.svg";
import IconSend from "~components/svg/icon-send.svg";
import { AuthContext } from "~context/auth";
import styles from "./MessagesBox.module.scss";
import MessagesChat from "./MessagesChat";

const MessagesBox = ({ isLoading, messages, onSendMessage: propOnSendMessage }) => {
  const router = useRouter();
  const { auth } = useContext(AuthContext);
  const roomId = router.query.id;
  const [newMessage, setNewMessage] = useState("");

  const onMessageChange = (e) => setNewMessage(e.target.value);
  const onSendMessage = () => {
    propOnSendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className={styles.root}>
      {roomId ? (
        isLoading ? (
          <LoadingWrapper usePercentage>
            <WholeLoading />
          </LoadingWrapper>
        ) : (
          <div className={styles.box}>
            <div className={styles.boxBody}>
              {messages && messages.length ? (
                messages.map((item, i) => (
                  <MessagesChat
                    key={i}
                    userId={item.user.id}
                    date={item.created_at}
                    name={`${item.user.first_name} ${item.user.last_name}`}
                    message={item.message}
                    currentUserId={auth.id}
                  />
                ))
              ) : (
                <div className={styles.empty}>
                  <div>
                    <div className={styles.emptyIcon}>
                      <IconMessage />
                    </div>
                    <div className={styles.emptyText}>
                      This room doesn't have message yet, Let's start a new message!
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.boxFooter}>
              <div className={styles.boxFooter__flex}>
                <textarea
                  className={styles.boxFooter__textarea}
                  placeholder="Write your message ..."
                  value={newMessage}
                  onChange={onMessageChange}
                ></textarea>
                <Button
                  className={styles.boxFooter__btn}
                  type="fab"
                  variant="primary"
                  onClick={onSendMessage}
                >
                  <ButtonIcon svg={IconSend} />
                </Button>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className={styles.empty}>
          <div>
            <div className={styles.emptyIcon}>
              <IconMessage />
            </div>
            <div className={styles.emptyText}>Click on a message to open it</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesBox;
