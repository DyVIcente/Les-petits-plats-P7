// return un objet get... qui crée un li
export function filterListItem(tag) {
    function getFilterListItem() {
        const filterListItem = document.createElement("li");

        filterListItem.classList.add("filter-list-item");
        filterListItem.textContent = tag;

        return filterListItem;
    }
    return { getFilterListItem };
}