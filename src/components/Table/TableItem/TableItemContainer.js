import * as axios from 'axios';
import React from 'react';
import {connect} from 'react-redux';
import { editInputTextAC, fluxUpdateItemAgeTextAC, fluxUpdateItemEmailTextAC, saveItemChangesAC, saveUpdatedTextAC, setItemsAC, updateItemAC } from '../../../redux/TableItemsReducer';
import TableItem from './TableItem';


class TableItemContainer extends React.Component {

    componentDidMount () {
        //как только компонент закончил отрисовку, отправляется get-запрос на сервер, получает данные, которыми потом заполняет стейт

        axios.get(`http://178.128.196.163:3000/api/records`).then(response => {   
                this.props.setItems(response.data);
        });        
    }

    // посимвольное обновление текста через стейт
    onChangeEmailText = event => {
        // console.log(event.target.value);
        let newText = event.target.value;
        this.props.fluxUpdateItemEmailText(newText);
    }
    onChangeAgeText = event => {
        let newText = event.target.value;
        this.props.fluxUpdateItemAgeText(newText);
    }

    //по кнопке редактировать передаётся айди текущей записи в стейт
    onEditButtonClick = id => {
        this.props.editInputText(id);
    }

    //по кнопке сохранить изменения проверяется регулярное выражение в мейле
    //проверяется возраст, не более 150 и не менее 0 лет
    //отпрввляется пост запрос на сервер,  обновялется запись по ID
    onSaveChangesButtonClick = (id, email, age) => {
        this.props.saveUpdatedText();
        
        if (email && age) {
            axios.post(`http://178.128.196.163:3000/api/records/${id}`, { data: {
                email: email,
                age: age
            }}).then( () => {            
                axios.get(`http://178.128.196.163:3000/api/records`).then(response => {   
                    this.props.setItems(response.data);
                });
            })
        }
    }

    //запрос на удаление, на сервер передаётся ID
    onDeleteButtonClick = id => {
        axios.delete(`http://178.128.196.163:3000/api/records/${id}`).then( () => {
            axios.get(`http://178.128.196.163:3000/api/records`).then(response => {   
                    this.props.setItems(response.data);
            });
        });
    }

    render () {
    
        return <TableItem 
                        items={this.props.items}
                        onDeleteButtonClick={this.onDeleteButtonClick}
                        onChangeEmailText={this.onChangeEmailText}
                        onChangeAgeText={this.onChangeAgeText}
                        onEditButtonClick={this.onEditButtonClick}
                        onSaveChangesButtonClick={this.onSaveChangesButtonClick}
        />
    }
}

let mapStateToProps = state => {
    return {
        items: state.tableItems.items,
        isReadOnly: state.tableItems.isReadOnly,
        disabled: state.tableItems.disabled
    }
}

let mapDispatchToProps = dispatch => {
    return {
        setItems: items => {
            let action = setItemsAC(items);
            dispatch(action);
        },
        editInputText: id => {
            let action = editInputTextAC(id);
            dispatch(action);
        },
        saveUpdatedText: () => {
            let action = saveUpdatedTextAC();
            dispatch(action);
        },
        fluxUpdateItemEmailText: (newText) => {
            let action = fluxUpdateItemEmailTextAC(newText);
            dispatch(action);
        },
        fluxUpdateItemAgeText: (newText) => {
            let action = fluxUpdateItemAgeTextAC(newText);
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableItemContainer);