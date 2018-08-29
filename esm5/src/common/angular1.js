/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function noNg() {
    throw new Error('AngularJS v1.x is not loaded!');
}
var angular = {
    bootstrap: noNg,
    module: noNg,
    element: noNg,
    version: undefined,
    resumeBootstrap: noNg,
    getTestability: noNg
};
try {
    if (window.hasOwnProperty('angular')) {
        angular = window.angular;
    }
}
catch (e) {
    // ignore in CJS mode.
}
/**
 * @deprecated Use `setAngularJSGlobal` instead.
 */
export function setAngularLib(ng) {
    setAngularJSGlobal(ng);
}
/**
 * @deprecated Use `getAngularJSGlobal` instead.
 */
export function getAngularLib() {
    return getAngularJSGlobal();
}
/**
 * Resets the AngularJS global.
 *
 * Used when AngularJS is loaded lazily, and not available on `window`.
 */
export function setAngularJSGlobal(ng) {
    angular = ng;
    version = ng && ng.version;
}
/**
 * Returns the current AngularJS global.
 */
export function getAngularJSGlobal() {
    return angular;
}
export var bootstrap = function (e, modules, config) {
    return angular.bootstrap(e, modules, config);
};
export var module = function (prefix, dependencies) {
    return angular.module(prefix, dependencies);
};
export var element = function (e) { return angular.element(e); };
export var resumeBootstrap = function () { return angular.resumeBootstrap(); };
export var getTestability = function (e) { return angular.getTestability(e); };
export var version = angular.version;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy91cGdyYWRlL3NyYy9jb21tb24vYW5ndWxhcjEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBaU5ILFNBQVMsSUFBSTtJQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBR0QsSUFBSSxPQUFPLEdBUUY7SUFDUCxTQUFTLEVBQUUsSUFBSTtJQUNmLE1BQU0sRUFBRSxJQUFJO0lBQ1osT0FBTyxFQUFFLElBQUk7SUFDYixPQUFPLEVBQUUsU0FBUztJQUNsQixlQUFlLEVBQUUsSUFBSTtJQUNyQixjQUFjLEVBQUUsSUFBSTtDQUNyQixDQUFDO0FBRUYsSUFBSTtJQUNGLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNwQyxPQUFPLEdBQVMsTUFBTyxDQUFDLE9BQU8sQ0FBQztLQUNqQztDQUNGO0FBQUMsT0FBTyxDQUFDLEVBQUU7SUFDVixzQkFBc0I7Q0FDdkI7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQUMsRUFBTztJQUNuQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsYUFBYTtJQUMzQixPQUFPLGtCQUFrQixFQUFFLENBQUM7QUFDOUIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsRUFBTztJQUN4QyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2IsT0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO0FBQzdCLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxrQkFBa0I7SUFDaEMsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUVELE1BQU0sQ0FBQyxJQUFNLFNBQVMsR0FBNkIsVUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU87SUFDbkUsT0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0FBQXJDLENBQXFDLENBQUM7QUFFMUMsTUFBTSxDQUFDLElBQU0sTUFBTSxHQUEwQixVQUFDLE1BQU0sRUFBRSxZQUFhO0lBQy9ELE9BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDO0FBQXBDLENBQW9DLENBQUM7QUFFekMsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUEyQixVQUFBLENBQUMsSUFBSSxPQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQWxCLENBQWtCLENBQUM7QUFFdkUsTUFBTSxDQUFDLElBQU0sZUFBZSxHQUFtQyxjQUFNLE9BQUEsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUF6QixDQUF5QixDQUFDO0FBRS9GLE1BQU0sQ0FBQyxJQUFNLGNBQWMsR0FBa0MsVUFBQSxDQUFDLElBQUksT0FBQSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUF6QixDQUF5QixDQUFDO0FBRTVGLE1BQU0sQ0FBQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5leHBvcnQgdHlwZSBOZzFUb2tlbiA9IHN0cmluZztcblxuZXhwb3J0IHR5cGUgTmcxRXhwcmVzc2lvbiA9IHN0cmluZyB8IEZ1bmN0aW9uO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBbm5vdGF0ZWRGdW5jdGlvbiBleHRlbmRzIEZ1bmN0aW9uIHsgJGluamVjdD86IFJlYWRvbmx5QXJyYXk8TmcxVG9rZW4+OyB9XG5cbmV4cG9ydCB0eXBlIElJbmplY3RhYmxlID0gKE5nMVRva2VuIHwgRnVuY3Rpb24pW10gfCBJQW5ub3RhdGVkRnVuY3Rpb247XG5cbmV4cG9ydCB0eXBlIFNpbmdsZU9yTGlzdE9yTWFwPFQ+ID0gVCB8IFRbXSB8IHtba2V5OiBzdHJpbmddOiBUfTtcblxuZXhwb3J0IGludGVyZmFjZSBJTW9kdWxlIHtcbiAgbmFtZTogc3RyaW5nO1xuICByZXF1aXJlczogKHN0cmluZ3xJSW5qZWN0YWJsZSlbXTtcbiAgY29uZmlnKGZuOiBJSW5qZWN0YWJsZSk6IElNb2R1bGU7XG4gIGRpcmVjdGl2ZShzZWxlY3Rvcjogc3RyaW5nLCBmYWN0b3J5OiBJSW5qZWN0YWJsZSk6IElNb2R1bGU7XG4gIGNvbXBvbmVudChzZWxlY3Rvcjogc3RyaW5nLCBjb21wb25lbnQ6IElDb21wb25lbnQpOiBJTW9kdWxlO1xuICBjb250cm9sbGVyKG5hbWU6IHN0cmluZywgdHlwZTogSUluamVjdGFibGUpOiBJTW9kdWxlO1xuICBmYWN0b3J5KGtleTogTmcxVG9rZW4sIGZhY3RvcnlGbjogSUluamVjdGFibGUpOiBJTW9kdWxlO1xuICB2YWx1ZShrZXk6IE5nMVRva2VuLCB2YWx1ZTogYW55KTogSU1vZHVsZTtcbiAgY29uc3RhbnQodG9rZW46IE5nMVRva2VuLCB2YWx1ZTogYW55KTogSU1vZHVsZTtcbiAgcnVuKGE6IElJbmplY3RhYmxlKTogSU1vZHVsZTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBpbGVTZXJ2aWNlIHtcbiAgKGVsZW1lbnQ6IEVsZW1lbnR8Tm9kZUxpc3R8Tm9kZVtdfHN0cmluZywgdHJhbnNjbHVkZT86IEZ1bmN0aW9uKTogSUxpbmtGbjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUxpbmtGbiB7XG4gIChzY29wZTogSVNjb3BlLCBjbG9uZUF0dGFjaEZuPzogSUNsb25lQXR0YWNoRnVuY3Rpb24sIG9wdGlvbnM/OiBJTGlua0ZuT3B0aW9ucyk6IElBdWdtZW50ZWRKUXVlcnk7XG4gICQkc2xvdHM/OiB7W3Nsb3ROYW1lOiBzdHJpbmddOiBJTGlua0ZufTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUxpbmtGbk9wdGlvbnMge1xuICBwYXJlbnRCb3VuZFRyYW5zY2x1ZGVGbj86IEZ1bmN0aW9uO1xuICB0cmFuc2NsdWRlQ29udHJvbGxlcnM/OiB7W2tleTogc3RyaW5nXTogYW55fTtcbiAgZnV0dXJlUGFyZW50RWxlbWVudD86IE5vZGU7XG59XG5leHBvcnQgaW50ZXJmYWNlIElSb290U2NvcGVTZXJ2aWNlIHtcbiAgJG5ldyhpc29sYXRlPzogYm9vbGVhbik6IElTY29wZTtcbiAgJGlkOiBzdHJpbmc7XG4gICRwYXJlbnQ6IElTY29wZTtcbiAgJHJvb3Q6IElTY29wZTtcbiAgJHdhdGNoKGV4cDogTmcxRXhwcmVzc2lvbiwgZm4/OiAoYTE/OiBhbnksIGEyPzogYW55KSA9PiB2b2lkKTogRnVuY3Rpb247XG4gICRvbihldmVudDogc3RyaW5nLCBmbj86IChldmVudD86IGFueSwgLi4uYXJnczogYW55W10pID0+IHZvaWQpOiBGdW5jdGlvbjtcbiAgJGRlc3Ryb3koKTogYW55O1xuICAkYXBwbHkoZXhwPzogTmcxRXhwcmVzc2lvbik6IGFueTtcbiAgJGRpZ2VzdCgpOiBhbnk7XG4gICRldmFsQXN5bmMoZXhwOiBOZzFFeHByZXNzaW9uLCBsb2NhbHM/OiBhbnkpOiB2b2lkO1xuICAkb24oZXZlbnQ6IHN0cmluZywgZm4/OiAoZXZlbnQ/OiBhbnksIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkKTogRnVuY3Rpb247XG4gICQkY2hpbGRUYWlsOiBJU2NvcGU7XG4gICQkY2hpbGRIZWFkOiBJU2NvcGU7XG4gICQkbmV4dFNpYmxpbmc6IElTY29wZTtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuZXhwb3J0IGludGVyZmFjZSBJU2NvcGUgZXh0ZW5kcyBJUm9vdFNjb3BlU2VydmljZSB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIElBbmd1bGFyQm9vdHN0cmFwQ29uZmlnIHsgc3RyaWN0RGk/OiBib29sZWFuOyB9XG5leHBvcnQgaW50ZXJmYWNlIElEaXJlY3RpdmUge1xuICBjb21waWxlPzogSURpcmVjdGl2ZUNvbXBpbGVGbjtcbiAgY29udHJvbGxlcj86IElDb250cm9sbGVyO1xuICBjb250cm9sbGVyQXM/OiBzdHJpbmc7XG4gIGJpbmRUb0NvbnRyb2xsZXI/OiBib29sZWFufHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBsaW5rPzogSURpcmVjdGl2ZUxpbmtGbnxJRGlyZWN0aXZlUHJlUG9zdDtcbiAgbmFtZT86IHN0cmluZztcbiAgcHJpb3JpdHk/OiBudW1iZXI7XG4gIHJlcGxhY2U/OiBib29sZWFuO1xuICByZXF1aXJlPzogRGlyZWN0aXZlUmVxdWlyZVByb3BlcnR5O1xuICByZXN0cmljdD86IHN0cmluZztcbiAgc2NvcGU/OiBib29sZWFufHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICB0ZW1wbGF0ZT86IHN0cmluZ3xGdW5jdGlvbjtcbiAgdGVtcGxhdGVVcmw/OiBzdHJpbmd8RnVuY3Rpb247XG4gIHRlbXBsYXRlTmFtZXNwYWNlPzogc3RyaW5nO1xuICB0ZXJtaW5hbD86IGJvb2xlYW47XG4gIHRyYW5zY2x1ZGU/OiBEaXJlY3RpdmVUcmFuc2NsdWRlUHJvcGVydHk7XG59XG5leHBvcnQgdHlwZSBEaXJlY3RpdmVSZXF1aXJlUHJvcGVydHkgPSBTaW5nbGVPckxpc3RPck1hcDxzdHJpbmc+O1xuZXhwb3J0IHR5cGUgRGlyZWN0aXZlVHJhbnNjbHVkZVByb3BlcnR5ID0gYm9vbGVhbiB8ICdlbGVtZW50JyB8IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuZXhwb3J0IGludGVyZmFjZSBJRGlyZWN0aXZlQ29tcGlsZUZuIHtcbiAgKHRlbXBsYXRlRWxlbWVudDogSUF1Z21lbnRlZEpRdWVyeSwgdGVtcGxhdGVBdHRyaWJ1dGVzOiBJQXR0cmlidXRlcyxcbiAgIHRyYW5zY2x1ZGU6IElUcmFuc2NsdWRlRnVuY3Rpb24pOiBJRGlyZWN0aXZlUHJlUG9zdDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSURpcmVjdGl2ZVByZVBvc3Qge1xuICBwcmU/OiBJRGlyZWN0aXZlTGlua0ZuO1xuICBwb3N0PzogSURpcmVjdGl2ZUxpbmtGbjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSURpcmVjdGl2ZUxpbmtGbiB7XG4gIChzY29wZTogSVNjb3BlLCBpbnN0YW5jZUVsZW1lbnQ6IElBdWdtZW50ZWRKUXVlcnksIGluc3RhbmNlQXR0cmlidXRlczogSUF0dHJpYnV0ZXMsXG4gICBjb250cm9sbGVyOiBhbnksIHRyYW5zY2x1ZGU6IElUcmFuc2NsdWRlRnVuY3Rpb24pOiB2b2lkO1xufVxuZXhwb3J0IGludGVyZmFjZSBJQ29tcG9uZW50IHtcbiAgYmluZGluZ3M/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcbiAgY29udHJvbGxlcj86IHN0cmluZ3xJSW5qZWN0YWJsZTtcbiAgY29udHJvbGxlckFzPzogc3RyaW5nO1xuICByZXF1aXJlPzogRGlyZWN0aXZlUmVxdWlyZVByb3BlcnR5O1xuICB0ZW1wbGF0ZT86IHN0cmluZ3xGdW5jdGlvbjtcbiAgdGVtcGxhdGVVcmw/OiBzdHJpbmd8RnVuY3Rpb247XG4gIHRyYW5zY2x1ZGU/OiBEaXJlY3RpdmVUcmFuc2NsdWRlUHJvcGVydHk7XG59XG5leHBvcnQgaW50ZXJmYWNlIElBdHRyaWJ1dGVzIHtcbiAgJG9ic2VydmUoYXR0cjogc3RyaW5nLCBmbjogKHY6IHN0cmluZykgPT4gdm9pZCk6IHZvaWQ7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSVRyYW5zY2x1ZGVGdW5jdGlvbiB7XG4gIC8vIElmIHRoZSBzY29wZSBpcyBwcm92aWRlZCwgdGhlbiB0aGUgY2xvbmVBdHRhY2hGbiBtdXN0IGJlIGFzIHdlbGwuXG4gIChzY29wZTogSVNjb3BlLCBjbG9uZUF0dGFjaEZuOiBJQ2xvbmVBdHRhY2hGdW5jdGlvbik6IElBdWdtZW50ZWRKUXVlcnk7XG4gIC8vIElmIG9uZSBhcmd1bWVudCBpcyBwcm92aWRlZCwgdGhlbiBpdCdzIGFzc3VtZWQgdG8gYmUgdGhlIGNsb25lQXR0YWNoRm4uXG4gIChjbG9uZUF0dGFjaEZuPzogSUNsb25lQXR0YWNoRnVuY3Rpb24pOiBJQXVnbWVudGVkSlF1ZXJ5O1xufVxuZXhwb3J0IGludGVyZmFjZSBJQ2xvbmVBdHRhY2hGdW5jdGlvbiB7XG4gIC8vIExldCdzIGhpbnQgYnV0IG5vdCBmb3JjZSBjbG9uZUF0dGFjaEZuJ3Mgc2lnbmF0dXJlXG4gIChjbG9uZWRFbGVtZW50PzogSUF1Z21lbnRlZEpRdWVyeSwgc2NvcGU/OiBJU2NvcGUpOiBhbnk7XG59XG5leHBvcnQgdHlwZSBJQXVnbWVudGVkSlF1ZXJ5ID0gTm9kZVtdICYge1xuICBvbj86IChuYW1lOiBzdHJpbmcsIGZuOiAoKSA9PiB2b2lkKSA9PiB2b2lkO1xuICBkYXRhPzogKG5hbWU6IHN0cmluZywgdmFsdWU/OiBhbnkpID0+IGFueTtcbiAgdGV4dD86ICgpID0+IHN0cmluZztcbiAgaW5oZXJpdGVkRGF0YT86IChuYW1lOiBzdHJpbmcsIHZhbHVlPzogYW55KSA9PiBhbnk7XG4gIGNvbnRlbnRzPzogKCkgPT4gSUF1Z21lbnRlZEpRdWVyeTtcbiAgcGFyZW50PzogKCkgPT4gSUF1Z21lbnRlZEpRdWVyeTtcbiAgZW1wdHk/OiAoKSA9PiB2b2lkO1xuICBhcHBlbmQ/OiAoY29udGVudDogSUF1Z21lbnRlZEpRdWVyeSB8IHN0cmluZykgPT4gSUF1Z21lbnRlZEpRdWVyeTtcbiAgY29udHJvbGxlcj86IChuYW1lOiBzdHJpbmcpID0+IGFueTtcbiAgaXNvbGF0ZVNjb3BlPzogKCkgPT4gSVNjb3BlO1xuICBpbmplY3Rvcj86ICgpID0+IElJbmplY3RvclNlcnZpY2U7XG4gIHJlbW92ZT86ICgpID0+IHZvaWQ7XG4gIHJlbW92ZURhdGE/OiAoKSA9PiB2b2lkO1xufTtcbmV4cG9ydCBpbnRlcmZhY2UgSVByb3ZpZGVyIHsgJGdldDogSUluamVjdGFibGU7IH1cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3ZpZGVTZXJ2aWNlIHtcbiAgcHJvdmlkZXIodG9rZW46IE5nMVRva2VuLCBwcm92aWRlcjogSVByb3ZpZGVyKTogSVByb3ZpZGVyO1xuICBmYWN0b3J5KHRva2VuOiBOZzFUb2tlbiwgZmFjdG9yeTogSUluamVjdGFibGUpOiBJUHJvdmlkZXI7XG4gIHNlcnZpY2UodG9rZW46IE5nMVRva2VuLCB0eXBlOiBJSW5qZWN0YWJsZSk6IElQcm92aWRlcjtcbiAgdmFsdWUodG9rZW46IE5nMVRva2VuLCB2YWx1ZTogYW55KTogSVByb3ZpZGVyO1xuICBjb25zdGFudCh0b2tlbjogTmcxVG9rZW4sIHZhbHVlOiBhbnkpOiB2b2lkO1xuICBkZWNvcmF0b3IodG9rZW46IE5nMVRva2VuLCBmYWN0b3J5OiBJSW5qZWN0YWJsZSk6IHZvaWQ7XG59XG5leHBvcnQgaW50ZXJmYWNlIElQYXJzZVNlcnZpY2UgeyAoZXhwcmVzc2lvbjogc3RyaW5nKTogSUNvbXBpbGVkRXhwcmVzc2lvbjsgfVxuZXhwb3J0IGludGVyZmFjZSBJQ29tcGlsZWRFeHByZXNzaW9uIHtcbiAgKGNvbnRleHQ6IGFueSwgbG9jYWxzOiBhbnkpOiBhbnk7XG4gIGFzc2lnbj86IChjb250ZXh0OiBhbnksIHZhbHVlOiBhbnkpID0+IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUh0dHBCYWNrZW5kU2VydmljZSB7XG4gIChtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIHBvc3Q/OiBhbnksIGNhbGxiYWNrPzogRnVuY3Rpb24sIGhlYWRlcnM/OiBhbnksIHRpbWVvdXQ/OiBudW1iZXIsXG4gICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuKTogdm9pZDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUNhY2hlT2JqZWN0IHtcbiAgcHV0PFQ+KGtleTogc3RyaW5nLCB2YWx1ZT86IFQpOiBUO1xuICBnZXQoa2V5OiBzdHJpbmcpOiBhbnk7XG59XG5leHBvcnQgaW50ZXJmYWNlIElUZW1wbGF0ZUNhY2hlU2VydmljZSBleHRlbmRzIElDYWNoZU9iamVjdCB7fVxuZXhwb3J0IGludGVyZmFjZSBJVGVtcGxhdGVSZXF1ZXN0U2VydmljZSB7XG4gICh0ZW1wbGF0ZTogc3RyaW5nfGFueSAvKiBUcnVzdGVkUmVzb3VyY2VVcmwgKi8sIGlnbm9yZVJlcXVlc3RFcnJvcj86IGJvb2xlYW4pOiBQcm9taXNlPHN0cmluZz47XG4gIHRvdGFsUGVuZGluZ1JlcXVlc3RzOiBudW1iZXI7XG59XG5leHBvcnQgdHlwZSBJQ29udHJvbGxlciA9IHN0cmluZyB8IElJbmplY3RhYmxlO1xuZXhwb3J0IGludGVyZmFjZSBJQ29udHJvbGxlclNlcnZpY2Uge1xuICAoY29udHJvbGxlckNvbnN0cnVjdG9yOiBJQ29udHJvbGxlciwgbG9jYWxzPzogYW55LCBsYXRlcj86IGFueSwgaWRlbnQ/OiBhbnkpOiBhbnk7XG4gIChjb250cm9sbGVyTmFtZTogc3RyaW5nLCBsb2NhbHM/OiBhbnkpOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUluamVjdG9yU2VydmljZSB7XG4gIGdldChrZXk6IHN0cmluZyk6IGFueTtcbiAgaGFzKGtleTogc3RyaW5nKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJSW50ZXJ2YWxTZXJ2aWNlIHtcbiAgKGZ1bmM6IEZ1bmN0aW9uLCBkZWxheTogbnVtYmVyLCBjb3VudD86IG51bWJlciwgaW52b2tlQXBwbHk/OiBib29sZWFuLFxuICAgLi4uYXJnczogYW55W10pOiBQcm9taXNlPGFueT47XG4gIGNhbmNlbChwcm9taXNlOiBQcm9taXNlPGFueT4pOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElUZXN0YWJpbGl0eVNlcnZpY2Uge1xuICBmaW5kQmluZGluZ3MoZWxlbWVudDogRWxlbWVudCwgZXhwcmVzc2lvbjogc3RyaW5nLCBvcHRfZXhhY3RNYXRjaD86IGJvb2xlYW4pOiBFbGVtZW50W107XG4gIGZpbmRNb2RlbHMoZWxlbWVudDogRWxlbWVudCwgZXhwcmVzc2lvbjogc3RyaW5nLCBvcHRfZXhhY3RNYXRjaD86IGJvb2xlYW4pOiBFbGVtZW50W107XG4gIGdldExvY2F0aW9uKCk6IHN0cmluZztcbiAgc2V0TG9jYXRpb24odXJsOiBzdHJpbmcpOiB2b2lkO1xuICB3aGVuU3RhYmxlKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU5nTW9kZWxDb250cm9sbGVyIHtcbiAgJHJlbmRlcigpOiB2b2lkO1xuICAkaXNFbXB0eSh2YWx1ZTogYW55KTogYm9vbGVhbjtcbiAgJHNldFZhbGlkaXR5KHZhbGlkYXRpb25FcnJvcktleTogc3RyaW5nLCBpc1ZhbGlkOiBib29sZWFuKTogdm9pZDtcbiAgJHNldFByaXN0aW5lKCk6IHZvaWQ7XG4gICRzZXREaXJ0eSgpOiB2b2lkO1xuICAkc2V0VW50b3VjaGVkKCk6IHZvaWQ7XG4gICRzZXRUb3VjaGVkKCk6IHZvaWQ7XG4gICRyb2xsYmFja1ZpZXdWYWx1ZSgpOiB2b2lkO1xuICAkdmFsaWRhdGUoKTogdm9pZDtcbiAgJGNvbW1pdFZpZXdWYWx1ZSgpOiB2b2lkO1xuICAkc2V0Vmlld1ZhbHVlKHZhbHVlOiBhbnksIHRyaWdnZXI6IHN0cmluZyk6IHZvaWQ7XG5cbiAgJHZpZXdWYWx1ZTogYW55O1xuICAkbW9kZWxWYWx1ZTogYW55O1xuICAkcGFyc2VyczogRnVuY3Rpb25bXTtcbiAgJGZvcm1hdHRlcnM6IEZ1bmN0aW9uW107XG4gICR2YWxpZGF0b3JzOiB7W2tleTogc3RyaW5nXTogRnVuY3Rpb259O1xuICAkYXN5bmNWYWxpZGF0b3JzOiB7W2tleTogc3RyaW5nXTogRnVuY3Rpb259O1xuICAkdmlld0NoYW5nZUxpc3RlbmVyczogRnVuY3Rpb25bXTtcbiAgJGVycm9yOiBPYmplY3Q7XG4gICRwZW5kaW5nOiBPYmplY3Q7XG4gICR1bnRvdWNoZWQ6IGJvb2xlYW47XG4gICR0b3VjaGVkOiBib29sZWFuO1xuICAkcHJpc3RpbmU6IGJvb2xlYW47XG4gICRkaXJ0eTogYm9vbGVhbjtcbiAgJHZhbGlkOiBib29sZWFuO1xuICAkaW52YWxpZDogYm9vbGVhbjtcbiAgJG5hbWU6IHN0cmluZztcbn1cblxuZnVuY3Rpb24gbm9OZygpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdBbmd1bGFySlMgdjEueCBpcyBub3QgbG9hZGVkIScpO1xufVxuXG5cbmxldCBhbmd1bGFyOiB7XG4gIGJvb3RzdHJhcDogKGU6IEVsZW1lbnQsIG1vZHVsZXM6IChzdHJpbmcgfCBJSW5qZWN0YWJsZSlbXSwgY29uZmlnPzogSUFuZ3VsYXJCb290c3RyYXBDb25maWcpID0+XG4gICAgICAgICAgICAgICAgIElJbmplY3RvclNlcnZpY2UsXG4gIG1vZHVsZTogKHByZWZpeDogc3RyaW5nLCBkZXBlbmRlbmNpZXM/OiBzdHJpbmdbXSkgPT4gSU1vZHVsZSxcbiAgZWxlbWVudDogKGU6IHN0cmluZyB8IEVsZW1lbnQgfCBEb2N1bWVudCB8IElBdWdtZW50ZWRKUXVlcnkpID0+IElBdWdtZW50ZWRKUXVlcnksXG4gIHZlcnNpb246IHttYWpvcjogbnVtYmVyfSxcbiAgcmVzdW1lQm9vdHN0cmFwOiAoKSA9PiB2b2lkLFxuICBnZXRUZXN0YWJpbGl0eTogKGU6IEVsZW1lbnQpID0+IElUZXN0YWJpbGl0eVNlcnZpY2Vcbn0gPSA8YW55PntcbiAgYm9vdHN0cmFwOiBub05nLFxuICBtb2R1bGU6IG5vTmcsXG4gIGVsZW1lbnQ6IG5vTmcsXG4gIHZlcnNpb246IHVuZGVmaW5lZCxcbiAgcmVzdW1lQm9vdHN0cmFwOiBub05nLFxuICBnZXRUZXN0YWJpbGl0eTogbm9OZ1xufTtcblxudHJ5IHtcbiAgaWYgKHdpbmRvdy5oYXNPd25Qcm9wZXJ0eSgnYW5ndWxhcicpKSB7XG4gICAgYW5ndWxhciA9ICg8YW55PndpbmRvdykuYW5ndWxhcjtcbiAgfVxufSBjYXRjaCAoZSkge1xuICAvLyBpZ25vcmUgaW4gQ0pTIG1vZGUuXG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBzZXRBbmd1bGFySlNHbG9iYWxgIGluc3RlYWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRBbmd1bGFyTGliKG5nOiBhbnkpOiB2b2lkIHtcbiAgc2V0QW5ndWxhckpTR2xvYmFsKG5nKTtcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYGdldEFuZ3VsYXJKU0dsb2JhbGAgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFuZ3VsYXJMaWIoKTogYW55IHtcbiAgcmV0dXJuIGdldEFuZ3VsYXJKU0dsb2JhbCgpO1xufVxuXG4vKipcbiAqIFJlc2V0cyB0aGUgQW5ndWxhckpTIGdsb2JhbC5cbiAqXG4gKiBVc2VkIHdoZW4gQW5ndWxhckpTIGlzIGxvYWRlZCBsYXppbHksIGFuZCBub3QgYXZhaWxhYmxlIG9uIGB3aW5kb3dgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0QW5ndWxhckpTR2xvYmFsKG5nOiBhbnkpOiB2b2lkIHtcbiAgYW5ndWxhciA9IG5nO1xuICB2ZXJzaW9uID0gbmcgJiYgbmcudmVyc2lvbjtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjdXJyZW50IEFuZ3VsYXJKUyBnbG9iYWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmd1bGFySlNHbG9iYWwoKTogYW55IHtcbiAgcmV0dXJuIGFuZ3VsYXI7XG59XG5cbmV4cG9ydCBjb25zdCBib290c3RyYXA6IHR5cGVvZiBhbmd1bGFyLmJvb3RzdHJhcCA9IChlLCBtb2R1bGVzLCBjb25maWc/KSA9PlxuICAgIGFuZ3VsYXIuYm9vdHN0cmFwKGUsIG1vZHVsZXMsIGNvbmZpZyk7XG5cbmV4cG9ydCBjb25zdCBtb2R1bGU6IHR5cGVvZiBhbmd1bGFyLm1vZHVsZSA9IChwcmVmaXgsIGRlcGVuZGVuY2llcz8pID0+XG4gICAgYW5ndWxhci5tb2R1bGUocHJlZml4LCBkZXBlbmRlbmNpZXMpO1xuXG5leHBvcnQgY29uc3QgZWxlbWVudDogdHlwZW9mIGFuZ3VsYXIuZWxlbWVudCA9IGUgPT4gYW5ndWxhci5lbGVtZW50KGUpO1xuXG5leHBvcnQgY29uc3QgcmVzdW1lQm9vdHN0cmFwOiB0eXBlb2YgYW5ndWxhci5yZXN1bWVCb290c3RyYXAgPSAoKSA9PiBhbmd1bGFyLnJlc3VtZUJvb3RzdHJhcCgpO1xuXG5leHBvcnQgY29uc3QgZ2V0VGVzdGFiaWxpdHk6IHR5cGVvZiBhbmd1bGFyLmdldFRlc3RhYmlsaXR5ID0gZSA9PiBhbmd1bGFyLmdldFRlc3RhYmlsaXR5KGUpO1xuXG5leHBvcnQgbGV0IHZlcnNpb24gPSBhbmd1bGFyLnZlcnNpb247XG4iXX0=