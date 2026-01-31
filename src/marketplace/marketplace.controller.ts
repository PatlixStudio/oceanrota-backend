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
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
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
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req: any, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new BadRequestException('Only image files are allowed'), false);
    }
    cb(null, true);
  },
};

@ApiTags('Vessel Marketplace')
@Controller('marketplace/listings')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
    @Req() req: any,
  ) {
    const host = req.protocol + '://' + req.get('host');
    const imageUrls = (files || []).map(file => `${host}/uploads/images/${file.filename}`);

    // Map payload for DTO: listing + nested vessel
    const payload = {
      ...body,
      images: imageUrls,
      price: body.price ? Number(body.price) : undefined,
      vessel: {
        vesselName: body.vesselName,
        boatType: body.boatType,
        boatClass: body.boatClass,
        make: body.make,
        model: body.model,
        length_m: body.length_m ? Number(body.length_m) : undefined,
        beam_m: body.beam_m ? Number(body.beam_m) : undefined,
        draft_m: body.draft_m ? Number(body.draft_m) : undefined,
        weight_kg: body.weight_kg ? Number(body.weight_kg) : undefined,
        year: body.year ? Number(body.year) : undefined,
        hullMaterial: body.hullMaterial,
        capacity: body.capacity,
        guestCabins: body.guestCabins ? Number(body.guestCabins) : undefined,
        guestHeads: body.guestHeads ? Number(body.guestHeads) : undefined,
        fuelTank_liter: body.fuelTank_liter ? Number(body.fuelTank_liter) : undefined,
        waterTank_liter: body.waterTank_liter ? Number(body.waterTank_liter) : undefined,
        holdingTank_liter: body.holdingTank_liter ? Number(body.holdingTank_liter) : undefined,
        features: body.features ? JSON.parse(body.features) : undefined,
      },
    };

    const dto = plainToInstance(CreateListingDto, payload);
    const errors = await validate(dto);
    if (errors.length) {
      throw new BadRequestException(errors);
    }

    // Determine ownerId (from req.user if using an auth guard)
    const ownerId = req.user?.id;
    if (!ownerId) {
      throw new BadRequestException('User must be authenticated');
    }

    return this.marketplaceService.create(dto, ownerId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active boat listings (paginated, sortable, filterable)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'sort', required: false, example: 'newest' })
  @ApiQuery({ name: 'listingType', required: false })
  @ApiQuery({ name: 'boatType', required: false })
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
