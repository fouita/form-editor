/** Dispatch event on click outside of node */
export function clickOutside(node) {
  
  const handleClick = event => {
    const dname = event?.path?.[0]?.dataset.name || event?.path?.[1]?.dataset.name

    if(dname === "showMenu") return
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('click_outside', node)
      )
    }
  }

	document.addEventListener('click', handleClick, true);
  
  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
	}
}