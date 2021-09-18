import { Controller } from 'https://cdn.skypack.dev/@hotwired/stimulus';

type SlideDirection = 'next' | 'prev';

class SliderBaseController extends Controller {
  readonly viewportTarget!: HTMLElement;
  readonly hasViewportTarget!: boolean;
  readonly sliderTarget!: HTMLElement;
  readonly hasSliderTarget!: boolean;
  readonly prevTarget!: HTMLElement;
  readonly hasPrevTarget!: boolean;
  readonly nextTarget!: HTMLElement;
  readonly hasNextTarget!: boolean;
  readonly itemTargets!: Array<HTMLElement>;
  readonly hasItemTarget!: boolean;
  readonly stepValue!: number;

  resizeObserver!: ResizeObserver | null;
  idleCallbackId!: number;
}

export default class extends (Controller as typeof SliderBaseController) {
  static targets = ['viewport', 'slider', 'item', 'prev', 'next'];
  static values = { step: { type: Number, default: 2 } };

  initialize(): void {
    this.resizeObserver = null;
    this.idleCallbackId = 0;

    this.calcSliderOverflow = this.calcSliderOverflow.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
  }

  connect(): void {
    if (window.requestIdleCallback != undefined) {
      this.registerResizeObserver();
    }

    this.registerEventListener();
  }

  disconnect(): void {
    this.dispose();
  }

  registerEventListener(): void {
    if (this.hasNextTarget) {
      this.nextTarget.addEventListener('click', this.onClickNext);
    }

    if (this.hasPrevTarget) {
      this.prevTarget.addEventListener('click', this.onClickPrev);
    }
  }

  registerResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(() => {
      window.cancelIdleCallback(this.idleCallbackId);

      this.idleCallbackId = window.requestIdleCallback(this.calcSliderOverflow);
    });

    this.resizeObserver.observe(this.sliderTarget);
  }

  onClickNext(): void {
    this.slide('next');
  }

  onClickPrev(): void {
    this.slide('prev');
  }

  slide(direction: SlideDirection): void {
    if (!this.canSlide()) {
      return;
    }

    const slidePosition = this.getSlidePosition(direction);

    if (slidePosition == null) {
      return;
    }

    this.viewportTarget.scrollTo({
      top: 0,
      left: slidePosition,
      behavior: 'smooth',
    });
  }

  getSlidePosition(direction: SlideDirection): number | null {
    const slideTargetItem = this.getSlideItem(direction);

    return slideTargetItem?.offsetLeft ?? null;
  }

  getSlideItem(direction: SlideDirection): HTMLElement | null {
    const slideCalcBaseItem = this.getFirstItemDisplayedInViewport();

    if (slideCalcBaseItem == null) {
      return null;
    }

    const { itemTargets, stepValue } = this;
    const calcStepItemIndex =
      itemTargets.indexOf(slideCalcBaseItem) +
      (direction === 'next' ? stepValue : stepValue * -1);

    if (0 > calcStepItemIndex) {
      return itemTargets[0];
    }

    if (calcStepItemIndex > itemTargets.length - 1) {
      return itemTargets[itemTargets.length - 1] || null;
    }

    return itemTargets[calcStepItemIndex] || null;
  }

  getFirstItemDisplayedInViewport(): HTMLElement | undefined {
    const viewport = this.getViewportInfo();

    return this.itemTargets.find((item) => {
      const start = item.offsetLeft;
      const end = start + item.clientWidth;

      return start >= viewport.start && viewport.end >= end;
    });
  }

  getViewportInfo(): {
    start: number;
    end: number;
  } {
    const { viewportTarget } = this;
    const start = viewportTarget.scrollLeft;
    const end = viewportTarget.scrollLeft + viewportTarget.clientWidth;

    return {
      start,
      end,
    };
  }

  calcSliderOverflow(): void {
    if (this.isOverflowSlider()) {
      (this.element as HTMLElement).dataset.sliderOverflow = 'true';
    } else {
      delete (this.element as HTMLElement).dataset.sliderOverflow;
    }
  }

  canSlide(): boolean {
    return (
      this.isOverflowSlider() && this.hasViewportTarget && this.hasItemTarget
    );
  }

  isOverflowSlider(): boolean {
    if (!this.hasViewportTarget || !this.hasSliderTarget) {
      return false;
    }

    const { viewportTarget, hasViewportTarget, sliderTarget, hasSliderTarget } =
      this;

    if (!hasViewportTarget || !hasSliderTarget) {
      return false;
    }

    return sliderTarget.scrollWidth > viewportTarget.clientWidth;
  }

  dispose(): void {
    if (this.resizeObserver) {
      window.cancelIdleCallback(this.idleCallbackId);
      this.resizeObserver.disconnect();
    }

    if (this.hasNextTarget) {
      this.nextTarget.removeEventListener('click', this.onClickNext);
    }

    if (this.hasPrevTarget) {
      this.prevTarget.removeEventListener('click', this.onClickPrev);
    }
  }
}
