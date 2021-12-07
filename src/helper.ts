
declare global {
  interface String {
    /** 清除换行与空格 */
    clear: () => string
  }
}

String.prototype.clear = function() {
  return this.replace(/(\n | \s)/g, '');
};

/** 生成发音配置 */
export function genPronounceConfig(word: string) {
  word = encodeURIComponent(word);
  return {
    cmd: {
      arg: `https://dict.youdao.com/dictvoice?audio=${word}&type=2`,
      subtitle: '美式发音',
    },
    alt: {
      arg: `https://dict.youdao.com/dictvoice?audio=${word}&type=1`,
      subtitle: '英式发音',
    },
  };
}