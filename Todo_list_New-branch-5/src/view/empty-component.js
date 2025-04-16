import { AbstractComponent } from '../framework/view/abstract-component.js';

function createEmptyComponentTemplate() {
  return `
    <div class="empty-drop-placeholder">
      Перетащите карточку
    </div>
  `;
}

export default class EmptyComponent extends AbstractComponent {
  get template() {
    return createEmptyComponentTemplate();
  }
}
