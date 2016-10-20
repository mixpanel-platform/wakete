/*
 Tween JS
 https://github.com/sole/Tween.js
 MinPubSub
 a micro publish/subscribe messaging framework
 @see https://github.com/daniellmb/MinPubSub
 @author Daniel Lamb <daniellmb.com>

 Released under the MIT License
 {@link http://www.opensource.org/licenses/mit-license.php|MIT}
 @copyright (C) 2011 - 2016, Olivier Biot, Jason Oster, Aaron McLeod
*/
(function() {
    function a() {
        if (!c) {
            if (!document.body) return setTimeout(a, 13);
            document.removeEventListener && document.removeEventListener("DOMContentLoaded", a, !1);
            for (window.removeEventListener("load", a, !1); d.length;) d.shift().call(window, []);
            c = !0;
            "function" === typeof define && define.amd && define("me", [], function() {
                return me
            })
        }
    }
    window.me = window.me || {};
    var b = !1,
        c = !1,
        d = [];
    window.onReady = function(e) {
        c ? e.call(window, []) : (d.push(e), b || ("complete" === document.readyState ? window.setTimeout(a, 0) : (document.addEventListener &&
            document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1)), b = !0))
    };
    if (!0 !== me.skipAutoInit) window.onReady(function() {
        me.boot()
    });
    else me.init = function() {
        me.boot();
        a()
    };
    window.throttle || (window.throttle = function(a, c, b) {
        var d = window.performance.now(),
            k;
        "boolean" !== typeof c && (c = !1);
        return function() {
            var l = window.performance.now(),
                m = l - d,
                n = arguments;
            if (m < a) !1 === c && (clearTimeout(k), k = setTimeout(function() {
                d = l;
                return b.apply(null, n)
            }, m));
            else return d = l, b.apply(null, n)
        }
    });
    "undefined" ===
    typeof console && (console = {
        log: function() {},
        info: function() {},
        error: function() {
            alert(Array.prototype.slice.call(arguments).join(", "))
        }
    })
})();
if (!Function.prototype.bind) {
    var Empty = function() {};
    Function.prototype.bind = function(a) {
        var b = this;
        if ("function" !== typeof b) throw new TypeError("Function.prototype.bind called on incompatible " + b);
        var c = Array.prototype.slice.call(arguments, 1),
            d = function() {
                if (this instanceof d) {
                    var e = b.apply(this, c.concat(Array.prototype.slice.call(arguments)));
                    return Object(e) === e ? e : this
                }
                return b.apply(a, c.concat(Array.prototype.slice.call(arguments)))
            };
        b.prototype && (Empty.prototype = b.prototype, d.prototype = new Empty,
            Empty.prototype = null);
        return d
    }
}
Function.prototype.defer = function() {
    return setTimeout(this.bind.apply(this, arguments), 0.01)
};
Object.defineProperty || (Object.defineProperty = function(a, b, c) {
    if (a.__defineGetter__) c.get && a.__defineGetter__(b, c.get), c.set && a.__defineSetter__(b, c.set);
    else throw new TypeError("Object.defineProperty not supported");
});
Object.create || (Object.create = function(a) {
    var b = function() {};
    b.prototype = a;
    return new b
});
Object.is || (Object.is = function(a, b) {
    return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b
});
Object.assign || Object.defineProperty(Object, "assign", {
    enumerable: !1,
    configurable: !0,
    writable: !0,
    value: function(a) {
        if (void 0 === a || null === a) throw new TypeError("Cannot convert first argument to object");
        for (var b = Object(a), c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (void 0 !== d && null !== d)
                for (var e = Object.keys(Object(d)), f = 0, g = e.length; f < g; f++) {
                    var h = e[f],
                        k = Object.getOwnPropertyDescriptor(d, h);
                    void 0 !== k && k.enumerable && (b[h] = d[h])
                }
        }
        return b
    }
});
(function() {
    function a() {
        function d() {
            this.init.apply(this, arguments);
            return this
        }
        for (var f = {}, g = Array(arguments.length), h = 0; h < arguments.length; h++) g.push(arguments[h]);
        d.prototype = Object.create(this.prototype);
        g.forEach(function(a) {
            b(d, f, a.__methods__ || a)
        });
        if (!("init" in d.prototype)) throw new TypeError("extend: Class is missing a constructor named `init`");
        Object.defineProperty(d.prototype, "_super", {
            value: c
        });
        Object.defineProperty(d, "__methods__", {
            value: f
        });
        d.extend = a;
        return d
    }

    function b(a, c, b) {
        Object.keys(b).forEach(function(d) {
            c[d] =
                b[d];
            if ("function" !== typeof b[d]) throw new TypeError("extend: Method `" + d + "` is not a function");
            Object.defineProperty(a.prototype, d, {
                configurable: !0,
                value: b[d]
            })
        })
    }

    function c(a, c, b) {
        return a.prototype[c].apply(this, b)
    }
    var d = function() {
        Object.apply(this, arguments)
    };
    d.prototype = Object.create(Object.prototype);
    d.prototype.constructor = d;
    Object.defineProperty(d, "extend", {
        value: a
    });
    me.Object = d
})();
me.Error = me.Object.extend.bind(Error)({
    init: function(a) {
        this.name = "me.Error";
        this.message = a
    }
});
Math.sign || (Math.sign = function(a) {
    a = +a;
    return 0 === a || isNaN(a) ? a : 0 < a ? 1 : -1
});
Number.prototype.clamp = function(a, b) {
    return this < a ? a : this > b ? b : +this
};
Number.prototype.random = function(a, b) {
    b || (b = a, a = this);
    return ~~(Math.random() * (b - a)) + a
};
Number.prototype.randomFloat = function(a, b) {
    b || (b = a, a = this);
    return Math.random() * (b - a) + a
};
Number.prototype.weightedRandom = function(a, b) {
    b || (b = a, a = this);
    return ~~(Math.pow(Math.random(), 2) * (b - a)) + a
};
Number.prototype.round = function(a, b) {
    a = 2 > arguments.length ? this : a;
    var c = Math.pow(10, b || a || 0);
    return ~~(0.5 + a * c) / c
};
Number.prototype.toHex = function() {
    return "0123456789ABCDEF".charAt(this - this % 16 >> 4) + "0123456789ABCDEF".charAt(this % 16)
};
Number.prototype.degToRad = function(a) {
    return (a || this) / 180 * Math.PI
};
Number.prototype.radToDeg = function(a) {
    return (a || this) * (180 / Math.PI)
};
String.prototype.trim || String.prototype.trim || function() {
    var a = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    String.prototype.trim = function() {
        return this.replace(a, "")
    }
}();
String.prototype.trimLeft || (String.prototype.trimLeft = function() {
    return this.replace(/^\s+/, "")
});
String.prototype.trimRight || (String.prototype.trimRight = function() {
    return this.replace(/\s+$/, "")
});
String.prototype.isNumeric = function() {
    return !isNaN(this) && "" !== this.trim()
};
String.prototype.isBoolean = function() {
    var a = this.trim();
    return "true" === a || "false" === a
};
String.prototype.includes || (String.prototype.includes = function() {
    return -1 !== String.prototype.indexOf.apply(this, arguments)
});
String.prototype.toHex = function() {
    for (var a = "", b = 0; b < this.length;) a += this.charCodeAt(b++).toString(16);
    return a
};
Array.prototype.remove = function(a) {
    a = Array.prototype.indexOf.call(this, a); - 1 !== a && Array.prototype.splice.call(this, a, 1);
    return this
};
Array.prototype.forEach || (Array.prototype.forEach = function(a, b) {
    for (var c = 0, d = this.length; d--; c++) a.call(b || this, this[c], c, this)
});
Array.isArray || (Array.isArray = function(a) {
    return a instanceof Array
});
Array.prototype.random = function(a) {
    return a[(0).random(a.length)]
};
Array.prototype.weightedRandom = function(a) {
    return a[(0).weightedRandom(a.length)]
};
me.TypedArray = function(a) {
    var b = 0;
    if (Array.isArray(a)) this.concat(a.slice());
    else if (1 === arguments.length && "number" === typeof a)
        for (b = 0; b < a; b++) this.push(0);
    else throw new me.Error("TypedArray polyfill: Unsupported constructor arguments", arguments);
};
me.TypedArray.prototype = Array.prototype;
me.TypedArray.prototype.set = function(a, b) {
    b = b || 0;
    if (a.length + b > this.length) throw new me.Error("TypedArray pollyfill: Buffer overflow in set");
    for (var c = 0; c < a.length; c++, b++) this[b] = a[c]
};
window.Float32Array = window.Float32Array || me.TypedArray;
window.Uint8Array = window.Uint8Array || me.TypedArray;
window.Uint16Array = window.Uint16Array || me.TypedArray;
window.Uint32Array = window.Uint32Array || me.TypedArray;
"undefined" === typeof window.performance && (window.performance = {});
"undefined" === typeof Date.now && (Date.now = function() {
    return (new Date).getTime()
});
if (!window.performance.now) {
    var timeOffset = Date.now();
    window.performance.timing && window.performance.timing.navigationStart && (timeOffset = window.performance.timing.navigationStart);
    window.performance.now = function() {
        return Date.now() - timeOffset
    }
}
(function(a) {
    function b(a, b) {
        function d(a) {
            if (!this || this.constructor !== d) return new d(a);
            this._keys = [];
            this._values = [];
            this._itp = [];
            this.objectOnly = b;
            a && c.call(this, a)
        }
        b || p(a, "size", {
            get: s
        });
        a.constructor = d;
        d.prototype = a;
        return d
    }

    function c(a) {
        this.add ? a.forEach(this.add, this) : a.forEach(function(a) {
            this.set(a[0], a[1])
        }, this)
    }

    function d(a) {
        this.has(a) && (this._keys.splice(z, 1), this._values.splice(z, 1), this._itp.forEach(function(a) {
            z < a[0] && a[0]--
        }));
        return -1 < z
    }

    function e(a) {
        return this.has(a) ? this._values[z] :
            void 0
    }

    function f(a, c) {
        if (this.objectOnly && c !== Object(c)) throw new TypeError("Invalid value used as weak collection key");
        if (c != c || 0 === c)
            for (z = a.length; z-- && !r(a[z], c););
        else z = a.indexOf(c);
        return -1 < z
    }

    function g(a) {
        return f.call(this, this._values, a)
    }

    function h(a) {
        return f.call(this, this._keys, a)
    }

    function k(a, c) {
        this.has(a) ? this._values[z] = c : this._values[this._keys.push(a) - 1] = c;
        return this
    }

    function l(a) {
        this.has(a) || this._values.push(a);
        return this
    }

    function m() {
        (this._keys || 0).length = this._values.length =
            0
    }

    function n() {
        return t(this._itp, this._keys)
    }

    function q() {
        return t(this._itp, this._values)
    }

    function u() {
        return t(this._itp, this._keys, this._values)
    }

    function v() {
        return t(this._itp, this._values, this._values)
    }

    function t(a, c, b) {
        var d = [0],
            e = !1;
        a.push(d);
        return {
            next: function() {
                var m, f = d[0];
                !e && f < c.length ? (m = b ? [c[f], b[f]] : c[f], d[0]++) : (e = !0, a.splice(a.indexOf(d), 1));
                return {
                    done: e,
                    value: m
                }
            }
        }
    }

    function s() {
        return this._values.length
    }

    function A(a, c) {
        for (var b = this.entries();;) {
            var d = b.next();
            if (d.done) break;
            a.call(c, d.value[1], d.value[0], this)
        }
    }
    var z, p = Object.defineProperty,
        r = Object.is;
    "undefined" == typeof WeakMap && (a.WeakMap = b({
        "delete": d,
        clear: m,
        get: e,
        has: h,
        set: k
    }, !0));
    "undefined" != typeof Map && "function" === typeof(new Map).values && (new Map).values().next || (a.Map = b({
        "delete": d,
        has: h,
        get: e,
        set: k,
        keys: n,
        values: q,
        entries: u,
        forEach: A,
        clear: m
    }));
    "undefined" != typeof Set && "function" === typeof(new Set).values && (new Set).values().next || (a.Set = b({
        has: g,
        add: l,
        "delete": d,
        clear: m,
        keys: q,
        values: q,
        entries: v,
        forEach: A
    }));
    "undefined" == typeof WeakSet && (a.WeakSet = b({
        "delete": d,
        add: l,
        clear: m,
        has: g
    }, !0))
})("undefined" != typeof exports && "undefined" != typeof global ? global : window);
(function() {
    function a() {
        return function() {
            process.nextTick(f)
        }
    }

    function b() {
        return function() {
            F(f)
        }
    }

    function c() {
        var a = 0,
            c = new U(f),
            b = document.createTextNode("");
        c.observe(b, {
            characterData: !0
        });
        return function() {
            b.data = a = ++a % 2
        }
    }

    function d() {
        var a = new MessageChannel;
        a.port1.onmessage = f;
        return function() {
            a.port2.postMessage(0)
        }
    }

    function e() {
        return function() {
            setTimeout(f, 1)
        }
    }

    function f() {
        for (var a = 0; a < D; a += 2)(0, H[a])(H[a + 1]), H[a] = void 0, H[a + 1] = void 0;
        D = 0
    }

    function g() {
        try {
            var a = require("vertx");
            F = a.runOnLoop ||
                a.runOnContext;
            return b()
        } catch (c) {
            return e()
        }
    }

    function h() {}

    function k(a) {
        try {
            return a.then
        } catch (c) {
            return M.error = c, M
        }
    }

    function l(a, c, b, d) {
        try {
            a.call(c, b, d)
        } catch (e) {
            return e
        }
    }

    function m(a, c, b) {
        G(function(a) {
            var d = !1,
                e = l(b, c, function(b) {
                    d || (d = !0, c !== b ? u(a, b) : t(a, b))
                }, function(c) {
                    d || (d = !0, s(a, c))
                }, "Settle: " + (a._label || " unknown promise"));
            !d && e && (d = !0, s(a, e))
        }, a)
    }

    function n(a, c) {
        c._state === K ? t(a, c._result) : c._state === I ? s(a, c._result) : A(c, void 0, function(c) {
            u(a, c)
        }, function(c) {
            s(a, c)
        })
    }

    function q(a,
        c, b) {
        c.constructor === a.constructor && b === P && constructor.resolve === Q ? n(a, c) : b === M ? s(a, M.error) : void 0 === b ? t(a, c) : "function" === typeof b ? m(a, c, b) : t(a, c)
    }

    function u(a, c) {
        a === c ? s(a, new TypeError("You cannot resolve a promise with itself")) : "function" === typeof c || "object" === typeof c && null !== c ? q(a, c, k(c)) : t(a, c)
    }

    function v(a) {
        a._onerror && a._onerror(a._result);
        z(a)
    }

    function t(a, c) {
        a._state === J && (a._result = c, a._state = K, 0 !== a._subscribers.length && G(z, a))
    }

    function s(a, c) {
        a._state === J && (a._state = I, a._result = c,
            G(v, a))
    }

    function A(a, c, b, d) {
        var e = a._subscribers,
            m = e.length;
        a._onerror = null;
        e[m] = c;
        e[m + K] = b;
        e[m + I] = d;
        0 === m && a._state && G(z, a)
    }

    function z(a) {
        var c = a._subscribers,
            b = a._state;
        if (0 !== c.length) {
            for (var d, e, m = a._result, f = 0; f < c.length; f += 3) d = c[f], e = c[f + b], d ? r(b, d, e, m) : e(m);
            a._subscribers.length = 0
        }
    }

    function p() {
        this.error = null
    }

    function r(a, c, b, d) {
        var e = "function" === typeof b,
            m, f, g, h;
        if (e) {
            try {
                m = b(d)
            } catch (n) {
                R.error = n, m = R
            }
            m === R ? (h = !0, f = m.error, m = null) : g = !0;
            if (c === m) {
                s(c, new TypeError("A promises callback cannot return that same promise."));
                return
            }
        } else m = d, g = !0;
        c._state === J && (e && g ? u(c, m) : h ? s(c, f) : a === K ? t(c, m) : a === I && s(c, m))
    }

    function x(a, c) {
        try {
            c(function(c) {
                u(a, c)
            }, function(c) {
                s(a, c)
            })
        } catch (b) {
            s(a, b)
        }
    }

    function w(a) {
        a[N] = V++;
        a._state = void 0;
        a._result = void 0;
        a._subscribers = []
    }

    function y(a) {
        this[N] = V++;
        this._result = this._state = void 0;
        this._subscribers = [];
        if (h !== a) {
            if ("function" !== typeof a) throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
            if (this instanceof y) x(this, a);
            else throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
        }
    }

    function C(a, c) {
        this._instanceConstructor = a;
        this.promise = new a(h);
        this.promise[N] || w(this.promise);
        Array.isArray(c) ? (this._input = c, this._remaining = this.length = c.length, this._result = Array(this.length), 0 === this.length ? t(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && t(this.promise, this._result))) : s(this.promise, Error("Array Methods must be provided an Array"))
    }
    var E = Array.isArray ? Array.isArray : function(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        },
        D = 0,
        F, B, G = function(a, c) {
            H[D] = a;
            H[D + 1] = c;
            D += 2;
            2 === D && (B ? B(f) : W())
        },
        L = "undefined" !== typeof window ? window : void 0,
        O = L || {},
        U = O.MutationObserver || O.WebKitMutationObserver,
        O = "undefined" === typeof self && "undefined" !== typeof process && "[object process]" === {}.toString.call(process),
        X = "undefined" !== typeof Uint8ClampedArray && "undefined" !== typeof importScripts && "undefined" !== typeof MessageChannel,
        H = Array(1E3),
        W;
    W = O ? a() : U ? c() : X ? d() : void 0 === L && "function" === typeof require ? g() : e();
    var P = function(a, c) {
            var b = this,
                d =
                new this.constructor(h);
            void 0 === d[N] && w(d);
            var e = b._state;
            if (e) {
                var m = arguments[e - 1];
                G(function() {
                    r(e, d, m, b._result)
                })
            } else A(b, d, a, c);
            return d
        },
        Q = function(a) {
            if (a && "object" === typeof a && a.constructor === this) return a;
            var c = new this(h);
            u(c, a);
            return c
        },
        N = Math.random().toString(36).substring(16),
        J = void 0,
        K = 1,
        I = 2,
        M = new p,
        R = new p,
        V = 0,
        S = y;
    y.all = function(a) {
        return (new Y(this, a)).promise
    };
    y.race = function(a) {
        var c = this;
        return E(a) ? new c(function(b, d) {
            for (var e = a.length, m = 0; m < e; m++) c.resolve(a[m]).then(b,
                d)
        }) : new c(function(a, c) {
            c(new TypeError("You must pass an array to race."))
        })
    };
    y.resolve = Q;
    y.reject = function(a) {
        var c = new this(h);
        s(c, a);
        return c
    };
    y._setScheduler = function(a) {
        B = a
    };
    y._setAsap = function(a) {
        G = a
    };
    y._asap = G;
    y.prototype = {
        constructor: y,
        then: P,
        "catch": function(a) {
            return this.then(null, a)
        }
    };
    var Y = C;
    C.prototype._enumerate = function() {
        for (var a = this.length, c = this._input, b = 0; this._state === J && b < a; b++) this._eachEntry(c[b], b)
    };
    C.prototype._eachEntry = function(a, c) {
        var b = this._instanceConstructor,
            d = b.resolve;
        d === Q ? (d = k(a), d === P && a._state !== J ? this._settledAt(a._state, c, a._result) : "function" !== typeof d ? (this._remaining--, this._result[c] = a) : b === S ? (b = new b(h), q(b, a, d), this._willSettleAt(b, c)) : this._willSettleAt(new b(function(c) {
            c(a)
        }), c)) : this._willSettleAt(d(a), c)
    };
    C.prototype._settledAt = function(a, c, b) {
        var d = this.promise;
        d._state === J && (this._remaining--, a === I ? s(d, b) : this._result[c] = b);
        0 === this._remaining && t(d, this._result)
    };
    C.prototype._willSettleAt = function(a, c) {
        var b = this;
        A(a, void 0, function(a) {
            b._settledAt(K,
                c, a)
        }, function(a) {
            b._settledAt(I, c, a)
        })
    };
    var L = function() {
            var a;
            if ("undefined" !== typeof global) a = global;
            else if ("undefined" !== typeof self) a = self;
            else try {
                a = Function("return this")()
            } catch (c) {
                throw Error("polyfill failed because global object is unavailable in this environment");
            }
            var b = a.Promise;
            if (!b || "[object Promise]" !== Object.prototype.toString.call(b.resolve()) || b.cast) a.Promise = S
        },
        T = {
            Promise: S,
            polyfill: L
        };
    "function" === typeof define && define.amd ? define(function() {
            return T
        }) : "undefined" !== typeof module &&
        module.exports ? module.exports = T : "undefined" !== typeof this && (this.ES6Promise = T);
    L()
}).call(this);
(function() {
    function a() {
        var a = {};
        document.location.hash && document.location.hash.substr(1).split("&").filter(function(a) {
            return "" !== a
        }).forEach(function(b) {
            var e = b.split("=");
            b = e.shift();
            e = e.join("=");
            a[b] = e || !0
        });
        return a
    }
    me.mod = "melonJS";
    me.version = "3.1.0";
    me.sys = {
        fps: 60,
        updatesPerSecond: 60,
        interpolation: !1,
        scale: null,
        gravity: void 0,
        stopOnAudioError: !0,
        pauseOnBlur: !0,
        resumeOnFocus: !0,
        stopOnBlur: !1,
        preRender: !1,
        checkVersion: function(a, b) {
            b = b || me.version;
            for (var e = a.split("."), f = b.split("."), g = Math.min(e.length,
                    f.length), h = 0, k = 0; k < g && !(h = +e[k] - +f[k]); k++);
            return h ? h : e.length - f.length
        }
    };
    var b = !1;
    Object.defineProperty(me, "initialized", {
        get: function() {
            return b
        }
    });
    me.boot = function() {
        b || (me.device._check(), me.save._init(), me.game.HASH = a(), me.loader.setNocache(me.game.HASH.nocache || !1), me.timer.init(), me.state.init(), me.pool.init(), !1 === me.device.isMobile && me.input._enableKeyboardEvent(), me.levelDirector.reset(), b = !0)
    }
})();
(function() {
    me.game = function() {
        var a = {},
            b = !1,
            c = !0,
            d = !1,
            e = 0,
            f = 1,
            g = 0,
            h = 0,
            k = 0,
            l = 1E3 / 60,
            m = 0,
            n = null,
            q = 0,
            u = null;
        a.viewport = null;
        a.world = null;
        a.mergeGroup = !0;
        a.sortOn = "z";
        a.tmxRenderer = null;
        a.onLevelLoaded = function() {};
        a.HASH = null;
        a.init = function(d, e) {
            b || (d = d || me.video.renderer.getWidth(), e = e || me.video.renderer.getHeight(), a.viewport = new me.Viewport(0, 0, d, e), a.world = new me.Container(0, 0, d, e), a.world.name = "rootContainer", a.world._root = !0, me.collision.init(), u = me.video.renderer, me.event.publish(me.event.GAME_INIT),
                me.input._translatePointerEvents(), b = c = !0)
        };
        a.reset = function() {
            me.collision.quadTree.clear();
            a.world.destroy();
            a.viewport && a.viewport.reset();
            u.reset();
            me.event.publish(me.event.GAME_RESET);
            a.updateFrameRate()
        };
        a.updateFrameRate = function() {
            e = 0;
            f = ~~(0.5 + 60 / me.sys.fps);
            l = 1E3 / me.sys.updatesPerSecond;
            g = 0;
            h = 10 * l;
            d = me.sys.fps > me.sys.updatesPerSecond
        };
        a.getParentContainer = function(a) {
            return a.ancestor
        };
        a.repaint = function() {
            c = !0
        };
        a.update = function(b) {
            if (0 === ++e % f)
                for (e = 0, me.timer.update(b), me.input._updateGamepads(),
                    g += me.timer.getDelta(), g = Math.min(g, h), m = me.sys.interpolation ? me.timer.getDelta() : l, k = me.sys.interpolation ? m : Math.max(m, q); g >= k || me.sys.interpolation;)
                    if (n = window.performance.now(), me.collision.quadTree.clear(), me.collision.quadTree.insertContainer(a.world), c = a.world.update(m) || c, c = a.viewport.update(m) || c, me.timer.lastUpdate = window.performance.now(), q = me.timer.lastUpdate - n, g -= k, me.sys.interpolation) {
                        g = 0;
                        break
                    }
        };
        a.draw = function() {
            if (c || d) {
                var b = a.viewport.pos.x + ~~a.viewport.offset.x,
                    e = a.viewport.pos.y +
                    ~~a.viewport.offset.y;
                a.world.transform.translate(-b, -e);
                me.video.renderer.prepareSurface();
                a.world.draw(u, a.viewport);
                a.world.transform.translate(b, e);
                a.viewport.draw(u)
            }
            c = !1;
            me.video.renderer.blitSurface()
        };
        return a
    }()
})();
(function() {
    me.agent = function() {
        var a = {},
            b = ["ms", "MS", "moz", "webkit", "o"];
        a.prefixed = function(a, d) {
            d = d || window;
            if (a in d) return d[a];
            var e = a.substring(0, 1).toUpperCase() + a.substring(1, a.length),
                f;
            b.some(function(a) {
                a += e;
                return f = a in d ? d[a] : void 0
            });
            return f
        };
        a.setPrefixed = function(a, d, e) {
            e = e || window;
            if (a in e) e[a] = d;
            else {
                var f = a.substring(0, 1).toUpperCase() + a.substring(1, a.length);
                b.some(function(a) {
                    a += f;
                    return a in e ? (e[a] = d, !0) : !1
                })
            }
        };
        return a
    }()
})();
(function() {
    me.device = function() {
        function a(a) {
            a.reading ? (c.accelerationX = a.reading.accelerationX, c.accelerationY = a.reading.accelerationY, c.accelerationZ = a.reading.accelerationZ) : (c.accelerationX = a.accelerationIncludingGravity.x, c.accelerationY = a.accelerationIncludingGravity.y, c.accelerationZ = a.accelerationIncludingGravity.z)
        }

        function b(a) {
            c.gamma = a.gamma;
            c.beta = a.beta;
            c.alpha = a.alpha
        }
        var c = {},
            d = !1,
            e = !1,
            f = null;
        c._check = function() {
            me.device._detectDevice();
            me.device.isMobile && !me.device.cocoon && window.document.addEventListener("touchmove",
                function(a) {
                    a.preventDefault();
                    window.scroll(0, 0);
                    return !1
                }, !1);
            me.device.pointerEnabled = me.agent.prefixed("pointerEnabled", navigator);
            me.device.maxTouchPoints = me.agent.prefixed("maxTouchPoints", navigator) || 0;
            window.gesture = me.agent.prefixed("gesture");
            me.device.touch = "createTouch" in document || "ontouchstart" in window || me.device.cocoon || me.device.pointerEnabled && 0 < me.device.maxTouchPoints;
            me.device.hasAccelerometer = "undefined" !== typeof window.DeviceMotionEvent || "undefined" !== typeof window.Windows &&
                "function" === typeof Windows.Devices.Sensors.Accelerometer;
            if (this.hasPointerLockSupport = me.agent.prefixed("pointerLockElement", document)) document.exitPointerLock = me.agent.prefixed("exitPointerLock", document);
            window.DeviceOrientationEvent && (me.device.hasDeviceOrientation = !0);
            this.hasFullscreenSupport = me.agent.prefixed("fullscreenEnabled", document) || document.mozFullScreenEnabled;
            document.exitFullscreen = me.agent.prefixed("cancelFullScreen", document) || me.agent.prefixed("exitFullscreen", document);
            navigator.vibrate =
                me.agent.prefixed("vibrate", navigator);
            try {
                c.localStorage = !!window.localStorage
            } catch (a) {
                c.localStorage = !1
            }
            window.addEventListener("blur", function() {
                me.sys.stopOnBlur && me.state.stop(!0);
                me.sys.pauseOnBlur && me.state.pause(!0)
            }, !1);
            window.addEventListener("focus", function() {
                me.sys.stopOnBlur && me.state.restart(!0);
                me.sys.resumeOnFocus && me.state.resume(!0)
            }, !1);
            var b, d;
            "undefined" !== typeof document.hidden ? (b = "hidden", d = "visibilitychange") : "undefined" !== typeof document.mozHidden ? (b = "mozHidden", d = "mozvisibilitychange") :
                "undefined" !== typeof document.msHidden ? (b = "msHidden", d = "msvisibilitychange") : "undefined" !== typeof document.webkitHidden && (b = "webkitHidden", d = "webkitvisibilitychange");
            "string" === typeof d && document.addEventListener(d, function() {
                document[b] ? (me.sys.stopOnBlur && me.state.stop(!0), me.sys.pauseOnBlur && me.state.pause(!0)) : (me.sys.stopOnBlur && me.state.restart(!0), me.sys.resumeOnFocus && me.state.resume(!0))
            }, !1)
        };
        c._detectDevice = function() {
            me.device.iOS = me.device.ua.match(/iPhone|iPad|iPod/i) || !1;
            me.device.android =
                me.device.ua.match(/Android/i) || !1;
            me.device.android2 = me.device.ua.match(/Android 2/i) || !1;
            me.device.wp = me.device.ua.match(/Windows Phone/i) || !1;
            me.device.BlackBerry = me.device.ua.match(/BlackBerry/i) || !1;
            me.device.Kindle = me.device.ua.match(/Kindle|Silk.*Mobile Safari/i) || !1;
            me.device.isMobile = me.device.ua.match(/Mobi/i) || me.device.iOS || me.device.android || me.device.wp || me.device.BlackBerry || me.device.Kindle || me.device.iOS || !1;
            me.device.ejecta = "undefined" !== typeof window.ejecta;
            me.device.cocoon = navigator.isCocoonJS ||
                "undefined" !== typeof window.Cocoon
        };
        c.ua = navigator.userAgent;
        c.localStorage = !1;
        c.hasAccelerometer = !1;
        c.hasDeviceOrientation = !1;
        c.hasFullscreenSupport = !1;
        c.hasPointerLockSupport = !1;
        c.nativeBase64 = "function" === typeof window.atob;
        c.maxTouchPoints = 0;
        c.touch = !1;
        c.isMobile = !1;
        c.iOS = !1;
        c.android = !1;
        c.android2 = !1;
        c.ejecta = !1;
        c.cocoon = !1;
        c.wp = !1;
        c.BlackBerry = !1;
        c.Kindle = !1;
        c.orientation = 0;
        c.accelerationX = 0;
        c.accelerationY = 0;
        c.accelerationZ = 0;
        c.gamma = 0;
        c.beta = 0;
        c.alpha = 0;
        c.language = navigator.language || navigator.browserLanguage ||
            navigator.userLanguage || "en";
        c.requestFullscreen = function(a) {
            this.hasFullscreenSupport && (a = a || me.video.getWrapper(), a.requestFullscreen = me.agent.prefixed("requestFullscreen", a) || a.mozRequestFullScreen, a.requestFullscreen())
        };
        c.exitFullscreen = function() {
            this.hasFullscreenSupport && document.exitFullscreen()
        };
        c.getPixelRatio = function() {
            if (null === f) {
                var a;
                a = "undefined" !== typeof me.video.renderer ? me.video.renderer.getScreenContext() : me.Renderer.prototype.getContext2d(document.createElement("canvas"));
                var c =
                    window.devicePixelRatio || 1;
                a = me.agent.prefixed("backingStorePixelRatio", a) || 1;
                f = c / a
            }
            return f
        };
        c.getStorage = function(a) {
            a = a || "local";
            switch (a) {
                case "local":
                    return me.save;
                default:
                    throw new me.Error("storage type " + a + " not supported");
            }
        };
        c.turnOnPointerLock = function() {
            if (this.hasPointerLockSupport) {
                var a = me.video.getWrapper();
                if (me.device.ua.match(/Firefox/i)) {
                    var c = function() {
                        (me.agent.prefixed("fullscreenElement", document) || document.mozFullScreenElement) === a && (document.removeEventListener("fullscreenchange",
                            c), document.removeEventListener("mozfullscreenchange", c), a.requestPointerLock = me.agent.prefixed("requestPointerLock", a), a.requestPointerLock())
                    };
                    document.addEventListener("fullscreenchange", c, !1);
                    document.addEventListener("mozfullscreenchange", c, !1);
                    me.device.requestFullscreen()
                } else a.requestPointerLock()
            }
        };
        c.turnOffPointerLock = function() {
            this.hasPointerLockSupport && document.exitPointerLock()
        };
        c.watchAccelerometer = function() {
            if (me.device.hasAccelerometer) {
                if (!d) {
                    if ("undefined" === typeof Windows) window.addEventListener("devicemotion",
                        a, !1);
                    else {
                        var c = Windows.Devices.Sensors.Accelerometer.getDefault();
                        if (c) {
                            var b = c.minimumReportInterval;
                            c.reportInterval = 16 <= b ? b : 25;
                            c.addEventListener("readingchanged", a, !1)
                        }
                    }
                    d = !0
                }
                return !0
            }
            return !1
        };
        c.unwatchAccelerometer = function() {
            d && ("undefined" === typeof Windows ? window.removeEventListener("devicemotion", a, !1) : Windows.Device.Sensors.Accelerometer.getDefault().removeEventListener("readingchanged", a, !1), d = !1)
        };
        c.watchDeviceOrientation = function() {
            me.device.hasDeviceOrientation && !e && (window.addEventListener("deviceorientation",
                b, !1), e = !0);
            return !1
        };
        c.unwatchDeviceOrientation = function() {
            e && (window.removeEventListener("deviceorientation", b, !1), e = !1)
        };
        c.vibrate = function(a) {
            navigator.vibrate && navigator.vibrate(a)
        };
        return c
    }();
    Object.defineProperty(me.device, "isFullscreen", {
        get: function() {
            return me.device.hasFullscreenSupport ? (me.agent.prefixed("fullscreenElement", document) || document.mozFullScreenElement) === me.video.getWrapper() : !1
        }
    });
    Object.defineProperty(me.device, "sound", {
        get: function() {
            return !Howler.noAudio
        }
    })
})();
(function() {
    me.timer = function() {
        var a = {},
            b = 0,
            c = 0,
            d = 0,
            e = 0,
            f = 0,
            g = Math.ceil(1E3 / me.sys.fps),
            h = 1.25 * (1E3 / me.sys.fps),
            k = [],
            l = 0,
            m = function(a) {
                for (var c = 0, b = k.length; c < b; c++)
                    if (k[c].timerId === a) {
                        k.splice(c, 1);
                        break
                    }
            },
            n = function(a) {
                for (var c = 0, b = k.length; c < b; c++) {
                    var d = k[c];
                    d.pauseable && me.state.isPaused() || (d.elapsed += a);
                    d.elapsed >= d.delay && (d.fn.apply(this), !0 === d.repeat ? d.elapsed -= d.delay : me.timer.clearTimeout(d.timerId))
                }
            };
        a.tick = 1;
        a.fps = 0;
        a.lastUpdate = window.performance.now();
        a.init = function() {
            a.reset();
            e = d = 0
        };
        a.reset = function() {
            d = e = window.performance.now();
            b = c = f = 0
        };
        a.setTimeout = function(a, c, b) {
            k.push({
                fn: a,
                delay: c,
                elapsed: 0,
                repeat: !1,
                timerId: ++l,
                pauseable: !0 === b || !0
            });
            return l
        };
        a.setInterval = function(a, c, b) {
            k.push({
                fn: a,
                delay: c,
                elapsed: 0,
                repeat: !0,
                timerId: ++l,
                pauseable: !0 === b || !0
            });
            return l
        };
        a.clearTimeout = function(a) {
            m.defer(this, a)
        };
        a.clearInterval = function(a) {
            m.defer(this, a)
        };
        a.getTime = function() {
            return e
        };
        a.getDelta = function() {
            return f
        };
        a.countFPS = function() {
            b++;
            c += f;
            0 === b % 10 && (this.fps = (~~(1E3 *
                b / c)).clamp(0, me.sys.fps), b = c = 0)
        };
        a.update = function(c) {
            d = e;
            e = c;
            f = e - d;
            a.tick = f > h && me.sys.interpolation ? f / g : 1;
            n(f);
            return f
        };
        return a
    }()
})();
(function() {
    me.pool = function() {
        var a = {},
            b = {};
        a.init = function() {
            a.register("me.Entity", me.Entity);
            a.register("me.CollectableEntity", me.CollectableEntity);
            a.register("me.LevelEntity", me.LevelEntity);
            a.register("me.Tween", me.Tween, !0);
            a.register("me.Color", me.Color, !0);
            a.register("me.Particle", me.Particle, !0);
            a.register("me.Sprite", me.Sprite);
            a.register("me.Vector2d", me.Vector2d, !0)
        };
        a.register = function(a, d, e) {
            b[a] = {
                "class": d,
                pool: e ? [] : void 0
            }
        };
        a.pull = function(a) {
            for (var d = Array(arguments.length), e =
                    0; e < arguments.length; e++) d[e] = arguments[e];
            var f = b[a];
            if (f) {
                var e = f["class"],
                    f = f.pool,
                    g;
                f && (g = f.pop()) ? (d.shift(), "function" === typeof g.onResetEvent ? g.onResetEvent.apply(g, d) : g.init.apply(g, d)) : (d[0] = e, g = new(e.bind.apply(e, d)), f && (g.className = a));
                return g
            }
            throw new me.Error("Cannot instantiate entity of type '" + a + "'");
        };
        a.purge = function() {
            for (var a in b) b[a] && (b[a].pool = [])
        };
        a.push = function(a) {
            var d = a.className;
            "undefined" !== typeof d && b[d] && b[d].pool.push(a)
        };
        a.exists = function(a) {
            return a in b
        };
        return a
    }()
})();
(function() {
    me.Vector2d = me.Object.extend({
        init: function(a, b) {
            return this.set(a || 0, b || 0)
        },
        _set: function(a, b) {
            this.x = a;
            this.y = b;
            return this
        },
        set: function(a, b) {
            if (a !== +a || b !== +b) throw new me.Vector2d.Error("invalid x,y parameters (not a number)");
            return this._set(a, b)
        },
        setZero: function() {
            return this.set(0, 0)
        },
        setV: function(a) {
            return this._set(a.x, a.y)
        },
        add: function(a) {
            return this._set(this.x + a.x, this.y + a.y)
        },
        sub: function(a) {
            return this._set(this.x - a.x, this.y - a.y)
        },
        scale: function(a, b) {
            return this._set(this.x * a,
                this.y * ("undefined" !== typeof b ? b : a))
        },
        scaleV: function(a) {
            return this._set(this.x * a.x, this.y * a.y)
        },
        div: function(a) {
            return this._set(this.x / a, this.y / a)
        },
        abs: function() {
            return this._set(0 > this.x ? -this.x : this.x, 0 > this.y ? -this.y : this.y)
        },
        clamp: function(a, b) {
            return new me.Vector2d(this.x.clamp(a, b), this.y.clamp(a, b))
        },
        clampSelf: function(a, b) {
            return this._set(this.x.clamp(a, b), this.y.clamp(a, b))
        },
        minV: function(a) {
            return this._set(this.x < a.x ? this.x : a.x, this.y < a.y ? this.y : a.y)
        },
        maxV: function(a) {
            return this._set(this.x >
                a.x ? this.x : a.x, this.y > a.y ? this.y : a.y)
        },
        floor: function() {
            return new me.Vector2d(Math.floor(this.x), Math.floor(this.y))
        },
        floorSelf: function() {
            return this._set(Math.floor(this.x), Math.floor(this.y))
        },
        ceil: function() {
            return new me.Vector2d(Math.ceil(this.x), Math.ceil(this.y))
        },
        ceilSelf: function() {
            return this._set(Math.ceil(this.x), Math.ceil(this.y))
        },
        negate: function() {
            return new me.Vector2d(-this.x, -this.y)
        },
        negateSelf: function() {
            return this._set(-this.x, -this.y)
        },
        copy: function(a) {
            return this._set(a.x,
                a.y)
        },
        equals: function(a) {
            return this.x === a.x && this.y === a.y
        },
        normalize: function() {
            var a = this.length();
            return 0 < a ? this._set(this.x / a, this.y / a) : this
        },
        perp: function() {
            return this._set(this.y, -this.x)
        },
        rotate: function(a) {
            var b = this.x,
                c = this.y;
            return this._set(b * Math.cos(a) - c * Math.sin(a), b * Math.sin(a) + c * Math.cos(a))
        },
        dotProduct: function(a) {
            return this.x * a.x + this.y * a.y
        },
        length2: function() {
            return this.dotProduct(this)
        },
        length: function() {
            return Math.sqrt(this.length2())
        },
        distance: function(a) {
            var b = this.x -
                a.x;
            a = this.y - a.y;
            return Math.sqrt(b * b + a * a)
        },
        angle: function(a) {
            return Math.acos((this.dotProduct(a) / (this.length() * a.length())).clamp(-1, 1))
        },
        project: function(a) {
            return this.scale(this.dotProduct(a) / a.length2())
        },
        projectN: function(a) {
            return this.scale(this.dotProduct(a))
        },
        clone: function() {
            return new me.Vector2d(this.x, this.y)
        },
        toString: function() {
            return "x:" + this.x + ",y:" + this.y
        }
    });
    me.Vector2d.Error = me.Error.extend({
        init: function(a) {
            me.Error.prototype.init.apply(this, [a]);
            this.name = "me.Vector2d.Error"
        }
    })
})();
(function() {
    me.Vector3d = me.Object.extend({
        init: function(a, b, c) {
            return this.set(a || 0, b || 0, c || 0)
        },
        _set: function(a, b, c) {
            this.x = a;
            this.y = b;
            this.z = c;
            return this
        },
        set: function(a, b, c) {
            if (a !== +a || b !== +b || c !== +c) throw new me.Vector3d.Error("invalid x, y, z parameters (not a number)");
            return this._set(a, b, c)
        },
        setZero: function() {
            return this.set(0, 0, 0)
        },
        setV: function(a) {
            return this._set(a.x, a.y, "undefined" !== typeof a.z ? a.z : this.z)
        },
        add: function(a) {
            return this._set(this.x + a.x, this.y + a.y, this.z + (a.z || 0))
        },
        sub: function(a) {
            return this._set(this.x -
                a.x, this.y - a.y, this.z - (a.z || 0))
        },
        scale: function(a, b, c) {
            return this._set(this.x * a, this.y * ("undefined" !== typeof b ? b : a), this.z * ("undefined" !== typeof c ? c : a))
        },
        scaleV: function(a) {
            return this._set(this.x * a.x, this.y * a.y, this.z * (a.z || 1))
        },
        div: function(a) {
            return this._set(this.x / a, this.y / a, this.z / a)
        },
        abs: function() {
            return this._set(0 > this.x ? -this.x : this.x, 0 > this.y ? -this.y : this.y, 0 > this.z ? -this.Z : this.z)
        },
        clamp: function(a, b) {
            return new me.Vector3d(this.x.clamp(a, b), this.y.clamp(a, b), this.z.clamp(a, b))
        },
        clampSelf: function(a,
            b) {
            return this._set(this.x.clamp(a, b), this.y.clamp(a, b), this.z.clamp(a, b))
        },
        minV: function(a) {
            var b = a.z || 0;
            return this._set(this.x < a.x ? this.x : a.x, this.y < a.y ? this.y : a.y, this.z < b ? this.z : b)
        },
        maxV: function(a) {
            var b = a.z || 0;
            return this._set(this.x > a.x ? this.x : a.x, this.y > a.y ? this.y : a.y, this.z > b ? this.z : b)
        },
        floor: function() {
            return new me.Vector3d(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z))
        },
        floorSelf: function() {
            return this._set(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z))
        },
        ceil: function() {
            return new me.Vector3d(Math.ceil(this.x),
                Math.ceil(this.y), Math.ceil(this.z))
        },
        ceilSelf: function() {
            return this._set(Math.ceil(this.x), Math.ceil(this.y), Math.ceil(this.z))
        },
        negate: function() {
            return new me.Vector3d(-this.x, -this.y, -this.z)
        },
        negateSelf: function() {
            return this._set(-this.x, -this.y, -this.z)
        },
        copy: function(a) {
            return this._set(a.x, a.y, "undefined" !== typeof a.z ? a.z : this.z)
        },
        equals: function(a) {
            return this.x === a.x && this.y === a.y && this.z === (a.z || this.z)
        },
        normalize: function() {
            var a = this.length();
            return 0 < a ? this._set(this.x / a, this.y / a,
                this.z / a) : this
        },
        perp: function() {
            return this._set(this.y, -this.x, this.z)
        },
        rotate: function(a) {
            var b = this.x,
                c = this.y;
            return this._set(b * Math.cos(a) - c * Math.sin(a), b * Math.sin(a) + c * Math.cos(a), this.z)
        },
        dotProduct: function(a) {
            return this.x * a.x + this.y * a.y + this.z * (a.z || 1)
        },
        length2: function() {
            return this.dotProduct(this)
        },
        length: function() {
            return Math.sqrt(this.length2())
        },
        distance: function(a) {
            var b = this.x - a.x,
                c = this.y - a.y;
            a = this.z - (a.z || 0);
            return Math.sqrt(b * b + c * c + a * a)
        },
        angle: function(a) {
            return Math.acos((this.dotProduct(a) /
                (this.length() * a.length())).clamp(-1, 1))
        },
        project: function(a) {
            return this.scale(this.dotProduct(a) / a.length2())
        },
        projectN: function(a) {
            return this.scale(this.dotProduct(a))
        },
        clone: function() {
            return new me.Vector3d(this.x, this.y, this.z)
        },
        toString: function() {
            return "x:" + this.x + ",y:" + this.y + ",z:" + this.z
        }
    });
    me.Vector3d.Error = me.Error.extend({
        init: function(a) {
            me.Error.prototype.init.apply(this, [a]);
            this.name = "me.Vector3d.Error"
        }
    })
})();
(function() {
    me.ObservableVector2d = me.Vector2d.extend({
        init: function(a, b, c) {
            Object.defineProperty(this, "x", {
                get: function() {
                    return this._x
                },
                set: function(a) {
                    this.onUpdate(a, this._y, this._x, this._y);
                    this._x = a
                }
            });
            Object.defineProperty(this, "y", {
                get: function() {
                    return this._y
                },
                set: function(a) {
                    this.onUpdate(this._x, a, this._x, this._y);
                    this._y = a
                }
            });
            if ("undefined" === typeof c) throw new me.ObservableVector2d.Error("undefined `onUpdate` callback");
            this.setCallback(c.onUpdate);
            this._x = a || 0;
            this._y = b || 0
        },
        _set: function(a,
            b) {
            this.onUpdate(a, b, this._x, this._y);
            this._x = a;
            this._y = b;
            return this
        },
        setMuted: function(a, b) {
            this._x = a;
            this._y = b;
            return this
        },
        setCallback: function(a) {
            if ("function" !== typeof a) throw new me.ObservableVector2d.Error("invalid `onUpdate` callback");
            this.onUpdate = a;
            return this
        },
        add: function(a) {
            return this._set(this._x + a.x, this._y + a.y)
        },
        sub: function(a) {
            return this._set(this._x - a.x, this._y - a.y)
        },
        scale: function(a, b) {
            return this._set(this._x * a, this._y * ("undefined" !== typeof b ? b : a))
        },
        scaleV: function(a) {
            return this._set(this._x *
                a.x, this._y * a.y)
        },
        div: function(a) {
            return this._set(this._x / a, this._y / a)
        },
        abs: function() {
            return this._set(0 > this._x ? -this._x : this._x, 0 > this._y ? -this._y : this._y)
        },
        clamp: function(a, b) {
            return new me.ObservableVector2d(this.x.clamp(a, b), this.y.clamp(a, b), {
                onUpdate: this.onUpdate
            })
        },
        clampSelf: function(a, b) {
            return this._set(this._x.clamp(a, b), this._y.clamp(a, b))
        },
        minV: function(a) {
            return this._set(this._x < a.x ? this._x : a.x, this._y < a.y ? this._y : a.y)
        },
        maxV: function(a) {
            return this._set(this._x > a.x ? this._x : a.x, this._y >
                a.y ? this._y : a.y)
        },
        floor: function() {
            return new me.ObservableVector2d(Math.floor(this._x), Math.floor(this._y), {
                onUpdate: this.onUpdate
            })
        },
        floorSelf: function() {
            return this._set(Math.floor(this._x), Math.floor(this._y))
        },
        ceil: function() {
            return new me.ObservableVector2d(Math.ceil(this._x), Math.ceil(this._y), {
                onUpdate: this.onUpdate
            })
        },
        ceilSelf: function() {
            return this._set(Math.ceil(this._x), Math.ceil(this._y))
        },
        negate: function() {
            return new me.ObservableVector2d(-this._x, -this._y, {
                onUpdate: this.onUpdate
            })
        },
        negateSelf: function() {
            return this._set(-this._x, -this._y)
        },
        copy: function(a) {
            return this._set(a.x, a.y)
        },
        equals: function(a) {
            return this._x === a.x && this._y === a.y
        },
        normalize: function() {
            var a = this.length();
            return 0 < a ? this._set(this._x / a, this._y / a) : this
        },
        perp: function() {
            return this._set(this._y, -this._x)
        },
        rotate: function(a) {
            var b = this._x,
                c = this._y;
            return this._set(b * Math.cos(a) - c * Math.sin(a), b * Math.sin(a) + c * Math.cos(a))
        },
        dotProduct: function(a) {
            return this._x * a.x + this._y * a.y
        },
        distance: function(a) {
            return Math.sqrt((this._x -
                a.x) * (this._x - a.x) + (this._y - a.y) * (this._y - a.y))
        },
        clone: function() {
            return new me.ObservableVector2d(this._x, this._y, {
                onUpdate: this.onUpdate
            })
        },
        toVector2d: function() {
            return new me.Vector2d(this._x, this._y)
        },
        toString: function() {
            return "x:" + this._x + ",y:" + this._y
        }
    });
    me.ObservableVector2d.Error = me.Error.extend({
        init: function(a) {
            me.Error.prototype.init.apply(this, [a]);
            this.name = "me.ObservableVector2d.Error"
        }
    })
})();
(function() {
    me.ObservableVector3d = me.Vector3d.extend({
        init: function(a, b, c, d) {
            Object.defineProperty(this, "x", {
                get: function() {
                    return this._x
                },
                set: function(a) {
                    this.onUpdate(a, this._y, this._z, this._x, this._y, this._z);
                    this._x = a
                }
            });
            Object.defineProperty(this, "y", {
                get: function() {
                    return this._y
                },
                set: function(a) {
                    this.onUpdate(this._x, a, this._z, this._x, this._y, this._z);
                    this._y = a
                }
            });
            Object.defineProperty(this, "z", {
                get: function() {
                    return this._z
                },
                set: function(a) {
                    this.onUpdate(this._x, this._y, a, this._x, this._y,
                        this._z);
                    this._z = a
                }
            });
            if ("undefined" === typeof d) throw new me.ObservableVector3d.Error("undefined `onUpdate` callback");
            this.setCallback(d.onUpdate);
            this._x = a || 0;
            this._y = b || 0;
            this._z = c || 0
        },
        _set: function(a, b, c) {
            this.onUpdate(a, b, c, this._x, this._y, this._z);
            this._x = a;
            this._y = b;
            this._z = c;
            return this
        },
        setMuted: function(a, b, c) {
            this._x = a;
            this._y = b;
            this._z = c;
            return this
        },
        setCallback: function(a) {
            if ("function" !== typeof a) throw new me.ObservableVector2d.Error("invalid `onUpdate` callback");
            this.onUpdate = a;
            return this
        },
        add: function(a) {
            return this._set(this._x + a.x, this._y + a.y, this._z + (a.z || 0))
        },
        sub: function(a) {
            return this._set(this._x - a.x, this._y - a.y, this._z - (a.z || 0))
        },
        scale: function(a, b, c) {
            return this._set(this._x * a, this._y * ("undefined" !== typeof b ? b : a), this._z * ("undefined" !== typeof c ? c : a))
        },
        scaleV: function(a) {
            return this._set(this._x * a.x, this._y * a.y, this._z * (a.z || 1))
        },
        div: function(a) {
            return this._set(this._x / a, this._y / a, this._z / a)
        },
        abs: function() {
            return this._set(0 > this._x ? -this._x : this._x, 0 > this._y ? -this._y : this._y,
                0 > this._Z ? -this._z : this._z)
        },
        clamp: function(a, b) {
            return new me.ObservableVector3d(this._x.clamp(a, b), this._y.clamp(a, b), this._z.clamp(a, b), {
                onUpdate: this.onUpdate
            })
        },
        clampSelf: function(a, b) {
            return this._set(this._x.clamp(a, b), this._y.clamp(a, b), this._z.clamp(a, b))
        },
        minV: function(a) {
            var b = a.z || 0;
            return this._set(this._x < a.x ? this._x : a.x, this._y < a.y ? this._y : a.y, this._z < b ? this._z : b)
        },
        maxV: function(a) {
            var b = a.z || 0;
            return this._set(this._x > a.x ? this._x : a.x, this._y > a.y ? this._y : a.y, this._z > b ? this._z : b)
        },
        floor: function() {
            return new me.ObservableVector3d(Math.floor(this._x),
                Math.floor(this._y), Math.floor(this._z), {
                    onUpdate: this.onUpdate
                })
        },
        floorSelf: function() {
            return this._set(Math.floor(this._x), Math.floor(this._y), Math.floor(this._z))
        },
        ceil: function() {
            return new me.ObservableVector3d(Math.ceil(this._x), Math.ceil(this._y), Math.ceil(this._z), {
                onUpdate: this.onUpdate
            })
        },
        ceilSelf: function() {
            return this._set(Math.ceil(this._x), Math.ceil(this._y), Math.ceil(this._z))
        },
        negate: function() {
            return new me.ObservableVector3d(-this._x, -this._y, -this._z, {
                onUpdate: this.onUpdate
            })
        },
        negateSelf: function() {
            return this._set(-this._x, -this._y, -this._z)
        },
        copy: function(a) {
            return this._set(a.x, a.y, "undefined" !== typeof a.z ? a.z : this._z)
        },
        equals: function(a) {
            return this._x === a.x && this._y === a.y && this._z === (a.z || this._z)
        },
        normalize: function() {
            var a = this.length();
            return 0 < a ? this._set(this._x / a, this._y / a, this._z / a) : this
        },
        perp: function() {
            return this._set(this._y, -this._x, this._z)
        },
        rotate: function(a) {
            var b = this._x,
                c = this._y;
            return this._set(b * Math.cos(a) - c * Math.sin(a), b * Math.sin(a) + c * Math.cos(a),
                this._z)
        },
        dotProduct: function(a) {
            return this._x * a.x + this._y * a.y + this._z * (a.z || 1)
        },
        distance: function(a) {
            var b = this._x - a.x,
                c = this._y - a.y;
            a = this._z - (a.z || 0);
            return Math.sqrt(b * b + c * c + a * a)
        },
        clone: function() {
            return new me.ObservableVector3d(this._x, this._y, this._z, {
                onUpdate: this.onUpdate
            })
        },
        toVector3d: function() {
            return new me.Vector3d(this._x, this._y, this._z)
        },
        toString: function() {
            return "x:" + this._x + ",y:" + this._y + ",z:" + this._z
        }
    });
    me.ObservableVector3d.Error = me.Error.extend({
        init: function(a) {
            me.Error.prototype.init.apply(this, [a]);
            this.name = "me.ObservableVector3d.Error"
        }
    })
})();
(function() {
    me.Matrix2d = me.Object.extend({
        init: function(a, b, c, d, e, f, g, h, k) {
            this.val = new Float32Array(9);
            a instanceof me.Matrix2d ? this.copy(a) : 9 === arguments.length ? this.set(a, b, c, d, e, f, g, h, k) : this.identity()
        },
        identity: function() {
            this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
            return this
        },
        set: function(a, b, c, d, e, f, g, h, k) {
            var l = this.val;
            l[0] = a;
            l[1] = b;
            l[2] = c;
            l[3] = d;
            l[4] = e;
            l[5] = f;
            l[6] = g;
            l[7] = h;
            l[8] = k;
            return this
        },
        copy: function(a) {
            this.val.set(a.val);
            return this
        },
        multiply: function(a) {
            a = a.val;
            var b = this.val,
                c = b[0],
                d = b[1],
                e =
                b[3],
                f = b[4],
                g = a[0],
                h = a[1],
                k = a[3],
                l = a[4],
                m = a[6];
            a = a[7];
            b[0] = c * g + e * h;
            b[1] = d * g + f * h;
            b[3] = c * k + e * l;
            b[4] = d * k + f * l;
            b[6] += c * m + e * a;
            b[7] += d * m + f * a;
            return this
        },
        vectorMultiply: function(a) {
            var b = this.val,
                c = a.x,
                d = a.y;
            a.x = c * b[0] + d * b[3] + b[6];
            a.y = c * b[1] + d * b[4] + b[7];
            return a
        },
        scale: function(a, b) {
            var c = this.val;
            c[0] *= a;
            c[1] *= a;
            c[3] *= b;
            c[4] *= b;
            return this
        },
        rotate: function(a) {
            if (0 !== a) {
                var b = this.val,
                    c = b[0],
                    d = b[1],
                    e = b[3],
                    f = b[4],
                    g = Math.sin(a);
                a = Math.cos(a);
                b[0] = c * a + e * g;
                b[1] = d * a + f * g;
                b[3] = c * -g + e * a;
                b[4] = d * -g + f * a
            }
            return this
        },
        translate: function(a, b) {
            var c = this.val;
            c[6] += a * c[0] + b * c[3];
            c[7] += a * c[1] + b * c[4];
            return this
        },
        translateV: function(a) {
            return this.translate(a.x, a.y)
        },
        isIdentity: function() {
            var a = this.val;
            return 1 === a[0] && 0 === a[1] && 0 === a[2] && 0 === a[3] && 1 === a[4] && 0 === a[5] && 0 === a[6] && 0 === a[7] && 1 === a[8]
        },
        clone: function() {
            return new me.Matrix2d(this)
        },
        toString: function() {
            var a = this.val;
            return "me.Matrix2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")"
        }
    })
})();
(function() {
    me.Ellipse = me.Object.extend({
        init: function(a, b, c, d) {
            this.pos = new me.Vector2d;
            this._bounds = void 0;
            this.radius = NaN;
            this.radiusV = new me.Vector2d;
            this.radiusSq = new me.Vector2d;
            this.ratio = new me.Vector2d;
            this.shapeType = "Ellipse";
            this.setShape(a, b, c, d)
        },
        setShape: function(a, b, c, d) {
            c /= 2;
            d /= 2;
            this.pos.set(a, b);
            this.radius = Math.max(c, d);
            this.ratio.set(c / this.radius, d / this.radius);
            this.radiusV.set(this.radius, this.radius).scaleV(this.ratio);
            a = this.radius * this.radius;
            this.radiusSq.set(a, a).scaleV(this.ratio);
            this.updateBounds();
            return this
        },
        rotate: function() {
            return this
        },
        scale: function(a, b) {
            return this.setShape(this.pos.x, this.pos.y, 2 * this.radiusV.x * a, 2 * this.radiusV.y * ("undefined" !== typeof b ? b : a))
        },
        scaleV: function(a) {
            return this.scale(a.x, a.y)
        },
        translate: function(a, b) {
            this.pos.x += a;
            this.pos.y += b;
            this._bounds.translate(a, b);
            return this
        },
        translateV: function(a) {
            this.pos.add(a);
            this._bounds.translateV(a);
            return this
        },
        containsPointV: function(a) {
            return this.containsPoint(a.x, a.y)
        },
        containsPoint: function(a,
            b) {
            a -= this.pos.x;
            b -= this.pos.y;
            return 1 >= a * a / this.radiusSq.x + b * b / this.radiusSq.y
        },
        getBounds: function() {
            return this._bounds
        },
        updateBounds: function() {
            var a = this.radiusV.x,
                b = this.radiusV.y,
                c = this.pos.x - a,
                d = this.pos.y - b,
                a = 2 * a,
                b = 2 * b;
            this._bounds ? this._bounds.setShape(c, d, a, b) : this._bounds = new me.Rect(c, d, a, b);
            return this._bounds
        },
        clone: function() {
            return new me.Ellipse(this.pos.x, this.pos.y, 2 * this.radiusV.x, 2 * this.radiusV.y)
        }
    })
})();
(function() {
    me.Polygon = me.Object.extend({
        init: function(a, b, c) {
            this.pos = new me.Vector2d;
            this._bounds = void 0;
            this.points = null;
            this.shapeType = "Polygon";
            this.setShape(a, b, c)
        },
        setShape: function(a, b, c) {
            this.pos.set(a, b);
            this.points = c;
            this.recalc();
            this.updateBounds();
            return this
        },
        rotate: function(a) {
            if (0 !== a) {
                for (var b = this.points, c = b.length, d = 0; d < c; d++) b[d].rotate(a);
                this.recalc();
                this.updateBounds()
            }
            return this
        },
        scale: function(a, b) {
            b = "undefined" !== typeof b ? b : a;
            for (var c = this.points, d = c.length, e = 0; e < d; e++) c[e].scale(a,
                b);
            this.recalc();
            this.updateBounds();
            return this
        },
        scaleV: function(a) {
            return this.scale(a.x, a.y)
        },
        recalc: function() {
            var a, b = this.edges = [],
                c = this.normals = [],
                d = this.points,
                e = d.length;
            if (3 > e) throw new me.Polygon.Error("Requires at least 3 points");
            for (a = 0; a < e; a++) {
                var f = (new me.Vector2d).copy(d[(a + 1) % e]).sub(d[a]);
                b.push(f);
                c.push((new me.Vector2d).copy(f).perp().normalize())
            }
            return this
        },
        translate: function(a, b) {
            this.pos.x += a;
            this.pos.y += b;
            this._bounds.translate(a, b);
            return this
        },
        translateV: function(a) {
            this.pos.add(a);
            this._bounds.translateV(a);
            return this
        },
        containsPointV: function(a) {
            return this.containsPoint(a.x, a.y)
        },
        containsPoint: function(a, b) {
            for (var c = !1, d = this.pos.x, e = this.pos.y, f = this.points, g = f.length, h = 0, k = g - 1; h < g; k = h++) {
                var l = f[h].y + e,
                    m = f[h].x + d,
                    n = f[k].y + e,
                    k = f[k].x + d;
                l > b !== n > b && a < (k - m) * (b - l) / (n - l) + m && (c = !c)
            }
            return c
        },
        getBounds: function() {
            return this._bounds
        },
        updateBounds: function() {
            var a = Infinity,
                b = Infinity,
                c = -Infinity,
                d = -Infinity;
            this.points.forEach(function(e) {
                a = Math.min(a, e.x);
                b = Math.min(b, e.y);
                c =
                    Math.max(c, e.x);
                d = Math.max(d, e.y)
            });
            this._bounds ? this._bounds.setShape(a, b, c - a, d - b) : this._bounds = new me.Rect(a, b, c - a, d - b);
            return this._bounds.translateV(this.pos)
        },
        clone: function() {
            var a = [];
            this.points.forEach(function(b) {
                a.push(new me.Vector2d(b.x, b.y))
            });
            return new me.Polygon(this.pos.x, this.pos.y, a)
        }
    });
    me.Polygon.Error = me.Error.extend({
        init: function(a) {
            me.Error.prototype.init.apply(this, [a]);
            this.name = "me.Polygon.Error"
        }
    })
})();
(function() {
    me.Rect = me.Polygon.extend({
        init: function(a, b, c, d) {
            this.pos = new me.Vector2d;
            this.points = [new me.Vector2d, new me.Vector2d, new me.Vector2d, new me.Vector2d];
            this.shapeType = "Polygon";
            this.setShape(a, b, c, d)
        },
        setShape: function(a, b, c, d) {
            this.points[0].set(0, 0);
            this.points[1].set(c, 0);
            this.points[2].set(c, d);
            this.points[3].set(0, d);
            me.Polygon.prototype.setShape.apply(this, [a, b, this.points]);
            this._width = c;
            this._height = d;
            return this
        },
        resize: function(a, b) {
            this.width = a;
            this.height = b;
            return this
        },
        getBounds: function() {
            return this
        },
        updateBounds: function() {
            return this
        },
        clone: function() {
            return new me.Rect(this.pos.x, this.pos.y, this._width, this._height)
        },
        copy: function(a) {
            return this.setShape(a.pos.x, a.pos.y, a._width, a._height)
        },
        translate: function(a, b) {
            this.pos.x += a;
            this.pos.y += b;
            return this
        },
        translateV: function(a) {
            return this.translate(a.x, a.y)
        },
        union: function(a) {
            var b = Math.min(this.left, a.left),
                c = Math.min(this.top, a.top);
            this.resize(Math.max(this.right, a.right) - b, Math.max(this.bottom, a.bottom) - c);
            this.pos.set(b, c);
            return this
        },
        overlaps: function(a) {
            return this.left < a.right && a.left < this.right && this.top < a.bottom && a.top < this.bottom
        },
        contains: function(a) {
            return a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom
        },
        containsPoint: function(a, b) {
            return a >= this.left && a <= this.right && b >= this.top && b <= this.bottom
        },
        toPolygon: function() {
            return new me.Polygon(this.pos.x, this.pos.y, this.points)
        }
    });
    Object.defineProperty(me.Rect.prototype, "left", {
        get: function() {
            return this.pos.x
        },
        configurable: !0
    });
    Object.defineProperty(me.Rect.prototype,
        "right", {
            get: function() {
                var a = this._width;
                return this.pos.x + a || a
            },
            configurable: !0
        });
    Object.defineProperty(me.Rect.prototype, "top", {
        get: function() {
            return this.pos.y
        },
        configurable: !0
    });
    Object.defineProperty(me.Rect.prototype, "bottom", {
        get: function() {
            var a = this._height;
            return this.pos.y + a || a
        },
        configurable: !0
    });
    Object.defineProperty(me.Rect.prototype, "width", {
        get: function() {
            return this._width
        },
        set: function(a) {
            this._width = a;
            this.points[1].x = this.points[2].x = a;
            this.recalc()
        },
        configurable: !0
    });
    Object.defineProperty(me.Rect.prototype,
        "height", {
            get: function() {
                return this._height
            },
            set: function(a) {
                this._height = a;
                this.points[2].y = this.points[3].y = a;
                this.recalc()
            },
            configurable: !0
        })
})();
(function() {
    me.Line = me.Polygon.extend({
        containsPointV: function(a) {
            return this.containsPoint(a.x, a.y)
        },
        containsPoint: function(a, b) {
            a -= this.pos.x;
            b -= this.pos.y;
            var c = this.points[0],
                d = this.points[1];
            return (b - c.y) * (d.x - c.x) === (d.y - c.y) * (a - c.x)
        },
        recalc: function() {
            var a = this.edges = [],
                b = this.normals = [],
                c = this.points;
            if (2 !== c.length) throw new me.Line.Error("Requires exactly 2 points");
            c = (new me.Vector2d).copy(c[1]).sub(c[0]);
            a.push(c);
            b.push((new me.Vector2d).copy(c).perp().normalize());
            return this
        },
        clone: function() {
            var a = [];
            this.points.forEach(function(b) {
                a.push(new me.Vector2d(b.x, b.y))
            });
            return new me.Line(this.pos.x, this.pos.y, a)
        }
    });
    me.Line.Error = me.Error.extend({
        init: function(a) {
            me.Error.prototype.init.apply(this, [a]);
            this.name = "me.Line.Error"
        }
    })
})();
(function() {
    me.Body = me.Rect.extend({
        init: function(a, b) {
            this.entity = a;
            this.shapes = [];
            this.collisionMask = me.collision.types.ALL_OBJECT;
            this.collisionType = me.collision.types.ENEMY_OBJECT;
            "undefined" === typeof this.vel && (this.vel = new me.Vector2d);
            this.vel.set(0, 0);
            "undefined" === typeof this.accel && (this.accel = new me.Vector2d);
            this.accel.set(0, 0);
            "undefined" === typeof this.friction && (this.friction = new me.Vector2d);
            this.friction.set(0, 0);
            "undefined" === typeof this.maxVel && (this.maxVel = new me.Vector2d);
            this.maxVel.set(1E3,
                1E3);
            this.gravity = "undefined" !== typeof me.sys.gravity ? me.sys.gravity : 0.98;
            this.jumping = this.falling = !1;
            me.Rect.prototype.init.apply(this, [0, 0, a.width, a.height]);
            for (var c = 0; c < b.length; c++) this.addShape(b[c].clone(), !0)
        },
        addShape: function(a, b) {
            a instanceof me.Rect ? this.shapes.push(a.toPolygon()) : this.shapes.push(a);
            !0 !== b && this.updateBounds();
            return this.shapes.length
        },
        addShapesFromJSON: function(a, b, c) {
            var d;
            c = c || 1;
            if ("undefined" === typeof a.rigidBodies) {
                d = a[b];
                if ("undefined" === typeof d) throw new me.Body.Error("Identifier (" +
                    b + ") undefined for the given PhysicsEditor JSON object)");
                for (a = 0; a < d.length; a++) {
                    for (var e = [], f = 0; f < d[a].shape.length; f += 2) e.push(new me.Vector2d(d[a].shape[f], d[a].shape[f + 1]));
                    this.addShape(new me.Polygon(0, 0, e), !0)
                }
            } else {
                a.rigidBodies.forEach(function(a) {
                    a.name === b && (d = a)
                });
                if ("undefined" === typeof d) throw new me.Body.Error("Identifier (" + b + ") undefined for the given PhysicsEditor JSON object)");
                this.pos.set(d.origin.x, 1 - d.origin.y).scale(c);
                var g = this;
                d.polygons.forEach(function(a) {
                    var b = [];
                    a.forEach(function(a) {
                        b.push((new me.Vector2d(a.x,
                            1 - a.y)).scale(c))
                    });
                    g.addShape(new me.Polygon(0, 0, b), !0)
                });
                d.circles.forEach(function(a) {
                    g.addShape(new me.Ellipse(a.cx * c, (1 - a.cy) * c, 2 * a.r * c, 2 * a.r * c), !0)
                })
            }
            this.updateBounds();
            return this.shapes.length
        },
        getShape: function(a) {
            return this.shapes[a || 0]
        },
        removeShape: function(a) {
            this.shapes.remove(a);
            this.updateBounds();
            return this.shapes.length
        },
        removeShapeAt: function(a) {
            return this.removeShape(this.getShape(a))
        },
        setCollisionMask: function(a) {
            this.collisionMask = a
        },
        respondToCollision: function(a) {
            a = a.overlapV;
            this.entity.pos.sub(a);
            0 !== a.x && (this.vel.x = ~~(0.5 + this.vel.x - a.x) || 0);
            0 !== a.y && (this.vel.y = ~~(0.5 + this.vel.y - a.y) || 0, this.falling = 1 <= a.y, this.jumping = -1 >= a.y)
        },
        updateBounds: function() {
            if (0 < this.shapes.length) {
                var a = this.shapes[0].getBounds();
                this.pos.setV(a.pos);
                this.resize(a.width, a.height);
                for (a = 1; a < this.shapes.length; a++) this.union(this.shapes[a].getBounds())
            }
            this.entity.onBodyUpdate(this.pos, this.width, this.height);
            return this
        },
        setVelocity: function(a, b) {
            this.accel.x = 0 !== a ? a : this.accel.x;
            this.accel.y =
                0 !== b ? b : this.accel.y;
            this.setMaxVelocity(a, b)
        },
        setMaxVelocity: function(a, b) {
            this.maxVel.x = a;
            this.maxVel.y = b
        },
        setFriction: function(a, b) {
            this.friction.x = a || 0;
            this.friction.y = b || 0
        },
        applyFriction: function(a) {
            var b = this.friction.x * me.timer.tick,
                c = a.x + b,
                b = a.x - b,
                d = this.friction.y * me.timer.tick,
                e = a.y + d,
                d = a.y - d;
            a.x = 0 > c ? c : 0 < b ? b : 0;
            a.y = 0 > e ? e : 0 < d ? d : 0
        },
        computeVelocity: function(a) {
            this.gravity && (a.y += this.gravity * me.timer.tick, this.jumping = (this.falling = 0 < a.y) ? !1 : this.jumping);
            (this.friction.x || this.friction.y) &&
            this.applyFriction(a);
            0 !== a.y && (a.y = a.y.clamp(-this.maxVel.y, this.maxVel.y));
            0 !== a.x && (a.x = a.x.clamp(-this.maxVel.x, this.maxVel.x))
        },
        update: function() {
            this.computeVelocity(this.vel);
            this.entity.pos.add(this.vel);
            return 0 !== this.vel.x || 0 !== this.vel.y
        },
        destroy: function() {
            this.entity = null;
            this.shapes = []
        }
    });
    me.Body.Error = me.Error.extend({
        init: function(a) {
            me.Error.prototype.init.apply(this, [a]);
            this.name = "me.Body.Error"
        }
    })
})();
(function() {
    function a(a, c, b, d) {
        this.max_objects = c || 4;
        this.max_levels = b || 4;
        this.level = d || 0;
        this.bounds = a;
        this.objects = [];
        this.nodes = []
    }
    var b = [],
        c = function(a, c, d, h) {
            if (0 < b.length) {
                var k = b.pop();
                k.bounds = a;
                k.max_objects = c || 4;
                k.max_levels = d || 4;
                k.level = h || 0;
                return k
            }
            return new me.QuadTree(a, c, d, h)
        },
        d = new me.Vector2d;
    a.prototype.split = function() {
        var a = this.level + 1,
            b = ~~(0.5 + this.bounds.width / 2),
            d = ~~(0.5 + this.bounds.height / 2),
            h = ~~(0.5 + this.bounds.pos.x),
            k = ~~(0.5 + this.bounds.pos.y);
        this.nodes[0] = c({
            pos: {
                x: h +
                    b,
                y: k
            },
            width: b,
            height: d
        }, this.max_objects, this.max_levels, a);
        this.nodes[1] = c({
            pos: {
                x: h,
                y: k
            },
            width: b,
            height: d
        }, this.max_objects, this.max_levels, a);
        this.nodes[2] = c({
            pos: {
                x: h,
                y: k + d
            },
            width: b,
            height: d
        }, this.max_objects, this.max_levels, a);
        this.nodes[3] = c({
            pos: {
                x: h + b,
                y: k + d
            },
            width: b,
            height: d
        }, this.max_objects, this.max_levels, a)
    };
    a.prototype.getIndex = function(a) {
        var c = a.getBounds(),
            b = c.pos;
        if (a.floating || a.ancestor && a.ancestor.floating) b = me.game.viewport.localToWorld(b.x, b.y, d);
        a = -1;
        var h = b.x,
            k = b.y,
            b = c.width,
            l = c.height,
            c = this.bounds.pos.x + this.bounds.width / 2,
            m = this.bounds.pos.y + this.bounds.height / 2,
            l = k < m && k + l < m,
            k = k > m;
        h < c && h + b < c ? l ? a = 1 : k && (a = 2) : h > c && (l ? a = 0 : k && (a = 3));
        return a
    };
    a.prototype.insertContainer = function(a) {
        for (var c = a.children.length, b; c--, b = a.children[c];) b instanceof me.Container ? ("rootContainer" !== b.name && this.insert(b), this.insertContainer(b)) : "function" === typeof b.getBounds && this.insert(b)
    };
    a.prototype.insert = function(a) {
        var c = -1;
        if (0 < this.nodes.length && (c = this.getIndex(a), -1 !== c)) {
            this.nodes[c].insert(a);
            return
        }
        this.objects.push(a);
        if (this.objects.length > this.max_objects && this.level < this.max_levels)
            for (0 === this.nodes.length && this.split(), a = 0; a < this.objects.length;) c = this.getIndex(this.objects[a]), -1 !== c ? this.nodes[c].insert(this.objects.splice(a, 1)[0]) : a += 1
    };
    a.prototype.retrieve = function(a, c) {
        var b = this.objects;
        if (0 < this.nodes.length) {
            var d = this.getIndex(a);
            if (-1 !== d) b = b.concat(this.nodes[d].retrieve(a));
            else
                for (d = 0; d < this.nodes.length; d += 1) b = b.concat(this.nodes[d].retrieve(a))
        }
        "function" === typeof c &&
            b.sort(c);
        return b
    };
    a.prototype.clear = function(a) {
        for (var c = this.objects.length = 0; c < this.nodes.length; c += 1) this.nodes[c].clear(), b.push(this.nodes[c]);
        this.nodes = [];
        "undefined" !== typeof a && this.bounds.setShape(a.pos.x, a.pos.y, a.width, a.height)
    };
    me.QuadTree = a
})();
(function() {
    function a(a, c, b) {
        for (var d = Number.MAX_VALUE, e = -Number.MAX_VALUE, f = a.length, g = 0; g < f; g++) {
            var h = a[g].dotProduct(c);
            h < d && (d = h);
            h > e && (e = h)
        }
        b[0] = d;
        b[1] = e
    }

    function b(c, b, d, e, f, h) {
        var t = k.pop(),
            s = k.pop();
        c = g.pop().copy(b).sub(c);
        b = c.dotProduct(f);
        a(d, f, t);
        a(e, f, s);
        s[0] += b;
        s[1] += b;
        if (t[0] > s[1] || s[0] > t[1]) return g.push(c), k.push(t), k.push(s), !0;
        h && (d = 0, t[0] < s[0] ? (h.aInB = !1, t[1] < s[1] ? (d = t[1] - s[0], h.bInA = !1) : (d = t[1] - s[0], e = s[1] - t[0], d = d < e ? d : -e)) : (h.bInA = !1, t[1] > s[1] ? (d = t[0] - s[1], h.aInB = !1) : (d = t[1] -
            s[0], e = s[1] - t[0], d = d < e ? d : -e)), e = Math.abs(d), e < h.overlap && (h.overlap = e, h.overlapN.copy(f), 0 > d && h.overlapN.negateSelf()));
        g.push(c);
        k.push(t);
        k.push(s);
        return !1
    }

    function c(a, c) {
        var b = a.length2(),
            g = c.dotProduct(a);
        return 0 > g ? d : g > b ? f : e
    }
    for (var d = -1, e = 0, f = 1, g = [], h = 0; 10 > h; h++) g.push(new me.Vector2d);
    for (var k = [], h = 0; 5 > h; h++) k.push([]);
    me.collision = function() {
        var a = {
            quadTree: null,
            maxDepth: 4,
            maxChildren: 8,
            bounds: null,
            types: {
                NO_OBJECT: 0,
                PLAYER_OBJECT: 1,
                NPC_OBJECT: 2,
                ENEMY_OBJECT: 4,
                COLLECTABLE_OBJECT: 8,
                ACTION_OBJECT: 16,
                PROJECTILE_OBJECT: 32,
                WORLD_SHAPE: 64,
                USER: 128,
                ALL_OBJECT: 4294967295
            },
            init: function() {
                a.bounds = me.game.viewport.clone();
                a.quadTree = new me.QuadTree(a.bounds, a.maxChildren, a.maxDepth);
                me.event.subscribe(me.event.LEVEL_LOADED, function() {
                    a.bounds = me.game.world.clone();
                    a.quadTree.clear(a.bounds)
                })
            },
            ResponseObject: function() {
                this.b = this.a = null;
                this.overlapN = new me.Vector2d;
                this.overlapV = new me.Vector2d;
                this.bInA = this.aInB = !0;
                this.indexShapeB = this.indexShapeA = -1;
                this.overlap = Number.MAX_VALUE
            }
        };
        a.ResponseObject.prototype.clear =
            function() {
                this.bInA = this.aInB = !0;
                this.overlap = Number.MAX_VALUE;
                this.indexShapeB = this.indexShapeA = -1;
                return this
            };
        a.response = new a.ResponseObject;
        a.shouldCollide = function(a, c) {
            return a.body && c.body && 0 !== (a.body.collisionMask & c.body.collisionType) && 0 !== (a.body.collisionType & c.body.collisionMask)
        };
        a.check = function(c, b) {
            for (var d = 0, e = b || a.response, f = a.quadTree.retrieve(c), g = f.length, h; g--, h = f[g];)
                if (h !== c && a.shouldCollide(c, h) && c.getBounds().overlaps(h.getBounds())) {
                    var k = c.body.shapes.length,
                        z = h.body.shapes.length;
                    if (0 !== k && 0 !== z) {
                        var p = 0;
                        do {
                            var r = c.body.getShape(p),
                                x = 0;
                            do {
                                var w = h.body.getShape(x);
                                !0 === a["test" + r.shapeType + w.shapeType].call(this, c, r, h, w, e.clear()) && (d++, e.indexShapeA = p, e.indexShapeB = x, !1 !== c.onCollision(e, h) && c.body.respondToCollision.call(c.body, e), !1 !== h.onCollision(e, c) && h.body.respondToCollision.call(h.body, e));
                                x++
                            } while (x < z);
                            p++
                        } while (p < k)
                    }
                }
            return 0 < d
        };
        a.testPolygonPolygon = function(a, c, d, e, f) {
            var h = c.points,
                k = c.normals,
                l = k.length,
                z = e.points,
                p = e.normals,
                r = p.length;
            c = g.pop().copy(a.pos).add(a.ancestor._absPos).add(c.pos);
            e = g.pop().copy(d.pos).add(d.ancestor._absPos).add(e.pos);
            var x;
            for (x = 0; x < l; x++)
                if (b(c, e, h, z, k[x], f)) return g.push(c), g.push(e), !1;
            for (x = 0; x < r; x++)
                if (b(c, e, h, z, p[x], f)) return g.push(c), g.push(e), !1;
            f && (f.a = a, f.b = d, f.overlapV.copy(f.overlapN).scale(f.overlap));
            g.push(c);
            g.push(e);
            return !0
        };
        a.testEllipseEllipse = function(a, c, b, d, e) {
            var f = g.pop().copy(b.pos).add(b.ancestor._absPos).add(d.pos).sub(a.pos).add(a.ancestor._absPos).sub(c.pos);
            c = c.radius;
            d = d.radius;
            var h = c + d,
                k = h * h,
                l = f.length2();
            if (l > k) return g.push(f), !1;
            e && (k = Math.sqrt(l), e.a = a, e.b = b, e.overlap = h - k, e.overlapN.copy(f.normalize()), e.overlapV.copy(f).scale(e.overlap), e.aInB = c <= d && k <= d - c, e.bInA = d <= c && k <= c - d);
            g.push(f);
            return !0
        };
        a.testPolygonEllipse = function(a, b, e, h, k) {
            var l = g.pop().copy(e.pos).add(e.ancestor._absPos).add(h.pos).sub(a.pos).add(a.ancestor._absPos).sub(b.pos);
            h = h.radius;
            for (var s = h * h, A = b.points, z = b.edges, p = z.length, r = g.pop(), x = g.pop(), w = g.pop(), y = 0, C = 0; C < p; C++) {
                var E = C === p - 1 ? 0 : C + 1,
                    y = 0 === C ? p - 1 : C - 1,
                    D = 0,
                    F = null;
                r.copy(z[C]);
                w.copy(l).sub(A[C]);
                k && w.length2() > s && (k.aInB = !1);
                var B = c(r, w),
                    G = !0;
                if (B === d) {
                    E = null;
                    1 < p && (r.copy(z[y]), E = g.pop().copy(l).sub(A[y]), B = c(r, E), B !== f && (G = !1));
                    if (G) {
                        y = w.length();
                        if (y > h) return g.push(l), g.push(r), g.push(x), g.push(w), E && g.push(E), !1;
                        k && (k.bInA = !1, F = w.normalize(), D = h - y)
                    }
                    E && g.push(E)
                } else if (B === f) {
                    if (1 < p && (r.copy(z[E]), w.copy(l).sub(A[E]), B = c(r, w), B !== d && (G = !1)), G) {
                        y = w.length();
                        if (y > h) return g.push(l), g.push(r), g.push(x), g.push(w), !1;
                        k && (k.bInA = !1, F = w.normalize(), D = h - y)
                    }
                } else {
                    x.copy(b.normals[C]);
                    y = w.dotProduct(x);
                    B = Math.abs(y);
                    if ((1 === p || 0 < y) && B > h) return g.push(l), g.push(r), g.push(x), g.push(w), !1;
                    k && (F = x, D = h - y, 0 <= y || D < 2 * h) && (k.bInA = !1)
                }
                F && k && Math.abs(D) < Math.abs(k.overlap) && (k.overlap = D, k.overlapN.copy(F))
            }
            k && (k.a = a, k.b = e, k.overlapV.copy(k.overlapN).scale(k.overlap));
            g.push(l);
            g.push(r);
            g.push(x);
            g.push(w);
            return !0
        };
        a.testEllipsePolygon = function(c, b, d, e, f) {
            (c = a.testPolygonEllipse(d, e, c, b, f)) && f && (b = f.a, d = f.aInB, f.overlapN.negateSelf(), f.overlapV.negateSelf(), f.a = f.b, f.b = b, f.aInB = f.bInA, f.bInA = d);
            return c
        };
        return a
    }()
})();
(function() {
    me.Renderable = me.Rect.extend({
        init: function(a, b, c, d) {
            this.isRenderable = !0;
            this.GUID = void 0;
            this.floating = this.isPersistent = this.updateWhenPaused = this.alwaysUpdate = this.inViewport = !1;
            this.anchorPoint = new me.Vector2d(0.5, 0.5);
            this.alpha = 1;
            this.ancestor = void 0;
            this._bounds ? this._bounds.setShape(a, b, c, d) : this._bounds = new me.Rect(a, b, c, d);
            this._absPos ? this._absPos.set(a, b) : this._absPos = new me.Vector2d(a, b);
            this.pos ? this.pos.setMuted(a, b, 0).setCallback(this.updateBoundsPos.bind(this)) : this.pos =
                new me.ObservableVector3d(a, b, 0, {
                    onUpdate: this.updateBoundsPos.bind(this)
                });
            this._width = c;
            this._height = d;
            this.shapeType = "Rectangle";
            this.setOpacity(1)
        },
        getBounds: function() {
            return this._bounds
        },
        getOpacity: function() {
            return this.alpha
        },
        resizeBounds: function(a, b) {
            this._bounds.resize(a, b);
            return this._bounds
        },
        setOpacity: function(a) {
            "number" === typeof a && (this.alpha = a.clamp(0, 1), this.alpha !== this.alpha && (this.alpha = 1))
        },
        update: function() {
            return !1
        },
        updateBoundsPos: function(a, b) {
            this._bounds.pos.set(a, b);
            this.ancestor && this._bounds.pos.add(this.ancestor._absPos);
            return this._bounds
        },
        updateBounds: function() {
            console.warn("Deprecated: me.Renderable.updateBounds");
            return me.Rect.prototype.updateBounds.apply(this)
        },
        draw: function() {},
        destroy: function() {
            this.onDestroyEvent.apply(this, arguments)
        },
        onDestroyEvent: function() {}
    });
    Object.defineProperty(me.Renderable.prototype, "width", {
        get: function() {
            return this._width
        },
        set: function(a) {
            this.resizeBounds(a, this._height);
            this._width = a
        },
        configurable: !0
    });
    Object.defineProperty(me.Renderable.prototype,
        "height", {
            get: function() {
                return this._height
            },
            set: function(a) {
                this.resizeBounds(this._width, a);
                this._height = a
            },
            configurable: !0
        });
    me.Renderable.Error = me.Error.extend({
        init: function(a) {
            me.Error.prototype.init.apply(this, [a]);
            this.name = "me.Renderable.Error"
        }
    })
})();
(function() {
    me.Sprite = me.Renderable.extend({
        init: function(a, b, c) {
            this._scale = new me.Vector2d(1, 1);
            this.lastflipY = this.lastflipX = this.scaleFlag = !1;
            this.flipX(!!c.flipX);
            this.flipY(!!c.flipY);
            this.offset = new me.Vector2d;
            this.angle = c.rotation || 0;
            this._sourceAngle = 0;
            this.flickering = !1;
            this.flickerDuration = 0;
            this.flickercb = null;
            this.flickerState = !1;
            this.isSprite = !0;
            var d = c.image;
            if ("undefined" !== typeof c.region)
                if ("object" === typeof d && d.getRegion) {
                    var e = d.getRegion(c.region);
                    if (e) this.image = d.getTexture(),
                        this.offset.setV(e.offset), this._sourceAngle = e.angle, c.framewidth = c.framewidth || e.width, c.frameheight = c.frameheight || e.height;
                    else throw new me.Renderable.Error("Texture - region for " + c.region + " not found");
                } else throw new me.Renderable.Error("Texture - invalid texture atlas : " + d);
            else this.image = me.utils.getImage(d);
            me.Renderable.prototype.init.apply(this, [a, b, c.framewidth || this.image.width, c.frameheight || this.image.height]);
            c.anchorPoint && this.anchorPoint.set(c.anchorPoint.x, c.anchorPoint.y)
        },
        isFlickering: function() {
            return this.flickering
        },
        flicker: function(a, b) {
            this.flickerDuration = a;
            0 >= this.flickerDuration ? (this.flickering = !1, this.flickercb = null) : this.flickering || (this.flickercb = b, this.flickering = !0)
        },
        flipX: function(a) {
            a !== this.lastflipX && (this.lastflipX = a, this._scale.x = -this._scale.x, this.scaleFlag = 1 !== this._scale.x || 1 !== this._scale.y)
        },
        flipY: function(a) {
            a !== this.lastflipY && (this.lastflipY = a, this._scale.y = -this._scale.y, this.scaleFlag = 1 !== this._scale.x || 1 !== this._scale.y)
        },
        scale: function(a,
            b) {
            var c = "undefined" === typeof b ? a : b;
            0 < a && (this._scale.x = 0 > this._scale.x ? -a : a);
            0 < c && (this._scale.y = 0 > this._scale.y ? -c : c);
            this.scaleFlag = 1 !== this._scale.x || 1 !== this._scale.y;
            this.resizeBounds(this.width * a, this.height * c)
        },
        scaleV: function(a) {
            this.scale(a.x, a.y)
        },
        update: function(a) {
            return this.flickering ? (this.flickerDuration -= a, 0 > this.flickerDuration && (this.flickercb && this.flickercb(), this.flicker(-1)), !0) : !1
        },
        draw: function(a) {
            if (this.flickering && (this.flickerState = !this.flickerState, !this.flickerState)) return;
            var b = a.globalAlpha();
            a.setGlobalAlpha(b * this.getOpacity());
            var c = ~~this.pos.x,
                d = ~~this.pos.y,
                e = this.width,
                f = this.height;
            a.save();
            var g = e * this.anchorPoint.x,
                h = f * this.anchorPoint.y,
                c = c - g,
                d = d - h;
            if (this.scaleFlag || 0 !== this.angle || 0 !== this._sourceAngle) c += g, d += h, a.translate(c, d), 0 !== this.angle && a.rotate(this.angle), this.scaleFlag && a.scale(this._scale.x, this._scale.y), 0 !== this._sourceAngle ? (a.translate(-(c + g), -(d + h)), a.rotate(this._sourceAngle), c -= this.height, e = this.height, f = this.width) : (c = -g, d = -h);
            a.drawImage(this.image,
                this.offset.x, this.offset.y, e, f, c, d, e, f);
            a.restore();
            a.setGlobalAlpha(b)
        }
    })
})();
(function() {
    me.AnimationSheet = me.Sprite.extend({
        init: function(a, b, c) {
            this.animationpause = !1;
            this.animationspeed = 100;
            this.anim = {};
            this.current = this.resetAnim = null;
            this.dt = 0;
            this.animationspeed = 100;
            me.Sprite.prototype.init.apply(this, [a, b, c]);
            "undefined" !== typeof c.atlas ? (this.textureAtlas = c.atlas, this.atlasIndices = c.atlasIndices) : (this.textureAtlas = me.video.renderer.cache.get(me.utils.getImage(c.image), c).getAtlas(), this.atlasIndices = null);
            this.addAnimation("default", null);
            this.setCurrentAnimation("default")
        },
        addAnimation: function(a, b, c) {
            this.anim[a] = {
                name: a,
                frames: [],
                idx: 0,
                length: 0
            };
            null == b && (b = [], Object.keys(this.textureAtlas).forEach(function(a, c) {
                b[c] = c
            }));
            for (var d = 0, e = 0, f = b.length; e < f; e++) {
                var g = b[e],
                    g = "number" === typeof g || "string" === typeof g ? {
                        name: g,
                        delay: c || this.animationspeed
                    } : g,
                    h = g.name;
                if ("number" === typeof h) "undefined" !== typeof this.textureAtlas[h] && (this.anim[a].frames[e] = Object.assign({}, this.textureAtlas[h], g), d++);
                else {
                    if (null === this.atlasIndices) throw new me.Renderable.Error("string parameters for addAnimation are not allowed for standard spritesheet based Texture");
                    this.anim[a].frames[e] = Object.assign({}, this.textureAtlas[this.atlasIndices[h]], g);
                    d++
                }
            }
            this.anim[a].length = d
        },
        setCurrentAnimation: function(a, b, c) {
            if (this.anim[a]) this.current = this.anim[a], this.resetAnim = b || null, this.setAnimationFrame(this.current.idx), c || (this.dt = 0);
            else throw new me.Renderable.Error("animation id '" + a + "' not defined");
        },
        isCurrentAnimation: function(a) {
            return this.current.name === a
        },
        setAnimationFrame: function(a) {
            this.current.idx = (a || 0) % this.current.length;
            a = this.getAnimationFrameObjectByIndex(this.current.idx);
            this.offset = a.offset;
            this.width = a.width;
            this.height = a.height;
            this._sourceAngle = a.angle;
            a.anchorPoint && (this.anchorPoint = a.anchorPoint)
        },
        getCurrentAnimationFrame: function() {
            return this.current.idx
        },
        getAnimationFrameObjectByIndex: function(a) {
            return this.current.frames[a]
        },
        update: function(a) {
            if (this.animationpause || 1 >= this.current.length) return me.Sprite.prototype.update.apply(this, [a]);
            var b = 0,
                c = !1;
            this.dt += a;
            for (b = this.getAnimationFrameObjectByIndex(this.current.idx).delay; this.dt >= b;) {
                c = !0;
                this.dt -=
                    b;
                this.setAnimationFrame(this.current.idx + 1);
                if (0 === this.current.idx && this.resetAnim)
                    if ("string" === typeof this.resetAnim) this.setCurrentAnimation(this.resetAnim, null, !0);
                    else if (!1 === this.resetAnim()) {
                    this.setAnimationFrame(this.current.length - 1);
                    this.dt %= b;
                    break
                }
                b = this.getAnimationFrameObjectByIndex(this.current.idx).delay
            }
            return me.Sprite.prototype.update.apply(this, [a]) || c
        }
    })
})();
(function() {
    var a = Math.min,
        b = Math.max;
    me.Viewport = me.Renderable.extend({
        init: function(a, b, e, f) {
            me.Renderable.prototype.init.apply(this, [a, b, e - a, f - b]);
            this.AXIS = {
                NONE: 0,
                HORIZONTAL: 1,
                VERTICAL: 2,
                BOTH: 3
            };
            this.bounds = new me.Rect(-Infinity, -Infinity, Infinity, Infinity);
            this.offset = new me.Vector2d;
            this.target = null;
            this.follow_axis = this.AXIS.NONE;
            this._shake = {
                intensity: 0,
                duration: 0,
                axis: this.AXIS.BOTH,
                onComplete: null
            };
            this._fadeOut = {
                color: null,
                tween: null
            };
            this._fadeIn = {
                color: null,
                tween: null
            };
            this.setDeadzone(this.width /
                6, this.height / 6)
        },
        _followH: function(c) {
            var d = this.pos.x;
            c.x - this.pos.x > this.deadzone.right ? this.pos.x = ~~a(c.x - this.deadzone.right, this.bounds.width - this.width) : c.x - this.pos.x < this.deadzone.pos.x && (this.pos.x = ~~b(c.x - this.deadzone.pos.x, this.bounds.pos.x));
            return d !== this.pos.x
        },
        _followV: function(c) {
            var d = this.pos.y;
            c.y - this.pos.y > this.deadzone.bottom ? this.pos.y = ~~a(c.y - this.deadzone.bottom, this.bounds.height - this.height) : c.y - this.pos.y < this.deadzone.pos.y && (this.pos.y = ~~b(c.y - this.deadzone.pos.y,
                this.bounds.pos.y));
            return d !== this.pos.y
        },
        reset: function(a, b) {
            this.pos.x = a || 0;
            this.pos.y = b || 0;
            this.follow_axis = this.target = null
        },
        setDeadzone: function(a, b) {
            "undefined" === typeof this.deadzone && (this.deadzone = new me.Rect(0, 0, 0, 0));
            this.deadzone.pos.set(~~((this.width - a) / 2), ~~((this.height - b) / 2 - 0.25 * b));
            this.deadzone.resize(a, b);
            this.updateTarget()
        },
        resize: function(a, b) {
            me.Renderable.prototype.resize.apply(this, [a, b]);
            var e = me.levelDirector.getCurrentLevel();
            this.setBounds(0, 0, Math.max(a, e ? e.width : 0),
                Math.max(b, e ? e.height : 0));
            this.setDeadzone(a / 6, b / 6);
            this.moveTo(0, 0);
            this.update();
            me.event.publish(me.event.VIEWPORT_ONRESIZE, [this.width, this.height]);
            return this
        },
        setBounds: function(a, b, e, f) {
            this.bounds.pos.set(a, b);
            this.bounds.resize(e, f);
            this.moveTo(this.pos.x, this.pos.y)
        },
        follow: function(a, b) {
            if (a instanceof me.Entity) this.target = a.pos;
            else if (a instanceof me.Vector2d || a instanceof me.Vector3d) this.target = a;
            else throw new me.Renderable.Error("invalid target for viewport.follow");
            this.follow_axis =
                "undefined" === typeof b ? this.AXIS.BOTH : b;
            this.updateTarget()
        },
        move: function(a, b) {
            this.moveTo(~~(this.pos.x + a), ~~(this.pos.y + b))
        },
        moveTo: function(a, b) {
            this.pos.x = (~~a).clamp(this.bounds.pos.x, this.bounds.width - this.width);
            this.pos.y = (~~b).clamp(this.bounds.pos.y, this.bounds.height - this.height);
            me.event.publish(me.event.VIEWPORT_ONCHANGE, [this.pos])
        },
        updateTarget: function() {
            var a = !1;
            if (this.target) switch (this.follow_axis) {
                case this.AXIS.HORIZONTAL:
                    a = this._followH(this.target);
                    break;
                case this.AXIS.VERTICAL:
                    a =
                        this._followV(this.target);
                    break;
                case this.AXIS.BOTH:
                    a = this._followH(this.target), a = this._followV(this.target) || a
            }
            return a
        },
        update: function(a) {
            var b = this.updateTarget();
            if (0 < this._shake.duration) {
                this._shake.duration -= a;
                if (0 >= this._shake.duration) {
                    if (this._shake.duration = 0, this.offset.setZero(), "function" === typeof this._shake.onComplete) this._shake.onComplete()
                } else {
                    if (this._shake.axis === this.AXIS.BOTH || this._shake.axis === this.AXIS.HORIZONTAL) this.offset.x = (Math.random() - 0.5) * this._shake.intensity;
                    if (this._shake.axis === this.AXIS.BOTH || this._shake.axis === this.AXIS.VERTICAL) this.offset.y = (Math.random() - 0.5) * this._shake.intensity
                }
                b = !0
            }!0 === b && me.event.publish(me.event.VIEWPORT_ONCHANGE, [this.pos]);
            if (null != this._fadeIn.tween || null != this._fadeOut.tween) b = !0;
            return b
        },
        shake: function(a, b, e, f, g) {
            if (0 === this._shake.duration || !0 === g) this._shake.intensity = a, this._shake.duration = b, this._shake.axis = e || this.AXIS.BOTH, this._shake.onComplete = "function" === typeof f ? f : void 0
        },
        fadeOut: function(a, b, e) {
            this._fadeOut.color =
                me.pool.pull("me.Color").copy(a);
            this._fadeOut.tween = me.pool.pull("me.Tween", this._fadeOut.color).to({
                alpha: 0
            }, b || 1E3).onComplete(e || null);
            this._fadeOut.tween.isPersistent = !0;
            this._fadeOut.tween.start()
        },
        fadeIn: function(a, b, e) {
            this._fadeIn.color = me.pool.pull("me.Color").copy(a);
            a = this._fadeIn.color.alpha;
            this._fadeIn.color.alpha = 0;
            this._fadeIn.tween = me.pool.pull("me.Tween", this._fadeIn.color).to({
                alpha: a
            }, b || 1E3).onComplete(e || null);
            this._fadeIn.tween.isPersistent = !0;
            this._fadeIn.tween.start()
        },
        getWidth: function() {
            return this.width
        },
        getHeight: function() {
            return this.height
        },
        focusOn: function(a) {
            var b = a.getBounds();
            this.moveTo(a.pos.x + b.pos.x + b.width / 2, a.pos.y + b.pos.y + b.height / 2)
        },
        isVisible: function(a) {
            return a.overlaps(this)
        },
        localToWorld: function(a, b, e) {
            e = e || new me.Vector2d;
            return e.set(a, b).add(this.pos).sub(me.game.world.pos)
        },
        worldToLocal: function(a, b, e) {
            e = e || new me.Vector2d;
            return e.set(a, b).sub(this.pos).add(me.game.world.pos)
        },
        draw: function() {
            this._fadeIn.tween && (me.video.renderer.clearSurface(null, this._fadeIn.color), 1 ===
                this._fadeIn.color.alpha && (this._fadeIn.tween = null, me.pool.push(this._fadeIn.color), this._fadeIn.color = null));
            this._fadeOut.tween && (me.video.renderer.clearSurface(null, this._fadeOut.color), 0 === this._fadeOut.color.alpha && (this._fadeOut.tween = null, me.pool.push(this._fadeOut.color), this._fadeOut.color = null))
        }
    })
})();
(function() {
    me.GUI_Object = me.Sprite.extend({
        init: function(a, b, c) {
            this.isClickable = !0;
            this.holdThreshold = 250;
            this.hover = this.isHoldable = !1;
            this.holdTimeout = null;
            this.updated = !1;
            this.released = !0;
            me.Sprite.prototype.init.apply(this, [a, b, c]);
            this.floating = !0
        },
        update: function() {
            return this.updated ? (this.released || (this.updated = !1), !0) : !1
        },
        clicked: function(a) {
            if ((1 === a.which || me.device.touch) && this.isClickable) return this.updated = !0, this.released = !1, this.isHoldable && (null !== this.holdTimeout && me.timer.clearTimeout(this.holdTimeout),
                this.holdTimeout = me.timer.setTimeout(this.hold.bind(this), this.holdThreshold, !1), this.released = !1), this.onClick(a)
        },
        onClick: function() {
            return !1
        },
        enter: function(a) {
            this.hover = !0;
            return this.onOver(a)
        },
        onOver: function() {},
        leave: function(a) {
            this.hover = !1;
            this.release.call(this, a);
            return this.onOut(a)
        },
        onOut: function() {},
        release: function(a) {
            if (!1 === this.released) return this.released = !0, me.timer.clearTimeout(this.holdTimeout), this.onRelease(a)
        },
        onRelease: function() {
            return !1
        },
        hold: function() {
            me.timer.clearTimeout(this.holdTimeout);
            if (!this.released) this.onHold()
        },
        onHold: function() {},
        onActivateEvent: function() {
            me.input.registerPointerEvent("pointerdown", this, this.clicked.bind(this));
            me.input.registerPointerEvent("pointerup", this, this.release.bind(this));
            me.input.registerPointerEvent("pointercancel", this, this.release.bind(this));
            me.input.registerPointerEvent("pointerenter", this, this.enter.bind(this));
            me.input.registerPointerEvent("pointerleave", this, this.leave.bind(this))
        },
        onDeactivateEvent: function() {
            me.input.releasePointerEvent("pointerdown",
                this);
            me.input.releasePointerEvent("pointerup", this);
            me.input.releasePointerEvent("pointercancel", this);
            me.input.releasePointerEvent("pointerenter", this);
            me.input.releasePointerEvent("pointerleave", this);
            me.timer.clearTimeout(this.holdTimeout)
        }
    })
})();
(function() {
    var a = function(a, b) {
            this.removeChildNow(a, b)
        },
        b = 0;
    me.Container = me.Renderable.extend({
        init: function(a, b, e, f) {
            this.pendingSort = null;
            this.transform = new me.Matrix2d;
            this._root = !1;
            me.Renderable.prototype.init.apply(this, [a || 0, b || 0, e || Infinity, f || Infinity]);
            this.children = [];
            this.sortOn = me.game.sortOn;
            this.autoDepth = this.autoSort = !0;
            this.drawCount = 0;
            this.childBounds = this.getBounds().clone();
            this.transform.identity()
        },
        addChild: function(a, b) {
            "undefined" !== typeof a.ancestor ? a.ancestor.removeChildNow(a) :
                a.isRenderable && (a.GUID = me.utils.createGUID(a.id));
            a.ancestor = this;
            this.children.push(a);
            "undefined" !== typeof a.pos && ("number" === typeof b ? a.pos.z = b : !0 === this.autoDepth && (a.pos.z = this.children.length));
            !0 === this.autoSort && this.sort();
            if ("function" === typeof a.onActivateEvent && this.isAttachedToRoot()) a.onActivateEvent();
            return a
        },
        addChildAt: function(a, b) {
            if (0 <= b && b < this.children.length) {
                "undefined" !== typeof a.ancestor ? a.ancestor.removeChildNow(a) : a.isRenderable && (a.GUID = me.utils.createGUID());
                a.ancestor =
                    this;
                this.children.splice(b, 0, a);
                if ("function" === typeof a.onActivateEvent && this.isAttachedToRoot()) a.onActivateEvent();
                return a
            }
            throw new me.Container.Error("Index (" + b + ") Out Of Bounds for addChildAt()");
        },
        swapChildren: function(a, b) {
            var e = this.getChildIndex(a),
                f = this.getChildIndex(b);
            if (-1 !== e && -1 !== f) {
                var g = a.pos.z;
                a.pos.z = b.pos.z;
                b.pos.z = g;
                this.children[e] = b;
                this.children[f] = a
            } else throw new me.Container.Error(a + " Both the supplied childs must be a child of the caller " + this);
        },
        getChildAt: function(a) {
            if (0 <=
                a && a < this.children.length) return this.children[a];
            throw new me.Container.Error("Index (" + a + ") Out Of Bounds for getChildAt()");
        },
        getChildIndex: function(a) {
            return this.children.indexOf(a)
        },
        hasChild: function(a) {
            return this === a.ancestor
        },
        getChildByProp: function(a, b) {
            for (var e = [], f = this.children.length - 1; 0 <= f; f--) {
                var g = this.children[f],
                    h = g,
                    k = h[a];
                b instanceof RegExp && "string" === typeof k ? b.test(k) && e.push(h) : k === b && e.push(h);
                g instanceof me.Container && (e = e.concat(g.getChildByProp(a, b)))
            }
            return e
        },
        getChildByType: function(a) {
            for (var b = [], e = this.children.length - 1; 0 <= e; e--) {
                var f = this.children[e];
                f instanceof a && b.push(f);
                f instanceof me.Container && (b = b.concat(f.getChildByType(a)))
            }
            return b
        },
        getChildByName: function(a) {
            return this.getChildByProp("name", a)
        },
        getChildByGUID: function(a) {
            a = this.getChildByProp("GUID", a);
            return 0 < a.length ? a[0] : null
        },
        updateChildBounds: function() {
            this.childBounds.pos.set(Infinity, Infinity);
            this.childBounds.resize(-Infinity, -Infinity);
            for (var a, b = this.children.length; b--, a = this.children[b];) a.isRenderable &&
                (a = a instanceof me.Container ? a.childBounds : a.getBounds(), null !== a && this.childBounds.union(a));
            return this.childBounds
        },
        isAttachedToRoot: function() {
            if (this._root) return !0;
            for (var a = this.ancestor; a;) {
                if (!0 === a._root) return !0;
                a = a.ancestor
            }
            return !1
        },
        updateBoundsPos: function(a, b) {
            me.Renderable.prototype.updateBoundsPos.apply(this, [a, b]);
            this._absPos.set(a, b);
            this.ancestor && this._absPos.add(this.ancestor._absPos);
            for (var e = this.children.length, f; e--, f = this.children[e];) f.isRenderable && f.updateBoundsPos(f.pos.x,
                f.pos.y);
            return this._bounds
        },
        onActivateEvent: function() {
            for (var a = this.children.length; a--, this.children[a];) {
                var b = this.children[a];
                if ("function" === typeof b.onActivateEvent) b.onActivateEvent()
            }
        },
        removeChild: function(b, d) {
            if (this.hasChild(b)) a.defer(this, b, d);
            else throw new me.Container.Error("Child is not mine.");
        },
        removeChildNow: function(a, b) {
            if (this.hasChild(a) && 0 <= this.getChildIndex(a)) {
                if ("function" === typeof a.onDeactivateEvent) a.onDeactivateEvent();
                b || ("function" === typeof a.destroy && a.destroy(),
                    me.pool.push(a));
                var e = this.getChildIndex(a);
                0 <= e && (this.children.splice(e, 1), a.ancestor = void 0)
            }
        },
        setChildsProperty: function(a, b, e) {
            for (var f = this.children.length; 0 <= f; f--) {
                var g = this.children[f];
                !0 === e && g instanceof me.Container && g.setChildsProperty(a, b, e);
                g[a] = b
            }
        },
        moveUp: function(a) {
            var b = this.getChildIndex(a);
            0 <= b - 1 && this.swapChildren(a, this.getChildAt(b - 1))
        },
        moveDown: function(a) {
            var b = this.getChildIndex(a);
            0 <= b && b + 1 < this.children.length && this.swapChildren(a, this.getChildAt(b + 1))
        },
        moveToTop: function(a) {
            var b =
                this.getChildIndex(a);
            0 < b && (this.children.splice(0, 0, this.children.splice(b, 1)[0]), a.pos.z = this.children[1].pos.z + 1)
        },
        moveToBottom: function(a) {
            var b = this.getChildIndex(a);
            0 <= b && b < this.children.length - 1 && (this.children.splice(this.children.length - 1, 0, this.children.splice(b, 1)[0]), a.pos.z = this.children[this.children.length - 2].pos.z - 1)
        },
        sort: function(a) {
            if (!this.pendingSort) {
                if (!0 === a)
                    for (var b = this.children.length, e; b--, e = this.children[b];) e instanceof me.Container && e.sort(a);
                this.pendingSort = function(a) {
                    a.children.sort(a["_sort" +
                        a.sortOn.toUpperCase()]);
                    a.pendingSort = null;
                    me.game.repaint()
                }.defer(this, this)
            }
        },
        onDeactivateEvent: function() {
            for (var a = this.children.length; a--, this.children[a];) {
                var b = this.children[a];
                if ("function" === typeof b.onDeactivateEvent) b.onDeactivateEvent()
            }
        },
        _sortZ: function(a, b) {
            return b.pos && a.pos ? b.pos.z - a.pos.z : a.pos ? -Infinity : Infinity
        },
        _sortReverseZ: function(a, b) {
            return a.pos && b.pos ? a.pos.z - b.pos.z : a.pos ? Infinity : -Infinity
        },
        _sortX: function(a, b) {
            if (!b.pos || !a.pos) return a.pos ? -Infinity : Infinity;
            var e =
                b.pos.z - a.pos.z;
            return e ? e : b.pos.x - a.pos.x
        },
        _sortY: function(a, b) {
            if (!b.pos || !a.pos) return a.pos ? -Infinity : Infinity;
            var e = b.pos.z - a.pos.z;
            return e ? e : b.pos.y - a.pos.y
        },
        destroy: function() {
            this.pendingSort && (clearTimeout(this.pendingSort), this.pendingSort = null);
            for (var a = this.children.length, b; 0 <= a; b = this.children[--a]) b && !b.isPersistent && this.removeChildNow(b);
            this.transform.identity()
        },
        update: function(a) {
            me.Renderable.prototype.update.apply(this, [a]);
            var d = !1,
                e = !1,
                f = me.state.isPaused(),
                g = me.game.viewport;
            this._absPos.setV(this.pos);
            this.ancestor && this._absPos.add(this.ancestor._absPos);
            for (var h = this.children.length, k; h--, k = this.children[h];)
                if (!f || k.updateWhenPaused) k.isRenderable ? ((e = 0 < b || k.floating) && b++, k.inViewport = e || g.isVisible(k.getBounds()), d = (k.inViewport || k.alwaysUpdate) && k.update(a) || d, k._absPos.setV(this._absPos).add(k.pos), 0 < b && b--) : d = k.update(a) || d;
            return d
        },
        draw: function(a, b) {
            var e = !1,
                f = !1,
                g = a.globalAlpha();
            this.drawCount = 0;
            this.transform.isIdentity() ? a.translate(this.pos.x, this.pos.y) :
                (f = !0, a.save(), a.transform(this.transform));
            a.setGlobalAlpha(g * this.getOpacity());
            for (var h = this.children.length, k; h--, k = this.children[h];) e = k.floating, (k.inViewport || e) && k.isRenderable && (e && (a.save(), a.resetTransform()), k.draw(a, b), e && a.restore(), this.drawCount++);
            f ? a.restore() : (a.translate(-this.pos.x, -this.pos.y), a.setGlobalAlpha(g))
        }
    });
    me.Container.Error = me.Renderable.Error.extend({
        init: function(a) {
            me.Renderable.Error.prototype.init.apply(this, [a]);
            this.name = "me.Container.Error"
        }
    })
})();
(function() {
    me.Entity = me.Renderable.extend({
        init: function(a, b, c) {
            this.renderable = null;
            if ("number" !== typeof c.width || "number" !== typeof c.height) throw new me.Entity.Error("height and width properties are mandatory when passing settings parameters to an object entity");
            me.Renderable.prototype.init.apply(this, [a, b, c.width, c.height]);
            c.image && (this.renderable = new me.AnimationSheet(0, 0, {
                image: c.image,
                framewidth: ~~(c.framewidth || c.width),
                frameheight: ~~(c.frameheight || c.height),
                spacing: ~~c.spacing,
                margin: ~~c.margin,
                anchorPoint: c.anchorPoint
            }));
            c.anchorPoint && this.anchorPoint.set(c.anchorPoint.x, c.anchorPoint.y);
            this.name = c.name || "";
            this.type = c.type || "";
            this.id = c.id || "";
            this.alive = !0;
            a = Array.isArray(c.shapes) ? c.shapes : [new me.Rect(0, 0, this.width, this.height)];
            this.body ? this.body.init(this, a) : this.body = new me.Body(this, a);
            a = this.body.updateBounds();
            0 === this.width && 0 === this.height && this.resize(a.width, a.height);
            "undefined" !== typeof c.collisionMask && this.body.setCollisionMask(c.collisionMask);
            if ("undefined" !== typeof c.collisionType)
                if ("undefined" !==
                    typeof me.collision.types[c.collisionType]) this.body.collisionType = me.collision.types[c.collisionType];
                else throw new me.Entity.Error("Invalid value for the collisionType property");
        },
        distanceTo: function(a) {
            var b = this.getBounds(),
                c = a.getBounds();
            a = b.pos.x + b.width / 2 - (c.pos.x + c.width / 2);
            b = b.pos.y + b.height / 2 - (c.pos.y + c.height / 2);
            return Math.sqrt(a * a + b * b)
        },
        distanceToPoint: function(a) {
            var b = this.getBounds(),
                c = b.pos.x + b.width / 2 - a.x;
            a = b.pos.y + b.height / 2 - a.y;
            return Math.sqrt(c * c + a * a)
        },
        angleTo: function(a) {
            var b =
                this.getBounds();
            a = a.getBounds();
            return Math.atan2(a.pos.y + a.height / 2 - (b.pos.y + b.height / 2), a.pos.x + a.width / 2 - (b.pos.x + b.width / 2))
        },
        angleToPoint: function(a) {
            var b = this.getBounds();
            return Math.atan2(a.y - (b.pos.y + b.height / 2), a.x - (b.pos.x + b.width / 2))
        },
        resizeBounds: function(a, b) {
            this._bounds.resize(a, b)
        },
        update: function(a) {
            return this.renderable ? this.renderable.update(a) : me.Renderable.prototype.update.apply(this, [a])
        },
        updateBoundsPos: function(a, b) {
            var c = this.body.pos;
            me.Renderable.prototype.updateBoundsPos.apply(this, [a + c.x, b + c.y]);
            return this._bounds
        },
        onBodyUpdate: function(a, b, c) {
            this._bounds.pos.setV(this.pos).add(a);
            this.ancestor && this._bounds.pos.add(this.ancestor._absPos);
            this._bounds.resize(b, c)
        },
        draw: function(a) {
            if (this.renderable) {
                var b = ~~(0.5 + this.pos.x + this.body.pos.x + this.anchorPoint.x * this.body.width),
                    c = ~~(0.5 + this.pos.y + this.body.pos.y + this.anchorPoint.y * this.body.height);
                a.translate(b, c);
                this.renderable.draw(a);
                a.translate(-b, -c)
            }
        },
        destroy: function() {
            this.renderable && (this.renderable.destroy.apply(this.renderable,
                arguments), this.renderable = null);
            this.body.destroy.apply(this.body, arguments);
            this.body = null
        },
        onDeactivateEvent: function() {
            if (this.renderable && this.renderable.onDeactivateEvent) this.renderable.onDeactivateEvent()
        },
        onCollision: function() {
            return !1
        }
    });
    me.Entity.Error = me.Renderable.Error.extend({
        init: function(a) {
            me.Renderable.Error.prototype.init.apply(this, [a]);
            this.name = "me.Entity.Error"
        }
    })
})();
(function() {
    me.ScreenObject = me.Object.extend({
        init: function() {},
        reset: function() {
            me.game.reset();
            this.onResetEvent.apply(this, arguments)
        },
        destroy: function() {
            this.onDestroyEvent.apply(this, arguments)
        },
        onResetEvent: function() {},
        onDestroyEvent: function() {}
    });
    (function() {
        var a = 0,
            b = 1E3 / 60,
            c = me.agent.prefixed("requestAnimationFrame"),
            d = me.agent.prefixed("cancelAnimationFrame") || me.agent.prefixed("cancelRequestAnimationFrame");
        c && d || (c = function(c) {
            var d = window.performance.now(),
                g = Math.max(0, b - (d - a)),
                h = window.setTimeout(function() {
                    c(d +
                        g)
                }, g);
            a = d + g;
            return h
        }, d = function(a) {
            window.clearTimeout(a)
        });
        window.requestAnimationFrame = c;
        window.cancelAnimationFrame = d
    })();
    me.state = function() {
        function a() {
            -1 === f && -1 !== e && (me.timer.reset(), f = window.requestAnimationFrame(b))
        }

        function b(a) {
            me.game.update(a);
            me.game.draw(); - 1 !== f && (f = window.requestAnimationFrame(b))
        }

        function c(b) {
            window.cancelAnimationFrame(f);
            f = -1;
            h[e] && h[e].screen.destroy();
            h[b] && (e = b, h[e].screen.reset.apply(h[e].screen, n), a(), m && m(), me.game.repaint())
        }
        var d = {},
            e = -1,
            f = -1,
            g = !1,
            h = {},
            k = "",
            l = 0,
            m = null,
            n = null,
            q = 0;
        d.LOADING = 0;
        d.MENU = 1;
        d.READY = 2;
        d.PLAY = 3;
        d.GAMEOVER = 4;
        d.GAME_END = 5;
        d.SCORE = 6;
        d.CREDITS = 7;
        d.SETTINGS = 8;
        d.USER = 100;
        d.onPause = null;
        d.onResume = null;
        d.onStop = null;
        d.onRestart = null;
        d.init = function() {
            d.set(d.LOADING, new me.DefaultLoadingScreen)
        };
        d.stop = function(a) {
            if (e !== d.LOADING && d.isRunning() && (window.cancelAnimationFrame(f), f = -1, !0 === a && me.audio.pauseTrack(), q = window.performance.now(), me.event.publish(me.event.STATE_STOP), "function" === typeof d.onStop)) d.onStop()
        };
        d.pause =
            function(a) {
                if (e !== d.LOADING && !d.isPaused() && (g = !0, !0 === a && me.audio.pauseTrack(), q = window.performance.now(), me.event.publish(me.event.STATE_PAUSE), "function" === typeof d.onPause)) d.onPause()
            };
        d.restart = function(b) {
            if (!d.isRunning() && (a(), !0 === b && me.audio.resumeTrack(), q = window.performance.now() - q, me.game.repaint(), me.event.publish(me.event.STATE_RESTART, [q]), "function" === typeof d.onRestart)) d.onRestart()
        };
        d.resume = function(a) {
            if (d.isPaused() && (g && -1 !== e && (me.timer.reset(), g = !1), !0 === a && me.audio.resumeTrack(),
                    q = window.performance.now() - q, me.event.publish(me.event.STATE_RESUME, [q]), "function" === typeof d.onResume)) d.onResume()
        };
        d.isRunning = function() {
            return -1 !== f
        };
        d.isPaused = function() {
            return g
        };
        d.set = function(a, b) {
            h[a] = {};
            h[a].screen = b;
            h[a].transition = !0
        };
        d.current = function() {
            return h[e].screen
        };
        d.transition = function(a, b, c) {
            "fade" === a && (k = b, l = c)
        };
        d.setTransition = function(a, b) {
            h[a].transition = b
        };
        d.change = function(a) {
            if ("undefined" === typeof h[a]) throw new me.Error("Undefined ScreenObject for state '" + a + "'");
            d.isCurrent(a) || (n = null, 1 < arguments.length && (n = Array.prototype.slice.call(arguments, 1)), l && h[a].transition ? (m = function() {
                me.game.viewport.fadeOut(k, l)
            }, me.game.viewport.fadeIn(k, l, function() {
                c.defer(this, a)
            })) : c.defer(this, a))
        };
        d.isCurrent = function(a) {
            return e === a
        };
        return d
    }()
})();
(function() {
    var a = me.Renderable.extend({
            init: function(a, b, c) {
                me.Renderable.prototype.init.apply(this, [a.x, a.y, b, c]);
                this.invalidate = !1;
                this.barHeight = 4;
                this.progress = 0
            },
            onProgressUpdate: function(a) {
                this.progress = ~~(a * this.width);
                this.invalidate = !0
            },
            update: function() {
                return !0 === this.invalidate ? (this.invalidate = !1, !0) : !1
            },
            draw: function(a) {
                a.setColor("black");
                a.fillRect(0, this.height / 2 - this.barHeight / 2, this.width, this.barHeight);
                a.setColor("#55aa00");
                a.fillRect(2, this.height / 2 - this.barHeight / 2, this.progress,
                    this.barHeight);
                a.setColor("white")
            }
        }),
        b = me.Renderable.extend({
            init: function(a, b, c) {
                me.Renderable.prototype.init.apply(this, [b, c, 100, 85]);
                this.iconCanvas = a;
                a = me.video.renderer.getContext2d(this.iconCanvas);
                a.translate(this.pos.x, this.pos.y);
                a.beginPath();
                a.moveTo(0.7, 48.9);
                a.bezierCurveTo(10.8, 68.9, 38.4, 75.8, 62.2, 64.5);
                a.bezierCurveTo(86.1, 53.1, 97.2, 27.7, 87, 7.7);
                a.lineTo(87, 7.7);
                a.bezierCurveTo(89.9, 15.4, 73.9, 30.2, 50.5, 41.4);
                a.bezierCurveTo(27.1, 52.5, 5.2, 55.8, 0.7, 48.9);
                a.lineTo(0.7, 48.9);
                a.lineTo(0.7,
                    48.9);
                a.closePath();
                a.fillStyle = "rgb(255, 255, 255)";
                a.fill();
                a.beginPath();
                a.moveTo(84, 7);
                a.bezierCurveTo(87.6, 14.7, 72.5, 30.2, 50.2, 41.6);
                a.bezierCurveTo(27.9, 53, 6.9, 55.9, 3.2, 48.2);
                a.bezierCurveTo(-0.5, 40.4, 14.6, 24.9, 36.9, 13.5);
                a.bezierCurveTo(59.2, 2.2, 80.3, -0.8, 84, 7);
                a.lineTo(84, 7);
                a.closePath();
                a.lineWidth = 5.3;
                a.strokeStyle = "rgb(255, 255, 255)";
                a.lineJoin = "miter";
                a.miterLimit = 4;
                a.stroke()
            },
            draw: function(a) {
                a.drawImage(this.iconCanvas, 0, 0)
            }
        }),
        c = me.Renderable.extend({
            init: function(a, b) {
                me.Renderable.prototype.init.apply(this, [0, 0, a, b]);
                this.logo1 = new me.Font("century gothic", 32, "white", "middle");
                this.logo2 = new me.Font("century gothic", 32, "#55aa00", "middle");
                this.logo2.bold();
                this.logo1.textBaseline = this.logo2.textBaseline = "alphabetic"
            },
            draw: function(a) {
                var b = this.logo1.measureText(a, "melon").width,
                    c = (this.width - b - this.logo2.measureText(a, "JS").width) / 2,
                    g = this.height / 2 + this.logo2.measureText(a, "melon").height;
                this.logo1.draw(a, "melon", c, g);
                this.logo2.draw(a, "JS", c + b, g)
            }
        });
    me.DefaultLoadingScreen = me.ScreenObject.extend({
        onResetEvent: function() {
            me.game.world.addChild(new me.ColorLayer("background",
                "#202020", 0), 0);
            var d = new a(new me.Vector2d, me.video.renderer.getWidth(), me.video.renderer.getHeight());
            this.loaderHdlr = me.event.subscribe(me.event.LOADER_PROGRESS, d.onProgressUpdate.bind(d));
            this.resizeHdlr = me.event.subscribe(me.event.VIEWPORT_ONRESIZE, d.resize.bind(d));
            me.game.world.addChild(d, 1);
            this.iconCanvas = me.video.createCanvas(me.game.viewport.width, me.game.viewport.height, !1);
            d = new b(this.iconCanvas, (me.video.renderer.getWidth() - 100) / 2, me.video.renderer.getHeight() / 2 - d.barHeight / 2 - 90);
            me.game.world.addChild(d,
                1);
            me.game.world.addChild(new c(me.video.renderer.getWidth(), me.video.renderer.getHeight()), 1)
        },
        onDestroyEvent: function() {
            me.event.unsubscribe(this.loaderHdlr);
            me.event.unsubscribe(this.resizeHdlr);
            this.loaderHdlr = this.resizeHdlr = null
        }
    })
})();
(function() {
    me.loader = function() {
        function a() {
            m === l ? e.onload ? (clearTimeout(n), setTimeout(function() {
                e.onload();
                me.event.publish(me.event.LOADER_COMPLETE)
            }, 300)) : console.error("no load callback defined") : n = setTimeout(a, 100)
        }

        function b(a, b, c) {
            function d(b) {
                g[a.name] = b;
                "tmx" === a.type && me.levelDirector.addTMXLevel(a.name)
            }
            if (a.data) d(a.data), b();
            else {
                var m = new XMLHttpRequest,
                    f = me.utils.getFileExtension(a.src);
                m.overrideMimeType && ("json" === f ? m.overrideMimeType("application/json") : m.overrideMimeType("text/xml"));
                m.open("GET", a.src + e.nocache, !0);
                m.ontimeout = c;
                m.onreadystatechange = function() {
                    if (4 === m.readyState)
                        if (200 === m.status || 0 === m.status && m.responseText) {
                            var a = null;
                            switch (f) {
                                case "xml":
                                case "tmx":
                                case "tsx":
                                    if (me.device.ua.match(/msie/i) || !m.responseXML)
                                        if (window.DOMParser) a = (new DOMParser).parseFromString(m.responseText, "text/xml");
                                        else throw new e.Error("XML file format loading not supported, use the JSON file format instead");
                                    else a = m.responseXML;
                                    var g = me.TMXUtils.parse(a);
                                    switch (f) {
                                        case "tmx":
                                            a = g.map;
                                            break;
                                        case "tsx":
                                            a = g.tilesets[0]
                                    }
                                    break;
                                case "json":
                                    a = JSON.parse(m.responseText);
                                    break;
                                default:
                                    throw new e.Error("TMX file format " + f + "not supported !");
                            }
                            d(a);
                            b()
                        } else c()
                };
                m.send(null)
            }
        }

        function c(a, b, c) {
            var d = new XMLHttpRequest;
            d.overrideMimeType && d.overrideMimeType("application/json");
            d.open("GET", a.src + e.nocache, !0);
            d.ontimeout = c;
            d.onreadystatechange = function() {
                4 === d.readyState && (200 === d.status || 0 === d.status && d.responseText ? (k[a.name] = JSON.parse(d.responseText), b()) : c())
            };
            d.send(null)
        }

        function d(a,
            b, c) {
            var d = new XMLHttpRequest;
            d.open("GET", a.src + e.nocache, !0);
            d.responseType = "arraybuffer";
            d.onerror = c;
            d.onload = function() {
                var c = d.response;
                if (c) {
                    for (var c = new Uint8Array(c), e = [], m = 0; m < c.byteLength; m++) e[m] = String.fromCharCode(c[m]);
                    h[a.name] = e.join("");
                    b()
                }
            };
            d.send()
        }
        var e = {},
            f = {},
            g = {},
            h = {},
            k = {},
            l = 0,
            m = 0,
            n = 0;
        e.nocache = "";
        e.onload = void 0;
        e.onProgress = void 0;
        e.Error = me.Error.extend({
            init: function(a) {
                me.Error.prototype.init.apply(this, [a]);
                this.name = "me.loader.Error"
            }
        });
        e.onResourceLoaded = function(a) {
            m++;
            var b = e.getLoadProgress();
            if (e.onProgress) e.onProgress(b, a);
            me.event.publish(me.event.LOADER_PROGRESS, [b, a])
        };
        e.onLoadingError = function(a) {
            throw new e.Error("Failed loading resource " + a.src);
        };
        e.setNocache = function(a) {
            e.nocache = a ? "?" + ~~(1E7 * Math.random()) : ""
        };
        e.preload = function(b, c, d) {
            for (var m = 0; m < b.length; m++) l += e.load(b[m], e.onResourceLoaded.bind(e, b[m]), e.onLoadingError.bind(e, b[m]));
            "undefined" !== typeof c && (e.onload = c);
            !1 !== d && me.state.change(me.state.LOADING);
            a()
        };
        e.load = function(a, m, g) {
            switch (a.type) {
                case "binary":
                    return d.call(this,
                        a, m, g), 1;
                case "image":
                    return f[a.name] = new Image, f[a.name].onload = m, f[a.name].onerror = g, f[a.name].src = a.src + e.nocache, 1;
                case "json":
                    return c.call(this, a, m, g), 1;
                case "tmx":
                case "tsx":
                    return b.call(this, a, m, g), 1;
                case "audio":
                    return me.audio.load(a, !!a.stream, m, g), 1;
                default:
                    throw new e.Error("load : unknown or invalid resource type : " + a.type);
            }
        };
        e.unload = function(a) {
            switch (a.type) {
                case "binary":
                    if (!(a.name in h)) return !1;
                    delete h[a.name];
                    return !0;
                case "image":
                    if (!(a.name in f)) return !1;
                    "function" ===
                    typeof f[a.name].dispose && f[a.name].dispose();
                    delete f[a.name];
                    return !0;
                case "json":
                    if (!(a.name in k)) return !1;
                    delete k[a.name];
                    return !0;
                case "tmx":
                case "tsx":
                    if (!(a.name in g)) return !1;
                    delete g[a.name];
                    return !0;
                case "audio":
                    return me.audio.unload(a.name);
                default:
                    throw new e.Error("unload : unknown or invalid resource type : " + a.type);
            }
        };
        e.unloadAll = function() {
            for (var a in h) h.hasOwnProperty(a) && e.unload({
                name: a,
                type: "binary"
            });
            for (a in f) f.hasOwnProperty(a) && e.unload({
                name: a,
                type: "image"
            });
            for (a in g) g.hasOwnProperty(a) &&
                e.unload({
                    name: a,
                    type: "tmx"
                });
            for (a in k) k.hasOwnProperty(a) && e.unload({
                name: a,
                type: "json"
            });
            me.audio.unloadAll()
        };
        e.getTMX = function(a) {
            a = "" + a;
            return a in g ? g[a] : null
        };
        e.getBinary = function(a) {
            a = "" + a;
            return a in h ? h[a] : null
        };
        e.getImage = function(a) {
            a = "" + a;
            return a in f ? f[a] : null
        };
        e.getJSON = function(a) {
            a = "" + a;
            return a in k ? k[a] : null
        };
        e.getLoadProgress = function() {
            return m / l
        };
        return e
    }()
})();
(function() {
    var a = ["ex", "em", "pt", "px"],
        b = [12, 24, 0.75, 1];
    me.Font = me.Renderable.extend({
        init: function(a, b, e, f) {
            this.fontSize = new me.Vector2d;
            this.fillStyle = (new me.Color).copy(e);
            this.strokeStyle = new me.Color(0, 0, 0);
            this.lineWidth = 1;
            this.textAlign = f || "left";
            this.textBaseline = "top";
            this.lineHeight = 1;
            me.Renderable.prototype.init.apply(this, [0, 0, 0, 0]);
            this.setFont(a, b, e, f);
            this.gid || (this.gid = me.utils.createGUID())
        },
        bold: function() {
            this.font = "bold " + this.font
        },
        italic: function() {
            this.font = "italic " + this.font
        },
        setFont: function(c, d, e, f) {
            c = c.split(",").map(function(a) {
                a = a.trim();
                return /(^".*"$)|(^'.*'$)/.test(a) ? a : '"' + a + '"'
            });
            if ("number" === typeof d) this.fontSize.y = d, d += "px";
            else {
                var g = d.match(/([-+]?[\d.]*)(.*)/);
                this.fontSize.y = parseFloat(g[1]);
                g[2] ? this.fontSize.y *= b[a.indexOf(g[2])] : d += "px"
            }
            this.height = this.fontSize.y;
            this.font = d + " " + c.join(",");
            "undefined" !== typeof e && this.fillStyle.copy(e);
            f && (this.textAlign = f)
        },
        measureText: function(a, b) {
            var e = a.fontContext2D;
            e.font = this.font;
            e.fillStyle = this.fillStyle.toRGBA();
            e.textAlign = this.textAlign;
            e.textBaseline = this.textBaseline;
            this.height = this.width = 0;
            for (var f = ("" + b).split("\n"), g = 0; g < f.length; g++) this.width = Math.max(e.measureText(f[g].trimRight()).width, this.width), this.height += this.fontSize.y * this.lineHeight;
            return {
                width: this.width,
                height: this.height
            }
        },
        draw: function(a, b, e, f) {
            var g = a.globalAlpha();
            a.setGlobalAlpha(g * this.getOpacity());
            a.drawFont(this._drawFont(a.fontContext2D, b, ~~e, ~~f, !1));
            a.setGlobalAlpha(g)
        },
        drawStroke: function(a, b, e, f) {
            var g = a.globalAlpha();
            a.setGlobalAlpha(g * this.getOpacity());
            a.drawFont(this._drawFont(a.fontContext2D, b, ~~e, ~~f, !0));
            a.setGlobalAlpha(g)
        },
        _drawFont: function(a, b, e, f, g) {
            a.font = this.font;
            a.fillStyle = this.fillStyle.toRGBA();
            g && (a.strokeStyle = this.strokeStyle.toRGBA(), a.lineWidth = this.lineWidth);
            a.textAlign = this.textAlign;
            a.textBaseline = this.textBaseline;
            b = ("" + b).split("\n");
            for (var h = "", k = 0, l = f, m = this.fontSize.y * this.lineHeight, n = 0; n < b.length; n++) h = b[n].trimRight(), k = Math.max(k, a.measureText(h).width), a[g ? "strokeText" : "fillText"](h,
                e, f), f += m;
            a = "right" === this.textAlign ? e - k : "center" === this.textAlign ? e - ~~(k / 2) : e;
            l = 0 === this.textBaseline.search(/^(top|hanging)$/) ? l : "middle" === this.textBaseline ? l - ~~(m / 2) : l - m;
            return this._bounds.setShape(~~a, ~~l, ~~(k + 0.5), ~~(b.length * m + 0.5))
        }
    })
})();
(function() {
    me.BitmapFont = me.Font.extend({
        init: function(a, b, c, d) {
            this.sSize = new me.Vector2d;
            this.charCount = 0;
            me.Font.prototype.init.apply(this, [a, b.x || b, "#000000"]);
            this.firstChar = d || 32;
            this.loadFontMetrics(a, b);
            this.textAlign = "left";
            this.textBaseline = "top";
            c && this.resize(c)
        },
        loadFontMetrics: function(a, b) {
            this.font = me.loader.getImage(a);
            this.fontSize.x = b.x || b;
            this.fontSize.y = b.y || this.font.height;
            this.sSize.copy(this.fontSize);
            this.height = this.sSize.y;
            this.charCount = ~~(this.font.width / this.fontSize.x)
        },
        set: function(a, b) {
            this.textAlign = a;
            b && this.resize(b)
        },
        resize: function(a) {
            this.sSize.setV(this.fontSize);
            this.sSize.x *= a;
            this.sSize.y *= a;
            this.height = this.sSize.y
        },
        measureText: function(a, b) {
            for (var c = ("" + b).split("\n"), d = this.height = this.width = 0; d < c.length; d++) this.width = Math.max(c[d].trimRight().length * this.sSize.x, this.width), this.height += this.sSize.y * this.lineHeight;
            return {
                width: this.width,
                height: this.height
            }
        },
        draw: function(a, b, c, d) {
            b = ("" + b).split("\n");
            var e = c,
                f = this.sSize.y * this.lineHeight,
                g = a.globalAlpha();
            a.setGlobalAlpha(g * this.getOpacity());
            this.pos.set(c, d, this.pos.z);
            for (var h = 0; h < b.length; h++) {
                c = e;
                var k = b[h].trimRight(),
                    l = k.length * this.sSize.x;
                switch (this.textAlign) {
                    case "right":
                        c -= l;
                        break;
                    case "center":
                        c -= 0.5 * l
                }
                switch (this.textBaseline) {
                    case "middle":
                        d -= 0.5 * f;
                        break;
                    case "ideographic":
                    case "alphabetic":
                    case "bottom":
                        d -= f
                }
                for (var l = 0, m = k.length; l < m; l++) {
                    var n = k.charCodeAt(l) - this.firstChar;
                    0 <= n && a.drawImage(this.font, this.fontSize.x * (n % this.charCount), this.fontSize.y * ~~(n / this.charCount), this.fontSize.x,
                        this.fontSize.y, ~~c, ~~d, this.sSize.x, this.sSize.y);
                    c += this.sSize.x
                }
                d += f
            }
            a.setGlobalAlpha(g)
        }
    })
})();
(function() {
    me.audio = function() {
        function a(a, d) {
            if (3 < e++) {
                var h = "melonJS: failed loading " + a;
                if (!1 === me.sys.stopOnAudioError) me.audio.disable(), d && d(), console.log(h + ", disabling audio");
                else throw new b.Error(h);
            } else c[a].load()
        }
        var b = {},
            c = {},
            d = null,
            e = 0;
        b.Error = me.Error.extend({
            init: function(a) {
                me.Error.prototype.init.apply(this, [a]);
                this.name = "me.audio.Error"
            }
        });
        b.init = function(a) {
            if (!me.initialized) throw new b.Error("me.audio.init() called before engine initialization.");
            this.audioFormats = ("string" ===
                typeof a ? a : "mp3").split(",");
            return !Howler.noAudio
        };
        b.enable = function() {
            this.unmuteAll()
        };
        b.disable = function() {
            this.muteAll()
        };
        b.load = function(d, g, h, k) {
            var l = [];
            if ("undefined" === typeof this.audioFormats || 0 === this.audioFormats.length) throw new b.Error("target audio extension(s) should be set through me.audio.init() before calling the preloader.");
            for (var m = 0; m < this.audioFormats.length; m++) l.push(d.src + d.name + "." + this.audioFormats[m] + me.loader.nocache);
            c[d.name] = new Howl({
                src: l,
                volume: Howler.volume(),
                html5: !0 === g,
                onloaderror: function() {
                    a.call(me.audio, d.name, k)
                },
                onload: function() {
                    e = 0;
                    h && h()
                }
            });
            return 1
        };
        b.play = function(a, b, d, e) {
            if ((a = c[a]) && "undefined" !== typeof a) {
                var l = a.play();
                "boolean" === typeof b && a.loop(b, l);
                a.volume("number" === typeof e ? e.clamp(0, 1) : Howler.volume(), l);
                if ("function" === typeof d)
                    if (!0 === b) a.on("end", d, l);
                    else a.once("end", d, l);
                return l
            }
        };
        b.fade = function(a, b, d, e, l) {
            (a = c[a]) && "undefined" !== typeof a && a.fade(b, d, e, l)
        };
        b.rate = function(a, b, d) {
            if ((a = c[a]) && "undefined" !== typeof a) {
                var e = [];
                "undefined" !== typeof b && (e[e.length] = b);
                "undefined" !== typeof d && (e[e.length] = d);
                return a.rate.apply(a, e)
            }
        };
        b.stop = function(a, b) {
            var d = c[a];
            d && "undefined" !== typeof d && (d.stop(b), d.off("end", b))
        };
        b.pause = function(a, b) {
            var d = c[a];
            d && "undefined" !== typeof d && d.pause(b)
        };
        b.resume = function(a, b) {
            var d = c[a];
            d && "undefined" !== typeof d && d.play(b)
        };
        b.playTrack = function(a, b) {
            d = a;
            return me.audio.play(d, !0, null, b)
        };
        b.stopTrack = function() {
            null !== d && (c[d].stop(), d = null)
        };
        b.pauseTrack = function() {
            null !== d && c[d].pause()
        };
        b.resumeTrack = function() {
            null !== d && c[d].play()
        };
        b.getCurrentTrack = function() {
            return d
        };
        b.setVolume = function(a) {
            Howler.volume(a)
        };
        b.getVolume = function() {
            return Howler.volume()
        };
        b.mute = function(a, b, d) {
            (a = c[a]) && "undefined" !== typeof a && a.mute("undefined" === typeof d ? !0 : !!d, b)
        };
        b.unmute = function(a, c) {
            b.mute(a, c, !1)
        };
        b.muteAll = function() {
            Howler.mute(!0)
        };
        b.unmuteAll = function() {
            Howler.mute(!1)
        };
        b.unload = function(a) {
            if (!(a in c)) return !1;
            c[a].unload();
            "function" === typeof c[a].dispose && c[a].dispose();
            delete c[a];
            return !0
        };
        b.unloadAll = function() {
            for (var a in c) c.hasOwnProperty(a) && b.unload(a)
        };
        return b
    }()
})();
(function() {
    me.video = function() {
        function a(a, b, c, d) {
            try {
                return new me.WebGLRenderer(a, b, c, d)
            } catch (e) {
                return new me.CanvasRenderer(a, b, c, d)
            }
        }
        var b = {},
            c = null,
            d = 0,
            e = 1,
            f = 0,
            g = 0,
            h = Infinity,
            k = Infinity,
            l = {
                wrapper: void 0,
                renderer: 0,
                doubleBuffering: !1,
                autoScale: !1,
                scale: 1,
                scaleMethod: "fit",
                transparent: !1,
                antiAlias: !1
            };
        b.Error = me.Error.extend({
            init: function(a) {
                me.Error.prototype.init.apply(this, [a]);
                this.name = "me.video.Error"
            }
        });
        b.CANVAS = 0;
        b.WEBGL = 1;
        b.AUTO = 2;
        b.init = function(d, h, k) {
            if (!me.initialized) throw new b.Error("me.video.init() called before engine initialization.");
            l = Object.assign(l, k || {});
            l.doubleBuffering = !!l.doubleBuffering;
            l.autoScale = "auto" === l.scale || !1;
            0 !== l.scaleMethod.search(/^(fill-(min|max)|fit|flex(-(width|height))?|stretch)$/) && (l.scaleMethod = "fit");
            l.transparent = !!l.transparent;
            !0 === me.game.HASH.webgl && (l.renderer = b.WEBGL);
            l.scale = l.autoScale ? 1 : +l.scale || 1;
            me.sys.scale = new me.Vector2d(l.scale, l.scale);
            if (l.autoScale || 1 !== l.scale) l.doubleBuffering = !0;
            e = d / h;
            f = d;
            g = h;
            var u = d * me.sys.scale.x,
                v = h * me.sys.scale.y;
            l.zoomX = u;
            l.zoomY = v;
            window.addEventListener("resize",
                throttle(100, !1, function(a) {
                    me.event.publish(me.event.WINDOW_ONRESIZE, [a])
                }), !1);
            window.addEventListener("orientationchange", function(a) {
                me.event.publish(me.event.WINDOW_ONORIENTATION_CHANGE, [a])
            }, !1);
            me.event.subscribe(me.event.WINDOW_ONRESIZE, me.video.onresize.bind(me.video));
            me.event.subscribe(me.event.WINDOW_ONORIENTATION_CHANGE, me.video.onresize.bind(me.video));
            c = !0 === me.device.ejecta ? document.getElementById("canvas") : b.createCanvas(u, v, !0);
            k.wrapper && (l.wrapper = document.getElementById(k.wrapper));
            l.wrapper || (l.wrapper = document.body);
            l.wrapper.appendChild(c);
            if (!c.getContext) return !1;
            switch (l.renderer) {
                case b.WEBGL:
                    this.renderer = new me.WebGLRenderer(c, d, h, l);
                    break;
                case b.AUTO:
                    this.renderer = a(c, d, h, l);
                    break;
                default:
                    this.renderer = new me.CanvasRenderer(c, d, h, l)
            }
            d = me.device.getPixelRatio();
            1 < d && (c.style.width = c.width / d + "px", c.style.height = c.height / d + "px");
            window.getComputedStyle && (d = window.getComputedStyle(c, null), me.video.setMaxSize(parseInt(d.maxWidth, 10), parseInt(d.maxHeight, 10)));
            me.game.init();
            me.video.onresize();
            return !0
        };
        b.getPos = function(a) {
            a = a || this.renderer.getScreenCanvas();
            return a.getBoundingClientRect ? a.getBoundingClientRect() : {
                left: 0,
                top: 0
            }
        };
        b.setMaxSize = function(a, b) {
            h = a || Infinity;
            k = b || Infinity;
            this.onresize.defer(this)
        };
        b.createCanvas = function(a, d, e) {
            if (0 === a || 0 === d) throw new b.Error("width or height was zero, Canvas could not be initialized !");
            var f = document.createElement("canvas");
            !0 === e && me.device.cocoon && !0 !== me.device.android2 && (f.screencanvas = !0);
            f.width = a || c.width;
            f.height =
                d || c.height;
            return f
        };
        b.getWrapper = function() {
            return l.wrapper
        };
        b.onresize = function() {
            var a = 1,
                b = 1;
            me.device.orientation = "undefined" !== typeof window.orientation ? window.orientation : window.outerWidth > window.outerHeight ? 90 : 0;
            if (l.autoScale) {
                var c, u, v = me.video.renderer.getScreenCanvas().parentNode;
                "undefined" !== typeof v && (c = v.width, u = v.height);
                c = Math.min(h, c || window.innerWidth);
                u = Math.min(k, u || window.innerHeight);
                var v = c / u,
                    t = Infinity,
                    t = Infinity;
                "fill-min" === l.scaleMethod && v > e || "fill-max" === l.scaleMethod &&
                    v < e || "flex-width" === l.scaleMethod ? (t = Math.min(h, g * v), a = b = c / t, t = ~~(t + 0.5), this.renderer.resize(t, g), me.game.viewport.resize(t, g), me.game.world.updateChildBounds()) : "fill-min" === l.scaleMethod && v < e || "fill-max" === l.scaleMethod && v > e || "flex-height" === l.scaleMethod ? (t = Math.min(k, f * (u / c)), a = b = u / t, t = ~~(t + 0.5), this.renderer.resize(f, t), me.game.viewport.resize(f, t), me.game.world.updateChildBounds()) : "flex" === l.scaleMethod ? (this.renderer.resize(c, u), me.game.viewport.resize(c, u), me.game.world.updateChildBounds()) :
                    "stretch" === l.scaleMethod ? (a = c / f, b = u / g) : a = v < e ? b = c / f : b = u / g;
                a *= me.device.getPixelRatio();
                b *= me.device.getPixelRatio();
                d && clearTimeout(d);
                d = me.video.updateDisplaySize.defer(this, a, b)
            }
        };
        b.updateDisplaySize = function(a, b) {
            me.sys.scale.set(a, b);
            this.renderer.scaleCanvas(a, b);
            me.game.repaint();
            me.input._offset = me.video.getPos();
            d = 0
        };
        return b
    }()
})();
(function() {
    me.Renderer = me.Object.extend({
        init: function(a, b, c, d) {
            d = d || {};
            this.transparent = !!d.transparent;
            this.doubleBuffering = !!d.doubleBuffering;
            this.antiAlias = !!d.antiAlias;
            this.gameWidthZoom = d.zoomX || b;
            this.gameHeightZoom = d.zoomY || c;
            this.canvas = this.backBufferCanvas = a;
            this.context = null;
            this.globalColor = new me.Color(255, 255, 255, 1);
            return this
        },
        applyRGBFilter: function(a, b, c) {
            var d = this.getContext2d(me.video.createCanvas(a.width, a.height, !1));
            a = me.utils.getPixels(a);
            var e = a.data;
            switch (b) {
                case "b&w":
                    b =
                        0;
                    for (c = e.length; b < c; b += 4) {
                        var f = 3 * e[b] + 4 * e[b + 1] + e[b + 2] >>> 3;
                        e[b] = f;
                        e[b + 1] = f;
                        e[b + 2] = f
                    }
                    break;
                case "brightness":
                    f = Math.abs(c).clamp(0, 1);
                    b = 0;
                    for (c = e.length; b < c; b += 4) e[b] *= f, e[b + 1] *= f, e[b + 2] *= f;
                    break;
                case "transparent":
                    var f = me.pool.pull("me.Color").parseCSS(c),
                        g = me.pool.pull("me.Color");
                    b = 0;
                    for (c = e.length; b < c; b += 4) g.setColor(e[b], e[b + 1], e[b + 2]), g.equals(f) && (e[b + 3] = 0);
                    me.pool.push(f);
                    me.pool.push(g);
                    break;
                default:
                    return null
            }
            d.putImageData(a, 0, 0);
            return d
        },
        prepareSurface: function() {},
        reset: function() {
            this.resetTransform();
            this.cache.reset()
        },
        getCanvas: function() {
            return this.backBufferCanvas
        },
        getScreenCanvas: function() {
            return this.canvas
        },
        getScreenContext: function() {
            return this.context
        },
        getContext2d: function(a, b) {
            if ("undefined" === typeof a || null === a) throw new me.video.Error("You must pass a canvas element in order to create a 2d context");
            if ("undefined" === typeof a.getContext) throw new me.video.Error("Your browser does not support HTML5 canvas.");
            var c;
            c = me.device.cocoon ? a.getContext("2d", {
                    antialias: this.antiAlias,
                    alpha: !b
                }) :
                a.getContext("2d", {
                    alpha: !b
                });
            c.canvas || (c.canvas = a);
            this.setAntiAlias(c, this.antiAlias);
            return c
        },
        getWidth: function() {
            return this.backBufferCanvas.width
        },
        getHeight: function() {
            return this.backBufferCanvas.height
        },
        globalAlpha: function() {
            return this.globalColor.glArray[3]
        },
        resize: function(a, b) {
            this.backBufferCanvas.width = a;
            this.backBufferCanvas.height = b
        },
        setAntiAlias: function(a, b) {
            "undefined" !== typeof a && me.agent.setPrefixed("imageSmoothingEnabled", !0 === b, a);
            var c = a.canvas.style["image-rendering"];
            !1 !== b || "" !== c && "auto" !== c ? !0 === b && "pixelated" === c && (a.canvas.style["image-rendering"] = "auto") : a.canvas.style["image-rendering"] = "pixelated"
        },
        drawFont: function() {}
    })
})();
(function() {
    me.Renderer.TextureCache = me.Object.extend({
        init: function(a) {
            this.max_size = a || Infinity;
            this.reset()
        },
        reset: function() {
            this.cache = new Map;
            this.units = new Map;
            this.length = 0
        },
        validate: function() {
            if (this.length >= this.max_size) throw new me.video.Error("Texture cache overflow: " + this.max_size + " texture units available.");
        },
        get: function(a, b) {
            if (!this.cache.has(a)) {
                this.validate();
                if (!b) {
                    var c = a.width,
                        d = a.height;
                    b = {
                        meta: {
                            app: "melonJS",
                            size: {
                                w: c,
                                h: d
                            }
                        },
                        frames: [{
                            filename: "default",
                            frame: {
                                x: 0,
                                y: 0,
                                w: c,
                                h: d
                            }
                        }]
                    }
                }
                c = new me.video.renderer.Texture(b, a, !0);
                this.cache.set(a, c);
                this.units.set(c, this.length++)
            }
            return this.cache.get(a)
        },
        put: function(a, b) {
            this.validate();
            this.cache.set(a, b);
            this.units.set(b, this.length++)
        },
        getUnit: function(a) {
            return this.units.get(a)
        }
    })
})();
(function() {
    me.CanvasRenderer = me.Renderer.extend({
        init: function(a, b, c, d) {
            me.Renderer.prototype.init.apply(this, [a, b, c, d]);
            this.context = this.getContext2d(this.canvas, !this.transparent);
            this.doubleBuffering ? (this.backBufferCanvas = me.video.createCanvas(b, c, !1), this.backBufferContext2D = this.getContext2d(this.backBufferCanvas), this.transparent && (this.context.globalCompositeOperation = "copy")) : (this.backBufferCanvas = this.canvas, this.backBufferContext2D = this.context);
            this.fontContext2D = this.backBufferContext2D;
            this.setColor(this.globalColor);
            this.cache = new me.Renderer.TextureCache;
            return this
        },
        prepareSurface: function() {
            this.transparent && this.clearSurface(null, "rgba(0,0,0,0)", !0)
        },
        blitSurface: function() {
            this.doubleBuffering && this.context.drawImage(this.backBufferCanvas, 0, 0, this.backBufferCanvas.width, this.backBufferCanvas.height, 0, 0, this.gameWidthZoom, this.gameHeightZoom)
        },
        clearSurface: function(a, b, c) {
            a || (a = this.backBufferContext2D);
            var d = a.canvas;
            a.save();
            a.setTransform(1, 0, 0, 1, 0, 0);
            a.globalCompositeOperation =
                c ? "copy" : "source-over";
            a.fillStyle = b instanceof me.Color ? b.toRGBA() : b;
            a.fillRect(0, 0, d.width, d.height);
            a.restore()
        },
        clearRect: function(a, b, c, d) {
            this.backBufferContext2D.clearRect(a, b, c, d)
        },
        createPattern: function(a, b) {
            return this.backBufferContext2D.createPattern(a, b)
        },
        drawImage: function() {
            this.backBufferContext2D.globalAlpha < 1 / 255 || this.backBufferContext2D.drawImage.apply(this.backBufferContext2D, arguments)
        },
        drawPattern: function(a, b, c, d, e) {
            if (!(this.backBufferContext2D.globalAlpha < 1 / 255)) {
                var f = this.backBufferContext2D.fillStyle;
                this.backBufferContext2D.fillStyle = a;
                this.backBufferContext2D.fillRect(b, c, d, e);
                this.backBufferContext2D.fillStyle = f
            }
        },
        fillArc: function(a, b, c, d, e, f) {
            this.backBufferContext2D.globalAlpha < 1 / 255 || (this.backBufferContext2D.save(), this.backBufferContext2D.beginPath(), this.backBufferContext2D.translate(a + c, b + c), this.backBufferContext2D.arc(0, 0, c, d, e, f || !1), this.backBufferContext2D.fill(), this.backBufferContext2D.closePath(), this.backBufferContext2D.restore())
        },
        fillRect: function(a, b, c, d) {
            this.backBufferContext2D.globalAlpha <
                1 / 255 || this.backBufferContext2D.fillRect(a, b, c, d)
        },
        getContext: function() {
            return this.backBufferContext2D
        },
        resetTransform: function() {
            this.backBufferContext2D.setTransform(1, 0, 0, 1, 0, 0)
        },
        scaleCanvas: function(a, b) {
            this.canvas.width = this.gameWidthZoom = this.backBufferCanvas.width * a;
            this.canvas.height = this.gameHeightZoom = this.backBufferCanvas.height * b;
            1 < me.device.getPixelRatio() && (this.canvas.style.width = this.canvas.width / me.device.getPixelRatio() + "px", this.canvas.style.height = this.canvas.height / me.device.getPixelRatio() +
                "px");
            this.doubleBuffering && this.transparent && (this.context.globalCompositeOperation = "copy");
            this.setAntiAlias(this.context, this.antiAlias);
            this.blitSurface()
        },
        save: function() {
            this.backBufferContext2D.save()
        },
        restore: function() {
            this.backBufferContext2D.restore();
            this.globalColor.glArray[3] = this.backBufferContext2D.globalAlpha
        },
        rotate: function(a) {
            this.backBufferContext2D.rotate(a)
        },
        scale: function(a, b) {
            this.backBufferContext2D.scale(a, b)
        },
        setColor: function(a) {
            this.backBufferContext2D.strokeStyle = this.backBufferContext2D.fillStyle =
                a instanceof me.Color ? a.toRGBA() : a
        },
        setGlobalAlpha: function(a) {
            this.backBufferContext2D.globalAlpha = this.globalColor.glArray[3] = a
        },
        setLineWidth: function(a) {
            this.backBufferContext2D.lineWidth = a
        },
        strokeArc: function(a, b, c, d, e, f) {
            this.backBufferContext2D.globalAlpha < 1 / 255 || (this.save(), this.backBufferContext2D.beginPath(), this.backBufferContext2D.translate(a + c, b + c), this.backBufferContext2D.arc(0, 0, c, d, e, f || !1), this.backBufferContext2D.stroke(), this.backBufferContext2D.closePath(), this.restore())
        },
        strokeEllipse: function(a,
            b, c, d) {
            if (!(this.backBufferContext2D.globalAlpha < 1 / 255)) {
                this.save();
                this.context.beginPath();
                var e = a - c,
                    f = a + c,
                    g = b - d,
                    h = b + d,
                    k = 0.551784 * c;
                c = 0.551784 * d;
                d = a - k;
                var k = a + k,
                    l = b - c;
                c = b + c;
                this.backBufferContext2D.moveTo(a, g);
                this.backBufferContext2D.bezierCurveTo(k, g, f, l, f, b);
                this.backBufferContext2D.bezierCurveTo(f, c, k, h, a, h);
                this.backBufferContext2D.bezierCurveTo(d, h, e, c, e, b);
                this.backBufferContext2D.bezierCurveTo(e, l, d, g, a, g);
                this.backBufferContext2D.stroke();
                this.restore()
            }
        },
        strokeLine: function(a, b, c, d) {
            this.backBufferContext2D.globalAlpha <
                1 / 255 || (this.save(), this.backBufferContext2D.beginPath(), this.backBufferContext2D.moveTo(a, b), this.backBufferContext2D.lineTo(c, d), this.backBufferContext2D.stroke(), this.restore())
        },
        strokePolygon: function(a) {
            if (!(this.backBufferContext2D.globalAlpha < 1 / 255)) {
                this.save();
                this.backBufferContext2D.translate(a.pos.x, a.pos.y);
                this.backBufferContext2D.beginPath();
                this.backBufferContext2D.moveTo(a.points[0].x, a.points[0].y);
                for (var b, c = 1; c < a.points.length; c++) b = a.points[c], this.backBufferContext2D.lineTo(b.x,
                    b.y);
                this.backBufferContext2D.lineTo(a.points[0].x, a.points[0].y);
                this.backBufferContext2D.stroke();
                this.backBufferContext2D.closePath();
                this.backBufferContext2D.translate(-a.pos.x, -a.pos.y);
                this.restore()
            }
        },
        strokeRect: function(a, b, c, d) {
            this.backBufferContext2D.globalAlpha < 1 / 255 || this.backBufferContext2D.strokeRect(a, b, c, d)
        },
        drawShape: function(a) {
            a instanceof me.Rect ? this.strokeRect(a.left, a.top, a.width, a.height) : a instanceof me.Line || a instanceof me.Polygon ? this.strokePolygon(a) : a instanceof me.Ellipse &&
                (a.radiusV.x === a.radiusV.y ? this.strokeArc(a.pos.x - a.radius, a.pos.y - a.radius, a.radius, 0, 2 * Math.PI) : this.strokeEllipse(a.pos.x, a.pos.y, a.radiusV.x, a.radiusV.y))
        },
        transform: function(a) {
            a = a.val;
            this.backBufferContext2D.transform(a[0], a[1], a[3], a[4], a[6], a[7])
        },
        translate: function(a, b) {
            this.backBufferContext2D.translate(a, b)
        }
    })
})();
(function() {
    var a = -(Math.PI / 2);
    me.CanvasRenderer.prototype.Texture = me.Object.extend({
        init: function(a, c, d) {
            this.format = null;
            this.texture = c || null;
            this.atlas = null;
            if ("undefined" !== typeof a)
                if ("undefined" !== typeof a.meta) {
                    if (a.meta.app.includes("texturepacker")) {
                        this.format = "texturepacker";
                        if ("undefined" === typeof c && (c = a.meta.image, this.texture = me.utils.getImage(c), !this.texture)) throw new me.video.renderer.Texture.Error("Atlas texture '" + c + "' not found");
                        this.repeat = "no-repeat"
                    } else if (a.meta.app.includes("ShoeBox")) {
                        if (!a.meta.exporter ||
                            !a.meta.exporter.includes("melonJS")) throw new me.video.renderer.Texture.Error("ShoeBox requires the JSON exporter : https://github.com/melonjs/melonJS/tree/master/media/shoebox_JSON_export.sbx");
                        this.format = "ShoeBox";
                        this.repeat = "no-repeat"
                    } else a.meta.app.includes("melonJS") && (this.format = "melonJS", this.repeat = a.meta.repeat || "no-repeat");
                    this.atlas = this.build(a)
                } else "undefined" !== typeof a.framewidth && "undefined" !== typeof a.frameheight && (this.format = "Spritesheet (fixed cell size)", void 0 !== typeof c &&
                    (a.image = c), this.atlas = this.buildFromSpriteSheet(a), this.repeat = "no-repeat");
            if (!this.atlas) throw new me.video.renderer.Texture.Error("texture atlas format not supported");
            d || me.video.renderer.cache.put(this.texture, this)
        },
        build: function(b) {
            var c = {};
            b.frames.forEach(function(b) {
                if (b.hasOwnProperty("filename")) {
                    var e = b.frame,
                        f, g, h = b.spriteSourceSize && b.sourceSize && b.pivot;
                    h && (f = b.sourceSize.w * b.pivot.x - (b.trimmed ? b.spriteSourceSize.x : 0), g = b.sourceSize.h * b.pivot.y - (b.trimmed ? b.spriteSourceSize.y : 0));
                    c[b.filename] = {
                        name: b.filename,
                        offset: new me.Vector2d(e.x, e.y),
                        anchorPoint: h ? new me.Vector2d(f / e.w, g / e.h) : null,
                        width: e.w,
                        height: e.h,
                        angle: !0 === b.rotated ? a : 0
                    }
                }
            });
            return c
        },
        buildFromSpriteSheet: function(a) {
            var c = {},
                d = a.image,
                e = a.spacing || 0,
                f = a.margin || 0,
                g = d.width,
                h = d.height,
                k = new me.Vector2d(~~((g - f + e) / (a.framewidth + e)), ~~((h - f + e) / (a.frameheight + e)));
            if (0 !== g % (a.framewidth + e) || 0 !== h % (a.frameheight + e)) g = k.x * (a.framewidth + e), h = k.y * (a.frameheight + e), console.warn("Spritesheet Texture for image: " + d.src +
                " is not divisible by " + (a.framewidth + e) + "x" + (a.frameheight + e) + ", truncating effective size to " + g + "x" + h);
            d = 0;
            for (g = k.x * k.y; d < g; d++) c["" + d] = {
                name: "" + d,
                offset: new me.Vector2d(f + (e + a.framewidth) * (d % k.x), f + (e + a.frameheight) * ~~(d / k.x)),
                anchorPoint: a.anchorPoint || null,
                width: a.framewidth,
                height: a.frameheight,
                angle: 0
            };
            return c
        },
        getAtlas: function() {
            return this.atlas
        },
        getTexture: function() {
            return this.texture
        },
        getRegion: function(a) {
            return this.atlas[a]
        },
        createSpriteFromName: function(a, c) {
            return me.pool.pull("me.Sprite",
                0, 0, Object.assign({
                    image: this,
                    region: a
                }, c || {}))
        },
        createAnimationFromName: function(a, c) {
            for (var d = [], e = {}, f = 0; f < a.length; ++f)
                if (d[f] = this.getRegion(a[f]), e[a[f]] = f, null == d[f]) throw new me.video.renderer.Texture.Error("Texture - region for " + a[f] + " not found");
            return new me.AnimationSheet(0, 0, Object.assign({
                image: this.texture,
                framewidth: 0,
                frameheight: 0,
                margin: 0,
                spacing: 0,
                atlas: d,
                atlasIndices: e
            }, c || {}))
        }
    });
    me.CanvasRenderer.prototype.Texture.Error = me.Error.extend({
        init: function(a) {
            me.Error.prototype.init.apply(this, [a]);
            this.name = "me.CanvasRenderer.Texture.Error"
        }
    })
})();
(function() {
    me.video.shader = function() {
        function a(a, b, c) {
            b = a.createShader(b);
            a.shaderSource(b, c);
            a.compileShader(b);
            if (!a.getShaderParameter(b, a.COMPILE_STATUS)) throw new me.video.Error(a.getShaderInfoLog(b));
            return b
        }
        var b = {},
            c = {
                bool: "1i",
                "int": "1i",
                "float": "1f",
                vec2: "2fv",
                vec3: "3fv",
                vec4: "4fv",
                bvec2: "2iv",
                bvec3: "3iv",
                bvec4: "4iv",
                ivec2: "2iv",
                ivec3: "3iv",
                ivec4: "4iv",
                mat2: "Matrix2fv",
                mat3: "Matrix3fv",
                mat4: "Matrix4fv",
                sampler2D: "1i"
            };
        b.createShader = function(b, e, f) {
            var g = {
                    attributes: {},
                    uniforms: {},
                    handle: null
                },
                h = g.handle = b.createProgram(),
                k = /attribute\s+\w+\s+(\w+)/g,
                l = /uniform\s+(\w+)\s+(\w+)/g,
                m = [],
                n = {},
                q, u = {},
                v = {};
            b.attachShader(h, a(b, b.VERTEX_SHADER, e));
            b.attachShader(h, a(b, b.FRAGMENT_SHADER, f));
            b.linkProgram(h);
            if (!b.getProgramParameter(h, b.LINK_STATUS)) throw new me.video.Error(b.getProgramInfoLog(h));
            for (b.useProgram(h); q = k.exec(e);) m.push(q[1]);
            [e, f].forEach(function(a) {
                for (; q = l.exec(a);) n[q[2]] = q[1]
            });
            m.forEach(function(a) {
                g.attributes[a] = b.getAttribLocation(h, a);
                b.enableVertexAttribArray(g.attributes[a])
            });
            Object.keys(n).forEach(function(a) {
                var e = n[a];
                v[a] = b.getUniformLocation(h, a);
                u[a] = {
                    get: function(a) {
                        return function() {
                            return v[a]
                        }
                    }(a),
                    set: function(a, c, e) {
                        return 0 === c.indexOf("mat") ? function(c) {
                            b[e](v[a], !1, c)
                        } : function(c) {
                            var m = e;
                            c.length && "v" !== e.substr(-1) && (m += "v");
                            b[m](v[a], c)
                        }
                    }(a, e, "uniform" + c[e])
                }
            });
            Object.defineProperties(g.uniforms, u);
            return g
        };
        b.createTexture = function(a, b, c, g, h, k, l) {
            g = g || "no-repeat";
            var m = a.createTexture(),
                n = me.video.renderer.antiAlias ? a.LINEAR : a.NEAREST,
                q = 0 === g.search(/^repeat(-x)?$/) ?
                a.REPEAT : a.CLAMP_TO_EDGE;
            g = 0 === g.search(/^repeat(-y)?$/) ? a.REPEAT : a.CLAMP_TO_EDGE;
            a.activeTexture(a.TEXTURE0 + b);
            a.bindTexture(a.TEXTURE_2D, m);
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, q);
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, g);
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, n);
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, n);
            h || k || l ? a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, h, k, l, a.RGBA, a.UNSIGNED_BYTE, c) : a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, c);
            return m
        };
        return b
    }()
})();
(function() {
    me.WebGLRenderer = me.Renderer.extend({
        init: function(a, b, c, d) {
            me.Renderer.prototype.init.apply(this, [a, b, c, d]);
            a = this.gl = this.getContextGL(a, !this.transparent);
            this.colorStack = [];
            this._matrixStack = [];
            this._linePoints = [new me.Vector2d, new me.Vector2d, new me.Vector2d, new me.Vector2d];
            this.globalMatrix = new me.Matrix2d;
            this.compositor = new(d.compositor || me.WebGLRenderer.Compositor)(a, this.globalMatrix, this.globalColor);
            this.cache = new me.Renderer.TextureCache(this.compositor.maxTextures);
            me.video.renderer =
                this;
            this.createFillTexture();
            this.createFontTexture();
            this.scaleCanvas(1, 1);
            return this
        },
        createFillTexture: function() {
            var a = new Uint8Array([255, 255, 255, 255]);
            this.fillTexture = new this.Texture({
                meta: {
                    app: "melonJS",
                    size: {
                        w: 1,
                        h: 1
                    }
                },
                frames: [{
                    filename: "default",
                    frame: {
                        x: 0,
                        y: 0,
                        w: 1,
                        h: 1
                    }
                }]
            }, a);
            this.compositor.uploadTexture(this.fillTexture, 1, 1, 0)
        },
        createFontTexture: function() {
            var a = me.video.createCanvas(this.backBufferCanvas.width, this.backBufferCanvas.height);
            this.fontContext2D = this.getContext2d(a);
            this.fontTexture =
                new this.Texture({
                    meta: {
                        app: "melonJS",
                        size: {
                            w: this.backBufferCanvas.width,
                            h: this.backBufferCanvas.height
                        }
                    },
                    frames: [{
                        filename: "default",
                        frame: {
                            x: 0,
                            y: 0,
                            w: this.backBufferCanvas.width,
                            h: this.backBufferCanvas.height
                        }
                    }]
                }, a);
            this.compositor.uploadTexture(this.fontTexture)
        },
        createPattern: function(a, b) {
            var c = new this.Texture({
                meta: {
                    app: "melonJS",
                    size: {
                        w: a.width,
                        h: a.height
                    },
                    repeat: b
                },
                frames: [{
                    filename: "default",
                    frame: {
                        x: 0,
                        y: 0,
                        w: a.width,
                        h: a.height
                    }
                }]
            }, a);
            this.compositor.uploadTexture(c);
            return c
        },
        blitSurface: function() {
            this.compositor.flush()
        },
        clearSurface: function(a, b, c) {
            a = this.globalColor.clone();
            var d = this.globalMatrix.clone();
            this.globalColor.copy(b);
            this.globalMatrix.identity();
            c ? this.compositor.clear() : this.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.globalMatrix.copy(d);
            this.globalColor.copy(a);
            me.pool.push(a)
        },
        clearRect: function(a, b, c, d) {
            var e = this.globalColor.clone();
            this.globalColor.copy("#0000");
            this.fillRect(a, b, c, d);
            this.globalColor.copy(e);
            me.pool.push(e)
        },
        drawFont: function(a) {
            this.compositor.flush();
            this.compositor.uploadTexture(this.fontTexture,
                0, 0, 0, !0);
            this.compositor.addQuad(this.fontTexture, a.pos.x + "," + a.pos.y + "," + a.width + "," + a.height, a.pos.x, a.pos.y, a.width, a.height);
            this.fontContext2D.clearRect(0, 0, this.backBufferCanvas.width, this.backBufferCanvas.height)
        },
        drawImage: function(a, b, c, d, e, f, g, h, k) {
            "undefined" === typeof d ? (d = h = a.width, e = k = a.height, f = b, g = c, c = b = 0) : "undefined" === typeof f && (f = b, g = c, h = d, k = e, d = a.width, e = a.height, c = b = 0);
            b = b + "," + c + "," + d + "," + e;
            this.compositor.addQuad(this.cache.get(a), b, f, g, h, k)
        },
        drawPattern: function(a, b, c, d, e) {
            this.compositor.addQuad(a,
                "0,0," + d + "," + e, b, c, d, e)
        },
        fillRect: function(a, b, c, d) {
            this.compositor.addQuad(this.fillTexture, "default", a, b, c, d)
        },
        getScreenContext: function() {
            return this.gl
        },
        getContextGL: function(a, b) {
            if ("undefined" === typeof a || null === a) throw new me.video.Error("You must pass a canvas element in order to create a GL context");
            if ("undefined" === typeof a.getContext) throw new me.video.Error("Your browser does not support WebGL.");
            var c = {
                antialias: this.antiAlias,
                alpha: !b
            };
            return a.getContext("webgl", c) || a.getContext("experimental-webgl",
                c)
        },
        getContext: function() {
            return this.gl
        },
        resetTransform: function() {
            this.globalMatrix.identity()
        },
        reset: function() {
            this.globalMatrix.identity();
            this.cache.reset();
            this.compositor.reset();
            this.createFillTexture();
            this.createFontTexture()
        },
        scaleCanvas: function(a, b) {
            var c = this.canvas.width * a,
                d = this.canvas.height * b;
            1 < me.device.getPixelRatio() ? (this.canvas.style.width = c / me.device.getPixelRatio() + "px", this.canvas.style.height = d / me.device.getPixelRatio() + "px") : (this.canvas.style.width = c + "px", this.canvas.style.height =
                d + "px");
            this.compositor.setProjection(this.canvas.width, this.canvas.height)
        },
        restore: function() {
            var a = this.colorStack.pop();
            me.pool.push(a);
            this.globalColor.copy(a);
            this.globalMatrix.copy(this._matrixStack.pop())
        },
        rotate: function(a) {
            this.globalMatrix.rotate(a)
        },
        save: function() {
            this.colorStack.push(this.globalColor.clone());
            this._matrixStack.push(this.globalMatrix.clone())
        },
        scale: function(a, b) {
            this.globalMatrix.scale(a, b)
        },
        setAntiAlias: function(a, b) {
            me.Renderer.prototype.setAntiAlias.apply(this, [a,
                b
            ])
        },
        setGlobalAlpha: function(a) {
            this.globalColor.glArray[3] = a
        },
        setColor: function(a) {
            this.globalColor.copy(a)
        },
        setLineWidth: function(a) {
            this.compositor.lineWidth(a)
        },
        strokeArc: function() {},
        strokeEllipse: function() {},
        strokeLine: function(a, b, c, d) {
            var e = this._linePoints.slice(0, 2);
            e[0].x = a;
            e[0].y = b;
            e[1].x = c;
            e[1].y = d;
            this.compositor.drawLine(e, !0)
        },
        strokePolygon: function(a) {
            var b = a.points.length,
                c, d;
            for (d = this._linePoints.length; d < b; d++) this._linePoints.push(new me.Vector2d);
            c = this._linePoints.slice(0,
                b);
            for (d = 0; d < b; d++) c[d].x = a.pos.x + a.points[d].x, c[d].y = a.pos.y + a.points[d].y;
            this.compositor.drawLine(c)
        },
        strokeRect: function(a, b, c, d) {
            var e = this._linePoints.slice(0, 4);
            e[0].x = a;
            e[0].y = b;
            e[1].x = a + c;
            e[1].y = b;
            e[2].x = a + c;
            e[2].y = b + d;
            e[3].x = a;
            e[3].y = b + d;
            this.compositor.drawLine(e)
        },
        drawShape: function(a) {
            a instanceof me.Rect ? this.strokeRect(a.left, a.top, a.width, a.height) : a instanceof me.Line || a instanceof me.Polygon ? (this.save(), this.strokePolygon(a), this.restore()) : a instanceof me.Ellipse && (this.save(),
                a.radiusV.x === a.radiusV.y ? this.strokeArc(a.pos.x - a.radius, a.pos.y - a.radius, a.radius, 0, 2 * Math.PI) : this.strokeEllipse(a.pos.x, a.pos.y, a.radiusV.x, a.radiusV.y), this.restore())
        },
        transform: function(a) {
            this.globalMatrix.multiply(a)
        },
        translate: function(a, b) {
            this.globalMatrix.translate(a, b)
        }
    })
})();
(function() {
    me.WebGLRenderer.prototype.Texture = me.CanvasRenderer.prototype.Texture.extend({
        build: function(a) {
            var b = a.meta.size.w,
                c = a.meta.size.h;
            a = me.CanvasRenderer.prototype.Texture.prototype.build.apply(this, [a]);
            return this._addStMap(a, b, c)
        },
        buildFromSpriteSheet: function(a) {
            var b = a.image.width,
                c = a.image.height;
            a = me.CanvasRenderer.prototype.Texture.prototype.buildFromSpriteSheet.apply(this, [a]);
            return this._addStMap(a, b, c)
        },
        _addStMap: function(a, b, c) {
            Object.keys(a).forEach(function(d) {
                var e = a[d].offset;
                a[d].stMap = new Float32Array([e.x / b, e.y / c, (e.x + a[d].width) / b, (e.y + a[d].height) / c]);
                a[e.x + "," + e.y + "," + b + "," + c] = a[d]
            });
            return a
        },
        _insertRegion: function(a, b, c, d, e) {
            var f = this.texture.width,
                g = this.texture.height;
            this.atlas[a] = {
                name: a,
                offset: new me.Vector2d(b, c),
                width: d,
                height: e,
                angle: 0,
                stMap: new Float32Array([b / f, c / g, (b + d) / f, (c + e) / g])
            };
            return this.atlas[a]
        }
    });
    me.WebGLRenderer.prototype.Texture.Error = me.Error.extend({
        init: function(a) {
            me.Error.prototype.init.apply(this, [a]);
            this.name = "me.WebGLRenderer.Texture.Error"
        }
    })
})();
(function() {
    var a = 9 * Float32Array.BYTES_PER_ELEMENT,
        b = 0 * Float32Array.BYTES_PER_ELEMENT,
        c = 2 * Float32Array.BYTES_PER_ELEMENT,
        d = 6 * Float32Array.BYTES_PER_ELEMENT,
        e = 7 * Float32Array.BYTES_PER_ELEMENT;
    me.WebGLRenderer.Compositor = me.Object.extend({
        init: function(f, g, h) {
            this.length = 0;
            this.units = [];
            this.maxTextures = Math.min(24, f.getParameter(f.MAX_TEXTURE_IMAGE_UNITS));
            this.v = [new me.Vector2d, new me.Vector2d, new me.Vector2d, new me.Vector2d];
            this.gl = f;
            this.matrix = g;
            this.color = h;
            this.uMatrix = new me.Matrix2d;
            g = 16 >
                f.getShaderPrecisionFormat(f.FRAGMENT_SHADER, f.HIGH_FLOAT).precision ? "mediump" : "highp";
            this.lineShader = me.video.shader.createShader(this.gl, "precision highp float;attribute vec2 aVertex;uniform mat3 uMatrix;void main(void){gl_Position=vec4((uMatrix*vec3(aVertex,1)).xy,0,1);}", "precision " + g + " float;uniform vec4 uColor;void main(void){gl_FragColor=uColor;}");
            this.quadShader = me.video.shader.createShader(this.gl, "precision highp float;attribute vec2 aVertex;attribute vec4 aColor;attribute float aTexture;attribute vec2 aRegion;uniform mat3 uMatrix;varying vec4 vColor;varying float vTexture;varying vec2 vRegion;void main(void){gl_Position=vec4((uMatrix*vec3(aVertex,1)).xy,0,1);vColor=vec4(aColor.rgb*aColor.a,aColor.a);vTexture=aTexture;vRegion=aRegion;}",
                function(a) {
                    for (var b = "precision " + a.precision + " float;uniform sampler2D uSampler[" + a.maxTextures + "];varying vec4 vColor;varying float vTexture;varying vec2 vRegion;void main(void){int texture=int(vTexture);if(texture==0){gl_FragColor=texture2D(uSampler[0],vRegion)*vColor;}", c = 1; c < a.maxTextures - 1; c++) b += "else if(texture==" + c + "){gl_FragColor=texture2D(uSampler[" + c + "],vRegion)*vColor;}";
                    return b += "else{gl_FragColor=texture2D(uSampler[" + (a.maxTextures - 1) + "],vRegion)*vColor;}}"
                }({
                    precision: g,
                    maxTextures: this.maxTextures
                }));
            this.shader = this.quadShader.handle;
            this.sb = f.createBuffer();
            f.bindBuffer(f.ARRAY_BUFFER, this.sb);
            f.bufferData(f.ARRAY_BUFFER, 64E3 * a, f.STREAM_DRAW);
            this.sbSize = 256;
            this.sbIndex = 0;
            this.stream = new Float32Array(36 * this.sbSize);
            this.ib = f.createBuffer();
            f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, this.ib);
            f.bufferData(f.ELEMENT_ARRAY_BUFFER, this.createIB(), f.STATIC_DRAW);
            f.vertexAttribPointer(this.quadShader.attributes.aVertex, 2, f.FLOAT, !1, a, b);
            f.vertexAttribPointer(this.quadShader.attributes.aColor, 4, f.FLOAT, !1, a, c);
            f.vertexAttribPointer(this.quadShader.attributes.aTexture, 1, f.FLOAT, !1, a, d);
            f.vertexAttribPointer(this.quadShader.attributes.aRegion, 2, f.FLOAT, !1, a, e);
            this.reset();
            this.setProjection(f.canvas.width, f.canvas.height);
            f.clearColor(0, 0, 0, 1);
            f.enable(f.BLEND);
            f.blendFunc(f.ONE, f.ONE_MINUS_SRC_ALPHA);
            f.pixelStorei(f.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1)
        },
        setProjection: function(a, b) {
            this.flush();
            this.gl.viewport(0, 0, a, b);
            this.uMatrix.set(2 / a, 0, 0, 0, -2 / b, 0, -1, 1, 1);
            this.quadShader.uniforms.uMatrix = this.uMatrix.val
        },
        uploadTexture: function(a, b, c, d, e) {
            var m = me.video.renderer.cache.getUnit(a);
            if (!this.units[m] || e) this.units[m] = !0, me.video.shader.createTexture(this.gl, m, a.texture, a.repeat, b, c, d);
            return m
        },
        reset: function() {
            this.length = this.sbIndex = 0;
            for (var a = [], b = 0; b < this.maxTextures; b++) this.units[b] = !1, a[b] = b;
            this.quadShader.uniforms.uSampler = a
        },
        createIB: function() {
            for (var a = [0, 1, 2, 2, 1, 3], b = Array(96E3), c = 0; c < b.length; c++) b[c] = a[c % 6] + 4 * ~~(c / 6);
            return new Uint16Array(b)
        },
        resizeSB: function() {
            this.sbSize <<= 1;
            var a =
                new Float32Array(36 * this.sbSize);
            a.set(this.stream);
            this.stream = a
        },
        useShader: function(a) {
            this.shader !== a && (this.flush(), this.shader = a, this.gl.useProgram(this.shader))
        },
        addQuad: function(a, b, c, d, e, m) {
            var n = this.color.toGL();
            if (!(n[3] < 1 / 255)) {
                this.useShader(this.quadShader.handle);
                16E3 <= this.length && this.flush();
                this.length >= this.sbSize && this.resizeSB();
                var q = this.matrix,
                    u = this.v[0].set(c, d),
                    v = this.v[1].set(c + e, d),
                    t = this.v[2].set(c, d + m);
                m = this.v[3].set(c + e, d + m);
                q.isIdentity() || (q.vectorMultiply(u), q.vectorMultiply(v),
                    q.vectorMultiply(t), q.vectorMultiply(m));
                q = this.sbIndex;
                c = q + 9;
                d = c + 9;
                e = d + 9;
                this.stream[q + 0 + 0] = u.x;
                this.stream[q + 0 + 1] = u.y;
                this.stream[c + 0 + 0] = v.x;
                this.stream[c + 0 + 1] = v.y;
                this.stream[d + 0 + 0] = t.x;
                this.stream[d + 0 + 1] = t.y;
                this.stream[e + 0 + 0] = m.x;
                this.stream[e + 0 + 1] = m.y;
                this.stream.set(n, q + 2);
                this.stream.set(n, c + 2);
                this.stream.set(n, d + 2);
                this.stream.set(n, e + 2);
                n = this.uploadTexture(a);
                this.stream[q + 6] = this.stream[c + 6] = this.stream[d + 6] = this.stream[e + 6] = n;
                n = a.getRegion(b);
                "undefined" === typeof n && (console.warn("Adding texture region",
                    b, "for texture", a), n = b.split(","), n = a._insertRegion(b, +n[0], +n[1], +n[2], +n[3]));
                a = n.stMap;
                this.stream[q + 7 + 0] = a[0];
                this.stream[q + 7 + 1] = a[1];
                this.stream[c + 7 + 0] = a[2];
                this.stream[c + 7 + 1] = a[1];
                this.stream[d + 7 + 0] = a[0];
                this.stream[d + 7 + 1] = a[3];
                this.stream[e + 7 + 0] = a[2];
                this.stream[e + 7 + 1] = a[3];
                this.sbIndex += 36;
                this.length++
            }
        },
        flush: function() {
            if (this.length) {
                var a = this.gl;
                a.bufferData(a.ARRAY_BUFFER, this.stream.subarray(0, 36 * this.length), a.STREAM_DRAW);
                a.drawElements(a.TRIANGLES, 6 * this.length, a.UNSIGNED_SHORT,
                    0);
                this.length = this.sbIndex = 0
            }
        },
        drawLine: function(f, g) {
            this.useShader(this.lineShader.handle);
            for (var h = 0, k = 0; k < f.length; k++) this.matrix.isIdentity() || this.matrix.vectorMultiply(f[k]), this.stream[h++] = f[k].x, this.stream[h++] = f[k].y;
            h = this.gl;
            this.lineShader.uniforms.uMatrix = this.uMatrix.val;
            this.lineShader.uniforms.uColor = this.color.glArray;
            h.bufferData(h.ARRAY_BUFFER, this.stream.subarray(0, 2 * f.length), h.STREAM_DRAW);
            h.vertexAttribPointer(this.lineShader.attributes.aVertex, 2, h.FLOAT, !1, 0, 0);
            h.drawArrays(g ?
                h.LINE_STRIP : h.LINE_LOOP, 0, f.length);
            h.vertexAttribPointer(this.quadShader.attributes.aVertex, 2, h.FLOAT, !1, a, b);
            h.vertexAttribPointer(this.quadShader.attributes.aColor, 4, h.FLOAT, !1, a, c);
            h.vertexAttribPointer(this.quadShader.attributes.aTexture, 1, h.FLOAT, !1, a, d);
            h.vertexAttribPointer(this.quadShader.attributes.aRegion, 2, h.FLOAT, !1, a, e)
        },
        lineWidth: function(a) {
            this.gl.lineWidth(a)
        },
        clear: function() {
            this.flush();
            this.gl.clear(this.gl.COLOR_BUFFER_BIT)
        }
    })
})();
(function() {
    me.input = function() {
        return {
            _preventDefault: function(a) {
                a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0;
                a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                return !1
            },
            preventDefault: !0
        }
    }()
})();
(function(a) {
    a._KeyBinding = {};
    var b = {},
        c = {},
        d = {},
        e = {},
        f = {},
        g = !1;
    a._enableKeyboardEvent = function() {
        g || (window.addEventListener("keydown", a._keydown, !1), window.addEventListener("keyup", a._keyup, !1), g = !0)
    };
    a._keydown = function(c, g, l) {
        g = g || c.keyCode || c.which;
        var m = a._KeyBinding[g];
        me.event.publish(me.event.KEYDOWN, [m, g, m ? !d[m] : !0]);
        return m && (d[m] || (l = l ? l : g, e[m][l] || (b[m]++, e[m][l] = !0)), f[g]) ? a._preventDefault(c) : !0
    };
    a._keyup = function(c, g, l) {
        g = g || c.keyCode || c.which;
        var m = a._KeyBinding[g];
        me.event.publish(me.event.KEYUP, [m, g]);
        return m && (e[m][l ? l : g] = void 0, 0 < b[m] && b[m]--, d[m] = !1, f[g]) ? a._preventDefault(c) : !0
    };
    a.KEY = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE: 19,
        CAPS_LOCK: 20,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        PRINT_SCREEN: 42,
        INSERT: 45,
        DELETE: 46,
        NUM0: 48,
        NUM1: 49,
        NUM2: 50,
        NUM3: 51,
        NUM4: 52,
        NUM5: 53,
        NUM6: 54,
        NUM7: 55,
        NUM8: 56,
        NUM9: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        WINDOW_KEY: 91,
        NUMPAD0: 96,
        NUMPAD1: 97,
        NUMPAD2: 98,
        NUMPAD3: 99,
        NUMPAD4: 100,
        NUMPAD5: 101,
        NUMPAD6: 102,
        NUMPAD7: 103,
        NUMPAD8: 104,
        NUMPAD9: 105,
        MULTIPLY: 106,
        ADD: 107,
        SUBSTRACT: 109,
        DECIMAL: 110,
        DIVIDE: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        NUM_LOCK: 144,
        SCROLL_LOCK: 145,
        SEMICOLON: 186,
        PLUS: 187,
        COMMA: 188,
        MINUS: 189,
        PERIOD: 190,
        FORWAND_SLASH: 191,
        GRAVE_ACCENT: 192,
        OPEN_BRACKET: 219,
        BACK_SLASH: 220,
        CLOSE_BRACKET: 221,
        SINGLE_QUOTE: 222
    };
    a.isKeyPressed = function(a) {
        return b[a] &&
            !d[a] ? (c[a] && (d[a] = !0), !0) : !1
    };
    a.keyStatus = function(a) {
        return 0 < b[a]
    };
    a.triggerKeyEvent = function(b, c) {
        c ? a._keydown({}, b) : a._keyup({}, b)
    };
    a.bindKey = function(g, k, l, m) {
        a._enableKeyboardEvent();
        "boolean" !== typeof m && (m = a.preventDefault);
        a._KeyBinding[g] = k;
        f[g] = m;
        b[k] = 0;
        c[k] = l ? l : !1;
        d[k] = !1;
        e[k] = {}
    };
    a.unlockKey = function(a) {
        d[a] = !1
    };
    a.unbindKey = function(d) {
        var g = a._KeyBinding[d];
        b[g] = 0;
        c[g] = !1;
        e[g] = {};
        a._KeyBinding[d] = null;
        f[d] = null
    }
})(me.input);
(function(a) {
    function b(a, b) {
        for (var c = 2; c < a.length; ++c) "undefined" !== typeof a[c] && me.video.renderer.getScreenCanvas().addEventListener(a[c], b, !1)
    }

    function c() {
        u || (a._offset = me.video.getPos(), window.addEventListener("scroll", throttle(100, !1, function(b) {
            a._offset = me.video.getPos();
            me.event.publish(me.event.WINDOW_ONSCROLL, [b])
        }), !1), s = navigator.pointerEnabled ? A : navigator.msPointerEnabled ? z : me.device.touch ? r : p, b(s, k), v = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel", window.addEventListener(v,
            g, !1), "undefined" === typeof a.throttlingInterval && (a.throttlingInterval = ~~(1E3 / me.sys.fps)), 17 > a.throttlingInterval ? me.video.renderer.getScreenCanvas().addEventListener(s[x], h, !1) : me.video.renderer.getScreenCanvas().addEventListener(s[x], throttle(a.throttlingInterval, !1, function(a) {
            h(a)
        }), !1), u = !0)
    }

    function d(a, b, c, d) {
        if (a.callbacks[b]) {
            a.pointerId = d;
            for (var e = a.callbacks[b].length - 1; d = a.callbacks[b][e]; e--)
                if (!1 === d(c)) return !0
        }
        return !1
    }

    function e(a) {
        var b = !1;
        for (me.game.viewport.localToWorld(0, 0,
                F); 0 < B.length;) {
            var c = B.pop();
            l.push(c);
            if ("undefined" !== typeof a.timeStamp) {
                if (a.timeStamp < t) continue;
                t = a.timeStamp
            }
            me.device.pointerEnabled || (a.pointerId = c.id);
            a.gameScreenX = c.x;
            a.gameScreenY = c.y;
            a.gameWorldX = a.gameScreenX + F.x;
            a.gameWorldY = a.gameScreenY + F.y;
            q.setShape(a.gameWorldX, a.gameWorldY, a.width || 1, a.height || 1);
            c = me.collision.quadTree.retrieve(q, me.Container.prototype._sortReverseZ);
            c.push(me.game.viewport);
            for (var e = c.length, m; e--, m = c[e];) {
                if (n.has(m)) {
                    m = n.get(m);
                    var f = m.region,
                        g = f.ancestor,
                        h = f.getBounds();
                    !0 === f.floating ? (a.gameX = a.gameLocalX = a.gameScreenX, a.gameY = a.gameLocalY = a.gameScreenY) : (a.gameX = a.gameLocalX = a.gameWorldX, a.gameY = a.gameLocalY = a.gameWorldY);
                    "undefined" !== typeof g && (g = g.getBounds().pos, a.gameLocalX = a.gameX - g.x, a.gameLocalY = a.gameY - g.y);
                    f = h.containsPoint(a.gameX, a.gameY) && (h === f || f.containsPoint(a.gameLocalX, a.gameLocalY));
                    switch (s.indexOf(a.type)) {
                        case x:
                            if (m.pointerId === a.pointerId && !f) {
                                if (d(m, s[D], a, null)) {
                                    b = !0;
                                    break
                                }
                            } else if (null === m.pointerId && f && d(m, s[E], a, a.pointerId)) {
                                b = !0;
                                break
                            }
                            if (f && d(m, a.type, a, a.pointerId)) {
                                b = !0;
                                break
                            }
                            break;
                        case y:
                            if (m.pointerId === a.pointerId && f && d(m, a.type, a, null)) {
                                b = !0;
                                break
                            }
                            break;
                        case C:
                            if (m.pointerId === a.pointerId && d(m, a.type, a, null)) {
                                b = !0;
                                break
                            }
                            break;
                        default:
                            f && d(m, a.type, a, a.pointerId) && (b = !0)
                    }
                }
                if (!0 === b) break
            }
        }
        return b
    }

    function f(b) {
        var c = l.pop();
        if (b.touches)
            for (var d = 0, e = b.changedTouches.length; d < e; d++) {
                var m = b.changedTouches[d];
                a.globalToLocal(m.clientX, m.clientY, c);
                c.id = m.identifier;
                B.push(c)
            } else a.globalToLocal(b.clientX, b.clientY,
                c), c.id = b.pointerId || 1, B.push(c);
        !1 !== b.isPrimary && (a.pointer.pos.set(B[0].x, B[0].y), "number" === typeof b.width && (b.width === a.pointer.width && b.height === a.pointer.height || a.pointer.resize(b.width || 1, b.height || 1)))
    }

    function g(b) {
        if (b.target === me.video.renderer.getScreenCanvas()) {
            var c = {
                deltaMode: 1,
                type: "mousewheel",
                deltaX: b.deltaX,
                deltaY: b.deltaY,
                deltaZ: b.deltaZ
            };
            "mousewheel" === v && (c.deltaY = -0.025 * b.wheelDelta, b.wheelDeltaX && (c.deltaX = -0.025 * b.wheelDeltaX));
            if (e(c)) return a._preventDefault(b)
        }
        return !0
    }

    function h(b) {
        f(b);
        return e(b) ? a._preventDefault(b) : !0
    }

    function k(b) {
        f(b);
        if (e(b)) return a._preventDefault(b);
        var c = b.button || 0,
            d = a.pointer.bind[c];
        return d ? b.type === s[w] ? a._keydown(b, d, c + 1) : a._keyup(b, d, c + 1) : !0
    }
    for (var l = [], m = 0; 10 > m; m++) l.push(new me.Vector2d);
    var n = new Map,
        q = new me.Rect(0, 0, 1, 1),
        u = !1,
        v = "mousewheel",
        t = 0,
        s = null,
        A = "mousewheel pointermove pointerdown pointerup pointercancel pointerenter pointerleave".split(" "),
        z = "mousewheel MSPointerMove MSPointerDown MSPointerUp MSPointerCancel MSPointerEnter MSPointerLeave".split(" "),
        p = "mousewheel mousemove mousedown mouseup mousecancel mouseenter mouseleave".split(" "),
        r = [void 0, "touchmove", "touchstart", "touchend", "touchcancel", "touchenter", "touchleave"],
        x = 1,
        w = 2,
        y = 3,
        C = 4,
        E = 5,
        D = 6,
        F = new me.Vector2d,
        B = [];
    a._offset = null;
    a.pointer = new me.Rect(0, 0, 1, 1);
    a.pointer.bind = [0, 0, 0];
    a.pointer.LEFT = 0;
    a.pointer.MIDDLE = 1;
    a.pointer.RIGHT = 2;
    a.throttlingInterval = void 0;
    a.globalToLocal = function(b, c, d) {
        d = d || new me.Vector2d;
        var e = a._offset,
            m = me.device.getPixelRatio();
        b -= e.left;
        c -= e.top;
        e = me.sys.scale;
        if (1 !== e.x || 1 !== e.y) b /= e.x, c /= e.y;
        return d.set(b * m, c * m)
    };
    a.bindPointer = function() {
        var b = 2 > arguments.length ? a.pointer.LEFT : arguments[0],
            d = 2 > arguments.length ? arguments[0] : arguments[1];
        c();
        if (!a._KeyBinding[d]) throw new me.Error("no action defined for keycode " + d);
        a.pointer.bind[b] = d
    };
    a.unbindPointer = function(b) {
        a.pointer.bind["undefined" === typeof b ? a.pointer.LEFT : b] = null
    };
    a.registerPointerEvent = function(a, b, d) {
        c();
        if (-1 === A.indexOf(a)) throw new me.Error("invalid event type : " + a);
        A !== s && (a = s[A.indexOf(a)]);
        n.has(b) || n.set(b, {
            region: b,
            callbacks: {},
            pointerId: null
        });
        b = n.get(b);
        b.callbacks[a] || (b.callbacks[a] = []);
        b.callbacks[a].push(d)
    };
    a.releasePointerEvent = function(a, b, c) {
        if (-1 === A.indexOf(a)) throw new me.Error("invalid event type : " + a);
        A !== s && (a = s[A.indexOf(a)]);
        b = n.get(b);
        if ("undefined" === typeof c)
            for (; 0 < b.callbacks[a].length;) b.callbacks[a].pop();
        else b.callbacks[a].remove(c)
    };
    a._translatePointerEvents = function() {
        a.registerPointerEvent("pointermove", me.game.viewport, function(a) {
            me.event.publish(me.event.POINTERMOVE, [a])
        })
    }
})(me.input);
(function(a) {
    function b(a) {
        return a
    }

    function c(b, c, d) {
        return b = 0 < b ? d === a.GAMEPAD.BUTTONS.L2 ? Math.max(0, b - 2E4) / 111070 : (b - 1) / 131070 : (65536 + b) / 131070 + 0.5
    }

    function d(a, c) {
        var d = a.replace(f, function(a, b, c) {
                return "000".substr(b.length - 1) + b + "-" + "000".substr(c.length - 1) + c + "-"
            }),
            e = a.replace(f, function(a, b, c) {
                return b.replace(g, "") + "-" + c.replace(g, "") + "-"
            });
        c.analog = c.analog || c.buttons.map(function() {
            return -1
        });
        c.normalize_fn = c.normalize_fn || b;
        k.set(d, c);
        k.set(e, c)
    }
    var e = 0.1,
        f = /^([0-9a-f]{1,4})-([0-9a-f]{1,4})-/i,
        g =
        /^0+/,
        h = {},
        k = new Map;
    [
        ["45e-28e-Xbox 360 Wired Controller", {
            axes: [0, 1, 3, 4],
            buttons: [11, 12, 13, 14, 8, 9, -1, -1, 5, 4, 6, 7, 0, 1, 2, 3, 10],
            analog: [-1, -1, -1, -1, -1, -1, 2, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            normalize_fn: function(b, c, d) {
                return d === a.GAMEPAD.BUTTONS.L2 || d === a.GAMEPAD.BUTTONS.R2 ? (b + 1) / 2 : b
            }
        }],
        ["54c-268-PLAYSTATION(R)3 Controller", {
            axes: [0, 1, 2, 3],
            buttons: [14, 13, 15, 12, 10, 11, 8, 9, 0, 3, 1, 2, 4, 6, 7, 5, 16]
        }],
        ["54c-5c4-Wireless Controller", {
            axes: [0, 1, 2, 3],
            buttons: [1, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 16, 17, 12, 13]
        }],
        ["2836-1-OUYA Game Controller", {
            axes: [0, 3, 7, 9],
            buttons: [3, 6, 4, 5, 7, 8, 15, 16, -1, -1, 9, 10, 11, 12, 13, 14, -1],
            analog: [-1, -1, -1, -1, -1, -1, 5, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            normalize_fn: c
        }],
        ["OUYA Game Controller (Vendor: 2836 Product: 0001)", {
            axes: [0, 1, 3, 4],
            buttons: [0, 3, 1, 2, 4, 5, 12, 13, -1, -1, 6, 7, 8, 9, 10, 11, -1],
            analog: [-1, -1, -1, -1, -1, -1, 2, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            normalize_fn: c
        }]
    ].forEach(function(a) {
        d(a[0], a[1])
    });
    window.addEventListener("gamepadconnected", function(a) {
        me.event.publish(me.event.GAMEPAD_CONNECTED, [a.gamepad])
    }, !1);
    window.addEventListener("gamepaddisconnected",
        function(a) {
            me.event.publish(me.event.GAMEPAD_DISCONNECTED, [a.gamepad])
        }, !1);
    a._updateGamepads = navigator.getGamepads ? function() {
        var b = navigator.getGamepads(),
            c = {};
        Object.keys(h).forEach(function(d) {
            var f = b[d];
            if (f) {
                var g = null;
                "standard" !== f.mapping && (g = k.get(f.id));
                var v = h[d];
                Object.keys(v.buttons).forEach(function(b) {
                    var h = v.buttons[b],
                        k = b,
                        l = -1;
                    if (g && (k = g.buttons[b], l = g.analog[b], 0 > k && 0 > l)) return;
                    var p = f.buttons[k] || {};
                    g && 0 <= l && (l = g.normalize_fn(f.axes[l], -1, +b), p = {
                        value: l,
                        pressed: p.pressed || Math.abs(l) >=
                            e
                    });
                    me.event.publish(me.event.GAMEPAD_UPDATE, [d, "buttons", +b, p]);
                    !h.pressed && p.pressed ? a._keydown(c, h.keyCode, k + 256) : h.pressed && !p.pressed && a._keyup(c, h.keyCode, k + 256);
                    h.value = p.value;
                    h.pressed = p.pressed
                });
                Object.keys(v.axes).forEach(function(b) {
                    var h = v.axes[b],
                        k = b;
                    if (g && (k = g.axes[b], 0 > k)) return;
                    var l = f.axes[k];
                    if ("undefined" !== typeof l) {
                        g && (l = g.normalize_fn(l, +b, -1));
                        var p = Math.sign(l) || 1;
                        if (h[p]) {
                            var r = Math.abs(l) >= e + Math.abs(h[p].threshold);
                            me.event.publish(me.event.GAMEPAD_UPDATE, [d, "axes", +b,
                                l
                            ]);
                            !h[p].pressed && r ? a._keydown(c, h[p].keyCode, k + 256) : (h[p].pressed || h[-p] && h[-p].pressed) && !r && (p = h[p].pressed ? p : -p, a._keyup(c, h[p].keyCode, k + 256));
                            h[p].value = l;
                            h[p].pressed = r
                        }
                    }
                })
            }
        })
    } : function() {};
    a.GAMEPAD = {
        AXES: {
            LX: 0,
            LY: 1,
            RX: 2,
            RY: 3,
            EXTRA_1: 4,
            EXTRA_2: 5,
            EXTRA_3: 6,
            EXTRA_4: 7
        },
        BUTTONS: {
            FACE_1: 0,
            FACE_2: 1,
            FACE_3: 2,
            FACE_4: 3,
            L1: 4,
            R1: 5,
            L2: 6,
            R2: 7,
            SELECT: 8,
            BACK: 8,
            START: 9,
            FORWARD: 9,
            L3: 10,
            R3: 11,
            UP: 12,
            DOWN: 13,
            LEFT: 14,
            RIGHT: 15,
            HOME: 16,
            EXTRA_1: 17,
            EXTRA_2: 18,
            EXTRA_3: 19,
            EXTRA_4: 20
        }
    };
    a.bindGamepad = function(b, c, d) {
        if (!a._KeyBinding[d]) throw new me.Error("no action defined for keycode " +
            d);
        "object" !== typeof c && (c = {
            type: "buttons",
            code: c
        }, console.warn("Deprecated: me.input.bindGamepad parameteres have changed"));
        h[b] || (h[b] = {
            axes: {},
            buttons: {}
        });
        d = {
            keyCode: d,
            value: 0,
            pressed: !1,
            threshold: c.threshold
        };
        b = h[b][c.type];
        if ("buttons" === c.type) b[c.code] = d;
        else if ("axes" === c.type) {
            var e = Math.sign(c.threshold) || 1;
            b[c.code] || (b[c.code] = {});
            b[c.code][e] = d
        }
    };
    a.unbindGamepad = function(a, b) {
        if (!h[a]) throw new me.Error("no bindings for gamepad " + a);
        h[a].buttons[b] = {}
    };
    a.setGamepadDeadzone = function(a) {
        e =
            a
    };
    a.setGamepadMapping = d
})(me.input);
(function() {
    var a = function() {
        return {
            decode: function(a) {
                a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                if (me.device.nativeBase64) return window.atob(a);
                for (var c = [], d, e, f, g, h, k = 0; k < a.length;) d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), d =
                    d << 2 | e >> 4, e = (e & 15) << 4 | g >> 2, f = (g & 3) << 6 | h, c.push(String.fromCharCode(d)), 64 !== g && c.push(String.fromCharCode(e)), 64 !== h && c.push(String.fromCharCode(f));
                return c = c.join("")
            },
            encode: function(a) {
                a = a.replace(/\r\n/g, "\n");
                if (me.device.nativeBase64) return window.btoa(a);
                for (var c = [], d, e, f, g, h, k, l = 0; l < a.length;) d = a.charCodeAt(l++), e = a.charCodeAt(l++), f = a.charCodeAt(l++), g = d >> 2, d = (d & 3) << 4 | e >> 4, h = (e & 15) << 2 | f >> 6, k = f & 63, isNaN(e) ? h = k = 64 : isNaN(f) && (k = 64), c.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g)),
                    c.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(d)), c.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h)), c.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(k));
                return c = c.join("")
            }
        }
    }();
    me.utils = function() {
        var b = {},
            c = "",
            d = 0,
            e = /^.*(\\|\/|\:)/,
            f = /\.[^\.]*$/;
        b.decodeBase64 = function(b) {
            return a.decode(b)
        };
        b.encodeBase64 = function(b) {
            return a.encode(b)
        };
        b.decodeBase64AsArray = function(b, c) {
            c = c || 1;
            var d = a.decode(b),
                e, m, f, q = new Uint32Array(d.length / c);
            e = 0;
            for (f = d.length / c; e < f; e++)
                for (q[e] = 0, m = c - 1; 0 <= m; --m) q[e] += d.charCodeAt(e * c + m) << (m << 3);
            return q
        };
        b.decompress = function() {
            throw new me.Error("GZIP/ZLIB compressed TMX Tile Map not supported!");
        };
        b.decodeCSV = function(a) {
            a = a.replace("\n", "").trim().split(",");
            for (var b = [], c = 0; c < a.length; c++) b.push(+a[c]);
            return b
        };
        b.getBasename = function(a) {
            return a.replace(e, "").replace(f, "")
        };
        b.getFileExtension = function(a) {
            return a.substring(a.lastIndexOf(".") + 1, a.length)
        };
        b.getPixels =
            function(a) {
                if (a instanceof HTMLImageElement) {
                    var b = me.CanvasRenderer.getContext2d(me.video.createCanvas(a.width, a.height));
                    b.drawImage(a, 0, 0);
                    return b.getImageData(0, 0, a.width, a.height)
                }
                return a.getContext("2d").getImageData(0, 0, a.width, a.height)
            };
        b.getImage = function(a) {
            return "string" === typeof a ? me.loader.getImage(me.utils.getBasename(a)) : a
        };
        b.resetGUID = function(a, b) {
            c = a.toString().toUpperCase().toHex();
            d = b || 0
        };
        b.createGUID = function(a) {
            d += a || 1;
            return c + "-" + (a || d)
        };
        return b
    }()
})();
(function() {
    var a = /^rgba?\((\d+), ?(\d+), ?(\d+)(, ?([\d\.]+))?\)$/,
        b = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])$/,
        c = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])([\da-fA-F])$/,
        d = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/,
        e = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/,
        f = new Map;
    [
        ["black", [0, 0, 0]],
        ["silver", [192, 192, 129]],
        ["gray", [128, 128, 128]],
        ["white", [255, 255, 255]],
        ["maroon", [128, 0, 0]],
        ["red", [255, 0, 0]],
        ["purple", [128, 0, 128]],
        ["fuchsia", [255, 0, 255]],
        ["green", [0, 128, 0]],
        ["lime", [0, 255, 0]],
        ["olive", [128, 128, 0]],
        ["yellow", [255, 255, 0]],
        ["navy", [0, 0, 128]],
        ["blue", [0, 0, 255]],
        ["teal", [0, 128, 128]],
        ["aqua", [0, 255, 255]],
        ["orange", [255, 165, 0]],
        ["aliceblue", [240, 248, 245]],
        ["antiquewhite", [250, 235, 215]],
        ["aquamarine", [127, 255, 212]],
        ["azure", [240, 255, 255]],
        ["beige", [245, 245, 220]],
        ["bisque", [255, 228, 196]],
        ["blanchedalmond", [255, 235, 205]],
        ["blueviolet", [138, 43, 226]],
        ["brown", [165, 42, 42]],
        ["burlywood", [222, 184, 35]],
        ["cadetblue", [95, 158, 160]],
        ["chartreuse", [127, 255, 0]],
        ["chocolate", [210,
            105, 30
        ]],
        ["coral", [255, 127, 80]],
        ["cornflowerblue", [100, 149, 237]],
        ["cornsilk", [255, 248, 220]],
        ["crimson", [220, 20, 60]],
        ["darkblue", [0, 0, 139]],
        ["darkcyan", [0, 139, 139]],
        ["darkgoldenrod", [184, 134, 11]],
        ["darkgray[*]", [169, 169, 169]],
        ["darkgreen", [0, 100, 0]],
        ["darkgrey[*]", [169, 169, 169]],
        ["darkkhaki", [189, 183, 107]],
        ["darkmagenta", [139, 0, 139]],
        ["darkolivegreen", [85, 107, 47]],
        ["darkorange", [255, 140, 0]],
        ["darkorchid", [153, 50, 204]],
        ["darkred", [139, 0, 0]],
        ["darksalmon", [233, 150, 122]],
        ["darkseagreen", [143, 188, 143]],
        ["darkslateblue", [72, 61, 139]],
        ["darkslategray", [47, 79, 79]],
        ["darkslategrey", [47, 79, 79]],
        ["darkturquoise", [0, 206, 209]],
        ["darkviolet", [148, 0, 211]],
        ["deeppink", [255, 20, 147]],
        ["deepskyblue", [0, 191, 255]],
        ["dimgray", [105, 105, 105]],
        ["dimgrey", [105, 105, 105]],
        ["dodgerblue", [30, 144, 255]],
        ["firebrick", [178, 34, 34]],
        ["floralwhite", [255, 250, 240]],
        ["forestgreen", [34, 139, 34]],
        ["gainsboro", [220, 220, 220]],
        ["ghostwhite", [248, 248, 255]],
        ["gold", [255, 215, 0]],
        ["goldenrod", [218, 165, 32]],
        ["greenyellow", [173, 255, 47]],
        ["grey", [128, 128, 128]],
        ["honeydew", [240, 255, 240]],
        ["hotpink", [255, 105, 180]],
        ["indianred", [205, 92, 92]],
        ["indigo", [75, 0, 130]],
        ["ivory", [255, 255, 240]],
        ["khaki", [240, 230, 140]],
        ["lavender", [230, 230, 250]],
        ["lavenderblush", [255, 240, 245]],
        ["lawngreen", [124, 252, 0]],
        ["lemonchiffon", [255, 250, 205]],
        ["lightblue", [173, 216, 230]],
        ["lightcoral", [240, 128, 128]],
        ["lightcyan", [224, 255, 255]],
        ["lightgoldenrodyellow", [250, 250, 210]],
        ["lightgray", [211, 211, 211]],
        ["lightgreen", [144, 238, 144]],
        ["lightgrey", [211, 211, 211]],
        ["lightpink", [255, 182, 193]],
        ["lightsalmon", [255, 160, 122]],
        ["lightseagreen", [32, 178, 170]],
        ["lightskyblue", [135, 206, 250]],
        ["lightslategray", [119, 136, 153]],
        ["lightslategrey", [119, 136, 153]],
        ["lightsteelblue", [176, 196, 222]],
        ["lightyellow", [255, 255, 224]],
        ["limegreen", [50, 205, 50]],
        ["linen", [250, 240, 230]],
        ["mediumaquamarine", [102, 205, 170]],
        ["mediumblue", [0, 0, 205]],
        ["mediumorchid", [186, 85, 211]],
        ["mediumpurple", [147, 112, 219]],
        ["mediumseagreen", [60, 179, 113]],
        ["mediumslateblue", [123, 104, 238]],
        ["mediumspringgreen", [0, 250,
            154
        ]],
        ["mediumturquoise", [72, 209, 204]],
        ["mediumvioletred", [199, 21, 133]],
        ["midnightblue", [25, 25, 112]],
        ["mintcream", [245, 255, 250]],
        ["mistyrose", [255, 228, 225]],
        ["moccasin", [255, 228, 181]],
        ["navajowhite", [255, 222, 173]],
        ["oldlace", [253, 245, 230]],
        ["olivedrab", [107, 142, 35]],
        ["orangered", [255, 69, 0]],
        ["orchid", [218, 112, 214]],
        ["palegoldenrod", [238, 232, 170]],
        ["palegreen", [152, 251, 152]],
        ["paleturquoise", [175, 238, 238]],
        ["palevioletred", [219, 112, 147]],
        ["papayawhip", [255, 239, 213]],
        ["peachpuff", [255, 218, 185]],
        ["peru", [205, 133, 63]],
        ["pink", [255, 192, 203]],
        ["plum", [221, 160, 221]],
        ["powderblue", [176, 224, 230]],
        ["rosybrown", [188, 143, 143]],
        ["royalblue", [65, 105, 225]],
        ["saddlebrown", [139, 69, 19]],
        ["salmon", [250, 128, 114]],
        ["sandybrown", [244, 164, 96]],
        ["seagreen", [46, 139, 87]],
        ["seashell", [255, 245, 238]],
        ["sienna", [160, 82, 45]],
        ["skyblue", [135, 206, 235]],
        ["slateblue", [106, 90, 205]],
        ["slategray", [112, 128, 144]],
        ["slategrey", [112, 128, 144]],
        ["snow", [255, 250, 250]],
        ["springgreen", [0, 255, 127]],
        ["steelblue", [70, 130, 180]],
        ["tan", [210, 180,
            140
        ]],
        ["thistle", [216, 191, 216]],
        ["tomato", [255, 99, 71]],
        ["turquoise", [64, 224, 208]],
        ["violet", [238, 130, 238]],
        ["wheat", [245, 222, 179]],
        ["whitesmoke", [245, 245, 245]],
        ["yellowgreen", [154, 205, 50]]
    ].forEach(function(a) {
        f.set(a[0], a[1])
    });
    me.Color = me.Object.extend({
        init: function(a, b, c, d) {
            "undefined" === typeof this.glArray && (this.glArray = new Float32Array([0, 0, 0, 1]));
            return this.setColor(a, b, c, d)
        },
        setColor: function(a, b, c, d) {
            if (a instanceof me.Color) return this.glArray.set(a.glArray), a;
            this.r = a;
            this.g = b;
            this.b =
                c;
            this.alpha = d;
            return this
        },
        clone: function() {
            return me.pool.pull("me.Color", this)
        },
        copy: function(a) {
            return a instanceof me.Color ? (this.glArray.set(a.glArray), this) : this.parseCSS(a)
        },
        add: function(a) {
            this.glArray[0] = (this.glArray[0] + a.glArray[0]).clamp(0, 1);
            this.glArray[1] = (this.glArray[1] + a.glArray[1]).clamp(0, 1);
            this.glArray[2] = (this.glArray[2] + a.glArray[2]).clamp(0, 1);
            this.glArray[3] = (this.glArray[3] + a.glArray[3]) / 2;
            return this
        },
        darken: function(a) {
            a = a.clamp(0, 1);
            this.glArray[0] *= a;
            this.glArray[1] *=
                a;
            this.glArray[2] *= a;
            return this
        },
        lighten: function(a) {
            a = a.clamp(0, 1);
            this.glArray[0] = (this.glArray[0] + (1 - this.glArray[0]) * a).clamp(0, 1);
            this.glArray[1] = (this.glArray[1] + (1 - this.glArray[1]) * a).clamp(0, 1);
            this.glArray[2] = (this.glArray[2] + (1 - this.glArray[2]) * a).clamp(0, 1);
            return this
        },
        random: function() {
            return this.setColor(256 * Math.random(), 256 * Math.random(), 256 * Math.random(), this.alpha)
        },
        equals: function(a) {
            return this.glArray[0] === a.glArray[0] && this.glArray[1] === a.glArray[1] && this.glArray[2] === a.glArray[2] &&
                this.glArray[3] === a.glArray[3]
        },
        parseCSS: function(a) {
            return f.has(a) ? this.setColor.apply(this, f.get(a)) : this.parseRGB(a)
        },
        parseRGB: function(b) {
            var c = a.exec(b);
            return c ? this.setColor(+c[1], +c[2], +c[3], +c[5]) : this.parseHex(b)
        },
        parseHex: function(a) {
            var f;
            if (f = e.exec(a)) return this.setColor(parseInt(f[1], 16), parseInt(f[2], 16), parseInt(f[3], 16), (parseInt(f[4], 16).clamp(0, 255) / 255).toFixed(1));
            if (f = d.exec(a)) return this.setColor(parseInt(f[1], 16), parseInt(f[2], 16), parseInt(f[3], 16));
            if (f = c.exec(a)) return this.setColor(parseInt(f[1] +
                f[1], 16), parseInt(f[2] + f[2], 16), parseInt(f[3] + f[3], 16), (parseInt(f[4] + f[4], 16).clamp(0, 255) / 255).toFixed(1));
            if (f = b.exec(a)) return this.setColor(parseInt(f[1] + f[1], 16), parseInt(f[2] + f[2], 16), parseInt(f[3] + f[3], 16));
            throw new me.Color.Error("invalid parameter: " + a);
        },
        toGL: function() {
            return this.glArray
        },
        toHex: function() {
            return "#" + this.r.toHex() + this.g.toHex() + this.b.toHex()
        },
        toHex8: function() {
            return "#" + this.r.toHex() + this.g.toHex() + this.b.toHex() + this.alpha.toHex()
        },
        toRGB: function() {
            return "rgb(" + this.r +
                "," + this.g + "," + this.b + ")"
        },
        toRGBA: function() {
            return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.alpha + ")"
        }
    });
    Object.defineProperty(me.Color.prototype, "r", {
        get: function() {
            return ~~(255 * this.glArray[0])
        },
        set: function(a) {
            this.glArray[0] = (~~a || 0).clamp(0, 255) / 255
        },
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(me.Color.prototype, "g", {
        get: function() {
            return ~~(255 * this.glArray[1])
        },
        set: function(a) {
            this.glArray[1] = (~~a || 0).clamp(0, 255) / 255
        },
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(me.Color.prototype,
        "b", {
            get: function() {
                return ~~(255 * this.glArray[2])
            },
            set: function(a) {
                this.glArray[2] = (~~a || 0).clamp(0, 255) / 255
            },
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(me.Color.prototype, "alpha", {
        get: function() {
            return this.glArray[3]
        },
        set: function(a) {
            this.glArray[3] = "undefined" === typeof a ? 1 : (+a).clamp(0, 1)
        },
        enumerable: !0,
        configurable: !0
    });
    me.Color.Error = me.Error.extend({
        init: function(a) {
            me.Error.prototype.init.apply(this, [a]);
            this.name = "me.Color.Error"
        }
    })
})();
(function() {
    me.save = function() {
        var a = {},
            b = {
                _init: function() {
                    !0 === me.device.localStorage && (JSON.parse(localStorage.getItem("me.save")) || []).forEach(function(b) {
                        a[b] = JSON.parse(localStorage.getItem("me.save." + b))
                    })
                },
                add: function(c) {
                    Object.keys(c).forEach(function(d) {
                        "add" !== d && "remove" !== d && (function(c) {
                                Object.defineProperty(b, c, {
                                    configurable: !0,
                                    enumerable: !0,
                                    get: function() {
                                        return a[c]
                                    },
                                    set: function(b) {
                                        a[c] = b;
                                        !0 === me.device.localStorage && localStorage.setItem("me.save." + c, JSON.stringify(b))
                                    }
                                })
                            }(d), d in
                            a || (b[d] = c[d]))
                    });
                    !0 === me.device.localStorage && localStorage.setItem("me.save", JSON.stringify(Object.keys(a)))
                },
                remove: function(b) {
                    "add" !== b && "remove" !== b && "undefined" !== typeof a[b] && (delete a[b], !0 === me.device.localStorage && (localStorage.removeItem("me.save." + b), localStorage.setItem("me.save", JSON.stringify(Object.keys(a)))))
                }
            };
        return b
    }()
})();
(function() {
    me.TMXUtils = function() {
        function a(a, b, e) {
            if ("string" !== typeof e) return e;
            switch (b) {
                case "int":
                case "float":
                    e = Number(e);
                    break;
                case "bool":
                    e = "true" === e;
                    break;
                default:
                    if (!e || e.isBoolean()) e = e ? "true" === e : !0;
                    else if (e.isNumeric()) e = Number(e);
                    else if (0 === e.search(/^json:/i)) {
                        b = e.split(/^json:/i)[1];
                        try {
                            e = JSON.parse(b)
                        } catch (f) {
                            throw new me.Error("Unable to parse JSON: " + b);
                        }
                    } else if (0 === e.search(/^eval:/i)) {
                        b = e.split(/^eval:/i)[1];
                        try {
                            e = eval(b)
                        } catch (g) {
                            throw new me.Error("Unable to evaluate: " +
                                b);
                        }
                    } else if ((b = e.match(/^#([\da-fA-F])([\da-fA-F]{3})$/)) || (b = e.match(/^#([\da-fA-F]{2})([\da-fA-F]{6})$/))) e = "#" + b[2] + b[1];
                    0 === a.search(/^(ratio|anchorPoint)$/) && "number" === typeof e && (e = {
                        x: e,
                        y: e
                    })
            }
            return e
        }
        var b = {
            decode: function(a, b, e) {
                e = e || "none";
                b = b || "none";
                switch (b) {
                    case "csv":
                        return me.utils.decodeCSV(a);
                    case "base64":
                        return a = me.utils.decodeBase64AsArray(a, 4), "none" === e ? a : me.utils.decompress(a, e);
                    case "none":
                        return a;
                    case "xml":
                        throw new me.Error("XML encoding is deprecated, use base64 instead");
                    default:
                        throw new me.Error("Unknown layer encoding: " + b);
                }
            },
            normalize: function(c, d) {
                var e = d.nodeName;
                switch (e) {
                    case "data":
                        e = b.parse(d);
                        e.encoding = e.encoding || "xml";
                        c.data = b.decode(e.text, e.encoding, e.compression);
                        c.encoding = "none";
                        break;
                    case "imagelayer":
                    case "layer":
                    case "objectgroup":
                        var f = b.parse(d);
                        f.type = "layer" === e ? "tilelayer" : e;
                        f.image && (f.image = f.image.source);
                        c.layers = c.layers || [];
                        c.layers.push(f);
                        break;
                    case "animation":
                        c.animation = b.parse(d).frames;
                        break;
                    case "frame":
                    case "object":
                        e += "s";
                        c[e] = c[e] || [];
                        c[e].push(b.parse(d));
                        break;
                    case "tile":
                        e = b.parse(d);
                        c.tiles = c.tiles || {};
                        c.tiles[e.id] = e;
                        break;
                    case "tileset":
                        e = b.parse(d);
                        e.image && (e.imagewidth = e.image.width, e.imageheight = e.image.height, e.image = e.image.source);
                        c.tilesets = c.tilesets || [];
                        c.tilesets.push(e);
                        break;
                    case "polygon":
                    case "polyline":
                        c[e] = [];
                        for (var f = b.parse(d).points.split(" "), g = 0, h; g < f.length; g++) h = f[g].split(","), c[e].push({
                            x: +h[0],
                            y: +h[1]
                        });
                        break;
                    case "properties":
                        c.properties = b.parse(d);
                        break;
                    case "property":
                        e = b.parse(d);
                        c[e.name] = a(e.name, e.type || "string", e.value);
                        break;
                    default:
                        c[e] = b.parse(d)
                }
            },
            parse: function(a) {
                var d = {},
                    e = "";
                if (1 === a.nodeType && a.attributes && 0 < a.attributes.length)
                    for (var f = 0; f < a.attributes.length; f++) {
                        var g = a.attributes.item(f);
                        "undefined" !== typeof g.name ? d[g.name] = g.value : d[g.nodeName] = g.nodeValue
                    }
                if (a.hasChildNodes())
                    for (f = 0; f < a.childNodes.length; f++) switch (g = a.childNodes.item(f), g.nodeType) {
                        case 1:
                            b.normalize(d, g);
                            break;
                        case 3:
                            e += g.nodeValue.trim()
                    }
                e && (d.text = e);
                return d
            },
            applyTMXProperties: function(b,
                d) {
                var e = d.properties,
                    f = d.propertytypes;
                if ("undefined" !== typeof e)
                    for (var g in e)
                        if (e.hasOwnProperty(g)) {
                            var h = "string";
                            "undefined" !== typeof f && (h = f[g]);
                            b[g] = a(g, h, e[g])
                        }
            }
        };
        return b
    }()
})();
(function() {
    me.TMXObjectGroup = me.Object.extend({
        init: function(a, b, c, d, e) {
            this.name = a;
            this.width = b.width;
            this.height = b.height;
            this.z = e;
            this.objects = [];
            this.opacity = !0 === ("undefined" !== typeof b.visible ? b.visible : !0) ? (+b.opacity || 1).clamp(0, 1) : 0;
            me.TMXUtils.applyTMXProperties(this, b);
            if (a = b.objects) {
                var f = this;
                a.forEach(function(a) {
                    f.objects.push(new me.TMXObject(a, c, d, e))
                })
            }
        },
        destroy: function() {
            this.objects = null
        },
        getObjectCount: function() {
            return this.objects.length
        },
        getObjectByIndex: function(a) {
            return this.objects[a]
        }
    });
    me.TMXObject = me.Object.extend({
        init: function(a, b, c, d) {
            this.points = void 0;
            this.name = a.name;
            this.x = +a.x;
            this.y = +a.y;
            this.z = +d;
            this.width = +a.width || 0;
            this.height = +a.height || 0;
            this.gid = +a.gid || null;
            this.type = a.type;
            this.rotation = Number.prototype.degToRad(+a.rotation || 0);
            this.id = +a.id || void 0;
            this.orientation = b;
            this.shapes = void 0;
            this.isPolyLine = this.isPolygon = this.isEllipse = !1;
            if ("number" === typeof this.gid) this.setTile(c);
            else if ("undefined" !== typeof a.ellipse) this.isEllipse = !0;
            else if (b = a.polygon, "undefined" !==
                typeof b ? this.isPolygon = !0 : (b = a.polyline, "undefined" !== typeof b && (this.isPolyLine = !0)), "undefined" !== typeof b) {
                this.points = [];
                var e = this;
                b.forEach(function(a) {
                    e.points.push(new me.Vector2d(a.x, a.y))
                })
            }
            me.game.tmxRenderer.adjustPosition(this);
            me.TMXUtils.applyTMXProperties(this, a);
            this.shapes || (this.shapes = this.parseTMXShapes())
        },
        setTile: function(a) {
            a = a.getTilesetByGid(this.gid);
            this.width = this.framewidth = a.tilewidth;
            this.height = this.frameheight = a.tileheight;
            this.tile = new me.Tile(this.x, this.y, this.gid,
                a)
        },
        parseTMXShapes: function() {
            var a = 0,
                b = [];
            if (!0 === this.isEllipse) b.push((new me.Ellipse(this.width / 2, this.height / 2, this.width, this.height)).rotate(this.rotation));
            else if (!0 === this.isPolygon) b.push((new me.Polygon(0, 0, this.points)).rotate(this.rotation));
            else if (!0 === this.isPolyLine)
                for (var c = this.points, d, e, f = c.length - 1, a = 0; a < f; a++) d = c[a], e = c[a + 1].clone(), 0 !== this.rotation && (d = d.rotate(this.rotation), e = e.rotate(this.rotation)), b.push(new me.Line(0, 0, [d, e]));
            else b.push((new me.Polygon(0, 0, [new me.Vector2d,
                new me.Vector2d(this.width, 0), new me.Vector2d(this.width, this.height), new me.Vector2d(0, this.height)
            ])).rotate(this.rotation));
            if ("isometric" === this.orientation)
                for (a = 0; a < b.length; a++) b[a].rotate(Math.PI / 4).scale(Math.SQRT2, Math.SQRT1_2);
            return b
        },
        getObjectPropertyByName: function(a) {
            return this[a]
        }
    })
})();
(function() {
    me.Tile = me.Rect.extend({
        init: function(a, b, c, d) {
            this.tileset = d;
            this.transform = null;
            me.Rect.prototype.init.apply(this, [a * d.tilewidth, b * d.tileheight, d.tilewidth, d.tileheight]);
            this.col = a;
            this.row = b;
            this.tileId = c;
            this.flippedX = 0 !== (this.tileId & 2147483648);
            this.flippedY = 0 !== (this.tileId & 1073741824);
            this.flippedAD = 0 !== (this.tileId & 536870912);
            this.flipped = this.flippedX || this.flippedY || this.flippedAD;
            !0 === this.flipped && this.createTransform();
            this.tileId &= 536870911
        },
        createTransform: function() {
            null ===
                this.transform && (this.transform = new me.Matrix2d);
            this.transform.identity();
            var a = this.transform.val;
            this.flippedAD && (this.transform.set(0, 1, 0, 1, 0, 0, 0, 0, 1), this.transform.translate(0, this.height - this.width));
            this.flippedX && (this.transform.translate(this.flippedAD ? 0 : this.width, this.flippedAD ? this.height : 0), a[0] *= -1, a[3] *= -1);
            this.flippedY && (this.transform.translate(this.flippedAD ? this.width : 0, this.flippedAD ? 0 : this.height), a[1] *= -1, a[4] *= -1)
        },
        getRenderable: function(a) {
            var b, c = this.tileset;
            if (c.animations.has(this.tileId)) {
                var d = [],
                    e = [];
                c.animations.get(this.tileId).frames.forEach(function(a) {
                    e.push(a.tileid);
                    d.push({
                        name: "" + a.tileid,
                        delay: a.duration
                    })
                });
                b = c.texture.createAnimationFromName(e, a);
                b.addAnimation(this.tileId - c.firstgid, d);
                b.setCurrentAnimation(this.tileId - c.firstgid)
            } else b = c.texture.createSpriteFromName(this.tileId - c.firstgid, a);
            if ("undefined" !== typeof a && (a = a.rotation || 0, 0 !== a)) switch (b._sourceAngle += a, a) {
                case Math.PI:
                    b.translate(0, 2 * this.height);
                    break;
                case Math.PI / 2:
                    b.translate(this.width, this.height);
                    break;
                case -(Math.PI / 2):
                    b.translate(-this.width, this.height)
            }!0 === this.flipped && (b.flipX(this.flippedX), b.flipY(this.flippedY));
            return b
        }
    })
})();
(function() {
    me.TMXTileset = me.Object.extend({
        init: function(a) {
            var b = 0;
            this.TileProperties = [];
            this.firstgid = this.lastgid = +a.firstgid;
            if ("undefined" !== typeof a.source) {
                var c = a.source,
                    d = me.utils.getFileExtension(c);
                if ("tsx" === d || "json" === d)
                    if (a = me.loader.getTMX(me.utils.getBasename(c)), !a) throw new me.Error(c + " external TSX/JSON tileset not found");
            }
            this.name = a.name;
            this.tilewidth = +a.tilewidth;
            this.tileheight = +a.tileheight;
            this.spacing = +a.spacing || 0;
            this.margin = +a.margin || 0;
            this.tileoffset = new me.Vector2d;
            this.isAnimated = !1;
            this.animations = new Map;
            this._lastUpdate = 0;
            c = a.tiles;
            for (b in c) c.hasOwnProperty(b) && ("animation" in c[b] && (this.isAnimated = !0, this.animations.set(+b + this.firstgid, {
                dt: 0,
                idx: 0,
                frames: c[b].animation,
                cur: c[b].animation[0]
            })), "properties" in c[b] && this.setTileProperty(+b + this.firstgid, c[b].properties));
            if (c = a.tileoffset) this.tileoffset.x = +c.x, this.tileoffset.y = +c.y;
            if (c = a.tileproperties)
                for (b in c) c.hasOwnProperty(b) && this.setTileProperty(+b + this.firstgid, c[b]);
            this.image = me.utils.getImage(a.image);
            if (!this.image) throw new me.TMXTileset.Error("melonJS: '" + a.image + "' file for tileset '" + this.name + "' not found!");
            this.texture = me.video.renderer.cache.get(this.image, {
                framewidth: this.tilewidth,
                frameheight: this.tileheight,
                margin: this.margin,
                spacing: this.spacing
            });
            this.atlas = this.texture.getAtlas();
            this.lastgid = this.firstgid + ((+a.columns || ~~(this.image.width / (this.tilewidth + this.spacing))) * ~~(this.image.height / (this.tileheight + this.spacing)) - 1 || 0);
            a.tilecount && this.lastgid - this.firstgid + 1 !== +a.tilecount &&
                console.warn("Computed tilecount (" + (this.lastgid - this.firstgid + 1) + ") does not match expected tilecount (" + a.tilecount + ")")
        },
        setTileProperty: function(a, b) {
            this.TileProperties[a] = b
        },
        contains: function(a) {
            return a >= this.firstgid && a <= this.lastgid
        },
        getViewTileId: function(a) {
            return a = this.animations.has(a) ? this.animations.get(a).cur.tileid : a - this.firstgid
        },
        getTileProperties: function(a) {
            return this.TileProperties[a]
        },
        update: function(a) {
            var b = 0,
                c = me.timer.getTime(),
                d = !1;
            this._lastUpdate !== c && (this._lastUpdate =
                c, this.animations.forEach(function(c) {
                    c.dt += a;
                    for (b = c.cur.duration; c.dt >= b;) c.dt -= b, c.idx = (c.idx + 1) % c.frames.length, c.cur = c.frames[c.idx], b = c.cur.duration, d = !0
                }));
            return d
        },
        drawTile: function(a, b, c, d) {
            d.flipped && (a.save(), a.translate(b, c), a.transform(d.transform), b = c = 0);
            var e = this.atlas[this.getViewTileId(d.tileId)].offset;
            a.drawImage(this.image, e.x, e.y, this.tilewidth, this.tileheight, b, c, this.tilewidth, this.tileheight);
            d.flipped && a.restore()
        }
    });
    me.TMXTilesetGroup = me.Object.extend({
        init: function() {
            this.tilesets = [];
            this.length = 0
        },
        add: function(a) {
            this.tilesets.push(a);
            this.length++
        },
        getTilesetByIndex: function(a) {
            return this.tilesets[a]
        },
        getTilesetByGid: function(a) {
            var b = -1;
            a &= 536870911;
            for (var c = 0, d = this.tilesets.length; c < d; c++) {
                if (this.tilesets[c].contains(a)) return this.tilesets[c];
                this.tilesets[c].firstgid === this.tilesets[c].lastgid && a >= this.tilesets[c].firstgid && (b = c)
            }
            if (-1 !== b) return this.tilesets[b];
            throw new me.Error("no matching tileset found for gid " + a);
        }
    });
    me.TMXTileset.Error = me.Error.extend({
        init: function(a) {
            me.Error.prototype.init.apply(this, [a]);
            this.name = "me.TMXTileset.Error"
        }
    })
})();
(function() {
    var a = [{
            x: 0,
            y: 0
        }, {
            x: 1,
            y: -1
        }, {
            x: 1,
            y: 0
        }, {
            x: 2,
            y: 0
        }],
        b = [{
            x: 0,
            y: 0
        }, {
            x: -1,
            y: 1
        }, {
            x: 0,
            y: 1
        }, {
            x: 0,
            y: 2
        }];
    me.TMXRenderer = me.Object.extend({
        init: function(a, b, e, f) {
            this.cols = a;
            this.rows = b;
            this.tilewidth = e;
            this.tileheight = f
        },
        canRender: function(a) {
            return this.cols === a.cols && this.rows === a.rows && this.tilewidth === a.tilewidth && this.tileheight === a.tileheight
        }
    });
    me.TMXOrthogonalRenderer = me.TMXRenderer.extend({
        canRender: function(a) {
            return "orthogonal" === a.orientation && me.TMXRenderer.prototype.canRender.apply(this, [a])
        },
        pixelToTileCoords: function(a, b, e) {
            return (e || new me.Vector2d).set(this.pixelToTileX(a), this.pixelToTileY(b))
        },
        pixelToTileX: function(a) {
            return a / this.tilewidth
        },
        pixelToTileY: function(a) {
            return a / this.tileheight
        },
        tileToPixelCoords: function(a, b, e) {
            return (e || new me.Vector2d).set(a * this.tilewidth, b * this.tileheight)
        },
        adjustPosition: function(a) {
            "number" === typeof a.gid && (a.y -= a.height)
        },
        drawTile: function(a, b, e, f, g) {
            g.drawTile(a, g.tileoffset.x + b * this.tilewidth, g.tileoffset.y + (e + 1) * this.tileheight - g.tileheight,
                f)
        },
        drawTileLayer: function(a, b, e) {
            var f = this.pixelToTileCoords(Math.max(e.pos.x - (b.maxTileSize.width - b.tilewidth), 0), Math.max(e.pos.y - (b.maxTileSize.height - b.tileheight), 0), me.pool.pull("me.Vector2d")).floorSelf();
            e = this.pixelToTileCoords(e.pos.x + e.width + this.tilewidth, e.pos.y + e.height + this.tileheight, me.pool.pull("me.Vector2d")).ceilSelf();
            e.x = e.x > this.cols ? this.cols : e.x;
            e.y = e.y > this.rows ? this.rows : e.y;
            for (var g = f.y; g < e.y; g++)
                for (var h = f.x; h < e.x; h++) {
                    var k = b.layerData[h][g];
                    k && this.drawTile(a, h,
                        g, k, k.tileset)
                }
            me.pool.push(f);
            me.pool.push(e)
        }
    });
    me.TMXIsometricRenderer = me.TMXRenderer.extend({
        init: function(a, b, e, f) {
            me.TMXRenderer.prototype.init.apply(this, [a, b, e, f]);
            this.hTilewidth = e / 2;
            this.hTileheight = f / 2;
            this.originX = this.rows * this.hTilewidth
        },
        canRender: function(a) {
            return "isometric" === a.orientation && me.TMXRenderer.prototype.canRender.apply(this, [a])
        },
        pixelToTileCoords: function(a, b, e) {
            return (e || new me.Vector2d).set(this.pixelToTileX(a, b), this.pixelToTileY(b, a))
        },
        pixelToTileX: function(a, b) {
            return b /
                this.tileheight + (a - this.originX) / this.tilewidth
        },
        pixelToTileY: function(a, b) {
            return a / this.tileheight - (b - this.originX) / this.tilewidth
        },
        tileToPixelCoords: function(a, b, e) {
            return (e || new me.Vector2d).set((a - b) * this.hTilewidth + this.originX, (a + b) * this.hTileheight)
        },
        adjustPosition: function(a) {
            var b = this.tileToPixelCoords(a.x / this.hTilewidth, a.y / this.tileheight);
            a.x = b.x;
            a.y = b.y
        },
        drawTile: function(a, b, e, f, g) {
            g.drawTile(a, (this.cols - 1) * g.tilewidth + (b - e) * g.tilewidth >> 1, -g.tilewidth + (b + e) * g.tileheight >> 2, f)
        },
        drawTileLayer: function(a, b, e) {
            var f = b.tileset,
                g = f.tileoffset,
                h = this.pixelToTileCoords(e.pos.x - f.tilewidth, e.pos.y - f.tileheight, me.pool.pull("me.Vector2d")).floorSelf(),
                k = this.pixelToTileCoords(e.pos.x + e.width + f.tilewidth, e.pos.y + e.height + f.tileheight, me.pool.pull("me.Vector2d")).ceilSelf(),
                l = this.tileToPixelCoords(k.x, k.y, me.pool.pull("me.Vector2d")),
                m = this.tileToPixelCoords(h.x, h.y, me.pool.pull("me.Vector2d"));
            m.x -= this.hTilewidth;
            m.y += this.tileheight;
            f = m.y - e.pos.y > this.hTileheight;
            g = e.pos.x - m.x <
                this.hTilewidth;
            f && (g ? (h.x--, m.x -= this.hTilewidth) : (h.y--, m.x += this.hTilewidth), m.y -= this.hTileheight);
            e = f ^ g;
            for (var n = h.clone(), q = 2 * m.y; q - 2 * this.tileheight < 2 * l.y; q += this.tileheight) {
                n.setV(h);
                for (var u = m.x; u < l.x; u += this.tilewidth) {
                    if (0 <= n.x && 0 <= n.y && n.x < this.cols && n.y < this.rows) {
                        var v = b.layerData[n.x][n.y];
                        v && (f = v.tileset, g = f.tileoffset, f.drawTile(a, g.x + u, g.y + q / 2 - f.tileheight, v))
                    }
                    n.x++;
                    n.y--
                }
                e ? (h.y++, m.x -= this.hTilewidth, e = !1) : (h.x++, m.x += this.hTilewidth, e = !0)
            }
            me.pool.push(h);
            me.pool.push(k);
            me.pool.push(l);
            me.pool.push(m)
        }
    });
    me.TMXHexagonalRenderer = me.TMXRenderer.extend({
        init: function(a, b, e, f, g, h, k) {
            me.TMXRenderer.prototype.init.apply(this, [a, b, e, f]);
            this.hexsidelength = g;
            this.staggeraxis = h;
            this.staggerindex = k;
            this.sidelengthy = this.sidelengthx = 0;
            "x" === h ? this.sidelengthx = g : this.sidelengthy = g;
            this.sideoffsetx = (this.tilewidth - this.sidelengthx) / 2;
            this.sideoffsety = (this.tileheight - this.sidelengthy) / 2;
            this.columnwidth = this.sideoffsetx + this.sidelengthx;
            this.rowheight = this.sideoffsety + this.sidelengthy;
            this.centers = [new me.Vector2d, new me.Vector2d, new me.Vector2d, new me.Vector2d]
        },
        canRender: function(a) {
            return "hexagonal" === a.orientation && me.TMXRenderer.prototype.canRender.apply(this, [a])
        },
        pixelToTileCoords: function(c, d, e) {
            var f;
            e = e || new me.Vector2d;
            "x" === this.staggeraxis ? c -= "odd" === this.staggerindex ? this.sideoffsetx : this.tilewidth : d -= "odd" === this.staggerindex ? this.sideoffsety : this.tileheight;
            var g = me.pool.pull("me.Vector2d", Math.floor(c / (2 * this.columnwidth)), Math.floor(d / (2 * this.rowheight)));
            c = me.pool.pull("me.Vector2d",
                c - 2 * g.x * this.columnwidth, d - 2 * g.y * this.rowheight);
            "x" === this.staggeraxis ? (g.x *= 2, "even" === this.staggerindex && ++g.x) : (g.y *= 2, "even" === this.staggerindex && ++g.y);
            var h;
            "x" === this.staggeraxis ? (h = this.sidelengthx / 2, d = h + this.columnwidth, f = this.tileheight / 2, this.centers[0].set(h, f), this.centers[1].set(d, f - this.rowheight), this.centers[2].set(d, f + this.rowheight), this.centers[3].set(d + this.columnwidth, f)) : (h = this.sidelengthy / 2, d = this.tilewidth / 2, f = h + this.rowheight, this.centers[0].set(d, h), this.centers[1].set(d -
                this.columnwidth, f), this.centers[2].set(d + this.columnwidth, f), this.centers[3].set(d, f + this.rowheight));
            d = 0;
            f = Number.MAX_VALUE;
            for (var k = 0; 4 > k; ++k) h = Math.pow(this.centers[k].x - c.x, 2) + Math.pow(this.centers[k].y - c.y, 2), h < f && (f = h, d = k);
            h = "x" === this.staggeraxis ? a : b;
            f = g.x + h[d].x;
            d = g.y + h[d].y;
            me.pool.push(g);
            me.pool.push(c);
            return e.set(f, d)
        },
        pixelToTileX: function(a, b) {
            var e = me.pool.pull("me.Vector2d");
            this.pixelToTileCoords(a, b, e);
            me.pool.push(e);
            return e.x
        },
        pixelToTileY: function(a, b) {
            var e = me.pool.pull("me.Vector2d");
            this.pixelToTileCoords(b, a, e);
            me.pool.push(e);
            return e.y
        },
        tileToPixelCoords: function(a, b, e) {
            var f, g = e || new me.Vector2d;
            "x" === this.staggeraxis ? (e = a * this.columnwidth, "odd" === this.staggerindex ? (f = b * (this.tileheight + this.sidelengthy), f += this.rowheight * (a & 1)) : (f = b * (this.tileheight + this.sidelengthy), f += this.rowheight * (1 - (a & 1)))) : (f = b * this.rowheight, "odd" === this.staggerindex ? (e = a * (this.tilewidth + this.sidelengthx), e += this.columnwidth * (b & 1)) : (e = a * (this.tilewidth + this.sidelengthx), e += this.columnwidth * (1 - (b &
                1))));
            return g.set(e, f)
        },
        adjustPosition: function(a) {
            "number" === typeof a.gid && (a.y -= a.height)
        },
        drawTile: function(a, b, e, f, g) {
            b = this.tileToPixelCoords(b, e, me.pool.pull("me.Vector2d"));
            g.drawTile(a, g.tileoffset.x + b.x, g.tileoffset.y + b.y + (this.tileheight - g.tileheight), f);
            me.pool.push(b)
        },
        drawTileLayer: function(a, b, e) {
            var f = this.pixelToTileCoords(e.pos.x, e.pos.y).floorSelf();
            e = this.pixelToTileCoords(e.pos.x + e.width + this.tilewidth, e.pos.y + e.height + this.tileheight).ceilSelf();
            f.x = 0 > f.x ? 0 : f.x;
            f.y = 0 > f.y ? 0 : f.y;
            e.x = e.x > this.cols ? this.cols : e.x;
            e.y = e.y > this.rows ? this.rows : e.y;
            for (var g = f.y; g < e.y; g++)
                for (var h = f.x; h < e.x; h++) {
                    var k = b.layerData[h][g];
                    k && this.drawTile(a, h, g, k, k.tileset)
                }
        }
    })
})();
(function() {
    me.ColorLayer = me.Renderable.extend({
        init: function(a, b, c) {
            me.Renderable.prototype.init.apply(this, [0, 0, Infinity, Infinity]);
            this.name = a;
            this.pos.z = c;
            this.floating = !0;
            b instanceof me.Color ? this.color = b.toRGBA() : (a = me.pool.pull("me.Color"), this.color = a.parseCSS(b).toRGBA(), me.pool.push(a))
        },
        draw: function(a, b) {
            var c = a.globalAlpha();
            a.setGlobalAlpha(c * this.getOpacity());
            var d = me.game.viewport.pos;
            a.setColor(this.color);
            a.fillRect(b.left - d.x, b.top - d.y, b.width, b.height);
            a.setGlobalAlpha(c);
            a.setColor("#fff")
        }
    });
    me.ImageLayer = me.Renderable.extend({
        init: function(a, b, c) {
            this.name = c.name || "me.ImageLayer";
            this.image = me.utils.getImage(c.image);
            if (!this.image) throw new me.Error(("string" === typeof c.image ? "'" + c.image + "'" : "Image") + " file for Image Layer '" + this.name + "' not found!");
            this.imagewidth = this.image.width;
            this.imageheight = this.image.height;
            me.Renderable.prototype.init.apply(this, [a, b, Infinity, Infinity]);
            this.floating = !0;
            this.pos.z = c.z || 0;
            this.offset = new me.Vector2d(a, b);
            this.ratio = new me.Vector2d(1, 1);
            "undefined" !==
            typeof c.ratio && ("number" === typeof c.ratio ? this.ratio.set(c.ratio, c.ratio) : this.ratio.setV(c.ratio));
            "undefined" === typeof c.anchorPoint ? this.anchorPoint.set(0, 0) : "number" === typeof c.anchorPoint ? this.anchorPoint.set(c.anchorPoint, c.anchorPoint) : this.anchorPoint.setV(c.anchorPoint);
            Object.defineProperty(this, "repeat", {
                get: function() {
                    return this._repeat
                },
                set: function(a) {
                    this._repeat = a;
                    switch (this._repeat) {
                        case "no-repeat":
                            this.repeatY = this.repeatX = !1;
                            break;
                        case "repeat-x":
                            this.repeatX = !0;
                            this.repeatY = !1;
                            break;
                        case "repeat-y":
                            this.repeatX = !1;
                            this.repeatY = !0;
                            break;
                        default:
                            this.repeatY = this.repeatX = !0
                    }
                    this.resize(me.game.viewport.width, me.game.viewport.height);
                    this.createPattern()
                }
            });
            this.repeat = c.repeat || "repeat"
        },
        onActivateEvent: function() {
            var a = this.updateLayer.bind(this);
            this.vpChangeHdlr = me.event.subscribe(me.event.VIEWPORT_ONCHANGE, a);
            this.vpResizeHdlr = me.event.subscribe(me.event.VIEWPORT_ONRESIZE, this.resize.bind(this));
            this.vpLoadedHdlr = me.event.subscribe(me.event.LEVEL_LOADED, function() {
                a(me.game.viewport.pos)
            })
        },
        resize: function(a, b) {
            me.Renderable.prototype.resize.apply(this, [this.repeatX ? Infinity : a, this.repeatY ? Infinity : b])
        },
        createPattern: function() {
            this._pattern = me.video.renderer.createPattern(this.image, this._repeat)
        },
        updateLayer: function(a) {
            var b = this.ratio.x,
                c = this.ratio.y;
            if (0 !== (b === c)) {
                var d = me.game.viewport,
                    e = this.imagewidth,
                    f = this.imageheight,
                    b = ~~(this.anchorPoint.x * (b - 1) * (d.bounds.width - d.width) + this.offset.x - b * a.x);
                a = ~~(this.anchorPoint.y * (c - 1) * (d.bounds.height - d.height) + this.offset.y - c * a.y);
                this.pos.x =
                    this.repeatX ? b % e : b;
                this.pos.y = this.repeatY ? a % f : a
            }
        },
        draw: function(a) {
            var b = me.game.viewport,
                c = this.imagewidth,
                d = this.imageheight,
                e = b.bounds.width,
                f = b.bounds.height,
                g = this.anchorPoint.x,
                h = this.anchorPoint.y,
                k = this.pos.x,
                l = this.pos.y,
                m = a.globalAlpha();
            0 === (this.ratio.x === this.ratio.y) && (k = ~~(k + g * (e - c)), l = ~~(l + h * (f - d)));
            a.setGlobalAlpha(m * this.getOpacity());
            a.translate(k, l);
            a.drawPattern(this._pattern, 0, 0, 2 * b.width, 2 * b.height);
            a.translate(-k, -l);
            a.setGlobalAlpha(m)
        },
        onDeactivateEvent: function() {
            me.event.unsubscribe(this.vpChangeHdlr);
            me.event.unsubscribe(this.vpResizeHdlr);
            me.event.unsubscribe(this.vpLoadedHdlr)
        }
    });
    me.TMXLayer = me.Renderable.extend({
        init: function(a, b, c, d, e) {
            me.Renderable.prototype.init.apply(this, [0, 0, 0, 0]);
            this.tilewidth = a;
            this.tileheight = b;
            this.orientation = c;
            this.tileset = (this.tilesets = d) ? this.tilesets.getTilesetByIndex(0) : null;
            this.maxTileSize = {
                width: 0,
                height: 0
            };
            for (a = 0; a < this.tilesets.length; a++) b = this.tilesets.getTilesetByIndex(a), this.maxTileSize.width = Math.max(this.maxTileSize.width, b.tilewidth), this.maxTileSize.height =
                Math.max(this.maxTileSize.height, b.tileheight);
            this.animatedTilesets = [];
            this.isAnimated = !1;
            this.pos.z = e
        },
        initFromJSON: function(a) {
            this.name = a.name;
            this.cols = +a.width;
            this.rows = +a.height;
            this.hexsidelength = +a.hexsidelength || void 0;
            this.staggeraxis = a.staggeraxis;
            this.staggerindex = a.staggerindex;
            this.setOpacity(("undefined" !== typeof a.visible ? a.visible : 1) ? +a.opacity : 0);
            "isometric" === this.orientation ? (this.width = (this.cols + this.rows) * (this.tilewidth / 2), this.height = (this.cols + this.rows) * (this.tileheight /
                2)) : (this.width = this.cols * this.tilewidth, this.height = this.rows * this.tileheight);
            me.TMXUtils.applyTMXProperties(this, a);
            "undefined" === typeof this.preRender && (this.preRender = me.sys.preRender);
            !0 === this.preRender && (this.canvasRenderer = new me.CanvasRenderer(me.video.createCanvas(this.width, this.height), this.width, this.height, {
                transparent: !0
            }));
            this.initArray(this.cols, this.rows)
        },
        onActivateEvent: function() {
            void 0 === this.animatedTilesets && (this.animatedTilesets = []);
            if (this.tilesets)
                for (var a = this.tilesets.tilesets,
                        b = 0; b < a.length; b++) a[b].isAnimated && this.animatedTilesets.push(a[b]);
            if (this.isAnimated = 0 < this.animatedTilesets.length) this.preRender = !1;
            this.resizeBounds(this.width, this.height)
        },
        onDeactivateEvent: function() {
            this.animatedTilesets = void 0
        },
        setRenderer: function(a) {
            this.renderer = a
        },
        initArray: function(a, b) {
            this.layerData = [];
            for (var c = 0; c < a; c++) {
                this.layerData[c] = [];
                for (var d = 0; d < b; d++) this.layerData[c][d] = null
            }
        },
        getTileId: function(a, b) {
            var c = this.getTile(a, b);
            return c ? c.tileId : null
        },
        getTile: function(a,
            b) {
            return this.layerData[~~this.renderer.pixelToTileX(a, b)][~~this.renderer.pixelToTileY(b, a)]
        },
        setTile: function(a, b, c) {
            this.tileset.contains(c) || (this.tileset = this.tilesets.getTilesetByGid(c));
            c = this.layerData[a][b] = new me.Tile(a, b, c, this.tileset);
            this.preRender && this.renderer.drawTile(this.canvasRenderer, a, b, c, c.tileset);
            return c
        },
        clearTile: function(a, b) {
            this.layerData[a][b] = null;
            this.preRender && this.canvasRenderer.clearRect(a * this.tilewidth, b * this.tileheight, this.tilewidth, this.tileheight)
        },
        update: function(a) {
            if (this.isAnimated) {
                for (var b = !1, c = 0; c < this.animatedTilesets.length; c++) b = this.animatedTilesets[c].update(a) || b;
                return b
            }
            return !1
        },
        draw: function(a, b) {
            var c = a.globalAlpha();
            a.setGlobalAlpha(c * this.getOpacity());
            if (this.preRender) {
                var d = Math.min(b.width, this.width),
                    e = Math.min(b.height, this.height);
                a.drawImage(this.canvasRenderer.getCanvas(), b.pos.x, b.pos.y, d, e, b.pos.x, b.pos.y, d, e)
            } else this.renderer.drawTileLayer(a, this, b);
            a.setGlobalAlpha(c)
        }
    })
})();
(function() {
    function a(a) {
        switch (a.orientation) {
            case "orthogonal":
                return new me.TMXOrthogonalRenderer(a.cols, a.rows, a.tilewidth, a.tileheight);
            case "isometric":
                return new me.TMXIsometricRenderer(a.cols, a.rows, a.tilewidth, a.tileheight);
            case "hexagonal":
                return new me.TMXHexagonalRenderer(a.cols, a.rows, a.tilewidth, a.tileheight, a.hexsidelength, a.staggeraxis, a.staggerindex);
            default:
                throw new me.Error(a.orientation + " type TMX Tile Map not supported!");
        }
    }

    function b(b, c, d) {
        b = new me.TMXLayer(b.tilewidth, b.tileheight,
            b.orientation, b.tilesets, d);
        b.initFromJSON(c);
        me.game.tmxRenderer.canRender(b) ? b.setRenderer(me.game.tmxRenderer) : b.setRenderer(a(b));
        c = me.TMXUtils.decode(c.data, c.encoding, c.compression);
        for (var h = d = 0; h < b.rows; h++)
            for (var k = 0; k < b.cols; k++) {
                var l = c[d++];
                0 !== l && b.setTile(k, h, l)
            }
        return b
    }

    function c(a, b, c) {
        me.TMXUtils.applyTMXProperties(b.properties, b);
        a = new me.ImageLayer(+b.x || 0, +b.y || 0, Object.assign({
            name: b.name,
            image: b.image,
            z: c
        }, b.properties));
        a.setOpacity(("undefined" !== typeof b.visible ? b.visible :
            1) ? +b.opacity : 0);
        return a
    }

    function d(a, b, c) {
        return new me.TMXObjectGroup(b.name, b, a.orientation, a.tilesets, c)
    }
    me.TMXTileMap = me.Object.extend({
        init: function(b, c) {
            this.name = b;
            this.data = c;
            this.cols = +c.width;
            this.rows = +c.height;
            this.tilewidth = +c.tilewidth;
            this.tileheight = +c.tileheight;
            this.tilesets = null;
            this.layers = [];
            this.objectGroups = [];
            this.version = c.version;
            this.orientation = c.orientation;
            "isometric" === this.orientation ? (this.width = (this.cols + this.rows) * (this.tilewidth / 2), this.height = (this.cols + this.rows) *
                (this.tileheight / 2)) : (this.width = this.cols * this.tilewidth, this.height = this.rows * this.tileheight);
            this.z = 0;
            this.nextobjectid = +c.nextobjectid || void 0;
            this.hexsidelength = +c.hexsidelength || void 0;
            this.staggeraxis = c.staggeraxis;
            this.staggerindex = c.staggerindex;
            this.backgroundcolor = c.backgroundcolor;
            me.TMXUtils.applyTMXProperties(this, c);
            null !== me.game.tmxRenderer && me.game.tmxRenderer.canRender(this) || (me.game.tmxRenderer = a(this));
            this.initialized = !1
        },
        readMapObjects: function(a) {
            if (!0 !== this.initialized) {
                var f =
                    this.z,
                    g = this;
                this.tilesets || (this.tilesets = new me.TMXTilesetGroup);
                "undefined" !== typeof a.tilesets && a.tilesets.forEach(function(a) {
                    g.tilesets.add(new me.TMXTileset(a))
                });
                this.backgroundcolor && this.layers.push(new me.ColorLayer("background_color", this.backgroundcolor, f++));
                this.background_image && this.layers.push(new me.ImageLayer(0, 0, {
                    name: "background_image",
                    image: this.background_image,
                    z: f++
                }));
                a.layers.forEach(function(a) {
                    switch (a.type) {
                        case "imagelayer":
                            g.layers.push(c(g, a, f++));
                            break;
                        case "tilelayer":
                            g.layers.push(b(g,
                                a, f++));
                            break;
                        case "objectgroup":
                            g.objectGroups.push(d(g, a, f++))
                    }
                });
                this.initialized = !0
            }
        },
        addTo: function(a, b) {
            var c = a.autoSort,
                d = a.autoDepth;
            a.autoSort = !1;
            a.autoDepth = !1;
            this.getLayers().forEach(function(b) {
                a.addChild(b)
            });
            this.getObjects(b).forEach(function(b) {
                a.addChild(b)
            });
            a.autoSort = c;
            a.autoDepth = d;
            a.sort(!0)
        },
        getObjects: function(a) {
            var b = [],
                c = !1,
                d;
            this.readMapObjects(this.data);
            for (var k = 0; k < this.objectGroups.length; k++) {
                var l = this.objectGroups[k],
                    c = l.name.toLowerCase().includes("collision");
                !1 === a && (d = new me.Container(0, 0, this.width, this.height), d.name = l.name, d.pos.z = l.z, d.setOpacity(l.opacity), d.autoSort = !1, d.autoDepth = !1);
                for (var m = 0; m < l.objects.length; m++) {
                    var n = l.objects[m],
                        q = me.pool.pull(n.name || "me.Entity", n.x, n.y, n);
                    "object" === typeof q && ("object" !== typeof n.tile || q.renderable || (q.renderable = n.tile.getRenderable(n)), c && !n.name && (q.body.collisionType = me.collision.types.WORLD_SHAPE), q.pos.z = l.z, !0 === a ? (!0 === q.isRenderable && (q.setOpacity(q.getOpacity() * l.opacity), q.renderable instanceof me.Renderable && q.renderable.setOpacity(q.renderable.getOpacity() * l.opacity)), b.push(q)) : d.addChild(q))
                }!1 === a && 0 < d.children.length && (d.autoSort = !0, d.autoDepth = !0, b.push(d))
            }
            return b
        },
        getLayers: function() {
            this.readMapObjects(this.data);
            return this.layers
        },
        destroy: function() {
            this.tilesets = void 0;
            this.layers = [];
            this.objectGroups = [];
            this.initialized = !1
        }
    })
})();
(function() {
    me.levelDirector = function() {
        function a(a, g, l) {
            g.container.destroy();
            me.video.renderer.reset();
            d[c.getCurrentLevelId()] && d[c.getCurrentLevelId()].destroy();
            f = e.indexOf(a);
            b(a, g.container, g.flatten, g.setViewportBounds);
            me.event.publish(me.event.LEVEL_LOADED, [a]);
            g.onLoaded(a);
            l && me.state.restart()
        }

        function b(a, b, c, e) {
            function f() {
                b.pos.set(Math.max(0, ~~((me.game.viewport.width - q.width) / 2)), Math.max(0, ~~((me.game.viewport.height - q.height) / 2)), 0);
                b.transform.identity();
                b.transform.translateV(b.pos)
            }
            var q = d[a],
                u = b.autoSort;
            b.autoSort = !1;
            e && me.game.viewport.setBounds(0, 0, Math.max(q.width, me.game.viewport.width), Math.max(q.height, me.game.viewport.height));
            me.utils.resetGUID(a, q.nextobjectid);
            q.addTo(b, c);
            b.sort(!0);
            b.autoSort = u;
            b.resize(q.width, q.height);
            e && (f(), g && me.event.unsubscribe(g), g = me.event.subscribe(me.event.VIEWPORT_ONRESIZE, f))
        }
        var c = {},
            d = {},
            e = [],
            f = 0,
            g = null;
        c.reset = function() {};
        c.addLevel = function() {
            throw new me.Error("no level loader defined");
        };
        c.addTMXLevel = function(a, b) {
            if (null ==
                d[a]) d[a] = new me.TMXTileMap(a, me.loader.getTMX(a)), e.push(a);
            else return !1;
            b && b();
            return !0
        };
        c.loadLevel = function(b, c) {
            c = Object.assign({
                container: me.game.world,
                onLoaded: me.game.onLevelLoaded,
                flatten: me.game.mergeGroup,
                setViewportBounds: !0
            }, c || {});
            if ("undefined" === typeof d[b]) throw new me.Error("level " + b + " not found");
            if (d[b] instanceof me.TMXTileMap) me.state.isRunning() ? (me.state.stop(), a.defer(this, b, c, !0)) : a(b, c);
            else throw new me.Error("no level loader defined");
            return !0
        };
        c.getCurrentLevelId = function() {
            return e[f]
        };
        c.getCurrentLevel = function() {
            return d[c.getCurrentLevelId()]
        };
        c.reloadLevel = function(a) {
            return c.loadLevel(c.getCurrentLevelId(), a)
        };
        c.nextLevel = function(a) {
            return f + 1 < e.length ? c.loadLevel(e[f + 1], a) : !1
        };
        c.previousLevel = function(a) {
            return 0 <= f - 1 ? c.loadLevel(e[f - 1], a) : !1
        };
        c.levelCount = function() {
            return e.length
        };
        return c
    }()
})();
(function() {
    me.Tween = function(a) {
        var b = null,
            c = null,
            d = null,
            e = null,
            f = null,
            g = null,
            h = null,
            k = null,
            l = null,
            m = null,
            n = null,
            q = null,
            u = null,
            v = null,
            t = null,
            s = null,
            A = null;
        this._resumeCallback = function(a) {
            l && (l += a)
        };
        this.setProperties = function(a) {
            b = a;
            c = {};
            d = {};
            e = {};
            f = 1E3;
            g = 0;
            h = !1;
            k = 0;
            l = null;
            m = me.Tween.Easing.Linear.None;
            n = me.Tween.Interpolation.Linear;
            q = [];
            u = null;
            v = !1;
            s = t = null;
            A = me.timer.lastUpdate;
            this.isPersistent = !1;
            for (var p in a) "object" !== typeof a && (c[p] = parseFloat(a[p], 10))
        };
        this.setProperties(a);
        this.onResetEvent =
            function(a) {
                this.setProperties(a)
            };
        this.onActivateEvent = function() {
            me.event.subscribe(me.event.STATE_RESUME, this._resumeCallback)
        };
        this.onDeactivateEvent = function() {
            me.event.unsubscribe(me.event.STATE_RESUME, this._resumeCallback)
        };
        this.to = function(a, b) {
            void 0 !== b && (f = b);
            d = a;
            return this
        };
        this.start = function(a) {
            v = !1;
            me.game.world.addChild(this);
            l = ("undefined" === typeof a ? me.timer.getTime() : a) + k;
            for (var m in d) {
                if (d[m] instanceof Array) {
                    if (0 === d[m].length) continue;
                    d[m] = [b[m]].concat(d[m])
                }
                c[m] = b[m];
                !1 ===
                    c[m] instanceof Array && (c[m] *= 1);
                e[m] = c[m] || 0
            }
            return this
        };
        this.stop = function() {
            me.game.world.removeChildNow(this);
            return this
        };
        this.delay = function(a) {
            k = a;
            return this
        };
        this.repeat = function(a) {
            g = a;
            return this
        };
        this.yoyo = function(a) {
            h = a;
            return this
        };
        this.easing = function(a) {
            if ("function" !== typeof a) throw new me.Tween.Error("invalid easing function for me.Tween.easing()");
            m = a;
            return this
        };
        this.interpolation = function(a) {
            n = a;
            return this
        };
        this.chain = function() {
            q = arguments;
            return this
        };
        this.onStart = function(a) {
            u =
                a;
            return this
        };
        this.onUpdate = function(a) {
            t = a;
            return this
        };
        this.onComplete = function(a) {
            s = a;
            return this
        };
        this.update = function(a) {
            a = A = me.timer.lastUpdate > A ? me.timer.lastUpdate : A + a;
            var p;
            if (a < l) return !0;
            !1 === v && (null !== u && u.call(b), v = !0);
            var r = (a - l) / f,
                r = 1 < r ? 1 : r,
                x = m(r);
            for (p in d) {
                var w = c[p] || 0,
                    y = d[p];
                y instanceof Array ? b[p] = n(y, x) : ("string" === typeof y && (y = w + parseFloat(y, 10)), "number" === typeof y && (b[p] = w + (y - w) * x))
            }
            null !== t && t.call(b, x);
            if (1 === r)
                if (0 < g) {
                    isFinite(g) && g--;
                    for (p in e) "string" === typeof d[p] &&
                        (e[p] += parseFloat(d[p], 10)), h && (r = e[p], e[p] = d[p], d[p] = r), c[p] = e[p];
                    l = a + k
                } else {
                    me.game.world.removeChildNow(this);
                    null !== s && s.call(b);
                    p = 0;
                    for (r = q.length; p < r; p++) q[p].start(a);
                    return !1
                }
            return !0
        }
    };
    me.Tween.Easing = {
        Linear: {
            None: function(a) {
                return a
            }
        },
        Quadratic: {
            In: function(a) {
                return a * a
            },
            Out: function(a) {
                return a * (2 - a)
            },
            InOut: function(a) {
                return 1 > (a *= 2) ? 0.5 * a * a : -0.5 * (--a * (a - 2) - 1)
            }
        },
        Cubic: {
            In: function(a) {
                return a * a * a
            },
            Out: function(a) {
                return --a * a * a + 1
            },
            InOut: function(a) {
                return 1 > (a *= 2) ? 0.5 * a * a * a : 0.5 * ((a -=
                    2) * a * a + 2)
            }
        },
        Quartic: {
            In: function(a) {
                return a * a * a * a
            },
            Out: function(a) {
                return 1 - --a * a * a * a
            },
            InOut: function(a) {
                return 1 > (a *= 2) ? 0.5 * a * a * a * a : -0.5 * ((a -= 2) * a * a * a - 2)
            }
        },
        Quintic: {
            In: function(a) {
                return a * a * a * a * a
            },
            Out: function(a) {
                return --a * a * a * a * a + 1
            },
            InOut: function(a) {
                return 1 > (a *= 2) ? 0.5 * a * a * a * a * a : 0.5 * ((a -= 2) * a * a * a * a + 2)
            }
        },
        Sinusoidal: {
            In: function(a) {
                return 1 - Math.cos(a * Math.PI / 2)
            },
            Out: function(a) {
                return Math.sin(a * Math.PI / 2)
            },
            InOut: function(a) {
                return 0.5 * (1 - Math.cos(Math.PI * a))
            }
        },
        Exponential: {
            In: function(a) {
                return 0 ===
                    a ? 0 : Math.pow(1024, a - 1)
            },
            Out: function(a) {
                return 1 === a ? 1 : 1 - Math.pow(2, -10 * a)
            },
            InOut: function(a) {
                return 0 === a ? 0 : 1 === a ? 1 : 1 > (a *= 2) ? 0.5 * Math.pow(1024, a - 1) : 0.5 * (-Math.pow(2, -10 * (a - 1)) + 2)
            }
        },
        Circular: {
            In: function(a) {
                return 1 - Math.sqrt(1 - a * a)
            },
            Out: function(a) {
                return Math.sqrt(1 - --a * a)
            },
            InOut: function(a) {
                return 1 > (a *= 2) ? -0.5 * (Math.sqrt(1 - a * a) - 1) : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
            }
        },
        Elastic: {
            In: function(a) {
                var b, c = 0.1;
                if (0 === a) return 0;
                if (1 === a) return 1;
                !c || 1 > c ? (c = 1, b = 0.1) : b = 0.4 * Math.asin(1 / c) / (2 * Math.PI);
                return -(c *
                    Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a - b) * Math.PI / 0.4))
            },
            Out: function(a) {
                var b, c = 0.1;
                if (0 === a) return 0;
                if (1 === a) return 1;
                !c || 1 > c ? (c = 1, b = 0.1) : b = 0.4 * Math.asin(1 / c) / (2 * Math.PI);
                return c * Math.pow(2, -10 * a) * Math.sin(2 * (a - b) * Math.PI / 0.4) + 1
            },
            InOut: function(a) {
                var b, c = 0.1;
                if (0 === a) return 0;
                if (1 === a) return 1;
                !c || 1 > c ? (c = 1, b = 0.1) : b = 0.4 * Math.asin(1 / c) / (2 * Math.PI);
                return 1 > (a *= 2) ? -0.5 * c * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a - b) * Math.PI / 0.4) : 0.5 * c * Math.pow(2, -10 * (a -= 1)) * Math.sin(2 * (a - b) * Math.PI / 0.4) + 1
            }
        },
        Back: {
            In: function(a) {
                return a *
                    a * (2.70158 * a - 1.70158)
            },
            Out: function(a) {
                return --a * a * (2.70158 * a + 1.70158) + 1
            },
            InOut: function(a) {
                return 1 > (a *= 2) ? 0.5 * a * a * (3.5949095 * a - 2.5949095) : 0.5 * ((a -= 2) * a * (3.5949095 * a + 2.5949095) + 2)
            }
        },
        Bounce: {
            In: function(a) {
                return 1 - me.Tween.Easing.Bounce.Out(1 - a)
            },
            Out: function(a) {
                return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
            },
            InOut: function(a) {
                return 0.5 > a ? 0.5 * me.Tween.Easing.Bounce.In(2 * a) : 0.5 * me.Tween.Easing.Bounce.Out(2 *
                    a - 1) + 0.5
            }
        }
    };
    me.Tween.Interpolation = {
        Linear: function(a, b) {
            var c = a.length - 1,
                d = c * b,
                e = Math.floor(d),
                f = me.Tween.Interpolation.Utils.Linear;
            return 0 > b ? f(a[0], a[1], d) : 1 < b ? f(a[c], a[c - 1], c - d) : f(a[e], a[e + 1 > c ? c : e + 1], d - e)
        },
        Bezier: function(a, b) {
            var c = 0,
                d = a.length - 1,
                e = Math.pow,
                f = me.Tween.Interpolation.Utils.Bernstein,
                g;
            for (g = 0; g <= d; g++) c += e(1 - b, d - g) * e(b, g) * a[g] * f(d, g);
            return c
        },
        CatmullRom: function(a, b) {
            var c = a.length - 1,
                d = c * b,
                e = Math.floor(d),
                f = me.Tween.Interpolation.Utils.CatmullRom;
            return a[0] === a[c] ? (0 > b && (e =
                Math.floor(d = c * (1 + b))), f(a[(e - 1 + c) % c], a[e], a[(e + 1) % c], a[(e + 2) % c], d - e)) : 0 > b ? a[0] - (f(a[0], a[0], a[1], a[1], -d) - a[0]) : 1 < b ? a[c] - (f(a[c], a[c], a[c - 1], a[c - 1], d - c) - a[c]) : f(a[e ? e - 1 : 0], a[e], a[c < e + 1 ? c : e + 1], a[c < e + 2 ? c : e + 2], d - e)
        },
        Utils: {
            Linear: function(a, b, c) {
                return (b - a) * c + a
            },
            Bernstein: function(a, b) {
                var c = me.Tween.Interpolation.Utils.Factorial;
                return c(a) / c(b) / c(a - b)
            },
            Factorial: function() {
                var a = [1];
                return function(b) {
                    var c = 1,
                        d;
                    if (a[b]) return a[b];
                    for (d = b; 1 < d; d--) c *= d;
                    return a[b] = c
                }
            }(),
            CatmullRom: function(a, b, c, d,
                e) {
                a = 0.5 * (c - a);
                d = 0.5 * (d - b);
                var f = e * e;
                return (2 * b - 2 * c + a + d) * e * f + (-3 * b + 3 * c - 2 * a - d) * f + a * e + b
            }
        }
    };
    me.Tween.Error = me.Error.extend({
        init: function(a) {
            me.Error.prototype.init.apply(this, [a]);
            this.name = "me.Tween.Error"
        }
    })
})();
(function() {
    me.event = function() {
        var a = {},
            b = {};
        a.STATE_PAUSE = "me.state.onPause";
        a.STATE_RESUME = "me.state.onResume";
        a.STATE_STOP = "me.state.onStop";
        a.STATE_RESTART = "me.state.onRestart";
        a.GAME_INIT = "me.game.onInit";
        a.GAME_RESET = "me.game.onReset";
        a.LEVEL_LOADED = "me.game.onLevelLoaded";
        a.LOADER_COMPLETE = "me.loader.onload";
        a.LOADER_PROGRESS = "me.loader.onProgress";
        a.KEYDOWN = "me.input.keydown";
        a.KEYUP = "me.input.keyup";
        a.GAMEPAD_CONNECTED = "gamepad.connected";
        a.GAMEPAD_DISCONNECTED = "gamepad.disconnected";
        a.GAMEPAD_UPDATE =
            "gamepad.update";
        a.POINTERMOVE = "me.event.pointermove";
        a.DRAGSTART = "me.game.dragstart";
        a.DRAGEND = "me.game.dragend";
        a.WINDOW_ONRESIZE = "window.onresize";
        a.VIEWPORT_ONRESIZE = "viewport.onresize";
        a.WINDOW_ONORIENTATION_CHANGE = "window.orientationchange";
        a.WINDOW_ONSCROLL = "window.onscroll";
        a.VIEWPORT_ONCHANGE = "viewport.onchange";
        a.publish = function(a, d) {
            for (var e = b[a], f = e ? e.length : 0; f--;) e[f].apply(window, d || [])
        };
        a.subscribe = function(a, d) {
            b[a] || (b[a] = []);
            b[a].push(d);
            return [a, d]
        };
        a.unsubscribe = function(a,
            d) {
            var e = b[d ? a : a[0]],
                f = e ? e.length : 0;
            for (d = d || a[1]; f--;) e[f] === d && e.splice(f, 1)
        };
        return a
    }()
})();
(function() {
    var a = function() {
        this.init()
    };
    a.prototype = {
        init: function() {
            var a = this || b;
            a._codecs = {};
            a._howls = [];
            a._muted = !1;
            a._volume = 1;
            a._canPlayEvent = "canplaythrough";
            a._navigator = "undefined" !== typeof window && window.navigator ? window.navigator : null;
            a.masterGain = null;
            a.noAudio = !1;
            a.usingWebAudio = !0;
            a.autoSuspend = !0;
            a.ctx = null;
            a.mobileAutoEnable = !0;
            a._setup();
            return a
        },
        volume: function(a) {
            var c = this || b;
            a = parseFloat(a);
            c.ctx || l();
            if ("undefined" !== typeof a && 0 <= a && 1 >= a) {
                c._volume = a;
                c.usingWebAudio && (c.masterGain.gain.value =
                    a);
                for (var d = 0; d < c._howls.length; d++)
                    if (!c._howls[d]._webAudio)
                        for (var e = c._howls[d]._getSoundIds(), f = 0; f < e.length; f++) {
                            var g = c._howls[d]._soundById(e[f]);
                            g && g._node && (g._node.volume = g._volume * a)
                        }
                    return c
            }
            return c._volume
        },
        mute: function(a) {
            var c = this || b;
            c.ctx || l();
            c._muted = a;
            c.usingWebAudio && (c.masterGain.gain.value = a ? 0 : c._volume);
            for (var d = 0; d < c._howls.length; d++)
                if (!c._howls[d]._webAudio)
                    for (var e = c._howls[d]._getSoundIds(), f = 0; f < e.length; f++) {
                        var g = c._howls[d]._soundById(e[f]);
                        g && g._node && (g._node.muted =
                            a ? !0 : g._muted)
                    }
                return c
        },
        unload: function() {
            for (var a = this || b, c = a._howls.length - 1; 0 <= c; c--) a._howls[c].unload();
            a.usingWebAudio && "undefined" !== typeof a.ctx.close && (a.ctx.close(), a.ctx = null, l());
            return a
        },
        codecs: function(a) {
            return (this || b)._codecs[a]
        },
        _setup: function() {
            var a = this || b;
            a.state = a.ctx ? a.ctx.state || "running" : "running";
            a._autoSuspend();
            a.noAudio || a._setupCodecs();
            return a
        },
        _setupCodecs: function() {
            var a = this || b,
                c = "undefined" !== typeof Audio ? new Audio : null;
            if (!c || "function" !== typeof c.canPlayType) return a;
            var d = c.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                e = a._navigator && a._navigator.userAgent.match(/OPR\/([0-6].)/g),
                e = e && 33 > parseInt(e[0].split("/")[1], 10);
            a._codecs = {
                mp3: !(e || !d && !c.canPlayType("audio/mp3;").replace(/^no$/, "")),
                mpeg: !!d,
                opus: !!c.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                ogg: !!c.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                oga: !!c.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                wav: !!c.canPlayType('audio/wav; codecs="1"').replace(/^no$/,
                    ""),
                aac: !!c.canPlayType("audio/aac;").replace(/^no$/, ""),
                caf: !!c.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                m4a: !!(c.canPlayType("audio/x-m4a;") || c.canPlayType("audio/m4a;") || c.canPlayType("audio/aac;")).replace(/^no$/, ""),
                mp4: !!(c.canPlayType("audio/x-mp4;") || c.canPlayType("audio/mp4;") || c.canPlayType("audio/aac;")).replace(/^no$/, ""),
                weba: !!c.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                webm: !!c.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                dolby: !!c.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,
                    "")
            };
            return a
        },
        _enableMobileAudio: function() {
            var a = this || b,
                c = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(a._navigator && a._navigator.userAgent),
                d = !!("ontouchend" in window || a._navigator && 0 < a._navigator.maxTouchPoints || a._navigator && 0 < a._navigator.msMaxTouchPoints);
            if (!a._mobileEnabled && a.ctx && (c || d)) {
                a._mobileEnabled = !1;
                a._mobileUnloaded || 44100 === a.ctx.sampleRate || (a._mobileUnloaded = !0, a.unload());
                a._scratchBuffer = a.ctx.createBuffer(1, 1, 22050);
                var e = function() {
                    var b = a.ctx.createBufferSource();
                    b.buffer = a._scratchBuffer;
                    b.connect(a.ctx.destination);
                    "undefined" === typeof b.start ? b.noteOn(0) : b.start(0);
                    b.onended = function() {
                        b.disconnect(0);
                        a._mobileEnabled = !0;
                        a.mobileAutoEnable = !1;
                        document.removeEventListener("touchend", e, !0)
                    }
                };
                document.addEventListener("touchend", e, !0);
                return a
            }
        },
        _autoSuspend: function() {
            var a = this;
            if (a.autoSuspend && a.ctx && "undefined" !== typeof a.ctx.suspend && b.usingWebAudio) {
                for (var c = 0; c < a._howls.length; c++)
                    if (a._howls[c]._webAudio)
                        for (var d = 0; d < a._howls[c]._sounds.length; d++)
                            if (!a._howls[c]._sounds[d]._paused) return a;
                a._suspendTimer && clearTimeout(a._suspendTimer);
                a._suspendTimer = setTimeout(function() {
                    a.autoSuspend && (a._suspendTimer = null, a.state = "suspending", a.ctx.suspend().then(function() {
                        a.state = "suspended";
                        a._resumeAfterSuspend && (delete a._resumeAfterSuspend, a._autoResume())
                    }))
                }, 3E4);
                return a
            }
        },
        _autoResume: function() {
            var a = this;
            if (a.ctx && "undefined" !== typeof a.ctx.resume && b.usingWebAudio) return "running" === a.state && a._suspendTimer ? (clearTimeout(a._suspendTimer), a._suspendTimer = null) : "suspended" === a.state ? (a.state =
                "resuming", a.ctx.resume().then(function() {
                    a.state = "running"
                }), a._suspendTimer && (clearTimeout(a._suspendTimer), a._suspendTimer = null)) : "suspending" === a.state && (a._resumeAfterSuspend = !0), a
        }
    };
    var b = new a,
        c = function(a) {
            a.src && 0 !== a.src.length ? this.init(a) : console.error("An array of source files must be passed with any new Howl.")
        };
    c.prototype = {
        init: function(a) {
            b.ctx || l();
            this._autoplay = a.autoplay || !1;
            this._format = "string" !== typeof a.format ? a.format : [a.format];
            this._html5 = a.html5 || !1;
            this._muted = a.mute ||
                !1;
            this._loop = a.loop || !1;
            this._pool = a.pool || 5;
            this._preload = "boolean" === typeof a.preload ? a.preload : !0;
            this._rate = a.rate || 1;
            this._sprite = a.sprite || {};
            this._src = "string" !== typeof a.src ? a.src : [a.src];
            this._volume = void 0 !== a.volume ? a.volume : 1;
            this._duration = 0;
            this._state = "unloaded";
            this._sounds = [];
            this._endTimers = {};
            this._queue = [];
            this._onend = a.onend ? [{
                fn: a.onend
            }] : [];
            this._onfade = a.onfade ? [{
                fn: a.onfade
            }] : [];
            this._onload = a.onload ? [{
                fn: a.onload
            }] : [];
            this._onloaderror = a.onloaderror ? [{
                fn: a.onloaderror
            }] : [];
            this._onpause = a.onpause ? [{
                fn: a.onpause
            }] : [];
            this._onplay = a.onplay ? [{
                fn: a.onplay
            }] : [];
            this._onstop = a.onstop ? [{
                fn: a.onstop
            }] : [];
            this._onmute = a.onmute ? [{
                fn: a.onmute
            }] : [];
            this._onvolume = a.onvolume ? [{
                fn: a.onvolume
            }] : [];
            this._onrate = a.onrate ? [{
                fn: a.onrate
            }] : [];
            this._onseek = a.onseek ? [{
                fn: a.onseek
            }] : [];
            this._webAudio = b.usingWebAudio && !this._html5;
            "undefined" !== typeof b.ctx && b.ctx && b.mobileAutoEnable && b._enableMobileAudio();
            b._howls.push(this);
            this._preload && this.load();
            return this
        },
        load: function() {
            var a =
                null;
            if (b.noAudio) this._emit("loaderror", null, "No audio support.");
            else {
                "string" === typeof this._src && (this._src = [this._src]);
                for (var c = 0; c < this._src.length; c++) {
                    var e, g;
                    if (this._format && this._format[c]) e = this._format[c];
                    else {
                        g = this._src[c];
                        if ("string" !== typeof g) {
                            this._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                            continue
                        }(e = /^data:audio\/([^;,]+);/i.exec(g)) || (e = /\.([^.]+)$/.exec(g.split("?", 1)[0]));
                        e && (e = e[1].toLowerCase())
                    }
                    if (b.codecs(e)) {
                        a = this._src[c];
                        break
                    }
                }
                if (a) return this._src =
                    a, this._state = "loading", "https:" === window.location.protocol && "http:" === a.slice(0, 5) && (this._html5 = !0, this._webAudio = !1), new d(this), this._webAudio && f(this), this;
                this._emit("loaderror", null, "No codec support for selected audio sources.")
            }
        },
        play: function(a) {
            var c = this,
                d = arguments,
                e = null;
            if ("number" === typeof a) e = a, a = null;
            else if ("undefined" === typeof a) {
                a = "__default";
                for (var f = 0, g = 0; g < c._sounds.length; g++) c._sounds[g]._paused && !c._sounds[g]._ended && (f++, e = c._sounds[g]._id);
                1 === f ? a = null : e = null
            }
            var h = e ?
                c._soundById(e) : c._inactiveSound();
            if (!h) return null;
            e && !a && (a = h._sprite || "__default");
            if ("loaded" !== c._state && !c._sprite[a]) return c._queue.push({
                event: "play",
                action: function() {
                    c.play(c._soundById(h._id) ? h._id : void 0)
                }
            }), h._id;
            if (e && !h._paused) return d[1] || setTimeout(function() {
                c._emit("play", h._id)
            }, 0), h._id;
            c._webAudio && b._autoResume();
            var k = 0 < h._seek ? h._seek : c._sprite[a][0] / 1E3,
                l = (c._sprite[a][0] + c._sprite[a][1]) / 1E3 - k,
                p = 1E3 * l / Math.abs(h._rate);
            h._paused = !1;
            h._ended = !1;
            h._sprite = a;
            h._seek = k;
            h._start =
                c._sprite[a][0] / 1E3;
            h._stop = (c._sprite[a][0] + c._sprite[a][1]) / 1E3;
            h._loop = !(!h._loop && !c._sprite[a][2]);
            var r = h._node;
            if (c._webAudio) e = function() {
                c._refreshBuffer(h);
                var a = h._muted || c._muted ? 0 : h._volume * b.volume();
                r.gain.setValueAtTime(a, b.ctx.currentTime);
                h._playStart = b.ctx.currentTime;
                "undefined" === typeof r.bufferSource.start ? h._loop ? r.bufferSource.noteGrainOn(0, k, 86400) : r.bufferSource.noteGrainOn(0, k, l) : h._loop ? r.bufferSource.start(0, k, 86400) : r.bufferSource.start(0, k, l);
                Infinity !== p && (c._endTimers[h._id] =
                    setTimeout(c._ended.bind(c, h), p));
                d[1] || setTimeout(function() {
                    c._emit("play", h._id)
                }, 0)
            }, "loaded" === c._state ? e() : (c.once("load", e, h._id), c._clearTimer(h._id));
            else {
                var x = function() {
                        r.currentTime = k;
                        r.muted = h._muted || c._muted || b._muted || r.muted;
                        r.volume = h._volume * b.volume();
                        r.playbackRate = h._rate;
                        setTimeout(function() {
                            r.play();
                            Infinity !== p && (c._endTimers[h._id] = setTimeout(c._ended.bind(c, h), p));
                            d[1] || c._emit("play", h._id)
                        }, 0)
                    },
                    e = "loaded" === c._state && (window && window.ejecta || !r.readyState && b._navigator.isCocoonJS);
                if (4 === r.readyState || e) x();
                else {
                    var w = function() {
                        x();
                        r.removeEventListener(b._canPlayEvent, w, !1)
                    };
                    r.addEventListener(b._canPlayEvent, w, !1);
                    c._clearTimer(h._id)
                }
            }
            return h._id
        },
        pause: function(a, b) {
            var c = this;
            if ("loaded" !== c._state) return c._queue.push({
                event: "pause",
                action: function() {
                    c.pause(a)
                }
            }), c;
            for (var d = c._getSoundIds(a), e = 0; e < d.length; e++) {
                c._clearTimer(d[e]);
                var f = c._soundById(d[e]);
                if (f && !f._paused) {
                    f._seek = c.seek(d[e]);
                    f._rateSeek = 0;
                    f._paused = !0;
                    c._stopFade(d[e]);
                    if (f._node)
                        if (c._webAudio) {
                            if (!f._node.bufferSource) break;
                            "undefined" === typeof f._node.bufferSource.stop ? f._node.bufferSource.noteOff(0) : f._node.bufferSource.stop(0);
                            c._cleanBuffer(f._node)
                        } else isNaN(f._node.duration) && Infinity !== f._node.duration || f._node.pause();
                    b || c._emit("pause", f._id)
                }
            }
            return c
        },
        stop: function(a) {
            var b = this;
            if ("loaded" !== b._state) return b._queue.push({
                event: "stop",
                action: function() {
                    b.stop(a)
                }
            }), b;
            for (var c = b._getSoundIds(a), d = 0; d < c.length; d++) {
                b._clearTimer(c[d]);
                var e = b._soundById(c[d]);
                if (e && !e._paused && (e._seek = e._start || 0, e._rateSeek =
                        0, e._paused = !0, e._ended = !0, b._stopFade(c[d]), e._node))
                    if (b._webAudio) {
                        if (!e._node.bufferSource) break;
                        "undefined" === typeof e._node.bufferSource.stop ? e._node.bufferSource.noteOff(0) : e._node.bufferSource.stop(0);
                        b._cleanBuffer(e._node)
                    } else isNaN(e._node.duration) && Infinity !== e._node.duration || (e._node.pause(), e._node.currentTime = e._start || 0);
                e && b._emit("stop", e._id)
            }
            return b
        },
        mute: function(a, c) {
            var d = this;
            if ("loaded" !== d._state) return d._queue.push({
                event: "mute",
                action: function() {
                    d.mute(a, c)
                }
            }), d;
            if ("undefined" ===
                typeof c)
                if ("boolean" === typeof a) d._muted = a;
                else return d._muted;
            for (var e = d._getSoundIds(c), f = 0; f < e.length; f++) {
                var g = d._soundById(e[f]);
                g && (g._muted = a, d._webAudio && g._node ? g._node.gain.setValueAtTime(a ? 0 : g._volume * b.volume(), b.ctx.currentTime) : g._node && (g._node.muted = b._muted ? !0 : a), d._emit("mute", g._id))
            }
            return d
        },
        volume: function() {
            var a = this,
                c = arguments,
                d, e;
            if (0 === c.length) return a._volume;
            1 === c.length ? 0 <= a._getSoundIds().indexOf(c[0]) ? e = parseInt(c[0], 10) : d = parseFloat(c[0]) : 2 <= c.length && (d = parseFloat(c[0]),
                e = parseInt(c[1], 10));
            var f;
            if ("undefined" !== typeof d && 0 <= d && 1 >= d) {
                if ("loaded" !== a._state) return a._queue.push({
                    event: "volume",
                    action: function() {
                        a.volume.apply(a, c)
                    }
                }), a;
                "undefined" === typeof e && (a._volume = d);
                e = a._getSoundIds(e);
                for (var g = 0; g < e.length; g++)
                    if (f = a._soundById(e[g])) f._volume = d, c[2] || a._stopFade(e[g]), a._webAudio && f._node && !f._muted ? f._node.gain.setValueAtTime(d * b.volume(), b.ctx.currentTime) : f._node && !f._muted && (f._node.volume = d * b.volume()), a._emit("volume", f._id)
            } else return (f = e ? a._soundById(e) :
                a._sounds[0]) ? f._volume : 0;
            return a
        },
        fade: function(a, c, d, e) {
            var f = this,
                g = Math.abs(a - c),
                h = a > c ? "out" : "in",
                g = d / (g / 0.01);
            if ("loaded" !== f._state) return f._queue.push({
                event: "fade",
                action: function() {
                    f.fade(a, c, d, e)
                }
            }), f;
            f.volume(a, e);
            for (var k = f._getSoundIds(e), l = 0; l < k.length; l++) {
                var p = f._soundById(k[l]);
                if (p) {
                    e || f._stopFade(k[l]);
                    if (f._webAudio && !p._muted) {
                        var r = b.ctx.currentTime,
                            x = r + d / 1E3;
                        p._volume = a;
                        p._node.gain.setValueAtTime(a * b.volume(), r);
                        p._node.gain.linearRampToValueAtTime(c * b.volume(), x)
                    }
                    var w =
                        a;
                    p._interval = setInterval(function(a, b) {
                        w += "in" === h ? 0.01 : -0.01;
                        w = Math.max(0, w);
                        w = Math.min(1, w);
                        w = Math.round(100 * w) / 100;
                        f._webAudio ? ("undefined" === typeof e && (f._volume = w), b._volume = w) : f.volume(w, a, !0);
                        w === c && (clearInterval(b._interval), b._interval = null, f.volume(w, a), f._emit("fade", a))
                    }.bind(f, k[l], p), g)
                }
            }
            return f
        },
        _stopFade: function(a) {
            var c = this._soundById(a);
            c && c._interval && (this._webAudio && c._node.gain.cancelScheduledValues(b.ctx.currentTime), clearInterval(c._interval), c._interval = null, this._emit("fade",
                a));
            return this
        },
        loop: function() {
            var a = arguments,
                b, c;
            if (0 === a.length) return this._loop;
            if (1 === a.length)
                if ("boolean" === typeof a[0]) this._loop = b = a[0];
                else return (a = this._soundById(parseInt(a[0], 10))) ? a._loop : !1;
            else 2 === a.length && (b = a[0], c = parseInt(a[1], 10));
            c = this._getSoundIds(c);
            for (var d = 0; d < c.length; d++)
                if (a = this._soundById(c[d])) a._loop = b, this._webAudio && a._node && a._node.bufferSource && (a._node.bufferSource.loop = b);
            return this
        },
        rate: function() {
            var a = this,
                c = arguments,
                d, e;
            0 === c.length ? e = a._sounds[0]._id :
                1 === c.length ? 0 <= a._getSoundIds().indexOf(c[0]) ? e = parseInt(c[0], 10) : d = parseFloat(c[0]) : 2 === c.length && (d = parseFloat(c[0]), e = parseInt(c[1], 10));
            var f;
            if ("number" === typeof d) {
                if ("loaded" !== a._state) return a._queue.push({
                    event: "rate",
                    action: function() {
                        a.rate.apply(a, c)
                    }
                }), a;
                "undefined" === typeof e && (a._rate = d);
                e = a._getSoundIds(e);
                for (var g = 0; g < e.length; g++)
                    if (f = a._soundById(e[g])) {
                        f._rateSeek = a.seek(e[g]);
                        f._playStart = a._webAudio ? b.ctx.currentTime : f._playStart;
                        f._rate = d;
                        a._webAudio && f._node && f._node.bufferSource ?
                            f._node.bufferSource.playbackRate.value = d : f._node && (f._node.playbackRate = d);
                        var h = a.seek(e[g]),
                            h = 1E3 * ((a._sprite[f._sprite][0] + a._sprite[f._sprite][1]) / 1E3 - h) / Math.abs(f._rate);
                        a._clearTimer(e[g]);
                        a._endTimers[e[g]] = setTimeout(a._ended.bind(a, f), h);
                        a._emit("rate", f._id)
                    }
            } else return (f = a._soundById(e)) ? f._rate : a._rate;
            return a
        },
        seek: function() {
            var a = this,
                c = arguments,
                d, e;
            0 === c.length ? e = a._sounds[0]._id : 1 === c.length ? 0 <= a._getSoundIds().indexOf(c[0]) ? e = parseInt(c[0], 10) : (e = a._sounds[0]._id, d = parseFloat(c[0])) :
                2 === c.length && (d = parseFloat(c[0]), e = parseInt(c[1], 10));
            if ("undefined" === typeof e) return a;
            if ("loaded" !== a._state) return a._queue.push({
                event: "seek",
                action: function() {
                    a.seek.apply(a, c)
                }
            }), a;
            var f = a._soundById(e);
            if (f)
                if ("number" === typeof d && 0 <= d) {
                    var g = a.playing(e);
                    g && a.pause(e, !0);
                    f._seek = d;
                    f._ended = !1;
                    a._clearTimer(e);
                    g && a.play(e, !0);
                    a._emit("seek", e)
                } else return a._webAudio ? (d = a.playing(e) ? b.ctx.currentTime - f._playStart : 0, f._seek + ((f._rateSeek ? f._rateSeek - f._seek : 0) + d * Math.abs(f._rate))) : f._node.currentTime;
            return a
        },
        playing: function(a) {
            if ("number" === typeof a) return (a = this._soundById(a)) ? !a._paused : !1;
            for (a = 0; a < this._sounds.length; a++)
                if (!this._sounds[a]._paused) return !0;
            return !1
        },
        duration: function(a) {
            var b = this._duration;
            (a = this._soundById(a)) && (b = this._sprite[a._sprite][1] / 1E3);
            return b
        },
        state: function() {
            return this._state
        },
        unload: function() {
            for (var a = this._sounds, c = 0; c < a.length; c++) {
                a[c]._paused || (this.stop(a[c]._id), this._emit("end", a[c]._id));
                this._webAudio || (a[c]._node.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",
                    a[c]._node.removeEventListener("error", a[c]._errorFn, !1), a[c]._node.removeEventListener(b._canPlayEvent, a[c]._loadFn, !1));
                delete a[c]._node;
                this._clearTimer(a[c]._id);
                var d = b._howls.indexOf(this);
                0 <= d && b._howls.splice(d, 1)
            }
            e && delete e[this._src];
            this._state = "unloaded";
            this._sounds = [];
            return null
        },
        on: function(a, b, c, d) {
            a = this["_on" + a];
            "function" === typeof b && a.push(d ? {
                id: c,
                fn: b,
                once: d
            } : {
                id: c,
                fn: b
            });
            return this
        },
        off: function(a, b, c) {
            var d = this["_on" + a],
                e = 0;
            if (b)
                for (e = 0; e < d.length; e++) {
                    if (b === d[e].fn &&
                        c === d[e].id) {
                        d.splice(e, 1);
                        break
                    }
                } else if (a) this["_on" + a] = [];
                else
                    for (a = Object.keys(this), e = 0; e < a.length; e++) 0 === a[e].indexOf("_on") && Array.isArray(this[a[e]]) && (this[a[e]] = []);
            return this
        },
        once: function(a, b, c) {
            this.on(a, b, c, 1);
            return this
        },
        _emit: function(a, b, c) {
            for (var d = this["_on" + a], e = d.length - 1; 0 <= e; e--) d[e].id && d[e].id !== b && "load" !== a || (setTimeout(function(a) {
                a.call(this, b, c)
            }.bind(this, d[e].fn), 0), d[e].once && this.off(a, d[e].fn, d[e].id));
            return this
        },
        _loadQueue: function() {
            var a = this;
            if (0 < a._queue.length) {
                var b =
                    a._queue[0];
                a.once(b.event, function() {
                    a._queue.shift();
                    a._loadQueue()
                });
                b.action()
            }
            return a
        },
        _ended: function(a) {
            var c = a._sprite,
                c = !(!a._loop && !this._sprite[c][2]);
            this._emit("end", a._id);
            !this._webAudio && c && this.stop(a._id).play(a._id);
            if (this._webAudio && c) {
                this._emit("play", a._id);
                a._seek = a._start || 0;
                a._rateSeek = 0;
                a._playStart = b.ctx.currentTime;
                var d = 1E3 * (a._stop - a._start) / Math.abs(a._rate);
                this._endTimers[a._id] = setTimeout(this._ended.bind(this, a), d)
            }
            this._webAudio && !c && (a._paused = !0, a._ended = !0,
                a._seek = a._start || 0, a._rateSeek = 0, this._clearTimer(a._id), this._cleanBuffer(a._node), b._autoSuspend());
            this._webAudio || c || this.stop(a._id);
            return this
        },
        _clearTimer: function(a) {
            this._endTimers[a] && (clearTimeout(this._endTimers[a]), delete this._endTimers[a]);
            return this
        },
        _soundById: function(a) {
            for (var b = 0; b < this._sounds.length; b++)
                if (a === this._sounds[b]._id) return this._sounds[b];
            return null
        },
        _inactiveSound: function() {
            this._drain();
            for (var a = 0; a < this._sounds.length; a++)
                if (this._sounds[a]._ended) return this._sounds[a].reset();
            return new d(this)
        },
        _drain: function() {
            var a = this._pool,
                b = 0,
                c = 0;
            if (!(this._sounds.length < a)) {
                for (c = 0; c < this._sounds.length; c++) this._sounds[c]._ended && b++;
                for (c = this._sounds.length - 1; 0 <= c && !(b <= a); c--) this._sounds[c]._ended && (this._webAudio && this._sounds[c]._node && this._sounds[c]._node.disconnect(0), this._sounds.splice(c, 1), b--)
            }
        },
        _getSoundIds: function(a) {
            if ("undefined" === typeof a) {
                a = [];
                for (var b = 0; b < this._sounds.length; b++) a.push(this._sounds[b]._id);
                return a
            }
            return [a]
        },
        _refreshBuffer: function(a) {
            a._node.bufferSource =
                b.ctx.createBufferSource();
            a._node.bufferSource.buffer = e[this._src];
            a._panner ? a._node.bufferSource.connect(a._panner) : a._node.bufferSource.connect(a._node);
            if (a._node.bufferSource.loop = a._loop) a._node.bufferSource.loopStart = a._start || 0, a._node.bufferSource.loopEnd = a._stop;
            a._node.bufferSource.playbackRate.value = a._rate;
            return this
        },
        _cleanBuffer: function(a) {
            if (this._scratchBuffer) {
                a.bufferSource.onended = null;
                a.bufferSource.disconnect(0);
                try {
                    a.bufferSource.buffer = this._scratchBuffer
                } catch (b) {}
            }
            a.bufferSource =
                null;
            return this
        }
    };
    var d = function(a) {
        this._parent = a;
        this.init()
    };
    d.prototype = {
        init: function() {
            var a = this._parent;
            this._muted = a._muted;
            this._loop = a._loop;
            this._volume = a._volume;
            this._muted = a._muted;
            this._rate = a._rate;
            this._seek = 0;
            this._ended = this._paused = !0;
            this._sprite = "__default";
            this._id = Math.round(Date.now() * Math.random());
            a._sounds.push(this);
            this.create();
            return this
        },
        create: function() {
            var a = this._parent,
                c = b._muted || this._muted || this._parent._muted ? 0 : this._volume * b.volume();
            a._webAudio ? (this._node =
                "undefined" === typeof b.ctx.createGain ? b.ctx.createGainNode() : b.ctx.createGain(), this._node.gain.setValueAtTime(c, b.ctx.currentTime), this._node.paused = !0, this._node.connect(b.masterGain)) : (this._node = new Audio, this._errorFn = this._errorListener.bind(this), this._node.addEventListener("error", this._errorFn, !1), this._loadFn = this._loadListener.bind(this), this._node.addEventListener(b._canPlayEvent, this._loadFn, !1), this._node.src = a._src, this._node.preload = "auto", this._node.volume = c, this._node.load());
            return this
        },
        reset: function() {
            var a = this._parent;
            this._muted = a._muted;
            this._loop = a._loop;
            this._volume = a._volume;
            this._muted = a._muted;
            this._rate = a._rate;
            this._rateSeek = this._seek = 0;
            this._ended = this._paused = !0;
            this._sprite = "__default";
            this._id = Math.round(Date.now() * Math.random());
            return this
        },
        _errorListener: function() {
            this._node.error && 4 === this._node.error.code && (b.noAudio = !0);
            this._parent._emit("loaderror", this._id, this._node.error ? this._node.error.code : 0);
            this._node.removeEventListener("error", this._errorListener, !1)
        },
        _loadListener: function() {
            var a = this._parent;
            a._duration = Math.ceil(10 * this._node.duration) / 10;
            0 === Object.keys(a._sprite).length && (a._sprite = {
                __default: [0, 1E3 * a._duration]
            });
            "loaded" !== a._state && (a._state = "loaded", a._emit("load"), a._loadQueue());
            a._autoplay && a.play();
            this._node.removeEventListener(b._canPlayEvent, this._loadFn, !1)
        }
    };
    var e = {},
        f = function(a) {
            var b = a._src;
            if (e[b]) a._duration = e[b].duration, k(a);
            else if (/^data:[^;]+;base64,/.test(b)) {
                for (var c = atob(b.split(",")[1]), d = new Uint8Array(c.length),
                        f = 0; f < c.length; ++f) d[f] = c.charCodeAt(f);
                h(d.buffer, a)
            } else {
                var l = new XMLHttpRequest;
                l.open("GET", b, !0);
                l.responseType = "arraybuffer";
                l.onload = function() {
                    var b = (l.status + "")[0];
                    "0" !== b && "2" !== b && "3" !== b ? a._emit("loaderror", null, "Failed loading audio file with status: " + l.status + ".") : h(l.response, a)
                };
                l.onerror = function() {
                    a._webAudio && (a._html5 = !0, a._webAudio = !1, a._sounds = [], delete e[b], a.load())
                };
                g(l)
            }
        },
        g = function(a) {
            try {
                a.send()
            } catch (b) {
                a.onerror()
            }
        },
        h = function(a, c) {
            b.ctx.decodeAudioData(a, function(a) {
                a &&
                    0 < c._sounds.length && (e[c._src] = a, k(c, a))
            }, function() {
                c._emit("loaderror", null, "Decoding audio data failed.")
            })
        },
        k = function(a, b) {
            b && !a._duration && (a._duration = b.duration);
            0 === Object.keys(a._sprite).length && (a._sprite = {
                __default: [0, 1E3 * a._duration]
            });
            "loaded" !== a._state && (a._state = "loaded", a._emit("load"), a._loadQueue());
            a._autoplay && a.play()
        },
        l = function() {
            b.noAudio = !1;
            try {
                "undefined" !== typeof AudioContext ? b.ctx = new AudioContext : "undefined" !== typeof webkitAudioContext ? b.ctx = new webkitAudioContext : b.usingWebAudio = !1
            } catch (a) {
                b.usingWebAudio = !1
            }
            if (!b.usingWebAudio)
                if ("undefined" !== typeof Audio) try {
                    var c = new Audio;
                    "undefined" === typeof c.oncanplaythrough && (b._canPlayEvent = "canplay")
                } catch (d) {
                    b.noAudio = !0
                } else b.noAudio = !0;
            try {
                c = new Audio, c.muted && (b.noAudio = !0)
            } catch (e) {}
            var c = /iP(hone|od|ad)/.test(b._navigator && b._navigator.platform),
                f = b._navigator && b._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                f = f ? parseInt(f[1], 10) : null;
            c && f && 9 > f && (c = /safari/.test(b._navigator && b._navigator.userAgent.toLowerCase()),
                b._navigator && b._navigator.standalone && !c || b._navigator && !b._navigator.standalone && !c) && (b.usingWebAudio = !1);
            b.usingWebAudio && (b.masterGain = "undefined" === typeof b.ctx.createGain ? b.ctx.createGainNode() : b.ctx.createGain(), b.masterGain.gain.value = 1, b.masterGain.connect(b.ctx.destination));
            b._setup()
        };
    "function" === typeof define && define.amd && define([], function() {
        return {
            Howler: b,
            Howl: c
        }
    });
    "undefined" !== typeof exports && (exports.Howler = b, exports.Howl = c);
    "undefined" !== typeof window ? (window.HowlerGlobal = a,
        window.Howler = b, window.Howl = c, window.Sound = d) : "undefined" !== typeof global && (global.HowlerGlobal = a, global.Howler = b, global.Howl = c, global.Sound = d)
})();
(function() {
    me.plugins = {};
    me.plugin = function() {
        var a = {};
        a.Base = me.Object.extend({
            init: function() {
                this.version = "3.1.0"
            }
        });
        a.patch = function(a, c, d) {
            "undefined" !== typeof a.prototype && (a = a.prototype);
            if ("function" === typeof a[c]) {
                var e = a[c];
                Object.defineProperty(a, c, {
                    configurable: !0,
                    value: function(a, b) {
                        return function() {
                            this._patched = e;
                            var a = b.apply(this, arguments);
                            this._patched = null;
                            return a
                        }
                    }(c, d)
                })
            } else console.error(c + " is not an existing function")
        };
        a.register = function(a, c) {
            me.plugin[c] && console.error("plugin " +
                c + " already registered");
            var d = [];
            2 < arguments.length && (d = Array.prototype.slice.call(arguments, 1));
            d[0] = a;
            d = new(a.bind.apply(a, d));
            if (!(d && d instanceof me.plugin.Base)) throw new me.Error("Plugin should extend the me.plugin.Base Class !");
            if (0 < me.sys.checkVersion(d.version)) throw new me.Error("Plugin version mismatch, expected: " + d.version + ", got: " + me.version);
            me.plugins[c] = d
        };
        return a
    }()
})();
me.DraggableEntity = function(a, b, c, d) {
    return a.extend({
        init: function(c, f, g) {
            a.prototype.init.apply(this, [c, f, g]);
            this.dragging = !1;
            this.dragId = null;
            this.grabOffset = new d(0, 0);
            this.onPointerEvent = b.registerPointerEvent;
            this.removePointerEvent = b.releasePointerEvent;
            this.initEvents()
        },
        initEvents: function() {
            var a = this;
            this.mouseDown = function(a) {
                this.translatePointerEvent(a, c.DRAGSTART)
            };
            this.mouseUp = function(a) {
                this.translatePointerEvent(a, c.DRAGEND)
            };
            this.onPointerEvent("pointerdown", this, this.mouseDown.bind(this));
            this.onPointerEvent("pointerup", this, this.mouseUp.bind(this));
            c.subscribe(c.POINTERMOVE, this.dragMove.bind(this));
            c.subscribe(c.DRAGSTART, function(b, c) {
                c === a && a.dragStart(b)
            });
            c.subscribe(c.DRAGEND, function(b, c) {
                c === a && a.dragEnd(b)
            })
        },
        translatePointerEvent: function(a, b) {
            c.publish(b, [a, this])
        },
        dragStart: function(a) {
            if (!1 === this.dragging) return this.dragging = !0, this.dragId = a.pointerId, this.grabOffset.set(a.gameX, a.gameY), this.grabOffset.sub(this.pos), !1
        },
        dragMove: function(a) {
            !0 === this.dragging && this.dragId ===
                a.pointerId && (this.pos.set(a.gameX, a.gameY, this.pos.z), this.pos.sub(this.grabOffset))
        },
        dragEnd: function() {
            if (!0 === this.dragging) return this.pointerId = void 0, this.dragging = !1
        },
        destroy: function() {
            c.unsubscribe(c.POINTERMOVE, this.dragMove);
            c.unsubscribe(c.DRAGSTART, this.dragStart);
            c.unsubscribe(c.DRAGEND, this.dragEnd);
            this.removePointerEvent("pointerdown", this);
            this.removePointerEvent("pointerup", this)
        }
    })
}(me.Entity, me.input, me.event, me.Vector2d);
me.DroptargetEntity = function(a, b) {
    return a.extend({
        init: function(c, d, e) {
            this.CHECKMETHOD_OVERLAP = "overlaps";
            this.CHECKMETHOD_CONTAINS = "contains";
            this.checkMethod = null;
            a.prototype.init.apply(this, [c, d, e]);
            b.subscribe(b.DRAGEND, this.checkOnMe.bind(this));
            this.checkMethod = this[this.CHECKMETHOD_OVERLAP]
        },
        setCheckMethod: function(a) {
            "undefined" !== typeof this[a] && (this.checkMethod = this[a])
        },
        checkOnMe: function(a, b) {
            b && this.checkMethod(b.getBounds()) && this.drop(b)
        },
        drop: function() {},
        destroy: function() {
            b.unsubscribe(b.DRAGEND,
                this.checkOnMe)
        }
    })
}(me.Entity, me.event);
me.CollectableEntity = me.Entity.extend({
    init: function(a, b, c) {
        me.Entity.prototype.init.apply(this, [a, b, c]);
        this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT
    }
});
me.LevelEntity = me.Entity.extend({
    init: function(a, b, c) {
        me.Entity.prototype.init.apply(this, [a, b, c]);
        this.nextlevel = c.to;
        this.fade = c.fade;
        this.duration = c.duration;
        this.fading = !1;
        this.name = "levelEntity";
        this.gotolevel = c.to;
        this.loadLevelSettings = {};
        ["container", "onLoaded", "flatten", "setViewportBounds"].forEach(function(a) {
            "undefined" !== typeof c[a] && (this.loadLevelSettings[a] = c[a])
        }.bind(this));
        "string" === typeof this.loadLevelSettings.container && (this.loadLevelSettings.container = me.game.world.getChildByName(this.loadLevelSettings.container)[0]);
        this.body.collisionType = me.collision.types.ACTION_OBJECT
    },
    onFadeComplete: function() {
        me.levelDirector.loadLevel(this.gotolevel, this.loadLevelSettings);
        me.game.viewport.fadeOut(this.fade, this.duration)
    },
    goTo: function(a) {
        this.gotolevel = a || this.nextlevel;
        this.fade && this.duration ? this.fading || (this.fading = !0, me.game.viewport.fadeIn(this.fade, this.duration, this.onFadeComplete.bind(this))) : me.levelDirector.loadLevel(this.gotolevel, this.loadLevelSettings)
    },
    onCollision: function() {
        "levelEntity" === this.name &&
            this.goTo();
        return !1
    }
});
(function() {
    var a = function() {
        var a = me.video.createCanvas(1, 1),
            c = a.getContext("2d");
        c.fillStyle = "#fff";
        c.fillRect(0, 0, 1, 1);
        return a
    }();
    me.ParticleEmitterSettings = {
        width: 0,
        height: 0,
        image: a,
        totalParticles: 50,
        angle: Math.PI / 2,
        angleVariation: 0,
        minLife: 1E3,
        maxLife: 3E3,
        speed: 2,
        speedVariation: 1,
        minRotation: 0,
        maxRotation: 0,
        minStartScale: 1,
        maxStartScale: 1,
        minEndScale: 0,
        maxEndScale: 0,
        gravity: 0,
        wind: 0,
        followTrajectory: !1,
        textureAdditive: !1,
        onlyInViewport: !0,
        floating: !1,
        maxParticles: 10,
        frequency: 100,
        duration: Infinity,
        framesToSkip: 0
    };
    me.ParticleEmitter = me.Rect.extend({
        init: function(a, c, d) {
            this._stream = !1;
            this._durationTimer = this._frequencyTimer = 0;
            this.isRenderable = this._enabled = !1;
            me.Rect.prototype.init.apply(this, [a, c, Infinity, Infinity]);
            this.autoSort = !1;
            this.container = new me.ParticleContainer(this);
            Object.defineProperty(this.pos, "z", {
                get: function() {
                    return this.container.pos.z
                }.bind(this),
                set: function(a) {
                    this.container.pos.z = a
                }.bind(this),
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(this, "floating", {
                get: function() {
                    return this.container.floating
                },
                set: function(a) {
                    this.container.floating = a
                },
                enumerable: !0,
                configurable: !0
            });
            this.reset(d)
        },
        onActivateEvent: function() {
            this.ancestor.addChild(this.container);
            this.container.pos.z = this.pos.z;
            this.ancestor.autoSort || this.ancestor.sort()
        },
        onDeactivateEvent: function() {
            this.ancestor.hasChild(this.container) && this.ancestor.removeChildNow(this.container)
        },
        destroy: function() {
            this.reset()
        },
        getRandomPoint: function() {
            var a = this.pos.clone();
            a.x += (0).randomFloat(this.width);
            a.y += (0).randomFloat(this.height);
            return a
        },
        reset: function(a) {
            a = a || {};
            var c = me.ParticleEmitterSettings;
            this.resize("number" === typeof a.width ? a.width : c.width, "number" === typeof a.height ? a.height : c.height);
            Object.assign(this, c, a);
            this.container.destroy()
        },
        addParticles: function(a) {
            for (var c = 0; c < ~~a; c++) {
                var d = me.pool.pull("me.Particle", this);
                this.container.addChild(d)
            }
        },
        isRunning: function() {
            return this._enabled && this._stream
        },
        streamParticles: function(a) {
            this._stream = this._enabled = !0;
            this.frequency = Math.max(this.frequency, 1);
            this._durationTimer =
                "number" === typeof a ? a : this.duration
        },
        stopStream: function() {
            this._enabled = !1
        },
        burstParticles: function(a) {
            this._enabled = !0;
            this._stream = !1;
            this.addParticles("number" === typeof a ? a : this.totalParticles);
            this._enabled = !1
        },
        update: function(a) {
            if (this._enabled && this._stream) {
                if (Infinity !== this._durationTimer && (this._durationTimer -= a, 0 >= this._durationTimer)) return this.stopStream(), !1;
                this._frequencyTimer += a;
                a = this.container.children.length;
                a < this.totalParticles && this._frequencyTimer >= this.frequency && (a + this.maxParticles <=
                    this.totalParticles ? this.addParticles(this.maxParticles) : this.addParticles(this.totalParticles - a), this._frequencyTimer = 0)
            }
            return !0
        }
    })
})();
(function() {
    me.ParticleContainer = me.Container.extend({
        init: function(a) {
            this._viewport = me.game.viewport;
            me.Container.prototype.init.apply(this);
            this.autoSort = !1;
            this._dt = this._updateCount = 0;
            this._emitter = a
        },
        getBounds: function() {
            return this._viewport
        },
        update: function(a) {
            ++this._updateCount > this._emitter.framesToSkip && (this._updateCount = 0);
            if (0 < this._updateCount) return this._dt += a, !1;
            a += this._dt;
            this._dt = 0;
            for (var b = me.game.viewport, c = this.children.length - 1; 0 <= c; --c) {
                var d = this.children[c];
                d.isRenderable = !0;
                d.inViewport = this.floating || d.pos.x < b.pos.x + b.width && b.pos.x < d.pos.x + d.width && d.pos.y < b.pos.y + b.height && b.pos.y < d.pos.y + d.height;
                d.update(a) || this.removeChildNow(d)
            }
            return !0
        },
        draw: function(a, b) {
            if (0 < this.children.length) {
                var c = a.getContext(),
                    d;
                this._emitter.textureAdditive && (d = c.globalCompositeOperation, c.globalCompositeOperation = "lighter");
                me.Container.prototype.draw.apply(this, [a, b]);
                this._emitter.textureAdditive && (c.globalCompositeOperation = d)
            }
        }
    })
})();
(function() {
    me.Particle = me.Renderable.extend({
        init: function(a) {
            var b = a.getRandomPoint();
            me.Renderable.prototype.init.apply(this, [b.x, b.y, a.image.width, a.image.height]);
            this.alwaysUpdate = !0;
            this.isRenderable = !1;
            this.image = a.image;
            var b = a.angle + (0 < a.angleVariation ? ((0).randomFloat(2) - 1) * a.angleVariation : 0),
                c = a.speed + (0 < a.speedVariation ? ((0).randomFloat(2) - 1) * a.speedVariation : 0);
            this.vel = new me.Vector2d(c * Math.cos(b), -c * Math.sin(b));
            this.startLife = this.life = a.minLife.randomFloat(a.maxLife);
            this.startScale =
                a.minStartScale.randomFloat(a.maxStartScale).clamp(a.minStartScale, a.maxStartScale);
            this.endScale = a.minEndScale.randomFloat(a.maxEndScale).clamp(a.minEndScale, a.maxEndScale);
            this.gravity = a.gravity;
            this.wind = a.wind;
            this.followTrajectory = a.followTrajectory;
            this.onlyInViewport = a.onlyInViewport;
            this.pos.z = a.z;
            this._deltaInv = me.sys.fps / 1E3;
            this.transform = new me.Matrix2d;
            a.followTrajectory || (this.angle = a.minRotation.randomFloat(a.maxRotation))
        },
        update: function(a) {
            var b = a * this._deltaInv;
            this.life = this.life >
                a ? this.life - a : 0;
            var c = this.life / this.startLife;
            a = this.startScale;
            this.startScale > this.endScale ? (a *= c, a = a < this.endScale ? this.endScale : a) : this.startScale < this.endScale && (a /= c, a = a > this.endScale ? this.endScale : a);
            this.alpha = c;
            this.vel.x += this.wind * b;
            this.vel.y += this.gravity * b;
            c = this.followTrajectory ? Math.atan2(this.vel.y, this.vel.x) : this.angle;
            this.pos.x += this.vel.x * b;
            this.pos.y += this.vel.y * b;
            this.transform.set(a, 0, 0, 0, a, 0, ~~this.pos.x, ~~this.pos.y, 1).rotate(c);
            return (this.inViewport || !this.onlyInViewport) &&
                0 < this.life
        },
        draw: function(a) {
            a.save();
            a.setGlobalAlpha(a.globalAlpha() * this.alpha);
            a.transform(this.transform);
            var b = this.width,
                c = this.height;
            a.drawImage(this.image, 0, 0, b, c, -b / 2, -c / 2, b, c);
            a.restore()
        }
    })
})(window);