export const ImageGalleryItem = ({ image, clickAction, bigImage }) => {
  const onImageClick = e => {
    clickAction(e.target.dataset.image);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        onClick={onImageClick}
        data-image={bigImage}
        className="ImageGalleryItem-image "
        src={image}
        alt=""
      />
    </li>
  );
};
