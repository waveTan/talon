/**
 * @disc: 字符串中间显示...
 * @params:
 * @date: 2021-05-18 16:33
 * @author: Wave
 */
export const superLong = (str: string, len: number) => {
  if (str && str.length > 10) {
    return (
      str.substr(0, len) +
      "...." +
      str.substr(str.length - len, str.length)
    );
  } else {
    return str;
  }
};
