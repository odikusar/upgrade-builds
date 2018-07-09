/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef, ChangeDetectorRef, Injector, SimpleChange, Testability, TestabilityRegistry } from '@angular/core';
import { PropertyBinding } from './component_info';
import { $SCOPE } from './constants';
import { getComponentName, hookupNgModel, strictEquals } from './util';
var INITIAL_VALUE = {
    __UNINITIALIZED__: true
};
var DowngradeComponentAdapter = /** @class */ (function () {
    function DowngradeComponentAdapter(element, attrs, scope, ngModel, parentInjector, $injector, $compile, $parse, componentFactory, wrapCallback) {
        this.element = element;
        this.attrs = attrs;
        this.scope = scope;
        this.ngModel = ngModel;
        this.parentInjector = parentInjector;
        this.$injector = $injector;
        this.$compile = $compile;
        this.$parse = $parse;
        this.componentFactory = componentFactory;
        this.wrapCallback = wrapCallback;
        this.implementsOnChanges = false;
        this.inputChangeCount = 0;
        this.inputChanges = {};
        this.componentScope = scope.$new();
    }
    DowngradeComponentAdapter.prototype.compileContents = function () {
        var _this = this;
        var compiledProjectableNodes = [];
        var projectableNodes = this.groupProjectableNodes();
        var linkFns = projectableNodes.map(function (nodes) { return _this.$compile(nodes); });
        this.element.empty();
        linkFns.forEach(function (linkFn) {
            linkFn(_this.scope, function (clone) {
                compiledProjectableNodes.push(clone);
                _this.element.append(clone);
            });
        });
        return compiledProjectableNodes;
    };
    DowngradeComponentAdapter.prototype.createComponent = function (projectableNodes) {
        var providers = [{ provide: $SCOPE, useValue: this.componentScope }];
        var childInjector = Injector.create({ providers: providers, parent: this.parentInjector, name: 'DowngradeComponentAdapter' });
        this.componentRef =
            this.componentFactory.create(childInjector, projectableNodes, this.element[0]);
        this.viewChangeDetector = this.componentRef.injector.get(ChangeDetectorRef);
        this.changeDetector = this.componentRef.changeDetectorRef;
        this.component = this.componentRef.instance;
        // testability hook is commonly added during component bootstrap in
        // packages/core/src/application_ref.bootstrap()
        // in downgraded application, component creation will take place here as well as adding the
        // testability hook.
        var testability = this.componentRef.injector.get(Testability, null);
        if (testability) {
            this.componentRef.injector.get(TestabilityRegistry)
                .registerApplication(this.componentRef.location.nativeElement, testability);
        }
        hookupNgModel(this.ngModel, this.component);
    };
    DowngradeComponentAdapter.prototype.setupInputs = function (needsNgZone, propagateDigest) {
        var _this = this;
        if (propagateDigest === void 0) { propagateDigest = true; }
        var attrs = this.attrs;
        var inputs = this.componentFactory.inputs || [];
        var _loop_1 = function (i) {
            var input = new PropertyBinding(inputs[i].propName, inputs[i].templateName);
            var expr = null;
            if (attrs.hasOwnProperty(input.attr)) {
                var observeFn_1 = (function (prop) {
                    var prevValue = INITIAL_VALUE;
                    return function (currValue) {
                        // Initially, both `$observe()` and `$watch()` will call this function.
                        if (!strictEquals(prevValue, currValue)) {
                            if (prevValue === INITIAL_VALUE) {
                                prevValue = currValue;
                            }
                            _this.updateInput(prop, prevValue, currValue);
                            prevValue = currValue;
                        }
                    };
                })(input.prop);
                attrs.$observe(input.attr, observeFn_1);
                // Use `$watch()` (in addition to `$observe()`) in order to initialize the input in time
                // for `ngOnChanges()`. This is necessary if we are already in a `$digest`, which means that
                // `ngOnChanges()` (which is called by a watcher) will run before the `$observe()` callback.
                var unwatch_1 = this_1.componentScope.$watch(function () {
                    unwatch_1();
                    unwatch_1 = null;
                    observeFn_1(attrs[input.attr]);
                });
            }
            else if (attrs.hasOwnProperty(input.bindAttr)) {
                expr = attrs[input.bindAttr];
            }
            else if (attrs.hasOwnProperty(input.bracketAttr)) {
                expr = attrs[input.bracketAttr];
            }
            else if (attrs.hasOwnProperty(input.bindonAttr)) {
                expr = attrs[input.bindonAttr];
            }
            else if (attrs.hasOwnProperty(input.bracketParenAttr)) {
                expr = attrs[input.bracketParenAttr];
            }
            if (expr != null) {
                var watchFn = (function (prop) {
                    return function (currValue, prevValue) {
                        return _this.updateInput(prop, prevValue, currValue);
                    };
                })(input.prop);
                this_1.componentScope.$watch(expr, watchFn);
            }
        };
        var this_1 = this;
        for (var i = 0; i < inputs.length; i++) {
            _loop_1(i);
        }
        // Invoke `ngOnChanges()` and Change Detection (when necessary)
        var detectChanges = function () { return _this.changeDetector.detectChanges(); };
        var prototype = this.componentFactory.componentType.prototype;
        this.implementsOnChanges = !!(prototype && prototype.ngOnChanges);
        this.componentScope.$watch(function () { return _this.inputChangeCount; }, this.wrapCallback(function () {
            // Invoke `ngOnChanges()`
            if (_this.implementsOnChanges) {
                var inputChanges = _this.inputChanges;
                _this.inputChanges = {};
                _this.component.ngOnChanges((inputChanges));
            }
            _this.viewChangeDetector.markForCheck();
            // If opted out of propagating digests, invoke change detection when inputs change.
            if (!propagateDigest) {
                detectChanges();
            }
        }));
        // If not opted out of propagating digests, invoke change detection on every digest
        if (propagateDigest) {
            this.componentScope.$watch(this.wrapCallback(detectChanges));
        }
        // If necessary, attach the view so that it will be dirty-checked.
        // (Allow time for the initial input values to be set and `ngOnChanges()` to be called.)
        if (needsNgZone || !propagateDigest) {
            var unwatch_2 = this.componentScope.$watch(function () {
                unwatch_2();
                unwatch_2 = null;
                var appRef = _this.parentInjector.get(ApplicationRef);
                appRef.attachView(_this.componentRef.hostView);
            });
        }
    };
    DowngradeComponentAdapter.prototype.setupOutputs = function () {
        var attrs = this.attrs;
        var outputs = this.componentFactory.outputs || [];
        for (var j = 0; j < outputs.length; j++) {
            var output = new PropertyBinding(outputs[j].propName, outputs[j].templateName);
            var bindonAttr = output.bindonAttr.substring(0, output.bindonAttr.length - 6);
            var bracketParenAttr = "[(" + output.bracketParenAttr.substring(2, output.bracketParenAttr.length - 8) + ")]";
            // order below is important - first update bindings then evaluate expressions
            if (attrs.hasOwnProperty(bindonAttr)) {
                this.subscribeToOutput(output, attrs[bindonAttr], true);
            }
            if (attrs.hasOwnProperty(bracketParenAttr)) {
                this.subscribeToOutput(output, attrs[bracketParenAttr], true);
            }
            if (attrs.hasOwnProperty(output.onAttr)) {
                this.subscribeToOutput(output, attrs[output.onAttr]);
            }
            if (attrs.hasOwnProperty(output.parenAttr)) {
                this.subscribeToOutput(output, attrs[output.parenAttr]);
            }
        }
    };
    DowngradeComponentAdapter.prototype.subscribeToOutput = function (output, expr, isAssignment) {
        var _this = this;
        if (isAssignment === void 0) { isAssignment = false; }
        var getter = this.$parse(expr);
        var setter = getter.assign;
        if (isAssignment && !setter) {
            throw new Error("Expression '" + expr + "' is not assignable!");
        }
        var emitter = this.component[output.prop];
        if (emitter) {
            emitter.subscribe({
                next: isAssignment ? function (v) { return setter(_this.scope, v); } :
                    function (v) { return getter(_this.scope, { '$event': v }); }
            });
        }
        else {
            throw new Error("Missing emitter '" + output.prop + "' on component '" + getComponentName(this.componentFactory.componentType) + "'!");
        }
    };
    DowngradeComponentAdapter.prototype.registerCleanup = function () {
        var _this = this;
        var destroyComponentRef = this.wrapCallback(function () { return _this.componentRef.destroy(); });
        var destroyed = false;
        this.element.on('$destroy', function () { return _this.componentScope.$destroy(); });
        this.componentScope.$on('$destroy', function () {
            if (!destroyed) {
                destroyed = true;
                _this.componentRef.injector.get(TestabilityRegistry)
                    .unregisterApplication(_this.componentRef.location.nativeElement);
                destroyComponentRef();
            }
        });
    };
    DowngradeComponentAdapter.prototype.getInjector = function () { return this.componentRef.injector; };
    DowngradeComponentAdapter.prototype.updateInput = function (prop, prevValue, currValue) {
        if (this.implementsOnChanges) {
            this.inputChanges[prop] = new SimpleChange(prevValue, currValue, prevValue === currValue);
        }
        this.inputChangeCount++;
        this.component[prop] = currValue;
    };
    DowngradeComponentAdapter.prototype.groupProjectableNodes = function () {
        var ngContentSelectors = this.componentFactory.ngContentSelectors;
        return groupNodesBySelector(ngContentSelectors, this.element.contents());
    };
    return DowngradeComponentAdapter;
}());
export { DowngradeComponentAdapter };
/**
 * Group a set of DOM nodes into `ngContent` groups, based on the given content selectors.
 */
export function groupNodesBySelector(ngContentSelectors, nodes) {
    var projectableNodes = [];
    var wildcardNgContentIndex;
    for (var i = 0, ii = ngContentSelectors.length; i < ii; ++i) {
        projectableNodes[i] = [];
    }
    for (var j = 0, jj = nodes.length; j < jj; ++j) {
        var node = nodes[j];
        var ngContentIndex = findMatchingNgContentIndex(node, ngContentSelectors);
        if (ngContentIndex != null) {
            projectableNodes[ngContentIndex].push(node);
        }
    }
    return projectableNodes;
}
function findMatchingNgContentIndex(element, ngContentSelectors) {
    var ngContentIndices = [];
    var wildcardNgContentIndex = -1;
    for (var i = 0; i < ngContentSelectors.length; i++) {
        var selector = ngContentSelectors[i];
        if (selector === '*') {
            wildcardNgContentIndex = i;
        }
        else {
            if (matchesSelector(element, selector)) {
                ngContentIndices.push(i);
            }
        }
    }
    ngContentIndices.sort();
    if (wildcardNgContentIndex !== -1) {
        ngContentIndices.push(wildcardNgContentIndex);
    }
    return ngContentIndices.length ? ngContentIndices[0] : null;
}
var _matches;
function matchesSelector(el, selector) {
    if (!_matches) {
        var elProto = Element.prototype;
        _matches = elProto.matches || elProto.matchesSelector || elProto.mozMatchesSelector ||
            elProto.msMatchesSelector || elProto.oMatchesSelector || elProto.webkitMatchesSelector;
    }
    return el.nodeType === Node.ELEMENT_NODE ? _matches.call(el, selector) : false;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmdyYWRlX2NvbXBvbmVudF9hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdXBncmFkZS9zdGF0aWMvc3JjL2NvbW1vbi9kb3duZ3JhZGVfY29tcG9uZW50X2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBLE9BQU8sRUFBQyxjQUFjLEVBQUUsaUJBQWlCLEVBQWdELFFBQVEsRUFBYSxZQUFZLEVBQWlDLFdBQVcsRUFBRSxtQkFBbUIsRUFBTyxNQUFNLGVBQWUsQ0FBQztBQUd4TixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNuQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUVyRSxJQUFNLGFBQWEsR0FBRztJQUNwQixpQkFBaUIsRUFBRSxJQUFJO0NBQ3hCLENBQUM7QUFFRixJQUFBO0lBVUUsbUNBQ1ksT0FBaUMsRUFBVSxLQUEwQixFQUNyRSxLQUFxQixFQUFVLE9BQW1DLEVBQ2xFLGNBQXdCLEVBQVUsU0FBbUMsRUFDckUsUUFBaUMsRUFBVSxNQUE2QixFQUN4RSxnQkFBdUMsRUFDdkMsWUFBeUM7UUFMekMsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFxQjtRQUNyRSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQTRCO1FBQ2xFLG1CQUFjLEdBQWQsY0FBYyxDQUFVO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBMEI7UUFDckUsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQUN4RSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXVCO1FBQ3ZDLGlCQUFZ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c0JBQXNCLENBQUMsQ0FBQztLQUMvQztJQUNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Q0FDN0Q7QUFFRCxJQUFJLFFBQWtELENBQUM7QUFFdkQseUJBQXlCLEVBQU8sRUFBRSxRQUFnQjtJQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDZCxJQUFNLE9BQU8sR0FBUSxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxlQUFlLElBQUksT0FBTyxDQUFDLGtCQUFrQjtZQUMvRSxPQUFPLENBQUMsaUJBQWlCLElBQUksT0FBTyxDQUFDLGdCQUFnQixJQUFJLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztLQUM1RjtJQUNELE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Q0FDaEYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QXBwbGljYXRpb25SZWYsIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnRGYWN0b3J5LCBDb21wb25lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0b3IsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBTaW1wbGVDaGFuZ2VzLCBTdGF0aWNQcm92aWRlciwgVGVzdGFiaWxpdHksIFRlc3RhYmlsaXR5UmVnaXN0cnksIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJy4vYW5ndWxhcjEnO1xuaW1wb3J0IHtQcm9wZXJ0eUJpbmRpbmd9IGZyb20gJy4vY29tcG9uZW50X2luZm8nO1xuaW1wb3J0IHskU0NPUEV9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7Z2V0Q29tcG9uZW50TmFtZSwgaG9va3VwTmdNb2RlbCwgc3RyaWN0RXF1YWxzfSBmcm9tICcuL3V0aWwnO1xuXG5jb25zdCBJTklUSUFMX1ZBTFVFID0ge1xuICBfX1VOSU5JVElBTElaRURfXzogdHJ1ZVxufTtcblxuZXhwb3J0IGNsYXNzIERvd25ncmFkZUNvbXBvbmVudEFkYXB0ZXIge1xuICBwcml2YXRlIGltcGxlbWVudHNPbkNoYW5nZXMgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpbnB1dENoYW5nZUNvdW50OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGlucHV0Q2hhbmdlczogU2ltcGxlQ2hhbmdlcyA9IHt9O1xuICBwcml2YXRlIGNvbXBvbmVudFNjb3BlOiBhbmd1bGFyLklTY29wZTtcbiAgcHJpdmF0ZSBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+O1xuICBwcml2YXRlIGNvbXBvbmVudDogYW55O1xuICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZjtcbiAgcHJpdmF0ZSB2aWV3Q2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksIHByaXZhdGUgYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsXG4gICAgICBwcml2YXRlIHNjb3BlOiBhbmd1bGFyLklTY29wZSwgcHJpdmF0ZSBuZ01vZGVsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlcixcbiAgICAgIHByaXZhdGUgcGFyZW50SW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlICRpbmplY3RvcjogYW5ndWxhci5JSW5qZWN0b3JTZXJ2aWNlLFxuICAgICAgcHJpdmF0ZSAkY29tcGlsZTogYW5ndWxhci5JQ29tcGlsZVNlcnZpY2UsIHByaXZhdGUgJHBhcnNlOiBhbmd1bGFyLklQYXJzZVNlcnZpY2UsXG4gICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8YW55PixcbiAgICAgIHByaXZhdGUgd3JhcENhbGxiYWNrOiA8VD4oY2I6ICgpID0+IFQpID0+ICgpID0+IFQpIHtcbiAgICB0aGlzLmNvbXBvbmVudFNjb3BlID0gc2NvcGUuJG5ldygpO1xuICB9XG5cbiAgY29tcGlsZUNvbnRlbnRzKCk6IE5vZGVbXVtdIHtcbiAgICBjb25zdCBjb21waWxlZFByb2plY3RhYmxlTm9kZXM6IE5vZGVbXVtdID0gW107XG4gICAgY29uc3QgcHJvamVjdGFibGVOb2RlczogTm9kZVtdW10gPSB0aGlzLmdyb3VwUHJvamVjdGFibGVOb2RlcygpO1xuICAgIGNvbnN0IGxpbmtGbnMgPSBwcm9qZWN0YWJsZU5vZGVzLm1hcChub2RlcyA9PiB0aGlzLiRjb21waWxlKG5vZGVzKSk7XG5cbiAgICB0aGlzLmVsZW1lbnQuZW1wdHkgISgpO1xuXG4gICAgbGlua0Zucy5mb3JFYWNoKGxpbmtGbiA9PiB7XG4gICAgICBsaW5rRm4odGhpcy5zY29wZSwgKGNsb25lOiBOb2RlW10pID0+IHtcbiAgICAgICAgY29tcGlsZWRQcm9qZWN0YWJsZU5vZGVzLnB1c2goY2xvbmUpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kICEoY2xvbmUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29tcGlsZWRQcm9qZWN0YWJsZU5vZGVzO1xuICB9XG5cbiAgY3JlYXRlQ29tcG9uZW50KHByb2plY3RhYmxlTm9kZXM6IE5vZGVbXVtdKSB7XG4gICAgY29uc3QgcHJvdmlkZXJzOiBTdGF0aWNQcm92aWRlcltdID0gW3twcm92aWRlOiAkU0NPUEUsIHVzZVZhbHVlOiB0aGlzLmNvbXBvbmVudFNjb3BlfV07XG4gICAgY29uc3QgY2hpbGRJbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZShcbiAgICAgICAge3Byb3ZpZGVyczogcHJvdmlkZXJzLCBwYXJlbnQ6IHRoaXMucGFyZW50SW5qZWN0b3IsIG5hbWU6ICdEb3duZ3JhZGVDb21wb25lbnRBZGFwdGVyJ30pO1xuXG4gICAgdGhpcy5jb21wb25lbnRSZWYgPVxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKGNoaWxkSW5qZWN0b3IsIHByb2plY3RhYmxlTm9kZXMsIHRoaXMuZWxlbWVudFswXSk7XG4gICAgdGhpcy52aWV3Q2hhbmdlRGV0ZWN0b3IgPSB0aGlzLmNvbXBvbmVudFJlZi5pbmplY3Rvci5nZXQoQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IgPSB0aGlzLmNvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZjtcbiAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlO1xuXG4gICAgLy8gdGVzdGFiaWxpdHkgaG9vayBpcyBjb21tb25seSBhZGRlZCBkdXJpbmcgY29tcG9uZW50IGJvb3RzdHJhcCBpblxuICAgIC8vIHBhY2thZ2VzL2NvcmUvc3JjL2FwcGxpY2F0aW9uX3JlZi5ib290c3RyYXAoKVxuICAgIC8vIGluIGRvd25ncmFkZWQgYXBwbGljYXRpb24sIGNvbXBvbmVudCBjcmVhdGlvbiB3aWxsIHRha2UgcGxhY2UgaGVyZSBhcyB3ZWxsIGFzIGFkZGluZyB0aGVcbiAgICAvLyB0ZXN0YWJpbGl0eSBob29rLlxuICAgIGNvbnN0IHRlc3RhYmlsaXR5ID0gdGhpcy5jb21wb25lbnRSZWYuaW5qZWN0b3IuZ2V0KFRlc3RhYmlsaXR5LCBudWxsKTtcbiAgICBpZiAodGVzdGFiaWxpdHkpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluamVjdG9yLmdldChUZXN0YWJpbGl0eVJlZ2lzdHJ5KVxuICAgICAgICAgIC5yZWdpc3RlckFwcGxpY2F0aW9uKHRoaXMuY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRlc3RhYmlsaXR5KTtcbiAgICB9XG5cbiAgICBob29rdXBOZ01vZGVsKHRoaXMubmdNb2RlbCwgdGhpcy5jb21wb25lbnQpO1xuICB9XG5cbiAgc2V0dXBJbnB1dHMobmVlZHNOZ1pvbmU6IGJvb2xlYW4sIHByb3BhZ2F0ZURpZ2VzdCA9IHRydWUpOiB2b2lkIHtcbiAgICBjb25zdCBhdHRycyA9IHRoaXMuYXR0cnM7XG4gICAgY29uc3QgaW5wdXRzID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmlucHV0cyB8fCBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaW5wdXQgPSBuZXcgUHJvcGVydHlCaW5kaW5nKGlucHV0c1tpXS5wcm9wTmFtZSwgaW5wdXRzW2ldLnRlbXBsYXRlTmFtZSk7XG4gICAgICBsZXQgZXhwcjogc3RyaW5nfG51bGwgPSBudWxsO1xuXG4gICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoaW5wdXQuYXR0cikpIHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZUZuID0gKHByb3AgPT4ge1xuICAgICAgICAgIGxldCBwcmV2VmFsdWUgPSBJTklUSUFMX1ZBTFVFO1xuICAgICAgICAgIHJldHVybiAoY3VyclZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIC8vIEluaXRpYWxseSwgYm90aCBgJG9ic2VydmUoKWAgYW5kIGAkd2F0Y2goKWAgd2lsbCBjYWxsIHRoaXMgZnVuY3Rpb24uXG4gICAgICAgICAgICBpZiAoIXN0cmljdEVxdWFscyhwcmV2VmFsdWUsIGN1cnJWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgaWYgKHByZXZWYWx1ZSA9PT0gSU5JVElBTF9WQUxVRSkge1xuICAgICAgICAgICAgICAgIHByZXZWYWx1ZSA9IGN1cnJWYWx1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXQocHJvcCwgcHJldlZhbHVlLCBjdXJyVmFsdWUpO1xuICAgICAgICAgICAgICBwcmV2VmFsdWUgPSBjdXJyVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoaW5wdXQucHJvcCk7XG4gICAgICAgIGF0dHJzLiRvYnNlcnZlKGlucHV0LmF0dHIsIG9ic2VydmVGbik7XG5cbiAgICAgICAgLy8gVXNlIGAkd2F0Y2goKWAgKGluIGFkZGl0aW9uIHRvIGAkb2JzZXJ2ZSgpYCkgaW4gb3JkZXIgdG8gaW5pdGlhbGl6ZSB0aGUgaW5wdXQgaW4gdGltZVxuICAgICAgICAvLyBmb3IgYG5nT25DaGFuZ2VzKClgLiBUaGlzIGlzIG5lY2Vzc2FyeSBpZiB3ZSBhcmUgYWxyZWFkeSBpbiBhIGAkZGlnZXN0YCwgd2hpY2ggbWVhbnMgdGhhdFxuICAgICAgICAvLyBgbmdPbkNoYW5nZXMoKWAgKHdoaWNoIGlzIGNhbGxlZCBieSBhIHdhdGNoZXIpIHdpbGwgcnVuIGJlZm9yZSB0aGUgYCRvYnNlcnZlKClgIGNhbGxiYWNrLlxuICAgICAgICBsZXQgdW53YXRjaDogRnVuY3Rpb258bnVsbCA9IHRoaXMuY29tcG9uZW50U2NvcGUuJHdhdGNoKCgpID0+IHtcbiAgICAgICAgICB1bndhdGNoICEoKTtcbiAgICAgICAgICB1bndhdGNoID0gbnVsbDtcbiAgICAgICAgICBvYnNlcnZlRm4oYXR0cnNbaW5wdXQuYXR0cl0pO1xuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShpbnB1dC5iaW5kQXR0cikpIHtcbiAgICAgICAgZXhwciA9IGF0dHJzW2lucHV0LmJpbmRBdHRyXTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoaW5wdXQuYnJhY2tldEF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1tpbnB1dC5icmFja2V0QXR0cl07XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGlucHV0LmJpbmRvbkF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1tpbnB1dC5iaW5kb25BdHRyXTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoaW5wdXQuYnJhY2tldFBhcmVuQXR0cikpIHtcbiAgICAgICAgZXhwciA9IGF0dHJzW2lucHV0LmJyYWNrZXRQYXJlbkF0dHJdO1xuICAgICAgfVxuICAgICAgaWYgKGV4cHIgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCB3YXRjaEZuID1cbiAgICAgICAgICAgIChwcm9wID0+IChjdXJyVmFsdWU6IGFueSwgcHJldlZhbHVlOiBhbnkpID0+XG4gICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXQocHJvcCwgcHJldlZhbHVlLCBjdXJyVmFsdWUpKShpbnB1dC5wcm9wKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRTY29wZS4kd2F0Y2goZXhwciwgd2F0Y2hGbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW52b2tlIGBuZ09uQ2hhbmdlcygpYCBhbmQgQ2hhbmdlIERldGVjdGlvbiAod2hlbiBuZWNlc3NhcnkpXG4gICAgY29uc3QgZGV0ZWN0Q2hhbmdlcyA9ICgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIGNvbnN0IHByb3RvdHlwZSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jb21wb25lbnRUeXBlLnByb3RvdHlwZTtcbiAgICB0aGlzLmltcGxlbWVudHNPbkNoYW5nZXMgPSAhIShwcm90b3R5cGUgJiYgKDxPbkNoYW5nZXM+cHJvdG90eXBlKS5uZ09uQ2hhbmdlcyk7XG5cbiAgICB0aGlzLmNvbXBvbmVudFNjb3BlLiR3YXRjaCgoKSA9PiB0aGlzLmlucHV0Q2hhbmdlQ291bnQsIHRoaXMud3JhcENhbGxiYWNrKCgpID0+IHtcbiAgICAgIC8vIEludm9rZSBgbmdPbkNoYW5nZXMoKWBcbiAgICAgIGlmICh0aGlzLmltcGxlbWVudHNPbkNoYW5nZXMpIHtcbiAgICAgICAgY29uc3QgaW5wdXRDaGFuZ2VzID0gdGhpcy5pbnB1dENoYW5nZXM7XG4gICAgICAgIHRoaXMuaW5wdXRDaGFuZ2VzID0ge307XG4gICAgICAgICg8T25DaGFuZ2VzPnRoaXMuY29tcG9uZW50KS5uZ09uQ2hhbmdlcyhpbnB1dENoYW5nZXMgISk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudmlld0NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAvLyBJZiBvcHRlZCBvdXQgb2YgcHJvcGFnYXRpbmcgZGlnZXN0cywgaW52b2tlIGNoYW5nZSBkZXRlY3Rpb24gd2hlbiBpbnB1dHMgY2hhbmdlLlxuICAgICAgaWYgKCFwcm9wYWdhdGVEaWdlc3QpIHtcbiAgICAgICAgZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0pKTtcblxuICAgIC8vIElmIG5vdCBvcHRlZCBvdXQgb2YgcHJvcGFnYXRpbmcgZGlnZXN0cywgaW52b2tlIGNoYW5nZSBkZXRlY3Rpb24gb24gZXZlcnkgZGlnZXN0XG4gICAgaWYgKHByb3BhZ2F0ZURpZ2VzdCkge1xuICAgICAgdGhpcy5jb21wb25lbnRTY29wZS4kd2F0Y2godGhpcy53cmFwQ2FsbGJhY2soZGV0ZWN0Q2hhbmdlcykpO1xuICAgIH1cblxuICAgIC8vIElmIG5lY2Vzc2FyeSwgYXR0YWNoIHRoZSB2aWV3IHNvIHRoYXQgaXQgd2lsbCBiZSBkaXJ0eS1jaGVja2VkLlxuICAgIC8vIChBbGxvdyB0aW1lIGZvciB0aGUgaW5pdGlhbCBpbnB1dCB2YWx1ZXMgdG8gYmUgc2V0IGFuZCBgbmdPbkNoYW5nZXMoKWAgdG8gYmUgY2FsbGVkLilcbiAgICBpZiAobmVlZHNOZ1pvbmUgfHwgIXByb3BhZ2F0ZURpZ2VzdCkge1xuICAgICAgbGV0IHVud2F0Y2g6IEZ1bmN0aW9ufG51bGwgPSB0aGlzLmNvbXBvbmVudFNjb3BlLiR3YXRjaCgoKSA9PiB7XG4gICAgICAgIHVud2F0Y2ggISgpO1xuICAgICAgICB1bndhdGNoID0gbnVsbDtcblxuICAgICAgICBjb25zdCBhcHBSZWYgPSB0aGlzLnBhcmVudEluamVjdG9yLmdldDxBcHBsaWNhdGlvblJlZj4oQXBwbGljYXRpb25SZWYpO1xuICAgICAgICBhcHBSZWYuYXR0YWNoVmlldyh0aGlzLmNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzZXR1cE91dHB1dHMoKSB7XG4gICAgY29uc3QgYXR0cnMgPSB0aGlzLmF0dHJzO1xuICAgIGNvbnN0IG91dHB1dHMgPSB0aGlzLmNvbXBvbmVudEZhY3Rvcnkub3V0cHV0cyB8fCBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IG91dHB1dHMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IG91dHB1dCA9IG5ldyBQcm9wZXJ0eUJpbmRpbmcob3V0cHV0c1tqXS5wcm9wTmFtZSwgb3V0cHV0c1tqXS50ZW1wbGF0ZU5hbWUpO1xuICAgICAgY29uc3QgYmluZG9uQXR0ciA9IG91dHB1dC5iaW5kb25BdHRyLnN1YnN0cmluZygwLCBvdXRwdXQuYmluZG9uQXR0ci5sZW5ndGggLSA2KTtcbiAgICAgIGNvbnN0IGJyYWNrZXRQYXJlbkF0dHIgPVxuICAgICAgICAgIGBbKCR7b3V0cHV0LmJyYWNrZXRQYXJlbkF0dHIuc3Vic3RyaW5nKDIsIG91dHB1dC5icmFja2V0UGFyZW5BdHRyLmxlbmd0aCAtIDgpfSldYDtcbiAgICAgIC8vIG9yZGVyIGJlbG93IGlzIGltcG9ydGFudCAtIGZpcnN0IHVwZGF0ZSBiaW5kaW5ncyB0aGVuIGV2YWx1YXRlIGV4cHJlc3Npb25zXG4gICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoYmluZG9uQXR0cikpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVUb091dHB1dChvdXRwdXQsIGF0dHJzW2JpbmRvbkF0dHJdLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShicmFja2V0UGFyZW5BdHRyKSkge1xuICAgICAgICB0aGlzLnN1YnNjcmliZVRvT3V0cHV0KG91dHB1dCwgYXR0cnNbYnJhY2tldFBhcmVuQXR0cl0sIHRydWUpO1xuICAgICAgfVxuICAgICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KG91dHB1dC5vbkF0dHIpKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9PdXRwdXQob3V0cHV0LCBhdHRyc1tvdXRwdXQub25BdHRyXSk7XG4gICAgICB9XG4gICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkob3V0cHV0LnBhcmVuQXR0cikpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVUb091dHB1dChvdXRwdXQsIGF0dHJzW291dHB1dC5wYXJlbkF0dHJdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvT3V0cHV0KG91dHB1dDogUHJvcGVydHlCaW5kaW5nLCBleHByOiBzdHJpbmcsIGlzQXNzaWdubWVudDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgY29uc3QgZ2V0dGVyID0gdGhpcy4kcGFyc2UoZXhwcik7XG4gICAgY29uc3Qgc2V0dGVyID0gZ2V0dGVyLmFzc2lnbjtcbiAgICBpZiAoaXNBc3NpZ25tZW50ICYmICFzZXR0ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwcmVzc2lvbiAnJHtleHByfScgaXMgbm90IGFzc2lnbmFibGUhYCk7XG4gICAgfVxuICAgIGNvbnN0IGVtaXR0ZXIgPSB0aGlzLmNvbXBvbmVudFtvdXRwdXQucHJvcF0gYXMgRXZlbnRFbWl0dGVyPGFueT47XG4gICAgaWYgKGVtaXR0ZXIpIHtcbiAgICAgIGVtaXR0ZXIuc3Vic2NyaWJlKHtcbiAgICAgICAgbmV4dDogaXNBc3NpZ25tZW50ID8gKHY6IGFueSkgPT4gc2V0dGVyICEodGhpcy5zY29wZSwgdikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodjogYW55KSA9PiBnZXR0ZXIodGhpcy5zY29wZSwgeyckZXZlbnQnOiB2fSlcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYE1pc3NpbmcgZW1pdHRlciAnJHtvdXRwdXQucHJvcH0nIG9uIGNvbXBvbmVudCAnJHtnZXRDb21wb25lbnROYW1lKHRoaXMuY29tcG9uZW50RmFjdG9yeS5jb21wb25lbnRUeXBlKX0nIWApO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyQ2xlYW51cCgpIHtcbiAgICBjb25zdCBkZXN0cm95Q29tcG9uZW50UmVmID0gdGhpcy53cmFwQ2FsbGJhY2soKCkgPT4gdGhpcy5jb21wb25lbnRSZWYuZGVzdHJveSgpKTtcbiAgICBsZXQgZGVzdHJveWVkID0gZmFsc2U7XG5cbiAgICB0aGlzLmVsZW1lbnQub24gISgnJGRlc3Ryb3knLCAoKSA9PiB0aGlzLmNvbXBvbmVudFNjb3BlLiRkZXN0cm95KCkpO1xuICAgIHRoaXMuY29tcG9uZW50U2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgIGlmICghZGVzdHJveWVkKSB7XG4gICAgICAgIGRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmluamVjdG9yLmdldChUZXN0YWJpbGl0eVJlZ2lzdHJ5KVxuICAgICAgICAgICAgLnVucmVnaXN0ZXJBcHBsaWNhdGlvbih0aGlzLmNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgZGVzdHJveUNvbXBvbmVudFJlZigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0SW5qZWN0b3IoKTogSW5qZWN0b3IgeyByZXR1cm4gdGhpcy5jb21wb25lbnRSZWYuaW5qZWN0b3I7IH1cblxuICBwcml2YXRlIHVwZGF0ZUlucHV0KHByb3A6IHN0cmluZywgcHJldlZhbHVlOiBhbnksIGN1cnJWYWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuaW1wbGVtZW50c09uQ2hhbmdlcykge1xuICAgICAgdGhpcy5pbnB1dENoYW5nZXNbcHJvcF0gPSBuZXcgU2ltcGxlQ2hhbmdlKHByZXZWYWx1ZSwgY3VyclZhbHVlLCBwcmV2VmFsdWUgPT09IGN1cnJWYWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5pbnB1dENoYW5nZUNvdW50Kys7XG4gICAgdGhpcy5jb21wb25lbnRbcHJvcF0gPSBjdXJyVmFsdWU7XG4gIH1cblxuICBncm91cFByb2plY3RhYmxlTm9kZXMoKSB7XG4gICAgbGV0IG5nQ29udGVudFNlbGVjdG9ycyA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5uZ0NvbnRlbnRTZWxlY3RvcnM7XG4gICAgcmV0dXJuIGdyb3VwTm9kZXNCeVNlbGVjdG9yKG5nQ29udGVudFNlbGVjdG9ycywgdGhpcy5lbGVtZW50LmNvbnRlbnRzICEoKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBHcm91cCBhIHNldCBvZiBET00gbm9kZXMgaW50byBgbmdDb250ZW50YCBncm91cHMsIGJhc2VkIG9uIHRoZSBnaXZlbiBjb250ZW50IHNlbGVjdG9ycy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwTm9kZXNCeVNlbGVjdG9yKG5nQ29udGVudFNlbGVjdG9yczogc3RyaW5nW10sIG5vZGVzOiBOb2RlW10pOiBOb2RlW11bXSB7XG4gIGNvbnN0IHByb2plY3RhYmxlTm9kZXM6IE5vZGVbXVtdID0gW107XG4gIGxldCB3aWxkY2FyZE5nQ29udGVudEluZGV4OiBudW1iZXI7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGlpID0gbmdDb250ZW50U2VsZWN0b3JzLmxlbmd0aDsgaSA8IGlpOyArK2kpIHtcbiAgICBwcm9qZWN0YWJsZU5vZGVzW2ldID0gW107XG4gIH1cblxuICBmb3IgKGxldCBqID0gMCwgamogPSBub2Rlcy5sZW5ndGg7IGogPCBqajsgKytqKSB7XG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzW2pdO1xuICAgIGNvbnN0IG5nQ29udGVudEluZGV4ID0gZmluZE1hdGNoaW5nTmdDb250ZW50SW5kZXgobm9kZSwgbmdDb250ZW50U2VsZWN0b3JzKTtcbiAgICBpZiAobmdDb250ZW50SW5kZXggIT0gbnVsbCkge1xuICAgICAgcHJvamVjdGFibGVOb2Rlc1tuZ0NvbnRlbnRJbmRleF0ucHVzaChub2RlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcHJvamVjdGFibGVOb2Rlcztcbn1cblxuZnVuY3Rpb24gZmluZE1hdGNoaW5nTmdDb250ZW50SW5kZXgoZWxlbWVudDogYW55LCBuZ0NvbnRlbnRTZWxlY3RvcnM6IHN0cmluZ1tdKTogbnVtYmVyfG51bGwge1xuICBjb25zdCBuZ0NvbnRlbnRJbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xuICBsZXQgd2lsZGNhcmROZ0NvbnRlbnRJbmRleDogbnVtYmVyID0gLTE7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmdDb250ZW50U2VsZWN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBuZ0NvbnRlbnRTZWxlY3RvcnNbaV07XG4gICAgaWYgKHNlbGVjdG9yID09PSAnKicpIHtcbiAgICAgIHdpbGRjYXJkTmdDb250ZW50SW5kZXggPSBpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yKSkge1xuICAgICAgICBuZ0NvbnRlbnRJbmRpY2VzLnB1c2goaSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIG5nQ29udGVudEluZGljZXMuc29ydCgpO1xuXG4gIGlmICh3aWxkY2FyZE5nQ29udGVudEluZGV4ICE9PSAtMSkge1xuICAgIG5nQ29udGVudEluZGljZXMucHVzaCh3aWxkY2FyZE5nQ29udGVudEluZGV4KTtcbiAgfVxuICByZXR1cm4gbmdDb250ZW50SW5kaWNlcy5sZW5ndGggPyBuZ0NvbnRlbnRJbmRpY2VzWzBdIDogbnVsbDtcbn1cblxubGV0IF9tYXRjaGVzOiAodGhpczogYW55LCBzZWxlY3Rvcjogc3RyaW5nKSA9PiBib29sZWFuO1xuXG5mdW5jdGlvbiBtYXRjaGVzU2VsZWN0b3IoZWw6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBpZiAoIV9tYXRjaGVzKSB7XG4gICAgY29uc3QgZWxQcm90byA9IDxhbnk+RWxlbWVudC5wcm90b3R5cGU7XG4gICAgX21hdGNoZXMgPSBlbFByb3RvLm1hdGNoZXMgfHwgZWxQcm90by5tYXRjaGVzU2VsZWN0b3IgfHwgZWxQcm90by5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgZWxQcm90by5tc01hdGNoZXNTZWxlY3RvciB8fCBlbFByb3RvLm9NYXRjaGVzU2VsZWN0b3IgfHwgZWxQcm90by53ZWJraXRNYXRjaGVzU2VsZWN0b3I7XG4gIH1cbiAgcmV0dXJuIGVsLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSA/IF9tYXRjaGVzLmNhbGwoZWwsIHNlbGVjdG9yKSA6IGZhbHNlO1xufVxuIl19