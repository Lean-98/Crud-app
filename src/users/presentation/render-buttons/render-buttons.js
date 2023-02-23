import usersStore from '../../store/users-store';
import { renderTable } from '../render-table/render-table';
import './render-buttons.css';

/**
 * @param {HTMLDivElement} element 
 */
export const renderButttons = ( element ) => {


    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next >';
    
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '< Prev ';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerText = usersStore.getCurrentPage();

    element.append( prevButton, currentPageLabel, nextButton );

    nextButton.addEventListener('click', async() => {
        await usersStore.loadNextPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable( element );
    });

    prevButton.addEventListener('click', async() => {
        await usersStore.loadPreviousPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable( element);
    });

}