import axios from "axios";

const mainURL = 'https://pixabay.com/api/';
const KEY = '33898180-7ca939e4b7cc192141a59a218';

const OPTIONS =`image_type=photo&orientation=horizontal&safesearch=true`;

export default class ImgApiServise {
    constructor() {
        this.page = 1;
        this.searchQuery = "";
        this.loadedEments = 0;
        this.perPage = 40;
    }

  async getGallery() {

        const url =`${mainURL}?key=${KEY}&q=${this.searchQuery}&${OPTIONS}&per_page=${this.perPage}&page=${this.page}`;
        const response = await axios.get(url);  
        this.nextP();
        console.log(this.page);
        return response.data
    
    }
       
        nextP() {
          this.page +=1;
          console.log(this.page);
        }
        resetP() {
          this.page = 1;
          console.log(this.page);
       }
       addloadEments(hits) {
        this.loadedEments += hits.length;
        console.log( this.loadedEments);
      }
      setNewperPage(newperPage){
        this.perPage = newperPage;
      }

    get query() {
        return this.searchQuery;
      }
    
      set query(newSearch) {
        this.searchQuery = newSearch;
      }
      
  };