import RafDebouncer from './RafDebouncer';

describe('RafDebouncer', () => {
  let debouncer;

  beforeEach(() => {
    let called = false;
    debouncer = new RafDebouncer();

    global.requestAnimationFrame = callback => {
      if (!called) {
        called = true;
        callback();
      }

      return 'some-id';
    };

    global.cancelAnimationFrame = jest.fn();
  });

  test('calls a fn at most once per animation frame', () => {
    const cb = jest.fn();

    const calledALot = () => debouncer.requestAnimationFrame(cb);

    calledALot();
    calledALot();
    calledALot();

    expect(cb).toHaveBeenCalledTimes(1);
    expect(global.cancelAnimationFrame).toHaveBeenCalled();
  });
});
