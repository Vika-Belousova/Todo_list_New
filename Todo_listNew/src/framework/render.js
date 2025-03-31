const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  if (!newElement.firstElementChild) {
    console.error('Error: Invalid template or empty element created.');
  }

  return newElement.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
  if (!container) {
    console.error('Container is null or undefined!');
    return;
  }
  container.insertAdjacentElement(place, component.getElement());
}

export { RenderPosition, createElement, render };