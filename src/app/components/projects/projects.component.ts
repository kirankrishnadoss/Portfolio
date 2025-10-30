import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface Project {
  imgPath: string;
  title: string;
  description: string;
  ghLink?: string;
  demoLink?: string;
  isBlog?: boolean;
  techStack?: string[];
  featured?: boolean;
  status?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  githubBase = 'https://github.com/kirankrishnadoss';

  projects: Project[] = [
    {
      imgPath: '/assets/projects/Portfolio.png',
      title: 'Portfolio Website',
      description:
        'My personal portfolio built using Angular and Tailwind CSS. Fully responsive and showcases my projects, skills, and resume. Includes animations and smooth transitions.',
      ghLink: `${this.githubBase}/portfolio`,
      techStack: ['Angular', 'Tailwind CSS', 'TypeScript'],
      featured: true
    },
    {
      imgPath: 'assets/projects/bot.jpg',
      title: 'AI Chatbot (MERN Stack)',
      description:
        'A chatbot web app built using MongoDB, Express, React, and Node.js with real-time user authentication and smart responses. Trained on tablet data to answer medicine-related queries.',
      ghLink: `https://github.com/kirankrishnadoss/Med-Bot`,
      demoLink: ``,
      techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
      featured: true
    },
    {
      imgPath: 'assets/projects/task.webp',
      title: 'Task Management App',
      description:
        'A full-featured task management system with authentication, role-based access, and progress tracking built using Angular 19 and Express API.',
      ghLink: `https://github.com/kirankrishnadoss/Task-Management`,
      demoLink: '',
      techStack: ['Angular'],
    },
    {
      imgPath: 'assets/projects/tshirt.webp',
      title: 'Custom T-Shirt Designer',
      description:
        'An interactive T-shirt design web app that allows users to upload, position, and style their own graphics on apparel. Built with Angular and Node.js backend.',
      techStack: ['Angular', 'Node.js', 'Canvas', 'Express'],
      featured: true,
      status: 'In Progress' 
    }
  ];

  displayedProjects: Project[] = [];
  filteredProjects: Project[] = [];

  currentFilter: 'all' | 'featured' | 'web' | 'ai' = 'all';
  sortBy: 'default' | 'name' | 'recent' = 'default';

  isScrolled = false;
  scrollProgress = 0;
  particleCount = Array(50).fill(0);
  isLoading = false;
  showLoadMore = false;
  itemsToShow = 6;

  ngOnInit(): void {
    this.initializeProjects();
    this.preloadImages();
  }

  ngOnDestroy(): void {}

  private initializeProjects(): void {
    this.filteredProjects = [...this.projects];
    this.displayedProjects = this.filteredProjects.slice(0, this.itemsToShow);
    this.showLoadMore = this.filteredProjects.length > this.itemsToShow;
  }

  private preloadImages(): void {
    this.projects.forEach(project => {
      const img = new Image();
      img.src = project.imgPath;
    });
  }

  filterProjects(filter: 'all' | 'featured' | 'web' | 'ai'): void {
    this.currentFilter = filter;
    this.isLoading = true;

    setTimeout(() => {
      switch (filter) {
        case 'all':
          this.filteredProjects = [...this.projects];
          break;
        case 'featured':
          this.filteredProjects = this.projects.filter(p => p.featured);
          break;
        case 'web':
          this.filteredProjects = this.projects.filter(p =>
            p.techStack?.some(tech =>
              ['Angular', 'React', 'Tailwind CSS', 'HTML', 'CSS'].includes(tech)
            )
          );
          break;
        case 'ai':
          this.filteredProjects = this.projects.filter(p =>
            p.techStack?.some(tech =>
              ['TensorFlow', 'PyTorch', 'AI', 'ML', 'NLP'].includes(tech)
            )
          );
          break;
      }
      this.applySorting();
      this.displayedProjects = this.filteredProjects.slice(0, this.itemsToShow);
      this.showLoadMore = this.filteredProjects.length > this.itemsToShow;
      this.isLoading = false;
    }, 300);
  }

  sortProjects(sortBy: 'default' | 'name' | 'recent'): void {
    this.sortBy = sortBy;
    this.applySorting();
    this.displayedProjects = this.filteredProjects.slice(0, this.itemsToShow);
  }

  private applySorting(): void {
    switch (this.sortBy) {
      case 'name':
        this.filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'recent':
        this.filteredProjects.reverse();
        break;
      case 'default':
        this.filteredProjects = [...this.projects.filter(p => this.filteredProjects.includes(p))];
        break;
    }
  }

  loadMoreProjects(): void {
    const currentLength = this.displayedProjects.length;
    const newItems = this.filteredProjects.slice(currentLength, currentLength + 3);
    this.displayedProjects = [...this.displayedProjects, ...newItems];
    this.showLoadMore = this.displayedProjects.length < this.filteredProjects.length;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    this.scrollProgress = scrollTop / (documentHeight - windowHeight);
    this.isScrolled = scrollTop > 100;
  }

  openLink(url?: string, event?: Event): void {
    if (event) event.preventDefault();
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }

  getTechStackDisplay(project: Project): string {
    return project.techStack?.slice(0, 3).join(' • ') || '';
  }

  trackByProjectTitle(index: number, project: Project): string {
    return project.title;
  }
}
