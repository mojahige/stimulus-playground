import { Story, Meta } from '@storybook/html';
import { Application } from 'https://cdn.skypack.dev/@hotwired/stimulus';
import SliderController from './Slider';
import { build, Props } from './builder';
import './Slider.css';

const app = Application.start();

app.debug = true;
app.register('slider', SliderController);

export default {
  title: 'Example/Slider',
  argTypes: {
    step: { control: 'number' },
  },
} as Meta;

const Template: Story<Props> = (args) => build(args);

export const Slider = Template.bind({});
