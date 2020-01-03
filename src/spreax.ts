import { ElementWrapper } from './element-wrapper';
import { Variables, groupVariables } from "./variables";
import { getAllElements } from './dom';

export class Spreax<T, E extends Element = Element> {
  el: E;
  variables: Variables<T>;
  constructor(rootEl: E, variables: Variables<T>) {
    this.el = rootEl;
    this.variables = variables;

    const groups = groupVariables(variables);
    for (const computedVar of groups.computedVars)
      for (const stateVar of groups.stateVars)
        stateVar.subscribe(() => computedVar.compute());

    this.setupElement(rootEl);
    for (const el of getAllElements(rootEl))
      this.setupElement(el);
  }
  setupElement(element: Element) {
    const wrapper = new ElementWrapper<T>(element);
    for (const node of wrapper.nodes()) {
      for (const dep of node.dependencies) {
        node.subscribeTo(dep, this.variables[dep]);
        node.listenFor(dep, () => node.setText());
      }
      node.setText();
    }
  }
}