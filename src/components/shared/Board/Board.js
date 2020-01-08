import React from 'react';
import { Link } from 'react-router-dom';

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
        <div className="card-body">
          <h1 className="card-title">{board.name}</h1>
          <Link className="btn btn-primary" to={`/board/${board.id}`}>View Board</Link>
        </div>
      </div>
    );
  }
}

export default Board;
