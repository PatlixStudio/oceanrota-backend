import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MarketplaceService } from './marketplace.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

const UPLOAD_DIR = './uploads/images';
if (!existsSync(UPLOAD_DIR)) {
  mkdirSync(UPLOAD_DIR, { recursive: true });
}

const multerOptions = {
  storage: diskStorage({
    destination: UPLOAD_DIR,
    filename: (req, file, cb) => {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, unique + extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB per file, for example
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
    // accept images only
    if (!file.mimetype.startsWith('image/')) {
      return cb(new BadRequestException('Only image files are allowed'), false);
    }
    cb(null, true);
  },
};


@ApiTags('Marketplace')
@Controller('marketplace/listings')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  // @Post()
  // @ApiOperation({ summary: 'Create new listing' })
  // create(@Body() dto: CreateListingDto) {
  //   // TODO: attach current userId from auth guard
  //   return this.marketplaceService.create(dto, 1);
  // }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
    @Req() req: any,
  ) {
    // map files to URLs
    const host = req.protocol + '://' + req.get('host');
    const imageUrls = (files || []).map(file => `${host}/uploads/images/${file.filename}`);

    // rebuild payload for DTO
    const payload = {
      ...body,
      images: imageUrls,
      // convert numeric fields from strings, if needed
      price: body.price ? Number(body.price) : undefined,
      length_m: body.length_m ? Number(body.length_m) : undefined,
      year: body.year ? Number(body.year) : undefined,
    };

    const dto = plainToInstance(CreateListingDto, payload);
    const errors = await validate(dto);
    if (errors.length) {
      throw new BadRequestException(errors);
    }

    // // Determine ownerId (from req.user if using an auth guard)
    // const ownerId = req.user?.id;
    // if (!ownerId) {
    //   throw new BadRequestException('User must be authenticated');
    // }

    return this.marketplaceService.create(dto, 4);
  }

  @Get()
  @ApiOperation({ summary: 'Get all listings' })
  findAll() {
    return this.marketplaceService.findAll();
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
