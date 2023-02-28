import React, {useContext} from 'react';

export type FilterData = {
    selectedTag: string;
};

const FilterBlockContext = React.createContext<FilterData>({selectedTag: ''});

export const useFilterBlockContext = () => useContext(FilterBlockContext);

export default FilterBlockContext;
