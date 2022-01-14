import { ProposalService } from '../services/proposal.service';
import { OpenAPI } from 'routing-controllers-openapi';
import { Authorized, Body, Controller, Delete, Get, Param, Post, Put, Req, UseBefore } from 'routing-controllers';
import { validationMiddleware } from '../middlewares/express/validation.middleware';
import { CreateProposalDto, UpdateProposalDto } from '../dtos/proposal.dto';
import { RequestWithUser } from 'interfaces/auth.interface';

@Controller('/proposal')
export class ProposalController {
  public proposals = new ProposalService();

  @Get('/stock_suggestions')
  @Authorized('Seller')
  @OpenAPI({ summary: 'get stock suggestions for all proposals' })
  async getAllStockSuggestions(@Req() req: RequestWithUser) {
    const res = await this.proposals.getAllStocksPrevisions(req.token._id);
    return { data: res, message: 'stock suggestions' };
  }

  @Get('/:id/stock_suggestions')
  @Authorized('Seller')
  @OpenAPI({ summary: 'get stock suggestions for this proposal' })
  async getProposalStockSuggestions(@Param('id') proposalId: string,@Req() req: RequestWithUser) {
    const res = await this.proposals.getStockPrevision(proposalId,req.token._id);
    return { data: res, message: 'stock suggestions' };
  }

  @Get('/:id')
  @OpenAPI({ summary: 'obter informação de uma proposta' })
  async getProposal(@Param('id') propId: string) {
    const prop = await this.proposals.getProposal(propId);
    return { data: prop, message: 'proposal retrevied' };
  }

  @Post('/')
  @Authorized()
  @UseBefore(validationMiddleware(CreateProposalDto, 'body'))
  @OpenAPI({ summary: 'criar de uma proposta' })
  async createProposal(@Body() propData: CreateProposalDto, @Req() req: RequestWithUser) {
    const sellerId = req.token._id;
    const prop = await this.proposals.createProposal(propData, sellerId);
    return { data: prop, message: 'proposal retrevied' };
  }

  @Put('/:id')
  @Authorized()
  @UseBefore(validationMiddleware(UpdateProposalDto, 'body'))
  @OpenAPI({ summary: 'update de uma proposta' })
  async updateProposal(@Param('id') propId: string, @Body() propData: UpdateProposalDto, @Req() req: RequestWithUser) {
    const sellerId = req.token._id;
    const prop = await this.proposals.updateProposal(propId, propData, sellerId);
    return { data: prop, message: 'proposal updated' };
  }

  @Delete('/:id')
  @Authorized()
  @OpenAPI({ summary: 'delete de uma proposta' })
  async deleteProposal(@Param('id') propId: string, @Req() req: RequestWithUser) {
    const sellerId = req.token._id;
    const prop = await this.proposals.deleteProposal(propId, sellerId);
    return { data: prop, message: 'proposal deleted ' };
  }

  @Get('/product/:id')
  @OpenAPI({ summary: 'obter proposta de um produto' })
  async getProposalsProduct(@Param('id') prodId: string) {
    const props = await this.proposals.getProductProposals(prodId);
    return { data: props, message: 'product proposals' };
  }

  @Get('/seller/:id')
  @OpenAPI({ summary: 'obter proposta de um vendedor' })
  async getProposalsSellers(@Param('id') sellerId: string) {
    const props = await this.proposals.getSellerProposals(sellerId);
    return { data: props, message: 'sellers proposals' };
  }

}
