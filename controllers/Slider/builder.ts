export interface Props {
  step?: number;
}

export const build = ({ step }: Props): string => {
  return `
    ${
      step
        ? `<div data-controller="slider" data-slider-step-value=${step}>`
        : `<div data-controller="slider">`
    }
      <div data-slider-target="viewport">
        <div data-slider-target="slider">
          <div data-slider-target="item">
            <div class="SliderItemPlaceholder">
              item1
            </div>
          </div>
          <div data-slider-target="item">
            <div class="SliderItemPlaceholder">
              item2
            </div>
          </div>
          <div data-slider-target="item">
            <div class="SliderItemPlaceholder">
              item3
            </div>
          </div>
          <div data-slider-target="item">
            <div class="SliderItemPlaceholder">
              item4
            </div>
          </div>
          <div data-slider-target="item">
            <div class="SliderItemPlaceholder">
              item5
            </div>
          </div>
          <div data-slider-target="item">
            <div class="SliderItemPlaceholder">
              item6
            </div>
          </div>
          <div data-slider-target="item">
            <div class="SliderItemPlaceholder">
              item7
            </div>
          </div>
          <div data-slider-target="item">
            <div class="SliderItemPlaceholder">
              item8
            </div>
          </div>
          <div data-slider-target="item">
            <div class="SliderItemPlaceholder">
              item9
            </div>
          </div>
          <div data-slider-target="item">
            <div class="SliderItemPlaceholder">
              item10
            </div>
          </div>
        </div>
      </div>

      <div>
        <button data-slider-target="prev">prev</button>
        <button data-slider-target="next">next</button>
      </div>
    </div>
`;
};
