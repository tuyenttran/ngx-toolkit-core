const isFunction = (fn: any): boolean => typeof fn === 'function';

const doUnsubscribe = (subscription) => {
    if (!!subscription && isFunction(subscription.unsubscribe)) {
        subscription.unsubscribe();
    }
};

const doUnsubscribeIfArray = (subscriptionsArray) => {
    if (!!subscriptionsArray && Array.isArray(subscriptionsArray)) {
        subscriptionsArray.forEach(doUnsubscribe);
    }
};

export function AutoUnsubscribe({blackList = [], arrayName = '', event = 'ngOnDestroy'} = {}) {
    return function (constructor: Function) {
        const original = constructor.prototype[event];

        if (!isFunction(original)) {
            throw new Error(`${constructor.name} is using @AutoUnsubscribe but does not implement ${event}`);
        }

        constructor.prototype[event] = function () {
            if (isFunction(original)) {
                original.apply(this, arguments);
            }
            if (arrayName) {
                doUnsubscribeIfArray(this[arrayName]);
                return;
            }
            for (const propName in this) {
                if (blackList.includes(propName)) {
                    continue;
                }
                doUnsubscribe(this[propName]);
            }
        };
    };
}