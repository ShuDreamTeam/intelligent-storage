import en from './languages/en.js';
import zh from './languages/zh';

const messages = {
  en: {
    message: 'hello',
    ...en // 或者用 Object.assign({ message: 'hello' }, enLocale)
  },
  zh: {
    message: '你好',
    ...zh // 或者用 Object.assign({ message: '你好' }, zhLocale)
  }
}
export default messages