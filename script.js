document.addEventListener('DOMContentLoaded', () => {
            // Dark Mode
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.classList.add('dark');
            document.getElementById('theme-toggle').addEventListener('click', () => document.documentElement.classList.toggle('dark'));

            // Mobile Menu
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenuButton.addEventListener('click', () => {
                mobileMenuButton.classList.toggle('open');
                mobileMenu.classList.toggle('open');
            });
            mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
                mobileMenuButton.classList.remove('open');
                mobileMenu.classList.remove('open');
            }));

            // Smooth Scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', e => {
                    e.preventDefault();
                    const target = document.querySelector(anchor.getAttribute('href'));
                    if (target) window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
                });
            });

            // Skill Bars
            const skillBars = document.querySelectorAll('.skill-progress');
            const skillsSection = document.getElementById('skills');
            new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    skillBars.forEach(bar => bar.style.width = bar.getAttribute('data-width'));
                }
            }, { threshold: 0.5 }).observe(skillsSection);

            // Projects
            const projects = [
                { id: 1, title: 'Portfolio Websites', category: 'web-design', description: 'A responsive Portfolio Website.', client: 'Practice Projects.', date: 'Mar 2025', tools: 'HTML, CSS, JS', link: '#', image: 'images/portfolio.png' },
                { id: 2, title: 'Interactive Dashboard', category: 'ui-design', description: 'Intuitive Dashboard UI.', client: 'Practice projects', date: 'Jan 2025', tools: 'Figma, HTML, CSS.', link: '#', image: 'images/dashboard.png' },
                { id: 3, title: 'Restaurant Brand', category: 'branding', description: 'Brand identity for a restaurant.', client: 'Practice Projects', date: 'Nov 2024', tools: 'Illustrator', link: '#', image: 'images/Design.jpg' },
            ];
            const projectsGrid = document.getElementById('projects-grid');
            projects.forEach(project => {
                const item = document.createElement('div');
                item.className = `project-item ${project.category} bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer`;
                item.setAttribute('data-category', project.category);
                item.innerHTML = `
                    <img src="${project.image}" alt="${project.title}" loading="lazy" class="w-full h-[180px] object-cover rounded-t-lg">
                    <div class="p-4">
                        <span class="text-xs text-primary uppercase">${project.category.replace('-', ' ')}</span>
                        <h3 class="text-lg font-bold text-gray-800 dark:text-white mt-1">${project.title}</h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm">${project.description}</p>
                    </div>
                `;
                projectsGrid.appendChild(item);
                item.addEventListener('click', () => openProjectModal(project));
            });

            // Project Filtering
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
                    btn.classList.add('active', 'bg-primary', 'text-white');
                    const filter = btn.getAttribute('data-filter');
                    document.querySelectorAll('.project-item').forEach(item => {
                        item.classList.toggle('hidden', !(filter === 'all' || filter === item.getAttribute('data-category')));
                    });
                });
            });

            // Project Modal
            const projectModal = document.getElementById('project-modal');
            const closeModal = document.getElementById('close-modal');
            function openProjectModal(project) {
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-description').textContent = project.description;
                document.getElementById('modal-client').textContent = project.client;
                document.getElementById('modal-date').textContent = project.date;
                document.getElementById('modal-category').textContent = project.category.replace('-', ' ');
                document.getElementById('modal-tools').textContent = project.tools;
                document.getElementById('modal-link').href = project.link;
                document.getElementById('modal-image').src = project.image;
                projectModal.classList.add('active');
                document.body.classList.add('overflow-hidden');
            }
            closeModal.addEventListener('click', () => {
                projectModal.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
            });
            projectModal.addEventListener('click', e => {
                if (e.target === projectModal) {
                    projectModal.classList.remove('active');
                    document.body.classList.remove('overflow-hidden');
                }
            });

            // Testimonials
            const testimonials = [
                { id: 1, name: 'Sumaya Nur.', position: 'Student, NU.', testimonial: 'Stunning website design.', stars: 5 },
                { id: 2, name: 'Saida Binte.', position: 'Teacher', testimonial: 'Improved user engagement.', stars: 4 },
                { id: 3, name: 'Mrs. Rabiah.', position: 'Housewife.', testimonial: 'He was Very GREAT For Brand Identity Design.', stars: 5 },
            ];
            const testimonialSlider = document.querySelector('.testimonial-slider');
            testimonials.forEach(t => {
                const slide = document.createElement('div');
                slide.className = 'testimonial-slide p-4';
                slide.innerHTML = `
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white">${t.name}</h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm">${t.position}</p>
                        <p class="text-gray-700 dark:text-gray-300 mt-2 text-sm italic">"${t.testimonial}"</p>
                    </div>
                `;
                testimonialSlider.appendChild(slide);
            });
            let currentIndex = 0;
            const updateSlider = () => testimonialSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
            document.getElementById('testimonial-prev').addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
                updateSlider();
            });
            document.getElementById('testimonial-next').addEventListener('click', () => {
                currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
                updateSlider();
            });

            // EmailJS
            emailjs.init('39IAlu5tOp7o1xL8q');
            document.getElementById('contact-form').addEventListener('submit', e => {
                e.preventDefault();
                const submitBtn = document.getElementById('submit-btn');
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                };
                emailjs.send('service_v1xgh3f', 'template_0oifln9', formData)
                    .then(() => {
                        document.getElementById('contact-form').reset();
                        document.getElementById('toast').classList.remove('hidden');
                        submitBtn.textContent = 'Send';
                        submitBtn.disabled = false;
                        setTimeout(() => document.getElementById('toast').classList.add('hidden'), 3000);
                    })
                    .catch(() => {
                        alert('Error sending message.');
                        submitBtn.textContent = 'Send';
                        submitBtn.disabled = false;
                    });
            });
        });
