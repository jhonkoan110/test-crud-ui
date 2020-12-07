import React, { Component } from 'react';
import {connect} from 'react-redux';
import { cancelCreatingInputAC, createInputAC, showCreateInputsAC, updateAgeTextInputAC, updateEmailTextInputAC } from '../../../redux/HeaderReducer';
import { setItemsAC } from '../../../redux/TableItemsReducer';
import TableHeader from './TableHeader';
import * as axios from 'axios';

class TableHeaderContainer extends Component  {


    //flux-круговороты по каждому введённому символу. сначала нажимается кнопка, затем меняется стейт,
    //затем уже данные из стейта отрисовываются в компоненте
    onNewEmailTextChange = event => {
        let text = event.target.value;
        this.props.updateEmailTextInput(text)
    }
    onNewAgeTextChange = event => {
        let text = event.target.value;
        this.props.updateAgeTextInput(text);
    }

    //функция создания записи, в переменные email age записываются данные из стейта, далее отправляются на сервер
    //в объекте data с помощью put-запроса
    onCreateInputButtonClick = () => {
        const email = this.props.newEmailTextInput;
        const age = this.props.newAgeTextInput;
    
        //регулярное выражение проверяет правильность написания mail
        //также возраст не должен превышать 150 лет и быть меньше 0        
        if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email) && age && age < 150 && age >= 0) {
            axios.put(`http://178.128.196.163:3000/api/records`, { data: {
                email: email,
                age: age
            }}).then( () => {            
                axios.get(`http://178.128.196.163:3000/api/records`).then(response => {   
                    this.props.setItems(response.data);
                });
            })
        }
    }

    render () {
        return <TableHeader 
                        {...this.props}
                        onNewEmailTextChange={this.onNewEmailTextChange}
                        onNewAgeTextChange={this.onNewAgeTextChange}
                        onCreateInputButtonClick={this.onCreateInputButtonClick}
                        // isCreating={this.props.isCreating}
                        // showCreateInputs={this.props.showCreateInputs}
                        // showCreateItemClass={this.props.showCreateItemClass}
                        // cancelCreatingInput={this.props.cancelCreatingInput}
                        // updateEmailTextInput={this.props.updateEmailTextInput}
                        // updateAgeTextInput={this.props.updateAgeTextInput}
                        // newEmailTextInput={this.props.newEmailTextInput}
                        // newAgeTextInput={this.props.newAgeTextInput}
                        // createInput={this.props.createInput}
                        // setItems={this.props.setItems}                        
        />
    }
}

const mapStateToProps = function(state) {
    return {
        isCreating: state.headerActions.isCreating,
        showCreateItemClass: state.headerActions.showCreateItemClass,
        newEmailTextInput: state.headerActions.newEmailTextInput,
        newAgeTextInput: state.headerActions.newAgeTextInput
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showCreateInputs: () => {
            let action = showCreateInputsAC();
            dispatch(action);
        },
        cancelCreatingInput: () => {
            let action = cancelCreatingInputAC();
            dispatch(action);
        },
        updateEmailTextInput: newText => {
            let action = updateEmailTextInputAC(newText);
            dispatch(action);
        },
        updateAgeTextInput: newText => {
            let action = updateAgeTextInputAC(newText);
            dispatch(action);
        },
        createInput: (email, age) => {
            let action = createInputAC(email, age);
            dispatch(action);
        },
        setItems: items => {
            let action = setItemsAC(items);
            dispatch(action);
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TableHeaderContainer);