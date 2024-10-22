/* eslint-disable react/prop-types */
const Message = ({ notification }) => {
  console.log(notification);
  return (
    <>
      <div id="notificationHeader">
        <span>{notification.title}</span>
      </div>
      <div id="notificationBody">{notification.body}</div>
    </>
  );
};

export default Message;
