import modalHtml from './render-modal.html?raw';
import './render-modal.css'; 
import { User } from '../../models/user';
import { getUserByPage } from '../../use-cases/get-user-by-id';

let modal, form;
let loadedUser = {};

/**
 * @param {String|Number} id 
 */
export const showModal = async( id ) => {
    modal?.classList.remove('hide-modal');
    loadedUser = {};

    if ( !id ) return;
    const user = await getUserByPage( id );
    setFormValues(user);
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    form?.reset();
}

/**
 * @param {User} user 
 */
const setFormValues = ( user ) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    loadedUser = user;
}

/**
 * @param {HTMLDivElement} element 
 * @param {(userLike)=> Promise<void>} callback
 */
export const renderModal = ( element, callback ) => {

    if( modal ) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';
    form = modal.querySelector('form');

    modal.addEventListener('click', (event) => {
        if ( event.target.className === 'modal-container' ) {
            hideModal();
        }
    })

    form.addEventListener('submit', async(event) => {
        event.preventDefault();
        const formData = new FormData( form );

        if (!formData.get('isActive')){
            formData.append('isActive', 'off');
        }

        const userLike = {...loadedUser };

        for (const [key, value] of formData) {
            if ( key === 'balance' ){
                userLike[key] = Number(value);
                continue;
            }

            if ( key === 'isActive' ){
                userLike[key] = (value === 'on' ? true : false);
                continue;
            }
            
            userLike[key] = value;
        }
        // console.log(userLike);
        await callback( userLike );

        hideModal();
    });

    element.append( modal );

}