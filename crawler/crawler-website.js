const request = require("request"); // 請求進入他人網站
const cheerio = require("cheerio"); // cheerio 算是 node.js 界的 jQuery，它是以 jQuery 為核心去設計的，好比要抓取一個 html，class 名稱為 title 的文字 <div class='title'>標題</div>，cheerio 的寫法是這樣：$('.title').text()

const movieCrawler = () => {
  request(
    {
      url: "https://movies.yahoo.com.tw/moviegenre_result.html?genre_id=1",
      method: "GET",
    },
    (error, res, body) => {
      if (error || !body) {
        console.error(error);
      } else {
        console.log("so far so good");
      }
      const data = [];
      const $ = cheerio.load(body); //載入body，以便讀取html標籤
      const list = $(".release_list .release_info"); // 用一個list先寫好欲抓取表格的共同class name
      // [特別記住]!!!! 一定要一層一層找，下面的find也是一樣!!!!!!!!!!
      console.log("check", list);
      for (let i = 0; i < list.length; i++) {
        const name = list
          .eq(i)
          .find(".release_info_text .release_movie_name a")
          .text();
        const time = list
          .eq(i)
          .find(".release_info_text .release_movie_time")
          .text();

        data.push({ name, time });
      }
      // console.log(data[1].name);
    }
  );
};
movieCrawler();
