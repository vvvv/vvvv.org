import { createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, defineComponent } from 'vue'
const _hoisted_1 = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 20 20'
}
export default defineComponent({
  name: 'LogoPixelfed',
  render: function render(_ctx, _cache) {
    return (
      _openBlock(),
      _createElementBlock(
        'svg',
        _hoisted_1,
        _cache[0] ||
          (_cache[0] = [
            _createElementVNode(
              'path',
              {
                d: 'M 10,20 C 4.4772,20 0,15.5228 0,10 0,4.4772 4.4772,0 10,0 15.5228,0 20,4.4772 20,10 20,15.5228 15.5228,20 10,20 Z M 9.206,12.1832 h 1.8344 c 1.728,0 3.1292,-1.364 3.1292,-3.046 0,-1.6824 -1.4008,-3.0464 -3.1292,-3.0464 H 8.3928 c -0.9968,0 -1.8052,0.7868 -1.8052,1.7576 v 6.84 z',
                fill: 'currentColor'
              },

              null,
              -1 /* HOISTED */
            )
          ])
      )
    )
  }
})
