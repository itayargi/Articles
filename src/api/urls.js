const domain = 'http://api.mediastack.com/v1/';
const token = "56e937a2313d08f7dca20e4cb4c89eb9"

export default {
    getAllArticles: domain + `news?access_key=${token}`,
    getArticlesByCategory:(categoryName)=> domain + `news?access_key=${token}&categories=${categoryName}&languages=en`
}