import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Spinner } from './Spinner/Spinner';
import { Modal } from './Modal/Modal';
import { getImages } from 'utils/getImages';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState('');
  const [btnShouldRender, setBtnShouldRender] = useState(false);
  useEffect(() => {
    if (query === null) {
      return;
    }
    (async () => {
      setBtnShouldRender(false);
      try {
        setIsLoading(true);
        const data = await getImages({
          page,
          query,
        });
        setImages(prev => [...prev, ...data.hits]);
        page < Math.ceil(data.total / 12) && setBtnShouldRender(true);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, query]);

  const onFormSubmit = str => {
    if (str === query) return;
    setPage(1);
    setQuery(str);
    setImages([]);
  };

  return (
    <>
      <Searchbar submitAction={onFormSubmit} />
      {images.length !== 0 && (
        <ImageGallery data={images} clickAction={setModalImage} />
      )}
      {isLoading && <Spinner />}
      {btnShouldRender && <Button clickAction={setPage} />}
      {modalImage && <Modal image={modalImage} clickAction={setModalImage} />}
    </>
  );
};
