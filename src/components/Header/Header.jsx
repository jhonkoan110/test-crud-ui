import style from './Header.module.css'
import './Header.css'


const Header = props => {
    return (
        <header>
            <h2 className={style.header}>NOORSOFT CRUD-UI TEST</h2>
        </header>
    );
}

export default Header;