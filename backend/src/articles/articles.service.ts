import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  findAll() {
    return this.articlesRepository.find();
  }

  findOne(codigo: string) {
    return this.articlesRepository.findOneBy({ codigo });
  }

  create(article: Partial<Article>) {
    const newArticle = this.articlesRepository.create(article);
    return this.articlesRepository.save(newArticle);
  }

  async update(codigo: string, article: Partial<Article>) {
    await this.articlesRepository.update(codigo, article);
    return this.findOne(codigo);
  }

  async remove(codigo: string) {
    const article = await this.findOne(codigo);
    if (article) {
      await this.articlesRepository.remove(article);
    }
    return article;
  }
}
