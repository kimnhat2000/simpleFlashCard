//filter and sort tool
export const filter = (filterArray, textFilter, sortByName) => {
    return filterArray.filter(item => {
        const textMatch = item.name.toLowerCase().includes(textFilter.toLowerCase());
        return textMatch;
    }).sort((a, b) => {
        if(sortByName){
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        }   
    });
};