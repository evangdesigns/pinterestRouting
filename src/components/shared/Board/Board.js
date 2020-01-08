import React from 'react';

import boardShape from '../../../helpers/propz/boardShape';

import './Board.scss';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
  }

  render() {
    const { board } = this.props;

    return (
      <div className="Board card align-middle">
        <h1>{board.name}</h1>
        <button className="btn btn-primary">Go To Board</button>
      </div>
    );
  }
}

export default Board;
