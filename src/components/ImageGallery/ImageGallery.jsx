import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ data, clickAction }) => {
  return (
    <ul className="ImageGallery">
      {data.map(el => (
        <ImageGalleryItem
          key={el.id}
          clickAction={clickAction}
          image={el.webformatURL}
          bigImage={el.largeImageURL}
        />
      ))}
    </ul>
  );
};
