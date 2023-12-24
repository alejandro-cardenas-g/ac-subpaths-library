export class ClassMapper {
  classMapper = new Map();

  insertClass(key, value) {
    return this.classMapper.set(key, value);
  }

  verifyClass(key) {
    return this.classMapper.has(key);
  }

  getClass(key) {
    return this.classMapper.get(key);
  }

  getVerifyClass(key) {
    if (!this.verifyClass(key)) return null;
    return this.getClass(key);
  }
}

export default new ClassMapper();
