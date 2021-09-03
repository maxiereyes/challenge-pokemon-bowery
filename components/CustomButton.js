const CustomButton = ({ text, action }) => {
  return (
    <div>
      <a className="btn btn-outline-secondary" onClick={action}>
        {text}
      </a>
    </div>
  );
};

export default CustomButton;
