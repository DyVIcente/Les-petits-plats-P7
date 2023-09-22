export function tagsRecipe(tag) {
  function getTagsRecipe() {
    const tagSpan = document.createElement('span');
    tagSpan.classList.add('tag-span');

    const tagText = document.createElement("p");
    tagText.classList.add('tag-text');
    tagText.textContent = tag;

    const tagIcon = document.createElement("img");
    tagIcon.classList.add('tag-icon');
    tagIcon.src = "assets/utils/close.svg"

    tagSpan.append(tagText);
    tagSpan.append(tagIcon);

    return tagSpan;
  }
    return { getTagsRecipe };
}