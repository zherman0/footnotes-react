export const getStoredProp = (propname) => {

    try {
        const serializedState = localStorage.getItem(propname);
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveLocalProp = (propname, value) => {
    try{
        const serializedState = JSON.stringify(value);
        localStorage.setItem(propname, serializedState);
    } catch (err){
        return undefined;
    }
}