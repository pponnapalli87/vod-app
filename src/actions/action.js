export default function action(type, payload = {}, meta = {}) {
  return {
    type,
    payload,
    meta,
  }
}