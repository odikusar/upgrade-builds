/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// We have to do a little dance to get the ng1 injector into the module injector.
// We store the ng1 injector so that the provider in the module injector can access it
// Then we "get" the ng1 injector from the module injector, which triggers the provider to read
// the stored injector and release the reference to it.
var tempInjectorRef;
export function setTempInjectorRef(injector) {
    tempInjectorRef = injector;
}
export function injectorFactory() {
    if (!tempInjectorRef) {
        throw new Error('Trying to get the AngularJS injector before it being set.');
    }
    var injector = tempInjectorRef;
    tempInjectorRef = null; // clear the value to prevent memory leaks
    return injector;
}
export function rootScopeFactory(i) {
    return i.get('$rootScope');
}
export function compileFactory(i) {
    return i.get('$compile');
}
export function parseFactory(i) {
    return i.get('$parse');
}
export var angular1Providers = [
    // We must use exported named functions for the ng2 factories to keep the compiler happy:
    // > Metadata collected contains an error that will be reported at runtime:
    // >   Function calls are not supported.
    // >   Consider replacing the function or lambda with a reference to an exported function
    { provide: '$injector', useFactory: injectorFactory, deps: [] },
    { provide: '$rootScope', useFactory: rootScopeFactory, deps: ['$injector'] },
    { provide: '$compile', useFactory: compileFactory, deps: ['$injector'] },
    { provide: '$parse', useFactory: parseFactory, deps: ['$injector'] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjFfcHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdXBncmFkZS9zcmMvc3RhdGljL2FuZ3VsYXIxX3Byb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFJSCxpRkFBaUY7QUFDakYsc0ZBQXNGO0FBQ3RGLCtGQUErRjtBQUMvRix1REFBdUQ7QUFDdkQsSUFBSSxlQUE4QyxDQUFDO0FBQ25ELE1BQU0sNkJBQTZCLFFBQWtDO0lBQ25FLGVBQWUsR0FBRyxRQUFRLENBQUM7QUFDN0IsQ0FBQztBQUNELE1BQU07SUFDSixFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRCxJQUFNLFFBQVEsR0FBa0MsZUFBZSxDQUFDO0lBQ2hFLGVBQWUsR0FBRyxJQUFJLENBQUMsQ0FBRSwwQ0FBMEM7SUFDbkUsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBRUQsTUFBTSwyQkFBMkIsQ0FBMkI7SUFDMUQsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUVELE1BQU0seUJBQXlCLENBQTJCO0lBQ3hELE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFFRCxNQUFNLHVCQUF1QixDQUEyQjtJQUN0RCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQsTUFBTSxDQUFDLElBQU0saUJBQWlCLEdBQUc7SUFDL0IseUZBQXlGO0lBQ3pGLDJFQUEyRTtJQUMzRSx3Q0FBd0M7SUFDeEMseUZBQXlGO0lBQ3pGLEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUM7SUFDN0QsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBQztJQUMxRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBQztJQUN0RSxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBQztDQUNuRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJy4uL2NvbW1vbi9hbmd1bGFyMSc7XG5cbi8vIFdlIGhhdmUgdG8gZG8gYSBsaXR0bGUgZGFuY2UgdG8gZ2V0IHRoZSBuZzEgaW5qZWN0b3IgaW50byB0aGUgbW9kdWxlIGluamVjdG9yLlxuLy8gV2Ugc3RvcmUgdGhlIG5nMSBpbmplY3RvciBzbyB0aGF0IHRoZSBwcm92aWRlciBpbiB0aGUgbW9kdWxlIGluamVjdG9yIGNhbiBhY2Nlc3MgaXRcbi8vIFRoZW4gd2UgXCJnZXRcIiB0aGUgbmcxIGluamVjdG9yIGZyb20gdGhlIG1vZHVsZSBpbmplY3Rvciwgd2hpY2ggdHJpZ2dlcnMgdGhlIHByb3ZpZGVyIHRvIHJlYWRcbi8vIHRoZSBzdG9yZWQgaW5qZWN0b3IgYW5kIHJlbGVhc2UgdGhlIHJlZmVyZW5jZSB0byBpdC5cbmxldCB0ZW1wSW5qZWN0b3JSZWY6IGFuZ3VsYXIuSUluamVjdG9yU2VydmljZXxudWxsO1xuZXhwb3J0IGZ1bmN0aW9uIHNldFRlbXBJbmplY3RvclJlZihpbmplY3RvcjogYW5ndWxhci5JSW5qZWN0b3JTZXJ2aWNlKSB7XG4gIHRlbXBJbmplY3RvclJlZiA9IGluamVjdG9yO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluamVjdG9yRmFjdG9yeSgpIHtcbiAgaWYgKCF0ZW1wSW5qZWN0b3JSZWYpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyeWluZyB0byBnZXQgdGhlIEFuZ3VsYXJKUyBpbmplY3RvciBiZWZvcmUgaXQgYmVpbmcgc2V0LicpO1xuICB9XG5cbiAgY29uc3QgaW5qZWN0b3I6IGFuZ3VsYXIuSUluamVjdG9yU2VydmljZXxudWxsID0gdGVtcEluamVjdG9yUmVmO1xuICB0ZW1wSW5qZWN0b3JSZWYgPSBudWxsOyAgLy8gY2xlYXIgdGhlIHZhbHVlIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzXG4gIHJldHVybiBpbmplY3Rvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvb3RTY29wZUZhY3RvcnkoaTogYW5ndWxhci5JSW5qZWN0b3JTZXJ2aWNlKSB7XG4gIHJldHVybiBpLmdldCgnJHJvb3RTY29wZScpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZUZhY3RvcnkoaTogYW5ndWxhci5JSW5qZWN0b3JTZXJ2aWNlKSB7XG4gIHJldHVybiBpLmdldCgnJGNvbXBpbGUnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmFjdG9yeShpOiBhbmd1bGFyLklJbmplY3RvclNlcnZpY2UpIHtcbiAgcmV0dXJuIGkuZ2V0KCckcGFyc2UnKTtcbn1cblxuZXhwb3J0IGNvbnN0IGFuZ3VsYXIxUHJvdmlkZXJzID0gW1xuICAvLyBXZSBtdXN0IHVzZSBleHBvcnRlZCBuYW1lZCBmdW5jdGlvbnMgZm9yIHRoZSBuZzIgZmFjdG9yaWVzIHRvIGtlZXAgdGhlIGNvbXBpbGVyIGhhcHB5OlxuICAvLyA+IE1ldGFkYXRhIGNvbGxlY3RlZCBjb250YWlucyBhbiBlcnJvciB0aGF0IHdpbGwgYmUgcmVwb3J0ZWQgYXQgcnVudGltZTpcbiAgLy8gPiAgIEZ1bmN0aW9uIGNhbGxzIGFyZSBub3Qgc3VwcG9ydGVkLlxuICAvLyA+ICAgQ29uc2lkZXIgcmVwbGFjaW5nIHRoZSBmdW5jdGlvbiBvciBsYW1iZGEgd2l0aCBhIHJlZmVyZW5jZSB0byBhbiBleHBvcnRlZCBmdW5jdGlvblxuICB7cHJvdmlkZTogJyRpbmplY3RvcicsIHVzZUZhY3Rvcnk6IGluamVjdG9yRmFjdG9yeSwgZGVwczogW119LFxuICB7cHJvdmlkZTogJyRyb290U2NvcGUnLCB1c2VGYWN0b3J5OiByb290U2NvcGVGYWN0b3J5LCBkZXBzOiBbJyRpbmplY3RvciddfSxcbiAge3Byb3ZpZGU6ICckY29tcGlsZScsIHVzZUZhY3Rvcnk6IGNvbXBpbGVGYWN0b3J5LCBkZXBzOiBbJyRpbmplY3RvciddfSxcbiAge3Byb3ZpZGU6ICckcGFyc2UnLCB1c2VGYWN0b3J5OiBwYXJzZUZhY3RvcnksIGRlcHM6IFsnJGluamVjdG9yJ119XG5dO1xuIl19