import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    Injectable,
    Injector,
    Type,
    ViewContainerRef
} from '@angular/core';
import { NgxAnchorService } from './anchor.service';

/**
* Component service is a helper to append components
* dynamically to a known location in the DOM, most
* notably for dialogs/tooltips appending to body.
*
* @export
* @class NgxComponentService
*/
@Injectable({
    providedIn: 'root',
})
export class NgxComponentService {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    protected componentRegistry: Map<Type<any>, Array<any>> = new Map<Type<any>, Array<any>>();

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(private _applicationRef: ApplicationRef,
        private _resolver: ComponentFactoryResolver,
        private _injector: Injector,
        private _anchorService: NgxAnchorService) {
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    /**
     * Projects the bindings onto the component
     *
     * @param {ComponentRef<any>} component
     * @param {*} options
     * @returns {ComponentRef<any>}
     *
     * @memberOf NgxComponentService
     */
    public bindComponentProps(component: ComponentRef<any>,
                                bindings: any = {},
                                defaults: any = {}): ComponentRef<any> {
        const props: any = Object.assign({}, defaults, bindings);
        // Object.assign(component.instance, props);

        const bindingKeys = Object.getOwnPropertyNames(props);
        for (const bindingName of bindingKeys) {
            component.instance[bindingName] = props[bindingName];
        }
        return component;
    }

    /**
     * Create component and attach it to a location
     * if [location] == 'body', then component will be attached to <body>
     * otherwise, location is expected to be the anchor element
     *      if [location] is CSS selector (starts with '.' or '#'),
     *          then selected element will be used to lookup anchor
     *      otherwise, [location] will be used as anchor Id
     *
     * @template T
     * @param componentClass - type of component
     * @param location - the location whose ViewContent that the new component will be attached to
     * @param bindings - values of component properties to set after component is created
     * @param defaults - default values of component properties to set after component is created
     * @param injector - The injector to use as the parent for the new
     * @returns {ComponentRef<T>}
     *
     * @memberOf NgxComponentService
     */
    public createComponent<T>(componentClass: Type<T>,
                                location: string = 'body',
                                bindings: any = {},
                                defaults: any = {},
                                injector?: Injector): ComponentRef<any> {
        const componentFactory = this._resolver.resolveComponentFactory(componentClass);

        const attachToBody: boolean = ('body' === location);

        if (attachToBody) {
            // create component
            const componentRef: ComponentRef<T> = componentFactory.create(injector || this._injector);

            // attach to application root view
            this._applicationRef.attachView(componentRef.hostView);

            // attach component container to body
            document.body.appendChild(componentRef.location.nativeElement);

            // project the options passed to the component instance
            this.bindComponentProps(componentRef, bindings, defaults);

            this.register(componentRef);

            return componentRef;
        }
        else {
            // then, find the container view reference from element
            const viewContainerRef: ViewContainerRef = this._anchorService.getAnchor(location);

            if (!viewContainerRef) {
                throw new Error(
                    'Could not find Angular ViewContainer from [' + location + '].' +
                    'Please provide correct selector and make sure to add uiAnchor directive to the container.');
            }

            // then get the element
            const containerElement: HTMLElement = viewContainerRef.element.nativeElement;

            // create component
            const componentRef: ComponentRef<T> =
                viewContainerRef.createComponent(componentFactory, null, injector || this._injector);

            // attach component to container
            containerElement.appendChild(componentRef.location.nativeElement);

            // project the options passed to the component instance
            this.bindComponentProps(componentRef, bindings, defaults);

            this.register(componentRef);

            return componentRef;
        }
    }

    /**
     * Attach the component to given ViewContainerRef.
     *
     * @template T
     * @param componentClass - type of component
     * @param viewContainerRef - container view reference where the component will be attached to
     * @param index - The index at which to insert the new component's host view into this container. If not specified, appends the new view as the last entry.
     * @param bindings - the attribute values to intialize the component after it is created
     * @param defaults - the default attribute values
     * @param injector - The injector to use as the parent for the new
     * @returns {ComponentRef<T>}
     * @memberOf NgxComponentService
     */
    public attachComponent<T>(componentClass: Type<T>,
                                viewContainerRef: ViewContainerRef,
                                index: number = -1,
                                bindings: any = {},
                                defaults: any = {},
                                injector?: Injector): ComponentRef<any> {
        const componentFactory = this._resolver.resolveComponentFactory(componentClass);

        // create a component instance
        const componentRef: ComponentRef<any> =
            viewContainerRef.createComponent(componentFactory,
                (index === -1) ? null : index,
                injector || this._injector);

        // project the options passed to the component instance
        this.bindComponentProps(componentRef, bindings, defaults);

        this.register(componentRef);

        return componentRef;
    }

    /**
     * Register the component
     *
     * @param componentRef - component reference
     */
     protected register(componentRef: ComponentRef<any>): void {
        const type: Type<any> = componentRef.componentType;
        if (!this.componentRegistry.has(type)) {
            this.componentRegistry.set(type, []);
        }

        const compsByType: Array<any> = this.componentRegistry.get(type);
        compsByType.push(componentRef);
    }

    /**
     * Unregister and  Destroy the component
     *
     * @param componentRef - component reference
     */
    public destroy(componentRef: ComponentRef<any>): void {
        const compsByType: Array<any> = this.componentRegistry.get(componentRef.componentType);

        if (compsByType && compsByType.length) {
            const idx: number = compsByType.indexOf(componentRef);

            if (idx > -1) {
                const component = compsByType[idx];
                component.destroy();
                compsByType.splice(idx, 1);
            }
        }
    }

    /**
     * Destroy all of the components of given (class) type
     *
     * @template T
     * @param type - component (class) type to be destroyed
     */
    public destroyByType(type: Type<any>): void {
        const compsByType: Array<any> = this.componentRegistry.get(type);

        if (compsByType && compsByType.length) {
            let i: number = compsByType.length - 1;
            while (i >= 0) {
                this.destroy(compsByType[i--]);
            }
        }
    }

}
