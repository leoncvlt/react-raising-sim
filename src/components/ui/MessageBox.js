const MessageBox = ({ onClick, clickable, children }) => (
  <div
    onClick={onClick}
    className={`select-none p-4 bg-black text-white border-solid border border-white ${
      clickable && "cursor-pointer"
    }`}
    style={{ position: "relative" }}
  >
    <p>{children}</p>
    {clickable && (
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          transform: "translate(-50%, 50%)"
        }}
      >
        ▼
      </div>
    )}
  </div>
);

export default MessageBox;
