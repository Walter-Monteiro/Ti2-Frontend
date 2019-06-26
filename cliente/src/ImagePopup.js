import React, {Component} from 'react'

class ImagePopup extends Component{

    render(){

        return(
            <div className="ImagePopup">
                <img src = {this.props.image}/>
                <h1>{this.props.user.name}</h1>
                <h3>{this.props.date}</h3>
                <h3>{this.props.likes}</h3>
                <h3>{this.props.subtitle}</h3>

            </div>

        );

    }

}
export default ImagePopup;