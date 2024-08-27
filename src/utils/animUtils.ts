export const Easing = {
    Linear: function (t: number) { return t; },
    InQuad: function (t: number) { return t * t; },
    OutQuad: function (t: number) { return t * (2 - t); },
    InOutQuad: function (t: number) {
        if ((t *= 2) < 1) {
            return 0.5 * t * t;
        }
        return -0.5 * (--t * (t - 2) - 1);
    },
    InCubic: function (t: number) { return t * t * t; },
    OutCubic: function (t: number) { return --t * t * t + 1; },
    InOutCubic: function (t: number) {
        if ((t *= 2) < 1) {
            return .5 * t * t * t;
        }
        return .5 * ((t -= 2) * t * t + 2);
    },
    InQuart: function (t: number) { return t * t * t * t; },
    OutQuart: function (t: number) { return 1 - (--t * t * t * t); },
    InOutQuart: function (t: number) {
        if ((t *= 2) < 1) {
            return .5 * t * t * t * t;
        }
        return .5 * ((t -= 2) * t * t * t - 2);
    },
    InQuint: function (t: number) { return t * t * t * t * t; },
    OutQuint: function (t: number) { return --t * t * t * t * t + 1; },
    InOutQuint: function (t: number) {
        if ((t *= 2) < 1)
            return 0.5 * t * t * t * t * t;
        return 0.5 * ((t -= 2) * t * t * t * t + 2);
    },
    InSine: function (t: number) { return 1 - Math.cos(t * Math.PI / 2); },
    OutSine: function (t: number) { return Math.sin(t * Math.PI / 2); },
    InOutSine: function (t: number) { return 0.5 * (1 - Math.cos(Math.PI * t)); },
    InBounce: function (t: number) { return 1 - Easing.OutBounce(1 - t); },
    OutBounce: function (t: number) {
        if (t < 0.36363636363636365) {
            return 7.5625 * t * t;
        } else if (t < 0.7272727272727273) {
            t = t - 0.5454545454545454;
            return 7.5625 * t * t + 0.75;
        } else if (t < 0.9090909090909091) {
            t = t - 0.8181818181818182;
            return 7.5625 * t * t + 0.9375;
        } else {
            t = t - 0.9545454545454546;
            return 7.5625 * t * t + 0.984375;
        }
    },
    InOutBounce: function (t: number) {
        if (t < 0.5) {
            return Easing.InBounce(t * 2) * 0.5;
        }
        return Easing.OutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
    },
    InElastic: function (t: number, amplitude: number = 1, period: number = 0.3) {
        if (t === 0 || t === 1) { return t; }
        return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - amplitude == 1 ? period / 4 : period / (Math.PI * 2.0) * Math.asin(1 / amplitude)) * (Math.PI * 2) / period));
    },
    OutElastic: function (t: number, amplitude: number = 1, period: number = 0.3) {
        if (t === 0 || t === 1) { return t; }
        return amplitude * Math.pow(2, -10 * t) * Math.sin((t - amplitude == 1 ? period / 4 : period / (Math.PI * 2.0) * Math.asin(1 / amplitude)) * (Math.PI * 2) / period) + 1;
    },
    InOutElastic: function (t: number, amplitude: number = 1, period: number = 0.44999999999999996) {
        t = (t / 2) - 1;
        if (t === 0 || t === 1) { return t; }
        return (amplitude * Math.pow(2, 10 * t) * Math.sin((t - amplitude == 1 ? period / 4 : period / (Math.PI * 2.0) * Math.asin(1 / amplitude)) * (Math.PI * 2) / period)) / -2;
    },
    InExpo: function (t: number) {
        return Math.pow(2, 10 * (t - 1));
    },
    OutExpo: function (t: number) {
        return -Math.pow(2, -10 * t) + 1;
    },
    InOutExpo: function (t: number) {
        if (t == 0) return 0;
        if (t == 1) return 1;
        if ((t /= .5) < 1) return .5 * Math.pow(2, 10 * (t - 1));
        return .5 * (-Math.pow(2, -10 * --t) + 2);
    },
    InCirc: function (t: number) {
        return -1 * (Math.sqrt(1 - t * t) - 1);
    },
    OutCirc: function (t: number) {
        t = t - 1;
        return Math.sqrt(1 - t * t);
    },
    InOutCirc: function (t: number) {
        if ((t /= .5) < 1) return -.5 * (Math.sqrt(1 - t * t) - 1);
        return .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },
    InBack: function (t: number, overshoot: number = 1.70158) {
        return 1 * t * t * ((overshoot + 1) * t - overshoot);
    },
    OutBack: function (t: number, overshoot: number = 1.70158) {
        t = t - 1;
        return t * t * ((overshoot + 1) * t + overshoot) + 1;
    },
    InOutBack: function (t: number, overshoot: number = 1.70158) {
        if ((t /= .5) < 1) return .5 * (t * t * (((overshoot *= (1.525)) + 1) * t - overshoot));
        return .5 * ((t -= 2) * t * (((overshoot *= (1.525)) + 1) * t + overshoot) + 2);
    },

    Zero: function (_?: number) { return 0; },
    One: function (_?: number) { return 1; },

    Out: function (t: number, p: number = 2) {
        return 1 - Math.pow(1 - t, p)
    },
    In: function (t: number, p: number = 2) {
        return Math.pow(t, p)
    },
    InOut: function (t: number, p: number = 2) {
        if (t < 0.5) {
            return 0.5 * Math.pow(2 * t, p)
        } else {
            return 1 - 0.5 * Math.pow(2 * (1 - t), p)
        }
    }
};

export const EasingLerp = (a: number, b: number, t: number, easing: (t: number, ..._: any[]) => number, ...args: any[]) => {
    return a + (b - a) * easing(t, ...args);
}

export const EasingLerpAB = (a: number, b: number, now: number, easing: (t: number, ..._: any[]) => number, ...args: any[]) => {
    return a + (b - a) * easing((b - a) / (now - a), ...args);
}