import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Message from 'Components/MessageList/Message';
import { DataInterface, MessageInterface } from 'Utils/Interface';
import 'Components/MessageList/scss/MessageList.scss';
import { ReplyDataInterface } from 'Utils/Interface';
import { RootStateType } from 'Store/Reducers';

interface MessageListProps {
  setReplyData: (data: ReplyDataInterface) => void;
}

const MessageList: React.FC<MessageListProps> = ({ setReplyData }) => {
  const allMessages = useSelector(
    (state: RootStateType) => state.message.allMessages
  );
  // const allMessages = useSelector((state: any) => state.message.allMessages);
  // console.log(allMessages);
  allMessages &&
    allMessages.sort((a, b) => {
      return Date.parse(a.date) - Date.parse(b.date);
    });

  const user = useSelector((state: RootStateType) => state.message.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [allMessages]);
  console.log(allMessages);

  return (
    <section className="messageList">
      {allMessages &&
        allMessages.map((message: MessageInterface) => (
          <Message
            key={message.id}
            message={message}
            host={user}
            setReplyData={setReplyData}
          />
        ))}
      <div ref={messagesEndRef}></div>
    </section>
  );
};

export default MessageList;
