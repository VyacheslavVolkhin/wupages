document.addEventListener("DOMContentLoaded", function() {


	
	


	//select toggle content visibility
	const inputs = document.querySelectorAll(
	  "input[data-content], input[data-content-check], input[data-content-uncheck]"
	);
  
	inputs.forEach(function (input) {
	  toggleContent(input);
	  });
  
	inputs.forEach((input) => {
	  input.addEventListener("click", function () {
		document.querySelectorAll(".frm-content").forEach((content) => {
		  content.classList.remove("active");
			  });
  
		inputs.forEach(toggleContent);
		  });
	  });
  
	document.querySelectorAll(".btn[data-content]").forEach((button) => {
	  button.addEventListener("click", function () {
		let dataContent = this.getAttribute("data-content");
		this.disabled = true;
		document
		  .querySelectorAll('.frm-content[data-content="' + dataContent + '"]')
		  .forEach((content) => {
			content.classList.add("active");
			  });
		return false;
		  });
	  });
  
	function toggleContent(input) {
	  let selectContent;
	  if (input.checked) {
		selectContent =
		  input.getAttribute("data-content-check") ||
		  input.getAttribute("data-content");
		  } else {
		selectContent = input.getAttribute("data-content-uncheck");
		  }
	  document
		.querySelectorAll('.frm-content[data-content="' + selectContent + '"]')
		.forEach((content) => {
		  content.classList.add("active");
		  });
	  }


	  // field textarea counter with maxlength
	  document.querySelectorAll('textarea[maxlength]').forEach(function(textarea) {
		const max = textarea.getAttribute('maxlength');
		const counter = document.createElement('div');
		counter.className = 'field-counter';
		textarea.insertAdjacentElement('afterend', counter);
		function update() {
		const current = textarea.value.length;
		counter.textContent = current + '/' + max;
		counter.closest('.frm-field-input').classList.toggle('is-full', current >= max);
		}
		update();
		textarea.addEventListener('input', update);
	  });
	
	

	  

	//btn tgl and add
	let tglButtons = document.querySelectorAll('.js-btn-tgl')
	let addButtons = document.querySelectorAll('.js-btn-add')
	let buttonsTglOne = document.querySelectorAll('.js-btn-tgl-one');
	for (i = 0;i < tglButtons.length;i++) {
		tglButtons[i].addEventListener('click', function(e) {
			this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
			e.preventDefault()
			return false
		})
	}
	for (i = 0;i < addButtons.length;i++) {
		addButtons[i].addEventListener('click', function(e) {
			if (!this.classList.contains('active')) {
				this.classList.add('active');
				e.preventDefault()
				return false
			}
		})
	}
	buttonsTglOne.forEach(function(button) {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			let toggleButtonsWrap = this.closest('.js-toggle-buttons');
	
			if (this.classList.contains('active')) {
				this.classList.remove('active');
			} else {
				toggleButtonsWrap.querySelectorAll('.js-btn-tgl-one').forEach(function(btn) {
					btn.classList.remove('active');
				});
				this.classList.add('active');
			}
			return false;
		});
	});


	//copy button
	document.querySelectorAll('.js-btn-copy').forEach(function(btn) {
		btn.addEventListener('click', function(e) {
			e.preventDefault();
			const content = btn.getAttribute('data-content');
			if (content) {
				navigator.clipboard.writeText(content)
					.then(() => {
						// alert('Скопировано!');
					})
					.catch(err => {
						// Обработка ошибок, если не удалось скопировать
						alert('Ошибка копирования');
					});
			}
		});
	});


	//slider
	const sliderstilesreviews = document.querySelectorAll(".slider-tilesreviews");
	
	sliderstilesreviews.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-tilesreviews-pagination");
		const nextEl = container.querySelector(".button-slider-tilesreviews-next");
		const prevEl = container.querySelector(".button-slider-tilesreviews-prev");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 400,
			pagination: false,
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
		});
	});
	
})


// items animate: IntersectionObserver не зависит от scroll на window (в части окружений
// scroll не всплывает на window). Fallback — scroll/resize на window, document и scrollingElement.
function initItemAnimations() {
	let items = document.querySelectorAll('.item-animation');
	if (!items.length) return;

	function activate(el) {
		el.classList.add('item-active');
	}

	if ('IntersectionObserver' in window) {
		let observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) return;
					let el = entry.target;
					activate(el);
					observer.unobserve(el);
				});
			},
			{ root: null, rootMargin: '0px', threshold: 0 }
		);
		items.forEach(function (item) {
			observer.observe(item);
		});
		return;
	}

	function isElementInViewport(el) {
		let rect = el.getBoundingClientRect();
		let vh = window.innerHeight;
		return rect.top < vh && rect.bottom > 0;
	}
	function scan() {
		document.querySelectorAll('.item-animation').forEach(function (item) {
			if (isElementInViewport(item)) activate(item);
		});
	}
	let scrollScheduled = false;
	function onScrollOrResize() {
		if (scrollScheduled) return;
		scrollScheduled = true;
		requestAnimationFrame(function () {
			scrollScheduled = false;
			scan();
		});
	}
	let opts = { passive: true };
	window.addEventListener('scroll', onScrollOrResize, opts);
	document.addEventListener('scroll', onScrollOrResize, opts);
	let root = document.scrollingElement || document.documentElement;
	if (root && root !== document) {
		root.addEventListener('scroll', onScrollOrResize, opts);
	}
	window.addEventListener('resize', onScrollOrResize, opts);
	window.addEventListener('load', scan);
	scan();
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initItemAnimations);
} else {
	initItemAnimations();
}