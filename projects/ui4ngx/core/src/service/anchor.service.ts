import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class NgxAnchorService {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private _anchors: Map<string, ViewContainerRef> =
                            new Map<string, ViewContainerRef>();

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor() {}

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    public register(anchorId: any, viewContainer: ViewContainerRef): void {
        this._anchors.set(this._getKeyAsString(anchorId), viewContainer);
    }

    public deregister(anchorId: any): void {
        this._anchors.delete(this._getKeyAsString(anchorId));
    }

    public getAnchor(anchorId: string | HTMLElement | any): ViewContainerRef {

        if (anchorId instanceof HTMLElement) {
            return this._getAnchorViewContainer(<HTMLElement>anchorId);
        }

        if (typeof anchorId === 'string') {
            // if element is specified in container,
            if (anchorId.startsWith('#') || anchorId.startsWith('.')) {

                // first, find element
                const containerElement: HTMLElement = <HTMLElement>document.querySelector(anchorId);
                if (!containerElement) {
                    throw new Error('Could not find DOM element with selector [' + anchorId + '].');
                }

                // then, find the container view reference from element
                return this._getAnchorViewContainer(containerElement);
            }
            else {
                return this._anchors.get(<string>anchorId);
            }
        }


        return this._anchors.get(this._getKeyAsString(anchorId));
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    private _getAnchorViewContainer(element: HTMLElement): ViewContainerRef {
        const id: string = element.id || element.getAttribute('data-anchor-id');
        return id ? this._anchors.get(id) : null;
    }

    private _getKeyAsString(key: any): string {
        return (typeof key === 'string') ? key : JSON.stringify(key);
    }
}
