const CustomError = ({ message }) => {
  return (
    <div className="p-4">
      <div className="alert alert-danger" role="alert" id="liveAlert">
        ERROR: <strong>{message}</strong>
      </div>
    </div>
  );
};

export default CustomError;
