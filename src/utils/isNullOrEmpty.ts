function isNullOrEmpty(str: string | null) {
  return !str || str.trim() === "";
}

export default isNullOrEmpty;
