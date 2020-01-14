import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import pinShape from '../../../helpers/propz/pinShape';

import './Pin.scss';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
    deletPin: PropTypes.func,
  }

  deletePinEvent = (e) => {
    e.preventDefault();
    const { deletePin, pin } = this.props;
    deletePin(pin.id);
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
          <p><a href={pin.url}>VIEW PIN</a> | <button className="btn btn-link" onClick={this.deletePinEvent}>DELETE PIN</button> | <Link className="btn btn-link" to={`/board/${pin.boardId}/pin/${pin.id}/edit`}>EDIT PIN</Link></p>
        </div>
        </div>
      </div>
    );
  }
}

export default Pin;
