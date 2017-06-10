import * as tslib_1 from "tslib";
export class WaitOperations {
    waitForIdle() {
        return new Promise(resolve => requestIdleCallback(resolve));
    }
    wait(time = 0) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => setTimeout(resolve, time));
        });
    }
}
//# sourceMappingURL=WaitOperations.js.map