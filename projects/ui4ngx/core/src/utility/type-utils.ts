export function isString(value: any): boolean {
    return typeof value === 'string' || value instanceof String;
}

export function isUndefined(value: any): boolean {
    return typeof value === 'undefined';
}

/**
 * Check if string is null/blank/empty
 *
 * @param value
 * @returns
 */
export function isEmpty(value: string): boolean {
    return !value || value.trim().length === 0;
}

/**
 * check if object is empty
 *
 * @param obj
 * @returns
 */
export function isObjEmpty(obj: any): boolean {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
}

/**
 * Check if the value is empty OR match given REGEX
 *
 * @param value
 * @param regex
 * @returns
 */
export function isEmptyOrMatch(value: string, regex: RegExp): boolean {
    return isEmpty(value) || regex.test(value);
}

/**
 * Check if the value is NOT empty AND match given REGEX
 *
 * @param value
 * @param regex
 * @returns
 */
export function isNotEmptyAndMatch(value: string, regex: RegExp): boolean {
    return !isEmpty(value) && regex.test(value);
}

/**
 * Trim all values in object properties
 * and remove null/empty properties
 *
 * @param object
 * @returns
 */
export function removeEmptyProps(object: any) {
    const removeEmpty = (obj) => {
        const recurse = (o, k) =>
            (o[k] && typeof o[k] === 'object') && removeEmpty(o[k]);
        const remove = (o, k) =>
            (o[k] === null || o[k] === undefined || o[k] === '') && delete o[k];
        const trim = (o, k) =>
            (!o[k] && typeof o[k] === 'string' && o[k].length > 0 && (o[k] = (o[k] as string).trim()));
        return [Object.keys(obj).forEach(k => recurse(obj, k) || trim(obj, k) || remove(obj, k)), obj][1];
    };
    return removeEmpty(object);
}