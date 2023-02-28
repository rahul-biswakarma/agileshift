import { store } from "../redux/store";


type TYPE_FilterOption = {
  filterOptionName: string,
  active: boolean,
}

type TYPE_Filters = {
  filterName: string,
  active: boolean,
  filterOptions: TYPE_FilterOption[],
};

export const renderFilterData = (filterData: TYPE_Filters[]) => {
	const dataTables = store.getState().datatable;
  console.log(dataTables);
}