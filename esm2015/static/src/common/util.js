/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const /** @type {?} */ DIRECTIVE_PREFIX_REGEXP = /^(?:x|data)[:\-_]/i;
const /** @type {?} */ DIRECTIVE_SPECIAL_CHARS_REGEXP = /[:\-_]+(.)/g;
/**
 * @param {?} e
 * @return {?}
 */
export function onError(e) {
    // TODO: (misko): We seem to not have a stack trace here!
    if (console.error) {
        console.error(e, e.stack);
    }
    else {
        // tslint:disable-next-line:no-console
        console.log(e, e.stack);
    }
    throw e;
}
/**
 * @param {?} name
 * @return {?}
 */
export function controllerKey(name) {
    return '$' + name + 'Controller';
}
/**
 * @param {?} name
 * @return {?}
 */
export function directiveNormalize(name) {
    return name.replace(DIRECTIVE_PREFIX_REGEXP, '')
        .replace(DIRECTIVE_SPECIAL_CHARS_REGEXP, (_, letter) => letter.toUpperCase());
}
/**
 * @param {?} component
 * @return {?}
 */
export function getComponentName(component) {
    // Return the name of the component or the first line of its stringified version.
    return (/** @type {?} */ (component)).overriddenName || component.name || component.toString().split('\n')[0];
}
/**
 * @param {?} value
 * @return {?}
 */
export function isFunction(value) {
    return typeof value === 'function';
}
/**
 * @template R
 */
export class Deferred {
    constructor() {
        this.promise = new Promise((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }
}
function Deferred_tsickle_Closure_declarations() {
    /** @type {?} */
    Deferred.prototype.promise;
    /** @type {?} */
    Deferred.prototype.resolve;
    /** @type {?} */
    Deferred.prototype.reject;
}
/**
 * @record
 */
export function LazyModuleRef() { }
function LazyModuleRef_tsickle_Closure_declarations() {
    /** @type {?} */
    LazyModuleRef.prototype.needsNgZone;
    /** @type {?|undefined} */
    LazyModuleRef.prototype.injector;
    /** @type {?|undefined} */
    LazyModuleRef.prototype.promise;
}
/**
 * @param {?} component
 * @return {?} Whether the passed-in component implements the subset of the
 *     `ControlValueAccessor` interface needed for AngularJS `ng-model`
 *     compatibility.
 */
function supportsNgModel(component) {
    return typeof component.writeValue === 'function' &&
        typeof component.registerOnChange === 'function';
}
/**
 * Glue the AngularJS `NgModelController` (if it exists) to the component
 * (if it implements the needed subset of the `ControlValueAccessor` interface).
 * @param {?} ngModel
 * @param {?} component
 * @return {?}
 */
export function hookupNgModel(ngModel, component) {
    if (ngModel && supportsNgModel(component)) {
        ngModel.$render = () => { component.writeValue(ngModel.$viewValue); };
        component.registerOnChange(ngModel.$setViewValue.bind(ngModel));
        if (typeof component.registerOnTouched === 'function') {
            component.registerOnTouched(ngModel.$setTouched.bind(ngModel));
        }
    }
}
/**
 * Test two values for strict equality, accounting for the fact that `NaN !== NaN`.
 * @param {?} val1
 * @param {?} val2
 * @return {?}
 */
export function strictEquals(val1, val2) {
    return val1 === val2 || (val1 !== val1 && val2 !== val2);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3VwZ3JhZGUvc3RhdGljL3NyYy9jb21tb24vdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVdBLHVCQUFNLHVCQUF1QixHQUFHLG9CQUFvQixDQUFDO0FBQ3JELHVCQUFNLDhCQUE4QixHQUFHLGFBQWEsQ0FBQzs7Ozs7QUFFckQsTUFBTSxrQkFBa0IsQ0FBTTs7SUFFNUIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1FBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMzQjtTQUFNOztRQUVMLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6QjtJQUNELE1BQU0sQ0FBQyxDQUFDO0NBQ1Q7Ozs7O0FBRUQsTUFBTSx3QkFBd0IsSUFBWTtJQUN4QyxPQUFPLEdBQUcsR0FBRyxJQUFJLEdBQUcsWUFBWSxDQUFDO0NBQ2xDOzs7OztBQUVELE1BQU0sNkJBQTZCLElBQVk7SUFDN0MsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQztTQUMzQyxPQUFPLENBQUMsOEJBQThCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztDQUNuRjs7Ozs7QUFFRCxNQUFNLDJCQUEyQixTQUFvQjs7SUFFbkQsT0FBTyxtQkFBQyxTQUFnQixFQUFDLENBQUMsY0FBYyxJQUFJLFNBQVMsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNuRzs7Ozs7QUFFRCxNQUFNLHFCQUFxQixLQUFVO0lBQ25DLE9BQU8sT0FBTyxLQUFLLEtBQUssVUFBVSxDQUFDO0NBQ3BDOzs7O0FBRUQsTUFBTTtJQUtKO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztTQUNuQixDQUFDLENBQUM7S0FDSjtDQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlRCx5QkFBeUIsU0FBYztJQUNyQyxPQUFPLE9BQU8sU0FBUyxDQUFDLFVBQVUsS0FBSyxVQUFVO1FBQzdDLE9BQU8sU0FBUyxDQUFDLGdCQUFnQixLQUFLLFVBQVUsQ0FBQztDQUN0RDs7Ozs7Ozs7QUFNRCxNQUFNLHdCQUF3QixPQUFtQyxFQUFFLFNBQWM7SUFDL0UsSUFBSSxPQUFPLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3pDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3RFLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksT0FBTyxTQUFTLENBQUMsaUJBQWlCLEtBQUssVUFBVSxFQUFFO1lBQ3JELFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2hFO0tBQ0Y7Q0FDRjs7Ozs7OztBQUtELE1BQU0sdUJBQXVCLElBQVMsRUFBRSxJQUFTO0lBQy9DLE9BQU8sSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO0NBQzFEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdG9yLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnLi9hbmd1bGFyMSc7XG5cbmNvbnN0IERJUkVDVElWRV9QUkVGSVhfUkVHRVhQID0gL14oPzp4fGRhdGEpWzpcXC1fXS9pO1xuY29uc3QgRElSRUNUSVZFX1NQRUNJQUxfQ0hBUlNfUkVHRVhQID0gL1s6XFwtX10rKC4pL2c7XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkVycm9yKGU6IGFueSkge1xuICAvLyBUT0RPOiAobWlza28pOiBXZSBzZWVtIHRvIG5vdCBoYXZlIGEgc3RhY2sgdHJhY2UgaGVyZSFcbiAgaWYgKGNvbnNvbGUuZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGUsIGUuc3RhY2spO1xuICB9IGVsc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2coZSwgZS5zdGFjayk7XG4gIH1cbiAgdGhyb3cgZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRyb2xsZXJLZXkobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuICckJyArIG5hbWUgKyAnQ29udHJvbGxlcic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXJlY3RpdmVOb3JtYWxpemUobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIG5hbWUucmVwbGFjZShESVJFQ1RJVkVfUFJFRklYX1JFR0VYUCwgJycpXG4gICAgICAucmVwbGFjZShESVJFQ1RJVkVfU1BFQ0lBTF9DSEFSU19SRUdFWFAsIChfLCBsZXR0ZXIpID0+IGxldHRlci50b1VwcGVyQ2FzZSgpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudE5hbWUoY29tcG9uZW50OiBUeXBlPGFueT4pOiBzdHJpbmcge1xuICAvLyBSZXR1cm4gdGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudCBvciB0aGUgZmlyc3QgbGluZSBvZiBpdHMgc3RyaW5naWZpZWQgdmVyc2lvbi5cbiAgcmV0dXJuIChjb21wb25lbnQgYXMgYW55KS5vdmVycmlkZGVuTmFtZSB8fCBjb21wb25lbnQubmFtZSB8fCBjb21wb25lbnQudG9TdHJpbmcoKS5zcGxpdCgnXFxuJylbMF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBGdW5jdGlvbiB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZlcnJlZDxSPiB7XG4gIHByb21pc2U6IFByb21pc2U8Uj47XG4gIHJlc29sdmU6ICh2YWx1ZT86IFJ8UHJvbWlzZUxpa2U8Uj4pID0+IHZvaWQ7XG4gIHJlamVjdDogKGVycm9yPzogYW55KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgdGhpcy5yZXNvbHZlID0gcmVzO1xuICAgICAgdGhpcy5yZWplY3QgPSByZWo7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBMYXp5TW9kdWxlUmVmIHtcbiAgLy8gV2hldGhlciB0aGUgQW5ndWxhckpTIGFwcCBoYXMgYmVlbiBib290c3RyYXBwZWQgb3V0c2lkZSB0aGUgQW5ndWxhciB6b25lXG4gIC8vIChpbiB3aGljaCBjYXNlIGNhbGxzIHRvIEFuZ3VsYXIgQVBJcyBuZWVkIHRvIGJlIGJyb3VnaHQgYmFjayBpbikuXG4gIG5lZWRzTmdab25lOiBib29sZWFuO1xuICBpbmplY3Rvcj86IEluamVjdG9yO1xuICBwcm9taXNlPzogUHJvbWlzZTxJbmplY3Rvcj47XG59XG5cbi8qKlxuICogQHJldHVybiBXaGV0aGVyIHRoZSBwYXNzZWQtaW4gY29tcG9uZW50IGltcGxlbWVudHMgdGhlIHN1YnNldCBvZiB0aGVcbiAqICAgICBgQ29udHJvbFZhbHVlQWNjZXNzb3JgIGludGVyZmFjZSBuZWVkZWQgZm9yIEFuZ3VsYXJKUyBgbmctbW9kZWxgXG4gKiAgICAgY29tcGF0aWJpbGl0eS5cbiAqL1xuZnVuY3Rpb24gc3VwcG9ydHNOZ01vZGVsKGNvbXBvbmVudDogYW55KSB7XG4gIHJldHVybiB0eXBlb2YgY29tcG9uZW50LndyaXRlVmFsdWUgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIHR5cGVvZiBjb21wb25lbnQucmVnaXN0ZXJPbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqXG4gKiBHbHVlIHRoZSBBbmd1bGFySlMgYE5nTW9kZWxDb250cm9sbGVyYCAoaWYgaXQgZXhpc3RzKSB0byB0aGUgY29tcG9uZW50XG4gKiAoaWYgaXQgaW1wbGVtZW50cyB0aGUgbmVlZGVkIHN1YnNldCBvZiB0aGUgYENvbnRyb2xWYWx1ZUFjY2Vzc29yYCBpbnRlcmZhY2UpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaG9va3VwTmdNb2RlbChuZ01vZGVsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlciwgY29tcG9uZW50OiBhbnkpIHtcbiAgaWYgKG5nTW9kZWwgJiYgc3VwcG9ydHNOZ01vZGVsKGNvbXBvbmVudCkpIHtcbiAgICBuZ01vZGVsLiRyZW5kZXIgPSAoKSA9PiB7IGNvbXBvbmVudC53cml0ZVZhbHVlKG5nTW9kZWwuJHZpZXdWYWx1ZSk7IH07XG4gICAgY29tcG9uZW50LnJlZ2lzdGVyT25DaGFuZ2UobmdNb2RlbC4kc2V0Vmlld1ZhbHVlLmJpbmQobmdNb2RlbCkpO1xuICAgIGlmICh0eXBlb2YgY29tcG9uZW50LnJlZ2lzdGVyT25Ub3VjaGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb21wb25lbnQucmVnaXN0ZXJPblRvdWNoZWQobmdNb2RlbC4kc2V0VG91Y2hlZC5iaW5kKG5nTW9kZWwpKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBUZXN0IHR3byB2YWx1ZXMgZm9yIHN0cmljdCBlcXVhbGl0eSwgYWNjb3VudGluZyBmb3IgdGhlIGZhY3QgdGhhdCBgTmFOICE9PSBOYU5gLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyaWN0RXF1YWxzKHZhbDE6IGFueSwgdmFsMjogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB2YWwxID09PSB2YWwyIHx8ICh2YWwxICE9PSB2YWwxICYmIHZhbDIgIT09IHZhbDIpO1xufVxuIl19