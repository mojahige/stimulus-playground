import { Controller } from 'https://cdn.skypack.dev/@hotwired/stimulus';

class HelloBaseController extends Controller {
  readonly nameTarget!: HTMLElement;
  readonly outputTarget!: HTMLElement;
}

export default class extends (Controller as typeof HelloBaseController) {
  static targets = ['name', 'output'];

  greet(): void {
    this.outputTarget.textContent = `Hello, ${
      (this.nameTarget as HTMLInputElement).value || 'Stimulus'
    }!`;
  }
}
