import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Spinner } from './Spinner/Spinner';
import { Modal } from './Modal/Modal';
import { getImages } from 'utils/getImages';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    isLoading: false,
    images: [],
    modalIsOpen: false,
    modalImage: '',
    btnShouldRender: false,
  };
  async componentDidUpdate(_, prev) {
    if (prev.query !== this.state.query || prev.page !== this.state.page) {
      this.setState({ btnShouldRender: false });
      try {
        this.setIsLoading(true);
        const data = await getImages({
          page: this.state.page,
          query: this.state.query,
        });
        this.updateImages(data.hits);
        this.state.page < Math.ceil(data.total / 12) &&
          this.setState({ btnShouldRender: true });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setIsLoading(false);
      }
    }
  }
  updateQuery = str => {
    this.setState({ query: str });
  };
  setPageToOne = () => {
    this.setState({ page: 1 });
  };
  pageIncrement = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };
  setModalImage = str => {
    this.setState({ modalImage: str });
  };
  setModalIsOpen = bool => {
    this.setState({ modalIsOpen: bool });
  };
  updateImages = arr => {
    this.setState(prev => ({ images: [...prev.images, ...arr] }));
  };
  setIsLoading = bool => {
    this.setState({ isLoading: bool });
  };
  onFormSubmit = str => {
    if (str === this.state.query) return;
    this.setPageToOne();
    this.updateQuery(str);
    this.setState({
      images: [],
    });
  };

  render() {
    return (
      <>
        <Searchbar submitAction={this.onFormSubmit} />
        {this.state.images.length !== 0 && (
          <ImageGallery
            data={this.state.images}
            clickAction={[this.setModalImage, this.setModalIsOpen]}
          />
        )}
        {this.state.isLoading && <Spinner />}
        {this.state.btnShouldRender && (
          <Button clickAction={this.pageIncrement} />
        )}
        {this.state.modalIsOpen && (
          <Modal
            image={this.state.modalImage}
            clickAction={this.setModalIsOpen}
          />
        )}
      </>
    );
  }
}
