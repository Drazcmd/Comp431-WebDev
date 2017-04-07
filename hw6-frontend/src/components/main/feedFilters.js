import { VisModes } from './../../actions'
const filterArticles = (articles, visibilityMode, filterStr) => {
    if (visibilityMode === VisModes.FIL_AUTH) {
        return articles.filter(article => {
            return article.author.includes(filterStr)
        })
    } else if (visibilityMode === VisModes.FIL_TEXT){
        return articles.filter(article => {
            return article.text.includes(filterStr)
        })
    } else if (visibilityMode === VisModes.NO_FILTER) {
        return articles
    } else {
        //shouldn't ever happen since visibilityMode shoudl always be defined,
        //buuuut just in case good to do this defensively
        return articles
    }
}
export const displayedArticles = (articles, visibilityMode, filterStr) => {
    return filterArticles(
		//Arr.sort is a litle demented in js - it directly mutates
		//This is why I call .concat - to get us a fresh copy 
        articles.concat(), visibilityMode, filterStr
    ).sort((articleA, articleB) => {

        //(as you see, sorting is done on the fly - so depending on how the
        //server handles article edits, stuff might move. And that is ok!
        return (-1 *
            (Date.parse(articleA.date) -
            Date.parse(articleB.date))
        )
    })
}
