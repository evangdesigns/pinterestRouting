import React from 'react';
import { Link } from 'react-router-dom';
import Pin from '../../shared/Pin/Pin';

import boardData from '../../../helpers/data/boardData';
import pinData from '../../../helpers/data/pinData';

import './SingleBoard.scss';

class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  }

  getPinData = (boardId) => {
    pinData.getPinsByBoardId(boardId)
      .then((pins) => this.setState({ pins }))
      .catch((err) => console.error('shit aint workin', err));
  }

  componentDidMount() {
    const { boardId } = this.props.match.params;
    boardData.getSingleBoard(boardId)
      .then((response) => {
        this.setState({ board: response.data });
        this.getPinData(boardId);
      })
      .catch((err) => console.error('this shit aint workin', err));
  }

  deletePin = (pinId) => {
    const { boardId } = this.props.match.params;
    pinData.deletePin(pinId)
      .then(() => this.getPinData(boardId))
      .catch((err) => console.error('error deleting pins', err));
  }

  render() {
    const { boardId } = this.props.match.params;
    const { board } = this.state;
    return (
      <div className="SingleBoard">
        <h1>{board.name}</h1>
        <Link className="btn btn-primary" to={`/board/${boardId}/pin/new`}>ADD A PIN</Link>
        <div className="d-flex flex-wrap justify-content-center">
        {this.state.pins.map((pin) => <Pin key={pin.id} pin={pin} deletePin={this.deletePin} />)}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
