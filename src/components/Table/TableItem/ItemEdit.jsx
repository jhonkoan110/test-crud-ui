import './TableItem.css'

const ItemEdit = props => {
    return (
        <div>
            <div className='col col-2'>
                <input className="col col-3 table-item-input" value={i.data.email} />
                <input className="col col-4 table-item-input" value={i.data.age} />
            </div>
            <div class='col col5'>     
                <i onClick={ () => {} } class="fa fa-check" aria-hidden="true" />
                <i onClick={ () => props.cancelUpdatingItem() } class="fa fa-times" aria-hidden="true" />
            </div> 
        </div>
    )
}

export default ItemEdit;