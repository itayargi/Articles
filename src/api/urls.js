import { Alert } from 'react-native';
import {TOKEN, DOMAIN} from '@env';


export default {
    getArticlesByCategory:(categoryName)=> DOMAIN + `news?access_key=${TOKEN}&categories=${categoryName}&languages=en&offset=0`
}