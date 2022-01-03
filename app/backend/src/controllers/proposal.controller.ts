import { ProposalService } from '../services/proposal.service';
import { OpenAPI } from 'routing-controllers-openapi';
import { Body, Controller, Delete, Get, Param, Post, Put, UseBefore } from 'routing-controllers';
import { validationMiddleware } from '../middlewares/express/validation.middleware';
import { CreateProposalDto, UpdateProposalDto } from '../dtos/proposal.dto';

@Controller('/proposal')
export class ProposalController {
  public proposals = new ProposalService();

  @Get('/:id')
  @OpenAPI({ summary: 'obter informação de uma proposta' })
  async getProposal(@Param('id') propId: string) {
    const prop = await this.proposals.getProposal(propId);
    return { data: prop, message: 'proposal retrevied' };
  }

  @Post('/')
  @UseBefore(validationMiddleware(CreateProposalDto, 'body'))
  @OpenAPI({ summary: 'criar de uma proposta' })
  async createProposal(@Body() propData: CreateProposalDto) {
    const sellerId = '123456';
    const prop = await this.proposals.createProposal(propData, sellerId);
    return { data: prop, message: 'proposal retrevied' };
  }

  @Put('/:id')
  @UseBefore(validationMiddleware(UpdateProposalDto, 'body'))
  @OpenAPI({ summary: 'update de uma proposta' })
  async updateProposal(@Param('id') propId: string, @Body() propData: UpdateProposalDto) {
    const sellerId = '123456';
    const prop = await this.proposals.updateProposal(propId, propData, sellerId);
    return { data: prop, message: 'proposal updated' };
  }

  @Delete('/:id')
  @OpenAPI({ summary: 'delete de uma proposta' })
  async deleteProposal(@Param('id') propId: string) {
    const sellerId = '123456';
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
