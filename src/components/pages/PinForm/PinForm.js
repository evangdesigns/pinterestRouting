import React from 'react';

import authData from '../../../helpers/data/authData';
import pinData from '../../../helpers/data/pinData';

import './PinForm.scss';

class PinForm extends React.Component {
  state = {
    pinTitle: '',
    pinImageUrl: '',
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ pinTitle: e.target.value });
  }

  imageChange = (e) => {
    e.preventDefault();
    this.setState({ pinImageUrl: e.target.value });
  }

  savePinEvent = (e) => {
    e.preventDefault();
    const { boardId } = this.props.match.params;
    const newPin = {
      title: this.state.pinTitle,
      imageUrl: this.state.pinImageUrl,
      uid: authData.getUid(),
      boardId,
    };
    pinData.savePin(newPin)
      .then(() => this.props.history.push(`/board/${boardId}`))
      .catch((errFromAddPin) => console.error(errFromAddPin));
  }

  render() {
    const { pinTitle } = this.state;
    return (
      <div className="PinForm">
      <form className="col-6 offset-3">
        <div className="form-group">
          <label htmlFor="pin-title">Pin Title</label>
          <input
          type="text"
          className="form-control"
          id="pin-title"
          placeholder="Enter pin title"
          value={pinTitle}
          onChange={this.titleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pin-image-url">Pin Title</label>
          <input
          type="text"
          className="form-control"
          id="pin-image-url"
          placeholder="Enter pin image url"
          value={this.pinImageUrl}
          onChange={this.imageChange}
          />
        </div>
        <button className="btn btn-danger" onClick={this.savePinEvent}>SAVE PIN</button>
      </form>
      </div>
    );
  }
}

export default PinForm;
