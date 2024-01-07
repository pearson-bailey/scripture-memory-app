export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1900,
};

const MOBILE_BREAKPOINT_INCLUSIVE: keyof typeof BREAKPOINTS = "md";

function getBp() {
  const width = window.innerWidth;
  const SIZES = Object.keys(BREAKPOINTS) as (keyof typeof BREAKPOINTS)[];

  return SIZES.reduceRight((bp: keyof typeof BREAKPOINTS | boolean, size) => {
    if (typeof bp === "string") {
      return bp;
    }
    return width >= BREAKPOINTS[size] ? size : false;
  }, false as keyof typeof BREAKPOINTS | false);
}

const SIZES = Object.keys(BREAKPOINTS) as (keyof typeof BREAKPOINTS)[];

const touch = !window.matchMedia("(pointer: fine)").matches;

const createViewport = (breakpoint = getBp()) => {
  const idx = typeof breakpoint === "string" ? SIZES.indexOf(breakpoint) : -1;
  const eq = (size: keyof typeof BREAKPOINTS) => size === breakpoint;
  const neq = (size: keyof typeof BREAKPOINTS) => size !== breakpoint;
  const lt = (size: keyof typeof BREAKPOINTS) => idx < SIZES.indexOf(size);
  const gt = (size: keyof typeof BREAKPOINTS) => idx > SIZES.indexOf(size);
  const lte = (size: keyof typeof BREAKPOINTS) => idx <= SIZES.indexOf(size);
  const gte = (size: keyof typeof BREAKPOINTS) => idx >= SIZES.indexOf(size);

  return {
    name: breakpoint,
    is: {
      eq,
      neq,
      lt,
      gt,
      lte,
      gte,
      mobile: lte(MOBILE_BREAKPOINT_INCLUSIVE),
      touch,
    },
  };
};

function handleResize() {
  const nextBreakpoint = getBp();

  if (nextBreakpoint !== Viewport.viewport.name) {
    Viewport._viewport = createViewport(nextBreakpoint);

    for (const fn of Viewport._bpListeners) fn(Viewport.viewport);
  }

  for (const fn of Viewport._resizeListeners) fn(window);
}

const Viewport = {
  _count: 0,
  _bpListeners: [] as ((viewport: ReturnType<typeof createViewport>) => void)[],
  _resizeListeners: [] as ((window: Window) => void)[],
  _viewport: createViewport(),

  get viewport() {
    return this._viewport;
  },

  get listenerCount() {
    return this._count;
  },

  onChange(cb: (viewport: ReturnType<typeof createViewport>) => void) {
    if (!cb) return;
    this._bpListeners.push(cb);
    this._count += 1;
    if (this._count === 1) this.setup();
  },

  offChange(cb: (viewport: ReturnType<typeof createViewport>) => void) {
    if (!cb) return;
    const i = this._bpListeners.indexOf(cb);

    if (i !== -1) {
      this._bpListeners.splice(i, 1);
      this._count -= 1;
    }
    if (!this._count) this.tearDown();
  },

  onResize(cb: (window: Window) => void) {
    if (!cb) return;
    this._resizeListeners.push(cb);
    this._count += 1;
    if (this._count === 1) this.setup();
  },

  offResize(cb: (window: Window) => void) {
    if (!cb) return;
    const i = this._resizeListeners.indexOf(cb);

    if (i !== -1) {
      this._resizeListeners.splice(i, 1);
      this._count -= 1;
    }
    if (!this._count) this.tearDown();
  },

  setup() {
    handleResize();
    window.addEventListener("resize", handleResize);
  },

  tearDown() {
    window.removeEventListener("resize", handleResize);
  },
};

export default Viewport;
