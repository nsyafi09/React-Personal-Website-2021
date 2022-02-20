import React from 'react';
import io from 'socket.io-client';
import './board.css'

class Board extends React.Component {
    // timeout;
    socket = io.connect("http://localhost:5000");
    ctx; // the drawing line

    // For the interval for only 1 drawer
    isDrawing = false;

    // Define constructor 
    constructor(props) {
        super(props);

        // Creating an interval for the canvas so only 1 user can draw at a time
        this.socket.on("canvas-data", function(data) {
            var root = this;
            var interval = setInterval(function() {
                if(root.isDrawing) return;
                root.isDrawing = true;
                clearInterval(interval);
                var image = new Image();
                var canvas = document.querySelector('#board');
                var ctx = canvas.getContext('2d');
                image.onload = function() {
                    ctx.drawImage(image, 0, 0);
                    root.isDrawing = false;
                };
                image.src = data;
            }, 200)
        })
    }

    // Invoke the drawOnCanvas function
    componentDidMount() {
        this.drawOnCanvas();
    }

    componentWillReceiveProps(newProps) {
        this.ctx.strokeStyle = newProps.color;
        // Added line width
        this.ctx.lineWidth = newProps.size;
    }

    // Function Mouse drawing on canvas 
    drawOnCanvas() {
        // Defining variable canvas
        var canvas = document.querySelector('#board');
        this.ctx = canvas.getContext('2d');
        var ctx = this.ctx;
        // Defining variable sketch
        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);

        // Getting the width and height for the canvas to later be used for drawing
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));
        
        // Defining mouse for drawing
        var mouse = {x:0, y:0};
        var last_mouse = {x:0, y:0};
        // Listener for the drawing of ctx line in the website
        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        // Setting the ctx(drawing stroke) in the canvas
        // Basing the ctx line width manually based on the size option
        ctx.lineWidth = this.props.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        // Basing the ctx color manually through the color picker
        ctx.strokeStyle =this.props.color;

        // Listener for the drawing of ctx line in the website
        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);
        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        var root = this;
        // To initialize the painting stroke ctx for the website
        var onPaint = function() {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();
            var base64ImageData = canvas.toDataURL("image/png")
            root.socket.emit("canvas-data", base64ImageData);
            if(root.timeout != undefined) clearTimeout(root.timeout);
            // root.timeout = setTimeout(function() {
            //     var base64ImageData = canvas.toDataURL("image/png");
            //     // Emiting the canvas data, for multiple use (can be used by multiple browser)
            //     root.socket.emit("canvas-data", base64ImageData);
            // }, 1000)
        };
    }

    

    render() {
        return (
            // Returning the canvas
            <div className="sketch "id="sketch">
                <canvas className="board" id="board"></canvas>
            </div>
        )
    }
}

export default Board