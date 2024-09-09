'use strict';

// document.addEventListener('DOMContentLoaded', () => {
//     const movieDB = {
//         movies: [
//             "Логан",
//             "Лига справедливости",
//             "Ла-ла лэнд",
//             "Одержимость",
//             "Скотт Пилигрим против..."
//         ]
//     };

     
//     const adv = document.querySelectorAll('.promo__adv img'),
//           poster = document.querySelector('.promo__bg'),
//           genre = poster.querySelector('.promo__genre'),
//           moviesList = document.querySelector('.promo__interactive-list'),
//           addForm = document.querySelector('form.add'),
//           addInput = addForm.querySelector('.adding__input'),
//           checkbox = addForm.querySelector(['[type="checkbox"]']);

//     addForm.addEventListener('submit', (e) => {
//         e.preventDefault();
        
//         let newFilm = addInput.value;
//         const favorite = checkbox.checked;

//         if (newFilm) {

//             if(newFilm.length > 21) {
//                 newFilm = `${newFilm.substring(0, 22)}...`;
//             }

//             if (favorite) {
//                 console.log('Добавляєм любимий фільм');
//             }

//             movieDB.movies.push(newFilm);
//             sortArr(movieDB.movies);
//             createMovieList(movieDB.movies, moviesList);
//         }

//         e.target.reset();

//     });    

//     const deleteAdv = (arr) => {
//         arr.forEach(item => {
//             item.remove();
//         });
//     };
   
//     const makeChanges = () => {
//         genre.textContent = 'Драма';
//         poster.style.backgroundImage = 'url("img/bg.jpg")';
//     };
    
//     const sortArr = (arr) => {
//         arr.sort()
//     };

//     function createMovieList (films, parent) {
//         parent.innerHTML = '';
//         sortArr(films);

//         films.forEach((film, i) => {
//             parent.innerHTML += `
//             <li class="promo__interactive-item">${i +1} ${film}
//                 <div class="delete"></div>
//             </li>
//             `;
//         });

//         document.querySelectorAll('.delete').forEach((btn, i) => {
//             btn.addEventListener('click', () => {
//                 btn.parentElement.remove();
//                 movieDB.movies.splice(i, 1);
//                 createMovieList(films, parent);
//             });
//         });
//     };

//     deleteAdv(adv);
//     makeChanges();
//     createMovieList(movieDB.movies, moviesList);
// });


window.addEventListener('DOMContentLoaded', () => {
   const tabs = document.querySelectorAll('.tabheader__item'),
         tabsContent = document.querySelectorAll('.tabcontent'),
         tabsParent = document.querySelector('.tabheader__items');


   function hidetabContent() {
         tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
         });

         tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
         });
   }

   function showtabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }

   hidetabContent();
   showtabContent();

   tabsParent.addEventListener('click', (e) => {
      const target = e.target;

      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hidetabContent();
               showtabContent(i);
            }
         });
      }
   });


   // Tiimer

   const deadline = '2024-10-04';

   function getTimeRemaining(endtime) {
      let days, hours, minutes, seconds;
      const t =  Date.parse(endtime) - Date.parse(new Date());
      if(t <= 0) {
         days = 0;
         hours = 0;
         minutes = 0;
         seconds = 0;
      }  else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
         } 
      return {
         total: t,
         days: days,
         hours: hours,
         minutes: minutes,
         seconds: seconds
      };
   }

   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
             
      updateClock();

      function updateClock() {
         const t = getTimeRemaining(endtime);

         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);

         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }

   setClock('.timer', deadline);

   // Modal

   const modalTrigger = document.querySelectorAll('[data-modal]'),
         modal = document.querySelector('.modal'),
         modalCloseBtn = document.querySelector('[data-close]');

   modalTrigger.forEach(btn => {
      btn.addEventListener('click', ()=>{
         modal.classList.add('show');
         modal.classList.remove('hide');
         document.body.style.overflow = 'hidden';
      })
   })

   function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
   }

   modalCloseBtn.addEventListener('click', closeModal);

   modal.addEventListener('click', (e) => {
      if (e.target === modal) {
         closeModal();
      }
   });

   document.addEventListener('keydown', (e) => {
     if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal();
     }
   });
});



