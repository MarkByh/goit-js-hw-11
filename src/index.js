
import ImgApiServise from './loadImg';

import SimpleLightbox from "simplelightbox";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import renderGaleryItem from './renderGalery';

const serchform = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector(".load-more")

const ImgLoad = new ImgApiServise();

loadBtn.addEventListener('click', onBtnClick)
serchform.addEventListener('submit', onSearch)

loadBtn.classList.add("visually-hidden");


function onSearch(event){

    loadBtn.classList.add("visually-hidden");
    // galleryShow.refresh();
    event.preventDefault();
    gallery.innerHTML = '';
    ImgLoad.resetP();
    ImgLoad.query = event.currentTarget.searchQuery.value.trim();;
    
    if(ImgLoad.searchQuery === ''){
        return Notify.info(`Please, enter what you want to search`);
      }
      ImgLoad.getGallery().then(({ hits, totalHits })=>{
        if(!hits.length) {
            return Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        }
        loadBtn.classList.remove('visually-hidden');
        renderGaleryItem(hits);
        Notify.info(`Hooray! We found ${totalHits} images.`);
            if (hits.length === totalHits) {
                loadBtn.classList.add("visually-hidden");
                Notify.info(`We're sorry, but you've reached the end of search results.`);   
                }
                loadBtn.disabled = false;
                loadBtn.textContent = "Load more";
                loadBtn.classList.remove('visually-hidden'); 
                serchform.reset();
      })

}

function onBtnClick(event) {
    loadBtn.classList.remove('visually-hidden');
    loadBtn.disabled = true;
    loadBtn.textContent = "Load more";
    loadBtn.classList.remove('visually-hidden');
    ImgLoad.getGallery().then(({ hits, totalHits }) => {
        ImgLoad.addloadEments(hits);
        loadBtn.disabled = false;
        let lastToload = totalHits - ImgLoad.loadedEments;
          if (lastToload === 0) {
            loadBtn.classList.add("visually-hidden");
                Notify.info(`We're sorry, but you've reached the end of search results.`);
          }
         if (lastToload<40) {
            ImgLoad.setNewperPage(lastToload);

       }
          renderGaleryItem(hits);
        //   galleryImg.refresh();
        });
      
}

