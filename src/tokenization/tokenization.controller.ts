import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TokenizationService } from './tokenization.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { TokenizeVesselDto } from './dto/tokenize-vessel.dto';
import { TransferTokenDto } from './dto/transfer-token.dto';
import { FractionalizeDto } from './dto/fractionalize.dto';

@ApiTags('Tokenization')
@Controller('tokenization')
export class TokenizationController {
  constructor(private readonly tokenService: TokenizationService) {}

  /** ------------------ User Wallet ------------------ */
  @Post('user-wallet')
  @ApiOperation({ summary: 'Create wallet for a user' })
  @ApiResponse({ status: 201, description: 'User wallet created successfully' })
  async createUserWallet(@Body() dto: CreateWalletDto) {
    return this.tokenService.createWallet(dto);
  }

  /** ------------------ Vessel Tokenization ------------------ */
  @Post('vessel/:vesselId')
  @ApiOperation({ summary: 'Tokenize a vessel' })
  @ApiResponse({ status: 201, description: 'Vessel tokenized successfully' })
  async tokenizeVessel(
    @Param('vesselId') vesselId: string,
    @Body() dto: TokenizeVesselDto,
  ) {
    return this.tokenService.tokenizeVessel({ ...dto, vesselId });
  }

  /** ------------------ Get Vessel Token Info ------------------ */
  @Get('vessel/:vesselId')
  @ApiOperation({ summary: 'Get token info of a vessel' })
  @ApiResponse({ status: 200, description: 'Returns vessel token info' })
  async getVesselTokenInfo(@Param('vesselId') vesselId: string) {
    return this.tokenService.getVesselTokenInfo(vesselId);
  }

  /** ------------------ Future Extensions ------------------ */
  @Post('transfer-token')
  @ApiOperation({ summary: 'Transfer token between wallets' })
  async transferToken(@Body() dto: TransferTokenDto) {
    return this.tokenService.transferToken(dto);
  }

  @Get('wallet/:walletId/balance')
  @ApiOperation({ summary: 'Get wallet balance' })
  async getWalletBalance(@Param('walletId') walletId: string) {
    return this.tokenService.getWalletBalance(walletId);
  }

  @Post('vessel/:vesselId/fractionalize')
  @ApiOperation({ summary: 'Fractionalize vessel token' })
  async fractionalizeVessel(@Param('vesselId') vesselId: string, @Body() dto: FractionalizeDto) {
    return this.tokenService.fractionalizeVessel(vesselId, dto);
  }
}
