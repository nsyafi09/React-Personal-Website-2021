import React from 'react';
import Board from './Board';
import './board.css';

class Container extends React.Component {
    
    constructor(props) {
        super(props);

        // Defining the state object
        // To keep the default value for color and size (line width)
        this.state = {
            color: "#000000",
            size: 2,
        }
    }

    // Function for changing color 
    changeColor(params) {
        this.setState({
            color: params.target.value
        })
    }

    // Function for changing size of the line width
    changeSize(params) {
        this.setState({
            size: params.target.value
        })
    } 

    // Function for clearing canvas
    clearCanvas() {
        var canvas = document.querySelector('#board');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    render() {
        return (
            <div className="canvas">
                <div className="menu">
                    <div className="brushSize">
                        {/* Added brush size option */}
                        Brush Size: &nbsp;
                        <select value={this.state.size} onChange={this.changeSize.bind(this)}>
                            <option> 2 </option>
                            <option> 3 </option>
                            <option> 5 </option>
                            <option> 10 </option>
                            <option> 15 </option>
                            <option> 20 </option>
                            <option> 25 </option>
                            <option> 30 </option>
                            <option> 35 </option>
                            <option> 40 </option>
                        </select>
                    </div>
                    <div className="color-picker">
                        {/* Color picker */}
                        Select Color: &nbsp;
                        <input type="color" value={this.state.color} onChange={this.changeColor.bind(this)}/>
                    </div>
                    {/* Button for clearing the canvas */}
                    <div className="reset">
                        <button onClick={this.clearCanvas}>Reset</button>
                    </div>
                </div>
                
                <div className="board-container">
                    <Board color={this.state.color} size={this.state.size}></Board>
                </div>
            </div>
        )
    }
}

export default Container;