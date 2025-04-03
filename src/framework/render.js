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
  if (!container || !component || typeof component.getElement !== 'function') {
    console.error('Ошибка рендера:', { component, container });
    return;
  }

  const element = component.getElement();
  if (!element) {
    console.error('Ошибка: getElement() вернул null или undefined', component);
    return;
  }

  container.insertAdjacentElement(place, element);
}

export { RenderPosition, createElement, render };