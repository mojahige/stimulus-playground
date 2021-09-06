import { Controller } from 'https://cdn.skypack.dev/@hotwired/stimulus';

class HelloController extends Controller {
  readonly nameTarget!: HTMLElement;
  readonly outputTarget!: HTMLElement;
}

export default class extends (Controller as typeof HelloController) {
  static targets = ['name', 'output'];

  greet(): void {
    this.outputTarget.textContent = `Hello, ${
      (this.nameTarget as HTMLInputElement).value ?? 'Stimulus'
    }!`;
  }
}
