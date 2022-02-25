// vnode.js
export default function (sel, data, children, text, elm) {
  return {
    sel: sel,
    data: data,
    children: children,
    text: text,
    elm: elm
  }
}