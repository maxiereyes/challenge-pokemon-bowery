import styles from "./ListMoves.module.css";

const ListMoves = ({ moves }) => {
  return (
    <div className={`${styles.moves_custom} px-2`}>
      <ul
        className={`${styles.moves_custom} list-group overflow-auto list-group-flush`}
      >
        {!moves
          ? null
          : moves.map(({ move }, index) => (
              <li key={index} className="list-group-item">
                {move.name}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default ListMoves;
