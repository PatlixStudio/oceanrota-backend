import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MarketplaceService } from './marketplace.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { multerOptions } from 'src/config/multer.config';
import { randomUUID } from 'crypto';


@ApiTags('Vessel Marketplace')
@Controller('marketplace/listings')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new vessel listing with images' })
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() data: CreateListingDto,
    @Req() req: any,
  ) {

    const user = req.user;
    const dto = plainToInstance(CreateListingDto, data);
    const errors = await validate(dto);
    if (errors.length) {
      throw new BadRequestException(errors);
    }
    return this.marketplaceService.create(dto, user.id);
  }

  @Post(':id/images')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions('gallery')))
  async uploadImages(
    @Param('id') listingId: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: any
  ) {
    const userId = req.user.id;

    const host = `${req.protocol}://${req.get('host')}`;
    const folder = `users/${userId}/listings/${listingId}/gallery`;

    const urls = files.map(
      f => `${host}/uploads/${folder}/${f.filename}`
    );

    await this.marketplaceService.attachImages(listingId, urls);

    return { success: true, urls };
  }


  @Get()
  @ApiOperation({ summary: 'Get all active boat listings (paginated, sortable, filterable)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'sort', required: false, example: 'newest' })
  @ApiQuery({ name: 'listingType', required: false })
  @ApiQuery({ name: 'vesselType', required: false })
  @ApiQuery({ name: 'condition', required: false })
  @ApiQuery({ name: 'maker', required: false })
  @ApiQuery({ name: 'country', required: false })
  @ApiQuery({ name: 'minPrice', required: false })
  @ApiQuery({ name: 'maxPrice', required: false })
  @ApiQuery({ name: 'minLength', required: false })
  @ApiQuery({ name: 'maxLength', required: false })
  @ApiQuery({ name: 'year', required: false })
  @ApiQuery({ name: 'fuel', required: false })
  @ApiQuery({ name: 'hullMaterial', required: false })
  @ApiResponse({ status: 200, description: 'Filtered and paginated listings' })
  async findAllPaginated(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort') sort = 'newest',
    @Query() filters: any,
  ) {
    return this.marketplaceService.findAllPaginated(page, limit, sort, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get listing by ID' })
  findOne(@Param('id') id: string) {
    return this.marketplaceService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update listing by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateListingDto) {
    return this.marketplaceService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete listing by ID' })
  remove(@Param('id') id: string) {
    return this.marketplaceService.remove(+id);
  }
}
