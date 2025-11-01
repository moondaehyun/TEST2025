document.addEventListener("DOMContentLoaded", () => {
  // --- 1. 스크롤 애니메이션 함수 정의 (느린 스크롤) ---
  function setupSmoothScroll(linkElement, targetSection) {
    if (linkElement && targetSection) {
      linkElement.addEventListener("click", function (event) {
        event.preventDefault();

        const targetY = targetSection.offsetTop;
        const startY = window.pageYOffset;
        const distance = targetY - startY;

        const duration = 800; // 스크롤 속도 (0.8초)
        let startTime;

        function animateScroll(currentTime) {
          if (startTime === undefined) {
            startTime = currentTime;
          }
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Cubic Ease-Out 함수
          const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);
          const newY = startY + distance * easeOutCubic(progress);

          window.scrollTo(0, newY);

          if (elapsed < duration) {
            requestAnimationFrame(animateScroll);
          }
        }
        requestAnimationFrame(animateScroll);
      });
    }
  }

  // --- 2. 네비게이션 링크 및 섹션 요소 선택 및 스크롤 적용 ---
  // HTML 순서: Myeongryang(1), Deokhye Ongju(2), Gwanghae(3), Gunhamdo(4)

  const myeongryangLink = document.querySelector(
    ".top-nav ul li:nth-child(1) a"
  );
  const myeongryangSection = document.getElementById("myeongryang-details");

  const deokhyeLink = document.querySelector(".top-nav ul li:nth-child(2) a");
  const deokhyeSection = document.getElementById("deokhye-details");

  const gwanghaeLink = document.querySelector(".top-nav ul li:nth-child(3) a");
  const gwanghaeSection = document.getElementById("gwanghae-details");

  const gunhamdoLink = document.querySelector(".top-nav ul li:nth-child(4) a");
  const gunhamdoSection = document.getElementById("gunhamdo-details");

  setupSmoothScroll(myeongryangLink, myeongryangSection);
  setupSmoothScroll(deokhyeLink, deokhyeSection);
  setupSmoothScroll(gwanghaeLink, gwanghaeSection);
  setupSmoothScroll(gunhamdoLink, gunhamdoSection);

  // --- 3. 모달 팝업 기능 ---

  // 3-1. 공통 요소 선택 및 모달 닫기 기능
  const modal = document.getElementById("image-modal");
  const closeButton = document.querySelector(".close-button");
  const modalImage = document.getElementById("modal-image");

  if (modal) {
    closeButton.addEventListener("click", function () {
      modal.style.display = "none";
    });
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }

  // 3-2. 팝업 초기화 함수 (각 버튼에 이미지 연결)
  function setupModal(buttonId, imageSrc) {
    const button = document.getElementById(buttonId);

    if (button && modal && modalImage) {
      button.addEventListener("click", function (event) {
        event.preventDefault();

        // 이미지 소스 설정
        modalImage.src = imageSrc;

        // 모달 열기
        modal.style.display = "block";
      });
    }
  }

  // 3-3. 모든 영화 버튼에 팝업 기능 적용
  setupModal("open-myeongryang-modal", "img/30.png");
  setupModal("open-deokhye-modal", "img/31.png");
  setupModal("open-gwanghae-modal", "img/32.png");
  setupModal("open-gunhamdo-modal", "img/33.png"); // 👈 군함도 팝업 최종 추가
});
