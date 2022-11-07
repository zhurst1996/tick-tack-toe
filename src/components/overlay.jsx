import React from 'react';
import {Button} from 'reactstrap';

class Overlay extends React.Component {
    constructor (props) {
        super();
        var firstSlide = props.slides[0];

        this.props = props;
        this.state = {
            visibility: 'show',
            slide: firstSlide
        };

        this.overlayOnClick = this.overlayOnClick.bind(this);
    }

    componentDidMount () {
        this.switchThroughSlides();
    }

    switchThroughSlides () {
        var $this = this;
        var slides = $this.props.slides;

        for (let i = 1; i <= slides.length; i++) {
            setTimeout(() => {
                if (i <= slides.length - 1) {
                    $this.setState({
                        slide: slides[i]
                    });
                } else {
                    $this.setState({
                        visibility: 'hidden'
                    });
                }
            }, (4000 * i));
        }
    }

    overlayOnClick () {
        this.setState({
            visibility: 'hidden'
        });
    }

    render () {
        return (
            <div className={'h-100 w-100 position-fixed mx-auto overlay ' + this.state.visibility}>
                <div className='my-auto text-center text-light overlay-inner'>{this.state.slide}</div>
                <div><Button className='d-block m-auto' size='sm' color='outline-light' onClick={this.overlayOnClick}>Skip</Button></div>
            </div>
        );
    }
}

export default Overlay;