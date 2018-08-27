export interface HdashInstance<State> {
	state: State,

}
export interface HdashConstructor {
	new <State = object>(el: string | Element, options: {
		state?: State
	})
}
const Hdash: HdashConstructor
export default Hdash
export as namespace Hdash