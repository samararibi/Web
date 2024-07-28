import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent {
  job = {
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
    requirements: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    // Convertir les exigences en tableau
    const jobData = {
      ...this.job,
      requirements: this.job.requirements.split(',').map(req => req.trim())
    };

    this.http.post('http://localhost:3000/jobs', jobData).subscribe(response => {
      console.log('Offre d\'emploi postée', response);
      // Réinitialiser le formulaire après soumission
      this.job = {
        title: '',
        description: '',
        company: '',
        location: '',
        salary: '',
        requirements: ''
      };
    });
  }
}
