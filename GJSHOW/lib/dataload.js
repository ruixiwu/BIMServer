/*
 zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License  zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License  zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */
function getGlobal() {
    return "undefined" !== typeof window && null !== window ? window : "undefined" !== typeof self && null !== self ? self : GLOBAL
}

var BimFishNamespace = function (a) {
    var c = getGlobal();
    a = a.split(".");
    for (var h = 0; h < a.length; ++h) c[a[h]] = c[a[h]] || {}, c = c[a[h]];
    return c
};
BimFishNamespace("BimFish.Viewing.Private");
BimFishNamespace("BimFish.Viewing.Extensions");
BimFishNamespace("BimFish.Viewing.Shaders");
BimFishNamespace("BimFish.Viewing.UI");
BimFishNamespace("BimFish.LMVTK");
BimFish.Viewing.getGlobal = getGlobal;
BimFish.Viewing.BimFishNamespace = BimFishNamespace;

function getGlobal() {
    return "undefined" !== typeof window && null !== window ? window : "undefined" !== typeof self && null !== self ? self : GLOBAL
}

var av = BimFish.Viewing, avp = av.Private;
av.getGlobal = getGlobal;
var isBrowser = av.isBrowser = "undefined" !== typeof navigator,
    isIE11 = av.isIE11 = isBrowser && !!navigator.userAgent.match(/Trident\/7\./);
"undefined" !== typeof window && isIE11 && function () {
    function a(a, h) {
        h = h || {bubbles: !1, cancelable: !1, detail: void 0};
        var c = document.createEvent("CustomEvent");
        c.initCustomEvent(a, h.bubbles, h.cancelable, h.detail);
        return c
    }

    a.prototype = window.CustomEvent.prototype;
    window.CustomEvent = a
}();
ArrayBuffer.prototype.slice || (ArrayBuffer.prototype.slice = function (a, c) {
    !c || c > this.byteLength ? c = this.byteLength : 0 > c && (c = this.byteLength + c, 0 > c && (c = 0));
    0 > a && (a = this.byteLength + a, 0 > a && (a = 0));
    if (c <= a) return new ArrayBuffer;
    for (var h = c - a, f = new Uint8Array(this, a, h), e = new Uint8Array(h), b = 0; b < h; b++) e[b] = f[b];
    return e.buffer
});
"undefined" !== typeof window && (window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder);
var launchFullscreen = av.launchFullscreen = function (a, c) {
    a.requestFullscreen ? a.requestFullscreen(c) : a.mozRequestFullScreen ? a.mozRequestFullScreen(c) : a.webkitRequestFullscreen ? a.webkitRequestFullscreen(c) : a.msRequestFullscreen && a.msRequestFullscreen(c)
}, exitFullscreen = av.exitFullscreen = function () {
    document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen()
}, inFullscreen = av.inFullscreen = function () {
    return "webkitIsFullScreen" in document ? document.webkitIsFullScreen : !!(document.mozFullScreenElement || document.msFullscreenElement || document.fullscreenEnabled || document.querySelector(".viewer-fill-browser"))
}, fullscreenElement = av.fullscreenElement = function () {
    return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement
}, isFullscreenAvailable = av.isFullscreenAvailable = function (a) {
    return a.requestFullscreen || a.mozRequestFullScreen || a.webkitRequestFullscreen || a.msRequestFullscreen
}, getAndroidVersion = av.getAndroidVersion = function (a) {
    a = a || navigator.userAgent;
    return (a = a.match(/Android\s([0-9\.]*)/)) ? a[1] : !1
}, isTouchDevice = av.isTouchDevice = function () {
    return "undefined" !== typeof window && "ontouchstart" in window
};
av.isIOSDevice = function () {
    return isBrowser ? /ip(ad|hone|od)/.test(navigator.userAgent.toLowerCase()) : !1
};
av.isAndroidDevice = function () {
    return isBrowser ? -1 !== navigator.userAgent.toLowerCase().indexOf("android") : !1
};
av.isMobileDevice = function () {
    return isBrowser ? av.isIOSDevice() || av.isAndroidDevice() : !1
};
av.isSafari = function () {
    if (!isBrowser) return !1;
    var a = navigator.userAgent.toLowerCase();
    return -1 !== a.indexOf("safari") && -1 === a.indexOf("chrome")
};
av.isFirefox = function () {
    return isBrowser ? -1 !== navigator.userAgent.toLowerCase().indexOf("firefox") : !1
};
av.isMac = function () {
    return isBrowser ? -1 !== navigator.userAgent.toLowerCase().indexOf("mac os") : !1
};
av.isWindows = function () {
    if (!isBrowser) return !1;
    var a = navigator.userAgent.toLowerCase();
    return -1 !== a.indexOf("win32") || -1 !== a.indexOf("windows")
};
var rescueFromPolymer = av.rescueFromPolymer = function () {
    return av.isSafari() ? function (a) {
        if (!window.Polymer) return a;
        for (var c in a) if (-1 !== c.indexOf("__impl")) return a[c];
        return a
    } : function (a) {
        return a
    }
}(), detectWebGL = av.detectWebGL = function () {
    if (window.WebGLRenderingContext) {
        for (var a = document.createElement("canvas"), c = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"], h = !1, f = 0; 4 > f; f++) try {
            if (h = a.getContext(c[f]), (h = rescueFromPolymer(h)) && "function" === typeof h.getParameter) return 1
        } catch (e) {
        }
        return 0
    }
    return -1
}, touchStartToClick = av.touchStartToClick = function (a) {
    a.preventDefault();
    a.stopPropagation();
    a.target.click()
};
(function () {
    var a = getGlobal();
    a.performance || (a.performance = Date)
})();
av = BimFish.Viewing;
avp = BimFish.Viewing.Private;
avp.IS_CONCAT_BUILD = !0;
avp.BUILD_LMV_WORKER_URL = "lmvworker.js";
avp.LMV_WORKER_URL = avp.BUILD_LMV_WORKER_URL;
avp.ENABLE_DEBUG = avp.ENABLE_DEBUG || !0;
avp.ENABLE_TRACE = avp.ENABLE_TRACE || !0;
avp.DEBUG_SHADERS = avp.DEBUG_SHADERS || !0;
avp.ENABLE_INLINE_WORKER = !0;
LmvVector3 = function (a, c, h) {
    this.x = a || 0;
    this.y = c || 0;
    this.z = h || 0
};
LmvVector3.prototype = {
    constructor: LmvVector3, set: function (a, c, h) {
        this.x = a;
        this.y = c;
        this.z = h;
        return this
    }, setX: function (a) {
        this.x = a;
        return this
    }, setY: function (a) {
        this.y = a;
        return this
    }, setZ: function (a) {
        this.z = a;
        return this
    }, setComponent: function (a, c) {
        switch (a) {
            case 0:
                this.x = c;
                break;
            case 1:
                this.y = c;
                break;
            case 2:
                this.z = c;
                break;
            default:
                throw Error("index is out of range: " + a);
        }
    }, getComponent: function (a) {
        switch (a) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            default:
                throw Error("index is out of range: " + a);
        }
    }, clone: function () {
        return new this.constructor(this.x, this.y, this.z)
    }, copy: function (a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        return this
    }, add: function (a, c) {
        if (void 0 !== c) return console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, c);
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        return this
    }, addScalar: function (a) {
        this.x += a;
        this.y += a;
        this.z += a;
        return this
    }, addVectors: function (a, c) {
        this.x = a.x + c.x;
        this.y = a.y + c.y;
        this.z = a.z + c.z;
        return this
    }, addScaledVector: function (a, c) {
        this.x += a.x * c;
        this.y += a.y * c;
        this.z += a.z * c;
        return this
    }, sub: function (a, c) {
        if (void 0 !== c) return console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, c);
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        return this
    }, subScalar: function (a) {
        this.x -= a;
        this.y -= a;
        this.z -= a;
        return this
    }, subVectors: function (a, c) {
        this.x = a.x - c.x;
        this.y = a.y - c.y;
        this.z = a.z - c.z;
        return this
    }, multiply: function (a, c) {
        if (void 0 !== c) return console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(a, c);
        this.x *= a.x;
        this.y *= a.y;
        this.z *= a.z;
        return this
    }, multiplyScalar: function (a) {
        this.x *= a;
        this.y *= a;
        this.z *= a;
        return this
    }, multiplyVectors: function (a, c) {
        this.x = a.x * c.x;
        this.y = a.y * c.y;
        this.z = a.z * c.z;
        return this
    }, applyMatrix3: function (a) {
        var c = this.x, h = this.y, f = this.z;
        a = a.elements;
        this.x = a[0] * c + a[3] * h + a[6] * f;
        this.y = a[1] * c + a[4] * h + a[7] * f;
        this.z = a[2] * c + a[5] * h + a[8] * f;
        return this
    }, applyMatrix4: function (a) {
        var c = this.x, h = this.y, f = this.z;
        a = a.elements;
        this.x = a[0] * c + a[4] * h + a[8] * f + a[12];
        this.y = a[1] * c + a[5] * h + a[9] * f + a[13];
        this.z = a[2] * c + a[6] * h + a[10] * f + a[14];
        return this
    }, applyProjection: function (a) {
        var c = this.x, h = this.y, f = this.z;
        a = a.elements;
        var e = 1 / (a[3] * c + a[7] * h + a[11] * f + a[15]);
        this.x = (a[0] * c + a[4] * h + a[8] * f + a[12]) * e;
        this.y = (a[1] * c + a[5] * h + a[9] * f + a[13]) * e;
        this.z = (a[2] * c + a[6] * h + a[10] * f + a[14]) * e;
        return this
    }, applyQuaternion: function (a) {
        var c = this.x, h = this.y, f = this.z, e = a.x, b = a.y, d = a.z;
        a = a.w;
        var g = a * c + b * f - d * h, k = a * h + d * c - e * f, l = a * f + e * h - b * c, c = -e * c - b * h - d * f;
        this.x = g * a + c * -e + k * -d - l * -b;
        this.y = k * a + c * -b + l * -e - g * -d;
        this.z = l * a + c * -d + g * -b - k * -e;
        return this
    }, transformDirection: function (a) {
        var c = this.x, h = this.y, f = this.z;
        a = a.elements;
        this.x = a[0] * c + a[4] * h + a[8] * f;
        this.y = a[1] * c + a[5] * h + a[9] * f;
        this.z = a[2] * c + a[6] * h + a[10] * f;
        this.normalize();
        return this
    }, divide: function (a) {
        this.x /= a.x;
        this.y /= a.y;
        this.z /= a.z;
        return this
    }, divideScalar: function (a) {
        0 !== a ? (a = 1 / a, this.x *= a, this.y *= a, this.z *= a) : this.z = this.y = this.x = 0;
        return this
    }, min: function (a) {
        this.x > a.x && (this.x = a.x);
        this.y > a.y && (this.y = a.y);
        this.z > a.z && (this.z = a.z);
        return this
    }, max: function (a) {
        this.x < a.x && (this.x = a.x);
        this.y < a.y && (this.y = a.y);
        this.z < a.z && (this.z = a.z);
        return this
    }, clamp: function (a, c) {
        this.x < a.x ? this.x = a.x : this.x > c.x && (this.x = c.x);
        this.y < a.y ? this.y = a.y : this.y > c.y && (this.y = c.y);
        this.z < a.z ? this.z = a.z : this.z > c.z && (this.z = c.z);
        return this
    }, clampScalar: function () {
        var a, c;
        return function (h, f) {
            void 0 === a && (a = new LmvVector3, c = new LmvVector3);
            a.set(h, h, h);
            c.set(f, f, f);
            return this.clamp(a, c)
        }
    }(), floor: function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this
    }, ceil: function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this
    }, round: function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this
    }, roundToZero: function () {
        this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y);
        this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z);
        return this
    }, negate: function () {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this
    }, dot: function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z
    }, lengthSq: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z
    }, length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }, lengthManhattan: function () {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    }, normalize: function () {
        return this.divideScalar(this.length())
    }, setLength: function (a) {
        var c = this.length();
        0 !== c && a !== c && this.multiplyScalar(a / c);
        return this
    }, lerp: function (a, c) {
        this.x += (a.x - this.x) * c;
        this.y += (a.y - this.y) * c;
        this.z += (a.z - this.z) * c;
        return this
    }, lerpVectors: function (a, c, h) {
        this.subVectors(c, a).multiplyScalar(h).add(a);
        return this
    }, cross: function (a, c) {
        if (void 0 !== c) return console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(a, c);
        var h = this.x, f = this.y, e = this.z;
        this.x = f * a.z - e * a.y;
        this.y = e * a.x - h * a.z;
        this.z = h * a.y - f * a.x;
        return this
    }, crossVectors: function (a, c) {
        var h = a.x, f = a.y, e = a.z, b = c.x, d = c.y, g = c.z;
        this.x = f * g - e * d;
        this.y = e * b - h * g;
        this.z = h * d - f * b;
        return this
    }, projectOnVector: function () {
        var a, c;
        return function (h) {
            void 0 === a && (a = new LmvVector3);
            a.copy(h).normalize();
            c = this.dot(a);
            return this.copy(a).multiplyScalar(c)
        }
    }(), projectOnPlane: function () {
        var a;
        return function (c) {
            void 0 === a && (a = new LmvVector3);
            a.copy(this).projectOnVector(c);
            return this.sub(a)
        }
    }(), reflect: function () {
        var a;
        return function (c) {
            void 0 === a && (a = new LmvVector3);
            return this.sub(a.copy(c).multiplyScalar(2 * this.dot(c)))
        }
    }(), distanceTo: function (a) {
        return Math.sqrt(this.distanceToSquared(a))
    }, distanceToSquared: function (a) {
        var c = this.x - a.x, h = this.y - a.y;
        a = this.z - a.z;
        return c * c + h * h + a * a
    }, setEulerFromRotationMatrix: function (a, c) {
        console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
    }, setEulerFromQuaternion: function (a, c) {
        console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
    }, getPositionFromMatrix: function (a) {
        console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().");
        return this.setFromMatrixPosition(a)
    }, getScaleFromMatrix: function (a) {
        console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().");
        return this.setFromMatrixScale(a)
    }, getColumnFromMatrix: function (a, c) {
        console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().");
        return this.setFromMatrixColumn(a, c)
    }, setFromMatrixPosition: function (a) {
        this.x = a.elements[12];
        this.y = a.elements[13];
        this.z = a.elements[14];
        return this
    }, setFromMatrixScale: function (a) {
        var c = this.set(a.elements[0], a.elements[1], a.elements[2]).length(),
            h = this.set(a.elements[4], a.elements[5], a.elements[6]).length();
        a = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
        this.x = c;
        this.y = h;
        this.z = a;
        return this
    }, setFromMatrixColumn: function (a, c) {
        var h = 4 * a, f = c.elements;
        this.x = f[h];
        this.y = f[h + 1];
        this.z = f[h + 2];
        return this
    }, equals: function (a) {
        return a.x === this.x && a.y === this.y && a.z === this.z
    }, fromArray: function (a, c) {
        void 0 === c && (c = 0);
        this.x = a[c];
        this.y = a[c + 1];
        this.z = a[c + 2];
        return this
    }, toArray: function (a, c) {
        void 0 === a && (a = []);
        void 0 === c && (c = 0);
        a[c] = this.x;
        a[c + 1] = this.y;
        a[c + 2] = this.z;
        return a
    }, fromAttribute: function (a, c, h) {
        void 0 === h && (h = 0);
        c = c * a.itemSize + h;
        this.x = a.array[c];
        this.y = a.array[c + 1];
        this.z = a.array[c + 2];
        return this
    }
};
var LmvBox3 = function (a, c) {
    this.min = void 0 !== a ? a : new LmvVector3(Infinity, Infinity, Infinity);
    this.max = void 0 !== c ? c : new LmvVector3(-Infinity, -Infinity, -Infinity)
};
LmvBox3.prototype = {
    constructor: LmvBox3, set: function (a, c) {
        this.min.copy(a);
        this.max.copy(c);
        return this
    }, setFromPoints: function (a) {
        this.makeEmpty();
        for (var c = 0, h = a.length; c < h; c++) this.expandByPoint(a[c]);
        return this
    }, setFromArray: function (a, c) {
        this.min.x = a[c];
        this.min.y = a[c + 1];
        this.min.z = a[c + 2];
        this.max.x = a[c + 3];
        this.max.y = a[c + 4];
        this.max.z = a[c + 5];
        return this
    }, copyToArray: function (a, c) {
        a[c] = this.min.x;
        a[c + 1] = this.min.y;
        a[c + 2] = this.min.z;
        a[c + 3] = this.max.x;
        a[c + 4] = this.max.y;
        a[c + 5] = this.max.z
    }, setFromCenterAndSize: function () {
        var a = new LmvVector3;
        return function (c, h) {
            var f = a.copy(h).multiplyScalar(.5);
            this.min.copy(c).sub(f);
            this.max.copy(c).add(f);
            return this
        }
    }(), clone: function () {
        return (new this.constructor).copy(this)
    }, copy: function (a) {
        this.min.copy(a.min);
        this.max.copy(a.max);
        return this
    }, makeEmpty: function () {
        this.min.x = this.min.y = this.min.z = Infinity;
        this.max.x = this.max.y = this.max.z = -Infinity;
        return this
    }, empty: function () {
        return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
    }, center: function (a) {
        return (a || new LmvVector3).addVectors(this.min, this.max).multiplyScalar(.5)
    }, size: function (a) {
        return (a || new LmvVector3).subVectors(this.max, this.min)
    }, expandByPoint: function (a) {
        this.min.min(a);
        this.max.max(a);
        return this
    }, expandByVector: function (a) {
        this.min.sub(a);
        this.max.add(a);
        return this
    }, expandByScalar: function (a) {
        this.min.addScalar(-a);
        this.max.addScalar(a);
        return this
    }, containsPoint: function (a) {
        return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y || a.z < this.min.z || a.z > this.max.z ? !1 : !0
    }, containsBox: function (a) {
        return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y && this.min.z <= a.min.z && a.max.z <= this.max.z ? !0 : !1
    }, getParameter: function (a, c) {
        return (c || new LmvVector3).set((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y), (a.z - this.min.z) / (this.max.z - this.min.z))
    }, isIntersectionBox: function (a) {
        return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y || a.max.z < this.min.z || a.min.z > this.max.z ? !1 : !0
    }, clampPoint: function (a, c) {
        return (c || new LmvVector3).copy(a).clamp(this.min, this.max)
    }, distanceToPoint: function () {
        var a = new LmvVector3;
        return function (c) {
            return a.copy(c).clamp(this.min, this.max).sub(c).length()
        }
    }(), intersect: function (a) {
        this.min.max(a.min);
        this.max.min(a.max);
        return this
    }, union: function (a) {
        this.min.min(a.min);
        this.max.max(a.max);
        return this
    }, applyMatrix4: function () {
        var a = [new LmvVector3, new LmvVector3, new LmvVector3, new LmvVector3, new LmvVector3, new LmvVector3, new LmvVector3, new LmvVector3];
        return function (c) {
            a[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(c);
            a[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(c);
            a[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(c);
            a[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(c);
            a[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(c);
            a[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(c);
            a[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(c);
            a[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(c);
            this.makeEmpty();
            this.setFromPoints(a);
            return this
        }
    }(), translate: function (a) {
        this.min.add(a);
        this.max.add(a);
        return this
    }, equals: function (a) {
        return a.min.equals(this.min) && a.max.equals(this.max)
    }
};
LmvMatrix4 = function (a) {
    this.elements = a ? new Float64Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]) : new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
};
LmvMatrix4.prototype = {
    constructor: LmvMatrix4, set: function (a, c, h, f, e, b, d, g, k, l, q, p, m, n, t, v) {
        var r = this.elements;
        r[0] = a;
        r[4] = c;
        r[8] = h;
        r[12] = f;
        r[1] = e;
        r[5] = b;
        r[9] = d;
        r[13] = g;
        r[2] = k;
        r[6] = l;
        r[10] = q;
        r[14] = p;
        r[3] = m;
        r[7] = n;
        r[11] = t;
        r[15] = v;
        return this
    }, identity: function () {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    }, copy: function (a) {
        this.elements.set(a.elements);
        return this
    }, makeRotationFromQuaternion: function (a) {
        var c = this.elements, h = a.x, f = a.y, e = a.z, b = a.w, d = h + h, g = f + f, k = e + e;
        a = h * d;
        var l = h * g, h = h * k, q = f * g, f = f * k, e = e * k, d = b * d, g = b * g, b = b * k;
        c[0] = 1 - (q + e);
        c[4] = l - b;
        c[8] = h + g;
        c[1] = l + b;
        c[5] = 1 - (a + e);
        c[9] = f - d;
        c[2] = h - g;
        c[6] = f + d;
        c[10] = 1 - (a + q);
        c[3] = 0;
        c[7] = 0;
        c[11] = 0;
        c[12] = 0;
        c[13] = 0;
        c[14] = 0;
        c[15] = 1;
        return this
    }, multiply: function (a) {
        return this.multiplyMatrices(this, a)
    }, multiplyMatrices: function (a, c) {
        var h = a.elements, f = c.elements, e = this.elements, b = h[0], d = h[4], g = h[8], k = h[12], l = h[1],
            q = h[5], p = h[9], m = h[13], n = h[2], t = h[6], v = h[10], r = h[14], w = h[3], u = h[7], z = h[11],
            h = h[15], x = f[0], A = f[4], y = f[8], E = f[12], D = f[1], B = f[5], F = f[9], G = f[13], H = f[2],
            I = f[6], J = f[10], C = f[14], L = f[3], M = f[7], N = f[11], f = f[15];
        e[0] = b * x + d * D + g * H + k * L;
        e[4] = b * A + d * B + g * I + k * M;
        e[8] = b * y + d * F + g * J + k * N;
        e[12] = b * E + d * G + g * C + k * f;
        e[1] = l * x + q * D + p * H + m * L;
        e[5] = l * A + q * B + p * I + m * M;
        e[9] = l * y + q * F + p * J + m * N;
        e[13] = l * E + q * G + p * C + m * f;
        e[2] = n * x + t * D + v * H + r * L;
        e[6] = n * A + t * B + v * I + r * M;
        e[10] = n * y + t * F + v * J + r * N;
        e[14] = n * E + t * G + v * C + r * f;
        e[3] = w * x + u * D + z * H + h * L;
        e[7] = w * A + u * B + z * I + h * M;
        e[11] = w * y + u * F + z * J + h * N;
        e[15] = w * E + u * G + z * C + h * f;
        return this
    }, multiplyToArray: function (a, c, h) {
        var f = this.elements;
        this.multiplyMatrices(a, c);
        h[0] = f[0];
        h[1] = f[1];
        h[2] = f[2];
        h[3] = f[3];
        h[4] = f[4];
        h[5] = f[5];
        h[6] = f[6];
        h[7] = f[7];
        h[8] = f[8];
        h[9] = f[9];
        h[10] = f[10];
        h[11] = f[11];
        h[12] = f[12];
        h[13] = f[13];
        h[14] = f[14];
        h[15] = f[15];
        return this
    }, multiplyScalar: function (a) {
        var c = this.elements;
        c[0] *= a;
        c[4] *= a;
        c[8] *= a;
        c[12] *= a;
        c[1] *= a;
        c[5] *= a;
        c[9] *= a;
        c[13] *= a;
        c[2] *= a;
        c[6] *= a;
        c[10] *= a;
        c[14] *= a;
        c[3] *= a;
        c[7] *= a;
        c[11] *= a;
        c[15] *= a;
        return this
    }, determinant: function () {
        var a = this.elements, c = a[0], h = a[4], f = a[8], e = a[12], b = a[1], d = a[5], g = a[9], k = a[13],
            l = a[2], q = a[6], p = a[10], m = a[14];
        return a[3] * (+e * g * q - f * k * q - e * d * p + h * k * p + f * d * m - h * g * m) + a[7] * (+c * g * m - c * k * p + e * b * p - f * b * m + f * k * l - e * g * l) + a[11] * (+c * k * q - c * d * m - e * b * q + h * b * m + e * d * l - h * k * l) + a[15] * (-f * d * l - c * g * q + c * d * p + f * b * q - h * b * p + h * g * l)
    }, transpose: function () {
        var a = this.elements, c;
        c = a[1];
        a[1] = a[4];
        a[4] = c;
        c = a[2];
        a[2] = a[8];
        a[8] = c;
        c = a[6];
        a[6] = a[9];
        a[9] = c;
        c = a[3];
        a[3] = a[12];
        a[12] = c;
        c = a[7];
        a[7] = a[13];
        a[13] = c;
        c = a[11];
        a[11] = a[14];
        a[14] = c;
        return this
    }, flattenToArrayOffset: function (a, c) {
        var h = this.elements;
        a[c] = h[0];
        a[c + 1] = h[1];
        a[c + 2] = h[2];
        a[c + 3] = h[3];
        a[c + 4] = h[4];
        a[c + 5] = h[5];
        a[c + 6] = h[6];
        a[c + 7] = h[7];
        a[c + 8] = h[8];
        a[c + 9] = h[9];
        a[c + 10] = h[10];
        a[c + 11] = h[11];
        a[c + 12] = h[12];
        a[c + 13] = h[13];
        a[c + 14] = h[14];
        a[c + 15] = h[15];
        return a
    }, setPosition: function (a) {
        var c = this.elements;
        c[12] = a.x;
        c[13] = a.y;
        c[14] = a.z;
        return this
    }, getInverse: function (a, c) {
        var h = this.elements, f = a.elements, e = f[0], b = f[4], d = f[8], g = f[12], k = f[1], l = f[5], q = f[9],
            p = f[13], m = f[2], n = f[6], t = f[10], v = f[14], r = f[3], w = f[7], u = f[11], f = f[15];
        h[0] = q * v * w - p * t * w + p * n * u - l * v * u - q * n * f + l * t * f;
        h[4] = g * t * w - d * v * w - g * n * u + b * v * u + d * n * f - b * t * f;
        h[8] = d * p * w - g * q * w + g * l * u - b * p * u - d * l * f + b * q * f;
        h[12] = g * q * n - d * p * n - g * l * t + b * p * t + d * l * v - b * q * v;
        h[1] = p * t * r - q * v * r - p * m * u + k * v * u + q * m * f - k * t * f;
        h[5] = d * v * r - g * t * r + g * m * u - e * v * u - d * m * f + e * t * f;
        h[9] = g * q * r - d * p * r - g * k * u + e * p * u + d * k * f - e * q * f;
        h[13] = d * p * m - g * q * m + g * k * t - e * p * t - d * k * v + e * q * v;
        h[2] = l * v * r - p * n * r + p * m * w - k * v * w - l * m * f + k * n * f;
        h[6] = g * n * r - b * v * r - g * m * w + e * v * w + b * m * f - e * n * f;
        h[10] = b * p * r - g * l * r + g * k * w - e * p * w - b * k * f + e * l * f;
        h[14] = g * l * m - b * p * m - g * k * n + e * p * n + b * k * v - e * l * v;
        h[3] = q * n * r - l * t * r - q * m * w + k * t * w + l * m * u - k * n * u;
        h[7] = b * t * r - d * n * r + d * m * w - e * t * w - b * m * u + e * n * u;
        h[11] = d * l * r - b * q * r - d * k * w + e * q * w + b * k * u - e * l * u;
        h[15] = b * q * m - d * l * m + d * k * n - e * q * n - b * k * t + e * l * t;
        h = e * h[0] + k * h[4] + m * h[8] + r * h[12];
        if (0 == h) {
            if (c) throw Error("Matrix4.getInverse(): can't invert matrix, determinant is 0");
            console.warn("Matrix4.getInverse(): can't invert matrix, determinant is 0");
            this.identity();
            return this
        }
        this.multiplyScalar(1 / h);
        return this
    }, scale: function (a) {
        var c = this.elements, h = a.x, f = a.y;
        a = a.z;
        c[0] *= h;
        c[4] *= f;
        c[8] *= a;
        c[1] *= h;
        c[5] *= f;
        c[9] *= a;
        c[2] *= h;
        c[6] *= f;
        c[10] *= a;
        c[3] *= h;
        c[7] *= f;
        c[11] *= a;
        return this
    }, makeTranslation: function (a, c, h) {
        this.set(1, 0, 0, a, 0, 1, 0, c, 0, 0, 1, h, 0, 0, 0, 1);
        return this
    }, makeRotationX: function (a) {
        var c = Math.cos(a);
        a = Math.sin(a);
        this.set(1, 0, 0, 0, 0, c, -a, 0, 0, a, c, 0, 0, 0, 0, 1);
        return this
    }, makeRotationY: function (a) {
        var c = Math.cos(a);
        a = Math.sin(a);
        this.set(c, 0, a, 0, 0, 1, 0, 0, -a, 0, c, 0, 0, 0, 0, 1);
        return this
    }, makeRotationZ: function (a) {
        var c = Math.cos(a);
        a = Math.sin(a);
        this.set(c, -a, 0, 0, a, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    }, makeRotationAxis: function (a, c) {
        var h = Math.cos(c), f = Math.sin(c), e = 1 - h, b = a.x, d = a.y, g = a.z, k = e * b, l = e * d;
        this.set(k * b + h, k * d - f * g, k * g + f * d, 0, k * d + f * g, l * d + h, l * g - f * b, 0, k * g - f * d, l * g + f * b, e * g * g + h, 0, 0, 0, 0, 1);
        return this
    }, makeScale: function (a, c, h) {
        this.set(a, 0, 0, 0, 0, c, 0, 0, 0, 0, h, 0, 0, 0, 0, 1);
        return this
    }, compose: function (a, c, h) {
        this.makeRotationFromQuaternion(c);
        this.scale(h);
        this.setPosition(a);
        return this
    }, transformPoint: function (a) {
        var c = a.x, h = a.y, f = a.z, e = this.elements;
        a.x = e[0] * c + e[4] * h + e[8] * f + e[12];
        a.y = e[1] * c + e[5] * h + e[9] * f + e[13];
        a.z = e[2] * c + e[6] * h + e[10] * f + e[14];
        return a
    }, transformDirection: function (a) {
        var c = a.x, h = a.y, f = a.z, e = this.elements;
        a.x = e[0] * c + e[4] * h + e[8] * f;
        a.y = e[1] * c + e[5] * h + e[9] * f;
        a.z = e[2] * c + e[6] * h + e[10] * f;
        c = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
        0 < c && (c = 1 / c, a.x *= c, a.y *= c, a.z *= c);
        return a
    }, fromArray: function (a) {
        this.elements.set(a);
        return this
    }, toArray: function () {
        var a = this.elements;
        return [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]]
    }, clone: function () {
        return (new LmvMatrix4).fromArray(this.elements)
    }
};
(function () {
    function a(a) {
        throw a;
    }

    function c(a, b) {
        var d = a.split("."), g = q;
        d[0] in g || !g.execScript || g.execScript("var " + d[0]);
        for (var e; d.length && (e = d.shift());) d.length || void 0 === b ? g = g[e] ? g[e] : g[e] = {} : g[e] = b
    }

    function h(a, b, d) {
        var g;
        "number" === typeof b || (b = 0);
        var e = "number" === typeof d ? d : a.length;
        d = -1;
        for (g = e & 7; g--; ++b) d = d >>> 8 ^ v[(d ^ a[b]) & 255];
        for (g = e >> 3; g--; b += 8) d = d >>> 8 ^ v[(d ^ a[b]) & 255], d = d >>> 8 ^ v[(d ^ a[b + 1]) & 255], d = d >>> 8 ^ v[(d ^ a[b + 2]) & 255], d = d >>> 8 ^ v[(d ^ a[b + 3]) & 255], d = d >>> 8 ^ v[(d ^ a[b + 4]) & 255], d = d >>> 8 ^ v[(d ^ a[b + 5]) & 255], d = d >>> 8 ^ v[(d ^ a[b + 6]) & 255], d = d >>> 8 ^ v[(d ^ a[b + 7]) & 255];
        return (d ^ 4294967295) >>> 0
    }

    function f() {
    }

    function e(a) {
        var b = a.length, d = 0, g = Number.POSITIVE_INFINITY, e, l, c, k, f, q, h, m, n;
        for (m = 0; m < b; ++m) a[m] > d && (d = a[m]), a[m] < g && (g = a[m]);
        e = 1 << d;
        l = new (p ? Uint32Array : Array)(e);
        c = 1;
        k = 0;
        for (f = 2; c <= d;) {
            for (m = 0; m < b; ++m) if (a[m] === c) {
                q = 0;
                h = k;
                for (n = 0; n < c; ++n) q = q << 1 | h & 1, h >>= 1;
                for (n = q; n < e; n += f) l[n] = c << 16 | m;
                ++k
            }
            ++c;
            k <<= 1;
            f <<= 1
        }
        return [l, d, g]
    }

    function b(b, d) {
        this.i = [];
        this.j = 32768;
        this.d = this.f = this.c = this.n = 0;
        this.input = p ? new Uint8Array(b) : b;
        this.o = !1;
        this.k = w;
        this.w = !1;
        if (d || !(d = {})) d.index && (this.c = d.index), d.bufferSize && (this.j = d.bufferSize), d.bufferType && (this.k = d.bufferType), d.resize && (this.w = d.resize);
        switch (this.k) {
            case r:
                this.a = 32768;
                this.b = new (p ? Uint8Array : Array)(32768 + this.j + 258);
                break;
            case w:
                this.a = 0;
                this.b = new (p ? Uint8Array : Array)(this.j);
                this.e = this.D;
                this.q = this.A;
                this.l = this.C;
                break;
            default:
                a(Error("invalid inflate mode"))
        }
    }

    function d(b, d) {
        for (var g = b.f, e = b.d, l = b.input, c = b.c, k; e < d;) k = l[c++], void 0 === k && a(Error("input buffer is broken")), g |= k << e, e += 8;
        b.f = g >>> d;
        b.d = e - d;
        b.c = c;
        return g & (1 << d) - 1
    }

    function g(a, b) {
        for (var d = a.f, g = a.d, e = a.input, l = a.c, c = b[0], k = b[1], f; g < k;) {
            f = e[l++];
            if (void 0 === f) break;
            d |= f << g;
            g += 8
        }
        e = c[d & (1 << k) - 1];
        c = e >>> 16;
        a.f = d >> c;
        a.d = g - c;
        a.c = l;
        return e & 65535
    }

    function k(a) {
        function b(a, b, e) {
            var l, c, k, f;
            for (f = 0; f < a;) switch (l = g(this, b), l) {
                case 16:
                    for (k = 3 + d(this, 2); k--;) e[f++] = c;
                    break;
                case 17:
                    for (k = 3 + d(this, 3); k--;) e[f++] = 0;
                    c = 0;
                    break;
                case 18:
                    for (k = 11 + d(this, 7); k--;) e[f++] = 0;
                    c = 0;
                    break;
                default:
                    c = e[f++] = l
            }
            return e
        }

        var l = d(a, 5) + 257, c = d(a, 5) + 1, k = d(a, 4) + 4, f = new (p ? Uint8Array : Array)(u.length), q;
        for (q = 0; q < k; ++q) f[u[q]] = d(a, 3);
        k = e(f);
        f = new (p ? Uint8Array : Array)(l);
        q = new (p ? Uint8Array : Array)(c);
        a.l(e(b.call(a, l, k, f)), e(b.call(a, c, k, q)))
    }

    function l(a) {
        this.input = a;
        this.c = 0;
        this.m = [];
        this.s = !1
    }

    var q = this,
        p = "undefined" !== typeof Uint8Array && "undefined" !== typeof Uint16Array && "undefined" !== typeof Uint32Array;
    new (p ? Uint8Array : Array)(256);
    var m;
    for (m = 0; 256 > m; ++m) for (var n = m, t = 7, n = n >>> 1; n; n >>>= 1) --t;
    m = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918E3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
    var v = p ? new Uint32Array(m) : m;
    f.prototype.getName = function () {
        return this.name
    };
    f.prototype.getData = function () {
        return this.data
    };
    f.prototype.G = function () {
        return this.H
    };
    c("Zlib.GunzipMember", f);
    c("Zlib.GunzipMember.prototype.getName", f.prototype.getName);
    c("Zlib.GunzipMember.prototype.getData", f.prototype.getData);
    c("Zlib.GunzipMember.prototype.getMtime", f.prototype.G);
    m = [];
    for (n = 0; 288 > n; n++) switch (!0) {
        case 143 >= n:
            m.push([n + 48, 8]);
            break;
        case 255 >= n:
            m.push([n - 144 + 400, 9]);
            break;
        case 279 >= n:
            m.push([n - 256 + 0, 7]);
            break;
        case 287 >= n:
            m.push([n - 280 + 192, 8]);
            break;
        default:
            a("invalid literal: " + n)
    }
    m = function () {
        function b(b) {
            switch (!0) {
                case 3 === b:
                    return [257, b - 3, 0];
                case 4 === b:
                    return [258, b - 4, 0];
                case 5 === b:
                    return [259, b - 5, 0];
                case 6 === b:
                    return [260, b - 6, 0];
                case 7 === b:
                    return [261, b - 7, 0];
                case 8 === b:
                    return [262, b - 8, 0];
                case 9 === b:
                    return [263, b - 9, 0];
                case 10 === b:
                    return [264, b - 10, 0];
                case 12 >= b:
                    return [265, b - 11, 1];
                case 14 >= b:
                    return [266, b - 13, 1];
                case 16 >= b:
                    return [267, b - 15, 1];
                case 18 >= b:
                    return [268, b - 17, 1];
                case 22 >= b:
                    return [269, b - 19, 2];
                case 26 >= b:
                    return [270, b - 23, 2];
                case 30 >= b:
                    return [271, b - 27, 2];
                case 34 >= b:
                    return [272, b - 31, 2];
                case 42 >= b:
                    return [273, b - 35, 3];
                case 50 >= b:
                    return [274, b - 43, 3];
                case 58 >= b:
                    return [275, b - 51, 3];
                case 66 >= b:
                    return [276, b - 59, 3];
                case 82 >= b:
                    return [277, b - 67, 4];
                case 98 >= b:
                    return [278, b - 83, 4];
                case 114 >= b:
                    return [279, b - 99, 4];
                case 130 >= b:
                    return [280, b - 115, 4];
                case 162 >= b:
                    return [281, b - 131, 5];
                case 194 >= b:
                    return [282, b - 163, 5];
                case 226 >= b:
                    return [283, b - 195, 5];
                case 257 >= b:
                    return [284, b - 227, 5];
                case 258 === b:
                    return [285, b - 258, 0];
                default:
                    a("invalid length: " + b)
            }
        }

        var d = [], g, e;
        for (g = 3; 258 >= g; g++) e = b(g), d[g] = e[2] << 24 | e[1] << 16 | e[0];
        return d
    }();
    p && new Uint32Array(m);
    var r = 0, w = 1;
    b.prototype.g = function () {
        for (; !this.o;) {
            var b = d(this, 3);
            b & 1 && (this.o = !0);
            b >>>= 1;
            switch (b) {
                case 0:
                    var b = this.input, g = this.c, e = this.b, l = this.a, c, f, q, h = e.length;
                    this.d = this.f = 0;
                    c = b[g++];
                    void 0 === c && a(Error("invalid uncompressed block header: LEN (first byte)"));
                    f = c;
                    c = b[g++];
                    void 0 === c && a(Error("invalid uncompressed block header: LEN (second byte)"));
                    f |= c << 8;
                    c = b[g++];
                    void 0 === c && a(Error("invalid uncompressed block header: NLEN (first byte)"));
                    q = c;
                    c = b[g++];
                    void 0 === c && a(Error("invalid uncompressed block header: NLEN (second byte)"));
                    q |= c << 8;
                    f === ~q && a(Error("invalid uncompressed block header: length verify"));
                    g + f > b.length && a(Error("input buffer is broken"));
                    switch (this.k) {
                        case r:
                            for (; l + f > e.length;) {
                                c = h - l;
                                f -= c;
                                if (p) e.set(b.subarray(g, g + c), l), l += c, g += c; else for (; c--;) e[l++] = b[g++];
                                this.a = l;
                                e = this.e();
                                l = this.a
                            }
                            break;
                        case w:
                            for (; l + f > e.length;) e = this.e({t: 2});
                            break;
                        default:
                            a(Error("invalid inflate mode"))
                    }
                    if (p) e.set(b.subarray(g, g + f), l), l += f, g += f; else for (; f--;) e[l++] = b[g++];
                    this.c = g;
                    this.a = l;
                    this.b = e;
                    break;
                case 1:
                    this.l(E, D);
                    break;
                case 2:
                    k(this);
                    break;
                default:
                    a(Error("unknown BTYPE: " + b))
            }
        }
        return this.q()
    };
    m = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    var u = p ? new Uint16Array(m) : m;
    m = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 258, 258];
    var z = p ? new Uint16Array(m) : m;
    m = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0];
    var x = p ? new Uint8Array(m) : m;
    m = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
    var A = p ? new Uint16Array(m) : m;
    m = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
    var y = p ? new Uint8Array(m) : m;
    m = new (p ? Uint8Array : Array)(288);
    n = 0;
    for (t = m.length; n < t; ++n) m[n] = 143 >= n ? 8 : 255 >= n ? 9 : 279 >= n ? 7 : 8;
    var E = e(m);
    m = new (p ? Uint8Array : Array)(30);
    n = 0;
    for (t = m.length; n < t; ++n) m[n] = 5;
    var D = e(m);
    b.prototype.l = function (a, b) {
        var e = this.b, c = this.a;
        this.r = a;
        for (var l = e.length - 258, k, f, q; 256 !== (k = g(this, a));) if (256 > k) c >= l && (this.a = c, e = this.e(), c = this.a), e[c++] = k; else for (k -= 257, q = z[k], 0 < x[k] && (q += d(this, x[k])), k = g(this, b), f = A[k], 0 < y[k] && (f += d(this, y[k])), c >= l && (this.a = c, e = this.e(), c = this.a); q--;) e[c] = e[c++ - f];
        for (; 8 <= this.d;) this.d -= 8, this.c--;
        this.a = c
    };
    b.prototype.C = function (a, b) {
        var e = this.b, c = this.a;
        this.r = a;
        for (var l = e.length, k, f, q; 256 !== (k = g(this, a));) if (256 > k) c >= l && (e = this.e(), l = e.length), e[c++] = k; else for (k -= 257, q = z[k], 0 < x[k] && (q += d(this, x[k])), k = g(this, b), f = A[k], 0 < y[k] && (f += d(this, y[k])), c + q > l && (e = this.e(), l = e.length); q--;) e[c] = e[c++ - f];
        for (; 8 <= this.d;) this.d -= 8, this.c--;
        this.a = c
    };
    b.prototype.e = function () {
        var a = new (p ? Uint8Array : Array)(this.a - 32768), b = this.a - 32768, d, g, e = this.b;
        if (p) a.set(e.subarray(32768, a.length)); else for (d = 0, g = a.length; d < g; ++d) a[d] = e[d + 32768];
        this.i.push(a);
        this.n += a.length;
        if (p) e.set(e.subarray(b, b + 32768)); else for (d = 0; 32768 > d; ++d) e[d] = e[b + d];
        this.a = 32768;
        return e
    };
    b.prototype.D = function (a) {
        var b, d = this.input.length / this.c + 1 | 0, g, e, c, l = this.input, k = this.b;
        a && ("number" === typeof a.t && (d = a.t), "number" === typeof a.z && (d += a.z));
        2 > d ? (g = (l.length - this.c) / this.r[2], c = g / 2 * 258 | 0, e = c < k.length ? k.length + c : k.length << 1) : e = k.length * d;
        p ? (b = new Uint8Array(e), b.set(k)) : b = k;
        return this.b = b
    };
    b.prototype.q = function () {
        var a = 0, b = this.b, d = this.i, g, e = new (p ? Uint8Array : Array)(this.n + (this.a - 32768)), c, l, k, f;
        if (0 === d.length) return p ? this.b.subarray(32768, this.a) : this.b.slice(32768, this.a);
        c = 0;
        for (l = d.length; c < l; ++c) for (g = d[c], k = 0, f = g.length; k < f; ++k) e[a++] = g[k];
        c = 32768;
        for (l = this.a; c < l; ++c) e[a++] = b[c];
        this.i = [];
        return this.buffer = e
    };
    b.prototype.A = function () {
        var a, b = this.a;
        p ? this.w ? (a = new Uint8Array(b), a.set(this.b.subarray(0, b))) : a = this.b.subarray(0, b) : (this.b.length > b && (this.b.length = b), a = this.b);
        return this.buffer = a
    };
    l.prototype.F = function () {
        this.s || this.g();
        return this.m.slice()
    };
    l.prototype.g = function () {
        for (var d = this.input.length; this.c < d;) {
            var g = new f, e, c, l;
            l = void 0;
            var k, q, m = this.input;
            c = this.c;
            g.u = m[c++];
            g.v = m[c++];
            31 === g.u && 139 === g.v || a(Error("invalid file signature:" + g.u + "," + g.v));
            g.p = m[c++];
            switch (g.p) {
                case 8:
                    break;
                default:
                    a(Error("unknown compression method: " + g.p))
            }
            g.h = m[c++];
            e = m[c++] | m[c++] << 8 | m[c++] << 16 | m[c++] << 24;
            g.H = new Date(1E3 * e);
            g.N = m[c++];
            g.M = m[c++];
            0 < (g.h & 4) && (g.I = m[c++] | m[c++] << 8, c += g.I);
            if (0 < (g.h & 8)) {
                q = [];
                for (k = 0; 0 < (e = m[c++]);) q[k++] = String.fromCharCode(e);
                g.name = q.join("")
            }
            if (0 < (g.h & 16)) {
                q = [];
                for (k = 0; 0 < (e = m[c++]);) q[k++] = String.fromCharCode(e);
                g.J = q.join("")
            }
            0 < (g.h & 2) && (g.B = h(m, 0, c) & 65535, g.B !== (m[c++] | m[c++] << 8) && a(Error("invalid header crc16")));
            e = m[m.length - 4] | m[m.length - 3] << 8 | m[m.length - 2] << 16 | m[m.length - 1] << 24;
            m.length - c - 4 - 4 < 512 * e && (l = e);
            c = new b(m, {index: c, bufferSize: l});
            g.data = l = c.g();
            c = c.c;
            g.K = e = (m[c++] | m[c++] << 8 | m[c++] << 16 | m[c++] << 24) >>> 0;
            h(l, void 0, void 0) !== e && a(Error("invalid CRC-32 checksum: 0x" + h(l, void 0, void 0).toString(16) + " / 0x" + e.toString(16)));
            g.L = e = (m[c++] | m[c++] << 8 | m[c++] << 16 | m[c++] << 24) >>> 0;
            (l.length & 4294967295) !== e && a(Error("invalid input size: " + (l.length & 4294967295) + " / " + e));
            this.m.push(g);
            this.c = c
        }
        this.s = !0;
        d = this.m;
        g = l = c = 0;
        for (m = d.length; g < m; ++g) l += d[g].data.length;
        if (p) for (l = new Uint8Array(l), g = 0; g < m; ++g) l.set(d[g].data, c), c += d[g].data.length; else {
            l = [];
            for (g = 0; g < m; ++g) l[g] = d[g].data;
            l = Array.prototype.concat.apply([], l)
        }
        return l
    };
    c("Zlib.Gunzip", l);
    c("Zlib.Gunzip.prototype.decompress", l.prototype.g);
    c("Zlib.Gunzip.prototype.getMembers", l.prototype.F)
}).call(this);
(function () {
    function a(a) {
        throw a;
    }

    function c(a, b) {
        var d = a.split("."), g = t;
        d[0] in g || !g.execScript || g.execScript("var " + d[0]);
        for (var e; d.length && (e = d.shift());) d.length || void 0 === b ? g = g[e] ? g[e] : g[e] = {} : g[e] = b
    }

    function h(a) {
        var b = a.length, d = 0, g = Number.POSITIVE_INFINITY, e, c, l, k, f, q, h, m, p;
        for (m = 0; m < b; ++m) a[m] > d && (d = a[m]), a[m] < g && (g = a[m]);
        e = 1 << d;
        c = new (v ? Uint32Array : Array)(e);
        l = 1;
        k = 0;
        for (f = 2; l <= d;) {
            for (m = 0; m < b; ++m) if (a[m] === l) {
                q = 0;
                h = k;
                for (p = 0; p < l; ++p) q = q << 1 | h & 1, h >>= 1;
                for (p = q; p < e; p += f) c[p] = l << 16 | m;
                ++k
            }
            ++l;
            k <<= 1;
            f <<= 1
        }
        return [c, d, g]
    }

    function f(b, d) {
        this.l = [];
        this.m = 32768;
        this.d = this.f = this.c = this.t = 0;
        this.input = v ? new Uint8Array(b) : b;
        this.u = !1;
        this.n = x;
        this.K = !1;
        if (d || !(d = {})) d.index && (this.c = d.index), d.bufferSize && (this.m = d.bufferSize), d.bufferType && (this.n = d.bufferType), d.resize && (this.K = d.resize);
        switch (this.n) {
            case z:
                this.a = 32768;
                this.b = new (v ? Uint8Array : Array)(32768 + this.m + 258);
                break;
            case x:
                this.a = 0;
                this.b = new (v ? Uint8Array : Array)(this.m);
                this.e = this.W;
                this.B = this.R;
                this.q = this.V;
                break;
            default:
                a(Error("invalid inflate mode"))
        }
    }

    function e(b, d) {
        for (var g = b.f, e = b.d, c = b.input, l = b.c, k; e < d;) k = c[l++], void 0 === k && a(Error("input buffer is broken")), g |= k << e, e += 8;
        b.f = g >>> d;
        b.d = e - d;
        b.c = l;
        return g & (1 << d) - 1
    }

    function b(a, b) {
        for (var d = a.f, g = a.d, e = a.input, c = a.c, l = b[0], k = b[1], f; g < k;) {
            f = e[c++];
            if (void 0 === f) break;
            d |= f << g;
            g += 8
        }
        e = l[d & (1 << k) - 1];
        l = e >>> 16;
        a.f = d >> l;
        a.d = g - l;
        a.c = c;
        return e & 65535
    }

    function d(a) {
        function d(a, d, g) {
            var c, l, k, f;
            for (f = 0; f < a;) switch (c = b(this, d), c) {
                case 16:
                    for (k = 3 + e(this, 2); k--;) g[f++] = l;
                    break;
                case 17:
                    for (k = 3 + e(this, 3); k--;) g[f++] = 0;
                    l = 0;
                    break;
                case 18:
                    for (k = 11 + e(this, 7); k--;) g[f++] = 0;
                    l = 0;
                    break;
                default:
                    l = g[f++] = c
            }
            return g
        }

        var g = e(a, 5) + 257, c = e(a, 5) + 1, l = e(a, 4) + 4, k = new (v ? Uint8Array : Array)(A.length), f;
        for (f = 0; f < l; ++f) k[A[f]] = e(a, 3);
        l = h(k);
        k = new (v ? Uint8Array : Array)(g);
        f = new (v ? Uint8Array : Array)(c);
        a.q(h(d.call(a, g, l, k)), h(d.call(a, c, l, f)))
    }

    function g(a) {
        a = a || {};
        this.files = [];
        this.v = a.comment
    }

    function k(a, b) {
        b = b || {};
        this.input = v && a instanceof Array ? new Uint8Array(a) : a;
        this.c = 0;
        this.ba = b.verify || !1;
        this.j = b.password
    }

    function l(a, b) {
        this.input = a;
        this.offset = b
    }

    function q(a, b) {
        this.input = a;
        this.offset = b
    }

    function p(b) {
        var d = [], g = {}, e, c, k, f;
        if (!b.i) {
            if (void 0 === b.o) {
                e = b.input;
                if (!b.D) a:{
                    c = b.input;
                    for (k = c.length - 12; 0 < k; --k) if (c[k] === J[0] && c[k + 1] === J[1] && c[k + 2] === J[2] && c[k + 3] === J[3]) {
                        b.D = k;
                        break a
                    }
                    a(Error("End of Central Directory Record not found"))
                }
                c = b.D;
                e[c++] === J[0] && e[c++] === J[1] && e[c++] === J[2] && e[c++] === J[3] || a(Error("invalid signature"));
                b.ha = e[c++] | e[c++] << 8;
                b.ja = e[c++] | e[c++] << 8;
                b.ka = e[c++] | e[c++] << 8;
                b.aa = e[c++] | e[c++] << 8;
                b.Q = (e[c++] | e[c++] << 8 | e[c++] << 16 | e[c++] << 24) >>> 0;
                b.o = (e[c++] | e[c++] << 8 | e[c++] << 16 | e[c++] << 24) >>> 0;
                b.w = e[c++] | e[c++] << 8;
                b.v = v ? e.subarray(c, c + b.w) : e.slice(c, c + b.w)
            }
            e = b.o;
            k = 0;
            for (f = b.aa; k < f; ++k) c = new l(b.input, e), c.parse(), e += c.length, d[k] = c, g[c.filename] = k;
            b.Q < e - b.o && a(Error("invalid file header size"));
            b.i = d;
            b.G = g
        }
    }

    function m(a, b, d) {
        d ^= a.s(b);
        a.k(b, d);
        return d
    }

    var n, t = this,
        v = "undefined" !== typeof Uint8Array && "undefined" !== typeof Uint16Array && "undefined" !== typeof Uint32Array;
    new (v ? Uint8Array : Array)(256);
    for (n = 0; 256 > n; ++n) for (var r = n, w = 7, r = r >>> 1; r; r >>>= 1) --w;
    n = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918E3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
    var u = v ? new Uint32Array(n) : n;
    n = [];
    for (r = 0; 288 > r; r++) switch (!0) {
        case 143 >= r:
            n.push([r + 48, 8]);
            break;
        case 255 >= r:
            n.push([r - 144 + 400, 9]);
            break;
        case 279 >= r:
            n.push([r - 256 + 0, 7]);
            break;
        case 287 >= r:
            n.push([r - 280 + 192, 8]);
            break;
        default:
            a("invalid literal: " + r)
    }
    n = function () {
        function b(b) {
            switch (!0) {
                case 3 === b:
                    return [257, b - 3, 0];
                case 4 === b:
                    return [258, b - 4, 0];
                case 5 === b:
                    return [259, b - 5, 0];
                case 6 === b:
                    return [260, b - 6, 0];
                case 7 === b:
                    return [261, b - 7, 0];
                case 8 === b:
                    return [262, b - 8, 0];
                case 9 === b:
                    return [263, b - 9, 0];
                case 10 === b:
                    return [264, b - 10, 0];
                case 12 >= b:
                    return [265, b - 11, 1];
                case 14 >= b:
                    return [266, b - 13, 1];
                case 16 >= b:
                    return [267, b - 15, 1];
                case 18 >= b:
                    return [268, b - 17, 1];
                case 22 >= b:
                    return [269, b - 19, 2];
                case 26 >= b:
                    return [270, b - 23, 2];
                case 30 >= b:
                    return [271, b - 27, 2];
                case 34 >= b:
                    return [272, b - 31, 2];
                case 42 >= b:
                    return [273, b - 35, 3];
                case 50 >= b:
                    return [274, b - 43, 3];
                case 58 >= b:
                    return [275, b - 51, 3];
                case 66 >= b:
                    return [276, b - 59, 3];
                case 82 >= b:
                    return [277, b - 67, 4];
                case 98 >= b:
                    return [278, b - 83, 4];
                case 114 >= b:
                    return [279, b - 99, 4];
                case 130 >= b:
                    return [280, b - 115, 4];
                case 162 >= b:
                    return [281, b - 131, 5];
                case 194 >= b:
                    return [282, b - 163, 5];
                case 226 >= b:
                    return [283, b - 195, 5];
                case 257 >= b:
                    return [284, b - 227, 5];
                case 258 === b:
                    return [285, b - 258, 0];
                default:
                    a("invalid length: " + b)
            }
        }

        var d = [], g, c;
        for (g = 3; 258 >= g; g++) c = b(g), d[g] = c[2] << 24 | c[1] << 16 | c[0];
        return d
    }();
    v && new Uint32Array(n);
    var z = 0, x = 1;
    f.prototype.r = function () {
        for (; !this.u;) {
            var b = e(this, 3);
            b & 1 && (this.u = !0);
            b >>>= 1;
            switch (b) {
                case 0:
                    var b = this.input, g = this.c, c = this.b, l = this.a, k, f, q, m = c.length;
                    this.d = this.f = 0;
                    k = b[g++];
                    void 0 === k && a(Error("invalid uncompressed block header: LEN (first byte)"));
                    f = k;
                    k = b[g++];
                    void 0 === k && a(Error("invalid uncompressed block header: LEN (second byte)"));
                    f |= k << 8;
                    k = b[g++];
                    void 0 === k && a(Error("invalid uncompressed block header: NLEN (first byte)"));
                    q = k;
                    k = b[g++];
                    void 0 === k && a(Error("invalid uncompressed block header: NLEN (second byte)"));
                    q |= k << 8;
                    f === ~q && a(Error("invalid uncompressed block header: length verify"));
                    g + f > b.length && a(Error("input buffer is broken"));
                    switch (this.n) {
                        case z:
                            for (; l + f > c.length;) {
                                k = m - l;
                                f -= k;
                                if (v) c.set(b.subarray(g, g + k), l), l += k, g += k; else for (; k--;) c[l++] = b[g++];
                                this.a = l;
                                c = this.e();
                                l = this.a
                            }
                            break;
                        case x:
                            for (; l + f > c.length;) c = this.e({H: 2});
                            break;
                        default:
                            a(Error("invalid inflate mode"))
                    }
                    if (v) c.set(b.subarray(g, g + f), l), l += f, g += f; else for (; f--;) c[l++] = b[g++];
                    this.c = g;
                    this.a = l;
                    this.b = c;
                    break;
                case 1:
                    this.q(F, G);
                    break;
                case 2:
                    d(this);
                    break;
                default:
                    a(Error("unknown BTYPE: " + b))
            }
        }
        return this.B()
    };
    n = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    var A = v ? new Uint16Array(n) : n;
    n = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 258, 258];
    var y = v ? new Uint16Array(n) : n;
    n = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0];
    var E = v ? new Uint8Array(n) : n;
    n = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
    var D = v ? new Uint16Array(n) : n;
    n = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
    var B = v ? new Uint8Array(n) : n;
    n = new (v ? Uint8Array : Array)(288);
    r = 0;
    for (w = n.length; r < w; ++r) n[r] = 143 >= r ? 8 : 255 >= r ? 9 : 279 >= r ? 7 : 8;
    var F = h(n);
    n = new (v ? Uint8Array : Array)(30);
    r = 0;
    for (w = n.length; r < w; ++r) n[r] = 5;
    var G = h(n);
    n = f.prototype;
    n.q = function (a, d) {
        var g = this.b, c = this.a;
        this.C = a;
        for (var l = g.length - 258, k, f, q; 256 !== (k = b(this, a));) if (256 > k) c >= l && (this.a = c, g = this.e(), c = this.a), g[c++] = k; else for (k -= 257, q = y[k], 0 < E[k] && (q += e(this, E[k])), k = b(this, d), f = D[k], 0 < B[k] && (f += e(this, B[k])), c >= l && (this.a = c, g = this.e(), c = this.a); q--;) g[c] = g[c++ - f];
        for (; 8 <= this.d;) this.d -= 8, this.c--;
        this.a = c
    };
    n.V = function (a, d) {
        var g = this.b, c = this.a;
        this.C = a;
        for (var l = g.length, k, f, q; 256 !== (k = b(this, a));) if (256 > k) c >= l && (g = this.e(), l = g.length), g[c++] = k; else for (k -= 257, q = y[k], 0 < E[k] && (q += e(this, E[k])), k = b(this, d), f = D[k], 0 < B[k] && (f += e(this, B[k])), c + q > l && (g = this.e(), l = g.length); q--;) g[c] = g[c++ - f];
        for (; 8 <= this.d;) this.d -= 8, this.c--;
        this.a = c
    };
    n.e = function () {
        var b = new (v ? Uint8Array : Array)(this.a - 32768), a = this.a - 32768, d, g, c = this.b;
        if (v) b.set(c.subarray(32768, b.length)); else for (d = 0, g = b.length; d < g; ++d) b[d] = c[d + 32768];
        this.l.push(b);
        this.t += b.length;
        if (v) c.set(c.subarray(a, a + 32768)); else for (d = 0; 32768 > d; ++d) c[d] = c[a + d];
        this.a = 32768;
        return c
    };
    n.W = function (b) {
        var a, d = this.input.length / this.c + 1 | 0, g, c, e, l = this.input, k = this.b;
        b && ("number" === typeof b.H && (d = b.H), "number" === typeof b.P && (d += b.P));
        2 > d ? (g = (l.length - this.c) / this.C[2], e = g / 2 * 258 | 0, c = e < k.length ? k.length + e : k.length << 1) : c = k.length * d;
        v ? (a = new Uint8Array(c), a.set(k)) : a = k;
        return this.b = a
    };
    n.B = function () {
        var b = 0, a = this.b, d = this.l, g, c = new (v ? Uint8Array : Array)(this.t + (this.a - 32768)), e, k, l, f;
        if (0 === d.length) return v ? this.b.subarray(32768, this.a) : this.b.slice(32768, this.a);
        e = 0;
        for (k = d.length; e < k; ++e) for (g = d[e], l = 0, f = g.length; l < f; ++l) c[b++] = g[l];
        e = 32768;
        for (k = this.a; e < k; ++e) c[b++] = a[e];
        this.l = [];
        return this.buffer = c
    };
    n.R = function () {
        var b, a = this.a;
        v ? this.K ? (b = new Uint8Array(a), b.set(this.b.subarray(0, a))) : b = this.b.subarray(0, a) : (this.b.length > a && (this.b.length = a), b = this.b);
        return this.buffer = b
    };
    g.prototype.L = function (b) {
        this.j = b
    };
    g.prototype.s = function (b) {
        b = b[2] & 65535 | 2;
        return b * (b ^ 1) >> 8 & 255
    };
    g.prototype.k = function (b, a) {
        b[0] = (u[(b[0] ^ a) & 255] ^ b[0] >>> 8) >>> 0;
        b[1] = (6681 * (20173 * (b[1] + (b[0] & 255)) >>> 0) >>> 0) + 1 >>> 0;
        b[2] = (u[(b[2] ^ b[1] >>> 24) & 255] ^ b[2] >>> 8) >>> 0
    };
    g.prototype.T = function (b) {
        var a = [305419896, 591751049, 878082192], d, g;
        v && (a = new Uint32Array(a));
        d = 0;
        for (g = b.length; d < g; ++d) this.k(a, b[d] & 255);
        return a
    };
    var H = [80, 75, 1, 2], I = [80, 75, 3, 4], J = [80, 75, 5, 6];
    l.prototype.parse = function () {
        var b = this.input, d = this.offset;
        b[d++] === H[0] && b[d++] === H[1] && b[d++] === H[2] && b[d++] === H[3] || a(Error("invalid file header signature"));
        this.version = b[d++];
        this.ia = b[d++];
        this.Z = b[d++] | b[d++] << 8;
        this.I = b[d++] | b[d++] << 8;
        this.A = b[d++] | b[d++] << 8;
        this.time = b[d++] | b[d++] << 8;
        this.U = b[d++] | b[d++] << 8;
        this.p = (b[d++] | b[d++] << 8 | b[d++] << 16 | b[d++] << 24) >>> 0;
        this.z = (b[d++] | b[d++] << 8 | b[d++] << 16 | b[d++] << 24) >>> 0;
        this.J = (b[d++] | b[d++] << 8 | b[d++] << 16 | b[d++] << 24) >>> 0;
        this.h = b[d++] | b[d++] << 8;
        this.g = b[d++] | b[d++] << 8;
        this.F = b[d++] | b[d++] << 8;
        this.ea = b[d++] | b[d++] << 8;
        this.ga = b[d++] | b[d++] << 8;
        this.fa = b[d++] | b[d++] << 8 | b[d++] << 16 | b[d++] << 24;
        this.$ = (b[d++] | b[d++] << 8 | b[d++] << 16 | b[d++] << 24) >>> 0;
        this.filename = String.fromCharCode.apply(null, v ? b.subarray(d, d += this.h) : b.slice(d, d += this.h));
        this.X = v ? b.subarray(d, d += this.g) : b.slice(d, d += this.g);
        this.v = v ? b.subarray(d, d + this.F) : b.slice(d, d + this.F);
        this.length = d - this.offset
    };
    q.prototype.parse = function () {
        var b = this.input, d = this.offset;
        b[d++] === I[0] && b[d++] === I[1] && b[d++] === I[2] && b[d++] === I[3] || a(Error("invalid local file header signature"));
        this.Z = b[d++] | b[d++] << 8;
        this.I = b[d++] | b[d++] << 8;
        this.A = b[d++] | b[d++] << 8;
        this.time = b[d++] | b[d++] << 8;
        this.U = b[d++] | b[d++] << 8;
        this.p = (b[d++] | b[d++] << 8 | b[d++] << 16 | b[d++] << 24) >>> 0;
        this.z = (b[d++] | b[d++] << 8 | b[d++] << 16 | b[d++] << 24) >>> 0;
        this.J = (b[d++] | b[d++] << 8 | b[d++] << 16 | b[d++] << 24) >>> 0;
        this.h = b[d++] | b[d++] << 8;
        this.g = b[d++] | b[d++] << 8;
        this.filename = String.fromCharCode.apply(null, v ? b.subarray(d, d += this.h) : b.slice(d, d += this.h));
        this.X = v ? b.subarray(d, d += this.g) : b.slice(d, d += this.g);
        this.length = d - this.offset
    };
    n = k.prototype;
    n.Y = function () {
        var b = [], a, d, g;
        this.i || p(this);
        g = this.i;
        a = 0;
        for (d = g.length; a < d; ++a) b[a] = g[a].filename;
        return b
    };
    n.r = function (b, d) {
        var g;
        this.G || p(this);
        g = this.G[b];
        void 0 === g && a(Error(b + " not found"));
        var c;
        c = d || {};
        var e = this.input, k = this.i, l, h, n, t;
        k || p(this);
        void 0 === k[g] && a(Error("wrong index"));
        k = k[g].$;
        g = new q(this.input, k);
        g.parse();
        k += g.length;
        l = g.z;
        if (0 !== (g.I & 1)) {
            c.password || this.j || a(Error("please set password"));
            c = this.S(c.password || this.j);
            n = k;
            for (t = k + 12; n < t; ++n) m(this, c, e[n]);
            k += 12;
            l -= 12;
            n = k;
            for (t = k + l; n < t; ++n) e[n] = m(this, c, e[n])
        }
        switch (g.A) {
            case 0:
                h = v ? this.input.subarray(k, k + l) : this.input.slice(k, k + l);
                break;
            case 8:
                h = (new f(this.input, {index: k, bufferSize: g.J})).r();
                break;
            default:
                a(Error("unknown compression type"))
        }
        if (this.ba) {
            e = void 0;
            "number" === typeof e || (e = 0);
            c = h.length;
            k = -1;
            for (l = c & 7; l--; ++e) k = k >>> 8 ^ u[(k ^ h[e]) & 255];
            for (l = c >> 3; l--; e += 8) k = k >>> 8 ^ u[(k ^ h[e]) & 255], k = k >>> 8 ^ u[(k ^ h[e + 1]) & 255], k = k >>> 8 ^ u[(k ^ h[e + 2]) & 255], k = k >>> 8 ^ u[(k ^ h[e + 3]) & 255], k = k >>> 8 ^ u[(k ^ h[e + 4]) & 255], k = k >>> 8 ^ u[(k ^ h[e + 5]) & 255], k = k >>> 8 ^ u[(k ^ h[e + 6]) & 255], k = k >>> 8 ^ u[(k ^ h[e + 7]) & 255];
            e = (k ^ 4294967295) >>> 0;
            g.p !== e && a(Error("wrong crc: file\x3d0x" + g.p.toString(16) + ", data\x3d0x" + e.toString(16)))
        }
        return h
    };
    n.L = function (b) {
        this.j = b
    };
    n.k = g.prototype.k;
    n.S = g.prototype.T;
    n.s = g.prototype.s;
    c("Zlib.Unzip", k);
    c("Zlib.Unzip.prototype.decompress", k.prototype.r);
    c("Zlib.Unzip.prototype.getFilenames", k.prototype.Y);
    c("Zlib.Unzip.prototype.setPassword", k.prototype.L)
}).call(this);
(function () {
    function a(b) {
        throw b;
    }

    function c(b, a) {
        var d = b.split("."), g = k;
        d[0] in g || !g.execScript || g.execScript("var " + d[0]);
        for (var c; d.length && (c = d.shift());) d.length || void 0 === a ? g = g[c] ? g[c] : g[c] = {} : g[c] = a
    }

    function h(b) {
        var a = b.length, d = 0, g = Number.POSITIVE_INFINITY, c, e, k, f, q, h, m, p, n;
        for (p = 0; p < a; ++p) b[p] > d && (d = b[p]), b[p] < g && (g = b[p]);
        c = 1 << d;
        e = new (l ? Uint32Array : Array)(c);
        k = 1;
        f = 0;
        for (q = 2; k <= d;) {
            for (p = 0; p < a; ++p) if (b[p] === k) {
                h = 0;
                m = f;
                for (n = 0; n < k; ++n) h = h << 1 | m & 1, m >>= 1;
                for (n = h; n < c; n += q) e[n] = k << 16 | p;
                ++f
            }
            ++k;
            f <<= 1;
            q <<= 1
        }
        return [e, d, g]
    }

    function f(b, d) {
        this.g = [];
        this.h = 32768;
        this.d = this.f = this.a = this.l = 0;
        this.input = l ? new Uint8Array(b) : b;
        this.m = !1;
        this.i = p;
        this.r = !1;
        if (d || !(d = {})) d.index && (this.a = d.index), d.bufferSize && (this.h = d.bufferSize), d.bufferType && (this.i = d.bufferType), d.resize && (this.r = d.resize);
        switch (this.i) {
            case q:
                this.b = 32768;
                this.c = new (l ? Uint8Array : Array)(32768 + this.h + 258);
                break;
            case p:
                this.b = 0;
                this.c = new (l ? Uint8Array : Array)(this.h);
                this.e = this.z;
                this.n = this.v;
                this.j = this.w;
                break;
            default:
                a(Error("invalid inflate mode"))
        }
    }

    function e(b, d) {
        for (var g = b.f, c = b.d, e = b.input, k = b.a, l; c < d;) l = e[k++], void 0 === l && a(Error("input buffer is broken")), g |= l << c, c += 8;
        b.f = g >>> d;
        b.d = c - d;
        b.a = k;
        return g & (1 << d) - 1
    }

    function b(b, a) {
        for (var d = b.f, g = b.d, c = b.input, e = b.a, k = a[0], l = a[1], f; g < l;) {
            f = c[e++];
            if (void 0 === f) break;
            d |= f << g;
            g += 8
        }
        c = k[d & (1 << l) - 1];
        k = c >>> 16;
        b.f = d >> k;
        b.d = g - k;
        b.a = e;
        return c & 65535
    }

    function d(a) {
        function d(a, d, g) {
            var c, k, l, f;
            for (f = 0; f < a;) switch (c = b(this, d), c) {
                case 16:
                    for (l = 3 + e(this, 2); l--;) g[f++] = k;
                    break;
                case 17:
                    for (l = 3 + e(this, 3); l--;) g[f++] = 0;
                    k = 0;
                    break;
                case 18:
                    for (l = 11 + e(this, 7); l--;) g[f++] = 0;
                    k = 0;
                    break;
                default:
                    k = g[f++] = c
            }
            return g
        }

        var g = e(a, 5) + 257, c = e(a, 5) + 1, k = e(a, 4) + 4, f = new (l ? Uint8Array : Array)(v.length), q;
        for (q = 0; q < k; ++q) f[v[q]] = e(a, 3);
        k = h(f);
        f = new (l ? Uint8Array : Array)(g);
        q = new (l ? Uint8Array : Array)(c);
        a.j(h(d.call(a, g, k, f)), h(d.call(a, c, k, q)))
    }

    function g(b, d) {
        var g, c;
        this.input = b;
        this.a = 0;
        if (d || !(d = {})) d.index && (this.a = d.index), d.verify && (this.A = d.verify);
        g = b[this.a++];
        c = b[this.a++];
        switch (g & 15) {
            case D:
                this.method = D;
                break;
            default:
                a(Error("unsupported compression method"))
        }
        0 !== ((g << 8) + c) % 31 && a(Error("invalid fcheck flag:" + ((g << 8) + c) % 31));
        c & 32 && a(Error("fdict flag is not supported"));
        this.q = new f(b, {index: this.a, bufferSize: d.bufferSize, bufferType: d.bufferType, resize: d.resize})
    }

    var k = this,
        l = "undefined" !== typeof Uint8Array && "undefined" !== typeof Uint16Array && "undefined" !== typeof Uint32Array,
        q = 0, p = 1, m = q, n = p;
    f.prototype.k = function () {
        for (; !this.m;) {
            var b = e(this, 3);
            b & 1 && (this.m = !0);
            b >>>= 1;
            switch (b) {
                case 0:
                    var b = this.input, g = this.a, c = this.c, k = this.b, f, h, m, n = c.length;
                    this.d = this.f = 0;
                    f = b[g++];
                    void 0 === f && a(Error("invalid uncompressed block header: LEN (first byte)"));
                    h = f;
                    f = b[g++];
                    void 0 === f && a(Error("invalid uncompressed block header: LEN (second byte)"));
                    h |= f << 8;
                    f = b[g++];
                    void 0 === f && a(Error("invalid uncompressed block header: NLEN (first byte)"));
                    m = f;
                    f = b[g++];
                    void 0 === f && a(Error("invalid uncompressed block header: NLEN (second byte)"));
                    m |= f << 8;
                    h === ~m && a(Error("invalid uncompressed block header: length verify"));
                    g + h > b.length && a(Error("input buffer is broken"));
                    switch (this.i) {
                        case q:
                            for (; k + h > c.length;) {
                                f = n - k;
                                h -= f;
                                if (l) c.set(b.subarray(g, g + f), k), k += f, g += f; else for (; f--;) c[k++] = b[g++];
                                this.b = k;
                                c = this.e();
                                k = this.b
                            }
                            break;
                        case p:
                            for (; k + h > c.length;) c = this.e({p: 2});
                            break;
                        default:
                            a(Error("invalid inflate mode"))
                    }
                    if (l) c.set(b.subarray(g, g + h), k), k += h, g += h; else for (; h--;) c[k++] = b[g++];
                    this.a = g;
                    this.b = k;
                    this.c = c;
                    break;
                case 1:
                    this.j(y, E);
                    break;
                case 2:
                    d(this);
                    break;
                default:
                    a(Error("unknown BTYPE: " + b))
            }
        }
        return this.n()
    };
    var t = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], v = l ? new Uint16Array(t) : t,
        t = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 258, 258],
        r = l ? new Uint16Array(t) : t,
        t = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0],
        w = l ? new Uint8Array(t) : t,
        t = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577],
        u = l ? new Uint16Array(t) : t,
        t = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
        z = l ? new Uint8Array(t) : t, t = new (l ? Uint8Array : Array)(288), x, A;
    x = 0;
    for (A = t.length; x < A; ++x) t[x] = 143 >= x ? 8 : 255 >= x ? 9 : 279 >= x ? 7 : 8;
    var y = h(t), t = new (l ? Uint8Array : Array)(30);
    x = 0;
    for (A = t.length; x < A; ++x) t[x] = 5;
    var E = h(t);
    f.prototype.j = function (a, d) {
        var g = this.c, c = this.b;
        this.o = a;
        for (var k = g.length - 258, l, f, q; 256 !== (l = b(this, a));) if (256 > l) c >= k && (this.b = c, g = this.e(), c = this.b), g[c++] = l; else for (l -= 257, q = r[l], 0 < w[l] && (q += e(this, w[l])), l = b(this, d), f = u[l], 0 < z[l] && (f += e(this, z[l])), c >= k && (this.b = c, g = this.e(), c = this.b); q--;) g[c] = g[c++ - f];
        for (; 8 <= this.d;) this.d -= 8, this.a--;
        this.b = c
    };
    f.prototype.w = function (a, d) {
        var g = this.c, c = this.b;
        this.o = a;
        for (var k = g.length, l, f, q; 256 !== (l = b(this, a));) if (256 > l) c >= k && (g = this.e(), k = g.length), g[c++] = l; else for (l -= 257, q = r[l], 0 < w[l] && (q += e(this, w[l])), l = b(this, d), f = u[l], 0 < z[l] && (f += e(this, z[l])), c + q > k && (g = this.e(), k = g.length); q--;) g[c] = g[c++ - f];
        for (; 8 <= this.d;) this.d -= 8, this.a--;
        this.b = c
    };
    f.prototype.e = function () {
        var b = new (l ? Uint8Array : Array)(this.b - 32768), a = this.b - 32768, d, g, c = this.c;
        if (l) b.set(c.subarray(32768, b.length)); else for (d = 0, g = b.length; d < g; ++d) b[d] = c[d + 32768];
        this.g.push(b);
        this.l += b.length;
        if (l) c.set(c.subarray(a, a + 32768)); else for (d = 0; 32768 > d; ++d) c[d] = c[a + d];
        this.b = 32768;
        return c
    };
    f.prototype.z = function (b) {
        var a, d = this.input.length / this.a + 1 | 0, g, c, k, e = this.input, f = this.c;
        b && ("number" === typeof b.p && (d = b.p), "number" === typeof b.u && (d += b.u));
        2 > d ? (g = (e.length - this.a) / this.o[2], k = g / 2 * 258 | 0, c = k < f.length ? f.length + k : f.length << 1) : c = f.length * d;
        l ? (a = new Uint8Array(c), a.set(f)) : a = f;
        return this.c = a
    };
    f.prototype.n = function () {
        var b = 0, a = this.c, d = this.g, g, c = new (l ? Uint8Array : Array)(this.l + (this.b - 32768)), k, e, f, q;
        if (0 === d.length) return l ? this.c.subarray(32768, this.b) : this.c.slice(32768, this.b);
        k = 0;
        for (e = d.length; k < e; ++k) for (g = d[k], f = 0, q = g.length; f < q; ++f) c[b++] = g[f];
        k = 32768;
        for (e = this.b; k < e; ++k) c[b++] = a[k];
        this.g = [];
        return this.buffer = c
    };
    f.prototype.v = function () {
        var b, a = this.b;
        l ? this.r ? (b = new Uint8Array(a), b.set(this.c.subarray(0, a))) : b = this.c.subarray(0, a) : (this.c.length > a && (this.c.length = a), b = this.c);
        return this.buffer = b
    };
    g.prototype.k = function () {
        var b = this.input, d;
        d = this.q.k();
        this.a = this.q.a;
        if (this.A) {
            var b = (b[this.a++] << 24 | b[this.a++] << 16 | b[this.a++] << 8 | b[this.a++]) >>> 0, g = d;
            if ("string" === typeof g) {
                var g = g.split(""), c, k;
                c = 0;
                for (k = g.length; c < k; c++) g[c] = (g[c].charCodeAt(0) & 255) >>> 0
            }
            c = 1;
            k = 0;
            for (var e = g.length, l, f = 0; 0 < e;) {
                l = 1024 < e ? 1024 : e;
                e -= l;
                do c += g[f++], k += c; while (--l);
                c %= 65521;
                k %= 65521
            }
            b !== (k << 16 | c) >>> 0 && a(Error("invalid adler-32 checksum"))
        }
        return d
    };
    var D = 8;
    c("Zlib.Inflate", g);
    c("Zlib.Inflate.prototype.decompress", g.prototype.k);
    var m = {ADAPTIVE: n, BLOCK: m}, B;
    if (Object.keys) n = Object.keys(m); else for (B in n = [], t = 0, m) n[t++] = B;
    t = 0;
    for (x = n.length; t < x; ++t) B = n[t], c("Zlib.Inflate.BufferType." + B, m[B])
}).call(this);
(function (a) {
    var c = "object" == typeof exports && exports,
        h = "object" == typeof module && module && module.exports == c && module,
        f = "object" == typeof global && global;
    if (f.global === f || f.window === f) a = f;
    var e = function (b) {
        this.message = b
    };
    e.prototype = Error();
    e.prototype.name = "InvalidCharacterError";
    var b = /<%= spaceCharacters %>/g, d = {
        encode: function (b) {
            b = String(b);
            if (/[^\0-\xFF]/.test(b)) throw new e("The string to be encoded contains characters outside of the Latin1 range.");
            for (var a = b.length % 3, d = "", g = -1, c, k, f, h = b.length - a; ++g < h;) c = b.charCodeAt(g) << 16, k = b.charCodeAt(++g) << 8, f = b.charCodeAt(++g), c = c + k + f, d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c >> 18 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c >> 12 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c >> 6 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c & 63);
            2 == a ? (c = b.charCodeAt(g) << 8, k = b.charCodeAt(++g), c += k, d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c >> 10) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c >> 4 & 63) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c << 2 & 63) + "\x3d") : 1 == a && (c = b.charCodeAt(g), d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c >> 2) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c << 4 & 63) + "\x3d\x3d");
            return d
        }, decode: function (a) {
            a = String(a).replace(b, "");
            var d = a.length;
            0 == d % 4 && (a = a.replace(/==?$/, ""), d = a.length);
            if (1 == d % 4 || /[^+a-zA-Z0-9/]/.test(a)) throw new e("Invalid character: the string to be decoded is not correctly encoded.");
            for (var g = 0, c, k, f = "", h = -1; ++h < d;) k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(h)), c = g % 4 ? 64 * c + k : k, g++ % 4 && (f += String.fromCharCode(255 & c >> (-2 * g & 6)));
            return f
        }, version: "\x3c%\x3d version %\x3e"
    };
    if ("function" == typeof define && "object" == typeof define.amd && define.amd) define(function () {
        return d
    }); else if (c && !c.nodeType) if (h) h.exports = d; else for (var g in d) d.hasOwnProperty(g) && (c[g] = d[g]); else a.base64 = d
})(this);
(function () {
    function a(b) {
        this.buffer = b;
        this.offset = 0;
        this.byteLength = b.length
    }

    var c = BimFish.LMVTK;
    c.utf8ArrayToString = function (b, a, d) {
        void 0 === a && (a = 0);
        void 0 === d && (d = b.length);
        var g, c, k, e, l;
        g = "";
        c = d;
        for (d = 0; d < c;) switch (k = b[a + d++], k >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                g += String.fromCharCode(k);
                break;
            case 12:
            case 13:
                e = b[d++];
                g += String.fromCharCode((k & 31) << 6 | e & 63);
                break;
            case 14:
                e = b[d++], l = b[d++], g += String.fromCharCode((k & 15) << 12 | (e & 63) << 6 | (l & 63) << 0)
        }
        return g
    };
    var h = new ArrayBuffer(8), f = new Uint8Array(h), e = new Uint16Array(h), b = new Int32Array(h),
        d = new Uint32Array(h), g = new Float32Array(h), k = new Float64Array(h);
    a.prototype.seek = function (b) {
        this.offset = b
    };
    a.prototype.getBytes = function (b) {
        var a = new Uint8Array(this.buffer.buffer, this.offset, b);
        this.offset += b;
        return a
    };
    a.prototype.getVarints = function () {
        var b, a = 0, d = 0;
        do b = this.buffer[this.offset++], a |= (b & 127) << d, d += 7; while (b & 128);
        return a
    };
    a.prototype.getUint8 = function () {
        return this.buffer[this.offset++]
    };
    a.prototype.getUint16 = function () {
        f[0] = this.buffer[this.offset++];
        f[1] = this.buffer[this.offset++];
        return e[0]
    };
    a.prototype.getInt16 = function () {
        var b = this.getUint16();
        32767 < b && (b |= 4294901760);
        return b
    };
    a.prototype.getInt32 = function () {
        var a = this.buffer, d = this.offset;
        f[0] = a[d];
        f[1] = a[d + 1];
        f[2] = a[d + 2];
        f[3] = a[d + 3];
        this.offset += 4;
        return b[0]
    };
    a.prototype.getUint32 = function () {
        var b = this.buffer, a = this.offset;
        f[0] = b[a];
        f[1] = b[a + 1];
        f[2] = b[a + 2];
        f[3] = b[a + 3];
        this.offset += 4;
        return d[0]
    };
    a.prototype.getFloat32 = function () {
        var b = this.buffer, a = this.offset;
        f[0] = b[a];
        f[1] = b[a + 1];
        f[2] = b[a + 2];
        f[3] = b[a + 3];
        this.offset += 4;
        return g[0]
    };
    a.prototype.getIndicesArray = function (b, a, d) {
        var g = this.buffer;
        b = new Uint8Array(b, a, 2 * d);
        a = this.offset;
        var c = 0;
        for (d *= 2; c < d; c += 2) b[c] = g[a], b[c + 1] = g[a + 1], a += 4;
        this.offset = a
    };
    a.prototype.getVector3Array = function (b, a, d, g) {
        var c = this.buffer, k = this.offset;
        b = new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
        if (3 === g && 0 === d) a *= 12, b.set(c.subarray(k, k + a)), this.offset += a; else {
            g *= 4;
            d *= 4;
            for (var e = 0; e < a; e++) {
                for (var l = 0; 12 > l; l++) b[d + l] = c[k++];
                d += g
            }
            this.offset = k
        }
    };
    a.prototype.getVector2Array = function (b, a, d, g) {
        var c = this.buffer;
        b = new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
        var k = this.offset;
        g *= 4;
        d *= 4;
        for (var e = 0; e < a; e++) {
            for (var l = 0; 8 > l; l++) b[d + l] = c[k++];
            d += g
        }
        this.offset = k
    };
    a.prototype.getVector4 = function (b, a) {
        for (var d = this.buffer, c = this.offset, k = 0; 4 > k; k++) f[0] = d[c], f[1] = d[c + 1], f[2] = d[c + 2], f[3] = d[c + 3], b[a + k] = g[0], c += 4;
        this.offset = c
    };
    a.prototype.getFloat64 = function () {
        for (var b = this.buffer, a = this.offset, d = 0; 8 > d; d++) f[d] = b[a + d];
        this.offset += 8;
        return k[0]
    };
    a.prototype.getString = function (b) {
        var a = c.utf8ArrayToString(this.buffer, this.offset, b);
        this.offset += b;
        return a
    };
    a.prototype.reset = function (b) {
        this.buffer = b;
        this.offset = 0;
        this.byteLength = b.length
    };
    c.InputStream = a
})();
(function () {
    BimFish.LMVTK.VBUtils = {
        deduceUVRepetition: function (a) {
            for (var c in a.vblayout) if (0 == c.indexOf("uv") && 0 != c.indexOf("uvw")) for (var h = a.vbstride, f = a.vb, e = a.vb.length / h, b = 0, d = a.vblayout[c].offset; b < e; b++, d += h) {
                var g = f[d], k = f[d + 1];
                if (2 < g || 0 > g || 2 < k || 0 > k) {
                    a.vblayout[c].isPattern = !0;
                    break
                }
            }
        }, computeBounds3D: function (a) {
            var c = Infinity, h = Infinity, f = Infinity, e = -Infinity, b = -Infinity, d = -Infinity, g, k, l, q, p,
                m = a.vbstride, n = a.vblayout.position.offset, t = a.vb, v = a.vb.length / m;
            g = 0;
            for (k = n; g < v; g++, k += m) l = t[k], q = t[k + 1], p = t[k + 2], c > l && (c = l), h > q && (h = q), f > p && (f = p), e < l && (e = l), b < q && (b = q), d < p && (d = p);
            a.boundingBox = {min: {x: c, y: h, z: f}, max: {x: e, y: b, z: d}};
            c = .5 * (c + e);
            h = .5 * (h + b);
            f = .5 * (f + d);
            a = a.boundingSphere = {};
            a.center = {x: c, y: h, z: f};
            g = d = 0;
            for (k = n; g < v; g++, k += m) l = t[k], q = t[k + 1], p = t[k + 2], l -= c, q -= h, p -= f, p = l * l + q * q + p * p, p > d && (d = p);
            a.radius = Math.sqrt(d)
        }, bboxUnion: function (a, c) {
            c.min.x < a.min.x && (a.min.x = c.min.x);
            c.min.y < a.min.y && (a.min.y = c.min.y);
            c.min.z < a.min.z && (a.min.z = c.min.z);
            c.max.x > a.max.x && (a.max.x = c.max.x);
            c.max.y > a.max.y && (a.max.y = c.max.y);
            c.max.z > a.max.z && (a.max.z = c.max.z)
        }
    }
})();
(function () {
    function a(b, a) {
        var d = a || 65536;
        this.useInstancing = b;
        this.stride = 12;
        this.vb = new ArrayBuffer(4 * this.stride * (this.useInstancing ? d / 4 : d));
        this.vbf = new Float32Array(this.vb);
        this.vbi = new Int32Array(this.vb);
        this.vcount = 0;
        this.ib = this.useInstancing ? null : new Uint16Array(d);
        this.icount = 0;
        this.minx = this.miny = Infinity;
        this.maxx = this.maxy = -Infinity;
        this.dbIds = {};
        this.numTriangleGeoms = this.numCirculars = this.numEllipticals = 0
    }

    var c = BimFish.Viewing.Private, h = 2 * Math.PI, f = [0, 1, 3, 0, 3, 2];
    a.prototype.expandStride = function () {
    };
    a.prototype.addToBounds = function (b, a) {
        b < this.minx && (this.minx = b);
        b > this.maxx && (this.maxx = b);
        a < this.miny && (this.miny = a);
        a > this.maxy && (this.maxy = a)
    };
    a.prototype.setCommonVertexAttribs = function (b, a, g, c, e, f, h, m) {
        this.vbi[b + 8] = a & 255 | (g & 255) << 8 | (m & 255) << 16;
        this.vbi[b + 6] = c;
        this.vbi[b + 7] = e;
        this.vbi[b + 9] = f & 65535 | (h & 65535) << 16;
        this.dbIds[e] = 1
    };
    a.prototype.addVertexTriangleGeom = function (b, a, g, c, e, f, h, m, n, t) {
        for (var d = this.vcount, k = this.vbf, l = this.useInstancing ? 1 : 4, q = 0; q < l; q++) {
            var p = (d + q) * this.stride;
            k[p] = b;
            k[p + 1] = a;
            k[p + 2] = g;
            k[p + 3] = c;
            k[p + 4] = e;
            k[p + 5] = f;
            this.setCommonVertexAttribs(p, 0 + q, 5, h, m, n, t, 0);
            this.vcount++
        }
        return d
    };
    a.prototype.addVertexLine = function (b, a, g, c, e, f, h, m, n, t, v) {
        for (var d = this.vcount, k = this.vbf, l = this.useInstancing ? 1 : 4, q = 0; q < l; q++) {
            var p = (d + q) * this.stride;
            k[p] = b;
            k[p + 1] = a;
            k[p + 2] = g;
            k[p + 3] = c;
            k[p + 4] = .5 * f;
            k[p + 5] = e;
            this.setCommonVertexAttribs(p, 0 + q, 1, h, m, n, t, v);
            this.vcount++
        }
        return d
    };
    a.prototype.addVertexTexQuad = function (b, a, g, c, e, f, h, m, n) {
        for (var d = this.vcount, k = this.vbf, l = this.useInstancing ? 1 : 4, q = 0; q < l; q++) {
            var p = (d + q) * this.stride;
            k[p] = b;
            k[p + 1] = a;
            k[p + 2] = e;
            k[p + 3] = g;
            k[p + 4] = c;
            this.setCommonVertexAttribs(p, 0 + q, 4, f, h, m, n, 0);
            this.vcount++
        }
        return d
    };
    a.prototype.addVertexArc = function (b, a, g, c, e, f, h, m, n, t, v, r) {
        for (var d = this.vcount, k = this.vbf, l = e == f ? 2 : 3, q = this.useInstancing ? 1 : 4, p = 0; p < q; p++) {
            var y = (d + p) * this.stride;
            k[y] = b;
            k[y + 1] = a;
            k[y + 2] = g;
            k[y + 3] = c;
            k[y + 4] = .5 * m;
            k[y + 5] = e;
            3 === l && (k[y + 10] = f, k[y + 11] = h);
            this.setCommonVertexAttribs(y, 0 + p, l, n, t, v, r, 0);
            this.vcount++
        }
        return d
    };
    a.prototype.addVertex = function (b, a, g, c, e, f) {
        if (!this.useInstancing) {
            var d = this.vcount, k = this.stride * d, l = this.vbf;
            l[k] = b;
            l[k + 1] = a;
            this.setCommonVertexAttribs(k, 0, 0, g, c, e, f, 0);
            this.vcount++;
            return d
        }
    };
    a.prototype.addVertexPolytriangle = function (b, a, g, c, e, f) {
        this.useInstancing || (this.addVertex(b, a, g, c, e, f), this.addToBounds(b, a))
    };
    a.prototype.addIndices = function (b, a) {
        if (!this.useInstancing) {
            var d = this.ib, c = this.icount;
            if (c + b.length >= d.length) {
                for (var e = new Uint16Array(2 * d.length), f = 0; f < c; ++f) e[f] = d[f];
                this.ib = d = e
            }
            for (f = 0; f < b.length; ++f) d[c + f] = a + b[f];
            this.icount += b.length
        }
    };
    a.prototype.finalizeQuad = function (b) {
        this.useInstancing || this.addIndices(f, b)
    };
    a.prototype.addSegment = function (b, a, c, k, e, f, h, m, n, t, v) {
        var d = c - b, g = k - a;
        e = this.addVertexLine(b, a, d || g ? Math.atan2(g, d) : 0, d || g ? Math.sqrt(d * d + g * g) : 0, e, f, h, m, n, t, v);
        this.finalizeQuad(e);
        this.addToBounds(b, a);
        this.addToBounds(c, k)
    };
    a.prototype.addTriangleGeom = function (b, a, c, k, e, f, h, m, n, t) {
        this.numTriangleGeoms++;
        h = this.addVertexTriangleGeom(b, a, c, k, e, f, h, m, n, t);
        this.finalizeQuad(h);
        this.addToBounds(b, a);
        this.addToBounds(c, k);
        this.addToBounds(e, f)
    };
    a.prototype.addArc = function (b, a, c, k, f, q, p, m, n, t, v, r) {
        f == q ? this.numCirculars++ : this.numEllipticals++;
        k = e(c, k);
        c = k.start;
        k = k.end;
        0 == c && 0 == k && (k = h);
        var d = Math.abs(c - k);
        if (1E-4 < d && 1E-4 < Math.abs(d - h)) {
            var d = b + f * Math.cos(c), g = a + q * Math.sin(c);
            this.addSegment(d, g, d, g, 0, m, n, t, v, r);
            d = b + f * Math.cos(k);
            g = a + q * Math.sin(k);
            this.addSegment(d, g, d, g, 0, m, n, t, v, r)
        } else this.addToBounds(b - f, a - q), this.addToBounds(b + f, a + q);
        b = this.addVertexArc(b, a, c, k, f, q, p, m, n, t, v, r);
        this.finalizeQuad(b)
    };
    a.prototype.addTexturedQuad = function (b, a, c, k, e, f, h, m, n) {
        f = this.addVertexTexQuad(b, a, c, k, e, f, h, m, n);
        this.finalizeQuad(f);
        f = .5 * Math.cos(e);
        h = .5 * Math.sin(e);
        e = Math.abs(c * f) + Math.abs(k * h);
        c = Math.abs(c * h) + Math.abs(k * f);
        this.addToBounds(b - e, a - c);
        this.addToBounds(b + e, a + c)
    };
    a.prototype.isFull = function (b) {
        return 32767 < this.vcount * (this.useInstancing ? 4 : 1) + (b || 3)
    };
    a.prototype.toMesh = function () {
        var b = {};
        b.vb = new Float32Array(this.vb.slice(0, this.vcount * this.stride * 4));
        b.vbstride = this.stride;
        var a = this.useInstancing ? 1 : 0;
        b.vblayout = {
            fields1: {offset: 0, itemSize: 3, bytesPerItem: 4, divisor: a, normalize: !1},
            fields2: {offset: 3, itemSize: 3, bytesPerItem: 4, divisor: a, normalize: !1},
            color4b: {offset: 6, itemSize: 4, bytesPerItem: 1, divisor: a, normalize: !0},
            dbId4b: {offset: 7, itemSize: 4, bytesPerItem: 1, divisor: a, normalize: !1},
            flags4b: {offset: 8, itemSize: 4, bytesPerItem: 1, divisor: a, normalize: !1},
            layerVp4b: {offset: 9, itemSize: 4, bytesPerItem: 1, divisor: a, normalize: !1}
        };
        10 < this.stride && (b.vblayout.extraParams = {
            offset: 10,
            itemSize: 2,
            bytesPerItem: 4,
            divisor: a,
            normalize: !1
        });
        this.useInstancing ? (b.numInstances = this.vcount, a = new Int32Array([0, 1, 2, 3]), b.vblayout.instFlags4b = {
            offset: 0,
            itemSize: 4,
            bytesPerItem: 1,
            divisor: 0,
            normalize: !1
        }, b.vblayout.instFlags4b.array = a.buffer, b.indices = new Uint16Array(f)) : b.indices = new Uint16Array(this.ib.buffer.slice(0, 2 * this.icount));
        b.dbIds = this.dbIds;
        var a = this.maxx - this.minx, c = this.maxy - this.miny, e = Math.max(a, c);
        b.boundingBox = {
            min: {x: this.minx, y: this.miny, z: .001 * -e},
            max: {x: this.maxx, y: this.maxy, z: .001 * e}
        };
        b.boundingSphere = {
            center: {x: .5 * (this.minx + this.maxx), y: .5 * (this.miny + this.maxy), z: 0},
            radius: .5 * Math.sqrt(a * a + c * c)
        };
        return b
    };
    var e = function (b, a) {
        function d() {
            .001 > Math.abs(b - 0) && (b = 0);
            .001 > Math.abs(a - 0) && (a = 0);
            .001 > Math.abs(b - h) && (b = h);
            .001 > Math.abs(a - h) && (a = h)
        }

        d();
        if (b > a) for (; b > h;) b -= h, a -= h; else for (; a > h;) b -= h, a -= h;
        d();
        0 > b && 0 < a && (b += h);
        return {start: b, end: a}
    };
    c.VertexBufferBuilder = a
})();
(function () {
    function a(a) {
        a = this.stream = new c.InputStream(a);
        var f = a.getInt32();
        this.type = a.getString(f);
        this.version = a.getInt32();
        this.types = null;
        this.entryOffsets = [];
        a.seek(a.byteLength - 8);
        var e = a.getUint32();
        this.typesOffset = a.getUint32();
        a.seek(this.typesOffset);
        var b = this.readU32V();
        this.types = [];
        for (f = 0; f < b; ++f) this.types.push({
            entryClass: this.readString(),
            entryType: this.readString(),
            version: this.readU32V()
        });
        a.seek(e);
        e = this.readU32V();
        b = this.entryOffsets;
        for (f = 0; f < e; ++f) b.push(a.getUint32());
        a.seek(0)
    }

    var c = BimFish.LMVTK;
    a.prototype.readVarint = function () {
        var a, c = 0, e = 0;
        do a = this.stream.getUint8(), c |= (a & 127) << e, e += 7; while (a & 128);
        return c
    };
    a.prototype.readU32V = a.prototype.readVarint;
    a.prototype.readU16 = function () {
        return this.stream.getUint16()
    };
    a.prototype.readU8 = function () {
        return this.stream.getUint8()
    };
    a.prototype.readString = function () {
        return this.stream.getString(this.readU32V())
    };
    a.prototype.readVector3f = function () {
        var a = this.stream;
        return {x: a.getFloat32(), y: a.getFloat32(), z: a.getFloat32()}
    };
    a.prototype.readVector3d = function () {
        var a = {x: 0, y: 0, z: 0};
        return function () {
            var c = this.stream;
            a.x = c.getFloat64();
            a.y = c.getFloat64();
            a.z = c.getFloat64();
            return a
        }
    }();
    a.prototype.readQuaternionf = function () {
        var a = {x: 0, y: 0, z: 0, w: 0};
        return function () {
            var c = this.stream;
            a.x = c.getFloat32();
            a.y = c.getFloat32();
            a.z = c.getFloat32();
            a.w = c.getFloat32();
            return a
        }
    }();
    a.prototype.readMatrix3f = function () {
        var a = new LmvMatrix4;
        return function (c) {
            c || (c = a);
            var e = this.stream;
            c.identity();
            for (var b = 0; 3 > b; ++b) for (var d = 0; 3 > d; ++d) c.elements[4 * b + d] = e.getFloat32();
            return c
        }
    }();
    a.prototype.readTransform = function () {
        var a = {x: 1, y: 1, z: 1}, c = new LmvMatrix4(!0);
        return function (e, b, d, g, k, f) {
            var l = this.stream, h;
            switch (l.getUint8()) {
                case 4:
                    c.identity();
                    break;
                case 0:
                    l = this.readVector3d();
                    c.makeTranslation(l.x, l.y, l.z);
                    break;
                case 1:
                    h = this.readQuaternionf();
                    l = this.readVector3d();
                    a.x = 1;
                    a.y = 1;
                    a.z = 1;
                    c.compose(l, h, a);
                    break;
                case 2:
                    var m = l.getFloat32();
                    h = this.readQuaternionf();
                    l = this.readVector3d();
                    a.x = m;
                    a.y = m;
                    a.z = m;
                    c.compose(l, h, a);
                    break;
                case 3:
                    this.readMatrix3f(c), l = this.readVector3d(), c.setPosition(l)
            }
            f && (f[0] = c.elements[12], f[1] = c.elements[13], f[2] = c.elements[14]);
            g && c.multiplyMatrices(g, c);
            k && (c.elements[12] -= k.x, c.elements[13] -= k.y, c.elements[14] -= k.z);
            if (void 0 !== e) e = c.elements, b && (b[d + 0] = e[0], b[d + 1] = e[1], b[d + 2] = e[2], b[d + 3] = e[4], b[d + 4] = e[5], b[d + 5] = e[6], b[d + 6] = e[8], b[d + 7] = e[9], b[d + 8] = e[10], b[d + 9] = e[12], b[d + 10] = e[13], b[d + 11] = e[14]); else return (new LmvMatrix4).copy(c)
        }
    }();
    a.prototype.getEntryCounts = function () {
        return this.entryOffsets.length
    };
    a.prototype.seekToEntry = function (a) {
        var c = this.getEntryCounts();
        if (a >= c) return null;
        this.stream.seek(this.entryOffsets[a]);
        a = this.stream.getUint32();
        return a >= this.types.length ? null : this.types[a]
    };
    a.prototype.readPathID = function () {
        var a = this.stream;
        if (2 > this.version) {
            var c = a.getUint16();
            if (!c) return null;
            a.getUint16();
            if (1 == c) return "";
            for (var e = a.getUint16(), b = 2; b < c; ++b) e += "/" + a.getUint16()
        } else {
            c = this.readU32V();
            if (!c) return null;
            this.readU32V();
            if (1 == c) return "";
            e = this.readU32V();
            for (b = 2; b < c; ++b) e += "/" + this.readU32V()
        }
        return e
    };
    c.PackFileReader = a
})();
(function () {
    function a(b, a, c, e, l) {
        var d = b.getString(4);
        if ("INDX" != d) return null;
        var g = a.vertexCount, k = a.triangleCount, n = a.vbstride, d = g * n, t = d + (6 * k + 3) / 4 | 0;
        a.sharedBufferBytes = 4 * t;
        if (!l) {
            c || (c = new ArrayBuffer(4 * t), e = 0);
            l = a.vb = new Float32Array(c, e, d);
            a.indices = new Uint16Array(c, e + 4 * d, 3 * k);
            b.getIndicesArray(l.buffer, e + 4 * d, 3 * k);
            d = b.getString(4);
            if ("VERT" != d) return null;
            var v;
            a.vblayout.normal && 2 === a.vblayout.normal.itemSize && (v = new Uint16Array(l.buffer, l.byteOffset, l.byteLength / 2));
            b.getVector3Array(l, g, a.vblayout.position.offset, n);
            if (a.flags & 1) {
                d = b.getString(4);
                if ("NORM" != d) return null;
                if (v) for (h.length < 3 * g && (h = new Float32Array(3 * g)), b.getVector3Array(h, g, 0, 3), c = 0, e = a.vblayout.normal.offset; c < g; c++, e += n) {
                    var k = h[3 * c + 1], d = h[3 * c], t = Math.abs(d), r = Math.abs(k),
                        w = Math.min(t, r) / Math.max(t, r), u = w * w,
                        w = ((-.0464964749 * u + .15931422) * u - .327622764) * u * w + w;
                    r > t && (w = 1.57079637 - w);
                    0 > d && (w = 3.14159274 - w);
                    0 > k && (w = -w);
                    k = .5 * (h[3 * c + 2] + 1);
                    v[2 * e] = 32767.5 * (w * f + 1) | 0;
                    v[2 * e + 1] = 65535 * k | 0
                } else b.getVector3Array(l, g, a.vblayout.normal.offset, n)
            }
            for (v = 0; v < a.texMapCount; v++) {
                d = b.getString(4);
                if ("TEXC" != d) return null;
                c = {name: b.getString(b.getInt32()), file: b.getString(b.getInt32())};
                a.uvs.push(c);
                c = "uv";
                v && (c += (v + 1).toString());
                b.getVector2Array(l, g, a.vblayout[c].offset, n)
            }
            k = n - 3 * (a.attribMapCount || 0);
            for (v = 0; v < a.attribMapCount; v++) {
                d = b.getString(4);
                if ("ATTR" != d) return null;
                c = {name: b.getString(b.getInt32())};
                if (-1 != c.name.indexOf("Color")) c = "color"; else if (-1 != c.name.indexOf("UVW")) c = "uvw"; else {
                    a.attrs.push(c);
                    b.getBytes(16 * g);
                    continue
                }
                a.vblayout[c] = {offset: k, itemSize: 3};
                d = [0, 0, 0, 0];
                c = 0;
                for (e = k; c < g; c++, e += n) b.getVector4(d, 0), l[e] = d[0], l[e + 1] = d[1], l[e + 2] = d[2];
                k += 3
            }
        }
    }

    var c = BimFish.LMVTK, h = new Float32Array(3), f = 1 / Math.PI, e = function (b, a, g) {
        if (g) return null;
        g = {isLines: !0, vertices: null, indices: null, colors: null, normals: null, uvs: [], attrs: []};
        var d, e;
        1 < a.version ? (g.vertexCount = b.readU16(), d = b.readU16(), e = b.readU16()) : (g.vertexCount = b.readU32V(), d = b.readU32V(), e = b.readU32V());
        var f = 0 != b.stream.getUint8();
        g.vbstride = 3;
        f && (g.vbstride += 3);
        g.vblayout = {};
        var h = 0;
        g.vblayout.position = {offset: h, itemSize: 3};
        f && (g.vblayout.color = {offset: h + 3, itemSize: 3});
        g.vb = new Float32Array(g.vertexCount * g.vbstride);
        var m = g.vb, n = g.vbstride;
        b = b.stream;
        b.getVector3Array(m, g.vertexCount, g.vblayout.position.offset, n);
        if (f) for (var f = 0, h = g.vblayout.color.offset, t = g.vertexCount; f < t; f++, h += n) m[h] = b.getFloat32(), m[h + 1] = b.getFloat32(), m[h + 2] = b.getFloat32(), b.getFloat32();
        h = function (b) {
            return b.buffer.slice(b.byteOffset, b.byteOffset + b.length)
        };
        1 < a.version ? (a = new Uint16Array(h(b.getBytes(2 * d))), d = new Uint16Array(h(b.getBytes(2 * e)))) : (a = new Int32Array(h(b.getBytes(4 * d))), d = new Int32Array(h(b.getBytes(4 * e))));
        g.indices = new Uint16Array(2 * (d[e - 1] - e + 1));
        for (h = b = 0; h + 1 < e; h++) for (m = d[h]; m + 1 < d[h + 1]; m++) g.indices[b++] = a[m], g.indices[b++] = a[m + 1];
        c.VBUtils.computeBounds3D(g);
        return g
    };
    c.readGeometry = function (b, d, g, k, f, h) {
        if (d = b.seekToEntry(d)) if ("Autodesk.CloudPlatform.OpenCTM" == d.entryType) if (b = b.stream, "OCTM" != b.getString(4) || 5 != b.getInt32()) k = null; else {
            d = b.getString(3);
            b.getUint8();
            g = {stream: null, vertices: null, indices: null, normals: null, colors: null, uvs: [], attrs: []};
            g.vertexCount = b.getInt32();
            g.triangleCount = b.getInt32();
            g.texMapCount = b.getInt32();
            g.attribMapCount = b.getInt32();
            g.flags = b.getInt32();
            g.comment = b.getString(b.getInt32());
            g.vbstride = 3;
            g.flags & 1 && (g.vbstride += 1);
            g.vbstride += 2 * (g.texMapCount || 0);
            g.vbstride += 3 * (g.attribMapCount || 0);
            g.vblayout = {};
            var l = 0;
            g.vblayout.position = {offset: l, itemSize: 3};
            l += 3;
            g.flags & 1 && (g.vblayout.normal = {offset: l, itemSize: 2, bytesPerItem: 2, normalize: !0}, l += 1);
            if (g.texMapCount) for (var q = 0; q < g.texMapCount; q++) {
                var n = "uv";
                q && (n += (q + 1).toString());
                g.vblayout[n] = {offset: l, itemSize: 2};
                l += 2
            }
            "RAW" == d ? (a(b, g, k, f, h), h || (c.VBUtils.deduceUVRepetition(g), c.VBUtils.computeBounds3D(g)), k = g) : "MG2" == d ? (readOpenCTM_MG2(b, g, k, f, h), h || (c.VBUtils.deduceUVRepetition(g), c.VBUtils.computeBounds3D(g)), k = g) : k = null
        } else k = "Autodesk.CloudPlatform.Lines" == d.entryType ? e(b, d, h) : null; else k = null;
        return k
    }
})();
(function () {
    BimFish.LMVTK.readLightDefinition = function (a, c) {
        var h = a.seekToEntry(c);
        if (!h || 1 < h.version) return null;
        h = a.stream;
        return {
            position: a.readVector3f(),
            dir: a.readVector3f(),
            r: h.getFloat32(),
            g: h.getFloat32(),
            b: h.getFloat32(),
            intensity: h.getFloat32(),
            spotAngle: h.getFloat32(),
            size: h.getFloat32(),
            type: h.getUint8()
        }
    }
})();
(function () {
    BimFish.LMVTK.readCameraDefinition = function (a, c) {
        var h = a.seekToEntry(c.definition);
        if (!h || 2 < h.version) return null;
        var f = a.stream, e = {
            isPerspective: !f.getUint8(),
            position: a.readVector3f(),
            target: a.readVector3f(),
            up: a.readVector3f(),
            aspect: f.getFloat32(),
            fov: f.getFloat32() * (180 / Math.PI)
        };
        2 > h.version && (f.getFloat32(), f.getFloat32());
        e.orthoScale = f.getFloat32();
        return e
    }
})();
(function () {
    function a(a, c) {
        var b = [];
        if (!c) return b;
        for (var d = a.getEntryCounts(), g = a.stream, e = 0; e < d; e++) {
            var f = a.seekToEntry(e);
            if (!f || 5 < f.version) return;
            4 < f.version && a.readU8();
            a.readU32V();
            2 < f.version || a.readString();
            a.readU32V();
            a.readTransform(e, null, 12 * e);
            for (var h = 0; 6 > h; h++) g.getFloat32();
            1 < f.version && (f = a.readU32V(), 0 <= c.indexOf(f) && b.push(e))
        }
        return b
    }

    var c = BimFish.LMVTK, h = (BimFish.Viewing.isMobileDevice(), null);
    c.FragList = function () {
        this.numLoaded = this.length = 0;
        this.topoIndexes = this.mesh2frag = this.fragId2dbId = this.entityIndexes = this.packIds = this.materials = this.transforms = this.boxes = null
    };
    c.readGeometryMetadataIntoFragments = function (a, c) {
        var b = c.geomDataIndexes.length, d = a.stream, g = 0, e = {};
        c.polygonCounts = c.geomDataIndexes;
        for (var f = 0; f < b; f++) {
            var h = c.geomDataIndexes[f];
            if (e[h]) h = e[h], c.polygonCounts[f] = c.polygonCounts[h], c.packIds[f] = c.packIds[h], c.entityIndexes[f] = c.entityIndexes[h], g += c.polygonCounts[f]; else {
                if (!a.seekToEntry(h)) return;
                d.getUint8();
                d.seek(d.offset + 24);
                c.polygonCounts[f] = d.getUint16();
                c.packIds[f] = parseInt(a.readString());
                c.entityIndexes[f] = a.readU32V();
                g += c.polygonCounts[f];
                e[h] = f
            }
        }
        c.geomDataIndexes = null;
        return g
    };
    c.readGeometryMetadata = function (a, c) {
        var b = a.getEntryCounts(), d = a.stream;
        c.length = b;
        for (var g = c.fragTypes = new Uint8Array(b), e = c.primCounts = new Uint16Array(b), f = c.packIds = new Int32Array(b), h = c.entityIndexes = new Int32Array(b), p, m = 0; m < b; m++) {
            var n = a.seekToEntry(m);
            if (!n) break;
            g[m] = d.getUint8();
            d.seek(d.offset + 24);
            e[m] = d.getUint16();
            f[m] = parseInt(a.readString());
            h[m] = a.readU32V();
            if (2 < n.version) {
                n = d.getInt32();
                if (-1 != n && void 0 === p) {
                    p = c.topoIndexes = new Int32Array(b);
                    for (var t = 0; t < m; t++) p[t] = -1
                }
                void 0 != p && (p[m] = n)
            }
        }
    };
    c.filterFragments = function (a, c) {
        a.length = c.length;
        a.numLoaded = 0;
        for (var b = a.length, d = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity], g = new Float32Array(6 * b), e = new Float32Array(12 * b), f = new Int32Array(b), h = new Int32Array(b), b = new Int32Array(b), p = {}, m = 0; m < c.length; ++m) {
            for (var n = c[m], t = 6 * n, v = 6 * m, r = 0; 6 > r; ++r) g[v++] = a.boxes[t++];
            t = 12 * n;
            v = 12 * m;
            for (r = 0; 12 > r; ++r) e[v++] = a.transforms[t++];
            f[m] = a.materials[n];
            h[m] = a.packIds[n];
            b[m] = a.entityIndexes[n];
            r = a.packIds[n] + ":" + a.entityIndexes[n];
            n = p[r];
            void 0 == n ? p[r] = m : Array.isArray(n) ? n.push(m) : p[r] = [n, m];
            n = 6 * m;
            for (r = 0; 3 > r; ++r) g[n + r] < d[r] && (d[r] = g[n + r]);
            for (r = 3; 6 > r; ++r) g[n + r] > d[r] && (d[r] = g[n + r])
        }
        a.boxes = g;
        a.transforms = e;
        a.materials = f;
        a.packIds = h;
        a.entityIndexes = b;
        a.mesh2frag = p;
        return d
    };
    c.readFragments = function (c, e, b, d, g) {
        function k(b) {
            d && (b *= 6, z.setFromArray(n, b), z.applyMatrix4(x), z.copyToArray(n, b))
        }

        function f(b) {
            b *= 6;
            for (var a = 0; 6 > a; a++) n[b++] = m.getFloat32()
        }

        function q(b, a) {
            for (var d = 6 * b, c = 0; 6 > c; c++) n[d++] = m.getFloat32() + a[c % 3]
        }

        g = a(c, g);
        var p = g.length ? g.length : c.getEntryCounts(), m = c.stream;
        h && p > h && (p = h);
        e.length = p;
        e.numLoaded = 0;
        var n = e.boxes = new Float32Array(6 * p), t = e.transforms = new Float32Array(12 * p),
            v = e.materials = new Int32Array(p), r = e.packIds = new Int32Array(p),
            w = e.entityIndexes = new Int32Array(p), u = e.geomDataIndexes = new Int32Array(p),
            p = e.fragId2dbId = new Int32Array(p), z, x, A = [0, 0, 0];
        d && (z = new LmvBox3, x = (new LmvMatrix4(!0)).fromArray(d.elements));
        for (var y = 0, E = e.length; y < E; y++) {
            var D = g.length ? c.seekToEntry(g[y]) : c.seekToEntry(y);
            if (!D || 5 < D.version) return;
            4 < D.version && c.readU8();
            v[y] = c.readU32V();
            2 < D.version ? u[y] = c.readU32V() : (r[y] = parseInt(c.readString()), w[y] = c.readU32V());
            c.readTransform(y, t, 12 * y, d, b, A);
            3 < D.version ? q(y, A) : f(y);
            k(y);
            if (b) {
                var B = 6 * y;
                n[B++] -= b.x;
                n[B++] -= b.y;
                n[B++] -= b.z;
                n[B++] -= b.x;
                n[B++] -= b.y;
                n[B++] -= b.z
            }
            1 < D.version && (p[y] = c.readU32V())
        }
        e.finishLoading = !0
    }
})();
(function () {
    BimFish.LMVTK.readInstance = function (a, c, h, f) {
        c = a.seekToEntry(c);
        if (!c || 2 < c.version) return null;
        1 < c.version && a.readU8();
        return {
            definition: a.stream.getUint32(),
            transform: a.readTransform(void 0, void 0, void 0, h, f),
            instanceNodePath: a.readPathID()
        }
    }
})();
(function () {
    function a(b) {
        this.unzip = new Zlib.Unzip(b);
        this.fragments = this.metadata = this.materials = this.manifest = null;
        this.geompacks = [];
        this.instances = [];
        this.cameras = [];
        this.lights = [];
        this.propertydb = {attrs: [], avs: [], ids: [], values: [], offsets: []};
        this.animations = this.bbox = null;
        this.pendingRequests = 0;
        this.globalOffset = {x: 0, y: 0, z: 0};
        this.topology = null;
        this.memoryOptimizedMode = !1
    }

    var c = BimFish.Viewing, h = BimFish.LMVTK, f = c.Private;
    c.isMobileDevice();
    var e = c.isMobileDevice() ? 50 : 2E3;
    a.prototype.loadAsyncResource = function (b, a, c, e) {
        if (c) e(c); else {
            var d = this;
            this.pendingRequests++;
            f.ViewingService.getItem(b, b.basePath + a, function (a) {
                d.pendingRequests--;
                e(a);
                0 == d.pendingRequests && d.postLoad(b)
            }, b.onFailureCallback, {asynchronous: !0})
        }
    };
    a.prototype.loadManifest = function (b) {
        b = this.unzip.decompress("manifest.json");
        if (!b) return !1;
        var a = new h.InputStream(b);
        this.manifest = JSON.parse(a.getString(b.byteLength))
    };
    a.prototype.loadRemainingSvf = function (b) {
        var a = this, g = this.unzip, k = this.manifest = b.manifest, f = k.assets, q = g.decompress("metadata.json"),
            p = new h.InputStream(q);
        if (3 < q.byteLength && 0 !== q[3] && (this.metadata = JSON.parse(p.getString(q.byteLength)).metadata)) {
            p = this.metadata["world bounding box"];
            q = {x: p.minXYZ[0], y: p.minXYZ[1], z: p.minXYZ[2]};
            p = {x: p.maxXYZ[0], y: p.maxXYZ[1], z: p.maxXYZ[2]};
            this.bbox = {min: q, max: p};
            this.globalOffset = b.globalOffset || {x: .5 * (q.x + p.x), y: .5 * (q.y + p.y), z: .5 * (q.z + p.z)};
            this.placementTransform = b.placementTransform;
            var m = this.metadata.georeference;
            if (m && (m = m.refPointLMV)) {
                var n = 0, t = this.metadata["custom values"];
                t && t.hasOwnProperty("angleToTrueNorth") && (n = Math.PI / 180 * t.angleToTrueNorth);
                var t = new LmvMatrix4(!0), v = t.elements;
                v[0] = v[5] = Math.cos(n);
                v[1] = -Math.sin(n);
                v[4] = Math.sin(n);
                v[12] = m[0];
                v[13] = m[1];
                v[14] = m[2];
                this.refPointTransform = t
            }
            b.applyRefPoint && this.refPointTransform && (m = new LmvMatrix4(!0), b.placementTransform && m.copy(b.placementTransform), m.multiply(this.refPointTransform), this.placementTransform = b.placementTransform = m);
            q.x -= this.globalOffset.x;
            q.y -= this.globalOffset.y;
            q.z -= this.globalOffset.z;
            p.x -= this.globalOffset.x;
            p.y -= this.globalOffset.y;
            p.z -= this.globalOffset.z;
            this.metadata.hasOwnProperty("double sided geometry") && this.metadata["double sided geometry"].value && (this.doubleSided = !0)
        }
        this.primitiveCount = this.packFileTotalSize = 0;
        p = k.typesets;
        k = {};
        for (q = 0; q < p.length; q++) m = p[q], k[m.id] = m.types;
        for (var r = {}, q = 0; q < f.length; q++) if (p = f[q], !c.isMobileDevice() || "Set.bin" !== p.id && "Topology.json.gz" !== p.id) {
            m = p.type;
            0 == m.indexOf("Autodesk.CloudPlatform.") && (m = m.substr(23));
            n = p.URI;
            t = p.typeset ? k[p.typeset] : null;
            0 != n.indexOf("embed:/") && ("PackFile" == m ? "Autodesk.CloudPlatform.Geometry" == (t ? t[0]["class"] : null) && (this.packFileTotalSize += p.usize || 0, this.geompacks.length < e && this.geompacks.push({
                id: p.id,
                uri: n
            })) : "PropertyAttributes" == m ? this.propertydb.attrs.push(n) : "PropertyAVs" == m ? this.propertydb.avs.push(n) : "PropertyIDs" == m ? this.propertydb.ids.push(n) : "PropertyOffsets" == m ? this.propertydb.offsets.push(n) : "PropertyValues" == m && this.propertydb.values.push(n));
            var w = p.URI, u = null;
            0 == w.indexOf("embed:/") && (w = w.substr(7), u = g.decompress(w));
            if ("ProteinMaterials" == m) -1 == w.indexOf("Protein") ? this.loadAsyncResource(b, w, u, function (b) {
                var c = new h.InputStream(b);
                b = b.byteLength;
                a.materials = 0 < b ? JSON.parse(c.getString(b)) : null
            }) : this.loadAsyncResource(b, w, u, function (b) {
                var c = new h.InputStream(b);
                b = b.byteLength;
                a.proteinMaterials = 0 < b ? JSON.parse(c.getString(b)) : null
            }); else if ("FragmentList" == m) {
                this.memoryOptimizedMode = !1;
                var z = this;
                this.loadAsyncResource(b, w, u, function (c) {
                    var d = new h.PackFileReader(c);
                    c = a.fragments = new h.FragList;
                    h.readFragments(d, c, a.globalOffset, b.placementTransform, b.objectIds);
                    d = null;
                    z.memoryOptimizedMode && r.path && a.loadAsyncResource(b, r.path, r.contents, function (b) {
                        d = new h.PackFileReader(b);
                        a.primitiveCount = h.readGeometryMetadataIntoFragments(d, a.fragments);
                        d = null;
                        r.contents = null
                    })
                })
            } else "GeometryMetadataList" == m ? (z = this, this.loadAsyncResource(b, w, u, function (b) {
                b = new h.PackFileReader(b);
                a.geomMetadata = {};
                z.memoryOptimizedMode ? a.fragments && a.fragments.finishLoading ? a.primitiveCount = h.readGeometryMetadataIntoFragments(b, a.fragments) : (r.path = w, r.contents = u, u = null) : h.readGeometryMetadata(b, a.geomMetadata)
            })) : "PackFile" == m ? -1 != w.indexOf("CameraDefinitions.bin") ? this.loadAsyncResource(b, w, u, function (b) {
                a.camDefPack = new h.PackFileReader(b)
            }) : -1 != w.indexOf("CameraList.bin") ? this.loadAsyncResource(b, w, u, function (b) {
                a.camInstPack = new h.PackFileReader(b)
            }) : -1 != w.indexOf("LightDefinitions.bin") ? this.loadAsyncResource(b, w, u, function (b) {
                a.lightDefPack = new h.PackFileReader(b)
            }) : -1 != w.indexOf("LightList.bin") && this.loadAsyncResource(b, w, u, function (b) {
                a.lightInstPack = new h.PackFileReader(b)
            }) : "Animations" == m ? this.loadAsyncResource(b, w, u, function (b) {
                var c = new h.InputStream(b);
                b = b.byteLength;
                if (0 < b) {
                    if (a.animations = JSON.parse(c.getString(b)), c = a.animations.animations) {
                        b = function (b, a) {
                            b[0] -= a.x;
                            b[1] -= a.y;
                            b[2] -= a.z
                        };
                        for (var d = a.globalOffset, g = (new LmvMatrix4).makeTranslation(d.x, d.y, d.z), e = (new LmvMatrix4).makeTranslation(-d.x, -d.y, -d.z), k = new LmvMatrix4, f = new LmvMatrix4, l = 0; l < c.length; l++) {
                            var q = c[l];
                            if (q.hierarchy) for (var m = 0; m < q.hierarchy.length; m++) {
                                var p = q.hierarchy[m].keys;
                                if (p) for (var n = 0; n < p.length; n++) {
                                    var t = p[n].pos;
                                    if (t) {
                                        var v = d, r = p[n].rot;
                                        r && (k.makeRotationFromQuaternion({
                                            x: r[0],
                                            y: r[1],
                                            z: r[2],
                                            w: r[3]
                                        }), f.multiplyMatrices(g, k).multiply(e), v = {
                                            x: f.elements[12],
                                            y: f.elements[13],
                                            z: f.elements[14]
                                        });
                                        b(t, v)
                                    }
                                    (t = p[n].target) && b(t, d);
                                    if (t = p[n].points) for (v = 0; v < t.length; v++) b(t[v], d)
                                }
                            }
                        }
                    }
                } else a.animations = null
            }) : "Topology" == m && this.loadAsyncResource(b, w, u, function (b) {
                var c = new h.InputStream(b);
                b = b.byteLength;
                a.topology = 0 < b ? JSON.parse(c.getString(b)) : null
            })
        }
        0 == this.pendingRequests && this.postLoad(b);
        delete this.unzip
    };
    a.prototype.addTransparencyFlagsToMaterials = function (b) {
        for (var a in b) {
            var c = b[a];
            c.transparent = c.materials[c.userassets[0]].transparent
        }
    };
    a.prototype.postLoad = function (b) {
        if (this.camDefPack && this.camInstPack) {
            for (var a = 0, c = this.camInstPack.getEntryCounts(); a < c; a++) {
                var e = h.readInstance(this.camInstPack, a, this.placementTransform, this.globalOffset),
                    l = h.readCameraDefinition(this.camDefPack, e);
                e.transform && (e.transform.transformPoint(l.position), e.transform.transformPoint(l.target), e.transform.transformDirection(l.up));
                this.cameras.push(l)
            }
            delete this.camDefPack;
            delete this.camInstPack
        }
        if (this.lightDefPack && this.lightInstPack) {
            a = 0;
            for (c = this.lightInstPack.getEntryCounts(); a < c; a++) e = h.readInstance(this.lightInstPack, a, this.placementTransform, this.globalOffset), this.lights.push(h.readLightDefinition(this.lightDefPack, e.definition));
            delete this.lightInstPack;
            delete this.lightDefPack
        }
        e = this.fragments;
        if (this.geomMetadata) {
            e.polygonCounts = e.geomDataIndexes;
            c = this.geomMetadata;
            void 0 != c.topoIndexes && (e.topoIndexes = new Int32Array(e.length));
            a = 0;
            for (l = e.length; a < l; a++) {
                var q = e.geomDataIndexes[a];
                e.entityIndexes[a] = c.entityIndexes[q];
                e.packIds[a] = c.packIds[q];
                e.polygonCounts[a] = c.primCounts[q];
                this.primitiveCount += c.primCounts[q];
                void 0 != c.topoIndexes && (e.topoIndexes[a] = c.topoIndexes[q])
            }
            this.geomMetadata = e.geomDataIndexes = null
        }
        for (var q = e.mesh2frag = {}, c = e.packIds, p = e.entityIndexes, a = 0, l = e.length; a < l; a++) {
            var m = c[a] + ":" + p[a], n = q[m];
            void 0 === n ? q[m] = a : Array.isArray(n) ? n.push(a) : q[m] = [n, a]
        }
        if (!this.bbox || b.placementTransform) {
            c = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
            l = e.boxes;
            q = 0;
            for (e = e.length; q < e; q++) {
                p = 6 * q;
                for (a = 0; 3 > a; a++) l[p + a] < c[a] && (c[a] = l[p + a]);
                for (a = 3; 6 > a; a++) l[p + a] > c[a] && (c[a] = l[p + a])
            }
            this.bbox = {min: {x: c[0], y: c[1], z: c[2]}, max: {x: c[3], y: c[4], z: c[5]}}
        }
        q = b.objectIds;
        if (null != q) {
            c = [];
            e = [];
            for (a = 0; a < q.length; ++a) for (l = 0; l < this.fragments.length; ++l) this.fragments.fragId2dbId[l] == q[a] && (c.push(this.fragments.packIds[l]), e.push(l));
            l = 1;
            q = c.length;
            for (a = 1; a < q;) {
                for (; a < q && c[a] == c[a - 1];) ++a;
                if (q == a) break;
                c[l++] = c[a++]
            }
            c.splice(l - 1, q - l);
            q = [];
            for (a = 0; a < this.geompacks.length; ++a) for (l = 0; l < c.length; ++l) parseInt(this.geompacks[a].id) == c[l] && q.push(this.geompacks[a]);
            this.geompacks = q;
            a = h.filterFragments(this.fragments, e);
            this.bbox = {min: {x: a[0], y: a[1], z: a[2]}, max: {x: a[3], y: a[4], z: a[5]}}
        }
        this.memoryOptimizedMode || b.loadDoneCB("svf");
        this.fragments.polygonCounts && (a = performance.now(), (c = this.materials ? this.materials.materials : null) && this.addTransparencyFlagsToMaterials(c), this.bvh = new f.BVHBuilder(this.fragments, c), this.bvh.build(b.bvhOptions), c = performance.now(), b.worker.debug("BVH build time (worker thread):" + (c - a)), this.memoryOptimizedMode ? b.loadDoneCB("svf") : b.loadDoneCB("bvh"));
        b.loadDoneCB("done")
    };
    h.Package = a
})();
(function () {
    var a = BimFish.LMVTK;
    a.PropertyDatabase = function (c) {
        function h(b) {
            b = a.utf8ArrayToString(b, 0, b.length);
            return JSON.parse(b)
        }

        function f(b, c) {
            if (void 0 === c) return "";
            for (var d = c; d < b.length - 1;) {
                var e = b[d];
                if (44 == e && (10 == b[d + 1] || 13 == b[d + 1])) break;
                if (10 == e || 13 == e) break;
                d++
            }
            d = a.utf8ArrayToString(b, c, d - c);
            try {
                return JSON.parse(d)
            } catch (G) {
                return console.error("Error parsing property blob to JSON : " + d), d
            }
        }

        function e(b, a) {
            for (var c = 0, d = 0, e = b.length; d < e; d++) 44 == b[d] && c++;
            c++;
            for (var e = new Uint32Array(c + (a ? 1 : 0)), d = 0, g = b.length; 91 != b[d] && d < g;) d++;
            if (d == b.length) return null;
            d++;
            for (var k = !1, f = c = 0; d < g;) {
                var l = b[d];
                48 <= l && 57 >= l ? (f = 10 * f + (l - 48), k = !0) : 44 == l || 93 == l ? k && (e[c++] = f, k = !1, f = 0) : (k = !1, f = 0);
                d++
            }
            return e
        }

        function b(b) {
            for (var a = 0, c = b.length - 1, d = 0; d < c; d++) 44 != b[d] || 10 != b[d + 1] && 13 != b[d + 1] || a++;
            if (!a) return null;
            a++;
            for (var e = new Uint32Array(a), a = d = 0; 91 != b[d] && d < c;) d++;
            d++;
            e[a++] = d;
            for (var g = !1; d < c;) 10 == b[d] || 13 == b[d] ? g = !0 : g && (g = !1, e[a++] = d), d++;
            return e
        }

        var d, g, k, l, q, p, m, n, t, v, r, w, u, z, x, A;
        for (A in c.attrs) {
            d = h(c.attrs[A]);
            for (var y = 0; y < d.length; y++) switch (d[y][1]) {
                case "__parent__":
                    t = y;
                    break;
                case "__child__":
                    n = y;
                    break;
                case "__name__":
                    v = y;
                    break;
                case "__instanceof__":
                    r = y;
                    break;
                case "__viewable_in__":
                    w = y;
                    break;
                case "__externalref__":
                    u = y;
                    break;
                case "__node_flags__":
                    z = y
            }
            break
        }
        for (A in c.avs) {
            k = e(c.avs[A], 0);
            delete c.avs;
            break
        }
        for (A in c.offsets) {
            g = e(c.offsets[A], 1);
            g[g.length - 1] = k.length / 2;
            delete c.offsets;
            break
        }
        for (A in c.values) {
            l = c.values[A];
            q = b(l);
            break
        }
        for (A in c.ids) {
            p = c.ids[A];
            m = b(p);
            break
        }
        this.getObjectCount = function () {
            return g.length - 1
        };
        this.getValueAt = function (b) {
            return f(l, q[b])
        };
        this.getIntValueAt = function (b) {
            var a = 0;
            b = q[b];
            for (34 == l[b] && b++; b < l.length - 1;) {
                var c = l[b];
                if (44 == c && (10 == l[b + 1] || 13 == l[b + 1])) break;
                if (10 == c || 13 == c || 34 == c) break;
                48 <= c && 57 >= c && (a = 10 * a + (c - 48));
                b++
            }
            return a
        };
        this.getIdAt = function (b) {
            return f(p, m[b])
        };
        this.getObjectProperties = function (b, a) {
            var c = {dbId: b, properties: []}, e = !1, f = !1;
            if (!a || -1 !== a.indexOf("externalId")) if (c.externalId = this.getIdAt(b), e = !0, a && 1 === a.length) return c;
            for (var l = null, h = 2 * g[b + 1], q = 2 * g[b]; q < h; q += 2) {
                var m = k[q];
                if (m == r) {
                    var p = this.getObjectProperties(this.getValueAt(k[q + 1]), a);
                    p && p.properties && (l = p)
                } else p = d[m], a && -1 === a.indexOf(p[0]) && -1 === a.indexOf(p[5]) || (m == v ? (p = this.getValueAt(k[q + 1]), f = !0, c.name = p) : (m = (p[6] ? p[6] : 0) & 1 || m == t || m == n || m == w || m == u, c.properties.push({
                    displayName: p[5] ? p[5] : p[0],
                    displayValue: this.getValueAt(k[q + 1]),
                    displayCategory: p[1],
                    type: p[2],
                    units: p[3],
                    hidden: m
                })))
            }
            if (l) {
                h = {};
                p = c.properties;
                for (q = 0; q < p.length; q++) h[p[q].displayName] = 1;
                c.name || (c.name = l.name);
                l = l.properties;
                for (q = 0; q < l.length; q++) h.hasOwnProperty(l[q].displayName) || p.push(l[q])
            }
            return !a || c.properties.length || e || f ? c : null
        };
        this.getExternalIdMapping = function () {
            if (!x && (x = {}, m && "length" in m)) for (var b = 1, a = m.length; b < a; ++b) {
                var c = this.getIdAt(b);
                x[c] = b
            }
            return x
        };
        this.findRootNodes = function () {
            for (var b = [], a = 1, c = g.length; a < c; a++) {
                for (var d = !1, e = !1, f = !1, l = 2 * g[a + 1], h = 2 * g[a]; h < l; h += 2) {
                    var q = k[h];
                    q == t ? this.getIntValueAt(k[h + 1]) && (e = !0) : q == n ? d = !0 : q == v && (f = !0)
                }
                d && f && !e && b.push(a)
            }
            return b
        };
        this.getNodeNameAndChildren = function (b, a) {
            for (var c = b.dbId, d = 2 * g[c], c = 2 * g[c + 1], e, f = d; f < c; f += 2) {
                var l = k[f];
                l != t && (l != n || a ? l == v ? b.name = this.getValueAt(k[f + 1]) : l == z && (b.flags = this.getIntValueAt(k[f + 1])) : (l = this.getIntValueAt(k[f + 1]), l = {
                    dbId: l,
                    parent: b.dbId
                }, e ? e.push(l) : e = [l]))
            }
            if (!b.name) for (f = d; f < c; f += 2) l = k[f], l == r && (d = {
                dbId: this.getIntValueAt(k[f + 1]),
                name: null
            }, this.getNodeNameAndChildren(d, !0), d && d.name && !b.name && (b.name = d.name));
            return e
        };
        this.buildObjectTreeFlat = function (b, a, c, d, e, g) {
            d > e[0] && (e[0] = d);
            var k = {dbId: b}, f = this.getNodeNameAndChildren(k), l = [], h = !1;
            if (c) {
                var q = c[b];
                void 0 !== q && (f && f.length && console.error("Node that has both node children and fragment children! Not supported by flat storage"), l = Array.isArray(q) ? q : [q], h = !0)
            }
            q = k.flags || 0;
            void 0 === q && (q = h ? 6 : 0);
            if (f) for (var m = 0; m < f.length; m++) this.buildObjectTreeFlat(f[m].dbId, b, c, d + 1, e, g) && l.push(f[m].dbId);
            l.length && g.setNode(b, a, k.name, q, l, h);
            return l.length
        };
        this.bruteForceSearch = function (b, a) {
            b = b.toLowerCase();
            for (var c = b.match(/"[^"]+"|[^\s]+/g) || [], e = c.length; e--;) c[e] = c[e].replace(/"/g, "");
            for (var f = [], e = 0; e < c.length; e++) 1 < c[e].length && f.push(c[e]);
            if (0 === f.length) return [];
            for (var c = [], l = 0; l < f.length; l++) {
                for (var h = [], m = [], e = 0, p = q.length; e < p; e++) {
                    var n = this.getValueAt(e);
                    "string" == typeof n ? -1 != n.toLowerCase().indexOf(f[l]) && m.push(e) : -1 != n.toString().toLowerCase().indexOf(f[l]) && m.push(e)
                }
                p = 1;
                for (n = g.length; p < n; p++) for (var t = 2 * g[p + 1], e = 2 * g[p]; e < t; e += 2) if (!(-1 == m.indexOf(k[e + 1]) || a && a.length && -1 === a.indexOf(d[k[e]][0]))) {
                    h.push(p);
                    break
                }
                c.push(h)
            }
            if (1 === c.length) return c[0];
            f = {};
            h = c[0];
            for (e = 0; e < h.length; e++) f[h[e]] = 1;
            for (m = 1; m < c.length; m++) {
                h = c[m];
                p = {};
                for (e = 0; e < h.length; e++) 1 === f[h[e]] && (p[h[e]] = 1);
                f = p
            }
            h = [];
            for (l in f) h.push(parseInt(l));
            return h
        };
        this.getAttributeToIdMap = function () {
            for (var b = {}, a, c = 0; c < g.length; c++) for (var d = this.getObjectProperties(c), e = 0; e < d.properties.length; e++) {
                var k = d.properties[e];
                k.displayName in b || (b[k.displayName] = {
                    values: [],
                    units: k.units,
                    category: k.displayCategory,
                    isnumber: !0
                });
                a = b[k.displayName];
                isNaN(k.displayValue) && (a.isnumber = !1);
                a.values.push({value: k.displayValue, id: c})
            }
            return b
        }
    }
})();
(function () {
    function a(b, a, e, k) {
        this.metadata = b;
        this.scaleY = this.scaleX = 1;
        this.bbox = {min: {x: 0, y: 0, z: 0}, max: {x: 0, y: 0, z: 0}};
        this.is2d = !0;
        this.layersMap = {};
        this.fontDefs = {};
        this.fontId = this.fontCount = 0;
        this.manifestAvailable = !1;
        this.objectMemberQueue = [];
        this.propertydb = {
            attrs: [],
            avs: [],
            ids: [],
            values: [],
            offsets: [],
            rcv_offsets: [],
            rcvs: [],
            viewables: []
        };
        if (b) {
            var d = b.page_dimensions;
            this.paperWidth = d.page_width;
            this.paperHeight = d.page_height;
            this.scaleX = this.paperWidth / d.plot_width;
            this.scaleY = this.paperHeight / d.plot_height;
            this.hidePaper = d.hide_paper;
            this.bbox.max.x = this.paperWidth;
            this.bbox.max.y = this.paperHeight;
            d = 0;
            this.layersMap[0] = d++;
            for (var g in b.layers) {
                var f = parseInt(g);
                this.layersMap[f] = d++
            }
            this.layerCount = d;
            this.createLayerGroups(b.layers)
        }
        this.hidePaper = this.hidePaper || k && k.modelSpace;
        this.opCount = 0;
        this.fontFaces = [];
        this.fontFamilies = [];
        this.viewports = [0];
        this.currentVpId = 0;
        this.clips = [0];
        this.strings = [];
        this.stringDbIds = [];
        this.currentStringNumber = -1;
        this.objectNumber = 0;
        this.currentFakeId = -2;
        this.maxObjectNumber = this.imageNumber = 0;
        this.objectStack = [];
        this.objectNameStack = [];
        this.parseObjState = {polyTriangle: {}, viewport: {}, clip: {}, raster: {}, text: {}, fontDef: {}, uknown: {}};
        this.layer = 0;
        this.bgColor = "number" === typeof k.bgColor ? k.bgColor : 4294967295;
        this.contrastColor = this.color = this.fillColor = 4278190080;
        this.hidePaper && (this.contrastColor = 4294967040);
        this.currentVbb = new c.VertexBufferBuilder(!1);
        this.meshes = [];
        this.numPolytriangles = this.numTriangles = this.numCircles = this.numEllipses = this.numPolylines = this.numLineSegs = 0;
        this.error = !1;
        this.offsetY = this.offsetX = 0;
        if (a) for (this.manifestAvailable = !0, this.imageId2URI = {}, b = a.assets, a = 0, k = b.length; a < k; ++a) g = b[a], -1 != g.mime.indexOf("image/") && (d = g.id, d = d.substr(0, d.indexOf(".")), this.imageId2URI[d] = e + g.URI), "Autodesk.CloudPlatform.PropertyAttributes" == g.type && this.propertydb.attrs.push(g.URI), "Autodesk.CloudPlatform.PropertyValues" == g.type && this.propertydb.values.push(g.URI), "Autodesk.CloudPlatform.PropertyIDs" == g.type && this.propertydb.ids.push(g.URI), "Autodesk.CloudPlatform.PropertyViewables" == g.type && this.propertydb.viewables.push(g.URI), "Autodesk.CloudPlatform.PropertyOffsets" == g.type && (-1 != g.id.indexOf("rcv") ? this.propertydb.rcv_offsets.push(g.URI) : this.propertydb.offsets.push(g.URI)), "Autodesk.CloudPlatform.PropertyAVs" == g.type && this.propertydb.avs.push(g.URI), "Autodesk.CloudPlatform.PropertyRCVs" == g.type && this.propertydb.rcvs.push(g.URI)
    }

    var c = BimFish.Viewing.Private, h = BimFish.LMVTK, f = {
        dt_object: 0,
        dt_void: 1,
        dt_byte: 2,
        dt_int: 3,
        dt_float: 4,
        dt_double: 5,
        dt_varint: 6,
        dt_point_varint: 7,
        dt_byte_array: 32,
        dt_int_array: 33,
        dt_float_array: 34,
        dt_double_array: 35,
        dt_varint_array: 36,
        dt_point_varint_array: 37,
        dt_arc: 38,
        dt_circle: 39,
        dt_circular_arc: 40,
        dt_string: 63,
        dt_last_data_type: 127
    }, e = {
        st_object_member: 0,
        st_fill: 1,
        st_fill_off: 2,
        st_clip_off: 3,
        st_layer: 4,
        st_link: 5,
        st_line_weight: 6,
        st_miter_angle: 7,
        st_miter_length: 8,
        st_line_pattern_ref: 9,
        st_back_color: 10,
        st_color: 11,
        st_markup: 12,
        st_object_id: 13,
        st_markup_id: 14,
        st_reset_rel_offset: 15,
        st_font_ref: 16,
        st_begin_object: 32,
        st_clip: 33,
        st_line_caps: 34,
        st_line_join: 35,
        st_line_pattern_def: 36,
        st_font_def: 37,
        st_viewport: 38,
        st_sheet: 42,
        st_arc: 43,
        st_polyline: 44,
        st_raster: 45,
        st_text: 46,
        st_polytriangle: 47,
        st_dot: 48,
        st_end_object: 63,
        st_last_semantic_type: 127
    };
    a.prototype.load = function (b, a) {
        a instanceof Uint8Array || (a = new Uint8Array(a));
        this.data = a;
        this.parse();
        b.loadDoneCB(!0)
    };
    a.prototype.loadFrames = function (b) {
        this.loadContext = b;
        var a = b.data;
        a ? (a instanceof Uint8Array || (a = new Uint8Array(a)), this.data = a) : b.finalFrame && (this.data = null);
        this.parseFrames(b.finalFrame);
        b.loadDoneCB(!0)
    };
    a.prototype.flushBuffer = function (b, a) {
        if (this.currentVbb.vcount || a) if (a || this.currentVbb.isFull(b)) {
            if (this.currentVbb.vcount) {
                var d = this.currentVbb.toMesh();
                h.VBUtils.bboxUnion(this.bbox, d.boundingBox);
                this.meshes.push(d);
                d.material = {
                    skipEllipticals: !this.currentVbb.numEllipticals,
                    skipCircles: !this.currentVbb.numCirculars,
                    skipTriangleGeoms: !this.currentVbb.numTriangleGeoms,
                    useInstancing: this.currentVbb.useInstancing
                };
                this.currentImage && (d.material.image = this.currentImage, d.material.image.name = this.imageNumber++, this.currentImage = null);
                this.currentVbb = new c.VertexBufferBuilder
            }
            this.loadContext && this.loadContext.loadDoneCB(!0, a)
        }
    };
    a.prototype.tx = function (b) {
        return this.sx(b)
    };
    a.prototype.ty = function (b) {
        return this.sy(b)
    };
    a.prototype.sx = function (b) {
        return b * this.scaleX
    };
    a.prototype.sy = function (b) {
        return b * this.scaleY
    };
    a.prototype.invertColor = function (b) {
        return (b >> 24 & 255) << 24 | 255 - (b >> 16 & 255) << 16 | 255 - (b >> 8 & 255) << 8 | 255 - (b & 255)
    };
    a.prototype.mapColor = function (b, a) {
        if (!this.hidePaper || 0 !== this.bgColor) return b;
        var c = b & 255;
        127 > c || c === (b & 65280) >> 8 && c === (b & 16711680) >> 16 && a && (b &= 2583691263);
        return b
    };
    a.prototype.restoreSignBitFromLSB = function (b) {
        return b & 1 ? -(b >>> 1) : b >>> 1
    };
    a.prototype.parsePointPositions = function () {
        var b = this.stream.getVarints(), a = this.stream.getVarints(), b = this.restoreSignBitFromLSB(b),
            a = this.restoreSignBitFromLSB(a), b = b + this.offsetX, a = a + this.offsetY;
        this.offsetX = b;
        this.offsetY = a;
        return [this.tx(b), this.ty(a)]
    };
    a.prototype.parserAssert = function (a, d, e) {
        return a != d ? (c.logger.warn("Expect " + d + "; actual type is " + a + "; in function " + e), this.error = !0) : !1
    };
    a.prototype.unhandledTypeWarning = function (a, d) {
        c.logger.warn("Unhandled semantic type : " + d + " in function " + a)
    };
    a.prototype.parseObject = function () {
        var a = this.stream.getVarints();
        this.objectStack.push(a);
        switch (a) {
            case e.st_sheet:
                this.objectNameStack.push("sheet");
                this.objectMemberQueue.unshift("paperColor");
                break;
            case e.st_viewport:
                this.objectNameStack.push("viewport");
                this.objectMemberQueue.unshift("units", "transform");
                break;
            case e.st_clip:
                this.objectNameStack.push("clip");
                this.objectMemberQueue.unshift("contourCounts", "points", "indices");
                break;
            case e.st_polytriangle:
                this.objectNameStack.push("polyTriangle");
                this.objectMemberQueue.unshift("points", "indices", "colors");
                break;
            case e.st_raster:
                this.objectNameStack.push("raster");
                this.objectMemberQueue.unshift("position", "width", "height", "imageId");
                break;
            case e.st_text:
                this.currentStringNumber = this.strings.length;
                0 === this.objectNumber && (this.objectNumber = this.currentFakeId--);
                this.objectNameStack.push("text");
                this.objectMemberQueue.unshift("string", "position", "height", "widthScale", "rotation", "oblique", "charWidths");
                break;
            case e.st_font_def:
                this.objectNameStack.push("fontDef");
                this.objectMemberQueue.unshift("name", "fullName", "flags", "spacing", "panose");
                break;
            case e.st_end_object:
                this.objectStack.pop();
                if (this.objectStack.length) {
                    switch (this.objectStack.pop()) {
                        case e.st_polytriangle:
                            this.actOnPolyTriangle();
                            break;
                        case e.st_viewport:
                            this.actOnViewport();
                            break;
                        case e.st_clip:
                            this.actOnClip();
                            break;
                        case e.st_raster:
                            this.actOnRaster();
                            break;
                        case e.st_text:
                            this.actOnText();
                            break;
                        case e.st_font_def:
                            this.actOnFontDef()
                    }
                    var a = this.objectNameStack.pop(), a = this.parseObjState[a], c;
                    for (c in a) a[c] = null
                } else this.parserAssert(0, 1, "parseEndObject (Stack Empty)");
                this.objectMemberQueue.length = 0;
                break;
            default:
                this.objectNameStack.push("unknown"), this.error = !0, this.unhandledTypeWarning("parseObject", a)
        }
    };
    a.prototype.initSheet = function (a) {
        this.bgColor = a;
        if (!this.hidePaper && this.metadata) {
            var b = this.paperWidth, c = this.paperHeight, e = this.currentVbb, f = .0075 * b;
            this.addPolyTriangle([0, 0, b, 0, b, c, 0, c, f, -f, b + f, -f, b + f, 0, f, 0, b, 0, b + f, 0, b + f, c - f, b, c - f], [a, a, a, a, 4283782485, 4283782485, 4283782485, 4283782485, 4283782485, 4283782485, 4283782485, 4283782485], [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11], 4294967295, -1, 0, !1);
            e.addSegment(0, 0, b, 0, 0, 1E-6, 4278190080, -1, 0, this.currentVpId);
            e.addSegment(b, 0, b, c, 0, 1E-6, 4278190080, -1, 0, this.currentVpId);
            e.addSegment(b, c, 0, c, 0, 1E-6, 4278190080, -1, 0, this.currentVpId);
            e.addSegment(0, c, 0, 0, 0, 1E-6, 4278190080, -1, 0, this.currentVpId)
        }
    };
    a.prototype.setObjectMember = function (a) {
        if (!this.objectMemberQueue.length) return c.logger.warn("Unexpected object member. " + a + " on object " + this.objectNameStack[this.objectNameStack.length - 1]), !1;
        var b = this.objectMemberQueue.shift(), e = this.objectNameStack[this.objectNameStack.length - 1];
        return "sheet" == e && "paperColor" == b ? (this.initSheet(a), !0) : e ? (this.parseObjState[e][b] = a, !0) : !1
    };
    a.prototype.parseString = function () {
        var a = this.stream, d = a.getVarints(), g = a.getVarints(), a = a.getString(g);
        switch (d) {
            case e.st_object_member:
                if (this.setObjectMember(a)) return;
                break;
            default:
                c.logger.info("Unexpected opcode semantic type for string.")
        }
        return a
    };
    a.prototype.actOnFontDef = function () {
        var a = this.parseObjState.fontDef;
        this.fontDefs[++this.fontCount] = a;
        this.fontId = this.fontCount
    };
    a.prototype.parsePoint = function () {
        var a = this.stream.getVarints(), d = this.parsePointPositions();
        switch (a) {
            case e.st_object_member:
                if (this.setObjectMember(d)) return;
                break;
            default:
                c.logger.info("Unexpected opcode semantic type for point.")
        }
        return d
    };
    a.prototype.parsePointsArray = function () {
        var a = this.stream, d = a.getVarints();
        if (a = a.getVarints()) {
            for (var a = a / 2, g = [], k, f = 0; f < a; ++f) k = this.parsePointPositions(), g.push(k[0]), g.push(k[1]);
            switch (d) {
                case e.st_polyline:
                    this.actOnPolylinePointsArray(g);
                    return;
                case e.st_dot:
                    this.actOnDot(g);
                    return;
                case e.st_object_member:
                    if (this.setObjectMember(g)) return;
                    break;
                default:
                    c.logger.info("Unexpected opcode semantic type for points array.")
            }
            return g
        }
    };
    a.prototype.parseIntArray = function () {
        for (var a = this.stream, c = a.getVarints(), g = a.getVarints(), k = [], f = 0; f < g; ++f) k.push(a.getUint32());
        switch (c) {
            case e.st_object_member:
                if (this.setObjectMember(k)) return;
                break;
            default:
                this.unhandledTypeWarning("parseIntArray", c)
        }
        return k
    };
    a.prototype.parseDoubleArray = function () {
        for (var a = this.stream, c = a.getVarints(), g = a.getVarints(), k = [], f = 0; f < g; ++f) k.push(a.getFloat64());
        switch (c) {
            case e.st_object_member:
                if (this.setObjectMember(k)) return;
                break;
            default:
                this.unhandledTypeWarning("parseDoubleArray", c)
        }
        return k
    };
    a.prototype.parseByteArray = function () {
        for (var a = this.stream, c = a.getVarints(), g = a.getVarints(), k = [], f = 0; f < g; ++f) k.push(a.getUint8());
        switch (c) {
            case e.st_object_member:
                if (this.setObjectMember(k)) return;
                break;
            default:
                this.unhandledTypeWarning("parseByteArray", c)
        }
        return k
    };
    a.prototype.parseVarintArray = function () {
        for (var a = this.stream, c = a.getVarints(), g = [], k = a.getVarints(), f = 0; f < k; ++f) g.push(a.getVarints());
        switch (c) {
            case e.st_object_member:
                if (this.setObjectMember(g)) return;
                break;
            default:
                this.unhandledTypeWarning("parseVarIntArray", c)
        }
        return g
    };
    a.prototype.parseInt = function () {
        var a = this.stream, c = a.getVarints(), a = a.getUint32();
        switch (c) {
            case e.st_color:
                this.color = this.mapColor(a, !1);
                break;
            case e.st_fill:
                this.fill = !0;
                this.fillColor = this.mapColor(a, !0);
                break;
            case e.st_object_member:
                if (this.setObjectMember(a)) return;
            default:
                this.unhandledTypeWarning("parseInt", c)
        }
        return a
    };
    a.prototype.parseVoid = function () {
        var a = this.stream.getVarints();
        switch (a) {
            case e.st_fill_off:
                this.fill = !1;
                break;
            default:
                this.unhandledTypeWarning("parseVoid", a)
        }
    };
    a.prototype.parseVarint = function () {
        var a = this.stream, c = a.getVarints(), a = a.getVarints();
        switch (c) {
            case e.st_line_weight:
                this.lineWeight = this.tx(a);
                break;
            case e.st_object_id:
            case e.st_markup_id:
                this.objectNumber = a;
                this.maxObjectNumber = Math.max(this.maxObjectNumber, a);
                break;
            case e.st_layer:
                this.layer = this.layersMap[a];
                break;
            case e.st_font_ref:
                this.fontId = a;
                break;
            case e.st_object_member:
                if (this.setObjectMember(a)) return
        }
        return a
    };
    a.prototype.parseFloat = function () {
        var a = this.stream, c = a.getVarints(), a = a.getFloat32();
        switch (c) {
            case e.st_object_member:
                if (this.setObjectMember(a)) return
        }
        return a
    };
    a.prototype.parseCircularArc = function () {
        var a = this.stream, c = a.getVarints();
        if (!this.parserAssert(c, e.st_arc, "parseCircularArc")) {
            var c = this.parsePointPositions(), g = a.getVarints(), k = a.getFloat32(), a = a.getFloat32();
            this.actOnCircularArc(c[0], c[1], k, a, this.sx(g))
        }
    };
    a.prototype.parseCircle = function () {
        var a = this.stream, c = a.getVarints();
        this.parserAssert(c, e.st_arc, "parseCircle") || (c = this.parsePointPositions(), a = a.getVarints(), this.actOnCompleteCircle(c[0], c[1], this.sx(a)))
    };
    a.prototype.parseArc = function () {
        var a = this.stream, c = a.getVarints();
        if (!this.parserAssert(c, e.st_arc, "parseArc")) {
            var c = this.parsePointPositions(), g = a.getVarints(), k = a.getVarints(), f = a.getFloat32(),
                h = a.getFloat32(), a = a.getFloat32();
            this.actOnArc(c[0], c[1], h, a, this.sx(g), this.sy(k), f)
        }
    };
    a.prototype.parseDataType = function () {
        var a = this.stream.getVarints();
        switch (a) {
            case f.dt_void:
                this.parseVoid();
                break;
            case f.dt_int:
                this.parseInt();
                break;
            case f.dt_object:
                this.parseObject();
                break;
            case f.dt_varint:
                this.parseVarint();
                break;
            case f.dt_point_varint:
                this.parsePoint();
                break;
            case f.dt_float:
                this.parseFloat();
                break;
            case f.dt_point_varint_array:
                this.parsePointsArray();
                break;
            case f.dt_circular_arc:
                this.parseCircularArc();
                break;
            case f.dt_circle:
                this.parseCircle();
                break;
            case f.dt_arc:
                this.parseArc();
                break;
            case f.dt_int_array:
                this.parseIntArray();
                break;
            case f.dt_varint_array:
                this.parseVarintArray();
                break;
            case f.dt_byte_array:
                this.parseByteArray();
                break;
            case f.dt_string:
                this.parseString();
                break;
            case f.dt_double_array:
                this.parseDoubleArray();
                break;
            default:
                this.error = !0, c.logger.info("Data type not supported yet: " + a)
        }
    };
    a.prototype.parse = function () {
        var a = this.stream = new h.InputStream(this.data), d = a.getString(3);
        if ("F2D" != d) c.logger.error("Invalid F2D header : " + d); else if (d = a.getString(2), "01" != d) c.logger.error("Only support f2d major version 1; actual version is : " + d); else if ("." != a.getString(1)) c.logger.error("Invalid version delimiter."); else {
            for (a.getString(2); a.offset < a.byteLength;) {
                this.parseDataType();
                if (this.error) break;
                this.opCount++
            }
            this.flushBuffer(0, !0);
            this.data = this.stream = this.currentVbb = null;
            c.logger.info("F2d parse: data types count : " + this.opCount)
        }
    };
    a.prototype.parseFrames = function (a) {
        if (this.data) for (var b = this.stream = new h.InputStream(this.data); b.offset < b.byteLength;) {
            this.parseDataType();
            if (this.error) break;
            this.opCount++
        } else a || c.logger.warn("Unexpected F2D parse state: If there is no data, we only expect a flush command, but flush was false.");
        a && this.flushBuffer(0, !0);
        this.data = this.stream = null
    };
    a.prototype.actOnPolylinePointsArray = function (a) {
        this.flushBuffer();
        this.numPolylines++;
        for (var b = a.length / 2, c = 0, e = a[0], f = a[1], h = 1; h < b; ++h) {
            var p = a[2 * h], m = a[2 * h + 1];
            this.currentVbb.addSegment(e, f, p, m, c, this.lineWeight, this.color, this.objectNumber, this.layer, this.currentVpId);
            c += Math.sqrt((p - e) * (p - e) + (m - f) * (m - f));
            e = p;
            f = m
        }
        this.numLineSegs += b - 1
    };
    a.prototype.actOnDot = function (a) {
        this.actOnCompleteCircle(a[0], a[1], this.sx(1))
    };
    a.prototype.actOnCompleteCircle = function (a, c, e) {
        this.flushBuffer();
        this.numCircles++;
        this.fill ? this.currentVbb.addSegment(a, c, a, c, 0, 2 * e, this.color, this.objectNumber, this.layer, this.currentVpId, !0, !1, !0) : this.currentVbb.addArc(a, c, 0, 2 * Math.PI, e, e, 0, this.lineWeight, this.color, this.objectNumber, this.layer, this.currentVpId)
    };
    a.prototype.actOnCircularArc = function (a, c, e, k, f) {
        this.numCircles++;
        this.flushBuffer();
        this.currentVbb.addArc(a, c, e, k, f, f, 0, this.lineWeight, this.color, this.objectNumber, this.layer, this.currentVpId)
    };
    a.prototype.actOnArc = function (a, c, e, k, f, h, p) {
        this.numEllipses++;
        this.flushBuffer();
        this.currentVbb.addArc(a, c, e, k, f, h, p, this.lineWeight, this.color, this.objectNumber, this.layer, this.currentVpId)
    };
    a.prototype.actOnRaster = function () {
        if (this.manifestAvailable) {
            this.flushBuffer(4, !0);
            var a = this.parseObjState.raster, c = a.position, e = this.imageId2URI[a.imageId], k = this.sx(a.width),
                a = this.sy(a.height);
            this.currentVbb.addTexturedQuad(c[0] + .5 * k, c[1] - .5 * a, k, a, 0, 4278255615, this.objectNumber, this.layer, this.currentVpId);
            this.currentImage = {dataURI: e};
            this.flushBuffer(0, !0)
        }
    };
    a.prototype.actOnClip = function () {
        var a = this.parseObjState.clip;
        this.parseObjState.clip = {};
        this.clips.push(a)
    };
    a.prototype.actOnText = function () {
        this.strings[this.currentStringNumber] = this.parseObjState.text.string;
        this.stringDbIds[this.currentStringNumber] = this.objectNumber;
        this.currentStringNumber = -1;
        -1 > this.objectNumber && (this.objectNumber = 0)
    };
    a.prototype.addPolyTriangle = function (a, d, g, k, f, h, p) {
        function b(a, b) {
            if (a > b) {
                var c = a;
                a = b;
                b = c
            }
            if (r[a]) {
                var c = r[a], d = c.lastIndexOf(b);
                -1 == d ? c.push(b) : c[d] = -1
            } else r[a] = [b]
        }

        function l() {
            for (var b = 0, e = r.length; b < e; b++) {
                var g = r[b];
                if (g) for (var l = 0; l < g.length; l++) {
                    var m = g[l];
                    -1 != m && (v.flushBuffer(4), v.currentVbb.addSegment(a[2 * b], a[2 * b + 1], a[2 * m], a[2 * m + 1], 0, w, v.mapColor(d ? d[b] : k, !0), f, h, v.currentVpId), d && d[b] != d[m] && c.logger.warn("Gouraud triangle encountered. Will have incorrect antialiasing."))
                }
            }
        }

        function q(b, e) {
            if (b > e) {
                var g = b;
                b = e;
                e = g
            }
            (g = r[b]) && -1 != g.indexOf(e) && (v.flushBuffer(4), v.currentVbb.addSegment(a[2 * b], a[2 * b + 1], a[2 * e], a[2 * e + 1], 0, w, v.mapColor(d ? d[b] : k, !0), f, h, v.currentVpId), d && d[b] != d[e] && c.logger.warn("Gouraud triangle encountered. Will have incorrect antialiasing."))
        }

        var v = this, r = null, w = -1;
        this.objectStack[this.objectStack.length - 1] == e.st_text && (w = -.5);
        if (p) for (var r = Array(a.length / 2), u = 0, z = g.length; u < z; u += 3) {
            var x = g[u], A = g[u + 1], y = g[u + 2];
            b(x, A);
            b(A, y);
            b(y, x)
        }
        if (this.currentVbb.useInstancing) for (z = g.length, u = 0; u < z; u += 3) x = g[u], A = g[u + 1], y = g[u + 2], this.flushBuffer(4), this.currentVbb.addTriangleGeom(a[2 * x], a[2 * x + 1], a[2 * A], a[2 * A + 1], a[2 * y], a[2 * y + 1], this.mapColor(d ? d[x] : k, !0), f, h, this.currentVpId), p && (q(x, A), q(A, y), q(y, x)); else {
            z = a.length / 2;
            this.flushBuffer(z);
            x = this.currentVbb;
            A = x.vcount;
            for (u = 0; u < z; ++u) x.addVertexPolytriangle(a[2 * u], a[2 * u + 1], this.mapColor(d ? d[u] : k, !0), f, h, this.currentVpId);
            x.addIndices(g, A);
            p && l()
        }
    };
    a.prototype.actOnPolyTriangle = function () {
        var a = this.parseObjState.polyTriangle;
        this.parseObjState.polyTriangle = {};
        var d = a.points, e = a.indices, a = a.colors;
        d && e ? (this.numPolytriangles++, this.numTriangles += e.length / 3, this.addPolyTriangle(d, a, e, this.color, this.objectNumber, this.layer, !0)) : c.logger.warn("Malformed polytriangle.")
    };
    a.prototype.actOnViewport = function () {
        var a = this.parseObjState.viewport;
        this.parseObjState.viewport = {};
        this.viewports.push(a);
        this.currentVpId = this.viewports.length - 1
    };
    a.prototype.createLayerGroups = function (a) {
        function b(a) {
            var c = Object.keys(a.childrenByName).map(function (b) {
                return a.childrenByName[b]
            });
            delete a.childrenByName;
            if (c.length) {
                a.children = c;
                for (var d = a.childCount = 0; d < c.length; ++d) a.childCount += b(c[d]);
                c.sort(function (a, b) {
                    return a.isLayer && !b.isLayer ? -1 : !a.isLayer && b.isLayer ? 1 : a.name.localeCompare(b.name, void 0, {
                        sensitivity: "base",
                        numeric: !0
                    })
                })
            }
            return a.isLayer ? 1 : a.childCount
        }

        var c = this.layersRoot = {name: "root", id: "root", childrenByName: {}, isLayer: !1}, e = 0, f = 0, h;
        for (h in a) {
            var p = parseInt(h), m = a[h];
            (m = "string" === typeof m ? m : m.name) || (m = h);
            var n = m.split("|"), t = c;
            if (1 < n.length) for (var v = 0; v < n.length - 1; ++v) {
                var r = n[v], w = t.childrenByName[r];
                w || (w = {name: r, id: "group-" + e++, childrenByName: {}, isLayer: !1}, t.childrenByName[r] = w);
                t = w
            }
            t.childrenByName[m] = {name: m, index: p, id: f++, childrenByName: {}, isLayer: !0}
        }
        b(this.layersRoot)
    };
    h.F2D = a;
    h.F2dDataType = f;
    h.F2dSemanticType = e
})();
(function () {
    function a() {
        this.data = null;
        this.frameEnd = this.frameStart = 0;
        this.stream = null;
        this.opCount = 0;
        this.marker = {frameStart: this.frameStart, frameEnd: this.frameEnd}
    }

    var c = BimFish.LMVTK;
    a.prototype.load = function (a) {
        this.data = a;
        this.frameStart = 0;
        this.stream ? (this.stream.reset(this.data), this.stream.seek(0), this.frameEnd = 0) : (this.stream = new c.CheckedInputStream(this.data), this.stream.seek(8), this.frameEnd = this.frameStart = 8);
        this.probe();
        this.marker.frameStart = this.frameStart;
        this.marker.frameEnd = this.frameEnd;
        return this.marker
    };
    var h = c.F2dDataType, f = c.F2dSemanticType;
    a.prototype.readColor = function () {
        var a = this.stream;
        a.getVarints();
        a.getVarints();
        a.skipUint32()
    };
    a.prototype.parsePointPositions = function () {
        this.stream.getVarints();
        this.stream.getVarints()
    };
    a.prototype.unhandledTypeWarning = function (a, b) {
        avp.logger.warn("Unhandled semantic type when probing F2d : " + b + " in function " + a)
    };
    a.prototype.parseObject = function () {
        this.stream.getVarints()
    };
    a.prototype.parseString = function () {
        var a = this.stream;
        a.getVarints();
        var b = a.getVarints();
        a.skipBytes(b)
    };
    a.prototype.parsePoint = function () {
        this.stream.getVarints();
        this.parsePointPositions()
    };
    a.prototype.parseVarintArray = function () {
        var a = this.stream;
        a.getVarints();
        for (var b = a.getVarints(), c = 0; c < b; ++c) a.getVarints()
    };
    a.prototype.parseByteArray = function () {
        var a = this.stream;
        a.getVarints();
        var b = a.getVarints();
        a.skipBytes(b)
    };
    a.prototype.parseEndOfObject = function () {
        var a = this.stream;
        a.getVarints();
        a.getVarints()
    };
    a.prototype.parsePointsArray = function (a) {
        a = this.stream;
        a.getVarints();
        if (a = a.getVarints()) {
            a /= 2;
            for (var b = 0; b < a; ++b) this.parsePointPositions()
        }
    };
    a.prototype.parsePoint = function (a) {
        this.stream.getVarints();
        this.parsePointPositions()
    };
    a.prototype.parseInt = function () {
        var a = this.stream, b = a.getVarints();
        switch (b) {
            case f.st_color:
                a.skipUint32();
                break;
            case f.st_fill:
                a.skipUint32();
                break;
            default:
                a.skipUint32(), this.unhandledTypeWarning("parseInt", b)
        }
    };
    a.prototype.parseVoid = function () {
        var a = this.stream.getVarints();
        switch (a) {
            case f.st_fill_off:
                break;
            default:
                this.unhandledTypeWarning("parseVoid", a)
        }
    };
    a.prototype.parseVarint = function () {
        this.stream.getVarints();
        this.stream.getVarints()
    };
    a.prototype.parseIntArray = function () {
        var a = this.stream;
        a.getVarints();
        for (var b = a.getVarints(), c = 0; c < b; ++c) a.skipUint32()
    };
    a.prototype.parseFloat = function () {
        var a = this.stream;
        a.getVarints();
        a.getFloat32()
    };
    a.prototype.parseDoubleArray = function () {
        var a = this.stream;
        a.getVarints();
        for (var b = a.getVarints(), c = 0; c < b; ++c) a.skipFloat64()
    };
    a.prototype.parseCircularArc = function () {
        var a = this.stream;
        a.getVarints();
        this.parsePointPositions();
        a.getVarints();
        a.getFloat32();
        a.getFloat32()
    };
    a.prototype.parseCircle = function () {
        var a = this.stream;
        a.getVarints();
        this.parsePointPositions();
        a.getVarints()
    };
    a.prototype.parseArc = function () {
        var a = this.stream;
        a.getVarints();
        this.parsePointPositions();
        a.getVarints();
        a.getVarints();
        a.getFloat32();
        a.getFloat32();
        a.getFloat32()
    };
    a.prototype.parseDataType = function () {
        var a = this.stream.getVarints();
        switch (a) {
            case h.dt_void:
                this.parseVoid();
                break;
            case h.dt_int:
                this.parseInt();
                break;
            case h.dt_object:
                this.parseObject();
                break;
            case h.dt_varint:
                this.parseVarint();
                break;
            case h.dt_float:
                this.parseFloat();
                break;
            case h.dt_point_varint:
                this.parsePoint();
                break;
            case h.dt_point_varint_array:
                this.parsePointsArray();
                break;
            case h.dt_circular_arc:
                this.parseCircularArc();
                break;
            case h.dt_circle:
                this.parseCircle();
                break;
            case h.dt_arc:
                this.parseArc();
                break;
            case h.dt_varint_array:
                this.parseVarintArray();
                break;
            case h.dt_int_array:
                this.parseIntArray();
                break;
            case h.dt_byte_array:
                this.parseByteArray();
                break;
            case h.dt_string:
                this.parseString();
                break;
            case h.dt_double_array:
                this.parseDoubleArray();
                break;
            default:
                this.error = !0, avp.logger.error("Bad op code encountered : " + a + " , bail out.")
        }
        this.error || (this.frameEnd = this.stream.offset)
    };
    a.prototype.probe = function () {
        var a = this.stream;
        try {
            for (; a.offset < a.byteLength;) {
                this.parseDataType();
                if (this.error) break;
                this.opCount++
            }
        } catch (b) {
        }
    };
    c.F2DProbe = a
})();
(function () {
    function a(a) {
        this.buffer = a;
        this.offset = 0;
        this.byteLength = a.length;
        this.convBuf = new ArrayBuffer(8);
        this.convUint8 = new Uint8Array(this.convBuf);
        this.convUint16 = new Uint16Array(this.convBuf);
        this.convInt32 = new Int32Array(this.convBuf);
        this.convUint32 = new Uint32Array(this.convBuf)
    }

    function c(a) {
        this.offset = a;
        this.message = "try to access an offset that is out of bounds: " + this.offset;
        this.toString = function () {
            return this.message
        }
    }

    var h = BimFish.LMVTK;
    a.prototype.boundsCheck = function (a) {
        if (a >= this.byteLength) throw new c(a);
    };
    a.prototype.seek = function (a) {
        this.boundsCheck(a);
        this.offset = a
    };
    a.prototype.getBytes = function (a) {
        this.boundsCheck(this.offset + a);
        var c = new Uint8Array(this.buffer.buffer, this.offset, a);
        this.offset += a;
        return c
    };
    a.prototype.skipBytes = function (a) {
        this.boundsCheck(this.offset + a);
        this.offset += a
    };
    a.prototype.getVarints = function () {
        var a, c = 0, b = 0;
        do this.boundsCheck(this.offset), a = this.buffer[this.offset++], c |= (a & 127) << b, b += 7; while (a & 128);
        return c
    };
    a.prototype.getUint8 = function () {
        this.boundsCheck(this.offset + 1);
        return this.buffer[this.offset++]
    };
    a.prototype.getUint16 = function () {
        this.boundsCheck(this.offset + 2);
        this.convUint8[0] = this.buffer[this.offset++];
        this.convUint8[1] = this.buffer[this.offset++];
        return this.convUint16[0]
    };
    a.prototype.getInt16 = function () {
        var a = this.getUint16();
        32767 < a && (a |= 4294901760);
        return a
    };
    a.prototype.getInt32 = function () {
        this.boundsCheck(this.offset + 4);
        var a = this.buffer, c = this.convUint8, b = this.offset;
        c[0] = a[b];
        c[1] = a[b + 1];
        c[2] = a[b + 2];
        c[3] = a[b + 3];
        this.offset += 4;
        return this.convInt32[0]
    };
    a.prototype.getUint32 = function () {
        this.boundsCheck(this.offset + 4);
        var a = this.buffer, c = this.convUint8, b = this.offset;
        c[0] = a[b];
        c[1] = a[b + 1];
        c[2] = a[b + 2];
        c[3] = a[b + 3];
        this.offset += 4;
        return this.convUint32[0]
    };
    a.prototype.skipUint32 = function () {
        this.boundsCheck(this.offset + 4);
        this.offset += 4
    };
    a.prototype.getFloat32 = function () {
        this.boundsCheck(this.offset + 4);
        this.offset += 4;
        return 0
    };
    a.prototype.getFloat64 = function () {
        this.boundsCheck(this.offset + 8);
        this.offset += 8;
        return 0
    };
    a.prototype.skipFloat64 = function () {
        this.boundsCheck(this.offset + 8);
        this.offset += 8
    };
    a.prototype.reset = function (a) {
        this.buffer = a;
        this.offset = 0;
        this.byteLength = a.length
    };
    h.CheckedInputStream = a
})();
BimFish.LMVTK.GltfPackage = function () {
    function a(a) {
        this.loadedBuffers = {};
        if (a instanceof ArrayBuffer) {
            var b = new Int32Array(a, 0, 20);
            1179937895 !== b[0] && debug("glb header " + b[0]);
            var c = b[3], b = new Uint8Array(a, 20, c);
            a = a.slice(20 + c);
            this.loadedBuffers.KHR_binary_glTF = a;
            a = (new TextDecoder("utf-8")).decode(b);
            a = JSON.parse(a)
        }
        this.gltf = a;
        this.manifest = null;
        this.metadata = this.gltf.asset || {};
        this.metadata.gltf = this.metadata.version || 1;
        this.materials = this.gltfMaterials = {
            name: "GLTF Materials",
            version: "1.0",
            scene: {SceneUnit: "m"},
            materials: {}
        };
        this.materialToIndex = {};
        this.materialList = [];
        this.geomToIndex = {};
        this.geomList = [];
        this.geomsLoaded = 0;
        this.fragments = {
            length: 0,
            numLoaded: 0,
            boxes: null,
            transforms: null,
            materials: null,
            fragId2dbId: null,
            entityIndexes: null,
            mesh2frag: {}
        };
        this.geompacks = [];
        this.instances = [];
        this.cameras = [];
        this.lights = [];
        this.animations = null;
        this.pendingRequests = 0;
        this.globalOffset = {x: 0, y: 0, z: 0};
        this.bbox = new LmvBox3;
        this.nodeToDbId = {};
        this.nextDbId = 1;
        this.nextFragId = 0
    }

    for (var c = BimFish.LMVTK, h = new Uint8Array(256), f = 0; 64 > f; f++) h["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(f)] = f;
    a.prototype.loadManifest = function (a) {
        this.manifest = {
            name: "LMV Manifest",
            toolkitversion: "LMVTK 2.6.4",
            manifestversion: 2,
            adskID: {sourceSystem: "", type: "", id: "", version: ""},
            assets: [],
            typesets: []
        };
        a = this.gltf.buffers;
        for (var b in a) if ("binary_glTF" !== b) {
            var c = a[b];
            if (0 === c.uri.indexOf("data:application/octet-stream;base64,")) {
                var d = this.loadedBuffers, e = b, f = c.uri.slice(37), m = .75 * f.length, n = f.length, t = 0, v, r,
                    w, u;
                "\x3d" === f[f.length - 1] && (m--, "\x3d" === f[f.length - 2] && m--);
                for (var z = new ArrayBuffer(m), x = new Uint8Array(z), m = 0; m < n; m += 4) v = h[f.charCodeAt(m)], r = h[f.charCodeAt(m + 1)], w = h[f.charCodeAt(m + 2)], u = h[f.charCodeAt(m + 3)], x[t++] = v << 2 | r >> 4, x[t++] = (r & 15) << 4 | w >> 2, x[t++] = (w & 3) << 6 | u & 63;
                d[e] = z;
                c.uri = "embed://" + b
            } else c = {id: b, URI: c.uri, uri: c.uri, usize: c.byteLength, type: c.type}, this.manifest.assets.push(c)
        }
        b = this.gltf.images;
        for (var A in b) a = b[A], c = {
            id: A,
            URI: a.uri,
            uri: a.uri,
            name: a.name,
            type: "image"
        }, this.manifest.assets.push(c)
    };
    a.prototype.loadRemainingSvf = function (a) {
        a.manifest && (this.manifest = a.manifest);
        this.manifest.assetMap = {};
        for (var b = 0; b < this.manifest.assets.length; b++) {
            var c = this.manifest.assets[b];
            this.manifest.assetMap[c.id] = c
        }
        this.processMeshesList();
        this.processMaterialsList();
        this.deriveInstanceTree();
        a.loadDoneCB("svf");
        for (var d in this.loadedBuffers) this.loadGeometry(a, d);
        this.loadBuffers(a)
    };
    a.prototype.loadBuffers = function (a) {
        function b(e) {
            if (h < d.length - 1) {
                var g = d[h + 1];
                avp.ViewingService.getItem(a, a.basePath + g.URI, b, a.onFailureCallback, {responseType: g.type || "arraybuffer"})
            }
            e && (g = d[h], c.loadedBuffers[g.id] = e.buffer, c.loadGeometry(a, g.id));
            h++
        }

        for (var c = this, d = [], e = this.manifest.assets, f = 0; f < e.length; f++) "image" !== e[f].type && d.push(e[f]);
        var h = -1;
        b(null)
    };
    var e = {5120: 1, 5121: 1, 5122: 2, 5123: 2, 5126: 4}, b = {SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4};
    a.prototype.loadGeometry = function (a, g) {
        function d(a) {
            if (a = p.gltf.accessors[a].bufferView) if (a = p.gltf.bufferViews[a].buffer) return !!p.loadedBuffers[a];
            return !1
        }

        for (var f = this.gltf.buffers[g], h = f.meshes, p = this, m = 0; m < h.length; m++) for (var n = this.gltf.meshes[h[m]], t = n.primitives, v = 0; v < t.length; v++) {
            var r = t[v], n = {vblayout: {}, vbstride: 0, packedNormals: !0}, w = !0;
            if (r.indices && (w = w && d(r.indices))) {
                var u = p.gltf.accessors[r.indices];
                n.triangleCount = u.count / 3;
                var z = u.byteStride, x = 2, A = p.gltf.bufferViews[u.bufferView], y = u.byteOffset + A.byteOffset,
                    f = p.loadedBuffers[A.buffer], E, D;
                5123 === u.componentType ? (D = n.indices = new Uint16Array(u.count), x = 2, E = new Uint16Array(f)) : debug("Unimplemented component type for index buffer");
                A = y / x;
                z = 0 === z ? 1 : z / x;
                for (y = 0; y < u.count; y++) D[y] = E[A + y * z]
            }
            var x = 0, B;
            for (B in r.attributes) if (w = w && d(r.attributes[B]), u = p.gltf.accessors[r.attributes[B]], w) if ("NORMAL" === B) n.vbstride += 1, n.vblayout.normal = {
                offset: x,
                itemSize: 2,
                bytesPerItem: 2,
                normalize: !0
            }, x += 1; else {
                var F = B;
                "POSITION" === B ? (F = "position", n.vertexCount = u.count) : 0 === B.indexOf("TEXCOORD") ? (F = parseInt(B.split("_")[1]), F = "uv" + (F || "")) : 0 === B.indexOf("COLOR") && (F = "color");
                A = e[u.componentType] * b[u.type];
                n.vbstride += A / 4;
                n.vblayout[F] = {offset: x, itemSize: b[u.type], bytesPerItem: e[u.componentType], normalize: !1};
                x += A / 4
            }
            if (w) {
                w = n.vb = new Float32Array(n.vertexCount * n.vbstride);
                z = new Uint16Array(n.vb.buffer);
                for (B in r.attributes) {
                    u = p.gltf.accessors[r.attributes[B]];
                    A = p.gltf.bufferViews[u.bufferView];
                    y = u.byteOffset + A.byteOffset;
                    E = p.loadedBuffers[A.buffer];
                    if ("NORMAL" === B) {
                        var G = n.vblayout.normal;
                        u.count != n.vertexCount && debug("Normals count does not equal vertex count");
                        E = new Float32Array(E);
                        F = y / 4;
                        x = G.offset;
                        for (y = 0; y < n.vertexCount; y++, x += n.vbstride) {
                            var G = E[F], H = E[F + 1], I = E[F + 2];
                            z ? (I = .5 * (I + 1), z[2 * x] = 32767.5 * (Math.atan2(H, G) / Math.PI + 1) | 0, z[2 * x + 1] = 65535 * I | 0) : (w[x] = G, w[x + 1] = H, w[x + 2] = I);
                            F += u.byteStride / 4
                        }
                    } else for (F = B, "POSITION" === B ? (F = "position", n.vertexCount = u.count) : 0 === B.indexOf("TEXCOORD") ? (F = parseInt(B.split("_")[1]), F = "uv" + (F || "")) : 0 === B.indexOf("COLOR") && (F = "color"), G = n.vblayout[F], 4 !== e[u.componentType] && debug("Unimplemented size for vertex attribute."), E = new Float32Array(E), F = y / 4, x = G.offset, y = 0; y < n.vertexCount; y++, x += n.vbstride) {
                        for (H = 0; H < G.itemSize; H++) w[x + H] = E[F + H];
                        F += u.byteStride / 4
                    }
                    u = p.gltf.buffers[A.buffer];
                    u.refCount--;
                    0 === u.refCount && delete p.loadedBuffers[A.buffer]
                }
                p.geomsLoaded++;
                c.VBUtils.computeBounds3D(n);
                a.loadDoneCB("mesh", {mesh: n, packId: h[m], meshIndex: v, progress: p.geomsLoaded / p.geomList.length})
            }
        }
        f.meshes = null
    };
    a.prototype.processMaterialsList = function () {
        var a = this.gltf.materials, b;
        for (b in a) {
            var c = this.materialList.length;
            this.materialToIndex[b] = c;
            this.gltfMaterials.materials[c] = a[b];
            this.materialList.push(b)
        }
    };
    a.prototype.processMeshesList = function () {
        function a(a) {
            if (a = c.gltf.accessors[a].bufferView) if (a = c.gltf.bufferViews[a].buffer) a = c.gltf.buffers[a], a.refCount ? a.refCount++ : a.refCount = 1, a.meshes || (a.meshes = []), h || (a.meshes.push(e), h = !0)
        }

        var b = this.gltf.meshes, c = this, e;
        for (e in b) for (var f = b[e], h = !1, m = 0; m < f.primitives.length; m++) {
            var n = e + ":" + m;
            this.geomToIndex[n] = this.geomList.length;
            this.geomList.push(n);
            n = f.primitives[m];
            n.indices && a(n.indices);
            for (var t in n.attributes) a(n.attributes[t])
        }
    };
    a.prototype.countFragments = function () {
        function a(d) {
            var g = d.meshes;
            if (d.meshes) for (var f = 0; f < g.length; f++) for (var k = e.gltf.meshes[g[f]].primitives, h = 0; h < k.length; h++) c++;
            if (d = d.children || d.nodes) for (g = 0; g < d.length; g++) a(b[d[g]])
        }

        var b = this.gltf.nodes, c = 0, e = this;
        a(this.gltf.scenes[this.gltf.scene]);
        this.fragments.length = c;
        this.fragments.boxes = new Float32Array(6 * c);
        this.fragments.transforms = new Float32Array(12 * c);
        this.fragments.materials = new Int32Array(c);
        this.fragments.entityIndexes = new Int32Array(c);
        this.fragments.fragId2dbId = new Int32Array(c);
        this.fragments.packIds = new Int32Array(c)
    };
    a.prototype.deriveInstanceTree = function () {
        function a(b, c, d, g) {
            g > h && (h = g);
            d = d.clone();
            if (c.matrix) {
                var k = new LmvMatrix4(!0);
                k.fromArray(c.matrix);
                d.multiply(k)
            }
            var k = new LmvBox3, l = c.meshes;
            if (c.meshes) {
                b.fragIds = [];
                for (var q = 0; q < l.length; q++) for (var p = m.gltf.meshes[l[q]].primitives, v = 0; v < p.length; v++) {
                    var r = l[q] + ":" + v, u = m.nextFragId++;
                    b.fragIds.push(u);
                    n.fragId2dbId[u] = b.dbId;
                    n.entityIndexes[u] = m.geomToIndex[r];
                    n.mesh2frag[r] ? n.mesh2frag[r].push(u) : n.mesh2frag[r] = [u];
                    n.materials[u] = m.materialToIndex[p[v].material];
                    var r = 12 * u, w = d.elements, G = n.transforms;
                    G[r] = w[0];
                    G[r + 1] = w[1];
                    G[r + 2] = w[2];
                    G[r + 3] = w[4];
                    G[r + 4] = w[5];
                    G[r + 5] = w[6];
                    G[r + 6] = w[8];
                    G[r + 7] = w[9];
                    G[r + 8] = w[10];
                    G[r + 9] = w[12];
                    G[r + 10] = w[13];
                    G[r + 11] = w[14];
                    if (r = p[v].attributes.POSITION) r = m.gltf.accessors[r], r.min && r.max ? (t.min.x = r.min[0], t.min.y = r.min[1], t.min.z = r.min[2], t.max.x = r.max[0], t.max.y = r.max[1], t.max.z = r.max[2], t.applyMatrix4(d), r = 6 * u, u = n.boxes, u[r] = t.min.x, u[r + 1] = t.min.y, u[r + 2] = t.min.z, u[r + 3] = t.max.x, u[r + 4] = t.max.y, u[r + 5] = t.max.z, k.union(t)) : debug("unknown bbox for mesh", l[q])
                }
            }
            if (c = c.children || c.nodes) for (b.children = [], l = 0; l < c.length; l++) q = e[c[l]], p = {
                name: q.name || c[l],
                dbId: m.nextDbId++
            }, m.nodeToDbId[c[l]] = p.dbId, b.children.push(p), q = a(p, q, d, g + 1), k.union(q);
            b = 6 * b.dbId;
            u = f;
            u[b] = k.min.x;
            u[b + 1] = k.min.y;
            u[b + 2] = k.min.z;
            u[b + 3] = k.max.x;
            u[b + 4] = k.max.y;
            u[b + 5] = k.max.z;
            return k
        }

        this.countFragments();
        var b = this.gltf.scene, c = this.gltf.scenes[b], e = this.gltf.nodes;
        this.instanceTree = {name: b, dbId: this.nextDbId++, children: []};
        this.nodeToDbId[b] = this.instanceTree.dbId;
        var f = [], h = 1, m = this, n = this.fragments, t = new LmvBox3,
            b = a(this.instanceTree, c, new LmvMatrix4(!0), 1);
        m.bbox.union(b);
        this.instanceBoxes = new Float32Array(f.length);
        this.instanceBoxes.set(f);
        this.objectCount = this.nextDbId;
        this.maxTreeDepth = h
    };
    return a
}();
(function () {
    function a(a, b) {
        this.nodes = [];
        this.nextNode = 0;
        this.children = [];
        this.nextChild = 0;
        this.dbIdToIndex = {};
        this.names = [];
        this.s2i = {};
        this.strings = [];
        this.nameSuffixes = [];
        this.getIndex(0)
    }

    function c(a) {
        var b = new Int32Array(a.length);
        b.set(a);
        return b
    }

    function h(a, b, c) {
        this.nodes = a.nodes;
        this.children = a.children;
        this.dbIdToIndex = a.dbIdToIndex;
        this.names = a.names;
        this.nameSuffixes = a.nameSuffixes;
        this.strings = a.strings;
        this.rootId = b;
        this.numNodes = this.nodes.length / 5;
        this.visibleIds = null;
        this.nodeBoxes = c || new Float32Array(6 * this.numNodes)
    }

    var f = BimFish.Viewing.Private;
    a.prototype.getIndex = function (a) {
        var b = this.dbIdToIndex[a];
        if (b) return b;
        b = this.nextNode++;
        this.nodes.push(a);
        for (var c = 1; 5 > c; c++) this.nodes.push(0);
        return this.dbIdToIndex[a] = b
    };
    a.prototype.setNode = function (a, b, c, g, k, h) {
        a = this.getIndex(a);
        var d = 5 * a;
        this.nodes[d + 1] = b;
        this.nodes[d + 2] = this.nextChild;
        this.nodes[d + 3] = h ? -k.length : k.length;
        this.nodes[d + 4] = g;
        for (b = 0; b < k.length; b++) this.children[this.nextChild++] = h ? k[b] : this.getIndex(k[b]);
        this.nextChild > this.children.length && f.logger.error("Child index out of bounds -- should not happen");
        this.processName(a, c)
    };
    a.prototype.processName = function (a, b) {
        var c, e, f = e = -1;
        b && (f = b.lastIndexOf("]"), e = b.lastIndexOf("["), -1 === e || -1 === f) && (e = b.lastIndexOf(":"), f = b.length);
        0 <= e && f > e ? (c = b.slice(0, e + 1), f = b.slice(e + 1, f), e = parseInt(f, 10), e && e + "" === f || (c = b, e = 0)) : (c = b, e = 0);
        f = this.s2i[c];
        void 0 === f && (this.strings.push(c), f = this.strings.length - 1, this.s2i[c] = f);
        this.names[a] = f;
        this.nameSuffixes[a] = e
    };
    a.prototype.flatten = function (a, b, d, g, f, h) {
        this.nodes = c(this.nodes);
        this.children = c(this.children);
        this.names = c(this.names);
        this.nameSuffixes = c(this.nameSuffixes);
        this.s2i = null
    };
    h.prototype.getNumNodes = function (a) {
        return this.numNodes
    };
    h.prototype.getIndex = function (a) {
        return this.dbIdToIndex[a]
    };
    h.prototype.name = function (a) {
        var b = this.dbIdToIndex[a];
        a = this.strings[this.names[b]];
        return (b = this.nameSuffixes[b]) ? "[" === a.charAt(a.length - 1) ? a + b + "]" : a + b : a
    };
    h.prototype.getParentId = function (a) {
        return this.nodes[5 * this.dbIdToIndex[a] + 1]
    };
    h.prototype.getNodeFlags = function (a) {
        return this.nodes[5 * this.dbIdToIndex[a] + 4]
    };
    h.prototype.setNodeFlags = function (a, b) {
        this.nodes[5 * this.dbIdToIndex[a] + 4] = b
    };
    h.prototype.getNumChildren = function (a) {
        a = this.nodes[5 * this.dbIdToIndex[a] + 3];
        return 0 < a ? a : 0
    };
    h.prototype.getNumFragments = function (a) {
        a = this.nodes[5 * this.dbIdToIndex[a] + 3];
        return 0 > a ? -a : 0
    };
    h.prototype.getNodeBox = function (a, b) {
        for (var c = 6 * this.getIndex(a), e = 0; 6 > e; e++) b[e] = this.nodeBoxes[c + e]
    };
    h.prototype.getVisibleIds = function () {
        this.visibleIds || (this.visibleIds = Object.keys(this.dbIdToIndex).map(function (a) {
            return parseInt(a)
        }));
        return this.visibleIds
    };
    h.prototype.enumNodeChildren = function (a, b) {
        var c = this.dbIdToIndex[a], e = this.nodes[5 * c + 2], f = this.nodes[5 * c + 3];
        if (0 < f) for (var h = 0; h < f; h++) b(this.nodes[5 * this.children[e + h]], a, c)
    };
    h.prototype.enumNodeFragments = function (a, b) {
        var c = this.dbIdToIndex[a], e = this.nodes[5 * c + 2], f = this.nodes[5 * c + 3];
        if (0 > f) for (var f = -f, h = 0; h < f; h++) b(this.children[e + h], a, c)
    };
    f.InstanceTreeStorage = a;
    f.InstanceTreeAccess = h
})();
(function () {
    function a(a, b) {
        this.bytes_per_node = b ? 32 : 36;
        var c, e;
        a instanceof ArrayBuffer ? (c = a.byteLength / this.bytes_per_node, e = a, this.nodeCount = c) : (c = a | 0, e = new ArrayBuffer(this.bytes_per_node * c), this.nodeCount = 0);
        this.nodeCapacity = c;
        this.nodesRaw = e;
        this.is_lean_node = b;
        this.node_stride = this.bytes_per_node / 4;
        this.node_stride_short = this.bytes_per_node / 2;
        this.nodesF = new Float32Array(this.nodesRaw);
        this.nodesI = new Int32Array(this.nodesRaw);
        this.nodesS = new Uint16Array(this.nodesRaw)
    }

    function c(a, b) {
        this.boxes = a.boxes;
        this.polygonCounts = a.polygonCounts;
        this.materials = a.materials;
        this.materialDefs = b;
        this.prim_count = a.length;
        this.frags_per_inner_node = this.frags_per_leaf_node = -1;
        this.nodes = null;
        this.work_buf = new ArrayBuffer(4 * this.prim_count);
        this.sort_prims = new Int32Array(this.work_buf);
        this.primitives = new Int32Array(this.prim_count);
        this.centroids = new Float32Array(3 * this.prim_count);
        this.boxv_o = new Float32Array(6);
        this.boxc_o = new Float32Array(6);
        this.boxv_t = new Float32Array(6);
        this.boxc_t = new Float32Array(6);
        this.recursion_stack = []
    }

    var h = BimFish.Viewing.Private;
    a.prototype.setLeftChild = function (a, b) {
        this.nodesI[a * this.node_stride + 6] = b
    };
    a.prototype.getLeftChild = function (a) {
        return this.nodesI[a * this.node_stride + 6]
    };
    a.prototype.setPrimStart = function (a, b) {
        this.is_lean_node ? this.nodesI[a * this.node_stride + 6] = b : this.nodesI[a * this.node_stride + 8] = b
    };
    a.prototype.getPrimStart = function (a) {
        return this.is_lean_node ? this.nodesI[a * this.node_stride + 6] : this.nodesI[a * this.node_stride + 8]
    };
    a.prototype.setPrimCount = function (a, b) {
        this.nodesS[a * this.node_stride_short + 14] = b
    };
    a.prototype.getPrimCount = function (a) {
        return this.nodesS[a * this.node_stride_short + 14]
    };
    a.prototype.setFlags = function (a, b, c, g) {
        this.nodesS[a * this.node_stride_short + 15] = g << 3 | c << 2 | b & 3
    };
    a.prototype.getFlags = function (a) {
        return this.nodesS[a * this.node_stride_short + 15]
    };
    a.prototype.setBox0 = function (a, b) {
        var c = a * this.node_stride, e = this.nodesF;
        e[c] = b[0];
        e[c + 1] = b[1];
        e[c + 2] = b[2];
        e[c + 3] = b[3];
        e[c + 4] = b[4];
        e[c + 5] = b[5]
    };
    a.prototype.getBoxThree = function (a, b) {
        var c = a * this.node_stride, e = this.nodesF;
        b.min.x = e[c];
        b.min.y = e[c + 1];
        b.min.z = e[c + 2];
        b.max.x = e[c + 3];
        b.max.y = e[c + 4];
        b.max.z = e[c + 5]
    };
    a.prototype.setBoxThree = function (a, b) {
        var c = a * this.node_stride, e = this.nodesF;
        e[c] = b.min.x;
        e[c + 1] = b.min.y;
        e[c + 2] = b.min.z;
        e[c + 3] = b.max.x;
        e[c + 4] = b.max.y;
        e[c + 5] = b.max.z
    };
    a.prototype.makeEmpty = function (a) {
        a *= this.node_stride;
        var b = this.nodesI;
        b[a + 6] = -1;
        b[a + 7] = 0;
        this.is_lean_node || (b[a + 8] = -1)
    };
    a.prototype.realloc = function (a) {
        if (this.nodeCount + a > this.nodeCapacity) {
            var b = 0 | 3 * this.nodeCapacity / 2;
            b < this.nodeCount + a && (b = this.nodeCount + a);
            a = new ArrayBuffer(b * this.bytes_per_node);
            var c = new Int32Array(a);
            c.set(this.nodesI);
            this.nodeCapacity = b;
            this.nodesRaw = a;
            this.nodesF = new Float32Array(a);
            this.nodesI = c;
            this.nodesS = new Uint16Array(a)
        }
    };
    a.prototype.nextNodes = function (a) {
        this.realloc(a);
        var b = this.nodeCount;
        this.nodeCount += a;
        for (var c = 0; c < a; c++) this.makeEmpty(b + c);
        return b
    };
    a.prototype.getRawData = function () {
        return this.nodesRaw.slice(0, this.nodeCount * this.bytes_per_node)
    };
    var f = function () {
        function a(a, b, c) {
            a[0] > b[c] && (a[0] = b[c]);
            a[3] < b[c] && (a[3] = b[c]);
            a[1] > b[c + 1] && (a[1] = b[c + 1]);
            a[4] < b[c + 1] && (a[4] = b[c + 1]);
            a[2] > b[c + 2] && (a[2] = b[c + 2]);
            a[5] < b[c + 2] && (a[5] = b[c + 2])
        }

        function b(a, b, c) {
            a[0] > b[c] && (a[0] = b[c]);
            a[1] > b[c + 1] && (a[1] = b[c + 1]);
            a[2] > b[c + 2] && (a[2] = b[c + 2]);
            a[3] < b[c + 3] && (a[3] = b[c + 3]);
            a[4] < b[c + 4] && (a[4] = b[c + 4]);
            a[5] < b[c + 5] && (a[5] = b[c + 5])
        }

        function c(a, b) {
            a[0] > b[0] && (a[0] = b[0]);
            a[1] > b[1] && (a[1] = b[1]);
            a[2] > b[2] && (a[2] = b[2]);
            a[3] < b[3] && (a[3] = b[3]);
            a[4] < b[4] && (a[4] = b[4]);
            a[5] < b[5] && (a[5] = b[5])
        }

        function g(a, b, c, d) {
            for (var e = 0; 3 > e; e++) a[b + e] = c[d + 3 + e] - c[d + e]
        }

        function f(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            a[3] = b[3];
            a[4] = b[4];
            a[5] = b[5]
        }

        function h(a) {
            a[0] = Infinity;
            a[1] = Infinity;
            a[2] = Infinity;
            a[3] = -Infinity;
            a[4] = -Infinity;
            a[5] = -Infinity
        }

        function q(a) {
            var b = a[3] - a[0], c = a[4] - a[1];
            a = a[5] - a[2];
            return 0 > b || 0 > c || 0 > a ? 0 : 2 * (b * c + c * a + a * b)
        }

        function p() {
            this.vb_left = new Float32Array(6);
            this.vb_right = new Float32Array(6);
            this.cb_left = new Float32Array(6);
            this.cb_right = new Float32Array(6);
            this.num_left = 0;
            this.num_bins = this.best_cost = this.best_split = -1
        }

        function m() {
            this.box_bbox = new Float32Array(6);
            this.box_centroid = new Float32Array(6);
            this.num_prims = 0
        }

        function n() {
            this.BL = new Float32Array(6);
            this.CL = new Float32Array(6);
            this.AL = this.NL = 0
        }

        p.prototype.reset = function () {
            this.num_left = 0;
            this.num_bins = this.best_cost = this.best_split = -1
        };
        m.prototype.reset = function () {
            this.num_prims = 0;
            h(this.box_bbox);
            h(this.box_centroid)
        };
        n.prototype.reset = function () {
            this.AL = this.NL = 0;
            h(this.BL);
            h(this.CL)
        };
        var t = [], v;
        for (v = 0; 16 > v; v++) t.push(new m);
        var r = [];
        for (v = 0; 15 > v; v++) r.push(new n);
        var w = new Float32Array(6), u = new Float32Array(6), z = new Float32Array(3);
        return {
            bvh_subdivide: function (d, e, k, l, m, n, v, G) {
                g(z, 0, n, 0);
                var y = d.nodes, x = v ? d.frags_per_leaf_node_transparent : d.frags_per_leaf_node,
                    A = v ? d.frags_per_inner_node_transparent : d.frags_per_inner_node, C = d.max_polys_per_node,
                    B = 0;
                z[1] > z[0] && (B = 1);
                z[2] > z[B] && (B = 2);
                y.setBox0(e, m);
                var D = 0;
                m = 0;
                if (d.polygonCounts) for (var E = k; E <= l && !(D += d.polygonCounts[d.primitives[E]], m++, D > C); E++) ;
                E = l - k + 1;
                if (E <= x && D < C || 1 === E || 15 < G || z[B] < d.scene_epsilon) y.setLeftChild(e, -1), y.setPrimStart(e, k), y.setPrimCount(e, l - k + 1), y.setFlags(e, 0, 0, v ? 1 : 0); else {
                    if (A) {
                        A = k;
                        B = d.primitives;
                        x = d.centroids;
                        C = l - A + 1;
                        C > d.frags_per_inner_node && (C = d.frags_per_inner_node);
                        C > m && (C = m);
                        y.setPrimStart(e, A);
                        y.setPrimCount(e, C);
                        A += C;
                        h(n);
                        for (m = A; m <= l; m++) a(n, x, 3 * B[m]);
                        g(z, 0, n, 0);
                        B = 0;
                        z[1] > z[0] && (B = 1);
                        z[2] > z[B] && (B = 2);
                        k += y.getPrimCount(e)
                    }
                    m = new p;
                    var F = k, A = B;
                    if (z[A] < d.scene_epsilon) m.best_cost = Infinity; else {
                        x = 16;
                        x > l - F + 1 && (x = l - F + 1);
                        for (C = 0; C < x; C++) t[C].reset();
                        for (C = 0; C < x - 1; C++) r[C].reset();
                        var C = m.num_bins = x, D = d.centroids, E = d.primitives, O = d.boxes, Q = .99999 * C / z[A];
                        n = n[A];
                        for (var R = d.sort_prims; F <= l; F++) {
                            var P = E[F] | 0, K = Q * (D[3 * P + A] - n) | 0;
                            0 > K ? K = 0 : K >= C && (K = C - 1);
                            R[F] = K;
                            t[K].num_prims++;
                            b(t[K].box_bbox, O, 6 * P);
                            a(t[K].box_centroid, D, 3 * P)
                        }
                        f(r[0].BL, t[0].box_bbox);
                        f(r[0].CL, t[0].box_centroid);
                        r[0].AL = q(r[0].BL);
                        r[0].NL = t[0].num_prims;
                        for (C = 1; C < x - 1; C++) n = t[C], A = r[C], f(A.BL, r[C - 1].BL), c(A.BL, n.box_bbox), A.AL = q(A.BL), f(A.CL, r[C - 1].CL), c(A.CL, n.box_centroid), A.NL = r[C - 1].NL + n.num_prims;
                        C = x - 1;
                        f(w, t[C].box_bbox);
                        f(u, t[C].box_centroid);
                        E = q(w);
                        x = t[C].num_prims;
                        A = C;
                        D = E * x + r[C - 1].AL * r[C - 1].NL;
                        f(m.vb_right, w);
                        f(m.cb_right, t[C].box_centroid);
                        f(m.vb_left, r[C - 1].BL);
                        f(m.cb_left, r[C - 1].CL);
                        m.num_left = r[C - 1].NL;
                        for (--C; 1 <= C; C--) n = t[C], c(w, n.box_bbox), c(u, n.box_centroid), E = q(w), x += n.num_prims, n = E * x + r[C - 1].AL * r[C - 1].NL, n <= D && (D = n, A = C, f(m.vb_right, w), f(m.cb_right, u), f(m.vb_left, r[C - 1].BL), f(m.cb_left, r[C - 1].CL), m.num_left = r[C - 1].NL);
                        m.best_split = A;
                        m.best_cost = D
                    }
                    if (0 > m.num_bins) y.setPrimCount(e, y.getPrimCount(e) + l - k + 1); else {
                        n = d.primitives;
                        x = d.sort_prims;
                        A = 0;
                        C = k | 0;
                        E = m.best_split | 0;
                        for (D = k; D <= l; D++) O = n[D] | 0, x[D] < E ? n[C++] = O : x[A++] = O;
                        for (D = 0; D < A; D++) n[C + D] = x[D];
                        n = y.nextNodes(2);
                        y.setFlags(e, B, .5 * (m.vb_left[3 + B] + m.vb_left[B]) < .5 * (m.vb_right[3 + B] + m.vb_right[B]) ? 0 : 1, v ? 1 : 0);
                        y.setLeftChild(e, n);
                        d.recursion_stack.push([d, n + 1, k + m.num_left, l, m.vb_right, m.cb_right, v, G + 1]);
                        d.recursion_stack.push([d, n, k, k + m.num_left - 1, m.vb_left, m.cb_left, v, G + 1])
                    }
                }
            }, compute_boxes: function (c) {
                var d = c.boxv_o, e = c.boxc_o, f = c.boxv_t, k = c.boxc_t;
                h(d);
                h(e);
                h(f);
                h(k);
                for (var l = c.centroids, m = c.boxes, n = 0, p = c.prim_count; n < p; n++) {
                    var q = l, t = 3 * n, r = m, v = 6 * n;
                    q[t] = .5 * (r[v] + r[v + 3]);
                    q[t + 1] = .5 * (r[v + 1] + r[v + 4]);
                    q[t + 2] = .5 * (r[v + 2] + r[v + 5]);
                    n >= c.first_transparent ? (a(k, l, 3 * n), b(f, m, 6 * n)) : (a(e, l, 3 * n), b(d, m, 6 * n))
                }
                g(z, 0, c.boxv_o, 0);
                c.scene_epsilon = 1E-5 * Math.max(z[0], z[1], z[2])
            }, box_area: function (a, b) {
                var c = a[b + 3] - a[b], d = a[b + 4] - a[b + 1], e = a[b + 5] - a[b + 2];
                return 0 > c || 0 > d || 0 > e ? 0 : 2 * (c * d + d * e + e * c)
            }
        }
    }();
    c.prototype.sortPrimitives = function () {
        var a = new Float32Array(this.work_buf), b = this.materialDefs, c = this.materials, g = this.primitives, k = 0,
            h, q;
        h = 0;
        for (q = this.prim_count; h < q; h++) {
            g[h] = h;
            var p = b && b[c[h]] ? b[c[h]].transparent : !1;
            p && k++;
            m ? (a[h] = f.box_area(this.boxes, 6 * h), p && (a[h] = -a[h])) : a[h] = p ? -1 : 1
        }
        var m;
        if (k && k < this.prim_count) {
            b = new Int32Array(k);
            h = p = c = 0;
            for (q = this.prim_count; h < q; h++) 0 <= a[h] ? g[c++] = g[h] : b[p++] = g[h];
            g.set(b, this.prim_count - k)
        }
        this.first_transparent = this.prim_count - k
    };
    c.prototype.build = function (c) {
        function b(a, b) {
            c.hasOwnProperty(a) ? e[a] = c[a] : e[a] = b
        }

        var d = c && !!c.useSlimNodes, e = this;
        if (d) b("frags_per_leaf_node", 1), b("frags_per_inner_node", 0), b("frags_per_leaf_node_transparent", 1), b("frags_per_inner_node_transparent", 0), b("max_polys_per_node", Infinity); else {
            var k = c.isWeakDevice ? .5 : 1;
            b("frags_per_leaf_node", 0 | 32 * k);
            b("frags_per_inner_node", 0 | this.frags_per_leaf_node);
            b("frags_per_leaf_node_transparent", this.frags_per_leaf_node);
            b("frags_per_inner_node_transparent", 0);
            b("max_polys_per_node", 0 | 1E4 * k)
        }
        if (this.nodes && this.nodes.is_lean_node == d) this.nodes.nodeCount = 0; else {
            d = this.prim_count / this.frags_per_leaf_node;
            for (k = 1; k < d;) k *= 2;
            this.nodes = new a(k, c ? c.useSlimNodes : !1)
        }
        this.sortPrimitives();
        f.compute_boxes(this);
        d = this.nodes.nextNodes(2);
        for (f.bvh_subdivide(this, d, 0, this.first_transparent - 1, this.boxv_o, this.boxc_o, !1, 0); this.recursion_stack.length;) k = this.recursion_stack.pop(), f.bvh_subdivide(k[0], k[1], k[2], k[3], k[4], k[5], k[6], k[7]);
        for (f.bvh_subdivide(this, d + 1, this.first_transparent, this.prim_count - 1, this.boxv_t, this.boxc_t, !0, 0); this.recursion_stack.length;) k = this.recursion_stack.pop(), f.bvh_subdivide(k[0], k[1], k[2], k[3], k[4], k[5], k[6], k[7])
    };
    h.NodeArray = a;
    h.BVHBuilder = c
})();
(function () {
    function a(a) {
        var b = [];
        a = Array.isArray(a.image) ? a.image : [a.image];
        for (var c = 0; c < a.length; c++) for (var d = a[c], e = 0; e < d.mipmaps.length; e++) b.push(d.mipmaps[e].data.buffer);
        return b
    }

    var c = BimFish.Viewing.Private, h = BimFish.LMVTK;
    c.DefaultLightPreset = 1;
    c.DefaultLightPreset2d = 0;
    c.BackgroundPresets = {
        "Fusion Grey": [230, 230, 230, 150, 150, 150],
        "Sky Blue": [226, 244, 255, 156, 172, 180],
        Snow: [181, 186, 199, 181, 186, 199],
        Midnight: [41, 76, 120, 1, 2, 3],
        White: [255, 255, 255, 255, 255, 255],
        AutoCADModel: [30, 40, 48, 30, 40, 48],
        "Dark Grey": [51, 51, 51, 51, 51, 51],
        "Dark Sky": [51, 51, 51, 51, 51, 51],
        "Infinity Pool": [255, 255, 255, 255, 255, 255],
        Tranquility: [0, 84, 166, 0, 84, 166],
        "Grey Room": [129, 129, 129, 129, 129, 129],
        "Photo Booth": [237, 237, 237, 237, 237, 237],
        "RaaS SBS": [1, 1, 1, 90, 90, 90],
        Plaza: [79, 102, 130, 79, 102, 130],
        Custom: [230, 230, 230, 150, 150, 150]
    };
    var f = c.BackgroundPresets;
    c.LightPresets = [{
        name: "Simple Grey",
        path: null,
        tonemap: 0,
        E_bias: 0,
        directLightColor: [1, .84, .67],
        ambientColor: [.8, .9, 1],
        lightMultiplier: 1,
        bgColorGradient: f["Fusion Grey"],
        darkerFade: !1,
        rotation: 0
    }, {
        name: "Sharp Highlights",
        path: "SharpHighlights",
        type: "logluv",
        tonemap: 1,
        E_bias: -9,
        directLightColor: [.5, .5, .5],
        ambientColor: [.03125, .03125, .03125],
        lightMultiplier: 0,
        bgColorGradient: f["Photo Booth"],
        darkerFade: !0,
        rotation: 0
    }, {
        name: "Dark Sky",
        path: "DarkSky",
        type: "logluv",
        tonemap: 1,
        E_bias: -1,
        directLightColor: [1, 1, 1],
        ambientColor: [.03125, .03125, .03125],
        lightMultiplier: 1,
        lightDirection: [.1, -.55, -1],
        bgColorGradient: f["Dark Sky"],
        darkerFade: !1,
        rotation: 0
    }, {
        name: "Grey Room",
        path: "GreyRoom",
        type: "logluv",
        tonemap: 1,
        E_bias: -1,
        directLightColor: [1, 1, 1],
        ambientColor: [.03125, .03125, .03125],
        lightMultiplier: .5,
        lightDirection: [.1, -.55, -1],
        bgColorGradient: f["Grey Room"],
        darkerFade: !0,
        rotation: 0
    }, {
        name: "Photo Booth",
        path: "PhotoBooth",
        type: "logluv",
        tonemap: 1,
        E_bias: 0,
        directLightColor: [1, 1, 1],
        ambientColor: [.03125, .03125, .03125],
        lightMultiplier: .5,
        lightDirection: [.1, -.55, -1],
        bgColorGradient: f["Photo Booth"],
        darkerFade: !0,
        rotation: 0
    }, {
        name: "Tranquility",
        path: "TranquilityBlue",
        type: "logluv",
        tonemap: 1,
        E_bias: -1,
        directLightColor: [1, 1, 1],
        ambientColor: [.03125, .03125, .03125],
        lightMultiplier: .5,
        lightDirection: [.1, -.55, -1],
        bgColorGradient: f.Tranquility,
        darkerFade: !1,
        rotation: 0
    }, {
        name: "Infinity Pool",
        path: "InfinityPool",
        type: "logluv",
        tonemap: 1,
        E_bias: -1,
        directLightColor: [1, .84, .67],
        ambientColor: [.03125, .03125, .03125],
        lightMultiplier: .5,
        lightDirection: [.1, -.55, -1],
        bgColorGradient: f["Infinity Pool"],
        darkerFade: !1,
        rotation: 0
    }, {
        name: "Simple White",
        path: null,
        tonemap: 0,
        E_bias: 0,
        directLightColor: [1, 1, 1],
        ambientColor: [.9, .9, .9],
        lightMultiplier: 1,
        bgColorGradient: f.White,
        saoRadius: .06,
        saoIntensity: .15,
        darkerFade: !0,
        rotation: 0
    }, {
        name: "Riverbank",
        path: "riverbank",
        type: "logluv",
        tonemap: 1,
        E_bias: -5.7,
        directLightColor: [1, 1, 1],
        lightMultiplier: 0,
        bgColorGradient: f["Sky Blue"],
        darkerFade: !1,
        rotation: 0
    }, {
        name: "Contrast",
        path: "IDViz",
        type: "logluv",
        tonemap: 1,
        E_bias: 0,
        directLightColor: [1, 1, 1],
        lightMultiplier: 0,
        bgColorGradient: f.Midnight,
        darkerFade: !1,
        rotation: 0
    }, {
        name: "Rim Highlights",
        path: "RimHighlights",
        type: "logluv",
        tonemap: 1,
        E_bias: -9,
        directLightColor: [.5, .5, .5],
        ambientColor: [.03125, .03125, .03125],
        lightMultiplier: 0,
        bgColorGradient: f["Photo Booth"],
        darkerFade: !0,
        rotation: 0
    }, {
        name: "Cool Light",
        path: "CoolLight",
        type: "logluv",
        tonemap: 1,
        E_bias: -9,
        directLightColor: [1, 1, 1],
        ambientColor: [.03125, .03125, .03125],
        lightMultiplier: 0,
        bgColorGradient: f["Fusion Grey"],
        darkerFade: !0,
        rotation: 0
    }, {
        name: "Warm Light",
        path: "WarmLight",
        type: "logluv",
        tonemap: 1,
        E_bias: -9,
        directLightColor: [1, 1, 1],
        ambientColor: [.03125, .03125, .03125],
        lightMultiplier: 0,
        bgColorGradient: f["Fusion Grey"],
        darkerFade: !0,
        rotation: 0
    }, {
        name: "Soft Light",
        path: "SoftLight",
        type: "logluv",
        tonemap: 1,
        E_bias: -9,
        directLightColor: [1, 1, 1],
        ambientColor: [.03125, .03125, .03125],
        lightMultiplier: 0,
        bgColorGradient: f["Fusion Grey"],
        darkerFade: !0,
        rotation: 0
    }, {
        name: "Grid Light",
        path: "GridLight",
        type: "logluv",
        tonemap: 1,
        E_bias: -9,
        directLightColor: [1, 1, 1],
        ambientColor: [.03125, .03125, .03125],
        lightMultiplier: 0,
        bgColorGradient: f["Fusion Grey"],
        darkerFade: !0,
        rotation: 0
    }, {
        name: "Plaza",
        path: "Plaza",
        type: "logluv",
        tonemap: 1,
        E_bias: -14,
        directLightColor: [.9, .9, 1],
        ambientColor: [.03125, .03125, .03125],
        lightMultiplier: 0,
        bgColorGradient: f.Plaza,
        darkerFade: !1,
        rotation: 0
    }, {
        name: "Snow Field",
        path: "SnowField",
        type: "logluv",
        tonemap: 1,
        E_bias: -10.461343,
        directLightColor: [1, 1, 1],
        ambientColor: [.03125, .03125, .03125],
        lightMultiplier: 0,
        bgColorGradient: f.Snow,
        darkerFade: !1,
        rotation: 0
    }];
    c.DebugEnvironments = [{
        name: "Field",
        path: "field",
        type: "logluv",
        tonemap: 1,
        E_bias: -2.9,
        directLightColor: [1, 1, 1],
        lightMultiplier: 0,
        bgColorGradient: f["Sky Blue"],
        darkerFade: !1,
        rotation: 0
    }, {
        name: "Crossroads",
        path: "crossroads",
        type: "logluv",
        tonemap: 1,
        E_bias: -5.5,
        directLightColor: [1, 1, 1],
        lightMultiplier: 0,
        bgColorGradient: f["Sky Blue"],
        darkerFade: !1,
        rotation: 0
    }, {
        name: "Seaport",
        path: "seaport",
        type: "logluv",
        tonemap: 1,
        E_bias: -6.5,
        directLightColor: [1, 1, 1],
        lightMultiplier: 0,
        bgColorGradient: f["Sky Blue"],
        darkerFade: !1,
        rotation: 0
    }, {
        name: "Glacier",
        path: "glacier",
        type: "logluv",
        tonemap: 1,
        E_bias: 0,
        directLightColor: [1, 1, 1],
        lightMultiplier: 0,
        bgColorGradient: f.Midnight,
        darkerFade: !1,
        rotation: 0
    }, {
        name: "Boardwalk",
        path: "boardwalk",
        type: "logluv",
        tonemap: 1,
        E_bias: -7,
        directLightColor: [1, 1, 1],
        lightMultiplier: 0,
        bgColorGradient: f["Sky Blue"],
        darkerFade: !1,
        rotation: 0
    }, {
        name: "RaaS Test Env",
        path: "Reflection",
        type: "logluv",
        tonemap: 2,
        E_bias: -1.5,
        directLightColor: [1, 1, 1],
        lightMultiplier: 0,
        bgColorGradient: f["RaaS SBS"],
        darkerFade: !1,
        rotation: 0
    }];
    c.ENABLE_DEBUG && (c.LightPresets = c.LightPresets.concat(c.DebugEnvironments));
    c.CreateCubeMapFromColors = function (a, b) {
        for (var c = 255 * a.x, d = 255 * a.y, e = 255 * a.z, f = 255 * b.x, g = 255 * b.y, k = 255 * b.z, h = new Uint8Array(16), l = new Uint8Array(16), u = new Uint8Array(16), z = 0; 4 > z; z++) h[4 * z] = c, h[4 * z + 1] = d, h[4 * z + 2] = e, h[4 * z + 3] = 255, l[4 * z] = f, l[4 * z + 1] = g, l[4 * z + 2] = k, l[4 * z + 3] = 255, 1 < z ? (u[4 * z] = c, u[4 * z + 1] = d, u[4 * z + 2] = e) : (u[4 * z] = f, u[4 * z + 1] = g, u[4 * z + 2] = k), u[4 * z + 3] = 255;
        c = new THREE.DataTexture(u, 2, 2, THREE.RGBAFormat);
        d = new THREE.DataTexture(u, 2, 2, THREE.RGBAFormat);
        l = new THREE.DataTexture(l, 2, 2, THREE.RGBAFormat);
        h = new THREE.DataTexture(h, 2, 2, THREE.RGBAFormat);
        e = new THREE.DataTexture(u, 2, 2, THREE.RGBAFormat);
        u = new THREE.DataTexture(u, 2, 2, THREE.RGBAFormat);
        f = new THREE.Texture(null, THREE.CubeReflectionMapping, THREE.RepeatWrapping, THREE.RepeatWrapping, THREE.LinearFilter, THREE.LinearFilter, THREE.RGBAFormat);
        f.image = [d, c, h, l, u, e];
        f.needsUpdate = !0;
        return f
    };
    var e = [6.0014, -2.7008, -1.7996, -1.332, 3.1029, -5.7721, .3008, -1.0882, 5.6268], b = new Float32Array(4),
        d = new Float32Array(4);
    c.DecodeEnvMap = function (a, f, g, h) {
        if (a.LogLuv) {
            f = Math.pow(2, f);
            for (var k = Array.isArray(a.image) ? a.image : [a.image], l = 0; l < k.length; l++) for (var p = k[l], q = 0; q < p.mipmaps.length; q++) {
                var r = p.mipmaps[q], w = r.data, u;
                g ? (u = new Uint16Array(w.length / 4 * 3), r.data = u) : u = w.buffer;
                for (var z = r = 0; z < w.length; z += 4) {
                    b[0] = w[z] / 255;
                    b[1] = w[z + 1] / 255;
                    b[2] = w[z + 2] / 255;
                    b[3] = w[z + 3] / 255;
                    var x = d, A = Math.pow(2, (255 * b[2] + b[3] - 127) / 2), y = A / b[1], E = b[0] * y,
                        D = e[0] * E + e[3] * A + e[6] * y, B = e[1] * E + e[4] * A + e[7] * y,
                        A = e[2] * E + e[5] * A + e[8] * y;
                    0 > D && (D = 0);
                    0 > B && (B = 0);
                    0 > A && (A = 0);
                    x[0] = D;
                    x[1] = B;
                    x[2] = A;
                    g ? (x = b, D = Math.sqrt(d[0] * f), B = Math.sqrt(d[1] * f), A = Math.sqrt(d[2] * f), 65504 < D && (D = 65504), 65504 < B && (B = 65504), 65504 < A && (A = 65504), x[0] = D, x[1] = B, x[2] = A, u[r++] = c.FloatToHalf(b[0]), u[r++] = c.FloatToHalf(b[1]), u[r++] = c.FloatToHalf(b[2])) : (x = b, D = .0625 * Math.sqrt(d[0] * f), B = .0625 * Math.sqrt(d[1] * f), A = .0625 * Math.sqrt(d[2] * f), y = Math.max(Math.max(D, B), Math.max(A, 1E-6)), 1 < y && (y = 1), y = Math.ceil(255 * y) / 255, 1 < D && (D = 1), 1 < B && (B = 1), 1 < A && (A = 1), x[3] = y, y = 1 / y, x[0] = D * y, x[1] = B * y, x[2] = A * y, w[z] = Math.round(255 * b[0]), w[z + 1] = Math.round(255 * b[1]), w[z + 2] = Math.round(255 * b[2]), w[z + 3] = Math.round(255 * b[3]))
                }
            }
            a.LogLuv = !1;
            g ? (a.type = THREE.HalfFloatType, a.format = THREE.RGBFormat, a.RGBM = !1, a.GammaEncoded = !0) : a.RGBM = !0;
            h && h(a)
        } else c.logger.warn("Environment map expected to be in LogLuv format.")
    };
    c.imageWorker = null;
    var g = 1;
    c.DecodeEnvMapAsync = function (b, d, e, f) {
        if (b.LogLuv) {
            c.imageWorker || (c.imageWorker = c.createWorker());
            var k = g++, h = function (a) {
                a.data.id === k && (c.imageWorker.removeEventListener("message", h), b.image = a.data.map.image, b.LogLuv = !1, e ? (b.type = THREE.HalfFloatType, b.format = THREE.RGBFormat, b.RGBM = !1, b.GammaEncoded = !0) : b.RGBM = !0, f(b))
            };
            c.imageWorker.addEventListener("message", h);
            c.imageWorker.postMessage({operation: "DECODE_ENVMAP", map: b, exposure: d, useHalfFloat: e, id: k}, a(b))
        } else c.logger.warn("Environment map expected to be in LogLuv format.")
    };
    h.doDecodeEnvmap = function (b) {
        c.DecodeEnvMap(b.map, b.exposure, b.useHalfFloat);
        self.postMessage({map: b.map, id: b.id}, a(b.map))
    }
})();
(function () {
    function a(a) {
        var b = a.split("/");
        if (0 == b.length) return a;
        a = [];
        for (var c = 0; c < b.length; ++c) {
            var d = b[c];
            "." !== d && (".." === d && a.length ? a.pop() : a.push(d))
        }
        return 0 == a.length ? "" : a.join("/")
    }

    function c(a, b) {
        if (-1 !== b.indexOf("file://")) return !1;
        if (-1 !== b.indexOf("://") || a) return !0
    }

    function h(a, b, c, d) {
        function e(a) {
            if ("json" == d.responseType) try {
                return JSON.parse(a.toString("utf8"))
            } catch (v) {
                c(v)
            }
            return a
        }

        0 === a.indexOf("file://") && (a = a.substr(7));
        require("fs").readFile(a, function (f, g) {
            if (f) c(0, 0, {
                httpStatusText: f,
                url: a
            }); else if (31 == g[0] && 139 == g[1]) require("zlib").gunzip(g, null, function (f, g) {
                if (f) c(0, 0, {httpStatusText: f, url: a}); else {
                    g = e(g);
                    if (d.ondata) d.ondata(g);
                    b(g)
                }
            }); else {
                g = e(g);
                if (d.ondata) d.ondata(g);
                b(g)
            }
        })
    }

    function f(a, c) {
        c.hasOwnProperty("asynchronous") ? c.asynchronous || b.logger.warn("LMV: Sync XHR used. Performance warning.") : c.asynchronous = !0;
        c.hasOwnProperty("responseType") || (c.responseType = "arraybuffer");
        c.withCredentials = !!a.auth;
        c.headers = a.headers;
        c.queryParams = a.queryParams;
        c.oss_url = a.oss_url
    }

    var e = BimFish.Viewing, b = e.Private;
    b.inWorkerThread = "undefined" !== typeof self && "undefined" === typeof window;
    var d;
    "undefined" !== typeof XMLHttpRequest ? d = XMLHttpRequest : (d = require("xhr2"), d.prototype._restrictedHeaders.cookie = !1);
    var g = {}, k = !1;
    g.OSS_PREFIX = "urn:adsk.objects:os.object:";
    g.getDirectOSSUrl = function (b, c) {
        var d = c.indexOf(g.OSS_PREFIX);
        if (-1 !== d) {
            var e = c.substr(d + g.OSS_PREFIX.length), d = e.substr(0, e.indexOf("/")),
                e = e.substr(e.indexOf("/") + 1), e = a(e);
            return b.oss_url + "/buckets/" + d + "/objects/" + encodeURIComponent(decodeURIComponent(e))
        }
    };
    g.generateUrl = function (c, d, e) {
        e = a(e);
        if (0 !== e.indexOf("urn:")) return e;
        c += "/";
        "items" !== d && (e = e.substr(4));
        return c = "bubbles" === d && 0 == b.env.indexOf("BimFish") ? c + e : c + (d + "/" + e)
    };
    g.rawGet = function (a, f, p, m, n, t) {
        function l(a) {
            n(u.status, u.statusText, {url: p})
        }

        function q(a) {
            if (200 === u.status) if (u.response && u.response instanceof ArrayBuffer) {
                a = new Uint8Array(u.response);
                if (31 == a[0] && 139 == a[1]) {
                    k || (k = !0, b.logger.warn("An LMV resource (" + p + ") was not uncompressed by the browser. This hurts performance. Check the Content-Encoding header returned by the server and check whether you're getting double-compressed streams. The warning prints only once but it's likely the problem affects multiple resources."));
                    try {
                        a = (new Zlib.Gunzip(a)).decompress()
                    } catch (y) {
                        n(e.ErrorCodes.BAD_DATA, "Malformed data received when requesting file", {
                            url: p,
                            exception: y.toString(),
                            stack: y.stack
                        })
                    }
                }
                m(a)
            } else m(u.response || u.responseText); else l(a)
        }

        t = t ? t : {};
        if (e.isNodeJS && !c(a, p)) h(p, m, n, t); else {
            var w = g.getDirectOSSUrl(t, p);
            p = w ? w : g.generateUrl(a, f, p);
            t.queryParams && (p = p + "?" + t.queryParams);
            var u = new d;
            try {
                var z = t.hasOwnProperty("asynchronous") ? t.asynchronous : !0;
                u.open(t.noBody ? "HEAD" : "GET", p, z);
                t.hasOwnProperty("responseType") && (u.responseType = t.responseType);
                u.withCredentials = !1;
                t.hasOwnProperty("withCredentials") && (u.withCredentials = t.withCredentials);
                u.withCredentials = !1;
                if (t.headers) for (var x in t.headers) u.setRequestHeader(x, t.headers[x]), "authorization" === x.toLocaleLowerCase() && (u.withCredentials = !1);
                z && (u.onload = q, u.onerror = l, u.ontimeout = l, t.ondata && (u.overrideMimeType("text/plain; charset\x3dx-user-defined"), t._dlProgress = {
                    streamOffset: 0,
                    counter: 0
                }, u.onreadystatechange = function () {
                    if (2 < u.readyState) {
                        var a = u.responseText;
                        if (!(t._dlProgress.streamOffset >= a.length)) {
                            for (var b = t._dlProgress.streamOffset, c = a.length - b, d = new ArrayBuffer(c), d = new Uint8Array(d, 0), e = 0; e < c; e++, b++) d[e] = a.charCodeAt(b) & 255;
                            t._dlProgress.streamOffset = a.length;
                            t.ondata(d)
                        }
                    }
                }));
                debug("Normals count does not equal vertex count");
                u.send();
                t.skipAssetCallback || (b.inWorkerThread ? self.postMessage({assetRequest: [p, t.headers, null]}) : b.assets.push([p, t.headers, null]));
                z || q()
            } catch (A) {
                n(u.status, u.statusText, {url: p, exception: A})
            }
        }
    };
    g.defaultFailureCallback = function (a, b, c) {
        403 == a ? this.raiseError(e.ErrorCodes.NETWORK_ACCESS_DENIED, "Access denied to remote resource", {
            url: c.url,
            httpStatus: a,
            httpStatusText: b
        }) : 404 == a ? this.raiseError(e.ErrorCodes.NETWORK_FILE_NOT_FOUND, "Remote resource not found", {
            url: c.url,
            httpStatus: a,
            httpStatusText: b
        }) : 500 <= a && 600 > a ? this.raiseError(e.ErrorCodes.NETWORK_SERVER_ERROR, "Server error when accessing resource", {
            url: c.url,
            httpStatus: a,
            httpStatusText: b
        }) : c.exception ? this.raiseError(e.ErrorCodes.NETWORK_FAILURE, "Network failure", {
            url: c.url,
            exception: c.exception.toString(),
            stack: c.exception.stack
        }) : this.raiseError(e.ErrorCodes.NETWORK_UNHANDLED_RESPONSE_CODE, "Unhandled response code from server", {
            url: c.url,
            httpStatus: a,
            httpStatusText: b,
            data: c
        })
    };
    g.getItem = function (a, b, c, d, e) {
        e = e || {};
        f(a, e);
        g.rawGet(a.viewing_url, "items", b, c, d, e)
    };
    g.getManifest = function (a, b, c, d, e) {
        e = e || {};
        e.hasOwnProperty("responseType") || (e.responseType = "json");
        f(a, e);
        g.rawGet(a.viewing_url, "bubbles", b, c, d, e)
    };
    g.getThumbnail = function (a, b, c, d, e) {
        e = e || {};
        f(a, e);
        if (!e.queryParams) {
            var k = e.role || "rendered", h = e.size || 400;
            e.queryParams = "guid\x3d" + encodeURIComponent(e.guid) + "\x26role\x3d" + k + "\x26width\x3d" + h + "\x26height\x3d" + h
        }
        g.rawGet(a.viewing_url, "thumbnails", b, c, d, e)
    };
    g.getACMSession = function (a, b, c, d) {
        var f = {}, g, k;
        for (k in b) "oauth2AccessToken" === k ? g = b[k] : -1 !== k.indexOf("x-ads-acm") && (f[k] = b[k]), e.isMobileDevice() && (e.HTTP_REQUEST_HEADERS = f);
        f.application = "autodesk";
        var h = new XMLHttpRequest;
        h.open("POST", a, !0);
        h.setRequestHeader("Content-Type", "application/json");
        h.setRequestHeader("Authorization", "Bearer " + g);
        h.responseType = "json";
        h.onload = function () {
            if (200 === h.status && h.response) {
                var a = "string" === typeof h.response ? JSON.parse(h.response) : h.response;
                a && a.acmsession ? c(a.acmsession) : d(h.status, "Can't get acm session from response.")
            } else d(h.status)
        };
        h.onerror = d;
        h.ontimeout = d;
        h.send(JSON.stringify(f));
        delete f.application
    };
    b.ViewingService = g
})();
(function () {
    function a(a, b) {
        try {
            b()
        } catch (d) {
            a.raiseError(c.ErrorCodes.BAD_DATA, "Unhandled exception while reading pack file", {
                url: a.url,
                exception: d.toString(),
                stack: d.stack
            })
        }
    }

    var c = BimFish.Viewing, h = BimFish.LMVTK, f = c.Private;
    h.doGeomLoad = function (e) {
        var b = e.worker;
        f.ViewingService.getItem(e, e.url, function (d) {
            b.postMessage({url: e.url, workerId: e.workerId, progress: .5});
            a(e, function () {
                for (var a = new h.PackFileReader(d), f = !1, l = 0, q = 0, p = a.getEntryCounts(); q < p; q++) var m = h.readGeometry(a, q, null, null, 0, !0), l = l + (m && m.sharedBufferBytes || 0);
                for (var l = l ? new ArrayBuffer(l) : null, n = 0, t = {
                    packId: e.packId,
                    workerId: e.workerId,
                    progress: 1,
                    meshes: [],
                    sharedBuffer: l
                }, v = [l], q = 0, p = a.getEntryCounts(); q < p; q++) (m = h.readGeometry(a, q, null, l, n)) ? (n += m.sharedBufferBytes || 0, t.meshes[q] = m) : (f || (b.raiseError(c.ErrorCodes.BAD_DATA, "Unable to load geometry", {url: e.url}), f = !0), b.postMessage(t));
                b.postMessage(t, v)
            })
        }, e.onFailureCallback)
    }
})();
(function () {
    function a(a, c) {
        try {
            c()
        } catch (g) {
            a.worker.raiseError(h.ErrorCodes.BAD_DATA, "Unhandled exception while loading SVF", {
                url: a.url,
                exception: g.toString(),
                stack: g.stack
            }), a.worker.postMessage(null)
        }
    }

    function c(b) {
        var c = b.worker;
        a(b, function () {
            var a = b.svf;
            b.loadDoneCB = function (d, e) {
                if ("svf" == d) {
                    var f, g = a.fragments,
                        k = [g.transforms.buffer, g.packIds.buffer, g.entityIndexes.buffer, g.fragId2dbId.buffer];
                    a.bvh ? (f = {
                        nodes: a.bvh.nodes.getRawData(),
                        primitives: a.bvh.primitives,
                        useLeanNodes: 32 == a.bvh.nodes.bytes_per_node
                    }, k.push(f.nodes), k.push(f.primitives.buffer), k.push(g.boxes.buffer), k.push(g.polygonCounts.buffer), k.push(g.materials.buffer), f = {
                        svf: a,
                        bvh: f,
                        progress: 1
                    }) : f = {svf: a, progress: .8};
                    c.postMessage(f, k)
                } else "bvh" == d ? (f = {
                    nodes: a.bvh.nodes.getRawData(),
                    primitives: a.bvh.primitives,
                    useLeanNodes: 32 == a.bvh.nodes.bytes_per_node
                }, c.postMessage({
                    bvh: f,
                    basePath: a.basePath,
                    progress: 1
                }, [f.nodes, f.primitives.buffer])) : "mesh" == d ? (k = [], e.mesh && k.push(e.mesh.vb.buffer), c.postMessage(e, k)) : "done" == d ? c.postMessage({progress: 1}) : (c.raiseError(h.ErrorCodes.BAD_DATA, "Failure while loading SVF", {url: b.url}), c.postMessage(null))
            };
            a.loadRemainingSvf(b)
        })
    }

    var h = BimFish.Viewing, f = h.Private, e = BimFish.LMVTK;
    e.doLoadSvf = function (b) {
        var d = b.worker;
        d.postMessage({progress: .01});
        var g = "svf", k = b.url.toLocaleLowerCase();
        k.lastIndexOf(".gltf") === k.length - 5 && (g = "gltf");
        k.lastIndexOf(".glb") === k.length - 4 && (g = "glb");
        k = {responseType: "gltf" === g ? "json" : "arraybuffer"};
        f.ViewingService.getItem(b, b.url, function (f) {
            d.postMessage({progress: .5});
            a(b, function () {
                var a;
                a = "gltf" === g || "glb" === g ? new e.GltfPackage(f) : new e.Package(new Uint8Array(f));
                b.svf = a;
                a.loadManifest(b);
                b.interceptManifest ? d.postMessage({manifest: a.manifest}) : (b.manifest = a.manifest, c(b))
            })
        }, b.onFailureCallback, k);
        f.ViewingService.getItem(b, b.basePath + "0.pf", function () {
        }, function () {
        }, k)
    };
    e.doLoadSvfContinued = c
})();
(function () {
    function a(a, d, e) {
        function b() {
            var a = [];
            a.push({filename: "objects_attrs.json", storage: h.attrs});
            a.push({filename: "objects_vals.json", storage: h.values});
            a.push({filename: "objects_avs.json", storage: h.avs});
            a.push({filename: "objects_offs.json", storage: h.offsets});
            a.push({filename: "objects_ids.json", storage: h.ids});
            return a
        }

        function g(d) {
            n--;
            d || t++;
            n || (t ? m ? (a.worker.propdbFailed = !0, e(null)) : (m = !0, p = b(), n = p.length, t = 0, p.forEach(function (b) {
                c(b.filename, a, g, b.storage)
            })) : (a.worker.propdb = new f.PropertyDatabase(h), e(a.worker.propdb), a.worker.propdbFailed = !1, a.worker.propdbURL = a.url))
        }

        if (a.worker.propdb) e(a.worker.propdb); else if (a.worker.propdbFailed) e(null); else if (d = a.propertydb) {
            var h = {ids: {}, attrs: {}, offsets: {}, values: {}, avs: {}}, p = [];
            p.push({filename: d.attrs.length ? d.attrs[0] : "objects_attrs.json.gz", storage: h.attrs});
            p.push({filename: d.values.length ? d.values[0] : "objects_vals.json.gz", storage: h.values});
            p.push({filename: d.avs.length ? d.avs[0] : "objects_avs.json.gz", storage: h.avs});
            p.push({filename: d.offsets.length ? d.offsets[0] : "objects_offs.json.gz", storage: h.offsets});
            p.push({filename: d.ids.length ? d.ids[0] : "objects_ids.json.gz", storage: h.ids});
            for (d = 0; d < p.length; d++) p[d].filename = p[d].filename.replace(/\\/g, "/");
            var m = !1, n = p.length, t = 0;
            p.forEach(function (b) {
                c(b.filename, a, g, b.storage)
            })
        } else a.worker.propdbFailed = !0, e(null)
    }

    function c(a, c, f, h) {
        e.ViewingService.getItem(c, c.url + a, function (b) {
            h[a] = b;
            f(b)
        }, function (a, b, d) {
            if (404 !== a) c.onFailureCallback(a, b, d);
            f(null)
        })
    }

    function h(a, c, e) {
        function b(b, c, d) {
            c = a.getIndex(b);
            f(b, c);
            b = 6 * d;
            d = 6 * c;
            for (c = 0; 3 > c; c++) h[b + c] > h[d + c] && (h[b + c] = h[d + c]), h[b + c + 3] < h[d + c + 3] && (h[b + c + 3] = h[d + c + 3])
        }

        function d(a, b, c) {
            a *= 6;
            c *= 6;
            for (b = 0; 3 > b; b++) h[c + b] > e[a + b] && (h[c + b] = e[a + b]), h[c + b + 3] < e[a + b + 3] && (h[c + b + 3] = e[a + b + 3])
        }

        function f(c, e) {
            var f = 6 * e;
            h[f] = h[f + 1] = h[f + 2] = Infinity;
            h[f + 3] = h[f + 4] = h[f + 5] = -Infinity;
            a.getNumChildren(c) && a.enumNodeChildren(c, b, !0);
            a.getNumFragments(c) && a.enumNodeFragments(c, d)
        }

        var g = a.getIndex(c), h = a.nodeBoxes;
        f(c, g)
    }

    var f = BimFish.LMVTK, e = BimFish.Viewing.Private;
    f.doAttributeToIdMap = function (b) {
        var c = b.worker;
        a(b, null, function (a) {
            a && (a = a.getAttributeToIdMap(), c.postMessage({cbId: b.cbId, result: a}))
        })
    };
    f.doBuildExternalIdMapping = function (b) {
        var c = b.worker;
        a(b, null, function (a) {
            a && (a = a.getExternalIdMapping(), c.postMessage({cbId: b.cbId, result: a}))
        })
    };
    f.doPropertyGet = function (b) {
        var c = b.dbId, e = b.dbIds, f = b.propFilter;
        a(b, c, function (a) {
            if (a) if ("undefined" !== typeof e) {
                var d = [];
                if (e && e.length) for (var g = 0; g < e.length; g++) {
                    var h = a.getObjectProperties(e[g], f);
                    h && d.push(h)
                } else for (var g = 1, k = a.getObjectCount(); g <= k; g++) (h = a.getObjectProperties(g, f)) && d.push(h);
                b.worker.postMessage({cbId: b.cbId, result: d})
            } else h = a.getObjectProperties(c, f), b.worker.postMessage({cbId: b.cbId, result: h})
        })
    };
    f.doPropertySearch = function (b) {
        var c = b.worker;
        a(b, null, function (a) {
            a && (a = a.bruteForceSearch(b.searchText, b.attributeNames), c.postMessage({cbId: b.cbId, result: a}))
        })
    };
    f.doObjectTreeParse = function (b) {
        var c = b.worker;
        a(b, null, function (a) {
            if (a) {
                var d;
                if (b.fragToDbId) {
                    d = b.fragToDbId;
                    for (var f = {}, g = 0, p = d.length; g < p; g++) {
                        var m = d[g];
                        Array.isArray(m) || (m = [m]);
                        for (var n = 0; n < m.length; n++) {
                            var t = m[n], v = f[t];
                            void 0 === v ? f[t] = g : Array.isArray(v) ? v.push(g) : f[t] = [v, g]
                        }
                    }
                    d = f
                }
                b.worker.rootsDone || (b.worker.idroots = a.findRootNodes(), b.worker.objCount = a.getObjectCount(), b.worker.rootsDone = !0);
                var r, f = [0], g = [], w;
                if ((p = b.worker.idroots) && p.length) {
                    w = new e.InstanceTreeStorage(a.getObjectCount(), b.fragToDbId.length);
                    if (1 == p.length) r = p[0], a.buildObjectTreeFlat(r, 0, d, 0, f, w); else {
                        r = 0;
                        m = [];
                        for (n = 0; n < p.length; n++) a.buildObjectTreeFlat(p[n], 0, d, 0, f, w), m.push(p[n]);
                        w.setNode(0, 0, "", 0, m, !1)
                    }
                    w.flatten();
                    g.push(w.nodes.buffer);
                    g.push(w.children.buffer);
                    if (b.fragBoxes) {
                        var u = new e.InstanceTreeAccess(w, r);
                        h(u, r, b.fragBoxes);
                        g.push(u.nodeBoxes.buffer)
                    }
                }
                c.postMessage({
                    cbId: b.cbId,
                    result: {
                        rootId: r,
                        instanceTreeStorage: w,
                        instanceBoxes: u ? u.nodeBoxes : void 0,
                        maxTreeDepth: f[0],
                        objectCount: b.worker.objCount
                    }
                }, g)
            } else c.postMessage({cbId: b.cbId, error: {instanceTree: null, maxTreeDepth: 0}})
        })
    }
})();
(function () {
    BimFish.LMVTK.doDecompressDelta = function (a) {
        for (var c = a.worker, h = base64.decode(a.delta), h = h.split("").map(function (a) {
            return a.charCodeAt(0)
        }), h = (new Zlib.Inflate(h)).decompress(), f = "", e = 0; e < h.length; e++) f += String.fromCharCode(h[e]);
        f = JSON.parse(f);
        c.postMessage({cbId: a.cbId, index: a.index, res: f})
    }
})();
(function () {
    function a(a, e) {
        try {
            e()
        } catch (b) {
            a.raiseError(c.ErrorCodes.BAD_DATA, "", {exception: b.toString(), stack: b.stack}), a.postMessage(null)
        }
    }

    var c = BimFish.Viewing, h = BimFish.LMVTK;
    h.doParseF2D = function (f) {
        var e = f.worker;
        e.postMessage({progress: .01});
        if (f.data) {
            e.postMessage({progress: .5});
            var b = new h.F2D(f.metadata, f.manifest, f.basePath, f.f2dLoadOptions);
            f.loadDoneCB = function (a) {
                a ? e.postMessage({f2d: b}) : (e.raiseError(c.ErrorCodes.BAD_DATA, "", {}), e.postMessage(null))
            };
            a(e, function () {
                b.load(f, f.data)
            })
        } else e.postMessage(null)
    };
    h.doParseF2DFrame = function (f) {
        var e = f.worker, b = e.f2d;
        b || (e.postMessage({progress: .5}), b = e.f2d = new h.F2D(f.metadata, f.manifest, f.basePath, f.f2dLoadOptions), b.F2D_MESH_COUNT_OLD = 0, e.postMessage({f2dframe: b}));
        f.loadDoneCB = function (a, g) {
            if (a) {
                if (b.meshes.length || g) {
                    var d = {f2dframe: !0, meshes: b.meshes, baseIndex: b.F2D_MESH_COUNT_OLD, bbox: b.bbox};
                    f.finalFrame && (d.cumulativeProps = {
                        maxObjectNumber: b.maxObjectNumber,
                        viewports: b.viewports,
                        clips: b.clips,
                        strings: b.strings,
                        stringDbIds: b.stringDbIds
                    }, d.finalFrame = g);
                    for (var h = [], q = 0, p = b.meshes.length; q < p; ++q) h.push(b.meshes[q].vb.buffer), h.push(b.meshes[q].indices.buffer);
                    e.postMessage(d, h);
                    b.F2D_MESH_COUNT_OLD += b.meshes.length;
                    b.meshes = []
                }
            } else e.raiseError(c.ErrorCodes.BAD_DATA, "", {}), e.postMessage(null)
        };
        a(e, function () {
            b.loadFrames(f)
        })
    }
})();
(function () {
    function a(a, b, c) {
        f.ViewingService.getItem(a, a.basePath + b, c, null)
    }

    function c(a, c, h) {
        var d = a.worker, g = a.url;
        a.queryParams && (g += "?" + a.queryParams);
        var k = [], m;
        if (c && c.assets) for (var n = c.assets, t = 0; t < n.length; t++) if (-1 != g.indexOf(n[t].URI)) {
            m = n[t].usize || 0;
            break
        }
        var v = new e.F2DProbe, r = !0, w = new Uint8Array(65536), u = 0, z = 0, x = !1;
        f.ViewingService.getItem(a, g, function (e) {
            d.postMessage({type: "F2DAssetURL", urls: k});
            k = null;
            if (b) {
                var f = {type: "F2DSTREAM", finalFrame: !0, finished: !0, progress: 1};
                x || (f.manifest = c, f.metadata = h, f.basePath = a.basePath, x = !0);
                d.debug("Total text bytes count : " + e.length);
                d.postMessage(f)
            } else {
                w.length > u && (w = new Uint8Array(w.buffer.slice(0, u)));
                var g;
                if (31 == w[0] && 139 == w[1]) try {
                    g = new Uint8Array(w.buffer, 0, u), g = (new Zlib.Gunzip(g)).decompress()
                } catch (D) {
                }
                f = {type: "F2DBLOB", metadata: h, manifest: c, basePath: a.basePath, progress: 1, buffer: g.buffer};
                e = [];
                e.push(g.buffer);
                d.postMessage(f, e)
            }
        }, a.onFailureCallback, {
            ondata: function (e) {
                if (w.length < e.length + u) {
                    var g = new Uint8Array(Math.max(2 * w.length, e.length + u));
                    g.set(w);
                    w = g
                }
                w.set(e, u);
                u += e.length;
                if (b) {
                    if (r && (r = !1, 31 == w[0] && 139 == w[1])) {
                        f.logger.error("F2D streaming broken by non-streaming unzip!");
                        b = !1;
                        return
                    }
                    e = new Uint8Array(w.buffer, z, u - z);
                    try {
                        var k = v.load(e);
                        if (k.frameEnd > k.frameStart) {
                            var l = w.buffer.slice(z + k.frameStart, z + k.frameEnd);
                            z += k.frameEnd;
                            k = [];
                            k.push(l);
                            l = {type: "F2DSTREAM", frames: l, finalFrame: !1};
                            m && (l.progress = z / m);
                            x || (l.manifest = c, l.metadata = h, l.basePath = a.basePath, x = !0);
                            d.postMessage(l, k)
                        }
                    } catch (B) {
                        debug(B)
                    }
                }
            }, responseType: ""
        })
    }

    var h = BimFish.Viewing, f = h.Private, e = BimFish.LMVTK, b = !0;
    e.doStreamF2D = function (b) {
        b.worker.postMessage({progress: .01});
        var d, f, l = 0;
        a(b, "metadata.json.gz", function (a) {
            try {
                d = JSON.parse(e.utf8ArrayToString(a)), l++
            } catch (p) {
                self.raiseError(h.ErrorCodes.BAD_DATA, "")
            }
            2 === l && c(b, f, d)
        });
        a(b, "manifest.json.gz", function (a) {
            try {
                a && (f = JSON.parse(e.utf8ArrayToString(a))), l++
            } catch (p) {
            }
            2 === l && c(b, f, d)
        })
    }
})();
av = BimFish.Viewing;
av.ErrorCodes = {
    UNKNOWN_FAILURE: 1,
    BAD_DATA: 2,
    NETWORK_FAILURE: 3,
    NETWORK_ACCESS_DENIED: 4,
    NETWORK_FILE_NOT_FOUND: 5,
    NETWORK_SERVER_ERROR: 6,
    NETWORK_UNHANDLED_RESPONSE_CODE: 7,
    BROWSER_WEBGL_NOT_SUPPORTED: 8,
    BAD_DATA_NO_VIEWABLE_CONTENT: 9,
    BROWSER_WEBGL_DISABLED: 10,
    RTC_ERROR: 11
};
(function () {
    var a = BimFish.LMVTK, c = BimFish.Viewing.Private;
    c.logger = c.logger || console;
    c.workerMain = function (h) {
        if (h.hasOwnProperty("operation")) {
            h.basePath = "";
            if (h.url) {
                var f = h.url.lastIndexOf("/");
                -1 != f && (h.basePath = h.url.substr(0, f + 1))
            }
            h.raiseError = function () {
                h.worker.raiseError.apply(h.worker, arguments)
            };
            h.onFailureCallback = c.ViewingService.defaultFailureCallback.bind(h);
            switch (h.operation) {
                case "LOAD_GEOMETRY":
                    a.doGeomLoad(h);
                    break;
                case "LOAD_SVF":
                    a.doLoadSvf(h);
                    break;
                case "LOAD_SVF_CONTD":
                    a.doLoadSvfContinued(h);
                    break;
                case "GET_PROPERTIES":
                    a.doPropertyGet(h);
                    break;
                case "SEARCH_PROPERTIES":
                    a.doPropertySearch(h);
                    break;
                case "BUILD_EXTERNAL_ID_MAPPING":
                    a.doBuildExternalIdMapping(h);
                    break;
                case "GET_OBJECT_TREE":
                    a.doObjectTreeParse(h);
                    break;
                case "PARSE_F2D":
                    a.doParseF2D(h);
                    break;
                case "PARSE_F2D_FRAME":
                    a.doParseF2DFrame(h);
                    break;
                case "STREAM_F2D":
                    a.doStreamF2D(h);
                    break;
                case "DECOMPRESS_DELTA":
                    a.doDecompressDelta(h);
                    break;
                case "ATTRIBUTES_MAP":
                    a.doAttributeToIdMap(h);
                    break;
                case "POPULATE_CACHE":
                    a.doPopulateCache(h);
                    break;
                case "DECODE_ENVMAP":
                    a.doDecodeEnvmap(h)
            }
        }
    }
})();
var avp = BimFish.Viewing.Private, ENABLE_OCTM_MG2 = !1,
    IS_WORKER = "undefined" !== typeof self && "undefined" === typeof window;
if (IS_WORKER) {
    var debug$0 = function (a) {
    };
    avp.IS_CONCAT_BUILD || (importScripts("../BimFishNamespace.js"), importScripts("../compatibility.js"), importScripts("../../thirdparty/three.js/LmvMatrix4.js"), importScripts("../lmvtk/zlib/gunzip.min.js"), importScripts("../lmvtk/zlib/unzip.min.js"), importScripts("../lmvtk/zlib/inflate.min.js"), importScripts("../lmvtk/fusion/base64.js"), ENABLE_OCTM_MG2 && (importScripts("../lmvtk/zlib/inflate.min.js"), importScripts("../lmvtk/svf/octm_mg2.js")), importScripts("../scene/BVHBuilder.js"), importScripts("../scene/InstanceTreeStorage.js"), importScripts("../lmvtk/common/InputStream.js"), importScripts("../lmvtk/common/VbUtils.js"), importScripts("../lmvtk/common/VertexBufferBuilder.js"), importScripts("../lmvtk/svf/PackReader.js"), importScripts("../lmvtk/svf/Geoms.js"), importScripts("../lmvtk/svf/Lights.js"), importScripts("../lmvtk/svf/Cameras.js"), importScripts("../lmvtk/svf/Fragments.js"), importScripts("../lmvtk/svf/Instances.js"), importScripts("../lmvtk/svf/Package.js"), importScripts("../lmvtk/svf/PackReader.js"), importScripts("../lmvtk/common/Propdb.js"), importScripts("../lmvtk/f2d/F2d.js"), importScripts("../lmvtk/f2d/F2dProbe.js"), importScripts("../lmvtk/f2d/CheckedInputStream.js"), importScripts("../net/Xhr.js"), importScripts("GeomWorker.js"), importScripts("SvfWorker.js"), importScripts("PropWorker.js"), importScripts("DecompressWorker.js"), importScripts("F2dParseWorker.js"), importScripts("F2dStreamWorker.js"), importScripts("PopulateCacheWorker.js"), importScripts("../ErrorCodes.js"), importScripts("MainWorker.js"));
    self.addEventListener("message", function (a) {
        a = a.data;
        a.worker = self;
        avp.workerMain(a)
    }, !1);
    self.raiseError = function (a, c, h) {
        self.postMessage({error: {code: a, msg: c, args: h}})
    };
    self.debug = debug$0
}
BimFish.LMVTK.utf8ArrayToString = function (a, c, h) {
    void 0 === c && (c = 0);
    void 0 === h && (h = a.length);
    var f = "", e = c;
    for (c += h; e < c; e++) f += String.fromCharCode(a[e]);
    return decodeURIComponent(escape(f))
};