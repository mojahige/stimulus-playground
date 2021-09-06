import { Application } from '@hotwired/stimulus';
import HelloController from './Hello';

const app = Application.start();

app.debug = true;
app.register('hello', HelloController);

export default {
  title: 'Example/Hello',
};

const Template = () => `
<div data-controller="hello">
  <input data-hello-target="name" type="text">
  <button data-action="click->hello#greet">
    Greet
  </button>
  <span data-hello-target="output">
  </span>
</div>
`;

export const Hello = Template.bind({});
