import * as cheerio from 'cheerio';
import got from 'got';
import { DropListItem, showDropList } from '@woolson/alfred-utils';
import { genPronounceConfig } from './helper';

(async function() {
  const keyword = process.argv[2];

  try {
    if (keyword) {
      const seachUrl = `https://dict.youdao.com/w/${keyword}/#keyfrom=dict2.top`;
      const result = await got(seachUrl);
      const $= cheerio.load(result.body);
      let translates = $('#phrsListTab .trans-container ul li');
      const list: DropListItem[] = [];

      /** 输入的是英文 */
      if (translates.length) {
        // 英文读音
        list.push({
          title: $('.baav span').text().clear().replace(']美', ']; 美'),
          arg: keyword,
          mods: genPronounceConfig(keyword),
        });

        for (let index = 0; index < translates.length; index++) {
          list.push({
            title: translates.eq(index).text().trim(),
            arg: translates.eq(index).text().trim(),
          });
        }
      /** 输入的是中文 */
      } else {
        translates = $('#phrsListTab .trans-container ul > p');

        if (translates.length) {
          // 中文读音
          list.push({
            title: '拼音: ' + $('.wordbook-js .phonetic').text(),
            arg: $('.wordbook-js .phonetic').text(),
          });

          for (let index = 0; index < translates.length; index++) {
            const element = translates.eq(index);
            const word = element.children('.contentTitle').text().clear();
            const type = element.children('span:first-child').text().clear();

            /** 多个单词在一行 */
            if (word.includes(';')) {
              const wordList = word.split(';');

              while (wordList.length) {
                const _word = wordList.shift();
                list.push({
                  title: _word,
                  subtitle: type,
                  arg: _word,
                  mods: genPronounceConfig(_word),
                });
              }
            } else {
              list.push({
                title: word,
                subtitle: type,
                arg: word,
                mods: genPronounceConfig(word),
              });
            }
          }
        } else {
          throw new Error(`关键词“${keyword}”没有查询到结果`);
        }
      }

      showDropList(list);
    } else {
      throw new Error('无效的关键词');
    }
  } catch(err) {
    showDropList([
      { title: err.message, valid: false },
    ]);
  }
})();