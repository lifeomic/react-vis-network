export default class RafDebouncer {
  rafTimeout = null;

  requestAnimationFrame(callback) {
    if (this.rafTimeout) {
      cancelAnimationFrame(this.rafTimeout);
    }

    this.rafTimeout = requestAnimationFrame(callback);
  }
}
