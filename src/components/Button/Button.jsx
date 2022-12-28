export const Button = ({ clickAction, api, setIsLoading }) => {
  const onBtnClick = async () => {
    api.pageIncrement();
    try {
      setIsLoading(true);
      const images = await api.getImages();
      clickAction(images);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button className="Button" onClick={onBtnClick} type="button">
      Load more
    </button>
  );
};
