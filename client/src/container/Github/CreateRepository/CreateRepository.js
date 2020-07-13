import React , { Component } from 'react';

//import { createRepository } from '../../../store/actions/index';
import { Link } from 'react-router-dom';

class CreateRepo extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: false
        }
    }

    handleBack = () => {
        this.props.history.go(-1);
    }

    createRepoHandler = async(data) => {
        //let response = await createRepository(data);
    }   

    render() {
        if(this.props.location){
            this.createRepoHandler(this.props.location.state.data);
        }
        return (
            <div>
                Hi
            </div>
        );
    }
}

export default CreateRepo;