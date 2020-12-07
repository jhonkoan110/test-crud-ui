const SHOW_CREATE_INPUTS = 'SHOW-CREATE-INPUTS';
// const SAVE_CREATED_INPUT = 'SAVE-CREATED-INPUT';
const CANCEL_CREATING_INPUT = 'CANCEL-CREATING-INPUT';
const UPDATE_EMAIL_TEXT_INPUT = 'UPDATE-EMAIL-TEXT-INPUT';
const UPDATE_AGE_TEXT_INPUT = 'UPDATE-AGE-TEXT-INPUT';
const CREATE_INPUT = 'CREATE-INPUT';

let initialState = {
    isCreating: false,
    newEmailTextInput: '',
    newAgeTextInput: '',
}

const tableHeaderReducer = (state = initialState, action) => {
    switch (action.type) {
        
        //по кнопке + меняется флаг isCreating и отображает блок добавления записи, который изначально 
        //имеет свойство display: none
        case SHOW_CREATE_INPUTS: {
            return {...state, isCreating: true};
        };

        //посимвольный fkux-круговорот для email
        case UPDATE_EMAIL_TEXT_INPUT: {
            return {...state, newEmailTextInput: action.newText};
        };
        //посимвольный fkux-круговорот для email
        case UPDATE_AGE_TEXT_INPUT: {
            return {...state, newAgeTextInput: action.newText};
        }
        //по кнопке отмены пропадает блок с добавлением новой записи
        //текст, который был написан в инпуты, затирается
        case CANCEL_CREATING_INPUT: {
            return {
                ...state, 
                isCreating: false, 
                newEmailTextInput: '', 
                newAgeTextInput: ''
            };
        };
        //по кнопке создать(галочка) в стейт добавляются email и age
        //потом они через пропсы передаются в функцию, которая отправляет данный на сервер
        case CREATE_INPUT: {
            return {
                ...state, 
                email: action.email, 
                age: action.age, 
                newEmailTextInput: '', 
                newAgeTextInput: ''
            }
        }

        default: 
            return state;
    }
}

//action creators
export const showCreateInputsAC = () => ({ type: SHOW_CREATE_INPUTS });

export const cancelCreatingInputAC = () => ({ type: CANCEL_CREATING_INPUT });

export const updateEmailTextInputAC = newText => ({ type: UPDATE_EMAIL_TEXT_INPUT, newText});

export const updateAgeTextInputAC = newText => ({ type: UPDATE_AGE_TEXT_INPUT, newText});

export const createInputAC = (email, age) => ({ type: CREATE_INPUT, email, age });

export default tableHeaderReducer;