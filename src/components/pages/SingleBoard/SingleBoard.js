import React from 'react';

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
      .catch((err) => console.error('shit ant workin', err));
  }

  componentDidMount() {
    const { boardId } = this.props.match.params;
    boardData.getSingleBoard(boardId)
      .then((response) => {
        this.setState({ board: response.data });
        this.getPinData(boardId);
      })
      .catch((err) => console.error('thi shit ant workin', err));
  }

  render() {
    // const { boardId } = this.props.match.params;
    const { board } = this.state;
    return (
      <div className="SingleBoard">
        <h1>{board.name}</h1>
        <div className="d-flex flex-wrap justify-content-center">
        {this.state.pins.map((pin) => <Pin key={pinData.id} pin={pin} />)}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
