export const ImageGalleryItem = ({ image, clickAction, bigImage }) => {
  const onImageClick = e => {
    clickAction[0](e.target.dataset.image);
    clickAction[1](true);
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
