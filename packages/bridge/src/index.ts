/** 桥接模块，用于获取和解析学校数据 */
export class Bridge {
  private fetcher: Fetcher

  /**
   * 创建实例，传入 fetcher
   * @param fetcher {@link Fetcher}
   */
  constructor(fetcher: Fetcher) {
    this.fetcher = fetcher
  }

  login() {
    // ...
  }
}
