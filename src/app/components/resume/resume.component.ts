import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  isVisible = false;
  activeSection: string | null = null;

  resumeData = {
    personal: {
      name: 'KIRAN K',
      title: 'UI Developer | MEAN Stack Developer',
      email: 'kirankrishnadoss011@gmail.com',
      phone: '+91 9360672768',
      location: 'Melmaruvethur,Tamil Nadu, India',
      linkedin: 'www.linkedin.com/in/kiran-k-13638b224',
      github: 'https://github.com/kirankrishnadoss'
    },

    summary:
      'Passionate front-end and full-stack developer with a strong background in building modern, scalable web applications. Proficient in Angular, TypeScript, Node.js, and MongoDB. Dedicated to creating intuitive and visually appealing user interfaces with a focus on performance and accessibility.',

    experience: [
      {
        title: 'Developer',
        company: 'Rare Tech Software Solutions, Bangalore',
        period: '2025 – Present',
        responsibilities: [
          'Developing and maintaining responsive web applications using Angular and Node.js.',
          'Collaborating with cross-functional teams to deliver clean and scalable code.',
          'Enhancing UI performance and optimizing API integrations.',
          'Participating in code reviews and contributing to design discussions.'
        ]
      },
      {
        title: 'Course - MERN Stack Developer',
        company: 'PySpiders, Basavanagudi, Bangalore',
        period: '2024 – 2025',
        responsibilities: [
          'Built full-stack MEAN applications with user authentication and CRUD operations.',
          'Developed a chatbot app and a custom T-shirt design platform.',
          'Focused on modular design and component-driven UI patterns.'
        ]
      }
    ],

    education: [
      {
        degree: 'Master of Computer Applications (MCA)',
        institution: 'Hindusthan College of Arts and Science',
        year: '2024 – 2026'
      },
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'Lakshmi Bangaru Arts and Science College',
        year: '2021 – 2024'
      }
    ],

    skills: {
      Frontend: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Angular', 'React'],
      Backend: ['Node.js', 'Express.js'],
      Database: ['MongoDB', 'MySQL'],
      Tools: ['Git', 'Figma', 'VS Code', 'Postman']
    },

    achievements: [
      'Completed MEAN Stack Developer course at PySpiders, Bangalore.',
      'Built chatbot and T-shirt design web apps using MERN/MEAN stack.',
      'Developed multiple responsive UI projects showcasing Angular and Node.js integration.',
      'Web Development certifications from RS Robotics and NxtLogic Software Solutions.'
    ]
  };

  ngOnInit() {
    setTimeout(() => (this.isVisible = true), 300);
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.isVisible = true;
  }

  setActive(section: string) {
    this.activeSection = section;
  }

  clearActive() {
    this.activeSection = null;
  }

  handleDownload() {
    const link = document.createElement('a');
    link.href = '/assets/Kiran K RESUME.pdf'; // Place your resume file in assets folder
    link.download = 'Kiran_K_Resume.pdf';
    link.click();
  }
}
