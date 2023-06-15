window.addEventListener("DOMContentLoaded", function () {
	let offset = null;
	let slideIndex = 1;
   let chengeOffset = 1;
   let resWidth = 0
   let lastElem = null;
   let firstElem = null
	const slides = document.querySelectorAll(".slide"),
		prev = document.querySelector(".btn-prev"),
		next = document.querySelector(".btn-next"),
		slidesWrapper = document.querySelector(".slider-wrapper"),
		width = window.getComputedStyle(slidesWrapper).width,
		slidesField = document.querySelector(".slider-inner"),
      dots = document.querySelector(".dots");
      offset=+width.slice(0, width.length - 2);
      const addFirst = ()=>{
         firstElem = slides[0].cloneNode(true);
         slidesField.append(firstElem)
      }
      const addLast = ()=>{
         lastElem = slides[slides.length-1].cloneNode(true);
         slidesField.prepend(lastElem)
      }
      slidesField.style.display = "flex";
      slidesField.style.transform = `translateX(-${offset}px)`;
      slides.forEach((slide) => {
         slide.style.width = width;
      });
      addFirst()
      addLast()


      slides.forEach((item,i)=>{
         const dot = document.createElement('button');
         if (i===slideIndex-1){
            dot.classList.add('dot')
            dot.classList.add('active')
         }else{
            dot.classList.add('dot')
         }
         dot.style.border='none'
         dots.appendChild(dot)
      })
      const dot = document.querySelectorAll(".dot");
      const disabl = ()=> {
         dot.forEach(item=>{
            item.setAttribute('disabled', '')
         })
         prev.setAttribute('disabled', '')
         next.setAttribute('disabled', '')
      }
      const activeted = ()=> {
         dot.forEach(item=>{
            item.removeAttribute('disabled')
         })
         prev.removeAttribute('disabled')
         next.removeAttribute('disabled')
      }

   const checkActiveDot = () => {
      dot.forEach((item,i)=>{
         if (i===slideIndex-1){
            item.classList.add('active')
         } else{
            item.classList.remove('active')
         }
      })
   }
   const animation = (type)=>{
      disabl()
      let start = Date.now();
      let currentOfset= offset;
      let time = 2000
      let timer = setInterval(function() {
         let res = 0;
        let timePassed = Date.now() - start;

        if (timePassed >= time) {
          clearInterval(time);
          activeted()
          return;
        }
        switch(type){
         case "plus":
            res = currentOfset+((+width.slice(0, width.length - 2))*(timePassed/time));
            break;
         case "minus":
            res = currentOfset-((+width.slice(0, width.length - 2))*(timePassed/time));
            break;  
        case "dot-":
            res = currentOfset-(resWidth*(timePassed/time));
            break;
         case "dot+":
            res = currentOfset+(resWidth*(timePassed/time));
            break;   
        }
        slidesField.style.transform = `translateX(-${res}px)`;
      }, 5);
   }



   dot.forEach((item,i)=>{
      item.addEventListener("click",()=>{
         slideIndex=i+1
         chengeOffset = +width.slice(0, width.length - 2)*slideIndex;
         if (offset<chengeOffset){
            resWidth = chengeOffset-offset;
            animation('dot+')
         }
         if (offset>chengeOffset){
            resWidth = offset-chengeOffset;
            animation('dot-')
         }

         offset = chengeOffset;
         checkActiveDot()
      })
   })



	next.addEventListener("click", () => {
		if (offset == +width.slice(0, width.length - 2) * (slides.length)) {
         animation("plus")
         offset = +width.slice(0, width.length - 2);
		} else {
       animation("plus")
      offset += +width.slice(0, width.length - 2);
		}
		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}
      checkActiveDot()
	});


	prev.addEventListener("click", () => {
		if (offset == +width.slice(0, width.length - 2)) {
         animation("minus")
			offset = +width.slice(0, width.length - 2) * (slides.length );
		} else {
			animation("minus")
         offset -= +width.slice(0, width.length - 2);
		}
		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}
      checkActiveDot()
	});
});
