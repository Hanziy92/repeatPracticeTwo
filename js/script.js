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
         item.classList.remove('show', 'fade');
         item.classList.add('hide');
      });
      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active');
      });
   }

   function showtabContent(i = 0) {
      tabs[i].classList.add('tabheader__item_active');
      tabsContent[i].classList.remove('hide');
      tabsContent[i].classList.add('show', 'fade');
   }

   hidetabContent();
   showtabContent();

   tabsParent.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target === item) {
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
      const t = Date.parse(endtime) - Date.parse(new Date());
      if (t <= 0) {
         days = 0;
         hours = 0;
         minutes = 0;
         seconds = 0;
      } else {
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
   modal = document.querySelector('.modal');

   modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
   });

   function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
   }

   function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
   }

   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == '') {
         closeModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modal.classList.contains('show')) { 
         closeModal();
      }
   });

   const modalTimerId = setTimeout(openModal, 300000);
   

   function showModalByScroll() {
      if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal();
         window.removeEventListener('scroll', showModalByScroll);
      }
   };

   window.addEventListener('scroll', showModalByScroll);

   // menu Card
   class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.classes = classes;
         this.parent = document.querySelector(parentSelector);
         this.transfer = 27;
         this.changeTwoUAH();
      }

      changeTwoUAH() {
         this.price = this.price * this.transfer;
      }

      render() {
         const element = document.createElement('div');
         if (this.classes.length === 0) {
               this.element = 'menu__item';
               element.classList.add(this.element);
         } else {
            this.classes.forEach(className => element.classList.add(className));           
         } 
         element.innerHTML = `
               <img src=${this.src} alt=${this.alt}>
               <h3 class="menu__item-subtitle">${this.title}</h3>
               <div class="menu__item-descr">${this.descr}</div>
               <div class="menu__item-divider"></div>
                  <div class="menu__item-price">
                     <div class="menu__item-cost">Цена:</div>
                     <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                  </div>
               
            `;
            this.parent.append(element);       
      }

      // render() {
      //    const element = document.createElement('div');
      //    element.innerHTML = `
      //       <div class="menu__item">
      //          <img src=${this.src} alt=${this.alt}>
      //          <h3 class="menu__item-subtitle">${this.title}</h3>
      //          <div class="menu__item-descr">${this.descr}</div>
      //          <div class="menu__item-divider"></div>
      //             <div class="menu__item-price">
      //                <div class="menu__item-cost">Цена:</div>
      //                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      //             </div>
      //       </div>
      //    `;
      //    this.parent.append(element);
      // }
   }

   new MenuCard(
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      '.menu .container',
    
   ).render(); 

   new MenuCard(
      "img/tabs/elite.jpg",
      "elite",
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      14,
      '.menu .container',
      'menu__item'
   ).render();

   new MenuCard(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      21,
      '.menu .container',
      'menu__item'
   ).render();
   
  // Forms

   const forms = document.querySelectorAll('form');

   const messege = {
      loading: 'img/forms/spinner.svg',
      success: 'Дякую, ми з вами зв`яжемся',
      failure: 'Щось пішло не так...'
   };

   forms.forEach(item => {
      postData(item);
   });

   function postData(form) {
      form.addEventListener('sumbit', (e) => {
         e.preventDefault();

         const statusMessege = document.createElement('img');
         statusMessege.src = messege.loading;
         statusMessege.style.cssText = `
            display: block;
            margin: 0 auto;
         `;
         form.insertAjacentElement('afterand', statusMessege);

         const r = new XMLHttpRequest();  
         r.open('POST', 'server.php');

         // r.setRequestHeader('Content-type', 'multipart/from-data');
         r.setRequestHeader('Content-type', 'application/json');
         const formData = new FormData(form);

         const obj = {};

         formData.forEach((item, key) => {
            obj[key] = item;
         });

         const json = JSON.stringify(obj);
         r.send(json);

         r.addEventListener('load', () => {
            if (r.status === 200) {
               console.log(r.response);
               showThanksModal(messege.success);
               form.reset();
               statusMessege.remove();             
            } else {
               showThanksModal(messege.failure);
            }
         });

      });
   }

   function showThanksModal(messege) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      openModal();

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
         <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${messege}</div>
         </div>
      `;

      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
         thanksModal.remove();
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         closeModal();
      }, 4000);
   }

});