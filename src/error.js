import generateSelector from './dom/generateSelector'

/**
 * @param {string} msg 
 * @param {boolean} [isWarn]
 */
export default function error(msg, isWarn) {
	const fmsg = `[hdash${!isWarn ? ' error' : ''}] ${msg}`
	if (isWarn) console.warn(fmsg)
	else throw new Error(fmsg)
}

/**
 * @param {string} msg 
 * @param {Element} el 
 * @param {boolean} [isWarn]
 */
export function domError(msg, el, isWarn){
	error(msg + `\n -------\n(at ${generateSelector(el)})`, isWarn)
}