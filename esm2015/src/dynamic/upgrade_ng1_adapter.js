/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, EventEmitter, Inject, Injector } from '@angular/core';
import { $SCOPE } from '../common/constants';
import { UpgradeHelper } from '../common/upgrade_helper';
import { isFunction, strictEquals } from '../common/util';
/** @type {?} */
const CAMEL_CASE = /([A-Z])/g;
/** @type {?} */
const INITIAL_VALUE = {
    __UNINITIALIZED__: true
};
/** @type {?} */
const NOT_SUPPORTED = 'NOT_SUPPORTED';
export class UpgradeNg1ComponentAdapterBuilder {
    /**
     * @param {?} name
     */
    constructor(name) {
        this.name = name;
        this.inputs = [];
        this.inputsRename = [];
        this.outputs = [];
        this.outputsRename = [];
        this.propertyOutputs = [];
        this.checkProperties = [];
        this.propertyMap = {};
        this.directive = null;
        /** @type {?} */
        const selector = name.replace(CAMEL_CASE, (all, next) => '-' + next.toLowerCase());
        /** @type {?} */
        const self = this;
        // Note: There is a bug in TS 2.4 that prevents us from
        // inlining this into @Directive
        // TODO(tbosch): find or file a bug against TypeScript for this.
        /** @type {?} */
        const directive = { selector: selector, inputs: this.inputsRename, outputs: this.outputsRename };
        class MyClass extends UpgradeNg1ComponentAdapter {
            /**
             * @param {?} scope
             * @param {?} injector
             * @param {?} elementRef
             */
            constructor(scope, injector, elementRef) {
                (/** @type {?} */ (super(new UpgradeHelper(injector, name, elementRef, self.directive || undefined), scope, self.template, self.inputs, self.outputs, self.propertyOutputs, self.checkProperties, self.propertyMap)));
            }
        }
        MyClass.decorators = [
            { type: Directive, args: [Object.assign({ jit: true }, directive),] },
        ];
        /** @nocollapse */
        MyClass.ctorParameters = () => [
            { type: undefined, decorators: [{ type: Inject, args: [$SCOPE,] }] },
            { type: Injector },
            { type: ElementRef }
        ];
        this.type = MyClass;
    }
    /**
     * @return {?}
     */
    extractBindings() {
        /** @type {?} */
        const btcIsObject = typeof (/** @type {?} */ (this.directive)).bindToController === 'object';
        if (btcIsObject && Object.keys((/** @type {?} */ ((/** @type {?} */ (this.directive)).scope))).length) {
            throw new Error(`Binding definitions on scope and controller at the same time are not supported.`);
        }
        /** @type {?} */
        const context = (btcIsObject) ? (/** @type {?} */ (this.directive)).bindToController : (/** @type {?} */ (this.directive)).scope;
        if (typeof context == 'object') {
            Object.keys(context).forEach(propName => {
                /** @type {?} */
                const definition = context[propName];
                /** @type {?} */
                const bindingType = definition.charAt(0);
                /** @type {?} */
                const bindingOptions = definition.charAt(1);
                /** @type {?} */
                const attrName = definition.substring(bindingOptions === '?' ? 2 : 1) || propName;
                // QUESTION: What about `=*`? Ignore? Throw? Support?
                /** @type {?} */
                const inputName = `input_${attrName}`;
                /** @type {?} */
                const inputNameRename = `${inputName}: ${attrName}`;
                /** @type {?} */
                const outputName = `output_${attrName}`;
                /** @type {?} */
                const outputNameRename = `${outputName}: ${attrName}`;
                /** @type {?} */
                const outputNameRenameChange = `${outputNameRename}Change`;
                switch (bindingType) {
                    case '@':
                    case '<':
                        this.inputs.push(inputName);
                        this.inputsRename.push(inputNameRename);
                        this.propertyMap[inputName] = propName;
                        break;
                    case '=':
                        this.inputs.push(inputName);
                        this.inputsRename.push(inputNameRename);
                        this.propertyMap[inputName] = propName;
                        this.outputs.push(outputName);
                        this.outputsRename.push(outputNameRenameChange);
                        this.propertyMap[outputName] = propName;
                        this.checkProperties.push(propName);
                        this.propertyOutputs.push(outputName);
                        break;
                    case '&':
                        this.outputs.push(outputName);
                        this.outputsRename.push(outputNameRename);
                        this.propertyMap[outputName] = propName;
                        break;
                    default:
                        /** @type {?} */
                        let json = JSON.stringify(context);
                        throw new Error(`Unexpected mapping '${bindingType}' in '${json}' in '${this.name}' directive.`);
                }
            });
        }
    }
    /**
     * Upgrade ng1 components into Angular.
     * @param {?} exportedComponents
     * @param {?} $injector
     * @return {?}
     */
    static resolve(exportedComponents, $injector) {
        /** @type {?} */
        const promises = Object.keys(exportedComponents).map(name => {
            /** @type {?} */
            const exportedComponent = exportedComponents[name];
            exportedComponent.directive = UpgradeHelper.getDirective($injector, name);
            exportedComponent.extractBindings();
            return Promise
                .resolve(UpgradeHelper.getTemplate($injector, exportedComponent.directive, true))
                .then(template => exportedComponent.template = template);
        });
        return Promise.all(promises);
    }
}
if (false) {
    /** @type {?} */
    UpgradeNg1ComponentAdapterBuilder.prototype.type;
    /** @type {?} */
    UpgradeNg1ComponentAdapterBuilder.prototype.inputs;
    /** @type {?} */
    UpgradeNg1ComponentAdapterBuilder.prototype.inputsRename;
    /** @type {?} */
    UpgradeNg1ComponentAdapterBuilder.prototype.outputs;
    /** @type {?} */
    UpgradeNg1ComponentAdapterBuilder.prototype.outputsRename;
    /** @type {?} */
    UpgradeNg1ComponentAdapterBuilder.prototype.propertyOutputs;
    /** @type {?} */
    UpgradeNg1ComponentAdapterBuilder.prototype.checkProperties;
    /** @type {?} */
    UpgradeNg1ComponentAdapterBuilder.prototype.propertyMap;
    /** @type {?} */
    UpgradeNg1ComponentAdapterBuilder.prototype.directive;
    /** @type {?} */
    UpgradeNg1ComponentAdapterBuilder.prototype.template;
    /** @type {?} */
    UpgradeNg1ComponentAdapterBuilder.prototype.name;
}
class UpgradeNg1ComponentAdapter {
    /**
     * @param {?} helper
     * @param {?} scope
     * @param {?} template
     * @param {?} inputs
     * @param {?} outputs
     * @param {?} propOuts
     * @param {?} checkProperties
     * @param {?} propertyMap
     */
    constructor(helper, scope, template, inputs, outputs, propOuts, checkProperties, propertyMap) {
        this.helper = helper;
        this.template = template;
        this.inputs = inputs;
        this.outputs = outputs;
        this.propOuts = propOuts;
        this.checkProperties = checkProperties;
        this.propertyMap = propertyMap;
        this.controllerInstance = null;
        this.destinationObj = null;
        this.checkLastValues = [];
        this.$element = null;
        this.directive = helper.directive;
        this.element = helper.element;
        this.$element = helper.$element;
        this.componentScope = scope.$new(!!this.directive.scope);
        /** @type {?} */
        const controllerType = this.directive.controller;
        if (this.directive.bindToController && controllerType) {
            this.controllerInstance = this.helper.buildController(controllerType, this.componentScope);
            this.destinationObj = this.controllerInstance;
        }
        else {
            this.destinationObj = this.componentScope;
        }
        for (let i = 0; i < inputs.length; i++) {
            ((/** @type {?} */ (this)))[inputs[i]] = null;
        }
        for (let j = 0; j < outputs.length; j++) {
            /** @type {?} */
            const emitter = ((/** @type {?} */ (this)))[outputs[j]] = new EventEmitter();
            if (this.propOuts.indexOf(outputs[j]) === -1) {
                this.setComponentProperty(outputs[j], (emitter => (value) => emitter.emit(value))(emitter));
            }
        }
        for (let k = 0; k < propOuts.length; k++) {
            this.checkLastValues.push(INITIAL_VALUE);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Collect contents, insert and compile template
        /** @type {?} */
        const attachChildNodes = this.helper.prepareTransclusion();
        /** @type {?} */
        const linkFn = this.helper.compileTemplate(this.template);
        // Instantiate controller (if not already done so)
        /** @type {?} */
        const controllerType = this.directive.controller;
        /** @type {?} */
        const bindToController = this.directive.bindToController;
        if (controllerType && !bindToController) {
            this.controllerInstance = this.helper.buildController(controllerType, this.componentScope);
        }
        // Require other controllers
        /** @type {?} */
        const requiredControllers = this.helper.resolveAndBindRequiredControllers(this.controllerInstance);
        // Hook: $onInit
        if (this.controllerInstance && isFunction(this.controllerInstance.$onInit)) {
            this.controllerInstance.$onInit();
        }
        // Linking
        /** @type {?} */
        const link = this.directive.link;
        /** @type {?} */
        const preLink = (typeof link == 'object') && ((/** @type {?} */ (link))).pre;
        /** @type {?} */
        const postLink = (typeof link == 'object') ? ((/** @type {?} */ (link))).post : link;
        /** @type {?} */
        const attrs = NOT_SUPPORTED;
        /** @type {?} */
        const transcludeFn = NOT_SUPPORTED;
        if (preLink) {
            preLink(this.componentScope, this.$element, attrs, requiredControllers, transcludeFn);
        }
        linkFn(this.componentScope, (/** @type {?} */ (null)), { parentBoundTranscludeFn: attachChildNodes });
        if (postLink) {
            postLink(this.componentScope, this.$element, attrs, requiredControllers, transcludeFn);
        }
        // Hook: $postLink
        if (this.controllerInstance && isFunction(this.controllerInstance.$postLink)) {
            this.controllerInstance.$postLink();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const ng1Changes = {};
        Object.keys(changes).forEach(name => {
            /** @type {?} */
            const change = changes[name];
            this.setComponentProperty(name, change.currentValue);
            ng1Changes[this.propertyMap[name]] = change;
        });
        if (isFunction((/** @type {?} */ (this.destinationObj)).$onChanges)) {
            (/** @type {?} */ ((/** @type {?} */ (this.destinationObj)).$onChanges))(ng1Changes);
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        /** @type {?} */
        const destinationObj = this.destinationObj;
        /** @type {?} */
        const lastValues = this.checkLastValues;
        /** @type {?} */
        const checkProperties = this.checkProperties;
        /** @type {?} */
        const propOuts = this.propOuts;
        checkProperties.forEach((propName, i) => {
            /** @type {?} */
            const value = (/** @type {?} */ (destinationObj))[propName];
            /** @type {?} */
            const last = lastValues[i];
            if (!strictEquals(last, value)) {
                /** @type {?} */
                const eventEmitter = ((/** @type {?} */ (this)))[propOuts[i]];
                eventEmitter.emit(lastValues[i] = value);
            }
        });
        if (this.controllerInstance && isFunction(this.controllerInstance.$doCheck)) {
            this.controllerInstance.$doCheck();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { this.helper.onDestroy(this.componentScope, this.controllerInstance); }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setComponentProperty(name, value) {
        (/** @type {?} */ (this.destinationObj))[this.propertyMap[name]] = value;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    UpgradeNg1ComponentAdapter.prototype.controllerInstance;
    /** @type {?} */
    UpgradeNg1ComponentAdapter.prototype.destinationObj;
    /** @type {?} */
    UpgradeNg1ComponentAdapter.prototype.checkLastValues;
    /** @type {?} */
    UpgradeNg1ComponentAdapter.prototype.directive;
    /** @type {?} */
    UpgradeNg1ComponentAdapter.prototype.element;
    /** @type {?} */
    UpgradeNg1ComponentAdapter.prototype.$element;
    /** @type {?} */
    UpgradeNg1ComponentAdapter.prototype.componentScope;
    /**
     * @type {?}
     * @private
     */
    UpgradeNg1ComponentAdapter.prototype.helper;
    /**
     * @type {?}
     * @private
     */
    UpgradeNg1ComponentAdapter.prototype.template;
    /**
     * @type {?}
     * @private
     */
    UpgradeNg1ComponentAdapter.prototype.inputs;
    /**
     * @type {?}
     * @private
     */
    UpgradeNg1ComponentAdapter.prototype.outputs;
    /**
     * @type {?}
     * @private
     */
    UpgradeNg1ComponentAdapter.prototype.propOuts;
    /**
     * @type {?}
     * @private
     */
    UpgradeNg1ComponentAdapter.prototype.checkProperties;
    /**
     * @type {?}
     * @private
     */
    UpgradeNg1ComponentAdapter.prototype.propertyMap;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBncmFkZV9uZzFfYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3VwZ3JhZGUvc3JjL2R5bmFtaWMvdXBncmFkZV9uZzFfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxTQUFTLEVBQVcsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFrRSxNQUFNLGVBQWUsQ0FBQztBQUc5SixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDM0MsT0FBTyxFQUEyQyxhQUFhLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRyxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDOztNQUdsRCxVQUFVLEdBQUcsVUFBVTs7TUFDdkIsYUFBYSxHQUFHO0lBQ3BCLGlCQUFpQixFQUFFLElBQUk7Q0FDeEI7O01BQ0ssYUFBYSxHQUFRLGVBQWU7QUFHMUMsTUFBTSxPQUFPLGlDQUFpQzs7OztJQWM1QyxZQUFtQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQVgvQixXQUFNLEdBQWEsRUFBRSxDQUFDO1FBQ3RCLGlCQUFZLEdBQWEsRUFBRSxDQUFDO1FBQzVCLFlBQU8sR0FBYSxFQUFFLENBQUM7UUFDdkIsa0JBQWEsR0FBYSxFQUFFLENBQUM7UUFDN0Isb0JBQWUsR0FBYSxFQUFFLENBQUM7UUFDL0Isb0JBQWUsR0FBYSxFQUFFLENBQUM7UUFDL0IsZ0JBQVcsR0FBNkIsRUFBRSxDQUFDO1FBQzNDLGNBQVMsR0FBb0IsSUFBSSxDQUFDOztjQUsxQixRQUFRLEdBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOztjQUMvRSxJ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QUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxJQUFJLENBQUMsa0JBQWtCLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMzRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDcEM7SUFDSCxDQUFDOzs7O0lBRUQsV0FBVyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFFdEYsb0JBQW9CLENBQUMsSUFBWSxFQUFFLEtBQVU7UUFDM0MsbUJBQUEsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDeEQsQ0FBQztDQUNGOzs7Ozs7SUF6SEMsd0RBQTREOztJQUM1RCxvREFBZ0Q7O0lBQ2hELHFEQUE0Qjs7SUFDNUIsK0NBQXNCOztJQUN0Qiw2Q0FBaUI7O0lBQ2pCLDhDQUFxQjs7SUFDckIsb0RBQXVCOzs7OztJQUduQiw0Q0FBNkI7Ozs7O0lBQWlCLDhDQUF3Qjs7Ozs7SUFDdEUsNENBQXdCOzs7OztJQUFFLDZDQUF5Qjs7Ozs7SUFBRSw4Q0FBMEI7Ozs7O0lBQy9FLHFEQUFpQzs7Ozs7SUFBRSxpREFBNEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBEb0NoZWNrLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0b3IsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZSwgU2ltcGxlQ2hhbmdlcywgVHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7SUF0dHJpYnV0ZXMsIElEaXJlY3RpdmUsIElEaXJlY3RpdmVQcmVQb3N0LCBJSW5qZWN0b3JTZXJ2aWNlLCBJTGlua0ZuLCBJU2NvcGUsIElUcmFuc2NsdWRlRnVuY3Rpb259IGZyb20gJy4uL2NvbW1vbi9hbmd1bGFyMSc7XG5pbXBvcnQgeyRTQ09QRX0gZnJvbSAnLi4vY29tbW9uL2NvbnN0YW50cyc7XG5pbXBvcnQge0lCaW5kaW5nRGVzdGluYXRpb24sIElDb250cm9sbGVySW5zdGFuY2UsIFVwZ3JhZGVIZWxwZXJ9IGZyb20gJy4uL2NvbW1vbi91cGdyYWRlX2hlbHBlcic7XG5pbXBvcnQge2lzRnVuY3Rpb24sIHN0cmljdEVxdWFsc30gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuXG5cbmNvbnN0IENBTUVMX0NBU0UgPSAvKFtBLVpdKS9nO1xuY29uc3QgSU5JVElBTF9WQUxVRSA9IHtcbiAgX19VTklOSVRJQUxJWkVEX186IHRydWVcbn07XG5jb25zdCBOT1RfU1VQUE9SVEVEOiBhbnkgPSAnTk9UX1NVUFBPUlRFRCc7XG5cblxuZXhwb3J0IGNsYXNzIFVwZ3JhZGVOZzFDb21wb25lbnRBZGFwdGVyQnVpbGRlciB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICB0eXBlICE6IFR5cGU8YW55PjtcbiAgaW5wdXRzOiBzdHJpbmdbXSA9IFtdO1xuICBpbnB1dHNSZW5hbWU6IHN0cmluZ1tdID0gW107XG4gIG91dHB1dHM6IHN0cmluZ1tdID0gW107XG4gIG91dHB1dHNSZW5hbWU6IHN0cmluZ1tdID0gW107XG4gIHByb3BlcnR5T3V0cHV0czogc3RyaW5nW10gPSBbXTtcbiAgY2hlY2tQcm9wZXJ0aWVzOiBzdHJpbmdbXSA9IFtdO1xuICBwcm9wZXJ0eU1hcDoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gIGRpcmVjdGl2ZTogSURpcmVjdGl2ZXxudWxsID0gbnVsbDtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHRlbXBsYXRlICE6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPVxuICAgICAgICBuYW1lLnJlcGxhY2UoQ0FNRUxfQ0FTRSwgKGFsbDogc3RyaW5nLCBuZXh0OiBzdHJpbmcpID0+ICctJyArIG5leHQudG9Mb3dlckNhc2UoKSk7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBOb3RlOiBUaGVyZSBpcyBhIGJ1ZyBpbiBUUyAyLjQgdGhhdCBwcmV2ZW50cyB1cyBmcm9tXG4gICAgLy8gaW5saW5pbmcgdGhpcyBpbnRvIEBEaXJlY3RpdmVcbiAgICAvLyBUT0RPKHRib3NjaCk6IGZpbmQgb3IgZmlsZSBhIGJ1ZyBhZ2FpbnN0IFR5cGVTY3JpcHQgZm9yIHRoaXMuXG4gICAgY29uc3QgZGlyZWN0aXZlID0ge3NlbGVjdG9yOiBzZWxlY3RvciwgaW5wdXRzOiB0aGlzLmlucHV0c1JlbmFtZSwgb3V0cHV0czogdGhpcy5vdXRwdXRzUmVuYW1lfTtcblxuICAgIEBEaXJlY3RpdmUoe2ppdDogdHJ1ZSwgLi4uZGlyZWN0aXZlfSlcbiAgICBjbGFzcyBNeUNsYXNzIGV4dGVuZHMgVXBncmFkZU5nMUNvbXBvbmVudEFkYXB0ZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgRG9DaGVjayxcbiAgICAgICAgT25EZXN0cm95IHtcbiAgICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoJFNDT1BFKSBzY29wZTogSVNjb3BlLCBpbmplY3RvcjogSW5qZWN0b3IsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBuZXcgVXBncmFkZUhlbHBlcihpbmplY3RvciwgbmFtZSwgZWxlbWVudFJlZiwgc2VsZi5kaXJlY3RpdmUgfHwgdW5kZWZpbmVkKSwgc2NvcGUsXG4gICAgICAgICAgICBzZWxmLnRlbXBsYXRlLCBzZWxmLmlucHV0cywgc2VsZi5vdXRwdXRzLCBzZWxmLnByb3BlcnR5T3V0cHV0cywgc2VsZi5jaGVja1Byb3BlcnRpZXMsXG4gICAgICAgICAgICBzZWxmLnByb3BlcnR5TWFwKSBhcyBhbnk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudHlwZSA9IE15Q2xhc3M7XG4gIH1cblxuICBleHRyYWN0QmluZGluZ3MoKSB7XG4gICAgY29uc3QgYnRjSXNPYmplY3QgPSB0eXBlb2YgdGhpcy5kaXJlY3RpdmUgIS5iaW5kVG9Db250cm9sbGVyID09PSAnb2JqZWN0JztcbiAgICBpZiAoYnRjSXNPYmplY3QgJiYgT2JqZWN0LmtleXModGhpcy5kaXJlY3RpdmUgIS5zY29wZSAhKS5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgQmluZGluZyBkZWZpbml0aW9ucyBvbiBzY29wZSBhbmQgY29udHJvbGxlciBhdCB0aGUgc2FtZSB0aW1lIGFyZSBub3Qgc3VwcG9ydGVkLmApO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRleHQgPSAoYnRjSXNPYmplY3QpID8gdGhpcy5kaXJlY3RpdmUgIS5iaW5kVG9Db250cm9sbGVyIDogdGhpcy5kaXJlY3RpdmUgIS5zY29wZTtcblxuICAgIGlmICh0eXBlb2YgY29udGV4dCA9PSAnb2JqZWN0Jykge1xuICAgICAgT2JqZWN0LmtleXMoY29udGV4dCkuZm9yRWFjaChwcm9wTmFtZSA9PiB7XG4gICAgICAgIGNvbnN0IGRlZmluaXRpb24gPSBjb250ZXh0W3Byb3BOYW1lXTtcbiAgICAgICAgY29uc3QgYmluZGluZ1R5cGUgPSBkZWZpbml0aW9uLmNoYXJBdCgwKTtcbiAgICAgICAgY29uc3QgYmluZGluZ09wdGlvbnMgPSBkZWZpbml0aW9uLmNoYXJBdCgxKTtcbiAgICAgICAgY29uc3QgYXR0ck5hbWUgPSBkZWZpbml0aW9uLnN1YnN0cmluZyhiaW5kaW5nT3B0aW9ucyA9PT0gJz8nID8gMiA6IDEpIHx8IHByb3BOYW1lO1xuXG4gICAgICAgIC8vIFFVRVNUSU9OOiBXaGF0IGFib3V0IGA9KmA/IElnbm9yZT8gVGhyb3c/IFN1cHBvcnQ/XG5cbiAgICAgICAgY29uc3QgaW5wdXROYW1lID0gYGlucHV0XyR7YXR0ck5hbWV9YDtcbiAgICAgICAgY29uc3QgaW5wdXROYW1lUmVuYW1lID0gYCR7aW5wdXROYW1lfTogJHthdHRyTmFtZX1gO1xuICAgICAgICBjb25zdCBvdXRwdXROYW1lID0gYG91dHB1dF8ke2F0dHJOYW1lfWA7XG4gICAgICAgIGNvbnN0IG91dHB1dE5hbWVSZW5hbWUgPSBgJHtvdXRwdXROYW1lfTogJHthdHRyTmFtZX1gO1xuICAgICAgICBjb25zdCBvdXRwdXROYW1lUmVuYW1lQ2hhbmdlID0gYCR7b3V0cHV0TmFtZVJlbmFtZX1DaGFuZ2VgO1xuXG4gICAgICAgIHN3aXRjaCAoYmluZGluZ1R5cGUpIHtcbiAgICAgICAgICBjYXNlICdAJzpcbiAgICAgICAgICBjYXNlICc8JzpcbiAgICAgICAgICAgIHRoaXMuaW5wdXRzLnB1c2goaW5wdXROYW1lKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRzUmVuYW1lLnB1c2goaW5wdXROYW1lUmVuYW1lKTtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlNYXBbaW5wdXROYW1lXSA9IHByb3BOYW1lO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnPSc6XG4gICAgICAgICAgICB0aGlzLmlucHV0cy5wdXNoKGlucHV0TmFtZSk7XG4gICAgICAgICAgICB0aGlzLmlucHV0c1JlbmFtZS5wdXNoKGlucHV0TmFtZVJlbmFtZSk7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5TWFwW2lucHV0TmFtZV0gPSBwcm9wTmFtZTtcblxuICAgICAgICAgICAgdGhpcy5vdXRwdXRzLnB1c2gob3V0cHV0TmFtZSk7XG4gICAgICAgICAgICB0aGlzLm91dHB1dHNSZW5hbWUucHVzaChvdXRwdXROYW1lUmVuYW1lQ2hhbmdlKTtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlNYXBbb3V0cHV0TmFtZV0gPSBwcm9wTmFtZTtcblxuICAgICAgICAgICAgdGhpcy5jaGVja1Byb3BlcnRpZXMucHVzaChwcm9wTmFtZSk7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5T3V0cHV0cy5wdXNoKG91dHB1dE5hbWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnJic6XG4gICAgICAgICAgICB0aGlzLm91dHB1dHMucHVzaChvdXRwdXROYW1lKTtcbiAgICAgICAgICAgIHRoaXMub3V0cHV0c1JlbmFtZS5wdXNoKG91dHB1dE5hbWVSZW5hbWUpO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eU1hcFtvdXRwdXROYW1lXSA9IHByb3BOYW1lO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGxldCBqc29uID0gSlNPTi5zdHJpbmdpZnkoY29udGV4dCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYFVuZXhwZWN0ZWQgbWFwcGluZyAnJHtiaW5kaW5nVHlwZX0nIGluICcke2pzb259JyBpbiAnJHt0aGlzLm5hbWV9JyBkaXJlY3RpdmUuYCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGdyYWRlIG5nMSBjb21wb25lbnRzIGludG8gQW5ndWxhci5cbiAgICovXG4gIHN0YXRpYyByZXNvbHZlKFxuICAgICAgZXhwb3J0ZWRDb21wb25lbnRzOiB7W25hbWU6IHN0cmluZ106IFVwZ3JhZGVOZzFDb21wb25lbnRBZGFwdGVyQnVpbGRlcn0sXG4gICAgICAkaW5qZWN0b3I6IElJbmplY3RvclNlcnZpY2UpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBPYmplY3Qua2V5cyhleHBvcnRlZENvbXBvbmVudHMpLm1hcChuYW1lID0+IHtcbiAgICAgIGNvbnN0IGV4cG9ydGVkQ29tcG9uZW50ID0gZXhwb3J0ZWRDb21wb25lbnRzW25hbWVdO1xuICAgICAgZXhwb3J0ZWRDb21wb25lbnQuZGlyZWN0aXZlID0gVXBncmFkZUhlbHBlci5nZXREaXJlY3RpdmUoJGluamVjdG9yLCBuYW1lKTtcbiAgICAgIGV4cG9ydGVkQ29tcG9uZW50LmV4dHJhY3RCaW5kaW5ncygpO1xuXG4gICAgICByZXR1cm4gUHJvbWlzZVxuICAgICAgICAgIC5yZXNvbHZlKFVwZ3JhZGVIZWxwZXIuZ2V0VGVtcGxhdGUoJGluamVjdG9yLCBleHBvcnRlZENvbXBvbmVudC5kaXJlY3RpdmUsIHRydWUpKVxuICAgICAgICAgIC50aGVuKHRlbXBsYXRlID0+IGV4cG9ydGVkQ29tcG9uZW50LnRlbXBsYXRlID0gdGVtcGxhdGUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxufVxuXG5jbGFzcyBVcGdyYWRlTmcxQ29tcG9uZW50QWRhcHRlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBEb0NoZWNrIHtcbiAgcHJpdmF0ZSBjb250cm9sbGVySW5zdGFuY2U6IElDb250cm9sbGVySW5zdGFuY2V8bnVsbCA9IG51bGw7XG4gIGRlc3RpbmF0aW9uT2JqOiBJQmluZGluZ0Rlc3RpbmF0aW9ufG51bGwgPSBudWxsO1xuICBjaGVja0xhc3RWYWx1ZXM6IGFueVtdID0gW107XG4gIGRpcmVjdGl2ZTogSURpcmVjdGl2ZTtcbiAgZWxlbWVudDogRWxlbWVudDtcbiAgJGVsZW1lbnQ6IGFueSA9IG51bGw7XG4gIGNvbXBvbmVudFNjb3BlOiBJU2NvcGU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGhlbHBlcjogVXBncmFkZUhlbHBlciwgc2NvcGU6IElTY29wZSwgcHJpdmF0ZSB0ZW1wbGF0ZTogc3RyaW5nLFxuICAgICAgcHJpdmF0ZSBpbnB1dHM6IHN0cmluZ1tdLCBwcml2YXRlIG91dHB1dHM6IHN0cmluZ1tdLCBwcml2YXRlIHByb3BPdXRzOiBzdHJpbmdbXSxcbiAgICAgIHByaXZhdGUgY2hlY2tQcm9wZXJ0aWVzOiBzdHJpbmdbXSwgcHJpdmF0ZSBwcm9wZXJ0eU1hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30pIHtcbiAgICB0aGlzLmRpcmVjdGl2ZSA9IGhlbHBlci5kaXJlY3RpdmU7XG4gICAgdGhpcy5lbGVtZW50ID0gaGVscGVyLmVsZW1lbnQ7XG4gICAgdGhpcy4kZWxlbWVudCA9IGhlbHBlci4kZWxlbWVudDtcbiAgICB0aGlzLmNvbXBvbmVudFNjb3BlID0gc2NvcGUuJG5ldyghIXRoaXMuZGlyZWN0aXZlLnNjb3BlKTtcblxuICAgIGNvbnN0IGNvbnRyb2xsZXJUeXBlID0gdGhpcy5kaXJlY3RpdmUuY29udHJvbGxlcjtcblxuICAgIGlmICh0aGlzLmRpcmVjdGl2ZS5iaW5kVG9Db250cm9sbGVyICYmIGNvbnRyb2xsZXJUeXBlKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXJJbnN0YW5jZSA9IHRoaXMuaGVscGVyLmJ1aWxkQ29udHJvbGxlcihjb250cm9sbGVyVHlwZSwgdGhpcy5jb21wb25lbnRTY29wZSk7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uT2JqID0gdGhpcy5jb250cm9sbGVySW5zdGFuY2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb25PYmogPSB0aGlzLmNvbXBvbmVudFNjb3BlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAodGhpcyBhcyBhbnkpW2lucHV0c1tpXV0gPSBudWxsO1xuICAgIH1cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IG91dHB1dHMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGVtaXR0ZXIgPSAodGhpcyBhcyBhbnkpW291dHB1dHNbal1dID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgICBpZiAodGhpcy5wcm9wT3V0cy5pbmRleE9mKG91dHB1dHNbal0pID09PSAtMSkge1xuICAgICAgICB0aGlzLnNldENvbXBvbmVudFByb3BlcnR5KFxuICAgICAgICAgICAgb3V0cHV0c1tqXSwgKGVtaXR0ZXIgPT4gKHZhbHVlOiBhbnkpID0+IGVtaXR0ZXIuZW1pdCh2YWx1ZSkpKGVtaXR0ZXIpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCBwcm9wT3V0cy5sZW5ndGg7IGsrKykge1xuICAgICAgdGhpcy5jaGVja0xhc3RWYWx1ZXMucHVzaChJTklUSUFMX1ZBTFVFKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBDb2xsZWN0IGNvbnRlbnRzLCBpbnNlcnQgYW5kIGNvbXBpbGUgdGVtcGxhdGVcbiAgICBjb25zdCBhdHRhY2hDaGlsZE5vZGVzOiBJTGlua0ZufHVuZGVmaW5lZCA9IHRoaXMuaGVscGVyLnByZXBhcmVUcmFuc2NsdXNpb24oKTtcbiAgICBjb25zdCBsaW5rRm4gPSB0aGlzLmhlbHBlci5jb21waWxlVGVtcGxhdGUodGhpcy50ZW1wbGF0ZSk7XG5cbiAgICAvLyBJbnN0YW50aWF0ZSBjb250cm9sbGVyIChpZiBub3QgYWxyZWFkeSBkb25lIHNvKVxuICAgIGNvbnN0IGNvbnRyb2xsZXJUeXBlID0gdGhpcy5kaXJlY3RpdmUuY29udHJvbGxlcjtcbiAgICBjb25zdCBiaW5kVG9Db250cm9sbGVyID0gdGhpcy5kaXJlY3RpdmUuYmluZFRvQ29udHJvbGxlcjtcbiAgICBpZiAoY29udHJvbGxlclR5cGUgJiYgIWJpbmRUb0NvbnRyb2xsZXIpIHtcbiAgICAgIHRoaXMuY29udHJvbGxlckluc3RhbmNlID0gdGhpcy5oZWxwZXIuYnVpbGRDb250cm9sbGVyKGNvbnRyb2xsZXJUeXBlLCB0aGlzLmNvbXBvbmVudFNjb3BlKTtcbiAgICB9XG5cbiAgICAvLyBSZXF1aXJlIG90aGVyIGNvbnRyb2xsZXJzXG4gICAgY29uc3QgcmVxdWlyZWRDb250cm9sbGVycyA9XG4gICAgICAgIHRoaXMuaGVscGVyLnJlc29sdmVBbmRCaW5kUmVxdWlyZWRDb250cm9sbGVycyh0aGlzLmNvbnRyb2xsZXJJbnN0YW5jZSk7XG5cbiAgICAvLyBIb29rOiAkb25Jbml0XG4gICAgaWYgKHRoaXMuY29udHJvbGxlckluc3RhbmNlICYmIGlzRnVuY3Rpb24odGhpcy5jb250cm9sbGVySW5zdGFuY2UuJG9uSW5pdCkpIHtcbiAgICAgIHRoaXMuY29udHJvbGxlckluc3RhbmNlLiRvbkluaXQoKTtcbiAgICB9XG5cbiAgICAvLyBMaW5raW5nXG4gICAgY29uc3QgbGluayA9IHRoaXMuZGlyZWN0aXZlLmxpbms7XG4gICAgY29uc3QgcHJlTGluayA9ICh0eXBlb2YgbGluayA9PSAnb2JqZWN0JykgJiYgKGxpbmsgYXMgSURpcmVjdGl2ZVByZVBvc3QpLnByZTtcbiAgICBjb25zdCBwb3N0TGluayA9ICh0eXBlb2YgbGluayA9PSAnb2JqZWN0JykgPyAobGluayBhcyBJRGlyZWN0aXZlUHJlUG9zdCkucG9zdCA6IGxpbms7XG4gICAgY29uc3QgYXR0cnM6IElBdHRyaWJ1dGVzID0gTk9UX1NVUFBPUlRFRDtcbiAgICBjb25zdCB0cmFuc2NsdWRlRm46IElUcmFuc2NsdWRlRnVuY3Rpb24gPSBOT1RfU1VQUE9SVEVEO1xuICAgIGlmIChwcmVMaW5rKSB7XG4gICAgICBwcmVMaW5rKHRoaXMuY29tcG9uZW50U2NvcGUsIHRoaXMuJGVsZW1lbnQsIGF0dHJzLCByZXF1aXJlZENvbnRyb2xsZXJzLCB0cmFuc2NsdWRlRm4pO1xuICAgIH1cblxuICAgIGxpbmtGbih0aGlzLmNvbXBvbmVudFNjb3BlLCBudWxsICEsIHtwYXJlbnRCb3VuZFRyYW5zY2x1ZGVGbjogYXR0YWNoQ2hpbGROb2Rlc30pO1xuXG4gICAgaWYgKHBvc3RMaW5rKSB7XG4gICAgICBwb3N0TGluayh0aGlzLmNvbXBvbmVudFNjb3BlLCB0aGlzLiRlbGVtZW50LCBhdHRycywgcmVxdWlyZWRDb250cm9sbGVycywgdHJhbnNjbHVkZUZuKTtcbiAgICB9XG5cbiAgICAvLyBIb29rOiAkcG9zdExpbmtcbiAgICBpZiAodGhpcy5jb250cm9sbGVySW5zdGFuY2UgJiYgaXNGdW5jdGlvbih0aGlzLmNvbnRyb2xsZXJJbnN0YW5jZS4kcG9zdExpbmspKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXJJbnN0YW5jZS4kcG9zdExpbmsoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgY29uc3QgbmcxQ2hhbmdlczogYW55ID0ge307XG4gICAgT2JqZWN0LmtleXMoY2hhbmdlcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgIGNvbnN0IGNoYW5nZTogU2ltcGxlQ2hhbmdlID0gY2hhbmdlc1tuYW1lXTtcbiAgICAgIHRoaXMuc2V0Q29tcG9uZW50UHJvcGVydHkobmFtZSwgY2hhbmdlLmN1cnJlbnRWYWx1ZSk7XG4gICAgICBuZzFDaGFuZ2VzW3RoaXMucHJvcGVydHlNYXBbbmFtZV1dID0gY2hhbmdlO1xuICAgIH0pO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24odGhpcy5kZXN0aW5hdGlvbk9iaiAhLiRvbkNoYW5nZXMpKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uT2JqICEuJG9uQ2hhbmdlcyAhKG5nMUNoYW5nZXMpO1xuICAgIH1cbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBjb25zdCBkZXN0aW5hdGlvbk9iaiA9IHRoaXMuZGVzdGluYXRpb25PYmo7XG4gICAgY29uc3QgbGFzdFZhbHVlcyA9IHRoaXMuY2hlY2tMYXN0VmFsdWVzO1xuICAgIGNvbnN0IGNoZWNrUHJvcGVydGllcyA9IHRoaXMuY2hlY2tQcm9wZXJ0aWVzO1xuICAgIGNvbnN0IHByb3BPdXRzID0gdGhpcy5wcm9wT3V0cztcbiAgICBjaGVja1Byb3BlcnRpZXMuZm9yRWFjaCgocHJvcE5hbWUsIGkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZGVzdGluYXRpb25PYmogIVtwcm9wTmFtZV07XG4gICAgICBjb25zdCBsYXN0ID0gbGFzdFZhbHVlc1tpXTtcbiAgICAgIGlmICghc3RyaWN0RXF1YWxzKGxhc3QsIHZhbHVlKSkge1xuICAgICAgICBjb25zdCBldmVudEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gKHRoaXMgYXMgYW55KVtwcm9wT3V0c1tpXV07XG4gICAgICAgIGV2ZW50RW1pdHRlci5lbWl0KGxhc3RWYWx1ZXNbaV0gPSB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5jb250cm9sbGVySW5zdGFuY2UgJiYgaXNGdW5jdGlvbih0aGlzLmNvbnRyb2xsZXJJbnN0YW5jZS4kZG9DaGVjaykpIHtcbiAgICAgIHRoaXMuY29udHJvbGxlckluc3RhbmNlLiRkb0NoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7IHRoaXMuaGVscGVyLm9uRGVzdHJveSh0aGlzLmNvbXBvbmVudFNjb3BlLCB0aGlzLmNvbnRyb2xsZXJJbnN0YW5jZSk7IH1cblxuICBzZXRDb21wb25lbnRQcm9wZXJ0eShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmRlc3RpbmF0aW9uT2JqICFbdGhpcy5wcm9wZXJ0eU1hcFtuYW1lXV0gPSB2YWx1ZTtcbiAgfVxufVxuIl19