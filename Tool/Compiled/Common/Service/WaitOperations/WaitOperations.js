import * as tslib_1 from "tslib";
export class WaitOperations {
    wait(time = 0) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => setTimeout(resolve, time));
        });
    }
}
//# sourceMappingURL=WaitOperations.js.map