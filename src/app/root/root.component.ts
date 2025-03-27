import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-root',
    template: ''
})
export class RootComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
        } else {
            this.router.navigate(['/login']);
        }
    }
} 