// loading-view-component.js
import AbstractView from '../framework/view/abstract-view.js';

export default class LoadingViewComponent extends AbstractView {
  get template() {
    return '<p class="board__no-tasks">Загрузка данных...</p>';
  }
}
