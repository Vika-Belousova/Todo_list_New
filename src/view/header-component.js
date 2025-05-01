import { AbstractComponent } from '../framework/view/abstract-component.js';

function createHeaderComponentTemplate() {
  return `
    <header>
      <div class="title">Список задач</div>
    </header>
  `;
}

export default class HeaderComponent extends AbstractComponent {
  get template() {
    return createHeaderComponentTemplate();
  }
}
