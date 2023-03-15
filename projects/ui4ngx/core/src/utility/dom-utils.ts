export const FOCUSABLE_ELEMENTS: string =
    '[autofocus]:not([disabled]),' +
    'a[href],area[href],' +
    'button:not([disabled]),' +
    'keygen:not([disabled]),' + // HTML5
    'input:not([disabled]),' +
    'select:not([disabled]),' +
    'textarea:not([disabled]),' +
    'iframe,object,embed,' +
    '[tabindex~=\'0\']:not([disabled]),' +
    '[contenteditable]:not([disabled])';

export class DomUtils {

    public static browserScrollBarWidth: number = 0;

    // return index of given element within its parent
    public static getElementIndex(element: HTMLElement): number {
        const index: number = Array.from(element.parentElement.children).indexOf(element);
        return index < 0 ? 0 : index;
    }

    public static turnOffAutocomplete(element: HTMLElement): void {
        element.setAttribute('autocorrect', 'off');
        element.setAttribute('autocapitalize', 'off');
        element.setAttribute('spellcheck', 'false');
        element.setAttribute('autocomplete', 'false');
    }

    public static getScrollBarWidth(): number {
        if (!DomUtils.browserScrollBarWidth) {
            const scrollDiv = document.createElement('div');
            // scrollDiv.className = 'ngx-modal-scrollbar-measure';
            scrollDiv.style.cssText = 'position: absolute; top: -9999px; width: 50px; height: 50px; overflow: scroll;';
            document.body.appendChild(scrollDiv);
            DomUtils.browserScrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
        }
        return DomUtils.browserScrollBarWidth;
    }

    public static getScrollParent(node: any): HTMLElement {
        const isElement = node instanceof HTMLElement;
        const overflowY = isElement && window.getComputedStyle(node).overflowY;
        const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

        if (!node) {
            return null;
        }
        else if (isScrollable && node.scrollHeight >= node.clientHeight) {
            return node;
        }

        return DomUtils.getScrollParent(node.parentNode) || document.body;
    }
}
