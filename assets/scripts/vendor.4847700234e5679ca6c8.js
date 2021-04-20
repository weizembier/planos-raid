! function(t) {
    var e = {};

    function i(r) {
        if (e[r]) return e[r].exports;
        var n = e[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(n.exports, n, n.exports, i), n.l = !0, n.exports
    }
    i.m = t, i.c = e, i.d = function(t, e, r) {
        i.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
        })
    }, i.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, i.t = function(t, e) {
        if (1 & e && (t = i(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (i.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var n in t) i.d(r, n, function(e) {
                return t[e]
            }.bind(null, n));
        return r
    }, i.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return i.d(e, "a", e), e
    }, i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, i.p = "", i(i.s = 34)
}([function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Factory = void 0;
    var r = i(3),
        n = i(2);
    e.Factory = {
        addGetterSetter: function(t, i, r, n, o) {
            e.Factory.addGetter(t, i, r), e.Factory.addSetter(t, i, n, o), e.Factory.addOverloadedGetterSetter(t, i)
        },
        addGetter: function(t, e, i) {
            var n = "get" + r.Util._capitalize(e);
            t.prototype[n] = t.prototype[n] || function() {
                var t = this.attrs[e];
                return void 0 === t ? i : t
            }
        },
        addSetter: function(t, i, n, o) {
            var a = "set" + r.Util._capitalize(i);
            t.prototype[a] || e.Factory.overWriteSetter(t, i, n, o)
        },
        overWriteSetter: function(t, e, i, n) {
            var o = "set" + r.Util._capitalize(e);
            t.prototype[o] = function(t) {
                return i && null != t && (t = i.call(this, t, e)), this._setAttr(e, t), n && n.call(this), this
            }
        },
        addComponentsGetterSetter: function(t, i, o, a, s) {
            var h, c, l = o.length,
                d = r.Util._capitalize,
                u = "get" + d(i),
                p = "set" + d(i);
            t.prototype[u] = function() {
                var t = {};
                for (h = 0; h < l; h++) t[c = o[h]] = this.getAttr(i + d(c));
                return t
            };
            var f = n.getComponentValidator(o);
            t.prototype[p] = function(t) {
                var e, r = this.attrs[i];
                for (e in a && (t = a.call(this, t)), f && f.call(this, t, i), t) t.hasOwnProperty(e) && this._setAttr(i + d(e), t[e]);
                return this._fireChangeEvent(i, r, t), s && s.call(this), this
            }, e.Factory.addOverloadedGetterSetter(t, i)
        },
        addOverloadedGetterSetter: function(t, e) {
            var i = r.Util._capitalize(e),
                n = "set" + i,
                o = "get" + i;
            t.prototype[e] = function() {
                return arguments.length ? (this[n](arguments[0]), this) : this[o]()
            }
        },
        addDeprecatedGetterSetter: function(t, i, n, o) {
            r.Util.error("Adding deprecated " + i);
            var a = "get" + r.Util._capitalize(i),
                s = i + " property is deprecated and will be removed soon. Look at Konva change log for more information.";
            t.prototype[a] = function() {
                r.Util.error(s);
                var t = this.attrs[i];
                return void 0 === t ? n : t
            }, e.Factory.addSetter(t, i, o, (function() {
                r.Util.error(s)
            })), e.Factory.addOverloadedGetterSetter(t, i)
        },
        backCompat: function(t, e) {
            r.Util.each(e, (function(e, i) {
                var n = t.prototype[i],
                    o = "get" + r.Util._capitalize(e),
                    a = "set" + r.Util._capitalize(e);

                function s() {
                    n.apply(this, arguments), r.Util.error('"' + e + '" method is deprecated and will be removed soon. Use ""' + i + '" instead.')
                }
                t.prototype[e] = s, t.prototype[o] = s, t.prototype[a] = s
            }))
        },
        afterSetFilter: function() {
            this._filterUpToDate = !1
        }
    }
}, function(t, e, i) {
    "use strict";
    (function(t) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e._registerNode = e._NODES_REGISTRY = e.Konva = e.glob = e._parseUA = void 0;
        var i = Math.PI / 180;
        var r = function(t) {
            var e = t.indexOf("msie ");
            if (e > 0) return parseInt(t.substring(e + 5, t.indexOf(".", e)), 10);
            if (t.indexOf("trident/") > 0) {
                var i = t.indexOf("rv:");
                return parseInt(t.substring(i + 3, t.indexOf(".", i)), 10)
            }
            var r = t.indexOf("edge/");
            return r > 0 && parseInt(t.substring(r + 5, t.indexOf(".", r)), 10)
        };
        e._parseUA = function(t) {
            var e = t.toLowerCase(),
                i = /(chrome)[ /]([\w.]+)/.exec(e) || /(webkit)[ /]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ /]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [],
                n = !!t.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i),
                o = !!t.match(/IEMobile/i);
            return {
                browser: i[1] || "",
                version: i[2] || "0",
                isIE: r(e),
                mobile: n,
                ieMobile: o
            }
        }, e.glob = void 0 !== t ? t : "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope ? self : {}, e.Konva = {
            _global: e.glob,
            version: "7.2.5",
            isBrowser: "undefined" != typeof window && ("[object Window]" === {}.toString.call(window) || "[object global]" === {}.toString.call(window)),
            isUnminified: /param/.test(function(t) {}.toString()),
            dblClickWindow: 400,
            getAngle: function(t) {
                return e.Konva.angleDeg ? t * i : t
            },
            enableTrace: !1,
            _pointerEventsEnabled: !1,
            hitOnDragEnabled: !1,
            captureTouchEventsEnabled: !1,
            listenClickTap: !1,
            inDblClickWindow: !1,
            pixelRatio: void 0,
            dragDistance: 3,
            angleDeg: !0,
            showWarnings: !0,
            dragButtons: [0, 1],
            isDragging: function() {
                return e.Konva.DD.isDragging
            },
            isDragReady: function() {
                return !!e.Konva.DD.node
            },
            UA: e._parseUA(e.glob.navigator && e.glob.navigator.userAgent || ""),
            document: e.glob.document,
            _injectGlobal: function(t) {
                e.glob.Konva = t
            },
            _parseUA: e._parseUA
        }, e._NODES_REGISTRY = {};
        e._registerNode = function(t) {
            e._NODES_REGISTRY[t.prototype.getClassName()] = t, e.Konva[t.prototype.getClassName()] = t
        }
    }).call(this, i(15))
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.getComponentValidator = e.getBooleanValidator = e.getNumberArrayValidator = e.getFunctionValidator = e.getStringOrGradientValidator = e.getStringValidator = e.getNumberOrAutoValidator = e.getNumberOrArrayOfNumbersValidator = e.getNumberValidator = e.alphaComponent = e.RGBComponent = void 0;
    var r = i(1),
        n = i(3);

    function o(t) {
        return n.Util._isString(t) ? '"' + t + '"' : "[object Number]" === Object.prototype.toString.call(t) || n.Util._isBoolean(t) ? t : Object.prototype.toString.call(t)
    }
    e.RGBComponent = function(t) {
        return t > 255 ? 255 : t < 0 ? 0 : Math.round(t)
    }, e.alphaComponent = function(t) {
        return t > 1 ? 1 : t < 1e-4 ? 1e-4 : t
    }, e.getNumberValidator = function() {
        if (r.Konva.isUnminified) return function(t, e) {
            return n.Util._isNumber(t) || n.Util.warn(o(t) + ' is a not valid value for "' + e + '" attribute. The value should be a number.'), t
        }
    }, e.getNumberOrArrayOfNumbersValidator = function(t) {
        if (r.Konva.isUnminified) return function(e, i) {
            var r = n.Util._isNumber(e),
                a = n.Util._isArray(e) && e.length == t;
            return r || a || n.Util.warn(o(e) + ' is a not valid value for "' + i + '" attribute. The value should be a number or Array<number>(' + t + ")"), e
        }
    }, e.getNumberOrAutoValidator = function() {
        if (r.Konva.isUnminified) return function(t, e) {
            return n.Util._isNumber(t) || "auto" === t || n.Util.warn(o(t) + ' is a not valid value for "' + e + '" attribute. The value should be a number or "auto".'), t
        }
    }, e.getStringValidator = function() {
        if (r.Konva.isUnminified) return function(t, e) {
            return n.Util._isString(t) || n.Util.warn(o(t) + ' is a not valid value for "' + e + '" attribute. The value should be a string.'), t
        }
    }, e.getStringOrGradientValidator = function() {
        if (r.Konva.isUnminified) return function(t, e) {
            var i = n.Util._isString(t),
                r = "[object CanvasGradient]" === Object.prototype.toString.call(t);
            return i || r || n.Util.warn(o(t) + ' is a not valid value for "' + e + '" attribute. The value should be a string or a native gradient.'), t
        }
    }, e.getFunctionValidator = function() {
        if (r.Konva.isUnminified) return function(t, e) {
            return n.Util._isFunction(t) || n.Util.warn(o(t) + ' is a not valid value for "' + e + '" attribute. The value should be a function.'), t
        }
    }, e.getNumberArrayValidator = function() {
        if (r.Konva.isUnminified) return function(t, e) {
            return n.Util._isArray(t) ? t.forEach((function(t) {
                n.Util._isNumber(t) || n.Util.warn('"' + e + '" attribute has non numeric element ' + t + ". Make sure that all elements are numbers.")
            })) : n.Util.warn(o(t) + ' is a not valid value for "' + e + '" attribute. The value should be a array of numbers.'), t
        }
    }, e.getBooleanValidator = function() {
        if (r.Konva.isUnminified) return function(t, e) {
            return !0 === t || !1 === t || n.Util.warn(o(t) + ' is a not valid value for "' + e + '" attribute. The value should be a boolean.'), t
        }
    }, e.getComponentValidator = function(t) {
        if (r.Konva.isUnminified) return function(e, i) {
            return n.Util.isObject(e) || n.Util.warn(o(e) + ' is a not valid value for "' + i + '" attribute. The value should be an object with properties ' + t), e
        }
    }
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Util = e.Transform = e.Collection = void 0;
    var r = i(1),
        n = function() {
            function t() {}
            return t.toCollection = function(e) {
                var i, r = new t,
                    n = e.length;
                for (i = 0; i < n; i++) r.push(e[i]);
                return r
            }, t._mapMethod = function(e) {
                t.prototype[e] = function() {
                    var t, i = this.length,
                        r = [].slice.call(arguments);
                    for (t = 0; t < i; t++) this[t][e].apply(this[t], r);
                    return this
                }
            }, t.mapMethods = function(e) {
                var i = e.prototype;
                for (var r in i) t._mapMethod(r)
            }, t
        }();
    e.Collection = n, n.prototype = [], n.prototype.each = function(t) {
        for (var e = 0; e < this.length; e++) t(this[e], e)
    }, n.prototype.toArray = function() {
        var t, e = [],
            i = this.length;
        for (t = 0; t < i; t++) e.push(this[t]);
        return e
    };
    var o = function() {
        function t(t) {
            void 0 === t && (t = [1, 0, 0, 1, 0, 0]), this.dirty = !1, this.m = t && t.slice() || [1, 0, 0, 1, 0, 0]
        }
        return t.prototype.reset = function() {
            this.m[0] = 1, this.m[1] = 0, this.m[2] = 0, this.m[3] = 1, this.m[4] = 0, this.m[5] = 0
        }, t.prototype.copy = function() {
            return new t(this.m)
        }, t.prototype.copyInto = function(t) {
            t.m[0] = this.m[0], t.m[1] = this.m[1], t.m[2] = this.m[2], t.m[3] = this.m[3], t.m[4] = this.m[4], t.m[5] = this.m[5]
        }, t.prototype.point = function(t) {
            var e = this.m;
            return {
                x: e[0] * t.x + e[2] * t.y + e[4],
                y: e[1] * t.x + e[3] * t.y + e[5]
            }
        }, t.prototype.translate = function(t, e) {
            return this.m[4] += this.m[0] * t + this.m[2] * e, this.m[5] += this.m[1] * t + this.m[3] * e, this
        }, t.prototype.scale = function(t, e) {
            return this.m[0] *= t, this.m[1] *= t, this.m[2] *= e, this.m[3] *= e, this
        }, t.prototype.rotate = function(t) {
            var e = Math.cos(t),
                i = Math.sin(t),
                r = this.m[0] * e + this.m[2] * i,
                n = this.m[1] * e + this.m[3] * i,
                o = this.m[0] * -i + this.m[2] * e,
                a = this.m[1] * -i + this.m[3] * e;
            return this.m[0] = r, this.m[1] = n, this.m[2] = o, this.m[3] = a, this
        }, t.prototype.getTranslation = function() {
            return {
                x: this.m[4],
                y: this.m[5]
            }
        }, t.prototype.skew = function(t, e) {
            var i = this.m[0] + this.m[2] * e,
                r = this.m[1] + this.m[3] * e,
                n = this.m[2] + this.m[0] * t,
                o = this.m[3] + this.m[1] * t;
            return this.m[0] = i, this.m[1] = r, this.m[2] = n, this.m[3] = o, this
        }, t.prototype.multiply = function(t) {
            var e = this.m[0] * t.m[0] + this.m[2] * t.m[1],
                i = this.m[1] * t.m[0] + this.m[3] * t.m[1],
                r = this.m[0] * t.m[2] + this.m[2] * t.m[3],
                n = this.m[1] * t.m[2] + this.m[3] * t.m[3],
                o = this.m[0] * t.m[4] + this.m[2] * t.m[5] + this.m[4],
                a = this.m[1] * t.m[4] + this.m[3] * t.m[5] + this.m[5];
            return this.m[0] = e, this.m[1] = i, this.m[2] = r, this.m[3] = n, this.m[4] = o, this.m[5] = a, this
        }, t.prototype.invert = function() {
            var t = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]),
                e = this.m[3] * t,
                i = -this.m[1] * t,
                r = -this.m[2] * t,
                n = this.m[0] * t,
                o = t * (this.m[2] * this.m[5] - this.m[3] * this.m[4]),
                a = t * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
            return this.m[0] = e, this.m[1] = i, this.m[2] = r, this.m[3] = n, this.m[4] = o, this.m[5] = a, this
        }, t.prototype.getMatrix = function() {
            return this.m
        }, t.prototype.setAbsolutePosition = function(t, e) {
            var i = this.m[0],
                r = this.m[1],
                n = this.m[2],
                o = this.m[3],
                a = this.m[4],
                s = (i * (e - this.m[5]) - r * (t - a)) / (i * o - r * n),
                h = (t - a - n * s) / i;
            return this.translate(h, s)
        }, t.prototype.decompose = function() {
            var t = this.m[0],
                i = this.m[1],
                r = this.m[2],
                n = this.m[3],
                o = t * n - i * r,
                a = {
                    x: this.m[4],
                    y: this.m[5],
                    rotation: 0,
                    scaleX: 0,
                    scaleY: 0,
                    skewX: 0,
                    skewY: 0
                };
            if (0 != t || 0 != i) {
                var s = Math.sqrt(t * t + i * i);
                a.rotation = i > 0 ? Math.acos(t / s) : -Math.acos(t / s), a.scaleX = s, a.scaleY = o / s, a.skewX = (t * r + i * n) / o, a.skewY = 0
            } else if (0 != r || 0 != n) {
                var h = Math.sqrt(r * r + n * n);
                a.rotation = Math.PI / 2 - (n > 0 ? Math.acos(-r / h) : -Math.acos(r / h)), a.scaleX = o / h, a.scaleY = h, a.skewX = 0, a.skewY = (t * r + i * n) / o
            }
            return a.rotation = e.Util._getRotation(a.rotation), a
        }, t
    }();
    e.Transform = o;
    var a = Math.PI / 180,
        s = 180 / Math.PI,
        h = {
            aliceblue: [240, 248, 255],
            antiquewhite: [250, 235, 215],
            aqua: [0, 255, 255],
            aquamarine: [127, 255, 212],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            bisque: [255, 228, 196],
            black: [0, 0, 0],
            blanchedalmond: [255, 235, 205],
            blue: [0, 0, 255],
            blueviolet: [138, 43, 226],
            brown: [165, 42, 42],
            burlywood: [222, 184, 135],
            cadetblue: [95, 158, 160],
            chartreuse: [127, 255, 0],
            chocolate: [210, 105, 30],
            coral: [255, 127, 80],
            cornflowerblue: [100, 149, 237],
            cornsilk: [255, 248, 220],
            crimson: [220, 20, 60],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgoldenrod: [184, 132, 11],
            darkgray: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkgrey: [169, 169, 169],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkseagreen: [143, 188, 143],
            darkslateblue: [72, 61, 139],
            darkslategray: [47, 79, 79],
            darkslategrey: [47, 79, 79],
            darkturquoise: [0, 206, 209],
            darkviolet: [148, 0, 211],
            deeppink: [255, 20, 147],
            deepskyblue: [0, 191, 255],
            dimgray: [105, 105, 105],
            dimgrey: [105, 105, 105],
            dodgerblue: [30, 144, 255],
            firebrick: [178, 34, 34],
            floralwhite: [255, 255, 240],
            forestgreen: [34, 139, 34],
            fuchsia: [255, 0, 255],
            gainsboro: [220, 220, 220],
            ghostwhite: [248, 248, 255],
            gold: [255, 215, 0],
            goldenrod: [218, 165, 32],
            gray: [128, 128, 128],
            green: [0, 128, 0],
            greenyellow: [173, 255, 47],
            grey: [128, 128, 128],
            honeydew: [240, 255, 240],
            hotpink: [255, 105, 180],
            indianred: [205, 92, 92],
            indigo: [75, 0, 130],
            ivory: [255, 255, 240],
            khaki: [240, 230, 140],
            lavender: [230, 230, 250],
            lavenderblush: [255, 240, 245],
            lawngreen: [124, 252, 0],
            lemonchiffon: [255, 250, 205],
            lightblue: [173, 216, 230],
            lightcoral: [240, 128, 128],
            lightcyan: [224, 255, 255],
            lightgoldenrodyellow: [250, 250, 210],
            lightgray: [211, 211, 211],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightsalmon: [255, 160, 122],
            lightseagreen: [32, 178, 170],
            lightskyblue: [135, 206, 250],
            lightslategray: [119, 136, 153],
            lightslategrey: [119, 136, 153],
            lightsteelblue: [176, 196, 222],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            limegreen: [50, 205, 50],
            linen: [250, 240, 230],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            mediumaquamarine: [102, 205, 170],
            mediumblue: [0, 0, 205],
            mediumorchid: [186, 85, 211],
            mediumpurple: [147, 112, 219],
            mediumseagreen: [60, 179, 113],
            mediumslateblue: [123, 104, 238],
            mediumspringgreen: [0, 250, 154],
            mediumturquoise: [72, 209, 204],
            mediumvioletred: [199, 21, 133],
            midnightblue: [25, 25, 112],
            mintcream: [245, 255, 250],
            mistyrose: [255, 228, 225],
            moccasin: [255, 228, 181],
            navajowhite: [255, 222, 173],
            navy: [0, 0, 128],
            oldlace: [253, 245, 230],
            olive: [128, 128, 0],
            olivedrab: [107, 142, 35],
            orange: [255, 165, 0],
            orangered: [255, 69, 0],
            orchid: [218, 112, 214],
            palegoldenrod: [238, 232, 170],
            palegreen: [152, 251, 152],
            paleturquoise: [175, 238, 238],
            palevioletred: [219, 112, 147],
            papayawhip: [255, 239, 213],
            peachpuff: [255, 218, 185],
            peru: [205, 133, 63],
            pink: [255, 192, 203],
            plum: [221, 160, 203],
            powderblue: [176, 224, 230],
            purple: [128, 0, 128],
            rebeccapurple: [102, 51, 153],
            red: [255, 0, 0],
            rosybrown: [188, 143, 143],
            royalblue: [65, 105, 225],
            saddlebrown: [139, 69, 19],
            salmon: [250, 128, 114],
            sandybrown: [244, 164, 96],
            seagreen: [46, 139, 87],
            seashell: [255, 245, 238],
            sienna: [160, 82, 45],
            silver: [192, 192, 192],
            skyblue: [135, 206, 235],
            slateblue: [106, 90, 205],
            slategray: [119, 128, 144],
            slategrey: [119, 128, 144],
            snow: [255, 255, 250],
            springgreen: [0, 255, 127],
            steelblue: [70, 130, 180],
            tan: [210, 180, 140],
            teal: [0, 128, 128],
            thistle: [216, 191, 216],
            transparent: [255, 255, 255, 0],
            tomato: [255, 99, 71],
            turquoise: [64, 224, 208],
            violet: [238, 130, 238],
            wheat: [245, 222, 179],
            white: [255, 255, 255],
            whitesmoke: [245, 245, 245],
            yellow: [255, 255, 0],
            yellowgreen: [154, 205, 5]
        },
        c = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/,
        l = [];
    e.Util = {
        _isElement: function(t) {
            return !(!t || 1 != t.nodeType)
        },
        _isFunction: function(t) {
            return !!(t && t.constructor && t.call && t.apply)
        },
        _isPlainObject: function(t) {
            return !!t && t.constructor === Object
        },
        _isArray: function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        },
        _isNumber: function(t) {
            return "[object Number]" === Object.prototype.toString.call(t) && !isNaN(t) && isFinite(t)
        },
        _isString: function(t) {
            return "[object String]" === Object.prototype.toString.call(t)
        },
        _isBoolean: function(t) {
            return "[object Boolean]" === Object.prototype.toString.call(t)
        },
        isObject: function(t) {
            return t instanceof Object
        },
        isValidSelector: function(t) {
            if ("string" != typeof t) return !1;
            var e = t[0];
            return "#" === e || "." === e || e === e.toUpperCase()
        },
        _sign: function(t) {
            return 0 === t || t > 0 ? 1 : -1
        },
        requestAnimFrame: function(t) {
            l.push(t), 1 === l.length && requestAnimationFrame((function() {
                var t = l;
                l = [], t.forEach((function(t) {
                    t()
                }))
            }))
        },
        createCanvasElement: function() {
            var t = document.createElement("canvas");
            try {
                t.style = t.style || {}
            } catch (t) {}
            return t
        },
        createImageElement: function() {
            return document.createElement("img")
        },
        _isInDocument: function(t) {
            for (; t = t.parentNode;)
                if (t == document) return !0;
            return !1
        },
        _simplifyArray: function(t) {
            var i, r, n = [],
                o = t.length,
                a = e.Util;
            for (i = 0; i < o; i++) r = t[i], a._isNumber(r) ? r = Math.round(1e3 * r) / 1e3 : a._isString(r) || (r = r.toString()), n.push(r);
            return n
        },
        _urlToImage: function(t, e) {
            var i = new r.glob.Image;
            i.onload = function() {
                e(i)
            }, i.src = t
        },
        _rgbToHex: function(t, e, i) {
            return ((1 << 24) + (t << 16) + (e << 8) + i).toString(16).slice(1)
        },
        _hexToRgb: function(t) {
            t = t.replace("#", "");
            var e = parseInt(t, 16);
            return {
                r: e >> 16 & 255,
                g: e >> 8 & 255,
                b: 255 & e
            }
        },
        getRandomColor: function() {
            for (var t = (16777215 * Math.random() << 0).toString(16); t.length < 6;) t = "0" + t;
            return "#" + t
        },
        get: function(t, e) {
            return void 0 === t ? e : t
        },
        getRGB: function(t) {
            var e;
            return t in h ? {
                r: (e = h[t])[0],
                g: e[1],
                b: e[2]
            } : "#" === t[0] ? this._hexToRgb(t.substring(1)) : "rgb(" === t.substr(0, 4) ? (e = c.exec(t.replace(/ /g, "")), {
                r: parseInt(e[1], 10),
                g: parseInt(e[2], 10),
                b: parseInt(e[3], 10)
            }) : {
                r: 0,
                g: 0,
                b: 0
            }
        },
        colorToRGBA: function(t) {
            return t = t || "black", e.Util._namedColorToRBA(t) || e.Util._hex3ColorToRGBA(t) || e.Util._hex6ColorToRGBA(t) || e.Util._rgbColorToRGBA(t) || e.Util._rgbaColorToRGBA(t) || e.Util._hslColorToRGBA(t)
        },
        _namedColorToRBA: function(t) {
            var e = h[t.toLowerCase()];
            return e ? {
                r: e[0],
                g: e[1],
                b: e[2],
                a: 1
            } : null
        },
        _rgbColorToRGBA: function(t) {
            if (0 === t.indexOf("rgb(")) {
                var e = (t = t.match(/rgb\(([^)]+)\)/)[1]).split(/ *, */).map(Number);
                return {
                    r: e[0],
                    g: e[1],
                    b: e[2],
                    a: 1
                }
            }
        },
        _rgbaColorToRGBA: function(t) {
            if (0 === t.indexOf("rgba(")) {
                var e = (t = t.match(/rgba\(([^)]+)\)/)[1]).split(/ *, */).map(Number);
                return {
                    r: e[0],
                    g: e[1],
                    b: e[2],
                    a: e[3]
                }
            }
        },
        _hex6ColorToRGBA: function(t) {
            if ("#" === t[0] && 7 === t.length) return {
                r: parseInt(t.slice(1, 3), 16),
                g: parseInt(t.slice(3, 5), 16),
                b: parseInt(t.slice(5, 7), 16),
                a: 1
            }
        },
        _hex3ColorToRGBA: function(t) {
            if ("#" === t[0] && 4 === t.length) return {
                r: parseInt(t[1] + t[1], 16),
                g: parseInt(t[2] + t[2], 16),
                b: parseInt(t[3] + t[3], 16),
                a: 1
            }
        },
        _hslColorToRGBA: function(t) {
            if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(t)) {
                var e = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t),
                    i = (e[0], e.slice(1)),
                    r = Number(i[0]) / 360,
                    n = Number(i[1]) / 100,
                    o = Number(i[2]) / 100,
                    a = void 0,
                    s = void 0,
                    h = void 0;
                if (0 === n) return h = 255 * o, {
                    r: Math.round(h),
                    g: Math.round(h),
                    b: Math.round(h),
                    a: 1
                };
                for (var c = 2 * o - (a = o < .5 ? o * (1 + n) : o + n - o * n), l = [0, 0, 0], d = 0; d < 3; d++)(s = r + 1 / 3 * -(d - 1)) < 0 && s++, s > 1 && s--, h = 6 * s < 1 ? c + 6 * (a - c) * s : 2 * s < 1 ? a : 3 * s < 2 ? c + (a - c) * (2 / 3 - s) * 6 : c, l[d] = 255 * h;
                return {
                    r: Math.round(l[0]),
                    g: Math.round(l[1]),
                    b: Math.round(l[2]),
                    a: 1
                }
            }
        },
        haveIntersection: function(t, e) {
            return !(e.x > t.x + t.width || e.x + e.width < t.x || e.y > t.y + t.height || e.y + e.height < t.y)
        },
        cloneObject: function(t) {
            var e = {};
            for (var i in t) this._isPlainObject(t[i]) ? e[i] = this.cloneObject(t[i]) : this._isArray(t[i]) ? e[i] = this.cloneArray(t[i]) : e[i] = t[i];
            return e
        },
        cloneArray: function(t) {
            return t.slice(0)
        },
        _degToRad: function(t) {
            return t * a
        },
        _radToDeg: function(t) {
            return t * s
        },
        _getRotation: function(t) {
            return r.Konva.angleDeg ? e.Util._radToDeg(t) : t
        },
        _capitalize: function(t) {
            return t.charAt(0).toUpperCase() + t.slice(1)
        },
        throw: function(t) {
            throw new Error("Konva error: " + t)
        },
        error: function(t) {
            console.error("Konva error: " + t)
        },
        warn: function(t) {
            r.Konva.showWarnings && console.warn("Konva warning: " + t)
        },
        extend: function(t, e) {
            function i() {
                this.constructor = t
            }
            i.prototype = e.prototype;
            var r = t.prototype;
            for (var n in t.prototype = new i, r) r.hasOwnProperty(n) && (t.prototype[n] = r[n]);
            t.__super__ = e.prototype, t.super = e
        },
        _getControlPoints: function(t, e, i, r, n, o, a) {
            var s = Math.sqrt(Math.pow(i - t, 2) + Math.pow(r - e, 2)),
                h = Math.sqrt(Math.pow(n - i, 2) + Math.pow(o - r, 2)),
                c = a * s / (s + h),
                l = a * h / (s + h);
            return [i - c * (n - t), r - c * (o - e), i + l * (n - t), r + l * (o - e)]
        },
        _expandPoints: function(t, i) {
            var r, n, o = t.length,
                a = [];
            for (r = 2; r < o - 2; r += 2) n = e.Util._getControlPoints(t[r - 2], t[r - 1], t[r], t[r + 1], t[r + 2], t[r + 3], i), isNaN(n[0]) || (a.push(n[0]), a.push(n[1]), a.push(t[r]), a.push(t[r + 1]), a.push(n[2]), a.push(n[3]));
            return a
        },
        each: function(t, e) {
            for (var i in t) e(i, t[i])
        },
        _inRange: function(t, e, i) {
            return e <= t && t < i
        },
        _getProjectionToSegment: function(t, e, i, r, n, o) {
            var a, s, h, c = (t - i) * (t - i) + (e - r) * (e - r);
            if (0 == c) a = t, s = e, h = (n - i) * (n - i) + (o - r) * (o - r);
            else {
                var l = ((n - t) * (i - t) + (o - e) * (r - e)) / c;
                l < 0 ? (a = t, s = e, h = (t - n) * (t - n) + (e - o) * (e - o)) : l > 1 ? (a = i, s = r, h = (i - n) * (i - n) + (r - o) * (r - o)) : h = ((a = t + l * (i - t)) - n) * (a - n) + ((s = e + l * (r - e)) - o) * (s - o)
            }
            return [a, s, h]
        },
        _getProjectionToLine: function(t, i, r) {
            var n = e.Util.cloneObject(t),
                o = Number.MAX_VALUE;
            return i.forEach((function(a, s) {
                if (r || s !== i.length - 1) {
                    var h = i[(s + 1) % i.length],
                        c = e.Util._getProjectionToSegment(a.x, a.y, h.x, h.y, t.x, t.y),
                        l = c[0],
                        d = c[1],
                        u = c[2];
                    u < o && (n.x = l, n.y = d, o = u)
                }
            })), n
        },
        _prepareArrayForTween: function(t, i, r) {
            var n, o = [],
                a = [];
            if (t.length > i.length) {
                var s = i;
                i = t, t = s
            }
            for (n = 0; n < t.length; n += 2) o.push({
                x: t[n],
                y: t[n + 1]
            });
            for (n = 0; n < i.length; n += 2) a.push({
                x: i[n],
                y: i[n + 1]
            });
            var h = [];
            return a.forEach((function(t) {
                var i = e.Util._getProjectionToLine(t, o, r);
                h.push(i.x), h.push(i.y)
            })), h
        },
        _prepareToStringify: function(t) {
            var i;
            for (var r in t.visitedByCircularReferenceRemoval = !0, t)
                if (t.hasOwnProperty(r) && t[r] && "object" == typeof t[r])
                    if (i = Object.getOwnPropertyDescriptor(t, r), t[r].visitedByCircularReferenceRemoval || e.Util._isElement(t[r])) {
                        if (!i.configurable) return null;
                        delete t[r]
                    } else if (null === e.Util._prepareToStringify(t[r])) {
                if (!i.configurable) return null;
                delete t[r]
            }
            return delete t.visitedByCircularReferenceRemoval, t
        },
        _assign: function(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        },
        _getFirstPointerId: function(t) {
            return t.touches ? t.changedTouches[0].identifier : 999
        }
    }
}, , function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Node = e._removeName = e._addName = e._removeId = e.names = e.ids = void 0;
    var r = i(3),
        n = i(0),
        o = i(11),
        a = i(1),
        s = i(16),
        h = i(2);
    e.ids = {}, e.names = {};
    e._removeId = function(t, i) {
        t && e.ids[t] === i && delete e.ids[t]
    };
    e._addName = function(t, i) {
        i && (e.names[i] || (e.names[i] = []), e.names[i].push(t))
    };
    e._removeName = function(t, i) {
        if (t) {
            var r = e.names[t];
            if (r) {
                for (var n = 0; n < r.length; n++) {
                    r[n]._id === i && r.splice(n, 1)
                }
                0 === r.length && delete e.names[t]
            }
        }
    };
    var c = ["xChange.konva", "yChange.konva", "scaleXChange.konva", "scaleYChange.konva", "skewXChange.konva", "skewYChange.konva", "rotationChange.konva", "offsetXChange.konva", "offsetYChange.konva", "transformsEnabledChange.konva"].join(" "),
        l = (["scaleXChange.konva", "scaleYChange.konva"].join(" "), new r.Collection),
        d = 1,
        u = function() {
            function t(t) {
                this._id = d++, this.eventListeners = {}, this.attrs = {}, this.index = 0, this._allEventListeners = null, this.parent = null, this._cache = new Map, this._attachedDepsListeners = new Map, this._lastPos = null, this._batchingTransformChange = !1, this._needClearTransformCache = !1, this._filterUpToDate = !1, this._isUnderCache = !1, this.children = l, this._dragEventId = null, this._shouldFireChangeEvents = !1, this.setAttrs(t), this._shouldFireChangeEvents = !0
            }
            return t.prototype.hasChildren = function() {
                return !1
            }, t.prototype.getChildren = function() {
                return l
            }, t.prototype._clearCache = function(t) {
                "transform" !== t && "absoluteTransform" !== t || !this._cache.get(t) ? t ? this._cache.delete(t) : this._cache.clear() : this._cache.get(t).dirty = !0
            }, t.prototype._getCache = function(t, e) {
                var i = this._cache.get(t);
                return (void 0 === i || ("transform" === t || "absoluteTransform" === t) && !0 === i.dirty) && (i = e.call(this), this._cache.set(t, i)), i
            }, t.prototype._calculate = function(t, e, i) {
                var r = this;
                if (!this._attachedDepsListeners.get(t)) {
                    var n = e.map((function(t) {
                        return t + "Change.konva"
                    })).join(" ");
                    this.on(n, (function() {
                        r._clearCache(t)
                    })), this._attachedDepsListeners.set(t, !0)
                }
                return this._getCache(t, i)
            }, t.prototype._getCanvasCache = function() {
                return this._cache.get("canvas")
            }, t.prototype._clearSelfAndDescendantCache = function(t, e) {
                this._clearCache(t), e && "absoluteTransform" === t && this.fire("_clearTransformCache"), this.isCached() || this.children && this.children.each((function(e) {
                    e._clearSelfAndDescendantCache(t, !0)
                }))
            }, t.prototype.clearCache = function() {
                return this._cache.delete("canvas"), this._clearSelfAndDescendantCache(), this
            }, t.prototype.cache = function(t) {
                var e = t || {},
                    i = {};
                void 0 !== e.x && void 0 !== e.y && void 0 !== e.width && void 0 !== e.height || (i = this.getClientRect({
                    skipTransform: !0,
                    relativeTo: this.getParent()
                }));
                var n = Math.ceil(e.width || i.width),
                    a = Math.ceil(e.height || i.height),
                    s = e.pixelRatio,
                    h = void 0 === e.x ? i.x : e.x,
                    c = void 0 === e.y ? i.y : e.y,
                    l = e.offset || 0,
                    d = e.drawBorder || !1;
                if (n && a) {
                    n += 2 * l, a += 2 * l, h -= l, c -= l;
                    var u = new o.SceneCanvas({
                            pixelRatio: s,
                            width: n,
                            height: a
                        }),
                        p = new o.SceneCanvas({
                            pixelRatio: s,
                            width: 0,
                            height: 0
                        }),
                        f = new o.HitCanvas({
                            pixelRatio: 1,
                            width: n,
                            height: a
                        }),
                        g = u.getContext(),
                        y = f.getContext();
                    return f.isCache = !0, u.isCache = !0, this._cache.delete("canvas"), this._filterUpToDate = !1, !1 === e.imageSmoothingEnabled && (u.getContext()._context.imageSmoothingEnabled = !1, p.getContext()._context.imageSmoothingEnabled = !1), g.save(), y.save(), g.translate(-h, -c), y.translate(-h, -c), this._isUnderCache = !0, this._clearSelfAndDescendantCache("absoluteOpacity"), this._clearSelfAndDescendantCache("absoluteScale"), this.drawScene(u, this), this.drawHit(f, this), this._isUnderCache = !1, g.restore(), y.restore(), d && (g.save(), g.beginPath(), g.rect(0, 0, n, a), g.closePath(), g.setAttr("strokeStyle", "red"), g.setAttr("lineWidth", 5), g.stroke(), g.restore()), this._cache.set("canvas", {
                        scene: u,
                        filter: p,
                        hit: f,
                        x: h,
                        y: c
                    }), this
                }
                r.Util.error("Can not cache the node. Width or height of the node equals 0. Caching is skipped.")
            }, t.prototype.isCached = function() {
                return this._cache.has("canvas")
            }, t.prototype.getClientRect = function(t) {
                throw new Error('abstract "getClientRect" method call')
            }, t.prototype._transformedRect = function(t, e) {
                var i, r, n, o, a = [{
                        x: t.x,
                        y: t.y
                    }, {
                        x: t.x + t.width,
                        y: t.y
                    }, {
                        x: t.x + t.width,
                        y: t.y + t.height
                    }, {
                        x: t.x,
                        y: t.y + t.height
                    }],
                    s = this.getAbsoluteTransform(e);
                return a.forEach((function(t) {
                    var e = s.point(t);
                    void 0 === i && (i = n = e.x, r = o = e.y), i = Math.min(i, e.x), r = Math.min(r, e.y), n = Math.max(n, e.x), o = Math.max(o, e.y)
                })), {
                    x: i,
                    y: r,
                    width: n - i,
                    height: o - r
                }
            }, t.prototype._drawCachedSceneCanvas = function(t) {
                t.save(), t._applyOpacity(this), t._applyGlobalCompositeOperation(this);
                var e = this._getCanvasCache();
                t.translate(e.x, e.y);
                var i = this._getCachedSceneCanvas(),
                    r = i.pixelRatio;
                t.drawImage(i._canvas, 0, 0, i.width / r, i.height / r), t.restore()
            }, t.prototype._drawCachedHitCanvas = function(t) {
                var e = this._getCanvasCache(),
                    i = e.hit;
                t.save(), t.translate(e.x, e.y), t.drawImage(i._canvas, 0, 0), t.restore()
            }, t.prototype._getCachedSceneCanvas = function() {
                var t, e, i, n, o = this.filters(),
                    a = this._getCanvasCache(),
                    s = a.scene,
                    h = a.filter,
                    c = h.getContext();
                if (o) {
                    if (!this._filterUpToDate) {
                        var l = s.pixelRatio;
                        h.setSize(s.width / s.pixelRatio, s.height / s.pixelRatio);
                        try {
                            for (t = o.length, c.clear(), c.drawImage(s._canvas, 0, 0, s.getWidth() / l, s.getHeight() / l), e = c.getImageData(0, 0, h.getWidth(), h.getHeight()), i = 0; i < t; i++) "function" == typeof(n = o[i]) ? (n.call(this, e), c.putImageData(e, 0, 0)) : r.Util.error("Filter should be type of function, but got " + typeof n + " instead. Please check correct filters")
                        } catch (t) {
                            r.Util.error("Unable to apply filter. " + t.message + " This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.")
                        }
                        this._filterUpToDate = !0
                    }
                    return h
                }
                return s
            }, t.prototype.on = function(t, e) {
                if (this._cache && this._cache.delete("allEventListeners"), 3 === arguments.length) return this._delegate.apply(this, arguments);
                var i, r, n, o, a = t.split(" "),
                    s = a.length;
                for (i = 0; i < s; i++) n = (r = a[i].split("."))[0], o = r[1] || "", this.eventListeners[n] || (this.eventListeners[n] = []), this.eventListeners[n].push({
                    name: o,
                    handler: e
                });
                return this
            }, t.prototype.off = function(t, e) {
                var i, r, n, o, a, s = (t || "").split(" "),
                    h = s.length;
                if (this._cache && this._cache.delete("allEventListeners"), !t)
                    for (r in this.eventListeners) this._off(r);
                for (i = 0; i < h; i++)
                    if (o = (n = s[i].split("."))[0], a = n[1], o) this.eventListeners[o] && this._off(o, a, e);
                    else
                        for (r in this.eventListeners) this._off(r, a, e);
                return this
            }, t.prototype.dispatchEvent = function(t) {
                var e = {
                    target: this,
                    type: t.type,
                    evt: t
                };
                return this.fire(t.type, e), this
            }, t.prototype.addEventListener = function(t, e) {
                return this.on(t, (function(t) {
                    e.call(this, t.evt)
                })), this
            }, t.prototype.removeEventListener = function(t) {
                return this.off(t), this
            }, t.prototype._delegate = function(t, e, i) {
                var n = this;
                this.on(t, (function(t) {
                    for (var o = t.target.findAncestors(e, !0, n), a = 0; a < o.length; a++)(t = r.Util.cloneObject(t)).currentTarget = o[a], i.call(o[a], t)
                }))
            }, t.prototype.remove = function() {
                return this.isDragging() && this.stopDrag(), s.DD._dragElements.delete(this._id), this._remove(), this
            }, t.prototype._clearCaches = function() {
                this._clearSelfAndDescendantCache("absoluteTransform"), this._clearSelfAndDescendantCache("absoluteOpacity"), this._clearSelfAndDescendantCache("absoluteScale"), this._clearSelfAndDescendantCache("stage"), this._clearSelfAndDescendantCache("visible"), this._clearSelfAndDescendantCache("listening")
            }, t.prototype._remove = function() {
                this._clearCaches();
                var t = this.getParent();
                t && t.children && (t.children.splice(this.index, 1), t._setChildrenIndices(), this.parent = null)
            }, t.prototype.destroy = function() {
                e._removeId(this.id(), this);
                for (var t = (this.name() || "").split(/\s/g), i = 0; i < t.length; i++) {
                    var r = t[i];
                    e._removeName(r, this._id)
                }
                return this.remove(), this
            }, t.prototype.getAttr = function(t) {
                var e = "get" + r.Util._capitalize(t);
                return r.Util._isFunction(this[e]) ? this[e]() : this.attrs[t]
            }, t.prototype.getAncestors = function() {
                for (var t = this.getParent(), e = new r.Collection; t;) e.push(t), t = t.getParent();
                return e
            }, t.prototype.getAttrs = function() {
                return this.attrs || {}
            }, t.prototype.setAttrs = function(t) {
                var e = this;
                return this._batchTransformChanges((function() {
                    var i, n;
                    if (!t) return e;
                    for (i in t) "children" !== i && (n = "set" + r.Util._capitalize(i), r.Util._isFunction(e[n]) ? e[n](t[i]) : e._setAttr(i, t[i]))
                })), this
            }, t.prototype.isListening = function() {
                return this._getCache("listening", this._isListening)
            }, t.prototype._isListening = function(t) {
                if (!this.listening()) return !1;
                var e = this.getParent();
                return !e || e === t || this === t || e._isListening(t)
            }, t.prototype.isVisible = function() {
                return this._getCache("visible", this._isVisible)
            }, t.prototype._isVisible = function(t) {
                if (!this.visible()) return !1;
                var e = this.getParent();
                return !e || e === t || this === t || e._isVisible(t)
            }, t.prototype.shouldDrawHit = function(t, e) {
                if (void 0 === e && (e = !1), t) return this._isVisible(t) && this._isListening(t);
                var i = this.getLayer(),
                    r = !1;
                s.DD._dragElements.forEach((function(t) {
                    "dragging" === t.dragStatus && ("Stage" === t.node.nodeType || t.node.getLayer() === i) && (r = !0)
                }));
                var n = !e && !a.Konva.hitOnDragEnabled && r;
                return this.isListening() && this.isVisible() && !n
            }, t.prototype.show = function() {
                return this.visible(!0), this
            }, t.prototype.hide = function() {
                return this.visible(!1), this
            }, t.prototype.getZIndex = function() {
                return this.index || 0
            }, t.prototype.getAbsoluteZIndex = function() {
                var t, e, i, r, n = this.getDepth(),
                    o = this,
                    a = 0;
                return "Stage" !== o.nodeType && function s(h) {
                    for (t = [], e = h.length, i = 0; i < e; i++) r = h[i], a++, "Shape" !== r.nodeType && (t = t.concat(r.getChildren().toArray())), r._id === o._id && (i = e);
                    t.length > 0 && t[0].getDepth() <= n && s(t)
                }(o.getStage().getChildren()), a
            }, t.prototype.getDepth = function() {
                for (var t = 0, e = this.parent; e;) t++, e = e.parent;
                return t
            }, t.prototype._batchTransformChanges = function(t) {
                this._batchingTransformChange = !0, t(), this._batchingTransformChange = !1, this._needClearTransformCache && (this._clearCache("transform"), this._clearSelfAndDescendantCache("absoluteTransform", !0)), this._needClearTransformCache = !1
            }, t.prototype.setPosition = function(t) {
                var e = this;
                return this._batchTransformChanges((function() {
                    e.x(t.x), e.y(t.y)
                })), this
            }, t.prototype.getPosition = function() {
                return {
                    x: this.x(),
                    y: this.y()
                }
            }, t.prototype.getAbsolutePosition = function(t) {
                for (var e = !1, i = this.parent; i;) {
                    if (i.isCached()) {
                        e = !0;
                        break
                    }
                    i = i.parent
                }
                e && !t && (t = !0);
                var n = this.getAbsoluteTransform(t).getMatrix(),
                    o = new r.Transform,
                    a = this.offset();
                return o.m = n.slice(), o.translate(a.x, a.y), o.getTranslation()
            }, t.prototype.setAbsolutePosition = function(t) {
                var e = this._clearTransform();
                this.attrs.x = e.x, this.attrs.y = e.y, delete e.x, delete e.y, this._clearCache("transform");
                var i = this._getAbsoluteTransform().copy();
                return i.invert(), i.translate(t.x, t.y), t = {
                    x: this.attrs.x + i.getTranslation().x,
                    y: this.attrs.y + i.getTranslation().y
                }, this._setTransform(e), this.setPosition({
                    x: t.x,
                    y: t.y
                }), this._clearCache("transform"), this._clearSelfAndDescendantCache("absoluteTransform"), this
            }, t.prototype._setTransform = function(t) {
                var e;
                for (e in t) this.attrs[e] = t[e]
            }, t.prototype._clearTransform = function() {
                var t = {
                    x: this.x(),
                    y: this.y(),
                    rotation: this.rotation(),
                    scaleX: this.scaleX(),
                    scaleY: this.scaleY(),
                    offsetX: this.offsetX(),
                    offsetY: this.offsetY(),
                    skewX: this.skewX(),
                    skewY: this.skewY()
                };
                return this.attrs.x = 0, this.attrs.y = 0, this.attrs.rotation = 0, this.attrs.scaleX = 1, this.attrs.scaleY = 1, this.attrs.offsetX = 0, this.attrs.offsetY = 0, this.attrs.skewX = 0, this.attrs.skewY = 0, t
            }, t.prototype.move = function(t) {
                var e = t.x,
                    i = t.y,
                    r = this.x(),
                    n = this.y();
                return void 0 !== e && (r += e), void 0 !== i && (n += i), this.setPosition({
                    x: r,
                    y: n
                }), this
            }, t.prototype._eachAncestorReverse = function(t, e) {
                var i, r, n = [],
                    o = this.getParent();
                if (!e || e._id !== this._id) {
                    for (n.unshift(this); o && (!e || o._id !== e._id);) n.unshift(o), o = o.parent;
                    for (i = n.length, r = 0; r < i; r++) t(n[r])
                }
            }, t.prototype.rotate = function(t) {
                return this.rotation(this.rotation() + t), this
            }, t.prototype.moveToTop = function() {
                if (!this.parent) return r.Util.warn("Node has no parent. moveToTop function is ignored."), !1;
                var t = this.index;
                return this.parent.children.splice(t, 1), this.parent.children.push(this), this.parent._setChildrenIndices(), !0
            }, t.prototype.moveUp = function() {
                if (!this.parent) return r.Util.warn("Node has no parent. moveUp function is ignored."), !1;
                var t = this.index;
                return t < this.parent.getChildren().length - 1 && (this.parent.children.splice(t, 1), this.parent.children.splice(t + 1, 0, this), this.parent._setChildrenIndices(), !0)
            }, t.prototype.moveDown = function() {
                if (!this.parent) return r.Util.warn("Node has no parent. moveDown function is ignored."), !1;
                var t = this.index;
                return t > 0 && (this.parent.children.splice(t, 1), this.parent.children.splice(t - 1, 0, this), this.parent._setChildrenIndices(), !0)
            }, t.prototype.moveToBottom = function() {
                if (!this.parent) return r.Util.warn("Node has no parent. moveToBottom function is ignored."), !1;
                var t = this.index;
                return t > 0 && (this.parent.children.splice(t, 1), this.parent.children.unshift(this), this.parent._setChildrenIndices(), !0)
            }, t.prototype.setZIndex = function(t) {
                if (!this.parent) return r.Util.warn("Node has no parent. zIndex parameter is ignored."), this;
                (t < 0 || t >= this.parent.children.length) && r.Util.warn("Unexpected value " + t + " for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to " + (this.parent.children.length - 1) + ".");
                var e = this.index;
                return this.parent.children.splice(e, 1), this.parent.children.splice(t, 0, this), this.parent._setChildrenIndices(), this
            }, t.prototype.getAbsoluteOpacity = function() {
                return this._getCache("absoluteOpacity", this._getAbsoluteOpacity)
            }, t.prototype._getAbsoluteOpacity = function() {
                var t = this.opacity(),
                    e = this.getParent();
                return e && !e._isUnderCache && (t *= e.getAbsoluteOpacity()), t
            }, t.prototype.moveTo = function(t) {
                return this.getParent() !== t && (this._remove(), t.add(this)), this
            }, t.prototype.toObject = function() {
                var t, e, i, n, o = {},
                    a = this.getAttrs();
                for (t in o.attrs = {}, a) e = a[t], r.Util.isObject(e) && !r.Util._isPlainObject(e) && !r.Util._isArray(e) || (i = "function" == typeof this[t] && this[t], delete a[t], n = i ? i.call(this) : null, a[t] = e, n !== e && (o.attrs[t] = e));
                return o.className = this.getClassName(), r.Util._prepareToStringify(o)
            }, t.prototype.toJSON = function() {
                return JSON.stringify(this.toObject())
            }, t.prototype.getParent = function() {
                return this.parent
            }, t.prototype.findAncestors = function(t, e, i) {
                var r = [];
                e && this._isMatch(t) && r.push(this);
                for (var n = this.parent; n;) {
                    if (n === i) return r;
                    n._isMatch(t) && r.push(n), n = n.parent
                }
                return r
            }, t.prototype.isAncestorOf = function(t) {
                return !1
            }, t.prototype.findAncestor = function(t, e, i) {
                return this.findAncestors(t, e, i)[0]
            }, t.prototype._isMatch = function(t) {
                if (!t) return !1;
                if ("function" == typeof t) return t(this);
                var e, i, n = t.replace(/ /g, "").split(","),
                    o = n.length;
                for (e = 0; e < o; e++)
                    if (i = n[e], r.Util.isValidSelector(i) || (r.Util.warn('Selector "' + i + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'), r.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'), r.Util.warn("Konva is awesome, right?")), "#" === i.charAt(0)) {
                        if (this.id() === i.slice(1)) return !0
                    } else if ("." === i.charAt(0)) {
                    if (this.hasName(i.slice(1))) return !0
                } else if (this.className === i || this.nodeType === i) return !0;
                return !1
            }, t.prototype.getLayer = function() {
                var t = this.getParent();
                return t ? t.getLayer() : null
            }, t.prototype.getStage = function() {
                return this._getCache("stage", this._getStage)
            }, t.prototype._getStage = function() {
                var t = this.getParent();
                return t ? t.getStage() : void 0
            }, t.prototype.fire = function(t, e, i) {
                return void 0 === e && (e = {}), e.target = e.target || this, i ? this._fireAndBubble(t, e) : this._fire(t, e), this
            }, t.prototype.getAbsoluteTransform = function(t) {
                return t ? this._getAbsoluteTransform(t) : this._getCache("absoluteTransform", this._getAbsoluteTransform)
            }, t.prototype._getAbsoluteTransform = function(t) {
                var e;
                if (t) return e = new r.Transform, this._eachAncestorReverse((function(t) {
                    var i = t.transformsEnabled();
                    "all" === i ? e.multiply(t.getTransform()) : "position" === i && e.translate(t.x() - t.offsetX(), t.y() - t.offsetY())
                }), t), e;
                e = this._cache.get("absoluteTransform") || new r.Transform, this.parent ? this.parent.getAbsoluteTransform().copyInto(e) : e.reset();
                var i = this.transformsEnabled();
                if ("all" === i) e.multiply(this.getTransform());
                else if ("position" === i) {
                    var n = this.attrs.x || 0,
                        o = this.attrs.y || 0,
                        a = this.attrs.offsetX || 0,
                        s = this.attrs.offsetY || 0;
                    e.translate(n - a, o - s)
                }
                return e.dirty = !1, e
            }, t.prototype.getAbsoluteScale = function(t) {
                for (var e = this; e;) e._isUnderCache && (t = e), e = e.getParent();
                var i = this.getAbsoluteTransform(t).decompose();
                return {
                    x: i.scaleX,
                    y: i.scaleY
                }
            }, t.prototype.getAbsoluteRotation = function() {
                return this.getAbsoluteTransform().decompose().rotation
            }, t.prototype.getTransform = function() {
                return this._getCache("transform", this._getTransform)
            }, t.prototype._getTransform = function() {
                var t, e, i = this._cache.get("transform") || new r.Transform;
                i.reset();
                var n = this.x(),
                    o = this.y(),
                    s = a.Konva.getAngle(this.rotation()),
                    h = null !== (t = this.attrs.scaleX) && void 0 !== t ? t : 1,
                    c = null !== (e = this.attrs.scaleY) && void 0 !== e ? e : 1,
                    l = this.attrs.skewX || 0,
                    d = this.attrs.skewY || 0,
                    u = this.attrs.offsetX || 0,
                    p = this.attrs.offsetY || 0;
                return 0 === n && 0 === o || i.translate(n, o), 0 !== s && i.rotate(s), 0 === l && 0 === d || i.skew(l, d), 1 === h && 1 === c || i.scale(h, c), 0 === u && 0 === p || i.translate(-1 * u, -1 * p), i.dirty = !1, i
            }, t.prototype.clone = function(t) {
                var e, i, n, o, a, s = r.Util.cloneObject(this.attrs);
                for (e in t) s[e] = t[e];
                var h = new this.constructor(s);
                for (e in this.eventListeners)
                    for (n = (i = this.eventListeners[e]).length, o = 0; o < n; o++)(a = i[o]).name.indexOf("konva") < 0 && (h.eventListeners[e] || (h.eventListeners[e] = []), h.eventListeners[e].push(a));
                return h
            }, t.prototype._toKonvaCanvas = function(t) {
                t = t || {};
                var e = this.getClientRect(),
                    i = this.getStage(),
                    r = void 0 !== t.x ? t.x : e.x,
                    n = void 0 !== t.y ? t.y : e.y,
                    a = t.pixelRatio || 1,
                    s = new o.SceneCanvas({
                        width: t.width || e.width || (i ? i.width() : 0),
                        height: t.height || e.height || (i ? i.height() : 0),
                        pixelRatio: a
                    }),
                    h = s.getContext();
                return h.save(), (r || n) && h.translate(-1 * r, -1 * n), this.drawScene(s), h.restore(), s
            }, t.prototype.toCanvas = function(t) {
                return this._toKonvaCanvas(t)._canvas
            }, t.prototype.toDataURL = function(t) {
                var e = (t = t || {}).mimeType || null,
                    i = t.quality || null,
                    r = this._toKonvaCanvas(t).toDataURL(e, i);
                return t.callback && t.callback(r), r
            }, t.prototype.toImage = function(t) {
                if (!t || !t.callback) throw "callback required for toImage method config argument";
                var e = t.callback;
                delete t.callback, r.Util._urlToImage(this.toDataURL(t), (function(t) {
                    e(t)
                }))
            }, t.prototype.setSize = function(t) {
                return this.width(t.width), this.height(t.height), this
            }, t.prototype.getSize = function() {
                return {
                    width: this.width(),
                    height: this.height()
                }
            }, t.prototype.getClassName = function() {
                return this.className || this.nodeType
            }, t.prototype.getType = function() {
                return this.nodeType
            }, t.prototype.getDragDistance = function() {
                return void 0 !== this.attrs.dragDistance ? this.attrs.dragDistance : this.parent ? this.parent.getDragDistance() : a.Konva.dragDistance
            }, t.prototype._off = function(t, e, i) {
                var r, n, o, a = this.eventListeners[t];
                for (r = 0; r < a.length; r++)
                    if (n = a[r].name, o = a[r].handler, !("konva" === n && "konva" !== e || e && n !== e || i && i !== o)) {
                        if (a.splice(r, 1), 0 === a.length) {
                            delete this.eventListeners[t];
                            break
                        }
                        r--
                    }
            }, t.prototype._fireChangeEvent = function(t, e, i) {
                this._fire(t + "Change", {
                    oldVal: e,
                    newVal: i
                })
            }, t.prototype.setId = function(t) {
                var i = this.id();
                return e._removeId(i, this),
                    function(t, i) {
                        i && (e.ids[i] = t)
                    }(this, t), this._setAttr("id", t), this
            }, t.prototype.setName = function(t) {
                var i, r, n = (this.name() || "").split(/\s/g),
                    o = (t || "").split(/\s/g);
                for (r = 0; r < n.length; r++) i = n[r], -1 === o.indexOf(i) && i && e._removeName(i, this._id);
                for (r = 0; r < o.length; r++) i = o[r], -1 === n.indexOf(i) && i && e._addName(this, i);
                return this._setAttr("name", t), this
            }, t.prototype.addName = function(t) {
                if (!this.hasName(t)) {
                    var e = this.name(),
                        i = e ? e + " " + t : t;
                    this.setName(i)
                }
                return this
            }, t.prototype.hasName = function(t) {
                if (!t) return !1;
                var e = this.name();
                return !!e && -1 !== (e || "").split(/\s/g).indexOf(t)
            }, t.prototype.removeName = function(t) {
                var e = (this.name() || "").split(/\s/g),
                    i = e.indexOf(t);
                return -1 !== i && (e.splice(i, 1), this.setName(e.join(" "))), this
            }, t.prototype.setAttr = function(t, e) {
                var i = this["set" + r.Util._capitalize(t)];
                return r.Util._isFunction(i) ? i.call(this, e) : this._setAttr(t, e), this
            }, t.prototype._setAttr = function(t, e, i) {
                void 0 === i && (i = !1);
                var n = this.attrs[t];
                (n !== e || r.Util.isObject(e)) && (null == e ? delete this.attrs[t] : this.attrs[t] = e, this._shouldFireChangeEvents && this._fireChangeEvent(t, n, e))
            }, t.prototype._setComponentAttr = function(t, e, i) {
                var r;
                void 0 !== i && ((r = this.attrs[t]) || (this.attrs[t] = this.getAttr(t)), this.attrs[t][e] = i, this._fireChangeEvent(t, r, i))
            }, t.prototype._fireAndBubble = function(t, e, i) {
                if (e && "Shape" === this.nodeType && (e.target = this), !(("mouseenter" === t || "mouseleave" === t) && (i && (this === i || this.isAncestorOf && this.isAncestorOf(i)) || "Stage" === this.nodeType && !i))) {
                    this._fire(t, e);
                    var r = ("mouseenter" === t || "mouseleave" === t) && i && i.isAncestorOf && i.isAncestorOf(this) && !i.isAncestorOf(this.parent);
                    (e && !e.cancelBubble || !e) && this.parent && this.parent.isListening() && !r && (i && i.parent ? this._fireAndBubble.call(this.parent, t, e, i) : this._fireAndBubble.call(this.parent, t, e))
                }
            }, t.prototype._getProtoListeners = function(t) {
                var e = this._cache.get("allEventListeners");
                if (!e) {
                    e = {};
                    for (var i = Object.getPrototypeOf(this); i;)
                        if (i.eventListeners) {
                            for (var r in i.eventListeners) {
                                var n = i.eventListeners[r],
                                    o = e[r] || [];
                                e[r] = n.concat(o)
                            }
                            i = Object.getPrototypeOf(i)
                        } else i = Object.getPrototypeOf(i);
                    this._cache.set("allEventListeners", e)
                }
                return e[t]
            }, t.prototype._fire = function(t, e) {
                (e = e || {}).currentTarget = this, e.type = t;
                var i = this._getProtoListeners(t);
                if (i)
                    for (var r = 0; r < i.length; r++) i[r].handler.call(this, e);
                var n = this.eventListeners[t];
                if (n)
                    for (r = 0; r < n.length; r++) n[r].handler.call(this, e)
            }, t.prototype.draw = function() {
                return this.drawScene(), this.drawHit(), this
            }, t.prototype._createDragElement = function(t) {
                var e = t ? t.pointerId : void 0,
                    i = this.getStage(),
                    r = this.getAbsolutePosition(),
                    n = i._getPointerById(e) || i._changedPointerPositions[0] || r;
                s.DD._dragElements.set(this._id, {
                    node: this,
                    startPointerPos: n,
                    offset: {
                        x: n.x - r.x,
                        y: n.y - r.y
                    },
                    dragStatus: "ready",
                    pointerId: e
                })
            }, t.prototype.startDrag = function(t, e) {
                void 0 === e && (e = !0), s.DD._dragElements.has(this._id) || this._createDragElement(t), s.DD._dragElements.get(this._id).dragStatus = "dragging", this.fire("dragstart", {
                    type: "dragstart",
                    target: this,
                    evt: t && t.evt
                }, e)
            }, t.prototype._setDragPosition = function(t, e) {
                var i = this.getStage()._getPointerById(e.pointerId);
                if (i) {
                    var n = {
                            x: i.x - e.offset.x,
                            y: i.y - e.offset.y
                        },
                        o = this.dragBoundFunc();
                    if (void 0 !== o) {
                        var a = o.call(this, n, t);
                        a ? n = a : r.Util.warn("dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.")
                    }
                    this._lastPos && this._lastPos.x === n.x && this._lastPos.y === n.y || (this.setAbsolutePosition(n), this.getLayer() ? this.getLayer().batchDraw() : this.getStage() && this.getStage().batchDraw()), this._lastPos = n
                }
            }, t.prototype.stopDrag = function(t) {
                var e = s.DD._dragElements.get(this._id);
                e && (e.dragStatus = "stopped"), s.DD._endDragBefore(t), s.DD._endDragAfter(t)
            }, t.prototype.setDraggable = function(t) {
                this._setAttr("draggable", t), this._dragChange()
            }, t.prototype.isDragging = function() {
                var t = s.DD._dragElements.get(this._id);
                return !!t && "dragging" === t.dragStatus
            }, t.prototype._listenDrag = function() {
                this._dragCleanup(), this.on("mousedown.konva touchstart.konva", (function(t) {
                    var e = this;
                    if ((!(void 0 !== t.evt.button) || a.Konva.dragButtons.indexOf(t.evt.button) >= 0) && !this.isDragging()) {
                        var i = !1;
                        s.DD._dragElements.forEach((function(t) {
                            e.isAncestorOf(t.node) && (i = !0)
                        })), i || this._createDragElement(t)
                    }
                }))
            }, t.prototype._dragChange = function() {
                if (this.attrs.draggable) this._listenDrag();
                else {
                    if (this._dragCleanup(), !this.getStage()) return;
                    var t = s.DD._dragElements.get(this._id),
                        e = t && "dragging" === t.dragStatus,
                        i = t && "ready" === t.dragStatus;
                    e ? this.stopDrag() : i && s.DD._dragElements.delete(this._id)
                }
            }, t.prototype._dragCleanup = function() {
                this.off("mousedown.konva"), this.off("touchstart.konva")
            }, t.create = function(t, e) {
                return r.Util._isString(t) && (t = JSON.parse(t)), this._createNode(t, e)
            }, t._createNode = function(e, i) {
                var n, o, s, h = t.prototype.getClassName.call(e),
                    c = e.children;
                if (i && (e.attrs.container = i), a._NODES_REGISTRY[h] || (r.Util.warn('Can not find a node with class name "' + h + '". Fallback to "Shape".'), h = "Shape"), n = new(0, a._NODES_REGISTRY[h])(e.attrs), c)
                    for (o = c.length, s = 0; s < o; s++) n.add(t._createNode(c[s]));
                return n
            }, t
        }();
    e.Node = u, u.prototype.nodeType = "Node", u.prototype._attrsAffectingSize = [], u.prototype.eventListeners = {}, u.prototype.on.call(u.prototype, c, (function() {
        this._batchingTransformChange ? this._needClearTransformCache = !0 : (this._clearCache("transform"), this._clearSelfAndDescendantCache("absoluteTransform"))
    })), u.prototype.on.call(u.prototype, "visibleChange.konva", (function() {
        this._clearSelfAndDescendantCache("visible")
    })), u.prototype.on.call(u.prototype, "listeningChange.konva", (function() {
        this._clearSelfAndDescendantCache("listening")
    })), u.prototype.on.call(u.prototype, "opacityChange.konva", (function() {
        this._clearSelfAndDescendantCache("absoluteOpacity")
    }));
    var p = n.Factory.addGetterSetter;
    p(u, "zIndex"), p(u, "absolutePosition"), p(u, "position"), p(u, "x", 0, h.getNumberValidator()), p(u, "y", 0, h.getNumberValidator()), p(u, "globalCompositeOperation", "source-over", h.getStringValidator()), p(u, "opacity", 1, h.getNumberValidator()), p(u, "name", "", h.getStringValidator()), p(u, "id", "", h.getStringValidator()), p(u, "rotation", 0, h.getNumberValidator()), n.Factory.addComponentsGetterSetter(u, "scale", ["x", "y"]), p(u, "scaleX", 1, h.getNumberValidator()), p(u, "scaleY", 1, h.getNumberValidator()), n.Factory.addComponentsGetterSetter(u, "skew", ["x", "y"]), p(u, "skewX", 0, h.getNumberValidator()), p(u, "skewY", 0, h.getNumberValidator()), n.Factory.addComponentsGetterSetter(u, "offset", ["x", "y"]), p(u, "offsetX", 0, h.getNumberValidator()), p(u, "offsetY", 0, h.getNumberValidator()), p(u, "dragDistance", null, h.getNumberValidator()), p(u, "width", 0, h.getNumberValidator()), p(u, "height", 0, h.getNumberValidator()), p(u, "listening", !0, h.getBooleanValidator()), p(u, "preventDefault", !0, h.getBooleanValidator()), p(u, "filters", null, (function(t) {
        return this._filterUpToDate = !1, t
    })), p(u, "visible", !0, h.getBooleanValidator()), p(u, "transformsEnabled", "all", h.getStringValidator()), p(u, "size"), p(u, "dragBoundFunc"), p(u, "draggable", !1, h.getBooleanValidator()), n.Factory.backCompat(u, {
        rotateDeg: "rotate",
        setRotationDeg: "setRotation",
        getRotationDeg: "getRotation"
    }), r.Collection.mapMethods(u)
}, , function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Shape = e.shapes = void 0;
    var o, a = i(3),
        s = i(0),
        h = i(5),
        c = i(2),
        l = i(1),
        d = i(21);

    function u() {
        return o || (o = a.Util.createCanvasElement().getContext("2d"))
    }
    e.shapes = {};
    var p = function(t) {
        function i(i) {
            for (var r, n = t.call(this, i) || this; !(r = a.Util.getRandomColor()) || r in e.shapes;);
            return n.colorKey = r, e.shapes[r] = n, n
        }
        return n(i, t), i.prototype.getContext = function() {
            return this.getLayer().getContext()
        }, i.prototype.getCanvas = function() {
            return this.getLayer().getCanvas()
        }, i.prototype.getSceneFunc = function() {
            return this.attrs.sceneFunc || this._sceneFunc
        }, i.prototype.getHitFunc = function() {
            return this.attrs.hitFunc || this._hitFunc
        }, i.prototype.hasShadow = function() {
            return this._getCache("hasShadow", this._hasShadow)
        }, i.prototype._hasShadow = function() {
            return this.shadowEnabled() && 0 !== this.shadowOpacity() && !!(this.shadowColor() || this.shadowBlur() || this.shadowOffsetX() || this.shadowOffsetY())
        }, i.prototype._getFillPattern = function() {
            return this._getCache("patternImage", this.__getFillPattern)
        }, i.prototype.__getFillPattern = function() {
            if (this.fillPatternImage()) {
                var t = u().createPattern(this.fillPatternImage(), this.fillPatternRepeat() || "repeat");
                return t && t.setTransform && t.setTransform({
                    a: this.fillPatternScaleX(),
                    b: 0,
                    c: 0,
                    d: this.fillPatternScaleY(),
                    e: 0,
                    f: 0
                }), t
            }
        }, i.prototype._getLinearGradient = function() {
            return this._getCache("linearGradient", this.__getLinearGradient)
        }, i.prototype.__getLinearGradient = function() {
            var t = this.fillLinearGradientColorStops();
            if (t) {
                for (var e = u(), i = this.fillLinearGradientStartPoint(), r = this.fillLinearGradientEndPoint(), n = e.createLinearGradient(i.x, i.y, r.x, r.y), o = 0; o < t.length; o += 2) n.addColorStop(t[o], t[o + 1]);
                return n
            }
        }, i.prototype._getRadialGradient = function() {
            return this._getCache("radialGradient", this.__getRadialGradient)
        }, i.prototype.__getRadialGradient = function() {
            var t = this.fillRadialGradientColorStops();
            if (t) {
                for (var e = u(), i = this.fillRadialGradientStartPoint(), r = this.fillRadialGradientEndPoint(), n = e.createRadialGradient(i.x, i.y, this.fillRadialGradientStartRadius(), r.x, r.y, this.fillRadialGradientEndRadius()), o = 0; o < t.length; o += 2) n.addColorStop(t[o], t[o + 1]);
                return n
            }
        }, i.prototype.getShadowRGBA = function() {
            return this._getCache("shadowRGBA", this._getShadowRGBA)
        }, i.prototype._getShadowRGBA = function() {
            if (this.hasShadow()) {
                var t = a.Util.colorToRGBA(this.shadowColor());
                return "rgba(" + t.r + "," + t.g + "," + t.b + "," + t.a * (this.shadowOpacity() || 1) + ")"
            }
        }, i.prototype.hasFill = function() {
            var t = this;
            return this._calculate("hasFill", ["fillEnabled", "fill", "fillPatternImage", "fillLinearGradientColorStops", "fillRadialGradientColorStops"], (function() {
                return t.fillEnabled() && !!(t.fill() || t.fillPatternImage() || t.fillLinearGradientColorStops() || t.fillRadialGradientColorStops())
            }))
        }, i.prototype.hasStroke = function() {
            var t = this;
            return this._calculate("hasStroke", ["strokeEnabled", "strokeWidth", "stroke", "strokeLinearGradientColorStops"], (function() {
                return t.strokeEnabled() && t.strokeWidth() && !(!t.stroke() && !t.strokeLinearGradientColorStops())
            }))
        }, i.prototype.hasHitStroke = function() {
            var t = this.hitStrokeWidth();
            return "auto" === t ? this.hasStroke() : this.strokeEnabled() && !!t
        }, i.prototype.intersects = function(t) {
            var e = this.getStage().bufferHitCanvas;
            return e.getContext().clear(), this.drawHit(e, null, !0), e.context.getImageData(Math.round(t.x), Math.round(t.y), 1, 1).data[3] > 0
        }, i.prototype.destroy = function() {
            return h.Node.prototype.destroy.call(this), delete e.shapes[this.colorKey], delete this.colorKey, this
        }, i.prototype._useBufferCanvas = function(t) {
            var e;
            if (!this.getStage()) return !1;
            if (!(null === (e = this.attrs.perfectDrawEnabled) || void 0 === e || e)) return !1;
            var i = t || this.hasFill(),
                r = this.hasStroke(),
                n = 1 !== this.getAbsoluteOpacity();
            if (i && r && n) return !0;
            var o = this.hasShadow(),
                a = this.shadowForStrokeEnabled();
            return !!(i && r && o && a)
        }, i.prototype.setStrokeHitEnabled = function(t) {
            a.Util.warn("strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead."), t ? this.hitStrokeWidth("auto") : this.hitStrokeWidth(0)
        }, i.prototype.getStrokeHitEnabled = function() {
            return 0 !== this.hitStrokeWidth()
        }, i.prototype.getSelfRect = function() {
            var t = this.size();
            return {
                x: this._centroid ? -t.width / 2 : 0,
                y: this._centroid ? -t.height / 2 : 0,
                width: t.width,
                height: t.height
            }
        }, i.prototype.getClientRect = function(t) {
            void 0 === t && (t = {});
            var e = t.skipTransform,
                i = t.relativeTo,
                r = this.getSelfRect(),
                n = !t.skipStroke && this.hasStroke() && this.strokeWidth() || 0,
                o = r.width + n,
                a = r.height + n,
                s = !t.skipShadow && this.hasShadow(),
                h = s ? this.shadowOffsetX() : 0,
                c = s ? this.shadowOffsetY() : 0,
                l = o + Math.abs(h),
                d = a + Math.abs(c),
                u = s && this.shadowBlur() || 0,
                p = l + 2 * u,
                f = d + 2 * u,
                g = 0;
            Math.round(n / 2) !== n / 2 && (g = 1);
            var y = {
                width: p + g,
                height: f + g,
                x: -Math.round(n / 2 + u) + Math.min(h, 0) + r.x,
                y: -Math.round(n / 2 + u) + Math.min(c, 0) + r.y
            };
            return e ? y : this._transformedRect(y, i)
        }, i.prototype.drawScene = function(t, e) {
            var i, r, n = this.getLayer(),
                o = t || n.getCanvas(),
                a = o.getContext(),
                s = this._getCanvasCache(),
                h = this.getSceneFunc(),
                c = this.hasShadow(),
                l = o.isCache,
                d = o.isCache,
                u = e === this;
            if (!this.isVisible() && !l) return this;
            if (s) {
                a.save();
                var p = this.getAbsoluteTransform(e).getMatrix();
                return a.transform(p[0], p[1], p[2], p[3], p[4], p[5]), this._drawCachedSceneCanvas(a), a.restore(), this
            }
            if (!h) return this;
            if (a.save(), this._useBufferCanvas() && !d) {
                (r = (i = this.getStage().bufferCanvas).getContext()).clear(), r.save(), r._applyLineJoin(this);
                var f = this.getAbsoluteTransform(e).getMatrix();
                r.transform(f[0], f[1], f[2], f[3], f[4], f[5]), h.call(this, r, this), r.restore();
                var g = i.pixelRatio;
                c && a._applyShadow(this), a._applyOpacity(this), a._applyGlobalCompositeOperation(this), a.drawImage(i._canvas, 0, 0, i.width / g, i.height / g)
            } else {
                if (a._applyLineJoin(this), !u) {
                    f = this.getAbsoluteTransform(e).getMatrix();
                    a.transform(f[0], f[1], f[2], f[3], f[4], f[5]), a._applyOpacity(this), a._applyGlobalCompositeOperation(this)
                }
                c && a._applyShadow(this), h.call(this, a, this)
            }
            return a.restore(), this
        }, i.prototype.drawHit = function(t, e, i) {
            if (void 0 === i && (i = !1), !this.shouldDrawHit(e, i)) return this;
            var r = this.getLayer(),
                n = t || r.hitCanvas,
                o = n && n.getContext(),
                s = this.hitFunc() || this.sceneFunc(),
                h = this._getCanvasCache(),
                c = h && h.hit;
            if (this.colorKey || (console.log(this), a.Util.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. See the shape in logs above. If you want to reuse shape you should call remove() instead of destroy()")), c) {
                o.save();
                var l = this.getAbsoluteTransform(e).getMatrix();
                return o.transform(l[0], l[1], l[2], l[3], l[4], l[5]), this._drawCachedHitCanvas(o), o.restore(), this
            }
            if (!s) return this;
            if (o.save(), o._applyLineJoin(this), !(this === e)) {
                var d = this.getAbsoluteTransform(e).getMatrix();
                o.transform(d[0], d[1], d[2], d[3], d[4], d[5])
            }
            return s.call(this, o, this), o.restore(), this
        }, i.prototype.drawHitFromCache = function(t) {
            void 0 === t && (t = 0);
            var e, i, r, n, o, s = this._getCanvasCache(),
                h = this._getCachedSceneCanvas(),
                c = s.hit,
                l = c.getContext(),
                d = c.getWidth(),
                u = c.getHeight();
            l.clear(), l.drawImage(h._canvas, 0, 0, d, u);
            try {
                for (r = (i = (e = l.getImageData(0, 0, d, u)).data).length, n = a.Util._hexToRgb(this.colorKey), o = 0; o < r; o += 4) i[o + 3] > t ? (i[o] = n.r, i[o + 1] = n.g, i[o + 2] = n.b, i[o + 3] = 255) : i[o + 3] = 0;
                l.putImageData(e, 0, 0)
            } catch (t) {
                a.Util.error("Unable to draw hit graph from cached scene canvas. " + t.message)
            }
            return this
        }, i.prototype.hasPointerCapture = function(t) {
            return d.hasPointerCapture(t, this)
        }, i.prototype.setPointerCapture = function(t) {
            d.setPointerCapture(t, this)
        }, i.prototype.releaseCapture = function(t) {
            d.releaseCapture(t, this)
        }, i
    }(h.Node);
    e.Shape = p, p.prototype._fillFunc = function(t) {
        t.fill()
    }, p.prototype._strokeFunc = function(t) {
        t.stroke()
    }, p.prototype._fillFuncHit = function(t) {
        t.fill()
    }, p.prototype._strokeFuncHit = function(t) {
        t.stroke()
    }, p.prototype._centroid = !1, p.prototype.nodeType = "Shape", l._registerNode(p), p.prototype.eventListeners = {}, p.prototype.on.call(p.prototype, "shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", (function() {
        this._clearCache("hasShadow")
    })), p.prototype.on.call(p.prototype, "shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", (function() {
        this._clearCache("shadowRGBA")
    })), p.prototype.on.call(p.prototype, "fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva", (function() {
        this._clearCache("patternImage")
    })), p.prototype.on.call(p.prototype, "fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva", (function() {
        this._clearCache("linearGradient")
    })), p.prototype.on.call(p.prototype, "fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva", (function() {
        this._clearCache("radialGradient")
    })), s.Factory.addGetterSetter(p, "stroke", void 0, c.getStringOrGradientValidator()), s.Factory.addGetterSetter(p, "strokeWidth", 2, c.getNumberValidator()), s.Factory.addGetterSetter(p, "fillAfterStrokeEnabled", !1), s.Factory.addGetterSetter(p, "hitStrokeWidth", "auto", c.getNumberOrAutoValidator()), s.Factory.addGetterSetter(p, "strokeHitEnabled", !0, c.getBooleanValidator()), s.Factory.addGetterSetter(p, "perfectDrawEnabled", !0, c.getBooleanValidator()), s.Factory.addGetterSetter(p, "shadowForStrokeEnabled", !0, c.getBooleanValidator()), s.Factory.addGetterSetter(p, "lineJoin"), s.Factory.addGetterSetter(p, "lineCap"), s.Factory.addGetterSetter(p, "sceneFunc"), s.Factory.addGetterSetter(p, "hitFunc"), s.Factory.addGetterSetter(p, "dash"), s.Factory.addGetterSetter(p, "dashOffset", 0, c.getNumberValidator()), s.Factory.addGetterSetter(p, "shadowColor", void 0, c.getStringValidator()), s.Factory.addGetterSetter(p, "shadowBlur", 0, c.getNumberValidator()), s.Factory.addGetterSetter(p, "shadowOpacity", 1, c.getNumberValidator()), s.Factory.addComponentsGetterSetter(p, "shadowOffset", ["x", "y"]), s.Factory.addGetterSetter(p, "shadowOffsetX", 0, c.getNumberValidator()), s.Factory.addGetterSetter(p, "shadowOffsetY", 0, c.getNumberValidator()), s.Factory.addGetterSetter(p, "fillPatternImage"), s.Factory.addGetterSetter(p, "fill", void 0, c.getStringOrGradientValidator()), s.Factory.addGetterSetter(p, "fillPatternX", 0, c.getNumberValidator()), s.Factory.addGetterSetter(p, "fillPatternY", 0, c.getNumberValidator()), s.Factory.addGetterSetter(p, "fillLinearGradientColorStops"), s.Factory.addGetterSetter(p, "strokeLinearGradientColorStops"), s.Factory.addGetterSetter(p, "fillRadialGradientStartRadius", 0), s.Factory.addGetterSetter(p, "fillRadialGradientEndRadius", 0), s.Factory.addGetterSetter(p, "fillRadialGradientColorStops"), s.Factory.addGetterSetter(p, "fillPatternRepeat", "repeat"), s.Factory.addGetterSetter(p, "fillEnabled", !0), s.Factory.addGetterSetter(p, "strokeEnabled", !0), s.Factory.addGetterSetter(p, "shadowEnabled", !0), s.Factory.addGetterSetter(p, "dashEnabled", !0), s.Factory.addGetterSetter(p, "strokeScaleEnabled", !0), s.Factory.addGetterSetter(p, "fillPriority", "color"), s.Factory.addComponentsGetterSetter(p, "fillPatternOffset", ["x", "y"]), s.Factory.addGetterSetter(p, "fillPatternOffsetX", 0, c.getNumberValidator()), s.Factory.addGetterSetter(p, "fillPatternOffsetY", 0, c.getNumberValidator()), s.Factory.addComponentsGetterSetter(p, "fillPatternScale", ["x", "y"]), s.Factory.addGetterSetter(p, "fillPatternScaleX", 1, c.getNumberValidator()), s.Factory.addGetterSetter(p, "fillPatternScaleY", 1, c.getNumberValidator()), s.Factory.addComponentsGetterSetter(p, "fillLinearGradientStartPoint", ["x", "y"]), s.Factory.addComponentsGetterSetter(p, "strokeLinearGradientStartPoint", ["x", "y"]), s.Factory.addGetterSetter(p, "fillLinearGradientStartPointX", 0), s.Factory.addGetterSetter(p, "strokeLinearGradientStartPointX", 0), s.Factory.addGetterSetter(p, "fillLinearGradientStartPointY", 0), s.Factory.addGetterSetter(p, "strokeLinearGradientStartPointY", 0), s.Factory.addComponentsGetterSetter(p, "fillLinearGradientEndPoint", ["x", "y"]), s.Factory.addComponentsGetterSetter(p, "strokeLinearGradientEndPoint", ["x", "y"]), s.Factory.addGetterSetter(p, "fillLinearGradientEndPointX", 0), s.Factory.addGetterSetter(p, "strokeLinearGradientEndPointX", 0), s.Factory.addGetterSetter(p, "fillLinearGradientEndPointY", 0), s.Factory.addGetterSetter(p, "strokeLinearGradientEndPointY", 0), s.Factory.addComponentsGetterSetter(p, "fillRadialGradientStartPoint", ["x", "y"]), s.Factory.addGetterSetter(p, "fillRadialGradientStartPointX", 0), s.Factory.addGetterSetter(p, "fillRadialGradientStartPointY", 0), s.Factory.addComponentsGetterSetter(p, "fillRadialGradientEndPoint", ["x", "y"]), s.Factory.addGetterSetter(p, "fillRadialGradientEndPointX", 0), s.Factory.addGetterSetter(p, "fillRadialGradientEndPointY", 0), s.Factory.addGetterSetter(p, "fillPatternRotation", 0), s.Factory.backCompat(p, {
        dashArray: "dash",
        getDashArray: "getDash",
        setDashArray: "getDash",
        drawFunc: "sceneFunc",
        getDrawFunc: "getSceneFunc",
        setDrawFunc: "setSceneFunc",
        drawHitFunc: "hitFunc",
        getDrawHitFunc: "getHitFunc",
        setDrawHitFunc: "setHitFunc"
    }), a.Collection.mapMethods(p)
}, , , , function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.HitCanvas = e.SceneCanvas = e.Canvas = void 0;
    var o, a = i(3),
        s = i(20),
        h = i(1),
        c = i(0),
        l = i(2);
    var d = function() {
        function t(t) {
            this.pixelRatio = 1, this.width = 0, this.height = 0, this.isCache = !1;
            var e = (t || {}).pixelRatio || h.Konva.pixelRatio || function() {
                if (o) return o;
                var t = a.Util.createCanvasElement().getContext("2d");
                return o = (h.Konva._global.devicePixelRatio || 1) / (t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1)
            }();
            this.pixelRatio = e, this._canvas = a.Util.createCanvasElement(), this._canvas.style.padding = "0", this._canvas.style.margin = "0", this._canvas.style.border = "0", this._canvas.style.background = "transparent", this._canvas.style.position = "absolute", this._canvas.style.top = "0", this._canvas.style.left = "0"
        }
        return t.prototype.getContext = function() {
            return this.context
        }, t.prototype.getPixelRatio = function() {
            return this.pixelRatio
        }, t.prototype.setPixelRatio = function(t) {
            var e = this.pixelRatio;
            this.pixelRatio = t, this.setSize(this.getWidth() / e, this.getHeight() / e)
        }, t.prototype.setWidth = function(t) {
            this.width = this._canvas.width = t * this.pixelRatio, this._canvas.style.width = t + "px";
            var e = this.pixelRatio;
            this.getContext()._context.scale(e, e)
        }, t.prototype.setHeight = function(t) {
            this.height = this._canvas.height = t * this.pixelRatio, this._canvas.style.height = t + "px";
            var e = this.pixelRatio;
            this.getContext()._context.scale(e, e)
        }, t.prototype.getWidth = function() {
            return this.width
        }, t.prototype.getHeight = function() {
            return this.height
        }, t.prototype.setSize = function(t, e) {
            this.setWidth(t || 0), this.setHeight(e || 0)
        }, t.prototype.toDataURL = function(t, e) {
            try {
                return this._canvas.toDataURL(t, e)
            } catch (t) {
                try {
                    return this._canvas.toDataURL()
                } catch (t) {
                    return a.Util.error("Unable to get data URL. " + t.message + " For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html."), ""
                }
            }
        }, t
    }();
    e.Canvas = d, c.Factory.addGetterSetter(d, "pixelRatio", void 0, l.getNumberValidator());
    var u = function(t) {
        function e(e) {
            void 0 === e && (e = {
                width: 0,
                height: 0
            });
            var i = t.call(this, e) || this;
            return i.context = new s.SceneContext(i), i.setSize(e.width, e.height), i
        }
        return n(e, t), e
    }(d);
    e.SceneCanvas = u;
    var p = function(t) {
        function e(e) {
            void 0 === e && (e = {
                width: 0,
                height: 0
            });
            var i = t.call(this, e) || this;
            return i.hitCanvas = !0, i.context = new s.HitContext(i), i.setSize(e.width, e.height), i
        }
        return n(e, t), e
    }(d);
    e.HitCanvas = p
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Container = void 0;
    var o = i(3),
        a = i(0),
        s = i(5),
        h = i(2),
        c = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.children = new o.Collection, e
            }
            return n(e, t), e.prototype.getChildren = function(t) {
                if (!t) return this.children;
                var e = new o.Collection;
                return this.children.each((function(i) {
                    t(i) && e.push(i)
                })), e
            }, e.prototype.hasChildren = function() {
                return this.getChildren().length > 0
            }, e.prototype.removeChildren = function() {
                for (var t, e = 0; e < this.children.length; e++)(t = this.children[e]).parent = null, t.index = 0, t.remove();
                return this.children = new o.Collection, this
            }, e.prototype.destroyChildren = function() {
                for (var t, e = 0; e < this.children.length; e++)(t = this.children[e]).parent = null, t.index = 0, t.destroy();
                return this.children = new o.Collection, this
            }, e.prototype.add = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                if (arguments.length > 1) {
                    for (var i = 0; i < arguments.length; i++) this.add(arguments[i]);
                    return this
                }
                var r = t[0];
                if (r.getParent()) return r.moveTo(this), this;
                var n = this.children;
                return this._validateAdd(r), r._clearCaches(), r.index = n.length, r.parent = this, n.push(r), this._fire("add", {
                    child: r
                }), this
            }, e.prototype.destroy = function() {
                return this.hasChildren() && this.destroyChildren(), t.prototype.destroy.call(this), this
            }, e.prototype.find = function(t) {
                return this._generalFind(t, !1)
            }, e.prototype.get = function(t) {
                return o.Util.warn("collection.get() method is deprecated. Please use collection.find() instead."), this.find(t)
            }, e.prototype.findOne = function(t) {
                var e = this._generalFind(t, !0);
                return e.length > 0 ? e[0] : void 0
            }, e.prototype._generalFind = function(t, e) {
                var i = [];
                return this._descendants((function(r) {
                    var n = r._isMatch(t);
                    return n && i.push(r), !(!n || !e)
                })), o.Collection.toCollection(i)
            }, e.prototype._descendants = function(t) {
                for (var e = 0; e < this.children.length; e++) {
                    var i = this.children[e];
                    if (t(i)) return !0;
                    if (i.hasChildren() && i._descendants(t)) return !0
                }
                return !1
            }, e.prototype.toObject = function() {
                var t = s.Node.prototype.toObject.call(this);
                t.children = [];
                for (var e = this.getChildren(), i = e.length, r = 0; r < i; r++) {
                    var n = e[r];
                    t.children.push(n.toObject())
                }
                return t
            }, e.prototype.isAncestorOf = function(t) {
                for (var e = t.getParent(); e;) {
                    if (e._id === this._id) return !0;
                    e = e.getParent()
                }
                return !1
            }, e.prototype.clone = function(t) {
                var e = s.Node.prototype.clone.call(this, t);
                return this.getChildren().each((function(t) {
                    e.add(t.clone())
                })), e
            }, e.prototype.getAllIntersections = function(t) {
                var e = [];
                return this.find("Shape").each((function(i) {
                    i.isVisible() && i.intersects(t) && e.push(i)
                })), e
            }, e.prototype._setChildrenIndices = function() {
                this.children.each((function(t, e) {
                    t.index = e
                }))
            }, e.prototype.drawScene = function(t, e) {
                var i = this.getLayer(),
                    r = t || i && i.getCanvas(),
                    n = r && r.getContext(),
                    o = this._getCanvasCache(),
                    a = o && o.scene,
                    s = r && r.isCache;
                if (!this.isVisible() && !s) return this;
                if (a) {
                    n.save();
                    var h = this.getAbsoluteTransform(e).getMatrix();
                    n.transform(h[0], h[1], h[2], h[3], h[4], h[5]), this._drawCachedSceneCanvas(n), n.restore()
                } else this._drawChildren("drawScene", r, e);
                return this
            }, e.prototype.drawHit = function(t, e) {
                if (!this.shouldDrawHit(e)) return this;
                var i = this.getLayer(),
                    r = t || i && i.hitCanvas,
                    n = r && r.getContext(),
                    o = this._getCanvasCache();
                if (o && o.hit) {
                    n.save();
                    var a = this.getAbsoluteTransform(e).getMatrix();
                    n.transform(a[0], a[1], a[2], a[3], a[4], a[5]), this._drawCachedHitCanvas(n), n.restore()
                } else this._drawChildren("drawHit", r, e);
                return this
            }, e.prototype._drawChildren = function(t, e, i) {
                var r = e && e.getContext(),
                    n = this.clipWidth(),
                    o = this.clipHeight(),
                    a = this.clipFunc(),
                    s = n && o || a,
                    h = i === this;
                if (s) {
                    r.save();
                    var c = this.getAbsoluteTransform(i),
                        l = c.getMatrix();
                    if (r.transform(l[0], l[1], l[2], l[3], l[4], l[5]), r.beginPath(), a) a.call(this, r, this);
                    else {
                        var d = this.clipX(),
                            u = this.clipY();
                        r.rect(d, u, n, o)
                    }
                    r.clip(), l = c.copy().invert().getMatrix(), r.transform(l[0], l[1], l[2], l[3], l[4], l[5])
                }
                var p = !h && "source-over" !== this.globalCompositeOperation() && "drawScene" === t;
                p && (r.save(), r._applyGlobalCompositeOperation(this)), this.children.each((function(r) {
                    r[t](e, i)
                })), p && r.restore(), s && r.restore()
            }, e.prototype.getClientRect = function(t) {
                var e, i, r, n, o = (t = t || {}).skipTransform,
                    a = t.relativeTo,
                    s = {
                        x: 1 / 0,
                        y: 1 / 0,
                        width: 0,
                        height: 0
                    },
                    h = this;
                this.children.each((function(o) {
                    if (o.visible()) {
                        var a = o.getClientRect({
                            relativeTo: h,
                            skipShadow: t.skipShadow,
                            skipStroke: t.skipStroke
                        });
                        0 === a.width && 0 === a.height || (void 0 === e ? (e = a.x, i = a.y, r = a.x + a.width, n = a.y + a.height) : (e = Math.min(e, a.x), i = Math.min(i, a.y), r = Math.max(r, a.x + a.width), n = Math.max(n, a.y + a.height)))
                    }
                }));
                for (var c = this.find("Shape"), l = !1, d = 0; d < c.length; d++) {
                    if (c[d]._isVisible(this)) {
                        l = !0;
                        break
                    }
                }
                return s = l && void 0 !== e ? {
                    x: e,
                    y: i,
                    width: r - e,
                    height: n - i
                } : {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }, o ? s : this._transformedRect(s, a)
            }, e
        }(s.Node);
    e.Container = c, a.Factory.addComponentsGetterSetter(c, "clip", ["x", "y", "width", "height"]), a.Factory.addGetterSetter(c, "clipX", void 0, h.getNumberValidator()), a.Factory.addGetterSetter(c, "clipY", void 0, h.getNumberValidator()), a.Factory.addGetterSetter(c, "clipWidth", void 0, h.getNumberValidator()), a.Factory.addGetterSetter(c, "clipHeight", void 0, h.getNumberValidator()), a.Factory.addGetterSetter(c, "clipFunc"), o.Collection.mapMethods(c)
}, , , function(t, e) {
    var i;
    i = function() {
        return this
    }();
    try {
        i = i || new Function("return this")()
    } catch (t) {
        "object" == typeof window && (i = window)
    }
    t.exports = i
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.DD = void 0;
    var r = i(1),
        n = i(3);
    e.DD = {
        get isDragging() {
            var t = !1;
            return e.DD._dragElements.forEach((function(e) {
                "dragging" === e.dragStatus && (t = !0)
            })), t
        },
        justDragged: !1,
        get node() {
            var t;
            return e.DD._dragElements.forEach((function(e) {
                t = e.node
            })), t
        },
        _dragElements: new Map,
        _drag: function(t) {
            var i = [];
            e.DD._dragElements.forEach((function(e, r) {
                var o = e.node,
                    a = o.getStage();
                a.setPointersPositions(t), void 0 === e.pointerId && (e.pointerId = n.Util._getFirstPointerId(t));
                var s = a._changedPointerPositions.find((function(t) {
                    return t.id === e.pointerId
                }));
                if (s) {
                    if ("dragging" !== e.dragStatus) {
                        var h = o.dragDistance();
                        if (Math.max(Math.abs(s.x - e.startPointerPos.x), Math.abs(s.y - e.startPointerPos.y)) < h) return;
                        if (o.startDrag({
                                evt: t
                            }), !o.isDragging()) return
                    }
                    o._setDragPosition(t, e), i.push(o)
                }
            })), i.forEach((function(e) {
                e.fire("dragmove", {
                    type: "dragmove",
                    target: e,
                    evt: t
                }, !0)
            }))
        },
        _endDragBefore: function(t) {
            e.DD._dragElements.forEach((function(i, n) {
                var o = i.node.getStage();
                if (t && o.setPointersPositions(t), o._changedPointerPositions.find((function(t) {
                        return t.id === i.pointerId
                    }))) {
                    "dragging" !== i.dragStatus && "stopped" !== i.dragStatus || (e.DD.justDragged = !0, r.Konva.listenClickTap = !1, i.dragStatus = "stopped");
                    var a = i.node.getLayer() || i.node instanceof r.Konva.Stage && i.node;
                    a && a.batchDraw()
                }
            }))
        },
        _endDragAfter: function(t) {
            e.DD._dragElements.forEach((function(i, r) {
                "stopped" === i.dragStatus && i.node.fire("dragend", {
                    type: "dragend",
                    target: i.node,
                    evt: t
                }, !0), "dragging" !== i.dragStatus && e.DD._dragElements.delete(r)
            }))
        }
    }, r.Konva.isBrowser && (window.addEventListener("mouseup", e.DD._endDragBefore, !0), window.addEventListener("touchend", e.DD._endDragBefore, !0), window.addEventListener("mousemove", e.DD._drag), window.addEventListener("touchmove", e.DD._drag), window.addEventListener("mouseup", e.DD._endDragAfter, !1), window.addEventListener("touchend", e.DD._endDragAfter, !1))
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Group = void 0;
    var o = i(3),
        a = i(12),
        s = i(1),
        h = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n(e, t), e.prototype._validateAdd = function(t) {
                var e = t.getType();
                "Group" !== e && "Shape" !== e && o.Util.throw("You may only add groups and shapes to groups.")
            }, e
        }(a.Container);
    e.Group = h, h.prototype.nodeType = "Group", s._registerNode(h), o.Collection.mapMethods(h)
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Animation = void 0;
    var r = i(1),
        n = r.glob.performance && r.glob.performance.now ? function() {
            return r.glob.performance.now()
        } : function() {
            return (new Date).getTime()
        },
        o = function() {
            function t(e, i) {
                this.id = t.animIdCounter++, this.frame = {
                    time: 0,
                    timeDiff: 0,
                    lastTime: n(),
                    frameRate: 0
                }, this.func = e, this.setLayers(i)
            }
            return t.prototype.setLayers = function(t) {
                var e = [];
                return e = t ? t.length > 0 ? t : [t] : [], this.layers = e, this
            }, t.prototype.getLayers = function() {
                return this.layers
            }, t.prototype.addLayer = function(t) {
                var e, i = this.layers,
                    r = i.length;
                for (e = 0; e < r; e++)
                    if (i[e]._id === t._id) return !1;
                return this.layers.push(t), !0
            }, t.prototype.isRunning = function() {
                var e, i = t.animations,
                    r = i.length;
                for (e = 0; e < r; e++)
                    if (i[e].id === this.id) return !0;
                return !1
            }, t.prototype.start = function() {
                return this.stop(), this.frame.timeDiff = 0, this.frame.lastTime = n(), t._addAnimation(this), this
            }, t.prototype.stop = function() {
                return t._removeAnimation(this), this
            }, t.prototype._updateFrameObject = function(t) {
                this.frame.timeDiff = t - this.frame.lastTime, this.frame.lastTime = t, this.frame.time += this.frame.timeDiff, this.frame.frameRate = 1e3 / this.frame.timeDiff
            }, t._addAnimation = function(t) {
                this.animations.push(t), this._handleAnimation()
            }, t._removeAnimation = function(t) {
                var e, i = t.id,
                    r = this.animations,
                    n = r.length;
                for (e = 0; e < n; e++)
                    if (r[e].id === i) {
                        this.animations.splice(e, 1);
                        break
                    }
            }, t._runFrames = function() {
                var t, e, i, r, o, a, s, h, c = {},
                    l = this.animations;
                for (r = 0; r < l.length; r++)
                    if (e = (t = l[r]).layers, i = t.func, t._updateFrameObject(n()), a = e.length, !i || !1 !== i.call(t, t.frame))
                        for (o = 0; o < a; o++) void 0 !== (s = e[o])._id && (c[s._id] = s);
                for (h in c) c.hasOwnProperty(h) && c[h].draw()
            }, t._animationLoop = function() {
                var e = t;
                e.animations.length ? (e._runFrames(), requestAnimationFrame(e._animationLoop)) : e.animRunning = !1
            }, t._handleAnimation = function() {
                this.animRunning || (this.animRunning = !0, requestAnimationFrame(this._animationLoop))
            }, t.animations = [], t.animIdCounter = 0, t.animRunning = !1, t
        }();
    e.Animation = o
}, , function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.HitContext = e.SceneContext = e.Context = void 0;
    var o = i(3),
        a = i(1),
        s = ["arc", "arcTo", "beginPath", "bezierCurveTo", "clearRect", "clip", "closePath", "createLinearGradient", "createPattern", "createRadialGradient", "drawImage", "ellipse", "fill", "fillText", "getImageData", "createImageData", "lineTo", "moveTo", "putImageData", "quadraticCurveTo", "rect", "restore", "rotate", "save", "scale", "setLineDash", "setTransform", "stroke", "strokeText", "transform", "translate"],
        h = function() {
            function t(t) {
                this.canvas = t, this._context = t._canvas.getContext("2d"), a.Konva.enableTrace && (this.traceArr = [], this._enableTrace())
            }
            return t.prototype.fillShape = function(t) {
                t.fillEnabled() && this._fill(t)
            }, t.prototype._fill = function(t) {}, t.prototype.strokeShape = function(t) {
                t.hasStroke() && this._stroke(t)
            }, t.prototype._stroke = function(t) {}, t.prototype.fillStrokeShape = function(t) {
                t.attrs.fillAfterStrokeEnabled ? (this.strokeShape(t), this.fillShape(t)) : (this.fillShape(t), this.strokeShape(t))
            }, t.prototype.getTrace = function(t) {
                var e, i, r, n, a = this.traceArr,
                    s = a.length,
                    h = "";
                for (e = 0; e < s; e++)(r = (i = a[e]).method) ? (n = i.args, h += r, t ? h += "()" : o.Util._isArray(n[0]) ? h += "([" + n.join(",") + "])" : h += "(" + n.join(",") + ")") : (h += i.property, t || (h += "=" + i.val)), h += ";";
                return h
            }, t.prototype.clearTrace = function() {
                this.traceArr = []
            }, t.prototype._trace = function(t) {
                var e = this.traceArr;
                e.push(t), e.length >= 100 && e.shift()
            }, t.prototype.reset = function() {
                var t = this.getCanvas().getPixelRatio();
                this.setTransform(1 * t, 0, 0, 1 * t, 0, 0)
            }, t.prototype.getCanvas = function() {
                return this.canvas
            }, t.prototype.clear = function(t) {
                var e = this.getCanvas();
                t ? this.clearRect(t.x || 0, t.y || 0, t.width || 0, t.height || 0) : this.clearRect(0, 0, e.getWidth() / e.pixelRatio, e.getHeight() / e.pixelRatio)
            }, t.prototype._applyLineCap = function(t) {
                var e = t.getLineCap();
                e && this.setAttr("lineCap", e)
            }, t.prototype._applyOpacity = function(t) {
                var e = t.getAbsoluteOpacity();
                1 !== e && this.setAttr("globalAlpha", e)
            }, t.prototype._applyLineJoin = function(t) {
                var e = t.attrs.lineJoin;
                e && this.setAttr("lineJoin", e)
            }, t.prototype.setAttr = function(t, e) {
                this._context[t] = e
            }, t.prototype.arc = function(t, e, i, r, n, o) {
                this._context.arc(t, e, i, r, n, o)
            }, t.prototype.arcTo = function(t, e, i, r, n) {
                this._context.arcTo(t, e, i, r, n)
            }, t.prototype.beginPath = function() {
                this._context.beginPath()
            }, t.prototype.bezierCurveTo = function(t, e, i, r, n, o) {
                this._context.bezierCurveTo(t, e, i, r, n, o)
            }, t.prototype.clearRect = function(t, e, i, r) {
                this._context.clearRect(t, e, i, r)
            }, t.prototype.clip = function() {
                this._context.clip()
            }, t.prototype.closePath = function() {
                this._context.closePath()
            }, t.prototype.createImageData = function(t, e) {
                var i = arguments;
                return 2 === i.length ? this._context.createImageData(t, e) : 1 === i.length ? this._context.createImageData(t) : void 0
            }, t.prototype.createLinearGradient = function(t, e, i, r) {
                return this._context.createLinearGradient(t, e, i, r)
            }, t.prototype.createPattern = function(t, e) {
                return this._context.createPattern(t, e)
            }, t.prototype.createRadialGradient = function(t, e, i, r, n, o) {
                return this._context.createRadialGradient(t, e, i, r, n, o)
            }, t.prototype.drawImage = function(t, e, i, r, n, o, a, s, h) {
                var c = arguments,
                    l = this._context;
                3 === c.length ? l.drawImage(t, e, i) : 5 === c.length ? l.drawImage(t, e, i, r, n) : 9 === c.length && l.drawImage(t, e, i, r, n, o, a, s, h)
            }, t.prototype.ellipse = function(t, e, i, r, n, o, a, s) {
                this._context.ellipse(t, e, i, r, n, o, a, s)
            }, t.prototype.isPointInPath = function(t, e) {
                return this._context.isPointInPath(t, e)
            }, t.prototype.fill = function() {
                this._context.fill()
            }, t.prototype.fillRect = function(t, e, i, r) {
                this._context.fillRect(t, e, i, r)
            }, t.prototype.strokeRect = function(t, e, i, r) {
                this._context.strokeRect(t, e, i, r)
            }, t.prototype.fillText = function(t, e, i) {
                this._context.fillText(t, e, i)
            }, t.prototype.measureText = function(t) {
                return this._context.measureText(t)
            }, t.prototype.getImageData = function(t, e, i, r) {
                return this._context.getImageData(t, e, i, r)
            }, t.prototype.lineTo = function(t, e) {
                this._context.lineTo(t, e)
            }, t.prototype.moveTo = function(t, e) {
                this._context.moveTo(t, e)
            }, t.prototype.rect = function(t, e, i, r) {
                this._context.rect(t, e, i, r)
            }, t.prototype.putImageData = function(t, e, i) {
                this._context.putImageData(t, e, i)
            }, t.prototype.quadraticCurveTo = function(t, e, i, r) {
                this._context.quadraticCurveTo(t, e, i, r)
            }, t.prototype.restore = function() {
                this._context.restore()
            }, t.prototype.rotate = function(t) {
                this._context.rotate(t)
            }, t.prototype.save = function() {
                this._context.save()
            }, t.prototype.scale = function(t, e) {
                this._context.scale(t, e)
            }, t.prototype.setLineDash = function(t) {
                this._context.setLineDash ? this._context.setLineDash(t) : "mozDash" in this._context ? this._context.mozDash = t : "webkitLineDash" in this._context && (this._context.webkitLineDash = t)
            }, t.prototype.getLineDash = function() {
                return this._context.getLineDash()
            }, t.prototype.setTransform = function(t, e, i, r, n, o) {
                this._context.setTransform(t, e, i, r, n, o)
            }, t.prototype.stroke = function() {
                this._context.stroke()
            }, t.prototype.strokeText = function(t, e, i, r) {
                this._context.strokeText(t, e, i, r)
            }, t.prototype.transform = function(t, e, i, r, n, o) {
                this._context.transform(t, e, i, r, n, o)
            }, t.prototype.translate = function(t, e) {
                this._context.translate(t, e)
            }, t.prototype._enableTrace = function() {
                var t, e, i = this,
                    r = s.length,
                    n = o.Util._simplifyArray,
                    a = this.setAttr,
                    h = function(t) {
                        var r, o = i[t];
                        i[t] = function() {
                            return e = n(Array.prototype.slice.call(arguments, 0)), r = o.apply(i, arguments), i._trace({
                                method: t,
                                args: e
                            }), r
                        }
                    };
                for (t = 0; t < r; t++) h(s[t]);
                i.setAttr = function() {
                    a.apply(i, arguments);
                    var t = arguments[0],
                        e = arguments[1];
                    "shadowOffsetX" !== t && "shadowOffsetY" !== t && "shadowBlur" !== t || (e /= this.canvas.getPixelRatio()), i._trace({
                        property: t,
                        val: e
                    })
                }
            }, t.prototype._applyGlobalCompositeOperation = function(t) {
                var e = t.getGlobalCompositeOperation();
                "source-over" !== e && this.setAttr("globalCompositeOperation", e)
            }, t
        }();
    e.Context = h, ["fillStyle", "strokeStyle", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "lineCap", "lineDashOffset", "lineJoin", "lineWidth", "miterLimit", "font", "textAlign", "textBaseline", "globalAlpha", "globalCompositeOperation", "imageSmoothingEnabled"].forEach((function(t) {
        Object.defineProperty(h.prototype, t, {
            get: function() {
                return this._context[t]
            },
            set: function(e) {
                this._context[t] = e
            }
        })
    }));
    var c = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return n(e, t), e.prototype._fillColor = function(t) {
            var e = t.fill();
            this.setAttr("fillStyle", e), t._fillFunc(this)
        }, e.prototype._fillPattern = function(t) {
            var e = t.getFillPatternX(),
                i = t.getFillPatternY(),
                r = a.Konva.getAngle(t.getFillPatternRotation()),
                n = t.getFillPatternOffsetX(),
                o = t.getFillPatternOffsetY();
            t.getFillPatternScaleX(), t.getFillPatternScaleY();
            (e || i) && this.translate(e || 0, i || 0), r && this.rotate(r), (n || o) && this.translate(-1 * n, -1 * o), this.setAttr("fillStyle", t._getFillPattern()), t._fillFunc(this)
        }, e.prototype._fillLinearGradient = function(t) {
            var e = t._getLinearGradient();
            e && (this.setAttr("fillStyle", e), t._fillFunc(this))
        }, e.prototype._fillRadialGradient = function(t) {
            var e = t._getRadialGradient();
            e && (this.setAttr("fillStyle", e), t._fillFunc(this))
        }, e.prototype._fill = function(t) {
            var e = t.fill(),
                i = t.getFillPriority();
            if (e && "color" === i) this._fillColor(t);
            else {
                var r = t.getFillPatternImage();
                if (r && "pattern" === i) this._fillPattern(t);
                else {
                    var n = t.getFillLinearGradientColorStops();
                    if (n && "linear-gradient" === i) this._fillLinearGradient(t);
                    else {
                        var o = t.getFillRadialGradientColorStops();
                        o && "radial-gradient" === i ? this._fillRadialGradient(t) : e ? this._fillColor(t) : r ? this._fillPattern(t) : n ? this._fillLinearGradient(t) : o && this._fillRadialGradient(t)
                    }
                }
            }
        }, e.prototype._strokeLinearGradient = function(t) {
            var e = t.getStrokeLinearGradientStartPoint(),
                i = t.getStrokeLinearGradientEndPoint(),
                r = t.getStrokeLinearGradientColorStops(),
                n = this.createLinearGradient(e.x, e.y, i.x, i.y);
            if (r) {
                for (var o = 0; o < r.length; o += 2) n.addColorStop(r[o], r[o + 1]);
                this.setAttr("strokeStyle", n)
            }
        }, e.prototype._stroke = function(t) {
            var e = t.dash(),
                i = t.getStrokeScaleEnabled();
            if (t.hasStroke()) {
                if (!i) {
                    this.save();
                    var r = this.getCanvas().getPixelRatio();
                    this.setTransform(r, 0, 0, r, 0, 0)
                }
                this._applyLineCap(t), e && t.dashEnabled() && (this.setLineDash(e), this.setAttr("lineDashOffset", t.dashOffset())), this.setAttr("lineWidth", t.strokeWidth()), t.getShadowForStrokeEnabled() || this.setAttr("shadowColor", "rgba(0,0,0,0)"), t.getStrokeLinearGradientColorStops() ? this._strokeLinearGradient(t) : this.setAttr("strokeStyle", t.stroke()), t._strokeFunc(this), i || this.restore()
            }
        }, e.prototype._applyShadow = function(t) {
            var e = o.Util,
                i = e.get(t.getShadowRGBA(), "black"),
                r = e.get(t.getShadowBlur(), 5),
                n = e.get(t.getShadowOffset(), {
                    x: 0,
                    y: 0
                }),
                a = t.getAbsoluteScale(),
                s = this.canvas.getPixelRatio(),
                h = a.x * s,
                c = a.y * s;
            this.setAttr("shadowColor", i), this.setAttr("shadowBlur", r * Math.min(Math.abs(h), Math.abs(c))), this.setAttr("shadowOffsetX", n.x * h), this.setAttr("shadowOffsetY", n.y * c)
        }, e
    }(h);
    e.SceneContext = c;
    var l = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return n(e, t), e.prototype._fill = function(t) {
            this.save(), this.setAttr("fillStyle", t.colorKey), t._fillFuncHit(this), this.restore()
        }, e.prototype.strokeShape = function(t) {
            t.hasHitStroke() && this._stroke(t)
        }, e.prototype._stroke = function(t) {
            if (t.hasHitStroke()) {
                var e = t.getStrokeScaleEnabled();
                if (!e) {
                    this.save();
                    var i = this.getCanvas().getPixelRatio();
                    this.setTransform(i, 0, 0, i, 0, 0)
                }
                this._applyLineCap(t);
                var r = t.hitStrokeWidth(),
                    n = "auto" === r ? t.strokeWidth() : r;
                this.setAttr("lineWidth", n), this.setAttr("strokeStyle", t.colorKey), t._strokeFuncHit(this), e || this.restore()
            }
        }, e
    }(h);
    e.HitContext = l
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.releaseCapture = e.setPointerCapture = e.hasPointerCapture = e.createEvent = e.getCapturedShape = void 0;
    var r = i(1),
        n = new Map,
        o = void 0 !== r.Konva._global.PointerEvent;

    function a(t) {
        return {
            evt: t,
            pointerId: t.pointerId
        }
    }

    function s(t, e) {
        var i = n.get(t);
        if (i) {
            var r = i.getStage();
            r && r.content, n.delete(t), o && i._fire("lostpointercapture", a(new PointerEvent("lostpointercapture")))
        }
    }
    e.getCapturedShape = function(t) {
        return n.get(t)
    }, e.createEvent = a, e.hasPointerCapture = function(t, e) {
        return n.get(t) === e
    }, e.setPointerCapture = function(t, e) {
        s(t), e.getStage() && (n.set(t, e), o && e._fire("gotpointercapture", a(new PointerEvent("gotpointercapture"))))
    }, e.releaseCapture = s
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Layer = void 0;
    var o = i(3),
        a = i(12),
        s = i(5),
        h = i(0),
        c = i(11),
        l = i(2),
        d = i(7),
        u = i(1),
        p = [{
            x: 0,
            y: 0
        }, {
            x: -1,
            y: -1
        }, {
            x: 1,
            y: -1
        }, {
            x: 1,
            y: 1
        }, {
            x: -1,
            y: 1
        }],
        f = p.length,
        g = function(t) {
            function e(e) {
                var i = t.call(this, e) || this;
                return i.canvas = new c.SceneCanvas, i.hitCanvas = new c.HitCanvas({
                    pixelRatio: 1
                }), i._waitingForDraw = !1, i.on("visibleChange.konva", i._checkVisibility), i._checkVisibility(), i.on("imageSmoothingEnabledChange.konva", i._setSmoothEnabled), i._setSmoothEnabled(), i
            }
            return n(e, t), e.prototype.createPNGStream = function() {
                return this.canvas._canvas.createPNGStream()
            }, e.prototype.getCanvas = function() {
                return this.canvas
            }, e.prototype.getHitCanvas = function() {
                return this.hitCanvas
            }, e.prototype.getContext = function() {
                return this.getCanvas().getContext()
            }, e.prototype.clear = function(t) {
                return this.getContext().clear(t), this.getHitCanvas().getContext().clear(t), this
            }, e.prototype.setZIndex = function(e) {
                t.prototype.setZIndex.call(this, e);
                var i = this.getStage();
                return i && (i.content.removeChild(this.getCanvas()._canvas), e < i.children.length - 1 ? i.content.insertBefore(this.getCanvas()._canvas, i.children[e + 1].getCanvas()._canvas) : i.content.appendChild(this.getCanvas()._canvas)), this
            }, e.prototype.moveToTop = function() {
                s.Node.prototype.moveToTop.call(this);
                var t = this.getStage();
                return t && (t.content.removeChild(this.getCanvas()._canvas), t.content.appendChild(this.getCanvas()._canvas)), !0
            }, e.prototype.moveUp = function() {
                if (!s.Node.prototype.moveUp.call(this)) return !1;
                var t = this.getStage();
                return !!t && (t.content.removeChild(this.getCanvas()._canvas), this.index < t.children.length - 1 ? t.content.insertBefore(this.getCanvas()._canvas, t.children[this.index + 1].getCanvas()._canvas) : t.content.appendChild(this.getCanvas()._canvas), !0)
            }, e.prototype.moveDown = function() {
                if (s.Node.prototype.moveDown.call(this)) {
                    var t = this.getStage();
                    if (t) {
                        var e = t.children;
                        t.content.removeChild(this.getCanvas()._canvas), t.content.insertBefore(this.getCanvas()._canvas, e[this.index + 1].getCanvas()._canvas)
                    }
                    return !0
                }
                return !1
            }, e.prototype.moveToBottom = function() {
                if (s.Node.prototype.moveToBottom.call(this)) {
                    var t = this.getStage();
                    if (t) {
                        var e = t.children;
                        t.content.removeChild(this.getCanvas()._canvas), t.content.insertBefore(this.getCanvas()._canvas, e[1].getCanvas()._canvas)
                    }
                    return !0
                }
                return !1
            }, e.prototype.getLayer = function() {
                return this
            }, e.prototype.remove = function() {
                var t = this.getCanvas()._canvas;
                return s.Node.prototype.remove.call(this), t && t.parentNode && o.Util._isInDocument(t) && t.parentNode.removeChild(t), this
            }, e.prototype.getStage = function() {
                return this.parent
            }, e.prototype.setSize = function(t) {
                var e = t.width,
                    i = t.height;
                return this.canvas.setSize(e, i), this.hitCanvas.setSize(e, i), this._setSmoothEnabled(), this
            }, e.prototype._validateAdd = function(t) {
                var e = t.getType();
                "Group" !== e && "Shape" !== e && o.Util.throw("You may only add groups and shapes to a layer.")
            }, e.prototype._toKonvaCanvas = function(t) {
                return (t = t || {}).width = t.width || this.getWidth(), t.height = t.height || this.getHeight(), t.x = void 0 !== t.x ? t.x : this.x(), t.y = void 0 !== t.y ? t.y : this.y(), s.Node.prototype._toKonvaCanvas.call(this, t)
            }, e.prototype._checkVisibility = function() {
                var t = this.visible();
                this.canvas._canvas.style.display = t ? "block" : "none"
            }, e.prototype._setSmoothEnabled = function() {
                this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled()
            }, e.prototype.getWidth = function() {
                if (this.parent) return this.parent.width()
            }, e.prototype.setWidth = function() {
                o.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.')
            }, e.prototype.getHeight = function() {
                if (this.parent) return this.parent.height()
            }, e.prototype.setHeight = function() {
                o.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.')
            }, e.prototype.batchDraw = function() {
                var t = this;
                return this._waitingForDraw || (this._waitingForDraw = !0, o.Util.requestAnimFrame((function() {
                    t.draw(), t._waitingForDraw = !1
                }))), this
            }, e.prototype.getIntersection = function(t, e) {
                if (!this.isListening() || !this.isVisible()) return null;
                for (var i = 1, r = !1;;) {
                    for (var n = 0; n < f; n++) {
                        var o = p[n],
                            a = this._getIntersection({
                                x: t.x + o.x * i,
                                y: t.y + o.y * i
                            }),
                            s = a.shape;
                        if (s && e) return s.findAncestor(e, !0);
                        if (s) return s;
                        if (r = !!a.antialiased, !a.antialiased) break
                    }
                    if (!r) return null;
                    i += 1
                }
            }, e.prototype._getIntersection = function(t) {
                var e = this.hitCanvas.pixelRatio,
                    i = this.hitCanvas.context.getImageData(Math.round(t.x * e), Math.round(t.y * e), 1, 1).data,
                    r = i[3];
                if (255 === r) {
                    var n = o.Util._rgbToHex(i[0], i[1], i[2]),
                        a = d.shapes["#" + n];
                    return a ? {
                        shape: a
                    } : {
                        antialiased: !0
                    }
                }
                return r > 0 ? {
                    antialiased: !0
                } : {}
            }, e.prototype.drawScene = function(t, e) {
                var i = this.getLayer(),
                    r = t || i && i.getCanvas();
                return this._fire("beforeDraw", {
                    node: this
                }), this.clearBeforeDraw() && r.getContext().clear(), a.Container.prototype.drawScene.call(this, r, e), this._fire("draw", {
                    node: this
                }), this
            }, e.prototype.drawHit = function(t, e) {
                var i = this.getLayer(),
                    r = t || i && i.hitCanvas;
                return i && i.clearBeforeDraw() && i.getHitCanvas().getContext().clear(), a.Container.prototype.drawHit.call(this, r, e), this
            }, e.prototype.enableHitGraph = function() {
                return this.hitGraphEnabled(!0), this
            }, e.prototype.disableHitGraph = function() {
                return this.hitGraphEnabled(!1), this
            }, e.prototype.setHitGraphEnabled = function(t) {
                o.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."), this.listening(t)
            }, e.prototype.getHitGraphEnabled = function(t) {
                return o.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."), this.listening()
            }, e.prototype.toggleHitCanvas = function() {
                if (this.parent) {
                    var t = this.parent;
                    !!this.hitCanvas._canvas.parentNode ? t.content.removeChild(this.hitCanvas._canvas) : t.content.appendChild(this.hitCanvas._canvas)
                }
            }, e
        }(a.Container);
    e.Layer = g, g.prototype.nodeType = "Layer", u._registerNode(g), h.Factory.addGetterSetter(g, "imageSmoothingEnabled", !0), h.Factory.addGetterSetter(g, "clearBeforeDraw", !0), h.Factory.addGetterSetter(g, "hitGraphEnabled", !0, l.getBooleanValidator()), o.Collection.mapMethods(g)
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
            return (r = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(t, e) {
                    t.__proto__ = e
                } || function(t, e) {
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                })(t, e)
        }, function(t, e) {
            function i() {
                this.constructor = t
            }
            r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
        }),
        o = this && this.__spreadArrays || function() {
            for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length;
            var r = Array(t),
                n = 0;
            for (e = 0; e < i; e++)
                for (var o = arguments[e], a = 0, s = o.length; a < s; a++, n++) r[n] = o[a];
            return r
        };
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Line = void 0;
    var a = i(3),
        s = i(0),
        h = i(7),
        c = i(2),
        l = i(1),
        d = function(t) {
            function e(e) {
                var i = t.call(this, e) || this;
                return i.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva", (function() {
                    this._clearCache("tensionPoints")
                })), i
            }
            return n(e, t), e.prototype._sceneFunc = function(t) {
                var e, i, r, n = this.points(),
                    o = n.length,
                    a = this.tension(),
                    s = this.closed(),
                    h = this.bezier();
                if (o) {
                    if (t.beginPath(), t.moveTo(n[0], n[1]), 0 !== a && o > 4) {
                        for (i = (e = this.getTensionPoints()).length, r = s ? 0 : 4, s || t.quadraticCurveTo(e[0], e[1], e[2], e[3]); r < i - 2;) t.bezierCurveTo(e[r++], e[r++], e[r++], e[r++], e[r++], e[r++]);
                        s || t.quadraticCurveTo(e[i - 2], e[i - 1], n[o - 2], n[o - 1])
                    } else if (h)
                        for (r = 2; r < o;) t.bezierCurveTo(n[r++], n[r++], n[r++], n[r++], n[r++], n[r++]);
                    else
                        for (r = 2; r < o; r += 2) t.lineTo(n[r], n[r + 1]);
                    s ? (t.closePath(), t.fillStrokeShape(this)) : t.strokeShape(this)
                }
            }, e.prototype.getTensionPoints = function() {
                return this._getCache("tensionPoints", this._getTensionPoints)
            }, e.prototype._getTensionPoints = function() {
                return this.closed() ? this._getTensionPointsClosed() : a.Util._expandPoints(this.points(), this.tension())
            }, e.prototype._getTensionPointsClosed = function() {
                var t = this.points(),
                    e = t.length,
                    i = this.tension(),
                    r = a.Util._getControlPoints(t[e - 2], t[e - 1], t[0], t[1], t[2], t[3], i),
                    n = a.Util._getControlPoints(t[e - 4], t[e - 3], t[e - 2], t[e - 1], t[0], t[1], i),
                    o = a.Util._expandPoints(t, i);
                return [r[2], r[3]].concat(o).concat([n[0], n[1], t[e - 2], t[e - 1], n[2], n[3], r[0], r[1], t[0], t[1]])
            }, e.prototype.getWidth = function() {
                return this.getSelfRect().width
            }, e.prototype.getHeight = function() {
                return this.getSelfRect().height
            }, e.prototype.getSelfRect = function() {
                var t = this.points();
                if (t.length < 4) return {
                    x: t[0] || 0,
                    y: t[1] || 0,
                    width: 0,
                    height: 0
                };
                for (var e, i, r = (t = 0 !== this.tension() ? o([t[0], t[1]], this._getTensionPoints(), [t[t.length - 2], t[t.length - 1]]) : this.points())[0], n = t[0], a = t[1], s = t[1], h = 0; h < t.length / 2; h++) e = t[2 * h], i = t[2 * h + 1], r = Math.min(r, e), n = Math.max(n, e), a = Math.min(a, i), s = Math.max(s, i);
                return {
                    x: r,
                    y: a,
                    width: n - r,
                    height: s - a
                }
            }, e
        }(h.Shape);
    e.Line = d, d.prototype.className = "Line", d.prototype._attrsAffectingSize = ["points", "bezier", "tension"], l._registerNode(d), s.Factory.addGetterSetter(d, "closed", !1), s.Factory.addGetterSetter(d, "bezier", !1), s.Factory.addGetterSetter(d, "tension", 0, c.getNumberValidator()), s.Factory.addGetterSetter(d, "points", [], c.getNumberArrayValidator()), a.Collection.mapMethods(d)
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Path = void 0;
    var o = i(3),
        a = i(0),
        s = i(7),
        h = i(1),
        c = function(t) {
            function e(i) {
                var r = t.call(this, i) || this;
                r.dataArray = [], r.pathLength = 0, r.dataArray = e.parsePathData(r.data()), r.pathLength = 0;
                for (var n = 0; n < r.dataArray.length; ++n) r.pathLength += r.dataArray[n].pathLength;
                return r.on("dataChange.konva", (function() {
                    this.dataArray = e.parsePathData(this.data()), this.pathLength = 0;
                    for (var t = 0; t < this.dataArray.length; ++t) this.pathLength += this.dataArray[t].pathLength
                })), r
            }
            return n(e, t), e.prototype._sceneFunc = function(t) {
                var e = this.dataArray;
                t.beginPath();
                for (var i = !1, r = 0; r < e.length; r++) {
                    var n = e[r].command,
                        o = e[r].points;
                    switch (n) {
                        case "L":
                            t.lineTo(o[0], o[1]);
                            break;
                        case "M":
                            t.moveTo(o[0], o[1]);
                            break;
                        case "C":
                            t.bezierCurveTo(o[0], o[1], o[2], o[3], o[4], o[5]);
                            break;
                        case "Q":
                            t.quadraticCurveTo(o[0], o[1], o[2], o[3]);
                            break;
                        case "A":
                            var a = o[0],
                                s = o[1],
                                h = o[2],
                                c = o[3],
                                l = o[4],
                                d = o[5],
                                u = o[6],
                                p = o[7],
                                f = h > c ? h : c,
                                g = h > c ? 1 : h / c,
                                y = h > c ? c / h : 1;
                            t.translate(a, s), t.rotate(u), t.scale(g, y), t.arc(0, 0, f, l, l + d, 1 - p), t.scale(1 / g, 1 / y), t.rotate(-u), t.translate(-a, -s);
                            break;
                        case "z":
                            i = !0, t.closePath()
                    }
                }
                i || this.hasFill() ? t.fillStrokeShape(this) : t.strokeShape(this)
            }, e.prototype.getSelfRect = function() {
                var t = [];
                this.dataArray.forEach((function(i) {
                    if ("A" === i.command) {
                        var r = i.points[4],
                            n = i.points[5],
                            o = i.points[4] + n,
                            a = Math.PI / 180;
                        if (Math.abs(r - o) < a && (a = Math.abs(r - o)), n < 0)
                            for (var s = r - a; s > o; s -= a) {
                                var h = e.getPointOnEllipticalArc(i.points[0], i.points[1], i.points[2], i.points[3], s, 0);
                                t.push(h.x, h.y)
                            } else
                                for (s = r + a; s < o; s += a) {
                                    h = e.getPointOnEllipticalArc(i.points[0], i.points[1], i.points[2], i.points[3], s, 0);
                                    t.push(h.x, h.y)
                                }
                    } else if ("C" === i.command)
                        for (s = 0; s <= 1; s += .01) {
                            h = e.getPointOnCubicBezier(s, i.start.x, i.start.y, i.points[0], i.points[1], i.points[2], i.points[3], i.points[4], i.points[5]);
                            t.push(h.x, h.y)
                        } else t = t.concat(i.points)
                }));
                for (var i, r, n = t[0], o = t[0], a = t[1], s = t[1], h = 0; h < t.length / 2; h++) i = t[2 * h], r = t[2 * h + 1], isNaN(i) || (n = Math.min(n, i), o = Math.max(o, i)), isNaN(r) || (a = Math.min(a, r), s = Math.max(s, r));
                return {
                    x: Math.round(n),
                    y: Math.round(a),
                    width: Math.round(o - n),
                    height: Math.round(s - a)
                }
            }, e.prototype.getLength = function() {
                return this.pathLength
            }, e.prototype.getPointAtLength = function(t) {
                var i, r = 0,
                    n = this.dataArray.length;
                if (!n) return null;
                for (; r < n && t > this.dataArray[r].pathLength;) t -= this.dataArray[r].pathLength, ++r;
                if (r === n) return {
                    x: (i = this.dataArray[r - 1].points.slice(-2))[0],
                    y: i[1]
                };
                if (t < .01) return {
                    x: (i = this.dataArray[r].points.slice(0, 2))[0],
                    y: i[1]
                };
                var o = this.dataArray[r],
                    a = o.points;
                switch (o.command) {
                    case "L":
                        return e.getPointOnLine(t, o.start.x, o.start.y, a[0], a[1]);
                    case "C":
                        return e.getPointOnCubicBezier(t / o.pathLength, o.start.x, o.start.y, a[0], a[1], a[2], a[3], a[4], a[5]);
                    case "Q":
                        return e.getPointOnQuadraticBezier(t / o.pathLength, o.start.x, o.start.y, a[0], a[1], a[2], a[3]);
                    case "A":
                        var s = a[0],
                            h = a[1],
                            c = a[2],
                            l = a[3],
                            d = a[4],
                            u = a[5],
                            p = a[6];
                        return d += u * t / o.pathLength, e.getPointOnEllipticalArc(s, h, c, l, d, p)
                }
                return null
            }, e.getLineLength = function(t, e, i, r) {
                return Math.sqrt((i - t) * (i - t) + (r - e) * (r - e))
            }, e.getPointOnLine = function(t, e, i, r, n, o, a) {
                void 0 === o && (o = e), void 0 === a && (a = i);
                var s = (n - i) / (r - e + 1e-8),
                    h = Math.sqrt(t * t / (1 + s * s));
                r < e && (h *= -1);
                var c, l = s * h;
                if (r === e) c = {
                    x: o,
                    y: a + l
                };
                else if ((a - i) / (o - e + 1e-8) === s) c = {
                    x: o + h,
                    y: a + l
                };
                else {
                    var d, u, p = this.getLineLength(e, i, r, n),
                        f = (o - e) * (r - e) + (a - i) * (n - i);
                    d = e + (f /= p * p) * (r - e), u = i + f * (n - i);
                    var g = this.getLineLength(o, a, d, u),
                        y = Math.sqrt(t * t - g * g);
                    h = Math.sqrt(y * y / (1 + s * s)), r < e && (h *= -1), c = {
                        x: d + h,
                        y: u + (l = s * h)
                    }
                }
                return c
            }, e.getPointOnCubicBezier = function(t, e, i, r, n, o, a, s, h) {
                function c(t) {
                    return t * t * t
                }

                function l(t) {
                    return 3 * t * t * (1 - t)
                }

                function d(t) {
                    return 3 * t * (1 - t) * (1 - t)
                }

                function u(t) {
                    return (1 - t) * (1 - t) * (1 - t)
                }
                return {
                    x: s * c(t) + o * l(t) + r * d(t) + e * u(t),
                    y: h * c(t) + a * l(t) + n * d(t) + i * u(t)
                }
            }, e.getPointOnQuadraticBezier = function(t, e, i, r, n, o, a) {
                function s(t) {
                    return t * t
                }

                function h(t) {
                    return 2 * t * (1 - t)
                }

                function c(t) {
                    return (1 - t) * (1 - t)
                }
                return {
                    x: o * s(t) + r * h(t) + e * c(t),
                    y: a * s(t) + n * h(t) + i * c(t)
                }
            }, e.getPointOnEllipticalArc = function(t, e, i, r, n, o) {
                var a = Math.cos(o),
                    s = Math.sin(o),
                    h = i * Math.cos(n),
                    c = r * Math.sin(n);
                return {
                    x: t + (h * a - c * s),
                    y: e + (h * s + c * a)
                }
            }, e.parsePathData = function(t) {
                if (!t) return [];
                var e = t,
                    i = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"];
                e = e.replace(new RegExp(" ", "g"), ",");
                for (var r = 0; r < i.length; r++) e = e.replace(new RegExp(i[r], "g"), "|" + i[r]);
                var n, o = e.split("|"),
                    a = [],
                    s = [],
                    h = 0,
                    c = 0,
                    l = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
                for (r = 1; r < o.length; r++) {
                    var d = o[r],
                        u = d.charAt(0);
                    for (d = d.slice(1), s.length = 0; n = l.exec(d);) s.push(n[0]);
                    for (var p = [], f = 0, g = s.length; f < g; f++) {
                        var y = parseFloat(s[f]);
                        isNaN(y) ? p.push(0) : p.push(y)
                    }
                    for (; p.length > 0 && !isNaN(p[0]);) {
                        var v, _, m, b, x, S, C, w, P, A, T = null,
                            O = [],
                            k = h,
                            M = c;
                        switch (u) {
                            case "l":
                                h += p.shift(), c += p.shift(), T = "L", O.push(h, c);
                                break;
                            case "L":
                                h = p.shift(), c = p.shift(), O.push(h, c);
                                break;
                            case "m":
                                var F = p.shift(),
                                    G = p.shift();
                                if (h += F, c += G, T = "M", a.length > 2 && "z" === a[a.length - 1].command)
                                    for (var D = a.length - 2; D >= 0; D--)
                                        if ("M" === a[D].command) {
                                            h = a[D].points[0] + F, c = a[D].points[1] + G;
                                            break
                                        } O.push(h, c), u = "l";
                                break;
                            case "M":
                                h = p.shift(), c = p.shift(), T = "M", O.push(h, c), u = "L";
                                break;
                            case "h":
                                h += p.shift(), T = "L", O.push(h, c);
                                break;
                            case "H":
                                h = p.shift(), T = "L", O.push(h, c);
                                break;
                            case "v":
                                c += p.shift(), T = "L", O.push(h, c);
                                break;
                            case "V":
                                c = p.shift(), T = "L", O.push(h, c);
                                break;
                            case "C":
                                O.push(p.shift(), p.shift(), p.shift(), p.shift()), h = p.shift(), c = p.shift(), O.push(h, c);
                                break;
                            case "c":
                                O.push(h + p.shift(), c + p.shift(), h + p.shift(), c + p.shift()), h += p.shift(), c += p.shift(), T = "C", O.push(h, c);
                                break;
                            case "S":
                                _ = h, m = c, "C" === (v = a[a.length - 1]).command && (_ = h + (h - v.points[2]), m = c + (c - v.points[3])), O.push(_, m, p.shift(), p.shift()), h = p.shift(), c = p.shift(), T = "C", O.push(h, c);
                                break;
                            case "s":
                                _ = h, m = c, "C" === (v = a[a.length - 1]).command && (_ = h + (h - v.points[2]), m = c + (c - v.points[3])), O.push(_, m, h + p.shift(), c + p.shift()), h += p.shift(), c += p.shift(), T = "C", O.push(h, c);
                                break;
                            case "Q":
                                O.push(p.shift(), p.shift()), h = p.shift(), c = p.shift(), O.push(h, c);
                                break;
                            case "q":
                                O.push(h + p.shift(), c + p.shift()), h += p.shift(), c += p.shift(), T = "Q", O.push(h, c);
                                break;
                            case "T":
                                _ = h, m = c, "Q" === (v = a[a.length - 1]).command && (_ = h + (h - v.points[0]), m = c + (c - v.points[1])), h = p.shift(), c = p.shift(), T = "Q", O.push(_, m, h, c);
                                break;
                            case "t":
                                _ = h, m = c, "Q" === (v = a[a.length - 1]).command && (_ = h + (h - v.points[0]), m = c + (c - v.points[1])), h += p.shift(), c += p.shift(), T = "Q", O.push(_, m, h, c);
                                break;
                            case "A":
                                b = p.shift(), x = p.shift(), S = p.shift(), C = p.shift(), w = p.shift(), P = h, A = c, h = p.shift(), c = p.shift(), T = "A", O = this.convertEndpointToCenterParameterization(P, A, h, c, C, w, b, x, S);
                                break;
                            case "a":
                                b = p.shift(), x = p.shift(), S = p.shift(), C = p.shift(), w = p.shift(), P = h, A = c, h += p.shift(), c += p.shift(), T = "A", O = this.convertEndpointToCenterParameterization(P, A, h, c, C, w, b, x, S)
                        }
                        a.push({
                            command: T || u,
                            points: O,
                            start: {
                                x: k,
                                y: M
                            },
                            pathLength: this.calcLength(k, M, T || u, O)
                        })
                    }
                    "z" !== u && "Z" !== u || a.push({
                        command: "z",
                        points: [],
                        start: void 0,
                        pathLength: 0
                    })
                }
                return a
            }, e.calcLength = function(t, i, r, n) {
                var o, a, s, h, c = e;
                switch (r) {
                    case "L":
                        return c.getLineLength(t, i, n[0], n[1]);
                    case "C":
                        for (o = 0, a = c.getPointOnCubicBezier(0, t, i, n[0], n[1], n[2], n[3], n[4], n[5]), h = .01; h <= 1; h += .01) s = c.getPointOnCubicBezier(h, t, i, n[0], n[1], n[2], n[3], n[4], n[5]), o += c.getLineLength(a.x, a.y, s.x, s.y), a = s;
                        return o;
                    case "Q":
                        for (o = 0, a = c.getPointOnQuadraticBezier(0, t, i, n[0], n[1], n[2], n[3]), h = .01; h <= 1; h += .01) s = c.getPointOnQuadraticBezier(h, t, i, n[0], n[1], n[2], n[3]), o += c.getLineLength(a.x, a.y, s.x, s.y), a = s;
                        return o;
                    case "A":
                        o = 0;
                        var l = n[4],
                            d = n[5],
                            u = n[4] + d,
                            p = Math.PI / 180;
                        if (Math.abs(l - u) < p && (p = Math.abs(l - u)), a = c.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], l, 0), d < 0)
                            for (h = l - p; h > u; h -= p) s = c.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], h, 0), o += c.getLineLength(a.x, a.y, s.x, s.y), a = s;
                        else
                            for (h = l + p; h < u; h += p) s = c.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], h, 0), o += c.getLineLength(a.x, a.y, s.x, s.y), a = s;
                        return s = c.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], u, 0), o += c.getLineLength(a.x, a.y, s.x, s.y)
                }
                return 0
            }, e.convertEndpointToCenterParameterization = function(t, e, i, r, n, o, a, s, h) {
                var c = h * (Math.PI / 180),
                    l = Math.cos(c) * (t - i) / 2 + Math.sin(c) * (e - r) / 2,
                    d = -1 * Math.sin(c) * (t - i) / 2 + Math.cos(c) * (e - r) / 2,
                    u = l * l / (a * a) + d * d / (s * s);
                u > 1 && (a *= Math.sqrt(u), s *= Math.sqrt(u));
                var p = Math.sqrt((a * a * (s * s) - a * a * (d * d) - s * s * (l * l)) / (a * a * (d * d) + s * s * (l * l)));
                n === o && (p *= -1), isNaN(p) && (p = 0);
                var f = p * a * d / s,
                    g = p * -s * l / a,
                    y = (t + i) / 2 + Math.cos(c) * f - Math.sin(c) * g,
                    v = (e + r) / 2 + Math.sin(c) * f + Math.cos(c) * g,
                    _ = function(t) {
                        return Math.sqrt(t[0] * t[0] + t[1] * t[1])
                    },
                    m = function(t, e) {
                        return (t[0] * e[0] + t[1] * e[1]) / (_(t) * _(e))
                    },
                    b = function(t, e) {
                        return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(m(t, e))
                    },
                    x = b([1, 0], [(l - f) / a, (d - g) / s]),
                    S = [(l - f) / a, (d - g) / s],
                    C = [(-1 * l - f) / a, (-1 * d - g) / s],
                    w = b(S, C);
                return m(S, C) <= -1 && (w = Math.PI), m(S, C) >= 1 && (w = 0), 0 === o && w > 0 && (w -= 2 * Math.PI), 1 === o && w < 0 && (w += 2 * Math.PI), [y, v, a, s, x, w, c, o]
            }, e
        }(s.Shape);
    e.Path = c, c.prototype.className = "Path", c.prototype._attrsAffectingSize = ["data"], h._registerNode(c), a.Factory.addGetterSetter(c, "data"), o.Collection.mapMethods(c)
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Rect = void 0;
    var o = i(3),
        a = i(0),
        s = i(7),
        h = i(1),
        c = i(2),
        l = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n(e, t), e.prototype._sceneFunc = function(t) {
                var e = this.cornerRadius(),
                    i = this.width(),
                    r = this.height();
                if (t.beginPath(), e) {
                    var n = 0,
                        o = 0,
                        a = 0,
                        s = 0;
                    "number" == typeof e ? n = o = a = s = Math.min(e, i / 2, r / 2) : (n = Math.min(e[0] || 0, i / 2, r / 2), o = Math.min(e[1] || 0, i / 2, r / 2), s = Math.min(e[2] || 0, i / 2, r / 2), a = Math.min(e[3] || 0, i / 2, r / 2)), t.moveTo(n, 0), t.lineTo(i - o, 0), t.arc(i - o, o, o, 3 * Math.PI / 2, 0, !1), t.lineTo(i, r - s), t.arc(i - s, r - s, s, 0, Math.PI / 2, !1), t.lineTo(a, r), t.arc(a, r - a, a, Math.PI / 2, Math.PI, !1), t.lineTo(0, n), t.arc(n, n, n, Math.PI, 3 * Math.PI / 2, !1)
                } else t.rect(0, 0, i, r);
                t.closePath(), t.fillStrokeShape(this)
            }, e
        }(s.Shape);
    e.Rect = l, l.prototype.className = "Rect", h._registerNode(l), a.Factory.addGetterSetter(l, "cornerRadius", 0, c.getNumberOrArrayOfNumbersValidator(4)), o.Collection.mapMethods(l)
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Text = e.stringToArray = void 0;
    var o = i(3),
        a = i(0),
        s = i(7),
        h = i(1),
        c = i(2),
        l = i(1);

    function d(t) {
        return Array.from(t)
    }
    e.stringToArray = d;
    var u, p = ["fontFamily", "fontSize", "fontStyle", "fontVariant", "padding", "align", "verticalAlign", "lineHeight", "text", "width", "height", "wrap", "ellipsis", "letterSpacing"],
        f = p.length;

    function g() {
        return u || (u = o.Util.createCanvasElement().getContext("2d"))
    }
    var y = function(t) {
        function e(e) {
            var i = t.call(this, function(t) {
                return (t = t || {}).fillLinearGradientColorStops || t.fillRadialGradientColorStops || t.fillPatternImage || (t.fill = t.fill || "black"), t
            }(e)) || this;
            i._partialTextX = 0, i._partialTextY = 0;
            for (var r = 0; r < f; r++) i.on(p[r] + "Change.konva", i._setTextData);
            return i._setTextData(), i
        }
        return n(e, t), e.prototype._sceneFunc = function(t) {
            var e = this.textArr,
                i = e.length;
            if (this.text()) {
                var r, n = this.padding(),
                    o = this.fontSize(),
                    a = this.lineHeight() * o,
                    s = this.verticalAlign(),
                    h = 0,
                    c = this.align(),
                    l = this.getWidth(),
                    u = this.letterSpacing(),
                    p = this.fill(),
                    f = this.textDecoration(),
                    g = -1 !== f.indexOf("underline"),
                    y = -1 !== f.indexOf("line-through"),
                    v = 0,
                    _ = (v = a / 2, 0),
                    m = 0;
                for (t.setAttr("font", this._getContextFont()), t.setAttr("textBaseline", "middle"), t.setAttr("textAlign", "left"), "middle" === s ? h = (this.getHeight() - i * a - 2 * n) / 2 : "bottom" === s && (h = this.getHeight() - i * a - 2 * n), t.translate(n, h + n), r = 0; r < i; r++) {
                    _ = 0, m = 0;
                    var b, x, S, C = e[r],
                        w = C.text,
                        P = C.width,
                        A = r !== i - 1;
                    if (t.save(), "right" === c ? _ += l - P - 2 * n : "center" === c && (_ += (l - P - 2 * n) / 2), g && (t.save(), t.beginPath(), t.moveTo(_, v + m + Math.round(o / 2)), x = 0 === (b = w.split(" ").length - 1), S = "justify" === c && A && !x ? l - 2 * n : P, t.lineTo(_ + Math.round(S), v + m + Math.round(o / 2)), t.lineWidth = o / 15, t.strokeStyle = p, t.stroke(), t.restore()), y && (t.save(), t.beginPath(), t.moveTo(_, v + m), x = 0 === (b = w.split(" ").length - 1), S = "justify" === c && A && !x ? l - 2 * n : P, t.lineTo(_ + Math.round(S), v + m), t.lineWidth = o / 15, t.strokeStyle = p, t.stroke(), t.restore()), 0 !== u || "justify" === c) {
                        b = w.split(" ").length - 1;
                        for (var T = d(w), O = 0; O < T.length; O++) {
                            var k = T[O];
                            " " === k && r !== i - 1 && "justify" === c && (_ += (l - 2 * n - P) / b), this._partialTextX = _, this._partialTextY = v + m, this._partialText = k, t.fillStrokeShape(this), _ += this.measureSize(k).width + u
                        }
                    } else this._partialTextX = _, this._partialTextY = v + m, this._partialText = w, t.fillStrokeShape(this);
                    t.restore(), i > 1 && (v += a)
                }
            }
        }, e.prototype._hitFunc = function(t) {
            var e = this.getWidth(),
                i = this.getHeight();
            t.beginPath(), t.rect(0, 0, e, i), t.closePath(), t.fillStrokeShape(this)
        }, e.prototype.setText = function(t) {
            var e = o.Util._isString(t) ? t : null == t ? "" : t + "";
            return this._setAttr("text", e), this
        }, e.prototype.getWidth = function() {
            return "auto" === this.attrs.width || void 0 === this.attrs.width ? this.getTextWidth() + 2 * this.padding() : this.attrs.width
        }, e.prototype.getHeight = function() {
            return "auto" === this.attrs.height || void 0 === this.attrs.height ? this.fontSize() * this.textArr.length * this.lineHeight() + 2 * this.padding() : this.attrs.height
        }, e.prototype.getTextWidth = function() {
            return this.textWidth
        }, e.prototype.getTextHeight = function() {
            return o.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."), this.textHeight
        }, e.prototype.measureSize = function(t) {
            var e, i = g(),
                r = this.fontSize();
            return i.save(), i.font = this._getContextFont(), e = i.measureText(t), i.restore(), {
                width: e.width,
                height: r
            }
        }, e.prototype._getContextFont = function() {
            return h.Konva.UA.isIE ? this.fontStyle() + " " + this.fontSize() + "px " + this.fontFamily() : this.fontStyle() + " " + this.fontVariant() + " " + this.fontSize() + "px " + this.fontFamily().split(",").map((function(t) {
                var e = (t = t.trim()).indexOf(" ") >= 0,
                    i = t.indexOf('"') >= 0 || t.indexOf("'") >= 0;
                return e && !i && (t = '"' + t + '"'), t
            })).join(", ")
        }, e.prototype._addTextLine = function(t) {
            "justify" === this.align() && (t = t.trim());
            var e = this._getTextWidth(t);
            return this.textArr.push({
                text: t,
                width: e
            })
        }, e.prototype._getTextWidth = function(t) {
            var e = this.letterSpacing(),
                i = t.length;
            return g().measureText(t).width + (i ? e * (i - 1) : 0)
        }, e.prototype._setTextData = function() {
            var t = this.text().split("\n"),
                e = +this.fontSize(),
                i = 0,
                r = this.lineHeight() * e,
                n = this.attrs.width,
                o = this.attrs.height,
                a = "auto" !== n && void 0 !== n,
                s = "auto" !== o && void 0 !== o,
                h = this.padding(),
                c = n - 2 * h,
                l = o - 2 * h,
                d = 0,
                u = this.wrap(),
                p = "none" !== u,
                f = "char" !== u && p,
                y = this.ellipsis();
            this.textArr = [], g().font = this._getContextFont();
            for (var v = y ? this._getTextWidth("…") : 0, _ = 0, m = t.length; _ < m; ++_) {
                var b = t[_],
                    x = this._getTextWidth(b);
                if (a && x > c)
                    for (; b.length > 0;) {
                        for (var S = 0, C = b.length, w = "", P = 0; S < C;) {
                            var A = S + C >>> 1,
                                T = b.slice(0, A + 1),
                                O = this._getTextWidth(T) + v;
                            O <= c ? (S = A + 1, w = T, P = O) : C = A
                        }
                        if (!w) break;
                        if (f) {
                            var k, M = b[w.length];
                            (k = (" " === M || "-" === M) && P <= c ? w.length : Math.max(w.lastIndexOf(" "), w.lastIndexOf("-")) + 1) > 0 && (S = k, w = w.slice(0, S), P = this._getTextWidth(w))
                        }
                        if (w = w.trimRight(), this._addTextLine(w), i = Math.max(i, P), d += r, !p || s && d + r > l) {
                            var F = this.textArr[this.textArr.length - 1];
                            if (F)
                                if (y) this._getTextWidth(F.text + "…") < c || (F.text = F.text.slice(0, F.text.length - 3)), this.textArr.splice(this.textArr.length - 1, 1), this._addTextLine(F.text + "…");
                            break
                        }
                        if ((b = (b = b.slice(S)).trimLeft()).length > 0 && (x = this._getTextWidth(b)) <= c) {
                            this._addTextLine(b), d += r, i = Math.max(i, x);
                            break
                        }
                    } else this._addTextLine(b), d += r, i = Math.max(i, x);
                if (s && d + r > l) break
            }
            this.textHeight = e, this.textWidth = i
        }, e.prototype.getStrokeScaleEnabled = function() {
            return !0
        }, e
    }(s.Shape);
    e.Text = y, y.prototype._fillFunc = function(t) {
        t.fillText(this._partialText, this._partialTextX, this._partialTextY)
    }, y.prototype._strokeFunc = function(t) {
        t.strokeText(this._partialText, this._partialTextX, this._partialTextY)
    }, y.prototype.className = "Text", y.prototype._attrsAffectingSize = ["text", "fontSize", "padding", "wrap", "lineHeight", "letterSpacing"], l._registerNode(y), a.Factory.overWriteSetter(y, "width", c.getNumberOrAutoValidator()), a.Factory.overWriteSetter(y, "height", c.getNumberOrAutoValidator()), a.Factory.addGetterSetter(y, "fontFamily", "Arial"), a.Factory.addGetterSetter(y, "fontSize", 12, c.getNumberValidator()), a.Factory.addGetterSetter(y, "fontStyle", "normal"), a.Factory.addGetterSetter(y, "fontVariant", "normal"), a.Factory.addGetterSetter(y, "padding", 0, c.getNumberValidator()), a.Factory.addGetterSetter(y, "align", "left"), a.Factory.addGetterSetter(y, "verticalAlign", "top"), a.Factory.addGetterSetter(y, "lineHeight", 1, c.getNumberValidator()), a.Factory.addGetterSetter(y, "wrap", "word"), a.Factory.addGetterSetter(y, "ellipsis", !1, c.getBooleanValidator()), a.Factory.addGetterSetter(y, "letterSpacing", 0, c.getNumberValidator()), a.Factory.addGetterSetter(y, "text", "", c.getStringValidator()), a.Factory.addGetterSetter(y, "textDecoration", ""), o.Collection.mapMethods(y)
}, , , , , , , , function(t, e, i) {
    "use strict";
    i.r(e);
    i(35), i(73), i(74), i(75)
}, function(t, e, i) {
    var r = i(36).Konva;
    r._injectGlobal(r), e.default = r, t.exports = e.default
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Konva = void 0;
    var r = i(37),
        n = i(41),
        o = i(42),
        a = i(43),
        s = i(44),
        h = i(45),
        c = i(46),
        l = i(23),
        d = i(24),
        u = i(25),
        p = i(47),
        f = i(48),
        g = i(49),
        y = i(50),
        v = i(26),
        _ = i(51),
        m = i(52),
        b = i(53),
        x = i(54),
        S = i(55),
        C = i(56),
        w = i(57),
        P = i(58),
        A = i(59),
        T = i(60),
        O = i(61),
        k = i(62),
        M = i(63),
        F = i(64),
        G = i(65),
        D = i(66),
        N = i(67),
        R = i(68),
        E = i(69),
        L = i(70),
        I = i(71),
        U = i(72);
    e.Konva = r.Konva.Util._assign(r.Konva, {
        Arc: n.Arc,
        Arrow: o.Arrow,
        Circle: a.Circle,
        Ellipse: s.Ellipse,
        Image: h.Image,
        Label: c.Label,
        Tag: c.Tag,
        Line: l.Line,
        Path: d.Path,
        Rect: u.Rect,
        RegularPolygon: p.RegularPolygon,
        Ring: f.Ring,
        Sprite: g.Sprite,
        Star: y.Star,
        Text: v.Text,
        TextPath: _.TextPath,
        Transformer: m.Transformer,
        Wedge: b.Wedge,
        Filters: {
            Blur: x.Blur,
            Brighten: S.Brighten,
            Contrast: C.Contrast,
            Emboss: w.Emboss,
            Enhance: P.Enhance,
            Grayscale: A.Grayscale,
            HSL: T.HSL,
            HSV: O.HSV,
            Invert: k.Invert,
            Kaleidoscope: M.Kaleidoscope,
            Mask: F.Mask,
            Noise: G.Noise,
            Pixelate: D.Pixelate,
            Posterize: N.Posterize,
            RGB: R.RGB,
            RGBA: E.RGBA,
            Sepia: L.Sepia,
            Solarize: I.Solarize,
            Threshold: U.Threshold
        }
    })
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Konva = void 0;
    var r = i(1),
        n = i(3),
        o = i(5),
        a = i(12),
        s = i(38),
        h = i(22),
        c = i(39),
        l = i(17),
        d = i(16),
        u = i(7),
        p = i(18),
        f = i(40),
        g = i(20),
        y = i(11);
    e.Konva = n.Util._assign(r.Konva, {
        Collection: n.Collection,
        Util: n.Util,
        Transform: n.Transform,
        Node: o.Node,
        ids: o.ids,
        names: o.names,
        Container: a.Container,
        Stage: s.Stage,
        stages: s.stages,
        Layer: h.Layer,
        FastLayer: c.FastLayer,
        Group: l.Group,
        DD: d.DD,
        Shape: u.Shape,
        shapes: u.shapes,
        Animation: p.Animation,
        Tween: f.Tween,
        Easings: f.Easings,
        Context: g.Context,
        Canvas: y.Canvas
    })
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Stage = e.stages = void 0;
    var o = i(3),
        a = i(0),
        s = i(12),
        h = i(1),
        c = i(11),
        l = i(16),
        d = i(1),
        u = i(21),
        p = ["mouseenter", "mousedown", "mousemove", "mouseup", "mouseleave", "touchstart", "touchmove", "touchend", "mouseover", "wheel", "contextmenu", "pointerdown", "pointermove", "pointerup", "pointercancel", "lostpointercapture"],
        f = p.length;

    function g(t, e) {
        t.content.addEventListener(e, (function(i) {
            t["_" + e](i)
        }), !1)
    }

    function y(t) {
        return void 0 === t && (t = {}), (t.clipFunc || t.clipWidth || t.clipHeight) && o.Util.warn("Stage does not support clipping. Please use clip for Layers or Groups."), t
    }
    e.stages = [];
    var v = function(t) {
        function i(i) {
            var r = t.call(this, y(i)) || this;
            return r._pointerPositions = [], r._changedPointerPositions = [], r._buildDOM(), r._bindContentEvents(), e.stages.push(r), r.on("widthChange.konva heightChange.konva", r._resizeDOM), r.on("visibleChange.konva", r._checkVisibility), r.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva", (function() {
                y(r.attrs)
            })), r._checkVisibility(), r
        }
        return n(i, t), i.prototype._validateAdd = function(t) {
            var e = "Layer" === t.getType(),
                i = "FastLayer" === t.getType();
            e || i || o.Util.throw("You may only add layers to the stage.")
        }, i.prototype._checkVisibility = function() {
            if (this.content) {
                var t = this.visible() ? "" : "none";
                this.content.style.display = t
            }
        }, i.prototype.setContainer = function(t) {
            if ("string" == typeof t) {
                if ("." === t.charAt(0)) {
                    var e = t.slice(1);
                    t = document.getElementsByClassName(e)[0]
                } else {
                    var i;
                    i = "#" !== t.charAt(0) ? t : t.slice(1), t = document.getElementById(i)
                }
                if (!t) throw "Can not find container in document with id " + i
            }
            return this._setAttr("container", t), this.content && (this.content.parentElement && this.content.parentElement.removeChild(this.content), t.appendChild(this.content)), this
        }, i.prototype.shouldDrawHit = function() {
            return !0
        }, i.prototype.clear = function() {
            var t, e = this.children,
                i = e.length;
            for (t = 0; t < i; t++) e[t].clear();
            return this
        }, i.prototype.clone = function(t) {
            return t || (t = {}), t.container = document.createElement("div"), s.Container.prototype.clone.call(this, t)
        }, i.prototype.destroy = function() {
            t.prototype.destroy.call(this);
            var i = this.content;
            i && o.Util._isInDocument(i) && this.container().removeChild(i);
            var r = e.stages.indexOf(this);
            return r > -1 && e.stages.splice(r, 1), this
        }, i.prototype.getPointerPosition = function() {
            var t = this._pointerPositions[0] || this._changedPointerPositions[0];
            return t ? {
                x: t.x,
                y: t.y
            } : (o.Util.warn("Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);"), null)
        }, i.prototype._getPointerById = function(t) {
            return this._pointerPositions.find((function(e) {
                return e.id === t
            }))
        }, i.prototype.getPointersPositions = function() {
            return this._pointerPositions
        }, i.prototype.getStage = function() {
            return this
        }, i.prototype.getContent = function() {
            return this.content
        }, i.prototype._toKonvaCanvas = function(t) {
            (t = t || {}).x = t.x || 0, t.y = t.y || 0, t.width = t.width || this.width(), t.height = t.height || this.height();
            var e = new c.SceneCanvas({
                    width: t.width,
                    height: t.height,
                    pixelRatio: t.pixelRatio || 1
                }),
                i = e.getContext()._context,
                r = this.children;
            return (t.x || t.y) && i.translate(-1 * t.x, -1 * t.y), r.each((function(e) {
                if (e.isVisible()) {
                    var r = e._toKonvaCanvas(t);
                    i.drawImage(r._canvas, t.x, t.y, r.getWidth() / r.getPixelRatio(), r.getHeight() / r.getPixelRatio())
                }
            })), e
        }, i.prototype.getIntersection = function(t, e) {
            if (!t) return null;
            var i, r, n = this.children;
            for (i = n.length - 1; i >= 0; i--)
                if (r = n[i].getIntersection(t, e)) return r;
            return null
        }, i.prototype._resizeDOM = function() {
            var t = this.width(),
                e = this.height();
            this.content && (this.content.style.width = t + "px", this.content.style.height = e + "px"), this.bufferCanvas.setSize(t, e), this.bufferHitCanvas.setSize(t, e), this.children.each((function(i) {
                i.setSize({
                    width: t,
                    height: e
                }), i.draw()
            }))
        }, i.prototype.add = function(e) {
            if (arguments.length > 1) {
                for (var i = 0; i < arguments.length; i++) this.add(arguments[i]);
                return this
            }
            t.prototype.add.call(this, e);
            var r = this.children.length;
            return r > 5 && o.Util.warn("The stage has " + r + " layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group."), e.setSize({
                width: this.width(),
                height: this.height()
            }), e.draw(), h.Konva.isBrowser && this.content.appendChild(e.canvas._canvas), this
        }, i.prototype.getParent = function() {
            return null
        }, i.prototype.getLayer = function() {
            return null
        }, i.prototype.hasPointerCapture = function(t) {
            return u.hasPointerCapture(t, this)
        }, i.prototype.setPointerCapture = function(t) {
            u.setPointerCapture(t, this)
        }, i.prototype.releaseCapture = function(t) {
            u.releaseCapture(t, this)
        }, i.prototype.getLayers = function() {
            return this.getChildren()
        }, i.prototype._bindContentEvents = function() {
            if (h.Konva.isBrowser)
                for (var t = 0; t < f; t++) g(this, p[t])
        }, i.prototype._mouseenter = function(t) {
            this.setPointersPositions(t), this._fire("mouseenter", {
                evt: t,
                target: this,
                currentTarget: this
            })
        }, i.prototype._mouseover = function(t) {
            this.setPointersPositions(t), this._fire("contentMouseover", {
                evt: t
            }), this._fire("mouseover", {
                evt: t,
                target: this,
                currentTarget: this
            })
        }, i.prototype._mouseleave = function(t) {
            var e;
            this.setPointersPositions(t);
            var i = (null === (e = this.targetShape) || void 0 === e ? void 0 : e.getStage()) ? this.targetShape : null,
                r = !l.DD.isDragging || h.Konva.hitOnDragEnabled;
            i && r ? (i._fireAndBubble("mouseout", {
                evt: t
            }), i._fireAndBubble("mouseleave", {
                evt: t
            }), this._fire("mouseleave", {
                evt: t,
                target: this,
                currentTarget: this
            }), this.targetShape = null) : r && (this._fire("mouseleave", {
                evt: t,
                target: this,
                currentTarget: this
            }), this._fire("mouseout", {
                evt: t,
                target: this,
                currentTarget: this
            })), this.pointerPos = void 0, this._pointerPositions = [], this._fire("contentMouseout", {
                evt: t
            })
        }, i.prototype._mousemove = function(t) {
            var e;
            if (h.Konva.UA.ieMobile) return this._touchmove(t);
            this.setPointersPositions(t);
            var i, r = o.Util._getFirstPointerId(t),
                n = (null === (e = this.targetShape) || void 0 === e ? void 0 : e.getStage()) ? this.targetShape : null,
                a = !l.DD.isDragging || h.Konva.hitOnDragEnabled;
            if (a) {
                if ((i = this.getIntersection(this.getPointerPosition())) && i.isListening()) a && n !== i ? (n && (n._fireAndBubble("mouseout", {
                    evt: t,
                    pointerId: r
                }, i), n._fireAndBubble("mouseleave", {
                    evt: t,
                    pointerId: r
                }, i)), i._fireAndBubble("mouseover", {
                    evt: t,
                    pointerId: r
                }, n), i._fireAndBubble("mouseenter", {
                    evt: t,
                    pointerId: r
                }, n), i._fireAndBubble("mousemove", {
                    evt: t,
                    pointerId: r
                }), this.targetShape = i) : i._fireAndBubble("mousemove", {
                    evt: t,
                    pointerId: r
                });
                else n && a && (n._fireAndBubble("mouseout", {
                    evt: t,
                    pointerId: r
                }), n._fireAndBubble("mouseleave", {
                    evt: t,
                    pointerId: r
                }), this._fire("mouseover", {
                    evt: t,
                    target: this,
                    currentTarget: this,
                    pointerId: r
                }), this.targetShape = null), this._fire("mousemove", {
                    evt: t,
                    target: this,
                    currentTarget: this,
                    pointerId: r
                });
                this._fire("contentMousemove", {
                    evt: t
                })
            }
            t.cancelable && t.preventDefault()
        }, i.prototype._mousedown = function(t) {
            if (h.Konva.UA.ieMobile) return this._touchstart(t);
            this.setPointersPositions(t);
            var e = o.Util._getFirstPointerId(t),
                i = this.getIntersection(this.getPointerPosition());
            l.DD.justDragged = !1, h.Konva.listenClickTap = !0, i && i.isListening() ? (this.clickStartShape = i, i._fireAndBubble("mousedown", {
                evt: t,
                pointerId: e
            })) : this._fire("mousedown", {
                evt: t,
                target: this,
                currentTarget: this,
                pointerId: e
            }), this._fire("contentMousedown", {
                evt: t
            })
        }, i.prototype._mouseup = function(t) {
            if (h.Konva.UA.ieMobile) return this._touchend(t);
            this.setPointersPositions(t);
            var e = o.Util._getFirstPointerId(t),
                i = this.getIntersection(this.getPointerPosition()),
                r = this.clickStartShape,
                n = this.clickEndShape,
                a = !1;
            h.Konva.inDblClickWindow ? (a = !0, clearTimeout(this.dblTimeout)) : l.DD.justDragged || (h.Konva.inDblClickWindow = !0, clearTimeout(this.dblTimeout)), this.dblTimeout = setTimeout((function() {
                h.Konva.inDblClickWindow = !1
            }), h.Konva.dblClickWindow), i && i.isListening() ? (this.clickEndShape = i, i._fireAndBubble("mouseup", {
                evt: t,
                pointerId: e
            }), h.Konva.listenClickTap && r && r._id === i._id && (i._fireAndBubble("click", {
                evt: t,
                pointerId: e
            }), a && n && n === i && i._fireAndBubble("dblclick", {
                evt: t,
                pointerId: e
            }))) : (this.clickEndShape = null, this._fire("mouseup", {
                evt: t,
                target: this,
                currentTarget: this,
                pointerId: e
            }), h.Konva.listenClickTap && this._fire("click", {
                evt: t,
                target: this,
                currentTarget: this,
                pointerId: e
            }), a && this._fire("dblclick", {
                evt: t,
                target: this,
                currentTarget: this,
                pointerId: e
            })), this._fire("contentMouseup", {
                evt: t
            }), h.Konva.listenClickTap && (this._fire("contentClick", {
                evt: t
            }), a && this._fire("contentDblclick", {
                evt: t
            })), h.Konva.listenClickTap = !1, t.cancelable && t.preventDefault()
        }, i.prototype._contextmenu = function(t) {
            this.setPointersPositions(t);
            var e = this.getIntersection(this.getPointerPosition());
            e && e.isListening() ? e._fireAndBubble("contextmenu", {
                evt: t
            }) : this._fire("contextmenu", {
                evt: t,
                target: this,
                currentTarget: this
            }), this._fire("contentContextmenu", {
                evt: t
            })
        }, i.prototype._touchstart = function(t) {
            var e = this;
            this.setPointersPositions(t);
            var i = !1;
            this._changedPointerPositions.forEach((function(r) {
                var n = e.getIntersection(r);
                h.Konva.listenClickTap = !0, l.DD.justDragged = !1, n && n.isListening() && (h.Konva.captureTouchEventsEnabled && n.setPointerCapture(r.id), e.tapStartShape = n, n._fireAndBubble("touchstart", {
                    evt: t,
                    pointerId: r.id
                }, e), i = !0, n.isListening() && n.preventDefault() && t.cancelable && t.preventDefault())
            })), i || this._fire("touchstart", {
                evt: t,
                target: this,
                currentTarget: this,
                pointerId: this._changedPointerPositions[0].id
            }), this._fire("contentTouchstart", {
                evt: t
            })
        }, i.prototype._touchmove = function(t) {
            var e = this;
            if (this.setPointersPositions(t), !l.DD.isDragging || h.Konva.hitOnDragEnabled) {
                var i = !1,
                    r = {};
                this._changedPointerPositions.forEach((function(n) {
                    var o = u.getCapturedShape(n.id) || e.getIntersection(n);
                    o && o.isListening() && (r[o._id] || (r[o._id] = !0, o._fireAndBubble("touchmove", {
                        evt: t,
                        pointerId: n.id
                    }), i = !0, o.isListening() && o.preventDefault() && t.cancelable && t.preventDefault()))
                })), i || this._fire("touchmove", {
                    evt: t,
                    target: this,
                    currentTarget: this,
                    pointerId: this._changedPointerPositions[0].id
                }), this._fire("contentTouchmove", {
                    evt: t
                })
            }
            l.DD.isDragging && l.DD.node.preventDefault() && t.cancelable && t.preventDefault()
        }, i.prototype._touchend = function(t) {
            var e = this;
            this.setPointersPositions(t);
            var i = this.tapEndShape,
                r = !1;
            h.Konva.inDblClickWindow ? (r = !0, clearTimeout(this.dblTimeout)) : l.DD.justDragged || (h.Konva.inDblClickWindow = !0, clearTimeout(this.dblTimeout)), this.dblTimeout = setTimeout((function() {
                h.Konva.inDblClickWindow = !1
            }), h.Konva.dblClickWindow);
            var n = !1,
                o = {},
                a = !1,
                s = !1;
            this._changedPointerPositions.forEach((function(c) {
                var l = u.getCapturedShape(c.id) || e.getIntersection(c);
                l && l.releaseCapture(c.id), l && l.isListening() && (o[l._id] || (o[l._id] = !0, e.tapEndShape = l, l._fireAndBubble("touchend", {
                    evt: t,
                    pointerId: c.id
                }), n = !0, h.Konva.listenClickTap && l === e.tapStartShape && (a = !0, l._fireAndBubble("tap", {
                    evt: t,
                    pointerId: c.id
                }), r && i && i === l && (s = !0, l._fireAndBubble("dbltap", {
                    evt: t,
                    pointerId: c.id
                }))), l.isListening() && l.preventDefault() && t.cancelable && t.preventDefault()))
            })), n || this._fire("touchend", {
                evt: t,
                target: this,
                currentTarget: this,
                pointerId: this._changedPointerPositions[0].id
            }), h.Konva.listenClickTap && !a && (this.tapEndShape = null, this._fire("tap", {
                evt: t,
                target: this,
                currentTarget: this,
                pointerId: this._changedPointerPositions[0].id
            })), r && !s && this._fire("dbltap", {
                evt: t,
                target: this,
                currentTarget: this,
                pointerId: this._changedPointerPositions[0].id
            }), this._fire("contentTouchend", {
                evt: t
            }), h.Konva.listenClickTap && (this._fire("contentTap", {
                evt: t
            }), r && this._fire("contentDbltap", {
                evt: t
            })), this.preventDefault() && t.cancelable && t.preventDefault(), h.Konva.listenClickTap = !1
        }, i.prototype._wheel = function(t) {
            this.setPointersPositions(t);
            var e = this.getIntersection(this.getPointerPosition());
            e && e.isListening() ? e._fireAndBubble("wheel", {
                evt: t
            }) : this._fire("wheel", {
                evt: t,
                target: this,
                currentTarget: this
            }), this._fire("contentWheel", {
                evt: t
            })
        }, i.prototype._pointerdown = function(t) {
            if (h.Konva._pointerEventsEnabled) {
                this.setPointersPositions(t);
                var e = u.getCapturedShape(t.pointerId) || this.getIntersection(this.getPointerPosition());
                e && e._fireAndBubble("pointerdown", u.createEvent(t))
            }
        }, i.prototype._pointermove = function(t) {
            if (h.Konva._pointerEventsEnabled) {
                this.setPointersPositions(t);
                var e = u.getCapturedShape(t.pointerId) || this.getIntersection(this.getPointerPosition());
                e && e._fireAndBubble("pointermove", u.createEvent(t))
            }
        }, i.prototype._pointerup = function(t) {
            if (h.Konva._pointerEventsEnabled) {
                this.setPointersPositions(t);
                var e = u.getCapturedShape(t.pointerId) || this.getIntersection(this.getPointerPosition());
                e && e._fireAndBubble("pointerup", u.createEvent(t)), u.releaseCapture(t.pointerId)
            }
        }, i.prototype._pointercancel = function(t) {
            if (h.Konva._pointerEventsEnabled) {
                this.setPointersPositions(t);
                var e = u.getCapturedShape(t.pointerId) || this.getIntersection(this.getPointerPosition());
                e && e._fireAndBubble("pointerup", u.createEvent(t)), u.releaseCapture(t.pointerId)
            }
        }, i.prototype._lostpointercapture = function(t) {
            u.releaseCapture(t.pointerId)
        }, i.prototype.setPointersPositions = function(t) {
            var e = this,
                i = this._getContentPosition(),
                r = null,
                n = null;
            void 0 !== (t = t || window.event).touches ? (this._pointerPositions = [], this._changedPointerPositions = [], o.Collection.prototype.each.call(t.touches, (function(t) {
                e._pointerPositions.push({
                    id: t.identifier,
                    x: (t.clientX - i.left) / i.scaleX,
                    y: (t.clientY - i.top) / i.scaleY
                })
            })), o.Collection.prototype.each.call(t.changedTouches || t.touches, (function(t) {
                e._changedPointerPositions.push({
                    id: t.identifier,
                    x: (t.clientX - i.left) / i.scaleX,
                    y: (t.clientY - i.top) / i.scaleY
                })
            }))) : (r = (t.clientX - i.left) / i.scaleX, n = (t.clientY - i.top) / i.scaleY, this.pointerPos = {
                x: r,
                y: n
            }, this._pointerPositions = [{
                x: r,
                y: n,
                id: o.Util._getFirstPointerId(t)
            }], this._changedPointerPositions = [{
                x: r,
                y: n,
                id: o.Util._getFirstPointerId(t)
            }])
        }, i.prototype._setPointerPosition = function(t) {
            o.Util.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.'), this.setPointersPositions(t)
        }, i.prototype._getContentPosition = function() {
            if (!this.content || !this.content.getBoundingClientRect) return {
                top: 0,
                left: 0,
                scaleX: 1,
                scaleY: 1
            };
            var t = this.content.getBoundingClientRect();
            return {
                top: t.top,
                left: t.left,
                scaleX: t.width / this.content.clientWidth || 1,
                scaleY: t.height / this.content.clientHeight || 1
            }
        }, i.prototype._buildDOM = function() {
            if (this.bufferCanvas = new c.SceneCanvas({
                    width: this.width(),
                    height: this.height()
                }), this.bufferHitCanvas = new c.HitCanvas({
                    pixelRatio: 1,
                    width: this.width(),
                    height: this.height()
                }), h.Konva.isBrowser) {
                var t = this.container();
                if (!t) throw "Stage has no container. A container is required.";
                t.innerHTML = "", this.content = document.createElement("div"), this.content.style.position = "relative", this.content.style.userSelect = "none", this.content.className = "konvajs-content", this.content.setAttribute("role", "presentation"), t.appendChild(this.content), this._resizeDOM()
            }
        }, i.prototype.cache = function() {
            return o.Util.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes."), this
        }, i.prototype.clearCache = function() {
            return this
        }, i.prototype.batchDraw = function() {
            return this.children.each((function(t) {
                t.batchDraw()
            })), this
        }, i
    }(s.Container);
    e.Stage = v, v.prototype.nodeType = "Stage", d._registerNode(v), a.Factory.addGetterSetter(v, "container")
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.FastLayer = void 0;
    var o = i(3),
        a = i(22),
        s = i(1),
        h = function(t) {
            function e(e) {
                var i = t.call(this, e) || this;
                return i.listening(!1), o.Util.warn('Konva.Fast layer is deprecated. Please use "new Konva.Layer({ listening: false })" instead.'), i
            }
            return n(e, t), e
        }(a.Layer);
    e.FastLayer = h, h.prototype.nodeType = "FastLayer", s._registerNode(h), o.Collection.mapMethods(h)
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Easings = e.Tween = void 0;
    var r = i(3),
        n = i(18),
        o = i(5),
        a = i(1),
        s = {
            node: 1,
            duration: 1,
            easing: 1,
            onFinish: 1,
            yoyo: 1
        },
        h = 0,
        c = ["fill", "stroke", "shadowColor"],
        l = function() {
            function t(t, e, i, r, n, o, a) {
                this.prop = t, this.propFunc = e, this.begin = r, this._pos = r, this.duration = o, this._change = 0, this.prevPos = 0, this.yoyo = a, this._time = 0, this._position = 0, this._startTime = 0, this._finish = 0, this.func = i, this._change = n - this.begin, this.pause()
            }
            return t.prototype.fire = function(t) {
                var e = this[t];
                e && e()
            }, t.prototype.setTime = function(t) {
                t > this.duration ? this.yoyo ? (this._time = this.duration, this.reverse()) : this.finish() : t < 0 ? this.yoyo ? (this._time = 0, this.play()) : this.reset() : (this._time = t, this.update())
            }, t.prototype.getTime = function() {
                return this._time
            }, t.prototype.setPosition = function(t) {
                this.prevPos = this._pos, this.propFunc(t), this._pos = t
            }, t.prototype.getPosition = function(t) {
                return void 0 === t && (t = this._time), this.func(t, this.begin, this._change, this.duration)
            }, t.prototype.play = function() {
                this.state = 2, this._startTime = this.getTimer() - this._time, this.onEnterFrame(), this.fire("onPlay")
            }, t.prototype.reverse = function() {
                this.state = 3, this._time = this.duration - this._time, this._startTime = this.getTimer() - this._time, this.onEnterFrame(), this.fire("onReverse")
            }, t.prototype.seek = function(t) {
                this.pause(), this._time = t, this.update(), this.fire("onSeek")
            }, t.prototype.reset = function() {
                this.pause(), this._time = 0, this.update(), this.fire("onReset")
            }, t.prototype.finish = function() {
                this.pause(), this._time = this.duration, this.update(), this.fire("onFinish")
            }, t.prototype.update = function() {
                this.setPosition(this.getPosition(this._time)), this.fire("onUpdate")
            }, t.prototype.onEnterFrame = function() {
                var t = this.getTimer() - this._startTime;
                2 === this.state ? this.setTime(t) : 3 === this.state && this.setTime(this.duration - t)
            }, t.prototype.pause = function() {
                this.state = 1, this.fire("onPause")
            }, t.prototype.getTimer = function() {
                return (new Date).getTime()
            }, t
        }(),
        d = function() {
            function t(i) {
                var o, c, d = this,
                    u = i.node,
                    p = u._id,
                    f = i.easing || e.Easings.Linear,
                    g = !!i.yoyo;
                o = void 0 === i.duration ? .3 : 0 === i.duration ? .001 : i.duration, this.node = u, this._id = h++;
                var y = u.getLayer() || (u instanceof a.Konva.Stage ? u.getLayers() : null);
                for (c in y || r.Util.error("Tween constructor have `node` that is not in a layer. Please add node into layer first."), this.anim = new n.Animation((function() {
                        d.tween.onEnterFrame()
                    }), y), this.tween = new l(c, (function(t) {
                        d._tweenFunc(t)
                    }), f, 0, 1, 1e3 * o, g), this._addListeners(), t.attrs[p] || (t.attrs[p] = {}), t.attrs[p][this._id] || (t.attrs[p][this._id] = {}), t.tweens[p] || (t.tweens[p] = {}), i) void 0 === s[c] && this._addAttr(c, i[c]);
                this.reset(), this.onFinish = i.onFinish, this.onReset = i.onReset, this.onUpdate = i.onUpdate
            }
            return t.prototype._addAttr = function(e, i) {
                var n, o, a, s, h, l, d, u, p = this.node,
                    f = p._id;
                if ((a = t.tweens[f][e]) && delete t.attrs[f][a][e], n = p.getAttr(e), r.Util._isArray(i))
                    if (o = [], h = Math.max(i.length, n.length), "points" === e && i.length !== n.length && (i.length > n.length ? (d = n, n = r.Util._prepareArrayForTween(n, i, p.closed())) : (l = i, i = r.Util._prepareArrayForTween(i, n, p.closed()))), 0 === e.indexOf("fill"))
                        for (s = 0; s < h; s++)
                            if (s % 2 == 0) o.push(i[s] - n[s]);
                            else {
                                var g = r.Util.colorToRGBA(n[s]);
                                u = r.Util.colorToRGBA(i[s]), n[s] = g, o.push({
                                    r: u.r - g.r,
                                    g: u.g - g.g,
                                    b: u.b - g.b,
                                    a: u.a - g.a
                                })
                            }
                else
                    for (s = 0; s < h; s++) o.push(i[s] - n[s]);
                else -1 !== c.indexOf(e) ? (n = r.Util.colorToRGBA(n), o = {
                    r: (u = r.Util.colorToRGBA(i)).r - n.r,
                    g: u.g - n.g,
                    b: u.b - n.b,
                    a: u.a - n.a
                }) : o = i - n;
                t.attrs[f][this._id][e] = {
                    start: n,
                    diff: o,
                    end: i,
                    trueEnd: l,
                    trueStart: d
                }, t.tweens[f][e] = this._id
            }, t.prototype._tweenFunc = function(e) {
                var i, n, o, a, s, h, l, d, u = this.node,
                    p = t.attrs[u._id][this._id];
                for (i in p) {
                    if (o = (n = p[i]).start, a = n.diff, d = n.end, r.Util._isArray(o))
                        if (s = [], l = Math.max(o.length, d.length), 0 === i.indexOf("fill"))
                            for (h = 0; h < l; h++) h % 2 == 0 ? s.push((o[h] || 0) + a[h] * e) : s.push("rgba(" + Math.round(o[h].r + a[h].r * e) + "," + Math.round(o[h].g + a[h].g * e) + "," + Math.round(o[h].b + a[h].b * e) + "," + (o[h].a + a[h].a * e) + ")");
                        else
                            for (h = 0; h < l; h++) s.push((o[h] || 0) + a[h] * e);
                    else s = -1 !== c.indexOf(i) ? "rgba(" + Math.round(o.r + a.r * e) + "," + Math.round(o.g + a.g * e) + "," + Math.round(o.b + a.b * e) + "," + (o.a + a.a * e) + ")" : o + a * e;
                    u.setAttr(i, s)
                }
            }, t.prototype._addListeners = function() {
                var e = this;
                this.tween.onPlay = function() {
                    e.anim.start()
                }, this.tween.onReverse = function() {
                    e.anim.start()
                }, this.tween.onPause = function() {
                    e.anim.stop()
                }, this.tween.onFinish = function() {
                    var i = e.node,
                        r = t.attrs[i._id][e._id];
                    r.points && r.points.trueEnd && i.setAttr("points", r.points.trueEnd), e.onFinish && e.onFinish.call(e)
                }, this.tween.onReset = function() {
                    var i = e.node,
                        r = t.attrs[i._id][e._id];
                    r.points && r.points.trueStart && i.points(r.points.trueStart), e.onReset && e.onReset()
                }, this.tween.onUpdate = function() {
                    e.onUpdate && e.onUpdate.call(e)
                }
            }, t.prototype.play = function() {
                return this.tween.play(), this
            }, t.prototype.reverse = function() {
                return this.tween.reverse(), this
            }, t.prototype.reset = function() {
                return this.tween.reset(), this
            }, t.prototype.seek = function(t) {
                return this.tween.seek(1e3 * t), this
            }, t.prototype.pause = function() {
                return this.tween.pause(), this
            }, t.prototype.finish = function() {
                return this.tween.finish(), this
            }, t.prototype.destroy = function() {
                var e, i = this.node._id,
                    r = this._id,
                    n = t.tweens[i];
                for (e in this.pause(), n) delete t.tweens[i][e];
                delete t.attrs[i][r]
            }, t.attrs = {}, t.tweens = {}, t
        }();
    e.Tween = d, o.Node.prototype.to = function(t) {
        var e = t.onFinish;
        t.node = this, t.onFinish = function() {
            this.destroy(), e && e()
        }, new d(t).play()
    }, e.Easings = {
        BackEaseIn: function(t, e, i, r) {
            var n = 1.70158;
            return i * (t /= r) * t * ((n + 1) * t - n) + e
        },
        BackEaseOut: function(t, e, i, r) {
            var n = 1.70158;
            return i * ((t = t / r - 1) * t * ((n + 1) * t + n) + 1) + e
        },
        BackEaseInOut: function(t, e, i, r) {
            var n = 1.70158;
            return (t /= r / 2) < 1 ? i / 2 * (t * t * ((1 + (n *= 1.525)) * t - n)) + e : i / 2 * ((t -= 2) * t * ((1 + (n *= 1.525)) * t + n) + 2) + e
        },
        ElasticEaseIn: function(t, e, i, r, n, o) {
            var a = 0;
            return 0 === t ? e : 1 == (t /= r) ? e + i : (o || (o = .3 * r), !n || n < Math.abs(i) ? (n = i, a = o / 4) : a = o / (2 * Math.PI) * Math.asin(i / n), -n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * r - a) * (2 * Math.PI) / o) + e)
        },
        ElasticEaseOut: function(t, e, i, r, n, o) {
            var a = 0;
            return 0 === t ? e : 1 == (t /= r) ? e + i : (o || (o = .3 * r), !n || n < Math.abs(i) ? (n = i, a = o / 4) : a = o / (2 * Math.PI) * Math.asin(i / n), n * Math.pow(2, -10 * t) * Math.sin((t * r - a) * (2 * Math.PI) / o) + i + e)
        },
        ElasticEaseInOut: function(t, e, i, r, n, o) {
            var a = 0;
            return 0 === t ? e : 2 == (t /= r / 2) ? e + i : (o || (o = r * (.3 * 1.5)), !n || n < Math.abs(i) ? (n = i, a = o / 4) : a = o / (2 * Math.PI) * Math.asin(i / n), t < 1 ? n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * r - a) * (2 * Math.PI) / o) * -.5 + e : n * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * r - a) * (2 * Math.PI) / o) * .5 + i + e)
        },
        BounceEaseOut: function(t, e, i, r) {
            return (t /= r) < 1 / 2.75 ? i * (7.5625 * t * t) + e : t < 2 / 2.75 ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : t < 2.5 / 2.75 ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e
        },
        BounceEaseIn: function(t, i, r, n) {
            return r - e.Easings.BounceEaseOut(n - t, 0, r, n) + i
        },
        BounceEaseInOut: function(t, i, r, n) {
            return t < n / 2 ? .5 * e.Easings.BounceEaseIn(2 * t, 0, r, n) + i : .5 * e.Easings.BounceEaseOut(2 * t - n, 0, r, n) + .5 * r + i
        },
        EaseIn: function(t, e, i, r) {
            return i * (t /= r) * t + e
        },
        EaseOut: function(t, e, i, r) {
            return -i * (t /= r) * (t - 2) + e
        },
        EaseInOut: function(t, e, i, r) {
            return (t /= r / 2) < 1 ? i / 2 * t * t + e : -i / 2 * (--t * (t - 2) - 1) + e
        },
        StrongEaseIn: function(t, e, i, r) {
            return i * (t /= r) * t * t * t * t + e
        },
        StrongEaseOut: function(t, e, i, r) {
            return i * ((t = t / r - 1) * t * t * t * t + 1) + e
        },
        StrongEaseInOut: function(t, e, i, r) {
            return (t /= r / 2) < 1 ? i / 2 * t * t * t * t * t + e : i / 2 * ((t -= 2) * t * t * t * t + 2) + e
        },
        Linear: function(t, e, i, r) {
            return i * t / r + e
        }
    }
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Arc = void 0;
    var o = i(3),
        a = i(0),
        s = i(7),
        h = i(1),
        c = i(2),
        l = i(1),
        d = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n(e, t), e.prototype._sceneFunc = function(t) {
                var e = h.Konva.getAngle(this.angle()),
                    i = this.clockwise();
                t.beginPath(), t.arc(0, 0, this.outerRadius(), 0, e, i), t.arc(0, 0, this.innerRadius(), e, 0, !i), t.closePath(), t.fillStrokeShape(this)
            }, e.prototype.getWidth = function() {
                return 2 * this.outerRadius()
            }, e.prototype.getHeight = function() {
                return 2 * this.outerRadius()
            }, e.prototype.setWidth = function(t) {
                this.outerRadius(t / 2)
            }, e.prototype.setHeight = function(t) {
                this.outerRadius(t / 2)
            }, e
        }(s.Shape);
    e.Arc = d, d.prototype._centroid = !0, d.prototype.className = "Arc", d.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"], l._registerNode(d), a.Factory.addGetterSetter(d, "innerRadius", 0, c.getNumberValidator()), a.Factory.addGetterSetter(d, "outerRadius", 0, c.getNumberValidator()), a.Factory.addGetterSetter(d, "angle", 0, c.getNumberValidator()), a.Factory.addGetterSetter(d, "clockwise", !1, c.getBooleanValidator()), o.Collection.mapMethods(d)
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Arrow = void 0;
    var o = i(3),
        a = i(0),
        s = i(23),
        h = i(2),
        c = i(1),
        l = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n(e, t), e.prototype._sceneFunc = function(e) {
                t.prototype._sceneFunc.call(this, e);
                var i = 2 * Math.PI,
                    r = this.points(),
                    n = r,
                    o = 0 !== this.tension() && r.length > 4;
                o && (n = this.getTensionPoints());
                var a, s, h = r.length;
                o ? (a = r[h - 2] - (n[n.length - 2] + n[n.length - 4]) / 2, s = r[h - 1] - (n[n.length - 1] + n[n.length - 3]) / 2) : (a = r[h - 2] - r[h - 4], s = r[h - 1] - r[h - 3]);
                var c = (Math.atan2(s, a) + i) % i,
                    l = this.pointerLength(),
                    d = this.pointerWidth();
                e.save(), e.beginPath(), e.translate(r[h - 2], r[h - 1]), e.rotate(c), e.moveTo(0, 0), e.lineTo(-l, d / 2), e.lineTo(-l, -d / 2), e.closePath(), e.restore(), this.pointerAtBeginning() && (e.save(), e.translate(r[0], r[1]), o ? (a = (n[0] + n[2]) / 2 - r[0], s = (n[1] + n[3]) / 2 - r[1]) : (a = r[2] - r[0], s = r[3] - r[1]), e.rotate((Math.atan2(-s, -a) + i) % i), e.moveTo(0, 0), e.lineTo(-l, d / 2), e.lineTo(-l, -d / 2), e.closePath(), e.restore());
                var u = this.dashEnabled();
                u && (this.attrs.dashEnabled = !1, e.setLineDash([])), e.fillStrokeShape(this), u && (this.attrs.dashEnabled = !0)
            }, e.prototype.getSelfRect = function() {
                var e = t.prototype.getSelfRect.call(this),
                    i = this.pointerWidth() / 2;
                return {
                    x: e.x - i,
                    y: e.y - i,
                    width: e.width + 2 * i,
                    height: e.height + 2 * i
                }
            }, e
        }(s.Line);
    e.Arrow = l, l.prototype.className = "Arrow", c._registerNode(l), a.Factory.addGetterSetter(l, "pointerLength", 10, h.getNumberValidator()), a.Factory.addGetterSetter(l, "pointerWidth", 10, h.getNumberValidator()), a.Factory.addGetterSetter(l, "pointerAtBeginning", !1), o.Collection.mapMethods(l)
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Circle = void 0;
    var o = i(3),
        a = i(0),
        s = i(7),
        h = i(2),
        c = i(1),
        l = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n(e, t), e.prototype._sceneFunc = function(t) {
                t.beginPath(), t.arc(0, 0, this.attrs.radius || 0, 0, 2 * Math.PI, !1), t.closePath(), t.fillStrokeShape(this)
            }, e.prototype.getWidth = function() {
                return 2 * this.radius()
            }, e.prototype.getHeight = function() {
                return 2 * this.radius()
            }, e.prototype.setWidth = function(t) {
                this.radius() !== t / 2 && this.radius(t / 2)
            }, e.prototype.setHeight = function(t) {
                this.radius() !== t / 2 && this.radius(t / 2)
            }, e
        }(s.Shape);
    e.Circle = l, l.prototype._centroid = !0, l.prototype.className = "Circle", l.prototype._attrsAffectingSize = ["radius"], c._registerNode(l), a.Factory.addGetterSetter(l, "radius", 0, h.getNumberValidator()), o.Collection.mapMethods(l)
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Ellipse = void 0;
    var o = i(3),
        a = i(0),
        s = i(7),
        h = i(2),
        c = i(1),
        l = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n(e, t), e.prototype._sceneFunc = function(t) {
                var e = this.radiusX(),
                    i = this.radiusY();
                t.beginPath(), t.save(), e !== i && t.scale(1, i / e), t.arc(0, 0, e, 0, 2 * Math.PI, !1), t.restore(), t.closePath(), t.fillStrokeShape(this)
            }, e.prototype.getWidth = function() {
                return 2 * this.radiusX()
            }, e.prototype.getHeight = function() {
                return 2 * this.radiusY()
            }, e.prototype.setWidth = function(t) {
                this.radiusX(t / 2)
            }, e.prototype.setHeight = function(t) {
                this.radiusY(t / 2)
            }, e
        }(s.Shape);
    e.Ellipse = l, l.prototype.className = "Ellipse", l.prototype._centroid = !0, l.prototype._attrsAffectingSize = ["radiusX", "radiusY"], c._registerNode(l), a.Factory.addComponentsGetterSetter(l, "radius", ["x", "y"]), a.Factory.addGetterSetter(l, "radiusX", 0, h.getNumberValidator()), a.Factory.addGetterSetter(l, "radiusY", 0, h.getNumberValidator()), o.Collection.mapMethods(l)
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Image = void 0;
    var o = i(3),
        a = i(0),
        s = i(7),
        h = i(2),
        c = i(1),
        l = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n(e, t), e.prototype._useBufferCanvas = function() {
                return t.prototype._useBufferCanvas.call(this, !0)
            }, e.prototype._sceneFunc = function(t) {
                var e, i = this.getWidth(),
                    r = this.getHeight(),
                    n = this.attrs.image;
                if (n) {
                    var o = this.attrs.cropWidth,
                        a = this.attrs.cropHeight;
                    e = o && a ? [n, this.cropX(), this.cropY(), o, a, 0, 0, i, r] : [n, 0, 0, i, r]
                }(this.hasFill() || this.hasStroke()) && (t.beginPath(), t.rect(0, 0, i, r), t.closePath(), t.fillStrokeShape(this)), n && t.drawImage.apply(t, e)
            }, e.prototype._hitFunc = function(t) {
                var e = this.width(),
                    i = this.height();
                t.beginPath(), t.rect(0, 0, e, i), t.closePath(), t.fillStrokeShape(this)
            }, e.prototype.getWidth = function() {
                var t, e;
                return null !== (t = this.attrs.width) && void 0 !== t ? t : (null === (e = this.image()) || void 0 === e ? void 0 : e.width) || 0
            }, e.prototype.getHeight = function() {
                var t, e;
                return null !== (t = this.attrs.height) && void 0 !== t ? t : (null === (e = this.image()) || void 0 === e ? void 0 : e.height) || 0
            }, e.fromURL = function(t, i) {
                var r = o.Util.createImageElement();
                r.onload = function() {
                    var t = new e({
                        image: r
                    });
                    i(t)
                }, r.crossOrigin = "Anonymous", r.src = t
            }, e
        }(s.Shape);
    e.Image = l, l.prototype.className = "Image", c._registerNode(l), a.Factory.addGetterSetter(l, "image"), a.Factory.addComponentsGetterSetter(l, "crop", ["x", "y", "width", "height"]), a.Factory.addGetterSetter(l, "cropX", 0, h.getNumberValidator()), a.Factory.addGetterSetter(l, "cropY", 0, h.getNumberValidator()), a.Factory.addGetterSetter(l, "cropWidth", 0, h.getNumberValidator()), a.Factory.addGetterSetter(l, "cropHeight", 0, h.getNumberValidator()), o.Collection.mapMethods(l)
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Tag = e.Label = void 0;
    var o = i(3),
        a = i(0),
        s = i(7),
        h = i(17),
        c = i(2),
        l = i(1),
        d = ["fontFamily", "fontSize", "fontStyle", "padding", "lineHeight", "text", "width", "height"],
        u = d.length,
        p = function(t) {
            function e(e) {
                var i = t.call(this, e) || this;
                return i.on("add.konva", (function(t) {
                    this._addListeners(t.child), this._sync()
                })), i
            }
            return n(e, t), e.prototype.getText = function() {
                return this.find("Text")[0]
            }, e.prototype.getTag = function() {
                return this.find("Tag")[0]
            }, e.prototype._addListeners = function(t) {
                var e, i = this,
                    r = function() {
                        i._sync()
                    };
                for (e = 0; e < u; e++) t.on(d[e] + "Change.konva", r)
            }, e.prototype.getWidth = function() {
                return this.getText().width()
            }, e.prototype.getHeight = function() {
                return this.getText().height()
            }, e.prototype._sync = function() {
                var t, e, i, r, n, o, a, s = this.getText(),
                    h = this.getTag();
                if (s && h) {
                    switch (t = s.width(), e = s.height(), i = h.pointerDirection(), r = h.pointerWidth(), a = h.pointerHeight(), n = 0, o = 0, i) {
                        case "up":
                            n = t / 2, o = -1 * a;
                            break;
                        case "right":
                            n = t + r, o = e / 2;
                            break;
                        case "down":
                            n = t / 2, o = e + a;
                            break;
                        case "left":
                            n = -1 * r, o = e / 2
                    }
                    h.setAttrs({
                        x: -1 * n,
                        y: -1 * o,
                        width: t,
                        height: e
                    }), s.setAttrs({
                        x: -1 * n,
                        y: -1 * o
                    })
                }
            }, e
        }(h.Group);
    e.Label = p, p.prototype.className = "Label", l._registerNode(p), o.Collection.mapMethods(p);
    var f = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return n(e, t), e.prototype._sceneFunc = function(t) {
            var e = this.width(),
                i = this.height(),
                r = this.pointerDirection(),
                n = this.pointerWidth(),
                o = this.pointerHeight(),
                a = this.cornerRadius(),
                s = 0,
                h = 0,
                c = 0,
                l = 0;
            "number" == typeof a ? s = h = c = l = Math.min(a, e / 2, i / 2) : (s = Math.min(a[0] || 0, e / 2, i / 2), h = Math.min(a[1] || 0, e / 2, i / 2), l = Math.min(a[2] || 0, e / 2, i / 2), c = Math.min(a[3] || 0, e / 2, i / 2)), t.beginPath(), t.moveTo(s, 0), "up" === r && (t.lineTo((e - n) / 2, 0), t.lineTo(e / 2, -1 * o), t.lineTo((e + n) / 2, 0)), t.lineTo(e - h, 0), t.arc(e - h, h, h, 3 * Math.PI / 2, 0, !1), "right" === r && (t.lineTo(e, (i - o) / 2), t.lineTo(e + n, i / 2), t.lineTo(e, (i + o) / 2)), t.lineTo(e, i - l), t.arc(e - l, i - l, l, 0, Math.PI / 2, !1), "down" === r && (t.lineTo((e + n) / 2, i), t.lineTo(e / 2, i + o), t.lineTo((e - n) / 2, i)), t.lineTo(c, i), t.arc(c, i - c, c, Math.PI / 2, Math.PI, !1), "left" === r && (t.lineTo(0, (i + o) / 2), t.lineTo(-1 * n, i / 2), t.lineTo(0, (i - o) / 2)), t.lineTo(0, s), t.arc(s, s, s, Math.PI, 3 * Math.PI / 2, !1), t.closePath(), t.fillStrokeShape(this)
        }, e.prototype.getSelfRect = function() {
            var t = 0,
                e = 0,
                i = this.pointerWidth(),
                r = this.pointerHeight(),
                n = this.pointerDirection(),
                o = this.width(),
                a = this.height();
            return "up" === n ? (e -= r, a += r) : "down" === n ? a += r : "left" === n ? (t -= 1.5 * i, o += i) : "right" === n && (o += 1.5 * i), {
                x: t,
                y: e,
                width: o,
                height: a
            }
        }, e
    }(s.Shape);
    e.Tag = f, f.prototype.className = "Tag", l._registerNode(f), a.Factory.addGetterSetter(f, "pointerDirection", "none"), a.Factory.addGetterSetter(f, "pointerWidth", 0, c.getNumberValidator()), a.Factory.addGetterSetter(f, "pointerHeight", 0, c.getNumberValidator()), a.Factory.addGetterSetter(f, "cornerRadius", 0, c.getNumberOrArrayOfNumbersValidator(4)), o.Collection.mapMethods(f)
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.RegularPolygon = void 0;
    var o = i(3),
        a = i(0),
        s = i(7),
        h = i(2),
        c = i(1),
        l = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n(e, t), e.prototype._sceneFunc = function(t) {
                var e = this._getPoints();
                t.beginPath(), t.moveTo(e[0].x, e[0].y);
                for (var i = 1; i < e.length; i++) t.lineTo(e[i].x, e[i].y);
                t.closePath(), t.fillStrokeShape(this)
            }, e.prototype._getPoints = function() {
                for (var t = this.attrs.sides, e = this.attrs.radius || 0, i = [], r = 0; r < t; r++) i.push({
                    x: e * Math.sin(2 * r * Math.PI / t),
                    y: -1 * e * Math.cos(2 * r * Math.PI / t)
                });
                return i
            }, e.prototype.getSelfRect = function() {
                var t = this._getPoints(),
                    e = t[0].x,
                    i = t[0].y,
                    r = t[0].x,
                    n = t[0].y;
                return t.forEach((function(t) {
                    e = Math.min(e, t.x), i = Math.max(i, t.x), r = Math.min(r, t.y), n = Math.max(n, t.y)
                })), {
                    x: e,
                    y: r,
                    width: i - e,
                    height: n - r
                }
            }, e.prototype.getWidth = function() {
                return 2 * this.radius()
            }, e.prototype.getHeight = function() {
                return 2 * this.radius()
            }, e.prototype.setWidth = function(t) {
                this.radius(t / 2)
            }, e.prototype.setHeight = function(t) {
                this.radius(t / 2)
            }, e
        }(s.Shape);
    e.RegularPolygon = l, l.prototype.className = "RegularPolygon", l.prototype._centroid = !0, l.prototype._attrsAffectingSize = ["radius"], c._registerNode(l), a.Factory.addGetterSetter(l, "radius", 0, h.getNumberValidator()), a.Factory.addGetterSetter(l, "sides", 0, h.getNumberValidator()), o.Collection.mapMethods(l)
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Ring = void 0;
    var o = i(3),
        a = i(0),
        s = i(7),
        h = i(2),
        c = i(1),
        l = 2 * Math.PI,
        d = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n(e, t), e.prototype._sceneFunc = function(t) {
                t.beginPath(), t.arc(0, 0, this.innerRadius(), 0, l, !1), t.moveTo(this.outerRadius(), 0), t.arc(0, 0, this.outerRadius(), l, 0, !0), t.closePath(), t.fillStrokeShape(this)
            }, e.prototype.getWidth = function() {
                return 2 * this.outerRadius()
            }, e.prototype.getHeight = function() {
                return 2 * this.outerRadius()
            }, e.prototype.setWidth = function(t) {
                this.outerRadius(t / 2)
            }, e.prototype.setHeight = function(t) {
                this.outerRadius(t / 2)
            }, e
        }(s.Shape);
    e.Ring = d, d.prototype.className = "Ring", d.prototype._centroid = !0, d.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"], c._registerNode(d), a.Factory.addGetterSetter(d, "innerRadius", 0, h.getNumberValidator()), a.Factory.addGetterSetter(d, "outerRadius", 0, h.getNumberValidator()), o.Collection.mapMethods(d)
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Sprite = void 0;
    var o = i(3),
        a = i(0),
        s = i(7),
        h = i(18),
        c = i(2),
        l = i(1),
        d = function(t) {
            function e(e) {
                var i = t.call(this, e) || this;
                return i._updated = !0, i.anim = new h.Animation((function() {
                    var t = i._updated;
                    return i._updated = !1, t
                })), i.on("animationChange.konva", (function() {
                    this.frameIndex(0)
                })), i.on("frameIndexChange.konva", (function() {
                    this._updated = !0
                })), i.on("frameRateChange.konva", (function() {
                    this.anim.isRunning() && (clearInterval(this.interval), this._setInterval())
                })), i
            }
            return n(e, t), e.prototype._sceneFunc = function(t) {
                var e = this.animation(),
                    i = this.frameIndex(),
                    r = 4 * i,
                    n = this.animations()[e],
                    o = this.frameOffsets(),
                    a = n[r + 0],
                    s = n[r + 1],
                    h = n[r + 2],
                    c = n[r + 3],
                    l = this.image();
                if ((this.hasFill() || this.hasStroke()) && (t.beginPath(), t.rect(0, 0, h, c), t.closePath(), t.fillStrokeShape(this)), l)
                    if (o) {
                        var d = o[e],
                            u = 2 * i;
                        t.drawImage(l, a, s, h, c, d[u + 0], d[u + 1], h, c)
                    } else t.drawImage(l, a, s, h, c, 0, 0, h, c)
            }, e.prototype._hitFunc = function(t) {
                var e = this.animation(),
                    i = this.frameIndex(),
                    r = 4 * i,
                    n = this.animations()[e],
                    o = this.frameOffsets(),
                    a = n[r + 2],
                    s = n[r + 3];
                if (t.beginPath(), o) {
                    var h = o[e],
                        c = 2 * i;
                    t.rect(h[c + 0], h[c + 1], a, s)
                } else t.rect(0, 0, a, s);
                t.closePath(), t.fillShape(this)
            }, e.prototype._useBufferCanvas = function() {
                return t.prototype._useBufferCanvas.call(this, !0)
            }, e.prototype._setInterval = function() {
                var t = this;
                this.interval = setInterval((function() {
                    t._updateIndex()
                }), 1e3 / this.frameRate())
            }, e.prototype.start = function() {
                if (!this.isRunning()) {
                    var t = this.getLayer();
                    this.anim.setLayers(t), this._setInterval(), this.anim.start()
                }
            }, e.prototype.stop = function() {
                this.anim.stop(), clearInterval(this.interval)
            }, e.prototype.isRunning = function() {
                return this.anim.isRunning()
            }, e.prototype._updateIndex = function() {
                var t = this.frameIndex(),
                    e = this.animation();
                t < this.animations()[e].length / 4 - 1 ? this.frameIndex(t + 1) : this.frameIndex(0)
            }, e
        }(s.Shape);
    e.Sprite = d, d.prototype.className = "Sprite", l._registerNode(d), a.Factory.addGetterSetter(d, "animation"), a.Factory.addGetterSetter(d, "animations"), a.Factory.addGetterSetter(d, "frameOffsets"), a.Factory.addGetterSetter(d, "image"), a.Factory.addGetterSetter(d, "frameIndex", 0, c.getNumberValidator()), a.Factory.addGetterSetter(d, "frameRate", 17, c.getNumberValidator()), a.Factory.backCompat(d, {
        index: "frameIndex",
        getIndex: "getFrameIndex",
        setIndex: "setFrameIndex"
    }), o.Collection.mapMethods(d)
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Star = void 0;
    var o = i(3),
        a = i(0),
        s = i(7),
        h = i(2),
        c = i(1),
        l = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n(e, t), e.prototype._sceneFunc = function(t) {
                var e = this.innerRadius(),
                    i = this.outerRadius(),
                    r = this.numPoints();
                t.beginPath(), t.moveTo(0, 0 - i);
                for (var n = 1; n < 2 * r; n++) {
                    var o = n % 2 == 0 ? i : e,
                        a = o * Math.sin(n * Math.PI / r),
                        s = -1 * o * Math.cos(n * Math.PI / r);
                    t.lineTo(a, s)
                }
                t.closePath(), t.fillStrokeShape(this)
            }, e.prototype.getWidth = function() {
                return 2 * this.outerRadius()
            }, e.prototype.getHeight = function() {
                return 2 * this.outerRadius()
            }, e.prototype.setWidth = function(t) {
                this.outerRadius(t / 2)
            }, e.prototype.setHeight = function(t) {
                this.outerRadius(t / 2)
            }, e
        }(s.Shape);
    e.Star = l, l.prototype.className = "Star", l.prototype._centroid = !0, l.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"], c._registerNode(l), a.Factory.addGetterSetter(l, "numPoints", 5, h.getNumberValidator()), a.Factory.addGetterSetter(l, "innerRadius", 0, h.getNumberValidator()), a.Factory.addGetterSetter(l, "outerRadius", 0, h.getNumberValidator()), o.Collection.mapMethods(l)
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.TextPath = void 0;
    var o = i(3),
        a = i(0),
        s = i(7),
        h = i(24),
        c = i(26),
        l = i(2),
        d = i(1);

    function u(t) {
        t.fillText(this.partialText, 0, 0)
    }

    function p(t) {
        t.strokeText(this.partialText, 0, 0)
    }
    var f = function(t) {
        function e(e) {
            var i = t.call(this, e) || this;
            return i.dummyCanvas = o.Util.createCanvasElement(), i.dataArray = [], i.dataArray = h.Path.parsePathData(i.attrs.data), i.on("dataChange.konva", (function() {
                this.dataArray = h.Path.parsePathData(this.attrs.data), this._setTextData()
            })), i.on("textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva", i._setTextData), e && e.getKerning && (o.Util.warn('getKerning TextPath API is deprecated. Please use "kerningFunc" instead.'), i.kerningFunc(e.getKerning)), i._setTextData(), i
        }
        return n(e, t), e.prototype._sceneFunc = function(t) {
            t.setAttr("font", this._getContextFont()), t.setAttr("textBaseline", this.textBaseline()), t.setAttr("textAlign", "left"), t.save();
            var e = this.textDecoration(),
                i = this.fill(),
                r = this.fontSize(),
                n = this.glyphInfo;
            "underline" === e && t.beginPath();
            for (var o = 0; o < n.length; o++) {
                t.save();
                var a = n[o].p0;
                t.translate(a.x, a.y), t.rotate(n[o].rotation), this.partialText = n[o].text, t.fillStrokeShape(this), "underline" === e && (0 === o && t.moveTo(0, r / 2 + 1), t.lineTo(r, r / 2 + 1)), t.restore()
            }
            "underline" === e && (t.strokeStyle = i, t.lineWidth = r / 20, t.stroke()), t.restore()
        }, e.prototype._hitFunc = function(t) {
            t.beginPath();
            var e = this.glyphInfo;
            if (e.length >= 1) {
                var i = e[0].p0;
                t.moveTo(i.x, i.y)
            }
            for (var r = 0; r < e.length; r++) {
                var n = e[r].p1;
                t.lineTo(n.x, n.y)
            }
            t.setAttr("lineWidth", this.fontSize()), t.setAttr("strokeStyle", this.colorKey), t.stroke()
        }, e.prototype.getTextWidth = function() {
            return this.textWidth
        }, e.prototype.getTextHeight = function() {
            return o.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."), this.textHeight
        }, e.prototype.setText = function(t) {
            return c.Text.prototype.setText.call(this, t)
        }, e.prototype._getContextFont = function() {
            return c.Text.prototype._getContextFont.call(this)
        }, e.prototype._getTextSize = function(t) {
            var e = this.dummyCanvas.getContext("2d");
            e.save(), e.font = this._getContextFont();
            var i = e.measureText(t);
            return e.restore(), {
                width: i.width,
                height: parseInt(this.attrs.fontSize, 10)
            }
        }, e.prototype._setTextData = function() {
            var t = this,
                e = this._getTextSize(this.attrs.text),
                i = this.letterSpacing(),
                r = this.align(),
                n = this.kerningFunc();
            this.textWidth = e.width, this.textHeight = e.height;
            var o = Math.max(this.textWidth + ((this.attrs.text || "").length - 1) * i, 0);
            this.glyphInfo = [];
            for (var a = 0, s = 0; s < t.dataArray.length; s++) t.dataArray[s].pathLength > 0 && (a += t.dataArray[s].pathLength);
            var l = 0;
            "center" === r && (l = Math.max(0, a / 2 - o / 2)), "right" === r && (l = Math.max(0, a - o));
            for (var d, u, p, f = c.stringToArray(this.text()), g = this.text().split(" ").length - 1, y = -1, v = 0, _ = function() {
                    v = 0;
                    for (var e = t.dataArray, i = y + 1; i < e.length; i++) {
                        if (e[i].pathLength > 0) return y = i, e[i];
                        "M" === e[i].command && (d = {
                            x: e[i].points[0],
                            y: e[i].points[1]
                        })
                    }
                    return {}
                }, m = function(e) {
                    var n = t._getTextSize(e).width + i;
                    " " === e && "justify" === r && (n += (a - o) / g);
                    var s = 0,
                        c = 0;
                    for (u = void 0; Math.abs(n - s) / n > .01 && c < 20;) {
                        c++;
                        for (var l = s; void 0 === p;)(p = _()) && l + p.pathLength < n && (l += p.pathLength, p = void 0);
                        if (p === {} || void 0 === d) return;
                        var f = !1;
                        switch (p.command) {
                            case "L":
                                h.Path.getLineLength(d.x, d.y, p.points[0], p.points[1]) > n ? u = h.Path.getPointOnLine(n, d.x, d.y, p.points[0], p.points[1], d.x, d.y) : p = void 0;
                                break;
                            case "A":
                                var y = p.points[4],
                                    m = p.points[5],
                                    b = p.points[4] + m;
                                0 === v ? v = y + 1e-8 : n > s ? v += Math.PI / 180 * m / Math.abs(m) : v -= Math.PI / 360 * m / Math.abs(m), (m < 0 && v < b || m >= 0 && v > b) && (v = b, f = !0), u = h.Path.getPointOnEllipticalArc(p.points[0], p.points[1], p.points[2], p.points[3], v, p.points[6]);
                                break;
                            case "C":
                                0 === v ? v = n > p.pathLength ? 1e-8 : n / p.pathLength : n > s ? v += (n - s) / p.pathLength / 2 : v = Math.max(v - (s - n) / p.pathLength / 2, 0), v > 1 && (v = 1, f = !0), u = h.Path.getPointOnCubicBezier(v, p.start.x, p.start.y, p.points[0], p.points[1], p.points[2], p.points[3], p.points[4], p.points[5]);
                                break;
                            case "Q":
                                0 === v ? v = n / p.pathLength : n > s ? v += (n - s) / p.pathLength : v -= (s - n) / p.pathLength, v > 1 && (v = 1, f = !0), u = h.Path.getPointOnQuadraticBezier(v, p.start.x, p.start.y, p.points[0], p.points[1], p.points[2], p.points[3])
                        }
                        void 0 !== u && (s = h.Path.getLineLength(d.x, d.y, u.x, u.y)), f && (f = !1, p = void 0)
                    }
                }, b = l / (t._getTextSize("C").width + i) - 1, x = 0; x < b && (m("C"), void 0 !== d && void 0 !== u); x++) d = u;
            for (var S = 0; S < f.length && (m(f[S]), void 0 !== d && void 0 !== u); S++) {
                var C = h.Path.getLineLength(d.x, d.y, u.x, u.y),
                    w = 0;
                if (n) try {
                    w = n(f[S - 1], f[S]) * this.fontSize()
                } catch (t) {
                    w = 0
                }
                d.x += w, u.x += w, this.textWidth += w;
                var P = h.Path.getPointOnLine(w + C / 2, d.x, d.y, u.x, u.y),
                    A = Math.atan2(u.y - d.y, u.x - d.x);
                this.glyphInfo.push({
                    transposeX: P.x,
                    transposeY: P.y,
                    text: f[S],
                    rotation: A,
                    p0: d,
                    p1: u
                }), d = u
            }
        }, e.prototype.getSelfRect = function() {
            if (!this.glyphInfo.length) return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            var t = [];
            this.glyphInfo.forEach((function(e) {
                t.push(e.p0.x), t.push(e.p0.y), t.push(e.p1.x), t.push(e.p1.y)
            }));
            for (var e, i, r = t[0] || 0, n = t[0] || 0, o = t[1] || 0, a = t[1] || 0, s = 0; s < t.length / 2; s++) e = t[2 * s], i = t[2 * s + 1], r = Math.min(r, e), n = Math.max(n, e), o = Math.min(o, i), a = Math.max(a, i);
            var h = this.fontSize();
            return {
                x: r - h / 2,
                y: o - h / 2,
                width: n - r + h,
                height: a - o + h
            }
        }, e
    }(s.Shape);
    e.TextPath = f, f.prototype._fillFunc = u, f.prototype._strokeFunc = p, f.prototype._fillFuncHit = u, f.prototype._strokeFuncHit = p, f.prototype.className = "TextPath", f.prototype._attrsAffectingSize = ["text", "fontSize", "data"], d._registerNode(f), a.Factory.addGetterSetter(f, "data"), a.Factory.addGetterSetter(f, "fontFamily", "Arial"), a.Factory.addGetterSetter(f, "fontSize", 12, l.getNumberValidator()), a.Factory.addGetterSetter(f, "fontStyle", "normal"), a.Factory.addGetterSetter(f, "align", "left"), a.Factory.addGetterSetter(f, "letterSpacing", 0, l.getNumberValidator()), a.Factory.addGetterSetter(f, "textBaseline", "middle"), a.Factory.addGetterSetter(f, "fontVariant", "normal"), a.Factory.addGetterSetter(f, "text", ""), a.Factory.addGetterSetter(f, "textDecoration", null), a.Factory.addGetterSetter(f, "kerningFunc", null), o.Collection.mapMethods(f)
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
            return (r = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(t, e) {
                    t.__proto__ = e
                } || function(t, e) {
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                })(t, e)
        }, function(t, e) {
            function i() {
                this.constructor = t
            }
            r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
        }),
        o = this && this.__assign || function() {
            return (o = Object.assign || function(t) {
                for (var e, i = 1, r = arguments.length; i < r; i++)
                    for (var n in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t
            }).apply(this, arguments)
        };
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Transformer = void 0;
    var a = i(3),
        s = i(0),
        h = i(5),
        c = i(7),
        l = i(25),
        d = i(17),
        u = i(1),
        p = i(2),
        f = i(1),
        g = ["resizeEnabledChange", "rotateAnchorOffsetChange", "rotateEnabledChange", "enabledAnchorsChange", "anchorSizeChange", "borderEnabledChange", "borderStrokeChange", "borderStrokeWidthChange", "borderDashChange", "anchorStrokeChange", "anchorStrokeWidthChange", "anchorFillChange", "anchorCornerRadiusChange", "ignoreStrokeChange"].map((function(t) {
            return t + ".tr-konva"
        })).join(" "),
        y = ["widthChange", "heightChange", "scaleXChange", "scaleYChange", "skewXChange", "skewYChange", "rotationChange", "offsetXChange", "offsetYChange", "transformsEnabledChange", "strokeWidthChange"].map((function(t) {
            return t + ".tr-konva"
        })).join(" "),
        v = {
            "top-left": -45,
            "top-center": 0,
            "top-right": 45,
            "middle-right": -90,
            "middle-left": 90,
            "bottom-left": -135,
            "bottom-center": 180,
            "bottom-right": 135
        },
        _ = "ontouchstart" in u.Konva._global;
    var m = ["top-left", "top-center", "top-right", "middle-right", "middle-left", "bottom-left", "bottom-center", "bottom-right"];

    function b(t, e, i) {
        var r = i.x + (t.x - i.x) * Math.cos(e) - (t.y - i.y) * Math.sin(e),
            n = i.y + (t.x - i.x) * Math.sin(e) + (t.y - i.y) * Math.cos(e);
        return o(o({}, t), {
            rotation: t.rotation + e,
            x: r,
            y: n
        })
    }

    function x(t, e) {
        return b(t, e, function(t) {
            return {
                x: t.x + t.width / 2 * Math.cos(t.rotation) + t.height / 2 * Math.sin(-t.rotation),
                y: t.y + t.height / 2 * Math.cos(t.rotation) + t.width / 2 * Math.sin(t.rotation)
            }
        }(t))
    }
    var S = function(t) {
        function e(e) {
            var i = t.call(this, e) || this;
            return i._transforming = !1, i._createElements(), i._handleMouseMove = i._handleMouseMove.bind(i), i._handleMouseUp = i._handleMouseUp.bind(i), i.update = i.update.bind(i), i.on(g, i.update), i.getNode() && i.update(), i
        }
        return n(e, t), e.prototype.attachTo = function(t) {
            return this.setNode(t), this
        }, e.prototype.setNode = function(t) {
            return a.Util.warn("tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead."), this.setNodes([t])
        }, e.prototype.getNode = function() {
            return this._nodes && this._nodes[0]
        }, e.prototype.setNodes = function(t) {
            var e = this;
            return void 0 === t && (t = []), this._nodes && this._nodes.length && this.detach(), this._nodes = t, 1 === t.length ? this.rotation(t[0].getAbsoluteRotation()) : this.rotation(0), this._nodes.forEach((function(t) {
                var i = t._attrsAffectingSize.map((function(t) {
                        return t + "Change.tr-konva"
                    })).join(" "),
                    r = function() {
                        1 === e.nodes().length && e.rotation(e.nodes()[0].getAbsoluteRotation()), e._resetTransformCache(), e._transforming || e.isDragging() || e.update()
                    };
                t.on(i, r), t.on(y, r), t.on("_clearTransformCache.tr-konva", r), t.on("xChange.tr-konva yChange.tr-konva", r), e._proxyDrag(t)
            })), this._resetTransformCache(), !!this.findOne(".top-left") && this.update(), this
        }, e.prototype._proxyDrag = function(t) {
            var e, i = this;
            t.on("dragstart.tr-konva", (function(r) {
                e = t.getAbsolutePosition(), i.isDragging() || t === i.findOne(".back") || i.startDrag(r, !1)
            })), t.on("dragmove.tr-konva", (function(r) {
                if (e) {
                    var n = t.getAbsolutePosition(),
                        o = n.x - e.x,
                        a = n.y - e.y;
                    i.nodes().forEach((function(e) {
                        if (e !== t && !e.isDragging()) {
                            var i = e.getAbsolutePosition();
                            e.setAbsolutePosition({
                                x: i.x + o,
                                y: i.y + a
                            }), e.startDrag(r)
                        }
                    })), e = null
                }
            }))
        }, e.prototype.getNodes = function() {
            return this._nodes || []
        }, e.prototype.getActiveAnchor = function() {
            return this._movingAnchorName
        }, e.prototype.detach = function() {
            this._nodes && this._nodes.forEach((function(t) {
                t.off(".tr-konva")
            })), this._nodes = [], this._resetTransformCache()
        }, e.prototype._resetTransformCache = function() {
            this._clearCache("nodesRect"), this._clearCache("transform"), this._clearSelfAndDescendantCache("absoluteTransform")
        }, e.prototype._getNodeRect = function() {
            return this._getCache("nodesRect", this.__getNodeRect)
        }, e.prototype.__getNodeShape = function(t, e, i) {
            void 0 === e && (e = this.rotation());
            var r = t.getClientRect({
                    skipTransform: !0,
                    skipShadow: !0,
                    skipStroke: this.ignoreStroke()
                }),
                n = t.getAbsoluteScale(i),
                o = t.getAbsolutePosition(i),
                a = r.x * n.x - t.offsetX() * n.x,
                s = r.y * n.y - t.offsetY() * n.y,
                h = (u.Konva.getAngle(t.getAbsoluteRotation()) + 2 * Math.PI) % (2 * Math.PI);
            return b({
                x: o.x + a * Math.cos(h) + s * Math.sin(-h),
                y: o.y + s * Math.cos(h) + a * Math.sin(h),
                width: r.width * n.x,
                height: r.height * n.y,
                rotation: h
            }, -u.Konva.getAngle(e), {
                x: 0,
                y: 0
            })
        }, e.prototype.__getNodeRect = function() {
            var t = this;
            if (!this.getNode()) return {
                x: -1e8,
                y: -1e8,
                width: 0,
                height: 0,
                rotation: 0
            };
            var e = [];
            this.nodes().map((function(i) {
                var r = i.getClientRect({
                        skipTransform: !0,
                        skipShadow: !0,
                        skipStroke: t.ignoreStroke()
                    }),
                    n = [{
                        x: r.x,
                        y: r.y
                    }, {
                        x: r.x + r.width,
                        y: r.y
                    }, {
                        x: r.x + r.width,
                        y: r.y + r.height
                    }, {
                        x: r.x,
                        y: r.y + r.height
                    }],
                    o = i.getAbsoluteTransform();
                n.forEach((function(t) {
                    var i = o.point(t);
                    e.push(i)
                }))
            }));
            var i, r, n, o, s = new a.Transform;
            s.rotate(-u.Konva.getAngle(this.rotation())), e.forEach((function(t) {
                var e = s.point(t);
                void 0 === i && (i = n = e.x, r = o = e.y), i = Math.min(i, e.x), r = Math.min(r, e.y), n = Math.max(n, e.x), o = Math.max(o, e.y)
            })), s.invert();
            var h = s.point({
                x: i,
                y: r
            });
            return {
                x: h.x,
                y: h.y,
                width: n - i,
                height: o - r,
                rotation: u.Konva.getAngle(this.rotation())
            }
        }, e.prototype.getX = function() {
            return this._getNodeRect().x
        }, e.prototype.getY = function() {
            return this._getNodeRect().y
        }, e.prototype.getWidth = function() {
            return this._getNodeRect().width
        }, e.prototype.getHeight = function() {
            return this._getNodeRect().height
        }, e.prototype._createElements = function() {
            this._createBack(), m.forEach(function(t) {
                this._createAnchor(t)
            }.bind(this)), this._createAnchor("rotater")
        }, e.prototype._createAnchor = function(t) {
            var e = this,
                i = new l.Rect({
                    stroke: "rgb(0, 161, 255)",
                    fill: "white",
                    strokeWidth: 1,
                    name: t + " _anchor",
                    dragDistance: 0,
                    draggable: !0,
                    hitStrokeWidth: _ ? 10 : "auto"
                }),
                r = this;
            i.on("mousedown touchstart", (function(t) {
                r._handleMouseDown(t)
            })), i.on("dragstart", (function(t) {
                i.stopDrag(), t.cancelBubble = !0
            })), i.on("dragend", (function(t) {
                t.cancelBubble = !0
            })), i.on("mouseenter", (function() {
                var r = u.Konva.getAngle(e.rotation()),
                    n = function(t, e) {
                        if ("rotater" === t) return "crosshair";
                        e += a.Util._degToRad(v[t] || 0);
                        var i = (a.Util._radToDeg(e) % 360 + 360) % 360;
                        return a.Util._inRange(i, 337.5, 360) || a.Util._inRange(i, 0, 22.5) ? "ns-resize" : a.Util._inRange(i, 22.5, 67.5) ? "nesw-resize" : a.Util._inRange(i, 67.5, 112.5) ? "ew-resize" : a.Util._inRange(i, 112.5, 157.5) ? "nwse-resize" : a.Util._inRange(i, 157.5, 202.5) ? "ns-resize" : a.Util._inRange(i, 202.5, 247.5) ? "nesw-resize" : a.Util._inRange(i, 247.5, 292.5) ? "ew-resize" : a.Util._inRange(i, 292.5, 337.5) ? "nwse-resize" : (a.Util.error("Transformer has unknown angle for cursor detection: " + i), "pointer")
                    }(t, r);
                i.getStage().content.style.cursor = n, e._cursorChange = !0
            })), i.on("mouseout", (function() {
                i.getStage().content.style.cursor = "", e._cursorChange = !1
            })), this.add(i)
        }, e.prototype._createBack = function() {
            var t = this,
                e = new c.Shape({
                    name: "back",
                    width: 0,
                    height: 0,
                    draggable: !0,
                    sceneFunc: function(t) {
                        var e = this.getParent(),
                            i = e.padding();
                        t.beginPath(), t.rect(-i, -i, this.width() + 2 * i, this.height() + 2 * i), t.moveTo(this.width() / 2, -i), e.rotateEnabled() && t.lineTo(this.width() / 2, -e.rotateAnchorOffset() * a.Util._sign(this.height()) - i), t.fillStrokeShape(this)
                    },
                    hitFunc: function(e, i) {
                        if (t.shouldOverdrawWholeArea()) {
                            var r = t.padding();
                            e.beginPath(), e.rect(-r, -r, i.width() + 2 * r, i.height() + 2 * r), e.fillStrokeShape(i)
                        }
                    }
                });
            this.add(e), this._proxyDrag(e), e.on("dragstart", (function(t) {
                t.cancelBubble = !0
            })), e.on("dragmove", (function(t) {
                t.cancelBubble = !0
            })), e.on("dragend", (function(t) {
                t.cancelBubble = !0
            }))
        }, e.prototype._handleMouseDown = function(t) {
            this._movingAnchorName = t.target.name().split(" ")[0];
            var e = this._getNodeRect(),
                i = e.width,
                r = e.height,
                n = Math.sqrt(Math.pow(i, 2) + Math.pow(r, 2));
            this.sin = Math.abs(r / n), this.cos = Math.abs(i / n), window.addEventListener("mousemove", this._handleMouseMove), window.addEventListener("touchmove", this._handleMouseMove), window.addEventListener("mouseup", this._handleMouseUp, !0), window.addEventListener("touchend", this._handleMouseUp, !0), this._transforming = !0;
            var o = t.target.getAbsolutePosition(),
                a = t.target.getStage().getPointerPosition();
            this._anchorDragOffset = {
                x: a.x - o.x,
                y: a.y - o.y
            }, this._fire("transformstart", {
                evt: t,
                target: this.getNode()
            }), this._nodes.forEach((function(e) {
                e._fire("transformstart", {
                    evt: t,
                    target: e
                })
            }))
        }, e.prototype._handleMouseMove = function(t) {
            var e, i, r, n = this.findOne("." + this._movingAnchorName),
                o = n.getStage();
            o.setPointersPositions(t);
            var a = o.getPointerPosition(),
                s = {
                    x: a.x - this._anchorDragOffset.x,
                    y: a.y - this._anchorDragOffset.y
                },
                h = n.getAbsolutePosition();
            n.setAbsolutePosition(s);
            var c = n.getAbsolutePosition();
            if (h.x !== c.x || h.y !== c.y)
                if ("rotater" !== this._movingAnchorName) {
                    var l = this.keepRatio() || t.shiftKey,
                        d = this.centeredScaling() || t.altKey;
                    if ("top-left" === this._movingAnchorName) {
                        if (l) {
                            var p = d ? {
                                x: this.width() / 2,
                                y: this.height() / 2
                            } : {
                                x: this.findOne(".bottom-right").x(),
                                y: this.findOne(".bottom-right").y()
                            };
                            r = Math.sqrt(Math.pow(p.x - n.x(), 2) + Math.pow(p.y - n.y(), 2));
                            var f = this.findOne(".top-left").x() > p.x ? -1 : 1,
                                g = this.findOne(".top-left").y() > p.y ? -1 : 1;
                            e = r * this.cos * f, i = r * this.sin * g, this.findOne(".top-left").x(p.x - e), this.findOne(".top-left").y(p.y - i)
                        }
                    } else if ("top-center" === this._movingAnchorName) this.findOne(".top-left").y(n.y());
                    else if ("top-right" === this._movingAnchorName) {
                        if (l) {
                            p = d ? {
                                x: this.width() / 2,
                                y: this.height() / 2
                            } : {
                                x: this.findOne(".bottom-left").x(),
                                y: this.findOne(".bottom-left").y()
                            };
                            r = Math.sqrt(Math.pow(n.x() - p.x, 2) + Math.pow(p.y - n.y(), 2));
                            f = this.findOne(".top-right").x() < p.x ? -1 : 1, g = this.findOne(".top-right").y() > p.y ? -1 : 1;
                            e = r * this.cos * f, i = r * this.sin * g, this.findOne(".top-right").x(p.x + e), this.findOne(".top-right").y(p.y - i)
                        }
                        var y = n.position();
                        this.findOne(".top-left").y(y.y), this.findOne(".bottom-right").x(y.x)
                    } else if ("middle-left" === this._movingAnchorName) this.findOne(".top-left").x(n.x());
                    else if ("middle-right" === this._movingAnchorName) this.findOne(".bottom-right").x(n.x());
                    else if ("bottom-left" === this._movingAnchorName) {
                        if (l) {
                            p = d ? {
                                x: this.width() / 2,
                                y: this.height() / 2
                            } : {
                                x: this.findOne(".top-right").x(),
                                y: this.findOne(".top-right").y()
                            };
                            r = Math.sqrt(Math.pow(p.x - n.x(), 2) + Math.pow(n.y() - p.y, 2));
                            f = p.x < n.x() ? -1 : 1, g = n.y() < p.y ? -1 : 1;
                            e = r * this.cos * f, i = r * this.sin * g, n.x(p.x - e), n.y(p.y + i)
                        }
                        y = n.position(), this.findOne(".top-left").x(y.x), this.findOne(".bottom-right").y(y.y)
                    } else if ("bottom-center" === this._movingAnchorName) this.findOne(".bottom-right").y(n.y());
                    else if ("bottom-right" === this._movingAnchorName) {
                        if (l) {
                            p = d ? {
                                x: this.width() / 2,
                                y: this.height() / 2
                            } : {
                                x: this.findOne(".top-left").x(),
                                y: this.findOne(".top-left").y()
                            };
                            r = Math.sqrt(Math.pow(n.x() - p.x, 2) + Math.pow(n.y() - p.y, 2));
                            f = this.findOne(".bottom-right").x() < p.x ? -1 : 1, g = this.findOne(".bottom-right").y() < p.y ? -1 : 1;
                            e = r * this.cos * f, i = r * this.sin * g, this.findOne(".bottom-right").x(p.x + e), this.findOne(".bottom-right").y(p.y + i)
                        }
                    } else console.error(new Error("Wrong position argument of selection resizer: " + this._movingAnchorName));
                    if (d = this.centeredScaling() || t.altKey) {
                        var v = this.findOne(".top-left"),
                            _ = this.findOne(".bottom-right"),
                            m = v.x(),
                            b = v.y(),
                            S = this.getWidth() - _.x(),
                            C = this.getHeight() - _.y();
                        _.move({
                            x: -m,
                            y: -b
                        }), v.move({
                            x: S,
                            y: C
                        })
                    }
                    var w = this.findOne(".top-left").getAbsolutePosition();
                    e = w.x, i = w.y;
                    var P = this.findOne(".bottom-right").x() - this.findOne(".top-left").x(),
                        A = this.findOne(".bottom-right").y() - this.findOne(".top-left").y();
                    this._fitNodesInto({
                        x: e,
                        y: i,
                        width: P,
                        height: A,
                        rotation: u.Konva.getAngle(this.rotation())
                    }, t)
                } else {
                    var T = this._getNodeRect();
                    e = n.x() - T.width / 2, i = -n.y() + T.height / 2;
                    var O = Math.atan2(-i, e) + Math.PI / 2;
                    T.height < 0 && (O -= Math.PI);
                    var k = u.Konva.getAngle(this.rotation()) + O,
                        M = u.Konva.getAngle(this.rotationSnapTolerance()),
                        F = x(T, function(t, e, i) {
                            for (var r = e, n = 0; n < t.length; n++) {
                                var o = u.Konva.getAngle(t[n]),
                                    a = Math.abs(o - e) % (2 * Math.PI);
                                Math.min(a, 2 * Math.PI - a) < i && (r = o)
                            }
                            return r
                        }(this.rotationSnaps(), k, M) - T.rotation);
                    this._fitNodesInto(F, t)
                }
        }, e.prototype._handleMouseUp = function(t) {
            this._removeEvents(t)
        }, e.prototype.getAbsoluteTransform = function() {
            return this.getTransform()
        }, e.prototype._removeEvents = function(t) {
            if (this._transforming) {
                this._transforming = !1, window.removeEventListener("mousemove", this._handleMouseMove), window.removeEventListener("touchmove", this._handleMouseMove), window.removeEventListener("mouseup", this._handleMouseUp, !0), window.removeEventListener("touchend", this._handleMouseUp, !0);
                var e = this.getNode();
                this._fire("transformend", {
                    evt: t,
                    target: e
                }), e && this._nodes.forEach((function(e) {
                    e._fire("transformend", {
                        evt: t,
                        target: e
                    })
                })), this._movingAnchorName = null
            }
        }, e.prototype._fitNodesInto = function(t, e) {
            var i = this,
                r = this._getNodeRect();
            if (a.Util._inRange(t.width, 2 * -this.padding() - 1, 1)) this.update();
            else if (a.Util._inRange(t.height, 2 * -this.padding() - 1, 1)) this.update();
            else {
                var n = new a.Transform;
                if (n.rotate(u.Konva.getAngle(this.rotation())), this._movingAnchorName && t.width < 0 && this._movingAnchorName.indexOf("left") >= 0) {
                    var o = n.point({
                        x: 2 * -this.padding(),
                        y: 0
                    });
                    t.x += o.x, t.y += o.y, t.width += 2 * this.padding(), this._movingAnchorName = this._movingAnchorName.replace("left", "right"), this._anchorDragOffset.x -= o.x, this._anchorDragOffset.y -= o.y
                } else if (this._movingAnchorName && t.width < 0 && this._movingAnchorName.indexOf("right") >= 0) {
                    o = n.point({
                        x: 2 * this.padding(),
                        y: 0
                    });
                    this._movingAnchorName = this._movingAnchorName.replace("right", "left"), this._anchorDragOffset.x -= o.x, this._anchorDragOffset.y -= o.y, t.width += 2 * this.padding()
                }
                if (this._movingAnchorName && t.height < 0 && this._movingAnchorName.indexOf("top") >= 0) {
                    o = n.point({
                        x: 0,
                        y: 2 * -this.padding()
                    });
                    t.x += o.x, t.y += o.y, this._movingAnchorName = this._movingAnchorName.replace("top", "bottom"), this._anchorDragOffset.x -= o.x, this._anchorDragOffset.y -= o.y, t.height += 2 * this.padding()
                } else if (this._movingAnchorName && t.height < 0 && this._movingAnchorName.indexOf("bottom") >= 0) {
                    o = n.point({
                        x: 0,
                        y: 2 * this.padding()
                    });
                    this._movingAnchorName = this._movingAnchorName.replace("bottom", "top"), this._anchorDragOffset.x -= o.x, this._anchorDragOffset.y -= o.y, t.height += 2 * this.padding()
                }
                if (this.boundBoxFunc()) {
                    var s = this.boundBoxFunc()(r, t);
                    s ? t = s : a.Util.warn("boundBoxFunc returned falsy. You should return new bound rect from it!")
                }
                var h = new a.Transform;
                h.translate(r.x, r.y), h.rotate(r.rotation), h.scale(r.width / 1e7, r.height / 1e7);
                var c = new a.Transform;
                c.translate(t.x, t.y), c.rotate(t.rotation), c.scale(t.width / 1e7, t.height / 1e7);
                var l = c.multiply(h.invert());
                this._nodes.forEach((function(t) {
                    var r, n = t.getParent().getAbsoluteTransform(),
                        o = t.getTransform().copy();
                    o.translate(t.offsetX(), t.offsetY());
                    var s = new a.Transform;
                    s.multiply(n.copy().invert()).multiply(l).multiply(n).multiply(o);
                    var h = s.decompose();
                    t.setAttrs(h), i._fire("transform", {
                        evt: e,
                        target: t
                    }), t._fire("transform", {
                        evt: e,
                        target: t
                    }), null === (r = t.getLayer()) || void 0 === r || r.batchDraw()
                })), this.rotation(a.Util._getRotation(t.rotation)), this._resetTransformCache(), this.update(), this.getLayer().batchDraw()
            }
        }, e.prototype.forceUpdate = function() {
            this._resetTransformCache(), this.update()
        }, e.prototype._batchChangeChild = function(t, e) {
            this.findOne(t).setAttrs(e)
        }, e.prototype.update = function() {
            var t, e = this,
                i = this._getNodeRect();
            this.rotation(a.Util._getRotation(i.rotation));
            var r = i.width,
                n = i.height,
                o = this.enabledAnchors(),
                s = this.resizeEnabled(),
                h = this.padding(),
                c = this.anchorSize();
            this.find("._anchor").each((function(t) {
                t.setAttrs({
                    width: c,
                    height: c,
                    offsetX: c / 2,
                    offsetY: c / 2,
                    stroke: e.anchorStroke(),
                    strokeWidth: e.anchorStrokeWidth(),
                    fill: e.anchorFill(),
                    cornerRadius: e.anchorCornerRadius()
                })
            })), this._batchChangeChild(".top-left", {
                x: 0,
                y: 0,
                offsetX: c / 2 + h,
                offsetY: c / 2 + h,
                visible: s && o.indexOf("top-left") >= 0
            }), this._batchChangeChild(".top-center", {
                x: r / 2,
                y: 0,
                offsetY: c / 2 + h,
                visible: s && o.indexOf("top-center") >= 0
            }), this._batchChangeChild(".top-right", {
                x: r,
                y: 0,
                offsetX: c / 2 - h,
                offsetY: c / 2 + h,
                visible: s && o.indexOf("top-right") >= 0
            }), this._batchChangeChild(".middle-left", {
                x: 0,
                y: n / 2,
                offsetX: c / 2 + h,
                visible: s && o.indexOf("middle-left") >= 0
            }), this._batchChangeChild(".middle-right", {
                x: r,
                y: n / 2,
                offsetX: c / 2 - h,
                visible: s && o.indexOf("middle-right") >= 0
            }), this._batchChangeChild(".bottom-left", {
                x: 0,
                y: n,
                offsetX: c / 2 + h,
                offsetY: c / 2 - h,
                visible: s && o.indexOf("bottom-left") >= 0
            }), this._batchChangeChild(".bottom-center", {
                x: r / 2,
                y: n,
                offsetY: c / 2 - h,
                visible: s && o.indexOf("bottom-center") >= 0
            }), this._batchChangeChild(".bottom-right", {
                x: r,
                y: n,
                offsetX: c / 2 - h,
                offsetY: c / 2 - h,
                visible: s && o.indexOf("bottom-right") >= 0
            }), this._batchChangeChild(".rotater", {
                x: r / 2,
                y: -this.rotateAnchorOffset() * a.Util._sign(n) - h,
                visible: this.rotateEnabled()
            }), this._batchChangeChild(".back", {
                width: r,
                height: n,
                visible: this.borderEnabled(),
                stroke: this.borderStroke(),
                strokeWidth: this.borderStrokeWidth(),
                dash: this.borderDash(),
                x: 0,
                y: 0
            }), null === (t = this.getLayer()) || void 0 === t || t.batchDraw()
        }, e.prototype.isTransforming = function() {
            return this._transforming
        }, e.prototype.stopTransform = function() {
            if (this._transforming) {
                this._removeEvents();
                var t = this.findOne("." + this._movingAnchorName);
                t && t.stopDrag()
            }
        }, e.prototype.destroy = function() {
            return this.getStage() && this._cursorChange && (this.getStage().content.style.cursor = ""), d.Group.prototype.destroy.call(this), this.detach(), this._removeEvents(), this
        }, e.prototype.toObject = function() {
            return h.Node.prototype.toObject.call(this)
        }, e
    }(d.Group);
    e.Transformer = S, S.prototype.className = "Transformer", f._registerNode(S), s.Factory.addGetterSetter(S, "enabledAnchors", m, (function(t) {
        return t instanceof Array || a.Util.warn("enabledAnchors value should be an array"), t instanceof Array && t.forEach((function(t) {
            -1 === m.indexOf(t) && a.Util.warn("Unknown anchor name: " + t + ". Available names are: " + m.join(", "))
        })), t || []
    })), s.Factory.addGetterSetter(S, "resizeEnabled", !0), s.Factory.addGetterSetter(S, "anchorSize", 10, p.getNumberValidator()), s.Factory.addGetterSetter(S, "rotateEnabled", !0), s.Factory.addGetterSetter(S, "rotationSnaps", []), s.Factory.addGetterSetter(S, "rotateAnchorOffset", 50, p.getNumberValidator()), s.Factory.addGetterSetter(S, "rotationSnapTolerance", 5, p.getNumberValidator()), s.Factory.addGetterSetter(S, "borderEnabled", !0), s.Factory.addGetterSetter(S, "anchorStroke", "rgb(0, 161, 255)"), s.Factory.addGetterSetter(S, "anchorStrokeWidth", 1, p.getNumberValidator()), s.Factory.addGetterSetter(S, "anchorFill", "white"), s.Factory.addGetterSetter(S, "anchorCornerRadius", 0, p.getNumberValidator()), s.Factory.addGetterSetter(S, "borderStroke", "rgb(0, 161, 255)"), s.Factory.addGetterSetter(S, "borderStrokeWidth", 1, p.getNumberValidator()), s.Factory.addGetterSetter(S, "borderDash"), s.Factory.addGetterSetter(S, "keepRatio", !0), s.Factory.addGetterSetter(S, "centeredScaling", !1), s.Factory.addGetterSetter(S, "ignoreStroke", !1), s.Factory.addGetterSetter(S, "padding", 0, p.getNumberValidator()), s.Factory.addGetterSetter(S, "node"), s.Factory.addGetterSetter(S, "nodes"), s.Factory.addGetterSetter(S, "boundBoxFunc"), s.Factory.addGetterSetter(S, "shouldOverdrawWholeArea", !1), s.Factory.backCompat(S, {
        lineEnabled: "borderEnabled",
        rotateHandlerOffset: "rotateAnchorOffset",
        enabledHandlers: "enabledAnchors"
    }), a.Collection.mapMethods(S)
}, function(t, e, i) {
    "use strict";
    var r, n = this && this.__extends || (r = function(t, e) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            })(t, e)
    }, function(t, e) {
        function i() {
            this.constructor = t
        }
        r(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    });
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Wedge = void 0;
    var o = i(3),
        a = i(0),
        s = i(7),
        h = i(1),
        c = i(2),
        l = i(1),
        d = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n(e, t), e.prototype._sceneFunc = function(t) {
                t.beginPath(), t.arc(0, 0, this.radius(), 0, h.Konva.getAngle(this.angle()), this.clockwise()), t.lineTo(0, 0), t.closePath(), t.fillStrokeShape(this)
            }, e.prototype.getWidth = function() {
                return 2 * this.radius()
            }, e.prototype.getHeight = function() {
                return 2 * this.radius()
            }, e.prototype.setWidth = function(t) {
                this.radius(t / 2)
            }, e.prototype.setHeight = function(t) {
                this.radius(t / 2)
            }, e
        }(s.Shape);
    e.Wedge = d, d.prototype.className = "Wedge", d.prototype._centroid = !0, d.prototype._attrsAffectingSize = ["radius"], l._registerNode(d), a.Factory.addGetterSetter(d, "radius", 0, c.getNumberValidator()), a.Factory.addGetterSetter(d, "angle", 0, c.getNumberValidator()), a.Factory.addGetterSetter(d, "clockwise", !1), a.Factory.backCompat(d, {
        angleDeg: "angle",
        getAngleDeg: "getAngle",
        setAngleDeg: "setAngle"
    }), o.Collection.mapMethods(d)
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Blur = void 0;
    var r = i(0),
        n = i(5),
        o = i(2);

    function a() {
        this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null
    }
    var s = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259],
        h = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
    e.Blur = function(t) {
        var e = Math.round(this.blurRadius());
        e > 0 && function(t, e) {
            var i, r, n, o, c, l, d, u, p, f, g, y, v, _, m, b, x, S, C, w, P, A, T, O, k = t.data,
                M = t.width,
                F = t.height,
                G = e + e + 1,
                D = M - 1,
                N = F - 1,
                R = e + 1,
                E = R * (R + 1) / 2,
                L = new a,
                I = null,
                U = L,
                j = null,
                B = null,
                V = s[e],
                z = h[e];
            for (n = 1; n < G; n++) U = U.next = new a, n === R && (I = U);
            for (U.next = L, d = l = 0, r = 0; r < F; r++) {
                for (b = x = S = C = u = p = f = g = 0, y = R * (w = k[l]), v = R * (P = k[l + 1]), _ = R * (A = k[l + 2]), m = R * (T = k[l + 3]), u += E * w, p += E * P, f += E * A, g += E * T, U = L, n = 0; n < R; n++) U.r = w, U.g = P, U.b = A, U.a = T, U = U.next;
                for (n = 1; n < R; n++) o = l + ((D < n ? D : n) << 2), u += (U.r = w = k[o]) * (O = R - n), p += (U.g = P = k[o + 1]) * O, f += (U.b = A = k[o + 2]) * O, g += (U.a = T = k[o + 3]) * O, b += w, x += P, S += A, C += T, U = U.next;
                for (j = L, B = I, i = 0; i < M; i++) k[l + 3] = T = g * V >> z, 0 !== T ? (T = 255 / T, k[l] = (u * V >> z) * T, k[l + 1] = (p * V >> z) * T, k[l + 2] = (f * V >> z) * T) : k[l] = k[l + 1] = k[l + 2] = 0, u -= y, p -= v, f -= _, g -= m, y -= j.r, v -= j.g, _ -= j.b, m -= j.a, o = d + ((o = i + e + 1) < D ? o : D) << 2, u += b += j.r = k[o], p += x += j.g = k[o + 1], f += S += j.b = k[o + 2], g += C += j.a = k[o + 3], j = j.next, y += w = B.r, v += P = B.g, _ += A = B.b, m += T = B.a, b -= w, x -= P, S -= A, C -= T, B = B.next, l += 4;
                d += M
            }
            for (i = 0; i < M; i++) {
                for (x = S = C = b = p = f = g = u = 0, y = R * (w = k[l = i << 2]), v = R * (P = k[l + 1]), _ = R * (A = k[l + 2]), m = R * (T = k[l + 3]), u += E * w, p += E * P, f += E * A, g += E * T, U = L, n = 0; n < R; n++) U.r = w, U.g = P, U.b = A, U.a = T, U = U.next;
                for (c = M, n = 1; n <= e; n++) l = c + i << 2, u += (U.r = w = k[l]) * (O = R - n), p += (U.g = P = k[l + 1]) * O, f += (U.b = A = k[l + 2]) * O, g += (U.a = T = k[l + 3]) * O, b += w, x += P, S += A, C += T, U = U.next, n < N && (c += M);
                for (l = i, j = L, B = I, r = 0; r < F; r++) k[(o = l << 2) + 3] = T = g * V >> z, T > 0 ? (T = 255 / T, k[o] = (u * V >> z) * T, k[o + 1] = (p * V >> z) * T, k[o + 2] = (f * V >> z) * T) : k[o] = k[o + 1] = k[o + 2] = 0, u -= y, p -= v, f -= _, g -= m, y -= j.r, v -= j.g, _ -= j.b, m -= j.a, o = i + ((o = r + R) < N ? o : N) * M << 2, u += b += j.r = k[o], p += x += j.g = k[o + 1], f += S += j.b = k[o + 2], g += C += j.a = k[o + 3], j = j.next, y += w = B.r, v += P = B.g, _ += A = B.b, m += T = B.a, b -= w, x -= P, S -= A, C -= T, B = B.next, l += M
            }
        }(t, e)
    }, r.Factory.addGetterSetter(n.Node, "blurRadius", 0, o.getNumberValidator(), r.Factory.afterSetFilter)
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Brighten = void 0;
    var r = i(0),
        n = i(5),
        o = i(2);
    e.Brighten = function(t) {
        var e, i = 255 * this.brightness(),
            r = t.data,
            n = r.length;
        for (e = 0; e < n; e += 4) r[e] += i, r[e + 1] += i, r[e + 2] += i
    }, r.Factory.addGetterSetter(n.Node, "brightness", 0, o.getNumberValidator(), r.Factory.afterSetFilter)
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Contrast = void 0;
    var r = i(0),
        n = i(5),
        o = i(2);
    e.Contrast = function(t) {
        var e, i = Math.pow((this.contrast() + 100) / 100, 2),
            r = t.data,
            n = r.length,
            o = 150,
            a = 150,
            s = 150;
        for (e = 0; e < n; e += 4) o = r[e], a = r[e + 1], s = r[e + 2], o /= 255, o -= .5, o *= i, o += .5, a /= 255, a -= .5, a *= i, a += .5, s /= 255, s -= .5, s *= i, s += .5, o = (o *= 255) < 0 ? 0 : o > 255 ? 255 : o, a = (a *= 255) < 0 ? 0 : a > 255 ? 255 : a, s = (s *= 255) < 0 ? 0 : s > 255 ? 255 : s, r[e] = o, r[e + 1] = a, r[e + 2] = s
    }, r.Factory.addGetterSetter(n.Node, "contrast", 0, o.getNumberValidator(), r.Factory.afterSetFilter)
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Emboss = void 0;
    var r = i(0),
        n = i(5),
        o = i(3),
        a = i(2);
    e.Emboss = function(t) {
        var e = 10 * this.embossStrength(),
            i = 255 * this.embossWhiteLevel(),
            r = this.embossDirection(),
            n = this.embossBlend(),
            a = 0,
            s = 0,
            h = t.data,
            c = t.width,
            l = t.height,
            d = 4 * c,
            u = l;
        switch (r) {
            case "top-left":
                a = -1, s = -1;
                break;
            case "top":
                a = -1, s = 0;
                break;
            case "top-right":
                a = -1, s = 1;
                break;
            case "right":
                a = 0, s = 1;
                break;
            case "bottom-right":
                a = 1, s = 1;
                break;
            case "bottom":
                a = 1, s = 0;
                break;
            case "bottom-left":
                a = 1, s = -1;
                break;
            case "left":
                a = 0, s = -1;
                break;
            default:
                o.Util.error("Unknown emboss direction: " + r)
        }
        do {
            var p = (u - 1) * d,
                f = a;
            u + f < 1 && (f = 0), u + f > l && (f = 0);
            var g = (u - 1 + f) * c * 4,
                y = c;
            do {
                var v = p + 4 * (y - 1),
                    _ = s;
                y + _ < 1 && (_ = 0), y + _ > c && (_ = 0);
                var m = g + 4 * (y - 1 + _),
                    b = h[v] - h[m],
                    x = h[v + 1] - h[m + 1],
                    S = h[v + 2] - h[m + 2],
                    C = b,
                    w = C > 0 ? C : -C;
                if ((x > 0 ? x : -x) > w && (C = x), (S > 0 ? S : -S) > w && (C = S), C *= e, n) {
                    var P = h[v] + C,
                        A = h[v + 1] + C,
                        T = h[v + 2] + C;
                    h[v] = P > 255 ? 255 : P < 0 ? 0 : P, h[v + 1] = A > 255 ? 255 : A < 0 ? 0 : A, h[v + 2] = T > 255 ? 255 : T < 0 ? 0 : T
                } else {
                    var O = i - C;
                    O < 0 ? O = 0 : O > 255 && (O = 255), h[v] = h[v + 1] = h[v + 2] = O
                }
            } while (--y)
        } while (--u)
    }, r.Factory.addGetterSetter(n.Node, "embossStrength", .5, a.getNumberValidator(), r.Factory.afterSetFilter), r.Factory.addGetterSetter(n.Node, "embossWhiteLevel", .5, a.getNumberValidator(), r.Factory.afterSetFilter), r.Factory.addGetterSetter(n.Node, "embossDirection", "top-left", null, r.Factory.afterSetFilter), r.Factory.addGetterSetter(n.Node, "embossBlend", !1, null, r.Factory.afterSetFilter)
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Enhance = void 0;
    var r = i(0),
        n = i(5),
        o = i(2);

    function a(t, e, i, r, n) {
        var o = i - e,
            a = n - r;
        return 0 === o ? r + a / 2 : 0 === a ? r : a * ((t - e) / o) + r
    }
    e.Enhance = function(t) {
        var e, i, r, n, o = t.data,
            s = o.length,
            h = o[0],
            c = h,
            l = o[1],
            d = l,
            u = o[2],
            p = u,
            f = this.enhance();
        if (0 !== f) {
            for (n = 0; n < s; n += 4)(e = o[n + 0]) < h ? h = e : e > c && (c = e), (i = o[n + 1]) < l ? l = i : i > d && (d = i), (r = o[n + 2]) < u ? u = r : r > p && (p = r);
            var g, y, v, _, m, b, x, S, C;
            for (c === h && (c = 255, h = 0), d === l && (d = 255, l = 0), p === u && (p = 255, u = 0), f > 0 ? (y = c + f * (255 - c), v = h - f * (h - 0), m = d + f * (255 - d), b = l - f * (l - 0), S = p + f * (255 - p), C = u - f * (u - 0)) : (y = c + f * (c - (g = .5 * (c + h))), v = h + f * (h - g), m = d + f * (d - (_ = .5 * (d + l))), b = l + f * (l - _), S = p + f * (p - (x = .5 * (p + u))), C = u + f * (u - x)), n = 0; n < s; n += 4) o[n + 0] = a(o[n + 0], h, c, v, y), o[n + 1] = a(o[n + 1], l, d, b, m), o[n + 2] = a(o[n + 2], u, p, C, S)
        }
    }, r.Factory.addGetterSetter(n.Node, "enhance", 0, o.getNumberValidator(), r.Factory.afterSetFilter)
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Grayscale = void 0;
    e.Grayscale = function(t) {
        var e, i, r = t.data,
            n = r.length;
        for (e = 0; e < n; e += 4) i = .34 * r[e] + .5 * r[e + 1] + .16 * r[e + 2], r[e] = i, r[e + 1] = i, r[e + 2] = i
    }
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.HSL = void 0;
    var r = i(0),
        n = i(5),
        o = i(2);
    r.Factory.addGetterSetter(n.Node, "hue", 0, o.getNumberValidator(), r.Factory.afterSetFilter), r.Factory.addGetterSetter(n.Node, "saturation", 0, o.getNumberValidator(), r.Factory.afterSetFilter), r.Factory.addGetterSetter(n.Node, "luminance", 0, o.getNumberValidator(), r.Factory.afterSetFilter);
    e.HSL = function(t) {
        var e, i, r, n, o, a = t.data,
            s = a.length,
            h = Math.pow(2, this.saturation()),
            c = Math.abs(this.hue() + 360) % 360,
            l = 127 * this.luminance(),
            d = 1 * h * Math.cos(c * Math.PI / 180),
            u = 1 * h * Math.sin(c * Math.PI / 180),
            p = .299 + .701 * d + .167 * u,
            f = .587 - .587 * d + .33 * u,
            g = .114 - .114 * d - .497 * u,
            y = .299 - .299 * d - .328 * u,
            v = .587 + .413 * d + .035 * u,
            _ = .114 - .114 * d + .293 * u,
            m = .299 - .3 * d + 1.25 * u,
            b = .587 - .586 * d - 1.05 * u,
            x = .114 + .886 * d - .2 * u;
        for (e = 0; e < s; e += 4) i = a[e + 0], r = a[e + 1], n = a[e + 2], o = a[e + 3], a[e + 0] = p * i + f * r + g * n + l, a[e + 1] = y * i + v * r + _ * n + l, a[e + 2] = m * i + b * r + x * n + l, a[e + 3] = o
    }
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.HSV = void 0;
    var r = i(0),
        n = i(5),
        o = i(2);
    e.HSV = function(t) {
        var e, i, r, n, o, a = t.data,
            s = a.length,
            h = Math.pow(2, this.value()),
            c = Math.pow(2, this.saturation()),
            l = Math.abs(this.hue() + 360) % 360,
            d = h * c * Math.cos(l * Math.PI / 180),
            u = h * c * Math.sin(l * Math.PI / 180),
            p = .299 * h + .701 * d + .167 * u,
            f = .587 * h - .587 * d + .33 * u,
            g = .114 * h - .114 * d - .497 * u,
            y = .299 * h - .299 * d - .328 * u,
            v = .587 * h + .413 * d + .035 * u,
            _ = .114 * h - .114 * d + .293 * u,
            m = .299 * h - .3 * d + 1.25 * u,
            b = .587 * h - .586 * d - 1.05 * u,
            x = .114 * h + .886 * d - .2 * u;
        for (e = 0; e < s; e += 4) i = a[e + 0], r = a[e + 1], n = a[e + 2], o = a[e + 3], a[e + 0] = p * i + f * r + g * n, a[e + 1] = y * i + v * r + _ * n, a[e + 2] = m * i + b * r + x * n, a[e + 3] = o
    }, r.Factory.addGetterSetter(n.Node, "hue", 0, o.getNumberValidator(), r.Factory.afterSetFilter), r.Factory.addGetterSetter(n.Node, "saturation", 0, o.getNumberValidator(), r.Factory.afterSetFilter), r.Factory.addGetterSetter(n.Node, "value", 0, o.getNumberValidator(), r.Factory.afterSetFilter)
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Invert = void 0;
    e.Invert = function(t) {
        var e, i = t.data,
            r = i.length;
        for (e = 0; e < r; e += 4) i[e] = 255 - i[e], i[e + 1] = 255 - i[e + 1], i[e + 2] = 255 - i[e + 2]
    }
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Kaleidoscope = void 0;
    var r = i(0),
        n = i(5),
        o = i(3),
        a = i(2);
    e.Kaleidoscope = function(t) {
        var e, i, r, n, a, s, h, c, l, d = t.width,
            u = t.height,
            p = Math.round(this.kaleidoscopePower()),
            f = Math.round(this.kaleidoscopeAngle()),
            g = Math.floor(d * (f % 360) / 360);
        if (!(p < 1)) {
            var y = o.Util.createCanvasElement();
            y.width = d, y.height = u;
            var v = y.getContext("2d").getImageData(0, 0, d, u);
            ! function(t, e, i) {
                var r, n, o, a, s = t.data,
                    h = e.data,
                    c = t.width,
                    l = t.height,
                    d = i.polarCenterX || c / 2,
                    u = i.polarCenterY || l / 2,
                    p = 0,
                    f = 0,
                    g = 0,
                    y = 0,
                    v = Math.sqrt(d * d + u * u);
                n = c - d, o = l - u, v = (a = Math.sqrt(n * n + o * o)) > v ? a : v;
                var _, m, b, x, S = l,
                    C = c,
                    w = 360 / C * Math.PI / 180;
                for (m = 0; m < C; m += 1)
                    for (b = Math.sin(m * w), x = Math.cos(m * w), _ = 0; _ < S; _ += 1) n = Math.floor(d + v * _ / S * x), p = s[(r = 4 * ((o = Math.floor(u + v * _ / S * b)) * c + n)) + 0], f = s[r + 1], g = s[r + 2], y = s[r + 3], h[(r = 4 * (m + _ * c)) + 0] = p, h[r + 1] = f, h[r + 2] = g, h[r + 3] = y
            }(t, v, {
                polarCenterX: d / 2,
                polarCenterY: u / 2
            });
            for (var _ = d / Math.pow(2, p); _ <= 8;) _ *= 2, p -= 1;
            var m = _ = Math.ceil(_),
                b = 0,
                x = m,
                S = 1;
            for (g + _ > d && (b = m, x = 0, S = -1), i = 0; i < u; i += 1)
                for (e = b; e !== x; e += S) c = 4 * (d * i + Math.round(e + g) % d), n = v.data[c + 0], a = v.data[c + 1], s = v.data[c + 2], h = v.data[c + 3], l = 4 * (d * i + e), v.data[l + 0] = n, v.data[l + 1] = a, v.data[l + 2] = s, v.data[l + 3] = h;
            for (i = 0; i < u; i += 1)
                for (m = Math.floor(_), r = 0; r < p; r += 1) {
                    for (e = 0; e < m + 1; e += 1) c = 4 * (d * i + e), n = v.data[c + 0], a = v.data[c + 1], s = v.data[c + 2], h = v.data[c + 3], l = 4 * (d * i + 2 * m - e - 1), v.data[l + 0] = n, v.data[l + 1] = a, v.data[l + 2] = s, v.data[l + 3] = h;
                    m *= 2
                }! function(t, e, i) {
                    var r, n, o, a, s, h, c = t.data,
                        l = e.data,
                        d = t.width,
                        u = t.height,
                        p = i.polarCenterX || d / 2,
                        f = i.polarCenterY || u / 2,
                        g = 0,
                        y = 0,
                        v = 0,
                        _ = 0,
                        m = Math.sqrt(p * p + f * f);
                    n = d - p, o = u - f, m = (h = Math.sqrt(n * n + o * o)) > m ? h : m;
                    var b, x, S, C = u,
                        w = d,
                        P = i.polarRotation || 0;
                    for (n = 0; n < d; n += 1)
                        for (o = 0; o < u; o += 1) a = n - p, s = o - f, b = Math.sqrt(a * a + s * s) * C / m, x = (x = (180 * Math.atan2(s, a) / Math.PI + 360 + P) % 360) * w / 360, S = Math.floor(x), g = c[(r = 4 * (Math.floor(b) * d + S)) + 0], y = c[r + 1], v = c[r + 2], _ = c[r + 3], l[(r = 4 * (o * d + n)) + 0] = g, l[r + 1] = y, l[r + 2] = v, l[r + 3] = _
                }(v, t, {
                    polarRotation: 0
                })
        }
    }, r.Factory.addGetterSetter(n.Node, "kaleidoscopePower", 2, a.getNumberValidator(), r.Factory.afterSetFilter), r.Factory.addGetterSetter(n.Node, "kaleidoscopeAngle", 0, a.getNumberValidator(), r.Factory.afterSetFilter)
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Mask = void 0;
    var r = i(0),
        n = i(5),
        o = i(2);

    function a(t, e, i) {
        var r = 4 * (i * t.width + e),
            n = [];
        return n.push(t.data[r++], t.data[r++], t.data[r++], t.data[r++]), n
    }

    function s(t, e) {
        return Math.sqrt(Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2) + Math.pow(t[2] - e[2], 2))
    }
    e.Mask = function(t) {
        var e = function(t, e) {
            var i = a(t, 0, 0),
                r = a(t, t.width - 1, 0),
                n = a(t, 0, t.height - 1),
                o = a(t, t.width - 1, t.height - 1),
                h = e || 10;
            if (s(i, r) < h && s(r, o) < h && s(o, n) < h && s(n, i) < h) {
                for (var c = function(t) {
                        for (var e = [0, 0, 0], i = 0; i < t.length; i++) e[0] += t[i][0], e[1] += t[i][1], e[2] += t[i][2];
                        return e[0] /= t.length, e[1] /= t.length, e[2] /= t.length, e
                    }([r, i, o, n]), l = [], d = 0; d < t.width * t.height; d++) {
                    var u = s(c, [t.data[4 * d], t.data[4 * d + 1], t.data[4 * d + 2]]);
                    l[d] = u < h ? 0 : 255
                }
                return l
            }
        }(t, this.threshold());
        return e && function(t, e) {
            for (var i = 0; i < t.width * t.height; i++) t.data[4 * i + 3] = e[i]
        }(t, e = function(t, e, i) {
            for (var r = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9], n = Math.round(Math.sqrt(r.length)), o = Math.floor(n / 2), a = [], s = 0; s < i; s++)
                for (var h = 0; h < e; h++) {
                    for (var c = s * e + h, l = 0, d = 0; d < n; d++)
                        for (var u = 0; u < n; u++) {
                            var p = s + d - o,
                                f = h + u - o;
                            if (p >= 0 && p < i && f >= 0 && f < e) {
                                var g = r[d * n + u];
                                l += t[p * e + f] * g
                            }
                        }
                    a[c] = l
                }
            return a
        }(e = function(t, e, i) {
            for (var r = [1, 1, 1, 1, 1, 1, 1, 1, 1], n = Math.round(Math.sqrt(r.length)), o = Math.floor(n / 2), a = [], s = 0; s < i; s++)
                for (var h = 0; h < e; h++) {
                    for (var c = s * e + h, l = 0, d = 0; d < n; d++)
                        for (var u = 0; u < n; u++) {
                            var p = s + d - o,
                                f = h + u - o;
                            if (p >= 0 && p < i && f >= 0 && f < e) {
                                var g = r[d * n + u];
                                l += t[p * e + f] * g
                            }
                        }
                    a[c] = l >= 1020 ? 255 : 0
                }
            return a
        }(e = function(t, e, i) {
            for (var r = [1, 1, 1, 1, 0, 1, 1, 1, 1], n = Math.round(Math.sqrt(r.length)), o = Math.floor(n / 2), a = [], s = 0; s < i; s++)
                for (var h = 0; h < e; h++) {
                    for (var c = s * e + h, l = 0, d = 0; d < n; d++)
                        for (var u = 0; u < n; u++) {
                            var p = s + d - o,
                                f = h + u - o;
                            if (p >= 0 && p < i && f >= 0 && f < e) {
                                var g = r[d * n + u];
                                l += t[p * e + f] * g
                            }
                        }
                    a[c] = 2040 === l ? 255 : 0
                }
            return a
        }(e, t.width, t.height), t.width, t.height), t.width, t.height)), t
    }, r.Factory.addGetterSetter(n.Node, "threshold", 0, o.getNumberValidator(), r.Factory.afterSetFilter)
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Noise = void 0;
    var r = i(0),
        n = i(5),
        o = i(2);
    e.Noise = function(t) {
        var e, i = 255 * this.noise(),
            r = t.data,
            n = r.length,
            o = i / 2;
        for (e = 0; e < n; e += 4) r[e + 0] += o - 2 * o * Math.random(), r[e + 1] += o - 2 * o * Math.random(), r[e + 2] += o - 2 * o * Math.random()
    }, r.Factory.addGetterSetter(n.Node, "noise", .2, o.getNumberValidator(), r.Factory.afterSetFilter)
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Pixelate = void 0;
    var r = i(0),
        n = i(3),
        o = i(5),
        a = i(2);
    e.Pixelate = function(t) {
        var e, i, r, o, a, s, h, c, l, d, u, p, f, g, y = Math.ceil(this.pixelSize()),
            v = t.width,
            _ = t.height,
            m = Math.ceil(v / y),
            b = Math.ceil(_ / y),
            x = t.data;
        if (y <= 0) n.Util.error("pixelSize value can not be <= 0");
        else
            for (p = 0; p < m; p += 1)
                for (f = 0; f < b; f += 1) {
                    for (o = 0, a = 0, s = 0, h = 0, l = (c = p * y) + y, u = (d = f * y) + y, g = 0, e = c; e < l; e += 1)
                        if (!(e >= v))
                            for (i = d; i < u; i += 1) i >= _ || (o += x[(r = 4 * (v * i + e)) + 0], a += x[r + 1], s += x[r + 2], h += x[r + 3], g += 1);
                    for (o /= g, a /= g, s /= g, h /= g, e = c; e < l; e += 1)
                        if (!(e >= v))
                            for (i = d; i < u; i += 1) i >= _ || (x[(r = 4 * (v * i + e)) + 0] = o, x[r + 1] = a, x[r + 2] = s, x[r + 3] = h)
                }
    }, r.Factory.addGetterSetter(o.Node, "pixelSize", 8, a.getNumberValidator(), r.Factory.afterSetFilter)
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Posterize = void 0;
    var r = i(0),
        n = i(5),
        o = i(2);
    e.Posterize = function(t) {
        var e, i = Math.round(254 * this.levels()) + 1,
            r = t.data,
            n = r.length,
            o = 255 / i;
        for (e = 0; e < n; e += 1) r[e] = Math.floor(r[e] / o) * o
    }, r.Factory.addGetterSetter(n.Node, "levels", .5, o.getNumberValidator(), r.Factory.afterSetFilter)
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.RGB = void 0;
    var r = i(0),
        n = i(5),
        o = i(2);
    e.RGB = function(t) {
        var e, i, r = t.data,
            n = r.length,
            o = this.red(),
            a = this.green(),
            s = this.blue();
        for (e = 0; e < n; e += 4) i = (.34 * r[e] + .5 * r[e + 1] + .16 * r[e + 2]) / 255, r[e] = i * o, r[e + 1] = i * a, r[e + 2] = i * s, r[e + 3] = r[e + 3]
    }, r.Factory.addGetterSetter(n.Node, "red", 0, (function(t) {
        return this._filterUpToDate = !1, t > 255 ? 255 : t < 0 ? 0 : Math.round(t)
    })), r.Factory.addGetterSetter(n.Node, "green", 0, (function(t) {
        return this._filterUpToDate = !1, t > 255 ? 255 : t < 0 ? 0 : Math.round(t)
    })), r.Factory.addGetterSetter(n.Node, "blue", 0, o.RGBComponent, r.Factory.afterSetFilter)
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.RGBA = void 0;
    var r = i(0),
        n = i(5),
        o = i(2);
    e.RGBA = function(t) {
        var e, i, r = t.data,
            n = r.length,
            o = this.red(),
            a = this.green(),
            s = this.blue(),
            h = this.alpha();
        for (e = 0; e < n; e += 4) i = 1 - h, r[e] = o * h + r[e] * i, r[e + 1] = a * h + r[e + 1] * i, r[e + 2] = s * h + r[e + 2] * i
    }, r.Factory.addGetterSetter(n.Node, "red", 0, (function(t) {
        return this._filterUpToDate = !1, t > 255 ? 255 : t < 0 ? 0 : Math.round(t)
    })), r.Factory.addGetterSetter(n.Node, "green", 0, (function(t) {
        return this._filterUpToDate = !1, t > 255 ? 255 : t < 0 ? 0 : Math.round(t)
    })), r.Factory.addGetterSetter(n.Node, "blue", 0, o.RGBComponent, r.Factory.afterSetFilter), r.Factory.addGetterSetter(n.Node, "alpha", 1, (function(t) {
        return this._filterUpToDate = !1, t > 1 ? 1 : t < 0 ? 0 : t
    }))
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Sepia = void 0;
    e.Sepia = function(t) {
        var e, i, r, n, o = t.data,
            a = o.length;
        for (e = 0; e < a; e += 4) i = o[e + 0], r = o[e + 1], n = o[e + 2], o[e + 0] = Math.min(255, .393 * i + .769 * r + .189 * n), o[e + 1] = Math.min(255, .349 * i + .686 * r + .168 * n), o[e + 2] = Math.min(255, .272 * i + .534 * r + .131 * n)
    }
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Solarize = void 0;
    e.Solarize = function(t) {
        var e = t.data,
            i = t.width,
            r = 4 * i,
            n = t.height;
        do {
            var o = (n - 1) * r,
                a = i;
            do {
                var s = o + 4 * (a - 1),
                    h = e[s],
                    c = e[s + 1],
                    l = e[s + 2];
                h > 127 && (h = 255 - h), c > 127 && (c = 255 - c), l > 127 && (l = 255 - l), e[s] = h, e[s + 1] = c, e[s + 2] = l
            } while (--a)
        } while (--n)
    }
}, function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Threshold = void 0;
    var r = i(0),
        n = i(5),
        o = i(2);
    e.Threshold = function(t) {
        var e, i = 255 * this.threshold(),
            r = t.data,
            n = r.length;
        for (e = 0; e < n; e += 1) r[e] = r[e] < i ? 0 : 255
    }, r.Factory.addGetterSetter(n.Node, "threshold", .5, o.getNumberValidator(), r.Factory.afterSetFilter)
}, function(t, e) {
    t.exports = r;
    var i = Array.prototype;

    function r(t) {
        if (!(this instanceof r)) return new r(t);
        var e = t.className.replace(/^\s+|\s+$/g, ""),
            n = e.split(/\s+/);
        if (this._elem = t, this.length = 0, e)
            for (var o = 0; o < n.length; o += 1) i.push.call(this, n[o])
    }

    function n(t, e) {
        for (var i = t.length, r = 0; r < i; r += 1)
            if (t[r] === e) return r;
        return -1
    }
    r.prototype.item = function(t) {
        return t >= this.length ? null : this[t]
    }, r.prototype.add = function() {
        for (var t = 0; t < arguments.length; t += 1) {
            var e = String(arguments[t]);
            n(this, e) >= 0 || i.push.call(this, e)
        }
        this._elem.className = this.toString()
    }, r.prototype.remove = function() {
        for (var t = 0; t < arguments.length; t += 1) {
            var e = String(arguments[t]),
                r = n(this, e);
            r < 0 || i.splice.call(this, r, 1)
        }
        this._elem.className = this.toString()
    }, r.prototype.contains = function(t) {
        return n(this, String(t)) >= 0
    }, r.prototype.toggle = function(t, e) {
        return void 0 !== e ? e ? this.add(t) : this.remove(t) : this.contains(t) ? this.remove(t) : this.add(t), this.contains(t)
    }, r.prototype.replace = function(t, e) {
        var r = n(this, t);
        return !(r < 0) && (i.splice.call(this, r, 1, e), this._elem.className = this.toString(), !0)
    }, r.prototype.toString = function() {
        return i.join.call(this, " ")
    }
}, function(t, e, i) {}, function(t, e, i) {}]);