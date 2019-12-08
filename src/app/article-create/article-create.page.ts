import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticlesService } from '../articles.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.page.html',
  styleUrls: ['./article-create.page.scss'],
})
export class ArticleCreatePage implements OnInit {

  article:Article = new Article();
  errors: any = {};

  constructor(
    private articlesService: ArticlesService,
    private router: Router
  ) { }

  ngOnInit() {}

  response(response): void{
    
    if(response.success===false){
      
      if( response.errors.name == 'MissingArticlenameError' ){
        this.errors.articlename = 'Please enter a articlename';
      }

      if( response.errors.name == 'ArticleExistsError' ){
        this.errors.articlename = 'A article with the given articlename is already registered';
      }

      if( response.errors.email ){
        this.errors.email = response.errors.errors.email.message;
      }

    }

    if(response.success===true){
      this.router.navigate(['/articles']);
    }
  }

  onSubmit(): void{
    this.articlesService.createArticle(this.article).subscribe(
      (response:any) => {
        this.response(response);
      }
    );
  }

}