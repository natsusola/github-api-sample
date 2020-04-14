import { DirectiveOptions } from 'vue';
import { throttle } from 'lodash/fp';

const scroll = {
  delayMs: 2000,
  pool: new Map(),
  handler(this: HTMLElement, fn: () => void) {
    if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
      fn();
    }
  },
};

const directive: DirectiveOptions = {
  bind(el: HTMLElement, binding) {
    if (binding.value) {
      const delayHandler = throttle(scroll.delayMs, binding.value);
      const handler = scroll.handler.bind(el, delayHandler);
      scroll.pool.set(el, handler);
      el.addEventListener('scroll', handler, false);
    }
  },
  unbind(el: HTMLElement, binding) {
    if (binding.value) {
      el.removeEventListener('scroll', scroll.pool.get(el), false);
      scroll.pool.delete(el);
    }
  },
};

export default directive;
