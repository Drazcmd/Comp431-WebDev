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
            //This should be an error! No reason to get here
            return articles
        }
    }
export const displayedArticles = (articles, visibilityMode, filterStr) => {
        return filterArticles(
			//Arr.sort is a litle demented in js - it directly mutates
			//This is why I call .concat - to get us a fresh copy 
            articles.concat(), visibilityMode, filterStr
        ).sort((articleA, articleB) => {
            //Although sorting is technically buisness logic, it's
            //somethign that NEEDS to be delegated to this component 
            return (-1 *
                (Date.parse(articleA.date) -
                Date.parse(articleB.date))
            )
        })
    }
