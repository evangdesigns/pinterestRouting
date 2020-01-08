import React from 'react';

import pinShape from '../../../helpers/propz/pinShape';

import './Pin.scss';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="Pin card align-middle">
        <div className="card-body">
          <h3 className="card-title">{pin.name}</h3>
          <div className="image-container">
            <img src={pin.imageUrl} alt={pin.name} />
          </div>
        <div className="card-footer">
          <p><a href={pin.url}>VIEW PIN</a> | <button className="btn btn-link">DELETE PIN</button></p>
        </div>
        </div>
      </div>
    );
  }
}

export default Pin;
