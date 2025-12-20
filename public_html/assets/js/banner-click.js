   
                    document.querySelectorAll('.banner-slide').forEach(slide => {
        slide.addEventListener('click', () => {
            window.location.href = slide.dataset.link;
        });
        });

