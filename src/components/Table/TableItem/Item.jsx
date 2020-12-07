import './TableItem.css'


const Item = props => {
    return (
        <div className='col'>
            <div className='col col-2'>
                <div className="col col-3">{props.i.data.email}</div>
                <div className="col col-4">{props.i.data.age}</div>
            </div> 
            <div class="col col-5">
                <i onClick={ () => props.onEditButtonClick(props.i._id) } class="fa fa-pencil-square-o" aria-hidden="true" />
                <i onClick={ () =>  props.onDeleteButtonClick(props.i._id) } class="fa fa-times" aria-hidden="true" />
            </div>
        </div>
    )
}


export default Item;