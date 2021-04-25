import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { usePrevious } from "react-use";
import useWebSocket from "react-use-websocket";
import { H3 } from "~components/elements/Heading";
import LoadingWrapper from "~components/elements/LoadingWrapper";
import IconMessage from "~components/svg/icon-message.svg";
import { AuthContext } from "~context/auth";
import styles from "./Messages.module.scss";
import MessagesBox from "./MessagesBox";
import MessagesItem from "./MessagesItem";

const Messages = () => {
  const router = useRouter();
  const { auth } = useContext(AuthContext);
  const { id: roomId } = router.query;
  const prevRoomId = usePrevious(roomId);
  const isOpenedRoom = typeof roomId !== "undefined";
  const { data: roomsData, setData: setRoomsData, isFetching: isFetchingRooms } = useRoomsData();
  const { data: messages, setData: setMessages, isFetching: isFetchingMessages } = useRoomMessages(
    roomId
  );

  const [socketUrl, setSocketUrl] = useState(null);
  const { lastMessage, sendMessage } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
  });
  const prevLastMessage = usePrevious(lastMessage);
  const accessToken = JSON.parse(localStorage.getItem("token")).access;

  useEffect(() => {
    if (roomId && prevRoomId !== roomId) {
      const protocol = location.protocol === "https:" ? "wss:" : "ws:";
      setSocketUrl(`${protocol}//api.zipcopi.com/ws/rooms/${roomId}/?token=${accessToken}`);
    }
  }, [roomId, prevRoomId]);

  useEffect(() => {
    const shouldAppendMessage = lastMessage && lastMessage.data !== prevLastMessage?.data;

    if (shouldAppendMessage) {
      const socketMessage = JSON.parse(lastMessage.data);
      const currentRoomIndex = roomsData.findIndex((x) => x.id.toString() === roomId.toString());
      const currentRoom = roomsData[currentRoomIndex];
      const sender = currentRoom.participants.filter(
        (x) => x.id.toString() === socketMessage.user.user_id.toString()
      )[0];

      const newMessage = {
        created_at: socketMessage.created_at,
        id: messages.length - 1,
        message: socketMessage.message,
        room: socketMessage.room_id,
        user: sender,
      };
      setMessages([newMessage, ...messages]);

      // Update last_message of current room
      const newData = [...roomsData];
      newData[currentRoomIndex].last_message = newMessage;
      setRoomsData(newData);
    }
  }, [lastMessage, messages, prevLastMessage]);

  const onSendMessage = (message) => {
    const wsData = { message: message };
    sendMessage(JSON.stringify(wsData));
  };

  const getOnOpenRoom = (val) => () => {
    router.push({
      pathname: "/messages",
      query: {
        id: val.id,
      },
    });
  };

  return (
    <div className={clsx(styles.root, isOpenedRoom && styles.isOpenMessage)}>
      <div className={styles.box}>
        {isFetchingRooms ? (
          <LoadingWrapper usePercentage />
        ) : roomsData && roomsData.length > 0 ? (
          <>
            <div className={clsx(styles.flex, styles.header)}>
              <H3>Messages</H3>
              <H3 className={styles.messageId}>#279240</H3>
            </div>
            <div className={styles.body}>
              <div className={styles.list}>
                {roomsData.map((val, i) => (
                  <MessagesItem
                    key={i}
                    date={val.last_message?.created_at}
                    name={getParticipantsName({
                      currentUserId: auth?.id,
                      participants: val.participants,
                    })}
                    content={val.last_message?.message}
                    isActive={roomId?.toString() === val.id.toString()}
                    onClick={getOnOpenRoom(val)}
                  />
                ))}
              </div>
              <div className={styles.messagesBox}>
                <MessagesBox
                  isLoading={isFetchingMessages}
                  messages={messages}
                  onSendMessage={onSendMessage}
                />
              </div>
            </div>
          </>
        ) : (
          <div className={styles.body}>
            <div className={styles.empty}>
              <div>
                <div className={styles.emptyIcon}>
                  <IconMessage />
                </div>
                <div className={styles.emptyText}>You don't have a message yet</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function useRoomsData() {
  const [isFetching, setFetching] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = (refreshPolling = false) => {
    if (!isFetching && !refreshPolling) setFetching(true);
    //--prod if (refreshPolling) console.log("polling ...");

    axios
      .get("/rooms/")
      .then((res) => {
        setData(res.data.results);
        setFetching(false);
      })
      .catch((err) => {
        console.error("useRoomsData", { err });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const polling = setInterval(() => fetchData(true), 6000);
    //--prod console.log("register polling");
    return () => clearInterval(polling);
  }, []);

  return { data, isFetching, fetchData, setData };
}

function useRoomMessages(roomId) {
  const [data, setData] = useState([]);
  const [isFetching, setFetching] = useState(true);

  const fetchData = () => {
    if (!isFetching) setFetching(true);

    axios
      .get(`/rooms/${roomId}/messages/`)
      .then((res) => {
        setData(res.data.results);
        setFetching(false);
      })
      .catch((err) => {
        console.error({ err });
      });
  };

  useEffect(() => {
    if (roomId) {
      fetchData();
    } else {
      setFetching(false);
    }
  }, [roomId]);

  return { data, isFetching, setData };
}

function getParticipantsName({ currentUserId, participants }) {
  const exceptMyId = (x) => x.id !== currentUserId;
  const participantsExcludingMe = participants.filter(exceptMyId);
  const initString = "";
  const names = participantsExcludingMe.reduce(
    (prev, curr, i) =>
      i === 0
        ? `${curr.first_name} ${curr.last_name}`
        : `${prev}, ${curr.first_name} ${curr.last_name}`,
    initString
  );
  return names;
}

export default Messages;
