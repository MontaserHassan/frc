/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Query, Delete, UseGuards, Request, Response, HttpStatus, } from '@nestjs/common';

import NewsService from './news.service';
import Util from 'src/Modules/Utils/util.util';
import CustomExceptionFilter from 'src/Core/Error/error-exception.error';
import SuccessResponse from 'src/Core/helpers/success-response.helper';
import CreateNewsDto from './dto/create-news.dto';
import UpdateNewsDto from './dto/update-news.dto';
import { ErrorNewsMessage, SuccessNewsMessage } from './Messages/index.message'



@Controller('news')
export default class NewsController {

  constructor(private readonly newsService: NewsService, private readonly util: Util) { };

  @Post('/')
  @UseGuards()
  async create(@Request() req, @Response() res, @Body() createNewsDto: CreateNewsDto, @Query('lang') lang: string) {
    try {
      const newNews = await this.newsService.create(createNewsDto);
      if (!newNews) throw new CustomExceptionFilter(ErrorNewsMessage.NOT_CREATED, 400, ['news']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.CREATED,
        responseMessage: SuccessNewsMessage.CREATED,
        data: {
          news: newNews,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Get('/')
  async findAll(@Request() req, @Response() res, @Query('lang') lang: string, @Query('page') page: number, @Query('limit') limit: number) {
    try {
      const totalDocuments = await this.newsService.totalDocuments();
      const pagination = this.util.pagination(totalDocuments, Number(page), Number(limit));
      const allNews = await this.newsService.findWithPagination(pagination.limit, pagination.skip);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessNewsMessage.GET_ALL_NEWS,
        data: {
          allNews: allNews,
          currentPage: pagination.currentPage,
          skip: pagination.skip,
          limit: pagination.limit,
          totalPages: pagination.totalPages,
          totalDocuments: pagination.totalDocuments,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Get('/slider')
  async findSlider(@Request() req, @Response() res, @Query('lang') lang: string,) {
    try {
      const sliderNews = await this.newsService.findByProps({ special: true });
      return SuccessResponse.send(req, res, {
        responseMessage: SuccessNewsMessage.GET_FOR_SLIDER,
        responseCode: HttpStatus.OK,
        data: {
          news: sliderNews,
          sliderLength: sliderNews.length,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Get('/:newsId')
  async findOne(@Request() req, @Response() res, @Param('newsId') newsId: string, @Query('lang') lang: string) {
    try {
      const news = await this.newsService.findById(newsId);
      if (!news) throw new CustomExceptionFilter(ErrorNewsMessage.NOT_FOUND, 404, ['news']);
      return SuccessResponse.send(req, res, {
        responseMessage: SuccessNewsMessage.GET_ONE_NEWS,
        responseCode: HttpStatus.OK,
        data: {
          news: news,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Patch('/')
  @UseGuards()
  async update(@Request() req, @Response() res, @Body() updateNewsDto: UpdateNewsDto, @Query('lang') lang: string) {
    try {
      const isMediaExisting = await this.newsService.findById(updateNewsDto.newsId);
      if (!isMediaExisting) throw new CustomExceptionFilter(ErrorNewsMessage.NOT_FOUND, 404, ['news']);
      updateNewsDto.media = updateNewsDto.media && updateNewsDto.media != 'null' ? updateNewsDto.media : isMediaExisting.media;
      updateNewsDto.special = updateNewsDto.special ? updateNewsDto.special : isMediaExisting.special;
      const updatedNews = await this.newsService.update(updateNewsDto);
      return SuccessResponse.send(req, res, {
        responseMessage: SuccessNewsMessage.UPDATED,
        responseCode: HttpStatus.OK,
        data: {
          news: updatedNews,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Delete('/:newsId')
  async remove(@Request() req, @Response() res, @Param('newsId') newsId: string, @Query('lang') lang: string) {
    try {
      await this.newsService.remove(newsId);
      return SuccessResponse.send(req, res, {
        responseMessage: SuccessNewsMessage.DELETED,
        responseCode: HttpStatus.OK,
        data: {},
      });
    } catch (err) {
      throw err;
    };
  };

};