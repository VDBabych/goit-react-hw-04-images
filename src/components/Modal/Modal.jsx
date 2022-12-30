import { useEffect } from 'react';

export const Modal = ({ image, clickAction }) => {
  useEffect(() => {
    const onEscClick = e => {
      if (e.key !== 'Escape') {
        return;
      }
      clickAction('');
    };
    window.addEventListener('keydown', onEscClick);
    return () => {
      window.removeEventListener('keydown', onEscClick);
    };
  }, [clickAction]);

  const onOverlayClick = () => {
    clickAction('');
  };

  return (
    <div onClick={onOverlayClick} className="Overlay">
      <div className="Modal">
        <img src={image} alt="" />
      </div>
    </div>
  );
};
