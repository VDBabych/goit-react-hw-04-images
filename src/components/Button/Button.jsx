export const Button = ({ clickAction }) => {
  const onClick = () => {
    clickAction(prev => prev + 1);
  };
  return (
    <button className="Button" onClick={onClick} type="button">
      Load more
    </button>
  );
};
