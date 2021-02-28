const Button = ({ onClick, children, ...rest }) => (
  <button
    onClick={onClick}
    className="bg-white py-1 px-2 m-1 border-double border-4 border-black shadow-md"
    {...rest}
  >
    {children}
  </button>
);

export default Button;
