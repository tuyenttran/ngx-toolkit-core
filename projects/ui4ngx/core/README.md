# @ui4ngx/core


[![npm Version](https://img.shields.io/npm/v/@ui4ngx/toolkit-core.svg)](https://www.npmjs.com/package/@ui4ngx/toolkit-core)
[![Build Status](https://app.travis-ci.com/tuyenttran/ngx-toolkit-core.svg?branch=master)](https://app.travis-ci.com/tuyenttran/ngx-toolkit-core)
> Provide core components and services to other libraries.

## Table of contents:
- [Get Started](#get-started)
  - [Installation](#installation)
  - [Usage](#usage)

- [[ngxAnchor] Directive](#ngxAnchor)
  - [Atributes](#anchorAttributes)
  - [Syntax](#anchorSyntax)

- [NgxComponentService](#ngxComponentService)
  - [createComponent()](#createComponent)
  - [attachComponent()](#attachComponent)
  - [register()](#register)
  - [destroy()](#destroy)
  - [destroyByType()](#destroyByType)
- [License](#license)

## <a name="get-started"></a> Get Started

### <a name="installation"></a> Installation


`npm install @ui4ngx/core`


### <a name="usage"></a> Usage

```typescript
//...
import { NgxUiCoreModule } from '@ui4ngx/core';

@NgModule({
  //...
  imports: [
    //...
    NgxUiCoreModule
  ],
  //...
})
export class AppModule { }
```

### <a name="ngxAnchor"></a> [ngxAnchor] Directive


<a name="anchorAttributes"></a>*Attributes*

Name      | Type               | Options                                   | Optional
---       | ---                | ---                                       | ---
ngxAnchor | `String`           | id of the anchor                          | Yes

<a name="anchorSyntax"></a>*Syntax*


```html
<div [ngxAnchor]="..."></div>
```

### <a name="ngxComponentService"></a> NgxComponentService

Dynamically create Angular component

### <a name="createComponent"></a> createComponent()
Create new component and return its reference
- if [location] == 'body', then component will be attached to &lt;body&gt;
- otherwise, location is expected to be an anchor element
  - if [location] is CSS selector (starts with '.' or '#'),
    then selected element will be used to lookup anchor
  - otherwise, [location] will be used as anchor Id

```typescript

    /**
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
                                injector?: Injector): ComponentRef<any>
```

### <a name="attachComponent"></a> attachComponent()
Attach the component to given ViewContainerRef.

```typescript
    /**
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
                                injector?: Injector): ComponentRef<any>
```
### <a name="register"></a> register()
Register the component.

```typescript
    /**
     * @param componentRef - component reference
     */
    protected register(componentRef: ComponentRef<any>): void
```
### <a name="destroy"></a> destroy()
Unregister and  Destroy the component.

```typescript
    /**
     * @param componentRef - component reference
     */
    public destroy(componentRef: ComponentRef<any>): void
```
### <a name="destroyByType"></a> destroyByType()
Destroy all of the components of given (class) type.

```typescript
    /**
     * @template T
     * @param type - component (class) type to be destroyed
     */
    public destroyByType(type: Type<any>): void
```

## <a name="license"></a> License

MIT © [Tuyen T Tran](mailto:anhtuyen.tran@gmail.com)
