import { FidgetSpinner } from 'react-loader-spinner';

export const Spinner = () => {
  return (
    <div className="Overlay">
      <FidgetSpinner
        visible={true}
        height="300"
        width="300"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        ballColors={['#ff0000', '#00ff00', '#0000ff']}
        backgroundColor="#F4442E"
      />
    </div>
  );
};
