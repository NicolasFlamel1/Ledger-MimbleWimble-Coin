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

var parcelRequire = $parcel$global["parcelRequireeb18"];
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

  $parcel$global["parcelRequireeb18"] = parcelRequire;
}
parcelRequire.register("7Saeh", function(module, exports) {

$parcel$export(module.exports, "default", () => $5bb582e59060465d$export$2e2bcd8739ae039, (v) => $5bb582e59060465d$export$2e2bcd8739ae039 = v);

var $WdPjw = parcelRequire("WdPjw");

var $lJ6u6 = parcelRequire("lJ6u6");

var $6x0Az = parcelRequire("6x0Az");

var $sYT9M = parcelRequire("sYT9M");

var $grLSW = parcelRequire("grLSW");

var $8okqZ = parcelRequire("8okqZ");

var $fQPNj = parcelRequire("fQPNj");
var $5bb582e59060465d$require$Buffer = $fQPNj.Buffer;
var $5bb582e59060465d$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
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
var $5bb582e59060465d$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
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
var $5bb582e59060465d$var$__generator = undefined && undefined.__generator || function(thisArg, body) {
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
var $5bb582e59060465d$var$configurationValue = 1;
var $5bb582e59060465d$var$endpointNumber = 3;
/**
 * WebUSB Transport implementation
 * @example
 * import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
 * ...
 * TransportWebUSB.create().then(transport => ...)
 */ var $5bb582e59060465d$var$TransportWebUSB = /** @class */ function(_super) {
    $5bb582e59060465d$var$__extends(TransportWebUSB, _super);
    function TransportWebUSB(device, interfaceNumber) {
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
        _this.deviceModel = (0, $6x0Az.identifyUSBProductId)(device.productId);
        return _this;
    }
    /**
     * Similar to create() except it will always display the device permission (even if some devices are already accepted).
     */ TransportWebUSB.request = function() {
        return $5bb582e59060465d$var$__awaiter(this, void 0, void 0, function() {
            var device;
            return $5bb582e59060465d$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4 /*yield*/ ,
                            (0, $8okqZ.requestLedgerDevice)()
                        ];
                    case 1:
                        device = _a.sent();
                        return [
                            2 /*return*/ ,
                            TransportWebUSB.open(device)
                        ];
                }
            });
        });
    };
    /**
     * Similar to create() except it will never display the device permission (it returns a Promise<?Transport>, null if it fails to find a device).
     */ TransportWebUSB.openConnected = function() {
        return $5bb582e59060465d$var$__awaiter(this, void 0, void 0, function() {
            var devices;
            return $5bb582e59060465d$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4 /*yield*/ ,
                            (0, $8okqZ.getLedgerDevices)()
                        ];
                    case 1:
                        devices = _a.sent();
                        if (devices.length === 0) return [
                            2 /*return*/ ,
                            null
                        ];
                        return [
                            2 /*return*/ ,
                            TransportWebUSB.open(devices[0])
                        ];
                }
            });
        });
    };
    /**
     * Create a Ledger transport with a USBDevice
     */ TransportWebUSB.open = function(device) {
        return $5bb582e59060465d$var$__awaiter(this, void 0, void 0, function() {
            var iface, interfaceNumber, e_1, transport, onDisconnect;
            return $5bb582e59060465d$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4 /*yield*/ ,
                            device.open()
                        ];
                    case 1:
                        _a.sent();
                        if (!(device.configuration === null)) return [
                            3 /*break*/ ,
                            3
                        ];
                        return [
                            4 /*yield*/ ,
                            device.selectConfiguration($5bb582e59060465d$var$configurationValue)
                        ];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        return [
                            4 /*yield*/ ,
                            $5bb582e59060465d$var$gracefullyResetDevice(device)
                        ];
                    case 4:
                        _a.sent();
                        iface = device.configurations[0].interfaces.find(function(_a) {
                            var alternates = _a.alternates;
                            return alternates.some(function(a) {
                                return a.interfaceClass === 255;
                            });
                        });
                        if (!iface) throw new (0, $grLSW.TransportInterfaceNotAvailable)("No WebUSB interface found for your Ledger device. Please upgrade firmware or contact techsupport.");
                        interfaceNumber = iface.interfaceNumber;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([
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
                        _a.sent();
                        return [
                            3 /*break*/ ,
                            9
                        ];
                    case 7:
                        e_1 = _a.sent();
                        return [
                            4 /*yield*/ ,
                            device.close()
                        ];
                    case 8:
                        _a.sent();
                        throw new (0, $grLSW.TransportInterfaceNotAvailable)(e_1.message);
                    case 9:
                        transport = new TransportWebUSB(device, interfaceNumber);
                        onDisconnect = function(e) {
                            if (device === e.device) {
                                // $FlowFixMe
                                navigator.usb.removeEventListener("disconnect", onDisconnect);
                                transport._emitDisconnect(new (0, $grLSW.DisconnectedDevice)());
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
     */ TransportWebUSB.prototype.close = function() {
        return $5bb582e59060465d$var$__awaiter(this, void 0, void 0, function() {
            return $5bb582e59060465d$var$__generator(this, function(_a) {
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
                            $5bb582e59060465d$var$gracefullyResetDevice(this.device)
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
     */ TransportWebUSB.prototype.exchange = function(apdu) {
        return $5bb582e59060465d$var$__awaiter(this, void 0, void 0, function() {
            var b;
            var _this = this;
            return $5bb582e59060465d$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4 /*yield*/ ,
                            this.exchangeAtomicImpl(function() {
                                return $5bb582e59060465d$var$__awaiter(_this, void 0, void 0, function() {
                                    var _a, channel, packetSize, framing, blocks, i, result, acc, r, buffer;
                                    return $5bb582e59060465d$var$__generator(this, function(_b) {
                                        switch(_b.label){
                                            case 0:
                                                _a = this, channel = _a.channel, packetSize = _a.packetSize;
                                                (0, $sYT9M.log)("apdu", "=> " + apdu.toString("hex"));
                                                framing = (0, $lJ6u6.default)(channel, packetSize);
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
                                                    this.device.transferOut($5bb582e59060465d$var$endpointNumber, blocks[i])
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
                                                    this.device.transferIn($5bb582e59060465d$var$endpointNumber, packetSize)
                                                ];
                                            case 5:
                                                r = _b.sent();
                                                buffer = $5bb582e59060465d$require$Buffer.from(r.data.buffer);
                                                acc = framing.reduceResponse(acc, buffer);
                                                return [
                                                    3 /*break*/ ,
                                                    4
                                                ];
                                            case 6:
                                                (0, $sYT9M.log)("apdu", "<= " + result.toString("hex"));
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
                                    throw new (0, $grLSW.DisconnectedDeviceDuringOperation)(e.message);
                                }
                                throw e;
                            })
                        ];
                    case 1:
                        b = _a.sent();
                        return [
                            2 /*return*/ ,
                            b
                        ];
                }
            });
        });
    };
    TransportWebUSB.prototype.setScrambleKey = function() {};
    /**
     * Check if WebUSB transport is supported.
     */ TransportWebUSB.isSupported = (0, $8okqZ.isSupported);
    /**
     * List the WebUSB devices that was previously authorized by the user.
     */ TransportWebUSB.list = (0, $8okqZ.getLedgerDevices);
    /**
     * Actively listen to WebUSB devices and emit ONE device
     * that was either accepted before, if not it will trigger the native permission UI.
     *
     * Important: it must be called in the context of a UI click!
     */ TransportWebUSB.listen = function(observer) {
        var unsubscribed = false;
        (0, $8okqZ.getFirstLedgerDevice)().then(function(device) {
            if (!unsubscribed) {
                var deviceModel = (0, $6x0Az.identifyUSBProductId)(device.productId);
                observer.next({
                    type: "add",
                    descriptor: device,
                    deviceModel: deviceModel
                });
                observer.complete();
            }
        }, function(error) {
            if (window.DOMException && error instanceof window.DOMException && error.code === 18) observer.error(new (0, $grLSW.TransportWebUSBGestureRequired)(error.message));
            else observer.error(new (0, $grLSW.TransportOpenUserCancelled)(error.message));
        });
        function unsubscribe() {
            unsubscribed = true;
        }
        return {
            unsubscribe: unsubscribe
        };
    };
    return TransportWebUSB;
}((0, $WdPjw.default));
var $5bb582e59060465d$export$2e2bcd8739ae039 = $5bb582e59060465d$var$TransportWebUSB;
function $5bb582e59060465d$var$gracefullyResetDevice(device) {
    return $5bb582e59060465d$var$__awaiter(this, void 0, void 0, function() {
        var err_1;
        return $5bb582e59060465d$var$__generator(this, function(_a) {
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
parcelRequire.register("WdPjw", function(module, exports) {

$parcel$export(module.exports, "default", () => $0af02493fbd9a619$export$2e2bcd8739ae039, (v) => $0af02493fbd9a619$export$2e2bcd8739ae039 = v);
$parcel$export(module.exports, "TransportError", () => (parcelRequire("grLSW")).TransportError, (v) => (parcelRequire("grLSW")).TransportError = v);
$parcel$export(module.exports, "TransportStatusError", () => (parcelRequire("grLSW")).TransportStatusError, (v) => (parcelRequire("grLSW")).TransportStatusError = v);
$parcel$export(module.exports, "StatusCodes", () => (parcelRequire("grLSW")).StatusCodes, (v) => (parcelRequire("grLSW")).StatusCodes = v);
$parcel$export(module.exports, "getAltStatusMessage", () => $0af02493fbd9a619$re_export$getAltStatusMessage, (v) => $0af02493fbd9a619$re_export$getAltStatusMessage = v);

var $kxjqJ = parcelRequire("kxjqJ");

var $grLSW = parcelRequire("grLSW");

var $fQPNj = parcelRequire("fQPNj");
var $0af02493fbd9a619$require$Buffer = $fQPNj.Buffer;
var $0af02493fbd9a619$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
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
var $0af02493fbd9a619$var$__generator = undefined && undefined.__generator || function(thisArg, body) {
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
var $0af02493fbd9a619$var$__values = undefined && undefined.__values || function(o) {
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
var $0af02493fbd9a619$var$__read = undefined && undefined.__read || function(o, n) {
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
var $0af02493fbd9a619$var$__spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * The Transport class defines a generic interface for communicating with a Ledger hardware wallet.
 * There are different kind of transports based on the technology (channels like U2F, HID, Bluetooth, Webusb) and environment (Node, Web,...).
 * It is an abstract class that needs to be implemented.
 */ var $0af02493fbd9a619$var$Transport = /** @class */ function() {
    function Transport() {
        var _this = this;
        this.exchangeTimeout = 30000;
        this.unresponsiveTimeout = 15000;
        this.deviceModel = null;
        this._events = new (0, (/*@__PURE__*/$parcel$interopDefault($kxjqJ)))();
        /**
         * Send data to the device using the higher level API.
         * @param {number} cla - The instruction class for the command.
         * @param {number} ins - The instruction code for the command.
         * @param {number} p1 - The first parameter for the instruction.
         * @param {number} p2 - The second parameter for the instruction.
         * @param {Buffer} data - The data to be sent. Defaults to an empty buffer.
         * @param {Array<number>} statusList - A list of acceptable status codes for the response. Defaults to [StatusCodes.OK].
         * @returns {Promise<Buffer>} A promise that resolves with the response data from the device.
         */ this.send = function(cla, ins, p1, p2, data, statusList) {
            if (data === void 0) data = $0af02493fbd9a619$require$Buffer.alloc(0);
            if (statusList === void 0) statusList = [
                (0, $grLSW.StatusCodes).OK
            ];
            return $0af02493fbd9a619$var$__awaiter(_this, void 0, void 0, function() {
                var response, sw;
                return $0af02493fbd9a619$var$__generator(this, function(_a) {
                    switch(_a.label){
                        case 0:
                            if (data.length >= 256) throw new (0, $grLSW.TransportError)("data.length exceed 256 bytes limit. Got: " + data.length, "DataLengthTooBig");
                            return [
                                4 /*yield*/ ,
                                this.exchange($0af02493fbd9a619$require$Buffer.concat([
                                    $0af02493fbd9a619$require$Buffer.from([
                                        cla,
                                        ins,
                                        p1,
                                        p2
                                    ]),
                                    $0af02493fbd9a619$require$Buffer.from([
                                        data.length
                                    ]),
                                    data
                                ]))
                            ];
                        case 1:
                            response = _a.sent();
                            sw = response.readUInt16BE(response.length - 2);
                            if (!statusList.some(function(s) {
                                return s === sw;
                            })) throw new (0, $grLSW.TransportStatusError)(sw);
                            return [
                                2 /*return*/ ,
                                response
                            ];
                    }
                });
            });
        };
        this.exchangeAtomicImpl = function(f) {
            return $0af02493fbd9a619$var$__awaiter(_this, void 0, void 0, function() {
                var resolveBusy, busyPromise, unresponsiveReached, timeout, res;
                var _this = this;
                return $0af02493fbd9a619$var$__generator(this, function(_a) {
                    switch(_a.label){
                        case 0:
                            if (this.exchangeBusyPromise) throw new (0, $grLSW.TransportRaceCondition)("An action was already pending on the Ledger device. Please deny or reconnect.");
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
     * Send data to the device using a low level API.
     * It's recommended to use the "send" method for a higher level API.
     * @param {Buffer} apdu - The data to send.
     * @returns {Promise<Buffer>} A promise that resolves with the response data from the device.
     */ Transport.prototype.exchange = function(_apdu) {
        throw new Error("exchange not implemented");
    };
    /**
     * Send apdus in batch to the device using a low level API.
     * The default implementation is to call exchange for each apdu.
     * @param {Array<Buffer>} apdus - array of apdus to send.
     * @param {Observer<Buffer>} observer - an observer that will receive the response of each apdu.
     * @returns {Subscription} A Subscription object on which you can call ".unsubscribe()" to stop sending apdus.
     */ Transport.prototype.exchangeBulk = function(apdus, observer) {
        var _this = this;
        var unsubscribed = false;
        var unsubscribe = function() {
            unsubscribed = true;
        };
        var main = function() {
            return $0af02493fbd9a619$var$__awaiter(_this, void 0, void 0, function() {
                var apdus_1, apdus_1_1, apdu, r, status_1, e_1_1;
                var e_1, _a;
                return $0af02493fbd9a619$var$__generator(this, function(_b) {
                    switch(_b.label){
                        case 0:
                            if (unsubscribed) return [
                                2 /*return*/ 
                            ];
                            _b.label = 1;
                        case 1:
                            _b.trys.push([
                                1,
                                6,
                                7,
                                8
                            ]);
                            apdus_1 = $0af02493fbd9a619$var$__values(apdus), apdus_1_1 = apdus_1.next();
                            _b.label = 2;
                        case 2:
                            if (!!apdus_1_1.done) return [
                                3 /*break*/ ,
                                5
                            ];
                            apdu = apdus_1_1.value;
                            return [
                                4 /*yield*/ ,
                                this.exchange(apdu)
                            ];
                        case 3:
                            r = _b.sent();
                            if (unsubscribed) return [
                                2 /*return*/ 
                            ];
                            status_1 = r.readUInt16BE(r.length - 2);
                            if (status_1 !== (0, $grLSW.StatusCodes).OK) throw new (0, $grLSW.TransportStatusError)(status_1);
                            observer.next(r);
                            _b.label = 4;
                        case 4:
                            apdus_1_1 = apdus_1.next();
                            return [
                                3 /*break*/ ,
                                2
                            ];
                        case 5:
                            return [
                                3 /*break*/ ,
                                8
                            ];
                        case 6:
                            e_1_1 = _b.sent();
                            e_1 = {
                                error: e_1_1
                            };
                            return [
                                3 /*break*/ ,
                                8
                            ];
                        case 7:
                            try {
                                if (apdus_1_1 && !apdus_1_1.done && (_a = apdus_1["return"])) _a.call(apdus_1);
                            } finally{
                                if (e_1) throw e_1.error;
                            }
                            return [
                                7 /*endfinally*/ 
                            ];
                        case 8:
                            return [
                                2 /*return*/ 
                            ];
                    }
                });
            });
        };
        main().then(function() {
            return !unsubscribed && observer.complete();
        }, function(e) {
            return !unsubscribed && observer.error(e);
        });
        return {
            unsubscribe: unsubscribe
        };
    };
    /**
     * Set the "scramble key" for the next data exchanges with the device.
     * Each app can have a different scramble key and it is set internally during instantiation.
     * @param {string} key - The scramble key to set.
     * @deprecated This method is no longer needed for modern transports and should be migrated away from.
     */ Transport.prototype.setScrambleKey = function(_key) {};
    /**
     * Close the connection with the device.
     * @returns {Promise<void>} A promise that resolves when the transport is closed.
     */ Transport.prototype.close = function() {
        return Promise.resolve();
    };
    /**
     * Listen for an event on the transport instance.
     * Transport implementations may have specific events. Common events include:
     * "disconnect" : triggered when the transport is disconnected.
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: Array<any>) => any} cb - The callback function to be invoked when the event occurs.
     */ Transport.prototype.on = function(eventName, cb) {
        this._events.on(eventName, cb);
    };
    /**
     * Stop listening to an event on an instance of transport.
     */ Transport.prototype.off = function(eventName, cb) {
        this._events.removeListener(eventName, cb);
    };
    Transport.prototype.emit = function(event) {
        var _a;
        var args = [];
        for(var _i = 1; _i < arguments.length; _i++)args[_i - 1] = arguments[_i];
        (_a = this._events).emit.apply(_a, $0af02493fbd9a619$var$__spreadArray([
            event
        ], $0af02493fbd9a619$var$__read(args), false));
    };
    /**
     * Enable or not logs of the binary exchange
     */ Transport.prototype.setDebugMode = function() {
        console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.");
    };
    /**
     * Set a timeout (in milliseconds) for the exchange call. Only some transport might implement it. (e.g. U2F)
     */ Transport.prototype.setExchangeTimeout = function(exchangeTimeout) {
        this.exchangeTimeout = exchangeTimeout;
    };
    /**
     * Define the delay before emitting "unresponsive" on an exchange that does not respond
     */ Transport.prototype.setExchangeUnresponsiveTimeout = function(unresponsiveTimeout) {
        this.unresponsiveTimeout = unresponsiveTimeout;
    };
    /**
     * create() allows to open the first descriptor available or
     * throw if there is none or if timeout is reached.
     * This is a light helper, alternative to using listen() and open() (that you may need for any more advanced usecase)
     * @example
    TransportFoo.create().then(transport => ...)
     */ Transport.create = function(openTimeout, listenTimeout) {
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
                    if (!found) reject(new (0, $grLSW.TransportError)(_this.ErrorMessage_NoDeviceFound, "NoDeviceFound"));
                }
            });
            var listenTimeoutId = listenTimeout ? setTimeout(function() {
                sub.unsubscribe();
                reject(new (0, $grLSW.TransportError)(_this.ErrorMessage_ListenTimeout, "ListenTimeout"));
            }, listenTimeout) : null;
        });
    };
    Transport.prototype.decorateAppAPIMethods = function(self, methods, scrambleKey) {
        var e_2, _a;
        try {
            for(var methods_1 = $0af02493fbd9a619$var$__values(methods), methods_1_1 = methods_1.next(); !methods_1_1.done; methods_1_1 = methods_1.next()){
                var methodName = methods_1_1.value;
                self[methodName] = this.decorateAppAPIMethod(methodName, self[methodName], self, scrambleKey);
            }
        } catch (e_2_1) {
            e_2 = {
                error: e_2_1
            };
        } finally{
            try {
                if (methods_1_1 && !methods_1_1.done && (_a = methods_1["return"])) _a.call(methods_1);
            } finally{
                if (e_2) throw e_2.error;
            }
        }
    };
    Transport.prototype.decorateAppAPIMethod = function(methodName, f, ctx, scrambleKey) {
        var _this = this;
        return function() {
            var args = [];
            for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
            return $0af02493fbd9a619$var$__awaiter(_this, void 0, void 0, function() {
                var _appAPIlock;
                return $0af02493fbd9a619$var$__generator(this, function(_a) {
                    switch(_a.label){
                        case 0:
                            _appAPIlock = this._appAPIlock;
                            if (_appAPIlock) return [
                                2 /*return*/ ,
                                Promise.reject(new (0, $grLSW.TransportError)("Ledger Device is busy (lock " + _appAPIlock + ")", "TransportLocked"))
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
    Transport.ErrorMessage_ListenTimeout = "No Ledger device found (timeout)";
    Transport.ErrorMessage_NoDeviceFound = "No Ledger device found";
    return Transport;
}();
var $0af02493fbd9a619$export$2e2bcd8739ae039 = $0af02493fbd9a619$var$Transport;

});
parcelRequire.register("kxjqJ", function(module, exports) {
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
var $ef35f6280e8cf2f8$var$R = typeof Reflect === "object" ? Reflect : null;
var $ef35f6280e8cf2f8$var$ReflectApply = $ef35f6280e8cf2f8$var$R && typeof $ef35f6280e8cf2f8$var$R.apply === "function" ? $ef35f6280e8cf2f8$var$R.apply : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
};
var $ef35f6280e8cf2f8$var$ReflectOwnKeys;
if ($ef35f6280e8cf2f8$var$R && typeof $ef35f6280e8cf2f8$var$R.ownKeys === "function") $ef35f6280e8cf2f8$var$ReflectOwnKeys = $ef35f6280e8cf2f8$var$R.ownKeys;
else if (Object.getOwnPropertySymbols) $ef35f6280e8cf2f8$var$ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
};
else $ef35f6280e8cf2f8$var$ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
};
function $ef35f6280e8cf2f8$var$ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
}
var $ef35f6280e8cf2f8$var$NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
};
function $ef35f6280e8cf2f8$var$EventEmitter() {
    $ef35f6280e8cf2f8$var$EventEmitter.init.call(this);
}
module.exports = $ef35f6280e8cf2f8$var$EventEmitter;
module.exports.once = $ef35f6280e8cf2f8$var$once;
// Backwards-compat with node 0.10.x
$ef35f6280e8cf2f8$var$EventEmitter.EventEmitter = $ef35f6280e8cf2f8$var$EventEmitter;
$ef35f6280e8cf2f8$var$EventEmitter.prototype._events = undefined;
$ef35f6280e8cf2f8$var$EventEmitter.prototype._eventsCount = 0;
$ef35f6280e8cf2f8$var$EventEmitter.prototype._maxListeners = undefined;
// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var $ef35f6280e8cf2f8$var$defaultMaxListeners = 10;
function $ef35f6280e8cf2f8$var$checkListener(listener) {
    if (typeof listener !== "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
}
Object.defineProperty($ef35f6280e8cf2f8$var$EventEmitter, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
        return $ef35f6280e8cf2f8$var$defaultMaxListeners;
    },
    set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || $ef35f6280e8cf2f8$var$NumberIsNaN(arg)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        $ef35f6280e8cf2f8$var$defaultMaxListeners = arg;
    }
});
$ef35f6280e8cf2f8$var$EventEmitter.init = function() {
    if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || undefined;
};
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
$ef35f6280e8cf2f8$var$EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || $ef35f6280e8cf2f8$var$NumberIsNaN(n)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
    this._maxListeners = n;
    return this;
};
function $ef35f6280e8cf2f8$var$_getMaxListeners(that) {
    if (that._maxListeners === undefined) return $ef35f6280e8cf2f8$var$EventEmitter.defaultMaxListeners;
    return that._maxListeners;
}
$ef35f6280e8cf2f8$var$EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $ef35f6280e8cf2f8$var$_getMaxListeners(this);
};
$ef35f6280e8cf2f8$var$EventEmitter.prototype.emit = function emit(type) {
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
    if (typeof handler === "function") $ef35f6280e8cf2f8$var$ReflectApply(handler, this, args);
    else {
        var len = handler.length;
        var listeners = $ef35f6280e8cf2f8$var$arrayClone(handler, len);
        for(var i = 0; i < len; ++i)$ef35f6280e8cf2f8$var$ReflectApply(listeners[i], this, args);
    }
    return true;
};
function $ef35f6280e8cf2f8$var$_addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    $ef35f6280e8cf2f8$var$checkListener(listener);
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
        m = $ef35f6280e8cf2f8$var$_getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            // No error code for this since it is a Warning
            // eslint-disable-next-line no-restricted-syntax
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners " + "added. Use emitter.setMaxListeners() to " + "increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            $ef35f6280e8cf2f8$var$ProcessEmitWarning(w);
        }
    }
    return target;
}
$ef35f6280e8cf2f8$var$EventEmitter.prototype.addListener = function addListener(type, listener) {
    return $ef35f6280e8cf2f8$var$_addListener(this, type, listener, false);
};
$ef35f6280e8cf2f8$var$EventEmitter.prototype.on = $ef35f6280e8cf2f8$var$EventEmitter.prototype.addListener;
$ef35f6280e8cf2f8$var$EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return $ef35f6280e8cf2f8$var$_addListener(this, type, listener, true);
};
function $ef35f6280e8cf2f8$var$onceWrapper() {
    if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0) return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
    }
}
function $ef35f6280e8cf2f8$var$_onceWrap(target, type, listener) {
    var state = {
        fired: false,
        wrapFn: undefined,
        target: target,
        type: type,
        listener: listener
    };
    var wrapped = $ef35f6280e8cf2f8$var$onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
}
$ef35f6280e8cf2f8$var$EventEmitter.prototype.once = function once(type, listener) {
    $ef35f6280e8cf2f8$var$checkListener(listener);
    this.on(type, $ef35f6280e8cf2f8$var$_onceWrap(this, type, listener));
    return this;
};
$ef35f6280e8cf2f8$var$EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    $ef35f6280e8cf2f8$var$checkListener(listener);
    this.prependListener(type, $ef35f6280e8cf2f8$var$_onceWrap(this, type, listener));
    return this;
};
// Emits a 'removeListener' event if and only if the listener was removed.
$ef35f6280e8cf2f8$var$EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;
    $ef35f6280e8cf2f8$var$checkListener(listener);
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
        else $ef35f6280e8cf2f8$var$spliceOne(list, position);
        if (list.length === 1) events[type] = list[0];
        if (events.removeListener !== undefined) this.emit("removeListener", type, originalListener || listener);
    }
    return this;
};
$ef35f6280e8cf2f8$var$EventEmitter.prototype.off = $ef35f6280e8cf2f8$var$EventEmitter.prototype.removeListener;
$ef35f6280e8cf2f8$var$EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
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
function $ef35f6280e8cf2f8$var$_listeners(target, type, unwrap) {
    var events = target._events;
    if (events === undefined) return [];
    var evlistener = events[type];
    if (evlistener === undefined) return [];
    if (typeof evlistener === "function") return unwrap ? [
        evlistener.listener || evlistener
    ] : [
        evlistener
    ];
    return unwrap ? $ef35f6280e8cf2f8$var$unwrapListeners(evlistener) : $ef35f6280e8cf2f8$var$arrayClone(evlistener, evlistener.length);
}
$ef35f6280e8cf2f8$var$EventEmitter.prototype.listeners = function listeners(type) {
    return $ef35f6280e8cf2f8$var$_listeners(this, type, true);
};
$ef35f6280e8cf2f8$var$EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return $ef35f6280e8cf2f8$var$_listeners(this, type, false);
};
$ef35f6280e8cf2f8$var$EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === "function") return emitter.listenerCount(type);
    else return $ef35f6280e8cf2f8$var$listenerCount.call(emitter, type);
};
$ef35f6280e8cf2f8$var$EventEmitter.prototype.listenerCount = $ef35f6280e8cf2f8$var$listenerCount;
function $ef35f6280e8cf2f8$var$listenerCount(type) {
    var events = this._events;
    if (events !== undefined) {
        var evlistener = events[type];
        if (typeof evlistener === "function") return 1;
        else if (evlistener !== undefined) return evlistener.length;
    }
    return 0;
}
$ef35f6280e8cf2f8$var$EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? $ef35f6280e8cf2f8$var$ReflectOwnKeys(this._events) : [];
};
function $ef35f6280e8cf2f8$var$arrayClone(arr, n) {
    var copy = new Array(n);
    for(var i = 0; i < n; ++i)copy[i] = arr[i];
    return copy;
}
function $ef35f6280e8cf2f8$var$spliceOne(list, index) {
    for(; index + 1 < list.length; index++)list[index] = list[index + 1];
    list.pop();
}
function $ef35f6280e8cf2f8$var$unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for(var i = 0; i < ret.length; ++i)ret[i] = arr[i].listener || arr[i];
    return ret;
}
function $ef35f6280e8cf2f8$var$once(emitter, name) {
    return new Promise(function(resolve, reject) {
        function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
        }
        function resolver() {
            if (typeof emitter.removeListener === "function") emitter.removeListener("error", errorListener);
            resolve([].slice.call(arguments));
        }
        $ef35f6280e8cf2f8$var$eventTargetAgnosticAddListener(emitter, name, resolver, {
            once: true
        });
        if (name !== "error") $ef35f6280e8cf2f8$var$addErrorHandlerIfEventEmitter(emitter, errorListener, {
            once: true
        });
    });
}
function $ef35f6280e8cf2f8$var$addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === "function") $ef35f6280e8cf2f8$var$eventTargetAgnosticAddListener(emitter, "error", handler, flags);
}
function $ef35f6280e8cf2f8$var$eventTargetAgnosticAddListener(emitter, name, listener, flags) {
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

parcelRequire.register("grLSW", function(module, exports) {

$parcel$export(module.exports, "DisconnectedDevice", () => $bf944ff10fd10046$export$1e42f3936938e063, (v) => $bf944ff10fd10046$export$1e42f3936938e063 = v);
$parcel$export(module.exports, "DisconnectedDeviceDuringOperation", () => $bf944ff10fd10046$export$2a60f41a2ed2742, (v) => $bf944ff10fd10046$export$2a60f41a2ed2742 = v);
$parcel$export(module.exports, "TransportOpenUserCancelled", () => $bf944ff10fd10046$export$9642f061c2494239, (v) => $bf944ff10fd10046$export$9642f061c2494239 = v);
$parcel$export(module.exports, "TransportInterfaceNotAvailable", () => $bf944ff10fd10046$export$fd71e3a51c4bf0ae, (v) => $bf944ff10fd10046$export$fd71e3a51c4bf0ae = v);
$parcel$export(module.exports, "TransportRaceCondition", () => $bf944ff10fd10046$export$d6cb63cda2c2b2a4, (v) => $bf944ff10fd10046$export$d6cb63cda2c2b2a4 = v);
$parcel$export(module.exports, "TransportWebUSBGestureRequired", () => $bf944ff10fd10046$export$c0ffbdd94649bd06, (v) => $bf944ff10fd10046$export$c0ffbdd94649bd06 = v);
$parcel$export(module.exports, "TransportError", () => $bf944ff10fd10046$export$8e68de6fb26f2236, (v) => $bf944ff10fd10046$export$8e68de6fb26f2236 = v);
$parcel$export(module.exports, "StatusCodes", () => $bf944ff10fd10046$export$efd5569f873811b1, (v) => $bf944ff10fd10046$export$efd5569f873811b1 = v);
$parcel$export(module.exports, "TransportStatusError", () => $bf944ff10fd10046$export$78917f4716d96cfe, (v) => $bf944ff10fd10046$export$78917f4716d96cfe = v);

var $3s6Mk = parcelRequire("3s6Mk");
var $bf944ff10fd10046$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
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
var $bf944ff10fd10046$export$d7dd32b41fc9c3a0 = (0, $3s6Mk.createCustomErrorClass)("AccountNameRequired");
var $bf944ff10fd10046$export$fb9db505804530ec = (0, $3s6Mk.createCustomErrorClass)("AccountNotSupported");
var $bf944ff10fd10046$export$c9d6bf2b06944665 = (0, $3s6Mk.createCustomErrorClass)("AmountRequired");
var $bf944ff10fd10046$export$2628fce2396c23c2 = (0, $3s6Mk.createCustomErrorClass)("BluetoothRequired");
var $bf944ff10fd10046$export$75f8b0767ef406f1 = (0, $3s6Mk.createCustomErrorClass)("BtcUnmatchedApp");
var $bf944ff10fd10046$export$f60aa84fd00bc3ee = (0, $3s6Mk.createCustomErrorClass)("CantOpenDevice");
var $bf944ff10fd10046$export$fc0260506e4022ab = (0, $3s6Mk.createCustomErrorClass)("CashAddrNotSupported");
var $bf944ff10fd10046$export$e0b1ec53ba36e221 = (0, $3s6Mk.createCustomErrorClass)("CurrencyNotSupported");
var $bf944ff10fd10046$export$fa9aacd48d3a45c2 = (0, $3s6Mk.createCustomErrorClass)("DeviceAppVerifyNotSupported");
var $bf944ff10fd10046$export$f21ce806524ab8d4 = (0, $3s6Mk.createCustomErrorClass)("DeviceGenuineSocketEarlyClose");
var $bf944ff10fd10046$export$9c30dc6872fcd74c = (0, $3s6Mk.createCustomErrorClass)("DeviceNotGenuine");
var $bf944ff10fd10046$export$1d5ae41b109edf1f = (0, $3s6Mk.createCustomErrorClass)("DeviceOnDashboardExpected");
var $bf944ff10fd10046$export$8eecf64ec9a8cfd7 = (0, $3s6Mk.createCustomErrorClass)("DeviceOnDashboardUnexpected");
var $bf944ff10fd10046$export$a5e2071f1ac48fdd = (0, $3s6Mk.createCustomErrorClass)("DeviceInOSUExpected");
var $bf944ff10fd10046$export$3be6e7231165f4ac = (0, $3s6Mk.createCustomErrorClass)("DeviceHalted");
var $bf944ff10fd10046$export$fa7bfae6dce03474 = (0, $3s6Mk.createCustomErrorClass)("DeviceNameInvalid");
var $bf944ff10fd10046$export$bcce4e5aded80ca0 = (0, $3s6Mk.createCustomErrorClass)("DeviceSocketFail");
var $bf944ff10fd10046$export$944a0f9a7cc1e03a = (0, $3s6Mk.createCustomErrorClass)("DeviceSocketNoBulkStatus");
var $bf944ff10fd10046$export$1fb6667702a70644 = (0, $3s6Mk.createCustomErrorClass)("LockedDeviceError");
var $bf944ff10fd10046$export$1e42f3936938e063 = (0, $3s6Mk.createCustomErrorClass)("DisconnectedDevice");
var $bf944ff10fd10046$export$2a60f41a2ed2742 = (0, $3s6Mk.createCustomErrorClass)("DisconnectedDeviceDuringOperation");
var $bf944ff10fd10046$export$93e2040d8e24d646 = (0, $3s6Mk.createCustomErrorClass)("DeviceExtractOnboardingStateError");
var $bf944ff10fd10046$export$e6aaf90bcb4b2013 = (0, $3s6Mk.createCustomErrorClass)("DeviceOnboardingStatePollingError");
var $bf944ff10fd10046$export$cfbd0adf8f9fdaf9 = (0, $3s6Mk.createCustomErrorClass)("EnpointConfig");
var $bf944ff10fd10046$export$96d8d3c501f1625 = (0, $3s6Mk.createCustomErrorClass)("EthAppPleaseEnableContractData");
var $bf944ff10fd10046$export$37b49553b7172cb1 = (0, $3s6Mk.createCustomErrorClass)("FeeEstimationFailed");
var $bf944ff10fd10046$export$d00fd6c398a70fd9 = (0, $3s6Mk.createCustomErrorClass)("FirmwareNotRecognized");
var $bf944ff10fd10046$export$3dc3bbf8c134219c = (0, $3s6Mk.createCustomErrorClass)("HardResetFail");
var $bf944ff10fd10046$export$5e8f7ae1054a2777 = (0, $3s6Mk.createCustomErrorClass)("InvalidXRPTag");
var $bf944ff10fd10046$export$953b602d2269ceba = (0, $3s6Mk.createCustomErrorClass)("InvalidAddress");
var $bf944ff10fd10046$export$bbdaf7c77a7508eb = (0, $3s6Mk.createCustomErrorClass)("InvalidAddressBecauseDestinationIsAlsoSource");
var $bf944ff10fd10046$export$882967e2980534f9 = (0, $3s6Mk.createCustomErrorClass)("LatestMCUInstalledError");
var $bf944ff10fd10046$export$59772a13ac97df0e = (0, $3s6Mk.createCustomErrorClass)("UnknownMCU");
var $bf944ff10fd10046$export$26bf4f7c63d50901 = (0, $3s6Mk.createCustomErrorClass)("LedgerAPIError");
var $bf944ff10fd10046$export$fdab6afd1b1820af = (0, $3s6Mk.createCustomErrorClass)("LedgerAPIErrorWithMessage");
var $bf944ff10fd10046$export$c2996b38942cf758 = (0, $3s6Mk.createCustomErrorClass)("LedgerAPINotAvailable");
var $bf944ff10fd10046$export$3d81abcc61613a27 = (0, $3s6Mk.createCustomErrorClass)("ManagerAppAlreadyInstalled");
var $bf944ff10fd10046$export$87a9bff9fff141e2 = (0, $3s6Mk.createCustomErrorClass)("ManagerAppRelyOnBTC");
var $bf944ff10fd10046$export$86581a722c4238c0 = (0, $3s6Mk.createCustomErrorClass)("ManagerAppDepInstallRequired");
var $bf944ff10fd10046$export$267a8476044885dd = (0, $3s6Mk.createCustomErrorClass)("ManagerAppDepUninstallRequired");
var $bf944ff10fd10046$export$bb771ca417eca344 = (0, $3s6Mk.createCustomErrorClass)("ManagerDeviceLocked");
var $bf944ff10fd10046$export$b634ce25e3ff5229 = (0, $3s6Mk.createCustomErrorClass)("ManagerFirmwareNotEnoughSpace");
var $bf944ff10fd10046$export$2d26f4eadfe37285 = (0, $3s6Mk.createCustomErrorClass)("ManagerNotEnoughSpace");
var $bf944ff10fd10046$export$ceb7f9bef5a1e481 = (0, $3s6Mk.createCustomErrorClass)("ManagerUninstallBTCDep");
var $bf944ff10fd10046$export$baadb6886fde1621 = (0, $3s6Mk.createCustomErrorClass)("NetworkDown");
var $bf944ff10fd10046$export$5cbfa0659f97216a = (0, $3s6Mk.createCustomErrorClass)("NoAddressesFound");
var $bf944ff10fd10046$export$9e00aead3515e5c9 = (0, $3s6Mk.createCustomErrorClass)("NotEnoughBalance");
var $bf944ff10fd10046$export$5ed90e0e011f4857 = (0, $3s6Mk.createCustomErrorClass)("NotEnoughBalanceToDelegate");
var $bf944ff10fd10046$export$75178c95e66d9630 = (0, $3s6Mk.createCustomErrorClass)("NotEnoughBalanceInParentAccount");
var $bf944ff10fd10046$export$e3e2865b29f7e0b0 = (0, $3s6Mk.createCustomErrorClass)("NotEnoughSpendableBalance");
var $bf944ff10fd10046$export$a84b3634866707ea = (0, $3s6Mk.createCustomErrorClass)("NotEnoughBalanceBecauseDestinationNotCreated");
var $bf944ff10fd10046$export$a282f858b69a7326 = (0, $3s6Mk.createCustomErrorClass)("NoAccessToCamera");
var $bf944ff10fd10046$export$5111c405c5cacc97 = (0, $3s6Mk.createCustomErrorClass)("NotEnoughGas");
var $bf944ff10fd10046$export$626e1fd20d22139c = (0, $3s6Mk.createCustomErrorClass)("NotSupportedLegacyAddress");
var $bf944ff10fd10046$export$f919e2c9c746346b = (0, $3s6Mk.createCustomErrorClass)("GasLessThanEstimate");
var $bf944ff10fd10046$export$cc562f3706902d22 = (0, $3s6Mk.createCustomErrorClass)("PriorityFeeTooLow");
var $bf944ff10fd10046$export$ee14d05cd43eb762 = (0, $3s6Mk.createCustomErrorClass)("PriorityFeeTooHigh");
var $bf944ff10fd10046$export$931458f4b7d53154 = (0, $3s6Mk.createCustomErrorClass)("PriorityFeeHigherThanMaxFee");
var $bf944ff10fd10046$export$c0ce9cadb94c6b86 = (0, $3s6Mk.createCustomErrorClass)("MaxFeeTooLow");
var $bf944ff10fd10046$export$22c5aa8937c5b423 = (0, $3s6Mk.createCustomErrorClass)("PasswordsDontMatch");
var $bf944ff10fd10046$export$f57670cd1aaf386 = (0, $3s6Mk.createCustomErrorClass)("PasswordIncorrect");
var $bf944ff10fd10046$export$3ba22bf10deb1448 = (0, $3s6Mk.createCustomErrorClass)("RecommendSubAccountsToEmpty");
var $bf944ff10fd10046$export$33f73085e1b7871b = (0, $3s6Mk.createCustomErrorClass)("RecommendUndelegation");
var $bf944ff10fd10046$export$cd4d967a66d81060 = (0, $3s6Mk.createCustomErrorClass)("TimeoutTagged");
var $bf944ff10fd10046$export$9375635756d6156e = (0, $3s6Mk.createCustomErrorClass)("UnexpectedBootloader");
var $bf944ff10fd10046$export$90478a5d08d6c2d7 = (0, $3s6Mk.createCustomErrorClass)("MCUNotGenuineToDashboard");
var $bf944ff10fd10046$export$132f0197eaa65535 = (0, $3s6Mk.createCustomErrorClass)("RecipientRequired");
var $bf944ff10fd10046$export$7aee729193ab77ba = (0, $3s6Mk.createCustomErrorClass)("UnavailableTezosOriginatedAccountReceive");
var $bf944ff10fd10046$export$4ec11dc947a3c9d6 = (0, $3s6Mk.createCustomErrorClass)("UnavailableTezosOriginatedAccountSend");
var $bf944ff10fd10046$export$5e3ed85b946872a1 = (0, $3s6Mk.createCustomErrorClass)("UpdateFetchFileFail");
var $bf944ff10fd10046$export$5db6383ad081f01e = (0, $3s6Mk.createCustomErrorClass)("UpdateIncorrectHash");
var $bf944ff10fd10046$export$92c199eb837d8df8 = (0, $3s6Mk.createCustomErrorClass)("UpdateIncorrectSig");
var $bf944ff10fd10046$export$85e0c017833c894c = (0, $3s6Mk.createCustomErrorClass)("UpdateYourApp");
var $bf944ff10fd10046$export$84115f1b54c874b3 = (0, $3s6Mk.createCustomErrorClass)("UserRefusedDeviceNameChange");
var $bf944ff10fd10046$export$3f4864efb1638333 = (0, $3s6Mk.createCustomErrorClass)("UserRefusedAddress");
var $bf944ff10fd10046$export$d777e0ef77faca34 = (0, $3s6Mk.createCustomErrorClass)("UserRefusedFirmwareUpdate");
var $bf944ff10fd10046$export$3d8a4f08cd3eb133 = (0, $3s6Mk.createCustomErrorClass)("UserRefusedAllowManager");
var $bf944ff10fd10046$export$db9b724c3524b5d6 = (0, $3s6Mk.createCustomErrorClass)("UserRefusedOnDevice"); // TODO rename because it's just for transaction refusal
var $bf944ff10fd10046$export$9642f061c2494239 = (0, $3s6Mk.createCustomErrorClass)("TransportOpenUserCancelled");
var $bf944ff10fd10046$export$fd71e3a51c4bf0ae = (0, $3s6Mk.createCustomErrorClass)("TransportInterfaceNotAvailable");
var $bf944ff10fd10046$export$d6cb63cda2c2b2a4 = (0, $3s6Mk.createCustomErrorClass)("TransportRaceCondition");
var $bf944ff10fd10046$export$c0ffbdd94649bd06 = (0, $3s6Mk.createCustomErrorClass)("TransportWebUSBGestureRequired");
var $bf944ff10fd10046$export$4800af3cc6204928 = (0, $3s6Mk.createCustomErrorClass)("DeviceShouldStayInApp");
var $bf944ff10fd10046$export$101490ec073327e1 = (0, $3s6Mk.createCustomErrorClass)("WebsocketConnectionError");
var $bf944ff10fd10046$export$219228963d86b069 = (0, $3s6Mk.createCustomErrorClass)("WebsocketConnectionFailed");
var $bf944ff10fd10046$export$25b49ca0efdfe5d1 = (0, $3s6Mk.createCustomErrorClass)("WrongDeviceForAccount");
var $bf944ff10fd10046$export$63498b46122d8a23 = (0, $3s6Mk.createCustomErrorClass)("WrongAppForCurrency");
var $bf944ff10fd10046$export$707f317a4761c46d = (0, $3s6Mk.createCustomErrorClass)("ETHAddressNonEIP");
var $bf944ff10fd10046$export$a5d8da2f27618c16 = (0, $3s6Mk.createCustomErrorClass)("CantScanQRCode");
var $bf944ff10fd10046$export$3f2d8a7775aab6cc = (0, $3s6Mk.createCustomErrorClass)("FeeNotLoaded");
var $bf944ff10fd10046$export$ffbf6641e9ab88d3 = (0, $3s6Mk.createCustomErrorClass)("FeeRequired");
var $bf944ff10fd10046$export$53e797c2fa09aff3 = (0, $3s6Mk.createCustomErrorClass)("FeeTooHigh");
var $bf944ff10fd10046$export$1d49177380419e3d = (0, $3s6Mk.createCustomErrorClass)("DustLimit");
var $bf944ff10fd10046$export$cb0b645e3d7170ab = (0, $3s6Mk.createCustomErrorClass)("PendingOperation");
var $bf944ff10fd10046$export$2aca4567d80fd933 = (0, $3s6Mk.createCustomErrorClass)("SyncError");
var $bf944ff10fd10046$export$a2d6658d365c43df = (0, $3s6Mk.createCustomErrorClass)("PairingFailed");
var $bf944ff10fd10046$export$3f7ba18f3c84cced = (0, $3s6Mk.createCustomErrorClass)("GenuineCheckFailed");
var $bf944ff10fd10046$export$437e6aac14cab3d9 = (0, $3s6Mk.createCustomErrorClass)("LedgerAPI4xx");
var $bf944ff10fd10046$export$309835543e52bf92 = (0, $3s6Mk.createCustomErrorClass)("LedgerAPI5xx");
var $bf944ff10fd10046$export$c282cdb2f7fdc27a = (0, $3s6Mk.createCustomErrorClass)("FirmwareOrAppUpdateRequired");
var $bf944ff10fd10046$export$28f62a162580c9c2 = (0, $3s6Mk.createCustomErrorClass)("LanguageNotFound");
var $bf944ff10fd10046$export$d3cadb9f4e1fa40d = (0, $3s6Mk.createCustomErrorClass)("NoDBPathGiven");
var $bf944ff10fd10046$export$de46c919e379f03f = (0, $3s6Mk.createCustomErrorClass)("DBWrongPassword");
var $bf944ff10fd10046$export$e1c94c135b0a553e = (0, $3s6Mk.createCustomErrorClass)("DBNotReset");
var $bf944ff10fd10046$export$62e86095f76df800;
(function(HwTransportErrorType) {
    HwTransportErrorType[HwTransportErrorType["Unknown"] = 0] = "Unknown";
    HwTransportErrorType[HwTransportErrorType["BleLocationServicesDisabled"] = 1] = "BleLocationServicesDisabled";
    HwTransportErrorType[HwTransportErrorType["BleBluetoothUnauthorized"] = 2] = "BleBluetoothUnauthorized";
    HwTransportErrorType[HwTransportErrorType["BleScanStartFailed"] = 3] = "BleScanStartFailed";
})($bf944ff10fd10046$export$62e86095f76df800 || ($bf944ff10fd10046$export$62e86095f76df800 = {}));
/**
 * Represents an error coming from any Transport implementation.
 *
 * Needed to map a specific implementation error into an error that
 * can be managed by any code unaware of the specific Transport implementation
 * that was used.
 */ var $bf944ff10fd10046$export$ef5ffbe444ecd147 = /** @class */ function(_super) {
    $bf944ff10fd10046$var$__extends(HwTransportError, _super);
    function HwTransportError(type, message) {
        var _this = _super.call(this, message) || this;
        _this.name = "HwTransportError";
        _this.type = type;
        // Needed as long as we target < ES6
        Object.setPrototypeOf(_this, HwTransportError.prototype);
        return _this;
    }
    return HwTransportError;
}(Error);
/**
 * TransportError is used for any generic transport errors.
 * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the device for various reason.
 */ var $bf944ff10fd10046$export$8e68de6fb26f2236 = /** @class */ function(_super) {
    $bf944ff10fd10046$var$__extends(TransportError, _super);
    function TransportError(message, id) {
        var _this = this;
        var name = "TransportError";
        _this = _super.call(this, message || name) || this;
        _this.name = name;
        _this.message = message;
        _this.stack = new Error().stack;
        _this.id = id;
        return _this;
    }
    return TransportError;
}(Error);
(0, $3s6Mk.addCustomErrorDeserializer)("TransportError", function(e) {
    return new $bf944ff10fd10046$export$8e68de6fb26f2236(e.message, e.id);
});
var $bf944ff10fd10046$export$efd5569f873811b1 = {
    ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
    ALGORITHM_NOT_SUPPORTED: 0x9484,
    CLA_NOT_SUPPORTED: 0x6e00,
    CODE_BLOCKED: 0x9840,
    CODE_NOT_INITIALIZED: 0x9802,
    COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
    CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
    CONTRADICTION_INVALIDATION: 0x9810,
    CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
    CUSTOM_IMAGE_BOOTLOADER: 0x662f,
    CUSTOM_IMAGE_EMPTY: 0x662e,
    FILE_ALREADY_EXISTS: 0x6a89,
    FILE_NOT_FOUND: 0x9404,
    GP_AUTH_FAILED: 0x6300,
    HALTED: 0x6faa,
    INCONSISTENT_FILE: 0x9408,
    INCORRECT_DATA: 0x6a80,
    INCORRECT_LENGTH: 0x6700,
    INCORRECT_P1_P2: 0x6b00,
    INS_NOT_SUPPORTED: 0x6d00,
    INVALID_KCV: 0x9485,
    INVALID_OFFSET: 0x9402,
    LICENSING: 0x6f42,
    LOCKED_DEVICE: 0x5515,
    MAX_VALUE_REACHED: 0x9850,
    MEMORY_PROBLEM: 0x9240,
    MISSING_CRITICAL_PARAMETER: 0x6800,
    NO_EF_SELECTED: 0x9400,
    NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
    OK: 0x9000,
    PIN_REMAINING_ATTEMPTS: 0x63c0,
    REFERENCED_DATA_NOT_FOUND: 0x6a88,
    SECURITY_STATUS_NOT_SATISFIED: 0x6982,
    TECHNICAL_PROBLEM: 0x6f00,
    UNKNOWN_APDU: 0x6d02,
    USER_REFUSED_ON_DEVICE: 0x5501
};
function $bf944ff10fd10046$export$799566c03457ebd5(code) {
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
        case 0x5515:
            return "Locked device";
    }
    if (0x6f00 <= code && code <= 0x6fff) return "Internal error, please report";
}
function $bf944ff10fd10046$export$78917f4716d96cfe(statusCode) {
    var statusText = Object.keys($bf944ff10fd10046$export$efd5569f873811b1).find(function(k) {
        return $bf944ff10fd10046$export$efd5569f873811b1[k] === statusCode;
    }) || "UNKNOWN_ERROR";
    var smsg = $bf944ff10fd10046$export$799566c03457ebd5(statusCode) || statusText;
    var statusCodeStr = statusCode.toString(16);
    var message = "Ledger device: ".concat(smsg, " (0x").concat(statusCodeStr, ")");
    // Maps to a LockedDeviceError
    if (statusCode === $bf944ff10fd10046$export$efd5569f873811b1.LOCKED_DEVICE) throw new $bf944ff10fd10046$export$1fb6667702a70644(message);
    this.name = "TransportStatusError";
    this.message = message;
    this.stack = new Error().stack;
    this.statusCode = statusCode;
    this.statusText = statusText;
}
$bf944ff10fd10046$export$78917f4716d96cfe.prototype = new Error();
(0, $3s6Mk.addCustomErrorDeserializer)("TransportStatusError", function(e) {
    return new $bf944ff10fd10046$export$78917f4716d96cfe(e.statusCode);
});

});
parcelRequire.register("3s6Mk", function(module, exports) {

$parcel$export(module.exports, "addCustomErrorDeserializer", () => $28393eb644a4dd2e$export$ff6248acd0c27a3f, (v) => $28393eb644a4dd2e$export$ff6248acd0c27a3f = v);
$parcel$export(module.exports, "createCustomErrorClass", () => $28393eb644a4dd2e$export$94baff7bf5134824, (v) => $28393eb644a4dd2e$export$94baff7bf5134824 = v);
/* eslint-disable no-continue */ /* eslint-disable no-unused-vars */ /* eslint-disable no-param-reassign */ /* eslint-disable no-prototype-builtins */ var $28393eb644a4dd2e$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
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
var $28393eb644a4dd2e$var$__values = undefined && undefined.__values || function(o) {
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
var $28393eb644a4dd2e$var$errorClasses = {};
var $28393eb644a4dd2e$var$deserializers = {};
var $28393eb644a4dd2e$export$ff6248acd0c27a3f = function(name, deserializer) {
    $28393eb644a4dd2e$var$deserializers[name] = deserializer;
};
var $28393eb644a4dd2e$export$94baff7bf5134824 = function(name) {
    var CustomErrorClass = /** @class */ function(_super) {
        $28393eb644a4dd2e$var$__extends(CustomErrorClass, _super);
        function CustomErrorClass(message, fields, options) {
            var _this = // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            _super.call(this, message || name, options) || this;
            // Set the prototype explicitly. See https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
            Object.setPrototypeOf(_this, CustomErrorClass.prototype);
            _this.name = name;
            if (fields) for(var k in fields)// eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            _this[k] = fields[k];
            if (options && $28393eb644a4dd2e$var$isObject(options) && "cause" in options && !("cause" in _this)) {
                // .cause was specified but the superconstructor
                // did not create an instance property.
                var cause = options.cause;
                _this.cause = cause;
                if ("stack" in cause) _this.stack = _this.stack + "\nCAUSE: " + cause.stack;
            }
            return _this;
        }
        return CustomErrorClass;
    }(Error);
    $28393eb644a4dd2e$var$errorClasses[name] = CustomErrorClass;
    return CustomErrorClass;
};
function $28393eb644a4dd2e$var$isObject(value) {
    return typeof value === "object";
}
var $28393eb644a4dd2e$export$64cddc1e268e9046 = function(object) {
    if (object && typeof object === "object") {
        try {
            if (typeof object.message === "string") {
                var msg = JSON.parse(object.message);
                if (msg.message && msg.name) object = msg;
            }
        } catch (e) {
        // nothing
        }
        var error = void 0;
        if (typeof object.name === "string") {
            var name_1 = object.name;
            var des = $28393eb644a4dd2e$var$deserializers[name_1];
            if (des) error = des(object);
            else {
                var constructor = name_1 === "Error" ? Error : $28393eb644a4dd2e$var$errorClasses[name_1];
                if (!constructor) {
                    console.warn("deserializing an unknown class '" + name_1 + "'");
                    constructor = $28393eb644a4dd2e$export$94baff7bf5134824(name_1);
                }
                error = Object.create(constructor.prototype);
                try {
                    for(var prop in object)if (object.hasOwnProperty(prop)) error[prop] = object[prop];
                } catch (e) {
                // sometimes setting a property can fail (e.g. .name)
                }
            }
        } else if (typeof object.message === "string") error = new Error(object.message);
        if (error && !error.stack && Error.captureStackTrace) Error.captureStackTrace(error, $28393eb644a4dd2e$export$64cddc1e268e9046);
        return error;
    }
    return new Error(String(object));
};
var $28393eb644a4dd2e$export$46ff38bc6bdea8fb = function(value) {
    if (!value) return value;
    if (typeof value === "object") return $28393eb644a4dd2e$var$destroyCircular(value, []);
    if (typeof value === "function") return "[Function: ".concat(value.name || "anonymous", "]");
    return value;
};
// https://www.npmjs.com/package/destroy-circular
function $28393eb644a4dd2e$var$destroyCircular(from, seen) {
    var e_1, _a;
    var to = {};
    seen.push(from);
    try {
        for(var _b = $28393eb644a4dd2e$var$__values(Object.keys(from)), _c = _b.next(); !_c.done; _c = _b.next()){
            var key = _c.value;
            var value = from[key];
            if (typeof value === "function") continue;
            if (!value || typeof value !== "object") {
                to[key] = value;
                continue;
            }
            if (seen.indexOf(from[key]) === -1) {
                to[key] = $28393eb644a4dd2e$var$destroyCircular(from[key], seen.slice(0));
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


parcelRequire.register("fQPNj", function(module, exports) {

$parcel$export(module.exports, "Buffer", () => $b8a3e3a1f7632d0b$export$a143d493d941bafc, (v) => $b8a3e3a1f7632d0b$export$a143d493d941bafc = v);
$parcel$export(module.exports, "INSPECT_MAX_BYTES", () => $b8a3e3a1f7632d0b$export$f99ded8fe4b79145, (v) => $b8a3e3a1f7632d0b$export$f99ded8fe4b79145 = v);
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ /* eslint-disable no-proto */ var $b8a3e3a1f7632d0b$export$a143d493d941bafc;
var $b8a3e3a1f7632d0b$export$e4cf37d7f6fb9e0a;
var $b8a3e3a1f7632d0b$export$f99ded8fe4b79145;
var $b8a3e3a1f7632d0b$export$599f31c3813fae4d;
"use strict";

var $4urTP = parcelRequire("4urTP");

var $gpARF = parcelRequire("gpARF");
var $b8a3e3a1f7632d0b$var$customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" // eslint-disable-line dot-notation
 ? Symbol["for"]("nodejs.util.inspect.custom") // eslint-disable-line dot-notation
 : null;
$b8a3e3a1f7632d0b$export$a143d493d941bafc = $b8a3e3a1f7632d0b$var$Buffer;
$b8a3e3a1f7632d0b$export$e4cf37d7f6fb9e0a = $b8a3e3a1f7632d0b$var$SlowBuffer;
$b8a3e3a1f7632d0b$export$f99ded8fe4b79145 = 50;
var $b8a3e3a1f7632d0b$var$K_MAX_LENGTH = 0x7fffffff;
$b8a3e3a1f7632d0b$export$599f31c3813fae4d = $b8a3e3a1f7632d0b$var$K_MAX_LENGTH;
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
 */ $b8a3e3a1f7632d0b$var$Buffer.TYPED_ARRAY_SUPPORT = $b8a3e3a1f7632d0b$var$typedArraySupport();
if (!$b8a3e3a1f7632d0b$var$Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
function $b8a3e3a1f7632d0b$var$typedArraySupport() {
    // Can typed array instances can be augmented?
    try {
        var arr = new Uint8Array(1);
        var proto = {
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
Object.defineProperty($b8a3e3a1f7632d0b$var$Buffer.prototype, "parent", {
    enumerable: true,
    get: function() {
        if (!$b8a3e3a1f7632d0b$var$Buffer.isBuffer(this)) return undefined;
        return this.buffer;
    }
});
Object.defineProperty($b8a3e3a1f7632d0b$var$Buffer.prototype, "offset", {
    enumerable: true,
    get: function() {
        if (!$b8a3e3a1f7632d0b$var$Buffer.isBuffer(this)) return undefined;
        return this.byteOffset;
    }
});
function $b8a3e3a1f7632d0b$var$createBuffer(length) {
    if (length > $b8a3e3a1f7632d0b$var$K_MAX_LENGTH) throw new RangeError('The value "' + length + '" is invalid for option "size"');
    // Return an augmented `Uint8Array` instance
    var buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, $b8a3e3a1f7632d0b$var$Buffer.prototype);
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
 */ function $b8a3e3a1f7632d0b$var$Buffer(arg, encodingOrOffset, length) {
    // Common case.
    if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") throw new TypeError('The "string" argument must be of type string. Received type number');
        return $b8a3e3a1f7632d0b$var$allocUnsafe(arg);
    }
    return $b8a3e3a1f7632d0b$var$from(arg, encodingOrOffset, length);
}
$b8a3e3a1f7632d0b$var$Buffer.poolSize = 8192 // not used by this implementation
;
function $b8a3e3a1f7632d0b$var$from(value, encodingOrOffset, length) {
    if (typeof value === "string") return $b8a3e3a1f7632d0b$var$fromString(value, encodingOrOffset);
    if (ArrayBuffer.isView(value)) return $b8a3e3a1f7632d0b$var$fromArrayView(value);
    if (value == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    if ($b8a3e3a1f7632d0b$var$isInstance(value, ArrayBuffer) || value && $b8a3e3a1f7632d0b$var$isInstance(value.buffer, ArrayBuffer)) return $b8a3e3a1f7632d0b$var$fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof SharedArrayBuffer !== "undefined" && ($b8a3e3a1f7632d0b$var$isInstance(value, SharedArrayBuffer) || value && $b8a3e3a1f7632d0b$var$isInstance(value.buffer, SharedArrayBuffer))) return $b8a3e3a1f7632d0b$var$fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof value === "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    var valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) return $b8a3e3a1f7632d0b$var$Buffer.from(valueOf, encodingOrOffset, length);
    var b = $b8a3e3a1f7632d0b$var$fromObject(value);
    if (b) return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") return $b8a3e3a1f7632d0b$var$Buffer.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/ $b8a3e3a1f7632d0b$var$Buffer.from = function(value, encodingOrOffset, length) {
    return $b8a3e3a1f7632d0b$var$from(value, encodingOrOffset, length);
};
// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf($b8a3e3a1f7632d0b$var$Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf($b8a3e3a1f7632d0b$var$Buffer, Uint8Array);
function $b8a3e3a1f7632d0b$var$assertSize(size) {
    if (typeof size !== "number") throw new TypeError('"size" argument must be of type number');
    else if (size < 0) throw new RangeError('The value "' + size + '" is invalid for option "size"');
}
function $b8a3e3a1f7632d0b$var$alloc(size, fill, encoding) {
    $b8a3e3a1f7632d0b$var$assertSize(size);
    if (size <= 0) return $b8a3e3a1f7632d0b$var$createBuffer(size);
    if (fill !== undefined) // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === "string" ? $b8a3e3a1f7632d0b$var$createBuffer(size).fill(fill, encoding) : $b8a3e3a1f7632d0b$var$createBuffer(size).fill(fill);
    return $b8a3e3a1f7632d0b$var$createBuffer(size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/ $b8a3e3a1f7632d0b$var$Buffer.alloc = function(size, fill, encoding) {
    return $b8a3e3a1f7632d0b$var$alloc(size, fill, encoding);
};
function $b8a3e3a1f7632d0b$var$allocUnsafe(size) {
    $b8a3e3a1f7632d0b$var$assertSize(size);
    return $b8a3e3a1f7632d0b$var$createBuffer(size < 0 ? 0 : $b8a3e3a1f7632d0b$var$checked(size) | 0);
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */ $b8a3e3a1f7632d0b$var$Buffer.allocUnsafe = function(size) {
    return $b8a3e3a1f7632d0b$var$allocUnsafe(size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */ $b8a3e3a1f7632d0b$var$Buffer.allocUnsafeSlow = function(size) {
    return $b8a3e3a1f7632d0b$var$allocUnsafe(size);
};
function $b8a3e3a1f7632d0b$var$fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") encoding = "utf8";
    if (!$b8a3e3a1f7632d0b$var$Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
    var length = $b8a3e3a1f7632d0b$var$byteLength(string, encoding) | 0;
    var buf = $b8a3e3a1f7632d0b$var$createBuffer(length);
    var actual = buf.write(string, encoding);
    if (actual !== length) // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
    return buf;
}
function $b8a3e3a1f7632d0b$var$fromArrayLike(array) {
    var length = array.length < 0 ? 0 : $b8a3e3a1f7632d0b$var$checked(array.length) | 0;
    var buf = $b8a3e3a1f7632d0b$var$createBuffer(length);
    for(var i = 0; i < length; i += 1)buf[i] = array[i] & 255;
    return buf;
}
function $b8a3e3a1f7632d0b$var$fromArrayView(arrayView) {
    if ($b8a3e3a1f7632d0b$var$isInstance(arrayView, Uint8Array)) {
        var copy = new Uint8Array(arrayView);
        return $b8a3e3a1f7632d0b$var$fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return $b8a3e3a1f7632d0b$var$fromArrayLike(arrayView);
}
function $b8a3e3a1f7632d0b$var$fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError('"offset" is outside of buffer bounds');
    if (array.byteLength < byteOffset + (length || 0)) throw new RangeError('"length" is outside of buffer bounds');
    var buf;
    if (byteOffset === undefined && length === undefined) buf = new Uint8Array(array);
    else if (length === undefined) buf = new Uint8Array(array, byteOffset);
    else buf = new Uint8Array(array, byteOffset, length);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(buf, $b8a3e3a1f7632d0b$var$Buffer.prototype);
    return buf;
}
function $b8a3e3a1f7632d0b$var$fromObject(obj) {
    if ($b8a3e3a1f7632d0b$var$Buffer.isBuffer(obj)) {
        var len = $b8a3e3a1f7632d0b$var$checked(obj.length) | 0;
        var buf = $b8a3e3a1f7632d0b$var$createBuffer(len);
        if (buf.length === 0) return buf;
        obj.copy(buf, 0, 0, len);
        return buf;
    }
    if (obj.length !== undefined) {
        if (typeof obj.length !== "number" || $b8a3e3a1f7632d0b$var$numberIsNaN(obj.length)) return $b8a3e3a1f7632d0b$var$createBuffer(0);
        return $b8a3e3a1f7632d0b$var$fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) return $b8a3e3a1f7632d0b$var$fromArrayLike(obj.data);
}
function $b8a3e3a1f7632d0b$var$checked(length) {
    // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= $b8a3e3a1f7632d0b$var$K_MAX_LENGTH) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + $b8a3e3a1f7632d0b$var$K_MAX_LENGTH.toString(16) + " bytes");
    return length | 0;
}
function $b8a3e3a1f7632d0b$var$SlowBuffer(length) {
    if (+length != length) length = 0;
    return $b8a3e3a1f7632d0b$var$Buffer.alloc(+length);
}
$b8a3e3a1f7632d0b$var$Buffer.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== $b8a3e3a1f7632d0b$var$Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
    ;
};
$b8a3e3a1f7632d0b$var$Buffer.compare = function compare(a, b) {
    if ($b8a3e3a1f7632d0b$var$isInstance(a, Uint8Array)) a = $b8a3e3a1f7632d0b$var$Buffer.from(a, a.offset, a.byteLength);
    if ($b8a3e3a1f7632d0b$var$isInstance(b, Uint8Array)) b = $b8a3e3a1f7632d0b$var$Buffer.from(b, b.offset, b.byteLength);
    if (!$b8a3e3a1f7632d0b$var$Buffer.isBuffer(a) || !$b8a3e3a1f7632d0b$var$Buffer.isBuffer(b)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (a === b) return 0;
    var x = a.length;
    var y = b.length;
    for(var i = 0, len = Math.min(x, y); i < len; ++i)if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
$b8a3e3a1f7632d0b$var$Buffer.isEncoding = function isEncoding(encoding) {
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
$b8a3e3a1f7632d0b$var$Buffer.concat = function concat(list, length) {
    if (!Array.isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (list.length === 0) return $b8a3e3a1f7632d0b$var$Buffer.alloc(0);
    var i;
    if (length === undefined) {
        length = 0;
        for(i = 0; i < list.length; ++i)length += list[i].length;
    }
    var buffer = $b8a3e3a1f7632d0b$var$Buffer.allocUnsafe(length);
    var pos = 0;
    for(i = 0; i < list.length; ++i){
        var buf = list[i];
        if ($b8a3e3a1f7632d0b$var$isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) $b8a3e3a1f7632d0b$var$Buffer.from(buf).copy(buffer, pos);
            else Uint8Array.prototype.set.call(buffer, buf, pos);
        } else if (!$b8a3e3a1f7632d0b$var$Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
        else buf.copy(buffer, pos);
        pos += buf.length;
    }
    return buffer;
};
function $b8a3e3a1f7632d0b$var$byteLength(string, encoding) {
    if ($b8a3e3a1f7632d0b$var$Buffer.isBuffer(string)) return string.length;
    if (ArrayBuffer.isView(string) || $b8a3e3a1f7632d0b$var$isInstance(string, ArrayBuffer)) return string.byteLength;
    if (typeof string !== "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
    var len = string.length;
    var mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) return 0;
    // Use a for loop to avoid recursion
    var loweredCase = false;
    for(;;)switch(encoding){
        case "ascii":
        case "latin1":
        case "binary":
            return len;
        case "utf8":
        case "utf-8":
            return $b8a3e3a1f7632d0b$var$utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return len * 2;
        case "hex":
            return len >>> 1;
        case "base64":
            return $b8a3e3a1f7632d0b$var$base64ToBytes(string).length;
        default:
            if (loweredCase) return mustMatch ? -1 : $b8a3e3a1f7632d0b$var$utf8ToBytes(string).length // assume utf8
            ;
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
    }
}
$b8a3e3a1f7632d0b$var$Buffer.byteLength = $b8a3e3a1f7632d0b$var$byteLength;
function $b8a3e3a1f7632d0b$var$slowToString(encoding, start, end) {
    var loweredCase = false;
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
            return $b8a3e3a1f7632d0b$var$hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
            return $b8a3e3a1f7632d0b$var$utf8Slice(this, start, end);
        case "ascii":
            return $b8a3e3a1f7632d0b$var$asciiSlice(this, start, end);
        case "latin1":
        case "binary":
            return $b8a3e3a1f7632d0b$var$latin1Slice(this, start, end);
        case "base64":
            return $b8a3e3a1f7632d0b$var$base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return $b8a3e3a1f7632d0b$var$utf16leSlice(this, start, end);
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
$b8a3e3a1f7632d0b$var$Buffer.prototype._isBuffer = true;
function $b8a3e3a1f7632d0b$var$swap(b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
}
$b8a3e3a1f7632d0b$var$Buffer.prototype.swap16 = function swap16() {
    var len = this.length;
    if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for(var i = 0; i < len; i += 2)$b8a3e3a1f7632d0b$var$swap(this, i, i + 1);
    return this;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.swap32 = function swap32() {
    var len = this.length;
    if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for(var i = 0; i < len; i += 4){
        $b8a3e3a1f7632d0b$var$swap(this, i, i + 3);
        $b8a3e3a1f7632d0b$var$swap(this, i + 1, i + 2);
    }
    return this;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.swap64 = function swap64() {
    var len = this.length;
    if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for(var i = 0; i < len; i += 8){
        $b8a3e3a1f7632d0b$var$swap(this, i, i + 7);
        $b8a3e3a1f7632d0b$var$swap(this, i + 1, i + 6);
        $b8a3e3a1f7632d0b$var$swap(this, i + 2, i + 5);
        $b8a3e3a1f7632d0b$var$swap(this, i + 3, i + 4);
    }
    return this;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.toString = function toString() {
    var length = this.length;
    if (length === 0) return "";
    if (arguments.length === 0) return $b8a3e3a1f7632d0b$var$utf8Slice(this, 0, length);
    return $b8a3e3a1f7632d0b$var$slowToString.apply(this, arguments);
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.toLocaleString = $b8a3e3a1f7632d0b$var$Buffer.prototype.toString;
$b8a3e3a1f7632d0b$var$Buffer.prototype.equals = function equals(b) {
    if (!$b8a3e3a1f7632d0b$var$Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
    if (this === b) return true;
    return $b8a3e3a1f7632d0b$var$Buffer.compare(this, b) === 0;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.inspect = function inspect() {
    var str = "";
    var max = $b8a3e3a1f7632d0b$export$f99ded8fe4b79145;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max) str += " ... ";
    return "<Buffer " + str + ">";
};
if ($b8a3e3a1f7632d0b$var$customInspectSymbol) $b8a3e3a1f7632d0b$var$Buffer.prototype[$b8a3e3a1f7632d0b$var$customInspectSymbol] = $b8a3e3a1f7632d0b$var$Buffer.prototype.inspect;
$b8a3e3a1f7632d0b$var$Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if ($b8a3e3a1f7632d0b$var$isInstance(target, Uint8Array)) target = $b8a3e3a1f7632d0b$var$Buffer.from(target, target.offset, target.byteLength);
    if (!$b8a3e3a1f7632d0b$var$Buffer.isBuffer(target)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
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
    var x = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x, y);
    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);
    for(var i = 0; i < len; ++i)if (thisCopy[i] !== targetCopy[i]) {
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
function $b8a3e3a1f7632d0b$var$bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
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
    if ($b8a3e3a1f7632d0b$var$numberIsNaN(byteOffset)) // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
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
    if (typeof val === "string") val = $b8a3e3a1f7632d0b$var$Buffer.from(val, encoding);
    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if ($b8a3e3a1f7632d0b$var$Buffer.isBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) return -1;
        return $b8a3e3a1f7632d0b$var$arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
        val = val & 0xFF // Search for a byte value [0-255]
        ;
        if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            else return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
        return $b8a3e3a1f7632d0b$var$arrayIndexOf(buffer, [
            val
        ], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
}
function $b8a3e3a1f7632d0b$var$arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;
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
    var i;
    if (dir) {
        var foundIndex = -1;
        for(i = byteOffset; i < arrLength; i++)if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
        }
    } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for(i = byteOffset; i >= 0; i--){
            var found = true;
            for(var j = 0; j < valLength; j++)if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
            }
            if (found) return i;
        }
    }
    return -1;
}
$b8a3e3a1f7632d0b$var$Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return $b8a3e3a1f7632d0b$var$bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return $b8a3e3a1f7632d0b$var$bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function $b8a3e3a1f7632d0b$var$hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) length = remaining;
    else {
        length = Number(length);
        if (length > remaining) length = remaining;
    }
    var strLen = string.length;
    if (length > strLen / 2) length = strLen / 2;
    for(var i = 0; i < length; ++i){
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if ($b8a3e3a1f7632d0b$var$numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
    }
    return i;
}
function $b8a3e3a1f7632d0b$var$utf8Write(buf, string, offset, length) {
    return $b8a3e3a1f7632d0b$var$blitBuffer($b8a3e3a1f7632d0b$var$utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function $b8a3e3a1f7632d0b$var$asciiWrite(buf, string, offset, length) {
    return $b8a3e3a1f7632d0b$var$blitBuffer($b8a3e3a1f7632d0b$var$asciiToBytes(string), buf, offset, length);
}
function $b8a3e3a1f7632d0b$var$base64Write(buf, string, offset, length) {
    return $b8a3e3a1f7632d0b$var$blitBuffer($b8a3e3a1f7632d0b$var$base64ToBytes(string), buf, offset, length);
}
function $b8a3e3a1f7632d0b$var$ucs2Write(buf, string, offset, length) {
    return $b8a3e3a1f7632d0b$var$blitBuffer($b8a3e3a1f7632d0b$var$utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
$b8a3e3a1f7632d0b$var$Buffer.prototype.write = function write(string, offset, length, encoding) {
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
    var remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    if (!encoding) encoding = "utf8";
    var loweredCase = false;
    for(;;)switch(encoding){
        case "hex":
            return $b8a3e3a1f7632d0b$var$hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
            return $b8a3e3a1f7632d0b$var$utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
            return $b8a3e3a1f7632d0b$var$asciiWrite(this, string, offset, length);
        case "base64":
            // Warning: maxLength not taken into account in base64Write
            return $b8a3e3a1f7632d0b$var$base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return $b8a3e3a1f7632d0b$var$ucs2Write(this, string, offset, length);
        default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
    }
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.toJSON = function toJSON() {
    return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
    };
};
function $b8a3e3a1f7632d0b$var$base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) return $4urTP.fromByteArray(buf);
    else return $4urTP.fromByteArray(buf.slice(start, end));
}
function $b8a3e3a1f7632d0b$var$utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];
    var i = start;
    while(i < end){
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
        if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
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
    return $b8a3e3a1f7632d0b$var$decodeCodePointsArray(res);
}
// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var $b8a3e3a1f7632d0b$var$MAX_ARGUMENTS_LENGTH = 0x1000;
function $b8a3e3a1f7632d0b$var$decodeCodePointsArray(codePoints) {
    var len = codePoints.length;
    if (len <= $b8a3e3a1f7632d0b$var$MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
    ;
    // Decode in chunks to avoid "call stack size exceeded".
    var res = "";
    var i = 0;
    while(i < len)res += String.fromCharCode.apply(String, codePoints.slice(i, i += $b8a3e3a1f7632d0b$var$MAX_ARGUMENTS_LENGTH));
    return res;
}
function $b8a3e3a1f7632d0b$var$asciiSlice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for(var i = start; i < end; ++i)ret += String.fromCharCode(buf[i] & 0x7F);
    return ret;
}
function $b8a3e3a1f7632d0b$var$latin1Slice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for(var i = start; i < end; ++i)ret += String.fromCharCode(buf[i]);
    return ret;
}
function $b8a3e3a1f7632d0b$var$hexSlice(buf, start, end) {
    var len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    var out = "";
    for(var i = start; i < end; ++i)out += $b8a3e3a1f7632d0b$var$hexSliceLookupTable[buf[i]];
    return out;
}
function $b8a3e3a1f7632d0b$var$utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = "";
    // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
    for(var i = 0; i < bytes.length - 1; i += 2)res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    return res;
}
$b8a3e3a1f7632d0b$var$Buffer.prototype.slice = function slice(start, end) {
    var len = this.length;
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
    var newBuf = this.subarray(start, end);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(newBuf, $b8a3e3a1f7632d0b$var$Buffer.prototype);
    return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */ function $b8a3e3a1f7632d0b$var$checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
    if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
}
$b8a3e3a1f7632d0b$var$Buffer.prototype.readUintLE = $b8a3e3a1f7632d0b$var$Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, byteLength, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while(++i < byteLength && (mul *= 0x100))val += this[offset + i] * mul;
    return val;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readUintBE = $b8a3e3a1f7632d0b$var$Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, byteLength, this.length);
    var val = this[offset + --byteLength];
    var mul = 1;
    while(byteLength > 0 && (mul *= 0x100))val += this[offset + --byteLength] * mul;
    return val;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readUint8 = $b8a3e3a1f7632d0b$var$Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, 1, this.length);
    return this[offset];
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readUint16LE = $b8a3e3a1f7632d0b$var$Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readUint16BE = $b8a3e3a1f7632d0b$var$Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readUint32LE = $b8a3e3a1f7632d0b$var$Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readUint32BE = $b8a3e3a1f7632d0b$var$Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, 4, this.length);
    return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, byteLength, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while(++i < byteLength && (mul *= 0x100))val += this[offset + i] * mul;
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, byteLength, this.length);
    var i = byteLength;
    var mul = 1;
    var val = this[offset + --i];
    while(i > 0 && (mul *= 0x100))val += this[offset + --i] * mul;
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return this[offset];
    return (0xff - this[offset] + 1) * -1;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, 2, this.length);
    var val = this[offset] | this[offset + 1] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | this[offset] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, 4, this.length);
    return $gpARF.read(this, offset, true, 23, 4);
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, 4, this.length);
    return $gpARF.read(this, offset, false, 23, 4);
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, 8, this.length);
    return $gpARF.read(this, offset, true, 52, 8);
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkOffset(offset, 8, this.length);
    return $gpARF.read(this, offset, false, 52, 8);
};
function $b8a3e3a1f7632d0b$var$checkInt(buf, value, offset, ext, max, min) {
    if (!$b8a3e3a1f7632d0b$var$Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
}
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeUintLE = $b8a3e3a1f7632d0b$var$Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
        $b8a3e3a1f7632d0b$var$checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    var mul = 1;
    var i = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
    return offset + byteLength;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeUintBE = $b8a3e3a1f7632d0b$var$Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
        $b8a3e3a1f7632d0b$var$checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    var i = byteLength - 1;
    var mul = 1;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
    return offset + byteLength;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeUint8 = $b8a3e3a1f7632d0b$var$Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkInt(this, value, offset, 1, 0xff, 0);
    this[offset] = value & 0xff;
    return offset + 1;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeUint16LE = $b8a3e3a1f7632d0b$var$Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeUint16BE = $b8a3e3a1f7632d0b$var$Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeUint32LE = $b8a3e3a1f7632d0b$var$Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
    return offset + 4;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeUint32BE = $b8a3e3a1f7632d0b$var$Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength - 1);
        $b8a3e3a1f7632d0b$var$checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    var i = 0;
    var mul = 1;
    var sub = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) sub = 1;
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength - 1);
        $b8a3e3a1f7632d0b$var$checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    var i = byteLength - 1;
    var mul = 1;
    var sub = 0;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) sub = 1;
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkInt(this, value, offset, 1, 0x7f, -128);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = value & 0xff;
    return offset + 1;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkInt(this, value, offset, 2, 0x7fff, -32768);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkInt(this, value, offset, 2, 0x7fff, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
    if (value < 0) value = 0xffffffff + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
function $b8a3e3a1f7632d0b$var$checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
    if (offset < 0) throw new RangeError("Index out of range");
}
function $b8a3e3a1f7632d0b$var$writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -340282346638528860000000000000000000000);
    $gpARF.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
}
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return $b8a3e3a1f7632d0b$var$writeFloat(this, value, offset, true, noAssert);
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return $b8a3e3a1f7632d0b$var$writeFloat(this, value, offset, false, noAssert);
};
function $b8a3e3a1f7632d0b$var$writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $b8a3e3a1f7632d0b$var$checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);
    $gpARF.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
}
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return $b8a3e3a1f7632d0b$var$writeDouble(this, value, offset, true, noAssert);
};
$b8a3e3a1f7632d0b$var$Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return $b8a3e3a1f7632d0b$var$writeDouble(this, value, offset, false, noAssert);
};
// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
$b8a3e3a1f7632d0b$var$Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!$b8a3e3a1f7632d0b$var$Buffer.isBuffer(target)) throw new TypeError("argument should be a Buffer");
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
    var len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end);
    else Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    return len;
};
// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
$b8a3e3a1f7632d0b$var$Buffer.prototype.fill = function fill(val, start, end, encoding) {
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
        if (typeof encoding === "string" && !$b8a3e3a1f7632d0b$var$Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
        if (val.length === 1) {
            var code = val.charCodeAt(0);
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
    var i;
    if (typeof val === "number") for(i = start; i < end; ++i)this[i] = val;
    else {
        var bytes = $b8a3e3a1f7632d0b$var$Buffer.isBuffer(val) ? val : $b8a3e3a1f7632d0b$var$Buffer.from(val, encoding);
        var len = bytes.length;
        if (len === 0) throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        for(i = 0; i < end - start; ++i)this[i + start] = bytes[i % len];
    }
    return this;
};
// HELPER FUNCTIONS
// ================
var $b8a3e3a1f7632d0b$var$INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function $b8a3e3a1f7632d0b$var$base64clean(str) {
    // Node takes equal signs as end of the Base64 encoding
    str = str.split("=")[0];
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = str.trim().replace($b8a3e3a1f7632d0b$var$INVALID_BASE64_RE, "");
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return "";
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while(str.length % 4 !== 0)str = str + "=";
    return str;
}
function $b8a3e3a1f7632d0b$var$utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];
    for(var i = 0; i < length; ++i){
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
function $b8a3e3a1f7632d0b$var$asciiToBytes(str) {
    var byteArray = [];
    for(var i = 0; i < str.length; ++i)// Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
    return byteArray;
}
function $b8a3e3a1f7632d0b$var$utf16leToBytes(str, units) {
    var c, hi, lo;
    var byteArray = [];
    for(var i = 0; i < str.length; ++i){
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
    }
    return byteArray;
}
function $b8a3e3a1f7632d0b$var$base64ToBytes(str) {
    return $4urTP.toByteArray($b8a3e3a1f7632d0b$var$base64clean(str));
}
function $b8a3e3a1f7632d0b$var$blitBuffer(src, dst, offset, length) {
    for(var i = 0; i < length; ++i){
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
    }
    return i;
}
// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function $b8a3e3a1f7632d0b$var$isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
}
function $b8a3e3a1f7632d0b$var$numberIsNaN(obj) {
    // For IE11 support
    return obj !== obj // eslint-disable-line no-self-compare
    ;
}
// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var $b8a3e3a1f7632d0b$var$hexSliceLookupTable = function() {
    var alphabet = "0123456789abcdef";
    var table = new Array(256);
    for(var i = 0; i < 16; ++i){
        var i16 = i * 16;
        for(var j = 0; j < 16; ++j)table[i16 + j] = alphabet[i] + alphabet[j];
    }
    return table;
}();

});
parcelRequire.register("4urTP", function(module, exports) {

$parcel$export(module.exports, "toByteArray", () => $344f9afe57d26286$export$d622b2ad8d90c771, (v) => $344f9afe57d26286$export$d622b2ad8d90c771 = v);
$parcel$export(module.exports, "fromByteArray", () => $344f9afe57d26286$export$6100ba28696e12de, (v) => $344f9afe57d26286$export$6100ba28696e12de = v);
var $344f9afe57d26286$export$a48f0734ac7c2329;
var $344f9afe57d26286$export$d622b2ad8d90c771;
var $344f9afe57d26286$export$6100ba28696e12de;
"use strict";
$344f9afe57d26286$export$a48f0734ac7c2329 = $344f9afe57d26286$var$byteLength;
$344f9afe57d26286$export$d622b2ad8d90c771 = $344f9afe57d26286$var$toByteArray;
$344f9afe57d26286$export$6100ba28696e12de = $344f9afe57d26286$var$fromByteArray;
var $344f9afe57d26286$var$lookup = [];
var $344f9afe57d26286$var$revLookup = [];
var $344f9afe57d26286$var$Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var $344f9afe57d26286$var$code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for(var $344f9afe57d26286$var$i = 0, $344f9afe57d26286$var$len = $344f9afe57d26286$var$code.length; $344f9afe57d26286$var$i < $344f9afe57d26286$var$len; ++$344f9afe57d26286$var$i){
    $344f9afe57d26286$var$lookup[$344f9afe57d26286$var$i] = $344f9afe57d26286$var$code[$344f9afe57d26286$var$i];
    $344f9afe57d26286$var$revLookup[$344f9afe57d26286$var$code.charCodeAt($344f9afe57d26286$var$i)] = $344f9afe57d26286$var$i;
}
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
$344f9afe57d26286$var$revLookup["-".charCodeAt(0)] = 62;
$344f9afe57d26286$var$revLookup["_".charCodeAt(0)] = 63;
function $344f9afe57d26286$var$getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
// base64 is 4/3 + up to two characters of the original data
function $344f9afe57d26286$var$byteLength(b64) {
    var lens = $344f9afe57d26286$var$getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function $344f9afe57d26286$var$_byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function $344f9afe57d26286$var$toByteArray(b64) {
    var tmp;
    var lens = $344f9afe57d26286$var$getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new $344f9afe57d26286$var$Arr($344f9afe57d26286$var$_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for(i = 0; i < len; i += 4){
        tmp = $344f9afe57d26286$var$revLookup[b64.charCodeAt(i)] << 18 | $344f9afe57d26286$var$revLookup[b64.charCodeAt(i + 1)] << 12 | $344f9afe57d26286$var$revLookup[b64.charCodeAt(i + 2)] << 6 | $344f9afe57d26286$var$revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 2) {
        tmp = $344f9afe57d26286$var$revLookup[b64.charCodeAt(i)] << 2 | $344f9afe57d26286$var$revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 1) {
        tmp = $344f9afe57d26286$var$revLookup[b64.charCodeAt(i)] << 10 | $344f9afe57d26286$var$revLookup[b64.charCodeAt(i + 1)] << 4 | $344f9afe57d26286$var$revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    return arr;
}
function $344f9afe57d26286$var$tripletToBase64(num) {
    return $344f9afe57d26286$var$lookup[num >> 18 & 0x3F] + $344f9afe57d26286$var$lookup[num >> 12 & 0x3F] + $344f9afe57d26286$var$lookup[num >> 6 & 0x3F] + $344f9afe57d26286$var$lookup[num & 0x3F];
}
function $344f9afe57d26286$var$encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i = start; i < end; i += 3){
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push($344f9afe57d26286$var$tripletToBase64(tmp));
    }
    return output.join("");
}
function $344f9afe57d26286$var$fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    ;
    var parts = [];
    var maxChunkLength = 16383 // must be multiple of 3
    ;
    // go through the array every three bytes, we'll deal with trailing stuff later
    for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength)parts.push($344f9afe57d26286$var$encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push($344f9afe57d26286$var$lookup[tmp >> 2] + $344f9afe57d26286$var$lookup[tmp << 4 & 0x3F] + "==");
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push($344f9afe57d26286$var$lookup[tmp >> 10] + $344f9afe57d26286$var$lookup[tmp >> 4 & 0x3F] + $344f9afe57d26286$var$lookup[tmp << 2 & 0x3F] + "=");
    }
    return parts.join("");
}

});

parcelRequire.register("gpARF", function(module, exports) {

$parcel$export(module.exports, "read", () => $bf2b93a914030731$export$aafa59e2e03f2942, (v) => $bf2b93a914030731$export$aafa59e2e03f2942 = v);
$parcel$export(module.exports, "write", () => $bf2b93a914030731$export$68d8715fc104d294, (v) => $bf2b93a914030731$export$68d8715fc104d294 = v);
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ var $bf2b93a914030731$export$aafa59e2e03f2942;
var $bf2b93a914030731$export$68d8715fc104d294;
$bf2b93a914030731$export$aafa59e2e03f2942 = function(buffer, offset, isLE, mLen, nBytes) {
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
$bf2b93a914030731$export$68d8715fc104d294 = function(buffer, value, offset, isLE, mLen, nBytes) {
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



parcelRequire.register("lJ6u6", function(module, exports) {

$parcel$export(module.exports, "default", () => $fd12d4a26b1c1a0a$export$2e2bcd8739ae039);

var $grLSW = parcelRequire("grLSW");

var $fQPNj = parcelRequire("fQPNj");
var $fd12d4a26b1c1a0a$require$Buffer = $fQPNj.Buffer;
var $fd12d4a26b1c1a0a$var$Tag = 0x05;
function $fd12d4a26b1c1a0a$var$asUInt16BE(value) {
    var b = $fd12d4a26b1c1a0a$require$Buffer.alloc(2);
    b.writeUInt16BE(value, 0);
    return b;
}
var $fd12d4a26b1c1a0a$var$initialAcc = {
    data: $fd12d4a26b1c1a0a$require$Buffer.alloc(0),
    dataLength: 0,
    sequence: 0
};
/**
 *
 */ var $fd12d4a26b1c1a0a$var$createHIDframing = function(channel, packetSize) {
    return {
        makeBlocks: function(apdu) {
            var data = $fd12d4a26b1c1a0a$require$Buffer.concat([
                $fd12d4a26b1c1a0a$var$asUInt16BE(apdu.length),
                apdu
            ]);
            var blockSize = packetSize - 5;
            var nbBlocks = Math.ceil(data.length / blockSize);
            data = $fd12d4a26b1c1a0a$require$Buffer.concat([
                data,
                $fd12d4a26b1c1a0a$require$Buffer.alloc(nbBlocks * blockSize - data.length + 1).fill(0)
            ]);
            var blocks = [];
            for(var i = 0; i < nbBlocks; i++){
                var head = $fd12d4a26b1c1a0a$require$Buffer.alloc(5);
                head.writeUInt16BE(channel, 0);
                head.writeUInt8($fd12d4a26b1c1a0a$var$Tag, 2);
                head.writeUInt16BE(i, 3);
                var chunk = data.slice(i * blockSize, (i + 1) * blockSize);
                blocks.push($fd12d4a26b1c1a0a$require$Buffer.concat([
                    head,
                    chunk
                ]));
            }
            return blocks;
        },
        reduceResponse: function(acc, chunk) {
            var _a = acc || $fd12d4a26b1c1a0a$var$initialAcc, data = _a.data, dataLength = _a.dataLength, sequence = _a.sequence;
            if (chunk.readUInt16BE(0) !== channel) throw new (0, $grLSW.TransportError)("Invalid channel", "InvalidChannel");
            if (chunk.readUInt8(2) !== $fd12d4a26b1c1a0a$var$Tag) throw new (0, $grLSW.TransportError)("Invalid tag", "InvalidTag");
            if (chunk.readUInt16BE(3) !== sequence) throw new (0, $grLSW.TransportError)("Invalid sequence", "InvalidSequence");
            if (!acc) dataLength = chunk.readUInt16BE(5);
            sequence++;
            var chunkData = chunk.slice(acc ? 5 : 7);
            data = $fd12d4a26b1c1a0a$require$Buffer.concat([
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
var $fd12d4a26b1c1a0a$export$2e2bcd8739ae039 = $fd12d4a26b1c1a0a$var$createHIDframing;

});

parcelRequire.register("6x0Az", function(module, exports) {

$parcel$export(module.exports, "ledgerUSBVendorId", () => $4c164819729aec2f$export$268c42a4ddec87f3, (v) => $4c164819729aec2f$export$268c42a4ddec87f3 = v);
$parcel$export(module.exports, "identifyUSBProductId", () => $4c164819729aec2f$export$df8f4444a7c73154, (v) => $4c164819729aec2f$export$df8f4444a7c73154 = v);

var $kNaiB = parcelRequire("kNaiB");
var $4c164819729aec2f$var$__assign = undefined && undefined.__assign || function() {
    $4c164819729aec2f$var$__assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $4c164819729aec2f$var$__assign.apply(this, arguments);
};
var $4c164819729aec2f$var$_a;
var $4c164819729aec2f$export$36f742de2ed7d90b = 0x01;
var $4c164819729aec2f$export$54bc2e040474338c = 0x02;
var $4c164819729aec2f$export$9368aec5a4b02506 = 0x04;
var $4c164819729aec2f$export$95f5e559ebc551b3 = 0x08;
var $4c164819729aec2f$export$18b064749618be01 = 0x10;
var $4c164819729aec2f$export$b8d24b2c0d9c5549;
(function(DeviceModelId) {
    DeviceModelId["blue"] = "blue";
    DeviceModelId["nanoS"] = "nanoS";
    DeviceModelId["nanoSP"] = "nanoSP";
    DeviceModelId["nanoX"] = "nanoX";
    DeviceModelId["stax"] = "stax";
})($4c164819729aec2f$export$b8d24b2c0d9c5549 || ($4c164819729aec2f$export$b8d24b2c0d9c5549 = {}));
var $4c164819729aec2f$var$devices = ($4c164819729aec2f$var$_a = {}, $4c164819729aec2f$var$_a[$4c164819729aec2f$export$b8d24b2c0d9c5549.blue] = {
    id: $4c164819729aec2f$export$b8d24b2c0d9c5549.blue,
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
}, $4c164819729aec2f$var$_a[$4c164819729aec2f$export$b8d24b2c0d9c5549.nanoS] = {
    id: $4c164819729aec2f$export$b8d24b2c0d9c5549.nanoS,
    productName: "Ledger\xa0Nano\xa0S",
    productIdMM: 0x10,
    legacyUsbProductId: 0x0001,
    usbOnly: true,
    memorySize: 327680,
    masks: [
        0x31100000
    ],
    getBlockSize: function(firmwareVersion) {
        var _a;
        return (0, (/*@__PURE__*/$parcel$interopDefault($kNaiB))).lt((_a = (0, (/*@__PURE__*/$parcel$interopDefault($kNaiB))).coerce(firmwareVersion)) !== null && _a !== void 0 ? _a : "", "2.0.0") ? 4096 : 2048;
    }
}, $4c164819729aec2f$var$_a[$4c164819729aec2f$export$b8d24b2c0d9c5549.nanoSP] = {
    id: $4c164819729aec2f$export$b8d24b2c0d9c5549.nanoSP,
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
}, $4c164819729aec2f$var$_a[$4c164819729aec2f$export$b8d24b2c0d9c5549.nanoX] = {
    id: $4c164819729aec2f$export$b8d24b2c0d9c5549.nanoX,
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
        }
    ]
}, $4c164819729aec2f$var$_a[$4c164819729aec2f$export$b8d24b2c0d9c5549.stax] = {
    id: $4c164819729aec2f$export$b8d24b2c0d9c5549.stax,
    productName: "Ledger\xa0Stax",
    productIdMM: 0x60,
    legacyUsbProductId: 0x0006,
    usbOnly: false,
    memorySize: 1572864,
    masks: [
        0x33200000
    ],
    getBlockSize: function(_firmwareVersion) {
        return 32;
    },
    bluetoothSpec: [
        {
            serviceUuid: "13d63400-2c97-6004-0000-4c6564676572",
            notifyUuid: "13d63400-2c97-6004-0001-4c6564676572",
            writeUuid: "13d63400-2c97-6004-0002-4c6564676572",
            writeCmdUuid: "13d63400-2c97-6004-0003-4c6564676572"
        }
    ]
}, $4c164819729aec2f$var$_a);
var $4c164819729aec2f$var$productMap = {
    Blue: $4c164819729aec2f$export$b8d24b2c0d9c5549.blue,
    "Nano S": $4c164819729aec2f$export$b8d24b2c0d9c5549.nanoS,
    "Nano S Plus": $4c164819729aec2f$export$b8d24b2c0d9c5549.nanoSP,
    "Nano X": $4c164819729aec2f$export$b8d24b2c0d9c5549.nanoX,
    Stax: $4c164819729aec2f$export$b8d24b2c0d9c5549.stax
};
var $4c164819729aec2f$var$devicesList = Object.values($4c164819729aec2f$var$devices);
var $4c164819729aec2f$export$268c42a4ddec87f3 = 0x2c97;
var $4c164819729aec2f$export$289d48518583cbd7 = function(id) {
    var info = $4c164819729aec2f$var$devices[id];
    if (!info) throw new Error("device '" + id + "' does not exist");
    return info;
};
var $4c164819729aec2f$export$f656be11ec4fd95b = function(targetId) {
    var deviceModel = $4c164819729aec2f$var$devicesList.find(function(_a) {
        var masks = _a.masks;
        return masks.find(function(mask) {
            return (targetId & 0xffff0000) === mask;
        });
    });
    return deviceModel;
};
var $4c164819729aec2f$export$df8f4444a7c73154 = function(usbProductId) {
    var legacy = $4c164819729aec2f$var$devicesList.find(function(d) {
        return d.legacyUsbProductId === usbProductId;
    });
    if (legacy) return legacy;
    var mm = usbProductId >> 8;
    var deviceModel = $4c164819729aec2f$var$devicesList.find(function(d) {
        return d.productIdMM === mm;
    });
    return deviceModel;
};
var $4c164819729aec2f$export$dce0906e1912b553 = function(productName) {
    var deviceModel = $4c164819729aec2f$var$devicesList.find(function(d) {
        return d.id === $4c164819729aec2f$var$productMap[productName];
    });
    return deviceModel;
};
var $4c164819729aec2f$var$bluetoothServices = [];
var $4c164819729aec2f$var$serviceUuidToInfos = {};
for(var $4c164819729aec2f$var$id in $4c164819729aec2f$var$devices){
    var $4c164819729aec2f$var$deviceModel = $4c164819729aec2f$var$devices[$4c164819729aec2f$var$id];
    var $4c164819729aec2f$var$bluetoothSpec = $4c164819729aec2f$var$deviceModel.bluetoothSpec;
    if ($4c164819729aec2f$var$bluetoothSpec) for(var $4c164819729aec2f$var$i = 0; $4c164819729aec2f$var$i < $4c164819729aec2f$var$bluetoothSpec.length; $4c164819729aec2f$var$i++){
        var $4c164819729aec2f$var$spec = $4c164819729aec2f$var$bluetoothSpec[$4c164819729aec2f$var$i];
        $4c164819729aec2f$var$bluetoothServices.push($4c164819729aec2f$var$spec.serviceUuid);
        $4c164819729aec2f$var$serviceUuidToInfos[$4c164819729aec2f$var$spec.serviceUuid] = $4c164819729aec2f$var$serviceUuidToInfos[$4c164819729aec2f$var$spec.serviceUuid.replace(/-/g, "")] = $4c164819729aec2f$var$__assign({
            deviceModel: $4c164819729aec2f$var$deviceModel
        }, $4c164819729aec2f$var$spec);
    }
}
var $4c164819729aec2f$export$1f1251c1c71d84cf = function() {
    return $4c164819729aec2f$var$bluetoothServices;
};
var $4c164819729aec2f$export$8c98567a3882f79e = function(uuid) {
    return $4c164819729aec2f$var$serviceUuidToInfos[uuid.toLowerCase()];
};

});
parcelRequire.register("kNaiB", function(module, exports) {
// just pre-load all the stuff that index.js lazily exports

var $d3Bnd = parcelRequire("d3Bnd");

var $j6fXN = parcelRequire("j6fXN");

var $h3YuX = parcelRequire("h3YuX");

var $jxFKG = parcelRequire("jxFKG");

var $7Y4Ig = parcelRequire("7Y4Ig");

var $13vah = parcelRequire("13vah");

var $dAssv = parcelRequire("dAssv");

var $dMhOs = parcelRequire("dMhOs");

var $jLuix = parcelRequire("jLuix");

var $8hiRW = parcelRequire("8hiRW");

var $bhbKN = parcelRequire("bhbKN");

var $2s6sL = parcelRequire("2s6sL");

var $jIKy5 = parcelRequire("jIKy5");

var $kxOzD = parcelRequire("kxOzD");

var $jLnvL = parcelRequire("jLnvL");

var $9Pww2 = parcelRequire("9Pww2");

var $4rhO7 = parcelRequire("4rhO7");

var $8VLkv = parcelRequire("8VLkv");

var $1o4Iy = parcelRequire("1o4Iy");

var $2T4FG = parcelRequire("2T4FG");

var $3Ie6D = parcelRequire("3Ie6D");

var $6eYrb = parcelRequire("6eYrb");

var $1EgrR = parcelRequire("1EgrR");

var $i27bR = parcelRequire("i27bR");

var $17kkN = parcelRequire("17kkN");

var $hooOm = parcelRequire("hooOm");

var $5VAYm = parcelRequire("5VAYm");

var $Fisrn = parcelRequire("Fisrn");

var $j4o7G = parcelRequire("j4o7G");

var $bRx6I = parcelRequire("bRx6I");

var $6rxxJ = parcelRequire("6rxxJ");

var $f4OpN = parcelRequire("f4OpN");

var $rmvC0 = parcelRequire("rmvC0");

var $pL2Fs = parcelRequire("pL2Fs");

var $iGeRj = parcelRequire("iGeRj");

var $2jTzt = parcelRequire("2jTzt");

var $9BKgo = parcelRequire("9BKgo");

var $bzGdA = parcelRequire("bzGdA");

var $dXWok = parcelRequire("dXWok");

var $2jHn5 = parcelRequire("2jHn5");

var $ahkky = parcelRequire("ahkky");
module.exports = {
    parse: $7Y4Ig,
    valid: $13vah,
    clean: $dAssv,
    inc: $dMhOs,
    diff: $jLuix,
    major: $8hiRW,
    minor: $bhbKN,
    patch: $2s6sL,
    prerelease: $jIKy5,
    compare: $kxOzD,
    rcompare: $jLnvL,
    compareLoose: $9Pww2,
    compareBuild: $4rhO7,
    sort: $8VLkv,
    rsort: $1o4Iy,
    gt: $2T4FG,
    lt: $3Ie6D,
    eq: $6eYrb,
    neq: $1EgrR,
    gte: $i27bR,
    lte: $17kkN,
    cmp: $hooOm,
    coerce: $5VAYm,
    Comparator: $Fisrn,
    Range: $j4o7G,
    satisfies: $bRx6I,
    toComparators: $6rxxJ,
    maxSatisfying: $f4OpN,
    minSatisfying: $rmvC0,
    minVersion: $pL2Fs,
    validRange: $iGeRj,
    outside: $2jTzt,
    gtr: $9BKgo,
    ltr: $bzGdA,
    intersects: $dXWok,
    simplifyRange: $2jHn5,
    subset: $ahkky,
    SemVer: $h3YuX,
    re: $d3Bnd.re,
    src: $d3Bnd.src,
    tokens: $d3Bnd.t,
    SEMVER_SPEC_VERSION: $j6fXN.SEMVER_SPEC_VERSION,
    compareIdentifiers: $jxFKG.compareIdentifiers,
    rcompareIdentifiers: $jxFKG.rcompareIdentifiers
};

});
parcelRequire.register("d3Bnd", function(module, exports) {

var $j6fXN = parcelRequire("j6fXN");
var $98188bc975fb07d9$require$MAX_SAFE_COMPONENT_LENGTH = $j6fXN.MAX_SAFE_COMPONENT_LENGTH;

var $kmJAR = parcelRequire("kmJAR");
exports = module.exports = {};
// The actual regexps go on exports.re
const re = exports.re = [];
const src = exports.src = [];
const t = exports.t = {};
let R = 0;
const createToken = (name, value, isGlobal)=>{
    const index = R++;
    $kmJAR(name, index, value);
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
createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${$98188bc975fb07d9$require$MAX_SAFE_COMPONENT_LENGTH}})` + `(?:\\.(\\d{1,${$98188bc975fb07d9$require$MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:\\.(\\d{1,${$98188bc975fb07d9$require$MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:$|[^\\d])`);
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
parcelRequire.register("j6fXN", function(module, exports) {
// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const $de7af5e2b1225e95$var$SEMVER_SPEC_VERSION = "2.0.0";
const $de7af5e2b1225e95$var$MAX_LENGTH = 256;
const $de7af5e2b1225e95$var$MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */ 9007199254740991;
// Max safe segment length for coercion.
const $de7af5e2b1225e95$var$MAX_SAFE_COMPONENT_LENGTH = 16;
module.exports = {
    SEMVER_SPEC_VERSION: $de7af5e2b1225e95$var$SEMVER_SPEC_VERSION,
    MAX_LENGTH: $de7af5e2b1225e95$var$MAX_LENGTH,
    MAX_SAFE_INTEGER: $de7af5e2b1225e95$var$MAX_SAFE_INTEGER,
    MAX_SAFE_COMPONENT_LENGTH: $de7af5e2b1225e95$var$MAX_SAFE_COMPONENT_LENGTH
};

});

parcelRequire.register("kmJAR", function(module, exports) {

var $gBNVf = parcelRequire("gBNVf");
const $ed393a9fcf818a21$var$debug = (typeof $gBNVf === "object" && $gBNVf.env && undefined, ()=>{});
module.exports = $ed393a9fcf818a21$var$debug;

});
parcelRequire.register("gBNVf", function(module, exports) {
// shim for using process in browser
var $c176d395fa3c7997$var$process = module.exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var $c176d395fa3c7997$var$cachedSetTimeout;
var $c176d395fa3c7997$var$cachedClearTimeout;
function $c176d395fa3c7997$var$defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
}
function $c176d395fa3c7997$var$defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
}
(function() {
    try {
        if (typeof setTimeout === "function") $c176d395fa3c7997$var$cachedSetTimeout = setTimeout;
        else $c176d395fa3c7997$var$cachedSetTimeout = $c176d395fa3c7997$var$defaultSetTimout;
    } catch (e) {
        $c176d395fa3c7997$var$cachedSetTimeout = $c176d395fa3c7997$var$defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === "function") $c176d395fa3c7997$var$cachedClearTimeout = clearTimeout;
        else $c176d395fa3c7997$var$cachedClearTimeout = $c176d395fa3c7997$var$defaultClearTimeout;
    } catch (e) {
        $c176d395fa3c7997$var$cachedClearTimeout = $c176d395fa3c7997$var$defaultClearTimeout;
    }
})();
function $c176d395fa3c7997$var$runTimeout(fun) {
    if ($c176d395fa3c7997$var$cachedSetTimeout === setTimeout) //normal enviroments in sane situations
    return setTimeout(fun, 0);
    // if setTimeout wasn't available but was latter defined
    if (($c176d395fa3c7997$var$cachedSetTimeout === $c176d395fa3c7997$var$defaultSetTimout || !$c176d395fa3c7997$var$cachedSetTimeout) && setTimeout) {
        $c176d395fa3c7997$var$cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return $c176d395fa3c7997$var$cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return $c176d395fa3c7997$var$cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return $c176d395fa3c7997$var$cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function $c176d395fa3c7997$var$runClearTimeout(marker) {
    if ($c176d395fa3c7997$var$cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
    return clearTimeout(marker);
    // if clearTimeout wasn't available but was latter defined
    if (($c176d395fa3c7997$var$cachedClearTimeout === $c176d395fa3c7997$var$defaultClearTimeout || !$c176d395fa3c7997$var$cachedClearTimeout) && clearTimeout) {
        $c176d395fa3c7997$var$cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return $c176d395fa3c7997$var$cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return $c176d395fa3c7997$var$cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return $c176d395fa3c7997$var$cachedClearTimeout.call(this, marker);
        }
    }
}
var $c176d395fa3c7997$var$queue = [];
var $c176d395fa3c7997$var$draining = false;
var $c176d395fa3c7997$var$currentQueue;
var $c176d395fa3c7997$var$queueIndex = -1;
function $c176d395fa3c7997$var$cleanUpNextTick() {
    if (!$c176d395fa3c7997$var$draining || !$c176d395fa3c7997$var$currentQueue) return;
    $c176d395fa3c7997$var$draining = false;
    if ($c176d395fa3c7997$var$currentQueue.length) $c176d395fa3c7997$var$queue = $c176d395fa3c7997$var$currentQueue.concat($c176d395fa3c7997$var$queue);
    else $c176d395fa3c7997$var$queueIndex = -1;
    if ($c176d395fa3c7997$var$queue.length) $c176d395fa3c7997$var$drainQueue();
}
function $c176d395fa3c7997$var$drainQueue() {
    if ($c176d395fa3c7997$var$draining) return;
    var timeout = $c176d395fa3c7997$var$runTimeout($c176d395fa3c7997$var$cleanUpNextTick);
    $c176d395fa3c7997$var$draining = true;
    var len = $c176d395fa3c7997$var$queue.length;
    while(len){
        $c176d395fa3c7997$var$currentQueue = $c176d395fa3c7997$var$queue;
        $c176d395fa3c7997$var$queue = [];
        while(++$c176d395fa3c7997$var$queueIndex < len)if ($c176d395fa3c7997$var$currentQueue) $c176d395fa3c7997$var$currentQueue[$c176d395fa3c7997$var$queueIndex].run();
        $c176d395fa3c7997$var$queueIndex = -1;
        len = $c176d395fa3c7997$var$queue.length;
    }
    $c176d395fa3c7997$var$currentQueue = null;
    $c176d395fa3c7997$var$draining = false;
    $c176d395fa3c7997$var$runClearTimeout(timeout);
}
$c176d395fa3c7997$var$process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    $c176d395fa3c7997$var$queue.push(new $c176d395fa3c7997$var$Item(fun, args));
    if ($c176d395fa3c7997$var$queue.length === 1 && !$c176d395fa3c7997$var$draining) $c176d395fa3c7997$var$runTimeout($c176d395fa3c7997$var$drainQueue);
};
// v8 likes predictible objects
function $c176d395fa3c7997$var$Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
$c176d395fa3c7997$var$Item.prototype.run = function() {
    this.fun.apply(null, this.array);
};
$c176d395fa3c7997$var$process.title = "browser";
$c176d395fa3c7997$var$process.browser = true;
$c176d395fa3c7997$var$process.env = {};
$c176d395fa3c7997$var$process.argv = [];
$c176d395fa3c7997$var$process.version = ""; // empty string to avoid regexp issues
$c176d395fa3c7997$var$process.versions = {};
function $c176d395fa3c7997$var$noop() {}
$c176d395fa3c7997$var$process.on = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.addListener = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.once = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.off = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.removeListener = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.removeAllListeners = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.emit = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.prependListener = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.prependOnceListener = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.listeners = function(name) {
    return [];
};
$c176d395fa3c7997$var$process.binding = function(name) {
    throw new Error("process.binding is not supported");
};
$c176d395fa3c7997$var$process.cwd = function() {
    return "/";
};
$c176d395fa3c7997$var$process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
};
$c176d395fa3c7997$var$process.umask = function() {
    return 0;
};

});



parcelRequire.register("h3YuX", function(module, exports) {

var $kmJAR = parcelRequire("kmJAR");

var $j6fXN = parcelRequire("j6fXN");
var $c6c1a52a5a42b62a$require$MAX_LENGTH = $j6fXN.MAX_LENGTH;
var $c6c1a52a5a42b62a$require$MAX_SAFE_INTEGER = $j6fXN.MAX_SAFE_INTEGER;

var $d3Bnd = parcelRequire("d3Bnd");
var $c6c1a52a5a42b62a$require$re = $d3Bnd.re;
var $c6c1a52a5a42b62a$require$t = $d3Bnd.t;

var $kNGqU = parcelRequire("kNGqU");

var $jxFKG = parcelRequire("jxFKG");
var $c6c1a52a5a42b62a$require$compareIdentifiers = $jxFKG.compareIdentifiers;
class $c6c1a52a5a42b62a$var$SemVer {
    constructor(version, options){
        options = $kNGqU(options);
        if (version instanceof $c6c1a52a5a42b62a$var$SemVer) {
            if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) return version;
            else version = version.version;
        } else if (typeof version !== "string") throw new TypeError(`Invalid Version: ${version}`);
        if (version.length > $c6c1a52a5a42b62a$require$MAX_LENGTH) throw new TypeError(`version is longer than ${$c6c1a52a5a42b62a$require$MAX_LENGTH} characters`);
        $kmJAR("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        // this isn't actually relevant for versions, but keep it so that we
        // don't run into trouble passing this.options around.
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? $c6c1a52a5a42b62a$require$re[$c6c1a52a5a42b62a$require$t.LOOSE] : $c6c1a52a5a42b62a$require$re[$c6c1a52a5a42b62a$require$t.FULL]);
        if (!m) throw new TypeError(`Invalid Version: ${version}`);
        this.raw = version;
        // these are actually numbers
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > $c6c1a52a5a42b62a$require$MAX_SAFE_INTEGER || this.major < 0) throw new TypeError("Invalid major version");
        if (this.minor > $c6c1a52a5a42b62a$require$MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError("Invalid minor version");
        if (this.patch > $c6c1a52a5a42b62a$require$MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError("Invalid patch version");
        // numberify any prerelease numeric ids
        if (!m[4]) this.prerelease = [];
        else this.prerelease = m[4].split(".").map((id)=>{
            if (/^[0-9]+$/.test(id)) {
                const num = +id;
                if (num >= 0 && num < $c6c1a52a5a42b62a$require$MAX_SAFE_INTEGER) return num;
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
        $kmJAR("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof $c6c1a52a5a42b62a$var$SemVer)) {
            if (typeof other === "string" && other === this.version) return 0;
            other = new $c6c1a52a5a42b62a$var$SemVer(other, this.options);
        }
        if (other.version === this.version) return 0;
        return this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
        if (!(other instanceof $c6c1a52a5a42b62a$var$SemVer)) other = new $c6c1a52a5a42b62a$var$SemVer(other, this.options);
        return $c6c1a52a5a42b62a$require$compareIdentifiers(this.major, other.major) || $c6c1a52a5a42b62a$require$compareIdentifiers(this.minor, other.minor) || $c6c1a52a5a42b62a$require$compareIdentifiers(this.patch, other.patch);
    }
    comparePre(other) {
        if (!(other instanceof $c6c1a52a5a42b62a$var$SemVer)) other = new $c6c1a52a5a42b62a$var$SemVer(other, this.options);
        // NOT having a prerelease is > having one
        if (this.prerelease.length && !other.prerelease.length) return -1;
        else if (!this.prerelease.length && other.prerelease.length) return 1;
        else if (!this.prerelease.length && !other.prerelease.length) return 0;
        let i = 0;
        do {
            const a = this.prerelease[i];
            const b = other.prerelease[i];
            $kmJAR("prerelease compare", i, a, b);
            if (a === undefined && b === undefined) return 0;
            else if (b === undefined) return 1;
            else if (a === undefined) return -1;
            else if (a === b) continue;
            else return $c6c1a52a5a42b62a$require$compareIdentifiers(a, b);
        }while (++i);
    }
    compareBuild(other) {
        if (!(other instanceof $c6c1a52a5a42b62a$var$SemVer)) other = new $c6c1a52a5a42b62a$var$SemVer(other, this.options);
        let i = 0;
        do {
            const a = this.build[i];
            const b = other.build[i];
            $kmJAR("prerelease compare", i, a, b);
            if (a === undefined && b === undefined) return 0;
            else if (b === undefined) return 1;
            else if (a === undefined) return -1;
            else if (a === b) continue;
            else return $c6c1a52a5a42b62a$require$compareIdentifiers(a, b);
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
                    if ($c6c1a52a5a42b62a$require$compareIdentifiers(this.prerelease[0], identifier) === 0) {
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
module.exports = $c6c1a52a5a42b62a$var$SemVer;

});
parcelRequire.register("kNGqU", function(module, exports) {
// parse out just the options we care about so we always get a consistent
// obj with keys in a consistent order.
const $f2494c8d72011fae$var$opts = [
    "includePrerelease",
    "loose",
    "rtl"
];
const $f2494c8d72011fae$var$parseOptions = (options)=>!options ? {} : typeof options !== "object" ? {
        loose: true
    } : $f2494c8d72011fae$var$opts.filter((k)=>options[k]).reduce((o, k)=>{
        o[k] = true;
        return o;
    }, {});
module.exports = $f2494c8d72011fae$var$parseOptions;

});

parcelRequire.register("jxFKG", function(module, exports) {
const $e3a17c6ed80264cb$var$numeric = /^[0-9]+$/;
const $e3a17c6ed80264cb$var$compareIdentifiers = (a, b)=>{
    const anum = $e3a17c6ed80264cb$var$numeric.test(a);
    const bnum = $e3a17c6ed80264cb$var$numeric.test(b);
    if (anum && bnum) {
        a = +a;
        b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const $e3a17c6ed80264cb$var$rcompareIdentifiers = (a, b)=>$e3a17c6ed80264cb$var$compareIdentifiers(b, a);
module.exports = {
    compareIdentifiers: $e3a17c6ed80264cb$var$compareIdentifiers,
    rcompareIdentifiers: $e3a17c6ed80264cb$var$rcompareIdentifiers
};

});


parcelRequire.register("7Y4Ig", function(module, exports) {

var $j6fXN = parcelRequire("j6fXN");
var $5cd1cae7d193499e$require$MAX_LENGTH = $j6fXN.MAX_LENGTH;

var $d3Bnd = parcelRequire("d3Bnd");
var $5cd1cae7d193499e$require$re = $d3Bnd.re;
var $5cd1cae7d193499e$require$t = $d3Bnd.t;

var $h3YuX = parcelRequire("h3YuX");

var $kNGqU = parcelRequire("kNGqU");
const $5cd1cae7d193499e$var$parse = (version, options)=>{
    options = $kNGqU(options);
    if (version instanceof $h3YuX) return version;
    if (typeof version !== "string") return null;
    if (version.length > $5cd1cae7d193499e$require$MAX_LENGTH) return null;
    const r = options.loose ? $5cd1cae7d193499e$require$re[$5cd1cae7d193499e$require$t.LOOSE] : $5cd1cae7d193499e$require$re[$5cd1cae7d193499e$require$t.FULL];
    if (!r.test(version)) return null;
    try {
        return new $h3YuX(version, options);
    } catch (er) {
        return null;
    }
};
module.exports = $5cd1cae7d193499e$var$parse;

});

parcelRequire.register("13vah", function(module, exports) {

var $7Y4Ig = parcelRequire("7Y4Ig");
const $0c4e3ef042fa58c9$var$valid = (version, options)=>{
    const v = $7Y4Ig(version, options);
    return v ? v.version : null;
};
module.exports = $0c4e3ef042fa58c9$var$valid;

});

parcelRequire.register("dAssv", function(module, exports) {

var $7Y4Ig = parcelRequire("7Y4Ig");
const $9e44b67ea1334b4a$var$clean = (version, options)=>{
    const s = $7Y4Ig(version.trim().replace(/^[=v]+/, ""), options);
    return s ? s.version : null;
};
module.exports = $9e44b67ea1334b4a$var$clean;

});

parcelRequire.register("dMhOs", function(module, exports) {

var $h3YuX = parcelRequire("h3YuX");
const $a07d934ffa8e1029$var$inc = (version, release, options, identifier)=>{
    if (typeof options === "string") {
        identifier = options;
        options = undefined;
    }
    try {
        return new $h3YuX(version instanceof $h3YuX ? version.version : version, options).inc(release, identifier).version;
    } catch (er) {
        return null;
    }
};
module.exports = $a07d934ffa8e1029$var$inc;

});

parcelRequire.register("jLuix", function(module, exports) {

var $7Y4Ig = parcelRequire("7Y4Ig");

var $6eYrb = parcelRequire("6eYrb");
const $e639e8a7c368e3a9$var$diff = (version1, version2)=>{
    if ($6eYrb(version1, version2)) return null;
    else {
        const v1 = $7Y4Ig(version1);
        const v2 = $7Y4Ig(version2);
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
module.exports = $e639e8a7c368e3a9$var$diff;

});
parcelRequire.register("6eYrb", function(module, exports) {

var $kxOzD = parcelRequire("kxOzD");
const $48b2ee7adb29c1dd$var$eq = (a, b, loose)=>$kxOzD(a, b, loose) === 0;
module.exports = $48b2ee7adb29c1dd$var$eq;

});
parcelRequire.register("kxOzD", function(module, exports) {

var $h3YuX = parcelRequire("h3YuX");
const $ef4e1e9ab7746e15$var$compare = (a, b, loose)=>new $h3YuX(a, loose).compare(new $h3YuX(b, loose));
module.exports = $ef4e1e9ab7746e15$var$compare;

});



parcelRequire.register("8hiRW", function(module, exports) {

var $h3YuX = parcelRequire("h3YuX");
const $606e8c43f1cebde0$var$major = (a, loose)=>new $h3YuX(a, loose).major;
module.exports = $606e8c43f1cebde0$var$major;

});

parcelRequire.register("bhbKN", function(module, exports) {

var $h3YuX = parcelRequire("h3YuX");
const $835a664ac8b1c7e5$var$minor = (a, loose)=>new $h3YuX(a, loose).minor;
module.exports = $835a664ac8b1c7e5$var$minor;

});

parcelRequire.register("2s6sL", function(module, exports) {

var $h3YuX = parcelRequire("h3YuX");
const $1c9335af69fa86a1$var$patch = (a, loose)=>new $h3YuX(a, loose).patch;
module.exports = $1c9335af69fa86a1$var$patch;

});

parcelRequire.register("jIKy5", function(module, exports) {

var $7Y4Ig = parcelRequire("7Y4Ig");
const $e5b63bf9a8878642$var$prerelease = (version, options)=>{
    const parsed = $7Y4Ig(version, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
};
module.exports = $e5b63bf9a8878642$var$prerelease;

});

parcelRequire.register("jLnvL", function(module, exports) {

var $kxOzD = parcelRequire("kxOzD");
const $e634a4fad0684bec$var$rcompare = (a, b, loose)=>$kxOzD(b, a, loose);
module.exports = $e634a4fad0684bec$var$rcompare;

});

parcelRequire.register("9Pww2", function(module, exports) {

var $kxOzD = parcelRequire("kxOzD");
const $728219716b21200f$var$compareLoose = (a, b)=>$kxOzD(a, b, true);
module.exports = $728219716b21200f$var$compareLoose;

});

parcelRequire.register("4rhO7", function(module, exports) {

var $h3YuX = parcelRequire("h3YuX");
const $33b77f3663f6726d$var$compareBuild = (a, b, loose)=>{
    const versionA = new $h3YuX(a, loose);
    const versionB = new $h3YuX(b, loose);
    return versionA.compare(versionB) || versionA.compareBuild(versionB);
};
module.exports = $33b77f3663f6726d$var$compareBuild;

});

parcelRequire.register("8VLkv", function(module, exports) {

var $4rhO7 = parcelRequire("4rhO7");
const $68085c4820352999$var$sort = (list, loose)=>list.sort((a, b)=>$4rhO7(a, b, loose));
module.exports = $68085c4820352999$var$sort;

});

parcelRequire.register("1o4Iy", function(module, exports) {

var $4rhO7 = parcelRequire("4rhO7");
const $102bb1256eba80d8$var$rsort = (list, loose)=>list.sort((a, b)=>$4rhO7(b, a, loose));
module.exports = $102bb1256eba80d8$var$rsort;

});

parcelRequire.register("2T4FG", function(module, exports) {

var $kxOzD = parcelRequire("kxOzD");
const $21a457702486840e$var$gt = (a, b, loose)=>$kxOzD(a, b, loose) > 0;
module.exports = $21a457702486840e$var$gt;

});

parcelRequire.register("3Ie6D", function(module, exports) {

var $kxOzD = parcelRequire("kxOzD");
const $2b406c4e4627e6e8$var$lt = (a, b, loose)=>$kxOzD(a, b, loose) < 0;
module.exports = $2b406c4e4627e6e8$var$lt;

});

parcelRequire.register("1EgrR", function(module, exports) {

var $kxOzD = parcelRequire("kxOzD");
const $1336493271b764d6$var$neq = (a, b, loose)=>$kxOzD(a, b, loose) !== 0;
module.exports = $1336493271b764d6$var$neq;

});

parcelRequire.register("i27bR", function(module, exports) {

var $kxOzD = parcelRequire("kxOzD");
const $d20dfdbcf5b5ddf2$var$gte = (a, b, loose)=>$kxOzD(a, b, loose) >= 0;
module.exports = $d20dfdbcf5b5ddf2$var$gte;

});

parcelRequire.register("17kkN", function(module, exports) {

var $kxOzD = parcelRequire("kxOzD");
const $0d0637e4965a6b79$var$lte = (a, b, loose)=>$kxOzD(a, b, loose) <= 0;
module.exports = $0d0637e4965a6b79$var$lte;

});

parcelRequire.register("hooOm", function(module, exports) {

var $6eYrb = parcelRequire("6eYrb");

var $1EgrR = parcelRequire("1EgrR");

var $2T4FG = parcelRequire("2T4FG");

var $i27bR = parcelRequire("i27bR");

var $3Ie6D = parcelRequire("3Ie6D");

var $17kkN = parcelRequire("17kkN");
const $ca97ec8e4fb665dc$var$cmp = (a, op, b, loose)=>{
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
            return $6eYrb(a, b, loose);
        case "!=":
            return $1EgrR(a, b, loose);
        case ">":
            return $2T4FG(a, b, loose);
        case ">=":
            return $i27bR(a, b, loose);
        case "<":
            return $3Ie6D(a, b, loose);
        case "<=":
            return $17kkN(a, b, loose);
        default:
            throw new TypeError(`Invalid operator: ${op}`);
    }
};
module.exports = $ca97ec8e4fb665dc$var$cmp;

});

parcelRequire.register("5VAYm", function(module, exports) {

var $h3YuX = parcelRequire("h3YuX");

var $7Y4Ig = parcelRequire("7Y4Ig");

var $d3Bnd = parcelRequire("d3Bnd");
var $450ef497687ffc03$require$re = $d3Bnd.re;
var $450ef497687ffc03$require$t = $d3Bnd.t;
const $450ef497687ffc03$var$coerce = (version, options)=>{
    if (version instanceof $h3YuX) return version;
    if (typeof version === "number") version = String(version);
    if (typeof version !== "string") return null;
    options = options || {};
    let match = null;
    if (!options.rtl) match = version.match($450ef497687ffc03$require$re[$450ef497687ffc03$require$t.COERCE]);
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
        while((next = $450ef497687ffc03$require$re[$450ef497687ffc03$require$t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)){
            if (!match || next.index + next[0].length !== match.index + match[0].length) match = next;
            $450ef497687ffc03$require$re[$450ef497687ffc03$require$t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
        }
        // leave it in a clean state
        $450ef497687ffc03$require$re[$450ef497687ffc03$require$t.COERCERTL].lastIndex = -1;
    }
    if (match === null) return null;
    return $7Y4Ig(`${match[2]}.${match[3] || "0"}.${match[4] || "0"}`, options);
};
module.exports = $450ef497687ffc03$var$coerce;

});

parcelRequire.register("Fisrn", function(module, exports) {
const $07c225c4ba46e993$var$ANY = Symbol("SemVer ANY");
// hoisted class for cyclic dependency
class $07c225c4ba46e993$var$Comparator {
    static get ANY() {
        return $07c225c4ba46e993$var$ANY;
    }
    constructor(comp, options){
        options = $kNGqU(options);
        if (comp instanceof $07c225c4ba46e993$var$Comparator) {
            if (comp.loose === !!options.loose) return comp;
            else comp = comp.value;
        }
        $kmJAR("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === $07c225c4ba46e993$var$ANY) this.value = "";
        else this.value = this.operator + this.semver.version;
        $kmJAR("comp", this);
    }
    parse(comp) {
        const r = this.options.loose ? $07c225c4ba46e993$require$re[$07c225c4ba46e993$require$t.COMPARATORLOOSE] : $07c225c4ba46e993$require$re[$07c225c4ba46e993$require$t.COMPARATOR];
        const m = comp.match(r);
        if (!m) throw new TypeError(`Invalid comparator: ${comp}`);
        this.operator = m[1] !== undefined ? m[1] : "";
        if (this.operator === "=") this.operator = "";
        // if it literally is just '>' or '' then allow anything.
        if (!m[2]) this.semver = $07c225c4ba46e993$var$ANY;
        else this.semver = new $h3YuX(m[2], this.options.loose);
    }
    toString() {
        return this.value;
    }
    test(version) {
        $kmJAR("Comparator.test", version, this.options.loose);
        if (this.semver === $07c225c4ba46e993$var$ANY || version === $07c225c4ba46e993$var$ANY) return true;
        if (typeof version === "string") try {
            version = new $h3YuX(version, this.options);
        } catch (er) {
            return false;
        }
        return $hooOm(version, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
        if (!(comp instanceof $07c225c4ba46e993$var$Comparator)) throw new TypeError("a Comparator is required");
        if (!options || typeof options !== "object") options = {
            loose: !!options,
            includePrerelease: false
        };
        if (this.operator === "") {
            if (this.value === "") return true;
            return new $j4o7G(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
            if (comp.value === "") return true;
            return new $j4o7G(this.value, options).test(comp.semver);
        }
        const sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
        const sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
        const sameSemVer = this.semver.version === comp.semver.version;
        const differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
        const oppositeDirectionsLessThan = $hooOm(this.semver, "<", comp.semver, options) && (this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<");
        const oppositeDirectionsGreaterThan = $hooOm(this.semver, ">", comp.semver, options) && (this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">");
        return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    }
}
module.exports = $07c225c4ba46e993$var$Comparator;

var $kNGqU = parcelRequire("kNGqU");

var $d3Bnd = parcelRequire("d3Bnd");
var $07c225c4ba46e993$require$re = $d3Bnd.re;
var $07c225c4ba46e993$require$t = $d3Bnd.t;

var $hooOm = parcelRequire("hooOm");

var $kmJAR = parcelRequire("kmJAR");

var $h3YuX = parcelRequire("h3YuX");

var $j4o7G = parcelRequire("j4o7G");

});
parcelRequire.register("j4o7G", function(module, exports) {
// hoisted class for cyclic dependency
class $de211a5c033cbd86$var$Range {
    constructor(range, options){
        options = $kNGqU(options);
        if (range instanceof $de211a5c033cbd86$var$Range) {
            if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) return range;
            else return new $de211a5c033cbd86$var$Range(range.raw, options);
        }
        if (range instanceof $Fisrn) {
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
            this.set = this.set.filter((c)=>!$de211a5c033cbd86$var$isNullSet(c[0]));
            if (this.set.length === 0) this.set = [
                first
            ];
            else if (this.set.length > 1) {
                // if we have any that are *, then the range is just *
                for (const c of this.set)if (c.length === 1 && $de211a5c033cbd86$var$isAny(c[0])) {
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
        const cached = $de211a5c033cbd86$var$cache.get(memoKey);
        if (cached) return cached;
        const loose = this.options.loose;
        // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
        const hr = loose ? $de211a5c033cbd86$require$re[$de211a5c033cbd86$require$t.HYPHENRANGELOOSE] : $de211a5c033cbd86$require$re[$de211a5c033cbd86$require$t.HYPHENRANGE];
        range = range.replace(hr, $de211a5c033cbd86$var$hyphenReplace(this.options.includePrerelease));
        $kmJAR("hyphen replace", range);
        // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
        range = range.replace($de211a5c033cbd86$require$re[$de211a5c033cbd86$require$t.COMPARATORTRIM], $de211a5c033cbd86$require$comparatorTrimReplace);
        $kmJAR("comparator trim", range);
        // `~ 1.2.3` => `~1.2.3`
        range = range.replace($de211a5c033cbd86$require$re[$de211a5c033cbd86$require$t.TILDETRIM], $de211a5c033cbd86$require$tildeTrimReplace);
        // `^ 1.2.3` => `^1.2.3`
        range = range.replace($de211a5c033cbd86$require$re[$de211a5c033cbd86$require$t.CARETTRIM], $de211a5c033cbd86$require$caretTrimReplace);
        // normalize spaces
        range = range.split(/\s+/).join(" ");
        // At this point, the range is completely trimmed and
        // ready to be split into comparators.
        let rangeList = range.split(" ").map((comp)=>$de211a5c033cbd86$var$parseComparator(comp, this.options)).join(" ").split(/\s+/)// >=0.0.0 is equivalent to *
        .map((comp)=>$de211a5c033cbd86$var$replaceGTE0(comp, this.options));
        if (loose) // in loose mode, throw out any that are not valid comparators
        rangeList = rangeList.filter((comp)=>{
            $kmJAR("loose invalid filter", comp, this.options);
            return !!comp.match($de211a5c033cbd86$require$re[$de211a5c033cbd86$require$t.COMPARATORLOOSE]);
        });
        $kmJAR("range list", rangeList);
        // if any comparators are the null set, then replace with JUST null set
        // if more than one comparator, remove any * comparators
        // also, don't include the same comparator more than once
        const rangeMap = new Map();
        const comparators = rangeList.map((comp)=>new $Fisrn(comp, this.options));
        for (const comp of comparators){
            if ($de211a5c033cbd86$var$isNullSet(comp)) return [
                comp
            ];
            rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) rangeMap.delete("");
        const result = [
            ...rangeMap.values()
        ];
        $de211a5c033cbd86$var$cache.set(memoKey, result);
        return result;
    }
    intersects(range, options) {
        if (!(range instanceof $de211a5c033cbd86$var$Range)) throw new TypeError("a Range is required");
        return this.set.some((thisComparators)=>{
            return $de211a5c033cbd86$var$isSatisfiable(thisComparators, options) && range.set.some((rangeComparators)=>{
                return $de211a5c033cbd86$var$isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator)=>{
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
            version = new $h3YuX(version, this.options);
        } catch (er) {
            return false;
        }
        for(let i = 0; i < this.set.length; i++){
            if ($de211a5c033cbd86$var$testSet(this.set[i], version, this.options)) return true;
        }
        return false;
    }
}
module.exports = $de211a5c033cbd86$var$Range;

var $ionzM = parcelRequire("ionzM");
const $de211a5c033cbd86$var$cache = new $ionzM({
    max: 1000
});

var $kNGqU = parcelRequire("kNGqU");

var $Fisrn = parcelRequire("Fisrn");

var $kmJAR = parcelRequire("kmJAR");

var $h3YuX = parcelRequire("h3YuX");

var $d3Bnd = parcelRequire("d3Bnd");
var $de211a5c033cbd86$require$re = $d3Bnd.re;
var $de211a5c033cbd86$require$t = $d3Bnd.t;
var $de211a5c033cbd86$require$comparatorTrimReplace = $d3Bnd.comparatorTrimReplace;
var $de211a5c033cbd86$require$tildeTrimReplace = $d3Bnd.tildeTrimReplace;
var $de211a5c033cbd86$require$caretTrimReplace = $d3Bnd.caretTrimReplace;
const $de211a5c033cbd86$var$isNullSet = (c)=>c.value === "<0.0.0-0";
const $de211a5c033cbd86$var$isAny = (c)=>c.value === "";
// take a set of comparators and determine whether there
// exists a version which can satisfy it
const $de211a5c033cbd86$var$isSatisfiable = (comparators, options)=>{
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
const $de211a5c033cbd86$var$parseComparator = (comp, options)=>{
    $kmJAR("comp", comp, options);
    comp = $de211a5c033cbd86$var$replaceCarets(comp, options);
    $kmJAR("caret", comp);
    comp = $de211a5c033cbd86$var$replaceTildes(comp, options);
    $kmJAR("tildes", comp);
    comp = $de211a5c033cbd86$var$replaceXRanges(comp, options);
    $kmJAR("xrange", comp);
    comp = $de211a5c033cbd86$var$replaceStars(comp, options);
    $kmJAR("stars", comp);
    return comp;
};
const $de211a5c033cbd86$var$isX = (id)=>!id || id.toLowerCase() === "x" || id === "*";
// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
// ~0.0.1 --> >=0.0.1 <0.1.0-0
const $de211a5c033cbd86$var$replaceTildes = (comp, options)=>comp.trim().split(/\s+/).map((c)=>{
        return $de211a5c033cbd86$var$replaceTilde(c, options);
    }).join(" ");
const $de211a5c033cbd86$var$replaceTilde = (comp, options)=>{
    const r = options.loose ? $de211a5c033cbd86$require$re[$de211a5c033cbd86$require$t.TILDELOOSE] : $de211a5c033cbd86$require$re[$de211a5c033cbd86$require$t.TILDE];
    return comp.replace(r, (_, M, m, p, pr)=>{
        $kmJAR("tilde", comp, _, M, m, p, pr);
        let ret;
        if ($de211a5c033cbd86$var$isX(M)) ret = "";
        else if ($de211a5c033cbd86$var$isX(m)) ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        else if ($de211a5c033cbd86$var$isX(p)) // ~1.2 == >=1.2.0 <1.3.0-0
        ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        else if (pr) {
            $kmJAR("replaceTilde pr", pr);
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else // ~1.2.3 == >=1.2.3 <1.3.0-0
        ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        $kmJAR("tilde return", ret);
        return ret;
    });
};
// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
// ^1.2.3 --> >=1.2.3 <2.0.0-0
// ^1.2.0 --> >=1.2.0 <2.0.0-0
// ^0.0.1 --> >=0.0.1 <0.0.2-0
// ^0.1.0 --> >=0.1.0 <0.2.0-0
const $de211a5c033cbd86$var$replaceCarets = (comp, options)=>comp.trim().split(/\s+/).map((c)=>{
        return $de211a5c033cbd86$var$replaceCaret(c, options);
    }).join(" ");
const $de211a5c033cbd86$var$replaceCaret = (comp, options)=>{
    $kmJAR("caret", comp, options);
    const r = options.loose ? $de211a5c033cbd86$require$re[$de211a5c033cbd86$require$t.CARETLOOSE] : $de211a5c033cbd86$require$re[$de211a5c033cbd86$require$t.CARET];
    const z = options.includePrerelease ? "-0" : "";
    return comp.replace(r, (_, M, m, p, pr)=>{
        $kmJAR("caret", comp, _, M, m, p, pr);
        let ret;
        if ($de211a5c033cbd86$var$isX(M)) ret = "";
        else if ($de211a5c033cbd86$var$isX(m)) ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        else if ($de211a5c033cbd86$var$isX(p)) {
            if (M === "0") ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
            else ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
        } else if (pr) {
            $kmJAR("replaceCaret pr", pr);
            if (M === "0") {
                if (m === "0") ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
                else ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            } else ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
        } else {
            $kmJAR("no pr");
            if (M === "0") {
                if (m === "0") ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
                else ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
            } else ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
        }
        $kmJAR("caret return", ret);
        return ret;
    });
};
const $de211a5c033cbd86$var$replaceXRanges = (comp, options)=>{
    $kmJAR("replaceXRanges", comp, options);
    return comp.split(/\s+/).map((c)=>{
        return $de211a5c033cbd86$var$replaceXRange(c, options);
    }).join(" ");
};
const $de211a5c033cbd86$var$replaceXRange = (comp, options)=>{
    comp = comp.trim();
    const r = options.loose ? $de211a5c033cbd86$require$re[$de211a5c033cbd86$require$t.XRANGELOOSE] : $de211a5c033cbd86$require$re[$de211a5c033cbd86$require$t.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr)=>{
        $kmJAR("xRange", comp, ret, gtlt, M, m, p, pr);
        const xM = $de211a5c033cbd86$var$isX(M);
        const xm = xM || $de211a5c033cbd86$var$isX(m);
        const xp = xm || $de211a5c033cbd86$var$isX(p);
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
        $kmJAR("xRange return", ret);
        return ret;
    });
};
// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
const $de211a5c033cbd86$var$replaceStars = (comp, options)=>{
    $kmJAR("replaceStars", comp, options);
    // Looseness is ignored here.  star is always as loose as it gets!
    return comp.trim().replace($de211a5c033cbd86$require$re[$de211a5c033cbd86$require$t.STAR], "");
};
const $de211a5c033cbd86$var$replaceGTE0 = (comp, options)=>{
    $kmJAR("replaceGTE0", comp, options);
    return comp.trim().replace($de211a5c033cbd86$require$re[options.includePrerelease ? $de211a5c033cbd86$require$t.GTE0PRE : $de211a5c033cbd86$require$t.GTE0], "");
};
// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
const $de211a5c033cbd86$var$hyphenReplace = (incPr)=>($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb)=>{
        if ($de211a5c033cbd86$var$isX(fM)) from = "";
        else if ($de211a5c033cbd86$var$isX(fm)) from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
        else if ($de211a5c033cbd86$var$isX(fp)) from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
        else if (fpr) from = `>=${from}`;
        else from = `>=${from}${incPr ? "-0" : ""}`;
        if ($de211a5c033cbd86$var$isX(tM)) to = "";
        else if ($de211a5c033cbd86$var$isX(tm)) to = `<${+tM + 1}.0.0-0`;
        else if ($de211a5c033cbd86$var$isX(tp)) to = `<${tM}.${+tm + 1}.0-0`;
        else if (tpr) to = `<=${tM}.${tm}.${tp}-${tpr}`;
        else if (incPr) to = `<${tM}.${tm}.${+tp + 1}-0`;
        else to = `<=${to}`;
        return `${from} ${to}`.trim();
    };
const $de211a5c033cbd86$var$testSet = (set, version, options)=>{
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
            $kmJAR(set[i].semver);
            if (set[i].semver === $Fisrn.ANY) continue;
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
parcelRequire.register("ionzM", function(module, exports) {
"use strict";

var $b31Md = parcelRequire("b31Md");
const $d63cc19fa31f27c0$var$MAX = Symbol("max");
const $d63cc19fa31f27c0$var$LENGTH = Symbol("length");
const $d63cc19fa31f27c0$var$LENGTH_CALCULATOR = Symbol("lengthCalculator");
const $d63cc19fa31f27c0$var$ALLOW_STALE = Symbol("allowStale");
const $d63cc19fa31f27c0$var$MAX_AGE = Symbol("maxAge");
const $d63cc19fa31f27c0$var$DISPOSE = Symbol("dispose");
const $d63cc19fa31f27c0$var$NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
const $d63cc19fa31f27c0$var$LRU_LIST = Symbol("lruList");
const $d63cc19fa31f27c0$var$CACHE = Symbol("cache");
const $d63cc19fa31f27c0$var$UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
const $d63cc19fa31f27c0$var$naiveLength = ()=>1;
// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
class $d63cc19fa31f27c0$var$LRUCache {
    constructor(options){
        if (typeof options === "number") options = {
            max: options
        };
        if (!options) options = {};
        if (options.max && (typeof options.max !== "number" || options.max < 0)) throw new TypeError("max must be a non-negative number");
        // Kind of weird to have a default max of Infinity, but oh well.
        const max = this[$d63cc19fa31f27c0$var$MAX] = options.max || Infinity;
        const lc = options.length || $d63cc19fa31f27c0$var$naiveLength;
        this[$d63cc19fa31f27c0$var$LENGTH_CALCULATOR] = typeof lc !== "function" ? $d63cc19fa31f27c0$var$naiveLength : lc;
        this[$d63cc19fa31f27c0$var$ALLOW_STALE] = options.stale || false;
        if (options.maxAge && typeof options.maxAge !== "number") throw new TypeError("maxAge must be a number");
        this[$d63cc19fa31f27c0$var$MAX_AGE] = options.maxAge || 0;
        this[$d63cc19fa31f27c0$var$DISPOSE] = options.dispose;
        this[$d63cc19fa31f27c0$var$NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
        this[$d63cc19fa31f27c0$var$UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
        this.reset();
    }
    // resize the cache when the max changes.
    set max(mL) {
        if (typeof mL !== "number" || mL < 0) throw new TypeError("max must be a non-negative number");
        this[$d63cc19fa31f27c0$var$MAX] = mL || Infinity;
        $d63cc19fa31f27c0$var$trim(this);
    }
    get max() {
        return this[$d63cc19fa31f27c0$var$MAX];
    }
    set allowStale(allowStale) {
        this[$d63cc19fa31f27c0$var$ALLOW_STALE] = !!allowStale;
    }
    get allowStale() {
        return this[$d63cc19fa31f27c0$var$ALLOW_STALE];
    }
    set maxAge(mA) {
        if (typeof mA !== "number") throw new TypeError("maxAge must be a non-negative number");
        this[$d63cc19fa31f27c0$var$MAX_AGE] = mA;
        $d63cc19fa31f27c0$var$trim(this);
    }
    get maxAge() {
        return this[$d63cc19fa31f27c0$var$MAX_AGE];
    }
    // resize the cache when the lengthCalculator changes.
    set lengthCalculator(lC) {
        if (typeof lC !== "function") lC = $d63cc19fa31f27c0$var$naiveLength;
        if (lC !== this[$d63cc19fa31f27c0$var$LENGTH_CALCULATOR]) {
            this[$d63cc19fa31f27c0$var$LENGTH_CALCULATOR] = lC;
            this[$d63cc19fa31f27c0$var$LENGTH] = 0;
            this[$d63cc19fa31f27c0$var$LRU_LIST].forEach((hit)=>{
                hit.length = this[$d63cc19fa31f27c0$var$LENGTH_CALCULATOR](hit.value, hit.key);
                this[$d63cc19fa31f27c0$var$LENGTH] += hit.length;
            });
        }
        $d63cc19fa31f27c0$var$trim(this);
    }
    get lengthCalculator() {
        return this[$d63cc19fa31f27c0$var$LENGTH_CALCULATOR];
    }
    get length() {
        return this[$d63cc19fa31f27c0$var$LENGTH];
    }
    get itemCount() {
        return this[$d63cc19fa31f27c0$var$LRU_LIST].length;
    }
    rforEach(fn, thisp) {
        thisp = thisp || this;
        for(let walker = this[$d63cc19fa31f27c0$var$LRU_LIST].tail; walker !== null;){
            const prev = walker.prev;
            $d63cc19fa31f27c0$var$forEachStep(this, fn, walker, thisp);
            walker = prev;
        }
    }
    forEach(fn, thisp) {
        thisp = thisp || this;
        for(let walker = this[$d63cc19fa31f27c0$var$LRU_LIST].head; walker !== null;){
            const next = walker.next;
            $d63cc19fa31f27c0$var$forEachStep(this, fn, walker, thisp);
            walker = next;
        }
    }
    keys() {
        return this[$d63cc19fa31f27c0$var$LRU_LIST].toArray().map((k)=>k.key);
    }
    values() {
        return this[$d63cc19fa31f27c0$var$LRU_LIST].toArray().map((k)=>k.value);
    }
    reset() {
        if (this[$d63cc19fa31f27c0$var$DISPOSE] && this[$d63cc19fa31f27c0$var$LRU_LIST] && this[$d63cc19fa31f27c0$var$LRU_LIST].length) this[$d63cc19fa31f27c0$var$LRU_LIST].forEach((hit)=>this[$d63cc19fa31f27c0$var$DISPOSE](hit.key, hit.value));
        this[$d63cc19fa31f27c0$var$CACHE] = new Map() // hash of items by key
        ;
        this[$d63cc19fa31f27c0$var$LRU_LIST] = new $b31Md() // list of items in order of use recency
        ;
        this[$d63cc19fa31f27c0$var$LENGTH] = 0 // length of items in the list
        ;
    }
    dump() {
        return this[$d63cc19fa31f27c0$var$LRU_LIST].map((hit)=>$d63cc19fa31f27c0$var$isStale(this, hit) ? false : {
                k: hit.key,
                v: hit.value,
                e: hit.now + (hit.maxAge || 0)
            }).toArray().filter((h)=>h);
    }
    dumpLru() {
        return this[$d63cc19fa31f27c0$var$LRU_LIST];
    }
    set(key, value, maxAge) {
        maxAge = maxAge || this[$d63cc19fa31f27c0$var$MAX_AGE];
        if (maxAge && typeof maxAge !== "number") throw new TypeError("maxAge must be a number");
        const now = maxAge ? Date.now() : 0;
        const len = this[$d63cc19fa31f27c0$var$LENGTH_CALCULATOR](value, key);
        if (this[$d63cc19fa31f27c0$var$CACHE].has(key)) {
            if (len > this[$d63cc19fa31f27c0$var$MAX]) {
                $d63cc19fa31f27c0$var$del(this, this[$d63cc19fa31f27c0$var$CACHE].get(key));
                return false;
            }
            const node = this[$d63cc19fa31f27c0$var$CACHE].get(key);
            const item = node.value;
            // dispose of the old one before overwriting
            // split out into 2 ifs for better coverage tracking
            if (this[$d63cc19fa31f27c0$var$DISPOSE]) {
                if (!this[$d63cc19fa31f27c0$var$NO_DISPOSE_ON_SET]) this[$d63cc19fa31f27c0$var$DISPOSE](key, item.value);
            }
            item.now = now;
            item.maxAge = maxAge;
            item.value = value;
            this[$d63cc19fa31f27c0$var$LENGTH] += len - item.length;
            item.length = len;
            this.get(key);
            $d63cc19fa31f27c0$var$trim(this);
            return true;
        }
        const hit = new $d63cc19fa31f27c0$var$Entry(key, value, len, now, maxAge);
        // oversized objects fall out of cache automatically.
        if (hit.length > this[$d63cc19fa31f27c0$var$MAX]) {
            if (this[$d63cc19fa31f27c0$var$DISPOSE]) this[$d63cc19fa31f27c0$var$DISPOSE](key, value);
            return false;
        }
        this[$d63cc19fa31f27c0$var$LENGTH] += hit.length;
        this[$d63cc19fa31f27c0$var$LRU_LIST].unshift(hit);
        this[$d63cc19fa31f27c0$var$CACHE].set(key, this[$d63cc19fa31f27c0$var$LRU_LIST].head);
        $d63cc19fa31f27c0$var$trim(this);
        return true;
    }
    has(key) {
        if (!this[$d63cc19fa31f27c0$var$CACHE].has(key)) return false;
        const hit = this[$d63cc19fa31f27c0$var$CACHE].get(key).value;
        return !$d63cc19fa31f27c0$var$isStale(this, hit);
    }
    get(key) {
        return $d63cc19fa31f27c0$var$get(this, key, true);
    }
    peek(key) {
        return $d63cc19fa31f27c0$var$get(this, key, false);
    }
    pop() {
        const node = this[$d63cc19fa31f27c0$var$LRU_LIST].tail;
        if (!node) return null;
        $d63cc19fa31f27c0$var$del(this, node);
        return node.value;
    }
    del(key) {
        $d63cc19fa31f27c0$var$del(this, this[$d63cc19fa31f27c0$var$CACHE].get(key));
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
        this[$d63cc19fa31f27c0$var$CACHE].forEach((value, key)=>$d63cc19fa31f27c0$var$get(this, key, false));
    }
}
const $d63cc19fa31f27c0$var$get = (self, key, doUse)=>{
    const node = self[$d63cc19fa31f27c0$var$CACHE].get(key);
    if (node) {
        const hit = node.value;
        if ($d63cc19fa31f27c0$var$isStale(self, hit)) {
            $d63cc19fa31f27c0$var$del(self, node);
            if (!self[$d63cc19fa31f27c0$var$ALLOW_STALE]) return undefined;
        } else if (doUse) {
            if (self[$d63cc19fa31f27c0$var$UPDATE_AGE_ON_GET]) node.value.now = Date.now();
            self[$d63cc19fa31f27c0$var$LRU_LIST].unshiftNode(node);
        }
        return hit.value;
    }
};
const $d63cc19fa31f27c0$var$isStale = (self, hit)=>{
    if (!hit || !hit.maxAge && !self[$d63cc19fa31f27c0$var$MAX_AGE]) return false;
    const diff = Date.now() - hit.now;
    return hit.maxAge ? diff > hit.maxAge : self[$d63cc19fa31f27c0$var$MAX_AGE] && diff > self[$d63cc19fa31f27c0$var$MAX_AGE];
};
const $d63cc19fa31f27c0$var$trim = (self)=>{
    if (self[$d63cc19fa31f27c0$var$LENGTH] > self[$d63cc19fa31f27c0$var$MAX]) for(let walker = self[$d63cc19fa31f27c0$var$LRU_LIST].tail; self[$d63cc19fa31f27c0$var$LENGTH] > self[$d63cc19fa31f27c0$var$MAX] && walker !== null;){
        // We know that we're about to delete this one, and also
        // what the next least recently used key will be, so just
        // go ahead and set it now.
        const prev = walker.prev;
        $d63cc19fa31f27c0$var$del(self, walker);
        walker = prev;
    }
};
const $d63cc19fa31f27c0$var$del = (self, node)=>{
    if (node) {
        const hit = node.value;
        if (self[$d63cc19fa31f27c0$var$DISPOSE]) self[$d63cc19fa31f27c0$var$DISPOSE](hit.key, hit.value);
        self[$d63cc19fa31f27c0$var$LENGTH] -= hit.length;
        self[$d63cc19fa31f27c0$var$CACHE].delete(hit.key);
        self[$d63cc19fa31f27c0$var$LRU_LIST].removeNode(node);
    }
};
class $d63cc19fa31f27c0$var$Entry {
    constructor(key, value, length, now, maxAge){
        this.key = key;
        this.value = value;
        this.length = length;
        this.now = now;
        this.maxAge = maxAge || 0;
    }
}
const $d63cc19fa31f27c0$var$forEachStep = (self, fn, node, thisp)=>{
    let hit = node.value;
    if ($d63cc19fa31f27c0$var$isStale(self, hit)) {
        $d63cc19fa31f27c0$var$del(self, node);
        if (!self[$d63cc19fa31f27c0$var$ALLOW_STALE]) hit = undefined;
    }
    if (hit) fn.call(thisp, hit.value, hit.key, self);
};
module.exports = $d63cc19fa31f27c0$var$LRUCache;

});
parcelRequire.register("b31Md", function(module, exports) {
"use strict";
module.exports = $80b15a5068515abf$var$Yallist;
$80b15a5068515abf$var$Yallist.Node = $80b15a5068515abf$var$Node;
$80b15a5068515abf$var$Yallist.create = $80b15a5068515abf$var$Yallist;
function $80b15a5068515abf$var$Yallist(list) {
    var self = this;
    if (!(self instanceof $80b15a5068515abf$var$Yallist)) self = new $80b15a5068515abf$var$Yallist();
    self.tail = null;
    self.head = null;
    self.length = 0;
    if (list && typeof list.forEach === "function") list.forEach(function(item) {
        self.push(item);
    });
    else if (arguments.length > 0) for(var i = 0, l = arguments.length; i < l; i++)self.push(arguments[i]);
    return self;
}
$80b15a5068515abf$var$Yallist.prototype.removeNode = function(node) {
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
$80b15a5068515abf$var$Yallist.prototype.unshiftNode = function(node) {
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
$80b15a5068515abf$var$Yallist.prototype.pushNode = function(node) {
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
$80b15a5068515abf$var$Yallist.prototype.push = function() {
    for(var i = 0, l = arguments.length; i < l; i++)$80b15a5068515abf$var$push(this, arguments[i]);
    return this.length;
};
$80b15a5068515abf$var$Yallist.prototype.unshift = function() {
    for(var i = 0, l = arguments.length; i < l; i++)$80b15a5068515abf$var$unshift(this, arguments[i]);
    return this.length;
};
$80b15a5068515abf$var$Yallist.prototype.pop = function() {
    if (!this.tail) return undefined;
    var res = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) this.tail.next = null;
    else this.head = null;
    this.length--;
    return res;
};
$80b15a5068515abf$var$Yallist.prototype.shift = function() {
    if (!this.head) return undefined;
    var res = this.head.value;
    this.head = this.head.next;
    if (this.head) this.head.prev = null;
    else this.tail = null;
    this.length--;
    return res;
};
$80b15a5068515abf$var$Yallist.prototype.forEach = function(fn, thisp) {
    thisp = thisp || this;
    for(var walker = this.head, i = 0; walker !== null; i++){
        fn.call(thisp, walker.value, i, this);
        walker = walker.next;
    }
};
$80b15a5068515abf$var$Yallist.prototype.forEachReverse = function(fn, thisp) {
    thisp = thisp || this;
    for(var walker = this.tail, i = this.length - 1; walker !== null; i--){
        fn.call(thisp, walker.value, i, this);
        walker = walker.prev;
    }
};
$80b15a5068515abf$var$Yallist.prototype.get = function(n) {
    for(var i = 0, walker = this.head; walker !== null && i < n; i++)// abort out of the list early if we hit a cycle
    walker = walker.next;
    if (i === n && walker !== null) return walker.value;
};
$80b15a5068515abf$var$Yallist.prototype.getReverse = function(n) {
    for(var i = 0, walker = this.tail; walker !== null && i < n; i++)// abort out of the list early if we hit a cycle
    walker = walker.prev;
    if (i === n && walker !== null) return walker.value;
};
$80b15a5068515abf$var$Yallist.prototype.map = function(fn, thisp) {
    thisp = thisp || this;
    var res = new $80b15a5068515abf$var$Yallist();
    for(var walker = this.head; walker !== null;){
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.next;
    }
    return res;
};
$80b15a5068515abf$var$Yallist.prototype.mapReverse = function(fn, thisp) {
    thisp = thisp || this;
    var res = new $80b15a5068515abf$var$Yallist();
    for(var walker = this.tail; walker !== null;){
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.prev;
    }
    return res;
};
$80b15a5068515abf$var$Yallist.prototype.reduce = function(fn, initial) {
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
$80b15a5068515abf$var$Yallist.prototype.reduceReverse = function(fn, initial) {
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
$80b15a5068515abf$var$Yallist.prototype.toArray = function() {
    var arr = new Array(this.length);
    for(var i = 0, walker = this.head; walker !== null; i++){
        arr[i] = walker.value;
        walker = walker.next;
    }
    return arr;
};
$80b15a5068515abf$var$Yallist.prototype.toArrayReverse = function() {
    var arr = new Array(this.length);
    for(var i = 0, walker = this.tail; walker !== null; i++){
        arr[i] = walker.value;
        walker = walker.prev;
    }
    return arr;
};
$80b15a5068515abf$var$Yallist.prototype.slice = function(from, to) {
    to = to || this.length;
    if (to < 0) to += this.length;
    from = from || 0;
    if (from < 0) from += this.length;
    var ret = new $80b15a5068515abf$var$Yallist();
    if (to < from || to < 0) return ret;
    if (from < 0) from = 0;
    if (to > this.length) to = this.length;
    for(var i = 0, walker = this.head; walker !== null && i < from; i++)walker = walker.next;
    for(; walker !== null && i < to; i++, walker = walker.next)ret.push(walker.value);
    return ret;
};
$80b15a5068515abf$var$Yallist.prototype.sliceReverse = function(from, to) {
    to = to || this.length;
    if (to < 0) to += this.length;
    from = from || 0;
    if (from < 0) from += this.length;
    var ret = new $80b15a5068515abf$var$Yallist();
    if (to < from || to < 0) return ret;
    if (from < 0) from = 0;
    if (to > this.length) to = this.length;
    for(var i = this.length, walker = this.tail; walker !== null && i > to; i--)walker = walker.prev;
    for(; walker !== null && i > from; i--, walker = walker.prev)ret.push(walker.value);
    return ret;
};
$80b15a5068515abf$var$Yallist.prototype.splice = function(start, deleteCount, ...nodes) {
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
    for(var i = 0; i < nodes.length; i++)walker = $80b15a5068515abf$var$insert(this, walker, nodes[i]);
    return ret;
};
$80b15a5068515abf$var$Yallist.prototype.reverse = function() {
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
function $80b15a5068515abf$var$insert(self, node, value) {
    var inserted = node === self.head ? new $80b15a5068515abf$var$Node(value, null, node, self) : new $80b15a5068515abf$var$Node(value, node, node.next, self);
    if (inserted.next === null) self.tail = inserted;
    if (inserted.prev === null) self.head = inserted;
    self.length++;
    return inserted;
}
function $80b15a5068515abf$var$push(self, item) {
    self.tail = new $80b15a5068515abf$var$Node(item, self.tail, null, self);
    if (!self.head) self.head = self.tail;
    self.length++;
}
function $80b15a5068515abf$var$unshift(self, item) {
    self.head = new $80b15a5068515abf$var$Node(item, null, self.head, self);
    if (!self.tail) self.tail = self.head;
    self.length++;
}
function $80b15a5068515abf$var$Node(value, prev, next, list) {
    if (!(this instanceof $80b15a5068515abf$var$Node)) return new $80b15a5068515abf$var$Node(value, prev, next, list);
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
    (parcelRequire("3pGgm"))($80b15a5068515abf$var$Yallist);
} catch (er) {}

});
parcelRequire.register("3pGgm", function(module, exports) {
"use strict";
module.exports = function(Yallist) {
    Yallist.prototype[Symbol.iterator] = function*() {
        for(let walker = this.head; walker; walker = walker.next)yield walker.value;
    };
};

});





parcelRequire.register("bRx6I", function(module, exports) {

var $j4o7G = parcelRequire("j4o7G");
const $8a2e535aab43b20c$var$satisfies = (version, range, options)=>{
    try {
        range = new $j4o7G(range, options);
    } catch (er) {
        return false;
    }
    return range.test(version);
};
module.exports = $8a2e535aab43b20c$var$satisfies;

});

parcelRequire.register("6rxxJ", function(module, exports) {

var $j4o7G = parcelRequire("j4o7G");
// Mostly just for testing and legacy API reasons
const $4b0f48a03108064e$var$toComparators = (range, options)=>new $j4o7G(range, options).set.map((comp)=>comp.map((c)=>c.value).join(" ").trim().split(" "));
module.exports = $4b0f48a03108064e$var$toComparators;

});

parcelRequire.register("f4OpN", function(module, exports) {

var $h3YuX = parcelRequire("h3YuX");

var $j4o7G = parcelRequire("j4o7G");
const $af9e56208b24cf7b$var$maxSatisfying = (versions, range, options)=>{
    let max = null;
    let maxSV = null;
    let rangeObj = null;
    try {
        rangeObj = new $j4o7G(range, options);
    } catch (er) {
        return null;
    }
    versions.forEach((v)=>{
        if (rangeObj.test(v)) // satisfies(v, range, options)
        {
            if (!max || maxSV.compare(v) === -1) {
                // compare(max, v, true)
                max = v;
                maxSV = new $h3YuX(max, options);
            }
        }
    });
    return max;
};
module.exports = $af9e56208b24cf7b$var$maxSatisfying;

});

parcelRequire.register("rmvC0", function(module, exports) {

var $h3YuX = parcelRequire("h3YuX");

var $j4o7G = parcelRequire("j4o7G");
const $0523fb8640d0da8e$var$minSatisfying = (versions, range, options)=>{
    let min = null;
    let minSV = null;
    let rangeObj = null;
    try {
        rangeObj = new $j4o7G(range, options);
    } catch (er) {
        return null;
    }
    versions.forEach((v)=>{
        if (rangeObj.test(v)) // satisfies(v, range, options)
        {
            if (!min || minSV.compare(v) === 1) {
                // compare(min, v, true)
                min = v;
                minSV = new $h3YuX(min, options);
            }
        }
    });
    return min;
};
module.exports = $0523fb8640d0da8e$var$minSatisfying;

});

parcelRequire.register("pL2Fs", function(module, exports) {

var $h3YuX = parcelRequire("h3YuX");

var $j4o7G = parcelRequire("j4o7G");

var $2T4FG = parcelRequire("2T4FG");
const $04d6d37b0706edf3$var$minVersion = (range, loose)=>{
    range = new $j4o7G(range, loose);
    let minver = new $h3YuX("0.0.0");
    if (range.test(minver)) return minver;
    minver = new $h3YuX("0.0.0-0");
    if (range.test(minver)) return minver;
    minver = null;
    for(let i = 0; i < range.set.length; ++i){
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator)=>{
            // Clone to avoid manipulating the comparator's semver object.
            const compver = new $h3YuX(comparator.semver.version);
            switch(comparator.operator){
                case ">":
                    if (compver.prerelease.length === 0) compver.patch++;
                    else compver.prerelease.push(0);
                    compver.raw = compver.format();
                /* fallthrough */ case "":
                case ">=":
                    if (!setMin || $2T4FG(compver, setMin)) setMin = compver;
                    break;
                case "<":
                case "<=":
                    break;
                /* istanbul ignore next */ default:
                    throw new Error(`Unexpected operation: ${comparator.operator}`);
            }
        });
        if (setMin && (!minver || $2T4FG(minver, setMin))) minver = setMin;
    }
    if (minver && range.test(minver)) return minver;
    return null;
};
module.exports = $04d6d37b0706edf3$var$minVersion;

});

parcelRequire.register("iGeRj", function(module, exports) {

var $j4o7G = parcelRequire("j4o7G");
const $d997ace9d9a7e9bd$var$validRange = (range, options)=>{
    try {
        // Return '*' instead of '' so that truthiness works.
        // This will throw if it's invalid anyway
        return new $j4o7G(range, options).range || "*";
    } catch (er) {
        return null;
    }
};
module.exports = $d997ace9d9a7e9bd$var$validRange;

});

parcelRequire.register("2jTzt", function(module, exports) {

var $h3YuX = parcelRequire("h3YuX");

var $Fisrn = parcelRequire("Fisrn");
const { ANY: $1b08766696918cbe$var$ANY  } = $Fisrn;

var $j4o7G = parcelRequire("j4o7G");

var $bRx6I = parcelRequire("bRx6I");

var $2T4FG = parcelRequire("2T4FG");

var $3Ie6D = parcelRequire("3Ie6D");

var $17kkN = parcelRequire("17kkN");

var $i27bR = parcelRequire("i27bR");
const $1b08766696918cbe$var$outside = (version, range, hilo, options)=>{
    version = new $h3YuX(version, options);
    range = new $j4o7G(range, options);
    let gtfn, ltefn, ltfn, comp, ecomp;
    switch(hilo){
        case ">":
            gtfn = $2T4FG;
            ltefn = $17kkN;
            ltfn = $3Ie6D;
            comp = ">";
            ecomp = ">=";
            break;
        case "<":
            gtfn = $3Ie6D;
            ltefn = $i27bR;
            ltfn = $2T4FG;
            comp = "<";
            ecomp = "<=";
            break;
        default:
            throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    // If it satisfies the range it is not outside
    if ($bRx6I(version, range, options)) return false;
    // From now on, variable terms are as if we're in "gtr" mode.
    // but note that everything is flipped for the "ltr" function.
    for(let i = 0; i < range.set.length; ++i){
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator)=>{
            if (comparator.semver === $1b08766696918cbe$var$ANY) comparator = new $Fisrn(">=0.0.0");
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
module.exports = $1b08766696918cbe$var$outside;

});

parcelRequire.register("9BKgo", function(module, exports) {
// Determine if version is greater than all the versions possible in the range.

var $2jTzt = parcelRequire("2jTzt");
const $6feb74b4480815a1$var$gtr = (version, range, options)=>$2jTzt(version, range, ">", options);
module.exports = $6feb74b4480815a1$var$gtr;

});

parcelRequire.register("bzGdA", function(module, exports) {

var $2jTzt = parcelRequire("2jTzt");
// Determine if version is less than all the versions possible in the range
const $86d3b63ec80c8896$var$ltr = (version, range, options)=>$2jTzt(version, range, "<", options);
module.exports = $86d3b63ec80c8896$var$ltr;

});

parcelRequire.register("dXWok", function(module, exports) {

var $j4o7G = parcelRequire("j4o7G");
const $a2ae1458e0c664a8$var$intersects = (r1, r2, options)=>{
    r1 = new $j4o7G(r1, options);
    r2 = new $j4o7G(r2, options);
    return r1.intersects(r2);
};
module.exports = $a2ae1458e0c664a8$var$intersects;

});

parcelRequire.register("2jHn5", function(module, exports) {
// given a set of versions and a range, create a "simplified" range
// that includes the same versions that the original range does
// If the original range is shorter than the simplified one, return that.

var $bRx6I = parcelRequire("bRx6I");

var $kxOzD = parcelRequire("kxOzD");
module.exports = (versions, range, options)=>{
    const set = [];
    let first = null;
    let prev = null;
    const v = versions.sort((a, b)=>$kxOzD(a, b, options));
    for (const version of v){
        const included = $bRx6I(version, range, options);
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

parcelRequire.register("ahkky", function(module, exports) {

var $j4o7G = parcelRequire("j4o7G");

var $Fisrn = parcelRequire("Fisrn");
const { ANY: $77bb431c5717e7a3$var$ANY  } = $Fisrn;

var $bRx6I = parcelRequire("bRx6I");

var $kxOzD = parcelRequire("kxOzD");
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
const $77bb431c5717e7a3$var$subset = (sub, dom, options = {})=>{
    if (sub === dom) return true;
    sub = new $j4o7G(sub, options);
    dom = new $j4o7G(dom, options);
    let sawNonNull = false;
    OUTER: for (const simpleSub of sub.set){
        for (const simpleDom of dom.set){
            const isSub = $77bb431c5717e7a3$var$simpleSubset(simpleSub, simpleDom, options);
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
const $77bb431c5717e7a3$var$simpleSubset = (sub, dom, options)=>{
    if (sub === dom) return true;
    if (sub.length === 1 && sub[0].semver === $77bb431c5717e7a3$var$ANY) {
        if (dom.length === 1 && dom[0].semver === $77bb431c5717e7a3$var$ANY) return true;
        else if (options.includePrerelease) sub = [
            new $Fisrn(">=0.0.0-0")
        ];
        else sub = [
            new $Fisrn(">=0.0.0")
        ];
    }
    if (dom.length === 1 && dom[0].semver === $77bb431c5717e7a3$var$ANY) {
        if (options.includePrerelease) return true;
        else dom = [
            new $Fisrn(">=0.0.0")
        ];
    }
    const eqSet = new Set();
    let gt, lt;
    for (const c of sub){
        if (c.operator === ">" || c.operator === ">=") gt = $77bb431c5717e7a3$var$higherGT(gt, c, options);
        else if (c.operator === "<" || c.operator === "<=") lt = $77bb431c5717e7a3$var$lowerLT(lt, c, options);
        else eqSet.add(c.semver);
    }
    if (eqSet.size > 1) return null;
    let gtltComp;
    if (gt && lt) {
        gtltComp = $kxOzD(gt.semver, lt.semver, options);
        if (gtltComp > 0) return null;
        else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) return null;
    }
    // will iterate one or zero times
    for (const eq of eqSet){
        if (gt && !$bRx6I(eq, String(gt), options)) return null;
        if (lt && !$bRx6I(eq, String(lt), options)) return null;
        for (const c of dom){
            if (!$bRx6I(eq, String(c), options)) return false;
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
    for (const c of dom){
        hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
        hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
        if (gt) {
            if (needDomGTPre) {
                if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) needDomGTPre = false;
            }
            if (c.operator === ">" || c.operator === ">=") {
                higher = $77bb431c5717e7a3$var$higherGT(gt, c, options);
                if (higher === c && higher !== gt) return false;
            } else if (gt.operator === ">=" && !$bRx6I(gt.semver, String(c), options)) return false;
        }
        if (lt) {
            if (needDomLTPre) {
                if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) needDomLTPre = false;
            }
            if (c.operator === "<" || c.operator === "<=") {
                lower = $77bb431c5717e7a3$var$lowerLT(lt, c, options);
                if (lower === c && lower !== lt) return false;
            } else if (lt.operator === "<=" && !$bRx6I(lt.semver, String(c), options)) return false;
        }
        if (!c.operator && (lt || gt) && gtltComp !== 0) return false;
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
const $77bb431c5717e7a3$var$higherGT = (a, b, options)=>{
    if (!a) return b;
    const comp = $kxOzD(a.semver, b.semver, options);
    return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
};
// <=1.2.3 is higher than <1.2.3
const $77bb431c5717e7a3$var$lowerLT = (a, b, options)=>{
    if (!a) return b;
    const comp = $kxOzD(a.semver, b.semver, options);
    return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
};
module.exports = $77bb431c5717e7a3$var$subset;

});



parcelRequire.register("sYT9M", function(module, exports) {

$parcel$export(module.exports, "log", () => $0571d8da40562a91$export$bef1f36f5486a6a3);
var $0571d8da40562a91$var$id = 0;
var $0571d8da40562a91$var$subscribers = [];
var $0571d8da40562a91$export$bef1f36f5486a6a3 = function(type, message, data) {
    var obj = {
        type: type,
        id: String(++$0571d8da40562a91$var$id),
        date: new Date()
    };
    if (message) obj.message = message;
    if (data) obj.data = data;
    $0571d8da40562a91$var$dispatch(obj);
};
var $0571d8da40562a91$export$63174c828edd6ff8 = function(cb) {
    $0571d8da40562a91$var$subscribers.push(cb);
    return function() {
        var i = $0571d8da40562a91$var$subscribers.indexOf(cb);
        if (i !== -1) {
            // equivalent of subscribers.splice(i, 1) // https://twitter.com/Rich_Harris/status/1125850391155965952
            $0571d8da40562a91$var$subscribers[i] = $0571d8da40562a91$var$subscribers[$0571d8da40562a91$var$subscribers.length - 1];
            $0571d8da40562a91$var$subscribers.pop();
        }
    };
};
function $0571d8da40562a91$var$dispatch(log) {
    for(var i = 0; i < $0571d8da40562a91$var$subscribers.length; i++)try {
        $0571d8da40562a91$var$subscribers[i](log);
    } catch (e) {
        console.error(e);
    }
}
if (typeof window !== "undefined") window.__ledgerLogsListen = $0571d8da40562a91$export$63174c828edd6ff8;

});

parcelRequire.register("8okqZ", function(module, exports) {

$parcel$export(module.exports, "requestLedgerDevice", () => $61c06a760a112f81$export$5e45f905eefbea79, (v) => $61c06a760a112f81$export$5e45f905eefbea79 = v);
$parcel$export(module.exports, "getLedgerDevices", () => $61c06a760a112f81$export$36755904a34d5197, (v) => $61c06a760a112f81$export$36755904a34d5197 = v);
$parcel$export(module.exports, "getFirstLedgerDevice", () => $61c06a760a112f81$export$527d8164321a6e6c, (v) => $61c06a760a112f81$export$527d8164321a6e6c = v);
$parcel$export(module.exports, "isSupported", () => $61c06a760a112f81$export$48c17662a6902497, (v) => $61c06a760a112f81$export$48c17662a6902497 = v);

var $6x0Az = parcelRequire("6x0Az");
var $61c06a760a112f81$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
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
var $61c06a760a112f81$var$__generator = undefined && undefined.__generator || function(thisArg, body) {
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
var $61c06a760a112f81$var$ledgerDevices = [
    {
        vendorId: (0, $6x0Az.ledgerUSBVendorId)
    }
];
function $61c06a760a112f81$export$5e45f905eefbea79() {
    return $61c06a760a112f81$var$__awaiter(this, void 0, void 0, function() {
        var device;
        return $61c06a760a112f81$var$__generator(this, function(_a) {
            switch(_a.label){
                case 0:
                    return [
                        4 /*yield*/ ,
                        navigator.usb.requestDevice({
                            filters: $61c06a760a112f81$var$ledgerDevices
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
function $61c06a760a112f81$export$36755904a34d5197() {
    return $61c06a760a112f81$var$__awaiter(this, void 0, void 0, function() {
        var devices;
        return $61c06a760a112f81$var$__generator(this, function(_a) {
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
                            return d.vendorId === (0, $6x0Az.ledgerUSBVendorId);
                        })
                    ];
            }
        });
    });
}
function $61c06a760a112f81$export$527d8164321a6e6c() {
    return $61c06a760a112f81$var$__awaiter(this, void 0, void 0, function() {
        var existingDevices;
        return $61c06a760a112f81$var$__generator(this, function(_a) {
            switch(_a.label){
                case 0:
                    return [
                        4 /*yield*/ ,
                        $61c06a760a112f81$export$36755904a34d5197()
                    ];
                case 1:
                    existingDevices = _a.sent();
                    if (existingDevices.length > 0) return [
                        2 /*return*/ ,
                        existingDevices[0]
                    ];
                    return [
                        2 /*return*/ ,
                        $61c06a760a112f81$export$5e45f905eefbea79()
                    ];
            }
        });
    });
}
var $61c06a760a112f81$export$48c17662a6902497 = function() {
    return Promise.resolve(!!navigator && !!navigator.usb && typeof navigator.usb.getDevices === "function");
};

});


// Use strict
"use strict";
// Classes
// Transport web Bluetooth
class $1ebc71fb92a3846b$var$TransportWebBluetooth {
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
            "productName": $1ebc71fb92a3846b$var$TransportWebBluetooth.PRODUCT_NAME
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
                return $1ebc71fb92a3846b$var$TransportWebBluetooth.sendRequest(self.connection, self.writeCharacteristic, self.notifyCharacteristic, $1ebc71fb92a3846b$var$TransportWebBluetooth.APDU_COMMAND_TAG, apdu, self.mtu).then(function(response) {
                    // Check if connection is connected
                    if (self.connection["connected"] === true) {
                        // Check if response contains a status
                        if (response["length"] >= $1ebc71fb92a3846b$var$TransportWebBluetooth.APDU_STATUS_LENGTH) {
                            // Get status
                            var status = response[response["length"] - 1] | response[response["length"] - 2] << $1ebc71fb92a3846b$var$TransportWebBluetooth.BITS_IN_A_BYTE;
                            // Check if status is success
                            if (status === $1ebc71fb92a3846b$var$TransportWebBluetooth.APDU_SUCCESS_STATUS) // Resolve response
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
    static request(device = $1ebc71fb92a3846b$var$TransportWebBluetooth.NO_DEVICE) {
        // Return promise
        return new Promise(function(resolve, reject) {
            // Get device
            var getDevice = function() {
                // Return promise
                return new Promise(function(resolve, reject) {
                    // Check if no device was provided
                    if (device === $1ebc71fb92a3846b$var$TransportWebBluetooth.NO_DEVICE) // Return getting device
                    return navigator["bluetooth"].requestDevice({
                        // Filters
                        "filters": [
                            {
                                // Services
                                "services": [
                                    // Service UUID
                                    $1ebc71fb92a3846b$var$TransportWebBluetooth.SERVICE_UUID
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
                    resolve(device);
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
                            reject();
                        }, $1ebc71fb92a3846b$var$TransportWebBluetooth.CONNECT_TIMEOUT_DURATION_MILLISECONDS);
                        // Return getting connection's service
                        return connection.getPrimaryService($1ebc71fb92a3846b$var$TransportWebBluetooth.SERVICE_UUID).then(function(service) {
                            // Check if a timeout didn't occur
                            if (timeoutOccurred === false) {
                                // Clear connect timeout
                                clearTimeout(connectTimeout);
                                // Check if connection is connected
                                if (connection["connected"] === true) // Return getting service's notify characteristic
                                return service.getCharacteristic($1ebc71fb92a3846b$var$TransportWebBluetooth.NOTIFY_CHARACTERISTIC_UUID).then(function(notifyCharacteristic) {
                                    // Check if connection is connected
                                    if (connection["connected"] === true) // Return getting service's write characteristic
                                    return service.getCharacteristic($1ebc71fb92a3846b$var$TransportWebBluetooth.WRITE_CHARACTERISTIC_UUID).then(function(writeCharacteristic) {
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
                                                return $1ebc71fb92a3846b$var$TransportWebBluetooth.sendRequest(connection, writeCharacteristic, notifyCharacteristic, $1ebc71fb92a3846b$var$TransportWebBluetooth.GET_MTU_COMMAND_TAG).then(function(response) {
                                                    // Check if connection is connected
                                                    if (connection["connected"] === true) {
                                                        // Check if response is valid
                                                        if (response["length"] === 1) {
                                                            // Get MTU from response
                                                            var mtu = Math.min(response[0], $1ebc71fb92a3846b$var$TransportWebBluetooth.MAXIMUM_MTU);
                                                            // Check if MTU is valid
                                                            if (mtu >= $1ebc71fb92a3846b$var$TransportWebBluetooth.MINIMUM_MTU) {
                                                                // Create transport
                                                                var transport = new $1ebc71fb92a3846b$var$TransportWebBluetooth(connection, writeCharacteristic, notifyCharacteristic, mtu);
                                                                // Resolve transport
                                                                resolve(transport);
                                                            } else {
                                                                // Disconnect connection
                                                                connection.disconnect();
                                                                // Reject
                                                                reject();
                                                            }
                                                        } else {
                                                            // Disconnect connection
                                                            connection.disconnect();
                                                            // Reject
                                                            reject();
                                                        }
                                                    } else // Reject
                                                    reject();
                                                // Catch errors
                                                }).catch(function(error) {
                                                    // Check if connection is connected
                                                    if (connection["connected"] === true) // Disconnect connection
                                                    connection.disconnect();
                                                    // Reject error
                                                    reject(error);
                                                });
                                            } else // Return stopping notifications and catch errors
                                            return notifyCharacteristic.stopNotifications().catch(function(error) {
                                            // Finally
                                            }).finally(function() {
                                                // Reject
                                                reject();
                                            });
                                        // Catch errors
                                        }).catch(function(error) {
                                            // Check if connection is connected
                                            if (connection["connected"] === true) // Disconnect connection
                                            connection.disconnect();
                                            // Reject error
                                            reject(error);
                                        });
                                        else // Reject
                                        reject();
                                    // Catch errors
                                    }).catch(function(error) {
                                        // Check if connection is connected
                                        if (connection["connected"] === true) // Disconnect connection
                                        connection.disconnect();
                                        // Reject error
                                        reject(error);
                                    });
                                    else // Reject
                                    reject();
                                // Catch errors
                                }).catch(function(error) {
                                    // Check if connection is connected
                                    if (connection["connected"] === true) // Disconnect connection
                                    connection.disconnect();
                                    // Reject error
                                    reject(error);
                                });
                                else // Reject
                                reject();
                            }
                        // Catch errors
                        }).catch(function(error) {
                            // Check if a timeout didn't occur
                            if (timeoutOccurred === false) {
                                // Clear connect timeout
                                clearTimeout(connectTimeout);
                                // Check if connection is connected
                                if (connection["connected"] === true) // Disconnect connection
                                connection.disconnect();
                                // Check if disconnected error occurred
                                if (error["code"] === new DOMException("", "NetworkError")["code"]) // Return requesting transport
                                return $1ebc71fb92a3846b$var$TransportWebBluetooth.request(device).then(function(transport) {
                                    // Resolve transport
                                    resolve(transport);
                                // Catch errors
                                }).catch(function(error) {
                                    // Reject error
                                    reject(error);
                                });
                                else // Reject error
                                reject(error);
                            }
                        });
                    } else // Reject
                    reject();
                // Catch errors
                }).catch(function(error) {
                    // Check if device's connection is connected
                    if (device["gatt"]["connected"] === true) // Disconnect device's connection
                    device["gatt"].disconnect();
                    // Reject error
                    reject(error);
                });
            // Catch errors
            }).catch(function(error) {
                // Reject error
                reject(error);
            });
        });
    }
    // Private
    // Create packets
    static createPackets(commandTag, payload = $1ebc71fb92a3846b$var$TransportWebBluetooth.NO_PAYLOAD, mtu = $1ebc71fb92a3846b$var$TransportWebBluetooth.DEFAULT_MTU) {
        // Initialize packets
        var packets = [];
        // Check if payload doesn't exist
        if (payload === $1ebc71fb92a3846b$var$TransportWebBluetooth.NO_PAYLOAD) // Set payload to an empty array
        payload = new Uint8Array([]);
        // Initialize payload offset
        var payloadOffset = 0;
        // Go through all packets required to send the payload
        for(var i = 0; i === 0 || payloadOffset !== payload["length"]; ++i){
            // Check if at the first packet
            if (i === 0) // Create header
            var header = new Uint8Array([
                commandTag,
                i >> $1ebc71fb92a3846b$var$TransportWebBluetooth.BITS_IN_A_BYTE,
                i,
                payload["length"] >> $1ebc71fb92a3846b$var$TransportWebBluetooth.BITS_IN_A_BYTE,
                payload["length"]
            ]);
            else // Create header
            var header = new Uint8Array([
                commandTag,
                i >> $1ebc71fb92a3846b$var$TransportWebBluetooth.BITS_IN_A_BYTE,
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
    static sendRequest(connection, writeCharacteristic, notifyCharacteristic, commandTag, payload = $1ebc71fb92a3846b$var$TransportWebBluetooth.NO_PAYLOAD, mtu = $1ebc71fb92a3846b$var$TransportWebBluetooth.DEFAULT_MTU) {
        // Return promise
        return new Promise(function(resolve, reject) {
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
                    var tag = responsePacket[$1ebc71fb92a3846b$var$TransportWebBluetooth.COMMAND_TAG_INDEX];
                    // Check if tag is invalid
                    if (tag !== commandTag) {
                        // Remove GATT server disconnected event
                        connection["device"].removeEventListener("gattserverdisconnected", disconnectedHandler);
                        // Remove notify characteristic value changed event
                        notifyCharacteristic.removeEventListener("characteristicvaluechanged", processResponsePacket);
                        // Check if connection is connected
                        if (connection["connected"] === true) // Reject
                        reject();
                        else // Reject error
                        reject(new DOMException("", "NetworkError"));
                    } else {
                        // Get sequence index
                        var sequenceIndex = responsePacket[$1ebc71fb92a3846b$var$TransportWebBluetooth.SEQUENCE_INDEX_INDEX] << $1ebc71fb92a3846b$var$TransportWebBluetooth.BITS_IN_A_BYTE | responsePacket[$1ebc71fb92a3846b$var$TransportWebBluetooth.SEQUENCE_INDEX_INDEX + 1];
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
                                reject();
                                else // Reject error
                                reject(new DOMException("", "NetworkError"));
                                // Return
                                return;
                            }
                            // Clear first response packet
                            firstResponsePacket = false;
                            // Get response size
                            responseSize = responsePacket[$1ebc71fb92a3846b$var$TransportWebBluetooth.PAYLOAD_SIZE_INDEX] << $1ebc71fb92a3846b$var$TransportWebBluetooth.BITS_IN_A_BYTE | responsePacket[$1ebc71fb92a3846b$var$TransportWebBluetooth.PAYLOAD_SIZE_INDEX + 1];
                            // Get response part
                            var responsePart = responsePacket.subarray($1ebc71fb92a3846b$var$TransportWebBluetooth.PAYLOAD_INDEX);
                        } else {
                            // Check if sequence index is invalid
                            if (sequenceIndex !== lastSequenceIndex + 1) {
                                // Remove GATT server disconnected event
                                connection["device"].removeEventListener("gattserverdisconnected", disconnectedHandler);
                                // Remove notify characteristic value changed event
                                notifyCharacteristic.removeEventListener("characteristicvaluechanged", processResponsePacket);
                                // Check if connection is connected
                                if (connection["connected"] === true) // Reject
                                reject();
                                else // Reject error
                                reject(new DOMException("", "NetworkError"));
                                // Return
                                return;
                            }
                            // Get response part
                            var responsePart = responsePacket.subarray($1ebc71fb92a3846b$var$TransportWebBluetooth.PAYLOAD_INDEX - 2);
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
                            resolve(response);
                            else // Reject error
                            reject(new DOMException("", "NetworkError"));
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
                    reject(new DOMException("", "NetworkError"));
                };
                // Notify characteristic value changed event
                notifyCharacteristic.addEventListener("characteristicvaluechanged", processResponsePacket);
                // Device GATT server disconnected event
                connection["device"].addEventListener("gattserverdisconnected", disconnectedHandler);
                // Get packets
                var packets = $1ebc71fb92a3846b$var$TransportWebBluetooth.createPackets(commandTag, payload, mtu);
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
                    reject(error);
                    else // Reject error
                    reject(new DOMException("", "NetworkError"));
                });
            } else // Reject error
            reject(new DOMException("", "NetworkError"));
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
        return $1ebc71fb92a3846b$var$TransportWebBluetooth.COMMAND_TAG_INDEX + 1;
    }
    // Payload size index
    static get PAYLOAD_SIZE_INDEX() {
        // Return payload size index
        return $1ebc71fb92a3846b$var$TransportWebBluetooth.SEQUENCE_INDEX_INDEX + 2;
    }
    // Payload index
    static get PAYLOAD_INDEX() {
        // Return payload index
        return $1ebc71fb92a3846b$var$TransportWebBluetooth.PAYLOAD_SIZE_INDEX + 2;
    }
}

// Main function
// Set window's transport WebUSB
window["TransportWebUSB"] = (parcelRequire("7Saeh")).default;

// Set window's Buffer
window["Buffer"] = (parcelRequire("fQPNj")).Buffer;
// Set window's transport web Bluetooth
window["TransportWebBluetooth"] = $1ebc71fb92a3846b$var$TransportWebBluetooth;

})();
