

/**
 * @param {String|Number} user
 */
export const deleteUserById = async( id ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ id }`;
    const res = await fetch(url, {
        method: 'DELETE',
    });

    const daleteResult = await res.json();
    console.log({daleteResult});
    return true;
}
