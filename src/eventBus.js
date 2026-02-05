import mitt from 'mitt'

const emitter = mitt()

export const eventBus = {
  $on: (event, handler) => emitter.on(event, handler),
  $off: (event, handler) => emitter.off(event, handler),
  $emit: (event, ...args) => emitter.emit(event, ...args),
  $once: (event, handler) => {
    const wrapper = (...args) => {
      emitter.off(event, wrapper)
      handler(...args)
    }
    emitter.on(event, wrapper)
  },
}
