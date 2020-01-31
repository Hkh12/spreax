import { Subscribable } from './subscribable';

type DerivedGetter<T> = () => T;
type DerivedSetter<T> = (prevValue: T) => void;

export class DerivedVariable<T> extends Subscribable<T> {
  getter: DerivedGetter<T>;

  setter: DerivedSetter<T>;

  constructor(getter: DerivedGetter<T>, setter?: DerivedSetter<T>) {
    super();
    this.getter = getter;
    this.setter = setter;
    this.compute();
  }

  compute() {
    this.changeValue(this.getter());
  }

  subscribeAndAutoCompute<T>(stateVar: Subscribable<T>) {
    stateVar.subscribe(() => this.compute());
  }

  set(newValue: T) {
    this.setter?.(newValue);
  }
}

export function derived<T>(getter: DerivedGetter<T>, setter?: DerivedSetter<T>) {
  return new DerivedVariable(getter, setter);
}