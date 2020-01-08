import { ElementWrapper } from "./element-wrapper";
import { StateVariable } from "./state";

export function handleBind<T, K extends keyof T>(wrapper: ElementWrapper<T, HTMLInputElement>, varName: K) {
  const { el: input } = wrapper,
    inputIsNumeric = input.type === 'number';

  wrapper.listenFor(varName, value => {
    input.value = String(value);
  }, true)

  const update = () => {
    const variable = wrapper.context[varName];
    if (variable instanceof StateVariable) {
      if (inputIsNumeric)
        variable.set(input.valueAsNumber);
      else variable.set(input.value);
    }
  }

  input.addEventListener('change', update);
  input.addEventListener('keydown', () => setTimeout(update, 0))
}