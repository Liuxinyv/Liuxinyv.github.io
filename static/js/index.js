// window.HELP_IMPROVE_VIDEOJS = false;


// $(document).ready(function() {
//     // Check for click events on the navbar burger icon

//     var options = {
// 			slidesToScroll: 1,
// 			slidesToShow: 1,
// 			loop: true,
// 			infinite: true,
// 			autoplay: true,
// 			autoplaySpeed: 5000,
//     }

// 		// Initialize all div with carousel class
//     var carousels = bulmaCarousel.attach('.carousel', options);
	
//     bulmaSlider.attach();

// })
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("slider");
    let videos = Array.from(slider.children); // 获取所有 video 元素
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    const totalVideos = videos.length;
    const visibleVideos = 3;
    let videoWidth = videos[0].clientWidth;
    let currentIndex = visibleVideos; // 初始偏移量
    let isTransitioning = false;

    // 复制前后 3 个视频
    const cloneFirst = videos.slice(0, visibleVideos).map(vid => vid.cloneNode(true));
    const cloneLast = videos.slice(-visibleVideos).map(vid => vid.cloneNode(true));

    // 追加到头尾
    cloneFirst.forEach(vid => slider.appendChild(vid));
    cloneLast.forEach(vid => slider.insertBefore(vid, videos[0]));

    // 更新 videos
    videos = Array.from(slider.children);
    slider.style.transform = `translateX(${-currentIndex * videoWidth}px)`;

    function updateSlider() {
        if (isTransitioning) return;
        isTransitioning = true;
        slider.style.transition = "transform 0.5s ease";
        slider.style.transform = `translateX(${-currentIndex * videoWidth}px)`;

        setTimeout(() => {
            if (currentIndex === totalVideos + visibleVideos) {
                // 到达克隆的最右端，瞬间切换到原始第一个
                slider.style.transition = "none";
                currentIndex = visibleVideos;
                slider.style.transform = `translateX(${-currentIndex * videoWidth}px)`;
            } else if (currentIndex === 0) {
                // 到达克隆的最左端，瞬间切换到原始最后一个
                slider.style.transition = "none";
                currentIndex = totalVideos;
                slider.style.transform = `translateX(${-currentIndex * videoWidth}px)`;
            }
            isTransitioning = false;
        }, 500);
    }

    nextBtn.addEventListener("click", function () {
        if (!isTransitioning) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener("click", function () {
        if (!isTransitioning) {
            currentIndex--;
            updateSlider();
        }
    });

    // 窗口调整时，更新视频宽度
    window.addEventListener("resize", function () {
        videoWidth = videos[0].clientWidth;
        slider.style.transition = "none";
        slider.style.transform = `translateX(${-currentIndex * videoWidth}px)`;
    });
});

// document.addEventListener("DOMContentLoaded", function () {
// 	const slider = document.getElementById("slider");
// 	const prev = document.getElementById("prev");
// 	const next = document.getElementById("next");
// 	const paginationDots = document.getElementById("pagination-dots");
  
// 	// 获取所有的视频容器
// 	const videoContainers = document.querySelectorAll(".video-container");
// 	const totalVideos = videoContainers.length;
// 	const videosPerView = 3; // 每次显示3个视频
// 	let index = 0;
  
// 	// 获取每个视频的宽度
// 	const slideWidth = videoContainers[0].offsetWidth;
  
// 	// 创建分页指示器点数（根据视频数量）
// 	const totalPages = Math.ceil(totalVideos / videosPerView);
	
// 	// 创建并显示分页点
// 	for (let i = 0; i < totalPages; i++) {
// 	  let dot = document.createElement("span");
// 	  dot.classList.add("dot");
// 	  if (i === 0) dot.classList.add("active"); // 初始高亮第一个
// 	  paginationDots.appendChild(dot);
// 	}
// 	const dots = document.querySelectorAll(".dot");
  
// 	function updateSlider() {
// 	  // 更新滑动位置
// 	  slider.style.transition = "transform 0.5s ease-in-out";
// 	  slider.style.transform = `translateX(${-(index * slideWidth)}px)`;
  
// 	  // 更新分页指示器高亮
// 	  dots.forEach((dot, i) => {
// 		dot.classList.toggle("active", i === Math.floor(index / videosPerView));
// 	  });
// 	}
  
// 	// 下一页
// 	function slideNext() {
// 	  if (index < totalVideos - videosPerView) {
// 		index++;
// 	  } else {
// 		index = 0; // 让它循环回到第一个
// 	  }
// 	  updateSlider();
// 	}
  
// 	// 上一页
// 	function slidePrev() {
// 	  if (index > 0) {
// 		index--;
// 	  } else {
// 		index = totalVideos - videosPerView; // 让它循环到最后一个
// 	  }
// 	  updateSlider();
// 	}
  
// 	// 绑定按钮点击事件
// 	next.addEventListener("click", slideNext);
// 	prev.addEventListener("click", slidePrev);
//   });
  