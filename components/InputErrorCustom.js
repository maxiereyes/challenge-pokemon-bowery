const InputErrorCustom = ({ text, isValid }) => {
  return (
    <div className={isValid ? "valid-feedback" : "invalid-feedback"}>
      {text}
    </div>
  );
};

export default InputErrorCustom;
