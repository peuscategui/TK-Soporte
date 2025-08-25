import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.articlesService.findOne(codigo);
  }

  @Post()
  create(@Body() article: Partial<Article>) {
    return this.articlesService.create(article);
  }

  @Put(':codigo')
  update(@Param('codigo') codigo: string, @Body() article: Partial<Article>) {
    return this.articlesService.update(codigo, article);
  }

  @Delete(':codigo')
  remove(@Param('codigo') codigo: string) {
    return this.articlesService.remove(codigo);
  }
}
