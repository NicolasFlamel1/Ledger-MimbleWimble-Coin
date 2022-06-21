(() => {
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire94c2"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire94c2"] = parcelRequire;
}
parcelRequire.register("2NWzs", function(module, exports) {

$parcel$export(module.exports, "default", () => $20ad9758f1082316$export$2e2bcd8739ae039, (v) => $20ad9758f1082316$export$2e2bcd8739ae039 = v);

var $14mgd = parcelRequire("14mgd");

var $ak5fG = parcelRequire("ak5fG");

var $2XWm1 = parcelRequire("2XWm1");

var $lPKUA = parcelRequire("lPKUA");

var $i6riQ = parcelRequire("i6riQ");

var $lnDAt = parcelRequire("lnDAt");

var $5J7r5 = parcelRequire("5J7r5");
var $20ad9758f1082316$require$Buffer = $5J7r5.Buffer;
var $20ad9758f1082316$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d1, b1) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d1, b1);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $20ad9758f1082316$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $20ad9758f1082316$var$__generator = undefined && undefined.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
var $20ad9758f1082316$var$configurationValue = 1;
var $20ad9758f1082316$var$endpointNumber = 3;
/**
 * WebUSB Transport implementation
 * @example
 * import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
 * ...
 * TransportWebUSB.create().then(transport => ...)
 */ var $20ad9758f1082316$var$TransportWebUSB = /** @class */ function(_super) {
    $20ad9758f1082316$var$__extends(TransportWebUSB1, _super);
    function TransportWebUSB1(device, interfaceNumber) {
        var _this = _super.call(this) || this;
        _this.channel = Math.floor(Math.random() * 0xffff);
        _this.packetSize = 64;
        _this._disconnectEmitted = false;
        _this._emitDisconnect = function(e) {
            if (_this._disconnectEmitted) return;
            _this._disconnectEmitted = true;
            _this.emit("disconnect", e);
        };
        _this.device = device;
        _this.interfaceNumber = interfaceNumber;
        _this.deviceModel = (0, $2XWm1.identifyUSBProductId)(device.productId);
        return _this;
    }
    /**
     * Similar to create() except it will always display the device permission (even if some devices are already accepted).
     */ TransportWebUSB1.request = function() {
        return $20ad9758f1082316$var$__awaiter(this, void 0, void 0, function() {
            var device;
            return $20ad9758f1082316$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4 /*yield*/ ,
                            (0, $lnDAt.requestLedgerDevice)()
                        ];
                    case 1:
                        device = _a.sent();
                        return [
                            2 /*return*/ ,
                            TransportWebUSB1.open(device)
                        ];
                }
            });
        });
    };
    /**
     * Similar to create() except it will never display the device permission (it returns a Promise<?Transport>, null if it fails to find a device).
     */ TransportWebUSB1.openConnected = function() {
        return $20ad9758f1082316$var$__awaiter(this, void 0, void 0, function() {
            var devices;
            return $20ad9758f1082316$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4 /*yield*/ ,
                            (0, $lnDAt.getLedgerDevices)()
                        ];
                    case 1:
                        devices = _a.sent();
                        if (devices.length === 0) return [
                            2 /*return*/ ,
                            null
                        ];
                        return [
                            2 /*return*/ ,
                            TransportWebUSB1.open(devices[0])
                        ];
                }
            });
        });
    };
    /**
     * Create a Ledger transport with a USBDevice
     */ TransportWebUSB1.open = function(device) {
        return $20ad9758f1082316$var$__awaiter(this, void 0, void 0, function() {
            var iface, interfaceNumber, e_1, transport, onDisconnect;
            return $20ad9758f1082316$var$__generator(this, function(_a1) {
                switch(_a1.label){
                    case 0:
                        return [
                            4 /*yield*/ ,
                            device.open()
                        ];
                    case 1:
                        _a1.sent();
                        if (!(device.configuration === null)) return [
                            3 /*break*/ ,
                            3
                        ];
                        return [
                            4 /*yield*/ ,
                            device.selectConfiguration($20ad9758f1082316$var$configurationValue)
                        ];
                    case 2:
                        _a1.sent();
                        _a1.label = 3;
                    case 3:
                        return [
                            4 /*yield*/ ,
                            $20ad9758f1082316$var$gracefullyResetDevice(device)
                        ];
                    case 4:
                        _a1.sent();
                        iface = device.configurations[0].interfaces.find(function(_a) {
                            var alternates = _a.alternates;
                            return alternates.some(function(a) {
                                return a.interfaceClass === 255;
                            });
                        });
                        if (!iface) throw new (0, $i6riQ.TransportInterfaceNotAvailable)("No WebUSB interface found for your Ledger device. Please upgrade firmware or contact techsupport.");
                        interfaceNumber = iface.interfaceNumber;
                        _a1.label = 5;
                    case 5:
                        _a1.trys.push([
                            5,
                            7,
                            ,
                            9
                        ]);
                        return [
                            4 /*yield*/ ,
                            device.claimInterface(interfaceNumber)
                        ];
                    case 6:
                        _a1.sent();
                        return [
                            3 /*break*/ ,
                            9
                        ];
                    case 7:
                        e_1 = _a1.sent();
                        return [
                            4 /*yield*/ ,
                            device.close()
                        ];
                    case 8:
                        _a1.sent();
                        throw new (0, $i6riQ.TransportInterfaceNotAvailable)(e_1.message);
                    case 9:
                        transport = new TransportWebUSB1(device, interfaceNumber);
                        onDisconnect = function(e) {
                            if (device === e.device) {
                                // $FlowFixMe
                                navigator.usb.removeEventListener("disconnect", onDisconnect);
                                transport._emitDisconnect(new (0, $i6riQ.DisconnectedDevice)());
                            }
                        };
                        // $FlowFixMe
                        navigator.usb.addEventListener("disconnect", onDisconnect);
                        return [
                            2 /*return*/ ,
                            transport
                        ];
                }
            });
        });
    };
    /**
     * Release the transport device
     */ TransportWebUSB1.prototype.close = function() {
        return $20ad9758f1082316$var$__awaiter(this, void 0, void 0, function() {
            return $20ad9758f1082316$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4 /*yield*/ ,
                            this.exchangeBusyPromise
                        ];
                    case 1:
                        _a.sent();
                        return [
                            4 /*yield*/ ,
                            this.device.releaseInterface(this.interfaceNumber)
                        ];
                    case 2:
                        _a.sent();
                        return [
                            4 /*yield*/ ,
                            $20ad9758f1082316$var$gracefullyResetDevice(this.device)
                        ];
                    case 3:
                        _a.sent();
                        return [
                            4 /*yield*/ ,
                            this.device.close()
                        ];
                    case 4:
                        _a.sent();
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    /**
     * Exchange with the device using APDU protocol.
     * @param apdu
     * @returns a promise of apdu response
     */ TransportWebUSB1.prototype.exchange = function(apdu) {
        return $20ad9758f1082316$var$__awaiter(this, void 0, void 0, function() {
            var b;
            var _this = this;
            return $20ad9758f1082316$var$__generator(this, function(_a2) {
                switch(_a2.label){
                    case 0:
                        return [
                            4 /*yield*/ ,
                            this.exchangeAtomicImpl(function() {
                                return $20ad9758f1082316$var$__awaiter(_this, void 0, void 0, function() {
                                    var _a, channel, packetSize, framing, blocks, i, result, acc, r, buffer;
                                    return $20ad9758f1082316$var$__generator(this, function(_b) {
                                        switch(_b.label){
                                            case 0:
                                                _a = this, channel = _a.channel, packetSize = _a.packetSize;
                                                (0, $lPKUA.log)("apdu", "=> " + apdu.toString("hex"));
                                                framing = (0, $ak5fG.default)(channel, packetSize);
                                                blocks = framing.makeBlocks(apdu);
                                                i = 0;
                                                _b.label = 1;
                                            case 1:
                                                if (!(i < blocks.length)) return [
                                                    3 /*break*/ ,
                                                    4
                                                ];
                                                return [
                                                    4 /*yield*/ ,
                                                    this.device.transferOut($20ad9758f1082316$var$endpointNumber, blocks[i])
                                                ];
                                            case 2:
                                                _b.sent();
                                                _b.label = 3;
                                            case 3:
                                                i++;
                                                return [
                                                    3 /*break*/ ,
                                                    1
                                                ];
                                            case 4:
                                                if (!!(result = framing.getReducedResult(acc))) return [
                                                    3 /*break*/ ,
                                                    6
                                                ];
                                                return [
                                                    4 /*yield*/ ,
                                                    this.device.transferIn($20ad9758f1082316$var$endpointNumber, packetSize)
                                                ];
                                            case 5:
                                                r = _b.sent();
                                                buffer = $20ad9758f1082316$require$Buffer.from(r.data.buffer);
                                                acc = framing.reduceResponse(acc, buffer);
                                                return [
                                                    3 /*break*/ ,
                                                    4
                                                ];
                                            case 6:
                                                (0, $lPKUA.log)("apdu", "<= " + result.toString("hex"));
                                                return [
                                                    2 /*return*/ ,
                                                    result
                                                ];
                                        }
                                    });
                                });
                            })["catch"](function(e) {
                                if (e && e.message && e.message.includes("disconnected")) {
                                    _this._emitDisconnect(e);
                                    throw new (0, $i6riQ.DisconnectedDeviceDuringOperation)(e.message);
                                }
                                throw e;
                            })
                        ];
                    case 1:
                        b = _a2.sent();
                        return [
                            2 /*return*/ ,
                            b
                        ];
                }
            });
        });
    };
    TransportWebUSB1.prototype.setScrambleKey = function() {};
    /**
     * Check if WebUSB transport is supported.
     */ TransportWebUSB1.isSupported = (0, $lnDAt.isSupported);
    /**
     * List the WebUSB devices that was previously authorized by the user.
     */ TransportWebUSB1.list = (0, $lnDAt.getLedgerDevices);
    /**
     * Actively listen to WebUSB devices and emit ONE device
     * that was either accepted before, if not it will trigger the native permission UI.
     *
     * Important: it must be called in the context of a UI click!
     */ TransportWebUSB1.listen = function(observer) {
        var unsubscribed = false;
        (0, $lnDAt.getFirstLedgerDevice)().then(function(device) {
            if (!unsubscribed) {
                var deviceModel = (0, $2XWm1.identifyUSBProductId)(device.productId);
                observer.next({
                    type: "add",
                    descriptor: device,
                    deviceModel: deviceModel
                });
                observer.complete();
            }
        }, function(error) {
            if (window.DOMException && error instanceof window.DOMException && error.code === 18) observer.error(new (0, $i6riQ.TransportWebUSBGestureRequired)(error.message));
            else observer.error(new (0, $i6riQ.TransportOpenUserCancelled)(error.message));
        });
        function unsubscribe() {
            unsubscribed = true;
        }
        return {
            unsubscribe: unsubscribe
        };
    };
    return TransportWebUSB1;
}((0, $14mgd.default));
var $20ad9758f1082316$export$2e2bcd8739ae039 = $20ad9758f1082316$var$TransportWebUSB;
function $20ad9758f1082316$var$gracefullyResetDevice(device) {
    return $20ad9758f1082316$var$__awaiter(this, void 0, void 0, function() {
        var err_1;
        return $20ad9758f1082316$var$__generator(this, function(_a) {
            switch(_a.label){
                case 0:
                    _a.trys.push([
                        0,
                        2,
                        ,
                        3
                    ]);
                    return [
                        4 /*yield*/ ,
                        device.reset()
                    ];
                case 1:
                    _a.sent();
                    return [
                        3 /*break*/ ,
                        3
                    ];
                case 2:
                    err_1 = _a.sent();
                    console.warn(err_1);
                    return [
                        3 /*break*/ ,
                        3
                    ];
                case 3:
                    return [
                        2 /*return*/ 
                    ];
            }
        });
    });
}

});
parcelRequire.register("14mgd", function(module, exports) {

$parcel$export(module.exports, "default", () => $0c776ea97697a2be$export$2e2bcd8739ae039, (v) => $0c776ea97697a2be$export$2e2bcd8739ae039 = v);
$parcel$export(module.exports, "TransportError", () => (parcelRequire("i6riQ")).TransportError, (v) => (parcelRequire("i6riQ")).TransportError = v);
$parcel$export(module.exports, "TransportStatusError", () => (parcelRequire("i6riQ")).TransportStatusError, (v) => (parcelRequire("i6riQ")).TransportStatusError = v);
$parcel$export(module.exports, "StatusCodes", () => (parcelRequire("i6riQ")).StatusCodes, (v) => (parcelRequire("i6riQ")).StatusCodes = v);
$parcel$export(module.exports, "getAltStatusMessage", () => (parcelRequire("i6riQ")).getAltStatusMessage, (v) => (parcelRequire("i6riQ")).getAltStatusMessage = v);

var $lHBIg = parcelRequire("lHBIg");

var $i6riQ = parcelRequire("i6riQ");

var $5J7r5 = parcelRequire("5J7r5");
var $0c776ea97697a2be$require$Buffer = $5J7r5.Buffer;
var $0c776ea97697a2be$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $0c776ea97697a2be$var$__generator = undefined && undefined.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
var $0c776ea97697a2be$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $0c776ea97697a2be$var$__spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var $0c776ea97697a2be$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * Transport defines the generic interface to share between node/u2f impl
 * A **Descriptor** is a parametric type that is up to be determined for the implementation.
 * it can be for instance an ID, an file path, a URL,...
 */ var $0c776ea97697a2be$var$Transport = /** @class */ function() {
    function Transport1() {
        var _this1 = this;
        this.exchangeTimeout = 30000;
        this.unresponsiveTimeout = 15000;
        this.deviceModel = null;
        this._events = new (0, (/*@__PURE__*/$parcel$interopDefault($lHBIg)))();
        /**
         * wrapper on top of exchange to simplify work of the implementation.
         * @param cla
         * @param ins
         * @param p1
         * @param p2
         * @param data
         * @param statusList is a list of accepted status code (shorts). [0x9000] by default
         * @return a Promise of response buffer
         */ this.send = function(cla, ins, p1, p2, data, statusList) {
            if (data === void 0) data = $0c776ea97697a2be$require$Buffer.alloc(0);
            if (statusList === void 0) statusList = [
                (0, $i6riQ.StatusCodes).OK
            ];
            return $0c776ea97697a2be$var$__awaiter(_this1, void 0, void 0, function() {
                var response, sw;
                return $0c776ea97697a2be$var$__generator(this, function(_a) {
                    switch(_a.label){
                        case 0:
                            if (data.length >= 256) throw new (0, $i6riQ.TransportError)("data.length exceed 256 bytes limit. Got: " + data.length, "DataLengthTooBig");
                            return [
                                4 /*yield*/ ,
                                this.exchange($0c776ea97697a2be$require$Buffer.concat([
                                    $0c776ea97697a2be$require$Buffer.from([
                                        cla,
                                        ins,
                                        p1,
                                        p2
                                    ]),
                                    $0c776ea97697a2be$require$Buffer.from([
                                        data.length
                                    ]),
                                    data, 
                                ]))
                            ];
                        case 1:
                            response = _a.sent();
                            sw = response.readUInt16BE(response.length - 2);
                            if (!statusList.some(function(s) {
                                return s === sw;
                            })) throw new (0, $i6riQ.TransportStatusError)(sw);
                            return [
                                2 /*return*/ ,
                                response
                            ];
                    }
                });
            });
        };
        this.exchangeAtomicImpl = function(f) {
            return $0c776ea97697a2be$var$__awaiter(_this1, void 0, void 0, function() {
                var resolveBusy, busyPromise, unresponsiveReached, timeout, res;
                var _this = this;
                return $0c776ea97697a2be$var$__generator(this, function(_a) {
                    switch(_a.label){
                        case 0:
                            if (this.exchangeBusyPromise) throw new (0, $i6riQ.TransportRaceCondition)("An action was already pending on the Ledger device. Please deny or reconnect.");
                            busyPromise = new Promise(function(r) {
                                resolveBusy = r;
                            });
                            this.exchangeBusyPromise = busyPromise;
                            unresponsiveReached = false;
                            timeout = setTimeout(function() {
                                unresponsiveReached = true;
                                _this.emit("unresponsive");
                            }, this.unresponsiveTimeout);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([
                                1,
                                ,
                                3,
                                4
                            ]);
                            return [
                                4 /*yield*/ ,
                                f()
                            ];
                        case 2:
                            res = _a.sent();
                            if (unresponsiveReached) this.emit("responsive");
                            return [
                                2 /*return*/ ,
                                res
                            ];
                        case 3:
                            clearTimeout(timeout);
                            if (resolveBusy) resolveBusy();
                            this.exchangeBusyPromise = null;
                            return [
                                7 /*endfinally*/ 
                            ];
                        case 4:
                            return [
                                2 /*return*/ 
                            ];
                    }
                });
            });
        };
        this._appAPIlock = null;
    }
    /**
     * low level api to communicate with the device
     * This method is for implementations to implement but should not be directly called.
     * Instead, the recommanded way is to use send() method
     * @param apdu the data to send
     * @return a Promise of response data
     */ Transport1.prototype.exchange = function(_apdu) {
        throw new Error("exchange not implemented");
    };
    /**
     * set the "scramble key" for the next exchanges with the device.
     * Each App can have a different scramble key and they internally will set it at instanciation.
     * @param key the scramble key
     */ Transport1.prototype.setScrambleKey = function(_key) {};
    /**
     * close the exchange with the device.
     * @return a Promise that ends when the transport is closed.
     */ Transport1.prototype.close = function() {
        return Promise.resolve();
    };
    /**
     * Listen to an event on an instance of transport.
     * Transport implementation can have specific events. Here is the common events:
     * * `"disconnect"` : triggered if Transport is disconnected
     */ Transport1.prototype.on = function(eventName, cb) {
        this._events.on(eventName, cb);
    };
    /**
     * Stop listening to an event on an instance of transport.
     */ Transport1.prototype.off = function(eventName, cb) {
        this._events.removeListener(eventName, cb);
    };
    Transport1.prototype.emit = function(event) {
        var _a;
        var args = [];
        for(var _i = 1; _i < arguments.length; _i++)args[_i - 1] = arguments[_i];
        (_a = this._events).emit.apply(_a, $0c776ea97697a2be$var$__spreadArray([
            event
        ], $0c776ea97697a2be$var$__read(args), false));
    };
    /**
     * Enable or not logs of the binary exchange
     */ Transport1.prototype.setDebugMode = function() {
        console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.");
    };
    /**
     * Set a timeout (in milliseconds) for the exchange call. Only some transport might implement it. (e.g. U2F)
     */ Transport1.prototype.setExchangeTimeout = function(exchangeTimeout) {
        this.exchangeTimeout = exchangeTimeout;
    };
    /**
     * Define the delay before emitting "unresponsive" on an exchange that does not respond
     */ Transport1.prototype.setExchangeUnresponsiveTimeout = function(unresponsiveTimeout) {
        this.unresponsiveTimeout = unresponsiveTimeout;
    };
    /**
     * create() allows to open the first descriptor available or
     * throw if there is none or if timeout is reached.
     * This is a light helper, alternative to using listen() and open() (that you may need for any more advanced usecase)
     * @example
    TransportFoo.create().then(transport => ...)
     */ Transport1.create = function(openTimeout, listenTimeout) {
        var _this = this;
        if (openTimeout === void 0) openTimeout = 3000;
        return new Promise(function(resolve, reject) {
            var found = false;
            var sub = _this.listen({
                next: function(e) {
                    found = true;
                    if (sub) sub.unsubscribe();
                    if (listenTimeoutId) clearTimeout(listenTimeoutId);
                    _this.open(e.descriptor, openTimeout).then(resolve, reject);
                },
                error: function(e) {
                    if (listenTimeoutId) clearTimeout(listenTimeoutId);
                    reject(e);
                },
                complete: function() {
                    if (listenTimeoutId) clearTimeout(listenTimeoutId);
                    if (!found) reject(new (0, $i6riQ.TransportError)(_this.ErrorMessage_NoDeviceFound, "NoDeviceFound"));
                }
            });
            var listenTimeoutId = listenTimeout ? setTimeout(function() {
                sub.unsubscribe();
                reject(new (0, $i6riQ.TransportError)(_this.ErrorMessage_ListenTimeout, "ListenTimeout"));
            }, listenTimeout) : null;
        });
    };
    Transport1.prototype.decorateAppAPIMethods = function(self, methods, scrambleKey) {
        var e_1, _a;
        try {
            for(var methods_1 = $0c776ea97697a2be$var$__values(methods), methods_1_1 = methods_1.next(); !methods_1_1.done; methods_1_1 = methods_1.next()){
                var methodName = methods_1_1.value;
                self[methodName] = this.decorateAppAPIMethod(methodName, self[methodName], self, scrambleKey);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (methods_1_1 && !methods_1_1.done && (_a = methods_1["return"])) _a.call(methods_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
    };
    Transport1.prototype.decorateAppAPIMethod = function(methodName, f, ctx, scrambleKey) {
        var _this = this;
        return function() {
            var args = [];
            for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
            return $0c776ea97697a2be$var$__awaiter(_this, void 0, void 0, function() {
                var _appAPIlock;
                return $0c776ea97697a2be$var$__generator(this, function(_a) {
                    switch(_a.label){
                        case 0:
                            _appAPIlock = this._appAPIlock;
                            if (_appAPIlock) return [
                                2 /*return*/ ,
                                Promise.reject(new (0, $i6riQ.TransportError)("Ledger Device is busy (lock " + _appAPIlock + ")", "TransportLocked"))
                            ];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([
                                1,
                                ,
                                3,
                                4
                            ]);
                            this._appAPIlock = methodName;
                            this.setScrambleKey(scrambleKey);
                            return [
                                4 /*yield*/ ,
                                f.apply(ctx, args)
                            ];
                        case 2:
                            return [
                                2 /*return*/ ,
                                _a.sent()
                            ];
                        case 3:
                            this._appAPIlock = null;
                            return [
                                7 /*endfinally*/ 
                            ];
                        case 4:
                            return [
                                2 /*return*/ 
                            ];
                    }
                });
            });
        };
    };
    Transport1.ErrorMessage_ListenTimeout = "No Ledger device found (timeout)";
    Transport1.ErrorMessage_NoDeviceFound = "No Ledger device found";
    return Transport1;
}();
var $0c776ea97697a2be$export$2e2bcd8739ae039 = $0c776ea97697a2be$var$Transport;

});
parcelRequire.register("lHBIg", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
var $fccade25877db257$var$R = typeof Reflect === "object" ? Reflect : null;
var $fccade25877db257$var$ReflectApply = $fccade25877db257$var$R && typeof $fccade25877db257$var$R.apply === "function" ? $fccade25877db257$var$R.apply : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
};
var $fccade25877db257$var$ReflectOwnKeys;
if ($fccade25877db257$var$R && typeof $fccade25877db257$var$R.ownKeys === "function") $fccade25877db257$var$ReflectOwnKeys = $fccade25877db257$var$R.ownKeys;
else if (Object.getOwnPropertySymbols) $fccade25877db257$var$ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
};
else $fccade25877db257$var$ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
};
function $fccade25877db257$var$ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
}
var $fccade25877db257$var$NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
};
function $fccade25877db257$var$EventEmitter() {
    $fccade25877db257$var$EventEmitter.init.call(this);
}
module.exports = $fccade25877db257$var$EventEmitter;
module.exports.once = $fccade25877db257$var$once;
// Backwards-compat with node 0.10.x
$fccade25877db257$var$EventEmitter.EventEmitter = $fccade25877db257$var$EventEmitter;
$fccade25877db257$var$EventEmitter.prototype._events = undefined;
$fccade25877db257$var$EventEmitter.prototype._eventsCount = 0;
$fccade25877db257$var$EventEmitter.prototype._maxListeners = undefined;
// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var $fccade25877db257$var$defaultMaxListeners = 10;
function $fccade25877db257$var$checkListener(listener) {
    if (typeof listener !== "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
}
Object.defineProperty($fccade25877db257$var$EventEmitter, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
        return $fccade25877db257$var$defaultMaxListeners;
    },
    set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || $fccade25877db257$var$NumberIsNaN(arg)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        $fccade25877db257$var$defaultMaxListeners = arg;
    }
});
$fccade25877db257$var$EventEmitter.init = function() {
    if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || undefined;
};
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
$fccade25877db257$var$EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || $fccade25877db257$var$NumberIsNaN(n)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
    this._maxListeners = n;
    return this;
};
function $fccade25877db257$var$_getMaxListeners(that) {
    if (that._maxListeners === undefined) return $fccade25877db257$var$EventEmitter.defaultMaxListeners;
    return that._maxListeners;
}
$fccade25877db257$var$EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $fccade25877db257$var$_getMaxListeners(this);
};
$fccade25877db257$var$EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for(var i = 1; i < arguments.length; i++)args.push(arguments[i]);
    var doError = type === "error";
    var events = this._events;
    if (events !== undefined) doError = doError && events.error === undefined;
    else if (!doError) return false;
    // If there is no 'error' event listener then throw.
    if (doError) {
        var er;
        if (args.length > 0) er = args[0];
        if (er instanceof Error) // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
        // At least give some kind of context to the user
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err; // Unhandled 'error' event
    }
    var handler = events[type];
    if (handler === undefined) return false;
    if (typeof handler === "function") $fccade25877db257$var$ReflectApply(handler, this, args);
    else {
        var len = handler.length;
        var listeners = $fccade25877db257$var$arrayClone(handler, len);
        for(var i = 0; i < len; ++i)$fccade25877db257$var$ReflectApply(listeners[i], this, args);
    }
    return true;
};
function $fccade25877db257$var$_addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    $fccade25877db257$var$checkListener(listener);
    events = target._events;
    if (events === undefined) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
    } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener !== undefined) {
            target.emit("newListener", type, listener.listener ? listener.listener : listener);
            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
        }
        existing = events[type];
    }
    if (existing === undefined) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
    } else {
        if (typeof existing === "function") // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [
            listener,
            existing
        ] : [
            existing,
            listener
        ];
        else if (prepend) existing.unshift(listener);
        else existing.push(listener);
        // Check for listener leak
        m = $fccade25877db257$var$_getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            // No error code for this since it is a Warning
            // eslint-disable-next-line no-restricted-syntax
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners " + "added. Use emitter.setMaxListeners() to " + "increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            $fccade25877db257$var$ProcessEmitWarning(w);
        }
    }
    return target;
}
$fccade25877db257$var$EventEmitter.prototype.addListener = function addListener(type, listener) {
    return $fccade25877db257$var$_addListener(this, type, listener, false);
};
$fccade25877db257$var$EventEmitter.prototype.on = $fccade25877db257$var$EventEmitter.prototype.addListener;
$fccade25877db257$var$EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return $fccade25877db257$var$_addListener(this, type, listener, true);
};
function $fccade25877db257$var$onceWrapper() {
    if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0) return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
    }
}
function $fccade25877db257$var$_onceWrap(target, type, listener) {
    var state = {
        fired: false,
        wrapFn: undefined,
        target: target,
        type: type,
        listener: listener
    };
    var wrapped = $fccade25877db257$var$onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
}
$fccade25877db257$var$EventEmitter.prototype.once = function once(type, listener) {
    $fccade25877db257$var$checkListener(listener);
    this.on(type, $fccade25877db257$var$_onceWrap(this, type, listener));
    return this;
};
$fccade25877db257$var$EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    $fccade25877db257$var$checkListener(listener);
    this.prependListener(type, $fccade25877db257$var$_onceWrap(this, type, listener));
    return this;
};
// Emits a 'removeListener' event if and only if the listener was removed.
$fccade25877db257$var$EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;
    $fccade25877db257$var$checkListener(listener);
    events = this._events;
    if (events === undefined) return this;
    list = events[type];
    if (list === undefined) return this;
    if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0) this._events = Object.create(null);
        else {
            delete events[type];
            if (events.removeListener) this.emit("removeListener", type, list.listener || listener);
        }
    } else if (typeof list !== "function") {
        position = -1;
        for(i = list.length - 1; i >= 0; i--)if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
        }
        if (position < 0) return this;
        if (position === 0) list.shift();
        else $fccade25877db257$var$spliceOne(list, position);
        if (list.length === 1) events[type] = list[0];
        if (events.removeListener !== undefined) this.emit("removeListener", type, originalListener || listener);
    }
    return this;
};
$fccade25877db257$var$EventEmitter.prototype.off = $fccade25877db257$var$EventEmitter.prototype.removeListener;
$fccade25877db257$var$EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events, i;
    events = this._events;
    if (events === undefined) return this;
    // not listening for removeListener, no need to emit
    if (events.removeListener === undefined) {
        if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
        } else if (events[type] !== undefined) {
            if (--this._eventsCount === 0) this._events = Object.create(null);
            else delete events[type];
        }
        return this;
    }
    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for(i = 0; i < keys.length; ++i){
            key = keys[i];
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
    }
    listeners = events[type];
    if (typeof listeners === "function") this.removeListener(type, listeners);
    else if (listeners !== undefined) // LIFO order
    for(i = listeners.length - 1; i >= 0; i--)this.removeListener(type, listeners[i]);
    return this;
};
function $fccade25877db257$var$_listeners(target, type, unwrap) {
    var events = target._events;
    if (events === undefined) return [];
    var evlistener = events[type];
    if (evlistener === undefined) return [];
    if (typeof evlistener === "function") return unwrap ? [
        evlistener.listener || evlistener
    ] : [
        evlistener
    ];
    return unwrap ? $fccade25877db257$var$unwrapListeners(evlistener) : $fccade25877db257$var$arrayClone(evlistener, evlistener.length);
}
$fccade25877db257$var$EventEmitter.prototype.listeners = function listeners(type) {
    return $fccade25877db257$var$_listeners(this, type, true);
};
$fccade25877db257$var$EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return $fccade25877db257$var$_listeners(this, type, false);
};
$fccade25877db257$var$EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === "function") return emitter.listenerCount(type);
    else return $fccade25877db257$var$listenerCount.call(emitter, type);
};
$fccade25877db257$var$EventEmitter.prototype.listenerCount = $fccade25877db257$var$listenerCount;
function $fccade25877db257$var$listenerCount(type) {
    var events = this._events;
    if (events !== undefined) {
        var evlistener = events[type];
        if (typeof evlistener === "function") return 1;
        else if (evlistener !== undefined) return evlistener.length;
    }
    return 0;
}
$fccade25877db257$var$EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? $fccade25877db257$var$ReflectOwnKeys(this._events) : [];
};
function $fccade25877db257$var$arrayClone(arr, n) {
    var copy = new Array(n);
    for(var i = 0; i < n; ++i)copy[i] = arr[i];
    return copy;
}
function $fccade25877db257$var$spliceOne(list, index) {
    for(; index + 1 < list.length; index++)list[index] = list[index + 1];
    list.pop();
}
function $fccade25877db257$var$unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for(var i = 0; i < ret.length; ++i)ret[i] = arr[i].listener || arr[i];
    return ret;
}
function $fccade25877db257$var$once(emitter, name) {
    return new Promise(function(resolve, reject) {
        function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
        }
        function resolver() {
            if (typeof emitter.removeListener === "function") emitter.removeListener("error", errorListener);
            resolve([].slice.call(arguments));
        }
        $fccade25877db257$var$eventTargetAgnosticAddListener(emitter, name, resolver, {
            once: true
        });
        if (name !== "error") $fccade25877db257$var$addErrorHandlerIfEventEmitter(emitter, errorListener, {
            once: true
        });
    });
}
function $fccade25877db257$var$addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === "function") $fccade25877db257$var$eventTargetAgnosticAddListener(emitter, "error", handler, flags);
}
function $fccade25877db257$var$eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === "function") {
        if (flags.once) emitter.once(name, listener);
        else emitter.on(name, listener);
    } else if (typeof emitter.addEventListener === "function") // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
        // IE does not have builtin `{ once: true }` support so we
        // have to do it manually.
        if (flags.once) emitter.removeEventListener(name, wrapListener);
        listener(arg);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
}

});

parcelRequire.register("i6riQ", function(module, exports) {

$parcel$export(module.exports, "DisconnectedDevice", () => $d2ddf74e75b0a8be$export$1e42f3936938e063);
$parcel$export(module.exports, "DisconnectedDeviceDuringOperation", () => $d2ddf74e75b0a8be$export$2a60f41a2ed2742);
$parcel$export(module.exports, "TransportOpenUserCancelled", () => $d2ddf74e75b0a8be$export$9642f061c2494239);
$parcel$export(module.exports, "TransportInterfaceNotAvailable", () => $d2ddf74e75b0a8be$export$fd71e3a51c4bf0ae);
$parcel$export(module.exports, "TransportRaceCondition", () => $d2ddf74e75b0a8be$export$d6cb63cda2c2b2a4);
$parcel$export(module.exports, "TransportWebUSBGestureRequired", () => $d2ddf74e75b0a8be$export$c0ffbdd94649bd06);
$parcel$export(module.exports, "TransportError", () => $d2ddf74e75b0a8be$export$8e68de6fb26f2236);
$parcel$export(module.exports, "StatusCodes", () => $d2ddf74e75b0a8be$export$efd5569f873811b1);
$parcel$export(module.exports, "TransportStatusError", () => $d2ddf74e75b0a8be$export$78917f4716d96cfe);

var $37gMp = parcelRequire("37gMp");
var $d2ddf74e75b0a8be$export$d7dd32b41fc9c3a0 = (0, $37gMp.createCustomErrorClass)("AccountNameRequired");
var $d2ddf74e75b0a8be$export$fb9db505804530ec = (0, $37gMp.createCustomErrorClass)("AccountNotSupported");
var $d2ddf74e75b0a8be$export$c9d6bf2b06944665 = (0, $37gMp.createCustomErrorClass)("AmountRequired");
var $d2ddf74e75b0a8be$export$2628fce2396c23c2 = (0, $37gMp.createCustomErrorClass)("BluetoothRequired");
var $d2ddf74e75b0a8be$export$75f8b0767ef406f1 = (0, $37gMp.createCustomErrorClass)("BtcUnmatchedApp");
var $d2ddf74e75b0a8be$export$f60aa84fd00bc3ee = (0, $37gMp.createCustomErrorClass)("CantOpenDevice");
var $d2ddf74e75b0a8be$export$fc0260506e4022ab = (0, $37gMp.createCustomErrorClass)("CashAddrNotSupported");
var $d2ddf74e75b0a8be$export$e0b1ec53ba36e221 = (0, $37gMp.createCustomErrorClass)("CurrencyNotSupported");
var $d2ddf74e75b0a8be$export$fa9aacd48d3a45c2 = (0, $37gMp.createCustomErrorClass)("DeviceAppVerifyNotSupported");
var $d2ddf74e75b0a8be$export$f21ce806524ab8d4 = (0, $37gMp.createCustomErrorClass)("DeviceGenuineSocketEarlyClose");
var $d2ddf74e75b0a8be$export$9c30dc6872fcd74c = (0, $37gMp.createCustomErrorClass)("DeviceNotGenuine");
var $d2ddf74e75b0a8be$export$1d5ae41b109edf1f = (0, $37gMp.createCustomErrorClass)("DeviceOnDashboardExpected");
var $d2ddf74e75b0a8be$export$8eecf64ec9a8cfd7 = (0, $37gMp.createCustomErrorClass)("DeviceOnDashboardUnexpected");
var $d2ddf74e75b0a8be$export$a5e2071f1ac48fdd = (0, $37gMp.createCustomErrorClass)("DeviceInOSUExpected");
var $d2ddf74e75b0a8be$export$3be6e7231165f4ac = (0, $37gMp.createCustomErrorClass)("DeviceHalted");
var $d2ddf74e75b0a8be$export$fa7bfae6dce03474 = (0, $37gMp.createCustomErrorClass)("DeviceNameInvalid");
var $d2ddf74e75b0a8be$export$bcce4e5aded80ca0 = (0, $37gMp.createCustomErrorClass)("DeviceSocketFail");
var $d2ddf74e75b0a8be$export$944a0f9a7cc1e03a = (0, $37gMp.createCustomErrorClass)("DeviceSocketNoBulkStatus");
var $d2ddf74e75b0a8be$export$1e42f3936938e063 = (0, $37gMp.createCustomErrorClass)("DisconnectedDevice");
var $d2ddf74e75b0a8be$export$2a60f41a2ed2742 = (0, $37gMp.createCustomErrorClass)("DisconnectedDeviceDuringOperation");
var $d2ddf74e75b0a8be$export$cfbd0adf8f9fdaf9 = (0, $37gMp.createCustomErrorClass)("EnpointConfig");
var $d2ddf74e75b0a8be$export$96d8d3c501f1625 = (0, $37gMp.createCustomErrorClass)("EthAppPleaseEnableContractData");
var $d2ddf74e75b0a8be$export$37b49553b7172cb1 = (0, $37gMp.createCustomErrorClass)("FeeEstimationFailed");
var $d2ddf74e75b0a8be$export$d00fd6c398a70fd9 = (0, $37gMp.createCustomErrorClass)("FirmwareNotRecognized");
var $d2ddf74e75b0a8be$export$3dc3bbf8c134219c = (0, $37gMp.createCustomErrorClass)("HardResetFail");
var $d2ddf74e75b0a8be$export$5e8f7ae1054a2777 = (0, $37gMp.createCustomErrorClass)("InvalidXRPTag");
var $d2ddf74e75b0a8be$export$953b602d2269ceba = (0, $37gMp.createCustomErrorClass)("InvalidAddress");
var $d2ddf74e75b0a8be$export$bbdaf7c77a7508eb = (0, $37gMp.createCustomErrorClass)("InvalidAddressBecauseDestinationIsAlsoSource");
var $d2ddf74e75b0a8be$export$882967e2980534f9 = (0, $37gMp.createCustomErrorClass)("LatestMCUInstalledError");
var $d2ddf74e75b0a8be$export$59772a13ac97df0e = (0, $37gMp.createCustomErrorClass)("UnknownMCU");
var $d2ddf74e75b0a8be$export$26bf4f7c63d50901 = (0, $37gMp.createCustomErrorClass)("LedgerAPIError");
var $d2ddf74e75b0a8be$export$fdab6afd1b1820af = (0, $37gMp.createCustomErrorClass)("LedgerAPIErrorWithMessage");
var $d2ddf74e75b0a8be$export$c2996b38942cf758 = (0, $37gMp.createCustomErrorClass)("LedgerAPINotAvailable");
var $d2ddf74e75b0a8be$export$3d81abcc61613a27 = (0, $37gMp.createCustomErrorClass)("ManagerAppAlreadyInstalled");
var $d2ddf74e75b0a8be$export$87a9bff9fff141e2 = (0, $37gMp.createCustomErrorClass)("ManagerAppRelyOnBTC");
var $d2ddf74e75b0a8be$export$86581a722c4238c0 = (0, $37gMp.createCustomErrorClass)("ManagerAppDepInstallRequired");
var $d2ddf74e75b0a8be$export$267a8476044885dd = (0, $37gMp.createCustomErrorClass)("ManagerAppDepUninstallRequired");
var $d2ddf74e75b0a8be$export$bb771ca417eca344 = (0, $37gMp.createCustomErrorClass)("ManagerDeviceLocked");
var $d2ddf74e75b0a8be$export$b634ce25e3ff5229 = (0, $37gMp.createCustomErrorClass)("ManagerFirmwareNotEnoughSpace");
var $d2ddf74e75b0a8be$export$2d26f4eadfe37285 = (0, $37gMp.createCustomErrorClass)("ManagerNotEnoughSpace");
var $d2ddf74e75b0a8be$export$ceb7f9bef5a1e481 = (0, $37gMp.createCustomErrorClass)("ManagerUninstallBTCDep");
var $d2ddf74e75b0a8be$export$baadb6886fde1621 = (0, $37gMp.createCustomErrorClass)("NetworkDown");
var $d2ddf74e75b0a8be$export$5cbfa0659f97216a = (0, $37gMp.createCustomErrorClass)("NoAddressesFound");
var $d2ddf74e75b0a8be$export$9e00aead3515e5c9 = (0, $37gMp.createCustomErrorClass)("NotEnoughBalance");
var $d2ddf74e75b0a8be$export$5ed90e0e011f4857 = (0, $37gMp.createCustomErrorClass)("NotEnoughBalanceToDelegate");
var $d2ddf74e75b0a8be$export$75178c95e66d9630 = (0, $37gMp.createCustomErrorClass)("NotEnoughBalanceInParentAccount");
var $d2ddf74e75b0a8be$export$e3e2865b29f7e0b0 = (0, $37gMp.createCustomErrorClass)("NotEnoughSpendableBalance");
var $d2ddf74e75b0a8be$export$a84b3634866707ea = (0, $37gMp.createCustomErrorClass)("NotEnoughBalanceBecauseDestinationNotCreated");
var $d2ddf74e75b0a8be$export$a282f858b69a7326 = (0, $37gMp.createCustomErrorClass)("NoAccessToCamera");
var $d2ddf74e75b0a8be$export$5111c405c5cacc97 = (0, $37gMp.createCustomErrorClass)("NotEnoughGas");
var $d2ddf74e75b0a8be$export$626e1fd20d22139c = (0, $37gMp.createCustomErrorClass)("NotSupportedLegacyAddress");
var $d2ddf74e75b0a8be$export$f919e2c9c746346b = (0, $37gMp.createCustomErrorClass)("GasLessThanEstimate");
var $d2ddf74e75b0a8be$export$22c5aa8937c5b423 = (0, $37gMp.createCustomErrorClass)("PasswordsDontMatch");
var $d2ddf74e75b0a8be$export$f57670cd1aaf386 = (0, $37gMp.createCustomErrorClass)("PasswordIncorrect");
var $d2ddf74e75b0a8be$export$3ba22bf10deb1448 = (0, $37gMp.createCustomErrorClass)("RecommendSubAccountsToEmpty");
var $d2ddf74e75b0a8be$export$33f73085e1b7871b = (0, $37gMp.createCustomErrorClass)("RecommendUndelegation");
var $d2ddf74e75b0a8be$export$cd4d967a66d81060 = (0, $37gMp.createCustomErrorClass)("TimeoutTagged");
var $d2ddf74e75b0a8be$export$9375635756d6156e = (0, $37gMp.createCustomErrorClass)("UnexpectedBootloader");
var $d2ddf74e75b0a8be$export$90478a5d08d6c2d7 = (0, $37gMp.createCustomErrorClass)("MCUNotGenuineToDashboard");
var $d2ddf74e75b0a8be$export$132f0197eaa65535 = (0, $37gMp.createCustomErrorClass)("RecipientRequired");
var $d2ddf74e75b0a8be$export$7aee729193ab77ba = (0, $37gMp.createCustomErrorClass)("UnavailableTezosOriginatedAccountReceive");
var $d2ddf74e75b0a8be$export$4ec11dc947a3c9d6 = (0, $37gMp.createCustomErrorClass)("UnavailableTezosOriginatedAccountSend");
var $d2ddf74e75b0a8be$export$5e3ed85b946872a1 = (0, $37gMp.createCustomErrorClass)("UpdateFetchFileFail");
var $d2ddf74e75b0a8be$export$5db6383ad081f01e = (0, $37gMp.createCustomErrorClass)("UpdateIncorrectHash");
var $d2ddf74e75b0a8be$export$92c199eb837d8df8 = (0, $37gMp.createCustomErrorClass)("UpdateIncorrectSig");
var $d2ddf74e75b0a8be$export$85e0c017833c894c = (0, $37gMp.createCustomErrorClass)("UpdateYourApp");
var $d2ddf74e75b0a8be$export$84115f1b54c874b3 = (0, $37gMp.createCustomErrorClass)("UserRefusedDeviceNameChange");
var $d2ddf74e75b0a8be$export$3f4864efb1638333 = (0, $37gMp.createCustomErrorClass)("UserRefusedAddress");
var $d2ddf74e75b0a8be$export$d777e0ef77faca34 = (0, $37gMp.createCustomErrorClass)("UserRefusedFirmwareUpdate");
var $d2ddf74e75b0a8be$export$3d8a4f08cd3eb133 = (0, $37gMp.createCustomErrorClass)("UserRefusedAllowManager");
var $d2ddf74e75b0a8be$export$db9b724c3524b5d6 = (0, $37gMp.createCustomErrorClass)("UserRefusedOnDevice"); // TODO rename because it's just for transaction refusal
var $d2ddf74e75b0a8be$export$9642f061c2494239 = (0, $37gMp.createCustomErrorClass)("TransportOpenUserCancelled");
var $d2ddf74e75b0a8be$export$fd71e3a51c4bf0ae = (0, $37gMp.createCustomErrorClass)("TransportInterfaceNotAvailable");
var $d2ddf74e75b0a8be$export$d6cb63cda2c2b2a4 = (0, $37gMp.createCustomErrorClass)("TransportRaceCondition");
var $d2ddf74e75b0a8be$export$c0ffbdd94649bd06 = (0, $37gMp.createCustomErrorClass)("TransportWebUSBGestureRequired");
var $d2ddf74e75b0a8be$export$4800af3cc6204928 = (0, $37gMp.createCustomErrorClass)("DeviceShouldStayInApp");
var $d2ddf74e75b0a8be$export$101490ec073327e1 = (0, $37gMp.createCustomErrorClass)("WebsocketConnectionError");
var $d2ddf74e75b0a8be$export$219228963d86b069 = (0, $37gMp.createCustomErrorClass)("WebsocketConnectionFailed");
var $d2ddf74e75b0a8be$export$25b49ca0efdfe5d1 = (0, $37gMp.createCustomErrorClass)("WrongDeviceForAccount");
var $d2ddf74e75b0a8be$export$63498b46122d8a23 = (0, $37gMp.createCustomErrorClass)("WrongAppForCurrency");
var $d2ddf74e75b0a8be$export$707f317a4761c46d = (0, $37gMp.createCustomErrorClass)("ETHAddressNonEIP");
var $d2ddf74e75b0a8be$export$a5d8da2f27618c16 = (0, $37gMp.createCustomErrorClass)("CantScanQRCode");
var $d2ddf74e75b0a8be$export$3f2d8a7775aab6cc = (0, $37gMp.createCustomErrorClass)("FeeNotLoaded");
var $d2ddf74e75b0a8be$export$ffbf6641e9ab88d3 = (0, $37gMp.createCustomErrorClass)("FeeRequired");
var $d2ddf74e75b0a8be$export$53e797c2fa09aff3 = (0, $37gMp.createCustomErrorClass)("FeeTooHigh");
var $d2ddf74e75b0a8be$export$2aca4567d80fd933 = (0, $37gMp.createCustomErrorClass)("SyncError");
var $d2ddf74e75b0a8be$export$a2d6658d365c43df = (0, $37gMp.createCustomErrorClass)("PairingFailed");
var $d2ddf74e75b0a8be$export$3f7ba18f3c84cced = (0, $37gMp.createCustomErrorClass)("GenuineCheckFailed");
var $d2ddf74e75b0a8be$export$437e6aac14cab3d9 = (0, $37gMp.createCustomErrorClass)("LedgerAPI4xx");
var $d2ddf74e75b0a8be$export$309835543e52bf92 = (0, $37gMp.createCustomErrorClass)("LedgerAPI5xx");
var $d2ddf74e75b0a8be$export$c282cdb2f7fdc27a = (0, $37gMp.createCustomErrorClass)("FirmwareOrAppUpdateRequired");
var $d2ddf74e75b0a8be$export$d3cadb9f4e1fa40d = (0, $37gMp.createCustomErrorClass)("NoDBPathGiven");
var $d2ddf74e75b0a8be$export$de46c919e379f03f = (0, $37gMp.createCustomErrorClass)("DBWrongPassword");
var $d2ddf74e75b0a8be$export$e1c94c135b0a553e = (0, $37gMp.createCustomErrorClass)("DBNotReset");
function $d2ddf74e75b0a8be$export$8e68de6fb26f2236(message, id) {
    this.name = "TransportError";
    this.message = message;
    this.stack = new Error().stack;
    this.id = id;
}
$d2ddf74e75b0a8be$export$8e68de6fb26f2236.prototype = new Error();
(0, $37gMp.addCustomErrorDeserializer)("TransportError", function(e) {
    return new $d2ddf74e75b0a8be$export$8e68de6fb26f2236(e.message, e.id);
});
var $d2ddf74e75b0a8be$export$efd5569f873811b1 = {
    PIN_REMAINING_ATTEMPTS: 0x63c0,
    INCORRECT_LENGTH: 0x6700,
    MISSING_CRITICAL_PARAMETER: 0x6800,
    COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
    SECURITY_STATUS_NOT_SATISFIED: 0x6982,
    CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
    INCORRECT_DATA: 0x6a80,
    NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
    REFERENCED_DATA_NOT_FOUND: 0x6a88,
    FILE_ALREADY_EXISTS: 0x6a89,
    INCORRECT_P1_P2: 0x6b00,
    INS_NOT_SUPPORTED: 0x6d00,
    CLA_NOT_SUPPORTED: 0x6e00,
    TECHNICAL_PROBLEM: 0x6f00,
    OK: 0x9000,
    MEMORY_PROBLEM: 0x9240,
    NO_EF_SELECTED: 0x9400,
    INVALID_OFFSET: 0x9402,
    FILE_NOT_FOUND: 0x9404,
    INCONSISTENT_FILE: 0x9408,
    ALGORITHM_NOT_SUPPORTED: 0x9484,
    INVALID_KCV: 0x9485,
    CODE_NOT_INITIALIZED: 0x9802,
    ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
    CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
    CONTRADICTION_INVALIDATION: 0x9810,
    CODE_BLOCKED: 0x9840,
    MAX_VALUE_REACHED: 0x9850,
    GP_AUTH_FAILED: 0x6300,
    LICENSING: 0x6f42,
    HALTED: 0x6faa
};
function $d2ddf74e75b0a8be$export$799566c03457ebd5(code) {
    switch(code){
        // improve text of most common errors
        case 0x6700:
            return "Incorrect length";
        case 0x6800:
            return "Missing critical parameter";
        case 0x6982:
            return "Security not satisfied (dongle locked or have invalid access rights)";
        case 0x6985:
            return "Condition of use not satisfied (denied by the user?)";
        case 0x6a80:
            return "Invalid data received";
        case 0x6b00:
            return "Invalid parameter received";
    }
    if (0x6f00 <= code && code <= 0x6fff) return "Internal error, please report";
}
function $d2ddf74e75b0a8be$export$78917f4716d96cfe(statusCode) {
    this.name = "TransportStatusError";
    var statusText = Object.keys($d2ddf74e75b0a8be$export$efd5569f873811b1).find(function(k) {
        return $d2ddf74e75b0a8be$export$efd5569f873811b1[k] === statusCode;
    }) || "UNKNOWN_ERROR";
    var smsg = $d2ddf74e75b0a8be$export$799566c03457ebd5(statusCode) || statusText;
    var statusCodeStr = statusCode.toString(16);
    this.message = "Ledger device: " + smsg + " (0x" + statusCodeStr + ")";
    this.stack = new Error().stack;
    this.statusCode = statusCode;
    this.statusText = statusText;
}
$d2ddf74e75b0a8be$export$78917f4716d96cfe.prototype = new Error();
(0, $37gMp.addCustomErrorDeserializer)("TransportStatusError", function(e) {
    return new $d2ddf74e75b0a8be$export$78917f4716d96cfe(e.statusCode);
});

});
parcelRequire.register("37gMp", function(module, exports) {

$parcel$export(module.exports, "addCustomErrorDeserializer", () => $244f0aac38a80269$export$ff6248acd0c27a3f, (v) => $244f0aac38a80269$export$ff6248acd0c27a3f = v);
$parcel$export(module.exports, "createCustomErrorClass", () => $244f0aac38a80269$export$94baff7bf5134824, (v) => $244f0aac38a80269$export$94baff7bf5134824 = v);
/* eslint-disable no-continue */ /* eslint-disable no-unused-vars */ /* eslint-disable no-param-reassign */ /* eslint-disable no-prototype-builtins */ var $244f0aac38a80269$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var $244f0aac38a80269$var$errorClasses = {};
var $244f0aac38a80269$var$deserializers = {};
var $244f0aac38a80269$export$ff6248acd0c27a3f = function(name, deserializer) {
    $244f0aac38a80269$var$deserializers[name] = deserializer;
};
var $244f0aac38a80269$export$94baff7bf5134824 = function(name) {
    var C = function CustomError(message, fields) {
        Object.assign(this, fields);
        this.name = name;
        this.message = message || name;
        this.stack = new Error().stack;
    };
    C.prototype = new Error();
    $244f0aac38a80269$var$errorClasses[name] = C;
    return C;
};
var $244f0aac38a80269$export$64cddc1e268e9046 = function(object) {
    if (typeof object === "object" && object) {
        try {
            // $FlowFixMe FIXME HACK
            var msg = JSON.parse(object.message);
            if (msg.message && msg.name) object = msg;
        } catch (e) {
        // nothing
        }
        var error = void 0;
        if (typeof object.name === "string") {
            var name_1 = object.name;
            var des = $244f0aac38a80269$var$deserializers[name_1];
            if (des) error = des(object);
            else {
                var constructor = name_1 === "Error" ? Error : $244f0aac38a80269$var$errorClasses[name_1];
                if (!constructor) {
                    console.warn("deserializing an unknown class '" + name_1 + "'");
                    constructor = $244f0aac38a80269$export$94baff7bf5134824(name_1);
                }
                error = Object.create(constructor.prototype);
                try {
                    for(var prop in object)if (object.hasOwnProperty(prop)) error[prop] = object[prop];
                } catch (e) {
                // sometimes setting a property can fail (e.g. .name)
                }
            }
        } else error = new Error(object.message);
        if (!error.stack && Error.captureStackTrace) Error.captureStackTrace(error, $244f0aac38a80269$export$64cddc1e268e9046);
        return error;
    }
    return new Error(String(object));
};
var $244f0aac38a80269$export$46ff38bc6bdea8fb = function(value) {
    if (!value) return value;
    if (typeof value === "object") return $244f0aac38a80269$var$destroyCircular(value, []);
    if (typeof value === "function") return "[Function: " + (value.name || "anonymous") + "]";
    return value;
};
// https://www.npmjs.com/package/destroy-circular
function $244f0aac38a80269$var$destroyCircular(from, seen) {
    var e_1, _a;
    var to = {};
    seen.push(from);
    try {
        for(var _b = $244f0aac38a80269$var$__values(Object.keys(from)), _c = _b.next(); !_c.done; _c = _b.next()){
            var key = _c.value;
            var value = from[key];
            if (typeof value === "function") continue;
            if (!value || typeof value !== "object") {
                to[key] = value;
                continue;
            }
            if (seen.indexOf(from[key]) === -1) {
                to[key] = $244f0aac38a80269$var$destroyCircular(from[key], seen.slice(0));
                continue;
            }
            to[key] = "[Circular]";
        }
    } catch (e_1_1) {
        e_1 = {
            error: e_1_1
        };
    } finally{
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        } finally{
            if (e_1) throw e_1.error;
        }
    }
    if (typeof from.name === "string") to.name = from.name;
    if (typeof from.message === "string") to.message = from.message;
    if (typeof from.stack === "string") to.stack = from.stack;
    return to;
}

});


parcelRequire.register("5J7r5", function(module, exports) {

$parcel$export(module.exports, "Buffer", () => $42b6ec563ee582ae$export$a143d493d941bafc, (v) => $42b6ec563ee582ae$export$a143d493d941bafc = v);
$parcel$export(module.exports, "INSPECT_MAX_BYTES", () => $42b6ec563ee582ae$export$f99ded8fe4b79145, (v) => $42b6ec563ee582ae$export$f99ded8fe4b79145 = v);
var $42b6ec563ee582ae$export$a143d493d941bafc;
var $42b6ec563ee582ae$export$e4cf37d7f6fb9e0a;
var $42b6ec563ee582ae$export$f99ded8fe4b79145;
var $42b6ec563ee582ae$export$599f31c3813fae4d;
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ /* eslint-disable no-proto */ "use strict";

var $2JE8i = parcelRequire("2JE8i");

var $bgblM = parcelRequire("bgblM");
const $42b6ec563ee582ae$var$customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" // eslint-disable-line dot-notation
 ? Symbol["for"]("nodejs.util.inspect.custom") // eslint-disable-line dot-notation
 : null;
$42b6ec563ee582ae$export$a143d493d941bafc = $42b6ec563ee582ae$var$Buffer;
$42b6ec563ee582ae$export$e4cf37d7f6fb9e0a = $42b6ec563ee582ae$var$SlowBuffer;
$42b6ec563ee582ae$export$f99ded8fe4b79145 = 50;
const $42b6ec563ee582ae$var$K_MAX_LENGTH = 0x7fffffff;
$42b6ec563ee582ae$export$599f31c3813fae4d = $42b6ec563ee582ae$var$K_MAX_LENGTH;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */ $42b6ec563ee582ae$var$Buffer.TYPED_ARRAY_SUPPORT = $42b6ec563ee582ae$var$typedArraySupport();
if (!$42b6ec563ee582ae$var$Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
function $42b6ec563ee582ae$var$typedArraySupport() {
    // Can typed array instances can be augmented?
    try {
        const arr = new Uint8Array(1);
        const proto = {
            foo: function() {
                return 42;
            }
        };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
    } catch (e) {
        return false;
    }
}
Object.defineProperty($42b6ec563ee582ae$var$Buffer.prototype, "parent", {
    enumerable: true,
    get: function() {
        if (!$42b6ec563ee582ae$var$Buffer.isBuffer(this)) return undefined;
        return this.buffer;
    }
});
Object.defineProperty($42b6ec563ee582ae$var$Buffer.prototype, "offset", {
    enumerable: true,
    get: function() {
        if (!$42b6ec563ee582ae$var$Buffer.isBuffer(this)) return undefined;
        return this.byteOffset;
    }
});
function $42b6ec563ee582ae$var$createBuffer(length) {
    if (length > $42b6ec563ee582ae$var$K_MAX_LENGTH) throw new RangeError('The value "' + length + '" is invalid for option "size"');
    // Return an augmented `Uint8Array` instance
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, $42b6ec563ee582ae$var$Buffer.prototype);
    return buf;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */ function $42b6ec563ee582ae$var$Buffer(arg, encodingOrOffset, length) {
    // Common case.
    if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") throw new TypeError('The "string" argument must be of type string. Received type number');
        return $42b6ec563ee582ae$var$allocUnsafe(arg);
    }
    return $42b6ec563ee582ae$var$from(arg, encodingOrOffset, length);
}
$42b6ec563ee582ae$var$Buffer.poolSize = 8192 // not used by this implementation
;
function $42b6ec563ee582ae$var$from(value, encodingOrOffset, length) {
    if (typeof value === "string") return $42b6ec563ee582ae$var$fromString(value, encodingOrOffset);
    if (ArrayBuffer.isView(value)) return $42b6ec563ee582ae$var$fromArrayView(value);
    if (value == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    if ($42b6ec563ee582ae$var$isInstance(value, ArrayBuffer) || value && $42b6ec563ee582ae$var$isInstance(value.buffer, ArrayBuffer)) return $42b6ec563ee582ae$var$fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof SharedArrayBuffer !== "undefined" && ($42b6ec563ee582ae$var$isInstance(value, SharedArrayBuffer) || value && $42b6ec563ee582ae$var$isInstance(value.buffer, SharedArrayBuffer))) return $42b6ec563ee582ae$var$fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof value === "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) return $42b6ec563ee582ae$var$Buffer.from(valueOf, encodingOrOffset, length);
    const b = $42b6ec563ee582ae$var$fromObject(value);
    if (b) return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") return $42b6ec563ee582ae$var$Buffer.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/ $42b6ec563ee582ae$var$Buffer.from = function(value, encodingOrOffset, length) {
    return $42b6ec563ee582ae$var$from(value, encodingOrOffset, length);
};
// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf($42b6ec563ee582ae$var$Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf($42b6ec563ee582ae$var$Buffer, Uint8Array);
function $42b6ec563ee582ae$var$assertSize(size) {
    if (typeof size !== "number") throw new TypeError('"size" argument must be of type number');
    else if (size < 0) throw new RangeError('The value "' + size + '" is invalid for option "size"');
}
function $42b6ec563ee582ae$var$alloc(size, fill, encoding) {
    $42b6ec563ee582ae$var$assertSize(size);
    if (size <= 0) return $42b6ec563ee582ae$var$createBuffer(size);
    if (fill !== undefined) // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === "string" ? $42b6ec563ee582ae$var$createBuffer(size).fill(fill, encoding) : $42b6ec563ee582ae$var$createBuffer(size).fill(fill);
    return $42b6ec563ee582ae$var$createBuffer(size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/ $42b6ec563ee582ae$var$Buffer.alloc = function(size, fill, encoding) {
    return $42b6ec563ee582ae$var$alloc(size, fill, encoding);
};
function $42b6ec563ee582ae$var$allocUnsafe(size) {
    $42b6ec563ee582ae$var$assertSize(size);
    return $42b6ec563ee582ae$var$createBuffer(size < 0 ? 0 : $42b6ec563ee582ae$var$checked(size) | 0);
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */ $42b6ec563ee582ae$var$Buffer.allocUnsafe = function(size) {
    return $42b6ec563ee582ae$var$allocUnsafe(size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */ $42b6ec563ee582ae$var$Buffer.allocUnsafeSlow = function(size) {
    return $42b6ec563ee582ae$var$allocUnsafe(size);
};
function $42b6ec563ee582ae$var$fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") encoding = "utf8";
    if (!$42b6ec563ee582ae$var$Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
    const length = $42b6ec563ee582ae$var$byteLength(string, encoding) | 0;
    let buf = $42b6ec563ee582ae$var$createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
    return buf;
}
function $42b6ec563ee582ae$var$fromArrayLike(array) {
    const length = array.length < 0 ? 0 : $42b6ec563ee582ae$var$checked(array.length) | 0;
    const buf = $42b6ec563ee582ae$var$createBuffer(length);
    for(let i = 0; i < length; i += 1)buf[i] = array[i] & 255;
    return buf;
}
function $42b6ec563ee582ae$var$fromArrayView(arrayView) {
    if ($42b6ec563ee582ae$var$isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return $42b6ec563ee582ae$var$fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return $42b6ec563ee582ae$var$fromArrayLike(arrayView);
}
function $42b6ec563ee582ae$var$fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError('"offset" is outside of buffer bounds');
    if (array.byteLength < byteOffset + (length || 0)) throw new RangeError('"length" is outside of buffer bounds');
    let buf;
    if (byteOffset === undefined && length === undefined) buf = new Uint8Array(array);
    else if (length === undefined) buf = new Uint8Array(array, byteOffset);
    else buf = new Uint8Array(array, byteOffset, length);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(buf, $42b6ec563ee582ae$var$Buffer.prototype);
    return buf;
}
function $42b6ec563ee582ae$var$fromObject(obj) {
    if ($42b6ec563ee582ae$var$Buffer.isBuffer(obj)) {
        const len = $42b6ec563ee582ae$var$checked(obj.length) | 0;
        const buf = $42b6ec563ee582ae$var$createBuffer(len);
        if (buf.length === 0) return buf;
        obj.copy(buf, 0, 0, len);
        return buf;
    }
    if (obj.length !== undefined) {
        if (typeof obj.length !== "number" || $42b6ec563ee582ae$var$numberIsNaN(obj.length)) return $42b6ec563ee582ae$var$createBuffer(0);
        return $42b6ec563ee582ae$var$fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) return $42b6ec563ee582ae$var$fromArrayLike(obj.data);
}
function $42b6ec563ee582ae$var$checked(length) {
    // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= $42b6ec563ee582ae$var$K_MAX_LENGTH) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + $42b6ec563ee582ae$var$K_MAX_LENGTH.toString(16) + " bytes");
    return length | 0;
}
function $42b6ec563ee582ae$var$SlowBuffer(length) {
    if (+length != length) length = 0;
    return $42b6ec563ee582ae$var$Buffer.alloc(+length);
}
$42b6ec563ee582ae$var$Buffer.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== $42b6ec563ee582ae$var$Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
    ;
};
$42b6ec563ee582ae$var$Buffer.compare = function compare(a, b) {
    if ($42b6ec563ee582ae$var$isInstance(a, Uint8Array)) a = $42b6ec563ee582ae$var$Buffer.from(a, a.offset, a.byteLength);
    if ($42b6ec563ee582ae$var$isInstance(b, Uint8Array)) b = $42b6ec563ee582ae$var$Buffer.from(b, b.offset, b.byteLength);
    if (!$42b6ec563ee582ae$var$Buffer.isBuffer(a) || !$42b6ec563ee582ae$var$Buffer.isBuffer(b)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (a === b) return 0;
    let x = a.length;
    let y = b.length;
    for(let i = 0, len = Math.min(x, y); i < len; ++i)if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
$42b6ec563ee582ae$var$Buffer.isEncoding = function isEncoding(encoding) {
    switch(String(encoding).toLowerCase()){
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return true;
        default:
            return false;
    }
};
$42b6ec563ee582ae$var$Buffer.concat = function concat(list, length) {
    if (!Array.isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (list.length === 0) return $42b6ec563ee582ae$var$Buffer.alloc(0);
    let i;
    if (length === undefined) {
        length = 0;
        for(i = 0; i < list.length; ++i)length += list[i].length;
    }
    const buffer = $42b6ec563ee582ae$var$Buffer.allocUnsafe(length);
    let pos = 0;
    for(i = 0; i < list.length; ++i){
        let buf = list[i];
        if ($42b6ec563ee582ae$var$isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
                if (!$42b6ec563ee582ae$var$Buffer.isBuffer(buf)) buf = $42b6ec563ee582ae$var$Buffer.from(buf);
                buf.copy(buffer, pos);
            } else Uint8Array.prototype.set.call(buffer, buf, pos);
        } else if (!$42b6ec563ee582ae$var$Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
        else buf.copy(buffer, pos);
        pos += buf.length;
    }
    return buffer;
};
function $42b6ec563ee582ae$var$byteLength(string, encoding) {
    if ($42b6ec563ee582ae$var$Buffer.isBuffer(string)) return string.length;
    if (ArrayBuffer.isView(string) || $42b6ec563ee582ae$var$isInstance(string, ArrayBuffer)) return string.byteLength;
    if (typeof string !== "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) return 0;
    // Use a for loop to avoid recursion
    let loweredCase = false;
    for(;;)switch(encoding){
        case "ascii":
        case "latin1":
        case "binary":
            return len;
        case "utf8":
        case "utf-8":
            return $42b6ec563ee582ae$var$utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return len * 2;
        case "hex":
            return len >>> 1;
        case "base64":
            return $42b6ec563ee582ae$var$base64ToBytes(string).length;
        default:
            if (loweredCase) return mustMatch ? -1 : $42b6ec563ee582ae$var$utf8ToBytes(string).length // assume utf8
            ;
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
    }
}
$42b6ec563ee582ae$var$Buffer.byteLength = $42b6ec563ee582ae$var$byteLength;
function $42b6ec563ee582ae$var$slowToString(encoding, start, end) {
    let loweredCase = false;
    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.
    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) start = 0;
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) return "";
    if (end === undefined || end > this.length) end = this.length;
    if (end <= 0) return "";
    // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;
    if (end <= start) return "";
    if (!encoding) encoding = "utf8";
    while(true)switch(encoding){
        case "hex":
            return $42b6ec563ee582ae$var$hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
            return $42b6ec563ee582ae$var$utf8Slice(this, start, end);
        case "ascii":
            return $42b6ec563ee582ae$var$asciiSlice(this, start, end);
        case "latin1":
        case "binary":
            return $42b6ec563ee582ae$var$latin1Slice(this, start, end);
        case "base64":
            return $42b6ec563ee582ae$var$base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return $42b6ec563ee582ae$var$utf16leSlice(this, start, end);
        default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
    }
}
// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
$42b6ec563ee582ae$var$Buffer.prototype._isBuffer = true;
function $42b6ec563ee582ae$var$swap(b, n, m) {
    const i = b[n];
    b[n] = b[m];
    b[m] = i;
}
$42b6ec563ee582ae$var$Buffer.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for(let i = 0; i < len; i += 2)$42b6ec563ee582ae$var$swap(this, i, i + 1);
    return this;
};
$42b6ec563ee582ae$var$Buffer.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for(let i = 0; i < len; i += 4){
        $42b6ec563ee582ae$var$swap(this, i, i + 3);
        $42b6ec563ee582ae$var$swap(this, i + 1, i + 2);
    }
    return this;
};
$42b6ec563ee582ae$var$Buffer.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for(let i = 0; i < len; i += 8){
        $42b6ec563ee582ae$var$swap(this, i, i + 7);
        $42b6ec563ee582ae$var$swap(this, i + 1, i + 6);
        $42b6ec563ee582ae$var$swap(this, i + 2, i + 5);
        $42b6ec563ee582ae$var$swap(this, i + 3, i + 4);
    }
    return this;
};
$42b6ec563ee582ae$var$Buffer.prototype.toString = function toString() {
    const length = this.length;
    if (length === 0) return "";
    if (arguments.length === 0) return $42b6ec563ee582ae$var$utf8Slice(this, 0, length);
    return $42b6ec563ee582ae$var$slowToString.apply(this, arguments);
};
$42b6ec563ee582ae$var$Buffer.prototype.toLocaleString = $42b6ec563ee582ae$var$Buffer.prototype.toString;
$42b6ec563ee582ae$var$Buffer.prototype.equals = function equals(b) {
    if (!$42b6ec563ee582ae$var$Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
    if (this === b) return true;
    return $42b6ec563ee582ae$var$Buffer.compare(this, b) === 0;
};
$42b6ec563ee582ae$var$Buffer.prototype.inspect = function inspect() {
    let str = "";
    const max = $42b6ec563ee582ae$export$f99ded8fe4b79145;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max) str += " ... ";
    return "<Buffer " + str + ">";
};
if ($42b6ec563ee582ae$var$customInspectSymbol) $42b6ec563ee582ae$var$Buffer.prototype[$42b6ec563ee582ae$var$customInspectSymbol] = $42b6ec563ee582ae$var$Buffer.prototype.inspect;
$42b6ec563ee582ae$var$Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if ($42b6ec563ee582ae$var$isInstance(target, Uint8Array)) target = $42b6ec563ee582ae$var$Buffer.from(target, target.offset, target.byteLength);
    if (!$42b6ec563ee582ae$var$Buffer.isBuffer(target)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
    if (start === undefined) start = 0;
    if (end === undefined) end = target ? target.length : 0;
    if (thisStart === undefined) thisStart = 0;
    if (thisEnd === undefined) thisEnd = this.length;
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
    if (thisStart >= thisEnd && start >= end) return 0;
    if (thisStart >= thisEnd) return -1;
    if (start >= end) return 1;
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for(let i = 0; i < len; ++i)if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function $42b6ec563ee582ae$var$bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1;
    // Normalize byteOffset
    if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff;
    else if (byteOffset < -2147483648) byteOffset = -2147483648;
    byteOffset = +byteOffset // Coerce to Number.
    ;
    if ($42b6ec563ee582ae$var$numberIsNaN(byteOffset)) // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
    }
    // Normalize val
    if (typeof val === "string") val = $42b6ec563ee582ae$var$Buffer.from(val, encoding);
    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if ($42b6ec563ee582ae$var$Buffer.isBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) return -1;
        return $42b6ec563ee582ae$var$arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
        val = val & 0xFF // Search for a byte value [0-255]
        ;
        if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            else return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
        return $42b6ec563ee582ae$var$arrayIndexOf(buffer, [
            val
        ], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
}
function $42b6ec563ee582ae$var$arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) return -1;
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
        }
    }
    function read(buf, i) {
        if (indexSize === 1) return buf[i];
        else return buf.readUInt16BE(i * indexSize);
    }
    let i1;
    if (dir) {
        let foundIndex = -1;
        for(i1 = byteOffset; i1 < arrLength; i1++)if (read(arr, i1) === read(val, foundIndex === -1 ? 0 : i1 - foundIndex)) {
            if (foundIndex === -1) foundIndex = i1;
            if (i1 - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
            if (foundIndex !== -1) i1 -= i1 - foundIndex;
            foundIndex = -1;
        }
    } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for(i1 = byteOffset; i1 >= 0; i1--){
            let found = true;
            for(let j = 0; j < valLength; j++)if (read(arr, i1 + j) !== read(val, j)) {
                found = false;
                break;
            }
            if (found) return i1;
        }
    }
    return -1;
}
$42b6ec563ee582ae$var$Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
};
$42b6ec563ee582ae$var$Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return $42b6ec563ee582ae$var$bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
$42b6ec563ee582ae$var$Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return $42b6ec563ee582ae$var$bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function $42b6ec563ee582ae$var$hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) length = remaining;
    else {
        length = Number(length);
        if (length > remaining) length = remaining;
    }
    const strLen = string.length;
    if (length > strLen / 2) length = strLen / 2;
    let i;
    for(i = 0; i < length; ++i){
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if ($42b6ec563ee582ae$var$numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
    }
    return i;
}
function $42b6ec563ee582ae$var$utf8Write(buf, string, offset, length) {
    return $42b6ec563ee582ae$var$blitBuffer($42b6ec563ee582ae$var$utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function $42b6ec563ee582ae$var$asciiWrite(buf, string, offset, length) {
    return $42b6ec563ee582ae$var$blitBuffer($42b6ec563ee582ae$var$asciiToBytes(string), buf, offset, length);
}
function $42b6ec563ee582ae$var$base64Write(buf, string, offset, length) {
    return $42b6ec563ee582ae$var$blitBuffer($42b6ec563ee582ae$var$base64ToBytes(string), buf, offset, length);
}
function $42b6ec563ee582ae$var$ucs2Write(buf, string, offset, length) {
    return $42b6ec563ee582ae$var$blitBuffer($42b6ec563ee582ae$var$utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
$42b6ec563ee582ae$var$Buffer.prototype.write = function write(string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === undefined) encoding = "utf8";
        } else {
            encoding = length;
            length = undefined;
        }
    } else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    const remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    if (!encoding) encoding = "utf8";
    let loweredCase = false;
    for(;;)switch(encoding){
        case "hex":
            return $42b6ec563ee582ae$var$hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
            return $42b6ec563ee582ae$var$utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
            return $42b6ec563ee582ae$var$asciiWrite(this, string, offset, length);
        case "base64":
            // Warning: maxLength not taken into account in base64Write
            return $42b6ec563ee582ae$var$base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return $42b6ec563ee582ae$var$ucs2Write(this, string, offset, length);
        default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
    }
};
$42b6ec563ee582ae$var$Buffer.prototype.toJSON = function toJSON() {
    return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
    };
};
function $42b6ec563ee582ae$var$base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) return $2JE8i.fromByteArray(buf);
    else return $2JE8i.fromByteArray(buf.slice(start, end));
}
function $42b6ec563ee582ae$var$utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i = start;
    while(i < end){
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
        if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch(bytesPerSequence){
                case 1:
                    if (firstByte < 0x80) codePoint = firstByte;
                    break;
                case 2:
                    secondByte = buf[i + 1];
                    if ((secondByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
                        if (tempCodePoint > 0x7F) codePoint = tempCodePoint;
                    }
                    break;
                case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
                        if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) codePoint = tempCodePoint;
                    }
                    break;
                case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
                        if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) codePoint = tempCodePoint;
                    }
            }
        }
        if (codePoint === null) {
            // we did not generate a valid codePoint so insert a
            // replacement char (U+FFFD) and advance only 1 byte
            codePoint = 0xFFFD;
            bytesPerSequence = 1;
        } else if (codePoint > 0xFFFF) {
            // encode to utf16 (surrogate pair dance)
            codePoint -= 0x10000;
            res.push(codePoint >>> 10 & 0x3FF | 0xD800);
            codePoint = 0xDC00 | codePoint & 0x3FF;
        }
        res.push(codePoint);
        i += bytesPerSequence;
    }
    return $42b6ec563ee582ae$var$decodeCodePointsArray(res);
}
// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const $42b6ec563ee582ae$var$MAX_ARGUMENTS_LENGTH = 0x1000;
function $42b6ec563ee582ae$var$decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= $42b6ec563ee582ae$var$MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
    ;
    // Decode in chunks to avoid "call stack size exceeded".
    let res = "";
    let i = 0;
    while(i < len)res += String.fromCharCode.apply(String, codePoints.slice(i, i += $42b6ec563ee582ae$var$MAX_ARGUMENTS_LENGTH));
    return res;
}
function $42b6ec563ee582ae$var$asciiSlice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for(let i = start; i < end; ++i)ret += String.fromCharCode(buf[i] & 0x7F);
    return ret;
}
function $42b6ec563ee582ae$var$latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for(let i = start; i < end; ++i)ret += String.fromCharCode(buf[i]);
    return ret;
}
function $42b6ec563ee582ae$var$hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    let out = "";
    for(let i = start; i < end; ++i)out += $42b6ec563ee582ae$var$hexSliceLookupTable[buf[i]];
    return out;
}
function $42b6ec563ee582ae$var$utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = "";
    // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
    for(let i = 0; i < bytes.length - 1; i += 2)res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    return res;
}
$42b6ec563ee582ae$var$Buffer.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;
    if (start < 0) {
        start += len;
        if (start < 0) start = 0;
    } else if (start > len) start = len;
    if (end < 0) {
        end += len;
        if (end < 0) end = 0;
    } else if (end > len) end = len;
    if (end < start) end = start;
    const newBuf = this.subarray(start, end);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(newBuf, $42b6ec563ee582ae$var$Buffer.prototype);
    return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */ function $42b6ec563ee582ae$var$checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
    if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
}
$42b6ec563ee582ae$var$Buffer.prototype.readUintLE = $42b6ec563ee582ae$var$Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength1, noAssert) {
    offset = offset >>> 0;
    byteLength1 = byteLength1 >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, byteLength1, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while(++i < byteLength1 && (mul *= 0x100))val += this[offset + i] * mul;
    return val;
};
$42b6ec563ee582ae$var$Buffer.prototype.readUintBE = $42b6ec563ee582ae$var$Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, byteLength2, this.length);
    let val = this[offset + --byteLength2];
    let mul = 1;
    while(byteLength2 > 0 && (mul *= 0x100))val += this[offset + --byteLength2] * mul;
    return val;
};
$42b6ec563ee582ae$var$Buffer.prototype.readUint8 = $42b6ec563ee582ae$var$Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, 1, this.length);
    return this[offset];
};
$42b6ec563ee582ae$var$Buffer.prototype.readUint16LE = $42b6ec563ee582ae$var$Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
};
$42b6ec563ee582ae$var$Buffer.prototype.readUint16BE = $42b6ec563ee582ae$var$Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
};
$42b6ec563ee582ae$var$Buffer.prototype.readUint32LE = $42b6ec563ee582ae$var$Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};
$42b6ec563ee582ae$var$Buffer.prototype.readUint32BE = $42b6ec563ee582ae$var$Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, 4, this.length);
    return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};
$42b6ec563ee582ae$var$Buffer.prototype.readBigUInt64LE = $42b6ec563ee582ae$var$defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    $42b6ec563ee582ae$var$validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) $42b6ec563ee582ae$var$boundsError(offset, this.length - 8);
    const lo = first + this[++offset] * 256 + this[++offset] * 65536 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 256 + this[++offset] * 65536 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
});
$42b6ec563ee582ae$var$Buffer.prototype.readBigUInt64BE = $42b6ec563ee582ae$var$defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    $42b6ec563ee582ae$var$validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) $42b6ec563ee582ae$var$boundsError(offset, this.length - 8);
    const hi = first * 2 ** 24 + this[++offset] * 65536 + this[++offset] * 256 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 65536 + this[++offset] * 256 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
});
$42b6ec563ee582ae$var$Buffer.prototype.readIntLE = function readIntLE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, byteLength3, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while(++i < byteLength3 && (mul *= 0x100))val += this[offset + i] * mul;
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength3);
    return val;
};
$42b6ec563ee582ae$var$Buffer.prototype.readIntBE = function readIntBE(offset, byteLength4, noAssert) {
    offset = offset >>> 0;
    byteLength4 = byteLength4 >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, byteLength4, this.length);
    let i = byteLength4;
    let mul = 1;
    let val = this[offset + --i];
    while(i > 0 && (mul *= 0x100))val += this[offset + --i] * mul;
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength4);
    return val;
};
$42b6ec563ee582ae$var$Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return this[offset];
    return (0xff - this[offset] + 1) * -1;
};
$42b6ec563ee582ae$var$Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, 2, this.length);
    const val = this[offset] | this[offset + 1] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
$42b6ec563ee582ae$var$Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | this[offset] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
$42b6ec563ee582ae$var$Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};
$42b6ec563ee582ae$var$Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};
$42b6ec563ee582ae$var$Buffer.prototype.readBigInt64LE = $42b6ec563ee582ae$var$defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    $42b6ec563ee582ae$var$validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) $42b6ec563ee582ae$var$boundsError(offset, this.length - 8);
    const val = this[offset + 4] + this[offset + 5] * 256 + this[offset + 6] * 65536 + (last << 24 // Overflow
    );
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 256 + this[++offset] * 65536 + this[++offset] * 2 ** 24);
});
$42b6ec563ee582ae$var$Buffer.prototype.readBigInt64BE = $42b6ec563ee582ae$var$defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    $42b6ec563ee582ae$var$validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) $42b6ec563ee582ae$var$boundsError(offset, this.length - 8);
    const val = (first << 24) + this[++offset] * 65536 + this[++offset] * 256 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 65536 + this[++offset] * 256 + last);
});
$42b6ec563ee582ae$var$Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, 4, this.length);
    return $bgblM.read(this, offset, true, 23, 4);
};
$42b6ec563ee582ae$var$Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, 4, this.length);
    return $bgblM.read(this, offset, false, 23, 4);
};
$42b6ec563ee582ae$var$Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, 8, this.length);
    return $bgblM.read(this, offset, true, 52, 8);
};
$42b6ec563ee582ae$var$Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkOffset(offset, 8, this.length);
    return $bgblM.read(this, offset, false, 52, 8);
};
function $42b6ec563ee582ae$var$checkInt(buf, value, offset, ext, max, min) {
    if (!$42b6ec563ee582ae$var$Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
}
$42b6ec563ee582ae$var$Buffer.prototype.writeUintLE = $42b6ec563ee582ae$var$Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength5, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength5 = byteLength5 >>> 0;
    if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength5) - 1;
        $42b6ec563ee582ae$var$checkInt(this, value, offset, byteLength5, maxBytes, 0);
    }
    let mul = 1;
    let i = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength5 && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
    return offset + byteLength5;
};
$42b6ec563ee582ae$var$Buffer.prototype.writeUintBE = $42b6ec563ee582ae$var$Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength6, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength6 = byteLength6 >>> 0;
    if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength6) - 1;
        $42b6ec563ee582ae$var$checkInt(this, value, offset, byteLength6, maxBytes, 0);
    }
    let i = byteLength6 - 1;
    let mul = 1;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
    return offset + byteLength6;
};
$42b6ec563ee582ae$var$Buffer.prototype.writeUint8 = $42b6ec563ee582ae$var$Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkInt(this, value, offset, 1, 0xff, 0);
    this[offset] = value & 0xff;
    return offset + 1;
};
$42b6ec563ee582ae$var$Buffer.prototype.writeUint16LE = $42b6ec563ee582ae$var$Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
$42b6ec563ee582ae$var$Buffer.prototype.writeUint16BE = $42b6ec563ee582ae$var$Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
$42b6ec563ee582ae$var$Buffer.prototype.writeUint32LE = $42b6ec563ee582ae$var$Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
    return offset + 4;
};
$42b6ec563ee582ae$var$Buffer.prototype.writeUint32BE = $42b6ec563ee582ae$var$Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
function $42b6ec563ee582ae$var$wrtBigUInt64LE(buf, value, offset, min, max) {
    $42b6ec563ee582ae$var$checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(0xffffffff));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
}
function $42b6ec563ee582ae$var$wrtBigUInt64BE(buf, value, offset, min, max) {
    $42b6ec563ee582ae$var$checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(0xffffffff));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
}
$42b6ec563ee582ae$var$Buffer.prototype.writeBigUInt64LE = $42b6ec563ee582ae$var$defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return $42b6ec563ee582ae$var$wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
});
$42b6ec563ee582ae$var$Buffer.prototype.writeBigUInt64BE = $42b6ec563ee582ae$var$defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return $42b6ec563ee582ae$var$wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
});
$42b6ec563ee582ae$var$Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength7, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength7 - 1);
        $42b6ec563ee582ae$var$checkInt(this, value, offset, byteLength7, limit - 1, -limit);
    }
    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength7 && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) sub = 1;
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength7;
};
$42b6ec563ee582ae$var$Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength8, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength8 - 1);
        $42b6ec563ee582ae$var$checkInt(this, value, offset, byteLength8, limit - 1, -limit);
    }
    let i = byteLength8 - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) sub = 1;
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength8;
};
$42b6ec563ee582ae$var$Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkInt(this, value, offset, 1, 0x7f, -128);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = value & 0xff;
    return offset + 1;
};
$42b6ec563ee582ae$var$Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkInt(this, value, offset, 2, 0x7fff, -32768);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
$42b6ec563ee582ae$var$Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkInt(this, value, offset, 2, 0x7fff, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
$42b6ec563ee582ae$var$Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
};
$42b6ec563ee582ae$var$Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
    if (value < 0) value = 0xffffffff + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
$42b6ec563ee582ae$var$Buffer.prototype.writeBigInt64LE = $42b6ec563ee582ae$var$defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
    return $42b6ec563ee582ae$var$wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
$42b6ec563ee582ae$var$Buffer.prototype.writeBigInt64BE = $42b6ec563ee582ae$var$defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
    return $42b6ec563ee582ae$var$wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
function $42b6ec563ee582ae$var$checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
    if (offset < 0) throw new RangeError("Index out of range");
}
function $42b6ec563ee582ae$var$writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -340282346638528860000000000000000000000);
    $bgblM.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
}
$42b6ec563ee582ae$var$Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return $42b6ec563ee582ae$var$writeFloat(this, value, offset, true, noAssert);
};
$42b6ec563ee582ae$var$Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return $42b6ec563ee582ae$var$writeFloat(this, value, offset, false, noAssert);
};
function $42b6ec563ee582ae$var$writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $42b6ec563ee582ae$var$checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);
    $bgblM.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
}
$42b6ec563ee582ae$var$Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return $42b6ec563ee582ae$var$writeDouble(this, value, offset, true, noAssert);
};
$42b6ec563ee582ae$var$Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return $42b6ec563ee582ae$var$writeDouble(this, value, offset, false, noAssert);
};
// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
$42b6ec563ee582ae$var$Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!$42b6ec563ee582ae$var$Buffer.isBuffer(target)) throw new TypeError("argument should be a Buffer");
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    // Copy 0 bytes; we're done
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    // Fatal error conditions
    if (targetStart < 0) throw new RangeError("targetStart out of bounds");
    if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
    if (end < 0) throw new RangeError("sourceEnd out of bounds");
    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) end = target.length - targetStart + start;
    const len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end);
    else Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    return len;
};
// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
$42b6ec563ee582ae$var$Buffer.prototype.fill = function fill(val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === "string") {
        if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
        } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
        }
        if (encoding !== undefined && typeof encoding !== "string") throw new TypeError("encoding must be a string");
        if (typeof encoding === "string" && !$42b6ec563ee582ae$var$Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
        if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") // Fast path: If `val` fits into a single byte, use that numeric value.
            val = code;
        }
    } else if (typeof val === "number") val = val & 255;
    else if (typeof val === "boolean") val = Number(val);
    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
    if (end <= start) return this;
    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;
    if (!val) val = 0;
    let i;
    if (typeof val === "number") for(i = start; i < end; ++i)this[i] = val;
    else {
        const bytes = $42b6ec563ee582ae$var$Buffer.isBuffer(val) ? val : $42b6ec563ee582ae$var$Buffer.from(val, encoding);
        const len = bytes.length;
        if (len === 0) throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        for(i = 0; i < end - start; ++i)this[i + start] = bytes[i % len];
    }
    return this;
};
// CUSTOM ERRORS
// =============
// Simplified versions from Node, changed for Buffer-only usage
const $42b6ec563ee582ae$var$errors = {};
function $42b6ec563ee582ae$var$E(sym, getMessage, Base) {
    $42b6ec563ee582ae$var$errors[sym] = class NodeError extends Base {
        constructor(){
            super();
            Object.defineProperty(this, "message", {
                value: getMessage.apply(this, arguments),
                writable: true,
                configurable: true
            });
            // Add the error code to the name to include it in the stack trace.
            this.name = `${this.name} [${sym}]`;
            // Access the stack to generate the error message including the error code
            // from the name.
            this.stack // eslint-disable-line no-unused-expressions
            ;
            // Reset the name to the actual name.
            delete this.name;
        }
        get code() {
            return sym;
        }
        set code(value) {
            Object.defineProperty(this, "code", {
                configurable: true,
                enumerable: true,
                value: value,
                writable: true
            });
        }
        toString() {
            return `${this.name} [${sym}]: ${this.message}`;
        }
    };
}
$42b6ec563ee582ae$var$E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
    if (name) return `${name} is outside of buffer bounds`;
    return "Attempt to access memory outside buffer bounds";
}, RangeError);
$42b6ec563ee582ae$var$E("ERR_INVALID_ARG_TYPE", function(name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
}, TypeError);
$42b6ec563ee582ae$var$E("ERR_OUT_OF_RANGE", function(str, range, input) {
    let msg = `The value of "${str}" is out of range.`;
    let received = input;
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) received = $42b6ec563ee582ae$var$addNumericalSeparator(String(input));
    else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) received = $42b6ec563ee582ae$var$addNumericalSeparator(received);
        received += "n";
    }
    msg += ` It must be ${range}. Received ${received}`;
    return msg;
}, RangeError);
function $42b6ec563ee582ae$var$addNumericalSeparator(val) {
    let res = "";
    let i = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for(; i >= start + 4; i -= 3)res = `_${val.slice(i - 3, i)}${res}`;
    return `${val.slice(0, i)}${res}`;
}
// CHECK FUNCTIONS
// ===============
function $42b6ec563ee582ae$var$checkBounds(buf, offset, byteLength9) {
    $42b6ec563ee582ae$var$validateNumber(offset, "offset");
    if (buf[offset] === undefined || buf[offset + byteLength9] === undefined) $42b6ec563ee582ae$var$boundsError(offset, buf.length - (byteLength9 + 1));
}
function $42b6ec563ee582ae$var$checkIntBI(value, min, max, buf, offset, byteLength10) {
    if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength10 > 3) {
            if (min === 0 || min === BigInt(0)) range = `>= 0${n} and < 2${n} ** ${(byteLength10 + 1) * 8}${n}`;
            else range = `>= -(2${n} ** ${(byteLength10 + 1) * 8 - 1}${n}) and < 2 ** ` + `${(byteLength10 + 1) * 8 - 1}${n}`;
        } else range = `>= ${min}${n} and <= ${max}${n}`;
        throw new $42b6ec563ee582ae$var$errors.ERR_OUT_OF_RANGE("value", range, value);
    }
    $42b6ec563ee582ae$var$checkBounds(buf, offset, byteLength10);
}
function $42b6ec563ee582ae$var$validateNumber(value, name) {
    if (typeof value !== "number") throw new $42b6ec563ee582ae$var$errors.ERR_INVALID_ARG_TYPE(name, "number", value);
}
function $42b6ec563ee582ae$var$boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
        $42b6ec563ee582ae$var$validateNumber(value, type);
        throw new $42b6ec563ee582ae$var$errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
    }
    if (length < 0) throw new $42b6ec563ee582ae$var$errors.ERR_BUFFER_OUT_OF_BOUNDS();
    throw new $42b6ec563ee582ae$var$errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
}
// HELPER FUNCTIONS
// ================
const $42b6ec563ee582ae$var$INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function $42b6ec563ee582ae$var$base64clean(str) {
    // Node takes equal signs as end of the Base64 encoding
    str = str.split("=")[0];
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = str.trim().replace($42b6ec563ee582ae$var$INVALID_BASE64_RE, "");
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return "";
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while(str.length % 4 !== 0)str = str + "=";
    return str;
}
function $42b6ec563ee582ae$var$utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for(let i = 0; i < length; ++i){
        codePoint = string.charCodeAt(i);
        // is surrogate component
        if (codePoint > 0xD7FF && codePoint < 0xE000) {
            // last char was a lead
            if (!leadSurrogate) {
                // no lead yet
                if (codePoint > 0xDBFF) {
                    // unexpected trail
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                } else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                }
                // valid lead
                leadSurrogate = codePoint;
                continue;
            }
            // 2 leads in a row
            if (codePoint < 0xDC00) {
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                leadSurrogate = codePoint;
                continue;
            }
            // valid surrogate pair
            codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
        } else if (leadSurrogate) // valid bmp char, but last char was a lead
        {
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        }
        leadSurrogate = null;
        // encode utf8
        if (codePoint < 0x80) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
        } else if (codePoint < 0x800) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x10000) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x110000) {
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else throw new Error("Invalid code point");
    }
    return bytes;
}
function $42b6ec563ee582ae$var$asciiToBytes(str) {
    const byteArray = [];
    for(let i = 0; i < str.length; ++i)// Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
    return byteArray;
}
function $42b6ec563ee582ae$var$utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for(let i = 0; i < str.length; ++i){
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
    }
    return byteArray;
}
function $42b6ec563ee582ae$var$base64ToBytes(str) {
    return $2JE8i.toByteArray($42b6ec563ee582ae$var$base64clean(str));
}
function $42b6ec563ee582ae$var$blitBuffer(src, dst, offset, length) {
    let i;
    for(i = 0; i < length; ++i){
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
    }
    return i;
}
// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function $42b6ec563ee582ae$var$isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
}
function $42b6ec563ee582ae$var$numberIsNaN(obj) {
    // For IE11 support
    return obj !== obj // eslint-disable-line no-self-compare
    ;
}
// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const $42b6ec563ee582ae$var$hexSliceLookupTable = function() {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for(let i = 0; i < 16; ++i){
        const i16 = i * 16;
        for(let j = 0; j < 16; ++j)table[i16 + j] = alphabet[i] + alphabet[j];
    }
    return table;
}();
// Return not function with Error if BigInt not supported
function $42b6ec563ee582ae$var$defineBigIntMethod(fn) {
    return typeof BigInt === "undefined" ? $42b6ec563ee582ae$var$BufferBigIntNotDefined : fn;
}
function $42b6ec563ee582ae$var$BufferBigIntNotDefined() {
    throw new Error("BigInt not supported");
}

});
parcelRequire.register("2JE8i", function(module, exports) {

$parcel$export(module.exports, "toByteArray", () => $1fdeea49404bb0e7$export$d622b2ad8d90c771, (v) => $1fdeea49404bb0e7$export$d622b2ad8d90c771 = v);
$parcel$export(module.exports, "fromByteArray", () => $1fdeea49404bb0e7$export$6100ba28696e12de, (v) => $1fdeea49404bb0e7$export$6100ba28696e12de = v);
var $1fdeea49404bb0e7$export$a48f0734ac7c2329;
var $1fdeea49404bb0e7$export$d622b2ad8d90c771;
var $1fdeea49404bb0e7$export$6100ba28696e12de;
"use strict";
$1fdeea49404bb0e7$export$a48f0734ac7c2329 = $1fdeea49404bb0e7$var$byteLength;
$1fdeea49404bb0e7$export$d622b2ad8d90c771 = $1fdeea49404bb0e7$var$toByteArray;
$1fdeea49404bb0e7$export$6100ba28696e12de = $1fdeea49404bb0e7$var$fromByteArray;
var $1fdeea49404bb0e7$var$lookup = [];
var $1fdeea49404bb0e7$var$revLookup = [];
var $1fdeea49404bb0e7$var$Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var $1fdeea49404bb0e7$var$code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for(var $1fdeea49404bb0e7$var$i = 0, $1fdeea49404bb0e7$var$len = $1fdeea49404bb0e7$var$code.length; $1fdeea49404bb0e7$var$i < $1fdeea49404bb0e7$var$len; ++$1fdeea49404bb0e7$var$i){
    $1fdeea49404bb0e7$var$lookup[$1fdeea49404bb0e7$var$i] = $1fdeea49404bb0e7$var$code[$1fdeea49404bb0e7$var$i];
    $1fdeea49404bb0e7$var$revLookup[$1fdeea49404bb0e7$var$code.charCodeAt($1fdeea49404bb0e7$var$i)] = $1fdeea49404bb0e7$var$i;
}
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
$1fdeea49404bb0e7$var$revLookup["-".charCodeAt(0)] = 62;
$1fdeea49404bb0e7$var$revLookup["_".charCodeAt(0)] = 63;
function $1fdeea49404bb0e7$var$getLens(b64) {
    var len1 = b64.length;
    if (len1 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len1;
    var placeHoldersLen = validLen === len1 ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
// base64 is 4/3 + up to two characters of the original data
function $1fdeea49404bb0e7$var$byteLength(b64) {
    var lens = $1fdeea49404bb0e7$var$getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function $1fdeea49404bb0e7$var$_byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function $1fdeea49404bb0e7$var$toByteArray(b64) {
    var tmp;
    var lens = $1fdeea49404bb0e7$var$getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new $1fdeea49404bb0e7$var$Arr($1fdeea49404bb0e7$var$_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    // if there are placeholders, only get up to the last complete 4 chars
    var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i1;
    for(i1 = 0; i1 < len2; i1 += 4){
        tmp = $1fdeea49404bb0e7$var$revLookup[b64.charCodeAt(i1)] << 18 | $1fdeea49404bb0e7$var$revLookup[b64.charCodeAt(i1 + 1)] << 12 | $1fdeea49404bb0e7$var$revLookup[b64.charCodeAt(i1 + 2)] << 6 | $1fdeea49404bb0e7$var$revLookup[b64.charCodeAt(i1 + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 2) {
        tmp = $1fdeea49404bb0e7$var$revLookup[b64.charCodeAt(i1)] << 2 | $1fdeea49404bb0e7$var$revLookup[b64.charCodeAt(i1 + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 1) {
        tmp = $1fdeea49404bb0e7$var$revLookup[b64.charCodeAt(i1)] << 10 | $1fdeea49404bb0e7$var$revLookup[b64.charCodeAt(i1 + 1)] << 4 | $1fdeea49404bb0e7$var$revLookup[b64.charCodeAt(i1 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    return arr;
}
function $1fdeea49404bb0e7$var$tripletToBase64(num) {
    return $1fdeea49404bb0e7$var$lookup[num >> 18 & 0x3F] + $1fdeea49404bb0e7$var$lookup[num >> 12 & 0x3F] + $1fdeea49404bb0e7$var$lookup[num >> 6 & 0x3F] + $1fdeea49404bb0e7$var$lookup[num & 0x3F];
}
function $1fdeea49404bb0e7$var$encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i2 = start; i2 < end; i2 += 3){
        tmp = (uint8[i2] << 16 & 0xFF0000) + (uint8[i2 + 1] << 8 & 0xFF00) + (uint8[i2 + 2] & 0xFF);
        output.push($1fdeea49404bb0e7$var$tripletToBase64(tmp));
    }
    return output.join("");
}
function $1fdeea49404bb0e7$var$fromByteArray(uint8) {
    var tmp;
    var len3 = uint8.length;
    var extraBytes = len3 % 3 // if we have 1 byte left, pad 2 bytes
    ;
    var parts = [];
    var maxChunkLength = 16383 // must be multiple of 3
    ;
    // go through the array every three bytes, we'll deal with trailing stuff later
    for(var i3 = 0, len2 = len3 - extraBytes; i3 < len2; i3 += maxChunkLength)parts.push($1fdeea49404bb0e7$var$encodeChunk(uint8, i3, i3 + maxChunkLength > len2 ? len2 : i3 + maxChunkLength));
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
        tmp = uint8[len3 - 1];
        parts.push($1fdeea49404bb0e7$var$lookup[tmp >> 2] + $1fdeea49404bb0e7$var$lookup[tmp << 4 & 0x3F] + "==");
    } else if (extraBytes === 2) {
        tmp = (uint8[len3 - 2] << 8) + uint8[len3 - 1];
        parts.push($1fdeea49404bb0e7$var$lookup[tmp >> 10] + $1fdeea49404bb0e7$var$lookup[tmp >> 4 & 0x3F] + $1fdeea49404bb0e7$var$lookup[tmp << 2 & 0x3F] + "=");
    }
    return parts.join("");
}

});

parcelRequire.register("bgblM", function(module, exports) {

$parcel$export(module.exports, "read", () => $8329fe3e9111d190$export$aafa59e2e03f2942, (v) => $8329fe3e9111d190$export$aafa59e2e03f2942 = v);
$parcel$export(module.exports, "write", () => $8329fe3e9111d190$export$68d8715fc104d294, (v) => $8329fe3e9111d190$export$68d8715fc104d294 = v);
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ var $8329fe3e9111d190$export$aafa59e2e03f2942;
var $8329fe3e9111d190$export$68d8715fc104d294;
$8329fe3e9111d190$export$aafa59e2e03f2942 = function(buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for(; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for(; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);
    if (e === 0) e = 1 - eBias;
    else if (e === eMax) return m ? NaN : (s ? -1 : 1) * Infinity;
    else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
$8329fe3e9111d190$export$68d8715fc104d294 = function(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
    } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
        }
        if (e + eBias >= 1) value += rt / c;
        else value += rt * Math.pow(2, 1 - eBias);
        if (value * c >= 2) {
            e++;
            c /= 2;
        }
        if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
        } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
        } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
        }
    }
    for(; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);
    e = e << mLen | m;
    eLen += mLen;
    for(; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);
    buffer[offset + i - d] |= s * 128;
};

});



parcelRequire.register("ak5fG", function(module, exports) {

$parcel$export(module.exports, "default", () => $783fd89359b02473$export$2e2bcd8739ae039, (v) => $783fd89359b02473$export$2e2bcd8739ae039 = v);
var $783fd89359b02473$export$1e511d4a378977f5;
var $783fd89359b02473$export$2e2bcd8739ae039;
"use strict";

var $5J7r5 = parcelRequire("5J7r5");
var $783fd89359b02473$require$Buffer = $5J7r5.Buffer;
$783fd89359b02473$export$1e511d4a378977f5 = true;

var $i6riQ = parcelRequire("i6riQ");
var $783fd89359b02473$var$Tag = 0x05;
function $783fd89359b02473$var$asUInt16BE(value) {
    var b = $783fd89359b02473$require$Buffer.alloc(2);
    b.writeUInt16BE(value, 0);
    return b;
}
var $783fd89359b02473$var$initialAcc = {
    data: $783fd89359b02473$require$Buffer.alloc(0),
    dataLength: 0,
    sequence: 0
};
/**
 *
 */ var $783fd89359b02473$var$createHIDframing = function(channel, packetSize) {
    return {
        makeBlocks: function(apdu) {
            var data = $783fd89359b02473$require$Buffer.concat([
                $783fd89359b02473$var$asUInt16BE(apdu.length),
                apdu
            ]);
            var blockSize = packetSize - 5;
            var nbBlocks = Math.ceil(data.length / blockSize);
            data = $783fd89359b02473$require$Buffer.concat([
                data,
                $783fd89359b02473$require$Buffer.alloc(nbBlocks * blockSize - data.length + 1).fill(0), 
            ]);
            var blocks = [];
            for(var i = 0; i < nbBlocks; i++){
                var head = $783fd89359b02473$require$Buffer.alloc(5);
                head.writeUInt16BE(channel, 0);
                head.writeUInt8($783fd89359b02473$var$Tag, 2);
                head.writeUInt16BE(i, 3);
                var chunk = data.slice(i * blockSize, (i + 1) * blockSize);
                blocks.push($783fd89359b02473$require$Buffer.concat([
                    head,
                    chunk
                ]));
            }
            return blocks;
        },
        reduceResponse: function(acc, chunk) {
            var _a = acc || $783fd89359b02473$var$initialAcc, data = _a.data, dataLength = _a.dataLength, sequence = _a.sequence;
            if (chunk.readUInt16BE(0) !== channel) throw new $i6riQ.TransportError("Invalid channel", "InvalidChannel");
            if (chunk.readUInt8(2) !== $783fd89359b02473$var$Tag) throw new $i6riQ.TransportError("Invalid tag", "InvalidTag");
            if (chunk.readUInt16BE(3) !== sequence) throw new $i6riQ.TransportError("Invalid sequence", "InvalidSequence");
            if (!acc) dataLength = chunk.readUInt16BE(5);
            sequence++;
            var chunkData = chunk.slice(acc ? 5 : 7);
            data = $783fd89359b02473$require$Buffer.concat([
                data,
                chunkData
            ]);
            if (data.length > dataLength) data = data.slice(0, dataLength);
            return {
                data: data,
                dataLength: dataLength,
                sequence: sequence
            };
        },
        getReducedResult: function(acc) {
            if (acc && acc.dataLength === acc.data.length) return acc.data;
        }
    };
};
$783fd89359b02473$export$2e2bcd8739ae039 = $783fd89359b02473$var$createHIDframing;

});

parcelRequire.register("2XWm1", function(module, exports) {

$parcel$export(module.exports, "ledgerUSBVendorId", () => $228e5b63b1144599$export$268c42a4ddec87f3, (v) => $228e5b63b1144599$export$268c42a4ddec87f3 = v);
$parcel$export(module.exports, "identifyUSBProductId", () => $228e5b63b1144599$export$df8f4444a7c73154, (v) => $228e5b63b1144599$export$df8f4444a7c73154 = v);

var $lPJ3N = parcelRequire("lPJ3N");
var $228e5b63b1144599$var$__assign = undefined && undefined.__assign || function() {
    $228e5b63b1144599$var$__assign = Object.assign || function(t) {
        for(var s, i1 = 1, n = arguments.length; i1 < n; i1++){
            s = arguments[i1];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $228e5b63b1144599$var$__assign.apply(this, arguments);
};
var $228e5b63b1144599$var$_a;
var $228e5b63b1144599$export$36f742de2ed7d90b = 0x01;
var $228e5b63b1144599$export$54bc2e040474338c = 0x02;
var $228e5b63b1144599$export$9368aec5a4b02506 = 0x04;
var $228e5b63b1144599$export$95f5e559ebc551b3 = 0x08;
var $228e5b63b1144599$export$18b064749618be01 = 0x10;
var $228e5b63b1144599$export$b8d24b2c0d9c5549;
(function(DeviceModelId1) {
    DeviceModelId1["blue"] = "blue";
    DeviceModelId1["nanoS"] = "nanoS";
    DeviceModelId1["nanoSP"] = "nanoSP";
    DeviceModelId1["nanoX"] = "nanoX";
    DeviceModelId1["nanoFTS"] = "nanoFTS";
})($228e5b63b1144599$export$b8d24b2c0d9c5549 || ($228e5b63b1144599$export$b8d24b2c0d9c5549 = {}));
var $228e5b63b1144599$var$devices = ($228e5b63b1144599$var$_a = {}, $228e5b63b1144599$var$_a[$228e5b63b1144599$export$b8d24b2c0d9c5549.blue] = {
    id: $228e5b63b1144599$export$b8d24b2c0d9c5549.blue,
    productName: "Ledger\xa0Blue",
    productIdMM: 0x00,
    legacyUsbProductId: 0x0000,
    usbOnly: true,
    memorySize: 491520,
    masks: [
        0x31000000,
        0x31010000
    ],
    getBlockSize: function(_firwareVersion) {
        return 4096;
    }
}, $228e5b63b1144599$var$_a[$228e5b63b1144599$export$b8d24b2c0d9c5549.nanoS] = {
    id: $228e5b63b1144599$export$b8d24b2c0d9c5549.nanoS,
    productName: "Ledger\xa0Nano\xa0S",
    productIdMM: 0x10,
    legacyUsbProductId: 0x0001,
    usbOnly: true,
    memorySize: 327680,
    masks: [
        0x31100000
    ],
    getBlockSize: function(firmwareVersion) {
        var _a1;
        return (0, (/*@__PURE__*/$parcel$interopDefault($lPJ3N))).lt((_a1 = (0, (/*@__PURE__*/$parcel$interopDefault($lPJ3N))).coerce(firmwareVersion)) !== null && _a1 !== void 0 ? _a1 : "", "2.0.0") ? 4096 : 2048;
    }
}, $228e5b63b1144599$var$_a[$228e5b63b1144599$export$b8d24b2c0d9c5549.nanoSP] = {
    id: $228e5b63b1144599$export$b8d24b2c0d9c5549.nanoSP,
    productName: "Ledger Nano S Plus",
    productIdMM: 0x50,
    legacyUsbProductId: 0x0005,
    usbOnly: true,
    memorySize: 1572864,
    masks: [
        0x33100000
    ],
    getBlockSize: function(_firmwareVersion) {
        return 32;
    }
}, $228e5b63b1144599$var$_a[$228e5b63b1144599$export$b8d24b2c0d9c5549.nanoX] = {
    id: $228e5b63b1144599$export$b8d24b2c0d9c5549.nanoX,
    productName: "Ledger\xa0Nano\xa0X",
    productIdMM: 0x40,
    legacyUsbProductId: 0x0004,
    usbOnly: false,
    memorySize: 2097152,
    masks: [
        0x33000000
    ],
    getBlockSize: function(_firwareVersion) {
        return 4096;
    },
    bluetoothSpec: [
        {
            serviceUuid: "13d63400-2c97-0004-0000-4c6564676572",
            notifyUuid: "13d63400-2c97-0004-0001-4c6564676572",
            writeUuid: "13d63400-2c97-0004-0002-4c6564676572",
            writeCmdUuid: "13d63400-2c97-0004-0003-4c6564676572"
        }, 
    ]
}, $228e5b63b1144599$var$_a[$228e5b63b1144599$export$b8d24b2c0d9c5549.nanoFTS] = {
    id: $228e5b63b1144599$export$b8d24b2c0d9c5549.nanoFTS,
    productName: "Ledger\xa0Nano\xa0FTS",
    productIdMM: 0x60,
    legacyUsbProductId: 0x0006,
    usbOnly: false,
    memorySize: 2097152,
    masks: [
        0x33200000
    ],
    getBlockSize: function(_firwareVersion) {
        return 4096;
    },
    bluetoothSpec: [
        {
            serviceUuid: "13d63400-2c97-6004-0000-4c6564676572",
            notifyUuid: "13d63400-2c97-6004-0001-4c6564676572",
            writeUuid: "13d63400-2c97-6004-0002-4c6564676572",
            writeCmdUuid: "13d63400-2c97-6004-0003-4c6564676572"
        }, 
    ]
}, $228e5b63b1144599$var$_a);
var $228e5b63b1144599$var$productMap = {
    Blue: $228e5b63b1144599$export$b8d24b2c0d9c5549.blue,
    "Nano S": $228e5b63b1144599$export$b8d24b2c0d9c5549.nanoS,
    "Nano S Plus": $228e5b63b1144599$export$b8d24b2c0d9c5549.nanoSP,
    "Nano X": $228e5b63b1144599$export$b8d24b2c0d9c5549.nanoX,
    "Nano FTS": $228e5b63b1144599$export$b8d24b2c0d9c5549.nanoFTS
};
var $228e5b63b1144599$var$devicesList = Object.values($228e5b63b1144599$var$devices);
var $228e5b63b1144599$export$268c42a4ddec87f3 = 0x2c97;
var $228e5b63b1144599$export$289d48518583cbd7 = function(id1) {
    var info = $228e5b63b1144599$var$devices[id1];
    if (!info) throw new Error("device '" + id1 + "' does not exist");
    return info;
};
var $228e5b63b1144599$export$f656be11ec4fd95b = function(targetId) {
    var deviceModel1 = $228e5b63b1144599$var$devicesList.find(function(_a2) {
        var masks = _a2.masks;
        return masks.find(function(mask) {
            return (targetId & 0xffff0000) === mask;
        });
    });
    return deviceModel1;
};
var $228e5b63b1144599$export$df8f4444a7c73154 = function(usbProductId) {
    var legacy = $228e5b63b1144599$var$devicesList.find(function(d) {
        return d.legacyUsbProductId === usbProductId;
    });
    if (legacy) return legacy;
    var mm = usbProductId >> 8;
    var deviceModel2 = $228e5b63b1144599$var$devicesList.find(function(d) {
        return d.productIdMM === mm;
    });
    return deviceModel2;
};
var $228e5b63b1144599$export$dce0906e1912b553 = function(productName) {
    var deviceModel3 = $228e5b63b1144599$var$devicesList.find(function(d) {
        return d.id === $228e5b63b1144599$var$productMap[productName];
    });
    return deviceModel3;
};
var $228e5b63b1144599$var$bluetoothServices = [];
var $228e5b63b1144599$var$serviceUuidToInfos = {};
for(var $228e5b63b1144599$var$id in $228e5b63b1144599$var$devices){
    var $228e5b63b1144599$var$deviceModel = $228e5b63b1144599$var$devices[$228e5b63b1144599$var$id];
    var $228e5b63b1144599$var$bluetoothSpec = $228e5b63b1144599$var$deviceModel.bluetoothSpec;
    if ($228e5b63b1144599$var$bluetoothSpec) for(var $228e5b63b1144599$var$i = 0; $228e5b63b1144599$var$i < $228e5b63b1144599$var$bluetoothSpec.length; $228e5b63b1144599$var$i++){
        var $228e5b63b1144599$var$spec = $228e5b63b1144599$var$bluetoothSpec[$228e5b63b1144599$var$i];
        $228e5b63b1144599$var$bluetoothServices.push($228e5b63b1144599$var$spec.serviceUuid);
        $228e5b63b1144599$var$serviceUuidToInfos[$228e5b63b1144599$var$spec.serviceUuid] = $228e5b63b1144599$var$serviceUuidToInfos[$228e5b63b1144599$var$spec.serviceUuid.replace(/-/g, "")] = $228e5b63b1144599$var$__assign({
            deviceModel: $228e5b63b1144599$var$deviceModel
        }, $228e5b63b1144599$var$spec);
    }
}
var $228e5b63b1144599$export$1f1251c1c71d84cf = function() {
    return $228e5b63b1144599$var$bluetoothServices;
};
var $228e5b63b1144599$export$8c98567a3882f79e = function(uuid) {
    return $228e5b63b1144599$var$serviceUuidToInfos[uuid.toLowerCase()];
};

});
parcelRequire.register("lPJ3N", function(module, exports) {

var $4ezl4 = parcelRequire("4ezl4");









































module.exports = {
    re: $4ezl4.re,
    src: $4ezl4.src,
    tokens: $4ezl4.t,
    SEMVER_SPEC_VERSION: (parcelRequire("igzQs")).SEMVER_SPEC_VERSION,
    SemVer: (parcelRequire("jBDeE")),
    compareIdentifiers: (parcelRequire("7fDri")).compareIdentifiers,
    rcompareIdentifiers: (parcelRequire("7fDri")).rcompareIdentifiers,
    parse: (parcelRequire("6Ab84")),
    valid: (parcelRequire("9fJPG")),
    clean: (parcelRequire("kPDUX")),
    inc: (parcelRequire("99YOa")),
    diff: (parcelRequire("ggyFO")),
    major: (parcelRequire("lQWu3")),
    minor: (parcelRequire("eYJxJ")),
    patch: (parcelRequire("crsqN")),
    prerelease: (parcelRequire("1TtsU")),
    compare: (parcelRequire("ewsTG")),
    rcompare: (parcelRequire("l5CCr")),
    compareLoose: (parcelRequire("fZUW6")),
    compareBuild: (parcelRequire("cI52P")),
    sort: (parcelRequire("ggjnj")),
    rsort: (parcelRequire("eTVFP")),
    gt: (parcelRequire("7LHti")),
    lt: (parcelRequire("3h2Uq")),
    eq: (parcelRequire("8nYVY")),
    neq: (parcelRequire("5VHiU")),
    gte: (parcelRequire("3rcex")),
    lte: (parcelRequire("1T6D1")),
    cmp: (parcelRequire("8NqXy")),
    coerce: (parcelRequire("3qA2u")),
    Comparator: (parcelRequire("8LvkC")),
    Range: (parcelRequire("9TL8u")),
    satisfies: (parcelRequire("2T0n0")),
    toComparators: (parcelRequire("i1nVZ")),
    maxSatisfying: (parcelRequire("k2PxJ")),
    minSatisfying: (parcelRequire("bBjqu")),
    minVersion: (parcelRequire("cjeSI")),
    validRange: (parcelRequire("9u3Cv")),
    outside: (parcelRequire("l90bp")),
    gtr: (parcelRequire("gNrMi")),
    ltr: (parcelRequire("aflPG")),
    intersects: (parcelRequire("eqNDh")),
    simplifyRange: (parcelRequire("aWoAb")),
    subset: (parcelRequire("6XZpA"))
};

});
parcelRequire.register("4ezl4", function(module, exports) {

var $igzQs = parcelRequire("igzQs");
var $3153e1cd2fdf5159$require$MAX_SAFE_COMPONENT_LENGTH = $igzQs.MAX_SAFE_COMPONENT_LENGTH;

var $bz8x9 = parcelRequire("bz8x9");
exports = module.exports = {};
// The actual regexps go on exports.re
const re = exports.re = [];
const src = exports.src = [];
const t = exports.t = {};
let R = 0;
const createToken = (name, value, isGlobal)=>{
    const index = R++;
    $bz8x9(name, index, value);
    t[name] = index;
    src[index] = value;
    re[index] = new RegExp(value, isGlobal ? "g" : undefined);
};
// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.
// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.
createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+");
// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.
createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
// ## Main Version
// Three dot-separated numeric identifiers.
createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})`);
createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})`);
// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.
createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.
createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.
createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+");
// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.
createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.
// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.
createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
createToken("FULL", `^${src[t.FULLPLAIN]}$`);
// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
createToken("GTLT", "((?:<|>)?=?)");
// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?` + `)?)?`);
createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?` + `)?)?`);
createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${$3153e1cd2fdf5159$require$MAX_SAFE_COMPONENT_LENGTH}})` + `(?:\\.(\\d{1,${$3153e1cd2fdf5159$require$MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:\\.(\\d{1,${$3153e1cd2fdf5159$require$MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:$|[^\\d])`);
createToken("COERCERTL", src[t.COERCE], true);
// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken("LONETILDE", "(?:~>?)");
createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
exports.tildeTrimReplace = "$1~";
createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken("LONECARET", "(?:\\^)");
createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
exports.caretTrimReplace = "$1^";
createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
exports.comparatorTrimReplace = "$1$2$3";
// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAIN]})` + `\\s*$`);
createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAINLOOSE]})` + `\\s*$`);
// Star ranges basically just allow anything at all.
createToken("STAR", "(<|>)?=?\\s*\\*");
// >=0.0.0 is like a star
createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");

});
parcelRequire.register("igzQs", function(module, exports) {
// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const $d4c586b40b129d7e$var$SEMVER_SPEC_VERSION = "2.0.0";
const $d4c586b40b129d7e$var$MAX_LENGTH = 256;
const $d4c586b40b129d7e$var$MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */ 9007199254740991;
// Max safe segment length for coercion.
const $d4c586b40b129d7e$var$MAX_SAFE_COMPONENT_LENGTH = 16;
module.exports = {
    SEMVER_SPEC_VERSION: $d4c586b40b129d7e$var$SEMVER_SPEC_VERSION,
    MAX_LENGTH: $d4c586b40b129d7e$var$MAX_LENGTH,
    MAX_SAFE_INTEGER: $d4c586b40b129d7e$var$MAX_SAFE_INTEGER,
    MAX_SAFE_COMPONENT_LENGTH: $d4c586b40b129d7e$var$MAX_SAFE_COMPONENT_LENGTH
};

});

parcelRequire.register("bz8x9", function(module, exports) {

var $2RHHg = parcelRequire("2RHHg");
const $86b99534f52e22ec$var$debug = typeof $2RHHg === "object" && $2RHHg.env && undefined && /\bsemver\b/i.test(undefined) ? (...args)=>console.error("SEMVER", ...args) : ()=>{};
module.exports = $86b99534f52e22ec$var$debug;

});
parcelRequire.register("2RHHg", function(module, exports) {
// shim for using process in browser
var $21626d4c9ac542e3$var$process = module.exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var $21626d4c9ac542e3$var$cachedSetTimeout;
var $21626d4c9ac542e3$var$cachedClearTimeout;
function $21626d4c9ac542e3$var$defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
}
function $21626d4c9ac542e3$var$defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
}
(function() {
    try {
        if (typeof setTimeout === "function") $21626d4c9ac542e3$var$cachedSetTimeout = setTimeout;
        else $21626d4c9ac542e3$var$cachedSetTimeout = $21626d4c9ac542e3$var$defaultSetTimout;
    } catch (e) {
        $21626d4c9ac542e3$var$cachedSetTimeout = $21626d4c9ac542e3$var$defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === "function") $21626d4c9ac542e3$var$cachedClearTimeout = clearTimeout;
        else $21626d4c9ac542e3$var$cachedClearTimeout = $21626d4c9ac542e3$var$defaultClearTimeout;
    } catch (e1) {
        $21626d4c9ac542e3$var$cachedClearTimeout = $21626d4c9ac542e3$var$defaultClearTimeout;
    }
})();
function $21626d4c9ac542e3$var$runTimeout(fun) {
    if ($21626d4c9ac542e3$var$cachedSetTimeout === setTimeout) //normal enviroments in sane situations
    return setTimeout(fun, 0);
    // if setTimeout wasn't available but was latter defined
    if (($21626d4c9ac542e3$var$cachedSetTimeout === $21626d4c9ac542e3$var$defaultSetTimout || !$21626d4c9ac542e3$var$cachedSetTimeout) && setTimeout) {
        $21626d4c9ac542e3$var$cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return $21626d4c9ac542e3$var$cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return $21626d4c9ac542e3$var$cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return $21626d4c9ac542e3$var$cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function $21626d4c9ac542e3$var$runClearTimeout(marker) {
    if ($21626d4c9ac542e3$var$cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
    return clearTimeout(marker);
    // if clearTimeout wasn't available but was latter defined
    if (($21626d4c9ac542e3$var$cachedClearTimeout === $21626d4c9ac542e3$var$defaultClearTimeout || !$21626d4c9ac542e3$var$cachedClearTimeout) && clearTimeout) {
        $21626d4c9ac542e3$var$cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return $21626d4c9ac542e3$var$cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return $21626d4c9ac542e3$var$cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return $21626d4c9ac542e3$var$cachedClearTimeout.call(this, marker);
        }
    }
}
var $21626d4c9ac542e3$var$queue = [];
var $21626d4c9ac542e3$var$draining = false;
var $21626d4c9ac542e3$var$currentQueue;
var $21626d4c9ac542e3$var$queueIndex = -1;
function $21626d4c9ac542e3$var$cleanUpNextTick() {
    if (!$21626d4c9ac542e3$var$draining || !$21626d4c9ac542e3$var$currentQueue) return;
    $21626d4c9ac542e3$var$draining = false;
    if ($21626d4c9ac542e3$var$currentQueue.length) $21626d4c9ac542e3$var$queue = $21626d4c9ac542e3$var$currentQueue.concat($21626d4c9ac542e3$var$queue);
    else $21626d4c9ac542e3$var$queueIndex = -1;
    if ($21626d4c9ac542e3$var$queue.length) $21626d4c9ac542e3$var$drainQueue();
}
function $21626d4c9ac542e3$var$drainQueue() {
    if ($21626d4c9ac542e3$var$draining) return;
    var timeout = $21626d4c9ac542e3$var$runTimeout($21626d4c9ac542e3$var$cleanUpNextTick);
    $21626d4c9ac542e3$var$draining = true;
    var len = $21626d4c9ac542e3$var$queue.length;
    while(len){
        $21626d4c9ac542e3$var$currentQueue = $21626d4c9ac542e3$var$queue;
        $21626d4c9ac542e3$var$queue = [];
        while(++$21626d4c9ac542e3$var$queueIndex < len)if ($21626d4c9ac542e3$var$currentQueue) $21626d4c9ac542e3$var$currentQueue[$21626d4c9ac542e3$var$queueIndex].run();
        $21626d4c9ac542e3$var$queueIndex = -1;
        len = $21626d4c9ac542e3$var$queue.length;
    }
    $21626d4c9ac542e3$var$currentQueue = null;
    $21626d4c9ac542e3$var$draining = false;
    $21626d4c9ac542e3$var$runClearTimeout(timeout);
}
$21626d4c9ac542e3$var$process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    $21626d4c9ac542e3$var$queue.push(new $21626d4c9ac542e3$var$Item(fun, args));
    if ($21626d4c9ac542e3$var$queue.length === 1 && !$21626d4c9ac542e3$var$draining) $21626d4c9ac542e3$var$runTimeout($21626d4c9ac542e3$var$drainQueue);
};
// v8 likes predictible objects
function $21626d4c9ac542e3$var$Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
$21626d4c9ac542e3$var$Item.prototype.run = function() {
    this.fun.apply(null, this.array);
};
$21626d4c9ac542e3$var$process.title = "browser";
$21626d4c9ac542e3$var$process.browser = true;
$21626d4c9ac542e3$var$process.env = {};
$21626d4c9ac542e3$var$process.argv = [];
$21626d4c9ac542e3$var$process.version = ""; // empty string to avoid regexp issues
$21626d4c9ac542e3$var$process.versions = {};
function $21626d4c9ac542e3$var$noop() {}
$21626d4c9ac542e3$var$process.on = $21626d4c9ac542e3$var$noop;
$21626d4c9ac542e3$var$process.addListener = $21626d4c9ac542e3$var$noop;
$21626d4c9ac542e3$var$process.once = $21626d4c9ac542e3$var$noop;
$21626d4c9ac542e3$var$process.off = $21626d4c9ac542e3$var$noop;
$21626d4c9ac542e3$var$process.removeListener = $21626d4c9ac542e3$var$noop;
$21626d4c9ac542e3$var$process.removeAllListeners = $21626d4c9ac542e3$var$noop;
$21626d4c9ac542e3$var$process.emit = $21626d4c9ac542e3$var$noop;
$21626d4c9ac542e3$var$process.prependListener = $21626d4c9ac542e3$var$noop;
$21626d4c9ac542e3$var$process.prependOnceListener = $21626d4c9ac542e3$var$noop;
$21626d4c9ac542e3$var$process.listeners = function(name) {
    return [];
};
$21626d4c9ac542e3$var$process.binding = function(name) {
    throw new Error("process.binding is not supported");
};
$21626d4c9ac542e3$var$process.cwd = function() {
    return "/";
};
$21626d4c9ac542e3$var$process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
};
$21626d4c9ac542e3$var$process.umask = function() {
    return 0;
};

});



parcelRequire.register("jBDeE", function(module, exports) {

var $bz8x9 = parcelRequire("bz8x9");

var $igzQs = parcelRequire("igzQs");
var $e45fe85a9617aa2f$require$MAX_LENGTH = $igzQs.MAX_LENGTH;
var $e45fe85a9617aa2f$require$MAX_SAFE_INTEGER = $igzQs.MAX_SAFE_INTEGER;

var $4ezl4 = parcelRequire("4ezl4");
var $e45fe85a9617aa2f$require$re = $4ezl4.re;
var $e45fe85a9617aa2f$require$t = $4ezl4.t;

var $8xTVe = parcelRequire("8xTVe");

var $7fDri = parcelRequire("7fDri");
var $e45fe85a9617aa2f$require$compareIdentifiers = $7fDri.compareIdentifiers;
class $e45fe85a9617aa2f$var$SemVer {
    constructor(version, options){
        options = $8xTVe(options);
        if (version instanceof $e45fe85a9617aa2f$var$SemVer) {
            if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) return version;
            else version = version.version;
        } else if (typeof version !== "string") throw new TypeError(`Invalid Version: ${version}`);
        if (version.length > $e45fe85a9617aa2f$require$MAX_LENGTH) throw new TypeError(`version is longer than ${$e45fe85a9617aa2f$require$MAX_LENGTH} characters`);
        $bz8x9("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        // this isn't actually relevant for versions, but keep it so that we
        // don't run into trouble passing this.options around.
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? $e45fe85a9617aa2f$require$re[$e45fe85a9617aa2f$require$t.LOOSE] : $e45fe85a9617aa2f$require$re[$e45fe85a9617aa2f$require$t.FULL]);
        if (!m) throw new TypeError(`Invalid Version: ${version}`);
        this.raw = version;
        // these are actually numbers
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > $e45fe85a9617aa2f$require$MAX_SAFE_INTEGER || this.major < 0) throw new TypeError("Invalid major version");
        if (this.minor > $e45fe85a9617aa2f$require$MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError("Invalid minor version");
        if (this.patch > $e45fe85a9617aa2f$require$MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError("Invalid patch version");
        // numberify any prerelease numeric ids
        if (!m[4]) this.prerelease = [];
        else this.prerelease = m[4].split(".").map((id)=>{
            if (/^[0-9]+$/.test(id)) {
                const num = +id;
                if (num >= 0 && num < $e45fe85a9617aa2f$require$MAX_SAFE_INTEGER) return num;
            }
            return id;
        });
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
    }
    format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) this.version += `-${this.prerelease.join(".")}`;
        return this.version;
    }
    toString() {
        return this.version;
    }
    compare(other) {
        $bz8x9("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof $e45fe85a9617aa2f$var$SemVer)) {
            if (typeof other === "string" && other === this.version) return 0;
            other = new $e45fe85a9617aa2f$var$SemVer(other, this.options);
        }
        if (other.version === this.version) return 0;
        return this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
        if (!(other instanceof $e45fe85a9617aa2f$var$SemVer)) other = new $e45fe85a9617aa2f$var$SemVer(other, this.options);
        return $e45fe85a9617aa2f$require$compareIdentifiers(this.major, other.major) || $e45fe85a9617aa2f$require$compareIdentifiers(this.minor, other.minor) || $e45fe85a9617aa2f$require$compareIdentifiers(this.patch, other.patch);
    }
    comparePre(other) {
        if (!(other instanceof $e45fe85a9617aa2f$var$SemVer)) other = new $e45fe85a9617aa2f$var$SemVer(other, this.options);
        // NOT having a prerelease is > having one
        if (this.prerelease.length && !other.prerelease.length) return -1;
        else if (!this.prerelease.length && other.prerelease.length) return 1;
        else if (!this.prerelease.length && !other.prerelease.length) return 0;
        let i = 0;
        do {
            const a = this.prerelease[i];
            const b = other.prerelease[i];
            $bz8x9("prerelease compare", i, a, b);
            if (a === undefined && b === undefined) return 0;
            else if (b === undefined) return 1;
            else if (a === undefined) return -1;
            else if (a === b) continue;
            else return $e45fe85a9617aa2f$require$compareIdentifiers(a, b);
        }while (++i);
    }
    compareBuild(other) {
        if (!(other instanceof $e45fe85a9617aa2f$var$SemVer)) other = new $e45fe85a9617aa2f$var$SemVer(other, this.options);
        let i = 0;
        do {
            const a = this.build[i];
            const b = other.build[i];
            $bz8x9("prerelease compare", i, a, b);
            if (a === undefined && b === undefined) return 0;
            else if (b === undefined) return 1;
            else if (a === undefined) return -1;
            else if (a === b) continue;
            else return $e45fe85a9617aa2f$require$compareIdentifiers(a, b);
        }while (++i);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(release, identifier) {
        switch(release){
            case "premajor":
                this.prerelease.length = 0;
                this.patch = 0;
                this.minor = 0;
                this.major++;
                this.inc("pre", identifier);
                break;
            case "preminor":
                this.prerelease.length = 0;
                this.patch = 0;
                this.minor++;
                this.inc("pre", identifier);
                break;
            case "prepatch":
                // If this is already a prerelease, it will bump to the next version
                // drop any prereleases that might already exist, since they are not
                // relevant at this point.
                this.prerelease.length = 0;
                this.inc("patch", identifier);
                this.inc("pre", identifier);
                break;
            // If the input is a non-prerelease version, this acts the same as
            // prepatch.
            case "prerelease":
                if (this.prerelease.length === 0) this.inc("patch", identifier);
                this.inc("pre", identifier);
                break;
            case "major":
                // If this is a pre-major version, bump up to the same major version.
                // Otherwise increment major.
                // 1.0.0-5 bumps to 1.0.0
                // 1.1.0 bumps to 2.0.0
                if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) this.major++;
                this.minor = 0;
                this.patch = 0;
                this.prerelease = [];
                break;
            case "minor":
                // If this is a pre-minor version, bump up to the same minor version.
                // Otherwise increment minor.
                // 1.2.0-5 bumps to 1.2.0
                // 1.2.1 bumps to 1.3.0
                if (this.patch !== 0 || this.prerelease.length === 0) this.minor++;
                this.patch = 0;
                this.prerelease = [];
                break;
            case "patch":
                // If this is not a pre-release version, it will increment the patch.
                // If it is a pre-release it will bump up to the same patch version.
                // 1.2.0-5 patches to 1.2.0
                // 1.2.0 patches to 1.2.1
                if (this.prerelease.length === 0) this.patch++;
                this.prerelease = [];
                break;
            // This probably shouldn't be used publicly.
            // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
            case "pre":
                if (this.prerelease.length === 0) this.prerelease = [
                    0
                ];
                else {
                    let i = this.prerelease.length;
                    while(--i >= 0)if (typeof this.prerelease[i] === "number") {
                        this.prerelease[i]++;
                        i = -2;
                    }
                    if (i === -1) // didn't increment anything
                    this.prerelease.push(0);
                }
                if (identifier) {
                    // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
                    // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
                    if ($e45fe85a9617aa2f$require$compareIdentifiers(this.prerelease[0], identifier) === 0) {
                        if (isNaN(this.prerelease[1])) this.prerelease = [
                            identifier,
                            0
                        ];
                    } else this.prerelease = [
                        identifier,
                        0
                    ];
                }
                break;
            default:
                throw new Error(`invalid increment argument: ${release}`);
        }
        this.format();
        this.raw = this.version;
        return this;
    }
}
module.exports = $e45fe85a9617aa2f$var$SemVer;

});
parcelRequire.register("8xTVe", function(module, exports) {
// parse out just the options we care about so we always get a consistent
// obj with keys in a consistent order.
const $638cc8c5f48dce12$var$opts = [
    "includePrerelease",
    "loose",
    "rtl"
];
const $638cc8c5f48dce12$var$parseOptions = (options)=>!options ? {} : typeof options !== "object" ? {
        loose: true
    } : $638cc8c5f48dce12$var$opts.filter((k)=>options[k]).reduce((o, k)=>{
        o[k] = true;
        return o;
    }, {});
module.exports = $638cc8c5f48dce12$var$parseOptions;

});

parcelRequire.register("7fDri", function(module, exports) {
const $547886e9fc5de851$var$numeric = /^[0-9]+$/;
const $547886e9fc5de851$var$compareIdentifiers = (a, b)=>{
    const anum = $547886e9fc5de851$var$numeric.test(a);
    const bnum = $547886e9fc5de851$var$numeric.test(b);
    if (anum && bnum) {
        a = +a;
        b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const $547886e9fc5de851$var$rcompareIdentifiers = (a, b)=>$547886e9fc5de851$var$compareIdentifiers(b, a);
module.exports = {
    compareIdentifiers: $547886e9fc5de851$var$compareIdentifiers,
    rcompareIdentifiers: $547886e9fc5de851$var$rcompareIdentifiers
};

});


parcelRequire.register("6Ab84", function(module, exports) {

var $igzQs = parcelRequire("igzQs");
var $4caebcddedd92028$require$MAX_LENGTH = $igzQs.MAX_LENGTH;

var $4ezl4 = parcelRequire("4ezl4");
var $4caebcddedd92028$require$re = $4ezl4.re;
var $4caebcddedd92028$require$t = $4ezl4.t;

var $jBDeE = parcelRequire("jBDeE");

var $8xTVe = parcelRequire("8xTVe");
const $4caebcddedd92028$var$parse = (version, options)=>{
    options = $8xTVe(options);
    if (version instanceof $jBDeE) return version;
    if (typeof version !== "string") return null;
    if (version.length > $4caebcddedd92028$require$MAX_LENGTH) return null;
    const r = options.loose ? $4caebcddedd92028$require$re[$4caebcddedd92028$require$t.LOOSE] : $4caebcddedd92028$require$re[$4caebcddedd92028$require$t.FULL];
    if (!r.test(version)) return null;
    try {
        return new $jBDeE(version, options);
    } catch (er) {
        return null;
    }
};
module.exports = $4caebcddedd92028$var$parse;

});

parcelRequire.register("9fJPG", function(module, exports) {

var $6Ab84 = parcelRequire("6Ab84");
const $6bc9112b028c14fc$var$valid = (version, options)=>{
    const v = $6Ab84(version, options);
    return v ? v.version : null;
};
module.exports = $6bc9112b028c14fc$var$valid;

});

parcelRequire.register("kPDUX", function(module, exports) {

var $6Ab84 = parcelRequire("6Ab84");
const $f2a788e5477f3bab$var$clean = (version, options)=>{
    const s = $6Ab84(version.trim().replace(/^[=v]+/, ""), options);
    return s ? s.version : null;
};
module.exports = $f2a788e5477f3bab$var$clean;

});

parcelRequire.register("99YOa", function(module, exports) {

var $jBDeE = parcelRequire("jBDeE");
const $6ab41f8f3a41f425$var$inc = (version, release, options, identifier)=>{
    if (typeof options === "string") {
        identifier = options;
        options = undefined;
    }
    try {
        return new $jBDeE(version instanceof $jBDeE ? version.version : version, options).inc(release, identifier).version;
    } catch (er) {
        return null;
    }
};
module.exports = $6ab41f8f3a41f425$var$inc;

});

parcelRequire.register("ggyFO", function(module, exports) {

var $6Ab84 = parcelRequire("6Ab84");

var $8nYVY = parcelRequire("8nYVY");
const $bd790965c8432c90$var$diff = (version1, version2)=>{
    if ($8nYVY(version1, version2)) return null;
    else {
        const v1 = $6Ab84(version1);
        const v2 = $6Ab84(version2);
        const hasPre = v1.prerelease.length || v2.prerelease.length;
        const prefix = hasPre ? "pre" : "";
        const defaultResult = hasPre ? "prerelease" : "";
        for(const key in v1)if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) return prefix + key;
        }
        return defaultResult // may be undefined
        ;
    }
};
module.exports = $bd790965c8432c90$var$diff;

});
parcelRequire.register("8nYVY", function(module, exports) {

var $ewsTG = parcelRequire("ewsTG");
const $61afbcf72aab6a8c$var$eq = (a, b, loose)=>$ewsTG(a, b, loose) === 0;
module.exports = $61afbcf72aab6a8c$var$eq;

});
parcelRequire.register("ewsTG", function(module, exports) {

var $jBDeE = parcelRequire("jBDeE");
const $a92a7839b33f1206$var$compare = (a, b, loose)=>new $jBDeE(a, loose).compare(new $jBDeE(b, loose));
module.exports = $a92a7839b33f1206$var$compare;

});



parcelRequire.register("lQWu3", function(module, exports) {

var $jBDeE = parcelRequire("jBDeE");
const $fe8bd1f0ff03d838$var$major = (a, loose)=>new $jBDeE(a, loose).major;
module.exports = $fe8bd1f0ff03d838$var$major;

});

parcelRequire.register("eYJxJ", function(module, exports) {

var $jBDeE = parcelRequire("jBDeE");
const $02d06b5794fd4297$var$minor = (a, loose)=>new $jBDeE(a, loose).minor;
module.exports = $02d06b5794fd4297$var$minor;

});

parcelRequire.register("crsqN", function(module, exports) {

var $jBDeE = parcelRequire("jBDeE");
const $90ee0f7ccd4e9cd9$var$patch = (a, loose)=>new $jBDeE(a, loose).patch;
module.exports = $90ee0f7ccd4e9cd9$var$patch;

});

parcelRequire.register("1TtsU", function(module, exports) {

var $6Ab84 = parcelRequire("6Ab84");
const $1611c8b22f35162b$var$prerelease = (version, options)=>{
    const parsed = $6Ab84(version, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
};
module.exports = $1611c8b22f35162b$var$prerelease;

});

parcelRequire.register("l5CCr", function(module, exports) {

var $ewsTG = parcelRequire("ewsTG");
const $f5a8058ef2ee2d43$var$rcompare = (a, b, loose)=>$ewsTG(b, a, loose);
module.exports = $f5a8058ef2ee2d43$var$rcompare;

});

parcelRequire.register("fZUW6", function(module, exports) {

var $ewsTG = parcelRequire("ewsTG");
const $ba58b7d47fb7cd95$var$compareLoose = (a, b)=>$ewsTG(a, b, true);
module.exports = $ba58b7d47fb7cd95$var$compareLoose;

});

parcelRequire.register("cI52P", function(module, exports) {

var $jBDeE = parcelRequire("jBDeE");
const $940d81dc7a0300dd$var$compareBuild = (a, b, loose)=>{
    const versionA = new $jBDeE(a, loose);
    const versionB = new $jBDeE(b, loose);
    return versionA.compare(versionB) || versionA.compareBuild(versionB);
};
module.exports = $940d81dc7a0300dd$var$compareBuild;

});

parcelRequire.register("ggjnj", function(module, exports) {

var $cI52P = parcelRequire("cI52P");
const $bd6d2b7065037d45$var$sort = (list, loose)=>list.sort((a, b)=>$cI52P(a, b, loose));
module.exports = $bd6d2b7065037d45$var$sort;

});

parcelRequire.register("eTVFP", function(module, exports) {

var $cI52P = parcelRequire("cI52P");
const $ad92f08baad6d20a$var$rsort = (list, loose)=>list.sort((a, b)=>$cI52P(b, a, loose));
module.exports = $ad92f08baad6d20a$var$rsort;

});

parcelRequire.register("7LHti", function(module, exports) {

var $ewsTG = parcelRequire("ewsTG");
const $5a7ea4b428867d4f$var$gt = (a, b, loose)=>$ewsTG(a, b, loose) > 0;
module.exports = $5a7ea4b428867d4f$var$gt;

});

parcelRequire.register("3h2Uq", function(module, exports) {

var $ewsTG = parcelRequire("ewsTG");
const $262537545e491946$var$lt = (a, b, loose)=>$ewsTG(a, b, loose) < 0;
module.exports = $262537545e491946$var$lt;

});

parcelRequire.register("5VHiU", function(module, exports) {

var $ewsTG = parcelRequire("ewsTG");
const $4513dde5b2ce2059$var$neq = (a, b, loose)=>$ewsTG(a, b, loose) !== 0;
module.exports = $4513dde5b2ce2059$var$neq;

});

parcelRequire.register("3rcex", function(module, exports) {

var $ewsTG = parcelRequire("ewsTG");
const $280d620d23ef7715$var$gte = (a, b, loose)=>$ewsTG(a, b, loose) >= 0;
module.exports = $280d620d23ef7715$var$gte;

});

parcelRequire.register("1T6D1", function(module, exports) {

var $ewsTG = parcelRequire("ewsTG");
const $160011c10b5fa9c3$var$lte = (a, b, loose)=>$ewsTG(a, b, loose) <= 0;
module.exports = $160011c10b5fa9c3$var$lte;

});

parcelRequire.register("8NqXy", function(module, exports) {

var $8nYVY = parcelRequire("8nYVY");

var $5VHiU = parcelRequire("5VHiU");

var $7LHti = parcelRequire("7LHti");

var $3rcex = parcelRequire("3rcex");

var $3h2Uq = parcelRequire("3h2Uq");

var $1T6D1 = parcelRequire("1T6D1");
const $6677cff4dab29cc7$var$cmp = (a, op, b, loose)=>{
    switch(op){
        case "===":
            if (typeof a === "object") a = a.version;
            if (typeof b === "object") b = b.version;
            return a === b;
        case "!==":
            if (typeof a === "object") a = a.version;
            if (typeof b === "object") b = b.version;
            return a !== b;
        case "":
        case "=":
        case "==":
            return $8nYVY(a, b, loose);
        case "!=":
            return $5VHiU(a, b, loose);
        case ">":
            return $7LHti(a, b, loose);
        case ">=":
            return $3rcex(a, b, loose);
        case "<":
            return $3h2Uq(a, b, loose);
        case "<=":
            return $1T6D1(a, b, loose);
        default:
            throw new TypeError(`Invalid operator: ${op}`);
    }
};
module.exports = $6677cff4dab29cc7$var$cmp;

});

parcelRequire.register("3qA2u", function(module, exports) {

var $jBDeE = parcelRequire("jBDeE");

var $6Ab84 = parcelRequire("6Ab84");

var $4ezl4 = parcelRequire("4ezl4");
var $27efc1713502de4c$require$re = $4ezl4.re;
var $27efc1713502de4c$require$t = $4ezl4.t;
const $27efc1713502de4c$var$coerce = (version, options)=>{
    if (version instanceof $jBDeE) return version;
    if (typeof version === "number") version = String(version);
    if (typeof version !== "string") return null;
    options = options || {};
    let match = null;
    if (!options.rtl) match = version.match($27efc1713502de4c$require$re[$27efc1713502de4c$require$t.COERCE]);
    else {
        // Find the right-most coercible string that does not share
        // a terminus with a more left-ward coercible string.
        // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
        //
        // Walk through the string checking with a /g regexp
        // Manually set the index so as to pick up overlapping matches.
        // Stop when we get a match that ends at the string end, since no
        // coercible string can be more right-ward without the same terminus.
        let next;
        while((next = $27efc1713502de4c$require$re[$27efc1713502de4c$require$t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)){
            if (!match || next.index + next[0].length !== match.index + match[0].length) match = next;
            $27efc1713502de4c$require$re[$27efc1713502de4c$require$t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
        }
        // leave it in a clean state
        $27efc1713502de4c$require$re[$27efc1713502de4c$require$t.COERCERTL].lastIndex = -1;
    }
    if (match === null) return null;
    return $6Ab84(`${match[2]}.${match[3] || "0"}.${match[4] || "0"}`, options);
};
module.exports = $27efc1713502de4c$var$coerce;

});

parcelRequire.register("8LvkC", function(module, exports) {
const $661b044d002ee7fe$var$ANY = Symbol("SemVer ANY");
// hoisted class for cyclic dependency
class $661b044d002ee7fe$var$Comparator {
    static get ANY() {
        return $661b044d002ee7fe$var$ANY;
    }
    constructor(comp, options){
        options = $8xTVe(options);
        if (comp instanceof $661b044d002ee7fe$var$Comparator) {
            if (comp.loose === !!options.loose) return comp;
            else comp = comp.value;
        }
        $bz8x9("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === $661b044d002ee7fe$var$ANY) this.value = "";
        else this.value = this.operator + this.semver.version;
        $bz8x9("comp", this);
    }
    parse(comp) {
        const r = this.options.loose ? $661b044d002ee7fe$require$re[$661b044d002ee7fe$require$t.COMPARATORLOOSE] : $661b044d002ee7fe$require$re[$661b044d002ee7fe$require$t.COMPARATOR];
        const m = comp.match(r);
        if (!m) throw new TypeError(`Invalid comparator: ${comp}`);
        this.operator = m[1] !== undefined ? m[1] : "";
        if (this.operator === "=") this.operator = "";
        // if it literally is just '>' or '' then allow anything.
        if (!m[2]) this.semver = $661b044d002ee7fe$var$ANY;
        else this.semver = new $jBDeE(m[2], this.options.loose);
    }
    toString() {
        return this.value;
    }
    test(version) {
        $bz8x9("Comparator.test", version, this.options.loose);
        if (this.semver === $661b044d002ee7fe$var$ANY || version === $661b044d002ee7fe$var$ANY) return true;
        if (typeof version === "string") try {
            version = new $jBDeE(version, this.options);
        } catch (er) {
            return false;
        }
        return $8NqXy(version, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
        if (!(comp instanceof $661b044d002ee7fe$var$Comparator)) throw new TypeError("a Comparator is required");
        if (!options || typeof options !== "object") options = {
            loose: !!options,
            includePrerelease: false
        };
        if (this.operator === "") {
            if (this.value === "") return true;
            return new $9TL8u(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
            if (comp.value === "") return true;
            return new $9TL8u(this.value, options).test(comp.semver);
        }
        const sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
        const sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
        const sameSemVer = this.semver.version === comp.semver.version;
        const differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
        const oppositeDirectionsLessThan = $8NqXy(this.semver, "<", comp.semver, options) && (this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<");
        const oppositeDirectionsGreaterThan = $8NqXy(this.semver, ">", comp.semver, options) && (this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">");
        return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    }
}
module.exports = $661b044d002ee7fe$var$Comparator;

var $8xTVe = parcelRequire("8xTVe");

var $4ezl4 = parcelRequire("4ezl4");
var $661b044d002ee7fe$require$re = $4ezl4.re;
var $661b044d002ee7fe$require$t = $4ezl4.t;

var $8NqXy = parcelRequire("8NqXy");

var $bz8x9 = parcelRequire("bz8x9");

var $jBDeE = parcelRequire("jBDeE");

var $9TL8u = parcelRequire("9TL8u");

});
parcelRequire.register("9TL8u", function(module, exports) {
// hoisted class for cyclic dependency
class $734dd050039cecfe$var$Range {
    constructor(range, options){
        options = $8xTVe(options);
        if (range instanceof $734dd050039cecfe$var$Range) {
            if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) return range;
            else return new $734dd050039cecfe$var$Range(range.raw, options);
        }
        if (range instanceof $8LvkC) {
            // just put it in the set and return
            this.raw = range.value;
            this.set = [
                [
                    range
                ]
            ];
            this.format();
            return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        // First, split based on boolean or ||
        this.raw = range;
        this.set = range.split("||")// map the range to a 2d array of comparators
        .map((r)=>this.parseRange(r.trim()))// throw out any comparator lists that are empty
        // this generally means that it was not a valid range, which is allowed
        // in loose mode, but will still throw if the WHOLE range is invalid.
        .filter((c)=>c.length);
        if (!this.set.length) throw new TypeError(`Invalid SemVer Range: ${range}`);
        // if we have any that are not the null set, throw out null sets.
        if (this.set.length > 1) {
            // keep the first one, in case they're all null sets
            const first = this.set[0];
            this.set = this.set.filter((c)=>!$734dd050039cecfe$var$isNullSet(c[0]));
            if (this.set.length === 0) this.set = [
                first
            ];
            else if (this.set.length > 1) {
                // if we have any that are *, then the range is just *
                for (const c of this.set)if (c.length === 1 && $734dd050039cecfe$var$isAny(c[0])) {
                    this.set = [
                        c
                    ];
                    break;
                }
            }
        }
        this.format();
    }
    format() {
        this.range = this.set.map((comps)=>{
            return comps.join(" ").trim();
        }).join("||").trim();
        return this.range;
    }
    toString() {
        return this.range;
    }
    parseRange(range) {
        range = range.trim();
        // memoize range parsing for performance.
        // this is a very hot path, and fully deterministic.
        const memoOpts = Object.keys(this.options).join(",");
        const memoKey = `parseRange:${memoOpts}:${range}`;
        const cached = $734dd050039cecfe$var$cache.get(memoKey);
        if (cached) return cached;
        const loose = this.options.loose;
        // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
        const hr = loose ? $734dd050039cecfe$require$re[$734dd050039cecfe$require$t.HYPHENRANGELOOSE] : $734dd050039cecfe$require$re[$734dd050039cecfe$require$t.HYPHENRANGE];
        range = range.replace(hr, $734dd050039cecfe$var$hyphenReplace(this.options.includePrerelease));
        $bz8x9("hyphen replace", range);
        // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
        range = range.replace($734dd050039cecfe$require$re[$734dd050039cecfe$require$t.COMPARATORTRIM], $734dd050039cecfe$require$comparatorTrimReplace);
        $bz8x9("comparator trim", range);
        // `~ 1.2.3` => `~1.2.3`
        range = range.replace($734dd050039cecfe$require$re[$734dd050039cecfe$require$t.TILDETRIM], $734dd050039cecfe$require$tildeTrimReplace);
        // `^ 1.2.3` => `^1.2.3`
        range = range.replace($734dd050039cecfe$require$re[$734dd050039cecfe$require$t.CARETTRIM], $734dd050039cecfe$require$caretTrimReplace);
        // normalize spaces
        range = range.split(/\s+/).join(" ");
        // At this point, the range is completely trimmed and
        // ready to be split into comparators.
        let rangeList = range.split(" ").map((comp)=>$734dd050039cecfe$var$parseComparator(comp, this.options)).join(" ").split(/\s+/)// >=0.0.0 is equivalent to *
        .map((comp)=>$734dd050039cecfe$var$replaceGTE0(comp, this.options));
        if (loose) // in loose mode, throw out any that are not valid comparators
        rangeList = rangeList.filter((comp)=>{
            $bz8x9("loose invalid filter", comp, this.options);
            return !!comp.match($734dd050039cecfe$require$re[$734dd050039cecfe$require$t.COMPARATORLOOSE]);
        });
        $bz8x9("range list", rangeList);
        // if any comparators are the null set, then replace with JUST null set
        // if more than one comparator, remove any * comparators
        // also, don't include the same comparator more than once
        const rangeMap = new Map();
        const comparators = rangeList.map((comp)=>new $8LvkC(comp, this.options));
        for (const comp1 of comparators){
            if ($734dd050039cecfe$var$isNullSet(comp1)) return [
                comp1
            ];
            rangeMap.set(comp1.value, comp1);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) rangeMap.delete("");
        const result = [
            ...rangeMap.values()
        ];
        $734dd050039cecfe$var$cache.set(memoKey, result);
        return result;
    }
    intersects(range, options) {
        if (!(range instanceof $734dd050039cecfe$var$Range)) throw new TypeError("a Range is required");
        return this.set.some((thisComparators)=>{
            return $734dd050039cecfe$var$isSatisfiable(thisComparators, options) && range.set.some((rangeComparators)=>{
                return $734dd050039cecfe$var$isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator)=>{
                    return rangeComparators.every((rangeComparator)=>{
                        return thisComparator.intersects(rangeComparator, options);
                    });
                });
            });
        });
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(version) {
        if (!version) return false;
        if (typeof version === "string") try {
            version = new $jBDeE(version, this.options);
        } catch (er) {
            return false;
        }
        for(let i = 0; i < this.set.length; i++){
            if ($734dd050039cecfe$var$testSet(this.set[i], version, this.options)) return true;
        }
        return false;
    }
}
module.exports = $734dd050039cecfe$var$Range;

var $fpEwA = parcelRequire("fpEwA");
const $734dd050039cecfe$var$cache = new $fpEwA({
    max: 1000
});

var $8xTVe = parcelRequire("8xTVe");

var $8LvkC = parcelRequire("8LvkC");

var $bz8x9 = parcelRequire("bz8x9");

var $jBDeE = parcelRequire("jBDeE");

var $4ezl4 = parcelRequire("4ezl4");
var $734dd050039cecfe$require$re = $4ezl4.re;
var $734dd050039cecfe$require$t = $4ezl4.t;
var $734dd050039cecfe$require$comparatorTrimReplace = $4ezl4.comparatorTrimReplace;
var $734dd050039cecfe$require$tildeTrimReplace = $4ezl4.tildeTrimReplace;
var $734dd050039cecfe$require$caretTrimReplace = $4ezl4.caretTrimReplace;
const $734dd050039cecfe$var$isNullSet = (c)=>c.value === "<0.0.0-0";
const $734dd050039cecfe$var$isAny = (c)=>c.value === "";
// take a set of comparators and determine whether there
// exists a version which can satisfy it
const $734dd050039cecfe$var$isSatisfiable = (comparators, options)=>{
    let result = true;
    const remainingComparators = comparators.slice();
    let testComparator = remainingComparators.pop();
    while(result && remainingComparators.length){
        result = remainingComparators.every((otherComparator)=>{
            return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
    }
    return result;
};
// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
const $734dd050039cecfe$var$parseComparator = (comp, options)=>{
    $bz8x9("comp", comp, options);
    comp = $734dd050039cecfe$var$replaceCarets(comp, options);
    $bz8x9("caret", comp);
    comp = $734dd050039cecfe$var$replaceTildes(comp, options);
    $bz8x9("tildes", comp);
    comp = $734dd050039cecfe$var$replaceXRanges(comp, options);
    $bz8x9("xrange", comp);
    comp = $734dd050039cecfe$var$replaceStars(comp, options);
    $bz8x9("stars", comp);
    return comp;
};
const $734dd050039cecfe$var$isX = (id)=>!id || id.toLowerCase() === "x" || id === "*";
// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
const $734dd050039cecfe$var$replaceTildes = (comp, options)=>comp.trim().split(/\s+/).map((c)=>{
        return $734dd050039cecfe$var$replaceTilde(c, options);
    }).join(" ");
const $734dd050039cecfe$var$replaceTilde = (comp, options)=>{
    const r = options.loose ? $734dd050039cecfe$require$re[$734dd050039cecfe$require$t.TILDELOOSE] : $734dd050039cecfe$require$re[$734dd050039cecfe$require$t.TILDE];
    return comp.replace(r, (_, M, m, p, pr)=>{
        $bz8x9("tilde", comp, _, M, m, p, pr);
        let ret;
        if ($734dd050039cecfe$var$isX(M)) ret = "";
        else if ($734dd050039cecfe$var$isX(m)) ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        else if ($734dd050039cecfe$var$isX(p)) // ~1.2 == >=1.2.0 <1.3.0-0
        ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        else if (pr) {
            $bz8x9("replaceTilde pr", pr);
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else // ~1.2.3 == >=1.2.3 <1.3.0-0
        ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        $bz8x9("tilde return", ret);
        return ret;
    });
};
// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
// ^1.2.3 --> >=1.2.3 <2.0.0-0
// ^1.2.0 --> >=1.2.0 <2.0.0-0
const $734dd050039cecfe$var$replaceCarets = (comp, options)=>comp.trim().split(/\s+/).map((c)=>{
        return $734dd050039cecfe$var$replaceCaret(c, options);
    }).join(" ");
const $734dd050039cecfe$var$replaceCaret = (comp, options)=>{
    $bz8x9("caret", comp, options);
    const r = options.loose ? $734dd050039cecfe$require$re[$734dd050039cecfe$require$t.CARETLOOSE] : $734dd050039cecfe$require$re[$734dd050039cecfe$require$t.CARET];
    const z = options.includePrerelease ? "-0" : "";
    return comp.replace(r, (_, M, m, p, pr)=>{
        $bz8x9("caret", comp, _, M, m, p, pr);
        let ret;
        if ($734dd050039cecfe$var$isX(M)) ret = "";
        else if ($734dd050039cecfe$var$isX(m)) ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        else if ($734dd050039cecfe$var$isX(p)) {
            if (M === "0") ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
            else ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
        } else if (pr) {
            $bz8x9("replaceCaret pr", pr);
            if (M === "0") {
                if (m === "0") ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
                else ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            } else ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
        } else {
            $bz8x9("no pr");
            if (M === "0") {
                if (m === "0") ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
                else ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
            } else ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
        }
        $bz8x9("caret return", ret);
        return ret;
    });
};
const $734dd050039cecfe$var$replaceXRanges = (comp, options)=>{
    $bz8x9("replaceXRanges", comp, options);
    return comp.split(/\s+/).map((c)=>{
        return $734dd050039cecfe$var$replaceXRange(c, options);
    }).join(" ");
};
const $734dd050039cecfe$var$replaceXRange = (comp, options)=>{
    comp = comp.trim();
    const r = options.loose ? $734dd050039cecfe$require$re[$734dd050039cecfe$require$t.XRANGELOOSE] : $734dd050039cecfe$require$re[$734dd050039cecfe$require$t.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr)=>{
        $bz8x9("xRange", comp, ret, gtlt, M, m, p, pr);
        const xM = $734dd050039cecfe$var$isX(M);
        const xm = xM || $734dd050039cecfe$var$isX(m);
        const xp = xm || $734dd050039cecfe$var$isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) gtlt = "";
        // if we're including prereleases in the match, then we need
        // to fix this to -0, the lowest possible prerelease value
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
            if (gtlt === ">" || gtlt === "<") // nothing is allowed
            ret = "<0.0.0-0";
            else // nothing is forbidden
            ret = "*";
        } else if (gtlt && anyX) {
            // we know patch is an x, because we have any x at all.
            // replace X with 0
            if (xm) m = 0;
            p = 0;
            if (gtlt === ">") {
                // >1 => >=2.0.0
                // >1.2 => >=1.3.0
                gtlt = ">=";
                if (xm) {
                    M = +M + 1;
                    m = 0;
                    p = 0;
                } else {
                    m = +m + 1;
                    p = 0;
                }
            } else if (gtlt === "<=") {
                // <=0.7.x is actually <0.8.0, since any 0.7.x should
                // pass.  Similarly, <=7.x is actually <8.0.0, etc.
                gtlt = "<";
                if (xm) M = +M + 1;
                else m = +m + 1;
            }
            if (gtlt === "<") pr = "-0";
            ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        else if (xp) ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        $bz8x9("xRange return", ret);
        return ret;
    });
};
// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
const $734dd050039cecfe$var$replaceStars = (comp, options)=>{
    $bz8x9("replaceStars", comp, options);
    // Looseness is ignored here.  star is always as loose as it gets!
    return comp.trim().replace($734dd050039cecfe$require$re[$734dd050039cecfe$require$t.STAR], "");
};
const $734dd050039cecfe$var$replaceGTE0 = (comp, options)=>{
    $bz8x9("replaceGTE0", comp, options);
    return comp.trim().replace($734dd050039cecfe$require$re[options.includePrerelease ? $734dd050039cecfe$require$t.GTE0PRE : $734dd050039cecfe$require$t.GTE0], "");
};
// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
const $734dd050039cecfe$var$hyphenReplace = (incPr)=>($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb)=>{
        if ($734dd050039cecfe$var$isX(fM)) from = "";
        else if ($734dd050039cecfe$var$isX(fm)) from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
        else if ($734dd050039cecfe$var$isX(fp)) from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
        else if (fpr) from = `>=${from}`;
        else from = `>=${from}${incPr ? "-0" : ""}`;
        if ($734dd050039cecfe$var$isX(tM)) to = "";
        else if ($734dd050039cecfe$var$isX(tm)) to = `<${+tM + 1}.0.0-0`;
        else if ($734dd050039cecfe$var$isX(tp)) to = `<${tM}.${+tm + 1}.0-0`;
        else if (tpr) to = `<=${tM}.${tm}.${tp}-${tpr}`;
        else if (incPr) to = `<${tM}.${tm}.${+tp + 1}-0`;
        else to = `<=${to}`;
        return `${from} ${to}`.trim();
    };
const $734dd050039cecfe$var$testSet = (set, version, options)=>{
    for(let i = 0; i < set.length; i++){
        if (!set[i].test(version)) return false;
    }
    if (version.prerelease.length && !options.includePrerelease) {
        // Find the set of versions that are allowed to have prereleases
        // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
        // That should allow `1.2.3-pr.2` to pass.
        // However, `1.2.4-alpha.notready` should NOT be allowed,
        // even though it's within the range set by the comparators.
        for(let i = 0; i < set.length; i++){
            $bz8x9(set[i].semver);
            if (set[i].semver === $8LvkC.ANY) continue;
            if (set[i].semver.prerelease.length > 0) {
                const allowed = set[i].semver;
                if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return true;
            }
        }
        // Version has a -pre, but it's not one of the ones we like.
        return false;
    }
    return true;
};

});
parcelRequire.register("fpEwA", function(module, exports) {
"use strict";

var $hyCbR = parcelRequire("hyCbR");
const $b388a021ee7f476a$var$MAX = Symbol("max");
const $b388a021ee7f476a$var$LENGTH = Symbol("length");
const $b388a021ee7f476a$var$LENGTH_CALCULATOR = Symbol("lengthCalculator");
const $b388a021ee7f476a$var$ALLOW_STALE = Symbol("allowStale");
const $b388a021ee7f476a$var$MAX_AGE = Symbol("maxAge");
const $b388a021ee7f476a$var$DISPOSE = Symbol("dispose");
const $b388a021ee7f476a$var$NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
const $b388a021ee7f476a$var$LRU_LIST = Symbol("lruList");
const $b388a021ee7f476a$var$CACHE = Symbol("cache");
const $b388a021ee7f476a$var$UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
const $b388a021ee7f476a$var$naiveLength = ()=>1;
// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
class $b388a021ee7f476a$var$LRUCache {
    constructor(options){
        if (typeof options === "number") options = {
            max: options
        };
        if (!options) options = {};
        if (options.max && (typeof options.max !== "number" || options.max < 0)) throw new TypeError("max must be a non-negative number");
        // Kind of weird to have a default max of Infinity, but oh well.
        const max = this[$b388a021ee7f476a$var$MAX] = options.max || Infinity;
        const lc = options.length || $b388a021ee7f476a$var$naiveLength;
        this[$b388a021ee7f476a$var$LENGTH_CALCULATOR] = typeof lc !== "function" ? $b388a021ee7f476a$var$naiveLength : lc;
        this[$b388a021ee7f476a$var$ALLOW_STALE] = options.stale || false;
        if (options.maxAge && typeof options.maxAge !== "number") throw new TypeError("maxAge must be a number");
        this[$b388a021ee7f476a$var$MAX_AGE] = options.maxAge || 0;
        this[$b388a021ee7f476a$var$DISPOSE] = options.dispose;
        this[$b388a021ee7f476a$var$NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
        this[$b388a021ee7f476a$var$UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
        this.reset();
    }
    // resize the cache when the max changes.
    set max(mL) {
        if (typeof mL !== "number" || mL < 0) throw new TypeError("max must be a non-negative number");
        this[$b388a021ee7f476a$var$MAX] = mL || Infinity;
        $b388a021ee7f476a$var$trim(this);
    }
    get max() {
        return this[$b388a021ee7f476a$var$MAX];
    }
    set allowStale(allowStale) {
        this[$b388a021ee7f476a$var$ALLOW_STALE] = !!allowStale;
    }
    get allowStale() {
        return this[$b388a021ee7f476a$var$ALLOW_STALE];
    }
    set maxAge(mA) {
        if (typeof mA !== "number") throw new TypeError("maxAge must be a non-negative number");
        this[$b388a021ee7f476a$var$MAX_AGE] = mA;
        $b388a021ee7f476a$var$trim(this);
    }
    get maxAge() {
        return this[$b388a021ee7f476a$var$MAX_AGE];
    }
    // resize the cache when the lengthCalculator changes.
    set lengthCalculator(lC) {
        if (typeof lC !== "function") lC = $b388a021ee7f476a$var$naiveLength;
        if (lC !== this[$b388a021ee7f476a$var$LENGTH_CALCULATOR]) {
            this[$b388a021ee7f476a$var$LENGTH_CALCULATOR] = lC;
            this[$b388a021ee7f476a$var$LENGTH] = 0;
            this[$b388a021ee7f476a$var$LRU_LIST].forEach((hit)=>{
                hit.length = this[$b388a021ee7f476a$var$LENGTH_CALCULATOR](hit.value, hit.key);
                this[$b388a021ee7f476a$var$LENGTH] += hit.length;
            });
        }
        $b388a021ee7f476a$var$trim(this);
    }
    get lengthCalculator() {
        return this[$b388a021ee7f476a$var$LENGTH_CALCULATOR];
    }
    get length() {
        return this[$b388a021ee7f476a$var$LENGTH];
    }
    get itemCount() {
        return this[$b388a021ee7f476a$var$LRU_LIST].length;
    }
    rforEach(fn, thisp) {
        thisp = thisp || this;
        for(let walker = this[$b388a021ee7f476a$var$LRU_LIST].tail; walker !== null;){
            const prev = walker.prev;
            $b388a021ee7f476a$var$forEachStep(this, fn, walker, thisp);
            walker = prev;
        }
    }
    forEach(fn, thisp) {
        thisp = thisp || this;
        for(let walker = this[$b388a021ee7f476a$var$LRU_LIST].head; walker !== null;){
            const next = walker.next;
            $b388a021ee7f476a$var$forEachStep(this, fn, walker, thisp);
            walker = next;
        }
    }
    keys() {
        return this[$b388a021ee7f476a$var$LRU_LIST].toArray().map((k)=>k.key);
    }
    values() {
        return this[$b388a021ee7f476a$var$LRU_LIST].toArray().map((k)=>k.value);
    }
    reset() {
        if (this[$b388a021ee7f476a$var$DISPOSE] && this[$b388a021ee7f476a$var$LRU_LIST] && this[$b388a021ee7f476a$var$LRU_LIST].length) this[$b388a021ee7f476a$var$LRU_LIST].forEach((hit)=>this[$b388a021ee7f476a$var$DISPOSE](hit.key, hit.value));
        this[$b388a021ee7f476a$var$CACHE] = new Map() // hash of items by key
        ;
        this[$b388a021ee7f476a$var$LRU_LIST] = new $hyCbR() // list of items in order of use recency
        ;
        this[$b388a021ee7f476a$var$LENGTH] = 0 // length of items in the list
        ;
    }
    dump() {
        return this[$b388a021ee7f476a$var$LRU_LIST].map((hit)=>$b388a021ee7f476a$var$isStale(this, hit) ? false : {
                k: hit.key,
                v: hit.value,
                e: hit.now + (hit.maxAge || 0)
            }).toArray().filter((h)=>h);
    }
    dumpLru() {
        return this[$b388a021ee7f476a$var$LRU_LIST];
    }
    set(key, value, maxAge) {
        maxAge = maxAge || this[$b388a021ee7f476a$var$MAX_AGE];
        if (maxAge && typeof maxAge !== "number") throw new TypeError("maxAge must be a number");
        const now = maxAge ? Date.now() : 0;
        const len = this[$b388a021ee7f476a$var$LENGTH_CALCULATOR](value, key);
        if (this[$b388a021ee7f476a$var$CACHE].has(key)) {
            if (len > this[$b388a021ee7f476a$var$MAX]) {
                $b388a021ee7f476a$var$del(this, this[$b388a021ee7f476a$var$CACHE].get(key));
                return false;
            }
            const node = this[$b388a021ee7f476a$var$CACHE].get(key);
            const item = node.value;
            // dispose of the old one before overwriting
            // split out into 2 ifs for better coverage tracking
            if (this[$b388a021ee7f476a$var$DISPOSE]) {
                if (!this[$b388a021ee7f476a$var$NO_DISPOSE_ON_SET]) this[$b388a021ee7f476a$var$DISPOSE](key, item.value);
            }
            item.now = now;
            item.maxAge = maxAge;
            item.value = value;
            this[$b388a021ee7f476a$var$LENGTH] += len - item.length;
            item.length = len;
            this.get(key);
            $b388a021ee7f476a$var$trim(this);
            return true;
        }
        const hit = new $b388a021ee7f476a$var$Entry(key, value, len, now, maxAge);
        // oversized objects fall out of cache automatically.
        if (hit.length > this[$b388a021ee7f476a$var$MAX]) {
            if (this[$b388a021ee7f476a$var$DISPOSE]) this[$b388a021ee7f476a$var$DISPOSE](key, value);
            return false;
        }
        this[$b388a021ee7f476a$var$LENGTH] += hit.length;
        this[$b388a021ee7f476a$var$LRU_LIST].unshift(hit);
        this[$b388a021ee7f476a$var$CACHE].set(key, this[$b388a021ee7f476a$var$LRU_LIST].head);
        $b388a021ee7f476a$var$trim(this);
        return true;
    }
    has(key) {
        if (!this[$b388a021ee7f476a$var$CACHE].has(key)) return false;
        const hit = this[$b388a021ee7f476a$var$CACHE].get(key).value;
        return !$b388a021ee7f476a$var$isStale(this, hit);
    }
    get(key) {
        return $b388a021ee7f476a$var$get(this, key, true);
    }
    peek(key) {
        return $b388a021ee7f476a$var$get(this, key, false);
    }
    pop() {
        const node = this[$b388a021ee7f476a$var$LRU_LIST].tail;
        if (!node) return null;
        $b388a021ee7f476a$var$del(this, node);
        return node.value;
    }
    del(key) {
        $b388a021ee7f476a$var$del(this, this[$b388a021ee7f476a$var$CACHE].get(key));
    }
    load(arr) {
        // reset the cache
        this.reset();
        const now = Date.now();
        // A previous serialized cache has the most recent items first
        for(let l = arr.length - 1; l >= 0; l--){
            const hit = arr[l];
            const expiresAt = hit.e || 0;
            if (expiresAt === 0) // the item was created without expiration in a non aged cache
            this.set(hit.k, hit.v);
            else {
                const maxAge = expiresAt - now;
                // dont add already expired items
                if (maxAge > 0) this.set(hit.k, hit.v, maxAge);
            }
        }
    }
    prune() {
        this[$b388a021ee7f476a$var$CACHE].forEach((value, key)=>$b388a021ee7f476a$var$get(this, key, false));
    }
}
const $b388a021ee7f476a$var$get = (self, key, doUse)=>{
    const node = self[$b388a021ee7f476a$var$CACHE].get(key);
    if (node) {
        const hit = node.value;
        if ($b388a021ee7f476a$var$isStale(self, hit)) {
            $b388a021ee7f476a$var$del(self, node);
            if (!self[$b388a021ee7f476a$var$ALLOW_STALE]) return undefined;
        } else if (doUse) {
            if (self[$b388a021ee7f476a$var$UPDATE_AGE_ON_GET]) node.value.now = Date.now();
            self[$b388a021ee7f476a$var$LRU_LIST].unshiftNode(node);
        }
        return hit.value;
    }
};
const $b388a021ee7f476a$var$isStale = (self, hit)=>{
    if (!hit || !hit.maxAge && !self[$b388a021ee7f476a$var$MAX_AGE]) return false;
    const diff = Date.now() - hit.now;
    return hit.maxAge ? diff > hit.maxAge : self[$b388a021ee7f476a$var$MAX_AGE] && diff > self[$b388a021ee7f476a$var$MAX_AGE];
};
const $b388a021ee7f476a$var$trim = (self)=>{
    if (self[$b388a021ee7f476a$var$LENGTH] > self[$b388a021ee7f476a$var$MAX]) for(let walker = self[$b388a021ee7f476a$var$LRU_LIST].tail; self[$b388a021ee7f476a$var$LENGTH] > self[$b388a021ee7f476a$var$MAX] && walker !== null;){
        // We know that we're about to delete this one, and also
        // what the next least recently used key will be, so just
        // go ahead and set it now.
        const prev = walker.prev;
        $b388a021ee7f476a$var$del(self, walker);
        walker = prev;
    }
};
const $b388a021ee7f476a$var$del = (self, node)=>{
    if (node) {
        const hit = node.value;
        if (self[$b388a021ee7f476a$var$DISPOSE]) self[$b388a021ee7f476a$var$DISPOSE](hit.key, hit.value);
        self[$b388a021ee7f476a$var$LENGTH] -= hit.length;
        self[$b388a021ee7f476a$var$CACHE].delete(hit.key);
        self[$b388a021ee7f476a$var$LRU_LIST].removeNode(node);
    }
};
class $b388a021ee7f476a$var$Entry {
    constructor(key, value, length, now, maxAge){
        this.key = key;
        this.value = value;
        this.length = length;
        this.now = now;
        this.maxAge = maxAge || 0;
    }
}
const $b388a021ee7f476a$var$forEachStep = (self, fn, node, thisp)=>{
    let hit = node.value;
    if ($b388a021ee7f476a$var$isStale(self, hit)) {
        $b388a021ee7f476a$var$del(self, node);
        if (!self[$b388a021ee7f476a$var$ALLOW_STALE]) hit = undefined;
    }
    if (hit) fn.call(thisp, hit.value, hit.key, self);
};
module.exports = $b388a021ee7f476a$var$LRUCache;

});
parcelRequire.register("hyCbR", function(module, exports) {
"use strict";
module.exports = $cc833c6ac394c6bf$var$Yallist;
$cc833c6ac394c6bf$var$Yallist.Node = $cc833c6ac394c6bf$var$Node;
$cc833c6ac394c6bf$var$Yallist.create = $cc833c6ac394c6bf$var$Yallist;
function $cc833c6ac394c6bf$var$Yallist(list) {
    var self = this;
    if (!(self instanceof $cc833c6ac394c6bf$var$Yallist)) self = new $cc833c6ac394c6bf$var$Yallist();
    self.tail = null;
    self.head = null;
    self.length = 0;
    if (list && typeof list.forEach === "function") list.forEach(function(item) {
        self.push(item);
    });
    else if (arguments.length > 0) for(var i = 0, l = arguments.length; i < l; i++)self.push(arguments[i]);
    return self;
}
$cc833c6ac394c6bf$var$Yallist.prototype.removeNode = function(node) {
    if (node.list !== this) throw new Error("removing node which does not belong to this list");
    var next = node.next;
    var prev = node.prev;
    if (next) next.prev = prev;
    if (prev) prev.next = next;
    if (node === this.head) this.head = next;
    if (node === this.tail) this.tail = prev;
    node.list.length--;
    node.next = null;
    node.prev = null;
    node.list = null;
    return next;
};
$cc833c6ac394c6bf$var$Yallist.prototype.unshiftNode = function(node) {
    if (node === this.head) return;
    if (node.list) node.list.removeNode(node);
    var head = this.head;
    node.list = this;
    node.next = head;
    if (head) head.prev = node;
    this.head = node;
    if (!this.tail) this.tail = node;
    this.length++;
};
$cc833c6ac394c6bf$var$Yallist.prototype.pushNode = function(node) {
    if (node === this.tail) return;
    if (node.list) node.list.removeNode(node);
    var tail = this.tail;
    node.list = this;
    node.prev = tail;
    if (tail) tail.next = node;
    this.tail = node;
    if (!this.head) this.head = node;
    this.length++;
};
$cc833c6ac394c6bf$var$Yallist.prototype.push = function() {
    for(var i = 0, l = arguments.length; i < l; i++)$cc833c6ac394c6bf$var$push(this, arguments[i]);
    return this.length;
};
$cc833c6ac394c6bf$var$Yallist.prototype.unshift = function() {
    for(var i = 0, l = arguments.length; i < l; i++)$cc833c6ac394c6bf$var$unshift(this, arguments[i]);
    return this.length;
};
$cc833c6ac394c6bf$var$Yallist.prototype.pop = function() {
    if (!this.tail) return undefined;
    var res = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) this.tail.next = null;
    else this.head = null;
    this.length--;
    return res;
};
$cc833c6ac394c6bf$var$Yallist.prototype.shift = function() {
    if (!this.head) return undefined;
    var res = this.head.value;
    this.head = this.head.next;
    if (this.head) this.head.prev = null;
    else this.tail = null;
    this.length--;
    return res;
};
$cc833c6ac394c6bf$var$Yallist.prototype.forEach = function(fn, thisp) {
    thisp = thisp || this;
    for(var walker = this.head, i = 0; walker !== null; i++){
        fn.call(thisp, walker.value, i, this);
        walker = walker.next;
    }
};
$cc833c6ac394c6bf$var$Yallist.prototype.forEachReverse = function(fn, thisp) {
    thisp = thisp || this;
    for(var walker = this.tail, i = this.length - 1; walker !== null; i--){
        fn.call(thisp, walker.value, i, this);
        walker = walker.prev;
    }
};
$cc833c6ac394c6bf$var$Yallist.prototype.get = function(n) {
    for(var i = 0, walker = this.head; walker !== null && i < n; i++)// abort out of the list early if we hit a cycle
    walker = walker.next;
    if (i === n && walker !== null) return walker.value;
};
$cc833c6ac394c6bf$var$Yallist.prototype.getReverse = function(n) {
    for(var i = 0, walker = this.tail; walker !== null && i < n; i++)// abort out of the list early if we hit a cycle
    walker = walker.prev;
    if (i === n && walker !== null) return walker.value;
};
$cc833c6ac394c6bf$var$Yallist.prototype.map = function(fn, thisp) {
    thisp = thisp || this;
    var res = new $cc833c6ac394c6bf$var$Yallist();
    for(var walker = this.head; walker !== null;){
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.next;
    }
    return res;
};
$cc833c6ac394c6bf$var$Yallist.prototype.mapReverse = function(fn, thisp) {
    thisp = thisp || this;
    var res = new $cc833c6ac394c6bf$var$Yallist();
    for(var walker = this.tail; walker !== null;){
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.prev;
    }
    return res;
};
$cc833c6ac394c6bf$var$Yallist.prototype.reduce = function(fn, initial) {
    var acc;
    var walker = this.head;
    if (arguments.length > 1) acc = initial;
    else if (this.head) {
        walker = this.head.next;
        acc = this.head.value;
    } else throw new TypeError("Reduce of empty list with no initial value");
    for(var i = 0; walker !== null; i++){
        acc = fn(acc, walker.value, i);
        walker = walker.next;
    }
    return acc;
};
$cc833c6ac394c6bf$var$Yallist.prototype.reduceReverse = function(fn, initial) {
    var acc;
    var walker = this.tail;
    if (arguments.length > 1) acc = initial;
    else if (this.tail) {
        walker = this.tail.prev;
        acc = this.tail.value;
    } else throw new TypeError("Reduce of empty list with no initial value");
    for(var i = this.length - 1; walker !== null; i--){
        acc = fn(acc, walker.value, i);
        walker = walker.prev;
    }
    return acc;
};
$cc833c6ac394c6bf$var$Yallist.prototype.toArray = function() {
    var arr = new Array(this.length);
    for(var i = 0, walker = this.head; walker !== null; i++){
        arr[i] = walker.value;
        walker = walker.next;
    }
    return arr;
};
$cc833c6ac394c6bf$var$Yallist.prototype.toArrayReverse = function() {
    var arr = new Array(this.length);
    for(var i = 0, walker = this.tail; walker !== null; i++){
        arr[i] = walker.value;
        walker = walker.prev;
    }
    return arr;
};
$cc833c6ac394c6bf$var$Yallist.prototype.slice = function(from, to) {
    to = to || this.length;
    if (to < 0) to += this.length;
    from = from || 0;
    if (from < 0) from += this.length;
    var ret = new $cc833c6ac394c6bf$var$Yallist();
    if (to < from || to < 0) return ret;
    if (from < 0) from = 0;
    if (to > this.length) to = this.length;
    for(var i = 0, walker = this.head; walker !== null && i < from; i++)walker = walker.next;
    for(; walker !== null && i < to; i++, walker = walker.next)ret.push(walker.value);
    return ret;
};
$cc833c6ac394c6bf$var$Yallist.prototype.sliceReverse = function(from, to) {
    to = to || this.length;
    if (to < 0) to += this.length;
    from = from || 0;
    if (from < 0) from += this.length;
    var ret = new $cc833c6ac394c6bf$var$Yallist();
    if (to < from || to < 0) return ret;
    if (from < 0) from = 0;
    if (to > this.length) to = this.length;
    for(var i = this.length, walker = this.tail; walker !== null && i > to; i--)walker = walker.prev;
    for(; walker !== null && i > from; i--, walker = walker.prev)ret.push(walker.value);
    return ret;
};
$cc833c6ac394c6bf$var$Yallist.prototype.splice = function(start, deleteCount, ...nodes) {
    if (start > this.length) start = this.length - 1;
    if (start < 0) start = this.length + start;
    for(var i = 0, walker = this.head; walker !== null && i < start; i++)walker = walker.next;
    var ret = [];
    for(var i = 0; walker && i < deleteCount; i++){
        ret.push(walker.value);
        walker = this.removeNode(walker);
    }
    if (walker === null) walker = this.tail;
    if (walker !== this.head && walker !== this.tail) walker = walker.prev;
    for(var i = 0; i < nodes.length; i++)walker = $cc833c6ac394c6bf$var$insert(this, walker, nodes[i]);
    return ret;
};
$cc833c6ac394c6bf$var$Yallist.prototype.reverse = function() {
    var head = this.head;
    var tail = this.tail;
    for(var walker = head; walker !== null; walker = walker.prev){
        var p = walker.prev;
        walker.prev = walker.next;
        walker.next = p;
    }
    this.head = tail;
    this.tail = head;
    return this;
};
function $cc833c6ac394c6bf$var$insert(self, node, value) {
    var inserted = node === self.head ? new $cc833c6ac394c6bf$var$Node(value, null, node, self) : new $cc833c6ac394c6bf$var$Node(value, node, node.next, self);
    if (inserted.next === null) self.tail = inserted;
    if (inserted.prev === null) self.head = inserted;
    self.length++;
    return inserted;
}
function $cc833c6ac394c6bf$var$push(self, item) {
    self.tail = new $cc833c6ac394c6bf$var$Node(item, self.tail, null, self);
    if (!self.head) self.head = self.tail;
    self.length++;
}
function $cc833c6ac394c6bf$var$unshift(self, item) {
    self.head = new $cc833c6ac394c6bf$var$Node(item, null, self.head, self);
    if (!self.tail) self.tail = self.head;
    self.length++;
}
function $cc833c6ac394c6bf$var$Node(value, prev, next, list) {
    if (!(this instanceof $cc833c6ac394c6bf$var$Node)) return new $cc833c6ac394c6bf$var$Node(value, prev, next, list);
    this.list = list;
    this.value = value;
    if (prev) {
        prev.next = this;
        this.prev = prev;
    } else this.prev = null;
    if (next) {
        next.prev = this;
        this.next = next;
    } else this.next = null;
}

try {
    // add if support for Symbol.iterator is present
    (parcelRequire("gJI1J"))($cc833c6ac394c6bf$var$Yallist);
} catch (er) {}

});
parcelRequire.register("gJI1J", function(module, exports) {
"use strict";
module.exports = function(Yallist) {
    Yallist.prototype[Symbol.iterator] = function*() {
        for(let walker = this.head; walker; walker = walker.next)yield walker.value;
    };
};

});





parcelRequire.register("2T0n0", function(module, exports) {

var $9TL8u = parcelRequire("9TL8u");
const $21a1014b7e13e379$var$satisfies = (version, range, options)=>{
    try {
        range = new $9TL8u(range, options);
    } catch (er) {
        return false;
    }
    return range.test(version);
};
module.exports = $21a1014b7e13e379$var$satisfies;

});

parcelRequire.register("i1nVZ", function(module, exports) {

var $9TL8u = parcelRequire("9TL8u");
// Mostly just for testing and legacy API reasons
const $d1eae2dd21d28809$var$toComparators = (range, options)=>new $9TL8u(range, options).set.map((comp)=>comp.map((c)=>c.value).join(" ").trim().split(" "));
module.exports = $d1eae2dd21d28809$var$toComparators;

});

parcelRequire.register("k2PxJ", function(module, exports) {

var $jBDeE = parcelRequire("jBDeE");

var $9TL8u = parcelRequire("9TL8u");
const $e97bf9ecfb49ebda$var$maxSatisfying = (versions, range, options)=>{
    let max = null;
    let maxSV = null;
    let rangeObj = null;
    try {
        rangeObj = new $9TL8u(range, options);
    } catch (er) {
        return null;
    }
    versions.forEach((v)=>{
        if (rangeObj.test(v)) // satisfies(v, range, options)
        {
            if (!max || maxSV.compare(v) === -1) {
                // compare(max, v, true)
                max = v;
                maxSV = new $jBDeE(max, options);
            }
        }
    });
    return max;
};
module.exports = $e97bf9ecfb49ebda$var$maxSatisfying;

});

parcelRequire.register("bBjqu", function(module, exports) {

var $jBDeE = parcelRequire("jBDeE");

var $9TL8u = parcelRequire("9TL8u");
const $8722380b5918bfe5$var$minSatisfying = (versions, range, options)=>{
    let min = null;
    let minSV = null;
    let rangeObj = null;
    try {
        rangeObj = new $9TL8u(range, options);
    } catch (er) {
        return null;
    }
    versions.forEach((v)=>{
        if (rangeObj.test(v)) // satisfies(v, range, options)
        {
            if (!min || minSV.compare(v) === 1) {
                // compare(min, v, true)
                min = v;
                minSV = new $jBDeE(min, options);
            }
        }
    });
    return min;
};
module.exports = $8722380b5918bfe5$var$minSatisfying;

});

parcelRequire.register("cjeSI", function(module, exports) {

var $jBDeE = parcelRequire("jBDeE");

var $9TL8u = parcelRequire("9TL8u");

var $7LHti = parcelRequire("7LHti");
const $8f62cd8ef13fc972$var$minVersion = (range, loose)=>{
    range = new $9TL8u(range, loose);
    let minver = new $jBDeE("0.0.0");
    if (range.test(minver)) return minver;
    minver = new $jBDeE("0.0.0-0");
    if (range.test(minver)) return minver;
    minver = null;
    for(let i = 0; i < range.set.length; ++i){
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator)=>{
            // Clone to avoid manipulating the comparator's semver object.
            const compver = new $jBDeE(comparator.semver.version);
            switch(comparator.operator){
                case ">":
                    if (compver.prerelease.length === 0) compver.patch++;
                    else compver.prerelease.push(0);
                    compver.raw = compver.format();
                /* fallthrough */ case "":
                case ">=":
                    if (!setMin || $7LHti(compver, setMin)) setMin = compver;
                    break;
                case "<":
                case "<=":
                    break;
                /* istanbul ignore next */ default:
                    throw new Error(`Unexpected operation: ${comparator.operator}`);
            }
        });
        if (setMin && (!minver || $7LHti(minver, setMin))) minver = setMin;
    }
    if (minver && range.test(minver)) return minver;
    return null;
};
module.exports = $8f62cd8ef13fc972$var$minVersion;

});

parcelRequire.register("9u3Cv", function(module, exports) {

var $9TL8u = parcelRequire("9TL8u");
const $6e79b948d6dd3ba1$var$validRange = (range, options)=>{
    try {
        // Return '*' instead of '' so that truthiness works.
        // This will throw if it's invalid anyway
        return new $9TL8u(range, options).range || "*";
    } catch (er) {
        return null;
    }
};
module.exports = $6e79b948d6dd3ba1$var$validRange;

});

parcelRequire.register("l90bp", function(module, exports) {

var $jBDeE = parcelRequire("jBDeE");

var $8LvkC = parcelRequire("8LvkC");
const { ANY: $f64a948ffde4b194$var$ANY  } = $8LvkC;

var $9TL8u = parcelRequire("9TL8u");

var $2T0n0 = parcelRequire("2T0n0");

var $7LHti = parcelRequire("7LHti");

var $3h2Uq = parcelRequire("3h2Uq");

var $1T6D1 = parcelRequire("1T6D1");

var $3rcex = parcelRequire("3rcex");
const $f64a948ffde4b194$var$outside = (version, range, hilo, options)=>{
    version = new $jBDeE(version, options);
    range = new $9TL8u(range, options);
    let gtfn, ltefn, ltfn, comp, ecomp;
    switch(hilo){
        case ">":
            gtfn = $7LHti;
            ltefn = $1T6D1;
            ltfn = $3h2Uq;
            comp = ">";
            ecomp = ">=";
            break;
        case "<":
            gtfn = $3h2Uq;
            ltefn = $3rcex;
            ltfn = $7LHti;
            comp = "<";
            ecomp = "<=";
            break;
        default:
            throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    // If it satisfies the range it is not outside
    if ($2T0n0(version, range, options)) return false;
    // From now on, variable terms are as if we're in "gtr" mode.
    // but note that everything is flipped for the "ltr" function.
    for(let i = 0; i < range.set.length; ++i){
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator)=>{
            if (comparator.semver === $f64a948ffde4b194$var$ANY) comparator = new $8LvkC(">=0.0.0");
            high = high || comparator;
            low = low || comparator;
            if (gtfn(comparator.semver, high.semver, options)) high = comparator;
            else if (ltfn(comparator.semver, low.semver, options)) low = comparator;
        });
        // If the edge version comparator has a operator then our version
        // isn't outside it
        if (high.operator === comp || high.operator === ecomp) return false;
        // If the lowest version comparator has an operator and our version
        // is less than it then it isn't higher than the range
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) return false;
        else if (low.operator === ecomp && ltfn(version, low.semver)) return false;
    }
    return true;
};
module.exports = $f64a948ffde4b194$var$outside;

});

parcelRequire.register("gNrMi", function(module, exports) {

var $l90bp = parcelRequire("l90bp");
const $c3a6c512295e3015$var$gtr = (version, range, options)=>$l90bp(version, range, ">", options);
module.exports = $c3a6c512295e3015$var$gtr;

});

parcelRequire.register("aflPG", function(module, exports) {

var $l90bp = parcelRequire("l90bp");
// Determine if version is less than all the versions possible in the range
const $775c3d9f5c348fa1$var$ltr = (version, range, options)=>$l90bp(version, range, "<", options);
module.exports = $775c3d9f5c348fa1$var$ltr;

});

parcelRequire.register("eqNDh", function(module, exports) {

var $9TL8u = parcelRequire("9TL8u");
const $a819fe5fa31accd6$var$intersects = (r1, r2, options)=>{
    r1 = new $9TL8u(r1, options);
    r2 = new $9TL8u(r2, options);
    return r1.intersects(r2);
};
module.exports = $a819fe5fa31accd6$var$intersects;

});

parcelRequire.register("aWoAb", function(module, exports) {

var $2T0n0 = parcelRequire("2T0n0");

var $ewsTG = parcelRequire("ewsTG");
module.exports = (versions, range, options)=>{
    const set = [];
    let first = null;
    let prev = null;
    const v = versions.sort((a, b)=>$ewsTG(a, b, options));
    for (const version of v){
        const included = $2T0n0(version, range, options);
        if (included) {
            prev = version;
            if (!first) first = version;
        } else {
            if (prev) set.push([
                first,
                prev
            ]);
            prev = null;
            first = null;
        }
    }
    if (first) set.push([
        first,
        null
    ]);
    const ranges = [];
    for (const [min, max] of set){
        if (min === max) ranges.push(min);
        else if (!max && min === v[0]) ranges.push("*");
        else if (!max) ranges.push(`>=${min}`);
        else if (min === v[0]) ranges.push(`<=${max}`);
        else ranges.push(`${min} - ${max}`);
    }
    const simplified = ranges.join(" || ");
    const original = typeof range.raw === "string" ? range.raw : String(range);
    return simplified.length < original.length ? simplified : range;
};

});

parcelRequire.register("6XZpA", function(module, exports) {

var $9TL8u = parcelRequire("9TL8u");

var $8LvkC = parcelRequire("8LvkC");
const { ANY: $5127e3da10d549e9$var$ANY  } = $8LvkC;

var $2T0n0 = parcelRequire("2T0n0");

var $ewsTG = parcelRequire("ewsTG");
// Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
// - Every simple range `r1, r2, ...` is a null set, OR
// - Every simple range `r1, r2, ...` which is not a null set is a subset of
//   some `R1, R2, ...`
//
// Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
// - If c is only the ANY comparator
//   - If C is only the ANY comparator, return true
//   - Else if in prerelease mode, return false
//   - else replace c with `[>=0.0.0]`
// - If C is only the ANY comparator
//   - if in prerelease mode, return true
//   - else replace C with `[>=0.0.0]`
// - Let EQ be the set of = comparators in c
// - If EQ is more than one, return true (null set)
// - Let GT be the highest > or >= comparator in c
// - Let LT be the lowest < or <= comparator in c
// - If GT and LT, and GT.semver > LT.semver, return true (null set)
// - If any C is a = range, and GT or LT are set, return false
// - If EQ
//   - If GT, and EQ does not satisfy GT, return true (null set)
//   - If LT, and EQ does not satisfy LT, return true (null set)
//   - If EQ satisfies every C, return true
//   - Else return false
// - If GT
//   - If GT.semver is lower than any > or >= comp in C, return false
//   - If GT is >=, and GT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the GT.semver tuple, return false
// - If LT
//   - If LT.semver is greater than any < or <= comp in C, return false
//   - If LT is <=, and LT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the LT.semver tuple, return false
// - Else return true
const $5127e3da10d549e9$var$subset = (sub, dom, options = {})=>{
    if (sub === dom) return true;
    sub = new $9TL8u(sub, options);
    dom = new $9TL8u(dom, options);
    let sawNonNull = false;
    OUTER: for (const simpleSub of sub.set){
        for (const simpleDom of dom.set){
            const isSub = $5127e3da10d549e9$var$simpleSubset(simpleSub, simpleDom, options);
            sawNonNull = sawNonNull || isSub !== null;
            if (isSub) continue OUTER;
        }
        // the null set is a subset of everything, but null simple ranges in
        // a complex range should be ignored.  so if we saw a non-null range,
        // then we know this isn't a subset, but if EVERY simple range was null,
        // then it is a subset.
        if (sawNonNull) return false;
    }
    return true;
};
const $5127e3da10d549e9$var$simpleSubset = (sub, dom, options)=>{
    if (sub === dom) return true;
    if (sub.length === 1 && sub[0].semver === $5127e3da10d549e9$var$ANY) {
        if (dom.length === 1 && dom[0].semver === $5127e3da10d549e9$var$ANY) return true;
        else if (options.includePrerelease) sub = [
            new $8LvkC(">=0.0.0-0")
        ];
        else sub = [
            new $8LvkC(">=0.0.0")
        ];
    }
    if (dom.length === 1 && dom[0].semver === $5127e3da10d549e9$var$ANY) {
        if (options.includePrerelease) return true;
        else dom = [
            new $8LvkC(">=0.0.0")
        ];
    }
    const eqSet = new Set();
    let gt, lt;
    for (const c of sub){
        if (c.operator === ">" || c.operator === ">=") gt = $5127e3da10d549e9$var$higherGT(gt, c, options);
        else if (c.operator === "<" || c.operator === "<=") lt = $5127e3da10d549e9$var$lowerLT(lt, c, options);
        else eqSet.add(c.semver);
    }
    if (eqSet.size > 1) return null;
    let gtltComp;
    if (gt && lt) {
        gtltComp = $ewsTG(gt.semver, lt.semver, options);
        if (gtltComp > 0) return null;
        else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) return null;
    }
    // will iterate one or zero times
    for (const eq of eqSet){
        if (gt && !$2T0n0(eq, String(gt), options)) return null;
        if (lt && !$2T0n0(eq, String(lt), options)) return null;
        for (const c of dom){
            if (!$2T0n0(eq, String(c), options)) return false;
        }
        return true;
    }
    let higher, lower;
    let hasDomLT, hasDomGT;
    // if the subset has a prerelease, we need a comparator in the superset
    // with the same tuple and a prerelease, or it's not a subset
    let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
    let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
    // exception: <1.2.3-0 is the same as <1.2.3
    if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) needDomLTPre = false;
    for (const c1 of dom){
        hasDomGT = hasDomGT || c1.operator === ">" || c1.operator === ">=";
        hasDomLT = hasDomLT || c1.operator === "<" || c1.operator === "<=";
        if (gt) {
            if (needDomGTPre) {
                if (c1.semver.prerelease && c1.semver.prerelease.length && c1.semver.major === needDomGTPre.major && c1.semver.minor === needDomGTPre.minor && c1.semver.patch === needDomGTPre.patch) needDomGTPre = false;
            }
            if (c1.operator === ">" || c1.operator === ">=") {
                higher = $5127e3da10d549e9$var$higherGT(gt, c1, options);
                if (higher === c1 && higher !== gt) return false;
            } else if (gt.operator === ">=" && !$2T0n0(gt.semver, String(c1), options)) return false;
        }
        if (lt) {
            if (needDomLTPre) {
                if (c1.semver.prerelease && c1.semver.prerelease.length && c1.semver.major === needDomLTPre.major && c1.semver.minor === needDomLTPre.minor && c1.semver.patch === needDomLTPre.patch) needDomLTPre = false;
            }
            if (c1.operator === "<" || c1.operator === "<=") {
                lower = $5127e3da10d549e9$var$lowerLT(lt, c1, options);
                if (lower === c1 && lower !== lt) return false;
            } else if (lt.operator === "<=" && !$2T0n0(lt.semver, String(c1), options)) return false;
        }
        if (!c1.operator && (lt || gt) && gtltComp !== 0) return false;
    }
    // if there was a < or >, and nothing in the dom, then must be false
    // UNLESS it was limited by another range in the other direction.
    // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
    if (gt && hasDomLT && !lt && gtltComp !== 0) return false;
    if (lt && hasDomGT && !gt && gtltComp !== 0) return false;
    // we needed a prerelease range in a specific tuple, but didn't get one
    // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
    // because it includes prereleases in the 1.2.3 tuple
    if (needDomGTPre || needDomLTPre) return false;
    return true;
};
// >=1.2.3 is lower than >1.2.3
const $5127e3da10d549e9$var$higherGT = (a, b, options)=>{
    if (!a) return b;
    const comp = $ewsTG(a.semver, b.semver, options);
    return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
};
// <=1.2.3 is higher than <1.2.3
const $5127e3da10d549e9$var$lowerLT = (a, b, options)=>{
    if (!a) return b;
    const comp = $ewsTG(a.semver, b.semver, options);
    return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
};
module.exports = $5127e3da10d549e9$var$subset;

});



parcelRequire.register("lPKUA", function(module, exports) {

$parcel$export(module.exports, "log", () => $fe52c014fc2e7027$export$bef1f36f5486a6a3);
var $fe52c014fc2e7027$var$id = 0;
var $fe52c014fc2e7027$var$subscribers = [];
var $fe52c014fc2e7027$export$bef1f36f5486a6a3 = function(type, message, data) {
    var obj = {
        type: type,
        id: String(++$fe52c014fc2e7027$var$id),
        date: new Date()
    };
    if (message) obj.message = message;
    if (data) obj.data = data;
    $fe52c014fc2e7027$var$dispatch(obj);
};
var $fe52c014fc2e7027$export$63174c828edd6ff8 = function(cb) {
    $fe52c014fc2e7027$var$subscribers.push(cb);
    return function() {
        var i = $fe52c014fc2e7027$var$subscribers.indexOf(cb);
        if (i !== -1) {
            // equivalent of subscribers.splice(i, 1) // https://twitter.com/Rich_Harris/status/1125850391155965952
            $fe52c014fc2e7027$var$subscribers[i] = $fe52c014fc2e7027$var$subscribers[$fe52c014fc2e7027$var$subscribers.length - 1];
            $fe52c014fc2e7027$var$subscribers.pop();
        }
    };
};
function $fe52c014fc2e7027$var$dispatch(log1) {
    for(var i = 0; i < $fe52c014fc2e7027$var$subscribers.length; i++)try {
        $fe52c014fc2e7027$var$subscribers[i](log1);
    } catch (e) {
        console.error(e);
    }
}
if (typeof window !== "undefined") window.__ledgerLogsListen = $fe52c014fc2e7027$export$63174c828edd6ff8;

});

parcelRequire.register("lnDAt", function(module, exports) {

$parcel$export(module.exports, "requestLedgerDevice", () => $f90a7425614dd4fe$export$5e45f905eefbea79, (v) => $f90a7425614dd4fe$export$5e45f905eefbea79 = v);
$parcel$export(module.exports, "getLedgerDevices", () => $f90a7425614dd4fe$export$36755904a34d5197, (v) => $f90a7425614dd4fe$export$36755904a34d5197 = v);
$parcel$export(module.exports, "getFirstLedgerDevice", () => $f90a7425614dd4fe$export$527d8164321a6e6c, (v) => $f90a7425614dd4fe$export$527d8164321a6e6c = v);
$parcel$export(module.exports, "isSupported", () => $f90a7425614dd4fe$export$48c17662a6902497, (v) => $f90a7425614dd4fe$export$48c17662a6902497 = v);

var $2XWm1 = parcelRequire("2XWm1");
var $f90a7425614dd4fe$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $f90a7425614dd4fe$var$__generator = undefined && undefined.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
var $f90a7425614dd4fe$var$ledgerDevices = [
    {
        vendorId: (0, $2XWm1.ledgerUSBVendorId)
    }, 
];
function $f90a7425614dd4fe$export$5e45f905eefbea79() {
    return $f90a7425614dd4fe$var$__awaiter(this, void 0, void 0, function() {
        var device;
        return $f90a7425614dd4fe$var$__generator(this, function(_a) {
            switch(_a.label){
                case 0:
                    return [
                        4 /*yield*/ ,
                        navigator.usb.requestDevice({
                            filters: $f90a7425614dd4fe$var$ledgerDevices
                        })
                    ];
                case 1:
                    device = _a.sent();
                    return [
                        2 /*return*/ ,
                        device
                    ];
            }
        });
    });
}
function $f90a7425614dd4fe$export$36755904a34d5197() {
    return $f90a7425614dd4fe$var$__awaiter(this, void 0, void 0, function() {
        var devices;
        return $f90a7425614dd4fe$var$__generator(this, function(_a) {
            switch(_a.label){
                case 0:
                    return [
                        4 /*yield*/ ,
                        navigator.usb.getDevices()
                    ];
                case 1:
                    devices = _a.sent();
                    return [
                        2 /*return*/ ,
                        devices.filter(function(d) {
                            return d.vendorId === (0, $2XWm1.ledgerUSBVendorId);
                        })
                    ];
            }
        });
    });
}
function $f90a7425614dd4fe$export$527d8164321a6e6c() {
    return $f90a7425614dd4fe$var$__awaiter(this, void 0, void 0, function() {
        var existingDevices;
        return $f90a7425614dd4fe$var$__generator(this, function(_a) {
            switch(_a.label){
                case 0:
                    return [
                        4 /*yield*/ ,
                        $f90a7425614dd4fe$export$36755904a34d5197()
                    ];
                case 1:
                    existingDevices = _a.sent();
                    if (existingDevices.length > 0) return [
                        2 /*return*/ ,
                        existingDevices[0]
                    ];
                    return [
                        2 /*return*/ ,
                        $f90a7425614dd4fe$export$5e45f905eefbea79()
                    ];
            }
        });
    });
}
var $f90a7425614dd4fe$export$48c17662a6902497 = function() {
    return Promise.resolve(!!navigator && !!navigator.usb && typeof navigator.usb.getDevices === "function");
};

});


// Use strict
"use strict";
// Classes
// Transport Web Bluetooth
class $0c4792fd968d12b8$var$TransportWebBluetooth {
    // Public
    // Constructor
    constructor(connection, writeCharacteristic, notifyCharacteristic, mtu){
        // Set connection
        this.connection = connection;
        // Set write characteristic
        this.writeCharacteristic = writeCharacteristic;
        // Set notify characteristic
        this.notifyCharacteristic = notifyCharacteristic;
        // Set MTU
        this.mtu = mtu;
        // Set allow disconnect event to true
        this.allowDisconnectEvent = true;
        // Set device model
        this["deviceModel"] = {
            // Product name
            "productName": $0c4792fd968d12b8$var$TransportWebBluetooth.PRODUCT_NAME
        };
    }
    // On
    on(event, callback) {
        // Check event
        switch(event){
            // Disconnect
            case "disconnect":
                // Set self
                var self = this;
                // Create callback once
                var callbackOnce = function() {
                    // Remove GATT server disconnected event
                    self.connection["device"].removeEventListener("gattserverdisconnected", callbackOnce);
                    // Check if disconnect event is allowed
                    if (self.allowDisconnectEvent === true) // Call callback
                    callback();
                };
                // Device GATT server disconnected event
                this.connection["device"].addEventListener("gattserverdisconnected", callbackOnce);
                break;
        }
    }
    // Close
    close() {
        // Clear allow disconnect event
        this.allowDisconnectEvent = false;
        // Check if connection is connected
        if (this.connection["connected"] === true) // Disconnect connection
        this.connection.disconnect();
        // Return promise
        return new Promise(function(resolve, reject) {
            // Resolve
            resolve();
        });
    }
    // Send
    send(requestClass, requestInstruction, parameterOne, parameterTwo, data) {
        // Set self
        var self = this;
        // Return promise
        return new Promise(function(resolve, reject) {
            // Check if connection is connected
            if (self.connection["connected"] === true) {
                // Create header
                var header = new Uint8Array([
                    requestClass,
                    requestInstruction,
                    parameterOne,
                    parameterTwo,
                    data["length"]
                ]);
                // Create APDU
                var apdu = new Uint8Array(header["length"] + data["length"]);
                apdu.set(header);
                apdu.set(data, header["length"]);
                // Return getting APDU response from device
                return $0c4792fd968d12b8$var$TransportWebBluetooth.sendRequest(self.connection, self.writeCharacteristic, self.notifyCharacteristic, $0c4792fd968d12b8$var$TransportWebBluetooth.APDU_COMMAND_TAG, apdu, self.mtu).then(function(response) {
                    // Check if connection is connected
                    if (self.connection["connected"] === true) {
                        // Check if response contains a status
                        if (response["length"] >= $0c4792fd968d12b8$var$TransportWebBluetooth.APDU_STATUS_LENGTH) {
                            // Get status
                            var status = response[response["length"] - 1] | response[response["length"] - 2] << $0c4792fd968d12b8$var$TransportWebBluetooth.BITS_IN_A_BYTE;
                            // Check if status is success
                            if (status === $0c4792fd968d12b8$var$TransportWebBluetooth.APDU_SUCCESS_STATUS) // Resolve response
                            resolve(response);
                            else // Reject error
                            reject({
                                // Status code
                                "statusCode": status
                            });
                        } else // Reject
                        reject();
                    } else // Reject error
                    reject(new DOMException("", "NetworkError"));
                // Catch errors
                }).catch(function(error) {
                    // Check if connection is connected
                    if (self.connection["connected"] === true) // Reject error
                    reject(error);
                    else // Reject error
                    reject(new DOMException("", "NetworkError"));
                });
            } else // Reject error
            reject(new DOMException("", "NetworkError"));
        });
    }
    // Request
    static request(device1 = $0c4792fd968d12b8$var$TransportWebBluetooth.NO_DEVICE) {
        // Return promise
        return new Promise(function(resolve1, reject1) {
            // Get device
            var getDevice = function() {
                // Return promise
                return new Promise(function(resolve, reject) {
                    // Check if no device was provided
                    if (device1 === $0c4792fd968d12b8$var$TransportWebBluetooth.NO_DEVICE) // Return getting device
                    return navigator["bluetooth"].requestDevice({
                        // Filters
                        "filters": [
                            {
                                // Services
                                "services": [
                                    // Service UUID
                                    $0c4792fd968d12b8$var$TransportWebBluetooth.SERVICE_UUID
                                ]
                            }
                        ]
                    }).then(function(device) {
                        // Resolve device
                        resolve(device);
                    // Catch errors
                    }).catch(function(error) {
                        // Reject error
                        reject(error);
                    });
                    else // Resolve device
                    resolve(device1);
                });
            };
            // Return getting device
            return getDevice().then(function(device) {
                // Get connection
                var getConnection = function() {
                    // Return promise
                    return new Promise(function(resolve, reject) {
                        // Check if device's connection is already connected
                        if (device["gatt"]["connected"] === true) // Resolve connection
                        resolve(device["gatt"]);
                        else // Return getting connection to the device
                        return device["gatt"].connect().then(function(connection) {
                            // Check if connection is connected
                            if (connection["connected"] === true) // Resolve connection
                            resolve(connection);
                            else // Reject
                            reject();
                        // Catch errors
                        }).catch(function(error) {
                            // Reject error
                            reject(error);
                        });
                    });
                };
                // Return getting connection
                return getConnection().then(function(connection) {
                    // Check if connection is connected
                    if (connection["connected"] === true) {
                        // Initialize timeout occurred
                        var timeoutOccurred = false;
                        // Connection timeout
                        var connectTimeout = setTimeout(function() {
                            // Set timeout occurred
                            timeoutOccurred = true;
                            // Check if connection is connected
                            if (connection["connected"] === true) // Disconnect connection
                            connection.disconnect();
                            // Reject
                            reject1();
                        }, $0c4792fd968d12b8$var$TransportWebBluetooth.CONNECT_TIMEOUT_DURATION_MILLISECONDS);
                        // Return getting connection's service
                        return connection.getPrimaryService($0c4792fd968d12b8$var$TransportWebBluetooth.SERVICE_UUID).then(function(service) {
                            // Check if a timeout didn't occur
                            if (timeoutOccurred === false) {
                                // Clear connect timeout
                                clearTimeout(connectTimeout);
                                // Check if connection is connected
                                if (connection["connected"] === true) // Return getting service's notify characteristic
                                return service.getCharacteristic($0c4792fd968d12b8$var$TransportWebBluetooth.NOTIFY_CHARACTERISTIC_UUID).then(function(notifyCharacteristic) {
                                    // Check if connection is connected
                                    if (connection["connected"] === true) // Return getting service's write characteristic
                                    return service.getCharacteristic($0c4792fd968d12b8$var$TransportWebBluetooth.WRITE_CHARACTERISTIC_UUID).then(function(writeCharacteristic) {
                                        // Check if connection is connected
                                        if (connection["connected"] === true) // Return starting notify characteristic's notifications
                                        return notifyCharacteristic.startNotifications().then(function() {
                                            // Check if connection is connected
                                            if (connection["connected"] === true) {
                                                // Disconnected handler
                                                var disconnectedHandler = function() {
                                                    // Remove GATT server disconnected event
                                                    device.removeEventListener("gattserverdisconnected", disconnectedHandler);
                                                    // Stop notifications and catch errors
                                                    notifyCharacteristic.stopNotifications().catch(function(error) {});
                                                };
                                                // Device GATT server disconnected event
                                                device.addEventListener("gattserverdisconnected", disconnectedHandler);
                                                // Return getting MTU from device
                                                return $0c4792fd968d12b8$var$TransportWebBluetooth.sendRequest(connection, writeCharacteristic, notifyCharacteristic, $0c4792fd968d12b8$var$TransportWebBluetooth.GET_MTU_COMMAND_TAG).then(function(response) {
                                                    // Check if connection is connected
                                                    if (connection["connected"] === true) {
                                                        // Check if response is valid
                                                        if (response["length"] === 1) {
                                                            // Get MTU from response
                                                            var mtu = Math.min(response[0], $0c4792fd968d12b8$var$TransportWebBluetooth.MAXIMUM_MTU);
                                                            // Check if MTU is valid
                                                            if (mtu >= $0c4792fd968d12b8$var$TransportWebBluetooth.MINIMUM_MTU) {
                                                                // Create transport
                                                                var transport = new $0c4792fd968d12b8$var$TransportWebBluetooth(connection, writeCharacteristic, notifyCharacteristic, mtu);
                                                                // Resolve transport
                                                                resolve1(transport);
                                                            } else {
                                                                // Disconnect connection
                                                                connection.disconnect();
                                                                // Reject
                                                                reject1();
                                                            }
                                                        } else {
                                                            // Disconnect connection
                                                            connection.disconnect();
                                                            // Reject
                                                            reject1();
                                                        }
                                                    } else // Reject
                                                    reject1();
                                                // Catch errors
                                                }).catch(function(error) {
                                                    // Check if connection is connected
                                                    if (connection["connected"] === true) // Disconnect connection
                                                    connection.disconnect();
                                                    // Reject error
                                                    reject1(error);
                                                });
                                            } else // Return stopping notifications and catch errors
                                            return notifyCharacteristic.stopNotifications().catch(function(error) {
                                            // Finally
                                            }).finally(function() {
                                                // Reject
                                                reject1();
                                            });
                                        // Catch errors
                                        }).catch(function(error) {
                                            // Check if connection is connected
                                            if (connection["connected"] === true) // Disconnect connection
                                            connection.disconnect();
                                            // Reject error
                                            reject1(error);
                                        });
                                        else // Reject
                                        reject1();
                                    // Catch errors
                                    }).catch(function(error) {
                                        // Check if connection is connected
                                        if (connection["connected"] === true) // Disconnect connection
                                        connection.disconnect();
                                        // Reject error
                                        reject1(error);
                                    });
                                    else // Reject
                                    reject1();
                                // Catch errors
                                }).catch(function(error) {
                                    // Check if connection is connected
                                    if (connection["connected"] === true) // Disconnect connection
                                    connection.disconnect();
                                    // Reject error
                                    reject1(error);
                                });
                                else // Reject
                                reject1();
                            }
                        // Catch errors
                        }).catch(function(error1) {
                            // Check if a timeout didn't occur
                            if (timeoutOccurred === false) {
                                // Clear connect timeout
                                clearTimeout(connectTimeout);
                                // Check if connection is connected
                                if (connection["connected"] === true) // Disconnect connection
                                connection.disconnect();
                                // Check if disconnected error occurred
                                if (error1["code"] === new DOMException("", "NetworkError")["code"]) // Return requesting transport
                                return $0c4792fd968d12b8$var$TransportWebBluetooth.request(device).then(function(transport) {
                                    // Resolve transport
                                    resolve1(transport);
                                // Catch errors
                                }).catch(function(error) {
                                    // Reject error
                                    reject1(error);
                                });
                                else // Reject error
                                reject1(error1);
                            }
                        });
                    } else // Reject
                    reject1();
                // Catch errors
                }).catch(function(error) {
                    // Check if device's connection is connected
                    if (device["gatt"]["connected"] === true) // Disconnect device's connection
                    device["gatt"].disconnect();
                    // Reject error
                    reject1(error);
                });
            // Catch errors
            }).catch(function(error) {
                // Reject error
                reject1(error);
            });
        });
    }
    // Private
    // Create packets
    static createPackets(commandTag, payload = $0c4792fd968d12b8$var$TransportWebBluetooth.NO_PAYLOAD, mtu = $0c4792fd968d12b8$var$TransportWebBluetooth.DEFAULT_MTU) {
        // Initialize packets
        var packets = [];
        // Check if payload doesn't exist
        if (payload === $0c4792fd968d12b8$var$TransportWebBluetooth.NO_PAYLOAD) // Set payload to an empty array
        payload = new Uint8Array([]);
        // Initialize payload offset
        var payloadOffset = 0;
        // Go through all packets required to send the payload
        for(var i = 0; i === 0 || payloadOffset !== payload["length"]; ++i){
            // Check if at the first packet
            if (i === 0) // Create header
            var header = new Uint8Array([
                commandTag,
                i >> $0c4792fd968d12b8$var$TransportWebBluetooth.BITS_IN_A_BYTE,
                i,
                payload["length"] >> $0c4792fd968d12b8$var$TransportWebBluetooth.BITS_IN_A_BYTE,
                payload["length"]
            ]);
            else // Create header
            var header = new Uint8Array([
                commandTag,
                i >> $0c4792fd968d12b8$var$TransportWebBluetooth.BITS_IN_A_BYTE,
                i
            ]);
            // Get payload part length
            var payloadPartLength = Math.min(payload["length"] - payloadOffset, mtu - header["length"]);
            // Create packet
            var packet = new Uint8Array(header["length"] + payloadPartLength);
            packet.set(header);
            packet.set(payload.subarray(payloadOffset, payloadOffset + payloadPartLength), header["length"]);
            // Append packet to list
            packets.push(packet);
            // Update payload offset
            payloadOffset += payloadPartLength;
        }
        // Return packets
        return packets;
    }
    // Send request
    static sendRequest(connection, writeCharacteristic, notifyCharacteristic, commandTag, payload = $0c4792fd968d12b8$var$TransportWebBluetooth.NO_PAYLOAD, mtu = $0c4792fd968d12b8$var$TransportWebBluetooth.DEFAULT_MTU) {
        // Return promise
        return new Promise(function(resolve2, reject2) {
            // Check if connection is connected
            if (connection["connected"] === true) {
                // Initialize response
                var response = new Uint8Array([]);
                // Initialize response size
                var responseSize;
                // Initialize first response packet
                var firstResponsePacket = true;
                // Initialize sequence index
                var lastSequenceIndex;
                // Process response packet
                var processResponsePacket = function(event) {
                    // Get response packet
                    var responsePacket = new Uint8Array(event["target"]["value"]["buffer"]);
                    // Get tag
                    var tag = responsePacket[$0c4792fd968d12b8$var$TransportWebBluetooth.COMMAND_TAG_INDEX];
                    // Check if tag is invalid
                    if (tag !== commandTag) {
                        // Remove GATT server disconnected event
                        connection["device"].removeEventListener("gattserverdisconnected", disconnectedHandler);
                        // Remove notify characteristic value changed event
                        notifyCharacteristic.removeEventListener("characteristicvaluechanged", processResponsePacket);
                        // Check if connection is connected
                        if (connection["connected"] === true) // Reject
                        reject2();
                        else // Reject error
                        reject2(new DOMException("", "NetworkError"));
                    } else {
                        // Get sequence index
                        var sequenceIndex = responsePacket[$0c4792fd968d12b8$var$TransportWebBluetooth.SEQUENCE_INDEX_INDEX] << $0c4792fd968d12b8$var$TransportWebBluetooth.BITS_IN_A_BYTE | responsePacket[$0c4792fd968d12b8$var$TransportWebBluetooth.SEQUENCE_INDEX_INDEX + 1];
                        // Check if first response packet
                        if (firstResponsePacket === true) {
                            // Check if sequence index is invalid
                            if (sequenceIndex !== 0) {
                                // Remove GATT server disconnected event
                                connection["device"].removeEventListener("gattserverdisconnected", disconnectedHandler);
                                // Remove notify characteristic value changed event
                                notifyCharacteristic.removeEventListener("characteristicvaluechanged", processResponsePacket);
                                // Check if connection is connected
                                if (connection["connected"] === true) // Reject
                                reject2();
                                else // Reject error
                                reject2(new DOMException("", "NetworkError"));
                                // Return
                                return;
                            }
                            // Clear first response packet
                            firstResponsePacket = false;
                            // Get response size
                            responseSize = responsePacket[$0c4792fd968d12b8$var$TransportWebBluetooth.PAYLOAD_SIZE_INDEX] << $0c4792fd968d12b8$var$TransportWebBluetooth.BITS_IN_A_BYTE | responsePacket[$0c4792fd968d12b8$var$TransportWebBluetooth.PAYLOAD_SIZE_INDEX + 1];
                            // Get response part
                            var responsePart = responsePacket.subarray($0c4792fd968d12b8$var$TransportWebBluetooth.PAYLOAD_INDEX);
                        } else {
                            // Check if sequence index is invalid
                            if (sequenceIndex !== lastSequenceIndex + 1) {
                                // Remove GATT server disconnected event
                                connection["device"].removeEventListener("gattserverdisconnected", disconnectedHandler);
                                // Remove notify characteristic value changed event
                                notifyCharacteristic.removeEventListener("characteristicvaluechanged", processResponsePacket);
                                // Check if connection is connected
                                if (connection["connected"] === true) // Reject
                                reject2();
                                else // Reject error
                                reject2(new DOMException("", "NetworkError"));
                                // Return
                                return;
                            }
                            // Get response part
                            var responsePart = responsePacket.subarray($0c4792fd968d12b8$var$TransportWebBluetooth.PAYLOAD_INDEX - 2);
                        }
                        // Update last sequence index
                        lastSequenceIndex = sequenceIndex;
                        // Append response part to response
                        var currentResponse = new Uint8Array(response["length"] + responsePart["length"]);
                        currentResponse.set(response);
                        currentResponse.set(responsePart, response["length"]);
                        response = currentResponse;
                        // Check if entire response has been received
                        if (response["length"] === responseSize) {
                            // Remove GATT server disconnected event
                            connection["device"].removeEventListener("gattserverdisconnected", disconnectedHandler);
                            // Remove notify characteristic value changed event
                            notifyCharacteristic.removeEventListener("characteristicvaluechanged", processResponsePacket);
                            // Check if connection is connected
                            if (connection["connected"] === true) // Resolve response
                            resolve2(response);
                            else // Reject error
                            reject2(new DOMException("", "NetworkError"));
                        }
                    }
                };
                // Disconnected handler
                var disconnectedHandler = function() {
                    // Remove GATT server disconnected event
                    connection["device"].removeEventListener("gattserverdisconnected", disconnectedHandler);
                    // Remove notify characteristic value changed event
                    notifyCharacteristic.removeEventListener("characteristicvaluechanged", processResponsePacket);
                    // Reject error
                    reject2(new DOMException("", "NetworkError"));
                };
                // Notify characteristic value changed event
                notifyCharacteristic.addEventListener("characteristicvaluechanged", processResponsePacket);
                // Device GATT server disconnected event
                connection["device"].addEventListener("gattserverdisconnected", disconnectedHandler);
                // Get packets
                var packets = $0c4792fd968d12b8$var$TransportWebBluetooth.createPackets(commandTag, payload, mtu);
                // Send packet
                var sendPacket = new Promise(function(resolve, reject) {
                    // Check if connection is connected
                    if (connection["connected"] === true) // Resolve
                    resolve();
                    else // Reject error
                    reject(new DOMException("", "NetworkError"));
                });
                // Initialize sending packets
                var sendingPackets = [
                    sendPacket
                ];
                // Go through all packets
                for(var i = 0; i < packets["length"]; ++i){
                    // Get packet
                    let packet = packets[i];
                    // Send next pack after previous packet is send
                    sendPacket = sendPacket.then(function() {
                        // Return promise
                        return new Promise(function(resolve, reject) {
                            // Check if connection is connected
                            if (connection["connected"] === true) // Return writing packet
                            return writeCharacteristic.writeValueWithResponse(packet).then(function() {
                                // Check if connection is connected
                                if (connection["connected"] === true) // Resolve
                                resolve();
                                else // Reject error
                                reject(new DOMException("", "NetworkError"));
                            // Catch errors
                            }).catch(function(error) {
                                // Check if connection is connected
                                if (connection["connected"] === true) // Reject error
                                reject(error);
                                else // Reject error
                                reject(new DOMException("", "NetworkError"));
                            });
                            else // Reject error
                            reject(new DOMException("", "NetworkError"));
                        });
                    // Catch errors
                    }).catch(function(error) {
                        // Return promise
                        return new Promise(function(resolve, reject) {
                            // Check if connection is connected
                            if (connection["connected"] === true) // Reject error
                            reject(error);
                            else // Reject error
                            reject(new DOMException("", "NetworkError"));
                        });
                    });
                }
                // Return sending all packets and catch errors
                return Promise.all(sendingPackets).catch(function(error) {
                    // Remove GATT server disconnected event
                    connection["device"].removeEventListener("gattserverdisconnected", disconnectedHandler);
                    // Remove notify characteristic value changed event
                    notifyCharacteristic.removeEventListener("characteristicvaluechanged", processResponsePacket);
                    // Check if connection is connected
                    if (connection["connected"] === true) // Reject error
                    reject2(error);
                    else // Reject error
                    reject2(new DOMException("", "NetworkError"));
                });
            } else // Reject error
            reject2(new DOMException("", "NetworkError"));
        });
    }
    // Service UUID
    static get SERVICE_UUID() {
        // Return service UUID
        return "13d63400-2c97-0004-0000-4c6564676572";
    }
    // Notify characteristic UUID
    static get NOTIFY_CHARACTERISTIC_UUID() {
        // Return notify characteristic UUID
        return "13d63400-2c97-0004-0001-4c6564676572";
    }
    // Write characteristic UUID
    static get WRITE_CHARACTERISTIC_UUID() {
        // Return write characteristic UUID
        return "13d63400-2c97-0004-0002-4c6564676572";
    }
    // Product name
    static get PRODUCT_NAME() {
        // Return product name
        return "Ledger\xa0Nano\xa0X";
    }
    // Default MTU
    static get DEFAULT_MTU() {
        // Return default MTU
        return 20;
    }
    // Minimum MTU
    static get MINIMUM_MTU() {
        // Return minimum MTU
        return 6;
    }
    // Maximum MTU
    static get MAXIMUM_MTU() {
        // Return maximum MTU
        return 100;
    }
    // No payload
    static get NO_PAYLOAD() {
        // Return no payload
        return null;
    }
    // Get MTU command tag
    static get GET_MTU_COMMAND_TAG() {
        // Return get MTU command tag
        return 0x08;
    }
    // APDU command tag
    static get APDU_COMMAND_TAG() {
        // Return APDU command tag
        return 0x05;
    }
    // APDU status length
    static get APDU_STATUS_LENGTH() {
        // Return APDU status length
        return new Uint8Array([
            0x00,
            0x00
        ])["length"];
    }
    // APDU success status
    static get APDU_SUCCESS_STATUS() {
        // Return APDU success status
        return 0x9000;
    }
    // No device
    static get NO_DEVICE() {
        // Return no device
        return null;
    }
    // Connect timeout duration milliseconds
    static get CONNECT_TIMEOUT_DURATION_MILLISECONDS() {
        // Return connect timeout duration milliseconds
        return 4000;
    }
    // Pairing duration threshold milliseconds
    static get PAIRING_DURATION_THRESHOLD_MILLISECONDS() {
        // Return pairing duration threshold milliseconds
        return 1000;
    }
    // Bits in a byte
    static get BITS_IN_A_BYTE() {
        // Rerurn bits in a byte
        return 8;
    }
    // Command tag index
    static get COMMAND_TAG_INDEX() {
        // Return command tag index
        return 0;
    }
    // Sequence index index
    static get SEQUENCE_INDEX_INDEX() {
        // Return sequence index index
        return $0c4792fd968d12b8$var$TransportWebBluetooth.COMMAND_TAG_INDEX + 1;
    }
    // Payload size index
    static get PAYLOAD_SIZE_INDEX() {
        // Return payload size index
        return $0c4792fd968d12b8$var$TransportWebBluetooth.SEQUENCE_INDEX_INDEX + 2;
    }
    // Payload index
    static get PAYLOAD_INDEX() {
        // Return payload index
        return $0c4792fd968d12b8$var$TransportWebBluetooth.PAYLOAD_SIZE_INDEX + 2;
    }
}

// Global variables
// Transport WebUSB
window["TransportWebUSB"] = (parcelRequire("2NWzs")).default;

// Buffer
window["Buffer"] = (parcelRequire("5J7r5")).Buffer;
// Transport Web Bluetooth
window["TransportWebBluetooth"] = $0c4792fd968d12b8$var$TransportWebBluetooth;

})();
