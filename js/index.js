
// карта
const init = () => {
    const myMap = new ymaps.Map(
      'map',
      {
        center: [55.7718, 37.6316],
        zoom: 16,
        controls: ['smallMapDefaultSet'],
      },
      {},
    );
    const myPlacemark = new ymaps.Placemark(
      [55.7724, 37.6252],
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: 'img/mark.svg',
        iconImageSize: [70, 70],
        iconImageOffset: [-35, -70],
      },
    );
    myMap.geoObjects.add(myPlacemark);

    window.addEventListener('resize', () => {
      if (window.innerWidth <1240) {
         myMap.setCenter([55.7718, 37.6256]);
      } else {
        myMap.setCenter([55.7718, 38.6316]);
      }
  })
  };
  ymaps.ready(init);




   //2 карта, работает не только в россии
//   const map = L.map('map').setView([55.7726, 37.63], 17);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// L.marker([55.7724, 37.6252])
//   .addTo(map)
//   .bindPopup('E-trans')
//   .openPopup();


const  disabledScroll = () => {
  document.body.scrollPosition = window.scrollY;              //остаться на той же позиции после закрытия окна
  document.body.style.cssText = `
  overflow: hidden;
  position: fixed;
  top: -${document.body.scrollPosition}px;   
  left: 0;
  height: 100vh;
  width: 100vw;
  padding-right: ${window.innerWidth - document.body.offsetWidth}px; 
  `;                                                                                           //чтобы не скакала страница                                                                             
};

const enabledScroll = () => {
  document.body.style.cssText = ``;
  window.scroll({top: document.body.scrollPosition});          //остаться на той же позиции после закрытия окна
};

const createElem = (tag, attr) => {
  const elem = document.createElement(tag);

  return Object.assign( elem, { ...attr });  //передаём  атрибуты
} ;

const  createModal = (title,description) => {
  const overlayElem = createElem('div', {className: 'modal'});
  const modalElem = createElem('div', {className: 'modal__block'});
  const modalContainerElem = createElem('div', {className: 'modal__container'});

  const titleElem = createElem('h2', {
    className: 'modal__title',
    textContent: `Заказать ${title}`,
  });

  const descriptionElem = createElem ('p', {
    className: 'modal__description',
    textContent: description,
  });

  const formElem = createElem('form', {
    className: 'modal__form',
    method: 'post',
    action: 'https://jsonplaceholder.typicode.com/posts',
    id: 'order',
  });

  const nameLabelElem = createElem('label', {className: 'modal__label'});
  const nameSpanElem = createElem('span', {
    className: 'modal__text',
     textContent: 'Имя',
    });
  const nameInputElem = createElem('input', {
    className: 'modal__input',
    placeholder: 'Введите ваше имя ',
    name: 'name',
    required: true,
  });

  const phoneLabelElem = createElem('label', {className: 'modal__label'});
  const phoneSpanElem = createElem('span', {
    className: 'modal__text',
     textContent: 'Телефон',
    });
  const phoneInputElem = createElem('input', {
    className: 'modal__input',
    placeholder: 'Введите ваш телефон',
    name: 'phone',
    required: true,
  });

  const hideInput = createElem('input', {                        //скрытый инпут для сервера
    type: 'hidden',
    name: 'product',
    value: title,
  });

  const btnSubmit = createElem('button', {
    className: 'modal__btn',
    textContent: 'Заказать',
    type: 'submit',    
  });
  btnSubmit.setAttribute('form', 'order');                     //т.к. кнопка не внутри формы, а внутри модального окна. Её надо связать с формой  по id

  const closeModalBtn = createElem('button', {
    className: 'modal__close',
    innerHTML: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" >
    <path d="M23.75 8.0125L21.9875 6.25L15 13.2375L8.0125 6.25L6.25 8.0125L13.2375 15L6.25 21.9875L8.0125 23.75L15 16.7625L21.9875 23.75L23.75 21.9875L16.7625 15L23.75 8.0125Z" fill="#18171A"/>
    </svg>
    `,
    ariaLabel: 'Закрыть модальное окно',
  });

  overlayElem.addEventListener('click', event => {
    const target = event.target;
    if(target === overlayElem || target.closest('.modal__close')) {
      overlayElem.remove();                                                          //закрытие окна
      enabledScroll();                                                                    //возвращаем скрол
    }
  });
  
  nameLabelElem.append(nameSpanElem, nameInputElem);
  phoneLabelElem.append(phoneSpanElem, phoneInputElem);  
  formElem.append(nameLabelElem, phoneLabelElem, hideInput);

  modalContainerElem.append(titleElem, descriptionElem, formElem, btnSubmit, closeModalBtn);                     //добавляем все элементы
  modalElem.append(modalContainerElem);
  overlayElem.append(modalElem);
  disabledScroll();
  document.body.append(overlayElem);
};

const productTitle = document.querySelectorAll('.product__title');
const productDescription = document.querySelectorAll('.product__description');
const productBtn = document.querySelectorAll('.product__btn');

for (let i = 0; i < productBtn.length; i++) {
  productBtn[i].addEventListener('click', () => {
    const title = productTitle[i].textContent;
    const description = productDescription[i].textContent;

   createModal(title, description);
  } );
};

  // console.log ( productTitle )
  // console.log ( productDescription )
  // console.log ( productBtn  )