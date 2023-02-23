import './render-add-button.css';

/**
 * @param {HTMLElement} element
 */
export const renderAddButton = ( element ) => {

    const fabButton = document.createElement('button');
    fabButton.innerHTML = '+';
    fabButton.classList.add('fab-button');

    element.append( fabButton );

    // TODO:
    fabButton.addEventListener('click', () => {
        throw Error('no implementado!');
    });

}