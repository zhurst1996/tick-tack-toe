import React from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';
import { FaArrowDown, FaRegSnowflake, FaFireAlt } from 'react-icons/fa';

import Overlay from './overlay';

class Board extends React.Component {
    constructor () {
        super();

        this.state = {
            status: 'play',
            mode: 'player',
            playerTurn: 1,
            matrix: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            player1Icon: <span style={{color: '#78a6f0'}}><FaRegSnowflake/></span>,
            player2Icon: <span style={{color: '#e30e27'}}><FaFireAlt/></span>,
            overlaySlides: ['Welcome to Tick Tack Toe!', 'Here you can play 2 player', 'or against the bot.', <span><FaArrowDown /> Click one of the buttons at the bottom to start <FaArrowDown /></span>]
        };
    }

    renderBoardPiece (matrixPosition) {
        var boardPiece;

        switch (matrixPosition) {
            case 1 :
                boardPiece = this.state.player1Icon;
            break;
            case 2 :
                boardPiece = this.state.player2Icon;
            break;
            default:
                boardPiece = '';
        }

        return boardPiece;
    }

    switchMode (type) {
        return () => {
            this.setState({
                status: 'play',
                mode: type,
                playerTurn: 1,
                matrix: [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]
                ]
            });
        };
    }

    setBoardPieceClick(x, y) {
        return () => {
            this.setBoardPiece(x, y);
        };
    }

    setBoardPiece(x, y) {
        var newMatrix = this.state.matrix;

        if (!newMatrix[x][y] && this.state.status !== 'winner' && this.state.status !== 'calculating' && this.state.status !== 'tie') {
            var nextPlayer = this.state.playerTurn === 1 ? 2 : 1;

            newMatrix[x][y] = this.state.playerTurn;

            this.setState({
                matrix: newMatrix
            }, () => {
                var someoneHasWon = this.calculateIfWon();

                if (someoneHasWon) {
                    return;
                }

                this.setState({
                    playerTurn: nextPlayer
                });

                if (this.state.mode === 'bot' && nextPlayer === 2 && !someoneHasWon) {
                    this.botPickSquare();
                }
            });

        }
    }

    calculateIfWon () {
        var matrix = this.state.matrix;

        var allSquaresFilled = true;

        for (let i = 0; i < matrix.length; i++) {
            for (let num = 0; num < matrix[i].length; num++) {
                if (matrix[i][num] === 0) {
                    allSquaresFilled = false;
                }
            }
        }

        if (matrix[0][0] !== 0 && matrix[0][0] === matrix[0][1] && matrix[0][0] === matrix[0][2]) {
            this.setState({
                status: 'winner'
            });

            return true;
        } else if (matrix[1][0] !== 0 && matrix[1][0] === matrix[1][1] && matrix[1][0] === matrix[1][2]) {
            this.setState({
                status: 'winner'
            });

            return true;
        } else if (matrix[2][0] !== 0 && matrix[2][0] === matrix[2][1] && matrix[2][0] === matrix[2][2]) {
            this.setState({
                status: 'winner'
            });

            return true;
        } else if (matrix[0][0] !== 0 && matrix[0][0] === matrix[1][0] && matrix[0][0] === matrix[2][0]) {
            this.setState({
                status: 'winner'
            });

            return true;
        } else if (matrix[0][1] !== 0 && matrix[0][1] === matrix[1][1] && matrix[0][1] === matrix[1][2]) {
            this.setState({
                status: 'winner'
            });

            return true;
        } else if (matrix[0][2] !== 0 && matrix[0][2] === matrix[1][2] && matrix[0][2] === matrix[2][2]) {
            this.setState({
                status: 'winner'
            });

            return true;
        } else if (matrix[0][0] !== 0 && matrix[0][0] === matrix[1][1] && matrix[0][0] === matrix[2][2]) {
            this.setState({
                status: 'winner'
            });

            return true;
        } else if (matrix[2][0] !== 0 && matrix[2][0] === matrix[1][1] && matrix[2][0] === matrix[0][2]) {
            this.setState({
                status: 'winner'
            });

            return true;
        } else if (allSquaresFilled) {
            this.setState({
                status: 'tie'
            });

            return true;
        } else {
            return false;
        }
    }

    botPickSquare () {
        var matrix = this.state.matrix;
        var choices = [];

        this.setState({
            status: 'calculating'
        });

        for (let i = 0; i < matrix.length; i++) {
            var row = matrix[i];

            for (let num = 0; num < row.length; num++) {
                if (row[num] === 0) {
                    choices.push({
                        x: i,
                        y: num
                    });
                }
            }
        }

        if (!choices.length) {
            return;
        }

        var bestChoices = choices.filter((choice) => {
            if (!!matrix[choice.x + 1]) {
                return matrix[choice.x + 1][choice.y] === 2;
            } else if (matrix[choice.x - 1]) {
                return matrix[choice.x - 1][choice.y] === 2;
            } else if (matrix[choice.x][choice.y + 1]) {
                return matrix[choice.x][choice.y + 1] === 2;
            } else if (matrix[choice.x][choice.y - 1]) {
                return matrix[choice.x][choice.y - 1] === 2;
            } else {
                return false;
            }
        });

        var choice = !!bestChoices.length ? bestChoices[0] : choices[Math.floor(Math.random() * (choices.length - 1))];

        setTimeout(() => {
            this.setState({
                status: 'play'
            }, () => {
                this.setBoardPiece(choice.x, choice.y);
            });
        }, 500);
    }

    render () {
        return (
            <div>
                <Overlay slides={this.state.overlaySlides}/>
                <Container>
                    <Row>
                        <Col xs="12" className='text-center bg-secondary text-light'>
                            <h4>Tick Tack Toe</h4><span>{this.state.status} {this.state.status !== 'tie' ? ' player ' + this.state.playerTurn : ''}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" className='border toe-square text-center' onClick={this.setBoardPieceClick(0, 0)}>{this.renderBoardPiece(this.state.matrix[0][0])}</Col>
                        <Col xs="4" className='border toe-square text-center' onClick={this.setBoardPieceClick(0, 1)}>{this.renderBoardPiece(this.state.matrix[0][1])}</Col>
                        <Col xs="4" className='border toe-square text-center' onClick={this.setBoardPieceClick(0, 2)}>{this.renderBoardPiece(this.state.matrix[0][2])}</Col>
                    </Row>
                    <Row>
                        <Col xs="4" className='border toe-square text-center' onClick={this.setBoardPieceClick(1, 0)}>{this.renderBoardPiece(this.state.matrix[1][0])}</Col>
                        <Col xs="4" className='border toe-square text-center' onClick={this.setBoardPieceClick(1, 1)}>{this.renderBoardPiece(this.state.matrix[1][1])}</Col>
                        <Col xs="4" className='border toe-square text-center' onClick={this.setBoardPieceClick(1, 2)}>{this.renderBoardPiece(this.state.matrix[1][2])}</Col>
                    </Row>
                    <Row>
                        <Col xs="4" className='border toe-square text-center' onClick={this.setBoardPieceClick(2, 0)}>{this.renderBoardPiece(this.state.matrix[2][0])}</Col>
                        <Col xs="4" className='border toe-square text-center' onClick={this.setBoardPieceClick(2, 1)}>{this.renderBoardPiece(this.state.matrix[2][1])}</Col>
                        <Col xs="4" className='border toe-square text-center' onClick={this.setBoardPieceClick(2, 2)}>{this.renderBoardPiece(this.state.matrix[2][2])}</Col>
                    </Row>
                    <ButtonGroup className="mt-2 mx-auto text-center d-block">
                        <Button color={this.state.mode === 'player' ? 'primary' : 'outline-primary'} onClick={this.switchMode('player')}>Player Battle</Button>
                        <Button color={this.state.mode === 'bot' ? 'primary' : 'outline-primary'} onClick={this.switchMode('bot')}>Bot Battle</Button>
                    </ButtonGroup>
                </Container>
            </div>
        );
    }
}

export default Board;