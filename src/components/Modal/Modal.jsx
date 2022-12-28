import { Component } from 'react';

export class Modal extends Component {
  onEscClick = e => {
    if (e.key !== 'Escape') {
      return;
    }
    this.props.clickAction(false);
  };

  onOverlayClick = () => {
    this.props.clickAction(false);
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClick);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClick);
  }
  render() {
    return (
      <div onClick={this.onOverlayClick} className="Overlay">
        <div className="Modal">
          <img src={this.props.image} alt="" />
        </div>
      </div>
    );
  }
}
