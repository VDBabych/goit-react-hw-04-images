import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { PixabayApi } from 'utils/PixabayApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Spinner } from './Spinner/Spinner';
import { Modal } from './Modal/Modal';
const pixabayApi = new PixabayApi();

export class App extends Component {
  state = {
    query: '',
    isLoading: false,
    images: [],
    modalIsOpen: false,
    modalImage: '',
  };
  updateQuery = str => {
    this.setState({
      query: str,
    });
  };
  setModalImage = str => {
    this.setState({
      modalImage: str,
    });
  };
  updateModalIsOpen = bool => {
    this.setState({
      modalIsOpen: bool,
    });
  };
  updateImages = arr => {
    this.setState(prev => ({
      images: [...prev.images, ...arr],
    }));
  };
  setIsLoading = bool => {
    this.setState({
      isLoading: bool,
    });
  };
  async componentDidUpdate(_, prev) {
    if (prev.modalImage !== this.state.modalImage) {
      this.updateModalIsOpen(true);
    }

    if (prev.query !== this.state.query) {
      pixabayApi.setPageToDefault();
      pixabayApi.setQuery(this.state.query);
      try {
        this.setIsLoading(true);
        const images = await pixabayApi.getImages();
        this.setState({
          images: images,
        });
      } catch (error) {
      } finally {
        this.setIsLoading(false);
      }
    }
  }

  render() {
    const btnShouldRender =
      this.state.images.length > 0 &&
      pixabayApi.getAvaliablePages() > pixabayApi.getPage();
    return (
      <>
        <Searchbar submitAction={this.updateQuery} />
        {this.state.images.length !== 0 && (
          <ImageGallery
            data={this.state.images}
            clickAction={[this.setModalImage, this.updateModalIsOpen]}
          />
        )}
        {this.state.isLoading && <Spinner />}
        {btnShouldRender && (
          <Button
            clickAction={this.updateImages}
            api={pixabayApi}
            setIsLoading={this.setIsLoading}
          />
        )}
        {this.state.modalIsOpen && (
          <Modal
            image={this.state.modalImage}
            clickAction={this.updateModalIsOpen}
          />
        )}
      </>
    );
  }
}
