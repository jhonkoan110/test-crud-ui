import React from 'react';
import styles from './TableHeader.module.css';
import './TableHeader.css';


let TableHeader = props => {
    // console.log(props);

    return (
        <div>
            <i onClick={ () => props.showCreateInputs()} className='fa fa-plus-square-o' aria-hidden="true" />
            <div className={
                    props.isCreating  
                    ? (styles.tableHeader + ' ' + styles.createItem) 
                    :  styles.createItemNone
                }>

                <input 
                    type='text' 
                    onChange={ props.onNewEmailTextChange } 
                    className={styles.col + ' ' + styles.col2} 
                    placeholder='Введите почту в виде example@mail.com' 
                    value={props.newEmailTextInput}
                />
                <input 
                    type='text' 
                    onChange={ props.onNewAgeTextChange } 
                    className={styles.col + ' ' + styles.col3} 
                    placeholder='Возраст: 0 - 149' 
                    value={props.newAgeTextInput} />
                <div className={styles.col + ' ' + styles.col5}>     
                    <i onClick={ props.onCreateInputButtonClick } className="fa fa-check" aria-hidden="true" />
                    <i onClick={ () => props.cancelCreatingInput() } className="fa fa-times" aria-hidden="true" />
                </div>
            </div>

            
            <div className={styles.tableHeader}>
                <div className={styles.col + ' ' + styles.col1}>Job ID</div>
                <div className={styles.col + ' ' + styles.col2}>Email</div>
                <div className={styles.col + ' ' + styles.col3}>Age</div>
                <div className={styles.col + ' ' + styles.col5}>edit/remove</div>
            </div>
        </div>
    );
}

export default TableHeader;