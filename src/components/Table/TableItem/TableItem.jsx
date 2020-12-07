import './TableItem.css'


const TableItem = props => {

    return (  
        
            props.items.map( i => {        
                return (
                    <div className='tableRow' key={i.id}>
                        <div className="col-1">{i.id}</div>
                            <input 
                                type='text'
                                className={i.isReadOnly ? 'col col-3 table-item-input' : 'col col-3 table-item-input table-item-input-edit-mode'}
                                value={i.data.email}
                                onChange={ props.onChangeEmailText }
                                readOnly={i.isReadOnly}
                            />
                            <input 
                                type='text'
                                className={i.isReadOnly ? 'col col-4 table-item-input' : 'col col-4 table-item-input table-item-input-edit-mode'}
                                value={i.data.age}
                                onChange={ props.onChangeAgeText }
                                readOnly={i.isReadOnly}
                            />


                        {i.isReadOnly 
                            ? 
                                <div className="col col-5">
                                    <button className={ i.disabled ? 'buttons button-disabled' : 'buttons edit-button' } onClick={ () =>  props.onEditButtonClick(i._id) }  disabled={i.disabled} >
                                        <i className="fa fa-pencil-square-o" aria-hidden="true" />
                                    </button>
                                    <button className='buttons' onClick={ () =>  props.onDeleteButtonClick(i._id) }>
                                        <i  className="fa fa-times" aria-hidden="true" />
                                    </button>
                                </div>    
                            :
                                <div className="col col-5">
                                    <button className='buttons' onClick={ () => props.onSaveChangesButtonClick(i._id, i.data.email, i.data.age) } >
                                        <i  className="fa fa-check" aria-hidden="true" />
                                    </button>
                                </div>
                        }
                    </div>


                )
            
            })
    )
}

export default TableItem;