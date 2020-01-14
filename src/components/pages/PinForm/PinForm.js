import React from 'react';

import authData from '../../../helpers/data/authData';
import pinData from '../../../helpers/data/pinData';

import './PinForm.scss';

class PinForm extends React.Component {
  state = {
    pinName: '',
    pinImageUrl: '',
  }

  componentDidMount() {
    const { pinId } = this.props.match.params;
    if (pinId) {
      pinData.getSinglePin(pinId)
        .then((request) => {
          const pin = request.data;
          this.setState({ pinName: pin.name, pinImageUrl: pin.imageUrl });
        })
        .catch((err) => console.error('error with single Pin', err));
    }
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ pinName: e.target.value });
  }

  imageChange = (e) => {
    e.preventDefault();
    this.setState({ pinImageUrl: e.target.value });
  }

  savePinEvent = (e) => {
    e.preventDefault();
    const { boardId } = this.props.match.params;
    const newPin = {
      name: this.state.pinName,
      imageUrl: this.state.pinImageUrl,
      uid: authData.getUid(),
      boardId,
    };
    pinData.savePin(newPin)
      .then(() => this.props.history.push(`/board/${boardId}`))
      .catch((errFromAddPin) => console.error(errFromAddPin));
  }

  updatePinEvent = (e) => {
    e.preventDefault();
    const { boardId, pinId } = this.props.match.params;
    const updatePin = {
      name: this.state.pinName,
      imageUrl: this.state.pinImageUrl,
      uid: authData.getUid(),
      boardId,
    };
    pinData.updatePin(updatePin, pinId)
      .then(() => this.props.history.push(`/board/${boardId}`))
      .catch((errFromAddPin) => console.error(errFromAddPin));
  }

  render() {
    const { pinName, pinImageUrl } = this.state;
    const { pinId } = this.props.match.params;
    return (
      <div className="PinForm">
      <form className="col-6 offset-3">
        <div className="form-group">
          <label htmlFor="pin-name">Pin Name</label>
          <input
          type="text"
          className="form-control"
          id="pin-name"
          placeholder="Enter pin name"
          value={pinName}
          onChange={this.nameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pin-image-url">Pin Name</label>
          <input
          type="text"
          className="form-control"
          id="pin-image-url"
          placeholder="Enter pin image url"
          value={pinImageUrl}
          onChange={this.imageChange}
          />
        </div>
        { pinId
          ? <button className="btn btn-danger" onClick={this.updatePinEvent}>UPDATE PIN</button>
          : <button className="btn btn-danger" onClick={this.savePinEvent}>SAVE PIN</button>
        }
      </form>
      </div>
    );
  }
}

export default PinForm;
