const EDIT_INPUT_TEXT = 'EDIT-INPUT-TEXT';
const FLUX_UPDATE_ITEM_EMAIL_TEXT = 'FLUX-UPDATE-ITEM-EMAIL-TEXT';
const FLUX_UPDATE_ITEM_AGE_TEXT = 'FLUX-UPDATE-ITEM-AGE-TEXT';
const SAVE_UPDATED_TEXT = 'SAVE-UPDATED_TEXT';
const SET_ITEMS = 'SET_ITEMS';


let initialState = {
    items : [],
    currentId: null
};


const itemsReducer = (state = initialState, action) => {
    switch (action.type) {

        //экшен нажатия по кнопке редактировать
        //в нём передаётся текущий ID, он записывается в currentId стейта
        //затем идёт пробежка по массиву всех записей, сравнивается текущий ID с ID каждого итема
        //если совпало, тогда режим только для чтения отключается у инпута в TableItem.jsx
        //если не совпало, тогда дизейблятся все кнопки редактирования записей, кроме текущей
        //когда нажимается кнопка сохранить изменения, дизейблы пропадают (это отдельный экшн), а режим для чтения включается

        case EDIT_INPUT_TEXT: {
            state.currentId = action.id
            state.items.forEach(item => {
                if (item._id !== state.currentId)
                    item.disabled = true;
                if (item._id === state.currentId)
                    item.isReadOnly = false;
            })
            return {
                ...state,
                currentId: action.id,
                items: [...state.items]
            }
        }
        

        //посимвольный круговорот, сначала меняется стейт, потом уже изменения отображются в UI
        //для поля email
        case FLUX_UPDATE_ITEM_EMAIL_TEXT: {
            state.items.forEach(item => {
                if (item._id === state.currentId)
                item.data.email = action.newText
            })
            return {
                ...state,
                items: [...state.items]
            }
        }

        //посимвольный круговорот, сначала меняется стейт, потом уже изменения отображются в UI
        //для поля age
        case FLUX_UPDATE_ITEM_AGE_TEXT: {
            state.items.forEach(item => {
                if (item._id === state.currentId)
                    item.data.age = action.newText
            })
            return {
                ...state,
                items: [...state.items]
            }
        }
        
        //по кнопке сохранения убираются дизейблы, включается режим только для чтения
        case SAVE_UPDATED_TEXT: {
            state.items.forEach(item => {
                if (item._id !== state.currentId)
                    item.disabled = false;
                if (item._id === state.currentId)
                    item.isReadOnly = true;
            })
            return {
                ...state, 
                items: [...state.items]
            };
        }

        
        //в данный экшн попадают все записи с сервера
        //у них зашифрованный ID, поэтому вводится свой ID для отображения 1, 2, 3, 4, ... , n в UI
        //мапится массив итемов, каждому итему присваивается ID, увеличенный на 1, тк начальное значение 0
        //итемам добавляются исходные флаги для режима только для чтения и дизейбла кнопок
        case SET_ITEMS: {
            let userInterfaceId = 0;
            action.items.map( item => {
                userInterfaceId += 1;
                item.id = userInterfaceId;
                item.isReadOnly = true;
                item.disabled = false;
            })

            return {
                ...state, 
                items: [ ...action.items ]
            };
        }

        default: 
            return state;
    }
}

//action creators
export const fluxUpdateItemEmailTextAC = newText => ({ type: FLUX_UPDATE_ITEM_EMAIL_TEXT, newText});

export const fluxUpdateItemAgeTextAC = newText => ({ type: FLUX_UPDATE_ITEM_AGE_TEXT, newText});

export const editInputTextAC = id => ({ type: EDIT_INPUT_TEXT, id });

export const saveUpdatedTextAC = () => ({ type: SAVE_UPDATED_TEXT });

export const setItemsAC = items => ({ type: SET_ITEMS, items });


export default itemsReducer;
