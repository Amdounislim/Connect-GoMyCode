function sortInfo(array) {
  return array
    .sort((el, next) => next.from.slice(0, 4) - el.from.slice(0, 4))
    .sort(el => (!el.current ? 1 : -1));
}

export default sortInfo;
