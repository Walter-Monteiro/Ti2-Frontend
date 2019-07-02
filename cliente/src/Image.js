import React, {Component} from 'react'
import axios from 'axios'
import './Image.css'

class Image extends Component{

    constructor (props){
        super(props);
        this.Click = this.Click.bind(this);
    }

    Click(){
        //referncia o click que esta na pagina inicial
        this.props.Click(this.props.id)
    }
    render(){

        return(
            <div className="Image">
             <img className = "img" src = {'https://ipt-ti2-iptgram.azurewebsites.net/api/posts/'+this.props.id+'/image'} onClick = {this.Click}/>
            </div>

        );
    }

}
export default Image;